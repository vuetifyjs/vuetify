// Styles
import './VButton.scss'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VButton',

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
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-button')
    const { densityClasses } = useDensity(props, 'v-button')

    return () => (
      <props.tag
        class={[
          {
            'v-button': true,
            'v-button--contained': props.contained,
            'v-button--elevated': props.elevated,
            'v-button--icon': !!props.icon,
          },
          sheetClasses.value,
          densityClasses.value,
        ]}
        style={ sheetStyles.value }
      >
        <span class="v-button__overlay" />

        { slots.prepend?.() }

        { props.prependIcon && <i class={['v-button__prepend-icon', props.prependIcon]}></i> }

        { props.icon && <i class={['v-button__icon', props.icon]}></i> }

        { slots.default && <span class="v-button__text">{ slots.default?.()}</span> }

        { slots.append?.() }

        { props.appendIcon && <i class={['v-button__append-icon', props.appendIcon]}></i> }
      </props.tag>
    )
  },
})
