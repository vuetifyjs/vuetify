// Styles
import './VBtn.sass'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { makeTagProps } from '@/composables/tag'
import { useBackgroundColor, useTextColor } from '@/composables/color'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBtn',

  directives: { Ripple },

  props: makeProps({
    contained: Boolean,
    elevated: Boolean,
    icon: [Boolean, String],
    color: {
      type: String,
      default: 'primary',
    },
    ...makeSheetProps(),
    ...makeDensityProps(),
    ...makeTagProps({ tag: 'button' }),
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-btn')
    const { densityClasses } = useDensity(props, 'v-btn')
    const colorData = computed(() => {
      return props.contained
        ? useBackgroundColor(props, 'color')
        : useTextColor(props, 'color')
    })

    return () => (
      <props.tag
        class={[
          'v-btn',
          {
            'v-btn--contained': props.contained,
            'v-btn--elevated': props.elevated,
            'v-btn--icon': !!props.icon,
          },
          sheetClasses.value,
          densityClasses.value,
          colorData.value.classes,
        ]}
        style={[
          sheetStyles.value,
          colorData.value.styles,
        ]}
        v-ripple
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
