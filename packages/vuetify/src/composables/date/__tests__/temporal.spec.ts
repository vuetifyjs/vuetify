import 'temporal-polyfill/global'
import { parseRFC9557 } from '../temporal'

describe('date/temporal', () => {
  describe('parseRFC9557', () => {
    it('PlainDate', () => {
      expect(parseRFC9557('2022-02-02')).toBeInstanceOf(Temporal.PlainDate)
      expect(parseRFC9557('2022-02-02')?.toString()).toBe('2022-02-02')
    })
    it('PlainDateTime', () => {
      expect(parseRFC9557('2022-02-02T02:02')).toBeInstanceOf(Temporal.PlainDateTime)
      expect(parseRFC9557('2022-02-02T02:02')?.toString()).toBe('2022-02-02T02:02:00')
    })
    it('Instant', () => {
      // Temporal.Instant is just a timestamp so it doesn't mix with the
      // other types well, we convert it to a UTC ZonedDateTime instead
      expect(parseRFC9557('2022-02-02T02:02Z')).toBeInstanceOf(Temporal.ZonedDateTime)
      expect(parseRFC9557('2022-02-02T02:02Z')?.toString()).toBe('2022-02-02T02:02:00+00:00[UTC]')
    })
    it('ZonedDateTime', () => {
      expect(parseRFC9557('2022-02-02T02:02[Australia/Melbourne]')).toBeInstanceOf(Temporal.ZonedDateTime)
      expect(parseRFC9557('2022-02-02T02:02[Australia/Melbourne]')?.toString()).toBe('2022-02-02T02:02:00+11:00[Australia/Melbourne]')
    })
    it('Offset only', () => {
      expect(parseRFC9557('2022-02-02T02:02+01:00')).toBeInstanceOf(Temporal.ZonedDateTime)
      expect(parseRFC9557('2022-02-02T02:02+01:00')?.toString()).toBe('2022-02-02T02:02:00+01:00[+01:00]')
    })
  })
})
