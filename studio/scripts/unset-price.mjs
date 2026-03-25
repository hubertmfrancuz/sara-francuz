import {createClient} from '@sanity/client'

const TOKEN = process.env.SANITY_TOKEN
if (!TOKEN) { console.error('Set SANITY_TOKEN env var'); process.exit(1) }

const client = createClient({
  projectId: 'vs7tkh7i',
  dataset: 'development',
  apiVersion: '2026-03-21',
  token: TOKEN,
  useCdn: false,
})

const products = await client.fetch(`*[_type == "product" && defined(price)] { _id, title, price }`)

console.log(`Found ${products.length} products with price field`)

for (const p of products) {
  console.log(`  unsetting price on "${p.title}" (was ${p.price})`)
  await client.patch(p._id).unset(['price']).commit()
}

console.log('Done')
