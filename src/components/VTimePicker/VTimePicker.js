// Utils
import pad from '../VDatePicker/util/pad'

// Mixins
import Picker from '../../mixins/picker'

// Components
import VTimePickerTitle from './VTimePickerTitle'
import VTimePickerClock from './VTimePickerClock'

export default {
  name: 'v-time-picker',

  components: {
    VTimePickerTitle,
    VTimePickerClock
  },

  mixins: [Picker],

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
      if (value instanceof Date) {
        return {
          inputHour: value.getHours(),
          inputMinute: value.getMinutes()
        }
      }

      if (value) {
        const [, hour, minute, , period] = value.trim().toLowerCase().match(/^(\d+):(\d+)(:\d+)?([ap]m)?$/, '') || []

        return {
          inputMinute: parseInt(minute, 10),
          inputHour: period ? this.convert12to24(parseInt(hour, 10), period) : parseInt(hour, 10)
        }
      }

      return {}
    },
    convert24to12 (hour) {
      return hour ? ((hour - 1) % 12 + 1) : 12
    },
    convert12to24 (hour, period) {
      return hour % 12 + (period === 'pm' ? 12 : 0)
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
    onInput (value) {
      if (!this.selectingHour) {
        this.minute = value
      } else if (this.format === '24hr') {
        this.hour = value
      } else {
        this.hour = this.convert12to24(value, this.period)
      }
    },
    onChange () {
      if (!this.selectingHour && this.autosave) {
        this.save()
      }

      if (this.selectingHour) {
        this.selectingHour = !this.selectingHour
      }
    },
    genClock () {
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
          value: this.selectingHour ? (this.format === 'ampm' ? this.convert24to12(this.hour) : this.hour) : this.minute
        },
        on: {
          input: this.onInput,
          change: this.onChange
        },
        ref: 'clock'
      })
    },
    genPickerBody () {
      return this.$createElement('div', {
        style: {
          width: '100%',
          height: '100%'
        },
        key: this.selectingHour
      }, [this.genClock()])
    },
    genPickerTitle () {
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
    return this.genPicker('picker--time')
  }
}
