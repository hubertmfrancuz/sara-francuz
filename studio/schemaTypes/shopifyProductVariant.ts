import {defineType} from 'sanity'

export default defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  fields: [
    {
      name: 'store',
      title: 'Shopify data',
      type: 'object',
      description: 'Managed by Sanity Connect — do not edit manually',
      options: {collapsible: true, collapsed: false},
      fields: [
        {name: 'gid', type: 'string', title: 'GID'},
        {name: 'id', type: 'number', title: 'ID'},
        {name: 'title', type: 'string', title: 'Title'},
        {name: 'price', type: 'number', title: 'Price'},
        {name: 'compareAtPrice', type: 'number', title: 'Compare at price'},
        {name: 'sku', type: 'string', title: 'SKU'},
        {name: 'isDeleted', type: 'boolean', title: 'Is deleted'},
        {name: 'status', type: 'string', title: 'Status'},
        {name: 'createdAt', type: 'string', title: 'Created at'},
        {name: 'productId', type: 'number', title: 'Product ID'},
        {name: 'productGid', type: 'string', title: 'Product GID'},
        {name: 'option1', type: 'string', title: 'Option 1'},
        {name: 'option2', type: 'string', title: 'Option 2'},
        {name: 'option3', type: 'string', title: 'Option 3'},
        {
          name: 'inventory',
          type: 'object',
          title: 'Inventory',
          fields: [
            {name: 'isAvailable', type: 'boolean', title: 'Is available'},
            {name: 'policy', type: 'string', title: 'Policy'},
          ],
        },
        {
          name: 'shop',
          type: 'object',
          title: 'Shop',
          fields: [{name: 'domain', type: 'string', title: 'Domain'}],
        },
      ],
    },
  ],
  preview: {
    select: {
      gid: 'store.gid',
      title: 'store.title',
      price: 'store.price',
    },
    prepare({gid, title, price}) {
      return {
        title: title || gid || 'Variant',
        subtitle: price ? `${price} PLN` : '',
      }
    },
  },
})
