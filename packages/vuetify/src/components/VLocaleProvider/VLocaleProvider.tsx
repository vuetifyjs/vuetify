import './VLocaleProvider.sass'

// Composables
import { provideLocale } from '@/composables/locale'
import { provideRtl } from '@/composables/rtl'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VLocaleProvider',

  props: makeProps({
    locale: String,
    fallbackLocale: String,
    messages: Object,
    rtl: {
      type: Boolean,
      default: undefined,
    },
  }),

  setup (props, { slots }) {
    const localeInstance = provideLocale(props)
    const { rtlClasses } = provideRtl(props, localeInstance)

    return () => (
      <div
        class={[
          'v-locale-provider',
          rtlClasses.value,
        ]}
      >
        { slots.default?.() }
      </div>
    )
  },
})
