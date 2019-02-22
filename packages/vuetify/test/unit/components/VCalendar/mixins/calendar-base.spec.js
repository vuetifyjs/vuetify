import { test } from '@/test'
import CalendarBase from '@/components/VCalendar/mixins/calendar-base'
import { parseTimestamp } from '@/components/VCalendar/util/timestamp'

const Mock = {
  mixins: [CalendarBase],
  render: h => h('div')
}

test('calendar-base.ts', ({ mount }) => {
  it('should parse start & end', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-08"
      }
    })

    expect(wrapper.vm.parsedStart).toBeDefined();
    expect(wrapper.vm.parsedStart).toMatchSnapshot();
    expect(wrapper.vm.parsedEnd).toBeDefined();
    expect(wrapper.vm.parsedEnd).toMatchSnapshot();
  })

  it('should create a day list', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-08"
      }
    })

    expect(wrapper.vm.days).toBeDefined();
    expect(wrapper.vm.days.length).toBe(11);
    expect(wrapper.vm.days).toMatchSnapshot();

    expect(wrapper.vm.days[0].date).toBe("2019-01-29");
    expect(wrapper.vm.days[10].date).toBe("2019-02-08");
  })

  it('should calculate weekday skips', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-08"
      }
    })

    expect(wrapper.vm.weekdaySkips).toBeDefined();
    expect(wrapper.vm.weekdaySkips.length).toEqual(7);
  })

  it('should generate classes', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-08"
      }
    })

    expect(wrapper.vm.getRelativeClasses(parseTimestamp("2019-01-28"))).toBeDefined();
    expect(wrapper.vm.getRelativeClasses(parseTimestamp("2019-01-28"))).toMatchSnapshot();
  })

  it('should generate classes with outside', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-08"
      }
    })

    expect(wrapper.vm.getRelativeClasses(parseTimestamp("2019-01-28"), true)).toBeDefined();
    expect(wrapper.vm.getRelativeClasses(parseTimestamp("2019-01-28"), true)).toMatchSnapshot();
  })

  it('should return weekdayFormatter equal to weekdayFormat prop', async () => {
    const weekdayFormat = x => x;
    const wrapper = mount(Mock, {
      propsData: {
        weekdayFormat
      }
    });

    expect(wrapper.vm.weekdayFormatter).toEqual(weekdayFormat);
  })

  it('should long-format weekday', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-08"
      }
    })

    expect(wrapper.vm.weekdayFormatter).toBeDefined();
    expect(typeof wrapper.vm.weekdayFormatter).toEqual("function");

    expect(wrapper.vm.weekdayFormatter(parseTimestamp("2019-01-28"), false)).toEqual("Monday");
    expect(wrapper.vm.weekdayFormatter(parseTimestamp("2019-01-27"), false)).toEqual("Sunday");
    expect(wrapper.vm.weekdayFormatter(parseTimestamp("2019-01-29"), false)).toEqual("Tuesday");
  })

  it('should short-format weekday', async () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.weekdayFormatter).toBeDefined();
    expect(typeof wrapper.vm.weekdayFormatter).toEqual("function");

    expect(wrapper.vm.weekdayFormatter(parseTimestamp("2019-01-28"), true)).toEqual("Mon");
    expect(wrapper.vm.weekdayFormatter(parseTimestamp("2019-01-27"), true)).toEqual("Sun");
    expect(wrapper.vm.weekdayFormatter(parseTimestamp("2019-01-29"), true)).toEqual("Tue");
  })

  it('should get start of week', async () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.getStartOfWeek(parseTimestamp("2019-01-28")).weekday).toEqual(0);
    expect(wrapper.vm.getStartOfWeek(parseTimestamp("2019-01-03")).weekday).toEqual(0);
  })

  it('should get end of week', async () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.getEndOfWeek(parseTimestamp("2019-03-28")).weekday).toEqual(6);
    expect(wrapper.vm.getEndOfWeek(parseTimestamp("2019-12-31")).weekday).toEqual(6);
  })

  it('should return dayFormatter equal to dayFormat prop', async () => {
    const dayFormat = x => x;
    const wrapper = mount(Mock, {
      propsData: {
        dayFormat
      }
    });

    expect(wrapper.vm.dayFormatter).toEqual(dayFormat);
  })

  it('should format day', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-08"
      }
    })

    expect(wrapper.vm.weekdayFormatter).toBeDefined();
    expect(typeof wrapper.vm.weekdayFormatter).toEqual("function");

    expect(wrapper.vm.dayFormatter(parseTimestamp("2019-01-28"), false)).toEqual("28");
    expect(wrapper.vm.dayFormatter(parseTimestamp("2019-01-27"), false)).toEqual("27");
    expect(wrapper.vm.dayFormatter(parseTimestamp("2019-01-29"), false)).toEqual("29");
  })
})
