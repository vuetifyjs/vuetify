import './VTabsSlider.sass'

import { defineComponent } from '@/util'
import { useBackgroundColor } from '@/composables/color'
import { toRef } from 'vue'

export const VTabsSlider = defineComponent({
  name: 'VTabsSlider',

  props: {
    color: String,
  },

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))

    return () => (
      <div
        class={[
          'v-tabs-slider',
          backgroundColorClasses.value,
        ]}
        style={ backgroundColorStyles.value }
      />
    )
  },
})
