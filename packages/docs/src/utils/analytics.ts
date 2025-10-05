/* eslint-disable camelcase */
import { track } from 'swetrix'

export function sweClick (
  event_category: string,
  event_label: string,
  value: string
) {
  track({
    ev: 'click',
    meta: {
      category: event_category,
      label: event_label,
      value,
    },
  })
}
