// Composables
import { getWeek } from '../date'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { VuetifyDateAdapter } from '../adapters/vuetify'

describe('date.ts', () => {
  it('should have the correct days in a month', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

    expect(getWeek(adapter, adapter.date('2023-10-10'))).toBe(41)
  })
})
