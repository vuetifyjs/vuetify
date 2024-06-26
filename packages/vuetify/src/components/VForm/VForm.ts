// Components
import VInput from '../VInput/VInput'

// Mixins
import mixins from '../../util/mixins'
import BindsAttrs from '../../mixins/binds-attrs'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Helpers
import { VNode } from 'vue'
import { getSlot } from '../../util/helpers'

type ErrorBag = Record<number, boolean>
type VInputInstance = InstanceType<typeof VInput>
type Watchers = {
  _uid: number
  valid: () => void
  shouldValidate: () => void
}

/* @vue/component */
export default mixins(
  BindsAttrs,
  RegistrableProvide('form')
  /* @vue/component */
).extend({
  name: 'v-form',

  provide (): object {
    return { form: this }
  },

  inheritAttrs: false,

  props: {
    disabled: Boolean,
    lazyValidation: Boolean,
    readonly: Boolean,
    value: Boolean,
  },

  data: () => ({
    inputs: [] as VInputInstance[],
    watchers: [] as Watchers[],
    errorBag: {} as ErrorBag,
  }),

  watch: {
    errorBag: {
      handler (val) {
        const errors = Object.values(val).includes(true)

        this.$emit('input', !errors)
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    watchInput (input: any): Watchers {
      const watcher = (input: any): (() => void) => {
        return input.$watch('hasError', (val: boolean) => {
          this.$set(this.errorBag, input._uid, val)
        }, { immediate: true })
      }

      const watchers: Watchers = {
        _uid: input._uid,
        valid: () => {},
        shouldValidate: () => {},
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
      return this.inputs.filter(input => !input.validate(true)).length === 0
    },
    /** @public */
    reset (): void {
      this.inputs.forEach(input => input.reset())
      this.resetErrorBag()
    },
    resetErrorBag () {
      if (this.lazyValidation) {
        // Account for timeout in validatable
        setTimeout(() => {
          this.errorBag = {}
        }, 0)
      }
    },
    /** @public */
    resetValidation () {
      this.inputs.forEach(input => input.resetValidation())
      this.resetErrorBag()
    },
    register (input: VInputInstance) {
      this.inputs.push(input)
      this.watchers.push(this.watchInput(input))
    },
    unregister (input: VInputInstance) {
      const found = this.inputs.find(i => i._uid === input._uid)

      if (!found) return

      const unwatch = this.watchers.find(i => i._uid === found._uid)
      if (unwatch) {
        unwatch.valid()
        unwatch.shouldValidate()
      }

      this.watchers = this.watchers.filter(i => i._uid !== found._uid)
      this.inputs = this.inputs.filter(i => i._uid !== found._uid)
      this.$delete(this.errorBag, found._uid)
    },
  },

  render (h): VNode {
    return h('form', {
      staticClass: 'v-form',
      attrs: {
        novalidate: true,
        ...this.attrs$,
      },
      on: {
        submit: (e: Event) => this.$emit('submit', e),
      },
    }, getSlot(this))
  },
})
