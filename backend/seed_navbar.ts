import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedNavbar() {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding Navbar...')
  try {
    await payload.updateGlobal({
      slug: 'navbar',
      data: {
        links: [
          { name: "Home", href: "/" },
          { name: "Culture", href: "/culture" },
          { name: "Careers", href: "/careers" },
          { name: "Product", href: "/products" },
          { name: "Contact", href: "/contact" },
          { name: "About Us", href: "/about-us" }
        ]
      },
    })
    console.log(`Successfully seeded the Navbar Global!`)
  } catch (err) {
    console.error(`Failed to seed Navbar`, err)
  }

  process.exit(0)
}

seedNavbar()
