// Styles
import './VIcon.sass'

// Composables
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { useIcon } from '@/composables/icons'
import { useTextColor } from '@/composables/color'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, defineComponent, flattenFragments, propsFactory } from '@/util'

// Types
import type { IconValue } from '@/composables/icons'
import type { ComputedRef, PropType } from 'vue'

export const makeVIconProps = propsFactory({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: {
    type: [String, Object] as PropType<IconValue>,
  },

  ...makeSizeProps(),
  ...makeTagProps({ tag: 'i' }),
  ...makeThemeProps(),
}, 'v-icon')

export const VIcon = defineComponent({
  name: 'VIcon',

  props: makeVIconProps(),

  setup (props, { attrs, slots }) {
    let slotIcon: ComputedRef<string | undefined> | undefined
    if (slots.default) {
      slotIcon = computed(() => {
        const slot = slots.default?.()
        if (!slot) return

        return flattenFragments(slot).filter(node =>
          node.children && typeof node.children === 'string'
        )[0]?.children as string
      })
    }

    const { themeClasses } = provideTheme(props)
    const { iconData } = useIcon(slotIcon || props)
    const { sizeClasses } = useSize(props)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'color'))

    return () => {
      return (
        <iconData.value.component
          tag={ props.tag }
          icon={ iconData.value.icon }
          class={[
            'v-icon',
            'notranslate',
            sizeClasses.value,
            textColorClasses.value,
            themeClasses.value,
            {
              'v-icon--clickable': !!attrs.onClick,
              'v-icon--start': props.start,
              'v-icon--end': props.end,
            },
          ]}
          style={[
            !sizeClasses.value ? ({
              fontSize: convertToUnit(props.size),
              width: convertToUnit(props.size),
              height: convertToUnit(props.size),
            }) : undefined,
            textColorStyles.value,
          ]}
          aria-hidden="true"
        />
      )
    }
  },
})
