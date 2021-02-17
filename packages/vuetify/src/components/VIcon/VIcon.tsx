// Styles
import './VIcon.sass'

// Utilities
import { computed, ComputedRef, defineComponent } from 'vue'
import { makeSizeProps, useSize } from '@/composables/size'
import { useIcon } from '@/composables/icons'
import { flattenFragments } from '@/util'
import makeProps from '@/util/makeProps'

// Types
import type { IconValue } from '@/composables/icons'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VIcon',

  props: makeProps({
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    tag: {
      type: String,
      default: 'i',
    },
    icon: {
      type: [String, Object] as PropType<IconValue>,
    },
    ...makeSizeProps(),
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
    const { sizeClasses } = useSize(props)

    return () => {
      return (
        <iconData.value.component
          tag={ props.tag }
          icon={ iconData.value.icon }
          class={[
            'v-icon',
            'notranslate',
            sizeClasses.value,
            {
              'v-icon--disabled': props.disabled,
              'v-icon--left': props.left,
              'v-icon--right': props.right,
            },
          ]}
          style={ !sizeClasses.value ? ({
            'font-size': props.size,
            width: props.size,
            height: props.size,
          }) : undefined }
          aria-hidden="true"
        />
      )
    }
  },
})
