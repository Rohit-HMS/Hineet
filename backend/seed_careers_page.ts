import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedCareersPage() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding Careers Page Global...')

  try {
    await payload.updateGlobal({
      slug: 'careers-page',
      data: {
        badge: "WE'RE HIRING",
        heading: 'Join the *Movement*',
        description: 'Shape the future of commerce and logistics with a team of relentless innovators.',
        perks: [
          { name: 'Remote-first' },
          { name: 'Equity Package' },
          { name: 'Health Coverage' },
          { name: 'Learning Budget' },
        ],
      },
    })
    console.log('Successfully seeded the Careers Page Global!')
  } catch (err) {
    console.error('Failed to seed Careers Page Global', err)
  }

  process.exit(0)
}

seedCareersPage()
