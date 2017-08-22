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
    isSelected (val) {
      val && this.$nextTick(() => {
        this.$refs.years.scrollTop = this.$refs.years.scrollHeight / 2 - 125
      })
    },
    tableDate (val, prev) {
      this.isReversing = val < prev
    },
    value (val) {
      if (val) this.tableDate = this.inputDate
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
    renderPicker (h, staticClass, headerSelector) {
      const children = []

      !this.noTitle && children.push(this.genTitle(this.titleText))

      if (!this.isSelected) {
        const bodyChildren = []
        bodyChildren.push(this.$createElement('div', { 'class': 'picker--date__header' }, [headerSelector]))
        bodyChildren.push(this.genTable())

        children.push(h('div', {
          'class': 'picker__body'
        }, bodyChildren))
      } else {
        children.push(this.genYears(year => this.getInputDateForYear(year)))
      }

      this.$scopedSlots.default && children.push(this.genSlot())

      return h('v-card', {
        staticClass,
        'class': {
          'picker--landscape': this.landscape,
          ...this.themeClasses
        }
      }, children)
    }
  },

  mounted () {
    const date = new Date()
    this.currentDay = date.getDate()
    this.currentMonth = date.getMonth()
    this.currentYear = date.getFullYear()
  }
}
