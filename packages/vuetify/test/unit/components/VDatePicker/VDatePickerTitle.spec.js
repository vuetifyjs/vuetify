import { test } from '@/test'
import VDatePickerTitle from '@/components/VDatePicker/VDatePickerTitle'

test('VDatePickerTitle.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDatePickerTitle, {
      propsData: {
        year: '1234',
        date: '2005-11-01'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component when selecting year and match snapshot', () => {
    const wrapper = mount(VDatePickerTitle, {
      propsData: {
        year: '1234',
        date: '2005-11-01',
        selectingYear: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render year icon', () => {
    const wrapper = mount(VDatePickerTitle, {
      propsData: {
        year: '1234',
        yearIcon: 'year',
        date: '2005-11-01'
      }
    })

    expect(wrapper.find('.v-date-picker-title__year')[0].html()).toMatchSnapshot()
  })

  it('should emit input event on year/date click', () => {
    const wrapper = mount(VDatePickerTitle, {
      propsData: {
        year: '1234',
        yearIcon: 'year',
        date: '2005-11-01'
      }
    })

    const input = jest.fn(value => wrapper.setProps({ selectingYear: value }))
    wrapper.vm.$on('update:selectingYear', input)

    wrapper.find('.v-date-picker-title__date')[0].trigger('click')
    expect(input).not.toBeCalled()
    wrapper.find('.v-date-picker-title__year')[0].trigger('click')
    expect(input).toBeCalledWith(true)
    wrapper.find('.v-date-picker-title__date')[0].trigger('click')
    expect(input).toBeCalledWith(false)
    wrapper.find('.v-date-picker-title__year')[0].trigger('click')
    wrapper.find('.v-date-picker-title__year')[0].trigger('click')
    expect(input).toBeCalledWith(false)
  })

  it('should have the correct transition', () => {
    const wrapper = mount(VDatePickerTitle, {
      propsData: {
        year: '2018',
        date: 'Tue, Mar 3',
        value: '2018-03-03'
      }
    })

    expect(wrapper.vm.isReversing).toBe(false)

    wrapper.setProps({
      date: 'Wed, Mar 4',
      value: '2018-03-04'
    })

    expect(wrapper.vm.isReversing).toBe(false)

    wrapper.setProps({
      date: 'Wed, Mar 3',
      value: '2018-03-03'
    })

    expect(wrapper.vm.isReversing).toBe(true)
  })
})
