import Vue from 'vue'
import VTimePickerTitle from '../VTimePickerTitle'
import { SelectingTimes } from '../VTimePicker'
import { Lang } from '../../../services/lang'
import {
  mount,
  Wrapper,
  MountOptions,
} from '@vue/test-utils'

Vue.prototype.$vuetify = {
  lang: new Lang(),
}

describe('VTimePickerTitle.ts', () => {
  type Instance = InstanceType<typeof VTimePickerTitle>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VTimePickerTitle, options)
    }
  });

  [true, false].forEach(useSecondsValue => {
    const useSecondsDesc = (useSecondsValue ? '. with useSeconds' : '')
    it('should render component in 24hr' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          ampm: false,
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render disabled component' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          disabled: true,
          hour: 14,
          minute: 13,
          period: 'pm',
          ampm: true,
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render component in 12hr' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          ampm: true,
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render component when selecting hour' + useSecondsDesc, () => {
      const wrapper = mountFunction({
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          selecting: SelectingTimes.Hour,
          useSeconds: useSecondsValue,
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should emit event when clicked on am/pm' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          ampm: true,
          useSeconds: useSecondsValue,
        },
      })

      const period = jest.fn()
      wrapper.vm.$on('update:period', period)

      wrapper.find('.v-time-picker-title__ampm .v-picker__title__btn--active').trigger('click')
      expect(period).not.toHaveBeenCalled()
      wrapper.find('.v-time-picker-title__ampm .v-picker__title__btn:not(.v-picker__title__btn--active)').trigger('click')
      expect(period).toHaveBeenCalledWith('am')

      wrapper.setProps({
        hour: 2,
        minute: 13,
        second: 35,
        period: 'am',
      })
      wrapper.find('.v-time-picker-title__ampm .v-picker__title__btn:not(.v-picker__title__btn--active)').trigger('click')
      expect(period).toHaveBeenCalledWith('pm')
    })

    it('should not emit event when clicked on readonly am/pm' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          ampm: true,
          readonly: true,
          useSeconds: useSecondsValue,
        },
      })

      const period = jest.fn()
      wrapper.vm.$on('update:period', period)

      wrapper.find('.v-time-picker-title__ampm .v-picker__title__btn:not(.v-picker__title__btn--active)').trigger('click')
      expect(period).not.toHaveBeenCalled()
    })

    it('should emit event when clicked on hours/minutes/seconds' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          hour: 14,
          minute: 13,
          second: 25,
          period: 'pm',
          useSeconds: useSecondsValue,
        },
      })

      const selecting = jest.fn()
      wrapper.vm.$on('update:selecting', selecting)

      wrapper.findAll('.v-time-picker-title__time .v-picker__title__btn').at(1).trigger('click')
      expect(selecting).toHaveBeenCalledWith(SelectingTimes.Minute)
      wrapper.findAll('.v-time-picker-title__time .v-picker__title__btn').at(0).trigger('click')
      expect(selecting).toHaveBeenCalledWith(SelectingTimes.Hour)
      if (useSecondsValue) {
        wrapper.findAll('.v-time-picker-title__time .v-picker__title__btn').at(2).trigger('click')
        expect(selecting).toHaveBeenCalledWith(SelectingTimes.Second)
      }
      wrapper.setProps({ selecting: SelectingTimes.Hour })
      await wrapper.vm.$nextTick()
      wrapper.findAll('.v-time-picker-title__time .v-picker__title__btn').at(1).trigger('click')
      expect(selecting).toHaveBeenCalledWith(SelectingTimes.Minute)
    })

    it('should emit event when clicked on readonly hours/minutes' + useSecondsDesc, async () => {
      const wrapper = mountFunction({
        propsData: {
          hour: 14,
          minute: 13,
          period: 'pm',
          readonly: true,
          useSeconds: useSecondsValue,
        },
      })

      const selecting = jest.fn()
      wrapper.vm.$on('update:selecting', selecting)

      wrapper.find('.v-time-picker-title__time .v-picker__title__btn').trigger('click')
      expect(selecting).toHaveBeenCalledWith(SelectingTimes.Hour)
    })
  })
})
