// Utilities
import { computed, shallowRef, toRef, watch } from 'vue'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { MapRegion } from './svg'

const WIDE_CONE = Math.tan(75 * Math.PI / 180)

export function useMapFocus (
  element: Ref<SVGSVGElement | undefined>,
  regions: MaybeRefOrGetter<MapRegion[]>,
  reveal: (region: SVGGraphicsElement) => void,
) {
  const focused = shallowRef<string>()
  const items = toRef(regions)
  // computed, not toRef: read once per region on every map render
  const tabStop = computed(() => items.value.some(region => region.id === focused.value) ? focused.value : items.value[0]?.id)
  watch(items, () => { focused.value = undefined })

  function regionElement (target: EventTarget | null) {
    const region = (target as Element | null)?.closest?.<SVGGraphicsElement>('[data-v-map-region]')
    return region && element.value?.contains(region) ? region : undefined
  }

  function onFocus (event: FocusEvent) {
    const region = regionElement(event.target)
    if (!region) return
    focused.value = region.getAttribute('data-v-map-region')!
    if (region.matches(':focus-visible')) reveal(region)
  }

  function onKeydown (event: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
    const current = regionElement(event.target)
    if (!current) return
    const candidates = Array.from(element.value!.querySelectorAll<SVGGraphicsElement>('[data-v-map-region]'))
    let next: SVGGraphicsElement | undefined
    if (event.key === 'Home' || event.key === 'End') {
      next = event.key === 'Home' ? candidates[0] : candidates.at(-1)
    } else {
      // inscribed circles stand in for borders, so regions across water or gaps still connect
      const rectangle = current.getBoundingClientRect()
      const radius = Math.min(rectangle.width, rectangle.height) / 2
      const horizontal = ['ArrowLeft', 'ArrowRight'].includes(event.key)
      const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1
      const scored = candidates.flatMap(candidate => {
        const bounds = candidate.getBoundingClientRect()
        if (candidate === current || (!bounds.width && !bounds.height)) return []
        const x = bounds.x + bounds.width / 2 - rectangle.x - rectangle.width / 2
        const y = bounds.y + bounds.height / 2 - rectangle.y - rectangle.height / 2
        const forward = (horizontal ? x : y) * direction
        const gap = Math.max(0, Math.hypot(x, y) - radius - Math.min(bounds.width, bounds.height) / 2)
        const perpendicular = Math.abs(horizontal ? y : x)
        if (forward <= 0 || perpendicular > forward * WIDE_CONE) return []
        return [{ candidate, distance: gap + perpendicular, narrow: !gap || forward > perpendicular }]
      })
      // 90° cone across gaps, 150° for touching circles or when the 90° cone is empty
      const pool = scored.some(item => item.narrow) ? scored.filter(item => item.narrow) : scored
      next = pool.sort((a, b) => a.distance - b.distance)[0]?.candidate
    }
    event.preventDefault()
    next?.focus({ preventScroll: true })
  }

  return { tabStop, regionElement, onFocus, onKeydown }
}
