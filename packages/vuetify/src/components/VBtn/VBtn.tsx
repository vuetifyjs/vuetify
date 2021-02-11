// Styles
import './VBtn.scss'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBtn',

  props: makeProps({
    appendIcon: String,
    contained: Boolean,
    elevated: Boolean,
    icon: [Boolean, String],
    prependIcon: String,
    ...makeSheetProps(),
    ...makeDensityProps(),
    ...makeTagProps({ tag: 'button' }),
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-btn')
    const { densityClasses } = useDensity(props, 'v-btn')

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
        ]}
        style={ sheetStyles.value }
      >
        <span class="v-btn__overlay" />

        { slots.prepend?.() }

        { props.prependIcon && <i class={['v-btn__prepend-icon', props.prependIcon]}></i> }

        { props.icon && <i class={['v-btn__icon', props.icon]}></i> }

        { slots.default && <span class="v-btn__content">{ slots.default?.()}</span> }

        { slots.append?.() }

        { props.appendIcon && <i class={['v-btn__append-icon', props.appendIcon]}></i> }
      </props.tag>
    )
  },
})
