// Styles
import './VExpansionPanel.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { InjectionKey } from 'vue'
import type { GroupItemProvide } from '@/composables/group'

export const VExpansionPanelSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-expansion-panel')

export default defineComponent({
  name: 'VExpansionPanels',

  props: {
    disabled: Boolean,
    readonly: Boolean,
    variant: {
      type: String,
      validator: (v: any) => ['accordion', 'inset', 'popout'].includes(v),
    },
    ...makeTagProps(),
    ...makeGroupProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    useGroup(props, VExpansionPanelSymbol)
    const { themeClasses } = useTheme(props)

    const variantClass = computed(() => props.variant && `v-expansion-panels--${props.variant}`)

    return () => (
      <props.tag
        class={[
          'v-expansion-panels',
          themeClasses.value,
          variantClass.value,
        ]}
      >
        { slots.default?.() }
      </props.tag>
    )
  },
})
