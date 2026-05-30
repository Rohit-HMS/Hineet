import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedProductsPage() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding Products Page Global...')

  try {
    await payload.updateGlobal({
      slug: 'products-page',
      data: {
        badge: 'OUR PRODUCTS',
        heading: 'One Platform *Endless Possibilities.*',
        description: 'Innovative software solutions that simplify workflows, enhance productivity, and scale with your business.',
      },
    })
    console.log('Successfully seeded the Products Page Global!')
  } catch (err) {
    console.error('Failed to seed Products Page Global', err)
  }

  process.exit(0)
}

seedProductsPage()
