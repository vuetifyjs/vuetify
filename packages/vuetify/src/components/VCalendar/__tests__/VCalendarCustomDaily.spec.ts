import { parseDate } from '../util/timestamp'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'
import VCalendar from '../VCalendar'

describe('VCalendarCustomDaily', () => {
  type Instance = ExtractVue<typeof VCalendar>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCalendar, {
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

  it('should render day view with event highlight for the whole period when start day is not Sunday and selected calendar period contain an event happening the whole time', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'custom-daily',
        start: '2019-01-05',
        end: '2019-01-10',
        now: '2019-01-08',
        events: [
          {
            name: 'Trip to Paris',
            start: '2019-01-1',
            end: '2019-01-25',
          },
        ],
      },
      methods: {
        getNow: () => parseDate(new Date('2019-01-08')),
      },
    })

    const totalDaysInSelectedPeriod = 6
    const WIDTH_FULL = 100
    const WIDTH_START = 95
    const eventBarSize = `${WIDTH_START + (totalDaysInSelectedPeriod - 1) * WIDTH_FULL}%`

    expect(wrapper.classes('v-calendar-daily')).toBeTruthy()
    expect((wrapper.find('.v-event')).attributes().style).toContain(`width: ${eventBarSize}`)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render day view according to the setting of maxDays', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'custom-daily',
        start: '2019-01-01',
        end: '2019-01-10',
        now: '2019-01-08',
        maxDays: 10,
      },
      methods: {
        getNow: () => parseDate(new Date('2019-01-08')),
      },
    })
    expect(wrapper.findAll('.v-calendar-daily_head-weekday')).toHaveLength(10)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render day view with day(s) skipped according to weekdays set', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'custom-daily',
        start: '2019-01-01',
        end: '2019-01-10',
        now: '2019-01-08',
        weekdays: [2, 3, 4, 5, 6, 0],
      },
      methods: {
        getNow: () => parseDate(new Date('2019-01-08')),
      },
    })

    const headWeekdays = wrapper.findAll('.v-calendar-daily_head-weekday').wrappers.map(el => el.text())
    expect(headWeekdays).toEqual(expect.not.arrayContaining(['MON']))
    expect(wrapper.html()).toMatchSnapshot()
  })
})
