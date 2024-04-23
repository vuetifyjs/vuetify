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
}, 'VLocaleProvider')

export const VLocaleProvider = genericComponent()({
  name: 'VLocaleProvider',

  props: makeVLocaleProviderProps(),

  setup (props, { slots }) {
    const { rtlClasses, isRtl } = provideLocale(props)

    useRender(() => (
      <div
        class={[
          'v-locale-provider',
          rtlClasses.value,
          props.class,
        ]}
        dir={isRtl ? 'rtl' : 'ltr' }
        style={ props.style }
      >
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})

export type VLocaleProvider = InstanceType<typeof VLocaleProvider>
