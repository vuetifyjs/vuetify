import Toggleable from '../../mixins/toggleable'
import { addOnceEventListener } from '../../util/helpers'

export default {
  name: 'menu',

  mixins: [Toggleable],

  data () {
    return {
      window: {},
      dimensions: {
        activator: {
          top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, offsetTop: 0
        },
        content: {
          top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0, offsetTop: 0
        },
        list: null,
        selected: null
      },
      direction: { vert: '', horiz: '' },
      position: { left: '0px', top: '0px', right: 'auto', bottom: 'auto' },
      isContentActive: false
    }
  },

  props: {
    top: Boolean,
    left: Boolean,
    bottom: Boolean,
    right: Boolean,
    auto: Boolean,
    offsetX: Boolean,
    offsetY: Boolean,
    openOnClick: {
      type: Boolean,
      default: true
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    origin: {
      type: String,
      default: 'top left'
    }
  },

  computed: {
    offset () {
      const { activator: a, content: c } = this.dimensions
      const { direction, offsetX, offsetY, offsetAuto: auto } = this

      const horiz = direction.horiz === 'left'
          ? offsetX ? a.left - c.right : a.right - c.right + auto.horiz
          : offsetX ? a.right - c.left : a.left - c.left + auto.horiz
      const vert = direction.vert === 'top'
          ? offsetY ? a.top - c.bottom : a.bottom - c.bottom + auto.vert
          : offsetY ? a.bottom - c.top : a.top - c.top + auto.vert

      return { horiz, vert }
    },

    offsetAuto () {
      return { horiz: 0, vert: 0 }
    },

    styles () {
      return {
        top: this.position.top,
        left: this.position.left,
        right: this.position.right,
        bottom: this.position.bottom
      }
    }
  },

  watch: {
    isActive (val) {
      if (val) {
        this.setDirection()
          .then(this.updatePosition)
          .then(() => (this.isContentActive = true))
      } else {
        this.isContentActive = false
      }
    }
  },

  mounted () {
    this.window = window
  },

  methods: {
    setDirection (horiz = '', vert = '') {
      this.direction = {
        horiz: horiz || (this.left && !this.auto ? 'left' : 'right'),
        vert: vert || (this.top && !this.auto ? 'top' : 'bottom')
      }

      // On every direction change, we must reset/reorientate position.
      this.position.top = this.direction.vert === 'top' ? 'auto' : '0px'
      this.position.left = this.direction.vert === 'left' ? 'auto' : '0px'
      this.position.bottom = this.direction.vert === 'bottom' ? 'auto' : '0px'
      this.position.right = this.direction.vert === 'right' ? 'auto' : '0px'

      return Promise.resolve()
    },

    updatePosition () {
      this.updateDimensions()
      return new Promise((resolve, reject) => {
        this.$nextTick(this.assignPosition)
        setTimeout(resolve, 0)
      })
    },

    assignPosition () {
      this.position.left = this.direction.horiz === 'left' ? 'auto' : `${this.offset.horiz}px`
      this.position.top = this.direction.vert === 'top' ? 'auto' : `${this.offset.vert}px`
      this.position.right = this.direction.horiz === 'right' ? 'auto' : `${-this.offset.horiz}px`
      this.position.bottom = this.direction.vert === 'bottom' ? 'auto' : `${-this.offset.vert}px`
    },

    updateDimensions () {
      this.$refs.content.style.display = 'inline-block'
      this.dimensions = {
        activator: this.$refs.activator.children
          ? this.measure(this.$refs.activator.children[0])
          : this.measure(this.$refs.activator),
        content: {},
        list: {},
        selected: {}
      }
      this.$refs.content.style.display = 'none'
    },

    genActivator (h) {
      const data = {
        ref: 'activator',
        slot: 'activator',
        class: {
          'menu__activator': true
        },
        on: {
          click: () => {
            if (this.openOnClick) this.isActive = !this.isActive
          }
        }
      }

      return h('div', data, [this.$slots.activator || null])
    },

    genTransition (h) {
      const data = {
        props: {
          origin: this.origin
        }
      }

      return h('v-menu-transition', data, [this.genContent(h)])
    },

    genContent (h) {
      const data = {
        ref: 'content',
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isContentActive
        }],
        'class': 'menu__content',
        on: {
          click: () => { if (this.closeOnClick) this.isActive = false }
        }
      }

      return h('div', data, [this.$slots.default])
    },

    // Utils
    // ====================

    measure (el, selector, getParent = false) {
      el = selector ? el.querySelector(selector) : el
      el = el && getParent ? el.parentElement : el

      if (!el) return null
      return Object.assign(el.getBoundingClientRect(), { offsetTop: el.offsetTop })
    }
  },

  render (h) {
    const data = {
      'class': {
        'menu': true
      },
      directives: [
        {
          name: 'click-outside'
        }
      ],
      on: {
        'keyup': e => { if (e.keyCode === 27) this.isActive = false }
      }
    }

    return h('div', data, [this.genActivator(h), this.genTransition(h)])
  }
}
