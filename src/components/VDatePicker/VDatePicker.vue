<script>
  import { createRange } from '../../util/helpers'

  import Picker from '../../mixins/picker'
  import DateYears from './mixins/date-years'
  import DateTitle from './mixins/date-title'
  import DateHeader from './mixins/date-header'
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

    mixins: [Picker, DateYears, DateTitle, DateHeader, DateTable, MonthTable],

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
        default: null
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
        const date = new Date()

        if (this.pickMonth) {
          date.setDate(1)
          date.setHours(12, 0, 0, 0)

          if (this.allowedDates) {
            const valid = new Date(date)
            for (let month = 0; month < 12; month++) {
              valid.setMonth(month)
              if (this.isAllowed(valid)) {
                return valid
              }
            }
          }
        } else {
          date.setHours(12, 0, 0, 0)

          if (this.allowedDates) {
            const millisecondOffset = 1 * 24 * 60 * 60 * 1000
            const valid = new Date(date)
            for (let i = 0; i < 31; i++) {
              if (this.isAllowed(valid)) return valid

              valid.setTime(valid.getTime() + millisecondOffset)
            }
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
      day () {
        return this.inputDate.getDate()
      },
      month () {
        return this.inputDate.getMonth()
      },
      year () {
        return this.inputDate.getFullYear()
      },
      tableMonth () {
        return this.tableDate.getMonth()
      },
      tableYear () {
        return this.tableDate.getFullYear()
      },
      computedTransition () {
        return this.isReversing ? 'tab-reverse-transition' : 'tab-transition'
      },
      titleText () {
        let date = new Date(this.year, this.month, this.day, 1 /* Workaround for #1409 */)

        const defaultTitleDateFormat = this.pickMonth ? {
          month: 'long'
        } : {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }
        date = date.toLocaleString(this.locale, this.titleDateFormat || defaultTitleDateFormat)

        if (this.landscape) {
          if (date.indexOf(',') > -1) date = date.replace(',', ',<br>')
          else if (date.indexOf(' ') > -1) date = date.replace(' ', '<br>')
        }

        return date
      }
    },

    watch: {
      activePicker (val, prev) {
        val === 'YEAR' && setTimeout(() => {
          this.$refs.years.scrollTop = this.$refs.years.scrollHeight / 2 - 125
        }, 350)
      },
      tableDate (val, prev) {
        this.isReversing = val < prev
      },
      value (val) {
        if (val) this.tableDate = this.inputDate
      },
      pickMonth (val) {
        if (val && this.activePicker === 'DATE') {
          this.activePicker = 'MONTH'
        }
      },
      firstDayOfWeek() {
        this.getWeekDays()
      }
    },

    methods: {
      getInputDateForYear (year) {
        let tableMonth = this.tableMonth + 1
        let day = this.day
        tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth
        day = day < 10 ? `0${day}` : day

        return `${year}-${tableMonth}-${day}`
      },
      save () {
        if (this.originalDate) {
          this.originalDate = this.value
        } else {
          this.originalDate = this.inputDate
        }

        if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
      },
      cancel () {
        this.inputDate = this.originalDate
        if (this.$parent && this.$parent.isActive) this.$parent.isActive = false
      },
      getWeekDays() {
        const date = new Date(2000, 1, 7)
        const day = date.getDate() - date.getDay() + parseInt(this.firstDayOfWeek)

        this.narrowDays = []
        createRange(7).forEach(i => {
          date.setDate(day + i)
          const narrow = date.toLocaleString(this.locale, { weekday: 'narrow' })
          this.narrowDays.push(narrow)
        })
      },
      isAllowed (date) {
        if (!this.allowedDates) return true

        if (Array.isArray(this.allowedDates)) {
          const format = createDefaultDateFormat(this.activePicker === 'MONTH')
          date = format(date)
          return !!this.allowedDates.find(allowedDate => format(allowedDate) === date)
        } else if (this.allowedDates instanceof Function) {
          return this.allowedDates(date)
        } else if (this.allowedDates instanceof Object) {
          const format = createDefaultDateFormat(this.activePicker === 'MONTH')
          const min = format(this.allowedDates.min)
          const max = format(this.allowedDates.max)
          date = format(date)
          return (!min || min <= date) && (!max || max >= date)
        }

        return true
      },
      genTableTouch (touchCallback) {
        return {
          name: 'touch',
          value: {
            left: e => (e.offsetX < -15) && touchCallback(1),
            right: e => (e.offsetX > 15) && touchCallback(-1)
          }
        }
      },
      genTable (tableChildren, touchCallback) {
        const options = {
          staticClass: 'picker--date__table',
          'class': {
            'picker--month__table': this.activePicker === 'MONTH'
          },
          on: this.scrollable ? { wheel: this.monthWheelScroll } : undefined,
          directives: [this.genTableTouch(touchCallback)]
        }

        const table = this.$createElement('table', {
          key: this.activePicker === 'MONTH' ? this.tableYear : this.tableMonth
        }, tableChildren)

        return this.$createElement('div', options, [
          this.$createElement('transition', {
            props: { name: this.computedTransition }
          }, [table])
        ])
      },
      genPickerBody (h) {
        const pickerBodyChildren = []
        if (this.activePicker === 'DATE') {
          pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]))
          pickerBodyChildren.push(this.genTable([
            this.dateGenTHead(),
            this.dateGenTBody()
          ], value => this.tableDate = new Date(this.tableYear, this.tableMonth + value)))
        } else if (this.activePicker === 'MONTH') {
          pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]))
          pickerBodyChildren.push(this.genTable([
            this.monthGenTBody()
          ], value => this.tableDate = new Date(this.tableYear + value, 0)))
        } else if (this.activePicker === 'YEAR') {
          pickerBodyChildren.push(this.genYears(year => this.getInputDateForYear(year)))
        }

        return pickerBodyChildren
      },
      renderPicker (h) {
        const children = []

        !this.noTitle && children.push(this.genTitle(this.titleText))

        children.push(h('transition', {
          props: {
            origin: 'center center',
            mode: 'out-in',
            name: 'scale-transition'
          }
        }, [h('div', {
          staticClass: 'picker__body',
          key: this.activePicker
        }, this.genPickerBody(h))]))

        this.$scopedSlots.default && children.push(this.genSlot())

        return h('v-card', {
          staticClass: 'picker picker--date',
          'class': {
            'picker--landscape': this.landscape,
            ...this.themeClasses
          }
        }, children)
      }
    },

    created () {
      this.getWeekDays()
      this.tableDate = this.inputDate
    },

    mounted () {
      const date = new Date()
      this.currentDay = date.getDate()
      this.currentMonth = date.getMonth()
      this.currentYear = date.getFullYear()
    },

    render (h) {
      return this.renderPicker(h)
    }

  }
</script>

<style lang="stylus" src="../../stylus/components/_pickers.styl"></style>
<style lang="stylus" src="../../stylus/components/_date-picker.styl"></style>
