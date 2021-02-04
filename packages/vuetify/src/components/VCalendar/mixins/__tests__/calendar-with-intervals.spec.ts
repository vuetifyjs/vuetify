import CalendarWithIntervals from '../calendar-with-intervals'
import { CalendarTimestamp } from 'vuetify/types'
import { parseTimestamp } from '../../util/timestamp'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { ExtractVue } from '../../../../util/mixins'

const Mock = CalendarWithIntervals.extend({
  render: h => h('div'),
})

const createMouseEvent = (x, y) => ({
  clientX: x,
  clientY: y,
  currentTarget: document.body,
})
const createTouchEvent = (x, y) => ({
  touches: [{
    clientX: x,
    clientY: y,
  }],
  currentTarget: document.body,
})

describe('calendar-with-intervals.ts', () => {
  type Instance = ExtractVue<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Mock, {
        ...options,
        mocks: {
          $vuetify: {
            lang: {
              current: 'en-US',
            },
          },
        },
      })
    }
  })

  it('should parse all data', async () => {
    const wrapper = mountFunction({
      propsData: {
        firstInterval: '1',
        intervalMinutes: '30',
        intervalCount: '10',
        intervalHeight: '20',
      },
    })

    expect(wrapper.vm.parsedFirstInterval).toBeDefined()
    expect(wrapper.vm.parsedFirstInterval).toBe(1)
    expect(wrapper.vm.parsedIntervalMinutes).toBeDefined()
    expect(wrapper.vm.parsedIntervalMinutes).toBe(30)
    expect(wrapper.vm.parsedIntervalCount).toBeDefined()
    expect(wrapper.vm.parsedIntervalCount).toBe(10)
    expect(wrapper.vm.parsedIntervalHeight).toBeDefined()
    expect(wrapper.vm.parsedIntervalHeight).toBe(20)
  })

  it('should generate firstMinute', async () => {
    const wrapper = mountFunction({
      propsData: {
        firstInterval: '2',
        intervalMinutes: '30',
      },
    })

    expect(wrapper.vm.firstMinute).toBeDefined()
    expect(wrapper.vm.firstMinute).toBe(60)
  })

  it('should generate bodyHeight', async () => {
    const wrapper = mountFunction({
      propsData: {
        intervalCount: '10',
        intervalHeight: '20',
      },
    })

    expect(wrapper.vm.bodyHeight).toBeDefined()
    expect(wrapper.vm.bodyHeight).toBe(200)
  })

  it('should generate days', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
      },
    })

    expect(wrapper.vm.days).toBeDefined()
    expect(wrapper.vm.days).toHaveLength(7)
    expect(wrapper.vm.days[0].date).toBe('2019-01-29')
    expect(wrapper.vm.days[6].date).toBe('2019-02-04')
    expect(wrapper.vm.days).toMatchSnapshot()

    wrapper.setProps({
      start: '2019-01-29',
      end: '2019-02-02',
    })

    expect(wrapper.vm.days).toBeDefined()
    expect(wrapper.vm.days).toHaveLength(5)
    expect(wrapper.vm.days[0].date).toBe('2019-01-29')
    expect(wrapper.vm.days[4].date).toBe('2019-02-02')
    expect(wrapper.vm.days).toMatchSnapshot()
  })

  it('should generate intervals', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
      },
    })

    expect(wrapper.vm.intervals).toBeDefined()
    expect(wrapper.vm.intervals).toHaveLength(7)
    expect(wrapper.vm.intervals[0]).toHaveLength(24)
    expect(wrapper.vm.intervals[0][0].date).toBe('2019-01-29')
    expect(wrapper.vm.intervals[6][0].date).toBe('2019-02-04')
    expect(wrapper.vm.intervals).toMatchSnapshot()

    wrapper.setProps({
      start: '2019-01-29',
      end: '2019-02-02',
    })

    expect(wrapper.vm.intervals).toBeDefined()
    expect(wrapper.vm.intervals).toHaveLength(5)
    expect(wrapper.vm.intervals[0]).toHaveLength(24)
    expect(wrapper.vm.intervals[0][0].date).toBe('2019-01-29')
    expect(wrapper.vm.intervals[4][0].date).toBe('2019-02-02')
    expect(wrapper.vm.intervals).toMatchSnapshot()
  })

  it('should generate intervalFormatter', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.intervalFormatter).toBeDefined()
    expect(typeof wrapper.vm.intervalFormatter).toBe('function')
  })

  // TODO: Re-enable when test doesn't break travis
  it.skip('should format interval', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.intervalFormatter({ date: '2019-02-08', hour: 8, minute: 30 } as CalendarTimestamp, false)).toBe('8:30 AM')
    expect(wrapper.vm.intervalFormatter({ date: '2019-02-08', hour: 20, minute: 30 } as CalendarTimestamp, false)).toBe('8:30 PM')
    expect(wrapper.vm.intervalFormatter({ date: '2019-02-08', hour: 0, minute: 30 } as CalendarTimestamp, false)).toBe('12:30 AM')
    expect(wrapper.vm.intervalFormatter({ date: '2019-02-08', hour: 8, minute: 30 } as CalendarTimestamp, true)).toBe('8:30 AM')
    expect(wrapper.vm.intervalFormatter({ date: '2019-02-08', hour: 20, minute: 30 } as CalendarTimestamp, true)).toBe('8:30 PM')
    expect(wrapper.vm.intervalFormatter({ date: '2019-02-08', hour: 0, minute: 30 } as CalendarTimestamp, true)).toBe('12:30 AM')
  })

  it('should return intervalFormat if has one', async () => {
    const intervalFormat = x => x
    const wrapper = mountFunction({
      propsData: {
        intervalFormat,
      },
    })

    expect(wrapper.vm.intervalFormatter).toBeDefined()
    expect(typeof wrapper.vm.intervalFormatter).toBe('function')
    expect(wrapper.vm.intervalFormatter).toBe(intervalFormat)
  })

  it('should generate slot scope', async () => {
    const wrapper = mountFunction()

    expect(wrapper.vm.getSlotScope(parseTimestamp('2019-02-08'))).toBeDefined()
    expect(wrapper.vm.getSlotScope(parseTimestamp('2019-02-08')).date).toBe('2019-02-08')

    const scope = wrapper.vm.getSlotScope(parseTimestamp('2019-02-08'))
    delete scope.week

    expect(scope).toMatchSnapshot()
    expect(typeof wrapper.vm.getSlotScope(parseTimestamp('2019-02-08')).timeToY).toBe('function')
    expect(typeof wrapper.vm.getSlotScope(parseTimestamp('2019-02-08')).timeDelta).toBe('function')
    expect(typeof wrapper.vm.getSlotScope(parseTimestamp('2019-02-08')).minutesToPixels).toBe('function')
  })

  it('should convert time to Y', async () => {
    const wrapper = mountFunction()

    expect(typeof wrapper.vm.timeToY).toBe('function')
    expect(wrapper.vm.timeToY('08:30')).toBeDefined()
    expect(wrapper.vm.timeToY('08:30')).toBe(408)
    expect(wrapper.vm.timeToY('09:30')).toBe(456)
    expect(Math.round(wrapper.vm.timeToY('23:50') || 0)).toBe(1144)

    wrapper.setProps({
      firstInterval: 5,
      intervalCount: 5,
      intervalMinutes: 10,
      bodyHeight: 400,
    })

    expect(wrapper.vm.timeToY('08:30')).toBe(240)
    expect(wrapper.vm.timeToY('09:30')).toBe(240)
    expect(wrapper.vm.timeToY('23:50')).toBe(240)

    expect(wrapper.vm.timeToY('00:05')).toBe(0)
    expect(Math.round(wrapper.vm.timeToY('08:30', false) || 0)).toBe(2208)
    expect(wrapper.vm.timeToY('09:30', false)).toBe(2496)
    expect(wrapper.vm.timeToY('23:50', false)).toBe(6624)

    expect(wrapper.vm.timeToY('bad')).toBe(false)
  })

  it('should convert time delta', async () => {
    const wrapper = mountFunction()

    expect(typeof wrapper.vm.timeDelta).toBe('function')
    expect(wrapper.vm.timeDelta('08:30')).toBeDefined()
    expect(wrapper.vm.timeDelta('08:30')).toBe((8 * 60 + 30) / 1440)
    expect(wrapper.vm.timeDelta('09:30')).toBe((9 * 60 + 30) / 1440)
    expect(Math.round(wrapper.vm.timeDelta('23:50') || 0)).toBe(1)

    wrapper.setProps({
      firstInterval: 5,
      intervalCount: 5,
      intervalMinutes: 10,
      bodyHeight: 400,
    })

    expect(wrapper.vm.timeDelta('08:30')).toBe((8 * 60 + 30 - 50) / 50)
    expect(wrapper.vm.timeDelta('09:30')).toBe((9 * 60 + 30 - 50) / 50)
    expect(wrapper.vm.timeDelta('23:50')).toBe((23 * 60 + 50 - 50) / 50)

    expect(wrapper.vm.timeDelta('00:50')).toBe(0)

    expect(wrapper.vm.timeDelta('bad')).toBe(false)
  })

  it('should convert minutes to pixels', async () => {
    const wrapper = mountFunction({
      propsData: {
        intervalMinutes: 5,
        bodyHeight: 200,
      },
    })

    expect(wrapper.vm.minutesToPixels).toBeDefined()
    expect(typeof wrapper.vm.minutesToPixels).toBe('function')
    expect(wrapper.vm.minutesToPixels(5)).toBeDefined()

    expect(wrapper.vm.minutesToPixels(5)).toBe(48)
    expect(wrapper.vm.minutesToPixels(10)).toBe(96)
    expect(wrapper.vm.minutesToPixels(50)).toBe(480)

    wrapper.setProps({
      intervalMinutes: 10,
      bodyHeight: 400,
    })

    expect(wrapper.vm.minutesToPixels(5)).toBe(24)
    expect(wrapper.vm.minutesToPixels(10)).toBe(48)
    expect(wrapper.vm.minutesToPixels(50)).toBe(240)
  })

  it('should scroll to time', async () => {
    const wrapper = mountFunction({
      render: h => h('div', [
        h('div', {
          ref: 'scrollArea',
        }),
      ]),
    })

    wrapper.vm.scrollToTime('8:30')
    expect((wrapper.vm.$refs.scrollArea as any).scrollTop).toBe(408)
    wrapper.vm.scrollToTime('12:30')
    expect(Math.round((wrapper.vm.$refs.scrollArea as any).scrollTop)).toBe(600)
    wrapper.vm.scrollToTime('20:00')
    expect((wrapper.vm.$refs.scrollArea as any).scrollTop).toBe(960)

    wrapper.setProps({
      intervalMinutes: 5,
      bodyHeight: 200,
    })

    wrapper.vm.scrollToTime('8:30')
    expect((wrapper.vm.$refs.scrollArea as any).scrollTop).toBe(1152)
    wrapper.vm.scrollToTime('12:30')
    expect((wrapper.vm.$refs.scrollArea as any).scrollTop).toBe(1152)
    wrapper.vm.scrollToTime('20:30')
    expect((wrapper.vm.$refs.scrollArea as any).scrollTop).toBe(1152)

    wrapper.setProps({
      intervalMinutes: 30,
      bodyHeight: 1700,
    })

    wrapper.vm.scrollToTime('8:30')
    expect((wrapper.vm.$refs.scrollArea as any).scrollTop).toBe(816)
    wrapper.vm.scrollToTime('12:30')
    expect((wrapper.vm.$refs.scrollArea as any).scrollTop).toBe(1152)
    wrapper.vm.scrollToTime('20:30')
    expect((wrapper.vm.$refs.scrollArea as any).scrollTop).toBe(1152)

    expect(wrapper.vm.scrollToTime('20:19')).toBe(true)
    expect(wrapper.vm.scrollToTime('bad')).toBe(false)
  })

  it('should get timestamp at mouse event', async () => {
    const wrapper = mountFunction()

    expect(typeof wrapper.vm.getTimestampAtEvent).toBe('function')

    expect(wrapper.vm.getTimestampAtEvent(createMouseEvent(0, 100) as unknown as MouseEvent, { time: '20:00' } as CalendarTimestamp)).toMatchObject({ hour: 2, minute: 5 })
    expect(wrapper.vm.getTimestampAtEvent(createMouseEvent(0, 150) as unknown as MouseEvent, { time: '20:00' } as CalendarTimestamp)).toMatchObject({ hour: 3, minute: 7 })
    expect(wrapper.vm.getTimestampAtEvent(createMouseEvent(0, 200) as unknown as MouseEvent, { time: '20:00' } as CalendarTimestamp)).toMatchObject({ hour: 4, minute: 10 })
  })

  it('should get timestamp at touch event', async () => {
    const wrapper = mountFunction()

    expect(typeof wrapper.vm.getTimestampAtEvent).toBe('function')

    expect(wrapper.vm.getTimestampAtEvent(createTouchEvent(0, 100) as unknown as TouchEvent, { time: '20:00' } as CalendarTimestamp)).toMatchObject({ hour: 2, minute: 5 })
    expect(wrapper.vm.getTimestampAtEvent(createTouchEvent(0, 150) as unknown as TouchEvent, { time: '20:00' } as CalendarTimestamp)).toMatchObject({ hour: 3, minute: 7 })
    expect(wrapper.vm.getTimestampAtEvent(createTouchEvent(0, 200) as unknown as TouchEvent, { time: '20:00' } as CalendarTimestamp)).toMatchObject({ hour: 4, minute: 10 })
  })

  it('should get style', async () => {
    const wrapper = mountFunction()

    expect(typeof wrapper.vm.intervalStyleDefault).toBe('function')
    expect(wrapper.vm.intervalStyleDefault({} as CalendarTimestamp)).toBeUndefined()
  })

  it('should show interval label', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        firstInterval: 5,
      },
    })
    expect(typeof wrapper.vm.showIntervalLabelDefault).toBe('function')
    expect(wrapper.vm.showIntervalLabelDefault({})).toBeTruthy()

    expect(wrapper.vm.showIntervalLabelDefault({ hour: 0, minute: 5 } as CalendarTimestamp)).toBeTruthy()
    expect(wrapper.vm.showIntervalLabelDefault({ hour: 12, minute: 30 } as CalendarTimestamp)).toBeTruthy()
    expect(wrapper.vm.showIntervalLabelDefault({ hour: 13, minute: 0 } as CalendarTimestamp)).toBeTruthy()
    expect(wrapper.vm.showIntervalLabelDefault({ hour: 13, minute: 30 } as CalendarTimestamp)).toBeTruthy()
  })
})
