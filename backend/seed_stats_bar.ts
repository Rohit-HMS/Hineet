import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedStatsBar() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding Stats Bar...')

  const stats = [
    { value: "10+", label: "Project Completed" },
    { value: "95%", label: "CUSTOMER SATISFACTION" },
    { value: "5+", label: "INNOVATION AND VALUABLE INSIGHT" },
    { value: "10+", label: "MEASURABLE RESULTS" },
  ];

  try {
    await payload.updateGlobal({
      slug: 'stats-bar',
      data: {
        stats
      },
    })
    console.log(`Successfully seeded ${stats.length} Stats!`)
  } catch (err) {
    console.error(`Failed to seed Stats Bar`, err)
  }

  process.exit(0)
}

seedStatsBar()
