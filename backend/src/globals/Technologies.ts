import type { GlobalConfig } from 'payload'

export const Technologies: GlobalConfig = {
  slug: 'technologies',
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
      name: 'categories',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'items',
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
              required: false, // Optional so it can fallback to react-icons cleanly
            },
          ],
        },
      ],
    },
  ],
}
