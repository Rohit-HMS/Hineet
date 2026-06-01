import type { GlobalConfig } from 'payload'
import { getFrontendUrl } from '../utils/getFrontendUrl'

export const Technologies: GlobalConfig = {
  slug: 'technologies',
  admin: {
    livePreview: {
      url: () => getFrontendUrl(),
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
