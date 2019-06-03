// Styles
import '../../styles/components/_selection-controls.sass'

// Components
import VIcon from '../VIcon'

// Mixins
import Selectable from '../../mixins/selectable'

/* @vue/component */
export default Selectable.extend({
  name: 'v-checkbox',

  props: {
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$vuetify.icons.checkboxIndeterminate',
    },
    onIcon: {
      type: String,
      default: '$vuetify.icons.checkboxOn',
    },
    offIcon: {
      type: String,
      default: '$vuetify.icons.checkboxOff',
    },
  },

  data () {
    return {
      inputIndeterminate: this.indeterminate,
    }
  },

  computed: {
    classes (): object {
      return {
        'v-input--selection-controls': true,
        'v-input--checkbox': true,
      }
    },
    computedIcon (): string {
      if (this.inputIndeterminate) {
        return this.indeterminateIcon
      } else if (this.isActive) {
        return this.onIcon
      } else {
        return this.offIcon
      }
    },
  },

  watch: {
    indeterminate (val) {
      this.inputIndeterminate = val
    },
  },

  methods: {
    genCheckbox () {
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input',
      }, [
        this.genInput('checkbox', {
          ...this.$attrs,
          'aria-checked': this.inputIndeterminate
            ? 'mixed'
            : this.isActive.toString(),
        }),
        this.genRipple(this.setTextColor(this.computedColor)),
        this.$createElement(VIcon, this.setTextColor(this.computedColor, {
          props: {
            dark: this.dark,
            light: this.light,
          },
        }), this.computedIcon),
      ])
    },
    genDefaultSlot () {
      return [
        this.genCheckbox(),
        this.genLabel(),
      ]
    },
  },
})
