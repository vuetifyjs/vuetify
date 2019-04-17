import VDatePickerTitle from '../VDatePickerTitle'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { DatePickerEnum } from '../VDate'

describe('VDatePickerTitle.ts', () => {
  type Instance = InstanceType<typeof VDatePickerTitle>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  const yearFormat = v => v.slice(0, 4)
  const dateFormat = v => v[0].slice(5)

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDatePickerTitle, options)
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        yearFormat,
        dateFormat,
        value: ['2005-11-01'],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        yearFormat,
        dateFormat,
        value: ['2005-11-01'],
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        yearFormat,
        dateFormat,
        value: ['2005-11-01'],
        readonly: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component when selecting year and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        yearFormat,
        dateFormat,
        value: ['2005-11-01'],
        selectingYear: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render year icon', () => {
    const wrapper = mountFunction({
      propsData: {
        yearFormat,
        dateFormat,
        value: ['2005-11-01'],
        yearIcon: 'year',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit input event on year/date click', async () => {
    const wrapper = mountFunction({
      propsData: {
        yearFormat,
        dateFormat,
        value: ['2005-11-01'],
      },
    })

    const date = wrapper.find('.v-date-picker-title__date')
    const year = wrapper.find('.v-date-picker-title__year')
    const activePicker = jest.fn(value => wrapper.setProps({ selectingYear: value }))
    wrapper.vm.$on('update:activePicker', activePicker)

    date.trigger('click')
    await wrapper.vm.$nextTick()

    expect(activePicker).not.toHaveBeenCalled()

    year.trigger('click')
    await wrapper.vm.$nextTick()

    expect(activePicker).toHaveBeenCalledWith(DatePickerEnum.Year)

    date.trigger('click')
    await wrapper.vm.$nextTick()

    expect(activePicker).toHaveBeenCalledWith(DatePickerEnum.Date)
  })

  it('should have the correct transition', async () => {
    const wrapper = mountFunction({
      propsData: {
        yearFormat,
        dateFormat,
        value: ['2018-03-03'],
      },
    })

    expect(wrapper.vm.isReversing).toBe(false)

    wrapper.setProps({
      value: ['2018-03-04'],
    })

    expect(wrapper.vm.isReversing).toBe(false)

    wrapper.setProps({
      value: ['2018-03-03'],
    })

    expect(wrapper.vm.isReversing).toBe(true)
  })
})
