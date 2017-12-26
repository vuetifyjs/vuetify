import Vue from 'vue'
import { test } from '@util/testing'
import VDatePicker from '@components/VDatePicker'

test('VDatePicker.js', ({ mount, compileToFunctions }) => {
  it('should emit input event on year click', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month'
      },
      data: {
        activePicker: 'YEAR'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.picker--date__years li.active + li')[0].trigger('click')
    expect(cb).toBeCalledWith('2012-05')
  })

  it('should not emit input event on year click if month is not allowed', async () => {
    const cb = jest.fn()
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: []
      },
      data: {
        activePicker: 'YEAR'
      }
    })

    wrapper.vm.$on('input', cb);
    wrapper.find('.picker--date__years li.active + li')[0].trigger('click')
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
    wrapper.find('.picker--date__table tbody tr:first-child td:first-child button')[0].trigger('click')
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

    wrapper.find('.picker--date__table')[0].trigger('wheel')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tableYear).toBe(2012)
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
        allowedDates: ['2013-01', '2013-03', '2013-05', '2013-07', 'invalid month']
      }
    })

    expect(wrapper.find('.picker--date__table tbody')[0].html()).toMatchSnapshot()
  })

  it('should match snapshot with allowed dates as function', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: date => date.substr(6, 1) === '1'
      }
    })

    expect(wrapper.find('.picker--date__table tbody')[0].html()).toMatchSnapshot()
  })

  it('should match snapshot with allowed dates as object', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: { min: '2013-03', max: '2013-07' }
      }
    })

    expect(wrapper.find('.picker--date__table tbody')[0].html()).toMatchSnapshot()
  })

  it('should match snapshot with month formatting functions', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        type: 'month',
        monthFormat: date => `(${date.split('-')[1]})`
      }
    })

    expect(wrapper.find('.picker--date__table tbody')[0].html()).toMatchSnapshot()
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

    const [leftButton, rightButton] = wrapper.find('.picker--date__header-selector button')

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

    const button = wrapper.find('.picker--date__header-selector-date strong')[0]

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

    wrapper.find('.picker--date__years li.active + li')[0].trigger('click')
    expect(wrapper.vm.activePicker).toBe('MONTH')
    expect(wrapper.vm.tableDate).toBe('2004')
  })

  it.skip('should calculate the first allowed month', () => {
    const today = new Date().toISOString().substr(0, 7)

    const wrapper1 = mount(VDatePicker, {
      propsData: {
        value: null,
        type: 'month'
      }
    })
    expect(wrapper1.vm.inputDate).toBe(today)

    // The behaviour is dependent on the current date
    // TODO refactor the test or change firstAllowedMonth implementation
    //
    // const allowedMonth = today.replace(/..$/, today.substr(5, 2) === '02' ? '03' : '02')
    // const wrapper2 = mount(VDatePicker, {
    //   propsData: {
    //     value: null,
    //     type: 'month',
    //     allowedDates: [allowedMonth]
    //   }
    // })
    // expect(wrapper2.vm.inputDate).toBe(allowedMonth)
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

  it('should update the active picker if type has changed', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month'
      }
    })

    expect(wrapper.vm.activePicker).toBe('MONTH')
    wrapper.setProps({ type: 'date' })
    expect(wrapper.vm.activePicker).toBe('MONTH')
    wrapper.setProps({ type: 'year' })
    expect(wrapper.vm.activePicker).toBe('YEAR')
  })

  it('should use prev and next icons', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month',
        prependIcon: 'block',
        appendIcon: 'check'
      }
    })

    const icons = wrapper.find('.picker--date__header-selector .icon')
    expect(icons[0].element.textContent).toBe('block')
    expect(icons[1].element.textContent).toBe('check')
  })
})
