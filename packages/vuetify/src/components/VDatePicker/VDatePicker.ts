// Components
import VDatePickerTitle from './VDatePickerTitle'
import VDatePickerBody, { VDatePickerBodyProps } from './VDatePickerBody'
import VPicker from '../VPicker'
import VDate, { VDateScopedProps, VDateProps, DatePickerEnum } from './VDate'

// Mixins
import Localable from '../../mixins/localable'

// Types
import Vue, { VNode } from 'vue'
import { DatePickerType } from 'types'

/* @vue/component */
export default Vue.extend({
  name: 'v-date-picker',

  inheritAttrs: false,

  props: {
    ...VPicker.options.props,
    ...Localable.options.props,
    ...VDateProps,
    ...VDatePickerBodyProps,
  },

  methods: {
    genPickerTitle (props: VDateScopedProps) {
      return this.$createElement(VDatePickerTitle, {
        props: {
          dayFormat: props.titleDateFormat,
          yearFormat: props.yearFormat,
          value: props.value,
          disabled: this.disabled,
          readonly: this.readonly,
          selectingYear: props.activePicker === DatePickerEnum.Year,
          yearIcon: this.yearIcon,
          type: props.type,
        },
        slot: 'title',
        on: {
          'update:activePicker': props.updateActivePicker,
        },
      })
    },
    genPickerBody (props: VDateScopedProps) {
      return this.$createElement(VDatePickerBody, {
        props: {
          ...this.$props,
          ...props,
        },
        on: {
          'update:year': props.yearClick,
          'update:month': props.monthClick,
          'update:date': props.dateClick,
          'update:activePicker': props.updateActivePicker,
          'update:pickerDate': props.updatePickerDate,
          'click:date': (value: string) => this.$emit('click:date', value),
          'dblclick:date': (value: string) => this.$emit('dblclick:date', value),
          'click:month': (value: string) => this.$emit('click:month', value),
          'dblclick:month': (value: string) => this.$emit('dblclick:month', value),
        },
      })
    },
    genPicker (props: VDateScopedProps) {
      return this.$createElement(VPicker, {
        staticClass: 'v-picker--date',
        props: this.$props,
      }, [
        this.genPickerTitle(props),
        this.genPickerBody(props),
        this.$slots.default && this.$createElement('template', { slot: 'actions' }, this.$slots.default),
      ])
    },
  },

  render (h): VNode {
    return h(VDate, {
      props: this.$props,
      scopedSlots: {
        default: props => this.genPicker(props),
      },
      on: {
        input: (date: string | string[]) => this.$emit('input', date),
        change: (date: string | string[]) => this.$emit('change', date),
        'update:activePicker': (activePicker: DatePickerType) => this.$emit('update:activePicker', activePicker),
        'update:pickerDate': (date: string) => this.$emit('update:pickerDate', date),
      },
    })
  },
})
