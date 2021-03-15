// Styles
import './VIcon.sass'

// Utilities
import { computed, ComputedRef, defineComponent, toRef } from 'vue'
import { convertToUnit, flattenFragments } from '@/util'
import makeProps from '@/util/makeProps'

// Composables
import { makeSizeProps, useSize } from '@/composables/size'
import { useIcon } from '@/composables/icons'
import { makeTagProps } from '@/composables/tag'
import { useTextColor } from '@/composables/color'

// Types
import type { IconValue } from '@/composables/icons'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VIcon',

  props: makeProps({
    color: String,
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    icon: {
      type: [String, Object] as PropType<IconValue>,
    },
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'i' }),
  }),

  setup (props, { slots }) {
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

    const { iconData } = useIcon(slotIcon || props)
    const { sizeClasses } = useSize(props, 'v-icon')
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
            {
              'v-icon--disabled': props.disabled,
              'v-icon--left': props.left,
              'v-icon--right': props.right,
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
