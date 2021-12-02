// Styles
import './VBtnToggle.sass'

// Components
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useBackgroundColor, useTextColor } from '@/composables/color'

// Utility
import { computed } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { GroupProvide } from '@/composables/group'
import type { InjectionKey } from 'vue'
import type { MakeSlots } from '@/util'

export type BtnToggleSlotProps = 'isSelected' | 'select' | 'selected' | 'next' | 'prev'
export interface DefaultBtnToggleSlot extends Pick<GroupProvide, BtnToggleSlotProps> {}

export const VBtnToggleSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-expansion-panel')

export const VBtnToggle = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    default: [DefaultBtnToggleSlot]
  }>
}>()({
  name: 'VBtnToggle',

  props: {
    color: String,
    bgColor: String,

    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeGroupProps({ selectedClass: 'v-item--selected' }),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(computed(() => props.bgColor))
    const { borderClasses } = useBorder(props, 'v-btn-toggle')
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-btn-toggle')
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => props.color))
    const { isSelected, next, prev, select, selected } = useGroup(props, VBtnToggleSymbol)

    useRender(() => (
      <props.tag
        class={[
          'v-btn-toggle',
          themeClasses.value,
          backgroundColorClasses.value,
          borderClasses.value,
          elevationClasses.value,
          roundedClasses.value,
          textColorClasses.value,
        ]}
        style={{
          ...backgroundColorStyles.value,
          ...textColorStyles.value,
        }}
      >
        { slots.default?.({
          isSelected,
          next,
          prev,
          select,
          selected,
        } as DefaultBtnToggleSlot) }
      </props.tag>
    ))

    return {
      next,
      prev,
      select,
    }
  },
})
