// Utils
import pad from '../VDatePicker/util/pad'

// Components
import VPicker from '../VPicker'
import VTimePickerTitle from './VTimePickerTitle'
import VTimePickerClock from './VTimePickerClock'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-time-picker',

  components: {
    VPicker,
    VTimePickerTitle,
    VTimePickerClock
  },

  mixins: [
    Colorable,
    Themeable
  ],

  data () {
    const { inputHour, inputMinute } = this.getInputTime(this.value)

    return {
      inputHour,
      inputMinute,
      originalHour: inputHour,
      originalMinute: inputMinute,
      selectingHour: true
    }
  },

  props: {
    allowedHours: {
      type: [Array, Object, Function],
      default: () => (null)
    },
    allowedMinutes: {
      type: [Array, Object, Function],
      default: () => (null)
    },
    autosave: Boolean,
    format: {
      type: String,
      default: 'ampm',
      validator (val) {
        return ['ampm', '24hr'].includes(val)
      }
    },
    headerColor: String,
    landscape: Boolean,
    noTitle: Boolean,
    scrollable: Boolean,
    value: null
  },

  computed: {
    hour: {
      get () {
        return this.inputHour == null ? new Date().getHours() : this.inputHour
      },
      set (value) {
        this.inputHour = value
      }
    },
    hour12: {
      get () {
        if (this.hour === 0) {
          return 12
        } else if (this.hour > 12) {
          return this.hour - 12
        } else {
          return this.hour
        }
      },
      set (value) {
        if (this.period === 'pm') {
          this.hour = value === 12 ? value : value + 12
        } else {
          this.hour = value === 12 ? 0 : value
        }
      }
    },
    minute: {
      get () {
        return this.inputMinute == null ? new Date().getMinutes() : this.inputMinute
      },
      set (value) {
        this.inputMinute = value
      }
    },
    period: {
      get () {
        return this.hour < 12 ? 'am' : 'pm'
      },
      set (val) {
        this.hour += val === 'am' ? -12 : 12
      }
    }
  },

  watch: {
    value (value) {
      const { inputHour, inputMinute } = this.getInputTime(value)
      this.inputHour = inputHour
      this.inputMinute = inputMinute
    },
    inputHour (val) {
      this.$emit('input', `${pad(this.hour)}:${pad(this.minute)}`)
    },
    inputMinute (val) {
      this.$emit('input', `${pad(this.hour)}:${pad(this.minute)}`)
    }
  },

  methods: {
    getInputTime (value) {
      let inputHour
      let inputMinute

      if (value instanceof Date) {
        inputHour = value.getHours()
        inputMinute = value.getMinutes()
      } else if (value) {
        const arr = value.replace(/[^:0-9]/, '').split(':')
        inputHour = parseInt(arr[0], 10)
        inputMinute = parseInt(arr[1], 10)

        const [, period] = value.match(/([ap]m)/i) || []
        if (period && period.toLowerCase() === 'pm') {
          inputHour = inputHour === 12 ? inputHour : inputHour + 12
        } else if (period && period.toLowerCase() === 'am') {
          inputHour = inputHour === 12 ? 0 : inputHour
        }
      }

      return { inputHour, inputMinute }
    },
    save () {
      this.originalHour = this.inputHour
      this.originalMinute = this.inputMinute
      this.commit()
    },
    cancel () {
      this.inputHour = this.originalHour
      this.inputMinute = this.originalMinute
      this.commit()
    },
    commit () {
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false

      // Fix for #1818
      // Wait for data to persist
      // then set selectingHour
      this.$nextTick(() => (this.selectingHour = true))
    },
    genBody () {
      return this.$createElement('v-time-picker-clock', {
        props: {
          allowedValues: this.selectingHour ? this.allowedHours : this.allowedMinutes,
          color: this.color,
          dark: this.dark,
          double: this.selectingHour && this.format !== 'ampm',
          max: this.selectingHour ? (this.format === 'ampm' ? 12 : 23) : 59,
          min: this.selectingHour && this.format === 'ampm' ? 1 : 0,
          pad: this.selectingHour ? 0 : 2,
          rotate: this.selectingHour && this.format === 'ampm' ? 30 : 0,
          scrollable: this.scrollable,
          size: this.landscape ? 250 : 280,
          step: this.selectingHour ? 1 : 5,
          value: this.selectingHour ? (this.format === 'ampm' ? this.hour12 : this.hour) : this.minute
        },
        on: {
          input: value => {
            if (!this.selectingHour) {
              this.minute = value
            } else if (this.format === '24hr') {
              this.hour = value
            } else {
              this.hour12 = value
            }
          },
          change: () => {
            if (!this.selectingHour && this.autosave) {
              this.save()
            }

            if (this.selectingHour) {
              this.selectingHour = !this.selectingHour
            }
          }
        },
        ref: 'clock'
      })
    },

    genTitle () {
      return this.$createElement('v-time-picker-title', {
        props: {
          ampm: this.format === 'ampm',
          value: pad(this.hour) + ':' + pad(this.minute),
          selectingHour: this.selectingHour
        },
        on: {
          selectingHour: value => (this.selectingHour = value),
          period: value => (this.period = value)
        },
        ref: 'title',
        slot: 'title'
      })
    }
  },

  render (h) {
    const children = [
      this.noTitle ? null : this.genTitle(),
      h('div', {
        style: {
          width: '100%',
          height: '100%'
        },
        key: this.selectingHour
      }, [this.genBody()]),
      this.$scopedSlots.default ? h('<div>', {
        slot: 'actions'
      }, [this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      })]) : null
    ]

    const data = {
      staticClass: 'picker--time',
      props: {
        landscape: this.landscape,
        dark: this.dark,
        light: this.light,
        color: this.headerColor
      }
    }

    return h('v-picker', data, children)
  }
}
