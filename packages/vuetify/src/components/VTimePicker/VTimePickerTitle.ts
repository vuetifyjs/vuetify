import '../../stylus/components/_time-picker-title.styl'

// Mixins
import PickerButton from '../../mixins/picker-button'

// Utils
import { pad } from '../VDatePicker/util'
import mixins from '../../util/mixins'

import { selectingTimes } from './VTimePicker'
import { PropValidator } from 'vue/types/options'
import { VNode } from 'vue'

export default mixins(
  PickerButton
/* @vue/component */
).extend({
  name: 'v-time-picker-title',

  props: {
    ampm: Boolean,
    disabled: Boolean,
    hour: Number,
    minute: Number,
    second: Number,
    period: {
      type: String,
      validator: period => period === 'am' || period === 'pm'
    } as PropValidator<'am' | 'pm'>,
    readonly: Boolean,
    useSeconds: Boolean,
    selecting: Number
  },

  methods: {
    genTime () {
      let hour = this.hour
      if (this.ampm) {
        hour = hour ? ((hour - 1) % 12 + 1) : 12
      }

      const displayedHour = this.hour == null ? '--' : this.ampm ? String(hour) : pad(hour)
      const displayedMinute = this.minute == null ? '--' : pad(this.minute)
      const titleContent = [
        this.genPickerButton('selecting', selectingTimes.hour, displayedHour, this.disabled),
        this.$createElement('span', ':'),
        this.genPickerButton('selecting', selectingTimes.minute, displayedMinute, this.disabled)
      ]

      if (this.useSeconds) {
        const displayedSecond = this.second == null ? '--' : pad(this.second)
        titleContent.push(this.$createElement('span', ':'))
        titleContent.push(this.genPickerButton('selecting', selectingTimes.second, displayedSecond, this.disabled))
      }
      return this.$createElement('div', {
        'class': 'v-time-picker-title__time'
      }, titleContent)
    },
    genAmPm () {
      return this.$createElement('div', {
        staticClass: 'v-time-picker-title__ampm'
      }, [
        this.genPickerButton('period', 'am', 'am', this.disabled || this.readonly),
        this.genPickerButton('period', 'pm', 'pm', this.disabled || this.readonly)
      ])
    }
  },

  render (h): VNode {
    const children = [this.genTime()]

    this.ampm && children.push(this.genAmPm())

    return h('div', {
      staticClass: 'v-time-picker-title'
    }, children)
  }
})
