import './VPagination.sass'

// Types
import type { ComponentPublicInstance } from 'vue'
import type { Density } from '@/composables/density'

// Components
import { VBtn } from '../VBtn'

// Utilities
import { computed, defineComponent, nextTick, ref } from 'vue'
import { createRange, keyValues, makeProps } from '@/util'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useLocale } from '@/composables/locale'
import { useRtl } from '@/composables/rtl'
import { makeElevationProps } from '@/composables/elevation'
import { makeDensityProps } from '@/composables/density'
import { makeRoundedProps } from '@/composables/rounded'
import { makeSizeProps } from '@/composables/size'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeBorderProps } from '@/composables/border'
import { useRefs } from '@/composables/refs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTheme } from '@/composables/theme'

export default defineComponent({
  name: 'VPagination',

  props: makeProps({
    start: {
      type: [Number, String],
      default: 1,
    },
    modelValue: {
      type: Number,
      default: (props: any) => props.start,
    },
    disabled: Boolean,
    length: {
      type: [Number, String],
      default: 0,
      validator: (val: number) => val % 1 === 0,
    },
    totalVisible: [Number, String],
    firstIcon: {
      type: String,
      default: '$first',
    },
    prevIcon: {
      type: String,
      default: '$prev',
    },
    nextIcon: {
      type: String,
      default: '$next',
    },
    lastIcon: {
      type: String,
      default: '$last',
    },
    ariaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.root',
    },
    pageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.page',
    },
    currentPageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.currentPage',
    },
    firstAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.first',
    },
    previousAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.previous',
    },
    nextAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.next',
    },
    lastAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.last',
    },
    color: {
      type: [String, Boolean],
      default: 'primary',
    },
    ellipsis: {
      type: String,
      default: '...',
    },
    showFirstLastPage: Boolean,
    ...makeTagProps({ tag: 'nav' }),
    ...makeElevationProps({ elevation: 1 }),
    ...makeDensityProps({ density: 'comfortable' as Density }),
    ...makeRoundedProps({ rounded: 'sm' }),
    ...makeSizeProps(),
    ...makeBorderProps(),
  }),

  emits: {
    'update:modelValue': (value: number) => true,
    first: (value: number) => true,
    prev: (value: number) => true,
    next: (value: number) => true,
    last: (value: number) => true,
  },

  setup (props, { slots, emit }) {
    const page = useProxiedModel(props, 'modelValue')
    const { t, n } = useLocale()
    const { isRtl } = useRtl()
    const { themeClasses } = useTheme()
    const maxButtons = ref(-1)

    const { resizeRef } = useResizeObserver((entries: ResizeObserverEntry[]) => {
      if (!entries.length) return

      const { target, contentRect } = entries[0]

      const firstItem = target.querySelector('.v-pagination__list > *')

      if (!firstItem) return

      const totalWidth = contentRect.width
      const itemWidth = firstItem.getBoundingClientRect().width + 10

      maxButtons.value = Math.max(0, Math.floor((totalWidth - 96) / itemWidth))
    })

    const length = computed(() => parseInt(props.length, 10))
    const start = computed(() => parseInt(props.start, 10))

    const totalVisible = computed(() => {
      if (props.totalVisible) return Math.min(parseInt(props.totalVisible ?? '', 10), length.value)
      else if (maxButtons.value >= 0) return maxButtons.value
      return length.value
    })

    const range = computed(() => {
      if (length.value <= 0) return []

      if (totalVisible.value <= 3) {
        return [Math.min(Math.max(start.value, page.value), start.value + length.value)]
      }

      if (props.length <= totalVisible.value) {
        return createRange(length.value, start.value)
      }

      const middle = Math.ceil(totalVisible.value / 2)
      const left = middle
      const right = length.value - middle

      if (page.value < left) {
        return [...createRange(Math.max(1, totalVisible.value - 2), start.value), props.ellipsis, length.value]
      } else if (page.value > right) {
        const rangeLength = totalVisible.value - 2
        const rangeStart = length.value - rangeLength + start.value
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)]
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 4)
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.floor(rangeLength / 2) + start.value
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value]
      }
    })

    // TODO: 'first' | 'prev' | 'next' | 'last' does not work here?
    function setValue (e: Event, value: number, event?: any) {
      e.preventDefault()
      page.value = value
      event && emit(event, value)
    }

    const { refs, updateRef } = useRefs<ComponentPublicInstance>()

    const items = computed(() => {
      const sharedProps = {
        density: props.density,
        rounded: props.rounded,
        size: props.size,
      }

      return range.value.map((item, index) => {
        const ref = (e: any) => updateRef(e, index)

        if (typeof item === 'string') {
          return {
            isSelected: false,
            page: item,
            props: {
              ...sharedProps,
              ref,
              ellipsis: true,
              icon: true,
              disabled: true,
              text: true,
              outlined: props.outlined,
              border: props.border,
            },
          }
        } else {
          const isSelected = item === page.value
          return {
            isSelected,
            page: n(item),
            props: {
              ...sharedProps,
              ref,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled,
              elevation: props.elevation,
              outlined: props.outlined,
              border: props.border,
              text: !isSelected,
              color: isSelected ? props.color : false,
              ariaCurrent: isSelected,
              ariaLabel: t(isSelected ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
              onClick: (e: Event) => setValue(e, item),
            },
          }
        }
      })
    })

    const controls = computed(() => {
      const sharedProps = {
        color: false,
        density: props.density,
        rounded: props.rounded,
        size: props.size,
        text: true,
        outlined: props.outlined,
        border: props.border,
      }

      const prevDisabled = !!props.disabled || page.value <= start.value
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1

      return {
        first: props.showFirstLastPage ? {
          ...sharedProps,
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e: Event) => setValue(e, start.value, 'first'),
          disabled: prevDisabled,
          ariaLabel: t(props.firstAriaLabel),
          ariaDisabled: prevDisabled,
        } : undefined,
        prev: {
          ...sharedProps,
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e: Event) => setValue(e, page.value - 1, 'prev'),
          disabled: prevDisabled,
          ariaLabel: t(props.previousAriaLabel),
          ariaDisabled: prevDisabled,
        },
        next: {
          ...sharedProps,
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e: Event) => setValue(e, page.value + 1, 'next'),
          disabled: nextDisabled,
          ariaLabel: t(props.nextAriaLabel),
          ariaDisabled: nextDisabled,
        },
        last: props.showFirstLastPage ? {
          ...sharedProps,
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e: Event) => setValue(e, start.value + length.value - 1, 'last'),
          disabled: nextDisabled,
          ariaLabel: t(props.lastAriaLabel),
          ariaDisabled: nextDisabled,
        } : undefined,
      }
    })

    function updateFocus () {
      const currentIndex = page.value - start.value
      refs.value[currentIndex]?.$el.focus()
    }

    function onKeydown (e: KeyboardEvent) {
      if (e.key === keyValues.left && !props.disabled && page.value > props.start) {
        page.value = page.value - 1
        nextTick(updateFocus)
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1
        nextTick(updateFocus)
      }
    }

    return () => (
      <props.tag
        ref={ resizeRef }
        class={[
          'v-pagination',
          themeClasses.value,
        ]}
        role="navigation"
        aria-label={ t(props.ariaLabel) }
        onKeydown={ onKeydown }
        data-test="v-pagination-root"
      >
        <ul class="v-pagination__list">
          { props.showFirstLastPage && (
            <li class="v-pagination__first" data-test="v-pagination-first">
              { slots.first ? slots.first(controls.value.first) : (
                <VBtn {...controls.value.first} />
              ) }
            </li>
          ) }

          <li class="v-pagination__prev" data-test="v-pagination-prev">
            { slots.prev ? slots.prev(controls.value.prev) : (
              <VBtn {...controls.value.prev} />
            ) }
          </li>

          { items.value.map((item, index) => (
            <li
              key={ `${index}_${item.page}` }
              class={[
                'v-pagination__item',
                {
                  'v-pagination__item--selected': item.isSelected,
                },
              ]}
              data-test="v-pagination-item"
            >
              { slots.item ? slots.item(item) : (
                <VBtn {...item.props}>{ item.page }</VBtn>
              ) }
            </li>
          )) }

          <li class="v-pagination__next" data-test="v-pagination-next">
            { slots.next ? slots.next(controls.value.next) : (
              <VBtn {...controls.value.next} />
            ) }
          </li>

          { props.showFirstLastPage && (
            <li class="v-pagination__last" data-test="v-pagination-last">
              { slots.last ? slots.last(controls.value.last) : (
                <VBtn {...controls.value.last} />
              ) }
            </li>
          ) }
        </ul>
      </props.tag>
    )
  },
})
