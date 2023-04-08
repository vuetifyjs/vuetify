// Composables
import { useCosmic } from '@/composables/cosmic'

// Utilities
import { defineStore } from 'pinia'

// Types
interface Image {
  src: string
  altText: string | null
}

interface VariantOption {
  name: string
  value: string
}

interface Variant {
  id: string
  title: string
  price: string
  available: boolean
  selectedOptions: VariantOption[]
}

interface Product {
  id: string
  title: string
  description: string
  images: Image[]
  options: unknown[] // type of options not provided in given JSON data
  variants: Variant[]
  vendor: string
  productType: string
  onlineStoreUrl: string
}

export type State = {
  products: Product[]
}

export const useShopifyStore = defineStore('shopify', {
  state: (): State => ({
    products: [],
  }),

  actions: {
    async fetch () {
      if (this.products.length) return

      const { bucket } = useCosmic<any>(
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
