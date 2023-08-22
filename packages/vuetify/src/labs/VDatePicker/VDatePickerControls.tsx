// Styles
import './VDatePickerControls.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VSpacer } from '@/components/VGrid'

// Composables
import { useLocale } from '@/composables/locale'
import { useDate } from '@/labs/date'

// Utilities
import { computed, shallowRef, Transition, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVDatePickerControlsProps = propsFactory({
  displayDate: null,
  disabled: {
    type: [Boolean, String] as PropType<boolean | string[]>,
    default: false,
  },
  nextIcon: {
    type: [String],
    default: '$next',
  },
  prevIcon: {
    type: [String],
    default: '$prev',
  },
  expandIcon: {
    type: [String],
    default: '$expand',
  },
  collapseIcon: {
    type: [String],
    default: '$collapse',
  },
  viewMode: {
    type: String as PropType<'month' | 'year'>,
    default: 'month',
  },
}, 'VDatePickerControls')

export const VDatePickerControls = genericComponent()({
  name: 'VDatePickerControls',

  props: makeVDatePickerControlsProps(),

  emits: {
    'click:mode': () => true,
    'click:prev': () => true,
    'click:next': () => true,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const { isRtl } = useLocale()
    const modeIcon = computed(() => {
      return props.viewMode === 'month' ? props.expandIcon : props.collapseIcon
    })
    const disableMode = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('mode')
        : props.disabled
    })
    const disablePrev = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('prev')
        : props.disabled
    })
    const disableNext = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('next')
        : props.disabled
    })

    function onClickPrev () {
      emit('click:prev')
    }

    function onClickNext () {
      emit('click:next')
    }

    function onClickMode () {
      emit('click:mode')
    }

    const isReversed = shallowRef(false)
    const transition = computed(() => {
      const reverse = isRtl.value ? !isReversed.value : isReversed.value
      const direction = reverse ? '-reverse' : ''

      return `v-window-x${direction}-transition`
    })

    const monthAndYear = computed(() => {
      return adapter.format(props.displayDate, 'monthAndYear')
    })

    watch(() => props.displayDate, (to, from) => {
      isReversed.value = adapter.isBefore(to, from)
    })

    useRender(() => {
      return (
        <div class="v-date-picker-controls">
          <div class="v-date-picker-controls__date">
            <Transition name={ transition.value }>
              <div key={ props.displayDate }>{ monthAndYear.value }</div>
            </Transition>
          </div>
          <VBtn
            disabled={ disableMode.value }
            key="expand-btn"
            icon={ modeIcon.value }
            variant="text"
            onClick={ onClickMode }
          />

          <VSpacer />

          <div
            key="month-buttons"
            class="v-date-picker-controls__month"
          >
            <VBtn
              disabled={ disablePrev.value }
              icon={ props.prevIcon }
              variant="text"
              onClick={ onClickPrev }
            />

            <VBtn
              disabled={ disableNext.value }
              icon={ props.nextIcon }
              variant="text"
              onClick={ onClickNext }
            />
          </div>
        </div>
      )
    })

    return {}
  },
})

export type VDatePickerControls = InstanceType<typeof VDatePickerControls>
