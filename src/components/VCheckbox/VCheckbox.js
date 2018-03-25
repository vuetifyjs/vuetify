// Styles
import '../../stylus/components/_input-groups.styl'
import '../../stylus/components/_selection-controls.styl'

// Components
import VIcon from '../VIcon'
// import { VFadeTransition } from '../transitions'

// Mixins
import Selectable from '../../mixins/selectable'

export default {
  name: 'v-checkbox',

  mixins: [
    Selectable
  ],

  data: vm => ({
    inputIndeterminate: vm.indeterminate
  }),

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

  watch: {
    indeterminate (val) {
      this.inputIndeterminate = val
    }
  },

  methods: {
    genCheckbox () {
      return this.$createElement('div', {
        staticClass: 'v-input--selection-controls__input'
      }, [
        this.genInput('checkbox', {
          'aria-checked': this.inputIndeterminate
            ? 'mixed'
            : this.isActive.toString()
        }),
        this.genRipple({
          'class': this.classesSelectable
        }),
        this.$createElement(VIcon, {
          'class': this.classesSelectable
        }, this.computedIcon)
      ])
    },
    genDefaultSlot () {
      return [
        this.genCheckbox(),
        this.genLabel()
      ]
    }
  }
}
