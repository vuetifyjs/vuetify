import { test } from '@/test'
import CalendarWithIntervals from '@/components/VCalendar/mixins/calendar-with-intervals'
import { parseTimestamp, parseTime } from '@/components/VCalendar/util/timestamp'

const Mock = {
  mixins: [CalendarWithIntervals],
  render: h => h('div')
}

const createMouseEvent = (x, y) => ({
  clientX: x,
  clientY: y,
  currentTarget: document.body
})
const createTouchEvent = (x, y) => ({
  touches: [{
    clientX: x,
    clientY: y
  }],
  currentTarget: document.body
})

test('calendar-with-intervals.ts', ({ mount }) => {
  it('should parse all data', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        firstInterval: "1",
        intervalMinutes: "30",
        intervalCount: "10",
        intervalHeight: "20"
      }
    })

    expect(wrapper.vm.parsedFirstInterval).toBeDefined();
    expect(wrapper.vm.parsedFirstInterval).toBe(1);
    expect(wrapper.vm.parsedIntervalMinutes).toBeDefined();
    expect(wrapper.vm.parsedIntervalMinutes).toBe(30);
    expect(wrapper.vm.parsedIntervalCount).toBeDefined();
    expect(wrapper.vm.parsedIntervalCount).toBe(10);
    expect(wrapper.vm.parsedIntervalHeight).toBeDefined();
    expect(wrapper.vm.parsedIntervalHeight).toBe(20);
  })

  it('should generate firstMinute', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        firstInterval: "2",
        intervalMinutes: "30"
      }
    })

    expect(wrapper.vm.firstMinute).toBeDefined();
    expect(wrapper.vm.firstMinute).toBe(60);
  })

  it('should generate bodyHeight', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        intervalCount: "10",
        intervalHeight: "20"
      }
    })

    expect(wrapper.vm.bodyHeight).toBeDefined();
    expect(wrapper.vm.bodyHeight).toBe(200);
  })

  it('should generate days', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04"
      }
    })

    expect(wrapper.vm.days).toBeDefined();
    expect(wrapper.vm.days.length).toBe(7);
    expect(wrapper.vm.days[0].date).toBe("2019-01-29");
    expect(wrapper.vm.days[6].date).toBe("2019-02-04");
    expect(wrapper.vm.days).toMatchSnapshot();

    wrapper.setProps({
      start: "2019-01-29",
      end: "2019-02-02"
    });

    expect(wrapper.vm.days).toBeDefined();
    expect(wrapper.vm.days.length).toBe(5);
    expect(wrapper.vm.days[0].date).toBe("2019-01-29");
    expect(wrapper.vm.days[4].date).toBe("2019-02-02");
    expect(wrapper.vm.days).toMatchSnapshot();
  })

  it('should generate intervals', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04"
      }
    })

    expect(wrapper.vm.intervals).toBeDefined();
    expect(wrapper.vm.intervals.length).toBe(7);
    expect(wrapper.vm.intervals[0].length).toBe(24);
    expect(wrapper.vm.intervals[0][0].date).toBe("2019-01-29");
    expect(wrapper.vm.intervals[6][0].date).toBe("2019-02-04");
    expect(wrapper.vm.intervals).toMatchSnapshot();

    wrapper.setProps({
      start: "2019-01-29",
      end: "2019-02-02"
    });

    expect(wrapper.vm.intervals).toBeDefined();
    expect(wrapper.vm.intervals.length).toBe(5);
    expect(wrapper.vm.intervals[0].length).toBe(24);
    expect(wrapper.vm.intervals[0][0].date).toBe("2019-01-29");
    expect(wrapper.vm.intervals[4][0].date).toBe("2019-02-02");
    expect(wrapper.vm.intervals).toMatchSnapshot();
  })

  it('should generate intervalFormatter', async () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.intervalFormatter).toBeDefined();
    expect(typeof wrapper.vm.intervalFormatter).toBe("function");
  })

  it('should format interval', async () => {
    const wrapper = mount(Mock)
    const date = parseTimestamp("2019-02-08");

    expect(wrapper.vm.intervalFormatter({ date: "2019-02-08", hour: 8, minute: 30 }, false)).toBe("8:30 AM");
    expect(wrapper.vm.intervalFormatter({ date: "2019-02-08", hour: 20, minute: 30 }, false)).toBe("8:30 PM");
    expect(wrapper.vm.intervalFormatter({ date: "2019-02-08", hour: 0, minute: 30 }, false)).toBe("12:30 AM");
    expect(wrapper.vm.intervalFormatter({ date: "2019-02-08", hour: 8, minute: 30 }, true)).toBe("8:30 AM");
    expect(wrapper.vm.intervalFormatter({ date: "2019-02-08", hour: 20, minute: 30 }, true)).toBe("8:30 PM");
    expect(wrapper.vm.intervalFormatter({ date: "2019-02-08", hour: 0, minute: 30 }, true)).toBe("12:30 AM");
  })

  it('should return intervalFormat if has one', async () => {
    const intervalFormat = x => x;
    const wrapper = mount(Mock, {
      propsData: {
        intervalFormat
      }
    })

    expect(wrapper.vm.intervalFormatter).toBeDefined();
    expect(typeof wrapper.vm.intervalFormatter).toBe("function");
    expect(wrapper.vm.intervalFormatter).toBe(intervalFormat);
  })

  it('should generate slot scope', async () => {
    const wrapper = mount(Mock)

    expect(wrapper.vm.getSlotScope(parseTimestamp("2019-02-08"))).toBeDefined();
    expect(wrapper.vm.getSlotScope(parseTimestamp("2019-02-08")).date).toBe("2019-02-08");
    expect(wrapper.vm.getSlotScope(parseTimestamp("2019-02-08"))).toMatchSnapshot();
    expect(typeof wrapper.vm.getSlotScope(parseTimestamp("2019-02-08")).timeToY).toBe("function");
    expect(typeof wrapper.vm.getSlotScope(parseTimestamp("2019-02-08")).minutesToPixels).toBe("function");
  })

  it('should convert time to Y', async () => {
    const wrapper = mount(Mock)

    expect(typeof wrapper.vm.timeToY).toBe("function");
    expect(wrapper.vm.timeToY("08:30")).toBeDefined();
    expect(wrapper.vm.timeToY("08:30")).toBe(340);
    expect(wrapper.vm.timeToY("09:30")).toBe(380);
    expect(Math.round(wrapper.vm.timeToY("23:50"))).toBe(953);

    wrapper.setProps({
      firstInterval: 5,
      intervalCount: 5,
      intervalMinutes: 10,
      bodyHeight: 400
    })

    expect(wrapper.vm.timeToY("08:30")).toBe(200);
    expect(wrapper.vm.timeToY("09:30")).toBe(200);
    expect(wrapper.vm.timeToY("23:50")).toBe(200);

    expect(wrapper.vm.timeToY("00:05")).toBe(0);

    expect(Math.round(wrapper.vm.timeToY("08:30", false))).toBe(1840);
    expect(wrapper.vm.timeToY("09:30", false)).toBe(2080);
    expect(wrapper.vm.timeToY("23:50", false)).toBe(5520);

    expect(wrapper.vm.timeToY("bad")).toBe(false);
  })

  it('should convert minutes to pixels', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        intervalMinutes: 5,
        bodyHeight: 200
      }
    })

    expect(wrapper.vm.minutesToPixels).toBeDefined();
    expect(typeof wrapper.vm.minutesToPixels).toBe("function");
    expect(wrapper.vm.minutesToPixels(5)).toBeDefined();

    expect(wrapper.vm.minutesToPixels(5)).toBe(40);
    expect(wrapper.vm.minutesToPixels(10)).toBe(80);
    expect(wrapper.vm.minutesToPixels(50)).toBe(400);

    wrapper.setProps({
      intervalMinutes: 10,
      bodyHeight: 400
    })

    expect(wrapper.vm.minutesToPixels(5)).toBe(20);
    expect(wrapper.vm.minutesToPixels(10)).toBe(40);
    expect(wrapper.vm.minutesToPixels(50)).toBe(200);
  })

  it('should scroll to time', async () => {
    const wrapper = mount({
        ...Mock,
        render: h => h('div', [
          h('div', {
            ref: 'scrollArea'
          })
        ])
    })

    wrapper.vm.scrollToTime("8:30");
    expect(wrapper.vm.$refs.scrollArea.scrollTop).toBe(340)
    wrapper.vm.scrollToTime("12:30");
    expect(Math.round(wrapper.vm.$refs.scrollArea.scrollTop)).toBe(500)
    wrapper.vm.scrollToTime("20:00");
    expect(wrapper.vm.$refs.scrollArea.scrollTop).toBe(800)

    wrapper.setProps({
      intervalMinutes: 5,
      bodyHeight: 200
    })

    wrapper.vm.scrollToTime("8:30");
    expect(wrapper.vm.$refs.scrollArea.scrollTop).toBe(960)
    wrapper.vm.scrollToTime("12:30");
    expect(wrapper.vm.$refs.scrollArea.scrollTop).toBe(960)
    wrapper.vm.scrollToTime("20:30");
    expect(wrapper.vm.$refs.scrollArea.scrollTop).toBe(960)

    wrapper.setProps({
      intervalMinutes: 30,
      bodyHeight: 1700
    })

    wrapper.vm.scrollToTime("8:30");
    expect(wrapper.vm.$refs.scrollArea.scrollTop).toBe(680)
    wrapper.vm.scrollToTime("12:30");
    expect(wrapper.vm.$refs.scrollArea.scrollTop).toBe(960)
    wrapper.vm.scrollToTime("20:30");
    expect(wrapper.vm.$refs.scrollArea.scrollTop).toBe(960)

    expect(wrapper.vm.scrollToTime("20:19")).toBe(true)
    expect(wrapper.vm.scrollToTime("bad")).toBe(false)
  })

  it('should get timestamp at mouse event', async () => {
    const wrapper = mount(Mock);

    expect(typeof wrapper.vm.getTimestampAtEvent).toBe("function");

    expect(wrapper.vm.getTimestampAtEvent(createMouseEvent(0, 100), { time: "20:00" })).toMatchObject({ hour: 2, minute: 30 });
    expect(wrapper.vm.getTimestampAtEvent(createMouseEvent(0, 150), { time: "20:00" })).toMatchObject({ hour: 3, minute: 45 });
    expect(wrapper.vm.getTimestampAtEvent(createMouseEvent(0, 200), { time: "20:00" })).toMatchObject({ hour: 5, minute: 0 });
  })

  it('should get timestamp at touch event', async () => {
    const wrapper = mount(Mock);

    expect(typeof wrapper.vm.getTimestampAtEvent).toBe("function");

    expect(wrapper.vm.getTimestampAtEvent(createTouchEvent(0, 100), { time: "20:00" })).toMatchObject({ hour: 2, minute: 30 });
    expect(wrapper.vm.getTimestampAtEvent(createTouchEvent(0, 150), { time: "20:00" })).toMatchObject({ hour: 3, minute: 45 });
    expect(wrapper.vm.getTimestampAtEvent(createTouchEvent(0, 200), { time: "20:00" })).toMatchObject({ hour: 5, minute: 0 });
  })

  it('should get style', async () => {
    const wrapper = mount(Mock);

    expect(typeof wrapper.vm.intervalStyleDefault).toBe("function");
    expect(wrapper.vm.intervalStyleDefault({})).toBeUndefined();
  })

  it('should show interval label', async () => {
    const wrapper = mount(Mock, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        firstInterval: 5
      }
    });
    expect(typeof wrapper.vm.showIntervalLabelDefault).toBe("function");
    expect(wrapper.vm.showIntervalLabelDefault({})).toBeFalsy();

    expect(wrapper.vm.showIntervalLabelDefault({ hour: 0, minute: 5 })).toBeFalsy();
    expect(wrapper.vm.showIntervalLabelDefault({ hour: 12, minute: 30 })).toBeFalsy();
    expect(wrapper.vm.showIntervalLabelDefault({ hour: 13, minute: 0 })).toBeTruthy();
    expect(wrapper.vm.showIntervalLabelDefault({ hour: 13, minute: 30 })).toBeFalsy();
  })
});
