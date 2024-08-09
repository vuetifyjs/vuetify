// Styles
import './VChipGroup.sass'

// Components
import { makeVSlideGroupProps, VSlideGroup } from '@/components/VSlideGroup/VSlideGroup'

// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { deepEqual, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

export const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group')

export const makeVChipGroupProps = propsFactory({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },

  ...makeVSlideGroupProps(),
  ...makeComponentProps(),
  ...makeGroupProps({ selectedClass: 'v-chip--selected' }),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'tonal' } as const),
}, 'VChipGroup')

type VChipGroupSlots = {
  default: {
    isSelected: (id: number) => boolean
    select: (id: number, value: boolean) => void
    next: () => void
    prev: () => void
    selected: readonly number[]
  }
}

export const VChipGroup = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VChipGroupSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VChipGroup',

  props: makeVChipGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { isSelected, select, next, prev, selected } = useGroup(props, VChipGroupSymbol)

    provideDefaults({
      VChip: {
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled'),
        filter: toRef(props, 'filter'),
        variant: toRef(props, 'variant'),
      },
    })

    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props)

      return (
        <VSlideGroup
          { ...slideGroupProps }
          class={[
            'v-chip-group',
            {
              'v-chip-group--column': props.column,
            },
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
        </VSlideGroup>
      )
    })

    return {}
  },
})

export type VChipGroup = InstanceType<typeof VChipGroup>
