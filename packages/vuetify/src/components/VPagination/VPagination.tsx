import './VPagination.sass'

// Types
import type { Density } from '@/composables/density'

// Components
import { VBtn } from '../VBtn'

// Utilities
import { computed, defineComponent, ref } from 'vue'
import { createRange, makeProps } from '@/util'

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

export default defineComponent({
  name: 'VPagination',

  props: makeProps({
    modelValue: {
      type: Number,
      default: 1,
    },
    disabled: Boolean,
    length: {
      type: Number,
      default: 0,
      validator: (val: number) => val % 1 === 0,
    },
    totalVisible: [Number, String],
    nextIcon: {
      type: String,
      default: '$next',
    },
    prevIcon: {
      type: String,
      default: '$prev',
    },
    firstIcon: {
      type: String,
      default: '$first',
    },
    lastIcon: {
      type: String,
      default: '$last',
    },
    pageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.page',
    },
    currentPageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.currentPage',
    },
    previousAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.previous',
    },
    nextAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.next',
    },
    ariaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.root',
    },
    firstAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.first',
    },
    lastAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.last',
    },
    color: {
      type: [String, Boolean],
      default: 'primary',
    },
    showFirstLastPage: Boolean,
    ...makeTagProps({ tag: 'nav' }),
    ...makeElevationProps({ elevation: 1 }),
    ...makeDensityProps({ density: 'comfortable' as Density }),
    ...makeRoundedProps({ rounded: 'sm' }),
    ...makeSizeProps(),
    ...makeBorderProps(),
  }),

  setup (props, ctx) {
    const { t } = useLocale()
    const { isRtl } = useRtl()
    const { resizeRef } = useResizeObserver(entries => {
      if (!entries.length) return

      const { target, contentRect } = entries[0]

      const firstItem = target.querySelector('.v-pagination__list > *')

      if (!firstItem) return

      const totalWidth = contentRect.width
      const itemWidth = firstItem.getBoundingClientRect().width

      maxButtons.value = Math.max(0, Math.floor((totalWidth - 96)/ itemWidth) - 2)
    })

    const maxButtons = ref(-1)

    const totalVisible = computed(() => {
      if (props.totalVisible) return Math.min(parseInt(props.totalVisible ?? '', 10), props.length)
      else if (maxButtons.value >= 0) return maxButtons.value
      return props.length
    })

    const pages = computed(() => {
      if (props.length <= 0) return []

      if (totalVisible.value <= 3) {
        return [props.modelValue || 1]
      }

      if (props.length <= totalVisible.value) {
        return createRange(props.length, 1)
      }

      const even = totalVisible.value % 2 === 0 ? 1 : 0
      const middle = Math.ceil(totalVisible.value / 2)
      const left = middle + even
      const right = props.length - middle + even

      if (props.modelValue < left) {
        return [...createRange(Math.max(1, totalVisible.value - 2), 1), '...', props.length]
      } else if (props.modelValue > right) {
        const length = totalVisible.value - 2
        const start = props.length - length + 1
        return [1, '...', ...createRange(length, start)]
      } else {
        const length = Math.max(1, totalVisible.value - 4)
        const start = props.modelValue - Math.floor(length / 2)
        return [1, '...', ...createRange(length, start), '...', props.length]
      }
    })

    function emit (e: Event, value: number, event?: string) {
      e.preventDefault()
      ctx.emit('update:modelValue', value)
      event && ctx.emit(event, value)
    }

    const items = computed(() => {
      const sharedProps = {
        density: props.density,
        rounded: props.rounded,
        size: props.size,
      }

      return pages.value.map((page, index) => {
        if (typeof page === 'string') {
          return {
            ...sharedProps,
            page,
            icon: true,
            disabled: true,
            text: true,
            outlined: props.outlined,
            border: props.border,
          }
        } else {
          return {
            ...sharedProps,
            page,
            icon: true,
            disabled: !!props.disabled,
            elevation: props.elevation,
            outlined: page !== props.modelValue ?? props.outlined,
            border: page !== props.modelValue ?? props.border,
            text: page !== props.modelValue,
            color: page === props.modelValue ? props.color : false,
            ariaCurrent: page === props.modelValue,
            ariaLabel: t(page === props.modelValue ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
            onClick: (e: Event) => emit(e, page),
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

      return {
        first: props.showFirstLastPage ? {
          ...sharedProps,
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e: Event) => emit(e, 1, 'first'),
          disabled: !!props.disabled || props.modelValue <= 1,
          ariaLabel: t(props.firstAriaLabel),
        } : undefined,
        prev: {
          ...sharedProps,
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e: Event) => emit(e, props.modelValue - 1, 'prev'),
          disabled: !!props.disabled || props.modelValue <= 1,
          ariaLabel: t(props.previousAriaLabel),
        },
        next: {
          ...sharedProps,
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e: Event) => emit(e, props.modelValue + 1, 'next'),
          disabled: !!props.disabled || props.modelValue >= props.length,
          ariaLabel: t(props.nextAriaLabel),
        },
        last: props.showFirstLastPage ? {
          ...sharedProps,
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e: Event) => emit(e, props.length, 'last'),
          disabled: !!props.disabled || props.modelValue >= props.length,
          ariaLabel: t(props.lastAriaLabel),
        } : undefined,
      }
    })

    return () => (
      <props.tag
        ref={resizeRef}
        class='v-pagination'
        role='navigation'
        aria-label={t(props.ariaLabel)}
      >
        <ul class='v-pagination__list'>
          {props.showFirstLastPage && (
            <li class='v-pagination__first'>
              { ctx.slots.first ? ctx.slots.first(controls.value.first) : (
                <VBtn {...controls.value.first} />
              )}
            </li>
          )}

          <li class='v-pagination__prev'>
            { ctx.slots.prev ? ctx.slots.prev(controls.value.prev) : (
              <VBtn {...controls.value.prev} />
            )}
          </li>

          { items.value.map(({ page, ...item }, index) => (
            <li
              key={`${index}_${page}`}
              class='v-pagination__item'
            >
              { ctx.slots.item ? ctx.slots.item({ page, ...item }) : (
                <VBtn {...item}>{page}</VBtn>
              ) }
            </li>
          )) }

          <li class='v-pagination__next'>
            { ctx.slots.next ? ctx.slots.next(controls.value.next) : (
              <VBtn {...controls.value.next} />
            )}
          </li>

          {props.showFirstLastPage && (
            <li class='v-pagination__last'>
              { ctx.slots.last ? ctx.slots.last(controls.value.last) : (
                <VBtn {...controls.value.last} />
              )}
            </li>
          )}
        </ul>
      </props.tag>
    )
  }
})
