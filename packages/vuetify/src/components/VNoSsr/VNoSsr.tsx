// Composables
import { useHydration } from '@/composables/hydration'

// Utilities
import { defineComponent } from '@/util'

export const VNoSsr = defineComponent({
  name: 'VNoSsr',

  setup (_, { slots }) {
    const show = useHydration()

    return () => show.value && slots.default?.()
  },
})

export type VNoSsr = InstanceType<typeof VNoSsr>
