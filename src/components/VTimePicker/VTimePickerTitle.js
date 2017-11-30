require('../../stylus/components/_time-picker-title.styl')

// Utils
import { pad } from '../VDatePicker/util'

export default {
  name: 'v-time-picker-title',

  props: {
    ampm: Boolean,
    selectingHour: Boolean,
    value: String
  },

  computed: {
    hour () {
      return parseInt(this.value.split(':')[0], 10)
    },
    minute () {
      return parseInt(this.value.split(':')[1], 10)
    },
    isPm () {
      return this.hour >= 12
    }
  },

  methods: {
    genPickerButton (active, click, text) {
      return this.$createElement('span', {
        staticClass: 'picker__title__btn',
        'class': { active },
        on: active ? undefined : { click }
      }, [text])
    },
    genTime () {
      let hour = this.hour
      if (this.ampm) {
        hour = hour ? ((hour - 1) % 12 + 1) : 12
      }

      return this.$createElement('div', {
        'class': 'time-picker-title__time'
      }, [
        this.genPickerButton(this.selectingHour, () => this.$emit('selectingHour', true), pad(hour)),
        this.$createElement('span', ':'),
        this.genPickerButton(!this.selectingHour, () => this.$emit('selectingHour', false), pad(this.minute))
      ])
    },
    genAmPm () {
      return this.$createElement('div', {
        staticClass: 'time-picker-title__ampm'
      }, [
        this.genPickerButton(!this.isPm, () => this.$emit('period', 'am'), 'am'),
        this.genPickerButton(this.isPm, () => this.$emit('period', 'pm'), 'pm')
      ])
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'time-picker-title'
    }, [
      this.genTime(),
      this.ampm ? this.genAmPm() : null
    ])
  }
}
