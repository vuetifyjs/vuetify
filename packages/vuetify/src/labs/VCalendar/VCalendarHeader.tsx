// Utilities
import { ref } from 'vue'
import { genericComponent, useRender } from '@/util'

import { useDate } from '@/labs/date'

export const VCalendarHeader = genericComponent()({
  name: 'VCalendarHeader',

  props: {
    end: Date,
    start: Date,
    view: {
      type: String,
      default: 'month',
    },
  },

  setup (props, { emit, slots }) {
    useRender(() => {
      const date = useDate()

      const displayTitle = ref('')
      // eslint-disable-next-line sonarjs/no-all-duplicated-branches
      switch (props.view) {
        case 'month':
          displayTitle.value = date.format(props.start, 'monthAndYear')
          break
        case 'week':
          displayTitle.value = ''
          break
        case 'day':
          displayTitle.value = ''
          break
        default:
          displayTitle.value = ''
          break
      }

      return (
        <div style="min-height: 64px">
          { slots.title?.() ?? (
            <div class="text-h4 text-center">{ displayTitle.value }</div>
          )}
        </div>
      )
    })
  },

})

export type VCalendarHeader = InstanceType<typeof VCalendarHeader>
