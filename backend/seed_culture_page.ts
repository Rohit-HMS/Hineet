import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedCulturePage() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding Culture Page Global...')

  try {
    await payload.updateGlobal({
      slug: 'culture-page',
      data: {
        badge: 'Who We Are',
        heading: 'Our *Culture*',
        description: 'We are a collective of creators, engineers, and visionaries building the next generation of commerce.',
        bentoWideTitle: 'Driven by Impact',
        bentoWideDescription: 'We measure our success by the positive change we bring to local economies and individual lives. Every feature we ship is designed to empower.',
        bentoAccentTitle: 'Open Position',
        values: [
          { title: 'Innovation', text: 'Pushing boundaries to build the future of commerce.' },
          { title: 'Excellence', text: 'Delivering world-class experiences at every touchpoint.' },
          { title: 'Community', text: 'Empowering local businesses and creators to thrive.' },
          { title: 'Speed', text: 'Moving fast without breaking trust or quality.' },
        ],
      },
    })
    console.log('Successfully seeded the Culture Page Global!')
  } catch (err) {
    console.error('Failed to seed Culture Page Global', err)
  }

  process.exit(0)
}

seedCulturePage()
