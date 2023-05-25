// Styles
import './VDivider.sass'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

type DividerKey = 'borderRightWidth' | 'borderTopWidth' | 'maxHeight' | 'maxWidth'
type DividerStyles = Partial<Record<DividerKey, string>>

export const makeVDividerProps = propsFactory({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,

  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'v-divider')

export const VDivider = genericComponent()({
  name: 'VDivider',

  props: makeVDividerProps(),

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
          props.class,
        ]}
        style={[
          dividerStyles.value,
          textColorStyles.value,
          props.style,
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
