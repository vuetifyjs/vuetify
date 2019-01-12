import Vue from 'vue'

import {
  VTimestamp,
  validateTimestamp,
  parseTimestamp,
  parseDate
} from '../util/timestamp'

export default Vue.extend({
  name: 'times',

  props: {
    now: {
      type: String,
      validator: validateTimestamp
    }
  },

  data: () => ({
    times: {
      now: parseTimestamp('0000-00-00 00:00') as VTimestamp,
      today: parseTimestamp('0000-00-00') as VTimestamp
    }
  }),

  computed: {
    parsedNow (): VTimestamp | null {
      return this.now ? parseTimestamp(this.now) : null
    }
  },

  watch: {
    parsedNow: 'updateTimes'
  },

  created () {
    this.updateTimes()
    this.setPresent()
  },

  methods: {
    setPresent (): void {
      this.times.now.present = this.times.today.present = true
      this.times.now.past = this.times.today.past = false
      this.times.now.future = this.times.today.future = false
    },
    updateTimes (): void {
      const now: VTimestamp = this.parsedNow || this.getNow()
      this.updateDay(now, this.times.now)
      this.updateTime(now, this.times.now)
      this.updateDay(now, this.times.today)
    },
    getNow (): VTimestamp {
      return parseDate(new Date())
    },
    updateDay (now: VTimestamp, target: VTimestamp): void {
      if (now.date !== target.date) {
        target.year = now.year
        target.month = now.month
        target.day = now.day
        target.weekday = now.weekday
        target.date = now.date
      }
    },
    updateTime (now: VTimestamp, target: VTimestamp): void {
      if (now.time !== target.time) {
        target.hour = now.hour
        target.minute = now.minute
        target.time = now.time
      }
    }
  }
})
