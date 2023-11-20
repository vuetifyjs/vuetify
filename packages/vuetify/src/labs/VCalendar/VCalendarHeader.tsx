// Composables
import { useDate } from '@/composables/date'

// Utilities
import { ref } from 'vue'
import { genericComponent, useRender } from '@/util'
import { VBtn, VSpacer } from '../allComponents'

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

  emits: {
    prev: null,
    next: null,
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

      const prev = () => {
        emit('prev')
      }
      const next = () => {
        emit('next')
      }

      return (
        <div style="min-height: 64px">
          { slots.title?.() ?? (
            <div class="d-flex" >
              <VBtn icon="$prev" onClick={ prev } />
              <VSpacer />
              <div class="text-h4 text-center">{ displayTitle.value }</div>
              <VSpacer />
              <VBtn icon="$next" onClick={ next } />
            </div>
          )}
        </div>
      )
    })
  },

})

export type VCalendarHeader = InstanceType<typeof VCalendarHeader>
