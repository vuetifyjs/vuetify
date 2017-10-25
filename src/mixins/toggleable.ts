import Vue, { ComponentOptions } from 'vue'

export function factory (prop = 'value', event = 'input'): ComponentOptions<
  Vue,
  () => { isActive: boolean },
  undefined,
  undefined,
  { [prop: string]: any }
> {
  return {
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
  }
}

const Toggleable = factory()

export default Toggleable
