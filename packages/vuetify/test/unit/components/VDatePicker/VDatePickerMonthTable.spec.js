import VDatePickerMonthTable from '@/components/VDatePicker/VDatePickerMonthTable'
import { test } from '@/test'

test('VDatePickerMonthTable.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component and match snapshot (multiple)', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: ['2005-11', '2005-10'],
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should watch tableDate value and run transition', async () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11'
      }
    })

    wrapper.setProps({
      tableDate: '2006'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('table')[0].element.className).toBe('tab-transition-enter tab-transition-enter-active')
  })

  it('should watch tableDate value and run reverse transition', async () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11'
      }
    })

    wrapper.setProps({
      tableDate: '2004'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('table')[0].element.className).toBe('tab-reverse-transition-enter tab-reverse-transition-enter-active')
  })

  it('should emit event when month button is clicked', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11'
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.find('tbody button')[0].trigger('click')
    expect(input).toBeCalledWith('2005-01')
  })

  it('should not emit event when disabled month button is clicked', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        current: '2005-05',
        value: '2005-11',
        allowedDates: () => false
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.find('tbody button')[0].trigger('click')
    expect(input).not.toBeCalled()
  })

  it('should emit tableDate event when scrolled and scrollable', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        scrollable: true
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.trigger('wheel')
    expect(tableDate).toBeCalledWith('2006')
  })

  it('should not emit tableDate event when scrolled and not scrollable', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005'
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.trigger('wheel')
    expect(tableDate).not.toBeCalled()
  })

  // TODO
  it.skip('should emit tableDate event when swiped', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005'
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.trigger('touchstart')
    wrapper.trigger('touchend')
    expect(tableDate).toBeCalledWith(2006)
  })

  it('should change tableDate when touch is called', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005'
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.vm.touch(1)
    expect(tableDate).toBeCalledWith('2006')
    wrapper.vm.touch(-1)
    expect(tableDate).toBeCalledWith('2004')
  })

  it('should render component with events (array) and match snapshot', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        events: ['2005-07', '2005-11'],
        eventColor: 'red'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events (function) and match snapshot', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        events: date => date === '2005-07' || date === '2005-11',
        eventColor: 'red'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by object and match snapshot', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        events: ['2005-07', '2005-11'],
        eventColor: {'2005-07': 'red', '2005-11': 'blue lighten-1'}
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by function and match snapshot', () => {
    const wrapper = mount(VDatePickerMonthTable, {
      propsData: {
        tableDate: '2005',
        events: ['2005-07', '2005-11'],
        eventColor: date => ({'2005-07': 'red', '2005-11': 'blue lighten-1'}[date])
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

})
