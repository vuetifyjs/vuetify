import Vue from 'vue'

type InternalValue = undefined | null | number | number[] | string | string[]

export default function proxyable (
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
        internalLazyValue: this[prop] as InternalValue
      }
    },

    computed: {
      internalValue: {
        get (): InternalValue {
          return this.internalLazyValue
        },
        set (val: any) {
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
