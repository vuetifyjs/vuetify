import Vue from 'vue'
import { ExtendedVue } from 'vue/types/vue'

export interface toggleable extends Vue{
  isActive: boolean
}

export function factory<T extends string> (prop?: T, event?: string): ExtendedVue<Vue, { isActive: boolean }, {}, {}, Record<T, any>>
export function factory (prop = 'value', event = 'input') {
  return Vue.extend({
    name: 'toggleable',

    model: { prop, event },

    props: {
      [prop]: { required: false }
    },

    data () {
      return {
        isActive: !!this[prop]
      }
    },

    watch: {
      [prop] (val) {
        this.isActive = !!val
      },
      isActive (val) {
        !!val !== this[prop] && this.$emit(event, val)
      }
    }
  })
}

const Toggleable = factory()

export default Toggleable
