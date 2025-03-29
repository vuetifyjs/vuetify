// Composables
import { getWeek } from '../date'

// Utilities
import { StringDateAdapter } from '../adapters/string'
import { VuetifyDateAdapter } from '../adapters/vuetify'

// Types
import type { IUtils } from '@date-io/core/IUtils'
import type { DateAdapter } from '../DateAdapter'

function expectAssignable<T, T2 extends T = T> (value: T2): void {}

describe('date', () => {
  it('types', () => {
    // Cannot define properties that don't exist in date-io
    expectAssignable<DateAdapter>({} as IUtils<Date, string>)
    // @ts-expect-error Can implement a subset of date-io
    expectAssignable<IUtils<Date>>({} as DateAdapter)
  })
})

describe('VuetifyDateAdapter', () => {
  it('should have the correct days in a month', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

    expect(getWeek(adapter, adapter.date('2023-10-10'))).toBe(41)
  })
})

describe('StringDateAdapter', () => {
  it('should have the correct days in a month', () => {
    const adapter = new StringDateAdapter({ locale: 'en-US' })

    expect(getWeek(adapter, adapter.date('2023-10-10'))).toBe(41)
  })
})
