// Styles
import './VBadge.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeBorderRadiusProps, useBorderRadius } from '@/composables/border-radius'
import { makeTransitionProps, withTransition } from '@/composables/transition'

// Utilities
import { computed, defineComponent, toRef, Transition } from 'vue'
import { convertToUnit } from '@/util/helpers'

const extract = (obj: Record<string, unknown>, properties: string[]) => {
  const extracted: Record<string, unknown> = {}
  const rest: Record<string, unknown> = {}

  Object.entries(obj).forEach(([key, value]) => {
    if (properties.includes(key)) {
      extracted[key] = value
    } else {
      rest[key] = value
    }
  })

  return [extracted, rest]
}

export default defineComponent({
  name: 'VBadge',

  inheritAttrs: false,

  props: {
    bordered: Boolean,
    textColor: String,
    color: {
      type: String,
      default: 'primary',
    },
    content: {
      type: String,
      required: false
    },
    dot: Boolean,
    label: {
      type: String,
      default: '$vuetify.badge',
    },
    offsetX: [Number, String],
    offsetY: [Number, String],
    overlap: Boolean,
    modelValue: {
      type: Boolean,
      default: true
    },
    location: {
      type: String,
      default: 'top-right',
      validator: (value: string) => {
        if (!value || !value.includes('-')) return false
        const [vertical, horizontal] = value.split('-')
        if (!['top', 'bottom'].includes(vertical) || !['left', 'right'].includes(horizontal)) return false

        return true
      }
    },
    ...makeTagProps(),
    ...makeBorderRadiusProps(),
    ...makeTransitionProps({
      transition: 'scale-rotate-transition'
    }),
  },

  setup (props, ctx) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'textColor'))
    const { borderRadiusClasses } = useBorderRadius(props)

    const position = computed(() => {
      if (props.overlap) return props.dot ? 8 : 12
      return props.dot ? 2 : 4
    })

    const calculatePosition = (offset?: number | string) => {
      return `calc(100% - ${convertToUnit(position.value + parseInt(offset ?? 0, 10))})`
    }

    const locationStyles = computed(() => {
      const location = props.location && props.location.includes('-') ? props.location : 'top-right'
      const [vertical, horizontal] = location.split('-')

      // TODO: RTL support

      return {
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        [vertical === 'top' ? 'bottom' : 'top']: calculatePosition(props.offsetY),
        [horizontal === 'left' ? 'right' : 'left']: calculatePosition(props.offsetX)
      }
    })

    return () => {
      const [badgeAttrs, attrs] = extract(ctx.attrs, [
        'aria-atomic',
        'aria-label',
        'aria-live',
        'role',
        'title',
      ])

      return (
        <props.tag
          class={[
            'v-badge',
            {
              'v-badge--bordered': props.bordered,
              'v-badge--dot': props.dot,
              'v-badge--overlap': props.overlap,
            }
          ]}
          { ...attrs }
        >
          { ctx.slots.default?.() }
          { withTransition(
              <span
                v-show={props.modelValue}
                class={[
                  'v-badge__badge',
                  backgroundColorClasses.value,
                  textColorClasses.value,
                  borderRadiusClasses.value,
                ]}
                style={[
                  backgroundColorStyles.value,
                  textColorStyles.value,
                  locationStyles.value,
                ]}
                { ...{
                    'aria-atomic': 'true',
                    // TODO: locale string here
                    // 'aria-label': label,
                    'aria-live': 'polite',
                    role: 'status',
                    ...badgeAttrs,
                  }
                }
              >
                { props.dot
                  ? undefined
                  : ctx.slots.badge
                    ? ctx.slots.badge()
                    : props.content
                }
              </span>,
              props.transition
            )
          }
        </props.tag>
      )
    }
  },
})
