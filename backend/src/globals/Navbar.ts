import type { GlobalConfig } from 'payload'
import { getFrontendUrl } from '../utils/getFrontendUrl'

export const Navbar: GlobalConfig = {
  slug: 'navbar',
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
      name: 'links',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
