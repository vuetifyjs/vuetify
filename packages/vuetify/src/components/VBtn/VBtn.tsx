// Styles
import './VBtn.sass'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { makeTagProps } from '@/composables/tag'
import { useColor } from '@/composables/color'

// Directives
import { Ripple, RippleDirectiveBinding } from '@/directives/ripple'

// Components
import VIcon from '@/components/VIcon/VIcon'

// Utilities
import { computed, defineComponent, withDirectives } from 'vue'
import makeProps from '@/util/makeProps'
import { useDirective } from '@/util/useDirective'
import { makeSizeProps, useSize } from '@/composables/size'

export default defineComponent({
  name: 'VBtn',

  props: makeProps({
    text: Boolean,
    flat: Boolean,
    plain: Boolean,
    icon: [Boolean, String],

    block: Boolean,

    color: {
      type: String,
      default: 'primary',
    },
    disabled: Boolean,

    ...makeSheetProps(),
    ...makeSizeProps(),
    ...makeDensityProps(),
    ...makeTagProps({ tag: 'button' }),
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-btn')
    const { sizeClasses } = useSize(props, 'v-btn')
    const { densityClasses } = useDensity(props, 'v-btn')

    const isContained = computed(() => {
      return !(props.text || props.plain || props.icon || props.outlined || props.border !== false)
    })

    const isElevated = computed(() => {
      return isContained.value && !(props.disabled || props.flat)
    })

    const { colorClasses, colorStyles } = useColor(computed(() => ({
      [isContained.value ? 'background' : 'text']: props.color,
    })))

    return () => withDirectives(
      <props.tag
        type="button"
        class={[
          'v-btn',
          {
            'v-btn--contained': isContained.value,
            'v-btn--elevated': isElevated.value,
            'v-btn--icon': !!props.icon,
            'v-btn--plain': props.plain,
            'v-btn--block': props.block,
            'v-btn--disabled': props.disabled,
          },
          sheetClasses.value,
          sizeClasses.value,
          densityClasses.value,
          colorClasses.value,
        ]}
        style={[
          sheetStyles.value,
          colorStyles.value,
        ]}
        disabled={ props.disabled }
      >
        <span class="v-btn__overlay" />

        { typeof props.icon === 'boolean'
          ? slots.default?.()
          : <VIcon icon={ props.icon } size={ props.size } />
        }
      </props.tag>,
      [useDirective<RippleDirectiveBinding>(Ripple, {
        value: !props.disabled,
        modifiers: { center: !!props.icon },
      })]
    )
  },
})
