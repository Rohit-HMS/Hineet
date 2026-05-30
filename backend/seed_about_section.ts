import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedAboutSection() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding About Section...')

  try {
    await payload.updateGlobal({
      slug: 'about-section',
      data: {
        visionHeading: "Our vision",
        visionDescription: "Hineet Tech envisions a future where adaptability, innovation, and sustainability form the foundation of enduring success. We foster excellence and trust, empowering our businesses to lead industries and impact society.",
        missionHeading: "Our mission",
        missionDescription: "To endure, evolve, and empower – we aim to build institutions that redefine the future, shape societies, and embody the promise of permanence through constant reinvention.",
        cultureHeading: "Working at Hineet",
        cultureDescription: "This place is designed to make you feel uncomfortable.",
        cultureButtonText: "Learn more about our culture",
        cultureButtonLink: "/culture",
      },
    })
    console.log(`Successfully seeded About Section!`)
  } catch (err) {
    console.error(`Failed to seed About Section`, err)
  }

  process.exit(0)
}

seedAboutSection()
