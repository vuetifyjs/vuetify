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
    value: Boolean,
    lazyValidation: Boolean
  },

  watch: {
    errorBag: {
      handler () {
        const errors = Object.values(this.errorBag).includes(true)

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
    watchInputs (inputs = this.getInputs()) {
      for (const child of inputs) {
        if (this.inputs.includes(child)) {
          continue // We already know about this input
        }

        this.inputs.push(child)
        this.watchChild(child)
      }
    },
    watchChild (child) {
      const watcher = (child) => {
        child.$watch('valid', (val) => {
          this.$set(this.errorBag, child._uid, !val)
        }, { immediate: true })
      }

      if (!this.lazyValidation) return watcher(child)

      // Only start watching inputs if we need to
      child.$watch('shouldValidate', (val) => {
        if (!val) return

        // Only watch if we're not already doing it
        if (this.errorBag.hasOwnProperty(child._uid)) return

        watcher(child)
      })
    },
    validate () {
      const errors = this.inputs.filter(input => !input.validate(true)).length
      return !errors
    },
    reset () {
      this.inputs.forEach((input) => input.reset())
      if (this.lazyValidation) {
        Object.keys(this.errorBag).forEach(key => this.$delete(this.errorBag, key))
      }
    }
  },

  mounted () {
    this.$vuetify.load(() => this.watchInputs())
  },

  updated () {
    const inputs = this.getInputs()

    if (inputs.length < this.inputs.length) {
      // Something was removed, we don't want it in the errorBag any more
      const removed = this.inputs.filter(i => !inputs.includes(i))

      for (const input of removed) {
        this.$delete(this.errorBag, input._uid)
        this.$delete(this.inputs, this.inputs.indexOf(input))
      }
    }

    this.watchInputs(inputs)
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
