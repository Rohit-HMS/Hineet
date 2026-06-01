import type { GlobalConfig } from 'payload'
import { getFrontendUrl } from '../utils/getFrontendUrl'

export const Expertise: GlobalConfig = {
  slug: 'expertise',
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
      name: 'headingLine1',
      type: 'text',
      required: true,
      defaultValue: 'Our',
    },
    {
      name: 'headingLine2',
      type: 'text',
      required: true,
      defaultValue: 'Expertise',
      admin: {
        description: 'This line will be rendered with the blue gradient.'
      }
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
      ],
    },
  ],
}
