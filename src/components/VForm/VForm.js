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
      watchers: [],
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
        _uid: input._uid,
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
      this.inputs.push(input)
      this.watchers.push(unwatch)
    },
    unregister (input) {
      const found = this.inputs.find(i => i._uid === input._uid)

      if (!found) return

      const unwatch = this.watchers.find(i => i._uid === found._uid)
      unwatch.valid && unwatch.valid()
      unwatch.shouldValidate && unwatch.shouldValidate()

      this.watchers = this.watchers.filter(i => i._uid !== found._uid)
      this.inputs = this.inputs.filter(i => i._uid !== found._uid)
      this.$delete(this.errorBag, found._uid)
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
