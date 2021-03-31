import VDatePickerDateTable from '../VDatePickerDateTable'
import { Lang } from '../../../services/lang'
import { preset } from '../../../presets/default'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

describe('VDatePickerDateTable.ts', () => {
  type Instance = InstanceType<typeof VDatePickerDateTable>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>
  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDatePickerDateTable, {
        ...options,
        mocks: {
          $vuetify: {
            rtl: false,
            lang: new Lang(preset),
          },
        },
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        readonly: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with showWeek and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2018-02',
        current: '2005-07',
        value: null,
        firstDayOfWeek: 2,
        showWeek: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component and match snapshot for multiple selection', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        multiple: true,
        selectedDates: ['2005-11-03', '2005-11-05', '2005-11-08'],
        value: '2005-11-03',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events (array) and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        events: ['2005-05-03'],
        eventColor: 'red',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events (function) and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        events: date => date === '2005-05-03',
        eventColor: 'red',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by object and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        events: ['2005-05-03', '2005-05-04'],
        eventColor: { '2005-05-03': 'red', '2005-05-04': 'blue lighten-1' },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by function and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        events: ['2005-05-03', '2005-05-04'],
        eventColor: date => ({ '2005-05-03': 'red' }[date]),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with first day of week', function () {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        firstDayOfWeek: 2,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('should watch tableDate value and run transition', async () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
      },
    })

    wrapper.setProps({
      tableDate: '2005-06',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('table').at(0).element.className).toBe('tab-transition-enter tab-transition-enter-active')
  })

  it.skip('should watch tableDate value and run reverse transition', async () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
      },
    })

    wrapper.setProps({
      tableDate: '2005-04',
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('table').at(0).element.className).toBe('tab-reverse-transition-enter tab-reverse-transition-enter-active')
  })

  it('should emit event when date button is clicked', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.findAll('tbody button').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith('2005-05-01')
  })

  it('should not emit event when disabled month button is clicked', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        allowedDates: () => false,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.findAll('tbody button').at(0).trigger('click')
    expect(input).not.toHaveBeenCalled()
  })

  it('should emit tableDate event when scrolled and scrollable', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        scrollable: true,
      },
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('update:table-date', tableDate)

    wrapper.trigger('wheel')
    expect(tableDate).toHaveBeenCalledWith('2005-06')
  })

  it('should not emit tableDate event when scrolled and not scrollable', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
      },
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('update:table-date', tableDate)

    wrapper.trigger('wheel')
    expect(tableDate).not.toHaveBeenCalled()
  })

  it('should not emit tableDate event when scrollable but tableDate less than min', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        scrollable: true,
        min: '2005-05',
      },
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('update:table-date', tableDate)

    wrapper.trigger('wheel', { deltaY: -50 })
    expect(tableDate).not.toHaveBeenCalled()
  })

  it('should emit tableDate event when scrollable and tableDate greater than min', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
        scrollable: true,
        min: '2005-03',
      },
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('update:table-date', tableDate)

    wrapper.trigger('wheel', { deltaY: -50 })
    expect(tableDate).toHaveBeenCalledWith('2005-04')
  })

  // TODO
  it.skip('should emit tableDate event when swiped', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
      },
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('update:table-date', tableDate)

    wrapper.trigger('touchstart')
    wrapper.trigger('touchend')
    expect(tableDate).toHaveBeenCalledWith('2005-06')
  })

  it('should change tableDate when touch is called', () => {
    const wrapper = mountFunction({
      propsData: {
        tableDate: '2005-05',
      },
    })

    const tableDate = jest.fn()
    wrapper.vm.$on('update:table-date', tableDate)

    wrapper.vm.touch(1, wrapper.vm.calculateTableDate)
    expect(tableDate).toHaveBeenCalledWith('2005-06')
    wrapper.vm.touch(-1, wrapper.vm.calculateTableDate)
    expect(tableDate).toHaveBeenCalledWith('2005-04')
  })
})
