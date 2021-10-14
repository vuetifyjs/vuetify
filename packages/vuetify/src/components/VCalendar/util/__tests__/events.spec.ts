import { parseTimestamp, getDayIdentifier } from '../timestamp'
import { parseEvent, isEventOn, isEventOverlapping, isEventHiddenOn } from '../events'

describe('events.ts', () => {
  it('should parse events', () => {
    expect(parseEvent({
      start: '2019-02-13',
      end: '2019-02-14',
    }, 0, 'start', 'end')).toMatchSnapshot()
    expect(parseEvent({
      a: '2019-02-13',
      b: '2019-02-14',
    }, 0, 'a', 'b')).toMatchSnapshot()
    expect(parseEvent({
      start: '2019-02-13',
      end: '2019-02-14',
    }, 1, 'start', 'end')).toMatchSnapshot()
    expect(parseEvent({
      a: '2019-02-13',
      b: '2019-02-14',
    }, 1, 'a', 'b')).toMatchSnapshot()
  })

  it('should parse timed events', () => {
    expect(parseEvent({
      start: '2019-02-13 8:30',
      end: '2019-02-14',
    }, 0, 'start', 'end')).toMatchSnapshot()
  })

  it('should check if event is on', () => {
    const parsed = parseEvent({
      start: '2019-02-13 8:30',
      end: '2019-02-15',
    }, 0, 'start', 'end')

    expect(isEventOn(parsed, getDayIdentifier(parseTimestamp('2019-02-12')))).toBeFalsy()
    expect(isEventOn(parsed, getDayIdentifier(parseTimestamp('2019-02-13')))).toBeTruthy()
    expect(isEventOn(parsed, getDayIdentifier(parseTimestamp('2019-02-14')))).toBeTruthy()
    expect(isEventOn(parsed, getDayIdentifier(parseTimestamp('2019-02-15')))).toBeTruthy()
    expect(isEventOn(parsed, getDayIdentifier(parseTimestamp('2019-02-16')))).toBeFalsy()
  })

  it('should check if event is hidden if ending but not starting at midnight', () => {
    const parsed = parseEvent({
      start: '2021-05-17 10:30',
      end: '2021-05-18 00:00',
    }, 0, 'start', 'end')

    expect(isEventHiddenOn(parsed, parseTimestamp('2021-05-16'))).toBeFalsy()
    expect(isEventHiddenOn(parsed, parseTimestamp('2021-05-17'))).toBeFalsy()
    expect(isEventHiddenOn(parsed, parseTimestamp('2021-05-18'))).toBeTruthy()
    expect(isEventHiddenOn(parsed, parseTimestamp('2021-05-16'))).toBeFalsy()
  })

  it('should check if event is hidden if starting and ending at midnight', () => {
    const parsed = parseEvent({
      start: '2021-05-18 00:00',
      end: '2021-05-18 00:00',
    }, 0, 'start', 'end')

    expect(isEventHiddenOn(parsed, parseTimestamp('2021-05-17'))).toBeFalsy()
    expect(isEventHiddenOn(parsed, parseTimestamp('2021-05-18'))).toBeFalsy()
    expect(isEventHiddenOn(parsed, parseTimestamp('2021-05-16'))).toBeFalsy()
  })

  it('should check if event is overlapping', () => {
    const parsed = parseEvent({
      start: '2019-02-13 8:30',
      end: '2019-02-15',
    }, 0, 'start', 'end')

    expect(isEventOverlapping(parsed, getDayIdentifier(parseTimestamp('2019-02-10')), getDayIdentifier(parseTimestamp('2019-02-12')))).toBeFalsy()
    expect(isEventOverlapping(parsed, getDayIdentifier(parseTimestamp('2019-02-12')), getDayIdentifier(parseTimestamp('2019-02-18')))).toBeTruthy()
    expect(isEventOverlapping(parsed, getDayIdentifier(parseTimestamp('2019-02-16')), getDayIdentifier(parseTimestamp('2019-02-18')))).toBeFalsy()
  })

  it(`should throw an error if start isn't defined`, () => {
    const fn = () => parseEvent({
      end: '2019-02-15',
    }, 0, 'start', 'end')

    expect(fn).toThrow('undefined is not a valid timestamp. It must be a Date, number of milliseconds since Epoch, or a string in the format of YYYY-MM-DD or YYYY-MM-DD hh:mm. Zero-padding is optional and seconds are ignored.')
  })
})
