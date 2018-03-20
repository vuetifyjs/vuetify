import '../../stylus/components/_input-groups.styl'
import '../../stylus/components/_selection-controls.styl'
import '../../stylus/components/_switch.styl'

// Mixins
import Rippleable from '../../mixins/rippleable'
import Selectable from '../../mixins/selectable'

// Directives
import Touch from '../../directives/touch'

export default {
  name: 'v-switch',

  mixins: [
    Rippleable,
    Selectable
  ],

  directives: { Touch },

  computed: {
    classes () {
      return {
        'v-input--selection-controls': true,
        'v-input--switch': true
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
    genInput () {
      return this.$createElement('input', {
        attrs: {
          type: 'hidden',
          value: this.inputValue
        }
      })
    },
    genSwitch () {
      // Switches have default colors for thumb/track
      // that do not tie into theme colors
      // this avoids a visual issue where
      // the color takes too long to transition
      const classes = this.isActive
        ? this.addTextColorClassChecks({}, this.color)
        : null

      return this.$createElement('div', {
        staticClass: 'v-input--switch__switch'
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
        this.$createElement('div', {
          staticClass: 'v-input--switch__track',
          'class': classes
        }),
        this.$createElement('div', {
          staticClass: 'v-input--switch__thumb',
          'class': classes
        })
      ])
    },
    onSwipeLeft () {
      if (this.isActive) this.toggle()
    },
    onSwipeRight () {
      if (!this.isActive) this.toggle()
    }
  }
}
