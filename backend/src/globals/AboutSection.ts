import type { GlobalConfig } from 'payload'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
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
      name: 'visionHeading',
      type: 'text',
      required: true,
      defaultValue: 'Our vision',
    },
    {
      name: 'visionDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'missionHeading',
      type: 'text',
      required: true,
      defaultValue: 'Our mission',
    },
    {
      name: 'missionDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'visionImage',
      type: 'upload',
      relationTo: 'media',
      required: false, // fallback to hardcoded if not uploaded
    },
    {
      name: 'cultureHeading',
      type: 'text',
      required: true,
      defaultValue: 'Working at Hineet',
    },
    {
      name: 'cultureDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'cultureButtonText',
      type: 'text',
      required: true,
      defaultValue: 'Learn more about our culture',
    },
    {
      name: 'cultureButtonLink',
      type: 'text',
      required: true,
      defaultValue: '/culture',
    },
    {
      name: 'cultureImage',
      type: 'upload',
      relationTo: 'media',
      required: false, // fallback to hardcoded if not uploaded
    },
  ],
}
