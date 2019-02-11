import { test } from "@/test"
import VCalendarDaily from "@/components/VCalendar/VCalendarDaily"

test("VCalendarDaily", ({ mount }) => {
  it("should render component and have v-calendar-daily class", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04"
      }
    });

    expect(wrapper.hasClass('v-calendar-daily')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot();
  })

  it("should compute scrollPush on init", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04"
      }
    });

    wrapper.vm.getScrollPush = jest.fn(_ => 123);

    expect(wrapper.vm.scrollPush).toBe(0);
    expect(wrapper.vm.getScrollPush).not.toBeCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.getScrollPush).toBeCalled();
    expect(wrapper.vm.scrollPush).toBe(123);
  })

  it("should compute scrollPush properly", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04"
      }
    });

    expect(wrapper.vm.getScrollPush()).toBe(0);

    Object.defineProperty(wrapper.vm.$refs.scrollArea, "offsetWidth", { value: 100 });
    Object.defineProperty(wrapper.vm.$refs.pane, "offsetWidth", { value: 25 });

    expect(wrapper.vm.getScrollPush()).toBe(75);
  })

  it("should render correctly with intervalMinutes prop", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        intervalMinutes: 40
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  })

  it("should render correctly with maxDays prop", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        maxDays: 5
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  })

  it("should render correctly without shortIntervals prop", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        shortIntervals: false
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  })

  it("should render correctly with intervalHeight prop", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        intervalHeight: 70
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  })

  it("should render correctly with firstInterval prop", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        firstInterval: 2
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  })

  it("should render correctly with intervalCount prop", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        intervalCount: 12
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  })

  it("should use custom interval formatter and render correctly", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        intervalFormat: jest.fn(x => `test: ${x.date} ${x.time}`)
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.intervalFormat).toBeCalled();
  })

  it("should use custom interval style function and render correctly", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        intervalStyle: jest.fn(x => ({
          "opacity": x.hour / 24
        }))
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.intervalStyle).toBeCalled();
  })

  it("should use custom showIntervalLabel function and render correctly", async () => {
    const wrapper = mount(VCalendarDaily, {
      propsData: {
        start: "2019-01-29",
        end: "2019-02-04",
        showIntervalLabel: jest.fn(x => (x.hour % 2 === 0))
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.vm.showIntervalLabel).toBeCalled();
  })
})
