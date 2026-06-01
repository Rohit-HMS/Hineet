import type { GlobalConfig } from 'payload'
import { getFrontendUrl } from '../utils/getFrontendUrl'

export const CareersPage: GlobalConfig = {
  slug: 'careers-page',
  admin: {
    livePreview: {
      url: () => `${getFrontendUrl()}/careers`,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      required: true,
      defaultValue: "WE'RE HIRING",
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Join the *Movement*',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Shape the future of commerce and logistics with a team of relentless innovators.',
    },
    {
      name: 'perks',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
