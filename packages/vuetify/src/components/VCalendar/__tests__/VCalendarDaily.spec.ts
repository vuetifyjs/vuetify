import VCalendarDaily from '../VCalendarDaily'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'

describe('VCalendarDaily', () => {
  type Instance = ExtractVue<typeof VCalendarDaily>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCalendarDaily, {
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

  it('should render component and have v-calendar-daily class', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
      },
    })

    expect(wrapper.classes('v-calendar-daily')).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should compute scrollPush on init', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
      },
    })

    jest.spyOn(wrapper.vm, 'getScrollPush').mockImplementation(_ => 123)

    expect(wrapper.vm.scrollPush).toBe(0)
    expect(wrapper.vm.getScrollPush).not.toHaveBeenCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.getScrollPush).toHaveBeenCalled()
    expect(wrapper.vm.scrollPush).toBe(123)
  })

  it('should compute scrollPush properly', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
      },
    })

    expect(wrapper.vm.getScrollPush()).toBe(0)

    Object.defineProperty(wrapper.vm.$refs.scrollArea, 'offsetWidth', { value: 100 })
    Object.defineProperty(wrapper.vm.$refs.pane, 'offsetWidth', { value: 25 })

    expect(wrapper.vm.getScrollPush()).toBe(75)
  })

  it('should render correctly with intervalMinutes prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        intervalMinutes: 40,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with maxDays prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        maxDays: 5,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: Re-enable once test can be done without breaking travis
  it.skip('should render correctly without shortIntervals prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        shortIntervals: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with intervalHeight prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        intervalHeight: 70,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with firstInterval prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        firstInterval: 2,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render correctly with intervalCount prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        intervalCount: 12,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use custom interval formatter and render correctly', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        intervalFormat: jest.fn(x => `test: ${x.date} ${x.time}`),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.intervalFormat).toHaveBeenCalled()
  })

  it('should use custom interval style function and render correctly', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        intervalStyle: jest.fn(x => ({
          opacity: x.hour / 24,
        })),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.intervalStyle).toHaveBeenCalled()
  })

  it('should use custom showIntervalLabel function and render correctly', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        showIntervalLabel: jest.fn(x => (x.hour % 2 === 0)),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.vm.showIntervalLabel).toHaveBeenCalled()
  })
})
