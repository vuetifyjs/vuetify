// Styles
import '../../stylus/components/_expansion-panel.styl'

// Extensions
import { BaseItemGroup, GroupableInstance } from '../VItemGroup/VItemGroup'

/* @vue/component */
export default BaseItemGroup.extend({
  name: 'v-expansion-panel',

  provide (): object {
    return {
      expansionPanel: this
    }
  },

  props: {
    disabled: Boolean,
    readonly: Boolean,
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },

  computed: {
    classes (): object {
      return {
        ...BaseItemGroup.options.computed.classes.call(this),
        'v-expansion-panel': true,
        'v-expansion-panel--focusable': this.focusable,
        'v-expansion-panel--popout': this.popout,
        'v-expansion-panel--inset': this.inset
      }
    },
    internalValue: {
      get (): boolean[] {
        return this.internalLazyValue
      },
      set (val: any) {
        if (val === this.internalLazyValue) return

        this.internalLazyValue = val

        this.$emit('change', val)
      }
    },
    isMulti (): boolean {
      return this.expand
    },
    selectedIndexes () {
      return this.items.map((item, index) => {
        return this.toggleMethod(this.getValue(item, index))
      })
    },
    toggleMethod (): (v:any) => boolean {
      return (v: any) => v
    }
  },

  beforeMount () {
    this.updateFromValue(this.internalLazyValue)
  },

  methods: {
    getValue (item: GroupableInstance, i: number): unknown {
      return this.internalValue[i]
    },
    onClick (item: GroupableInstance, index: number) {
      const internalValue = this.internalValue.slice()
      let value: number | boolean[] = index

      if (this.isMulti) {
        internalValue[index] = !internalValue[index]

        value = internalValue
      } else if (internalValue[index]) value = []

      this.updateFromValue(value)
    },
    updateFromValue (v: number | boolean[]) {
      let model = Array(this.items.length).fill(false)
      if (typeof v === 'number') {
        model[v] = true
      } else if (v !== null) {
        model = v
      }

      this.internalValue = model
    }
  }
})
