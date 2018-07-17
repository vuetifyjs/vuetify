import '../../stylus/components/_selection-controls.styl'
import '../../stylus/components/_switch.styl'

// Mixins
import Selectable from '../../mixins/selectable'

// Directives
import Touch from '../../directives/touch'

/* @vue/component */
export default {
  name: 'v-switch',

  directives: { Touch },

  mixins: [
    Selectable
  ],

  computed: {
    classes () {
      return {
        'v-input--selection-controls v-input--switch': true
      }
    }
  },

  methods: {
    genDefaultSlot () {
      return [
        this.genSwitch(),
        this.genLabel()
      ]
    },
    genSwitch () {
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input'
      }, [
        this.genInput('checkbox', this.$attrs),
        !this.disabled && this.genRipple({
          'class': this.classesSelectable,
          directives: [{
            name: 'touch',
            value: {
              left: this.onSwipeLeft,
              right: this.onSwipeRight
            }
          }]
        }),
        this.genSwitchPart('track'),
        this.genSwitchPart('thumb')
      ])
    },
    // Switches have default colors for thumb/track
    // that do not tie into theme colors
    // this avoids a visual issue where
    // the color takes too long to transition
    genSwitchPart (target) {
      return this.$createElement('div', {
        staticClass: `v-input--switch__${target}`,
        'class': {
          ...this.classesSelectable,
          ...this.themeClasses
        },
        // Avoid cache collision
        key: target
      })
    },
    onSwipeLeft () {
      if (this.isActive) this.onChange()
    },
    onSwipeRight () {
      if (!this.isActive) this.onChange()
    }
  }
}
