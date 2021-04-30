import { defineComponent } from 'vue'
import { provideLocale } from '@/composables/locale'
import { provideRtl } from '@/composables/rtl'
import { makeProps } from '@/util'
import './VLocaleProvider.sass'

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

  setup (props, ctx) {
    const localeInstance = provideLocale(props)
    const { rtlClasses } = provideRtl(props, localeInstance)

    return () => (
      <div
        class={[
          "v-locale-provider",
          rtlClasses.value
        ]}
      >
        { ctx.slots.default?.() }
      </div>
    )
  },
})
