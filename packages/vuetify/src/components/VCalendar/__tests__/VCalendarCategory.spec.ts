import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'
import { ExtractVue } from '../../../util/mixins'
import VCalendarCategory from '../VCalendarCategory'

describe('VCalendarCategory', () => {
  type Instance = ExtractVue<typeof VCalendarCategory>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VCalendarCategory, {
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

  it('should render correctly without shortIntervals prop', async () => {
    const wrapper = mountFunction({
      propsData: {
        start: '2019-01-29',
        end: '2019-02-04',
        shortIntervals: false,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
