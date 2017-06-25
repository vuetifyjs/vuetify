import BezierEasing from 'bezier-easing'
import Toggleable from '../../mixins/toggleable'
import Fab from './mixins/fab'

const easeInCubic = BezierEasing(0.55, 0.055, 0.675, 0.19)
const easeOutCubic = BezierEasing(0.215, 0.61, 0.355, 1)
const easeInOutCubic = BezierEasing(0.645, 0.045, 0.355, 1)

export default {
  name: 'morph',

  mixins: [Fab, Toggleable],

  data () {
    return {
      containerWidth: 0,
      resizeDebounce: null
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
    },
    toolbar: Boolean,
    sheet: Boolean,
    sheetHeight: Number
  },

  computed: {
    classes () {
      return {
        'morph': true,
        'morph--toolbar': this.toolbar,
        'morph--sheet': this.sheet,
        'speed-dial--top': this.top,
        'speed-dial--right': this.right,
        'speed-dial--bottom': this.bottom,
        'speed-dial--left': this.left,
        'speed-dial--absolute': this.absolute,
        'speed-dial--fixed': this.fixed
      }
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      window.addEventListener('resize', this.resize, { passive: true })
      this.resize()

      // Move content to parent element, if sheet
      if (this.sheet) {
        console.log(this.$refs.content)
        this.$el.parentNode.insertBefore(this.$refs.content.$el, this.$el.parentNode.firstChild)
      }
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, { passive: true })
  },

  methods: {
    resize () {
      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(() => {
        console.log(this)
        this.containerWidth = this.$el.parentNode.clientWidth
      }, 50)
    },
    beforeEnterTransition (el) {
      console.log('before enter')
      const left = this.containerWidth - ((el.clientWidth / 2) + 16)
      const target = left - this.containerWidth / 2

      el.querySelector('.btn__content').style.transition = 'none'
      el.querySelector('.btn__content').style.opacity = 0
      el.style.transition = 'none'
      el.style.zIndex = 0
      el.style.boxShadow = 'none'
      this.addTransform(el, `translateX(-${target}px)`)
      this.addTransform(el, `translateY(${this.toolbar ? 16 : this.sheetHeight / 2}px)`)
    },
    enterTransition (el, done) {
      console.log('enter')
      const left = this.containerWidth - ((el.clientWidth / 2) + 16)
      const targetHorizontal = left - this.containerWidth / 2
      const targetVertical = this.toolbar ? 16 : this.sheetHeight / 2

      Promise.all([
        this.timeout(() => {
          el.querySelector('.btn__content').style.transition = ''
          el.style.boxShadow = ''
          el.querySelector('.btn__content').style.opacity = 1
        }, 500),
        this.animate(d => this.opacity(el, 0, 1, d), 300, 100),
        this.animate(p => this.horizontal(el, -targetHorizontal, 0, p), 300, 200, easeOutCubic),
        this.animate(p => this.vertical(el, targetVertical, 0, p), 300, 200, easeInCubic),
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

    },
    leaveTransition (el, done) {
      console.log('leave')
      const left = this.containerWidth - ((el.clientWidth / 2) + 16)
      const targetHorizontal = left - this.containerWidth / 2
      const targetVertical = this.toolbar ? 16 : this.sheetHeight / 2

      Promise.all([
        this.animate(d => this.opacity(el, 1, 0, d), 200, 100),
        this.animate(p => this.horizontal(el, 0, -targetHorizontal, p), 300, 0, easeInCubic),
        this.animate(p => this.vertical(el, 0, targetVertical, p), 300, 0, easeOutCubic),
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
    height (el, start, end, delta) {
      const value = start + (delta * (end - start))

      el.style.height = `${value}px`
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
    },
    interpolate (start, end, delta) {
      return start + (delta * (end - start))
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
      ref: 'content',
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
            }, 150),
            this.animate(d => this.opacity(el, 1, 0, d), 100, 300),
            this.animate(d => this.horizontal(el, 0, (this.containerWidth / 2) - 56, d), 300, 150, easeOutCubic),
            this.animate(d => {
              const value = this.interpolate(this.containerWidth / 2, 28, d)
              el.style.clipPath = `circle(${value}px)`
            }, 400, easeOutCubic),
            this.sheet && this.animate(d => this.height(el, this.sheetHeight, 0, d), 300, 200, easeInCubic)
          ]).then(() => done())
        },
        afterLeave: (el) => {
          console.log('after leave')
        },
        beforeEnter: (el) => {
          el.style.zIndex = 5
          el.style.transition = 'none'
          el.style.opacity = 0
          el.style.clipPath = 'circle(10%)'
          el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 0)
          this.sheet && (el.style.height = '0px')
        },
        enter: (el, done) => {
          console.log('enter group')

          Promise.all([
            this.timeout(() => el.style.opacity = 1, 300),
            this.animate(d => this.horizontal(el, this.containerWidth / 4, 0, d), 200, 300, easeOutCubic),
            this.animate(d => {
              const value = 10 + (d * (100 - 10))
              el.style.clipPath = `circle(${value}%)`
            }, 300, 200, easeInCubic),
            this.timeout(() => {
              el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 1)
            }, 450),
            this.sheet && this.animate(d => this.height(el, 0, this.sheetHeight, d), 300, 100, easeOutCubic)
          ]).then(() => done())
        },
        afterEnter: (el) => {

        }
      }
    }, children)

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
