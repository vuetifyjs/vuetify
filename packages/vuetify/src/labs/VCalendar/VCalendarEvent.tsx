// Components
import { VBadge } from '@/components/VBadge'
import { VChip } from '@/components/VChip'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VCalendarEvent = genericComponent()({
  name: 'VCalendarEvent',

  props: {
    allDay: Boolean,
    day: Object,
    event: Object,
  },

  setup (props, { emit, slots }) {
    useRender(() => {
      return (
        <VChip
          density="comfortable"
          style="width: 100%;"
          class="align-center"
          color={ props.allDay ? 'primary' : undefined }
          rounded={ props.allDay ? 0 : false }
        >
            <VBadge inline dot color={ props.event?.color } ></VBadge>
            { props.event?.title }
        </VChip>
      )
    })
  },

})

export type VCalendarEvent = InstanceType<typeof VCalendarEvent>
