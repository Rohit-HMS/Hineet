import type { GlobalConfig } from 'payload'
import { getFrontendUrl } from '../utils/getFrontendUrl'

export const ProductsPage: GlobalConfig = {
  slug: 'products-page',
  admin: {
    livePreview: {
      url: () => `${getFrontendUrl()}/products`,
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
