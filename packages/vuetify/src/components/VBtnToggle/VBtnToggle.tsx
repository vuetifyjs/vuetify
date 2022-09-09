// Styles
import './VBtnToggle.sass'

// Components
import { VBtnGroup } from '@/components/VBtnGroup'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'

// Utility
import { genericComponent, useRender } from '@/util'

// Types
import type { GroupProvide } from '@/composables/group'
import type { InjectionKey } from 'vue'
import type { MakeSlots } from '@/util'

export type BtnToggleSlotProps = 'isSelected' | 'select' | 'selected' | 'next' | 'prev'
export interface DefaultBtnToggleSlot extends Pick<GroupProvide, BtnToggleSlotProps> {}

export const VBtnToggleSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-btn-toggle')

export const VBtnToggle = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    default: [DefaultBtnToggleSlot]
  }>
}>()({
  name: 'VBtnToggle',

  props: makeGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { isSelected, next, prev, select, selected } = useGroup(props, VBtnToggleSymbol)

    useRender(() => (
      <VBtnGroup class="v-btn-toggle">
        { slots.default?.({
          isSelected,
          next,
          prev,
          select,
          selected,
        } as DefaultBtnToggleSlot) }
      </VBtnGroup>
    ))

    return {
      next,
      prev,
      select,
    }
  },
})

export type VBtnToggle = InstanceType<typeof VBtnToggle>
