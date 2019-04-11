// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { RGBA } from '../../util/colorUtils'

export default Vue.extend({
  name: 'v-color-picker-rgba',

  props: {
    value: Array as PropValidator<RGBA>
  },

  methods: {
    genInput (target: string, index: number): VNode {
      const value: number = this.value[index]

      return this.$createElement('div', {
        staticClass: 'v-color-picker__input'
      }, [
        this.$createElement('input', {
          domProps: {
            value: Math.round(value)
          },
          on: {
            change: (e: Event) => {
              const el = e.target as HTMLInputElement
              const newVal = parseInt(el.value || 0, 10)
              this.$emit('input', this.value.map((oldVal, i) => i === index ? oldVal : newVal))
            }
          }
        }),
        this.$createElement('span', target.slice(1).toUpperCase())
      ])
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker__edit'
    }, [
      this.genInput('r', 0),
      this.genInput('g', 1),
      this.genInput('b', 2),
      this.genInput('a', 3)
    ])
  }
})
