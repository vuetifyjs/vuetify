// Mixins
import { inject as RegistrableInject } from './registrable'

// Utilities
import mixins from '../util/mixins'
import { PropValidator } from 'vue/types/options'

export function factory (
  namespace = 'itemGroup',
  child?: string,
  parent?: string
) {
  return mixins(
    RegistrableInject(namespace, child, parent)
  ).extend({
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
      this[namespace] && this[namespace].register(this)
    },

    beforeDestroy () {
      this[namespace] && this[namespace].unregister(this)
    },

    methods: {
      toggle () {
        this.$emit('change')
      }
    }
  })
}

const Groupable = factory()

export default Groupable
