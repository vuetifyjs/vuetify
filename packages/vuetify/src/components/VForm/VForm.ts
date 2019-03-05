// Styles
import '../../stylus/components/_forms.styl'

// Mixins
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Helpers
import { CreateElement, VNode } from 'vue'

type Watchers = {
  _uid: number
  valid: () => void
  shouldValidate: () => void
}

/* @vue/component */
export default RegistrableProvide('form').extend({
  name: 'v-form',

  inheritAttrs: false,

  props: {
    value: Boolean,
    lazyValidation: Boolean
  },

  data: () => ({
    inputs: [] as any[],
    watchers: [] as Watchers[],
    errorBag: {}
  }),

  watch: {
    errorBag: {
      handler (val) {
        const errors = Object.values(val).includes(true)
        this.$emit('input', !errors)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    watchInput (input: any): Watchers {
      const watcher = (input: any): (() => void) => {
        return input.$watch('hasError', (val: boolean) => {
          this.$set(this.errorBag, input._uid, val)
        }, { immediate: true })
      }

      const watchers = {
        _uid: input._uid,
        valid: () => {},
        shouldValidate: () => {}
      }

      if (this.lazyValidation) {
        // Only start watching inputs if we need to
        watchers.shouldValidate = input.$watch('shouldValidate', (val: boolean) => {
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
    /** @public */
    validate (): boolean {
      const errors = this.inputs.filter(input => !input.validate(true)).length
      return !errors
    },
    /** @public */
    reset (): void {
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
    /** @public */
    resetValidation (): void {
      for (let i = this.inputs.length; i--;) {
        this.inputs[i].resetValidation()
      }
      if (this.lazyValidation) {
        // Account for timeout in validatable
        setTimeout(() => {
          this.errorBag = {}
        }, 0)
      }
    },
    register (input: any) {
      const unwatch = (this as any).watchInput(input)
      this.inputs.push(input)
      this.watchers.push(unwatch)
    },
    unregister (input: any) {
      const found = this.inputs.find(i => i._uid === input._uid)

      if (!found) return

      const unwatch = this.watchers.find(i => i._uid === found._uid)
      unwatch!.valid && unwatch!.valid()
      unwatch!.shouldValidate && unwatch!.shouldValidate()

      this.watchers = this.watchers.filter(i => i._uid !== found._uid)
      this.inputs = this.inputs.filter(i => i._uid !== found._uid)
      this.$delete(this.errorBag, found._uid)
    }
  },

  render (h: CreateElement): VNode {
    return h('form', {
      staticClass: 'v-form',
      attrs: Object.assign({
        novalidate: true
      }, this.$attrs),
      on: {
        submit: (e: Event) => this.$emit('submit', e)
      }
    }, this.$slots.default)
  }
})
