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
      app: null,
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
      isContentActive: false,
      isBooted: false,
      maxHeightAutoDefault: '200px',
      position: { left: '0px', top: '0px', right: 'auto', bottom: 'auto' },
      window: {},
      windowResizeHandler: () => {
        this.isBooted = false
        debounce(this.activate, 200)
      }
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
      default: 0
    },
    nudgeYAuto: {
      type: Number,
      default: 0
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
    styles () {
      const { top, left, right, bottom, minWidth } = this.position

      return {
        maxHeight: this.auto ? '200px' : this.maxHeight,
        minWidth: isNaN(minWidth) ? minWidth : `${minWidth}px`,
        top: isNaN(top) ? top : `${top}px`,
        left: isNaN(left) ? left : `${left}px`
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
    this.addActivatorEvents(this.activator)
    this.app = document.querySelector('[data-app]')
    this.app && this.app.appendChild(this.$refs.content)
  },

  beforeDestroy () {
    this.app &&
      this.app.contains(this.$refs.content) &&
      this.app.removeChild(this.$refs.content)

    this.removeActivatorEvents(this.activator)
    window.removeEventListener('resize', this.windowResizeHandler)
  },

  methods: {
    activate () {
      this.initWindow()
      this.updateDimensions()
      this.$nextTick(this.startTransition)
    },
    deactivate () {
      this.isContentActive = false
    },
    startTransition () {
      this.$refs.content.offsetHeight // <-- Force DOM to repaint first.
      this.isContentActive = true     // <-- Trigger v-show on content.
    }
  },

  render (h) {
    const data = {
      'class': 'menu',
      directives: [{
        name: 'click-outside'
      }],
      on: {
        keyup: e => { if (e.keyCode === 27) this.isActive = false }
      }
    }

    return h('div', data, [
      this.genActivator(),
      this.genTransition()
    ])
  }
}
