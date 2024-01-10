// Components
import { VBadge } from '@/components/VBadge'
import { VChip } from '@/components/VChip'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCalendarEventProps = propsFactory({
  allDay: Boolean,
  day: Object,
  event: Object,
}, 'VCalendarEvent')

export const VCalendarEvent = genericComponent()({
  name: 'VCalendarEvent',

  props: makeVCalendarEventProps(),

  setup (props) {
    useRender(() => (
      <VChip
        color={ props.allDay ? 'primary' : undefined }
        density="comfortable"
        label={ props.allDay }
        width="100%"
      >
        <VBadge
          inline
          dot
          color={ props.event?.color }
        />

        { props.event?.title }
      </VChip>
    ))

    return {}
  },

})

export type VCalendarEvent = InstanceType<typeof VCalendarEvent>
