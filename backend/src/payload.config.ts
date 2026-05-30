import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Jobs } from './collections/Jobs'
import { Products } from './collections/Products'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { JobApplications } from './collections/JobApplications'
import { Navbar } from './globals/Navbar'
import { HeroLogos } from './globals/HeroLogos'
import { HomeHero } from './globals/HomeHero'
import { StatsBar } from './globals/StatsBar'
import { Expertise } from './globals/Expertise'
import { AboutSection } from './globals/AboutSection'
import { Footer } from './globals/Footer'
import { Technologies } from './globals/Technologies'
import { AboutUsPage } from './globals/AboutUsPage'
import { ContactPage } from './globals/ContactPage'
import { ProductsPage } from './globals/ProductsPage'
import { CareersPage } from './globals/CareersPage'
import { CulturePage } from './globals/CulturePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Jobs, Products, ContactSubmissions, JobApplications],
  globals: [Navbar, HeroLogos, HomeHero, StatsBar, Expertise, AboutSection, Footer, Technologies, AboutUsPage, ContactPage, ProductsPage, CareersPage, CulturePage],
  cors: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
