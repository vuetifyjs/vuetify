// Styles
import './VButton.scss'

// Composables
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VButton',

  props: makeProps({
    icon: String,
    ...makeSheetProps(),
    ...makeTagProps({ tag: 'button' }),
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-button')

    return () => (
      <props.tag
        class={[
          'v-button',
          sheetClasses.value,
        ]}
        style={ sheetStyles.value }
      >
        { slots.thumbnail?.() }

        { props.icon && <i class={['v-button__icon', props.icon]}></i> }

        <span class="v-button__text">
          { slots.default?.()}
        </span>
      </props.tag>
    )
  },
})
