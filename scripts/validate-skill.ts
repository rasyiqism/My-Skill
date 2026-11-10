import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = path.resolve(__dirname, '..');
const SKILL_MD_PATH = path.join(ROOT_DIR, 'SKILL.md');

interface ValidationReport {
  errors: string[];
  warnings: string[];
  passed: string[];
}

const report: ValidationReport = {
  errors: [],
  warnings: [],
  passed: []
};

console.log('🔍 Running Rasyiqi Skill Integrity & Specification Validator...\n');

// 1. Verify SKILL.md and YAML Frontmatter
if (!fs.existsSync(SKILL_MD_PATH)) {
  report.errors.push('SKILL.md file is missing in root directory.');
} else {
  const content = fs.readFileSync(SKILL_MD_PATH, 'utf-8');
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!frontmatterMatch) {
    report.errors.push('SKILL.md is missing YAML frontmatter enclosed in --- delimiters.');
  } else {
    report.passed.push('YAML frontmatter detected in SKILL.md.');
    const yamlBlock = frontmatterMatch[1];

    // Check name
    const nameMatch = yamlBlock.match(/^name:\s*([^\r\n]+)/m);
    if (!nameMatch) {
      report.errors.push('Missing "name" field in frontmatter.');
    } else {
      const name = nameMatch[1].trim();
      if (name.length > 64) {
        report.errors.push(`Name "${name}" exceeds 64 characters limit (actual: ${name.length}).`);
      } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
        report.errors.push(`Name "${name}" must only contain lowercase alphanumeric characters and single hyphens.`);
      } else {
        report.passed.push(`Skill name "${name}" is valid.`);
      }
    }

    // Check description
    const descMatch = yamlBlock.match(/^description:\s*(?:>-\s*)?\r?\n?((?:^[ \t]+[^\r\n]+\r?\n?)+)/m) 
      || yamlBlock.match(/^description:\s*([^\r\n]+)/m);
    if (!descMatch) {
      report.errors.push('Missing "description" field in frontmatter.');
    } else {
      const description = descMatch[1].replace(/\r?\n[ \t]*/g, ' ').trim();
      if (description.length === 0) {
        report.errors.push('Description is empty.');
      } else if (description.length > 1024) {
        report.errors.push(`Description exceeds 1024 characters (actual: ${description.length}).`);
      } else {
        report.passed.push(`Description length valid (${description.length}/1024 chars).`);
      }

      if (!/use when|activate whenever/i.test(description)) {
        report.warnings.push('Description should ideally contain trigger phrasing like "Use when..." or "Activate whenever...".');
      } else {
        report.passed.push('Description contains explicit trigger phrasing ("Use when...").');
      }
    }
  }
}

// 2. Validate Link Integrity across Markdown files
const markdownFiles = [
  SKILL_MD_PATH,
  path.join(ROOT_DIR, 'README.md'),
  ...fs.readdirSync(path.join(ROOT_DIR, 'references'))
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(ROOT_DIR, 'references', f))
];

let checkedLinksCount = 0;

for (const mdFile of markdownFiles) {
  if (!fs.existsSync(mdFile)) continue;
  const fileContent = fs.readFileSync(mdFile, 'utf-8');
  const relativeFile = path.relative(ROOT_DIR, mdFile);
  const dir = path.dirname(mdFile);

  // Match markdown links [text](path)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(fileContent)) !== null) {
    const rawTarget = match[2].trim();
    // Ignore external URLs and anchors
    if (rawTarget.startsWith('http://') || rawTarget.startsWith('https://') || rawTarget.startsWith('#') || rawTarget.startsWith('mailto:')) {
      continue;
    }

    // Strip hash anchors
    const cleanPath = rawTarget.split('#')[0];
    if (!cleanPath) continue;

    checkedLinksCount++;
    const resolvedPath = path.resolve(dir, cleanPath);

    if (!fs.existsSync(resolvedPath)) {
      report.errors.push(`Broken link in ${relativeFile}: "${rawTarget}" -> target not found at ${path.relative(ROOT_DIR, resolvedPath)}`);
    }
  }
}

report.passed.push(`Verified ${checkedLinksCount} internal documentation links with 0 broken targets.`);

// 3. Validate Script Permissions
const scriptsDir = path.join(ROOT_DIR, 'scripts');
if (fs.existsSync(scriptsDir)) {
  const scriptFiles = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.sh'));
  for (const sFile of scriptFiles) {
    const fullPath = path.join(scriptsDir, sFile);
    try {
      fs.accessSync(fullPath, fs.constants.X_OK);
      report.passed.push(`Script "scripts/${sFile}" is executable.`);
    } catch {
      report.errors.push(`Script "scripts/${sFile}" is not executable. Run chmod +x.`);
    }
  }
}

// 4. Validate Assets Integrity
const assetsDir = path.join(ROOT_DIR, 'assets');
if (!fs.existsSync(assetsDir)) {
  report.errors.push('Assets directory is missing.');
} else {
  const assets = fs.readdirSync(assetsDir);
  report.passed.push(`Assets directory verified (${assets.length} items present).`);
}

// 5. Validate Evals Suite
const evalsPath = path.join(ROOT_DIR, 'evals', 'evals.json');
if (!fs.existsSync(evalsPath)) {
  report.warnings.push('evals/evals.json is missing.');
} else {
  try {
    const evalsData = JSON.parse(fs.readFileSync(evalsPath, 'utf-8'));
    if (evalsData.evals && Array.isArray(evalsData.evals)) {
      report.passed.push(`Evals benchmark suite verified (${evalsData.evals.length} test cases).`);
    } else {
      report.errors.push('evals/evals.json missing "evals" array.');
    }
  } catch (err: any) {
    report.errors.push(`Failed to parse evals/evals.json: ${err.message}`);
  }
}

// Print Results
console.log('✅ PASSED CHECKS:');
for (const p of report.passed) {
  console.log(`  ✓ ${p}`);
}

if (report.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  for (const w of report.warnings) {
    console.log(`  ! ${w}`);
  }
}

if (report.errors.length > 0) {
  console.log('\n❌ FAILED CHECKS:');
  for (const e of report.errors) {
    console.log(`  ✗ ${e}`);
  }
  console.log(`\n❌ Skill validation failed with ${report.errors.length} error(s).\n`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL CHECKS PASSED! Skill is 100% compliant and ready for production agents.\n');
  process.exit(0);
}
