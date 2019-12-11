import VDatePickerHeader from '../VDatePickerHeader'
import { Lang } from '../../../services/lang'
import { preset } from '../../../presets/default'
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import Vue from 'vue'

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
            lang: new Lang(preset),
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
    wrapper.vm.$vuetify.rtl = true
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.vm.$vuetify.rtl = undefined
  })

  it('should render component with year value and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005',
      },
    })

    expect(wrapper.findAll('.v-date-picker-header__value div').at(0).element.textContent).toBe('2005')
  })

  it('should render prev/next icons', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005',
        prevIcon: 'foo',
        nextIcon: 'bar',
      },
    })

    expect(wrapper.findAll('.v-icon').at(0).element.textContent).toBe('foo')
    expect(wrapper.findAll('.v-icon').at(1).element.textContent).toBe('bar')
  })

  it('should render component with own formatter and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        format: value => `(${value})`,
      },
    })

    expect(wrapper.findAll('.v-date-picker-header__value div').at(0).element.textContent).toBe('(2005-11)')
  })

  it('should render colored component and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
        color: 'green lighten-1',
      },
    })

    const div = wrapper.findAll('.v-date-picker-header__value div').at(0)
    expect(div.classes('green--text')).toBe(true)
    expect(div.classes('text--lighten-1')).toBe(true)
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

  it('should trigger event on selector click', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-11',
      },
    })

    const toggle = jest.fn()
    wrapper.vm.$on('toggle', toggle)

    wrapper.findAll('.v-date-picker-header__value button').at(0).trigger('click')
    expect(toggle).toHaveBeenCalled()
  })

  it('should trigger event on arrows click', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-12',
      },
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.findAll('button.v-btn').at(0).trigger('click')
    expect(input).toHaveBeenCalledWith('2005-11')

    wrapper.findAll('button.v-btn').at(1).trigger('click')
    expect(input).toHaveBeenCalledWith('2006-01')
  })

  it('should calculate prev/next value', () => {
    const wrapper = mountFunction({
      propsData: {
        value: '2005-12',
      },
    })
    expect(wrapper.vm.calculateChange(-1)).toBe('2005-11')
    expect(wrapper.vm.calculateChange(+1)).toBe('2006-01')

    wrapper.setProps({
      value: '2005',
    })
    expect(wrapper.vm.calculateChange(-1)).toBe('2004')
    expect(wrapper.vm.calculateChange(+1)).toBe('2006')
  })

  it.skip('should watch value and run transition', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 2005,
      },
    })

    wrapper.setProps({
      value: 2006,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.v-date-picker-header__value div').at(0).classes('tab-transition-enter')).toBe(true)
    expect(wrapper.findAll('.v-date-picker-header__value div').at(0).classes('tab-transition-enter-active')).toBe(true)
  })

  it.skip('should watch value and run reverse transition', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: 2005,
      },
    })

    wrapper.setProps({
      value: 2004,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.v-date-picker-header__value div').at(0).classes('tab-reverse-transition-enter')).toBe(true)
    expect(wrapper.findAll('.v-date-picker-header__value div').at(0).classes('tab-reverse-transition-enter-active')).toBe(true)
  })
})
