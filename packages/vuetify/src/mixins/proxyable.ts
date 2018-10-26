import Vue, { VueConstructor } from 'vue'

/* eslint-disable-next-line no-use-before-define */
export type Proxyable<T extends string = 'value'> = VueConstructor<Vue & {
  internalLazyValue: unknown
  internalValue: unknown
} & Record<T, any>>

export function factory<T extends string = 'value'> (prop?: T, event?: string): Proxyable<T>
export function factory (
  prop = 'value',
  event = 'change'
) {
  return Vue.extend({
    name: 'proxyable',

    model: {
      prop,
      event
    },

    props: {
      [prop]: {
        required: false
      }
    },

    data () {
      return {
        internalLazyValue: this[prop] as unknown
      }
    },

    computed: {
      internalValue: {
        get (): unknown {
          return this.internalLazyValue
        },
        set (val: any) {
          if (val === this.internalLazyValue) return

          this.internalLazyValue = val

          this.$emit(event, val)
        }
      }
    },

    watch: {
      [prop] (val) {
        this.internalLazyValue = val
      }
    }
  })
}

/* eslint-disable-next-line no-redeclare */
const Proxyable = factory()

export default Proxyable
