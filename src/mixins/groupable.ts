// Mixins
import { Registrable, inject as RegistrableInject } from './registrable'

// Utilities
import { ExtractVue } from '../util/mixins'
import { PropValidator } from 'vue/types/options'
import { VueConstructor } from 'vue'

/* eslint-disable-next-line no-use-before-define */
export type Groupable<T extends string> = VueConstructor<ExtractVue<Registrable<T>> & {
  activeClass: string
  isActive: boolean
  groupClasses: object
  toggle (): void
}>

export function factory<T extends string> (
  namespace: T,
  child?: string,
  parent?: string
): Groupable<T> {
  return RegistrableInject(namespace, child, parent).extend({
    name: 'groupable',

    props: {
      activeClass: {
        type: String,
        default (): string | undefined {
          if (!this[namespace]) return undefined

          return this[namespace].activeClass
        }
      } as any as PropValidator<string>,
      disabled: Boolean
    },

    data () {
      return {
        isActive: false
      }
    },

    computed: {
      groupClasses (): object {
        if (!this.activeClass) return {}

        return {
          [this.activeClass]: this.isActive
        }
      }
    },

    created () {
      this[namespace] && (this[namespace] as any).register(this)
    },

    beforeDestroy () {
      this[namespace] && (this[namespace] as any).unregister(this)
    },

    methods: {
      toggle () {
        this.$emit('change')
      }
    }
  })
}

/* eslint-disable-next-line no-redeclare */
const Groupable = factory('itemGroup')

export default Groupable
