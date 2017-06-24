import BezierEasing from 'bezier-easing'
import Toggleable from '../../mixins/toggleable'
import Fab from './mixins/fab'

export default {
  name: 'morph',

  mixins: [Fab, Toggleable],

  data () {
    return {
      containerWidth: 0
    }
  },

  props: {
    transition: {
      type: String,
      default: 'morph-transition'
    },
    activatorTransition: {
      type: String,
      default: 'activator-morph-transition'
    }
  },

  computed: {
    classes () {
      return {
        'morph': true,
        'morph--fixed': true
      }
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.containerWidth = this.$parent.$el.clientWidth
      console.log(this.containerWidth)
    })
  },

  methods: {
    beforeEnterTransition (el) {
      console.log('before enter')
      const left = this.containerWidth - ((el.clientWidth / 2) + 16)
      const target = left - this.containerWidth / 2

      const right = this.containerWidth
      const bottom = 56 + 16
      const top = 16
      el.querySelector('.btn__content').style.transition = 'none'
      el.querySelector('.btn__content').style.opacity = 0
      el.style.transition = 'none'
      this.$el.style.transition = 'none'
      this.addTransform(el, `translateX(-${target}px)`)
      this.addTransform(el, `translateY(${16}px)`)
    },
    enterTransition (el, done) {
      console.log('enter')
      const left = this.containerWidth - ((el.clientWidth / 2) + 16)
      const target = left - this.containerWidth / 2

      Promise.all([
        this.timeout(() => {
          el.querySelector('.btn__content').style.opacity = 1
        }, 500),
        this.animate(d => this.opacity(el, 0, 1, d), 400, 0),
        this.animate(p => this.horizontal(el, -target, 0, p), 400, 400, BezierEasing(0.215, 0.61, 0.355, 1)),
        this.animate(p => this.vertical(el, 16, 0, p), 400, 400, BezierEasing(0.55, 0.055, 0.675, 0.19)),
      ]).then(() => done())
    },
    afterEnterTransition (el) {
      console.log('after enter')
      //el.style.transition = 'none'
      this.$el.style['-webkit-clip-path'] = 'none'
    },
    beforeLeaveTransition (el) {
      el.style.transition = 'none'
      el.querySelector('.btn__content').style.opacity = 0
      this.$el.style.transition = 'none'
    },
    leaveTransition (el, done) {
      console.log('leave')
      const left = this.containerWidth - ((el.clientWidth / 2) + 16)
      const target = left - this.containerWidth / 2

      Promise.all([
        this.animate(d => this.opacity(el, 1, 0, d), 200, 150),
        this.animate(p => this.horizontal(el, 0, -target, p), 400, 0, BezierEasing(0.55, 0.055, 0.675, 0.19)),
        this.animate(p => this.vertical(el, 0, 16, p), 400, 0, BezierEasing(0.215, 0.61, 0.355, 1)),
        //this.animate(p => this.scale(el, 1, 8, p), 500, 150, BezierEasing(0.55, 0.055, 0.675, 0.19)),
      ]).then(() => done())
    },
    afterLeaveTransition (el) {
      console.log('after leave')
      this.$el.style.transition = 'none'
    },
    timeout (fn, delay) {
      return new Promise(resolve => {
        setTimeout(() => {
          fn()
          resolve()
        }, delay)
      })
    },
    animate (fn, duration, delay = 0, curve = null) {
      const frame = () => new Promise(resolve => requestAnimationFrame(resolve))

      let start = null

      function animateFrame (timestamp) {
        const runtime = timestamp - start
        const progress = Math.min(runtime / duration, 1)

        fn(curve && curve(progress) || progress)

        if (runtime < duration) {
          return frame().then(animateFrame)
        }
      }

      return this.timeout(() => {}, delay).then(() => {
        return frame().then(timestamp => {
          start = timestamp
          return animateFrame(timestamp)
        })
      })
    },
    opacity (el, start, end, delta) {
      const value = start + (delta * (end - start))
      //el.style.opacity = `${target > 0 ? target * delta : 1 * (1 - delta)})}`
      el.style.opacity = `${value}`
    },
    scale (el, start, end, delta) {
      const value = start + (delta * (end - start))

      this.addTransform(el, `scale(${value})`)
    },
    vertical (el, start, end, delta) {
      const value = start + (delta * (end - start))

      this.addTransform(el, `translateY(${value}px`)
    },
    horizontal (el, start, end, delta) {
      const value = start + (delta * (end - start))

      this.addTransform(el, `translateX(${value}px`)
    },
    addTransform (el, transform) {
      let transforms = el.style.transform.split(' ')

      transforms = transforms.filter(t => !t.includes(transform.split('(')[0]))

      transforms.push(transform)

      el.style.transform = transforms.join(' ')
    }
  },

  render (h) {
    let children = []
    const data = {
      'class': this.classes,
      directives: [{
        name: 'click-outside'
      }],
      on: {
        click: () => (this.isActive = !this.isActive)
      }
    }

    if (this.isActive) {
      children = this.$slots.default.map((b, i) => {
        b.key = i

        return b
      })
    }

    const transition = h('transition-group', {
      class: {
        'morph--content': true
      },
      style: {
        width: `${this.containerWidth}px`
      },
      props: {
        tag: 'div',
        css: false
      },
      on: {
        beforeLeave: (el) => {
          console.log('before leave')
          el.style.opacity = 1
          el.style.clipPath = `circle(100%)`

        },
        leave: (el, done) => {
          console.log('leave group')

          Promise.all([
            this.timeout(() => {
              el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 0)
            }, 250),
            this.animate(d => this.horizontal(el, 0, 100, d), 200, 300, BezierEasing(0.55, 0.055, 0.675, 0.19)),
            this.animate(d => {
              const value = 100 + (d * (10 - 100))
              el.style.clipPath = `circle(${value}%)`
            }, 500, BezierEasing(0.55, 0.055, 0.675, 0.19))
          ]).then(() => done())
        },
        afterLeave: (el) => {
          console.log('after leave')
        },
        beforeEnter: (el) => {
          el.style.transition = 'none'
          el.style.opacity = 0
          el.style.clipPath = 'circle(10%)'
          el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 0)
        },
        enter: (el, done) => {
          console.log('enter group')

          Promise.all([
            this.timeout(() => el.style.opacity = 1, 300),
            this.animate(d => this.horizontal(el, 100, 0, d), 200, 300, BezierEasing(0.215, 0.61, 0.355, 1)),
            this.animate(d => {
              const value = 10 + (d * (100 - 10))
              el.style.clipPath = `circle(${value}%)`
            }, 500, 300, BezierEasing(0.55, 0.055, 0.675, 0.19)),
            this.timeout(() => {
              el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 1)
            }, 700)
          ]).then(() => done())
        },
        afterEnter: (el) => {

        }
      }
    }, children)

    const content = h('div', {
      ref: 'content',
      class: {
        'morph--content': true
      },
      style: {
        width: `${this.containerWidth}px`
      }
    }, transition)

    const activatorTransition = h('transition', {
      props: {
        css: false,
        tag: 'div'
      },
      on: {
        beforeEnter: this.beforeEnterTransition,
        enter: this.enterTransition,
        afterEnter: this.afterEnterTransition,
        beforeLeave: this.beforeLeaveTransition,
        leave: this.leaveTransition,
        afterLeave: this.afterLeaveTransition
      }
    }, [!this.isActive && this.$slots.activator.map((e, i) => { e.key = i; return e })])

    const activator = h('div', {
      ref: 'activator',
      class: {
        'morph--activator': true
      }
    }, [activatorTransition])

    return h('div', data, [activator, transition])
  }
}
