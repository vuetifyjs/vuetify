// Utilities
import { describe, expect, it } from '@jest/globals'
import { VuetifyDateAdapter } from '../vuetify'

describe('vuetify date adapter', () => {
  it('should return weekdays based on locale', () => {
    let instance = new VuetifyDateAdapter('en-us')

    expect(instance.getWeekdays()).toStrictEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])

    instance = new VuetifyDateAdapter('sv-se')

    expect(instance.getWeekdays()).toStrictEqual(['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag', 'söndag'])
  })

  it('should format dates', () => {
    let instance = new VuetifyDateAdapter('en-us')

    expect(instance.format(new Date(2000, 0, 1), 'fullDateWithWeekday')).toBe('Saturday, January 1, 2000')

    instance = new VuetifyDateAdapter('sv-SE')

    expect(instance.format(new Date(2000, 0, 1), 'fullDateWithWeekday')).toBe('lördag 1 januari 2000')
  })
})
