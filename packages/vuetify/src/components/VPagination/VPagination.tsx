// Styles
import './VPagination.sass'

// Components
import { VBtn } from '../VBtn'

// Composables
import { useDisplay } from '@/composables'
import { makeBorderProps } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps } from '@/composables/density'
import { makeElevationProps } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { useLocale, useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRefs } from '@/composables/refs'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeRoundedProps } from '@/composables/rounded'
import { makeSizeProps } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { computed, nextTick, shallowRef, toRef } from 'vue'
import { createRange, genericComponent, isString, keyValues, propsFactory, useRender } from '@/util'

// Types
import type { ComponentPublicInstance, PropType } from 'vue'

type ItemSlot = {
  isActive: boolean
  key: string | number
  page: string
  props: Record<string, any>
}

type ControlSlot = {
  icon: IconValue
  onClick: (e: Event) => void
  disabled: boolean
  'aria-label': string
  'aria-disabled': boolean
}

export type VPaginationSlots = {
  item: ItemSlot
  first: ControlSlot
  prev: ControlSlot
  next: ControlSlot
  last: ControlSlot
}

export const makeVPaginationProps = propsFactory({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1,
  },
  modelValue: {
    type: Number,
    default: (props: any) => props.start as number,
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (val: number) => val % 1 === 0,
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: IconValue,
    default: '$first',
  },
  prevIcon: {
    type: IconValue,
    default: '$prev',
  },
  nextIcon: {
    type: IconValue,
    default: '$next',
  },
  lastIcon: {
    type: IconValue,
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
    default: '...',
  },
  showFirstLastPage: {
    type: [Boolean, String] as PropType<boolean | 'only-first'>,
    default: false,
  },

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'nav' }),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'text' } as const),
}, 'VPagination')

export const VPagination = genericComponent<VPaginationSlots>()({
  name: 'VPagination',

  props: makeVPaginationProps(),

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
    const { width } = useDisplay()
    const maxButtons = shallowRef(-1)
    let lastCandidate: number | undefined
    let candidateBeforeLast: number | undefined

    provideDefaults(undefined, { scoped: true })

    const length = computed(() => parseInt(props.length, 10))
    const start = computed(() => parseInt(props.start, 10))
    const probeCap = computed(() => Math.max(0, Math.min(length.value, 50)))

    const outerWidth = (el: HTMLElement) => {
      const style = getComputedStyle(el)
      return el.getBoundingClientRect().width + parseFloat(style.marginLeft) + parseFloat(style.marginRight)
    }

    function slotsFitToTotalVisible (rawSlotsFit: number) {
      if (rawSlotsFit >= length.value) return length.value
      if (rawSlotsFit <= 0) return 0
      if (rawSlotsFit <= 2) return 1
      return rawSlotsFit - 1
    }

    let availableWidth: number | undefined
    let reservedWidth = 0
    let probeCumulativeWidths: number[] = []

    function recalcMaxButtons () {
      if (availableWidth == null || !probeCumulativeWidths.length) return

      const availableForItems = availableWidth - reservedWidth

      let rawSlotsFit = 0
      for (const cumulative of probeCumulativeWidths) {
        if (cumulative > availableForItems) break
        rawSlotsFit++
      }

      const candidate = slotsFitToTotalVisible(rawSlotsFit)

      if (candidate === candidateBeforeLast && candidate !== lastCandidate) return

      candidateBeforeLast = lastCandidate
      lastCandidate = candidate
      maxButtons.value = candidate
    }

    const { resizeRef } = useResizeObserver((entries: ResizeObserverEntry[]) => {
      if (!entries.length) return

      const { target, contentRect } = entries[0]

      const controls = Array.from(target.querySelectorAll(
        '.v-pagination__first, .v-pagination__prev, .v-pagination__next, .v-pagination__last'
      )) as HTMLElement[]

      availableWidth = contentRect.width
      reservedWidth = controls.reduce((sum, el) => sum + outerWidth(el), 0)

      recalcMaxButtons()
    })

    const { resizeRef: probeRef } = useResizeObserver((entries: ResizeObserverEntry[]) => {
      if (!entries.length) return

      const probeItems = Array.from(entries[0].target.querySelectorAll('.v-pagination__probe-item')) as HTMLElement[]

      if (!probeItems.length) return

      let minLeft = Infinity
      let maxRight = -Infinity
      probeCumulativeWidths = probeItems.map(el => {
        const rect = el.getBoundingClientRect()
        minLeft = Math.min(minLeft, rect.left)
        maxRight = Math.max(maxRight, rect.right)
        return maxRight - minLeft
      })

      recalcMaxButtons()
    })

    const totalVisible = computed(() => {
      if (props.totalVisible != null) return parseInt(props.totalVisible, 10)
      else if (maxButtons.value >= 0) return maxButtons.value
      return getMax(width.value, 58)
    })

    function getMax (totalWidth: number, itemWidth: number) {
      const minButtons = props.showFirstLastPage ? 5 : 3
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2))
      ))
    }

    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return []

      if (props.totalVisible == null && length.value < 3) {
        return createRange(length.value, start.value)
      }

      if (totalVisible.value <= 0) return []
      else if (totalVisible.value === 1) return [page.value]

      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value)
      }

      const even = totalVisible.value % 2 === 0
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2)
      const left = even ? middle : middle + 1
      const right = length.value - middle

      let result: (string | number)[]

      if (left - page.value >= 0) {
        result = [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value]
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1
        const rangeStart = length.value - rangeLength + start.value
        result = [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)]
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 2)
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value
        result = [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value]
      }

      if (props.totalVisible != null) return result

      return result.map((item, i) => {
        if (typeof item !== 'string') return item
        const prev = result[i - 1] as number
        const next = result[i + 1] as number
        return next - prev === 2 ? prev + 1 : item
      })
    })

    // TODO: 'first' | 'prev' | 'next' | 'last' does not work here?
    function setValue (e: Event, value: number, event?: any) {
      e.preventDefault()
      page.value = value
      event && emit(event, value)
    }

    const { refs, updateRef } = useRefs<ComponentPublicInstance>()

    provideDefaults({
      VPaginationBtn: {
        color: toRef(() => props.color),
        border: toRef(() => props.border),
        density: toRef(() => props.density),
        size: toRef(() => props.size),
        variant: toRef(() => props.variant),
        rounded: toRef(() => props.rounded),
        elevation: toRef(() => props.elevation),
      },
    })

    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref = (e: any) => updateRef(e, index)

        if (isString(item)) {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref,
              ellipsis: true,
              icon: true,
              disabled: true,
            },
          }
        } else {
          const isActive = item === page.value
          return {
            isActive,
            key: item,
            page: n(item),
            props: {
              ref,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || Number(props.length) < 2,
              color: isActive ? props.activeColor : props.color,
              'aria-current': isActive,
              'aria-label': t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
              onClick: (e: Event) => setValue(e, item),
            },
          }
        }
      })
    })

    const probeItems = computed(() => {
      return createRange(probeCap.value, 1).map(item => ({
        isActive: false,
        key: `probe-${item}`,
        page: n(item),
        props: {
          ellipsis: false,
          icon: true,
          disabled: false,
        },
      }))
    })

    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1

      return {
        first: [true, 'only-first'].includes(props.showFirstLastPage) ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e: Event) => setValue(e, start.value, 'first'),
          disabled: prevDisabled,
          'aria-label': t(props.firstAriaLabel),
          'aria-disabled': prevDisabled,
        } : undefined,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e: Event) => setValue(e, page.value - 1, 'prev'),
          disabled: prevDisabled,
          'aria-label': t(props.previousAriaLabel),
          'aria-disabled': prevDisabled,
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e: Event) => setValue(e, page.value + 1, 'next'),
          disabled: nextDisabled,
          'aria-label': t(props.nextAriaLabel),
          'aria-disabled': nextDisabled,
        },
        last: props.showFirstLastPage === true ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e: Event) => setValue(e, start.value + length.value - 1, 'last'),
          disabled: nextDisabled,
          'aria-label': t(props.lastAriaLabel),
          'aria-disabled': nextDisabled,
        } : undefined,
      }
    })

    function updateFocus () {
      const currentIndex = page.value - start.value
      refs.value[currentIndex]?.$el.focus()
    }

    function onKeydown (e: KeyboardEvent) {
      if (e.key === keyValues.left && !props.disabled && page.value > Number(props.start)) {
        page.value = page.value - 1
        nextTick(updateFocus)
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1
        nextTick(updateFocus)
      }
    }

    useRender(() => (
      <props.tag
        ref={ resizeRef }
        class={[
          'v-pagination',
          themeClasses.value,
          props.class,
        ]}
        style={ props.style }
        role="navigation"
        aria-label={ t(props.ariaLabel) }
        onKeydown={ onKeydown }
        data-testid="v-pagination-root"
      >
        <ul class="v-pagination__list">
          {[true, 'only-first'].includes(props.showFirstLastPage) && (
            <li key="first" class="v-pagination__first" data-testid="v-pagination-first">
              { slots.first ? slots.first(controls.value.first!) : (
                <VBtn _as="VPaginationBtn" { ...controls.value.first } />
              )}
            </li>
          )}

          <li key="prev" class="v-pagination__prev" data-testid="v-pagination-prev">
            { slots.prev ? slots.prev(controls.value.prev) : (
              <VBtn _as="VPaginationBtn" { ...controls.value.prev } />
            )}
          </li>

          { items.value.map((item, index) => (
            <li
              key={ item.key }
              class={[
                'v-pagination__item',
                {
                  'v-pagination__item--is-active': item.isActive,
                },
              ]}
              data-testid="v-pagination-item"
            >
              { slots.item ? slots.item(item) : (
                <VBtn _as="VPaginationBtn" { ...item.props }>{ item.page }</VBtn>
              )}
            </li>
          ))}

          <li key="next" class="v-pagination__next" data-testid="v-pagination-next">
            { slots.next ? slots.next(controls.value.next) : (
              <VBtn _as="VPaginationBtn" { ...controls.value.next } />
            )}
          </li>

          { props.showFirstLastPage === true && (
            <li key="last" class="v-pagination__last" data-testid="v-pagination-last">
              { slots.last ? slots.last(controls.value.last!) : (
                <VBtn _as="VPaginationBtn" { ...controls.value.last } />
              )}
            </li>
          )}
        </ul>

        { props.totalVisible == null && (
        <ul
          ref={ probeRef }
          class={['v-pagination__list', 'v-pagination__probe-list']}
          aria-hidden="true"
          inert
          style="position: fixed; top: -9999px; left: -9999px; visibility: hidden; pointer-events: none"
        >
          { probeItems.value.map(item => (
            <li key={ item.key } class="v-pagination__probe-item">
              { slots.item ? slots.item(item) : (
                <VBtn _as="VPaginationBtn" { ...item.props }>{ item.page }</VBtn>
              )}
            </li>
          ))}
        </ul>
        )}
      </props.tag>
    ))

    return {}
  },
})

export type VPagination = InstanceType<typeof VPagination>
