import Toggleable from '../../mixins/toggleable'
import Resize from '../../directives/resize'
import ClickOutside from '../../directives/click-outside'
import animejs from 'animejs'

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

  computed: {
    endX () {
      console.log((this.width * 0.5))
      return (this.width / 2) - (this.width / 2 * 0.7)
    },
    endY () {
      return 48
    }
  },

  methods: {
    toggle () {
      this.isActive = !this.isActive
    },
    genButton (h) {
      return h('div', {
        key: 0
      }, this.$scopedSlots.activator({ key: 0, toggle: this.toggle }))
    },
    genActivator (h) {
      return h('transition-group', {
        staticClass: 'activator',
        ref: 'activator',
        props: {
          tag: 'div',
          css: false
        },
        on: {
          beforeEnter: e => {
            e.style.transform = `translateX(${this.endX}px) translateY(${this.endY}px)`
          },
          enter: (e, done) => {
            const path = animejs.path('#morphPath #reverse')
            const timeline = animejs.timeline()

            timeline
              .add({
                targets: e,
                translateX: path('x'),
                translateY: path('y'),
                easing: 'linear',
                duration: 1000,
                complete: done
              })
          },
          leave: (e, done) => {
            console.log('leaving')
            const path = animejs.path('#morphPath #forward')
            const timeline = animejs.timeline()
            const icon = Array.from(e.children).filter(c => c.className === 'btn__content')

            timeline
              .add({
                targets: icon,
                opacity: 0,
                duration: 50,
                offset: 0
              })

              .add({
                targets: e,
                opacity: 0,
                translateX: path('x'),
                translateY: path('y'),
                easing: 'easeOutQuart',
                duration: 400,
                offset: 0,
                complete: done
              })
          }
        }
      }, [!this.isActive && this.$scopedSlots.activator({ key: 0, toggle: this.toggle })])
    },
    genContent (h) {
      return h('transition-group', {
        staticClass: 'morph__content',
        ref: 'content',
        props: {
          tag: 'div',
          css: false
        },
        on: {
          beforeEnter: e => {
            e.style.opacity = 0

            Array.from(e.children).forEach(c => {
              c.style.opacity = 0
            })
          },
          enter: (e, done) => {
            const timeline = animejs.timeline()
            // const buttons = Array.from(e.children)

            timeline
              .add({
                targets: e,
                opacity: 1,
                duration: 10,
                offset: 50
              })
              .add({
                targets: e,
                clipPath: ['circle(24px at 20% 50%)', `circle(${this.width}px at 50% 50%)`],
                duration: 400,
                easing: 'easeOutCirc',
                offset: 100,
                complete: done
              })
              /*
              .add({
                targets: buttons,
                opacity: 1,
                easing: 'linear',
                complete: done
              })
              */
          },
          leave: (e, done) => {
            console.log('leave', e)
            const timeline = animejs.timeline()

            timeline
              .add({
                targets: e,
                clipPath: [`circle(${this.width}px at 50% 50%)`, 'circle(32px at 20% 50%)'],
                duration: 1000,
                easing: 'easeOutSine',
                complete: done
              })
          }
        }
      }, [this.isActive && this.$slots.default.map((e, i) => {
        e.key = i
        return e
      })])
    },
    genPoints (reverse = false) {
      const startX = reverse ? this.endX : 0
      const startY = reverse ? this.endY : 0
      const endX = reverse ? 0 : this.endX
      const endY = reverse ? 0 : this.endY
      return [
        `M${startX},${startY}`,
        `Q0,${this.endY}`,
        `${endX},${endY}`
      ].join(' ')
    },
    genPath (h) {
      const forward = h('path', {
        attrs: {
          id: 'forward',
          fill: 'none',
          stroke: 'black',
          'stroke-width': 1,
          d: this.genPoints()
        }
      })

      const reverse = h('path', {
        attrs: {
          id: 'reverse',
          fill: 'none',
          stroke: 'black',
          'stroke-width': 1,
          d: this.genPoints(true)
        }
      })

      return h('svg', {
        attrs: {
          id: 'morphPath',
          width: this.width,
          height: this.endY
        },
        style: {
          bottom: `${this.endY / 2}px`,
          left: '32px'
        }
      }, [forward, reverse])
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
    }, [this.genActivator(h), this.genContent(h), this.genPath(h)])

    return root
  }
}
