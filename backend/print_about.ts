import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import 'dotenv/config'

async function printAbout() {
  const payload = await getPayload({ config: configPromise })
  console.log('Fetching About Section Global...')
  const about = await payload.findGlobal({
    slug: 'about-section',
  })
  console.log('About Section Data:')
  console.log(JSON.stringify(about, null, 2))
  process.exit(0)
}

printAbout()
