interface Product {
  href: string
  title: string
  src: string
  price: number
}

interface Vendor {
  name: string
  products: Product[]
}

export type State = {
  vendors: Vendor[]
}

export const useShopifyStore = defineStore('vendors', {
  state: (): State => ({
    vendors: [],
  }),

  actions: {
    async fetch () {
      if (this.vendors.length) return

      const { bucket } = useCosmic()

      const { objects = [] } = (
        await bucket?.objects
          .find({ type: 'vendors' })
          .props('metadata')
          .sort('created_at')
      ) || {}

      if (objects?.length) {
        this.vendors = objects[0].metadata.vendors
      }
    },
  },

  getters: {
    byVendor: state => {
      return state.vendors.reduce((acc, vendor) => {
        acc[vendor.name] = vendor
        return acc
      }, {} as Record<string, Vendor>)
    },
  },
})
