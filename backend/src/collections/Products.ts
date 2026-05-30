import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    livePreview: {
      url: (doc) => {
        if (doc?.slug) {
          return `http://localhost:3000/products/${doc.slug}`;
        }
        return 'http://localhost:3000/products';
      }
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'URL of the product image',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
    {
      name: 'idealFor',
      type: 'array',
      fields: [
        {
          name: 'audience',
          type: 'text',
        },
      ],
    },

    {
      name: 'paymentOptions',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'monthlyPrice',
          type: 'text',
        },
        {
          name: 'yearlyPrice',
          type: 'text',
        },
        {
          name: 'monthlyFeatures',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
        {
          name: 'yearlyFeatures',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
        {
          name: 'yearlyBonus',
          type: 'text',
        },
        {
          name: 'isCustomise',
          type: 'checkbox',
        },
      ],
    },
  ],
}
