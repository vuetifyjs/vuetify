export default {
  name: 'stepper',

  data () {
    return {
      inputValue: null,
      steps: [],
      content: [],
      isReverse: false
    }
  },

  props: {
    vertical: Boolean,
    value: [Number, String]
  },

  computed: {
    classes () {
      return {
        'stepper': true,
        'stepper--vertical': this.vertical
      }
    }
  },

  watch: {
    inputValue (val, prev) {
      this.isReverse = Number(val) < Number(prev)
      this.steps.forEach(i => i.toggle(this.inputValue))
      this.content.forEach(i => i.toggle(this.inputValue, this.isReverse))

      this.$emit('input', this.inputValue)
    },
    value () {
      this.inputValue = this.value
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.init()
      // window.addEventListener('resize', this.resize, false)
    })
  },

  beforeDestroy () {
    // window.removeEventListener('resize', this.resize, false)
  },

  methods: {
    init () {
      this.$children.forEach(i => {
        if (i.$options._componentTag === 'v-stepper-step') {
          this.steps.push(i)
        } else if (i.$options._componentTag === 'v-stepper-content') {
          i.isVertical = this.vertical
          this.content.push(i)
        }
      })

      this.inputValue = this.value || this.steps[0].step || 1
    },

    resize () {
      clearTimeout(this.resizeDebounce)

      this.resizeDebounce = setTimeout(() => {
        this.slider()
      }, 250)
    },
    stepClick (step) {
      this.inputValue = step
    }
  },

  render (h) {
    const data = {
      'class': this.classes
    }

    return h('div', data, [this.$slots.default])
  }
}
