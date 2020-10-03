// Mixins
import { inject as RegistrableInject } from '../registrable'

// Utilities
import { defineComponent } from 'vue'
import type { DefineComponent, Prop } from 'vue'

export function factory<T extends string, C extends DefineComponent | null = null> (
  namespace: T,
  child?: string,
  parent?: string
) {
  return defineComponent({
    name: 'groupable',

    extends: RegistrableInject<T, C>(namespace, child, parent),

    props: {
      activeClass: {
        type: String,
        default (): string | undefined {
          return undefined
          // TODO
          // if (!this[namespace]) return undefined

          // return this[namespace].activeClass
        },
      } as any as Prop<string>,
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

    beforeUnmount () {
      this[namespace] && (this[namespace] as any).unregister(this)
    },

    methods: {
      toggle () {
        this.$emit('change')
      },
    },
  })
}

/* eslint-disable-next-line no-redeclare */
const Groupable = factory('itemGroup')

export default Groupable
