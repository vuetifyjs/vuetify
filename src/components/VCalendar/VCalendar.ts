// Styles
// import '../../stylus/components/_calendar-daily.styl'

// Types
import { VNode } from 'vue'

// Mixins
import CalendarWithIntervals from './mixins/calendar-with-intervals'

/* @vue/component */
export default CalendarWithIntervals.extend({
  name: 'v-calendar',

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
