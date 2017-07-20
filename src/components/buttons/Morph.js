import Toggleable from '~mixins/toggleable'
import Resizable from '~mixins/resizable'
import Positionable from '~mixins/positionable'
import MorphToolbarTransition from '~components/transitions/morph-toolbar-transition'
import MorphSheetTransition from '~components/transitions/morph-sheet-transition'

export default {
  name: 'morph',

  mixins: [Positionable, Toggleable, Resizable],

  data () {
    return {
      containerWidth: 0,
      contentHeight: 0,
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
        'morph--top': this.top,
        'morph--right': this.right,
        'speed-dial--bottom': this.bottom,
        'speed-dial--left': this.left,
        'morph--absolute': this.absolute,
        'speed-dial--fixed': this.fixed
      }
    },
    transitions () {
      const transitions = this.toolbar && MorphToolbarTransition ||
        this.sheet && MorphSheetTransition

      return transitions(
        this.left && 'left' || this.right && 'right',
        this.containerWidth,
        this.sheet ? this.contentHeight : 16,
        this.activatorWidth
      )
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.activatorWidth = this.$refs.activator.$el.querySelector('.btn').clientWidth

      // Move content to parent element, if sheet
      if (this.sheet) {
        // First calculate real height
        const clone = this.$refs.wrapper.cloneNode(true)
        clone.style.display = 'block'
        document.body.appendChild(clone)
        this.$nextTick(() => {
          this.contentHeight = clone.scrollHeight
          clone.remove()
        })

        this.$el.parentNode.insertBefore(this.$refs.content.$el, this.$el.nextSibling)
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
      this.containerWidth = this.sheet ? this.$el.parentNode.clientWidth : window.innerWidth
    }
  },

  render (h) {
    let children = []
    const directives = []

    this.closeOnOutsideClick && directives.push({
      name: 'click-outside',
      value: (e) => {
        return !this.$refs.content.$el.contains(e.target)
      }
    })

    const data = {
      'class': this.classes,
      directives,
      on: {
        click: () => {
          if (!this.isActive) this.isActive = true
        }
      }
    }

    const wrapper = h('div', {
      key: 0,
      ref: 'wrapper',
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, this.$slots.default)

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
      on: this.transitions.content
    }, [wrapper])

    const activator = h('transition-group', {
      ref: 'activator',
      props: {
        tag: 'div',
        css: false
      },
      on: this.transitions.activator,
      class: {
        'morph--activator': true
      }
    }, [!this.isActive && this.$slots.activator.map((e, i) => { e.key = i; return e })])

    return h('div', data, [activator, content])
  }
}
