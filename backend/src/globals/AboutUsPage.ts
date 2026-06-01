import type { GlobalConfig } from 'payload'
import { getFrontendUrl } from '../utils/getFrontendUrl'

export const AboutUsPage: GlobalConfig = {
  slug: 'about-us-page',
  admin: {
    livePreview: {
      url: () => `${getFrontendUrl()}/about-us`,
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
      defaultValue: 'Building Smarter Business Solutions.',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Hineet Tech is a product-based technology company focused on building scalable digital solutions that help businesses automate operations, improve customer communication, and grow faster with AI-powered technology.',
    },
    {
      name: 'servicesSectionTitle',
      type: 'text',
      required: true,
      defaultValue: 'What We Offer',
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'desc',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'layout-grid',
          options: [
            { label: 'Layout Grid (ERP)', value: 'layout-grid' },
            { label: 'Message Square (CRM)', value: 'message-square' },
            { label: 'Bot (AI Chat)', value: 'bot' },
            { label: 'Phone Call (AI Voice)', value: 'phone-call' },
            { label: 'Workflow (Automation)', value: 'workflow' },
            { label: 'Sparkles', value: 'sparkles' },
          ],
        },
      ],
    },
    {
      name: 'whyChooseUsTitle',
      type: 'text',
      required: true,
      defaultValue: 'Why Choose Us',
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'sparkles',
          options: [
            { label: 'Sparkles', value: 'sparkles' },
            { label: 'Gauge (Performance)', value: 'gauge' },
            { label: 'Circle User', value: 'circle-user' },
            { label: 'Headset (Support)', value: 'headset' },
            { label: 'Shield Check (Secure)', value: 'shield-check' },
          ],
        },
      ],
    },
    {
      name: 'bottomStatement',
      type: 'textarea',
      required: true,
      defaultValue: 'At Hineet Tech, we believe technology should make business simpler, faster, and more efficient.',
    },
  ],
}
