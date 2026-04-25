// scripts/gen.mjs
// last modified: 2026.04.24
// 
// ℹ️ 役割
// data/substances/配下の複数のサブスタンスのJSONファイルを
// public/data/all_substances.jsonと
// assets/substances/all_substances.jsonに出力する

import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const srcDir = path.join(root, "data/substances")

const outPublicDir = path.join(root, "public/data")
const outPublicFile = path.join(outPublicDir, "all_substances.json")

const outServerDir = path.join(root, "server/assets/substances")
const outServerFile = path.join(outServerDir, "all_substances.json")

fs.mkdirSync(outPublicDir, { recursive: true })
fs.mkdirSync(outServerDir, { recursive: true })

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".json"))

const list = []

for (const file of files) {
  const filePath = path.join(srcDir, file)
  const fileId = file.replace(/\.json$/, "")

  let rawText
  let raw

  try {
    rawText = fs.readFileSync(filePath, "utf-8")
    raw = JSON.parse(rawText)
  } catch (err) {
    console.error("❌ JSON parse error")
    console.error(`   File : ${filePath}`)
    console.error(`   Error: ${err.message}`)

    if (rawText) {
      console.error("   Preview:")
      console.error(
        rawText
          .split("\n")
          .slice(0, 10)
          .map((l, i) => `${i + 1}: ${l}`)
          .join("\n")
      )
    }

    process.exit(1)
  }

  const id = raw.id ?? fileId

  const commonName =
    raw.common_name ??
    raw.commonName ??
    raw.name_en ??
    raw.name_ja ??
    raw.name ??
    id

  const systematicName =
    raw["systematic name"] ??
    raw.systematic_name ??
    raw.systematicName ??
    raw.systematic ??
    ""

  const identifiersSrc = raw.identifiers ?? raw.identifier ?? {}
  const identifiers = {
    pubchem_cid: identifiersSrc.pubchem_cid ?? raw.pubchem_cid ?? raw.pubchemCid ?? "",
    inchi_key: identifiersSrc.inchi_key ?? raw.inchi_key ?? raw.inchiKey ?? "",
    smiles: identifiersSrc.smiles ?? raw.smiles ?? "",
  }

  const aliases = Array.isArray(raw.aliases)
    ? raw.aliases
    : raw.aliases
      ? [raw.aliases]
      : []

  const categories = Array.isArray(raw.categories)
    ? raw.categories
    : raw.categories
      ? [raw.categories]
      : []

  const legal = raw.legal ?? {}
  const summary = raw.summary ?? raw.description ?? ""
  const history = raw.history ?? ""
  const effects = raw.effects ?? {}
  const external_resources = raw.external_resources ?? raw.externalResources ?? {}
  const refs = raw.refs ?? raw.references ?? []

  list.push({
    id,
    name: commonName,
    common_name: commonName,
    systematic_name: systematicName,
    aliases,
    categories,
    legal,
    identifiers,
    pubchemCid: identifiers.pubchem_cid,
    inchiKey: identifiers.inchi_key,
    summary,
    history,
    effects,
    external_resources,
    refs,
  })
}

const outputJson = JSON.stringify(list, null, 2)

fs.writeFileSync(outPublicFile, outputJson, "utf-8")
fs.writeFileSync(outServerFile, outputJson, "utf-8")

console.log(`✅ [gen] wrote ${list.length} substances -> ${outPublicFile}`)
console.log(`✅ [gen] wrote ${list.length} substances -> ${outServerFile}`)