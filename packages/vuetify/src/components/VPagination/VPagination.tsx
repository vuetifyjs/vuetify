import './VPagination.sass'

// Types
import type { Density } from '@/composables/density'

// Components
import { VBtn } from '../VBtn'

// Utilities
import { ComponentPublicInstance, computed, defineComponent, nextTick, ref } from 'vue'
import { createRange, keyCodes, makeProps } from '@/util'

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
    start: {
      type: Number,
      default: 1,
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
    const page = useProxiedModel(props, 'modelValue')
    const { t } = useLocale()
    const { isRtl } = useRtl()
    const { resizeRef } = useResizeObserver(entries => {
      if (!entries.length) return

      const { target, contentRect } = entries[0]

      const firstItem = target.querySelector('.v-pagination__list > *')

      if (!firstItem) return

      const totalWidth = contentRect.width
      const itemWidth = firstItem.getBoundingClientRect().width + 10

      maxButtons.value = Math.max(0, Math.floor((totalWidth - 96)/ itemWidth))
    })

    const maxButtons = ref(-1)

    const totalVisible = computed(() => {
      if (props.totalVisible) return Math.min(parseInt(props.totalVisible ?? '', 10), props.length)
      else if (maxButtons.value >= 0) return maxButtons.value
      return props.length
    })

    const range = computed(() => {
      if (props.length <= 0) return []

      if (totalVisible.value <= 3) {
        return [Math.min(Math.max(props.start, page.value), props.start + props.length)]
      }

      if (props.length <= totalVisible.value) {
        return createRange(props.length, props.start)
      }

      const even = totalVisible.value % 2 === 0 ? 1 : 0
      const middle = Math.ceil(totalVisible.value / 2)
      const left = middle + even
      const right = props.length - middle + even

      if (page.value < left) {
        return [...createRange(Math.max(1, totalVisible.value - 2), props.start), '...', props.length]
      } else if (page.value > right) {
        const length = totalVisible.value - 2
        const start = props.length - length + props.start
        return [props.start, '...', ...createRange(length, start)]
      } else {
        const length = Math.max(1, totalVisible.value - 4)
        const start = page.value - Math.floor(length / 2) + props.start
        return [props.start, '...', ...createRange(length, start), '...', props.length]
      }
    })

    function emit (e: Event, value: number, event?: string) {
      e.preventDefault()
      page.value = value
      event && ctx.emit(event, value)
    }

    const { refs, updateRef } = useRefs<ComponentPublicInstance>()

    const items = computed(() => {
      const sharedProps = {
        density: props.density,
        rounded: props.rounded,
        size: props.size,
      }

      return range.value.map((item, index) => {
        if (typeof item === 'string') {
          return {
            ...sharedProps,
            ref: (e: any) => updateRef(e, index),
            page: item,
            icon: true,
            disabled: true,
            text: true,
            outlined: props.outlined,
            border: props.border,
          }
        } else {
          return {
            ...sharedProps,
            ref: (e: any) => updateRef(e, index),
            page: item,
            icon: true,
            disabled: !!props.disabled,
            elevation: props.elevation,
            outlined: props.outlined,
            border: props.border,
            text: item !== page.value,
            color: item === page.value ? props.color : false,
            ariaCurrent: item === page.value,
            ariaLabel: t(item === page.value ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
            onClick: (e: Event) => emit(e, item),
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
          onClick: (e: Event) => emit(e, props.start, 'first'),
          disabled: !!props.disabled || page.value <= props.start,
          ariaLabel: t(props.firstAriaLabel),
        } : undefined,
        prev: {
          ...sharedProps,
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e: Event) => emit(e, page.value - 1, 'prev'),
          disabled: !!props.disabled || page.value <= props.start,
          ariaLabel: t(props.previousAriaLabel),
        },
        next: {
          ...sharedProps,
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e: Event) => emit(e, page.value + 1, 'next'),
          disabled: !!props.disabled || page.value >= props.start + props.length - 1,
          ariaLabel: t(props.nextAriaLabel),
        },
        last: props.showFirstLastPage ? {
          ...sharedProps,
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e: Event) => emit(e, props.start + props.length - 1, 'last'),
          disabled: !!props.disabled || page.value >= props.start + props.length - 1,
          ariaLabel: t(props.lastAriaLabel),
        } : undefined,
      }
    })

    function updateFocus () {
      const currentIndex = page.value - props.start
      refs.value[currentIndex]?.$el.focus()
    }

    function onKeydown (e: KeyboardEvent) {
      if (e.keyCode === keyCodes.left && !props.disabled && page.value > props.start) {
        page.value = page.value - 1
        nextTick(updateFocus)

      } else if (e.keyCode === keyCodes.right && !props.disabled && page.value < props.start + props.length - 1) {
        page.value = page.value + 1
        nextTick(updateFocus)
      }
    }

    return () => (
      <props.tag
        ref={resizeRef}
        class='v-pagination'
        role='navigation'
        aria-label={t(props.ariaLabel)}
        onKeydown={onKeydown}
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
