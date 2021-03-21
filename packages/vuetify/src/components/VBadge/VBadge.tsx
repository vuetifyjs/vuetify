// Styles
import './VBadge.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { makeBorderRadiusProps, useBorderRadius } from '@/composables/border-radius'
import { makeTagProps } from '@/composables/tag'
import { makeTransitionProps, withTransition } from '@/composables/transition'
import { useBackgroundColor, useTextColor } from '@/composables/color'

// Utilities
import { computed, defineComponent, toRef } from 'vue'
import { convertToUnit, extract } from '@/util/helpers'

export default defineComponent({
  name: 'VBadge',

  inheritAttrs: false,

  props: {
    bordered: Boolean,
    color: {
      type: String,
      default: 'primary',
    },
    content: String,
    dot: Boolean,
    floating: Boolean,
    icon: String,
    label: {
      type: String,
      default: '$vuetify.badge',
    },
    location: {
      type: String,
      default: 'top-right',
      validator: (value: string) => {
        const [vertical, horizontal] = (value ?? '').split('-')

        return (
          ['top', 'bottom'].includes(vertical) &&
          ['left', 'right'].includes(horizontal)
        )
      },
    },
    modelValue: {
      type: Boolean,
      default: true,
    },
    offsetX: [Number, String],
    offsetY: [Number, String],
    textColor: String,
    ...makeBorderRadiusProps(),
    ...makeTagProps(),
    ...makeTransitionProps({ transition: 'scale-rotate-transition' }),
  },

  setup (props, ctx) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { borderRadiusClasses } = useBorderRadius(props)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'textColor'))

    const position = computed(() => {
      if (!props.floating) return props.dot ? 8 : 12

      return props.dot ? 2 : 4
    })

    function calculatePosition (offset?: number | string) {
      return `calc(100% - ${convertToUnit(position.value + parseInt(offset ?? 0, 10))})`
    }

    const locationStyles = computed(() => {
      const [vertical, horizontal] = (props.location ?? '').split('-')

      // TODO: RTL support

      return {
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        top: 'auto',
        [horizontal === 'left' ? 'right' : 'left']: calculatePosition(props.offsetX),
        [vertical === 'top' ? 'bottom' : 'top']: calculatePosition(props.offsetY),
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
              'v-badge--floating': props.floating,
            },
          ]}
          { ...attrs }
        >
          <div class="v-badge__wrapper">
            { ctx.slots.default?.() }

            {
              withTransition(
                <span
                  v-show={ props.modelValue }
                  class={[
                    'v-badge__badge',
                    backgroundColorClasses.value,
                    borderRadiusClasses.value,
                    textColorClasses.value,
                  ]}
                  style={[
                    backgroundColorStyles.value,
                    locationStyles.value,
                    textColorStyles.value,
                  ] as any} // TODO: Fix this :(
                  aria-atomic="true"
                  aria-label="locale string here" // TODO: locale string here
                  aria-live="polite"
                  role="status"
                  { ...badgeAttrs }
                >
                  {
                    props.dot ? undefined
                      : ctx.slots.badge ? ctx.slots.badge?.()
                        : props.icon ? <VIcon icon={props.icon} />
                          : props.content
                  }
                </span>,
                props.transition,
              )
            }
          </div>
        </props.tag>
      )
    }
  },
})
