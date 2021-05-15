// Styles
import './VIcon.sass'

// Composables
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { useIcon } from '@/composables/icons'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, ComputedRef, defineComponent, toRef } from 'vue'
import { convertToUnit, flattenFragments, makeProps } from '@/util'

// Types
import type { IconValue } from '@/composables/icons'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VIcon',

  props: makeProps({
    color: String,
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
