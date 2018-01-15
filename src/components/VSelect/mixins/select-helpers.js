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
      if (item !== Object(item)) return item
      return this.getPropertyFromItem(item, this.itemText, item)
    },
    getValue (item) {

      return this.getPropertyFromItem(item, this.itemValue, item)
    },
    getDisabled(item) {
      return this.getPropertyFromItem(item, this.itemDisabled, false)
    },
    getAvatar(item) {
      return this.getPropertyFromItem(item, this.itemAvatar)
    },
    getPropertyFromItem (item, field, fallback) {
      const value = typeof field === 'function'
        ? field(item)
        : getObjectValueByPath(item, field)

      return typeof value === 'undefined' ? fallback : value
    }
  }
}
