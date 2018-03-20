// Styles
import '../../stylus/components/_input-groups.styl'
import '../../stylus/components/_selection-controls.styl'

// Components
import VIcon from '../VIcon'
// import { VFadeTransition } from '../transitions'

// Mixins
import Rippleable from '../../mixins/rippleable'
import Selectable from '../../mixins/selectable'

export default {
  name: 'v-checkbox',

  mixins: [
    Rippleable,
    Selectable
  ],

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
      return {
        'v-input--selection-controls': true,
        'v-input--checkbox': true
      }
    },
    computedIcon () {
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
    // groupFocus (e) {
    //   this.isFocused = true
    //   this.$emit('focus', e)
    // },
    // groupBlur (e) {
    //   this.isFocused = false
    //   this.tabFocused = false
    //   this.$emit('blur', this.inputValue)
    // }
    genCheckbox () {
      // Switches have default colors for thumb/track
      // that do not tie into theme colors
      // this avoids a visual issue where
      // the color takes too long to transition
      const classes = this.isActive
        ? this.addTextColorClassChecks({}, this.color)
        : null

      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input'
      }, [
        this.genInput(),
        this.genRipple({
          'class': classes,
          directives: [{
            name: 'touch',
            value: {
              left: this.onSwipeLeft,
              right: this.onSwipeRight
            }
          }]
        }),
        this.$createElement(VIcon, {
          props: {
            color: this.isActive ? this.color : ''
          }
        }, this.computedIcon)
      ])
    },
    genDefaultSlot () {
      return [
        this.genCheckbox(),
        this.genLabel()
      ]
    },
    genInput () {
      return this.$createElement('input', {
        attrs: {
          type: 'checkbox',
          value: this.inputValue
        },
        on: {
          blur: this.onBlur,
          change: this.toggle, // TODO: change this name
          focus: this.onFocus
        }
      })
    }
  }

  // render (h) {
  //   const transition = h(VFadeTransition, [
  //     h(VIcon, {
  //       staticClass: 'icon--selection-control',
  //       'class': {
  //         'icon--checkbox': this.icon === 'check_box'
  //       },
  //       key: this.icon,
  //       on: Object.assign({
  //         click: this.toggle
  //       }, this.$listeners)
  //     }, this.icon)
  //   ])

  //   const data = {
  //     attrs: {
  //       tabindex: this.disabled
  //         ? -1
  //         : this.internalTabIndex || this.tabindex,
  //       role: 'checkbox',
  //       'aria-checked': this.inputIndeterminate ? 'mixed' : (this.isActive ? 'true' : 'false'),
  //       'aria-label': this.label
  //     }
  //   }

  //   const ripple = this.ripple ? this.genRipple() : null

  //   return this.genInputGroup([transition, ripple], data)
  // }
}
