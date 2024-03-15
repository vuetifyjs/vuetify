// Styles
import './VExpansionPanel.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { GroupItemProvide } from '@/composables/group'

export const VExpansionPanelSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-expansion-panel')

const allowedVariants = ['default', 'accordion', 'inset', 'popout'] as const

type Variant = typeof allowedVariants[number]

export const makeVExpansionPanelsProps = propsFactory({
  color: String,
  flat: Boolean,
  focusable: Boolean,
  static: Boolean,
  tile: Boolean,
  variant: {
    type: String as PropType<Variant>,
    default: 'default',
    validator: (v: any) => allowedVariants.includes(v),
  },
  readonly: Boolean,

  ...makeComponentProps(),
  ...makeGroupProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VExpansionPanels')

export const VExpansionPanels = genericComponent()({
  name: 'VExpansionPanels',

  props: makeVExpansionPanelsProps(),

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
        readonly: toRef(props, 'readonly'),
      },
      VExpansionPanelTitle: {
        focusable: toRef(props, 'focusable'),
        static: toRef(props, 'static'),
      },
    })

    useRender(() => (
      <props.tag
        class={[
          'v-expansion-panels',
          {
            'v-expansion-panels--flat': props.flat,
            'v-expansion-panels--tile': props.tile,
          },
          themeClasses.value,
          variantClass.value,
          props.class,
        ]}
        style={ props.style }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VExpansionPanels = InstanceType<typeof VExpansionPanels>
