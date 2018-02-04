import '../../stylus/components/_morph.styl'

import VBtn from '../VBtn'
import VIcon from '../VIcon'
import VToolbar from '../VToolbar'
import Toggleable from '../../mixins/toggleable'
import ClickOutside from '../../directives/click-outside'
import Resize from '../../directives/resize'
import morphs from './morphs'

export default {
  name: 'v-morph-toolbar',

  inheritAttrs: false,

  mixins: [Toggleable],

  directives: {
    ClickOutside,
    Resize
  },

  props: {
    activatorIcon: {
      type: String,
      default: 'add'
    }
  },

  data () {
    return {
      width: 0,
      size: 12
    }
  },

  computed: {
    forwardPath () {
      const negative = this.right ? '-' : ''
      const target = parseInt(this.width * 0.225, 10)
      return `m0,0 q0,20 ${negative}${target},20`
    },
    reversePath () {
      const start = this.right ? '-' : ''
      const end = this.right ? '' : '-'
      const target = parseInt(this.width * 0.225, 10)
      return `m${start}${target},20 q${end}${target},0 ${end}${target},-20`
    },
    right () {
      return this.$attrs.hasOwnProperty('right')
    }
  },

  methods: {
    toolbarEl () {
      if (this.$refs.toolbar) return this.$refs.toolbar.$el
      else return null
    },
    buttonEl () {
      if (this.$refs.button) return this.$refs.button.$el
      else return null
    },
    genIcon (h) {
      return this.$slots.icon || h(VIcon, [this.activatorIcon])
    },
    genButton (h) {
      return h(VBtn, {
        staticClass: 'morph__button',
        ref: 'button',
        key: 'button',
        props: {
          ...this.$attrs,
          fab: true,
          fixed: true
        },
        on: {
          click: () => {
            this.isActive = !this.isActive
          }
        }
      }, [this.genIcon(h)])
    },
    genToolbar (h) {
      return h(VToolbar, {
        staticClass: 'morph__toolbar',
        ref: 'toolbar',
        key: 'toolbar',
        props: {
          ...this.$attrs,
          fixed: true
        }
      }, [this.$slots.default])
    },
    genTransitionGroup (h) {
      return h('transition-group', {
        props: {
          tag: 'div',
          css: false
        },
        on: {
          enter: (el, done) => {
            if (this.toolbarEl() === el) {
              return morphs.enterToolbar(el, this.width, this.size, this.right, done)
            } else if (this.buttonEl() === el) {
              return morphs.enterButton(el, done)
            } else {
              return done()
            }
          },
          leave: (el, done) => {
            if (this.toolbarEl() === el) {
              return morphs.leaveToolbar(el, this.width, this.size, this.right, done)
            } else if (this.buttonEl() === el) {
              return morphs.leaveButton(el, done)
            } else {
              return done()
            }
          }
        }
      }, [!this.isActive && this.genButton(h), this.isActive && this.genToolbar(h)])
    },
    genPath (h, id, points) {
      return h('path', {
        attrs: {
          id,
          fill: 'none',
          stroke: 'black',
          'stroke-width': 1,
          d: points
        }
      })
    },
    genSvg (h) {
      return h('svg', {
        attrs: {
          id: 'morphPath',
          width: this.width,
          height: 100
        }
      }, [this.genPath(h, 'forward', this.forwardPath), this.genPath(h, 'reverse', this.reversePath)])
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'morph',
      directives: [
        {
          name: 'click-outside',
          value: () => (this.isActive = false),
          args: {
            closeConditional: () => this.isActive,
            include: () => [this.toolbarEl()]
          }
        },
        {
          name: 'resize',
          value: () => {
            this.width = window && window.innerWidth
          }
        }
      ]
    }, [this.genTransitionGroup(h), this.genSvg(h)])
  }
}
