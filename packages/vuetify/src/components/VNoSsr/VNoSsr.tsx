// Composables
import { useHydration } from '@/composables/hydration'

// Utilities
import { defineComponent, renderSlot } from '@/util'

export const VNoSsr = defineComponent({
  name: 'VNoSsr',

  setup (_, { slots }) {
    const show = useHydration()

    return () => show.value && renderSlot(slots, 'default')
  },
})

export type VNoSsr = InstanceType<typeof VNoSsr>
