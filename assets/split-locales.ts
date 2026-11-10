import fs from 'node:fs'
import path from 'node:path'

const LOCALES_DIR = path.resolve(process.cwd(), 'src/client/locales')
const ID_DIR = path.join(LOCALES_DIR, 'id')
const EN_DIR = path.join(LOCALES_DIR, 'en')

const ID_FILE = path.join(LOCALES_DIR, 'id.json')
const EN_FILE = path.join(LOCALES_DIR, 'en.json')
const ID_CORE_FILE = path.join(LOCALES_DIR, 'id-core.json')
const ID_EXTENDED_FILE = path.join(LOCALES_DIR, 'id-extended.json')

const CORE_KEYS = new Set([
  'common',
  'nav',
  'home',
  'footer',
  'auth',
  'hubHeader',
  'cookieConsent',
  'helpWidget',
  'notFound',
  'errorPage',
  'pillars'
])

function readModularDir(dirPath: string): Record<string, any> {
  if (!fs.existsSync(dirPath)) return {}
  const merged: Record<string, any> = {}
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json')).sort()
  for (const f of files) {
    const raw = fs.readFileSync(path.join(dirPath, f), 'utf-8')
    const parsed = JSON.parse(raw) as Record<string, any>
    Object.assign(merged, parsed)
  }
  return merged
}

export function compileLocales(): void {
  // 1. Build master id.json from modular id/ folder if present
  let fullId: Record<string, any> = {}
  if (fs.existsSync(ID_DIR)) {
    fullId = readModularDir(ID_DIR)
    fs.writeFileSync(ID_FILE, JSON.stringify(fullId, null, 2) + '\n', 'utf-8')
  } else if (fs.existsSync(ID_FILE)) {
    fullId = JSON.parse(fs.readFileSync(ID_FILE, 'utf-8'))
  }

  // 2. Build master en.json from modular en/ folder if present
  if (fs.existsSync(EN_DIR)) {
    const fullEn = readModularDir(EN_DIR)
    fs.writeFileSync(EN_FILE, JSON.stringify(fullEn, null, 2) + '\n', 'utf-8')
  }

  // 3. Generate id-core.json and id-extended.json for optimized client chunking
  const idCore: Record<string, any> = {}
  const idExtended: Record<string, any> = {}

  for (const [key, value] of Object.entries(fullId)) {
    if (CORE_KEYS.has(key)) {
      idCore[key] = value
    } else {
      idExtended[key] = value
    }
  }

  fs.writeFileSync(ID_CORE_FILE, JSON.stringify(idCore, null, 2) + '\n', 'utf-8')
  fs.writeFileSync(ID_EXTENDED_FILE, JSON.stringify(idExtended, null, 2) + '\n', 'utf-8')
}

// Keep export splitLocales for backward compatibility
export const splitLocales = compileLocales

if (import.meta.main) {
  compileLocales()
  console.log('✓ Successfully compiled modular locales into id.json, en.json, id-core.json, and id-extended.json')
}
