import { provideDefaults } from '@/composables/defaults'
import { defineComponent } from 'vue'

import type { PropType } from 'vue'
import type { DefaultsOptions } from '@/composables/defaults'

export const VDefaultsProvider = defineComponent({
  name: 'VDefaultsProvider',

  props: {
    defaults: Object as PropType<DefaultsOptions>,
  },

  setup (props, { slots }) {
    provideDefaults(props)

    return () => slots.default?.()
  },
})
