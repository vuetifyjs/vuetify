// Styles
import './VBtnToggle.sass'

// Mixins
import ButtonGroup from '../../mixins/button-group'
import Colorable from '../../mixins/colorable'

// Utilities
import mixins from '../../util/mixins'

/* @vue/component */
export default mixins(
  ButtonGroup,
  Colorable
).extend({
  name: 'v-btn-toggle',

  props: {
    rounded: Boolean,
  },

  computed: {
    classes (): object {
      return {
        ...ButtonGroup.options.computed.classes.call(this),
        'v-btn-toggle': true,
        'v-btn-toggle--rounded': this.rounded,
        ...this.themeClasses,
      }
    },
  },

  methods: {
    genData () {
      return this.setTextColor(this.color, {
        ...ButtonGroup.options.methods.genData.call(this),
      })
    },
  },
})
