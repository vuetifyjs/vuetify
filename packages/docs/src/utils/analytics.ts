/* eslint-disable camelcase */
import { track } from 'swetrix'

export function gtagClick (
  event_category: string,
  event_label: string,
  value: string
) {
  const { event } = useGtag()

  event('click', { event_category, event_label, value })
  track({
    ev: 'click',
    meta: {
      category: event_category,
      label: event_label,
      value,
    },
  })
}
