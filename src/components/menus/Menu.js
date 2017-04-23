import Activator from './mixins/activator'
import Generators from './mixins/generators'
import Position from './mixins/position'
import Utils from './mixins/utils'
import Toggleable from '../../mixins/toggleable'
import { debounce } from '../../util/helpers'

export default {
  name: 'menu',

  mixins: [Activator, Generators, Position, Utils, Toggleable],

  data () {
    return {
      window: {},
      windowResizeHandler: () => {
        this.isBooted = false
        debounce(this.activate, 200)
      },
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
      default: 'auto'
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
      const { top, left, right, bottom } = this.position

      return {
        top: isNaN(top) ? top : `${top}px`,
        left: isNaN(left) ? left : `${left}px`,
        right: isNaN(right) ? right : `${right}px`,
        bottom: isNaN(bottom) ? bottom : `${bottom}px`
      }
    }
  },

  watch: {
    isActive (val) {
      if (this.isBooted && val) return this.startTransition()

      if (val) this.activate()
      else this.isContentActive = false
    },

    activator (newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator)
      this.addActivatorEvents(newActivator)
    },

    activatorXY (val) {
      this.isActive = true
    },

    windowResizeHandler () {
      this.isBooted = false
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
      this.isBooted = true
      this.initWindow()
      this.setDirection()
      this.updatePosition()
    },

    initWindow () {
      if (this.window === window) return

      this.window = window
      this.window.addEventListener('resize', this.windowResizeHandler)
    },

    startTransition () {
      this.$refs.content.offsetHeight // <-- Force DOM to repaint first.
      this.isContentActive = true     // <-- Trigger v-show on content.
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
