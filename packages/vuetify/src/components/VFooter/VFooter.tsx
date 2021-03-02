// Styles
import './VFooter.sass'

// Composables
import { makeSheetProps, useSheet } from '@/components/VSheet/VSheet'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VFooter',

  props: makeProps({
    ...makeSheetProps(),
    ...makeTagProps({ tag: 'footer' }),
  }),

  setup (props, { slots }) {
    const { sheetClasses, sheetStyles } = useSheet(props, 'v-footer')

    return () => (
      <props.tag
        class={[
          'v-footer',
          sheetClasses.value,
        ]}
        style={ sheetStyles.value }
        v-slots={ slots }
      />
    )
  },
})
