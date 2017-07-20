import Toggleable from '~mixins/toggleable'
import Resizable from '~mixins/resizable'
import MorphToolbarTransition from '~components/transitions/morph-toolbar-transition'

export default {
  name: 'morph',

  mixins: [Toggleable, Resizable],

  data () {
    return {
      containerWidth: 0,
      activatorWidth: 0,
      clipPathSize: 0,
      clipPathX: 50,
      clipPathY: 50,
      origin: 'right'
    }
  },

  props: {
    dialog: Boolean,
    toolbar: Boolean,
    sheet: Boolean,
    sheetHeight: Number,
    closeOnOutsideClick: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes () {
      return {
        'morph': true,
        'morph--toolbar': this.toolbar,
        'morph--sheet': this.sheet,
        'morph--dialog': this.dialog,
        'speed-dial--top': this.top,
        'speed-dial--right': this.right,
        'speed-dial--bottom': this.bottom,
        'speed-dial--left': this.left,
        'speed-dial--absolute': this.absolute,
        'speed-dial--fixed': this.fixed
      }
    },
    transitions () {
      console.log('transitions')
      const transitions = this.toolbar ? MorphToolbarTransition(
        this.$attrs.left && 'left' || this.$attrs.right && 'right',
        this.containerWidth,
        16,
        this.activatorWidth) : {}

      return transitions
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.activatorWidth = this.$refs.activator.$el.querySelector('.btn').clientWidth

      // Move content to parent element, if sheet
      if (this.sheet) {
        this.$el.parentNode.insertBefore(this.$refs.content.$el, this.$el.parentNode.firstChild)
      }
    })
  },

  beforeDestroy () {
    if (this.sheet) {
      this.$el.parentNode.removeChild(this.$refs.content.$el)
    }
  },

  methods: {
    onResize () {
      console.log('resize')
      this.containerWidth = window.innerWidth // this.$el.parentNode.clientWidth
    }
  },

  render (h) {
    let children = []
    const directives = []

    this.closeOnOutsideClick && directives.push({ name: 'click-outside' })

    const data = {
      'class': this.classes,
      directives,
      on: {
        click: () => {
          if (!this.isActive) this.isActive = true
        }
      }
    }

    if (this.isActive) {
      children = this.$slots.default.map((b, i) => {
        b.key = i

        return b
      })
    }

    const content = h('transition-group', {
      ref: 'content',
      class: {
        'morph--content': true
      },
      style: {
        width: !this.dialog ? `${this.containerWidth}px` : ''
      },
      props: {
        tag: 'div',
        css: false
      },
      attrs: {
        'data-origin': this.$attrs.left && 'left' || this.$attrs.right && 'right',
        'data-content-width': this.containerWidth,
        'data-content-height': 16,
        'data-activator-width': this.activatorWidth,
        'data-sheet': this.sheet,
        'data-clip-path-x': this.clipPathX,
        'data-clip-path-y': this.clipPathY
      },
      on: this.transitions.content
    }, children)

    const activator = h('transition-group', {
      ref: 'activator',
      props: {
        tag: 'div',
        css: false
      },
      on: this.transitions.activator,
      attrs: {
        'data-origin': this.$attrs.left && 'left' || this.$attrs.right && 'right',
        'data-content-width': this.containerWidth,
        'data-content-height': 16,
        'data-toolbar': this.toolbar
      },
      class: {
        'morph--activator': true
      }
    }, [!this.isActive && this.$slots.activator.map((e, i) => {
      e.key = i
      e.componentOptions.propsData = {
        ...e.componentOptions.propsData,
        ...this.$attrs
      }
      return e
    })])

    return h('div', data, [activator, content])
  }
}
