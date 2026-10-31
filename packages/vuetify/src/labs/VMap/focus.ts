// Utilities
import { shallowRef, toRef, watch } from 'vue'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { MapRegion } from './svg'

export function useMapFocus (
  props: { disabled: boolean },
  element: Ref<SVGSVGElement | undefined>,
  regions: MaybeRefOrGetter<MapRegion[]>,
  reveal: (region: SVGGraphicsElement) => void,
) {
  const focused = shallowRef<string>()
  const items = toRef(regions)
  const tabStop = toRef(() => items.value.some(region => region.id === focused.value) ? focused.value : items.value[0]?.id)
  watch(items, () => { focused.value = undefined })

  function regionElement (target: EventTarget | null) {
    const region = (target as Element | null)?.closest?.<SVGGraphicsElement>('[data-v-map-region]')
    return region && element.value?.contains(region) ? region : undefined
  }

  function onFocus (event: FocusEvent) {
    const region = regionElement(event.target)
    if (!region || props.disabled) return
    focused.value = region.getAttribute('data-v-map-region')!
    if (region.matches(':focus-visible')) reveal(region)
  }

  function onKeydown (event: KeyboardEvent) {
    if (props.disabled || event.altKey || event.ctrlKey || event.metaKey) return
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
    const current = regionElement(event.target)
    if (!current) return
    const candidates = Array.from(element.value!.querySelectorAll<SVGGraphicsElement>('[data-v-map-region]'))
    let next: SVGGraphicsElement | undefined
    if (event.key === 'Home' || event.key === 'End') {
      next = event.key === 'Home' ? candidates[0] : candidates.at(-1)
    } else {
      const rectangle = current.getBoundingClientRect()
      const horizontal = ['ArrowLeft', 'ArrowRight'].includes(event.key)
      const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1
      let closest = Infinity
      for (const candidate of candidates) {
        if (candidate === current) continue
        const bounds = candidate.getBoundingClientRect()
        if (!bounds.width && !bounds.height) continue
        const x = bounds.x + bounds.width / 2 - rectangle.x - rectangle.width / 2
        const y = bounds.y + bounds.height / 2 - rectangle.y - rectangle.height / 2
        const forward = (horizontal ? x : y) * direction
        const distance = Math.hypot(x, y) + Math.abs(horizontal ? y : x)
        if (forward > 0 && distance < closest) {
          next = candidate
          closest = distance
        }
      }
    }
    event.preventDefault()
    next?.focus({ preventScroll: true })
  }

  return { tabStop, regionElement, onFocus, onKeydown }
}
