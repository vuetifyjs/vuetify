import { test } from '@/test'
import CalendarWithEvents from '@/components/VCalendar/mixins/calendar-with-events'
import { parseTimestamp, parseTime } from '@/components/VCalendar/util/timestamp'

const Mock = {
  mixins: [CalendarWithEvents],
  render: h => h('div')
}

test('calendar-with-events.ts', ({ mount }) => {
  /*it('should ', async () => {
    const wrapper = mount(Mock, {
      propsData: {
      }
    })

    expect(wrapper.vm.).toBeDefined();
  })*/

  it('should check if there is no events', async () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.noEvents).toBeTruthy();

    wrapper.setProps({
      events: [
        {
          start: '2019-02-12'
        }
      ]
    });

    expect(wrapper.vm.noEvents).toBeFalsy();
  })

  it('should parse events', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        events: [
          {
            start: '2019-02-12'
          }
        ]
      }
    })

    expect(wrapper.vm.parsedEvents).toBeDefined();
    expect(wrapper.vm.parsedEvents).toHaveLength(1);
    expect(wrapper.vm.parsedEvents[0]).toMatchObject({ start: { date: "2019-02-12" }, end: { date: "2019-02-12" } });
  })

  it('should work with event colors', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        eventColor: () => "green"
      }
    })

    expect(wrapper.vm.eventColorFunction).toBeDefined();
    expect(typeof wrapper.vm.eventColorFunction).toBe('function');
    expect(wrapper.vm.eventColorFunction()).toBe('green');

    wrapper.setProps({
      eventColor: "red"
    });

    expect(wrapper.vm.eventColorFunction).toBeDefined();
    expect(typeof wrapper.vm.eventColorFunction).toBe('function');
    expect(wrapper.vm.eventColorFunction()).toBe('red');
  })

  it('should work with event text colors', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        eventTextColor: () => "green"
      }
    })

    expect(wrapper.vm.eventTextColorFunction).toBeDefined();
    expect(typeof wrapper.vm.eventTextColorFunction).toBe('function');
    expect(wrapper.vm.eventTextColorFunction()).toBe('green');

    wrapper.setProps({
      eventTextColor: "red"
    });

    expect(wrapper.vm.eventTextColorFunction).toBeDefined();
    expect(typeof wrapper.vm.eventTextColorFunction).toBe('function');
    expect(wrapper.vm.eventTextColorFunction()).toBe('red');
  })

  it('should work with event names', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        eventName: () => "Meetup"
      }
    })

    expect(wrapper.vm.eventNameFunction).toBeDefined();
    expect(typeof wrapper.vm.eventNameFunction).toBe('function');
    expect(wrapper.vm.eventNameFunction({ start: { date: "2019-02-12" }, input: { "Meetup": "Meetup" } })).toBe('Meetup');
    expect(wrapper.vm.eventNameFunction({ start: { date: "2019-02-12", hour: 8, minute: 30, hasTime: true }, input: { "Meetup": "Meetup" } })).toBe('Meetup');

    wrapper.setProps({
      eventName: "Conference"
    });

    expect(wrapper.vm.eventNameFunction).toBeDefined();
    expect(typeof wrapper.vm.eventNameFunction).toBe('function');
    expect(wrapper.vm.eventNameFunction({ start: { date: "2019-02-12" }, input: { "Conference": "Conference" } })).toBe('Conference');
    expect(wrapper.vm.eventNameFunction({ start: { date: "2019-02-12", hour: 8, minute: 30, hasTime: true }, input: { "Conference": "Conference" } })).toBe('<strong>8:30a</strong> Conference');
  })

  it('should format time', async () => {
    const testData1 = { hour: 8, minute: 30 }
    const testData2 = { hour: 17, minute: 45 }
    const testData3 = { hour: 9, minute: 5 }
    const testData4 = { hour: 15, minute: 0 }

    const wrapper = mount(Mock)

    expect(wrapper.vm.formatTime(testData1, false)).toBe("8:30");
    expect(wrapper.vm.formatTime(testData1, true)).toBe("8:30a");
    expect(wrapper.vm.formatTime(testData2, false)).toBe("5:45");
    expect(wrapper.vm.formatTime(testData2, true)).toBe("5:45p");
    expect(wrapper.vm.formatTime(testData3, false)).toBe("9:05");
    expect(wrapper.vm.formatTime(testData3, true)).toBe("9:05a");
    expect(wrapper.vm.formatTime(testData4, false)).toBe("3");
    expect(wrapper.vm.formatTime(testData4, true)).toBe("3p");
  })

  it('should hide events', async () => {
    const wrapper = mount({
      ...Mock,
      render: h => h('div', [
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test'
          }
        }),
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test1'
          }
        })
      ])
    })

    expect(wrapper.vm.$refs.events[0].style.display).not.toEqual("none");
    expect(wrapper.vm.$refs.events[1].style.display).not.toEqual("none");
    wrapper.vm.hideEvents('test');
    expect(wrapper.vm.$refs.events[0].style.display).toEqual("none");
    expect(wrapper.vm.$refs.events[1].style.display).not.toEqual("none");
    wrapper.vm.hideEvents('test1');
    expect(wrapper.vm.$refs.events[0].style.display).toEqual("none");
    expect(wrapper.vm.$refs.events[1].style.display).toEqual("none");
  })

  it('should get events map', async () => {
    const wrapper = mount({
      ...Mock,
      render: h => h('div', [
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test',
            'data-date': '2019-02-12'
          }
        }),
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test1',
            'data-date': '2019-02-13'
          }
        }),
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test2',
            'data-date': '2019-02-13',
            'data-more': '123'
          }
        })
      ])
    })

    expect(wrapper.vm.getEventsMap()).toMatchSnapshot();
  })

  it('should update event visibility', async () => {
    const wrapper = mount({
      ...Mock,
      computed: {
        noEvents: () => false
      },
      render: h => h('div', [
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test',
            'data-date': '2019-02-12'
          }
        }),
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test1',
            'data-date': '2019-02-13'
          }
        }),
        h('div', {
          ref: 'events',
          refInFor: true,
          attrs: {
            'data-event': 'test2',
            'data-date': '2019-02-13'
          }
        })
      ])
    })

    expect(wrapper.vm.$refs.events[0].style.display).not.toEqual("none");
    wrapper.vm.hideEvents('test');
    expect(wrapper.vm.$refs.events[0].style.display).toEqual("none");
    wrapper.vm.updateEventVisibility();
    expect(wrapper.vm.$refs.events[0].style.display).not.toEqual("none");
  })
});
