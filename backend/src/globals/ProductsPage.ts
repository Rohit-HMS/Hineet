import type { GlobalConfig } from 'payload'

export const ProductsPage: GlobalConfig = {
  slug: 'products-page',
  admin: {
    livePreview: {
      url: () => 'http://localhost:3000/products',
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
      defaultValue: 'OUR PRODUCTS',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'One Platform *Endless Possibilities.*',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Innovative software solutions that simplify workflows, enhance productivity, and scale with your business.',
    },
  ],
}
