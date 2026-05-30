import type { GlobalConfig } from 'payload'

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  admin: {
    livePreview: {
      url: () => 'http://localhost:3000',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headingLine1',
      type: 'text',
      required: true,
      defaultValue: 'Where Innovation',
    },
    {
      name: 'headingLine2',
      type: 'text',
      required: true,
      defaultValue: 'Meets Execution.',
      admin: {
        description: 'This line will be rendered with the blue gradient.'
      }
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      required: true,
      defaultValue: 'Discover More',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
      required: true,
      defaultValue: '/products',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      required: true,
      defaultValue: 'Contact us',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      required: true,
      defaultValue: '/contact',
    },
  ],
}
