<script>
  import VIcon from '../VIcon'
  import { VFadeTransition } from '../transitions'
  import Selectable from '../../mixins/selectable'
  import Ripple from '../../directives/ripple'

  export default {
    name: 'v-checkbox',

    components: {
      VFadeTransition,
      VIcon
    },

    directives: {
      Ripple
    },

    mixins: [Selectable],

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
        return this.addColorClassChecks({
          'checkbox': true,
          'input-group--selection-controls': true,
          'input-group--active': this.isActive
        })
      },
      icon () {
        if (this.inputIndeterminate) {
          return 'indeterminate_check_box'
        } else if (this.isActive) {
          return 'check_box'
        } else {
          return 'check_box_outline_blank'
        }
      }
    },

    methods: {
      groupFocus (e) {
        this.isFocused = true
        this.$emit('focus', e)
      },
      groupBlur (e) {
        this.isFocused = false
        this.tabFocused = false
        this.$emit('blur', this.inputValue)
      }
    },

    render (h) {
      const transition = h('v-fade-transition', [
        h('v-icon', {
          'class': {
            'icon--checkbox': this.icon === 'check_box'
          },
          key: this.icon
        }, this.icon)
      ])

      const ripple = h('div', {
        'class': 'input-group--selection-controls__ripple',
        on: Object.assign({}, {
          click: this.toggle
        }, this.$listeners),
        directives: [{
          name: 'ripple',
          value: { center: true }
        }]
      })

      const data = {
        attrs: {
          tabindex: this.disabled
            ? -1
            : this.internalTabIndex || this.tabindex,
          role: 'checkbox',
          'aria-checked': this.inputIndeterminate && 'mixed' || this.isActive && 'true' || 'false',
          'aria-label': this.label
        }
      }

      return this.genInputGroup([transition, ripple], data)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_input-groups.styl"></style>
<style lang="stylus" src="../../stylus/components/_selection-controls.styl"></style>
