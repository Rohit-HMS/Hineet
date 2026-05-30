import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedExpertise() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding Expertise...')

  const storytellingCards = [
    {
      title: "Wapex",
      description: "Wapex is an advanced WhatsApp CRM platform that helps businesses manage leads and automate customer communication seamlessly.",
      slug: "wapex"
    },
    {
      title: "Propwise",
      description: "Smarter real estate property operations and tenant management software for the modern era.",
      slug: "propwise"
    },
    {
      title: "School",
      description: "Digitize and streamline K-12 school operations with our comprehensive School Management System.",
      slug: "school-os"
    },
    {
      title: "Healthcare",
      description: "A fully compliant healthcare CRM and operations platform designed to help clinics manage patient flow and EHR.",
      slug: "healthcare-sync"
    },
    {
      title: "Project Management",
      description: "A powerful, agile tool for teams to plan, track, and execute projects efficiently.",
      slug: "project-management"
    },
  ];

  try {
    const seededCards = [];

    for (const card of storytellingCards) {
      const { docs } = await payload.find({
        collection: 'products',
        where: {
          slug: {
            equals: card.slug
          }
        },
        limit: 1
      });

      if (docs.length > 0) {
        seededCards.push({
          title: card.title,
          description: card.description,
          product: docs[0].id
        });
      } else {
        console.warn(`Product not found for slug: ${card.slug}`);
      }
    }

    await payload.updateGlobal({
      slug: 'expertise',
      data: {
        cards: seededCards
      },
    })
    console.log(`Successfully seeded ${seededCards.length} Expertise Cards!`)
  } catch (err) {
    console.error(`Failed to seed Expertise`, err)
  }

  process.exit(0)
}

seedExpertise()
