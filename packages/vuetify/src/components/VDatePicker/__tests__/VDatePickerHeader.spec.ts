import VDatePickerHeader from '../VDatePickerHeader'
import { Lang } from '../../../services/lang'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import Vue from 'vue'
import { DatePickerEnum } from '../VDate'

Vue.prototype.$vuetify = {
  icons: {
    values: {
      next: 'mdi-chevron-right',
      prev: 'mdi-chevron-left',
    },
  },
}

describe('VDatePickerHeader.ts', () => {
  type Instance = InstanceType<typeof VDatePickerHeader>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options?: MountOptions<Instance>) => {
      return mount(VDatePickerHeader, {
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

  it('should render component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        readonly: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component in RTL mode and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
      },
    })

    ;(wrapper.vm as any).$vuetify.rtl = true
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    ;(wrapper.vm as any).$vuetify.rtl = undefined
  })

  it('should render prev/next icons', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005',
        prevIcon: 'foo',
        nextIcon: 'bar',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with own formatter and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        activePicker: DatePickerEnum.Date,
        value: '2005-11',
        monthFormat: value => `(${value})`,
        yearFormat: value => `<${value}>`,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      activePicker: DatePickerEnum.Month,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render colored component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        color: 'green lighten-1',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with default slot and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
      },
      slots: {
        default: '<span>foo</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should trigger activePicker event when clicking on header', () => {
    const activePicker = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        activePicker: DatePickerEnum.Date,
        value: '2005-11',
      },
      listeners: {
        'update:activePicker': activePicker,
      },
    })

    wrapper.find('.v-date-picker-header__value button').trigger('click')
    expect(activePicker).toHaveBeenCalledWith(DatePickerEnum.Month)
  })

  it('should trigger update events on arrows click', () => {
    const pickerDate = jest.fn()
    const wrapper = mountFunction({
      propsData: {
        activePicker: DatePickerEnum.Date,
        value: '2005-12',
      },
      listeners: {
        'update:pickerDate': pickerDate,
      },
    })

    wrapper.findAll('button.v-btn').at(0).trigger('click')
    expect(pickerDate).toHaveBeenCalledWith('2005-11')

    wrapper.findAll('button.v-btn').at(1).trigger('click')
    expect(pickerDate).toHaveBeenCalledWith('2006-01')

    wrapper.setProps({
      activePicker: DatePickerEnum.Month,
    })

    wrapper.findAll('button.v-btn').at(0).trigger('click')
    expect(pickerDate).toHaveBeenCalledWith('2004')

    wrapper.findAll('button.v-btn').at(1).trigger('click')
    expect(pickerDate).toHaveBeenCalledWith('2006')
  })
})
