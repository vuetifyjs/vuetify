// Styles
import './VLocaleProvider.sass'

// Composables
import { provideLocale } from '@/composables/locale'
import { provideRtl } from '@/composables/rtl'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VLocaleProvider = defineComponent({
  name: 'VLocaleProvider',

  props: {
    locale: String,
    fallbackLocale: String,
    messages: Object,
    rtl: {
      type: Boolean,
      default: undefined,
    },
  },

  setup (props, { slots }) {
    const localeInstance = provideLocale(props)
    const { rtlClasses } = provideRtl(props, localeInstance)

    useRender(() => (
      <div
        class={[
          'v-locale-provider',
          rtlClasses.value,
        ]}
      >
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})
