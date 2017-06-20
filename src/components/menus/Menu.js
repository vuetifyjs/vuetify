import Activator from './mixins/activator'
import Generators from './mixins/generators'
import Position from './mixins/position'
import Utils from './mixins/utils'
import Toggleable from '../../mixins/toggleable'
import Keyable from './mixins/keyable'

export default {
  name: 'menu',

  mixins: [Activator, Generators, Keyable, Position, Utils, Toggleable],

  data () {
    return {
      app: null,
      autoIndex: null,
      dimensions: {
        activator: {
          top: 0, left: 0,
          bottom: 0, right: 0,
          width: 0, height: 0,
          offsetTop: 0, scrollHeight: 0
        },
        content: {
          top: 0, left: 0,
          bottom: 0, right: 0,
          width: 0, height: 0,
          offsetTop: 0, scrollHeight: 0
        },
        list: null,
        selected: null
      },
      direction: { vert: 'bottom', horiz: 'right' },
      isContentActive: false,
      isBooted: false,
      maxHeightAutoDefault: '200px',
      resizeTimeout: {},
      startIndex: 3,
      stopIndex: 0,
      tileLength: 0,
      window: {}
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
    minWidth () {
      return this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0)
    },
    styles () {
      return {
        maxHeight: this.auto ? '200px' : isNaN(this.maxHeight) ? this.maxHeight : `${this.maxHeight}px`,
        minWidth: `${this.minWidth}px`,
        top: `${this.calcTop()}px`,
        left: `${this.calcLeft()}px`
      }
    }
  },

  watch: {
    isActive (val) {
      if (this.disabled) return

      val && this.activate() || this.deactivate()
    },
    activator (newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator)
      this.addActivatorEvents(newActivator)
    },
    windowResizeHandler () {
      this.isBooted = false
    }
  },

  mounted () {
    window.addEventListener('resize', this.onResize, { passive: true })
    this.addActivatorEvents(this.activator)
    this.app = document.querySelector('[data-app]')
    this.$nextTick(() => {
      this.app && this.app.appendChild(this.$refs.content)
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize, { passive: true })
    this.app &&
      this.app.contains(this.$refs.content) &&
      this.app.removeChild(this.$refs.content)

    this.removeActivatorEvents(this.activator)
    window.removeEventListener('resize', this.windowResizeHandler)
  },

  methods: {
    activate () {
      this.initWindow()
      this.getTiles()
      this.updateDimensions()
      this.$nextTick(this.startTransition)
    },
    deactivate () {
      this.isContentActive = false
    },
    onResize () {
      clearTimeout(this.resizeTimeout)
      if (!this.isActive) return
      this.resizeTimeout = setTimeout(this.updateDimensions, 200)
    },
    startTransition () {
      this.isContentActive = true
      this.$nextTick(this.calculateScroll)
    }
  },

  render (h) {
    const data = {
      'class': 'menu',
      directives: [{
        name: 'click-outside',
        value: () => this.closeOnClick
      }],
      on: {
        keydown: e => {
          if (e.keyCode === 27) this.isActive = false
          else this.changeListIndex(e)
        }
      }
    }

    return h('div', data, [
      this.genActivator(),
      this.genTransition()
    ])
  }
}
