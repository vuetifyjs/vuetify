// Styles
import '../../stylus/components/_forms.styl'

import { provide as RegistrableProvide } from '../../mixins/registrable'

/* @vue/component */
export default {
  name: 'v-form',

  mixins: [RegistrableProvide('form')],

  inheritAttrs: false,

  props: {
    value: Boolean,
    lazyValidation: Boolean
  },

  data () {
    return {
      inputs: [],
      errorBag: {}
    }
  },

  watch: {
    errorBag: {
      handler () {
        const errors = Object.values(this.errorBag).includes(true)
        this.$emit('input', !errors)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    watchInput (input) {
      const watcher = input => {
        return input.$watch('hasError', val => {
          this.$set(this.errorBag, input._uid, val)
        }, { immediate: true })
      }

      const watchers = {
        valid: undefined,
        shouldValidate: undefined
      }

      if (this.lazyValidation) {
        // Only start watching inputs if we need to
        watchers.shouldValidate = input.$watch('shouldValidate', val => {
          if (!val) return

          // Only watch if we're not already doing it
          if (this.errorBag.hasOwnProperty(input._uid)) return

          watchers.valid = watcher(input)
        })
      } else {
        watchers.valid = watcher(input)
      }

      return watchers
    },
    validate () {
      const errors = this.inputs.filter(input => !input.validate(true)).length
      return !errors
    },
    reset () {
      for (let i = this.inputs.length; i--;) {
        this.inputs[i].reset()
      }
      if (this.lazyValidation) {
        // Account for timeout in validatable
        setTimeout(() => {
          this.errorBag = {}
        }, 0)
      }
    },
    register (input) {
      const unwatch = this.watchInput(input)
      this.inputs.push({
        uid: input._uid,
        validate: input.validate,
        reset: input.reset,
        unwatch
      })
    },
    unregister (input) {
      const found = this.inputs.find(i => i.uid === input._uid)

      if (!found) return

      found.unwatch.valid && found.unwatch.valid()
      found.unwatch.shouldValidate && found.unwatch.shouldValidate()
      this.inputs = this.inputs.filter(i => i.uid !== found.uid)
      this.$delete(this.errorBag, found.uid)
    }
  },

  render (h) {
    return h('form', {
      staticClass: 'v-form',
      attrs: Object.assign({
        novalidate: true
      }, this.$attrs),
      on: {
        submit: e => this.$emit('submit', e)
      }
    }, this.$slots.default)
  }
}
