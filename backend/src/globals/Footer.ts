import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'A connected ecosystem of technology, commerce, culture, and convenience, designed for the future.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          defaultValue: 'custom',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Email', value: 'email' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'linkType',
              type: 'select',
              required: true,
              defaultValue: 'custom',
              options: [
                { label: 'Custom URL', value: 'custom' },
                { label: 'Product Page', value: 'product' },
                { label: 'Job Page', value: 'job' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'custom',
              },
            },
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'product',
              },
            },
            {
              name: 'job',
              type: 'relationship',
              relationTo: 'jobs',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'job',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: true,
      defaultValue: '© 2026 HINEET TECH Private Limited. All rights reserved.',
    },
    {
      name: 'bottomLinks',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'linkType',
          type: 'select',
          required: true,
          defaultValue: 'custom',
          options: [
            { label: 'Custom URL', value: 'custom' },
            { label: 'Product Page', value: 'product' },
            { label: 'Job Page', value: 'job' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'custom',
          },
        },
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'product',
          },
        },
        {
          name: 'job',
          type: 'relationship',
          relationTo: 'jobs',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'job',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
