import GenerateRouteLink from '../../mixins/route-link'
import Schemable from '../../mixins/schemable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'fab',

  mixins: [GenerateRouteLink, Schemable, Toggleable],

  provide: { isFab: true },

  data: () => ({
    changeTimeout: {},
    isChanging: false
  }),

  props: {
    absolute: Boolean,
    lateral: Boolean,
    listDirection: {
      type: String,
      default: 'top'
    },
    positionX: [Number, String],
    positionY: [Number, String],
    hidden: Boolean,
    hover: Boolean,
    top: Boolean,
    right: Boolean,
    bottom: Boolean,
    left: Boolean
  },

  computed: {
    classes () {
      return {
        'fab': true,
        'fab--absolute': this.absolute,
        'fab--hidden': this.hidden,
        'fab--hover': this.hover,
        'fab--is-active': this.isActive,
        'fab--is-changing': this.isChanging,
        'fab--top': this.top,
        'fab--right': this.right,
        'fab--bottom': this.bottom,
        'fab--left': this.left,
        [`fab--list-${this.listDirection}`]: this.listDirection
      }
    }
  },

  methods: {
    genContent () {
      return this.$createElement('div', {
        'class': 'fab__activator'
      }, this.$slots.activator
        ? this.$slots.activator
        : this.$slots.default
      )
    },
    genDial () {
      if (!this.$slots.activator) return

      return this.$createElement('div', {
        'class': 'fab__speed-dial'
      }, this.$slots.default)
    },
    toggle () {
      this.isActive = !this.isActive
    }
  },

  render (h) {
    const data = {
      'class': this.classes
    }

    if (this.hover) {
      data.on = {
        mouseover: () => (this.isActive = true),
        mouseout: () => (this.isActive = false)
      }
    } else {
      data.on = {
        click: this.toggle
      }

      data.directives = [{
        name: 'click-outside'
      }]
    }

    return h('div', data, [
      this.genDial(),
      this.genContent()
    ])
  }
}
