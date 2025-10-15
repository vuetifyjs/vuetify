// Styles
import './VWindow.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useGroup } from '@/composables/group'
import { useLocale, useRtl } from '@/composables/locale'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Directives
import vTouch from '@/directives/touch'

// Utilities
import { computed, nextTick, provide, ref, shallowRef, toRef, watch } from 'vue'
import { convertToUnit, genericComponent, IN_BROWSER, PREFERS_REDUCED_MOTION, propsFactory, useRender, getScrollParent } from '@/util'

// Types
import type { ComputedRef, InjectionKey, PropType, Ref } from 'vue'
import type { GroupItemProvide, GroupProvide } from '@/composables/group'
import type { IconValue } from '@/composables/icons'
import type { TouchHandlers } from '@/directives/touch'
import type { GenericProps } from '@/util'

export type VWindowSlots = {
  default: { group: GroupProvide }
  additional: { group: GroupProvide }
  prev: { props: ControlProps }
  next: { props: ControlProps }
}

type WindowProvide = {
  transition: ComputedRef<undefined | string>
  transitionCount: Ref<number>
  transitionHeight: Ref<undefined | string>
  isReversed: Ref<boolean>
  rootRef: Ref<HTMLElement | undefined>
}

type ControlProps = {
  icon: IconValue
  class: string
  onClick: () => void
  'aria-label': string
}

export const VWindowSymbol: InjectionKey<WindowProvide> = Symbol.for('vuetify:v-window')
export const VWindowGroupSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-window-group')

export const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object] as PropType<IconValue>,
    default: '$next',
  },
  prevIcon: {
    type: [Boolean, String, Function, Object] as PropType<IconValue>,
    default: '$prev',
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v: any) => typeof v === 'boolean' || v === 'hover',
  },
  verticalArrows: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
  touch: {
    type: [Object, Boolean] as PropType<boolean | TouchHandlers>,
    default: undefined,
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },

  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: 'v-window-item--active',
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String] as PropType<boolean | 'force'>,
    default: 'force' as const,
  },
  crossfade: Boolean,
  transitionDuration: Number,

  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VWindow')

export const VWindow = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VWindowSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VWindow',

  directives: { vTouch },

  props: makeVWindowProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { isRtl } = useRtl()
    const { t } = useLocale()

    const group = useGroup(props, VWindowGroupSymbol)

    const rootRef = ref()
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse)
    const isReversed = shallowRef(false)
    const transition = computed(() => {
      if (props.crossfade) {
        return 'v-window-crossfade-transition'
      }

      const axis = props.direction === 'vertical' ? 'y' : 'x'
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value
      const direction = reverse ? '-reverse' : ''

      return `v-window-${axis}${direction}-transition`
    })
    const transitionCount = shallowRef(0)
    const transitionHeight = ref<undefined | string>(undefined)

    const activeIndex = computed(() => {
      return group.items.value.findIndex(item => group.selected.value.includes(item.id))
    })

    // Fix for https://github.com/vuetifyjs/vuetify/issues/18447
    watch(activeIndex, (newVal, oldVal) => {
      let scrollableParent: HTMLElement | undefined
      const savedScrollPosition = { x: 0, y: 0 }

      if (IN_BROWSER) {
        // Find the first scrollable parent
        let parent = getScrollParent(rootRef.value)
        while (parent) {
          const { overflowY, overflowX } = window.getComputedStyle(parent)
          const isScrollable = /(auto|scroll)/.test(overflowY + overflowX)
          if (isScrollable && (parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth)) {
            scrollableParent = parent
            break
          }
          parent = getScrollParent(parent)
        }

        // Default to document root if no scrollable parent found
        if (!scrollableParent) scrollableParent = document.documentElement

        // Save current scroll position
        savedScrollPosition.x = scrollableParent.scrollLeft
        savedScrollPosition.y = scrollableParent.scrollTop
      }

      const itemsLength = group.items.value.length
      const lastIndex = itemsLength - 1

      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false
      } else {
        isReversed.value = newVal < oldVal
      }

      nextTick(() => {
        if (!IN_BROWSER || !scrollableParent) return

        const currentScrollY = scrollableParent.scrollTop

        if (currentScrollY !== savedScrollPosition.y) {
          scrollableParent.scrollTo({ left: savedScrollPosition.x, top: savedScrollPosition.y, behavior: 'instant' })
        }

        requestAnimationFrame(() => {
          if (!scrollableParent) return

          const rafScrollY = scrollableParent.scrollTop

          if (rafScrollY !== savedScrollPosition.y) {
            scrollableParent.scrollTo({ left: savedScrollPosition.x, top: savedScrollPosition.y, behavior: 'instant' })
          }
        })
      })
    }, { flush: 'sync' }) // Run synchronously before DOM updates

    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef,
    })

    const canMoveBack = toRef(() => props.continuous || activeIndex.value !== 0)
    const canMoveForward = toRef(() => props.continuous || activeIndex.value !== group.items.value.length - 1)

    function prev () {
      canMoveBack.value && group.prev()
    }

    function next () {
      canMoveForward.value && group.next()
    }

    const arrows = computed(() => {
      const arrows = []

      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? 'right' : 'left'}`,
        onClick: group.prev,
        'aria-label': t('$vuetify.carousel.prev'),
      }

      arrows.push(canMoveBack.value
        ? slots.prev
          ? slots.prev({ props: prevProps })
          : <VBtn { ...prevProps } />
        : <div />
      )

      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? 'left' : 'right'}`,
        onClick: group.next,
        'aria-label': t('$vuetify.carousel.next'),
      }

      arrows.push(canMoveForward.value
        ? slots.next
          ? slots.next({ props: nextProps })
          : <VBtn { ...nextProps } />
        : <div />
      )

      return arrows
    })

    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch

      const options: TouchHandlers = {
        left: () => {
          isRtlReverse.value ? prev() : next()
        },
        right: () => {
          isRtlReverse.value ? next() : prev()
        },
        start: ({ originalEvent }) => {
          originalEvent.stopPropagation()
        },
      }

      return {
        ...options,
        ...(props.touch === true ? {} : props.touch),
      }
    })

    useRender(() => (
      <props.tag
        ref={ rootRef }
        class={[
          'v-window',
          {
            'v-window--show-arrows-on-hover': props.showArrows === 'hover',
            'v-window--vertical-arrows': !!props.verticalArrows,
            'v-window--crossfade': !!props.crossfade,
          },
          themeClasses.value,
          props.class,
        ]}
        style={[
          props.style,
          props.transitionDuration && !PREFERS_REDUCED_MOTION
            ? { '--v-window-transition-duration': convertToUnit(props.transitionDuration, 'ms') }
            : undefined,
        ]}
        v-touch={ touchOptions.value }
      >
        <div
          class="v-window__container"
          style={{
            height: transitionHeight.value,
          }}
        >
          { slots.default?.({ group }) }

          { props.showArrows !== false && (
            <div
              class={[
                'v-window__controls',
                { 'v-window__controls--left': props.verticalArrows === 'left' || props.verticalArrows === true },
                { 'v-window__controls--right': props.verticalArrows === 'right' },
              ]}
            >
              { arrows.value }
            </div>
          )}
        </div>

        { slots.additional?.({ group }) }
      </props.tag>
    ))

    return {
      group,
    }
  },
})

export type VWindow = InstanceType<typeof VWindow>
