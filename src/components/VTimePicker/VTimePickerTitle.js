require('../../stylus/components/_time-picker-title.styl')

import pad from '../VDatePicker/util/pad'

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
    period () {
      return this.hour < 12 ? 'am' : 'pm'
    }
  },

  methods: {
    genTime () {
      let hour = this.hour
      if (this.ampm) {
        if (hour === 0) {
          hour = 12
        } else if (this.hour > 12) {
          hour = hour - 12
        }
      }

      return this.$createElement('div', {
        'class': 'time-picker-title__time'
      }, [
        this.$createElement('span', {
          staticClass: 'picker__title__btn time-picker-title__time__hour',
          'class': { active: this.selectingHour },
          on: this.selectingHour ? undefined : {
            click: () => this.$emit('selectingHour', true)
          }
        }, pad(hour)),
        this.$createElement('span', ':'),
        this.$createElement('span', {
          staticClass: 'picker__title__btn time-picker-title__time__minute',
          'class': { active: !this.selectingHour },
          on: this.selectingHour ? {
            click: () => this.$emit('selectingHour', false)
          } : undefined
        }, pad(this.minute))
      ])
    },

    genAMPM () {
      return this.$createElement('div', {
        staticClass: 'time-picker-title__ampm'
      }, [
        this.genPeriod('am'),
        this.genPeriod('pm')
      ])
    },

    genPeriod (period) {
      return this.$createElement('span', {
        staticClass: 'picker__title__btn',
        'class': { active: this.period === period },
        on: this.period === period ? undefined : {
          click: () => this.$emit('period', period)
        }
      }, period)
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'time-picker-title'
    }, [
      this.genTime(),
      this.ampm ? this.genAMPM() : null
    ])
  }
}
