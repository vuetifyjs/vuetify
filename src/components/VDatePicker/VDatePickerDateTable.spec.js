import { compileToFunctions } from 'vue-template-compiler'
import VDatePickerDateTable from './VDatePickerDateTable'
import { test } from '@util/testing'

test('VDatePickerDateTable.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with first day of week', function () {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        firstDayOfWeek: 2
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should watch tableDate value and run transition', async () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03'
      }
    })

    wrapper.setProps({
      tableDate: '2005-06'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('table')[0].element.className).toBe('tab-transition-enter tab-transition-enter-active')
  })

  it('should watch tableDate value and run reverse transition', async () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03'
      }
    })

    wrapper.setProps({
      tableDate: '2005-04'
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('table')[0].element.className).toBe('tab-reverse-transition-enter tab-reverse-transition-enter-active')
  })

  it('should emit event when date button is clicked', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03'
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.find('tbody button')[0].trigger('click')
    expect(input).toBeCalledWith('2005-05-01')
  })

  it('should not emit event when disabled month button is clicked', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        allowedDates: () => false
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.find('tbody button')[0].trigger('click')
    expect(input).not.toBeCalled()
  })

  it('should emit tableDate event when scrolled and scrollable', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        scrollable: true
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.trigger('wheel')
    expect(tableDate).toBeCalledWith('2005-06')
  })

  it('should not emit tableDate event when scrolled and not scrollable', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05'
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.trigger('wheel')
    expect(tableDate).not.toBeCalled()
  })

  // TODO
  it.skip('should emit tableDate event when swiped', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05'
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.trigger('touchstart')
    wrapper.trigger('touchend')
    expect(tableDate).toBeCalledWith('2005-06')
  })

  it('should calculate current date if not provided', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05'
      }
    })

    expect(wrapper.vm.currentDate).toBe(new Date().getDate())
    expect(wrapper.vm.currentMonth).toBe(new Date().getMonth())
    expect(wrapper.vm.currentYear).toBe(new Date().getFullYear())
  })

  it('should return null for selected date if not provided', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05'
      }
    })

    expect(wrapper.vm.selectedDate).toBe(null)
    expect(wrapper.vm.selectedMonth).toBe(null)
    expect(wrapper.vm.selectedYear).toBe(null)
  })

  it('should calculate active date', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        value: '2005-05-11'
      }
    })

    expect(wrapper.vm.isActive(11)).toBe(true)
    expect(wrapper.vm.isActive(12)).toBe(false)
  })

  it('should calculate active date', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-05-11'
      }
    })

    expect(wrapper.vm.isCurrent(11)).toBe(true)
    expect(wrapper.vm.isCurrent(12)).toBe(false)
  })

  it('should change tableDate when touch is called', () => {
    const wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05'
      }
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('tableDate', tableDate)

    wrapper.vm.touch(1)
    expect(tableDate).toBeCalledWith('2005-06')
    wrapper.vm.touch(-1)
    expect(tableDate).toBeCalledWith('2005-04')
  })
})
