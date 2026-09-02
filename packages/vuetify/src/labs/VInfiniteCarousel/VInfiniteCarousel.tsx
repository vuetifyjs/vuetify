// Styles
import './VInfiniteCarousel.sass'

// Components
import { VIconBtn } from '@/components/VIconBtn'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeTagProps } from '@/composables/tag'
import { useVirtualFocus } from '@/composables/virtualFocus'

// Utilities
import { onMounted, onScopeDispose, onUpdated, ref, shallowRef, toRef, watch } from 'vue'
import {
  convertToUnit,
  flattenFragments,
  genericComponent,
  IN_BROWSER,
  isBoolean,
  isCssColor,
  isObject,
  PREFERS_REDUCED_MOTION,
  propsFactory,
  useRender,
} from '@/util'

// Types
import type { PropType } from 'vue'
import type { IconValue } from '@/composables/icons'

export interface VInfiniteCarouselAutoPlay {
  speed?: number | string
  reverse?: boolean
}

export interface VInfiniteCarouselMask {
  size?: number | string
  color?: string
}

export type VInfiniteCarouselSlots = {
  default: never
  separator: never
  prev: { props: Record<string, any> }
  next: { props: Record<string, any> }
}

const DEFAULT_SPEED = 35
const DEFAULT_MASK_SIZE = 60
const STEP_DECAY = 120
const DRAG_THRESHOLD = 4
const MAX_COPIES = 20
const INTERACTIVE = 'a[href], button, input, select, textarea, [contenteditable]'

export const makeVInfiniteCarouselProps = propsFactory({
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  autoPlay: {
    type: [Boolean, Object] as PropType<boolean | VInfiniteCarouselAutoPlay>,
    default: false,
  },
  mask: {
    type: [Boolean, Object] as PropType<boolean | VInfiniteCarouselMask>,
    default: false,
  },
  gap: [Number, String],
  draggable: Boolean,
  shiftDistance: {
    type: [Number, String],
    default: '20%',
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v: any) => isBoolean(v) || v === 'hover',
  },
  prevIcon: {
    type: [Boolean, String, Function, Object] as PropType<IconValue>,
    default: '$prev',
  },
  nextIcon: {
    type: [Boolean, String, Function, Object] as PropType<IconValue>,
    default: '$next',
  },

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VInfiniteCarousel')

export const VInfiniteCarousel = genericComponent<VInfiniteCarouselSlots>()({
  name: 'VInfiniteCarousel',

  props: makeVInfiniteCarouselProps(),

  setup (props, { slots }) {
    const trackRef = ref<HTMLElement>()
    const probeRef = ref<HTMLElement>()
    const items = shallowRef<HTMLElement[]>([])
    const copies = shallowRef(1)
    const isDragging = shallowRef(false)
    const isHoveringInteractive = shallowRef(false)
    const viewportSize = shallowRef(0)
    const loopDistance = shallowRef(0)
    const loopDuration = shallowRef(0)

    const isVertical = toRef(() => props.direction === 'vertical')

    const autoPlayConfig = toRef(() => {
      if (!props.autoPlay) return { speed: 0, reverse: false }

      const { speed = DEFAULT_SPEED, reverse = false } = isObject(props.autoPlay) ? props.autoPlay : {}

      return { speed: Math.max(0, Number(speed) || 0), reverse }
    })

    const isHeld = toRef(() => !autoPlayConfig.value.speed)
    const isReversed = toRef(() => autoPlayConfig.value.reverse)

    const maskConfig = toRef(() => {
      if (!props.mask) return { size: 0, color: undefined }

      const { size = DEFAULT_MASK_SIZE, color } = isObject(props.mask) ? props.mask : {}

      return {
        size,
        color: !color || isCssColor(color) ? color : `rgb(var(--v-theme-${color}))`,
      }
    })

    const { resizeRef: containerRef } = useResizeObserver(onResize)
    const { resizeRef: contentRef } = useResizeObserver(onResize)

    function onResize () {
      const container = containerRef.el
      const group = contentRef.el
      if (!container || !group) return

      const containerStyles = getComputedStyle(container)
      const groupStyles = getComputedStyle(group)

      const [groupSize, containerSize, paddingStart, paddingEnd, gap] = isVertical.value
        ? [
          group.offsetHeight,
          container.clientHeight,
          containerStyles.paddingTop,
          containerStyles.paddingBottom,
          groupStyles.rowGap,
        ]
        : [
          group.offsetWidth,
          container.clientWidth,
          containerStyles.paddingLeft,
          containerStyles.paddingRight,
          groupStyles.columnGap,
        ]

      const gapSize = parseFloat(gap) || 0

      viewportSize.value = containerSize - parseFloat(paddingStart) - parseFloat(paddingEnd)
      loopDistance.value = groupSize + gapSize
      loopDuration.value = isHeld.value ? 1 : loopDistance.value / autoPlayConfig.value.speed

      copies.value = loopDistance.value > 0
        ? Math.min(MAX_COPIES, 1 + Math.ceil((viewportSize.value + gapSize) / loopDistance.value))
        : 1
    }

    let animation: Animation | undefined

    function syncAnimation () {
      cancelStep()

      const track = trackRef.value
      const previousShift = currentShift()

      animation?.cancel()
      animation = undefined

      if (!IN_BROWSER || !track || !loopDuration.value) return

      const end = isVertical.value
        ? `translateY(-${loopDistance.value}px)`
        : `translateX(-${loopDistance.value}px)`
      const keyframes = [{ transform: 'none' }, { transform: end }]

      animation = track.animate(
        isReversed.value ? keyframes.reverse() : keyframes,
        { duration: loopDuration.value * 1000, iterations: Infinity, easing: 'linear' }
      )
      seek(previousShift)

      if (isPaused()) animation.pause()
    }

    watch([isVertical, isHeld, isReversed, loopDistance, loopDuration], syncAnimation, { flush: 'post' })
    watch(() => props.direction, onResize, { flush: 'post' })

    function currentShift () {
      const total = loopDuration.value * 1000
      if (!animation || !total) return 0

      const progress = Number(animation.currentTime ?? 0) % total / total

      return (isReversed.value ? 1 - progress : progress) * loopDistance.value
    }

    function seek (value: number) {
      const total = loopDuration.value * 1000
      if (!animation || !loopDistance.value) return

      const wrapped = ((value % loopDistance.value) + loopDistance.value) % loopDistance.value
      const progress = wrapped / loopDistance.value

      animation.currentTime = Math.min((isReversed.value ? 1 - progress : progress) * total, total - 1)
    }

    let pendingShift = 0
    let stepFrame = 0
    let stepStamp = 0

    function advanceStep (now: number) {
      const decayed = pendingShift * (1 - Math.exp(-(now - stepStamp) / STEP_DECAY))

      stepStamp = now
      pendingShift -= decayed
      seek(currentShift() + decayed)

      stepFrame = Math.abs(pendingShift) > 0.5 ? requestAnimationFrame(advanceStep) : 0
      if (!stepFrame) pendingShift = 0
    }

    function cancelStep () {
      cancelAnimationFrame(stepFrame)
      stepFrame = 0
      pendingShift = 0
    }

    function resolveShiftDistance () {
      const value = props.shiftDistance

      if (typeof value === 'string' && value.endsWith('%')) {
        return parseFloat(value) / 100 * viewportSize.value
      }

      return (isVertical.value ? probeRef.value?.offsetHeight : probeRef.value?.offsetWidth) ?? 0
    }

    function step (direction: 1 | -1) {
      if (!animation || !loopDistance.value) return

      const amount = direction * resolveShiftDistance()

      if (PREFERS_REDUCED_MOTION()) {
        seek(currentShift() + amount)
        return
      }

      pendingShift += amount

      if (!stepFrame) {
        stepStamp = performance.now()
        stepFrame = requestAnimationFrame(advanceStep)
      }
    }

    function reveal (el: HTMLElement) {
      const group = contentRef.el
      if (!group) return

      cancelStep()

      const [start, size] = isVertical.value
        ? [el.offsetTop - group.offsetTop, el.offsetHeight]
        : [el.offsetLeft - group.offsetLeft, el.offsetWidth]

      const shift = currentShift()

      if (start < shift) seek(start)
      else if (start + size > shift + viewportSize.value) seek(start + size - viewportSize.value)
    }

    const virtualFocus = useVirtualFocus(
      () => items.value.map((el, id) => ({ id, el })),
      {
        control: () => containerRef.el,
        circular: true,
        onHighlight (id) {
          const el = items.value[id as number]
          if (!el) return

          el.removeAttribute('inert')
          reveal(el)
          el.focus()
        },
      }
    )

    function onKeydown (e: KeyboardEvent) {
      const isRtl = !isVertical.value && getComputedStyle(e.currentTarget as HTMLElement).direction === 'rtl'
      const [previousKey, nextKey] = isVertical.value ? ['ArrowUp', 'ArrowDown']
        : isRtl ? ['ArrowRight', 'ArrowLeft']
        : ['ArrowLeft', 'ArrowRight']

      if (e.key === previousKey) virtualFocus.prev()
      else if (e.key === nextKey) virtualFocus.next()
      else if (e.key === 'Home') virtualFocus.first()
      else if (e.key === 'End') virtualFocus.last()
      else return

      e.preventDefault()
    }

    function isPaused () {
      const container = containerRef.el

      return isHeld.value ||
        isDragging.value ||
        isHoveringInteractive.value ||
        PREFERS_REDUCED_MOTION() ||
        !!container?.matches(':focus-visible') ||
        !!container?.querySelector(':focus-visible')
    }

    function onPointerover (e: PointerEvent) {
      const target = e.target as HTMLElement

      isHoveringInteractive.value = !target.closest('.v-infinite-carousel__controls') &&
        !!target.closest(INTERACTIVE)

      if (isHoveringInteractive.value) animation?.pause()
      else resume()
    }

    function onPointerleave () {
      isHoveringInteractive.value = false
      resume()
    }

    function resume () {
      if (!isPaused()) animation?.play()
    }

    let dragOrigin: { coordinate: number, shift: number } | null = null
    let hasDragged = false

    function onPointerdown (e: PointerEvent) {
      if (!props.draggable || e.button !== 0 || !animation) return
      if ((e.target as HTMLElement).closest('.v-infinite-carousel__controls')) return

      cancelStep()
      dragOrigin = { coordinate: isVertical.value ? e.clientY : e.clientX, shift: currentShift() }
      hasDragged = false
      animation.pause()
    }

    function onPointermove (e: PointerEvent) {
      if (!dragOrigin) return

      const delta = (isVertical.value ? e.clientY : e.clientX) - dragOrigin.coordinate

      if (!isDragging.value) {
        if (Math.abs(delta) < DRAG_THRESHOLD) return

        isDragging.value = true
        hasDragged = true
        containerRef.el?.setPointerCapture(e.pointerId)
      }

      seek(dragOrigin.shift - delta)
    }

    function onPointerup () {
      dragOrigin = null
      isDragging.value = false
      resume()
    }

    function onClickCapture (e: MouseEvent) {
      if (!hasDragged) return

      hasDragged = false
      e.preventDefault()
      e.stopPropagation()
    }

    function onFocusout (e: FocusEvent) {
      if (containerRef.el?.contains(e.relatedTarget as Node)) return

      virtualFocus.clear()
      resume()
    }

    let observer: IntersectionObserver | undefined

    function observeItems () {
      observer?.disconnect()

      items.value = Array.from(contentRef.el?.children ?? [])
        .filter(el => !el.classList.contains('v-infinite-carousel__separator')) as HTMLElement[]

      for (const item of items.value) item.tabIndex = -1

      if (!IN_BROWSER) return

      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          entry.target.toggleAttribute('inert', !entry.isIntersecting)
        }
      }, { root: containerRef.el })

      for (const item of items.value) observer.observe(item)
    }

    onMounted(observeItems)
    onUpdated(observeItems)
    onScopeDispose(() => {
      observer?.disconnect()
      animation?.cancel()
      cancelStep()
    })

    function groupChildren () {
      const children = slots.default?.() ?? []
      if (!slots.separator) return children

      return flattenFragments(children).flatMap((child, index) => [
        child,
        <div key={ `separator-${index}` } class="v-infinite-carousel__separator" aria-hidden="true">
          { slots.separator!() }
        </div>,
      ])
    }

    useRender(() => {
      const previousProps = {
        icon: props.prevIcon,
        class: 'v-infinite-carousel__prev',
        variant: 'text' as const,
        tabindex: -1,
        'aria-hidden': true,
        onMousedown: (e: MouseEvent) => e.preventDefault(),
        onClick: () => step(-1),
      }

      const nextProps = {
        icon: props.nextIcon,
        class: 'v-infinite-carousel__next',
        variant: 'text' as const,
        tabindex: -1,
        'aria-hidden': true,
        onMousedown: (e: MouseEvent) => e.preventDefault(),
        onClick: () => step(1),
      }

      return (
        <props.tag
          ref={ containerRef }
          class={[
            'v-infinite-carousel',
            {
              'v-infinite-carousel--vertical': isVertical.value,
              'v-infinite-carousel--draggable': props.draggable && copies.value > 1,
              'v-infinite-carousel--dragging': isDragging.value,
              'v-infinite-carousel--show-arrows-on-hover': props.showArrows === 'hover',
            },
            props.class,
          ]}
          style={[
            {
              '--v-infinite-carousel-mask': convertToUnit(maskConfig.value.size),
              '--v-infinite-carousel-mask-color': maskConfig.value.color,
              '--v-infinite-carousel-gap': convertToUnit(props.gap),
              '--v-infinite-carousel-shift': convertToUnit(props.shiftDistance),
            },
            props.style,
          ]}
          role="group"
          tabindex={ virtualFocus.highlightedId.value == null ? 0 : -1 }
          onFocusin={ () => isPaused() && animation?.pause() }
          onFocusout={ onFocusout }
          onKeydown={ onKeydown }
          onPointerover={ onPointerover }
          onPointerleave={ onPointerleave }
          onPointerdown={ onPointerdown }
          onPointermove={ onPointermove }
          onPointerup={ onPointerup }
          onPointercancel={ onPointerup }
          onClickCapture={ onClickCapture }
        >
          <div ref={ trackRef } class="v-infinite-carousel__track">
            <div ref={ contentRef } class="v-infinite-carousel__group">
              { groupChildren() }
            </div>

            { Array.from({ length: copies.value - 1 }, (_, index) => (
              <div key={ index } class="v-infinite-carousel__group" aria-hidden="true" inert>
                { groupChildren() }
              </div>
            ))}
          </div>

          <div ref={ probeRef } class="v-infinite-carousel__probe" />

          { props.showArrows && (
            <div class="v-infinite-carousel__controls">
              { slots.prev ? slots.prev({ props: previousProps }) : <VIconBtn { ...previousProps } /> }
              { slots.next ? slots.next({ props: nextProps }) : <VIconBtn { ...nextProps } /> }
            </div>
          )}
        </props.tag>
      )
    })

    return {}
  },
})

export type VInfiniteCarousel = InstanceType<typeof VInfiniteCarousel>
