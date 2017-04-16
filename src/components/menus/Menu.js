import Toggleable from '../../mixins/toggleable'
import { debounce } from '../../util/helpers'

export default {
  name: 'menu',

  mixins: [Toggleable],

  data () {
    return {
      window: {},
      windowResizeHandler: () => {},
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
      direction: { vert: 'bottom', horiz: 'right' },
      position: { left: '0px', top: '0px', right: 'auto', bottom: 'auto' },
      isContentActive: false,
      isBooted: false,
      maxHeightAutoDefault: '200px'
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
    disabled: Boolean,
    maxHeight: {
      default: null
    },
    nudgeXAuto: {
      type: Number,
      default: -16
    },
    nudgeYAuto: {
      type: Number,
      default: -18
    },
    nudgeTop: {
      type: Number,
      default: 0
    },
    nudgeBottom: {
      type: Number,
      default: 0
    },
    nudgeLeft: {
      type: Number,
      default: 0
    },
    nudgeRight: {
      type: Number,
      default: 0
    },
    nudgeWidth: {
      type: Number,
      default: 0
    },
    openOnClick: {
      type: Boolean,
      default: true
    },
    lazy: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    activator: {
      default: null
    },
    activatorXY: {
      default: null
    },
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: String,
      default: 'v-menu-transition'
    }
  },

  computed: {
    offset () {
      const { activator: a, content: c } = this.dimensions
      const { direction, offsetX, offsetY, offsetAuto: auto } = this
      const { nudgeTop: nt, nudgeBottom: nb, nudgeRight: nr, nudgeLeft: nl } = this

      const horiz = direction.horiz === 'left'
          ? offsetX ? a.left - c.right + nl : a.right - c.right + auto.horiz
          : offsetX ? a.right - c.left + nr : a.left - c.left + auto.horiz
      const vert = direction.vert === 'top'
          ? offsetY ? a.top - c.bottom + nt : a.bottom - c.bottom + auto.vert
          : offsetY ? a.bottom - c.top + nb : a.top - c.top + auto.vert

      return { horiz, vert }
    },

    offsetAuto () {
      if (!this.auto) return { horiz: 0, vert: 0 }
      if (!this.dimensions.selected) return { horiz: this.nudgeXAuto, vert: this.nudgeYAuto }

      const { activator: a, content: c, selected: s, list } = this.dimensions
      const offsetBottom = list.height - s.height - s.offsetTop
      const scrollMiddle = (c.height - s.height) / 2
      const horiz = this.nudgeXAuto
      let vert = (a.height - c.height + this.nudgeYAuto) / 2

      vert += s.offsetTop < scrollMiddle ? scrollMiddle - s.offsetTop : 0
      vert += offsetBottom < scrollMiddle ? offsetBottom - scrollMiddle : 0

      return { horiz, vert }
    },

    screenDist () {
      const { activator: a } = this.dimensions
      const { innerHeight: innerH, innerWidth: innerW } = this.window
      const { nudgeTop: nt, nudgeBottom: nb, nudgeRight: nr, nudgeLeft: nl } = this
      const dist = {}

      dist.top = this.offsetY ? a.top + nt : a.bottom
      dist.left = this.offsetX ? a.left + nl : a.right
      dist.bottom = this.offsetY ? innerH - a.bottom - nb : innerH - a.top
      dist.right = this.offsetX ? innerW - a.right - nr : innerW - a.left
      dist.horizMax = dist.left > dist.right ? dist.left : dist.right
      dist.horizMaxDir = dist.left > dist.right ? 'left' : 'right'
      dist.vertMax = dist.top > dist.bottom ? dist.top : dist.bottom
      dist.vertMaxDir = dist.top > dist.bottom ? 'top' : 'bottom'

      return dist
    },

    screenOverflow () {
      const { content: c } = this.dimensions
      const left = c.left + this.offset.horiz
      const top = c.top + this.offset.vert

      const horiz = this.auto && left + c.width > this.window.innerWidth
          ? (left + c.width) - this.window.innerWidth
          : this.auto && left < 0
            ? left
            : 0
      const vert = this.auto && top + c.height > this.window.innerHeight
          ? (top + c.height) - this.window.innerHeight
          : this.auto && top < 0
            ? top
            : 0

      return { horiz, vert }
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
      this.isBooted = true
      if (val) this.activate()
      else this.isContentActive = false
    },

    activator (newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator)
      this.addActivatorEvents(newActivator)
    },

    activatorXY (val) {
      this.isActive = true
    }
  },

  mounted () {
    this.addActivatorEvents(this.activator)
  },

  beforeDestroy () {
    this.removeActivatorEvents(this.activator)
    window.removeEventListener('resize', this.windowResizeHandler)
  },

  methods: {
    activate () {
      if (!this.isActive || this.disabled) return

      this.initWindow()
      this.setDirection()
      this.updatePosition()
    },

    initWindow () {
      if (this.window === window) return

      this.window = window
      this.windowResizeHandler = debounce(this.activate, 200)
      this.window.addEventListener('resize', this.windowResizeHandler)
    },

    getActivator () {
      const { $refs } = this

      if (this.activator) return this.activator
      if (this.activatorXY) return this.activatorXY
      return $refs.activator.children ? $refs.activator.children[0] : $refs.activator
    },

    activatorClickHandler () {
      if (this.disabled) return
      else if (this.openOnClick && !this.isActive) this.isActive = true
      else if (this.closeOnClick && this.isActive) this.isActive = false
    },

    addActivatorEvents (activator = null) {
      if (!activator) return
      activator.addEventListener('click', this.activatorClickHandler)
    },

    removeActivatorEvents (activator = null) {
      if (!activator) return
      activator.removeEventListener('click', this.activatorClickHandler)
    },

    setDirection (horiz = '', vert = '') {
      this.direction = {
        horiz: horiz || (this.left && !this.auto ? 'left' : 'right'),
        vert: vert || (this.top && !this.auto ? 'top' : 'bottom')
      }

      this.resetPosition()
    },

    resetPosition () {
      this.position.top = this.direction.vert === 'top' ? 'auto' : '0px'
      this.position.left = this.direction.horiz === 'left' ? 'auto' : '0px'
      this.position.bottom = this.direction.vert === 'bottom' ? 'auto' : '0px'
      this.position.right = this.direction.horiz === 'right' ? 'auto' : '0px'
    },

    updatePosition () {
      this.$nextTick(() => {
        this.updateDimensions()

        const { offset, screenOverflow: screen } = this
        const { horiz, vert } = this.direction

        this.position.left = horiz === 'left' ? 'auto' : `${offset.horiz - screen.horiz}px`
        this.position.top = vert === 'top' ? 'auto' : `${offset.vert - screen.vert}px`
        this.position.right = horiz === 'right' ? 'auto' : `${-offset.horiz - screen.horiz}px`
        this.position.bottom = vert === 'bottom' ? 'auto' : `${-offset.vert - screen.vert}px`

        const noMoreFlipping = this.flip() === false

        if (noMoreFlipping) this.startTransition()
      })
    },

    updateDimensions () {
      const a = this.getActivator()
      const c = this.$refs.content

      this.sneakPeek(c, () => {
        this.updateMaxMin()

        this.dimensions = {
          activator: this.measure(a),
          content: this.measure(c),
          list: this.measure(c, '.list'),
          selected: this.auto ? this.measure(c, '.list__tile--active', 'parent') : null
        }

        this.offscreenFix()
        this.updateScroll()
      })
    },

    updateMaxMin () {
      const { maxHeight, maxHeightAutoDefault: maxAuto, offsetAuto, auto } = this
      const a = this.getActivator()
      const c = this.$refs.content
      const widthAdjust = this.nudgeWidth + Math.abs(offsetAuto.horiz) * 2

      if (!this.activatorXY) {
        c.style.minWidth = `${a.getBoundingClientRect().width + widthAdjust}px`
      }
      c.style.maxHeight = null  // <-- Todo: Investigate why this fixes rendering.
      c.style.maxHeight = isNaN(maxHeight) ? maxHeight : `${maxHeight}px`
      c.style.maxHeight = maxHeight === null && auto ? maxAuto : c.style.maxHeight
    },

    offscreenFix () {
      const { $refs, screenDist, auto } = this
      const { vert } = this.direction
      const contentIsOverTheEdge = this.dimensions.content.height > screenDist[vert]

      if (!auto && contentIsOverTheEdge) {
        $refs.content.style.maxHeight = `${screenDist.vertMax}px`
        this.dimensions.content.height = $refs.content.getBoundingClientRect().height
      }
    },

    updateScroll () {
      if (!this.auto || !this.dimensions.selected) return

      const { content: c, selected: s, list: l } = this.dimensions
      const scrollMiddle = (c.height - s.height) / 2
      const scrollMax = l.height - c.height
      let offsetTop = s.offsetTop - scrollMiddle

      offsetTop = this.screenOverflow.vert && offsetTop > scrollMax ? scrollMax : offsetTop
      offsetTop = this.screenOverflow.vert && offsetTop < 0 ? 0 : offsetTop
      offsetTop -= this.screenOverflow.vert

      this.$refs.content.scrollTop = offsetTop
    },

    flip () {
      const { auto, screenDist } = this
      const { content: c } = this.dimensions
      const { horiz, vert } = this.direction
      const flipHoriz = !auto && c.width > screenDist[horiz] ? screenDist.horizMaxDir : horiz
      const flipVert = !auto && c.height > screenDist[vert] ? screenDist.vertMaxDir : vert
      const doFlip = flipHoriz !== horiz || flipVert !== vert

      if (doFlip) {
        this.setDirection(flipHoriz, flipVert)
        this.updatePosition()
      }

      return doFlip
    },

    startTransition () {
      this.$refs.content.offsetHeight // <-- Force DOM to repaint first.
      this.isContentActive = true     // <-- Trigger v-show on content.
    },

    // Render functions
    // ====================

    genActivator (h) {
      const data = {
        ref: 'activator',
        slot: 'activator',
        class: {
          'menu__activator': true
        },
        on: {
          click: this.activatorClickHandler
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

      return h(this.transition, data, [this.genContent(h)])
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
          click: e => {
            e.stopPropagation()
            if (this.closeOnContentClick) {
              this.isActive = false
            }
          }
        }
      }

      return h('div', data, [this.lazy && !this.isBooted ? null : this.$slots.default])
    },

    // Utils
    // ====================

    measure (el, selector, getParent = false) {
      el = selector ? el.querySelector(selector) : el
      el = el && getParent ? el.parentElement : el

      if (!el) return null
      if (!el.nodeName && el.hasOwnProperty('clientX') && el.hasOwnProperty('clientY')) {
        return {
          top: el.clientY, bottom: el.clientY, left: el.clientX, right: el.clientX,
          width: 0, height: 0, offsetTop: 0
        }
      }

      const { top, left, bottom, right, width, height } = el.getBoundingClientRect()
      return { top, left, bottom, right, width, height, offsetTop: el.offsetTop }
    },

    sneakPeek (el, cb) {
      const oldOpacity = el.style.opacity
      const oldDisplay = el.style.display

      el.style.opacity = 0
      el.style.display = 'inline-block'
      cb()
      el.style.opacity = oldOpacity
      el.style.display = oldDisplay
    }
  },

  render (h) {
    const data = {
      'class': {
        'menu': true
      },
      directives: [{
        name: 'click-outside',
        value: e => {
          if (!this.closeOnClick) return false
          const a = this.activator
          if (a && (a === e.target || a.contains(e.target))) return false
          return true
        }
      }],
      on: {
        'keyup': e => { if (e.keyCode === 27) this.isActive = false }
      }
    }

    return h('div', data, [this.genActivator(h), this.genTransition(h)])
  }
}
