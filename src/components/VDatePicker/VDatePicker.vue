<script>
  import Picker from '../../mixins/picker'
  import CalendarPicker from './mixins/calendar-picker'
  import CalendarYears from './mixins/calendar-years'
  import CalendarTitle from './mixins/calendar-title'
  import CalendarHeader from './mixins/calendar-header'
  import DateTable from './mixins/date-table'
  import MonthTable from './mixins/month-table'
  import VBtn from '../VBtn'
  import VCard from '../VCard'
  import VIcon from '../VIcon'

  import Touch from '../../directives/touch'

  const createDefaultDateFormat = pickMonth => val => new Date(val).toISOString().substr(0, pickMonth ? 7 : 10)

  export default {
    name: 'v-date-picker',

    components: {
      VBtn,
      VCard,
      VIcon
    },

    mixins: [Picker, CalendarPicker, CalendarYears, CalendarTitle, CalendarHeader, DateTable, MonthTable],

    directives: { Touch },

    data () {
      return {
        tableDate: new Date(),
        originalDate: this.value,
        currentDay: null,
        currentMonth: null,
        currentYear: null,
        isReversing: false,
        narrowDays: [],
        activePicker: this.pickMonth ? 'MONTH' : 'DATE'
      }
    },

    props: {
      locale: {
        type: String,
        default: 'en-us'
      },
      dateFormat: {
        type: Function,
        default: null
      },
      titleDateFormat: {
        type: Object,
        default: () => ({ weekday: 'short', month: 'short', day: 'numeric' })
      },
      headerDateFormat: {
        type: Object,
        default: () => ({ month: 'long', year: 'numeric' })
      },
      formattedValue: {
        required: false
      },
      allowedDates: {
        type: [Array, Object, Function],
        default: () => (null)
      },
      firstDayOfWeek: {
        type: [String, Number],
        default: 0
      },
      pickMonth: Boolean,
      yearIcon: String
    },

    computed: {
      firstAllowedDate () {
        // const date = new Date()
        // date.setDate(1)
        // date.setHours(12, 0, 0, 0)

        // if (this.allowedDates) {
        //   for (let month = 0; month < 12; month++) {
        //     const valid = date.setMonth(month)
        //     if (this.isAllowed(valid)) return valid
        //   }
        // }

        // return date
        const date = new Date()
        date.setHours(12, 0, 0, 0)

        if (this.allowedDates) {
          const millisecondOffset = 1 * 24 * 60 * 60 * 1000
          const valid = new Date(date)
          for (let i = 0; i < 31; i++) {
            if (this.isAllowed(valid)) return valid

            valid.setTime(valid.getTime() + millisecondOffset)
          }
        }

        return date
      },
      inputDate: {
        get () {
          if (!this.value) return this.firstAllowedDate
          if (this.value instanceof Date) return this.value
          if (!isNaN(this.value) ||
              typeof this.value === 'string' && this.value.indexOf(':') !== -1
          ) return new Date(this.value)

          return new Date(`${this.value}T12:00:00`)
        },
        set (val) {
          const pickerDateFormat = createDefaultDateFormat(this.pickMonth)
          this.$emit('input', val ? pickerDateFormat(val) : this.originalDate)
          this.$emit('update:formattedValue', (this.dateFormat || pickerDateFormat)(val || this.originalDate))
        }
      },
      titleText () {
        let date = new Date(this.year, this.month, this.day, 1 /* Workaround for #1409 */)

        date = date.toLocaleString(this.locale, this.titleDateFormat)

        if (this.landscape) {
          if (date.indexOf(',') > -1) date = date.replace(',', ',<br>')
          else if (date.indexOf(' ') > -1) date = date.replace(' ', '<br>')
        }

        return date
      }
    },

    methods: {
      intifyDate(date) {
          // if (!date) return null
          // date = new Date(date)
          // return (date.getFullYear() * 12 + date.getMonth()) * 32 + 1
        if (!date) return null
        date = new Date(date)
        return (date.getFullYear() * 12 + date.getMonth()) * 32 + date.getDate()
      },

      getInputDateForYear (year) {
        let tableMonth = this.tableMonth + 1
        let day = this.day
        tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth
        day = day < 10 ? `0${day}` : day

        return `${year}-${tableMonth}-${day}`
      }
    },

    render (h) {
      return this.renderPicker(h)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_pickers.styl"></style>
<style lang="stylus" src="../../stylus/components/_date-picker.styl"></style>
