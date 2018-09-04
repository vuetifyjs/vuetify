import '../../stylus/components/_date-range.styl'

// Types
import { CreateElement, VNodeChildren, VNode } from 'vue'
import mixins from '../../util/mixins'

// Mixins
import Colorable from '../../mixins/colorable'

// Components
import VDatePicker from '../VDatePicker/VDatePicker'

export default mixins(Colorable).extend({
  name: 'v-date-range',

  props: {
    presets: Array,
    start: String,
    end: String,
    min: String,
    max: String,
    calendarCount: {
      type: Number,
      default: 2
    }
  },

  methods: {
    genPresets (h: CreateElement) {},

    genCalendars (h: CreateElement): VNode[] {
      const calendars: VNode[] = []
      for (let i = 0; i < this.calendarCount; i++) {
        calendars.push(h(VDatePicker))
      }
      return calendars
    },

    genDateRange (staticClass): VNode {
      const calendars = this.genCalendars()

      const calendarsContainer = this.$createElement(
        'div',
        {
          staticClass: 'v-date-range-calendars'
        },
        calendars
      )

      const children = [calendarsContainer]
      return this.$createElement(
        'div',
        {
          staticClass: 'v-date-range'
        },
        children
      )
    }
  },

  render (h: CreateElement) {
    return this.genDateRange('v-date-range')
  }
})
