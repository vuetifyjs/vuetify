// Styles
import './VSystemBar.sass'

// Composables
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VSystemBar',

  props: makeProps({
    lightsOut: Boolean,
    window: Boolean,
    ...makeSheetProps(),
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-system-bar')

    return () => (
      <props.tag
        class={[
          {
            'v-system-bar': true,
            'v-system-bar--lights-out': props.lightsOut,
            'v-system-bar--window': props.window,
          },
          sheetClasses.value,
        ]}
        style={ sheetStyles.value }
        v-slots={ slots }
      />
    )
  },
})
