// Styles
// import '../../stylus/components/_calendar-daily.styl'

// Types
import { VNode } from 'vue'

// Mixins
import mixins from '../../util/mixins'
import Themeable from '../../mixins/themeable'

// Util
import { validateNumber } from './util/validate'
import { validateTimestamp } from './util/timestamp'

/* @vue/component */
export default mixins(Themeable).extend({
  name: 'v-calendar-daily',

  props: {
    start: {
      type: String,
      required: true,
      validate: validateTimestamp
    },
    end: {
      type: String,
      required: true,
      validate: validateTimestamp
    },
    weekdays: {
      type: Array as () => number[],
      default: () => [0, 1, 2, 3, 4, 5, 6]
    },
    hideWeekdays: {
      type: Boolean,
      default: false
    },
    shortWeekdays: {
      type: Boolean,
      default: true
    },
    shortIntervals: {
      type: Boolean,
      default: true
    },
    intervalHeight: {
      type: [Number, String],
      default: 40,
      validate: validateNumber
    },
    intervalMinutes: {
      type: [Number, String],
      default: 60,
      validate: validateNumber
    },
    firstInterval: {
      type: [Number, String],
      default: 0,
      validate: validateNumber
    },
    intervalCount: {
      type: [Number, String],
      default: 24,
      validate: validateNumber
    },
    weekdayFormat: {
      type: Function, // VTimestampFormatter<string>,
      default: null
    },
    dayFormat: {
      type: Function, // VTimestampFormatter<string>,
      default: null
    },
    intervalFormat: {
      type: Function, // VTimestampFormatter<string>,
      default: null
    },
    intervalStyle: {
      type: Function, // (interval: VTimestamp): object
      default: null
    },
    showIntervalLabel: {
      type: Function, // (interval: VTimestamp): boolean
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    }
  },

  computed: {
    classes (): object {
      return {
        'v-calendar': true,
        ...this.themeClasses
      }
    }
  },

  methods: {
  },

  render (h): VNode {
    return h('div', {
      class: this.classes
    }, [

    ])
  }
})
