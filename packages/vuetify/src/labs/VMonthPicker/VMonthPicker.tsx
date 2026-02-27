// Styles
import './VMonthPicker.sass'

// Components
import { VFadeTransition } from '@/components/transitions'
import { VBtn } from '@/components/VBtn'
import { VDatePickerHeader } from '@/components/VDatePicker/VDatePickerHeader'
import { VDatePickerMonths } from '@/components/VDatePicker/VDatePickerMonths'
import { VDatePickerYears } from '@/components/VDatePicker/VDatePickerYears'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, shallowRef, watch } from 'vue'
import { clamp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VMonthPickerSlots = {
  header: never
  title: never
  actions: never
}

export const makeVMonthPickerProps = propsFactory({
  modelValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  min: String,
  max: String,
  allowedMonths: [Array, Function] as PropType<number[] | ((date: number) => boolean)>,
  ...makeVPickerProps({
    title: 'Select month', // later: '$vuetify.monthPicker.title'
  }),
}, 'VMonthPicker')

export const VMonthPicker = genericComponent<VMonthPickerSlots>()({
  name: 'VMonthPicker',

  props: makeVMonthPickerProps(),

  emits: {
    'update:modelValue': (value: string | null) => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()

    const model = useProxiedModel(props, 'modelValue')

    const viewMode = shallowRef<'months' | 'years'>('months')
    const month = shallowRef<number | null>(null)
    const year = shallowRef<number>(adapter.getYear(adapter.date()))
    const yearTransition = shallowRef<string | undefined>(undefined)

    const headerText = computed(() => {
      if (!model.value) return ''
      return adapter.format(adapter.parseISO(`${model.value}-01`), 'monthAndYear')
    })

    function setYear (v: number, withTransition?: boolean) {
      yearTransition.value = withTransition
        ? `scroll-x-${v < year.value ? 'reverse-' : ''}transition`
        : undefined
      year.value = v
      updateModel()
    }

    function setMonth (v: number) {
      month.value = v
      updateModel()
    }

    function toggleYears () {
      viewMode.value = viewMode.value === 'years' ? 'months' : 'years'
    }

    watch(year, () => {
      setTimeout(() => { viewMode.value = 'months' }, 100)
    })

    watch(model, val => {
      if (!val) {
        year.value = adapter.getYear(adapter.date())
        month.value = null
        return
      }
      const [y, m] = val.split('-').map(v => parseInt(v))
      year.value = y
      month.value = clamp(m - 1, 0, 11)
    }, { immediate: true })

    function updateModel () {
      if (year.value && month.value !== null) {
        model.value = `${year.value}-${String(month.value + 1).padStart(2, '0')}`
      }
    }

    useRender(() => {
      return (
        <VPicker
          class="v-month-picker"
          color={ props.color }
          title={ props.title }
        >
          {{
            header: () => (
              <VDatePickerHeader header={ headerText.value } />
            ),
            default: () => (
              <>
                <VDefaultsProvider defaults={{ VBtn: { variant: 'text' } }}>
                  <div class="v-month-picker__controls pa-3 pb-0 d-flex justify-space-between align-center flex-grow-1">
                    <VBtn
                      icon="$prev"
                      onClick={ () => setYear(year.value - 1, true) }
                    />
                    <VBtn
                      rounded
                      onClick={ toggleYears }
                      v-slots={{
                        default: () => (
                          <MaybeTransition name={ yearTransition.value } mode="out-in">
                            <span key={ year.value }>{ year.value }</span>
                          </MaybeTransition>
                        ),
                        append: () => (
                          <VIcon
                            icon="$dropdown"
                            style={{
                              transition: 'transform .2s ease-in-out',
                              transform: `rotate(${viewMode.value === 'years' ? 180 : 0}deg)`,
                            }}
                          />
                        ),
                      }}
                    />
                    <VBtn
                      icon="$next"
                      onClick={ () => setYear(year.value + 1, true) }
                    />
                  </div>
                </VDefaultsProvider>

                <VFadeTransition hideOnLeave>
                  { viewMode.value === 'years' ? (
                    <VDatePickerYears
                      key="years"
                      class="flex-grow-1"
                      modelValue={ year.value }
                      min={ props.min }
                      max={ props.max }
                      onUpdate:modelValue={ setYear }
                    />
                  ) : (
                    <VDatePickerMonths
                      key="months"
                      class="flex-grow-1"
                      modelValue={ month.value ?? undefined }
                      year={ year.value }
                      min={ props.min }
                      max={ props.max }
                      allowedMonths={ props.allowedMonths }
                      onUpdate:modelValue={ setMonth }
                    />
                  )}
                </VFadeTransition>
              </>
            ),
            actions: slots.actions,
          }}
        </VPicker>
      )
    })

    return {}
  },
})

export type VMonthPicker = InstanceType<typeof VMonthPicker>
