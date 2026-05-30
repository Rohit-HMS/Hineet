import type { GlobalConfig } from 'payload'

export const HeroLogos: GlobalConfig = {
  slug: 'hero-logos',
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
      name: 'logos',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'size',
          type: 'number',
          required: true,
          defaultValue: 40,
        },
        {
          name: 'left',
          type: 'text',
          admin: {
            description: 'CSS left position (e.g. 10%, 120px)'
          }
        },
        {
          name: 'top',
          type: 'text',
          admin: {
            description: 'CSS top position (e.g. 10%, 120px)'
          }
        },
        {
          name: 'zIndex',
          type: 'number',
          defaultValue: 10,
        },
      ],
    },
  ],
}
