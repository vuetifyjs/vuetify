// Styles
import './VBtn.sass'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { makeTagProps } from '@/composables/tag'
import { useColor } from '@/composables/color'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBtn',

  directives: { Ripple },

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
    ...makeDensityProps(),
    ...makeTagProps({ tag: 'button' }),
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-btn')
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

    return () => (
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
          },
          sheetClasses.value,
          densityClasses.value,
          colorClasses.value,
        ]}
        style={[
          sheetStyles.value,
          colorStyles.value,
        ]}
        v-ripple={ !props.disabled }
      >
        <span class="v-btn__overlay" />
        <span class="v-btn__content">
          { typeof props.icon === 'boolean'
            ? slots.default?.()
            : <i class={['v-btn__icon', props.icon]}></i>
          }
        </span>
      </props.tag>
    )
  },
})
