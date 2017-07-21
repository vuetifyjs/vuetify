  import ButtonGroup from '~mixins/button-group'

  export default {
    name: 'v-bottom-nav',

    mixins: [ButtonGroup],

    props: {
      absolute: Boolean,
      shift: Boolean,
      value: {
        type: Boolean,
        default: false
      },
      active: [Number, String]
    },

    watch: {
      active () {
        this.update()
      }
    },

    computed: {
      classes () {
        return {
          'bottom-nav': true,
          'bottom-nav--absolute': this.absolute,
          'bottom-nav--shift': this.shift,
          'bottom-nav--active': this.value
        }
      }
    },

    methods: {
      isSelected (i) {
        const item = this.getValue(i)
        return this.active === item
      },
      updateValue (i) {
        const item = this.getValue(i)
        return this.$emit('update:active', item)
      }
    },

    render (h) {
      return h('div', {
        class: this.classes
      }, this.$slots.default)
    }
  }
