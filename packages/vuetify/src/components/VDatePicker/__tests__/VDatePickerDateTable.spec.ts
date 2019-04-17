import VDatePickerDateTable from '../VDatePickerDateTable'
import { Lang } from '../../../services/lang'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'

const dateFormat = v => parseInt(v.slice(-2), 10)

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
            lang: new Lang(),
          },
        },
      })
    }
  })

  it('should render default component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
        value: ['2005-11-03'],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
        value: [],
        readonly: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
        value: ['2005-11-03'],
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with showWeek and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2018-02',
        value: [],
        showWeek: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component and match snapshot for multiple selection', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-11',
        value: ['2005-11-03', '2005-11-05'],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events (array) and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
        value: [],
        events: ['2005-05-03'],
        eventColor: 'red',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events (function) and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
        value: [],
        events: date => date === '2005-05-03',
        eventColor: 'red',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by object and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
        value: [],
        events: ['2005-05-03', '2005-05-04'],
        eventColor: { '2005-05-03': 'red', '2005-05-04': 'blue lighten-1' },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by function and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
        value: [],
        events: ['2005-05-03', '2005-05-04'],
        eventColor: date => ({ '2005-05-03': 'red' }[date]),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with first day of week', function () {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
        value: ['2005-11-03'],
        firstDayOfWeek: 2,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit event when date button is clicked', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
        current: '2005-07',
        value: ['2005-11-03'],
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
        dateFormat,
        pickerDate: '2005-05',
        value: ['2005-11-03'],
        allowedDates: () => false,
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.findAll('tbody button').at(0).trigger('click')
    expect(input).not.toHaveBeenCalled()
  })

  it('should emit pickerDate event when scrolled and scrollable', () => {
    const date = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-01',
        current: '2005-05',
        value: ['2005-11'],
        scrollable: true,
      },
      listeners: {
        'update:pickerDate': date,
      },
    })

    wrapper.trigger('wheel')
    expect(date).toHaveBeenCalledWith('2005-02')
  })

  it('should not emit pickerDate event when scrolled and not scrollable', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-05',
      },
    })

    const pickerDate = jest.fn()
    wrapper.vm.$on('pickerDate', pickerDate)

    wrapper.trigger('wheel')
    expect(pickerDate).not.toHaveBeenCalled()
  })

  // TODO
  it.skip('should emit pickerDate event when swiped', () => {
    const wrapper = mountFunction({
      propsData: {
        pickerDate: '2005-05',
      },
    })

    const pickerDate = jest.fn()
    wrapper.vm.$on('pickerDate', pickerDate)

    wrapper.trigger('touchstart')
    wrapper.trigger('touchend')
    expect(pickerDate).toHaveBeenCalledWith('2005-06')
  })
})
