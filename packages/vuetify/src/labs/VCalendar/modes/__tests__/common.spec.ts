import { parseEvent } from '../../util/events'
import {
  getVisuals, hasOverlap,
} from '../common'

describe('common.ts', () => {
  it('should get visuals 1', () => {
    expect(getVisuals([])).toEqual([])
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
  it('should get visuals 2', () => {
    const p0 = parseEvent({
      start: '2019-02-13',
      end: '2019-02-14',
    }, 0, 'start', 'end')
    const p1 = parseEvent({
      start: '2019-02-13',
      end: '2019-02-15',
    }, 0, 'start', 'end')
    const p2 = parseEvent({
      start: '2019-02-13 08:00',
      end: '2019-02-13 09:00',
    }, 0, 'start', 'end')
    const p3 = parseEvent({
      start: '2019-02-13 07:30',
      end: '2019-02-13 08:30',
    }, 0, 'start', 'end')
    const p4 = parseEvent({
      start: '2019-02-13 08:00',
      end: '2019-02-13 10:00',
    }, 0, 'start', 'end')
    const visualDefaults = {
      columnCount: 0,
      column: 0,
      left: 0,
      width: 100,
    }

    expect(getVisuals([p0, p1, p2, p3, p4])).toEqual([
      { event: p1, ...visualDefaults },
      { event: p0, ...visualDefaults },
      { event: p3, ...visualDefaults },
      { event: p4, ...visualDefaults },
      { event: p2, ...visualDefaults },
    ])
  })
  it('should overlap', () => {
    expect(hasOverlap(0, 1, 1, 2)).toBeFalsy()
    expect(hasOverlap(0, 1, 1, 2, false)).toBeTruthy()
    expect(hasOverlap(1, 2, 0, 1)).toBeFalsy()
    expect(hasOverlap(1, 2, 0, 1, false)).toBeTruthy()
    expect(hasOverlap(0, 1, 2, 3)).toBeFalsy()
    expect(hasOverlap(2, 3, 0, 1)).toBeFalsy()
    expect(hasOverlap(1, 4, 1, 4)).toBeTruthy()
    expect(hasOverlap(1, 4, 1, 3)).toBeTruthy()
    expect(hasOverlap(1, 3, 1, 4)).toBeTruthy()
    expect(hasOverlap(1, 4, 2, 3)).toBeTruthy()
    expect(hasOverlap(2, 3, 1, 4)).toBeTruthy()
    expect(hasOverlap(1, 4, 3, 5)).toBeTruthy()
    expect(hasOverlap(3, 5, 1, 4)).toBeTruthy()
  })
})
