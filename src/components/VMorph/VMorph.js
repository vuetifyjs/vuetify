import Toggleable from '../../mixins/toggleable'
import Resize from '../../directives/resize'
import ClickOutside from '../../directives/click-outside'
import anime from 'animejs'

export default {
  name: 'v-morph',

  mixins: [Toggleable],

  directives: { ClickOutside, Resize },

  data () {
    return {
      width: window.innerWidth
    }
  },

  props: {
    toolbar: Boolean
  },

  methods: {
    genButton (h) {
      return h('div', {
        key: 0,
        on: {
          click: e => this.isActive = !this.isActive
        }
      }, this.$slots.activator)
    },
    genActivator (h) {
      return h('transition-group', {
        ref: 'activator',
        props: {
          tag: 'div',
          css: false
        },
        on: {
          enter (e, done) {
            console.log(e)
            done()
          },
          leave: (e, done) => {
            const path = anime.path('#morphPath path')
            anime({
              targets: this.$slots.activator[0].elm,
              translateX: path('x'),
              translateY: path('y'),
              easing: 'linear',
              duration: 2000,
              complete: done
            })
          }
        }
      }, [!this.isActive && this.genButton(h)])
    },
    genContent (h) {
      return h('transition-group', {
        ref: 'content',
        props: {
          tag: 'div',
          css: false
        },
        on: {
          enter (e, done) {
            console.log(e)
            done()
          },
          leave (e, done) {
            console.log('leave', e)
            done()
          }
        }
      }, [this.isActive && this.$slots.default.map((e, i) => {
        e.key = i
        return e
      })])
    },
    genPoints () {
      const endX = (this.width / 2) - 100
      const endY = 32
      const qX = 25
      const qY = 32
      return [
        'm0,0',
        `q${qX},${qY}`,
        `${endX},${endY}`
      ].join(' ')
    },
    genPath (h) {
      const path = h('path', {
        attrs: {
          fill: 'none',
          stroke: 'black',
          'stroke-width': 1,
          d: this.genPoints()
        }
      })

      return h('svg', {
        attrs: {
          id: 'morphPath',
          width: this.width
        }
      }, [path])
    }
  },

  render (h) {
    const root = h('div', {
      class: 'morph',
      directives: [
        {
          name: 'click-outside'
        },
        {
          name: 'resize',
          value: () => {
            this.width = window.innerWidth
          }
        }
      ]
    }, [this.genActivator(h), /*this.genContent(h),*/ this.genPath(h)])

    return root
  }
}
