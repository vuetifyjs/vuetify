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
});
