// Utilities
import DateFnsAdapter from '@date-io/date-fns'
import DayjsAdapter from '@date-io/dayjs'
import LuxonAdapter from '@date-io/luxon'
import MomentAdapter from '@date-io/moment'
import { Vuetify0DateAdapter } from '@vuetify/v0/date'
import { cy, enUS, sv } from 'date-fns/locale'
import { shallowRef } from 'vue'
import { StringDateAdapter } from '../adapters/string'
import { VuetifyDateBridge } from '../bridge'
import { createDate } from '../date'

// Types
import type { DateOptions } from '../date'
import type { LocaleInstance } from '@/composables/locale'

function createAdapter (locale: string) {
  return new VuetifyDateBridge(new Vuetify0DateAdapter(locale))
}

describe('VuetifyDateBridge (Vuetify0DateAdapter)', () => {
  it('should have the correct days in a month', () => {
    const adapter = createAdapter('en-US')

    expect(adapter.getWeek(adapter.parseISO('2023-10-10'))).toBe(41)
  })

  it('should correctly calculate weeks between years', () => {
    const adapter = createAdapter('en-US')

    expect(adapter.getWeek(adapter.parseISO('2024-12-28'))).toBe(52)
    expect(adapter.getWeek(adapter.parseISO('2024-12-29'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2024-12-30'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2024-12-31'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-01'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-02'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-03'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-04'))).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2025-01-05'))).toBe(2)
  })

  it('should correctly calculate when year starts with a full week', () => {
    const adapter1 = createAdapter('en-US') // first day = 7 | minimal days = 1

    expect(adapter1.getWeek(adapter1.parseISO('2022-12-25'))).toBe(53)
    expect(adapter1.getWeek(adapter1.parseISO('2022-12-31'))).toBe(53)
    expect(adapter1.getWeek(adapter1.parseISO('2023-01-01'))).toBe(1)
    expect(adapter1.getWeek(adapter1.parseISO('2023-01-07'))).toBe(1)

    // v0 uses minimalDays=1 by default (not locale-derived), so pt behaves
    // like en-US without explicit minimalDays parameter
    const adapter2 = createAdapter('pt')

    expect(adapter2.getWeek(adapter2.parseISO('2022-12-25'))).toBe(53)
    expect(adapter2.getWeek(adapter2.parseISO('2022-12-31'))).toBe(53)
    expect(adapter2.getWeek(adapter2.parseISO('2023-01-01'))).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2023-01-07'))).toBe(1)
  })

  it('should adjust for start of a week', () => {
    const adapter = createAdapter('en-US') // first day = 7 | minimal days = 1

    expect(adapter.getWeek(adapter.parseISO('2028-12-25'), 1)).toBe(53)
    expect(adapter.getWeek(adapter.parseISO('2028-12-31'), 1)).toBe(53)
    expect(adapter.getWeek(adapter.parseISO('2029-01-01'), 1)).toBe(1)
    expect(adapter.getWeek(adapter.parseISO('2029-01-07'), 1)).toBe(1)

    const adapter2 = createAdapter('pt-PT') // first day = 7 | minimal days = 4

    expect(adapter2.getWeek(adapter2.parseISO('2024-12-28'), 1)).toBe(52)
    expect(adapter2.getWeek(adapter2.parseISO('2024-12-29'), 1)).toBe(52)
    expect(adapter2.getWeek(adapter2.parseISO('2024-12-30'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2024-12-31'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-01'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-02'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-03'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-04'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-05'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-06'), 1)).toBe(2)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-07'), 1)).toBe(2)

    expect(adapter2.getWeek(adapter2.parseISO('2028-12-25'), 1)).toBe(53)
    expect(adapter2.getWeek(adapter2.parseISO('2028-12-31'), 1)).toBe(53)
    expect(adapter2.getWeek(adapter2.parseISO('2029-01-01'), 1)).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2029-01-07'), 1)).toBe(1)

    const adapter3 = createAdapter('pl-PL')
    expect(adapter3.getWeek(adapter3.parseISO('2024-12-29'), 1)).toBe(52)
  })

  it('should use consistent week start across locales', () => {
    // v0 uses Sunday (0) as default firstDayOfWeek regardless of locale
    const adapter1 = createAdapter('en-US')
    expect(adapter1.getWeek(adapter1.parseISO('2025-01-04'))).toBe(1) // saturday
    expect(adapter1.getWeek(adapter1.parseISO('2025-01-05'))).toBe(2) // sunday

    const adapter2 = createAdapter('fr')
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-04'))).toBe(1)
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-05'))).toBe(2) // sunday
    expect(adapter2.getWeek(adapter2.parseISO('2025-01-06'))).toBe(2) // monday
  })

  describe('week numbers with time zone', () => {
    // Temporal.PlainDateTime is timezone-agnostic, so TZ stubbing
    // doesn't affect calculations. These tests verify the same
    // week-number correctness without timezone dependency.
    it('should calculate weeks correctly near ST/DST transition', () => {
      const adapter = createAdapter('en-US')
      expect(adapter.getWeek(adapter.parseISO('2025-03-15'))).toBe(11)
      expect(adapter.getWeek(adapter.parseISO('2025-03-16'))).toBe(12)
      expect(adapter.getWeek(adapter.parseISO('2025-03-17'))).toBe(12)
    })

    it('should calculate weeks correctly near DST/ST transition', () => {
      const adapter = createAdapter('en-US')
      expect(adapter.getWeek(adapter.parseISO('2025-11-01'))).toBe(44)
      expect(adapter.getWeek(adapter.parseISO('2025-11-02'))).toBe(45)
      expect(adapter.getWeek(adapter.parseISO('2025-11-03'))).toBe(45)
    })
  })

  describe('week numbers with first-day-of-week', () => {
    it('should calculate weeks correctly when adapting for UK', () => {
      const adapterUS = createAdapter('en-US')
      const adapterGB = createAdapter('en-GB')
      // v0 uses Sunday/minimalDays=1 by default for all locales
      expect(adapterUS.getWeek(adapterUS.parseISO('2025-03-16'))).toBe(12)
      expect(adapterGB.getWeek(adapterGB.parseISO('2025-03-16'))).toBe(12)
      // Explicit fdow=1, fdoy=4 gives ISO week numbering
      expect(adapterUS.getWeek(adapterUS.parseISO('2025-03-16'), 1, 4)).toBe(11)
    })
  })
})

describe('StringDateAdapter', () => {
  it('should have the correct days in a month', () => {
    const adapter = new StringDateAdapter({ locale: 'en-US' })

    expect(adapter.getWeek('2023-10-10')).toBe(41)
  })

  it('should correctly calculate weeks between years', () => {
    const adapter = new StringDateAdapter({ locale: 'en-US' })

    expect(adapter.getWeek('2024-12-28')).toBe(52)
    expect(adapter.getWeek('2024-12-29')).toBe(1)
    expect(adapter.getWeek('2024-12-30')).toBe(1)
    expect(adapter.getWeek('2024-12-31')).toBe(1)
    expect(adapter.getWeek('2025-01-01')).toBe(1)
    expect(adapter.getWeek('2025-01-02')).toBe(1)
    expect(adapter.getWeek('2025-01-03')).toBe(1)
    expect(adapter.getWeek('2025-01-04')).toBe(1)
    expect(adapter.getWeek('2025-01-05')).toBe(2)
  })

  it('should correctly calculate when year starts with a full week', () => {
    const adapter1 = new StringDateAdapter({ locale: 'en-US' }) // first day = 7 | minimal days = 1

    expect(adapter1.getWeek('2022-12-25')).toBe(53)
    expect(adapter1.getWeek('2022-12-31')).toBe(53)
    expect(adapter1.getWeek('2023-01-01')).toBe(1)
    expect(adapter1.getWeek('2023-01-07')).toBe(1)

    // v0 uses minimalDays=1 by default, not locale-derived
    const adapter2 = new StringDateAdapter({ locale: 'pt' })

    expect(adapter2.getWeek('2022-12-25')).toBe(53)
    expect(adapter2.getWeek('2022-12-31')).toBe(53)
    expect(adapter2.getWeek('2023-01-01')).toBe(1)
    expect(adapter2.getWeek('2023-01-07')).toBe(1)
  })

  it('should adjust for start of a week', () => {
    const adapter = new StringDateAdapter({ locale: 'en-US' }) // first day = 7 | minimal days = 1

    expect(adapter.getWeek('2028-12-25', 1)).toBe(53)
    expect(adapter.getWeek('2028-12-31', 1)).toBe(53)
    expect(adapter.getWeek('2029-01-01', 1)).toBe(1)
    expect(adapter.getWeek('2029-01-07', 1)).toBe(1)

    const adapter2 = new StringDateAdapter({ locale: 'pt-PT' }) // first day = 7 | minimal days = 4

    expect(adapter2.getWeek('2024-12-28', 1)).toBe(52)
    expect(adapter2.getWeek('2024-12-29', 1)).toBe(52)
    expect(adapter2.getWeek('2024-12-30', 1)).toBe(1)
    expect(adapter2.getWeek('2024-12-31', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-01', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-02', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-03', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-04', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-05', 1)).toBe(1)
    expect(adapter2.getWeek('2025-01-06', 1)).toBe(2)
    expect(adapter2.getWeek('2025-01-07', 1)).toBe(2)

    expect(adapter2.getWeek('2028-12-25', 1)).toBe(53)
    expect(adapter2.getWeek('2028-12-31', 1)).toBe(53)
    expect(adapter2.getWeek('2029-01-01', 1)).toBe(1)
    expect(adapter2.getWeek('2029-01-07', 1)).toBe(1)

    const adapter3 = new StringDateAdapter({ locale: 'pl-PL' })
    expect(adapter3.getWeek('2024-12-29', 1)).toBe(52)
  })

  it('should use consistent week start across locales', () => {
    // v0 uses Sunday (0) as default firstDayOfWeek regardless of locale
    const adapter1 = new StringDateAdapter({ locale: 'en-US' })
    expect(adapter1.getWeek('2025-01-04')).toBe(1) // saturday
    expect(adapter1.getWeek('2025-01-05')).toBe(2) // sunday

    const adapter2 = new StringDateAdapter({ locale: 'fr' })
    expect(adapter2.getWeek('2025-01-05')).toBe(2) // sunday — same as en-US
    expect(adapter2.getWeek('2025-01-06')).toBe(2) // monday
  })
})

describe('createDate', () => {
  it('should apply firstDayOfWeek and weekdayFormat for date-io adapters', () => {
    const { instance } = createDate({ adapter: DateFnsAdapter, locale: { en: enUS } }, { current: shallowRef('en') } as LocaleInstance)
    const march = new Date(2025, 2, 15)

    expect(instance.toJsDate(instance.startOfWeek(march, 1)).getDay()).toBe(1)
    expect(instance.getWeekArray(march, 1).map(week => instance.format(week[0], 'keyboardDate'))).toEqual([
      '02/24/2025', '03/03/2025', '03/10/2025', '03/17/2025', '03/24/2025', '03/31/2025',
    ])
    expect(instance.getWeekdays(1, 'short')).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    expect(instance.getWeekdays(1)[0]).toBe(instance.getWeekdays()[1])
  })

  it.each([
    ['date-fns', DateFnsAdapter, enUS],
    ['dayjs', DayjsAdapter, 'en'],
    ['luxon', LuxonAdapter, 'en-US'],
    ['moment', MomentAdapter, 'en'],
  ])('should apply firstDayOfWeek and firstDayOfYear to week numbers with %s', (_, adapter, en) => {
    const { instance } = createDate({ adapter, locale: { en } } as DateOptions, { current: shallowRef('en') } as LocaleInstance)

    expect(instance.getWeek(instance.date('2028-12-31'), 1)).toBe(53)
    expect(instance.getWeek(instance.date('2029-01-01'), 1)).toBe(1)
    expect(instance.getWeek(instance.date('2025-03-16'), 1, 4)).toBe(11)
    expect(instance.getWeek(instance.date('2026-01-01'), 0, 6)).toBe(1)
    expect(instance.getWeek(instance.date('2026-01-03'), 0, 3)).toBe(53)
  })

  it.each([
    ['mapped', sv],
    ['maximized', cy],
  ])('should resolve region of bare %s locale codes for week numbers', (_, locale) => {
    const { instance } = createDate({ adapter: DateFnsAdapter, locale: { en: locale } }, { current: shallowRef('en') } as LocaleInstance)

    expect(instance.getWeek(instance.date('2027-01-01'), 1)).toBe(53)
  })

  it('should use adapter time zone for weekdays and week numbers', () => {
    const { instance } = createDate({ adapter: LuxonAdapter, locale: { en: 'en-US' } }, { current: shallowRef('en') } as LocaleInstance)
    const inKiritimati = (iso: string) => (instance.date(iso) as { setZone: (zone: string) => unknown }).setZone('Pacific/Kiritimati')

    expect(instance.toISO(instance.startOfWeek(inKiritimati('2026-10-26T00:00:00+14:00'), 1))).toMatch(/^2026-10-26/)
    expect(instance.getWeek(inKiritimati('2029-01-01T00:00:00+14:00'), 1)).toBe(1)
  })
})
