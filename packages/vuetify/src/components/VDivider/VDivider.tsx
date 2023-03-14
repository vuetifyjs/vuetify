// Styles
import './VDivider.sass'

// Composables
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, genericComponent, useRender } from '@/util'

type DividerKey = 'borderRightWidth' | 'borderTopWidth' | 'maxHeight' | 'maxWidth'
type DividerStyles = Partial<Record<DividerKey, string>>

export const VDivider = genericComponent()({
  name: 'VDivider',

  props: {
    color: String,
    inset: Boolean,
    length: [Number, String],
    thickness: [Number, String],
    vertical: Boolean,

    ...makeThemeProps(),
  },

  setup (props, { attrs }) {
    const { themeClasses } = provideTheme(props)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))
    const dividerStyles = computed(() => {
      const styles: DividerStyles = {}

      if (props.length) {
        styles[props.vertical ? 'maxHeight' : 'maxWidth'] = convertToUnit(props.length)
      }

      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness)
      }

      return styles
    })

    useRender(() => (
      <hr
        class={[
          {
            'v-divider': true,
            'v-divider--inset': props.inset,
            'v-divider--vertical': props.vertical,
          },
          themeClasses.value,
          textColorClasses.value,
        ]}
        style={[
          dividerStyles.value,
          textColorStyles.value,
        ]}
        aria-orientation={
          !attrs.role || attrs.role === 'separator'
            ? props.vertical ? 'vertical' : 'horizontal'
            : undefined
        }
        role={ `${attrs.role || 'separator'}` }
      />
    ))

    return {}
  },
})

export type VDivider = InstanceType<typeof VDivider>
