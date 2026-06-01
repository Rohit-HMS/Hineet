import type { GlobalConfig } from 'payload'
import { getFrontendUrl } from '../utils/getFrontendUrl'

export const StatsBar: GlobalConfig = {
  slug: 'stats-bar',
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
      name: 'stats',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
