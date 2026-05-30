import type { GlobalConfig } from 'payload'

export const CulturePage: GlobalConfig = {
  slug: 'culture-page',
  admin: {
    livePreview: {
      url: () => 'http://localhost:3000/culture',
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
      defaultValue: 'Who We Are',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Our *Culture*',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'We are a collective of creators, engineers, and visionaries building the next generation of commerce.',
    },
    {
      name: 'bentoWideTitle',
      type: 'text',
      required: true,
      defaultValue: 'Driven by Impact',
    },
    {
      name: 'bentoWideDescription',
      type: 'textarea',
      required: true,
      defaultValue: 'We measure our success by the positive change we bring to local economies and individual lives. Every feature we ship is designed to empower.',
    },
    {
      name: 'bentoAccentTitle',
      type: 'text',
      required: true,
      defaultValue: 'Open Position',
    },
    {
      name: 'values',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
