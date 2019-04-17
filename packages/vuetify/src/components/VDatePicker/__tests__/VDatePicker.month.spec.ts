import VDatePicker from '../VDatePicker'
import { Lang } from '../../../services/lang'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import Vue from 'vue'

Vue.prototype.$vuetify = {
  icons: {
    values: {
      next: 'mdi-chevron-right',
      prev: 'mdi-chevron-left',
    },
  },
}

describe('VDatePicker.ts', () => {
  type Instance = InstanceType<typeof VDatePicker>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDatePicker, {
        ...options,
        mocks: {
          $vuetify: {
            rtl: false,
            lang: new Lang({
              locales: {
                en: {
                  datePicker: {
                    itemsSelected: '{0} selected',
                  },
                },
              },
            }),
          },
        },
      })
    }
  })

  // it('should emit input event on year click (reactive picker)', async () => {
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-05',
  //       type: 'month',
  //       reactive: true
  //     }
  //   })

  //   wrapper.setData({
  //     activePicker: 'YEAR'
  //   })

  //   const input = jest.fn()
  //   wrapper.vm.$on('input', input)

  //   const change = jest.fn()
  //   wrapper.vm.$on('change', input)

  //   wrapper.findAll('.v-date-picker-years li.active + li').at(0).trigger('click')
  //   expect(input).toHaveBeenCalledWith('2012-05')
  //   expect(change).not.toHaveBeenCalled()
  // })

  // it('should not emit input event on year click if month is not allowed', async () => {
  //   const cb = jest.fn()
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-05',
  //       type: 'month',
  //       allowedDates: () => false
  //     }
  //   })

  //   wrapper.setData({
  //     activePicker: 'YEAR'
  //   })

  //   wrapper.vm.$on('input', cb)
  //   wrapper.findAll('.v-date-picker-years li.active + li').at(0).trigger('click')
  //   expect(cb).not.toHaveBeenCalled()
  // })

  it('should emit input event on month click', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05',
        pickerDate: '2013-05',
        type: 'month',
      },
      listeners: {
        input,
      },
    })

    wrapper.findAll('.v-date-picker-table--month button').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith('2013-01')
  })

  // it('should be scrollable', async () => {
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-05',
  //       type: 'month',
  //       scrollable: true
  //     }
  //   })

  //   wrapper.findAll('.v-date-picker-table--month').at(0).trigger('wheel')
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.vm.tableDate).toBe('2014')
  // })

  it('should match snapshot with type month', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        pickerDate: '2013-05',
        type: 'month',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with allowed dates as array', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        pickerDate: '2013-05',
        type: 'month',
        allowedDates: value => ['2013-01', '2013-03', '2013-05', '2013-07'].includes(value),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with month formatting functions', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        pickerDate: '2005-11',
        type: 'month',
        formatters: {
          month: date => `(${date.split('-')[1]})`,
        },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker & header', () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'month',
        value: '2005-11',
        pickerDate: '2005-11',
        color: 'primary',
        headerColor: 'orange darken-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker', () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'month',
        value: '2005-11',
        pickerDate: '2005-11',
        color: 'orange darken-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should change picker year when clicked on header arrow buttons', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        type: 'month',
      },
    })

    const [leftButton, rightButton] = wrapper.findAll('.v-date-picker-header button.v-btn').wrappers

    leftButton.trigger('click')
    expect(wrapper.find('.v-date-picker-header__value button').text()).toBe('2004')

    rightButton.trigger('click')
    expect(wrapper.find('.v-date-picker-header__value button').text()).toBe('2005')
  })

  it('should change active picker when clicked on month button', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        type: 'month',
      },
    })

    wrapper.find('.v-date-picker-header__value button').trigger('click')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should select year', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'month',
        value: '2005-11',
      },
    })

    wrapper.find('.v-date-picker-header__value button').trigger('click')
    await wrapper.vm.$nextTick()

    wrapper.find('.v-date-picker-years li.active + li').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-date-picker-header__value button').text()).toBe('2004')
  })

  it('should set the table date when value has changed', () => {
    const wrapper = mountFunction({
      propsData: {
        value: null,
        type: 'month',
      },
    })

    wrapper.setProps({ value: '2005-11' })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should use prev and next icons', () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'month',
        prevIcon: 'block',
        nextIcon: 'check',
      },
    })

    const [prev, next] = wrapper.findAll('.v-date-picker-header .v-icon').wrappers
    expect(prev.text()).toBe('block')
    expect(next.text()).toBe('check')
  })

  it('should display translated title', async () => {
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        type: 'month',
        value: ['2013-05'],
      },
    })

    expect(wrapper.find('.v-date-picker-title__date').text()).toBe('May')

    wrapper.setProps({
      value: [],
    })
    expect(wrapper.find('.v-date-picker-title__date').text()).toBe('0 selected')

    wrapper.setProps({
      value: ['2013-05', '2013-06', '2013-07'],
    })
    expect(wrapper.find('.v-date-picker-title__date').text()).toBe('3 selected')
  })

  it('should emit click/dblclick:month event', async () => {
    const click = jest.fn()
    const dblclick = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05',
        type: 'month',
      },
      listeners: {
        'click:month': click,
        'dblclick:month': dblclick,
      },
    })

    wrapper.findAll('.v-date-picker-table--month td button').at(0).trigger('click')
    expect(click).toHaveBeenCalledWith('2013-01')

    wrapper.findAll('.v-date-picker-table--month td button').at(11).trigger('dblclick')
    expect(dblclick).toHaveBeenCalledWith('2013-12')
  })
})
