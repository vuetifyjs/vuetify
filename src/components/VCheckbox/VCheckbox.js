require('../../stylus/components/_input-groups.styl')
require('../../stylus/components/_selection-controls.styl')

import VIcon from '../VIcon'
import { VFadeTransition } from '../transitions'
import Rippleable from '../../mixins/rippleable'
import Selectable from '../../mixins/selectable'

export default {
  name: 'v-checkbox',

  components: {
    VFadeTransition,
    VIcon
  },

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
        return 'indeterminate_check_box'
      } else if (this.isActive) {
        return 'check_box'
      } else {
        return 'check_box_outline_blank'
      }
    }
  },

  methods: {
    groupFocus (e) {
      this.isFocused = true
      this.$emit('focus', e)
    },
    groupBlur (e) {
      this.isFocused = false
      this.tabFocused = false
      this.$emit('blur', this.inputValue)
    }
  },

  render (h) {
    const transition = h('v-fade-transition', [
      h('v-icon', {
        staticClass: 'icon--selection-control',
        'class': {
          'icon--checkbox': this.icon === 'check_box'
        },
        key: this.icon
      }, this.icon)
    ])

    const data = {
      attrs: {
        tabindex: this.disabled
          ? -1
          : this.internalTabIndex || this.tabindex,
        role: 'checkbox',
        'aria-checked': this.inputIndeterminate && 'mixed' || this.isActive && 'true' || 'false',
        'aria-label': this.label
      }
    }

    return this.genInputGroup([transition, this.genRipple()], data)
  }
}
