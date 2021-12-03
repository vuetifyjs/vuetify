import './VBtnGroup.sass'

// Components
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useBackgroundColor } from '@/composables/color'

// Utility
import { computed } from 'vue'
import { defineComponent, useRender } from '@/util'
import { makeDensityProps, useDensity } from '@/composables/density'

// Types

export const VBtnGroup = defineComponent({
  name: 'VBtnGroup',

  props: {
    color: String,
    // probably need to use variants
    text: Boolean,

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { densityClasses } = useDensity(props, 'v-btn-group')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(computed(() => props.color))
    const { borderClasses } = useBorder(props, 'v-btn-group')
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props, 'v-btn-group')

    useRender(() => (
      <props.tag
        class={[
          'v-btn-group',
          {
            'v-btn-group--text': props.text,
          },
          themeClasses.value,
          backgroundColorClasses.value,
          borderClasses.value,
          densityClasses.value,
          elevationClasses.value,
          roundedClasses.value,
        ]}
        style={{
          ...backgroundColorStyles.value,
        }}
        v-slots={ slots }
      />
    ))
  },
})
