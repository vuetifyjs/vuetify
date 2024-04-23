// Composables
import { VItemGroupSymbol } from './VItemGroup'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'

// Utilities
import { genericComponent, useRender } from '@/util'

type VItemSlots = {
  default: {
    isSelected: boolean | undefined
    selectedClass: boolean | (string | undefined)[] | undefined
    select: ((value: boolean) => void) | undefined
    toggle: (() => void) | undefined
    value: unknown
    disabled: boolean | undefined
  }
}

export const VItem = genericComponent<VItemSlots>()({
  name: 'VItem',

  props: makeGroupItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup (props, { slots }) {
    const { isSelected, isReady, select, toggle, selectedClass, value, disabled } = useGroupItem(props, VItemGroupSymbol)

    useRender(() => slots.default?.({
      isSelected: isSelected.value,
      selectedClass: selectedClass.value,
      select,
      toggle,
      value: value.value,
      disabled: disabled.value,
    }))

    return isReady
  },
})

export type VItem = InstanceType<typeof VItem>
