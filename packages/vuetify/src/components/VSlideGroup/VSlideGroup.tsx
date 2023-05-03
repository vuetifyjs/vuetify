// Styles
import './VSlideGroup.sass'

// Components
import { VFadeTransition } from '@/components/transitions'
import { VIcon } from '@/components/VIcon'

// Composables
import { IconValue } from '@/composables/icons'
import { makeComponentProps } from '@/composables/component'
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'
import { useDisplay } from '@/composables'
import { useResizeObserver } from '@/composables/resizeObserver'
import { useRtl } from '@/composables/locale'

// Utilities
import { computed, ref, watch } from 'vue'
import { focusableChildren, genericComponent, IN_BROWSER, propsFactory, useRender } from '@/util'

// Types
import type { GroupProvide } from '@/composables/group'
import type { InjectionKey, PropType } from 'vue'
import { animateHorizontalScroll } from '@/util/animateHorizontalScroll'
import { animateVerticalScroll } from '@/util/animateVerticalScroll'

export const VSlideGroupSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-slide-group')

interface SlideGroupSlot {
  next: GroupProvide['next']
  prev: GroupProvide['prev']
  select: GroupProvide['select']
  isSelected: GroupProvide['isSelected']
}

type VSlideGroupSlots = {
  default: [SlideGroupSlot]
  prev: [SlideGroupSlot]
  next: [SlideGroupSlot]
}

export const makeVSlideGroupProps = propsFactory({
  centerActive: Boolean,
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  symbol: {
    type: null,
    default: VSlideGroupSymbol,
  },
  nextIcon: {
    type: IconValue,
    default: '$next',
  },
  prevIcon: {
    type: IconValue,
    default: '$prev',
  },
  showArrows: {
    type: [Boolean, String],
    validator: (v: any) => (
      typeof v === 'boolean' || [
        'always',
        'desktop',
        'mobile',
      ].includes(v)
    ),
  },

  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeGroupProps({
    selectedClass: 'v-slide-group-item--active',
  }),
}, 'v-slide-group')

export const VSlideGroup = genericComponent<VSlideGroupSlots>()({
  name: 'VSlideGroup',

  props: makeVSlideGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { isRtl } = useRtl()
    const { mobile } = useDisplay()
    const group = useGroup(props, props.symbol)
    const isOverflowing = ref(false)
    const scrollOffset = ref(0)
    const containerSize = ref(0)
    const contentSize = ref(0)
    const isHorizontal = computed(() => props.direction === 'horizontal')

    const { resizeRef: containerRef, contentRect: containerRect } = useResizeObserver()
    const { resizeRef: contentRef, contentRect } = useResizeObserver()

    const firstSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1

      return group.items.value.findIndex(item => item.id === group.selected.value[0])
    })

    const lastSelectedIndex = computed(() => {
      if (!group.selected.value.length) return -1

      return group.items.value.findIndex(item => item.id === group.selected.value[group.selected.value.length - 1])
    })

    const scrollToPosition = (newPosition: number) => {
      if (!IN_BROWSER || !containerRef.value) {
        return
      }

      const offsetSize = getOffsetSize(containerRef.value)
      const scrollPosition = getScrollPosition(containerRef.value)
      const scrollSize = getScrollSize(containerRef.value)

      if (scrollSize <= offsetSize) {
        return
      }

      // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      if (Math.abs(newPosition - scrollPosition) < 16) {
        return
      }

      if (isHorizontal.value) {
        animateHorizontalScroll({
          container: containerRef.value!,
          left: newPosition,
          rtl: isRtl.value,
        })
      } else {
        animateVerticalScroll({
          container: containerRef.value!,
          top: newPosition,
        })
      }
    }

    const scrollToChildren = (children: HTMLElement) => {
      if (!containerRef.value) return

      const containerOffsetSize = getOffsetSize(containerRef.value)
      const childrenOffsetPosition = getOffsetPosition(children)
      const childrenOffsetSize = getOffsetSize(children)

      const newPosition = childrenOffsetPosition - (containerOffsetSize / 2) + (childrenOffsetSize / 2)

      scrollToPosition(newPosition)
    }

    if (IN_BROWSER) {
      let frame = -1
      watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          if (containerRect.value && contentRect.value) {
            const sizeProperty = isHorizontal.value ? 'width' : 'height'

            containerSize.value = containerRect.value[sizeProperty]
            contentSize.value = contentRect.value[sizeProperty]

            isOverflowing.value = containerSize.value + 1 < contentSize.value
          }

          if ((props.centerActive || isOverflowing.value) && firstSelectedIndex.value >= 0 && contentRef.value) {
            const selectedElement = contentRef.value.children[lastSelectedIndex.value] as HTMLElement
            scrollToChildren(selectedElement)
          }
        })
      })
    }

    const isFocused = ref(false)

    function getScrollSize (element?: HTMLElement) {
      const key = isHorizontal.value ? 'scrollWidth' : 'scrollHeight'
      return element?.[key] || 0
    }

    function getScrollPosition (element?: HTMLElement) {
      const key = isHorizontal.value ? 'scrollLeft' : 'scrollTop'
      return element?.[key] || 0
    }

    function getOffsetSize (element?: HTMLElement) {
      const key = isHorizontal.value ? 'offsetWidth' : 'offsetHeight'
      return element?.[key] || 0
    }

    function getOffsetPosition (element?: HTMLElement) {
      const key = isHorizontal.value ? 'offsetLeft' : 'offsetTop'
      return element?.[key] || 0
    }

    function onScroll (e: UIEvent) {
      const { scrollTop, scrollLeft } = e.target as HTMLElement

      scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop
    }

    function onFocusin (e: FocusEvent) {
      isFocused.value = true
    }

    function onFocusout (e: FocusEvent) {
      isFocused.value = false
    }

    function onFocus (e: FocusEvent) {
      if (
        !isFocused.value &&
        !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget as Node))
      ) focus()
    }

    function onKeydown (e: KeyboardEvent) {
      if (!contentRef.value) return

      const toFocus = (location: Parameters<typeof focus>[0]) => {
        e.preventDefault()
        focus(location)
      }

      if (isHorizontal.value) {
        if (e.key === 'ArrowRight') {
          toFocus(isRtl.value ? 'prev' : 'next')
        } else if (e.key === 'ArrowLeft') {
          toFocus(isRtl.value ? 'next' : 'prev')
        }
      } else {
        if (e.key === 'ArrowDown') {
          toFocus('next')
        } else if (e.key === 'ArrowUp') {
          toFocus('prev')
        }
      }

      if (e.key === 'Home') {
        toFocus('first')
      } else if (e.key === 'End') {
        toFocus('last')
      }
    }

    function focus (location?: 'next' | 'prev' | 'first' | 'last'): void {
      if (!contentRef.value) return

      let el: HTMLElement | undefined

      if (!location) {
        const focusable = focusableChildren(contentRef.value)
        el = focusable[0]
      } else if (location === 'next') {
        el = contentRef.value.querySelector(':focus')?.nextElementSibling as HTMLElement | undefined

        if (!el) return focus('first')
      } else if (location === 'prev') {
        el = contentRef.value.querySelector(':focus')?.previousElementSibling as HTMLElement | undefined

        if (!el) return focus('last')
      } else if (location === 'first') {
        el = (contentRef.value.firstElementChild as HTMLElement)
      } else if (location === 'last') {
        el = (contentRef.value.lastElementChild as HTMLElement)
      }

      if (el) {
        scrollToChildren(el)
        el.focus({ preventScroll: true })
      }
    }

    function scrollTo (location: 'prev' | 'next') {
      const direction = isHorizontal.value && isRtl.value ? -1 : 1

      const offsetStep = (location === 'prev' ? -direction : direction) * containerSize.value

      let newPosition = scrollOffset.value + offsetStep

      if (isHorizontal.value && isRtl.value && containerRef.value) {
        const { scrollWidth, offsetWidth: containerWidth } = containerRef.value!

        newPosition += scrollWidth - containerWidth
      }

      scrollToPosition(newPosition)
    }

    const slotProps = computed(() => ({
      next: group.next,
      prev: group.prev,
      select: group.select,
      isSelected: group.isSelected,
    }))

    const hasAffixes = computed(() => {
      switch (props.showArrows) {
        // Always show arrows on desktop & mobile
        case 'always': return true

        // Always show arrows on desktop
        case 'desktop': return !mobile.value

        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case true: return isOverflowing.value || Math.abs(scrollOffset.value) > 0

        // Always show on mobile
        case 'mobile': return (
          mobile.value ||
          (isOverflowing.value || Math.abs(scrollOffset.value) > 0)
        )

        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default: return (
          !mobile.value &&
          (isOverflowing.value || Math.abs(scrollOffset.value) > 0)
        )
      }
    })

    const hasPrev = computed(() => {
      return Math.abs(scrollOffset.value) > 0
    })

    const hasNext = computed(() => {
      if (!containerRef.value) return false

      // Check one scroll ahead to know the width of right-most item
      const scrollSize = getScrollSize(containerRef.value)
      const offsetSize = getOffsetSize(containerRef.value)

      return scrollSize - (Math.abs(scrollOffset.value) + offsetSize) !== 0
    })

    useRender(() => (
      <props.tag
        class={[
          'v-slide-group',
          {
            'v-slide-group--vertical': !isHorizontal.value,
            'v-slide-group--has-affixes': hasAffixes.value,
            'v-slide-group--is-overflowing': isOverflowing.value,
          },
          props.class,
        ]}
        style={ props.style }
        tabindex={ (isFocused.value || group.selected.value.length) ? -1 : 0 }
        onFocus={ onFocus }
      >
        { hasAffixes.value && (
          <div
            key="prev"
            class={[
              'v-slide-group__prev',
              { 'v-slide-group__prev--disabled': !hasPrev.value },
            ]}
            onClick={ () => scrollTo('prev') }
          >
            { slots.prev?.(slotProps.value) ?? (
              <VFadeTransition>
                <VIcon icon={ isRtl.value ? props.nextIcon : props.prevIcon }></VIcon>
              </VFadeTransition>
            )}
          </div>
        )}

        <div
          key="container"
          ref={ containerRef }
          class="v-slide-group__container"
          onScroll={ onScroll }
        >
          <div
            ref={ contentRef }
            class="v-slide-group__content"
            onFocusin={ onFocusin }
            onFocusout={ onFocusout }
            onKeydown={ onKeydown }
          >
            { slots.default?.(slotProps.value) }
          </div>
        </div>

        { hasAffixes.value && (
          <div
            key="next"
            class={[
              'v-slide-group__next',
              { 'v-slide-group__next--disabled': !hasNext.value },
            ]}
            onClick={ () => scrollTo('next') }
          >
            { slots.next?.(slotProps.value) ?? (
              <VFadeTransition>
                <VIcon icon={ isRtl.value ? props.prevIcon : props.nextIcon }></VIcon>
              </VFadeTransition>
            )}
          </div>
        )}
      </props.tag>
    ))

    return {
      selected: group.selected,
      scrollTo,
      scrollOffset,
      focus,
    }
  },
})

export type VSlideGroup = InstanceType<typeof VSlideGroup>
