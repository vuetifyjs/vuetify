// Components
import { VSheet } from '@/components/VSheet'

// Composables
import { useDate } from '@/composables/date'

// Utilities
import { convertToUnit, genericComponent, useRender } from '@/util'

export const VCalendarIntervalEvent = genericComponent()({
  name: 'VCalendarIntervalEvent',

  props: {
    allDay: Boolean,
    interval: Object,
    intervalDivisions: {
      type: Number,
      required: true,
    },
    intervalDuration: {
      type: Number,
      required: true,
    },
    intervalHeight: {
      type: Number,
      required: true,
    },
    event: Object,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const calcHeight = () => {
      if ((!props.event?.first && !props.event?.last) || adapter.isEqual(props.event?.start, props.interval?.start)) {
        return { height: '100%', margin: convertToUnit(0, 'px') }
      } else {
        const { height, margin } = Array.from({ length: props.intervalDivisions },
          (x: number) => x * (props.intervalDuration / props.intervalDivisions)).reduce((total, div, index) => {
          if (adapter.isBefore(adapter.addMinutes(props.interval?.start, div), props.event?.start)) {
            return {
              height: convertToUnit((props.intervalHeight / props.intervalDivisions) * index, 'px'),
              margin: convertToUnit((props.intervalHeight / props.intervalDivisions) * index, 'px'),
            }
          }
          return { height: total.height, margin: total.margin }
        }, { height: '', margin: '' })
        return { height, margin }
      }
    }

    useRender(() => {
      return (
        <VSheet
          height={ calcHeight().height }
          density="comfortable"
          style={ `width: 100%; margin-top: ${calcHeight().margin}` }
          class="align-center pa-1"
          color={ props.event?.color ?? undefined }
          rounded={ props.event?.first && props.event?.last
            ? true
            : props.event?.first
              ? 't'
              : props.event?.last
                ? 'b'
                : false }
        >
          { props.event?.first ? props.event?.title : '' }
        </VSheet>
      )
    })
  },

})

export type VCalendarIntervalEvent = InstanceType<typeof VCalendarIntervalEvent>
