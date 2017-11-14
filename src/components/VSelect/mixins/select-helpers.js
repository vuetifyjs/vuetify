// Helpers
import { getObjectValueByPath } from '../../../util/helpers'

/**
 * Select helpers
 *
 * @mixin
 *
 * Helper methods for the
 * v-select component
 */
export default {
  methods: {
    getText (item) {
      return this.getPropertyFromItem(item, this.itemText)
    },
    getValue (item) {
      return this.getPropertyFromItem(item, this.itemValue)
    },
    getPropertyFromItem (item, field) {
      if (item !== Object(item)) return item

      const value = getObjectValueByPath(item, field)

      return typeof value === 'undefined' ? item : value
    },
    compareObjects (a, b) {
      const aProps = Object.keys(a)
      const bProps = Object.keys(b)

      if (aProps.length !== bProps.length) return false

      for (let i = 0, length = aProps.length; i < length; i++) {
        const propName = aProps[i]

        if (a[propName] !== b[propName]) return false
      }

      return true
    }
  }
}
