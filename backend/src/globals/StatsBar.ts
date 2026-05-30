import type { GlobalConfig } from 'payload'

export const StatsBar: GlobalConfig = {
  slug: 'stats-bar',
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
