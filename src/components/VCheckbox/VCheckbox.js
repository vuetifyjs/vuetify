import '../../stylus/components/_input-groups.styl'
import '../../stylus/components/_selection-controls.styl'

import VIcon from '../VIcon'
import { VFadeTransition } from '../transitions'
import Rippleable from '../../mixins/rippleable'
import Selectable from '../../mixins/selectable'

export default {
  name: 'v-checkbox',

  mixins: [Rippleable, Selectable],

  data () {
    return {
      inputIndeterminate: this.indeterminate
    }
  },

  props: {
    indeterminate: Boolean
  },

  computed: {
    classes () {
      const classes = {
        'checkbox': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive
      }

      if (this.hasError) {
        classes['error--text'] = true
      } else {
        return this.addTextColorClassChecks(classes)
      }

      return classes
    },
    icon () {
      if (this.inputIndeterminate) {
        return '$vuetify.icons.checkboxIndeterminate'
      } else if (this.isActive) {
        return '$vuetify.icons.checkboxOn'
      } else {
        return '$vuetify.icons.checkboxOff'
      }
    }
  },

  methods: {
    groupFocus (e) {
      this.isFocused = true
      this.$emit('focus', e)
    },
    groupBlur () {
      this.isFocused = false
      this.tabFocused = false
      this.$emit('blur', this.inputValue)
    }
  },

  render (h) {
    const transition = h(VFadeTransition, [
      h(VIcon, {
        staticClass: 'icon--selection-control',
        'class': {
          'icon--checkbox': this.icon === '$vuetify.icons.checkboxOn'
        },
        key: this.icon,
        on: Object.assign({
          click: this.toggle
        }, this.$listeners)
      }, this.icon)
    ])

    const data = {
      attrs: {
        tabindex: this.disabled
          ? -1
          : this.internalTabIndex || this.tabindex,
        role: 'checkbox',
        'aria-checked': this.inputIndeterminate ? 'mixed' : (this.isActive ? 'true' : 'false'),
        'aria-label': this.label
      }
    }

    const ripple = this.ripple ? this.genRipple() : null

    return this.genInputGroup([transition, ripple], data)
  }
}
