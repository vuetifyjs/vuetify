// Styles
import './VExpansionPanel.sass'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { GroupItemProvide } from '@/composables/group'

export const VExpansionPanelSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-expansion-panel')

const allowedVariants = ['default', 'accordion', 'inset', 'popout'] as const

type Variant = typeof allowedVariants[number]

export const VExpansionPanels = genericComponent()({
  name: 'VExpansionPanels',

  props: {
    color: String,
    variant: {
      type: String as PropType<Variant>,
      default: 'default',
      validator: (v: any) => allowedVariants.includes(v),
    },
    readonly: Boolean,

    ...makeGroupProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  emits: {
    'update:modelValue': (val: unknown) => true,
  },

  setup (props, { slots }) {
    useGroup(props, VExpansionPanelSymbol)

    const { themeClasses } = provideTheme(props)

    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`)

    provideDefaults({
      VExpansionPanel: {
        color: toRef(props, 'color'),
      },
      VExpansionPanelTitle: {
        readonly: toRef(props, 'readonly'),
      },
    })

    useRender(() => (
      <props.tag
        class={[
          'v-expansion-panels',
          themeClasses.value,
          variantClass.value,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VExpansionPanels = InstanceType<typeof VExpansionPanels>
