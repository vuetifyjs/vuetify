<script>
  import Contextualable from '../../mixins/contextualable'
  import Positionable from '../../mixins/positionable'
  import GenerateRouteLink from '../../mixins/route-link'
  import Themeable from '../../mixins/themeable'
  import { factory as ToggleableFactory } from '../../mixins/toggleable'

  export default {
    name: 'v-btn',

    mixins: [
      Contextualable,
      GenerateRouteLink,
      Positionable,
      Themeable,
      ToggleableFactory('inputValue')
    ],

    props: {
      activeClass: {
        type: String,
        default: 'btn--active'
      },
      block: Boolean,
      fab: Boolean,
      flat: Boolean,
      icon: Boolean,
      large: Boolean,
      loading: Boolean,
      outline: Boolean,
      ripple: {
        type: [Boolean, Object],
        default: true
      },
      round: Boolean,
      small: Boolean,
      tag: {
        type: String,
        default: 'button'
      },
      type: {
        type: String,
        default: 'button'
      },
      value: null
    },

    computed: {
      classes () {
        return {
          'btn': true,
          'btn--active': this.isActive,
          'btn--absolute': this.absolute,
          'btn--block': this.block,
          'btn--bottom': this.bottom,
          'btn--disabled': this.disabled,
          'btn--flat': this.flat,
          'btn--floating': this.fab,
          'btn--fixed': this.fixed,
          'btn--hover': this.hover,
          'btn--icon': this.icon,
          'btn--large': this.large,
          'btn--left': this.left,
          'btn--loader': this.loading,
          'btn--outline': this.outline,
          'btn--raised': !this.flat,
          'btn--right': this.right,
          'btn--round': this.round,
          'btn--small': this.small,
          'btn--top': this.top,
          'primary': this.primary && !this.outline && !this.flat,
          'secondary': this.secondary && !this.outline && !this.flat,
          'success': this.success && !this.outline && !this.flat,
          'info': this.info && !this.outline && !this.flat,
          'warning': this.warning && !this.outline && !this.flat,
          'error': this.error && !this.outline && !this.flat,
          'primary--text': !this.disabled && this.primary && (this.outline || this.flat),
          'secondary--text': !this.disabled && this.secondary && (this.outline || this.flat),
          'success--text': !this.disabled && this.success && (this.outline || this.flat),
          'info--text': !this.disabled && this.info && (this.outline || this.flat),
          'warning--text': !this.disabled && this.warning && (this.outline || this.flat),
          'error--text': !this.disabled && this.error && (this.outline || this.flat),
          ...this.themeClasses
        }
      }
    },

    methods: {
      // Prevent focus to match md spec
      click (e) {
        !this.fab &&
          e.detail &&
          this.$el.blur()

        this.$emit('click', e)
      },
      genContent () {
        return this.$createElement(
          'div',
          { 'class': 'btn__content' },
          [this.$slots.default]
        )
      },
      genLoader () {
        const children = []

        if (!this.$slots.loader) {
          children.push(this.$createElement('v-progress-circular', {
            props: {
              indeterminate: true,
              size: 26
            }
          }))
        } else {
          children.push(this.$slots.loader)
        }

        return this.$createElement('span', { 'class': 'btn__loading' }, children)
      }
    },

    render (h) {
      const { tag, data } = this.generateRouteLink()
      const children = [this.genContent()]

      tag === 'button' && (data.attrs.type = this.type)
      this.loading && children.push(this.genLoader())

      data.attrs.value = ['string', 'number'].includes(typeof this.value)
        ? this.value
        : JSON.stringify(this.value)

      return h(tag, data, children)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_buttons.styl"></style>
