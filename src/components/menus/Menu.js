import Toggleable from '../../mixins/toggleable'

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
      if (val) this.activate()
      else this.isContentActive = false
    }
  },

  methods: {
    activate () {
      this.window = window
      this.setDirection()
      this.$nextTick(() => { this.updatePosition() })
      setTimeout(() => { this.isContentActive = true }, 50)
    },

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
    },

    updatePosition () {
      this.updateDimensions()

      const { horiz, vert } = this.direction
      const { offset } = this

      this.position.left = horiz === 'left' ? 'auto' : `${offset.horiz}px`
      this.position.top = vert === 'top' ? 'auto' : `${offset.vert}px`
      this.position.right = horiz === 'right' ? 'auto' : `${-offset.horiz}px`
      this.position.bottom = vert === 'bottom' ? 'auto' : `${-offset.vert}px`
    },

    updateDimensions () {
      this.sneakPeek()
      const { activator: a, content: c } = this.$refs

      this.dimensions = {
        'activator': a.children ? this.measure(a.children[0]) : this.measure(a),
        'content': this.measure(c),
        'list': this.measure(c, '.list'),
        'selected': this.measure(c, '.list__tile--active', 'parent')
      }
      this.sneakPeek(false)
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
          name: 'menu-transition',
          origin: this.origin
        },
        on: {
          // 'before-enter': () => { this.beforeEnter() }
          // 'enter': (el, done) => { this.enter() }
        }
      }

      return h('transition', data, [this.genContent(h)])
    },

    genContent (h) {
      const data = {
        ref: 'content',
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isContentActive
        }],
        'class': { 'menu__content': true },
        on: {
          click: () => { if (this.closeOnClick) this.isActive = false }
        }
      }

      return h('div', data, [this.$slots.default])
    },

    beforeEnter () {

    },

    enter (el, done) {

    },

    // Utils
    // ====================

    measure (el, selector, getParent = false) {
      el = selector ? el.querySelector(selector) : el
      el = el && getParent ? el.parentElement : el

      if (!el) return null
      const { top, left, bottom, right, width, height } = el.getBoundingClientRect()
      return { top, left, bottom, right, width, height, offsetTop: el.offsetTop }
    },

    sneakPeek (on = true) {
      if (on) {
        // this.$refs.content.style.opacity = 0
        this.$refs.content.style.display = 'inline-block'
      } else {
        this.$refs.content.style.display = 'none'
        // this.$refs.content.style.opacity = null
      }
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
