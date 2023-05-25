// Styles
import './VIcon.sass'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { IconValue, useIcon } from '@/composables/icons'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, ref, Text, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

export const makeVIconProps = propsFactory({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: IconValue,

  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'i' }),
  ...makeThemeProps(),
}, 'v-icon')

export const VIcon = genericComponent()({
  name: 'VIcon',

  props: makeVIconProps(),

  setup (props, { attrs, slots }) {
    const slotIcon = ref<string>()

    const { themeClasses } = provideTheme(props)
    const { iconData } = useIcon(computed(() => slotIcon.value || props.icon))
    const { sizeClasses } = useSize(props)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))

    useRender(() => {
      const slotValue = slots.default?.()
      if (slotValue) {
        slotIcon.value = slotValue.filter(node =>
          node.type === Text && node.children && typeof node.children === 'string'
        )[0]?.children as string
      }

      return (
        <iconData.value.component
          tag={ props.tag }
          icon={ iconData.value.icon }
          class={[
            'v-icon',
            'notranslate',
            themeClasses.value,
            sizeClasses.value,
            textColorClasses.value,
            {
              'v-icon--clickable': !!attrs.onClick,
              'v-icon--start': props.start,
              'v-icon--end': props.end,
            },
            props.class,
          ]}
          style={[
            !sizeClasses.value ? ({
              fontSize: convertToUnit(props.size),
              height: convertToUnit(props.size),
              width: convertToUnit(props.size),
            }) : undefined,
            textColorStyles.value,
            props.style,
          ]}
          role={ attrs.onClick ? 'button' : undefined }
          aria-hidden={ !attrs.onClick }
        >
          { slotValue }
        </iconData.value.component>
      )
    })

    return {}
  },
})

export type VIcon = InstanceType<typeof VIcon>
