// Styles
import './VBtnToggle.sass'

// Components
import { makeVBtnGroupProps, VBtnGroup } from '@/components/VBtnGroup/VBtnGroup'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey } from 'vue'
import type { BtnToggleSlotProps, DefaultBtnToggleSlot, VBtnToggleSlots } from './VBtnToggle.types'
import type { GroupProvide } from '@/composables/group'
import type { GenericProps } from '@/util'

export type { BtnToggleSlotProps, DefaultBtnToggleSlot }

export const VBtnToggleSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-btn-toggle')

export const makeVBtnToggleProps = propsFactory({
  ...makeVBtnGroupProps(),
  ...makeGroupProps(),
}, 'VBtnToggle')

export const VBtnToggle = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VBtnToggleSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VBtnToggle',

  props: makeVBtnToggleProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { isSelected, next, prev, select, selected } = useGroup(props, VBtnToggleSymbol)

    useRender(() => {
      const btnGroupProps = VBtnGroup.filterProps(props)

      return (
        <VBtnGroup
          class={[
            'v-btn-toggle',
            {
              'v-btn-toggle--has-color': !!props.color,
            },
            props.class,
          ]}
          { ...btnGroupProps }
          style={ props.style }
        >
          { slots.default?.({
            isSelected,
            next,
            prev,
            select,
            selected,
          })}
        </VBtnGroup>
      )
    })

    return {
      next,
      prev,
      select,
    }
  },
})

export type VBtnToggle = InstanceType<typeof VBtnToggle>
