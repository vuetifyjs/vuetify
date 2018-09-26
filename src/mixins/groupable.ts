// Mixins
import { inject as RegistrableInject } from './registrable'

// Utilities
import mixins from '../util/mixins'
import { PropValidator } from 'vue/types/options'

export function factory<T extends string> (parent = 'itemGroup') {
  return mixins(
    RegistrableInject(parent)
  ).extend({
    name: 'groupable',

    props: {
      activeClass: {
        type: String,
        default (): string | undefined {
          if (!this[parent]) return undefined

          return this[parent].activeClass
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
      this[parent] && this[parent].register(this)
    },

    beforeDestroy () {
      this[parent] && this[parent].unregister(this)
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
