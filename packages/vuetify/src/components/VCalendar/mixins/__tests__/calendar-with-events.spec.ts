import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import CalendarWithEvents from '../calendar-with-events'
import { parseTimestamp } from '../../util/timestamp'
import { parseEvent } from '../../util/events'

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
    expect(wrapper.vm.eventColorFunction()).toBe('green')

    wrapper.setProps({
      eventColor: 'red',
    })

    expect(wrapper.vm.eventColorFunction).toBeDefined()
    expect(typeof wrapper.vm.eventColorFunction).toBe('function')
    expect(wrapper.vm.eventColorFunction()).toBe('red')
  })

  it('should work with event text colors', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        eventTextColor: () => 'green',
      },
    })

    expect(wrapper.vm.eventTextColorFunction).toBeDefined()
    expect(typeof wrapper.vm.eventTextColorFunction).toBe('function')
    expect(wrapper.vm.eventTextColorFunction()).toBe('green')

    wrapper.setProps({
      eventTextColor: 'red',
    })

    expect(wrapper.vm.eventTextColorFunction).toBeDefined()
    expect(typeof wrapper.vm.eventTextColorFunction).toBe('function')
    expect(wrapper.vm.eventTextColorFunction()).toBe('red')
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
      eventName: 'Conference',
    })

    expect(wrapper.vm.eventNameFunction).toBeDefined()
    expect(typeof wrapper.vm.eventNameFunction).toBe('function')
    expect(wrapper.vm.eventNameFunction({ start: { date: '2019-02-12' }, input: { Conference: 'Conference' } })).toBe('Conference')
    expect(wrapper.vm.eventNameFunction({ start: { date: '2019-02-12', hour: 8, minute: 30, hasTime: true }, input: { Conference: 'Conference' } })).toBe('<strong>8:30 AM</strong> Conference')
  })

  it('should format time', async () => {
    const testData1 = { date: '2019-01-01', hour: 8, minute: 30 }
    const testData2 = { date: '2019-01-01', hour: 17, minute: 45 }
    const testData3 = { date: '2019-01-01', hour: 9, minute: 5 }
    const testData4 = { date: '2019-01-01', hour: 15, minute: 0 }

    const wrapper = mount(Mock)

    expect(wrapper.vm.formatTime(testData1, true)).toBe('8:30 AM')
    expect(wrapper.vm.formatTime(testData2, true)).toBe('5:45 PM')
    expect(wrapper.vm.formatTime(testData3, true)).toBe('9:05 AM')
    expect(wrapper.vm.formatTime(testData4, true)).toBe('3 PM')
  })

  it('should hide events', async () => {
    const wrapper = mountFunction({
      render: h => h('div', [
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test',
          },
        }),
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test1',
          },
        }),
      ]),
    })

    expect(wrapper.vm.$refs.events[0].style.display).not.toEqual('none')
    expect(wrapper.vm.$refs.events[1].style.display).not.toEqual('none')
    wrapper.vm.hideEvents('test')
    expect(wrapper.vm.$refs.events[0].style.display).toEqual('none')
    expect(wrapper.vm.$refs.events[1].style.display).not.toEqual('none')
    wrapper.vm.hideEvents('test1')
    expect(wrapper.vm.$refs.events[0].style.display).toEqual('none')
    expect(wrapper.vm.$refs.events[1].style.display).toEqual('none')
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

  it('should update event visibility', async () => {
    const wrapper = mountFunction({
      computed: {
        noEvents: () => false,
      },
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
          },
        }),
      ]),
    })

    expect(wrapper.vm.$refs.events[0].style.display).not.toEqual('none')
    wrapper.vm.hideEvents('test')
    expect(wrapper.vm.$refs.events[0].style.display).toEqual('none')
    wrapper.vm.updateEventVisibility()
    expect(wrapper.vm.$refs.events[0].style.display).not.toEqual('none')
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
    expect(wrapper.vm.getEventsForDay(parseTimestamp('2019-02-12'))).toHaveLength(2)
    expect(wrapper.vm.getEventsForDay(parseTimestamp('2019-02-13'))).toHaveLength(1)
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
    expect(wrapper.vm.getEventsForDayAll(parseTimestamp('2019-02-12'))).toHaveLength(1)
    expect(wrapper.vm.getEventsForDayAll(parseTimestamp('2019-02-13'))).toHaveLength(1)
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

  it('should check if is same column', async () => {
    const events = [
      {
        start: '2019-02-12 8:30',
        end: '2019-02-12 12:00',
      },
      {
        start: '2019-02-11',
        end: '2019-02-13',
      },
      {
        start: '2019-02-24',
      },
    ]
    const parsedEvents = events.map((e, i) => parseEvent(e, i, 'start', 'end'))
    const visualEvents = parsedEvents.map(e => ({ event: e }))

    const wrapper = mount(Mock, {
      propsData: {
        eventOverlapThreshold: 500,
      },
    })

    expect(wrapper.vm.isSameColumn(visualEvents[0], visualEvents[1])).toBeFalsy()
    expect(wrapper.vm.isSameColumn(visualEvents[0], visualEvents[2])).toBeFalsy()

    wrapper.setProps({
      eventOverlapThreshold: 1000,
    })

    expect(wrapper.vm.isSameColumn(visualEvents[0], visualEvents[1])).toBeTruthy()
    expect(wrapper.vm.isSameColumn(visualEvents[0], visualEvents[2])).toBeTruthy()
  })

  it('should check if is overlapping', async () => {
    const events = [
      {
        start: '2019-02-11',
        end: '2019-02-13',
        offset: 0,
      },
      {
        start: '2019-02-10',
        end: '2019-02-13',
        offset: 10,
      },
    ]
    const parsedEvents = events.map((e, i) => parseEvent(e, i, 'start', 'end'))
    const visualEvents = parsedEvents.map((e, i) => ({ event: e, offset: events[i].offset }))

    const wrapper = mount(Mock, {
      propsData: {
        eventOverlapThreshold: 500,
      },
    })

    expect(wrapper.vm.isOverlapping(visualEvents[0], visualEvents[1])).toBeFalsy()

    wrapper.setProps({
      eventOverlapThreshold: 1000,
    })

    expect(wrapper.vm.isOverlapping(visualEvents[0], visualEvents[1])).toBeFalsy()
  })
})
