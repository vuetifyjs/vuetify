import Vue from 'vue'

/**
 * This mixin provides `attrs$` and `listeners$` to work around
 * vue bug https://github.com/vuejs/vue/issues/10115
 */

function makeWatcher (property: string): ThisType<Vue> & ((val: any, oldVal: any) => void) {
  return function (this: Vue, val, oldVal) {
    for (const attr in oldVal) {
      if (!Object.prototype.hasOwnProperty.call(val, attr)) {
        this.$delete(this.$data[property], attr)
      }
    }
    for (const attr in val) {
      this.$set(this.$data[property], attr, val[attr])
    }
  }
}

export default Vue.extend({
  data: () => ({
    attrs$: {} as Dictionary<string>,
    listeners$: {} as Dictionary<Function | Function[]>,
  }),

  created () {
    // Work around unwanted re-renders: https://github.com/vuejs/vue/issues/10115
    // Make sure to use `attrs$` instead of `$attrs` (confusing right?)
    this.$watch('$attrs', makeWatcher('attrs$'), { immediate: true })
    this.$watch('$listeners', makeWatcher('listeners$'), { immediate: true })
  },
})
