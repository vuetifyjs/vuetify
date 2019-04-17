import { touch } from '../../../../test'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { Lang } from '../../../services/lang'
import VDatePicker from '../VDatePicker'
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
  type Instance = InstanceType<typeof VDatePicker>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDatePicker, {
        ...options,
        mocks: {
          $vuetify: {
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

  it('should display the correct date in title and header', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
      },
    })

    const title = wrapper.findAll('.v-date-picker-title__date').at(0)
    const header = wrapper.findAll('.v-date-picker-header__value div').at(0)

    expect(title.text()).toBe('Tue, Nov 1')
    expect(header.text()).toBe('November 2005')
  })

  it('should work with year < 1000', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '0005-11-01',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display the correct year when model is null', () => {
    const wrapper = mountFunction({
      propsData: {
        value: null,
        pickerDate: '2013-01',
      },
    })

    const year = wrapper.find('.v-date-picker-header__value button')

    expect(year.text()).toBe('January 2013')
  })

  it('should match snapshot with default settings', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly picker', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        readonly: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled picker', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input event on date click', async () => {
    const input = jest.fn()
    const change = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
      },
      listeners: {
        input,
        change,
      },
    })

    wrapper.findAll('.v-date-picker-table--date td button').at(0).trigger('click')
    await wrapper.vm.$nextTick()

    expect(input).toHaveBeenCalledWith('2013-05-01')
    expect(change).toHaveBeenCalledWith('2013-05-01')
  })

  // it('should not emit input event on month click if date is not allowed', async () => {
  //   const cb = jest.fn()
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-05-13',
  //       allowedDates: () => false
  //     },
  //     data: () => ({
  //       activePicker: 'MONTH'
  //     })
  //   })

  //   wrapper.vm.$on('input', cb)
  //   wrapper.findAll('.v-date-picker-table--month button').at(0).trigger('click')
  //   expect(cb).not.toHaveBeenCalled()
  // })

  // it('should emit input event on year click (reactive picker)', async () => {
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-05-13',
  //       reactive: true
  //     },
  //     data: () => ({
  //       activePicker: 'YEAR'
  //     })
  //   })

  //   const input = jest.fn()
  //   wrapper.vm.$on('input', input)

  //   const change = jest.fn()
  //   wrapper.vm.$on('change', input)

  //   wrapper.findAll('.v-date-picker-years li.active + li').at(0).trigger('click')
  //   expect(input).toHaveBeenCalledWith('2012-05-13')
  //   expect(change).not.toHaveBeenCalled()
  // })

  // it('should not emit input event on year click if date is not allowed', async () => {
  //   const cb = jest.fn()
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-05-13',
  //       allowedDates: () => false
  //     },
  //     data: () => ({
  //       activePicker: 'YEAR'
  //     })
  //   })

  //   wrapper.vm.$on('input', cb)
  //   wrapper.findAll('.v-date-picker-years li.active + li').at(0).trigger('click')
  //   expect(cb).not.toHaveBeenCalled()
  // })

  it('should emit input event with selected dates after click', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        value: ['2013-05-07', '2013-05-08'],
      },
      listeners: {
        input,
      },
    })

    wrapper.findAll('.v-date-picker-table--date td button').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith(['2013-05-01', '2013-05-07', '2013-05-08'])
  })

  it('should display translated title', async () => {
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        value: ['2013-05-07'],
      },
    })

    expect(wrapper.find('.v-date-picker-title__date').text()).toBe('Tue, May 7')

    wrapper.setProps({
      value: [],
    })
    expect(wrapper.find('.v-date-picker-title__date').text()).toBe('0 selected')

    wrapper.setProps({
      value: ['2013-05-07', '2013-05-08', '2013-05-09'],
    })
    expect(wrapper.find('.v-date-picker-title__date').text()).toBe('3 selected')
  })

  it('should emit input without unselected dates after click', async () => {
    const input = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        value: ['2013-05-01', '2013-05-05', '2013-05-13'],
      },
      listeners: {
        input,
      },
    })

    wrapper.findAll('.v-date-picker-table--date td button').at(4).trigger('click')
    expect(input).toHaveBeenCalledWith(['2013-05-01', '2013-05-13'])
  })

  // it('should be scrollable', async () => {
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-05-07',
  //       scrollable: true
  //     }
  //   })

  //   wrapper.findAll('.v-date-picker-table--date').at(0).trigger('wheel')
  //   expect(wrapper.vm.tableDate).toBe('2013-06')
  // })

  // it('should change tableDate on touch', async () => {
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-05-07',
  //       scrollable: true
  //     }
  //   })

  //   const table = wrapper.findAll('.v-date-picker-table--date').at(0)
  //   touch(table).start(0, 0).end(20, 0)
  //   expect(wrapper.vm.tableDate).toBe('2013-04')

  //   touch(table).start(0, 0).end(-20, 0)
  //   expect(wrapper.vm.tableDate).toBe('2013-05')
  // })

  it('should match snapshot with dark theme', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        dark: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with no title', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        noTitle: true,
      },
    })

    expect(wrapper.findAll('.v-picker__title').wrappers).toHaveLength(0)
  })

  it('should change first day of week', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        firstDayOfWeek: 2,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // TODO: This fails in different ways for multiple people
  // Avoriaz/Jsdom (?) doesn't fully support date formatting using locale
  // This should be tested in browser env
  it.skip('should match snapshot with locale', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        locale: 'fa-AF',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with title/header formatting functions', () => {
    const dateFormat = date => `(${date})`
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
        headerDateFormat: dateFormat,
        titleDateFormat: dateFormat,
        weekdayFormat: () => 'W',
      },
    })

    expect(wrapper.findAll('.v-date-picker-title__date').at(0).text()).toBe('(2005-11-01)')
    expect(wrapper.findAll('.v-date-picker-header__value').at(0).text()).toBe('(2005-11)')
    expect(wrapper.findAll('.v-date-picker-table--date th').at(1).text()).toBe('W')
  })

  it('should match snapshot with colored picker & header', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
        color: 'primary',
        headerColor: 'orange darken-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
        color: 'orange darken-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with year icon', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
        yearIcon: 'year',
      },
    })

    expect(wrapper.findAll('.v-picker__title').at(0).html()).toMatchSnapshot()
  })

  it('should change month when clicked on header arrow buttons', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
      },
    })

    const [leftButton, rightButton] = wrapper.findAll('.v-date-picker-header button.v-btn').wrappers

    leftButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-date-picker-header__value button').text()).toBe('October 2005')

    rightButton.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-date-picker-header__value button').text()).toBe('November 2005')
  })

  it('should change active picker when clicked on month button', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
      },
    })

    wrapper.find('.v-date-picker-header__value button').trigger('click')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render default slot', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'date',
        value: '2005-11-01',
      },
      slots: {
        default: '<div class="foobar"></div>',
      },
    })
    expect(wrapper.find('.v-picker__actions .foobar').exists()).toBe(true)
  })

  it('should match years snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'date',
        value: '2005-11-01',
      },
    })

    wrapper.find('.v-date-picker-title__year').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.find('.v-date-picker-title__date').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update the value if type has changed', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '1999-12-13',
        type: 'date',
      },
    })

    const input = jest.fn(value => wrapper.setProps({ value }))

    wrapper.vm.$on('input', input)

    wrapper.setProps({ type: 'month' })
    expect(input).toHaveBeenCalledWith('1999-12')

    wrapper.setProps({ type: 'date' })
    expect(input).toHaveBeenCalledWith('1999-12-01')
  })

  it('should use prev and next icons', () => {
    const wrapper = mountFunction({
      propsData: {
        prevIcon: 'block',
        nextIcon: 'check',
      },
    })

    const [prev, next] = wrapper.findAll('.v-date-picker-header .v-icon').wrappers
    expect(prev.text()).toBe('block')
    expect(next.text()).toBe('check')
  })

  it('should emit update:pickerDate event when pickerDate changes', async () => {
    const pickerDate = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2017-09',
      },
      listeners: {
        'update:pickerDate': pickerDate,
      },
    })

    wrapper.find('.v-date-picker-header button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(pickerDate).toHaveBeenCalledWith('2017-08')
  })

  it('should set tableDate to pickerDate if provided', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2017-09',
        pickerDate: '2013-11',
      },
    })

    expect(wrapper.find('.v-date-picker-header__value button').text()).toBe('November 2013')
  })

  it('should update pickerDate to the selected month after setting it to null', async () => {
    const pickerDate = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2017-09-13',
        pickerDate: '2013-11',
      },
      listeners: {
        'update:pickerDate': pickerDate,
      },
    })

    wrapper.setProps({
      pickerDate: null,
    })
    await wrapper.vm.$nextTick()

    expect(pickerDate).toHaveBeenCalledWith('2017-09')
  })

  it('should render component with min/max props', async () => { // TODO: fix this one
    const wrapper = mountFunction({
      propsData: {
        value: '2013-01-07',
        min: '2013-01-03',
        max: '2013-01-17',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should round down min date in ISO 8601 format', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2019-01-20',
        min: '2019-01-06T15:55:56.441Z',
      },
    })

    wrapper.vm.$on('input', cb)
    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(cb.mock.calls[0][0]).toEqual('2019-01-06')
  })

  // it('should emit @input and not emit @change when month is clicked (not reative picker)', async () => {
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-02-07',
  //       reactive: true
  //     },
  //     data: () => ({
  //       activePicker: 'MONTH'
  //     })
  //   })

  //   const input = jest.fn()
  //   wrapper.vm.$on('input', input)

  //   const change = jest.fn()
  //   wrapper.vm.$on('change', change)

  //   wrapper.findAll('tbody tr td button').at(0).trigger('click')
  //   wrapper.vm.$nextTick()
  //   expect(change).not.toHaveBeenCalled()
  //   expect(input).toHaveBeenCalledWith('2013-01-07')
  // })

  // it('should not emit @input and not emit @change when month is clicked (lazy picker)', async () => {
  //   const wrapper = mountFunction({
  //     propsData: {
  //       value: '2013-02-07'
  //     },
  //     data: () => ({
  //       activePicker: 'MONTH'
  //     })
  //   })

  //   const input = jest.fn()
  //   wrapper.vm.$on('input', input)

  //   const change = jest.fn()
  //   wrapper.vm.$on('change', change)

  //   wrapper.findAll('tbody tr td button').at(0).trigger('click')
  //   wrapper.vm.$nextTick()
  //   expect(change).not.toHaveBeenCalled()
  //   expect(input).not.toHaveBeenCalled()
  // })

  it('should emit click/dblclick:date event', async () => {
    const click = jest.fn()
    const dblclick = jest.fn()

    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-20',
        type: 'date',
      },
      listeners: {
        'click:date': click,
        'dblclick:date': dblclick,
      },
    })

    wrapper.findAll('.v-date-picker-table--date td button').at(0).trigger('click')
    expect(click).toHaveBeenCalledWith('2013-05-01')

    wrapper.findAll('.v-date-picker-table--date td button').at(4).trigger('dblclick')
    expect(dblclick).toHaveBeenCalledWith('2013-05-05')
  })

  it('should accept a custom current date', () => {
    const wrapper = mountFunction({
      propsData: {
        showCurrent: '2013-05-01',
        value: '2013-05-20',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should hide current date indicator', () => {
    const wrapper = mountFunction({
      propsData: {
        hideshowCurrent: true,
        showCurrent: '2013-05-01',
        value: '2013-05-20',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should handle date range select', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        range: true,
        value: ['2019-01-01', '2019-01-02'],
      },
    })

    wrapper.vm.$on('input', cb)
    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(cb).toHaveBeenCalledWith(['2019-01-06'])

    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td button').at(2).trigger('click')
    expect(cb).toHaveBeenCalledWith(['2019-01-06', '2019-01-08'])
  })
})
