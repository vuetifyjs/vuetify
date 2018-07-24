
// Types
import Vue from 'vue'
import { ClassesObject } from './../../types'

export function addElevation (elevation: number | string | undefined | boolean | null): ClassesObject {
  if (elevation == null || typeof elevation === 'boolean') return {}

  return {
    [`elevation-${elevation}`]: true
  }
}

export default Vue.extend({
  name: 'elevatable',

  props: {
    elevation: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    elevationClasses (): object {
      return addElevation(this.elevation)
    }
  }
})
