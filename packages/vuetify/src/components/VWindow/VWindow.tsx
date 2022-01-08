// Components
import { VBtn } from '@/components'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useGroup } from '@/composables/group'
import { useRtl } from '@/composables/rtl'

// Directives
import { Touch } from '@/directives/touch'

// Utilities
import { computed, defineComponent, provide, ref, watch } from 'vue'

// Styles
import './VWindow.sass'

// Types
import type { ComputedRef, InjectionKey, PropType, Ref } from 'vue'
import type { GroupItemProvide } from '@/composables/group'
import type { TouchHandlers } from '@/directives/touch'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useLocale } from '@/composables/locale'

type WindowProvide = {
  transition: ComputedRef<undefined | string>
  transitionCount: Ref<number>
  transitionHeight: Ref<undefined | string>
  isReversed: Ref<boolean>
  rootRef: Ref<HTMLElement | undefined>
}

export const VWindowSymbol: InjectionKey<WindowProvide> = Symbol.for('vuetify:v-window')
export const VWindowGroupSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-window-group')

export const VWindow = defineComponent({
  name: 'VWindow',

  directives: {
    Touch,
  },

  props: {
    continuous: Boolean,
    nextIcon: {
      type: [Boolean, String],
      default: '$next',
    },
    prevIcon: {
      type: [Boolean, String],
      default: '$prev',
    },
    reverse: Boolean,
    showArrows: {
      type: [Boolean, String],
      validator: (v: any) => typeof v === 'boolean' || v === 'hover',
    },
    touch: [Object, Boolean] as PropType<boolean | TouchHandlers>,
    direction: {
      type: String,
      default: 'horizontal',
    },

    modelValue: null,
    disabled: Boolean,
    selectedClass: {
      type: String,
      default: 'v-window-item--active',
    },
    // TODO: mandatory should not be exposed by do this for now
    mandatory: {
      default: 'force' as const,
    },

    ...makeTagProps(),
    ...makeThemeProps(),
  },

  emits: {
    'update:modelValue': (v: any) => true,
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { isRtl } = useRtl()
    const { t } = useLocale()

    const group = useGroup(props, VWindowGroupSymbol)

    const rootRef = ref()
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse)
    const isReversed = ref(false)
    const transition = computed(() => {
      const axis = props.direction === 'vertical' ? 'y' : 'x'
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value
      const direction = reverse ? '-reverse' : ''

      return `v-window-${axis}${direction}-transition`
    })
    const transitionCount = ref(0)
    const transitionHeight = ref<undefined | string>(undefined)

    const activeIndex = computed(() => {
      return group.items.value.findIndex(item => group.selected.value.includes(item.id))
    })

    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length
      const lastIndex = itemsLength - 1

      if (itemsLength <= 2) isReversed.value = newVal < oldVal

      if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = true
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = false
      } else {
        isReversed.value = newVal < oldVal
      }
    })

    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef,
    })

    const arrows = computed(() => {
      const firstActive = activeIndex.value === 0
      const lastActive = activeIndex.value === group.items.value.length - 1

      const arrows = []

      const prevProps = {
        icon: isRtlReverse.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? 'right' : 'left'}`,
        onClick: group.prev,
        ariaLabel: t('$vuetify.carousel.prev'),
      }

      arrows.push(props.continuous || !firstActive
        ? slots.prev
          ? slots.prev(prevProps)
          : <VBtn variant="text" { ...prevProps } />
        : <div />
      )

      const nextProps = {
        icon: isRtlReverse.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? 'left' : 'right'}`,
        onClick: group.next,
        ariaLabel: t('$vuetify.carousel.next'),
      }

      arrows.push(props.continuous || !lastActive
        ? slots.next
          ? slots.next(nextProps)
          : <VBtn variant="text" { ...nextProps } />
        : <div />
      )

      return arrows
    })

    const touchOptions = computed(() => {
      if (typeof props.touch === 'boolean') return props.touch

      const options: TouchHandlers = {
        left: () => {
          isRtlReverse.value ? group.prev() : group.next()
        },
        right: () => {
          isRtlReverse.value ? group.next() : group.prev()
        },
        end: ({ originalEvent }) => {
          originalEvent.stopPropagation()
        },
        start: ({ originalEvent }) => {
          originalEvent.stopPropagation()
        },
      }

      return {
        ...options,
        ...props.touch,
      }
    })

    return () => (
      <props.tag
        ref={ rootRef }
        class={[
          'v-window',
          {
            'v-window--show-arrows-on-hover': props.showArrows === 'hover',
          },
          themeClasses.value,
        ]}
        style={{
          height: transitionHeight.value,
        }}
        v-touch={ touchOptions.value }
      >
        <div class="v-window__container">
          { slots.default?.() }
          <div class="v-window__controls">
            { props.showArrows !== false && arrows.value }
          </div>
        </div>
      </props.tag>
    )
  },
})
