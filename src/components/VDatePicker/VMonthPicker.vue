<script>
  import { createRange } from '../../util/helpers'

  import Picker from '../../mixins/picker'
  import CalendarPicker from './mixins/calendar-picker'
  import CalendarYears from './mixins/calendar-years'
  import CalendarTitle from './mixins/calendar-title'
  import CalendarHeader from './mixins/calendar-header'
  import MonthTable from './mixins/month-table'
  import VBtn from '../VBtn'
  import VCard from '../VCard'
  import VIcon from '../VIcon'

  import Touch from '../../directives/touch'

  const defaultDateFormat = val => new Date(val).toISOString().substr(0, 7)

  export default {
    name: 'v-month-picker',

    components: {
      VBtn,
      VCard,
      VIcon
    },

    mixins: [Picker, CalendarPicker, CalendarYears, CalendarTitle, CalendarHeader, MonthTable],

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
      formattedValue: {
        required: false
      },
      allowedDates: {
        type: [Array, Object, Function],
        default: () => (null)
      },
      yearIcon: String
    },

    computed: {
      firstAllowedDate () {
        const date = new Date().setDate(1).setHours(12, 0, 0, 0)

        if (this.allowedDates) {
          for (let month = 0; month < 12; month++) {
            const valid = date.setMonth(month)
            console.log('valid', valid)
            if (this.isAllowed(valid)) return valid
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
        let date = new Date(this.year, this.month, 1, 12 /* Workaround for #1409 */)

        return date.toLocaleString(this.locale, { month: 'long' }).trim()
      }
    },

    methods: {
      intifyDate(date) {
          if (!date) return null
          date = new Date(date)
          return (date.getFullYear() * 12 + date.getMonth()) * 32 + 1
      },
      getInputDateForYear (year) {
        let month = this.month + 1
        month = month < 10 ? `0${month}` : month

        return `${year}-${month}`
      }
    },

    created () {
      this.tableDate = this.inputDate
    },

    render (h) {
      const headerSelector = this.selected ? null : this.genSelector(this.tableYear,
        new Date(this.tableYear, 0, 1, 1 /* Workaround for #1409 */)
        .toLocaleString(this.locale, { year: 'numeric' }),
        change => new Date(change, 0))
      return this.renderPicker(h, 'picker picker--date picker--month', headerSelector)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_pickers.styl"></style>
<style lang="stylus" src="../../stylus/components/_date-picker.styl"></style>
