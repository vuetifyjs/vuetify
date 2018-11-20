import { isOnSale } from '@/util/helpers'

export default {
  storeSale: state => {
    let totalOnSale = 0

    for (const product of state.products) {
      if (isOnSale(product.variants)) totalOnSale++
    }

    if (totalOnSale > 4) {
      return 'mdi-tag-multiple'
    } else if (totalOnSale > 2) {
      return 'mdi-tag'
    } else if (totalOnSale) {
      return 'mdi-tag-outline'
    } else return false
  }
}
