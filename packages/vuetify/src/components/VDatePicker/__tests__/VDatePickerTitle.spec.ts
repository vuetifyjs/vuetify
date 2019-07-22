import VDatePickerTitle from '../VDatePickerTitle'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VDatePickerTitle.ts', () => {
  type Instance = InstanceType<typeof VDatePickerTitle>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDatePickerTitle, options)
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        date: '2005-11-01',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        date: '2005-11-01',
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        date: '2005-11-01',
        readonly: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component when selecting year and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        date: '2005-11-01',
        selectingYear: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render year icon', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        yearIcon: 'year',
        date: '2005-11-01',
      },
    })

    expect(wrapper.findAll('.v-date-picker-title__year').at(0).html()).toMatchSnapshot()
  })

  it('should emit input event on year/date click', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '1234',
        yearIcon: 'year',
        date: '2005-11-01',
      },
    })

    const input = jest.fn(value => wrapper.setProps({ selectingYear: value }))
    wrapper.vm.$on('update:selecting-year', input)

    wrapper.findAll('.v-date-picker-title__date').at(0).trigger('click')
    expect(input).not.toHaveBeenCalled()
    wrapper.findAll('.v-date-picker-title__year').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith(true)
    wrapper.findAll('.v-date-picker-title__date').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith(false)
    wrapper.findAll('.v-date-picker-title__year').at(0).trigger('click')
    wrapper.findAll('.v-date-picker-title__year').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith(false)
  })

  it('should have the correct transition', () => {
    const wrapper = mountFunction({
      propsData: {
        year: '2018',
        date: 'Tue, Mar 3',
        value: '2018-03-03',
      },
    })

    expect(wrapper.vm.isReversing).toBe(false)

    wrapper.setProps({
      date: 'Wed, Mar 4',
      value: '2018-03-04',
    })

    expect(wrapper.vm.isReversing).toBe(false)

    wrapper.setProps({
      date: 'Wed, Mar 3',
      value: '2018-03-03',
    })

    expect(wrapper.vm.isReversing).toBe(true)
  })
})
