// Styles
import './VSystemBar.sass'

// Composables
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor } from '@/composables/color'
import { makeLayoutItemProps, useLayoutItem } from '@/composables/layout'

// Utilities
import { defineComponent } from '@/util'
import { computed, ref, toRef } from 'vue'
import { provideDefaults } from '@/composables/defaults'

export const VSystemBar = defineComponent({
  name: 'VSystemBar',

  props: {
    color: String,
    window: Boolean,
    height: [Number, String],

    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)
    const height = computed(() => props.height ?? props.window ? 32 : 24)
    const { layoutItemStyles } = useLayoutItem({
      id: props.name,
      priority: computed(() => parseInt(props.priority, 10)),
      position: ref('top'),
      layoutSize: height,
      elementSize: height,
      active: computed(() => true),
      absolute: toRef(props, 'absolute'),
    })

    provideDefaults({
      VBtn: {
        variant: 'text',
        density: 'compact',
      },
    }, { scoped: true })

    return () => (
      <props.tag
        class={[
          'v-system-bar',
          { 'v-system-bar--window': props.window },
          themeClasses.value,
          backgroundColorClasses.value,
          elevationClasses.value,
          roundedClasses.value,
        ]}
        style={[
          backgroundColorStyles.value,
          layoutItemStyles.value,
        ]}
        v-slots={ slots }
      />
    )
  },
})
