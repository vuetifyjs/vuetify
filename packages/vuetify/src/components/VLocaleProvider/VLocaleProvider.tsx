// Styles
import './VLocaleProvider.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { provideLocale } from '@/composables/locale'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVLocaleProviderProps = propsFactory({
  locale: String,
  fallbackLocale: String,
  messages: Object,
  rtl: {
    type: Boolean,
    default: undefined,
  },

  ...makeComponentProps(),
}, 'v-locale-provider')

export const VLocaleProvider = genericComponent()({
  name: 'VLocaleProvider',

  props: makeVLocaleProviderProps(),

  setup (props, { slots }) {
    const { rtlClasses } = provideLocale(props)

    useRender(() => (
      <div
        class={[
          'v-locale-provider',
          rtlClasses.value,
          props.class,
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
