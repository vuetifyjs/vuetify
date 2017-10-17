require('../../stylus/components/_input-groups.styl')
require('../../stylus/components/_selection-controls.styl')
require('../../stylus/components/_switch.styl')

import Rippleable from '../../mixins/rippleable'
import Selectable from '../../mixins/selectable'

export default {
  name: 'v-switch',

  mixins: [Rippleable, Selectable],

  computed: {
    classes () {
      const classes = {
        'input-group--selection-controls switch': true
      }

      if (this.hasError) {
        classes['error--text'] = true
      } else {
        return this.addTextColorClassChecks(classes)
      }

      return classes
    },
    rippleClasses () {
      return {
        'input-group--selection-controls__ripple': true,
        'input-group--selection-controls__ripple--active': this.isActive
      }
    },
    containerClasses () {
      return {
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--disabled': this.disabled
      }
    },
    toggleClasses () {
      return {
        'input-group--selection-controls__toggle': true,
        'input-group--selection-controls__toggle--active': this.isActive
      }
    }
  },

  render (h) {
    const container = h('div', {
      'class': this.containerClasses
    }, [
      h('div', { 'class': this.toggleClasses }),
      this.genRipple()
    ])

    return this.genInputGroup([container])
  }
}
