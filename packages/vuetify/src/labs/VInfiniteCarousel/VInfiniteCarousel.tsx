// Styles
import './VInfiniteCarousel.sass'

// Components
import { VIconBtn } from '@/components/VIconBtn'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useRtl } from '@/composables/locale'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeTagProps } from '@/composables/tag'
import { useVirtualFocus } from '@/composables/virtualFocus'

// Utilities
import { onMounted, onScopeDispose, onUpdated, ref, shallowRef, toRef, watch } from 'vue'
import {
  convertToUnit,
  flattenFragments,
  focusableChildren,
  genericComponent,
  isBoolean,
  isObject,
  isString,
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
  pauseOnHover?: boolean
}

export interface VInfiniteCarouselMask {
  size?: number | string
}

export type VInfiniteCarouselSlots = {
  default: never
  separator: never
  prev: { props: Record<string, any> }
  next: { props: Record<string, any> }
}

const DEFAULT_SPEED = 35
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
    type: [Boolean, String] as PropType<boolean | 'hover'>,
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
    const { isRtl } = useRtl()
    const containerRef = ref<HTMLElement>()
    const trackRef = ref<HTMLElement>()
    const probeRef = ref<HTMLElement>()
    const items = shallowRef<HTMLElement[]>([])
    const copies = shallowRef(1)
    const isDragging = shallowRef(false)
    const isHoveringInteractive = shallowRef(false)
    const viewportSize = shallowRef(0)
    const loopDistance = shallowRef(0)

    const isVertical = toRef(() => props.direction === 'vertical')

    const autoPlayConfig = toRef(() => {
      if (!props.autoPlay) return { speed: 0, reverse: false, pauseOnHover: false }

      const {
        speed = DEFAULT_SPEED,
        reverse = false,
        pauseOnHover = true,
      } = isObject(props.autoPlay) ? props.autoPlay : {}

      return { speed: Math.max(0, Number(speed) || 0), reverse, pauseOnHover }
    })

    const hasAutoPlay = toRef(() => !!autoPlayConfig.value.speed)
    const isReversed = toRef(() => autoPlayConfig.value.reverse)
    const loopDuration = toRef(() => hasAutoPlay.value ? loopDistance.value / autoPlayConfig.value.speed * 1000 : 1000)

    const { resizeRef: viewportRef } = useResizeObserver(onResize)
    const { resizeRef: contentRef } = useResizeObserver(onResize)

    function onResize () {
      const viewport = viewportRef.el
      const group = contentRef.el
      if (!viewport || !group) return

      const viewportStyles = getComputedStyle(viewport)
      const groupStyles = getComputedStyle(group)

      const [groupSize, outerSize, paddingStart, paddingEnd, gap] = isVertical.value
        ? [
          group.offsetHeight,
          viewport.clientHeight,
          viewportStyles.paddingTop,
          viewportStyles.paddingBottom,
          groupStyles.rowGap,
        ]
        : [
          group.offsetWidth,
          viewport.clientWidth,
          viewportStyles.paddingLeft,
          viewportStyles.paddingRight,
          groupStyles.columnGap,
        ]

      const gapSize = parseFloat(gap) || 0
      const endPadding = parseFloat(paddingEnd)

      viewportSize.value = outerSize - parseFloat(paddingStart) - endPadding
      loopDistance.value = groupSize + gapSize

      copies.value = loopDistance.value > 0
        ? Math.min(MAX_COPIES, 1 + Math.ceil((viewportSize.value + endPadding + gapSize) / loopDistance.value))
        : 1
    }

    let animation: Animation | undefined

    function syncAnimation () {
      cancelStep()

      const track = trackRef.value
      const previousShift = currentShift()

      animation?.cancel()
      animation = undefined

      if (!track || !loopDuration.value) return

      const end = isVertical.value
        ? `translateY(-${loopDistance.value}px)`
        : `translateX(-${loopDistance.value}px)`
      const keyframes = [{ transform: 'none' }, { transform: end }]

      animation = track.animate(
        isReversed.value ? keyframes.reverse() : keyframes,
        { duration: loopDuration.value, iterations: Infinity, easing: 'linear' }
      )
      seek(previousShift)

      if (isPaused()) animation.pause()
    }

    watch([isVertical, hasAutoPlay, isReversed, loopDistance, loopDuration], syncAnimation, { flush: 'post' })
    watch(() => props.direction, onResize, { flush: 'post' })

    function currentShift () {
      const duration = loopDuration.value
      if (!animation || !duration) return 0

      const progress = Number(animation.currentTime ?? 0) % duration / duration

      return (isReversed.value ? 1 - progress : progress) * loopDistance.value
    }

    function seek (value: number) {
      const duration = loopDuration.value
      if (!animation || !loopDistance.value) return

      const wrapped = ((value % loopDistance.value) + loopDistance.value) % loopDistance.value
      const progress = wrapped / loopDistance.value

      animation.currentTime = Math.min((isReversed.value ? 1 - progress : progress) * duration, duration - 1)
    }

    let pendingShift = 0
    let stepFrame = 0
    let lastStepTime = 0

    function advanceStep (now: number) {
      const decayed = pendingShift * (1 - Math.exp(-(now - lastStepTime) / STEP_DECAY))

      lastStepTime = now
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

      if (isString(value) && value.endsWith('%')) {
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
        lastStepTime = performance.now()
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
        control: () => containerRef.value,
        circular: true,
        onHighlight (id) {
          const el = items.value[id as number]
          if (!el) return

          reveal(el)
          el.focus()
        },
      }
    )

    let hasFocusableItems = false

    function onKeydown (e: KeyboardEvent) {
      const [previousKey, nextKey] = isVertical.value
        ? ['ArrowUp', 'ArrowDown']
        : isRtl.value
          ? ['ArrowRight', 'ArrowLeft']
          : ['ArrowLeft', 'ArrowRight']

      if (!hasFocusableItems) {
        if (e.key === previousKey) step(-1)
        else if (e.key === nextKey) step(1)
        else return
      } else if (e.key === previousKey) virtualFocus.prev()
      else if (e.key === nextKey) virtualFocus.next()
      else if (e.key === 'Home') virtualFocus.first()
      else if (e.key === 'End') virtualFocus.last()
      else return

      e.preventDefault()
    }

    function isPaused () {
      const container = containerRef.value

      return !hasAutoPlay.value ||
        isDragging.value ||
        isHoveringInteractive.value ||
        PREFERS_REDUCED_MOTION() ||
        !!container?.matches(':focus-visible') ||
        !!container?.querySelector(':focus-visible')
    }

    function onPointerover (e: PointerEvent) {
      const target = e.target as HTMLElement

      isHoveringInteractive.value = autoPlayConfig.value.pauseOnHover &&
        !target.closest('.v-infinite-carousel__controls') &&
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
        containerRef.value?.setPointerCapture(e.pointerId)
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

    function onFocusin (e: FocusEvent) {
      const target = e.target as HTMLElement
      const item = items.value.find(el => el.contains(target))

      // keyboard only, so clicking an item half under the fade does not jump the strip
      if (item && target.matches(':focus-visible')) reveal(item)
      if (isPaused()) animation?.pause()
    }

    function onFocusout (e: FocusEvent) {
      if (containerRef.value?.contains(e.relatedTarget as Node)) return

      virtualFocus.clear()
      resume()
    }

    function collectItems () {
      items.value = Array.from(contentRef.el?.children ?? [])
        .filter(el => !el.classList.contains('v-infinite-carousel__separator')) as HTMLElement[]

      // sticky: the tabindex set below keeps this true even if the content later loses its focusables
      hasFocusableItems = !!contentRef.el && focusableChildren(contentRef.el, false).length > 0
      if (hasFocusableItems) {
        items.value.forEach(item => {
          item.tabIndex = -1
        })
      }

      trackRef.value?.querySelectorAll<HTMLElement>('.v-infinite-carousel__group[aria-hidden]')
        .forEach(copy => focusableChildren(copy).forEach(el => {
          el.tabIndex = -1
        }))
    }

    onMounted(collectItems)
    onUpdated(collectItems)
    onScopeDispose(() => {
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
              'v-infinite-carousel--mask': !!props.mask,
              'v-infinite-carousel--draggable': props.draggable && copies.value > 1,
              'v-infinite-carousel--dragging': isDragging.value,
              'v-infinite-carousel--show-arrows-on-hover': props.showArrows === 'hover',
            },
            props.class,
          ]}
          style={[
            {
              '--v-infinite-carousel-mask-size': convertToUnit(isObject(props.mask) ? props.mask.size : undefined),
              '--v-infinite-carousel-gap': convertToUnit(props.gap),
              '--v-infinite-carousel-shift': convertToUnit(props.shiftDistance),
            },
            props.style,
          ]}
          role="group"
          tabindex={ virtualFocus.highlightedId.value == null ? 0 : -1 }
          onFocusin={ onFocusin }
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
          <div ref={ viewportRef } class="v-infinite-carousel__viewport">
            <div
              ref={ trackRef }
              class="v-infinite-carousel__track"
              style={{ translate: isVertical.value ? `0 ${-loopDistance.value}px` : `${-loopDistance.value}px` }}
            >
              <div ref={ contentRef } class="v-infinite-carousel__group">
                { groupChildren() }
              </div>

              <div class="v-infinite-carousel__group v-infinite-carousel__group--leading" aria-hidden="true">
                { groupChildren() }
              </div>

              { Array.from({ length: copies.value - 1 }, (_, index) => (
                <div key={ index } class="v-infinite-carousel__group" aria-hidden="true">
                  { groupChildren() }
                </div>
              ))}
            </div>
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

    return {
      slide: (direction: 'prev' | 'next') => step(direction === 'next' ? 1 : -1),
    }
  },
})

export type VInfiniteCarousel = InstanceType<typeof VInfiniteCarousel>
