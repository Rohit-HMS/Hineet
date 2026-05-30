import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import { products } from './products_data'
import { jobs } from './jobs_data'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding jobs...')
  for (const job of jobs) {
    try {
      await payload.create({
        collection: 'jobs',
        data: job,
      })
      console.log(`Created job: ${job.title}`)
    } catch (err) {
      console.error(`Failed to create job: ${job.title}`, err)
    }
  }

  console.log('Seeding products...')
  for (const product of products) {
    try {
      // payload data must match the schema exactly.
      // features and idealFor need to be arrays of objects like { feature: "string" }, { audience: "string" }
      const { accent, border, shadow, dot, ...restProduct } = product;
      const formattedProduct = {
        ...restProduct,
        features: product.features.map(f => ({ feature: f })),
        idealFor: product.idealFor.map(a => ({ audience: a })),
        paymentOptions: product.paymentOptions?.map(po => ({
          ...po,
          monthlyFeatures: po.monthlyFeatures?.map(f => ({ feature: f })),
          yearlyFeatures: po.yearlyFeatures?.map(f => ({ feature: f })),
          features: po.features?.map(f => ({ feature: f })),
        }))
      }

      await payload.create({
        collection: 'products',
        data: formattedProduct,
      })
      console.log(`Created product: ${product.name}`)
    } catch (err) {
      console.error(`Failed to create product: ${product.name}`, err)
    }
  }

  console.log('Done seeding!')
  process.exit(0)
}

seed()
