import VDatePickerYears from '@/components/VDatePicker/VDatePickerYears'
import { test } from '@/test'

test('VDatePickerYears.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDatePickerYears, {
      propsData: {
        value: '2000'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should respect min/max props', async () => {
    const wrapper = mount(VDatePickerYears, {
      propsData: {
        min: 1234,
        max: 1238
      }
    })

    expect(wrapper.find('li:first-child').text()).toBe('1238')
    expect(wrapper.find('li:last-child').text()).toBe('1234')
  })

  it('should not allow min to be greater then max', async () => {
    const wrapper = mount(VDatePickerYears, {
      propsData: {
        min: 1238,
        max: 1234
      }
    })
    expect(wrapper.findAll('li').length).toBe(1)
    expect(wrapper.find('li').text()).toBe('1234')
    expect(wrapper.find('li').text()).toBe('1234')
  })

  it('should emit event on year click', async () => {
    const wrapper = mount(VDatePickerYears, {
      propsData: {
        value: 1999
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.find('li.active + li').trigger('click')
    expect(input).toBeCalledWith(1998)
  })

  it('should format years', async () => {
    const wrapper = mount(VDatePickerYears, {
      propsData: {
        format: year => `(${year})`,
        min: 1001,
        max: 1001
      }
    })

    expect(wrapper.find('li').text()).toBe('(1001)')
  })
})
