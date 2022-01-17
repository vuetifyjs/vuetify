import './VPagination.sass'

// Components
import { VBtn } from '../VBtn'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useLocale } from '@/composables/locale'
import { useRtl } from '@/composables/rtl'
import { makeElevationProps } from '@/composables/elevation'
import { makeDensityProps } from '@/composables/density'
import { makeRoundedProps } from '@/composables/rounded'
import { makeSizeProps } from '@/composables/size'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeBorderProps } from '@/composables/border'
import { useRefs } from '@/composables/refs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { computed, nextTick, ref } from 'vue'
import { clamp, createRange, defineComponent, keyValues } from '@/util'

// Types
import type { ComponentPublicInstance } from 'vue'

export function getRange (start: number, page: number, length: number, visible: number, ellipsis: string) {
  if (visible <= 0) return []

  if (length <= visible) {
    return createRange(length, start)
  }

  const current = clamp(start, page, start + length)
  const range = []

  if (visible <= 3) {
    return [current]
  }

  const nearStart = current - start <= 2
  const nearEnd = length - current <= 2

  // Number of skipped sections
  const breakCount = nearStart || nearEnd
    ? 1
    : 2

  // The smallest consecutive number of buttons visible around the current one
  const minRun = clamp(visible - breakCount, visible, length)
  const minSide = Math.floor(minRun / 2)

  console.log({ breakCount, minSide })

  const left = start
  const right = start + length

  const before = page - left
  const after = right - page

  {
    const middle = Math.ceil(visible / 2)
    const left = middle
    const right = length - middle

    if (page < left) {
      return [...createRange(Math.max(1, visible - 2), start), ellipsis, length]
    } else if (page > right) {
      const rangeLength = visible - 2
      const rangeStart = length - rangeLength + start
      return [start, ellipsis, ...createRange(rangeLength, rangeStart)]
    } else {
      const rangeLength = Math.max(1, visible - 4)
      const rangeStart = rangeLength === 1 ? page : page - Math.ceil(rangeLength / 2) + start

      const arr: (string | number)[] = [start]

      if (rangeStart - start === 2) {
        arr.push(rangeStart - 1)
      } else if (rangeStart - start > 1) {
        arr.push(ellipsis)
      }

      arr.push(...createRange(rangeLength, rangeStart))
      arr.push(ellipsis)
      arr.push(length)

      return arr
    }
  }
}

export const VPagination = defineComponent({
  name: 'VPagination',

  props: {
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
      default: 1,
      validator: (val: number) => val % 1 === 0,
    },
    totalVisible: {
      type: [Number, String],
      default: Infinity,
    },
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
    ellipsis: {
      type: String,
      default: '\u2026',
    },
    showFirstLastPage: Boolean,

    ...makeTagProps({ tag: 'nav' }),
    ...makeElevationProps(),
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeBorderProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'text' } as const),
  },

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
    const { themeClasses } = provideTheme(props)
    const maxButtons = ref(-1)

    provideDefaults(undefined, { scoped: true })

    const { resizeRef } = useResizeObserver((entries: ResizeObserverEntry[]) => {
      if (!entries.length) return

      const { target, contentRect } = entries[0]

      const firstItem = target.querySelector('.v-pagination__list > *')

      if (!firstItem) return

      const totalWidth = contentRect.width
      const style = getComputedStyle(firstItem)
      const itemWidth = firstItem.getBoundingClientRect().width + parseFloat(style.marginLeft) + parseFloat(style.marginRight)

      const arrowCount = props.showFirstLastPage ? 4 : 2

      maxButtons.value = Math.max(0, Math.floor((totalWidth) / itemWidth) - arrowCount)
    })

    const length = computed(() => parseInt(props.length, 10))
    const start = computed(() => parseInt(props.start, 10))

    const totalVisible = computed(() => {
      return Math.min(maxButtons.value, +props.totalVisible, length.value)
    })

    const range = computed(() => {
      return getRange(start.value, page.value, length.value, totalVisible.value, props.ellipsis)
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
            isActive: false,
            page: item,
            props: {
              ...sharedProps,
              ref,
              ellipsis: true,
              icon: true,
              disabled: true,
              variant: props.variant,
              border: props.border,
            },
          }
        } else {
          const isActive = item === page.value
          return {
            isActive,
            page: n(item),
            props: {
              ...sharedProps,
              ref,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || props.length < 2,
              elevation: props.elevation,
              variant: props.variant,
              border: props.border,
              color: isActive ? props.color : undefined,
              ariaCurrent: isActive,
              ariaLabel: t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
              onClick: (e: Event) => setValue(e, item),
            },
          }
        }
      })
    })

    const controls = computed(() => {
      const sharedProps = {
        color: undefined,
        density: props.density,
        rounded: props.rounded,
        size: props.size,
        variant: props.variant,
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
                  'v-pagination__item--is-active': item.isActive,
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

export type VPagination = InstanceType<typeof VPagination>
