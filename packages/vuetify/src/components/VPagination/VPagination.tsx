import './VPagination.sass'

// Components
import { VBtn } from '../VBtn'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useLocale } from '@/composables/locale'
import { useRtl } from '@/composables/rtl'
import { makeElevationProps } from '@/composables/elevation'
import { makeDensityProps } from '@/composables/density'
import { makeSizeProps } from '@/composables/size'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'
import { useResizeObserver } from '@/composables/resizeObserver'
import { makeBorderProps } from '@/composables/border'
import { useRefs } from '@/composables/refs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { computed, nextTick, ref, toRef } from 'vue'
import { createRange, defineComponent, keyValues } from '@/util'

// Types
import type { ComponentPublicInstance } from 'vue'

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
    ellipsis: {
      type: String,
      default: '...',
    },
    showFirstLastPage: Boolean,

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'nav' }),
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
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value
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

    provideDefaults({
      VBtn: {
        border: toRef(props, 'border'),
        density: toRef(props, 'density'),
        size: toRef(props, 'size'),
        variant: toRef(props, 'variant'),
      },
    })

    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref = (e: any) => updateRef(e, index)

        if (typeof item === 'string') {
          return {
            isActive: false,
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
            page: n(item),
            props: {
              ref,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || props.length < 2,
              elevation: props.elevation,
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
      const prevDisabled = !!props.disabled || page.value <= start.value
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1

      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e: Event) => setValue(e, start.value, 'first'),
          disabled: prevDisabled,
          ariaLabel: t(props.firstAriaLabel),
          ariaDisabled: prevDisabled,
        } : undefined,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e: Event) => setValue(e, page.value - 1, 'prev'),
          disabled: prevDisabled,
          ariaLabel: t(props.previousAriaLabel),
          ariaDisabled: prevDisabled,
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e: Event) => setValue(e, page.value + 1, 'next'),
          disabled: nextDisabled,
          ariaLabel: t(props.nextAriaLabel),
          ariaDisabled: nextDisabled,
        },
        last: props.showFirstLastPage ? {
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
