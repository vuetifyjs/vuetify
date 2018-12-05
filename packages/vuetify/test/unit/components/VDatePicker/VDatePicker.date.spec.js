import Vue from 'vue'
import { test, touch } from '@/test'
import VDatePicker from '@/components/VDatePicker/VDatePicker'

test('VDatePicker.js', ({ mount, compileToFunctions }) => {
  it('should display the correct date in title and header', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
      }
    })

    const title = wrapper.find('.v-date-picker-title__date')[0]
    const header = wrapper.find('.v-date-picker-header__value strong')[0]

    expect(title.text()).toBe('Tue, Nov 1')
    expect(header.text()).toBe('November 2005')
  })

  it('should display the correct year when model is null', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: null,
        pickerDate: '2013-01'
      }
    })

    const year = wrapper.find('.v-date-picker-title__year')[0]

    expect(year.text()).toBe('2013')
  })

  it('should match snapshot with default settings', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly picker', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        readonly: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled picker', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input event on date click', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07'
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.find('.v-date-picker-table--date tbody tr+tr td:first-child button')[0].trigger('click')
    expect(input).toBeCalledWith('2013-05-05')
    expect(change).toBeCalledWith('2013-05-05')
  })

  it('should not emit input event on month click if date is not allowed', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-13',
        allowedDates: () => false
      },
      data: {
        activePicker: 'MONTH'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.v-date-picker-table--month button')[0].trigger('click')
    expect(cb).not.toBeCalled()
  })

  it('should emit input event on year click (reactive picker)', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-13',
        reactive: true
      },
      data: {
        activePicker: 'YEAR'
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input);

    const change = jest.fn()
    wrapper.vm.$on('change', input);

    wrapper.find('.v-date-picker-years li.active + li')[0].trigger('click')
    expect(input).toBeCalledWith('2012-05-13')
    expect(change).not.toBeCalled()
  })

  it('should not emit input event on year click if date is not allowed', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-13',
        allowedDates: () => false
      },
      data: {
        activePicker: 'YEAR'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.v-date-picker-years li.active + li')[0].trigger('click')
    expect(cb).not.toBeCalled()
  })

  it('should emit input event with selected dates after click', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        multiple: true,
        value: ['2013-05-07', '2013-05-08']
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.v-date-picker-table--date tbody tr+tr td:first-child button')[0].trigger('click')
    expect(cb.mock.calls[0][0]).toHaveLength(3)
    expect(cb.mock.calls[0][0][2]).toBe('2013-05-05')
    expect(cb.mock.calls[0][0]).toEqual(
      expect.arrayContaining(['2013-05-07', '2013-05-08', '2013-05-05'])
    )
  })

  it('should emit input without unselected dates after click', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        multiple: true,
        value: ['2013-05-07', '2013-05-08', '2013-05-05']
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.v-date-picker-table--date tbody tr+tr td:first-child button')[0].trigger('click')
    expect(cb.mock.calls[0][0]).toHaveLength(2)
    expect(cb.mock.calls[0][0]).toEqual(expect.arrayContaining(['2013-05-07', '2013-05-08']))
    expect(cb.mock.calls[0][0]).not.toEqual(expect.arrayContaining(['2013-05-05']))
  })

  it('should be scrollable', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        scrollable: true
      }
    })

    wrapper.find('.v-date-picker-table--date')[0].trigger('wheel')
    expect(wrapper.vm.tableDate).toBe('2013-06')
  })

  it('should change tableDate on touch', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        scrollable: true
      }
    })

    const table = wrapper.find('.v-date-picker-table--date')[0]
    touch(table).start(0, 0).end(20, 0)
    expect(wrapper.vm.tableDate).toBe('2013-04')

    touch(table).start(0, 0).end(-20, 0)
    expect(wrapper.vm.tableDate).toBe('2013-06')
  })

  it('should match snapshot with dark theme', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        dark: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with no title', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        noTitle: true
      }
    })

    expect(wrapper.find('.v-picker__title')).toHaveLength(0)
  })

  it('should pass first day of week to v-date-picker-table component', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        firstDayOfWeek: 2
      }
    })

    expect(wrapper.vm.$refs.table.firstDayOfWeek).toBe(2)
  })

  // TODO: This fails in different ways for multiple people
  // Avoriaz/Jsdom (?) doesn't fully support date formatting using locale
  // This should be tested in browser env
  it.skip('should match snapshot with locale', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        locale: 'fa-AF'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with title/header formatting functions', () => {
    const dateFormat = date => `(${date})`
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        headerDateFormat: dateFormat,
        titleDateFormat: dateFormat,
        weekdayFormat: () => 'W'
      }
    })

    expect(wrapper.find('.v-date-picker-title__date')[0].text()).toBe('(2005-11-01)')
    expect(wrapper.find('.v-date-picker-header__value')[0].text()).toBe('(2005-11)')
    expect(wrapper.find('.v-date-picker-table--date th')[1].text()).toBe('W')
  })

  it('should match snapshot with colored picker', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        color: 'primary',
        headerColor: 'orange darken-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        color: 'orange darken-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with year icon', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        yearIcon: 'year'
      }
    })

    expect(wrapper.find('.v-picker__title')[0].html()).toMatchSnapshot()
  })

  it('should match change month when clicked on header arrow buttons', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01'
      }
    })

    const [leftButton, rightButton] = wrapper.find('.v-date-picker-header button')

    leftButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2005-10')

    rightButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2005-12')
  })

  it('should match change active picker when clicked on month button', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01'
      }
    })

    const button = wrapper.find('.v-date-picker-header strong')[0]

    button.trigger('click')
    expect(wrapper.vm.activePicker).toBe('MONTH')
  })

  it('should match snapshot with slot', async () => {
    const vm = new Vue()
    const slot = props => vm.$createElement('div', { class: 'scoped-slot' })
    const component = Vue.component('test', {
      render (h) {
        return h(VDatePicker, {
          props: {
            type: 'date',
            value: '2005-11-01'
          },
          scopedSlots: {
            default: slot
          }
        })
      }
    })

    const wrapper = mount(component)
    expect(wrapper.find('.v-picker__actions .scoped-slot')).toHaveLength(1)
  })

  it('should match years snapshot', async () => {
    const wrapper = mount(VDatePicker, {
      data: {
        activePicker: 'YEAR'
      },
      propsData: {
        type: 'date',
        value: '2005-11-01'
      }
    })

    expect(wrapper.vm.activePicker).toBe('YEAR')

    wrapper.find('.v-date-picker-title__date')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activePicker).toBe('DATE')

    wrapper.find('.v-date-picker-title__year')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activePicker).toBe('YEAR')
  })

  it('should select year', async () => {
    const wrapper = mount(VDatePicker, {
      data: {
        activePicker: 'YEAR'
      },
      propsData: {
        type: 'date',
        value: '2005-11-01'
      }
    })

    wrapper.find('.v-date-picker-years li.active + li')[0].trigger('click')
    expect(wrapper.vm.activePicker).toBe('MONTH')
    expect(wrapper.vm.tableDate).toBe('2004-11')
  })

  it('should set the table date when value has changed', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: null
      }
    })

    wrapper.setProps({ value: '2005-11-11' })
    expect(wrapper.vm.tableDate).toBe('2005-11')
  })

  it('should update the active picker if type has changed', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '1999-12-13',
        type: 'date'
      }
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
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
      }
    })

    expect(wrapper.vm.defaultTitleDateFormatter('2013-03-05')).toBe('Tue, Mar 5')

    wrapper.setProps({ landscape: true })
    expect(wrapper.vm.defaultTitleDateFormatter('2013-03-05')).toBe('Tue,<br>Mar 5')
  })

  it('should use prev and next icons', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        prevIcon: 'block',
        nextIcon: 'check'
      }
    })

    const icons = wrapper.find('.v-date-picker-header .v-icon')
    expect(icons[0].element.textContent).toBe('block')
    expect(icons[1].element.textContent).toBe('check')
  })

  it('should emit update:pickerDate event when tableDate changes', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2017-09'
      }
    })

    const pickerDate = jest.fn()
    wrapper.vm.$on('update:pickerDate', pickerDate)
    wrapper.vm.tableDate = '2013-11'
    await wrapper.vm.$nextTick()
    expect(pickerDate).toBeCalledWith('2013-11')
  })

  it('should set tableDate to pickerDate if provided', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2017-09',
        pickerDate: '2013-11'
      }
    })

    expect(wrapper.vm.tableDate).toBe('2013-11')
  })

  it('should update pickerDate to the selected month after setting it to null', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2017-09-13',
        pickerDate: '2013-11'
      }
    })

    const update = jest.fn()
    wrapper.vm.$on('update:pickerDate', update)
    await wrapper.vm.$nextTick()

    wrapper.setProps({
      pickerDate: null
    })
    await wrapper.vm.$nextTick()
    expect(update).toBeCalledWith('2017-09')
  })

  it('should render component with min/max props', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-01-07',
        min: '2013-01-03',
        max: '2013-01-17'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.vm.activePicker = 'MONTH'
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.vm.activePicker = 'YEAR'
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit @input and not emit @change when month is clicked (not reative picker)', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-02-07',
        reactive: true
      },
      data: {
        activePicker: 'MONTH'
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.find('tbody tr td button')[0].trigger('click')
    wrapper.vm.$nextTick()
    expect(change).not.toBeCalled()
    expect(input).toBeCalledWith('2013-01-07')
  })

  it('should not emit @input and not emit @change when month is clicked (lazy picker)', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-02-07'
      },
      data: {
        activePicker: 'MONTH'
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    const change = jest.fn()
    wrapper.vm.$on('change', change)

    wrapper.find('tbody tr td button')[0].trigger('click')
    wrapper.vm.$nextTick()
    expect(change).not.toBeCalled()
    expect(input).not.toBeCalled()
  })
})
