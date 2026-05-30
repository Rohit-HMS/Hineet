import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedOriginalHeroLogos() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding original Hero Logos without images...')

  const logosToSeed = [
    { name: 'Stripe', logo: null, size: 42, left: '93%', top: '178%', zIndex: 10 },
    { name: 'React', logo: null, size: 62, left: '20%', top: '76%', zIndex: 20 },
    { name: 'Docker', logo: null, size: 62, left: '62%', top: '-40%', zIndex: 15 },
    { name: 'Figma', logo: null, size: 50, left: '0%', top: '22%', zIndex: 12 },
    { name: 'WordPress', logo: null, size: 56, left: '10%', top: '175%', zIndex: 10 },
    { name: 'Vercel', logo: null, size: 42, left: '19%', top: '-6%', zIndex: 14 },
    { name: 'Canva', logo: null, size: 56, left: '38%', top: '-70%', zIndex: 11 },
    { name: 'AWS', logo: null, size: 59, left: '78%', top: '-72%', zIndex: 18 },
    { name: 'WhatsApp', logo: null, size: 52, left: '26%', top: '150%', zIndex: 15 },
    { name: 'TypeScript', logo: null, size: 38, left: '18%', top: '-69%', zIndex: 12 },
    { name: 'Notion', logo: null, size: 38, left: '95%', top: '-35%', zIndex: 11 },
    { name: 'GitHub', logo: null, size: 42, left: '6%', top: '88%', zIndex: 14 },
    { name: 'OpenAI', logo: null, size: 46, left: '78%', top: '136%', zIndex: 10 },
    { name: '.NET', logo: null, size: 58, left: '94%', top: '64%', zIndex: 13 },
    { name: 'Slack', logo: null, size: 40, left: '76%', top: '24%', zIndex: 16 },
  ];

  try {
    await payload.updateGlobal({
      slug: 'hero-logos',
      data: {
        logos: logosToSeed
      },
    })
    console.log(`Successfully seeded ${logosToSeed.length} original Hero Logos!`)
  } catch (err) {
    console.error(`Failed to seed Hero Logos`, err)
  }

  process.exit(0)
}

seedOriginalHeroLogos()
