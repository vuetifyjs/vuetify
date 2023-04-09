// Composables
import { useHydration } from '@/composables/hydration'

// Utilities
import { defineComponent } from '@/util'
import type { GenericSlot } from '@/util'

export const VNoSsr = defineComponent<GenericSlot>({
  name: 'VNoSsr',

  setup (_, { slots }) {
    const show = useHydration()

    return () => show.value && slots.default?.()
  },
})

export type VNoSsr = InstanceType<typeof VNoSsr>
