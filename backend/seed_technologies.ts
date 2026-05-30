import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function seedTechnologies() {
  const payload = await getPayload({ config: configPromise })
  console.log('Seeding Technologies Global...')

  const categories = [
    {
      name: "Ai Automation",
      items: [
        { name: "AutoGen" },
        { name: "make.com" },
        { name: "N8N" },
        { name: "zapier" },
        { name: "Python" },
        { name: "MCP" },
      ]
    },
    {
      name: "Frontend Technologies",
      items: [
        { name: "React.JS" },
        { name: "Vue.JS" },
        { name: "Angular" },
        { name: "Svelte" },
        { name: "FrappeUI" },
        { name: "TailwindCSS" },
        { name: "NextJS" },
        { name: "Bootstrap" },
      ]
    },
    {
      name: "Backend Technologies",
      items: [
        { name: "NodeJS" },
        { name: "Springboot" },
        { name: "NestJS" },
        { name: "FastAPI" },
        { name: "ExpressJS" },
        { name: "GO" },
        { name: "PHP" },
        { name: "Laravel" },
      ]
    },
    {
      name: "Mobile App",
      items: [
        { name: "Flutter" },
        { name: "ReactNative" },
        { name: "Flutter flow" },
      ]
    },
    {
      name: "Ai Agent",
      items: [
        { name: "Google Ai Studio" },
        { name: "llamaindex" },
        { name: "Open Router" },
        { name: "Vertex AI" },
        { name: "Kling AI" },
        { name: "LiveKit" },
        { name: "Ollama" },
        { name: "HuggingFace" },
        { name: "Gradio" },
        { name: "Groq" },
      ]
    },
    {
      name: "Devops",
      items: [
        { name: "Kubernetes" },
        { name: "Kafka" },
        { name: "Docker" },
        { name: "Git" },
      ]
    },
    {
      name: "Design",
      items: [
        { name: "Blender" },
        { name: "Figma" },
        { name: "Adobe" },
        { name: "Photoshop" },
      ]
    },
    {
      name: "Database",
      items: [
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "Mysql" },
        { name: "Redis" },
      ]
    },
    {
      name: "Cloud",
      items: [
        { name: "AWS" },
        { name: "Azure" },
        { name: "Google cloud" },
        { name: "Hostinger" },
        { name: "Digital Ocean" },
      ]
    },
    {
      name: "Testing",
      items: [
        { name: "JMeter" },
        { name: "Selenium" },
      ]
    }
  ];

  try {
    await payload.updateGlobal({
      slug: 'technologies',
      data: {
        categories
      },
    })
    console.log('Successfully seeded the Technologies Global!')
  } catch (err) {
    console.error('Failed to seed Technologies Global', err)
  }

  process.exit(0)
}

seedTechnologies()
