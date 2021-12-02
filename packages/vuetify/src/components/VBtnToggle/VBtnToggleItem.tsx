// Components
import { VBtn } from '../VBtn'
import { VBtnToggleSymbol } from './VBtnToggle'

// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'

// Utility
import { computed } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { MakeSlots } from '@/util'

export interface DefaultBtnItemSlot {
  class: (string | boolean | undefined)[]
  disabled: boolean | undefined
  flat: true
  onClick: (value: boolean) => void
}

export const VBtnToggleItem = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    default: [DefaultBtnItemSlot]
  }>
}>()({
  name: 'VBtnToggleItem',

  props: makeGroupItemProps(),

  setup (props, { attrs, slots }) {
    const {
      disabled,
      select,
      selectedClass,
    } = useGroupItem(props, VBtnToggleSymbol)

    const slotProps = computed<DefaultBtnItemSlot>(() => ({
      class: [
        'v-btn-toggle-item',
        selectedClass.value,
      ],
      disabled: disabled.value,
      flat: true,
      onClick: select,
    }))

    useRender(() => (
      <>
        { slots.default
          ? slots.default?.(slotProps.value)
          : (
            <VBtn
              { ...slotProps.value }
              { ...attrs }
              v-slots={{ ...slots }}
            />
          )
        }
      </>
    ))

    return {}
  },
})
