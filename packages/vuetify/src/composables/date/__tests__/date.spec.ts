// Composables
import { getWeek } from '../date'

// Utilities
import { VuetifyDateAdapter } from '../adapters/vuetify'

// Types
import type { IUtils } from '@date-io/core/IUtils'
import type { DateAdapter } from '../DateAdapter'

function expectAssignable<T, T2 extends T = T> (value: T2): void {}

describe('date.ts', () => {
  // Cannot define properties that don't exist in date-io
  expectAssignable<DateAdapter>({} as IUtils<Date, string>)
  // @ts-expect-error Can implement a subset of date-io
  expectAssignable<IUtils<Date>>({} as DateAdapter)

  it('should have the correct days in a month', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

    expect(getWeek(adapter, adapter.date('2023-10-10'))).toBe(41)
  })

  it('should correctly calculate weeks between years', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

    expect(getWeek(adapter, adapter.date('2024-12-28'))).toBe(52)
    expect(getWeek(adapter, adapter.date('2024-12-29'))).toBe(1)
    expect(getWeek(adapter, adapter.date('2024-12-30'))).toBe(1)
    expect(getWeek(adapter, adapter.date('2024-12-31'))).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-01'))).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-02'))).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-03'))).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-04'))).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-05'))).toBe(2)
  })

  it('should correctly calculate when year starts with a full week', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

    expect(getWeek(adapter, adapter.date('2022-12-25'))).toBe(52)
    expect(getWeek(adapter, adapter.date('2022-12-31'))).toBe(52)
    expect(getWeek(adapter, adapter.date('2023-01-01'))).toBe(1)
    expect(getWeek(adapter, adapter.date('2023-01-07'))).toBe(1)
  })

  it('should adjust for start of a week', () => {
    const adapter = new VuetifyDateAdapter({ locale: 'en-US' })

    expect(getWeek(adapter, adapter.date('2024-12-28'), { startOfWeek: 1 })).toBe(52)
    expect(getWeek(adapter, adapter.date('2024-12-29'), { startOfWeek: 1 })).toBe(52)
    expect(getWeek(adapter, adapter.date('2024-12-30'), { startOfWeek: 1 })).toBe(1)
    expect(getWeek(adapter, adapter.date('2024-12-31'), { startOfWeek: 1 })).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-01'), { startOfWeek: 1 })).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-02'), { startOfWeek: 1 })).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-03'), { startOfWeek: 1 })).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-04'), { startOfWeek: 1 })).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-05'), { startOfWeek: 1 })).toBe(1)
    expect(getWeek(adapter, adapter.date('2025-01-06'), { startOfWeek: 1 })).toBe(2)
    expect(getWeek(adapter, adapter.date('2025-01-07'), { startOfWeek: 1 })).toBe(2)

    expect(getWeek(adapter, adapter.date('2028-12-25'), { startOfWeek: 1 })).toBe(52)
    expect(getWeek(adapter, adapter.date('2028-12-31'), { startOfWeek: 1 })).toBe(52)
    expect(getWeek(adapter, adapter.date('2029-01-01'), { startOfWeek: 1 })).toBe(1)
    expect(getWeek(adapter, adapter.date('2029-01-07'), { startOfWeek: 1 })).toBe(1)
  })

  it('should adjust fallback to week start from locale', () => {
    const adapter1 = new VuetifyDateAdapter({ locale: 'en-US' })
    expect(getWeek(adapter1, adapter1.date('2025-01-04'))).toBe(1) // saturday
    expect(getWeek(adapter1, adapter1.date('2025-01-05'))).toBe(2) // sunday

    const adapter2 = new VuetifyDateAdapter({ locale: 'fr' })
    expect(getWeek(adapter2, adapter2.date('2025-01-05'))).toBe(1) // sunday
    expect(getWeek(adapter2, adapter2.date('2025-01-06'))).toBe(2) // monday
  })
})
