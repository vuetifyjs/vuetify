<script>
  import { createRange } from '../../util/helpers'

  import Picker from '../../mixins/picker'
  import CalendarPicker from './mixins/calendar-picker'
  import CalendarYears from './mixins/calendar-years'
  import CalendarTitle from './mixins/calendar-title'
  import CalendarHeader from './mixins/calendar-header'
  import DateTable from './mixins/date-table'
  import VBtn from '../VBtn'
  import VCard from '../VCard'
  import VIcon from '../VIcon'

  import Touch from '../../directives/touch'

  const defaultDateFormat = val => new Date(val).toISOString().substr(0, 10)

  export default {
    name: 'v-date-picker',

    components: {
      VBtn,
      VCard,
      VIcon
    },

    mixins: [Picker, CalendarPicker, CalendarYears, CalendarTitle, CalendarHeader, DateTable],

    directives: { Touch },

    data () {
      return {
        tableDate: new Date(),
        originalDate: this.value,
        currentDay: null,
        currentMonth: null,
        currentYear: null,
        isSelected: false,
        isReversing: false,
        narrowDays: []
      }
    },

    props: {
      locale: {
        type: String,
        default: 'en-us'
      },
      dateFormat: {
        type: Function,
        default: defaultDateFormat
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
      yearIcon: String
    },

    computed: {
      firstAllowedDate () {
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
          this.$emit('input', val ? defaultDateFormat(val) : this.originalDate)
          this.$emit('update:formattedValue', val ? this.dateFormat(val) : this.dateFormat(this.originalDate))
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
      isAllowed (date) {
        if (!this.allowedDates) return true

        if (Array.isArray(this.allowedDates)) {
          return !!this.allowedDates.find(allowedDate => {
            const d = new Date(allowedDate)
            d.setHours(12, 0, 0, 0)

            return d - date === 0
          })
        } else if (this.allowedDates instanceof Function) {
          return this.allowedDates(date)
        } else if (this.allowedDates instanceof Object) {
          const min = new Date(this.allowedDates.min)
          min.setHours(12, 0, 0, 0)
          const max = new Date(this.allowedDates.max)
          max.setHours(12, 0, 0, 0)

          return date >= min && date <= max
        }

        return true
      },
      getInputDateForYear (year) {
        let tableMonth = this.tableMonth + 1
        let day = this.day
        tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth
        day = day < 10 ? `0${day}` : day

        return `${year}-${tableMonth}-${day}`
      }
    },

    created () {
      const date = new Date()
      date.setDate(date.getDate() - date.getDay() + parseInt(this.firstDayOfWeek))

      createRange(7).forEach(() => {
        const narrow = date.toLocaleString(this.locale, { weekday: 'narrow' })
        this.narrowDays.push(narrow)

        date.setDate(date.getDate() + 1)
      })

      this.tableDate = this.inputDate
    },

    render (h) {
      const headerSelector = this.selected ? null : this.genSelector(this.tableMonth,
        new Date(this.tableYear, this.tableMonth, 1, 1 /* Workaround for #1409 */)
        .toLocaleString(this.locale, this.headerDateFormat),
        change => new Date(this.tableYear, change))
      return this.renderPicker(h, 'picker picker--date', headerSelector)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_pickers.styl"></style>
<style lang="stylus" src="../../stylus/components/_date-picker.styl"></style>
