import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function seedHeroLogos() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding Hero Logos...')

  const logosToSeed = [
    { name: 'Stripe', file: 'stripe.svg', size: 42, left: '93%', top: '178%', zIndex: 10 },
    { name: 'React', file: 'react.svg', size: 62, left: '20%', top: '76%', zIndex: 20 },
    { name: 'Docker', file: 'docker.svg', size: 62, left: '62%', top: '-40%', zIndex: 15 },
    { name: 'WhatsApp', file: 'whatsapp.svg', size: 52, left: '26%', top: '150%', zIndex: 15 },
    { name: 'Notion', file: 'notion.svg', size: 38, left: '95%', top: '-35%', zIndex: 11 },
    { name: 'OpenAI', file: 'openai.svg', size: 46, left: '78%', top: '136%', zIndex: 10 },
    { name: 'Slack', file: 'slack.svg', size: 40, left: '76%', top: '24%', zIndex: 16 },
    { name: 'Jira', file: 'jira.svg', size: 50, left: '0%', top: '22%', zIndex: 12 },
    { name: 'Twilio', file: 'twilio.svg', size: 56, left: '10%', top: '175%', zIndex: 10 },
    { name: 'Razorpay', file: 'razorpay.svg', size: 42, left: '19%', top: '-6%', zIndex: 14 },
    { name: 'Quickbooks', file: 'quickbooks.svg', size: 56, left: '38%', top: '-70%', zIndex: 11 },
    { name: 'Classroom', file: 'googleclassroom.svg', size: 59, left: '78%', top: '-72%', zIndex: 18 },
  ];

  try {
    const seededLogos = [];

    for (const item of logosToSeed) {
      const filePath = path.resolve(__dirname, '../frontend/public/assets/logos', item.file)
      
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}, skipping...`)
        continue;
      }

      // 1. Upload to media collection
      console.log(`Uploading ${item.name}...`)
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `${item.name} Logo`,
        },
        filePath,
      })

      // 2. Add to our global list array
      seededLogos.push({
        name: item.name,
        logo: mediaDoc.id,
        size: item.size,
        left: item.left,
        top: item.top,
        zIndex: item.zIndex,
      });
    }

    // 3. Update the global
    await payload.updateGlobal({
      slug: 'hero-logos',
      data: {
        logos: seededLogos
      },
    })
    console.log(`Successfully seeded ${seededLogos.length} Hero Logos!`)
  } catch (err) {
    console.error(`Failed to seed Hero Logos`, err)
  }

  process.exit(0)
}

seedHeroLogos()
