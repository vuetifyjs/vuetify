import BezierEasing from '~util/bezier-easing'
import Positionable from '~mixins/positionable'
import Toggleable from '~mixins/toggleable'
import Animations from './mixins/animations'

// const easeInOutCubic = BezierEasing(0.645, 0.045, 0.355, 1)
const easeInCubic = BezierEasing(0.55, 0.055, 0.675, 0.19)
const easeOutCubic = BezierEasing(0.215, 0.61, 0.355, 1)

export default {
  name: 'morph',

  mixins: [Positionable, Toggleable, Animations],

  data () {
    return {
      containerWidth: 0,
      activatorWidth: 0,
      resizeDebounce: null,
      clipPathSize: 0,
      clipPathX: 50,
      clipPathY: 50
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
    computedClipPath () {
      return `circle(${this.clipPathSize}px at ${this.clipPathX}% ${this.clipPathY}%)`
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      window.addEventListener('resize', this.resize, { passive: true })
      this.resize()

      this.activatorWidth = this.$refs.activator.$el.querySelector('.btn').clientWidth

      // Move content to parent element, if sheet
      if (this.sheet) {
        this.$el.parentNode.insertBefore(this.$refs.content.$el, this.$el.parentNode.firstChild)
      }
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize, { passive: true })

    if (this.sheet) {
      this.$el.parentNode.removeChild(this.$refs.content.$el)
    }
  },

  methods: {
    resize () {
      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(() => {
        this.containerWidth = this.$el.parentNode.clientWidth
      }, 50)
    },
    beforeEnterTransition (el) {
      const left = this.containerWidth - ((el.clientWidth / 2) + 16)
      const target = left - this.containerWidth / 2

      el.querySelector('.btn__content').style.transition = 'none'
      el.querySelector('.btn__content').style.opacity = 0
      el.style.transition = 'none'
      el.style.boxShadow = 'none'
      el.style.opacity = 0
      this.addTransform(el, `translateX(-${target}px)`)
      this.addTransform(el, `translateY(${this.toolbar ? 16 : this.sheetHeight / 2}px)`)
    },
    enterTransition (el, done) {
      const left = this.containerWidth - ((el.clientWidth / 2) + 16)
      const targetHorizontal = left - this.containerWidth / 2
      const targetVertical = this.toolbar ? 16 : this.sheetHeight / 2

      Promise.all([
        this.timeout(() => {
          el.querySelector('.btn__content').style.transition = ''
          el.style.boxShadow = ''
          el.querySelector('.btn__content').style.opacity = 1
        }, 500),
        this.animate(d => this.opacity(el, 0, 1, d), 350, 50),
        this.animate(p => this.horizontal(el, -targetHorizontal, 0, p), 300, 200, easeOutCubic),
        this.animate(p => this.vertical(el, targetVertical, 0, p), 300, 200, easeInCubic)
      ]).then(() => done())
    },
    afterEnterTransition (el) {
      this.$el.style['-webkit-clip-path'] = 'none'
    },
    beforeLeaveTransition (el) {
      el.style.transition = 'none'
      el.querySelector('.btn__content').style.opacity = 0
    },
    leaveTransition (el, done) {
      const left = this.containerWidth - ((el.clientWidth / 2) + 16)
      const targetHorizontal = left - (this.containerWidth * 0.75)
      const targetVertical = this.toolbar ? 16 : this.sheetHeight / 2

      Promise.all([
        this.animate(d => this.opacity(el, 1, 0, d), 200, 100),
        this.animate(p => this.horizontal(el, 0, -targetHorizontal, p), 300, 0, easeInCubic),
        this.animate(p => this.vertical(el, 0, targetVertical, p), 300, 0, easeOutCubic)
      ]).then(() => done())
    },
    afterLeaveTransition (el) {
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
    frame () {
      return new Promise(resolve => requestAnimationFrame(resolve))
    },
    animate (fn, duration, delay = 0, curve = null) {
      let start = null

      const animateFrame = (timestamp) => {
        const runtime = timestamp - start
        const progress = Math.min(runtime / duration, 1)

        fn(curve && curve(progress) || progress)

        if (runtime < duration) {
          return this.frame().then(animateFrame)
        }
      }

      return this.timeout(() => {}, delay).then(() => {
        return this.frame().then(timestamp => {
          start = timestamp
          return animateFrame(timestamp)
        })
      })
    },
    rotate (el, start, end, delta) {
      const value = this.interpolate(start, end, delta)

      this.addTransform(el, `rotate(${value}deg)`)
    },
    height (el, start, end, delta) {
      const value = this.interpolate(start, end, delta)
      el.style.height = `${value}px`
    },
    opacity (el, start, end, delta) {
      const value = this.interpolate(start, end, delta)
      el.style.opacity = `${value}`
    },
    scale (el, start, end, delta) {
      const value = this.interpolate(start, end, delta)

      this.addTransform(el, `scale(${value})`)
    },
    vertical (el, start, end, delta) {
      const value = this.interpolate(start, end, delta)

      this.addTransform(el, `translateY(${value}px`)
    },
    horizontal (el, start, end, delta) {
      const value = this.interpolate(start, end, delta)

      this.addTransform(el, `translateX(${value}px`)
    },
    clipPath (el, start, end, delta) {
      const value = this.interpolate(start, end, delta)

      this.clipPathSize = value

      el.style.clipPath = this.computedClipPath
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
    const directives = this.closeOnOutsideClick ? [{ name: 'click-outside' }] : []
    const data = {
      'class': this.classes,
      directives,
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
      on: {
        beforeEnter: this.dialog && this.dialogContentBeforeEnter || this.contentBeforeEnter,
        enter: this.dialog && this.dialogContentEnter || this.contentEnter,
        beforeLeave: this.dialog && this.dialogContentBeforeLeave || this.contentBeforeLeave,
        leave: this.dialog && this.dialogContentLeave || this.contentLeave
      }
    }, children)

    const activator = h('transition-group', {
      ref: 'activator',
      props: {
        tag: 'div',
        css: false
      },
      on: {
        beforeEnter: this.dialog && this.dialogActivatorBeforeEnter || this.beforeEnterTransition,
        enter: this.dialog && this.dialogActivatorEnter || this.enterTransition,
        afterEnter: this.afterEnterTransition,
        beforeLeave: this.dialog && this.dialogActivatorBeforeLeave || this.beforeLeaveTransition,
        leave: this.dialog && this.dialogActivatorLeave || this.leaveTransition,
        afterLeave: this.afterLeaveTransition
      },
      class: {
        'morph--activator': true
      }
    }, [!this.isActive && this.$slots.activator.map((e, i) => { e.key = i; return e })])

    return h('div', data, [activator, content])
  }
}
