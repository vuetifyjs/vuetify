import VTimePickerTitle from '@/components/VTimePicker/VTimePickerTitle'
import { selectingTimes } from '@/components/VTimePicker/VTimePicker'
import { test } from '@/test'

test('VTimePickerTitle.js', ({ mount }) => {
  [true, false].forEach(useSecondsValue => {
    const useSecondsDesc = (useSecondsValue ? '. with useSeconds' : '')
    it('should render component in 24hr' + useSecondsDesc, () => {
      const wrapper = mount(VTimePickerTitle, {
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          ampm: false,
          useSeconds: useSecondsValue
        }
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render component in 12hr' + useSecondsDesc, () => {
      const wrapper = mount(VTimePickerTitle, {
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          ampm: true,
          useSeconds: useSecondsValue
        }
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render component when selecting hour' + useSecondsDesc, () => {
      const wrapper = mount(VTimePickerTitle, {
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          selecting: selectingTimes.hour,
          useSeconds: useSecondsValue
        }
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should emit event when clicked on am/pm' + useSecondsDesc, async () => {
      const wrapper = mount(VTimePickerTitle, {
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          ampm: true,
          useSeconds: useSecondsValue
        }
      })

      const period = jest.fn()
      wrapper.vm.$on('update:period', period)

      wrapper.find('.v-time-picker-title__ampm .v-picker__title__btn--active')[0].trigger('click')
      expect(period).not.toBeCalled()
      wrapper.find('.v-time-picker-title__ampm .v-picker__title__btn:not(.v-picker__title__btn--active)')[0].trigger('click')
      expect(period).toBeCalledWith('am')

      wrapper.setProps({
        hour: 2,
        minute: 13,
        second: 35,
        period: 'am'
      })
      wrapper.find('.v-time-picker-title__ampm .v-picker__title__btn:not(.v-picker__title__btn--active)')[0].trigger('click')
      expect(period).toBeCalledWith('pm')
    })

    it('should not emit event when clicked on readonly am/pm' + useSecondsDesc, async () => {
      const wrapper = mount(VTimePickerTitle, {
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          ampm: true,
          readonly: true,
          useSeconds: useSecondsValue
        }
      })

      const period = jest.fn()
      wrapper.vm.$on('update:period', period)

      wrapper.find('.v-time-picker-title__ampm .v-picker__title__btn:not(.v-picker__title__btn--active)')[0].trigger('click')
      expect(period).not.toBeCalled()
    })

    it('should emit event when clicked on hours/minutes/seconds' + useSecondsDesc, async () => {
      const wrapper = mount(VTimePickerTitle, {
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          useSeconds: useSecondsValue
        }
      })

      const selecting = jest.fn()
      wrapper.vm.$on('update:selecting', selecting)

      wrapper.find('.v-time-picker-title__time .v-picker__title__btn')[1].trigger('click')
      expect(selecting).toBeCalledWith(selectingTimes.minute)
      wrapper.find('.v-time-picker-title__time .v-picker__title__btn')[0].trigger('click')
      expect(selecting).toBeCalledWith(selectingTimes.hour)
      if (useSecondsValue) {
        wrapper.find('.v-time-picker-title__time .v-picker__title__btn')[2].trigger('click')
        expect(selecting).toBeCalledWith(selectingTimes.second)
      }
      wrapper.setProps({ selecting: selectingTimes.hour })
      await wrapper.vm.$nextTick()
      wrapper.find('.v-time-picker-title__time .v-picker__title__btn')[1].trigger('click')
      expect(selecting).toBeCalledWith(selectingTimes.minute)
    })

    it('should emit event when clicked on readonly hours/minutes' + useSecondsDesc, async () => {
      const wrapper = mount(VTimePickerTitle, {
        propsData: {
          hour: 14,
          minute: 13,
          period: 'pm',
          readonly: true,
          useSeconds: useSecondsValue
        }
      })

      const selecting = jest.fn()
      wrapper.vm.$on('update:selecting', selecting)

      wrapper.find('.v-time-picker-title__time .v-picker__title__btn')[0].trigger('click')
      expect(selecting).toBeCalledWith(selectingTimes.hour)
    })
  })
})
