export default {
  name: 'v-form',

  inheritAttrs: false,

  data () {
    return {
      inputs: [],
      errorBag: {}
    }
  },

  props: {
    value: Boolean
  },

  watch: {
    errorBag: {
      handler () {
        const keys = Object.keys(this.errorBag)
        if (keys.length < this.inputs.length) return false

        const errors = keys.reduce((errors, key) => {
          errors = errors || this.errorBag[key]
          return errors
        }, false)

        this.$emit('input', !errors)

        return !errors
      },
      deep: true
    }
  },

  methods: {
    getInputs () {
      const results = []

      const search = (children, depth = 0) => {
        for (const child of children) {
          if (child.errorBucket !== undefined) {
            results.push(child)
          } else {
            search(child.$children, depth + 1)
          }
        }
        if (depth === 0) return results
      }

      return search(this.$children)
    },
    watchInputs () {
      const inputs = this.getInputs()

      if (inputs.length < this.inputs.length) {
        // Something was removed, we don't want it in the errorBag any more
        const newUids = inputs.map(i => i._uid)

        const removed = this.inputs.filter(i => !newUids.includes(i))

        for (const input of removed) {
          this.$delete(this.errorBag, input)
          this.$delete(this.inputs, this.inputs.indexOf(input))
        }
      }

      for (const child of inputs) {
        if (this.inputs.includes(child._uid)) {
          continue // We already know about this input
        }

        this.inputs.push(child._uid)

        // Only start watching inputs if we need to
        child.$watch('shouldValidate', (val) => {
          if (!val) return

          // Only watch if we're not already doing it
          if (this.errorBag.hasOwnProperty(child._uid)) return

          child.$watch('valid', (val) => {
            this.$set(this.errorBag, child._uid, !val)
          }, { immediate: true })
        })
      }
    },
    validate () {
      const errors = this.getInputs().reduce((errors, child) => {
        const error = !child.validate(true)
        return errors || error
      }, false)

      return !errors
    },
    reset () {
      this.getInputs().forEach((input) => input.reset())
    }
  },

  mounted () {
    this.$vuetify.load(this.watchInputs)
  },

  updated () {
    this.watchInputs()
  },

  render (h) {
    return h('form', {
      attrs: this.$attrs,
      on: {
        submit: e => this.$emit('submit', e)
      }
    }, this.$slots.default)
  }
}
