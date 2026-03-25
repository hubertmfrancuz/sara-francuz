import {createClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {dirname, resolve} from 'path'
import {fileURLToPath} from 'url'

const TOKEN = process.env.SANITY_TOKEN
if (!TOKEN) { console.error('Set SANITY_TOKEN env var'); process.exit(1) }

const dryRun = process.argv.includes('--dry-run')

const client = createClient({
  projectId: 'vs7tkh7i',
  dataset: 'development',
  apiVersion: '2026-03-21',
  token: TOKEN,
  useCdn: false,
})

const __dirname = dirname(fileURLToPath(import.meta.url))
const csv = readFileSync(resolve(__dirname, '../../products_shopify.csv'), 'utf8')
const shopifyMap = Object.fromEntries(
  csv.trim().split('\n').slice(1).map((line) => {
    const [id, ...rest] = line.split(',')
    return [rest.join(',').trim().toLowerCase(), `shopifyProduct-${id.trim()}`]
  })
)

const products = await client.fetch(`*[_type == "product"] | order(store.title, title) {
  ...,
  "storeTitle": store.title,
  "hasStore": defined(store.gid)
}`)

for (const p of products) {
  const title = (p.storeTitle ?? p.title ?? '').toLowerCase()
  const newId = shopifyMap[title]

  if (!newId) {
    console.log(`SKIP  "${p.title}"  (no match in CSV)`)
    continue
  }

  if (newId === p._id) {
    console.log(`SKIP  "${p.title}"  (already has correct id)`)
    continue
  }

  console.log(`${p._id}  →  ${newId}  "${p.storeTitle ?? p.title}"`)

  if (!dryRun) {
    const {storeTitle, hasStore, _id, ...rest} = p
    await client.createOrReplace({...rest, _id: newId})

    // Update any documents that reference the old id
    const refs = await client.fetch(`*[references($id)]{ _id }`, {id: _id})
    for (const ref of refs) {
      const doc = await client.getDocument(ref._id)
      const updated = JSON.parse(JSON.stringify(doc).replaceAll(_id, newId))
      await client.createOrReplace(updated)
      console.log(`  updated ref in ${ref._id}`)
    }

    await client.delete(_id)
  }
}

if (dryRun) console.log('\n[dry-run] no changes made')
