import { VTimePickerTitle } from '~components/VTimePicker'
import { test } from '~util/testing'

test('VTimePickerTitle.js', ({ mount }) => {
  it('should render component in 24hr', () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        value: '14:13',
        ampm: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component in 12hr', () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        value: '14:13',
        ampm: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component when selecting hour', () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        value: '14:13',
        selectingHour: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit event when clicked on am/pm', () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        value: '14:13',
        ampm: true
      }
    })

    const period = jest.fn()
    wrapper.vm.$on('period', period)

    wrapper.find('.time-picker-title__ampm span.active')[0].trigger('click')
    expect(period).not.toBeCalled()
    wrapper.find('.time-picker-title__ampm span:not(.active)')[0].trigger('click')
    expect(period).toBeCalledWith('am')
  })

  it('should emit event when clicked on hours/minutes', async () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        value: '14:13'
      }
    })

    const selectingHour = jest.fn()
    wrapper.vm.$on('selectingHour', selectingHour)

    wrapper.find('.time-picker-title__time__minute')[0].trigger('click')
    expect(selectingHour).not.toBeCalled()
    wrapper.find('.time-picker-title__time__hour')[0].trigger('click')
    expect(selectingHour).toBeCalledWith(true)
    wrapper.setProps({ selectingHour: true })
    await wrapper.vm.$nextTick()
    wrapper.find('.time-picker-title__time__minute')[0].trigger('click')
    expect(selectingHour).toBeCalledWith(false)
  })
})
