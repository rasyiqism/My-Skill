#!/usr/bin/env bun
import fs from 'node:fs'
import path from 'node:path'
import { compileLocales } from './split-locales.ts'

const LOCALES_DIR = path.resolve(process.cwd(), 'src/client/locales')
const ID_DIR = path.join(LOCALES_DIR, 'id')
const EN_DIR = path.join(LOCALES_DIR, 'en')

function printUsage(): void {
  console.log(`
Usage:
  bun run i18n:add <keyPath> "<indonesianText>" "[englishText]"

Examples:
  bun run i18n:add orders.trackShipping "Lacak Pengiriman" "Track Shipment"
  bun run i18n:add bio.customTheme "Tema Kustom" "Custom Theme"
  bun run i18n:add common.retry "Coba Lagi" "Retry"
`)
}

const args = process.argv.slice(2)
if (args.length < 2) {
  printUsage()
  process.exit(1)
}

const keyPath = args[0]
const textId = args[1]
const textEn = args[2] || textId // Fallback to id text if not specified

const parts = keyPath.split('.')
const topSection = parts[0]

function findDomainFile(dir: string, section: string): string {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
  for (const f of files) {
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
    const json = JSON.parse(raw)
    if (section in json) {
      return f
    }
  }
  return 'core.json' // fallback
}

function setNestedValue(obj: Record<string, any>, pathParts: string[], value: string): void {
  let curr = obj
  for (let i = 0; i < pathParts.length - 1; i++) {
    const p = pathParts[i]
    if (!(p in curr) || typeof curr[p] !== 'object' || curr[p] === null) {
      curr[p] = {}
    }
    curr = curr[p]
  }
  curr[pathParts[pathParts.length - 1]] = value
}

// 1. Find domain file
const domainFile = findDomainFile(ID_DIR, topSection)
const idFilePath = path.join(ID_DIR, domainFile)
const enFilePath = path.join(EN_DIR, domainFile)

// 2. Read and update ID
const idData = JSON.parse(fs.readFileSync(idFilePath, 'utf-8'))
setNestedValue(idData, parts, textId)
fs.writeFileSync(idFilePath, JSON.stringify(idData, null, 2) + '\n', 'utf-8')

// 3. Read and update EN
const enData = JSON.parse(fs.readFileSync(enFilePath, 'utf-8'))
setNestedValue(enData, parts, textEn)
fs.writeFileSync(enFilePath, JSON.stringify(enData, null, 2) + '\n', 'utf-8')

// 4. Recompile master files
compileLocales()

console.log(`✓ Added "${keyPath}" into ${domainFile}:`)
console.log(`    [id]: "${textId}"`)
console.log(`    [en]: "${textEn}"`)
console.log(`✓ Recompiled id.json, en.json, id-core.json, and id-extended.json successfully!`)
