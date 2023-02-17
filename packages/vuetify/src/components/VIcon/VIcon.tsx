// Styles
import './VIcon.sass'

// Composables
import { IconValue, useIcon } from '@/composables/icons'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, Text, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef } from 'vue'

export const makeVIconProps = propsFactory({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: IconValue,

  ...makeSizeProps(),
  ...makeTagProps({ tag: 'i' }),
  ...makeThemeProps(),
}, 'v-icon')

export const VIcon = genericComponent()({
  name: 'VIcon',

  props: makeVIconProps(),

  setup (props, { attrs, slots }) {
    let slotIcon: ComputedRef<string | undefined> | undefined
    if (slots.default) {
      slotIcon = computed(() => {
        const slot = slots.default?.()
        if (!slot) return

        return slot.filter(node =>
          node.type === Text && node.children && typeof node.children === 'string'
        )[0]?.children as string
      })
    }

    const { themeClasses } = provideTheme(props)
    const { iconData } = useIcon(slotIcon || props)
    const { sizeClasses } = useSize(props)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))

    useRender(() => (
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
        ]}
        style={[
          !sizeClasses.value ? ({
            fontSize: convertToUnit(props.size),
            height: convertToUnit(props.size),
            width: convertToUnit(props.size),
          }) : undefined,
          textColorStyles.value,
        ]}
        role={ attrs.onClick ? 'button' : undefined }
        aria-hidden={ !attrs.onClick }
      >
        { slots.default?.() }
      </iconData.value.component>
    ))

    return {}
  },
})

export type VIcon = InstanceType<typeof VIcon>
