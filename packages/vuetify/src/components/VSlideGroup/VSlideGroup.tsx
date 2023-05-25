// Styles
import './VSlideGroup.sass'

// Components
import { VFadeTransition } from '@/components/transitions'
import { VIcon } from '@/components/VIcon'

// Composables
import { useDisplay } from '@/composables'
import { makeComponentProps } from '@/composables/component'
import { makeGroupProps, useGroup } from '@/composables/group'
import { IconValue } from '@/composables/icons'
import { useRtl } from '@/composables/locale'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, shallowRef, watch } from 'vue'
import { bias, calculateCenteredOffset, calculateUpdatedOffset } from './helpers'
import { clamp, focusableChildren, genericComponent, IN_BROWSER, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { GroupProvide } from '@/composables/group'

export const VSlideGroupSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-slide-group')

interface SlideGroupSlot {
  next: GroupProvide['next']
  prev: GroupProvide['prev']
  select: GroupProvide['select']
  isSelected: GroupProvide['isSelected']
}

type VSlideGroupSlots = {
  default: SlideGroupSlot
  prev: SlideGroupSlot
  next: SlideGroupSlot
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
    const isOverflowing = shallowRef(false)
    const scrollOffset = shallowRef(0)
    const containerSize = shallowRef(0)
    const contentSize = shallowRef(0)
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

          if (firstSelectedIndex.value >= 0 && contentRef.value) {
            // TODO: Is this too naive? Should we store element references in group composable?
            const selectedElement = contentRef.value.children[lastSelectedIndex.value] as HTMLElement

            if (firstSelectedIndex.value === 0 || !isOverflowing.value) {
              scrollOffset.value = 0
            } else if (props.centerActive) {
              scrollOffset.value = calculateCenteredOffset({
                selectedElement,
                containerSize: containerSize.value,
                contentSize: contentSize.value,
                isRtl: isRtl.value,
                isHorizontal: isHorizontal.value,
              })
            } else if (isOverflowing.value) {
              scrollOffset.value = calculateUpdatedOffset({
                selectedElement,
                containerSize: containerSize.value,
                contentSize: contentSize.value,
                isRtl: isRtl.value,
                currentScrollOffset: scrollOffset.value,
                isHorizontal: isHorizontal.value,
              })
            }
          }
        })
      })
    }

    const disableTransition = shallowRef(false)

    let startTouch = 0
    let startOffset = 0

    function onTouchstart (e: TouchEvent) {
      const sizeProperty = isHorizontal.value ? 'clientX' : 'clientY'
      const sign = isRtl.value && isHorizontal.value ? -1 : 1
      startOffset = sign * scrollOffset.value
      startTouch = e.touches[0][sizeProperty]
      disableTransition.value = true
    }

    function onTouchmove (e: TouchEvent) {
      if (!isOverflowing.value) return

      const sizeProperty = isHorizontal.value ? 'clientX' : 'clientY'
      const sign = isRtl.value && isHorizontal.value ? -1 : 1
      scrollOffset.value = sign * (startOffset + startTouch - e.touches[0][sizeProperty])
    }

    function onTouchend (e: TouchEvent) {
      const maxScrollOffset = contentSize.value - containerSize.value

      if (scrollOffset.value < 0 || !isOverflowing.value) {
        scrollOffset.value = 0
      } else if (scrollOffset.value >= maxScrollOffset) {
        scrollOffset.value = maxScrollOffset
      }

      disableTransition.value = false
    }

    function onScroll () {
      if (!containerRef.value) return

      containerRef.value[isHorizontal.value ? 'scrollLeft' : 'scrollTop'] = 0
    }

    const isFocused = shallowRef(false)
    function onFocusin (e: FocusEvent) {
      isFocused.value = true

      if (!isOverflowing.value || !contentRef.value) return

      // Focused element is likely to be the root of an item, so a
      // breadth-first search will probably find it in the first iteration
      for (const el of e.composedPath()) {
        for (const item of contentRef.value.children) {
          if (item === el) {
            scrollOffset.value = calculateUpdatedOffset({
              selectedElement: item as HTMLElement,
              containerSize: containerSize.value,
              contentSize: contentSize.value,
              isRtl: isRtl.value,
              currentScrollOffset: scrollOffset.value,
              isHorizontal: isHorizontal.value,
            })
            return
          }
        }
      }
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

      if (isHorizontal.value) {
        if (e.key === 'ArrowRight') {
          focus(isRtl.value ? 'prev' : 'next')
        } else if (e.key === 'ArrowLeft') {
          focus(isRtl.value ? 'next' : 'prev')
        }
      } else {
        if (e.key === 'ArrowDown') {
          focus('next')
        } else if (e.key === 'ArrowUp') {
          focus('prev')
        }
      }

      if (e.key === 'Home') {
        focus('first')
      } else if (e.key === 'End') {
        focus('last')
      }
    }

    function focus (location?: 'next' | 'prev' | 'first' | 'last') {
      if (!contentRef.value) return

      if (!location) {
        const focusable = focusableChildren(contentRef.value)
        focusable[0]?.focus()
      } else if (location === 'next') {
        const el = contentRef.value.querySelector(':focus')?.nextElementSibling as HTMLElement | undefined
        if (el) el.focus()
        else focus('first')
      } else if (location === 'prev') {
        const el = contentRef.value.querySelector(':focus')?.previousElementSibling as HTMLElement | undefined
        if (el) el.focus()
        else focus('last')
      } else if (location === 'first') {
        (contentRef.value.firstElementChild as HTMLElement)?.focus()
      } else if (location === 'last') {
        (contentRef.value.lastElementChild as HTMLElement)?.focus()
      }
    }

    function scrollTo (location: 'prev' | 'next') {
      const newAbsoluteOffset = scrollOffset.value + (location === 'prev' ? -1 : 1) * containerSize.value

      scrollOffset.value = clamp(newAbsoluteOffset, 0, contentSize.value - containerSize.value)
    }

    const contentStyles = computed(() => {
      // This adds friction when scrolling the 'wrong' way when at max offset
      let scrollAmount = scrollOffset.value > contentSize.value - containerSize.value
        ? -(contentSize.value - containerSize.value) + bias(contentSize.value - containerSize.value - scrollOffset.value)
        : -scrollOffset.value

      // This adds friction when scrolling the 'wrong' way when at min offset
      if (scrollOffset.value <= 0) {
        scrollAmount = bias(-scrollOffset.value)
      }

      const sign = isRtl.value && isHorizontal.value ? -1 : 1
      return {
        transform: `translate${isHorizontal.value ? 'X' : 'Y'}(${sign * scrollAmount}px)`,
        transition: disableTransition.value ? 'none' : '',
        willChange: disableTransition.value ? 'transform' : '',
      }
    })

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
      // Check one scroll ahead to know the width of right-most item
      return contentSize.value > Math.abs(scrollOffset.value) + containerSize.value
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
            style={ contentStyles.value }
            onTouchstartPassive={ onTouchstart }
            onTouchmovePassive={ onTouchmove }
            onTouchendPassive={ onTouchend }
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
