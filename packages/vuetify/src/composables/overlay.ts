// Utilities
import { computed, inject, ref, watch } from 'vue'
import { getUid } from '@/util'

// Types
import type { InjectionKey, Ref } from 'vue'

type OverlayProvide = {
  overlays: Ref<number[]>
  zIndex: Ref<number>
}

export const VuetifyOverlayKey: InjectionKey<OverlayProvide> = Symbol.for('vuetify:overlay')

const ROOT_ZINDEX = 2000

export function useOverlay (isActive: Ref<boolean | undefined>) {
  const { zIndex, overlays } = inject(VuetifyOverlayKey, { zIndex: ref(ROOT_ZINDEX), overlays: ref([]) })

  const id = getUid()

  watch(isActive, value => {
    if (value) {
      overlays.value.push(id)
    } else {
      overlays.value = overlays.value.filter(x => x !== id)
    }
  }, {
    immediate: true,
  })

  const overlayZIndex = computed(() => zIndex.value + overlays.value.indexOf(id) + 1)

  return { overlayZIndex }
}
