import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { Lang } from '../../../services/lang'
import VDateTimePicker from '../VDateTimePicker'
import Vue from 'vue'

Vue.prototype.$vuetify = {
  icons: {
    values: {
      next: 'mdi-chevron-right',
      prev: 'mdi-chevron-left',
    },
  },
}

describe('VDatePicker.ts', () => { // eslint-disable-line max-statements
  type Instance = InstanceType<typeof VDateTimePicker>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDateTimePicker, {
        ...options,
        mocks: {
          $vuetify: {
            rtl: false,
            breakpoint: {
              width: 1920,
            },
            theme: {
              dark: false,
            },
            lang: new Lang({
              locales: {
                en: {
                  datePicker: {
                    itemsSelected: '{0} selected',
                  },
                  timePicker: {
                    am: 'AM',
                    pm: 'PM',
                  },
                },
              },
            }),
          },
        },
        sync: false,
      })
    }
  })

  it('should display the correct date in title and header', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01 13:05',
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow setting date props', async () => {
    const wrapper = mountFunction({
      propsData: {
        dateProps: {
          type: 'month',
        },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow setting time props', async () => {
    const wrapper = mountFunction({
      propsData: {
        timeProps: {
          showAmPm: true,
        },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should allow setting picker props', async () => {
    const wrapper = mountFunction({
      propsData: {
        landscape: true,
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
