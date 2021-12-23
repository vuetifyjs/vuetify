// Styles
import './VExpansionPanel.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { GroupItemProvide } from '@/composables/group'

export const VExpansionPanelSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-expansion-panel')

const allowedVariants = ['default', 'accordion', 'inset', 'popout'] as const
type Variant = typeof allowedVariants[number]

export const VExpansionPanels = defineComponent({
  name: 'VExpansionPanels',

  props: {
    variant: {
      type: String as PropType<Variant>,
      default: 'default',
      validator: (v: any) => allowedVariants.includes(v),
    },

    ...makeTagProps(),
    ...makeGroupProps(),
    ...makeThemeProps(),
  },

  emits: {
    'update:modelValue': (val: unknown) => true,
  },

  setup (props, { slots }) {
    useGroup(props, VExpansionPanelSymbol)
    const { themeClasses } = provideTheme(props)

    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`)

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

export type VExpansionPanels = InstanceType<typeof VExpansionPanels>
