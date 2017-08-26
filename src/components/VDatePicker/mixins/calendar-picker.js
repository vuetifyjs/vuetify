import { createRange } from '../../../util/helpers'

export default {
  computed: {
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
    }
  },

  watch: {
    activePicker (val) {
      val === 'YEAR' && this.$nextTick(() => {
        this.$refs.years.scrollTop = this.$refs.years.scrollHeight / 2 - 125
      })
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
    }
  },

  methods: {
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
    isAllowed (date) {
      if (!this.allowedDates) return true

      if (Array.isArray(this.allowedDates)) {
        date = this.intifyDate(date)
        return !!this.allowedDates.find(allowedDate => this.intifyDate(allowedDate) === date)
      } else if (this.allowedDates instanceof Function) {
        return this.allowedDates(date)
      } else if (this.allowedDates instanceof Object) {
        date = this.intifyDate(date)
        const min = this.intifyDate(this.allowedDates.min)
        const max = this.intifyDate(this.allowedDates.max)
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
    const date = new Date()
    date.setDate(date.getDate() - date.getDay() + parseInt(this.firstDayOfWeek))

    createRange(7).forEach(() => {
      const narrow = date.toLocaleString(this.locale, { weekday: 'narrow' })
      this.narrowDays.push(narrow)

      date.setDate(date.getDate() + 1)
    })

    this.tableDate = this.inputDate
  },

  mounted () {
    const date = new Date()
    this.currentDay = date.getDate()
    this.currentMonth = date.getMonth()
    this.currentYear = date.getFullYear()
  }
}
