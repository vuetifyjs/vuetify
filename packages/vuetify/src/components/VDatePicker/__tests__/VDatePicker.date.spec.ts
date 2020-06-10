import { touch } from '../../../../test'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { Lang } from '../../../services/lang'
import VDatePicker from '../VDatePicker'
import Vue from 'vue'
import { preset } from '../../../presets/default'

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
              ...preset,
              lang: {
                current: 'en',
                locales: {
                  en: {
                    datePicker: {
                      itemsSelected: 'i has {0} items',
                    },
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
  })

  it('should display the correct year when model is null', () => {
    const wrapper = mountFunction({
      propsData: {
        value: null,
        pickerDate: '2013-01',
      },
    })

    const year = wrapper.findAll('.v-date-picker-title__year').at(0)

    expect(year.text()).toBe('2013')
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
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith('2013-05-05')
    expect(change).toHaveBeenCalledWith('2013-05-05')
  })

  it('should not emit input event on month click if date is not allowed', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-13',
        allowedDates: () => false,
      },
      data: () => ({
        activePicker: 'MONTH',
      }),
    })

    wrapper.vm.$on('input', cb)
    wrapper.findAll('.v-date-picker-table--month button').at(0).trigger('click')
    expect(cb).not.toHaveBeenCalled()
  })

  it('should emit input event on year click (reactive picker)', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-13',
        reactive: true,
      },
      data: () => ({
        activePicker: 'YEAR',
      }),
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const change = jest.fn()
    wrapper.vm.$on('change', input)

    wrapper.findAll('.v-date-picker-years li.active + li').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith('2012-05-13')
    expect(change).not.toHaveBeenCalled()
  })

  it('should not emit input event on year click if date is not allowed', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-13',
        allowedDates: () => false,
      },
      data: () => ({
        activePicker: 'YEAR',
      }),
    })

    wrapper.vm.$on('input', cb)
    wrapper.findAll('.v-date-picker-years li.active + li').at(0).trigger('click')
    expect(cb).not.toHaveBeenCalled()
  })

  it('should emit input event with selected dates after click', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        value: ['2013-05-07', '2013-05-08'],
      },
    })

    wrapper.vm.$on('input', cb)
    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(cb.mock.calls[0][0]).toHaveLength(3)
    expect(cb.mock.calls[0][0][2]).toBe('2013-05-05')
    expect(cb.mock.calls[0][0]).toEqual(
      expect.arrayContaining(['2013-05-07', '2013-05-08', '2013-05-05'])
    )
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
    expect(wrapper.find('.v-date-picker-title__date').text()).toBe('-')

    wrapper.setProps({
      value: ['2013-05-07', '2013-05-08', '2013-05-09'],
    })
    expect(wrapper.find('.v-date-picker-title__date').text()).toBe('i has 3 items')
  })

  it('should emit input without unselected dates after click', async () => {
    const cb = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        multiple: true,
        value: ['2013-05-07', '2013-05-08', '2013-05-05'],
      },
    })

    wrapper.vm.$on('input', cb)
    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(cb.mock.calls[0][0]).toHaveLength(2)
    expect(cb.mock.calls[0][0]).toEqual(expect.arrayContaining(['2013-05-07', '2013-05-08']))
    expect(cb.mock.calls[0][0]).not.toEqual(expect.arrayContaining(['2013-05-05']))
  })

  it('should be scrollable', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        scrollable: true,
      },
    })

    wrapper.findAll('.v-date-picker-table--date').at(0).trigger('wheel')
    expect(wrapper.vm.tableDate).toBe('2013-06')
  })

  it('should change tableDate on touch', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        scrollable: true,
      },
    })

    const table = wrapper.findAll('.v-date-picker-table--date').at(0)
    touch(table).start(0, 0).end(20, 0)
    expect(wrapper.vm.tableDate).toBe('2013-04')

    touch(table).start(0, 0).end(-20, 0)
    expect(wrapper.vm.tableDate).toBe('2013-05')
  })

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

  it('should pass first day of week to v-date-picker-table component', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
        firstDayOfWeek: 2,
      },
    })

    expect(wrapper.vm.$refs.table.firstDayOfWeek).toBe(2)
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

  it('should match change month when clicked on header arrow buttons', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
      },
    })

    const [leftButton, rightButton] = wrapper.findAll('.v-date-picker-header button.v-btn').wrappers

    leftButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2005-10')

    rightButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2005-11')
  })

  it('should match change active picker when clicked on month button', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11-01',
      },
    })

    const button = wrapper.findAll('.v-date-picker-header__value button').at(0)

    button.trigger('click')
    expect(wrapper.vm.activePicker).toBe('MONTH')
  })

  it('should match snapshot with slot', async () => {
    const wrapper = mountFunction({
      propsData: {
        type: 'date',
        value: '2005-11-01',
      },
      scopedSlots: {
        default: '<div class="scoped-slot"></div>',
      },
    })
    expect(wrapper.findAll('.v-picker__actions .scoped-slot').wrappers).toHaveLength(1)
  })

  it('should match years snapshot', async () => {
    const wrapper = mountFunction({
      data: () => ({
        activePicker: 'YEAR',
      }),
      propsData: {
        type: 'date',
        value: '2005-11-01',
      },
    })

    expect(wrapper.vm.activePicker).toBe('YEAR')

    wrapper.findAll('.v-date-picker-title__date').at(0).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activePicker).toBe('DATE')

    wrapper.findAll('.v-date-picker-title__year').at(0).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activePicker).toBe('YEAR')
  })

  it('should select year', async () => {
    const wrapper = mountFunction({
      data: () => ({
        activePicker: 'YEAR',
      }),
      propsData: {
        type: 'date',
        value: '2005-11-01',
      },
    })

    wrapper.findAll('.v-date-picker-years li.active + li').at(0).trigger('click')
    expect(wrapper.vm.activePicker).toBe('MONTH')
    expect(wrapper.vm.tableDate).toBe('2004-11')
  })

  it('should set the table date when value has changed', () => {
    const wrapper = mountFunction({
      propsData: {
        value: null,
      },
    })

    wrapper.setProps({ value: '2005-11-11' })
    expect(wrapper.vm.tableDate).toBe('2005-11')
  })

  it('should update the active picker if type has changed', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '1999-12-13',
        type: 'date',
      },
    })

    wrapper.vm.$on('input', value => wrapper.setProps({ value }))

    wrapper.setProps({ type: 'month' })
    expect(wrapper.vm.activePicker).toBe('MONTH')
    expect(wrapper.vm.value).toBe('1999-12')
    // TODO: uncomment when type: 'year' is implemented
    // wrapper.setProps({ type: 'year' })
    // expect(wrapper.vm.activePicker).toBe('YEAR')
    // expect(wrapper.vm.inputDate).toBe('1999')
    // wrapper.setProps({ type: 'month' })
    // expect(wrapper.vm.activePicker).toBe('MONTH')
    // expect(wrapper.vm.inputDate).toBe('1999-01')
    wrapper.setProps({ type: 'date' })
    expect(wrapper.vm.activePicker).toBe('DATE')
    expect(wrapper.vm.value).toBe('1999-12-01')
  })

  it('should format title date', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-07',
      },
    })

    expect(wrapper.vm.defaultTitleDateFormatter('2013-03-05')).toBe('Tue, Mar 5')

    wrapper.setProps({ landscape: true })
    expect(wrapper.vm.defaultTitleDateFormatter('2013-03-05')).toBe('Tue,<br>Mar 5')
  })

  it('should use prev and next icons', () => {
    const wrapper = mountFunction({
      propsData: {
        prevIcon: 'block',
        nextIcon: 'check',
      },
    })

    const icons = wrapper.findAll('.v-date-picker-header .v-icon').wrappers
    expect(icons[0].element.textContent).toBe('block')
    expect(icons[1].element.textContent).toBe('check')
  })

  it('should emit update:picker-date event when tableDate changes', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2017-09',
      },
    })

    const pickerDate = jest.fn()
    wrapper.vm.$on('update:picker-date', pickerDate)
    wrapper.vm.tableDate = '2013-11'
    await wrapper.vm.$nextTick()
    expect(pickerDate).toHaveBeenCalledWith('2013-11')
  })

  it('should set tableDate to pickerDate if provided', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2017-09',
        pickerDate: '2013-11',
      },
    })

    expect(wrapper.vm.tableDate).toBe('2013-11')
  })

  it('should update pickerDate to the selected month after setting it to null', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2017-09-13',
        pickerDate: '2013-11',
      },
    })

    const update = jest.fn()
    wrapper.vm.$on('update:picker-date', update)
    await wrapper.vm.$nextTick()

    wrapper.setProps({
      pickerDate: null,
    })
    await wrapper.vm.$nextTick()
    expect(update).toHaveBeenCalledWith('2017-09')
  })

  it.skip('should render component with min/max props', async () => { // TODO: fix this one
    const wrapper = mountFunction({
      propsData: {
        value: '2013-01-07',
        min: '2013-01-03',
        max: '2013-01-17',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setData({
      activePicker: 'MONTH',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setData({
      activePicker: 'YEAR',
    })
    await wrapper.vm.$nextTick()
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

  it('should emit @input and not emit @change when month is clicked (not reative picker)', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-02-07',
        reactive: true,
      },
      data: () => ({
        activePicker: 'MONTH',
      }),
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.findAll('tbody tr td button').at(0).trigger('click')
    wrapper.vm.$nextTick()
    expect(change).not.toHaveBeenCalled()
    expect(input).toHaveBeenCalledWith('2013-01-07')
  })

  it('should not emit @input and not emit @change when month is clicked (lazy picker)', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-02-07',
      },
      data: () => ({
        activePicker: 'MONTH',
      }),
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.findAll('tbody tr td button').at(0).trigger('click')
    wrapper.vm.$nextTick()
    expect(change).not.toHaveBeenCalled()
    expect(input).not.toHaveBeenCalled()
  })

  it('should emit click/dblclick:date event', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2013-05-20',
        type: 'date',
      },
    })

    const click = jest.fn()
    wrapper.vm.$on(`click:date`, click)
    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    expect(click).toHaveBeenCalledWith('2013-05-05')

    const dblclick = jest.fn()
    wrapper.vm.$on(`dblclick:date`, dblclick)
    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('dblclick')
    expect(dblclick).toHaveBeenCalledWith('2013-05-05')
  })

  it('should handle date range select', async () => {
    const wrapper = mountFunction({
      propsData: {
        range: true,
        value: ['2019-01-06'],
      },
    })

    const [input, change] = [jest.fn(), jest.fn()]
    wrapper.vm.$on('input', input)
    wrapper.vm.$on('change', change)

    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td button').at(2).trigger('click')
    // Lead to [from, to], both 'input' and 'change' should be called
    expect(input.mock.calls[0][0]).toEqual(expect.arrayContaining(['2019-01-06', '2019-01-08']))
    expect(change.mock.calls[0][0]).toEqual(expect.arrayContaining(['2019-01-06', '2019-01-08']))

    wrapper.setProps({
      value: ['2019-01-01', '2019-01-31'],
    })
    wrapper.findAll('.v-date-picker-table--date tbody tr+tr td:first-child button').at(0).trigger('click')
    // Lead to [from,], only 'input' should be called
    expect(input.mock.calls[1][0]).toEqual(expect.arrayContaining(['2019-01-06']))
    expect(change.mock.calls).toHaveLength(1)
  })

  it('should not higlight not allowed dates in range', async () => {
    const wrapper = mountFunction({
      propsData: {
        range: true,
        value: ['2019-09-01', '2019-09-03'],
        allowedDates: value => value.endsWith('1') || value.endsWith('3'),
      },
    })

    const buttonOfDay02 = wrapper.findAll('.v-date-picker-table--date tbody button').at(1)
    expect(buttonOfDay02.element.classList.contains('accent')).toBeFalsy()
  })
})
