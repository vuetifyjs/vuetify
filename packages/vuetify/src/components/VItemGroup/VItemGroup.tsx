// Styles
import './VItemGroup.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { genericComponent, propsFactory } from '@/util'

// Types
import type { GenericProps } from '@/util'

export const VItemGroupSymbol = Symbol.for('vuetify:v-item-group')

export const makeVItemGroupProps = propsFactory({
  ...makeComponentProps(),
  ...makeGroupProps({
    selectedClass: 'v-item--selected',
  }),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VItemGroup')

type VItemGroupSlots = {
  default: {
    isSelected: (id: string) => boolean
    select: (id: string, value: boolean) => void
    next: () => void
    prev: () => void
    selected: readonly string[]
  }
}

export const VItemGroup = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VItemGroupSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VItemGroup',

  props: makeVItemGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { isSelected, select, next, prev, selected } = useGroup(props, VItemGroupSymbol)

    return () => (
      <props.tag
        class={[
          'v-item-group',
          themeClasses.value,
          props.class,
        ]}
        style={ props.style }
      >
        { slots.default?.({
          isSelected,
          select,
          next,
          prev,
          selected: selected.value,
        })}
      </props.tag>
    )
  },
})

export type VItemGroup = InstanceType<typeof VItemGroup>
