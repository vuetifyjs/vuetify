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
      const target = parseInt(this.width * 0.225, 10)
      return `m0,0 q0,20 -${target},20`
    },
    reversePath () {
      const target = parseInt(this.width * 0.225, 10)
      return `m-${target},20 q${target},0 ${target},-20`
    }
  },

  methods: {
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
      }, [this.$slots.content])
    },
    genTransitionGroup (h) {
      return h('transition-group', {
        props: {
          tag: 'div',
          css: false
        },
        on: {
          enter: (el, done) => {
            console.log('enter', el)
            if (this.$refs.toolbar && this.$refs.toolbar.$el === el) {
              return morphs.enterToolbar(el, this.width, this.size, done)
            } else if (this.$refs.button && this.$refs.button.$el === el) {
              return morphs.enterButton(el, done)
            } else {
              return done()
            }
          },
          leave: (el, done) => {
            console.log('leave', el)
            if (this.$refs.toolbar && this.$refs.toolbar.$el === el) {
              return morphs.leaveToolbar(el, this.width, this.size, done)
            } else if (this.$refs.button && this.$refs.button.$el === el) {
              return morphs.leaveButton(el, done)
            } else {
              return done()
            }
          }
        }
      }, [!this.isActive && this.genButton(h), this.isActive && this.genToolbar(h)])
    },
    genPath (id, points) {
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
          height: this.endY
        }
      }, [this.genPath('forward', this.forwardPath), this.genPath('reverse', this.reversePath])
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
            closeConditional: () => this.isActive
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
