import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedAboutContact() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding About Us & Contact Pages Globals...')

  // 1. Seed About Us Page
  const aboutServices = [
    {
      title: "ERP Solutions",
      desc: "Streamline operations with a unified system built for modern businesses.",
      icon: "layout-grid",
    },
    {
      title: "Wapex – WhatsApp CRM",
      desc: "Manage leads, chats, and follow-ups from one clean communication hub.",
      icon: "message-square",
    },
    {
      title: "AI Chatbots",
      desc: "Deliver instant customer support with intelligent, always-on chat automation.",
      icon: "bot",
    },
    {
      title: "AI Calling Agents",
      desc: "Automate sales and support calls with smart voice-based workflows.",
      icon: "phone-call",
    },
    {
      title: "Business Automation Tools",
      desc: "Reduce manual work with connected workflows and smart automation.",
      icon: "workflow",
    },
  ];

  const aboutFeatures = [
    {
      title: "Smart & Scalable Solutions",
      icon: "sparkles",
    },
    {
      title: "Modern Technology",
      icon: "gauge",
    },
    {
      title: "User-Friendly Platforms",
      icon: "circle-user",
    },
    {
      title: "Reliable Support",
      icon: "headset",
    },
    {
      title: "AI-Powered Automation",
      icon: "shield-check",
    },
  ];

  try {
    await payload.updateGlobal({
      slug: 'about-us-page',
      data: {
        heading: 'Building Smarter Business Solutions.',
        description: 'Hineet Tech is a product-based technology company focused on building scalable digital solutions that help businesses automate operations, improve customer communication, and grow faster with AI-powered technology.',
        servicesSectionTitle: 'What We Offer',
        services: aboutServices as any,
        whyChooseUsTitle: 'Why Choose Us',
        features: aboutFeatures as any,
        bottomStatement: 'At Hineet Tech, we believe technology should make business *simpler*, faster, and more efficient.',
      },
    })
    console.log('Successfully seeded the About Us Page Global!')
  } catch (err) {
    console.error('Failed to seed About Us Page Global', err)
  }

  // 2. Seed Contact Page
  const contactInfo = [
    {
      label: "HeadQuarter",
      value: "Sudarshan Enclave, Sector 3,\nUdaipur, Rajasthan 313001, India.",
      href: "https://maps.google.com/?q=Sudarshan+Enclave,+Sector+3,+Udaipur,+Rajasthan+313001,+India",
      icon: "map-pin"
    },
    {
      label: "General Inquiries",
      value: "hineettechprivatelimited@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=hineettechprivatelimited@gmail.com",
      icon: "mail"
    },
    {
      label: "Phone",
      value: "+91 9664134872",
      href: "tel:+919664134872",
      icon: "phone"
    },
    {
      label: "Linkedin",
      value: "Hineet Tech Pvt. Ltd",
      href: "https://www.linkedin.com/company/hineet-tech-pvt-ltd/",
      icon: "linkedin"
    }
  ];

  try {
    await payload.updateGlobal({
      slug: 'contact-page',
      data: {
        heading: "Let's Connect.",
        description: "Have a question, partnership proposal, or just want to say hi? We'd love to hear from you.",
        contactInfo: contactInfo as any,
        formTitle: 'Send us a message'
      },
    })
    console.log('Successfully seeded the Contact Page Global!')
  } catch (err) {
    console.error('Failed to seed Contact Page Global', err)
  }

  process.exit(0)
}

seedAboutContact()
