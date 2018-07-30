// Types
import Vue from 'vue'
import { ClassesObject } from './../../types'

export function addElevation (
  elevation: number | string | undefined | boolean | null
): ClassesObject {
  if (elevation == null || typeof elevation === 'boolean') return {}

  return {
    [`elevation-${elevation}`]: true
  }
}

export default Vue.extend({
  name: 'elevatable',

  props: {
    hover: [Number, String],
    elevation: {
      type: [Number, String],
      default: 0
    }
  },

  data: () => ({
    isMouseOver: false as boolean
  }),

  computed: {
    computedElevation (): string | number {
      return this.isMouseOver ? this.hover : this.elevation
    },
    elevationClasses (): ClassesObject {
      return addElevation(this.computedElevation)
    }
  },

  methods: {
    listeners (): Record<string, Function> {
      return this.hover === undefined ? {} : {
        mouseenter: (e: Event) => {
          this.isMouseOver = true
          this.$emit('mouseenter', e)
        },
        mouseleave: (e: Event) => {
          this.isMouseOver = false
          this.$emit('mouseleave', e)
        }
      }
    }
  }
})
