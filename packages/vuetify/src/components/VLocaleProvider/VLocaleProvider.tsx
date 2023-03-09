// Styles
import './VLocaleProvider.sass'

// Composables
import { provideLocale } from '@/composables/locale'
import { makeComponentProps } from '@/composables/component'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VLocaleProvider = genericComponent()({
  name: 'VLocaleProvider',

  props: {
    locale: String,
    fallbackLocale: String,
    messages: Object,
    rtl: {
      type: Boolean,
      default: undefined,
    },
    ...makeComponentProps(),
  },

  setup (props, { slots }) {
    const { rtlClasses } = provideLocale(props)

    useRender(() => (
      <div
        class={[
          'v-locale-provider',
          props.class,
          rtlClasses.value,
        ]}
        style={ props.style }
      >
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})

export type VLocaleProvider = InstanceType<typeof VLocaleProvider>
