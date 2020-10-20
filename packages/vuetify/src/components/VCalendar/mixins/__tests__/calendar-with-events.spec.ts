import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import CalendarWithEvents from '../calendar-with-events'
import { parseTimestamp } from '../../util/timestamp'

const Mock = CalendarWithEvents.extend({
  render: h => h('div'),
})

describe('calendar-with-events.ts', () => {
  type Instance = InstanceType<typeof Mock>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(Mock, options)
    }
  })

  it('should check if there is no events', async () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.noEvents).toBeTruthy()

    wrapper.setProps({
      events: [
        {
          start: '2019-02-12',
        },
      ],
    })

    expect(wrapper.vm.noEvents).toBeFalsy()
  })

  it('should parse events', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        events: [
          {
            start: '2019-02-12',
          },
        ],
      },
    })

    expect(wrapper.vm.parsedEvents).toBeDefined()
    expect(wrapper.vm.parsedEvents).toHaveLength(1)
    expect(wrapper.vm.parsedEvents[0]).toMatchObject({ start: { date: '2019-02-12' }, end: { date: '2019-02-12' } })
  })

  it('should work with event colors', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        eventColor: () => 'green',
      },
    })

    expect(wrapper.vm.eventColorFunction).toBeDefined()
    expect(typeof wrapper.vm.eventColorFunction).toBe('function')
    expect(wrapper.vm.eventColorFunction({})).toBe('green')

    wrapper.setProps({
      eventColor: 'red',
    })

    expect(wrapper.vm.eventColorFunction).toBeDefined()
    expect(typeof wrapper.vm.eventColorFunction).toBe('function')
    expect(wrapper.vm.eventColorFunction({})).toBe('red')
  })

  it('should work with event text colors', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        eventTextColor: () => 'green',
      },
    })

    expect(wrapper.vm.eventTextColorFunction).toBeDefined()
    expect(typeof wrapper.vm.eventTextColorFunction).toBe('function')
    expect(wrapper.vm.eventTextColorFunction({})).toBe('green')

    wrapper.setProps({
      eventTextColor: 'red',
    })

    expect(wrapper.vm.eventTextColorFunction).toBeDefined()
    expect(typeof wrapper.vm.eventTextColorFunction).toBe('function')
    expect(wrapper.vm.eventTextColorFunction({})).toBe('red')
  })

  it('should work with event names', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        eventName: () => 'Meetup',
      },
    })

    expect(wrapper.vm.eventNameFunction).toBeDefined()
    expect(typeof wrapper.vm.eventNameFunction).toBe('function')
    expect(wrapper.vm.eventNameFunction({ start: { date: '2019-02-12' }, input: { Meetup: 'Meetup' } })).toBe('Meetup')
    expect(wrapper.vm.eventNameFunction({ start: { date: '2019-02-12', hour: 8, minute: 30, hasTime: true }, input: { Meetup: 'Meetup' } })).toBe('Meetup')

    wrapper.setProps({
      eventName: 'x',
    })

    expect(wrapper.vm.eventNameFunction).toBeDefined()
    expect(typeof wrapper.vm.eventNameFunction).toBe('function')
    expect(wrapper.vm.eventNameFunction({ start: { date: '2019-02-12' }, input: { x: 'Conference' } })).toBe('Conference')
    expect(wrapper.vm.eventNameFunction({ start: { date: '2019-02-12', hour: 8, minute: 30, hasTime: true }, input: { x: 'Conference' } })).toMatch('Conference') // will match 8:30 AM|| 08:30 AM || 8:30 || 08:30
  })

  it('should format time', async () => {
    const testData1 = { date: '2019-01-01', hour: 8, minute: 30 }
    const testData2 = { date: '2019-01-01', hour: 17, minute: 45 }
    const testData3 = { date: '2019-01-01', hour: 9, minute: 5 }
    const testData4 = { date: '2019-01-01', hour: 15, minute: 0 }

    const wrapper = mount(Mock)

    // Depending on the time format of the underlying system
    // (12-hour with `h` || 12-hour with `hh` || 24-hour with `h` || 24-hour with `hh`),
    // we expect the value passed to be-
    expect(wrapper.vm.formatTime(testData1, true)).toMatch(/^0?8:30( AM)?$/i) // 8:30 AM || 08:30 AM || 8:30 || 08:30
    expect(wrapper.vm.formatTime(testData2, true)).toMatch(/^(0?5:45 PM|17:45)$/i) // 5:45 PM || 05:45 PM || 17:45
    expect(wrapper.vm.formatTime(testData3, true)).toMatch(/^0?9:05( AM)?$/i) // 9:05 AM || 09:05 AM || 9:05 || 09:45
    expect(wrapper.vm.formatTime(testData4, true)).toMatch(/^(0?3 PM|15)$/i) // 3 AM || 03 AM || 15
  })

  it('should get events map', async () => {
    const wrapper = mountFunction({
      render: h => h('div', [
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test',
            'data-date': '2019-02-12',
          },
        }),
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test1',
            'data-date': '2019-02-13',
          },
        }),
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test2',
            'data-date': '2019-02-13',
            'data-more': '123',
          },
        }),
      ]),
    })

    expect(wrapper.vm.getEventsMap()).toMatchSnapshot()
  })

  it('should get events for day', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        events: [
          {
            start: '2019-02-12 8:30',
            end: '2019-02-12 12:00',
          },
          {
            start: '2019-02-11',
            end: '2019-02-13',
          },
        ],
      },
    })

    expect(wrapper.vm.getEventsForDay(parseTimestamp('2019-02-10'))).toHaveLength(0)
    expect(wrapper.vm.getEventsForDay(parseTimestamp('2019-02-11'))).toHaveLength(1)
    expect(wrapper.vm.getEventsForDay(parseTimestamp('2019-02-12'))).toHaveLength(1)
    expect(wrapper.vm.getEventsForDay(parseTimestamp('2019-02-13'))).toHaveLength(0)
    expect(wrapper.vm.getEventsForDay(parseTimestamp('2019-02-14'))).toHaveLength(0)
  })

  it('should get events for all day', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        events: [
          {
            start: '2019-02-12 8:30',
            end: '2019-02-12 12:00',
          },
          {
            start: '2019-02-11',
            end: '2019-02-13',
          },
        ],
      },
    })

    expect(wrapper.vm.getEventsForDayAll(parseTimestamp('2019-02-10'))).toHaveLength(0)
    expect(wrapper.vm.getEventsForDayAll(parseTimestamp('2019-02-11'))).toHaveLength(1)
    expect(wrapper.vm.getEventsForDayAll(parseTimestamp('2019-02-12'))).toHaveLength(0)
    expect(wrapper.vm.getEventsForDayAll(parseTimestamp('2019-02-13'))).toHaveLength(0)
    expect(wrapper.vm.getEventsForDayAll(parseTimestamp('2019-02-14'))).toHaveLength(0)
  })

  it('should get timed events for day', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        events: [
          {
            start: '2019-02-12 8:30',
            end: '2019-02-12 12:00',
          },
          {
            start: '2019-02-11',
            end: '2019-02-13',
          },
        ],
      },
    })

    expect(wrapper.vm.getEventsForDayTimed(parseTimestamp('2019-02-10'))).toHaveLength(0)
    expect(wrapper.vm.getEventsForDayTimed(parseTimestamp('2019-02-11'))).toHaveLength(0)
    expect(wrapper.vm.getEventsForDayTimed(parseTimestamp('2019-02-12'))).toHaveLength(1)
    expect(wrapper.vm.getEventsForDayTimed(parseTimestamp('2019-02-13'))).toHaveLength(0)
    expect(wrapper.vm.getEventsForDayTimed(parseTimestamp('2019-02-14'))).toHaveLength(0)
  })
})
