<script>
  import { VFadeTransition } from '../transitions'
  import Input from '../../mixins/input'
  import Colorable from '../../mixins/colorable'

  import Ripple from '../../directives/ripple'

  export default {
    name: 'radio',

    components: {
      VFadeTransition
    },

    mixins: [Input, Colorable],

    directives: { Ripple },

    model: {
      prop: 'inputValue',
      event: 'change'
    },

    props: {
      inputValue: [String, Number]
    },

    computed: {
      isActive () {
        return this.inputValue === this.value
      },
      classes () {
        return this.addColorClassChecks({
          'radio': true,
          'input-group--selection-controls': true,
          'input-group--active': this.isActive
        })
      },

      icon () {
        return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked'
      }
    },

    methods: {
      genLabel () {
        return this.$createElement('label', {
          on: { click: this.toggle }
        }, this.label)
      },
      toggle () {
        if (!this.disabled) {
          this.$emit('change', this.value)
        }
      }
    },

    render (h) {
      const transition = h('v-fade-transition', {}, [
        h('v-icon', {
          'class': {
            'icon--radio': this.isActive
          },
          key: this.icon
        }, this.icon)
      ])

      const ripple = h('div', {
        'class': 'input-group--selection-controls__ripple',
        on: Object.assign({}, {
          click: this.toggle
        }, this.$listeners),
        directives: [
          {
            name: 'ripple',
            value: { center: true }
          }
        ]
      })

      return this.genInputGroup([transition, ripple])
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_radio.styl"></style>
