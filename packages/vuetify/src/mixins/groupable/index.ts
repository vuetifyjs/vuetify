// Mixins
import { Registrable, inject as RegistrableInject } from '../registrable'

// Utilities
import { ExtractVue } from '../../util/mixins'
import { VueConstructor } from 'vue'
import { PropValidator } from 'vue/types/options'

export type Groupable<T extends string, C extends VueConstructor | null = null> = VueConstructor<ExtractVue<Registrable<T, C>> & {
  activeClass: string
  isActive: boolean
  disabled: boolean
  groupClasses: object
  toggle (e?: Event): void
}>

export function factory<T extends string, C extends VueConstructor | null = null> (
  namespace: T,
  child?: string,
  parent?: string
): Groupable<T, C> {
  return RegistrableInject<T, C>(namespace, child, parent).extend({
    name: 'groupable',

    props: {
      activeClass: {
        type: String,
        default (): string | undefined {
          if (!this[namespace]) return undefined

          return this[namespace].activeClass
        },
      } as any as PropValidator<string>,
      disabled: Boolean,
    },

    data () {
      return {
        isActive: false,
      }
    },

    computed: {
      groupClasses (): object {
        if (!this.activeClass) return {}

        return {
          [this.activeClass]: this.isActive,
        }
      },
    },

    created () {
      this[namespace] && (this[namespace] as any).register(this)
    },

    beforeDestroy () {
      this[namespace] && (this[namespace] as any).unregister(this)
    },

    methods: {
      toggle (e?: Event) {
        if (this.disabled && e) {
          // Prevent keyboard actions
          // from children elements
          // within disabled tabs
          e.preventDefault()
          return
        }
        this.$emit('change')
      },
    },
  })
}

/* eslint-disable-next-line @typescript-eslint/no-redeclare */
const Groupable = factory('itemGroup')

export default Groupable
