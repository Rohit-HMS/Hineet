import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  admin: {
    livePreview: {
      url: () => 'http://localhost:3000/contact',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: "Let's Connect.",
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: "Have a question, partnership proposal, or just want to say hi? We'd love to hear from you.",
    },
    {
      name: 'contactInfo',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'textarea',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'mail',
          options: [
            { label: 'Map Pin (Address)', value: 'map-pin' },
            { label: 'Mail (Email)', value: 'mail' },
            { label: 'Phone', value: 'phone' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
      ],
    },
    {
      name: 'formTitle',
      type: 'text',
      required: true,
      defaultValue: 'Send us a message',
    },
  ],
}
