import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedFooter() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding Footer Global...')

  try {
    // 1. Fetch products to establish relational links
    const { docs: products } = await payload.find({
      collection: 'products',
      limit: 100,
    })

    const wapex = products.find(p => p.slug === 'wapex')
    const propwise = products.find(p => p.slug === 'propwise')
    const school = products.find(p => p.slug === 'school-os')
    const pm = products.find(p => p.slug === 'project-management')

    // 2. Build the columns
    const columns = [
      {
        title: 'ABOUT',
        links: [
          { label: 'Culture', linkType: 'custom', url: '/culture', newTab: false },
          { label: 'Careers', linkType: 'custom', url: '/careers', newTab: false },
          { label: 'Product', linkType: 'custom', url: '/products', newTab: false },
          { label: 'Contact', linkType: 'custom', url: '/contact', newTab: false },
        ],
      },
      {
        title: 'OUR PRODUCT',
        links: [
          {
            label: 'Wapex',
            linkType: wapex ? 'product' : 'custom',
            product: wapex ? wapex.id : undefined,
            url: wapex ? undefined : '/products/wapex',
            newTab: false,
          },
          {
            label: 'Propwise',
            linkType: propwise ? 'product' : 'custom',
            product: propwise ? propwise.id : undefined,
            url: propwise ? undefined : '/products/propwise',
            newTab: false,
          },
          {
            label: 'School',
            linkType: school ? 'product' : 'custom',
            product: school ? school.id : undefined,
            url: school ? undefined : '/products/school-os',
            newTab: false,
          },
          {
            label: 'Project Management',
            linkType: pm ? 'product' : 'custom',
            product: pm ? pm.id : undefined,
            url: pm ? undefined : '/products/project-management',
            newTab: false,
          },
        ],
      },
      {
        title: 'CONNECT',
        links: [
          { label: 'LinkedIn', linkType: 'custom', url: 'https://www.linkedin.com/company/hineet-tech-pvt-ltd/', newTab: true },
          { label: 'Instagram', linkType: 'custom', url: 'https://www.instagram.com/hineet.tech?igsh=NnpleXFnYjkycmt0&utm_source=qr', newTab: true },
          { label: 'WhatsApp', linkType: 'custom', url: 'https://wa.me/919664134872', newTab: true },
          { label: 'Gmail', linkType: 'custom', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=hineettechprivatelimited@gmail.com', newTab: true },
        ],
      },
    ]

    // 3. Social Media Links for the left side
    const socialLinks = [
      { platform: 'instagram', url: 'https://www.instagram.com/hineet.tech?igsh=NnpleXFnYjkycmt0&utm_source=qr' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/company/hineet-tech-pvt-ltd/' },
      { platform: 'whatsapp', url: 'https://wa.me/919664134872' },
      { platform: 'email', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=hineettechprivatelimited@gmail.com' },
    ]

    // 4. Compliance/Bottom Links
    const bottomLinks = [
      { label: 'Privacy Policy', linkType: 'custom', url: '#', newTab: false },
      { label: 'Terms of Service', linkType: 'custom', url: '#', newTab: false },
    ]

    // 5. Update global values in Payload
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        description: 'A connected ecosystem of technology, commerce, culture, and convenience, designed for the future.',
        socialLinks,
        columns,
        copyright: `© ${new Date().getFullYear()} HINEET TECH Private Limited. All rights reserved.`,
        bottomLinks,
      },
    })

    console.log('Successfully seeded the Footer Global!')
  } catch (err) {
    console.error('Failed to seed Footer Global', err)
  }

  process.exit(0)
}

seedFooter()
