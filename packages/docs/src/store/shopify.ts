// Composables
import { useCosmic } from '@/composables/cosmic'

// Utilities
import { defineStore } from 'pinia'

// Types
export type State = {
  products: Product[]
}

export interface ProductRecord {
  metadata: {
    products: string
  }
}

export interface ProductImage {
  src: string
}

export interface Variant {
  price: string
  compareAtPrice: string
}

export interface Product {
  availableForSale: boolean
  handle: string
  id: string
  image: ProductImage
  images: ProductImage[]
  productType: string
  title: string
  variants: Variant[]
}

export const useShopifyStore = defineStore('shopify', {
  state: (): State => ({
    products: [],
  }),

  actions: {
    async fetch () {
      if (this.products.length) return

      const { bucket } = useCosmic<ProductRecord>(
        import.meta.env.VITE_COSMIC_BUCKET_SLUG_STORE,
        import.meta.env.VITE_COSMIC_BUCKET_READ_KEY_STORE,
      )

      const { objects = [] } = (
        await bucket?.objects
          .find({ type: 'products' })
          .props('slug,title,metadata')
          .sort('-created_at')
          .limit(1)
      ) || {}

      this.products = objects?.length
        ? JSON.parse(objects[0].metadata.products)
        : []
    },
  },
})
