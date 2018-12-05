import { test } from '@/test'
import VDatePicker from '@/components/VDatePicker/VDatePicker'

test('VDatePicker.js', ({ mount, compileToFunctions }) => {
  it('should emit input event on year click (reactive picker)', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
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
    expect(input).toBeCalledWith('2012-05')
    expect(change).not.toBeCalled()
  })

  it('should not emit input event on year click if month is not allowed', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
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

  it('should emit input event on month click', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.v-date-picker-table--month button')[0].trigger('click')
    expect(cb).toBeCalledWith('2013-01')
  })

  it('should be scrollable', async () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        scrollable: true
      }
    })

    wrapper.find('.v-date-picker-table--month')[0].trigger('wheel')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tableDate).toBe('2014')
  })

  it('should match snapshot with pick-month prop', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        type: 'month'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with allowed dates as array', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: value => ['2013-01', '2013-03', '2013-05', '2013-07'].includes(value)
      }
    })

    expect(wrapper.find('.v-date-picker-table--month tbody')[0].html()).toMatchSnapshot()
  })

  it('should match snapshot with month formatting functions', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        type: 'month',
        monthFormat: date => `(${date.split('-')[1]})`
      }
    })

    expect(wrapper.find('.v-date-picker-table--month tbody')[0].html()).toMatchSnapshot()
  })

  it('should match snapshot with colored picker', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month',
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
        type: 'month',
        value: '2005-11-01',
        color: 'orange darken-1'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match change month when clicked on header arrow buttons', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11',
        type: 'month'
      }
    })

    const [leftButton, rightButton] = wrapper.find('.v-date-picker-header button.v-btn')

    leftButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2004')

    rightButton.trigger('click')
    expect(wrapper.vm.tableDate).toBe('2006')
  })

  it('should match change active picker when clicked on month button', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        type: 'month'
      }
    })

    const button = wrapper.find('.v-date-picker-header__value button')[0]

    button.trigger('click')
    expect(wrapper.vm.activePicker).toBe('YEAR')
  })

  it('should select year', async () => {
    const wrapper = mount(VDatePicker, {
      data: {
        activePicker: 'YEAR'
      },
      propsData: {
        type: 'month',
        value: '2005-11'
      }
    })

    wrapper.find('.v-date-picker-years li.active + li')[0].trigger('click')
    expect(wrapper.vm.activePicker).toBe('MONTH')
    expect(wrapper.vm.tableDate).toBe('2004')
  })

  it('should set the table date when value has changed', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: null,
        type: 'month'
      }
    })

    wrapper.setProps({ value: '2005-11' })
    expect(wrapper.vm.tableDate).toBe('2005')
  })

  it('should use prev and next icons', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month',
        prevIcon: 'block',
        nextIcon: 'check'
      }
    })

    const icons = wrapper.find('.v-date-picker-header .v-icon')
    expect(icons[0].element.textContent).toBe('block')
    expect(icons[1].element.textContent).toBe('check')
  })
})
