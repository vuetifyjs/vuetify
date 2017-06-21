import Contextualable from '../../mixins/contextualable'
import FAB from './mixins/fab'
import GenerateRouteLink from '../../mixins/route-link'
import Schemable from '../../mixins/schemable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'btn',

  mixins: [Contextualable, FAB, GenerateRouteLink, Schemable, Toggleable],

  props: {
    activeClass: {
      type: String,
      default: 'btn--active'
    },
    block: Boolean,
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
    }
  },

  computed: {
    classes () {
      return {
        'btn': true,
        'btn--absolute': this.absolute,
        'btn--active': this.isActive,
        'btn--block': this.block,
        'btn--bottom': this.bottom,
        'btn--flat': this.flat,
        'btn--floating': this.fab,
        'btn--fixed': this.fixed,
        'btn--hidden': this.hidden,
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
        'dark--text dark--bg': this.dark,
        'light--text light--bg': this.light,
        'primary': this.primary && !this.outline,
        'secondary': this.secondary && !this.outline,
        'success': this.success && !this.outline,
        'info': this.info && !this.outline,
        'warning': this.warning && !this.outline,
        'error': this.error && !this.outline,
        'primary--text': this.primary && (this.outline || this.flat),
        'secondary--text': this.secondary && (this.outline || this.flat),
        'success--text': this.success && (this.outline || this.flat),
        'info--text': this.info && (this.outline || this.flat),
        'warning--text': this.warning && (this.outline || this.flat),
        'error--text': this.error && (this.outline || this.flat)
      }
    }
  },

  methods: {
    // Prevent focus to match md spec
    click () {
      !this.fab && this.$el.blur()
    },
    genContent () {
      return this.$createElement('div', { 'class': 'btn__content' }, [this.$slots.default])
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

    return h(tag, data, children)
  }
}
