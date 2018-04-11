// Styles
import '../../stylus/components/_autocompletes.styl'

// Extensions
import VSelect from '../VSelect'

export default {
  name: 'v-autocomplete',

  extends: VSelect,

  props: {
    offsetY: {
      type: Boolean,
      default: true
    },
    nudgeTop: {
      type: [String, Number],
      default: -2
    },
    transition: {
      type: String,
      default: 'fade-transition'
    }
  },

  computed: {
    classes () {
      return Object.assign({}, VSelect.computed.classes.call(this), {
        'v-autocomplete': true
      })
    }
  },

  methods: {
    genSelections () {
      return this.multiple
        ? VSelect.methods.genSelections.call(this)
        : null
    },
    onClick () {}
  }
}
