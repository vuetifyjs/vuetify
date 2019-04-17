import VDatePickerMonthTable from '../VDatePickerMonthTable'
import { Lang } from '../../../services/lang'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { createNativeLocaleFormatter } from '../util'
import { touch } from '../../../../test'

describe('VDatePickerMonthTable.ts', () => {
  type Instance = InstanceType<typeof VDatePickerMonthTable>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  const dateFormat = createNativeLocaleFormatter('en-US', { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 })

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDatePickerMonthTable, {
        ...options,
        mocks: {
          $vuetify: {
            lang: new Lang(),
          },
        },
      })
    }
  })

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        showCurrent: '2005-05',
        pickerDate: '2005-01',
        value: ['2005-11'],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with disabled months and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        showCurrent: '2005-05',
        pickerDate: '2005-01',
        value: ['2005-11'],
        allowedDates: v => ['2005-05', '2005-01'].includes(v),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component and match snapshot (multiple)', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        showCurrent: '2005-05',
        pickerDate: '2005-01',
        value: ['2005-10', '2005-11'],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit event when month button is clicked', () => {
    const month = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-01',
        current: '2005-05',
        value: ['2005-11'],
      },
      listeners: {
        'update:month': month,
      },
    })

    wrapper.find('tbody button').trigger('click')
    expect(month).toHaveBeenCalledWith('2005-01')
  })

  it('should not emit event when disabled month button is clicked', () => {
    const month = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-01',
        current: '2005-05',
        value: ['2005-11'],
        allowedDates: () => false,
      },
      listeners: {
        'update:month': month,
      },
    })

    wrapper.find('tbody button').trigger('click')
    expect(month).not.toHaveBeenCalled()
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
    expect(date).toHaveBeenCalledWith('2006-01')
  })

  it('should not emit pickerDate event when scrolled and not scrollable', () => {
    const pickerDate = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-01',
      },
      listeners: {
        'update:pickerDate': pickerDate,
      },
    })

    wrapper.trigger('wheel')
    expect(pickerDate).not.toHaveBeenCalled()
  })

  it('should emit pickerDate event when swiped', () => {
    const pickerDate = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-01',
      },
      listeners: {
        'update:pickerDate': pickerDate,
      },
    })

    touch(wrapper).start(0, 0).end(50, 0)

    expect(pickerDate).toHaveBeenCalledWith('2004-01')

    touch(wrapper).start(50, 0).end(0, 0)

    expect(pickerDate).toHaveBeenCalledWith('2006-01')
  })

  it('should render component with events (array) and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-01',
        events: ['2005-07', '2005-11'],
        eventColor: 'red',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events (function) and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-01',
        events: date => date === '2005-07' || date === '2005-11',
        eventColor: 'red',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by object and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-01',
        events: ['2005-07', '2005-11'],
        eventColor: { '2005-07': 'red', '2005-11': 'blue lighten-1' },
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with events colored by function and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        dateFormat,
        pickerDate: '2005-01',
        events: ['2005-07', '2005-11'],
        eventColor: date => ({ '2005-07': 'red', '2005-11': 'blue lighten-1' }[date]),
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
