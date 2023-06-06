// Styles
import './VDatePicker.sass'

// Components
import { VDatePickerControls } from './VDatePickerControls'
import { VDatePickerHeader } from './VDatePickerHeader'
import { VDatePickerMonth } from './VDatePickerMonth'
import { VDatePickerYears } from './VDatePickerYears'
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'
import { dateEmits, makeDateProps } from '@/labs/VDateInput/composables'
import { VPicker } from '@/labs/VPicker'

// Composables
import { createDatePicker } from './composables'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useDate } from '@/labs/date'

// Utilities
import { ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVDatePickerProps = propsFactory({
  color: String,
  showActions: Boolean,

  ...makeDateProps(),
  ...makeTransitionProps({ transition: 'fade' }),
}, 'VDatePicker')

export const VDatePicker = genericComponent()({
  name: 'VDatePicker',

  props: makeVDatePickerProps(),

  emits: {
    save: (date: any) => true,
    cancel: () => true,
    ...dateEmits,
  },

  setup (props, { emit }) {
    // const { t } = useLocale()
    // const adapter = useDate()
    // const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    // const text = computed(() => {
    //   if (props.text) return props.text

    //   if (!props.modelValue?.length) return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}header.placeholder`)

    //   if (props.modelValue.length === 1) return adapter.format(props.modelValue[0], 'normalDateWithWeekday')

    //   return props.modelValue.map(date => adapter.format(date, 'monthAndDate')).join(' - ')
    // })
        // const titleText = computed(() => {
    //   if (props.title) return props.title

    //   if (!props.modelValue?.length) return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}title.placeholder`)

    //   return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}title.selected`)
    // })

    // function handleHeaderClick () {
    //   if (!props.modelValue.length) return

    //   const date = props.modelValue[0]

    //   emit('update:displayDate', date)
    // }
    const adapter = useDate()
    createDatePicker(props)

    const inputModel = ref(props.modelValue?.length ? adapter.format(props.modelValue[0], 'keyboardDate') : '')
    const selected = ref<any[]>(props.modelValue ?? [])

    watch(inputModel, () => {
      const { isValid, date } = adapter

      selected.value = isValid(inputModel.value) ? [date(inputModel.value)] : []
    })

    watch(selected, () => {
      if (!props.showActions) {
        emit('update:modelValue', selected.value)
      }
    })

    const handleCancel = () => emit('cancel')
    const handleSave = () => {
      emit('update:modelValue', selected.value)
      emit('save', selected.value)
    }

    useRender(() => {
      const [pickerProps] = VPicker.filterProps(props)
      const [datePickerHeaderProps] = VDatePickerHeader.filterProps(props)
      const [datePickerControlsProps] = VDatePickerControls.filterProps(props)
      const [datePickerMonthProps] = VDatePickerMonth.filterProps(props)
      const [datePickerYearsProps] = VDatePickerYears.filterProps(props)

      return (
        <VPicker
          { ...pickerProps }
          class="v-date-picker"
        >
          {{
            header: () => (
              <VDatePickerHeader
                { ...datePickerHeaderProps }
                modelValue={ selected.value }
                onUpdate:inputMode={ inputMode => emit('update:inputMode', inputMode) }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
              />
            ),
            default: () => props.inputMode === 'calendar' ? (
              <>
                <VDatePickerControls
                  { ...datePickerControlsProps }
                  onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                  onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
                />

                <MaybeTransition transition={ props.transition } mode="out-in">
                  { props.viewMode === 'month' ? (
                    <VDatePickerMonth
                      { ...datePickerMonthProps }
                      v-model={ selected.value }
                      onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                    />
                  ) : (
                    <VDatePickerYears
                      { ...datePickerYearsProps }
                      height="300"
                      displayDate={ props.displayDate }
                      onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                      viewMode={ props.viewMode }
                      onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
                    />
                  )}
                </MaybeTransition>
              </>
            ) : (
              <div class="v-date-picker__input">
                <VTextField
                  v-model={ inputModel.value }
                  label="Enter date"
                  placeholder="yyyy/mm/dd"
                />
              </div>
            ),
            actions: props.showActions ? (() => (
              <div>
                <VBtn variant="text" color={ props.color } onClick={ handleCancel }>Cancel</VBtn>
                <VBtn variant="text" color={ props.color } onClick={ handleSave }>Ok</VBtn>
              </div>
            )) : undefined,
          }}
        </VPicker>
      )
    })

    return {}
  },
})

export type VDatePicker = InstanceType<typeof VDatePicker>
