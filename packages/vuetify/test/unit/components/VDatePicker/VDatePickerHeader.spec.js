import { compileToFunctions } from 'vue-template-compiler'
import VDatePickerHeader from '@/components/VDatePicker/VDatePickerHeader'
import { test } from '@/test'

test('VDatePickerHeader.js', ({ mount }) => {
  it('should render component and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render disabled component and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11',
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render readonly component and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11',
        readonly: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component in RTL mode and match snapshot', async () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11'
      }
    })
    wrapper.vm.$vuetify.rtl = true
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.vm.$vuetify.rtl = undefined
  })

  it('should render component with year value and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005'
      }
    })

    expect(wrapper.find('.v-date-picker-header__value strong')[0].element.textContent).toBe('2005')
  })

  it('should render prev/next icons', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005',
        prevIcon: 'foo',
        nextIcon: 'bar'
      }
    })

    expect(wrapper.find('.v-icon')[0].element.textContent).toBe('foo')
    expect(wrapper.find('.v-icon')[1].element.textContent).toBe('bar')
  })

  it('should render component with own formatter and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11',
        format: value => `(${value})`
      }
    })

    expect(wrapper.find('.v-date-picker-header__value strong')[0].element.textContent).toBe('(2005-11)')
  })

  it('should render colored component and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11',
        color: 'green lighten-1'
      }
    })

    const strong = wrapper.find('.v-date-picker-header__value strong')[0]
    expect(strong.hasClass('green--text')).toBe(true)
    expect(strong.hasClass('text--lighten-1')).toBe(true)
  })

  it('should render component with default slot and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11'
      },
      slots: {
        default: [compileToFunctions('<span>foo</span>')]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should trigger event on selector click', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11'
      }
    })

    const toggle = jest.fn()
    wrapper.vm.$on('toggle', toggle)

    wrapper.find('.v-date-picker-header__value strong')[0].trigger('click')
    expect(toggle).toBeCalled()
  })

  it('should trigger event on arrows click', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-12'
      }
    })

    const input = jest.fn()
    wrapper.vm.$on('input', input)

    wrapper.find('button')[0].trigger('click')
    expect(input).toBeCalledWith('2005-11')

    wrapper.find('button')[1].trigger('click')
    expect(input).toBeCalledWith('2006-01')
  })

  it('should calculate prev/next value', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-12'
      }
    })
    expect(wrapper.vm.calculateChange(-1)).toBe('2005-11')
    expect(wrapper.vm.calculateChange(+1)).toBe('2006-01')

    wrapper.setProps({
      value: '2005'
    })
    expect(wrapper.vm.calculateChange(-1)).toBe('2004')
    expect(wrapper.vm.calculateChange(+1)).toBe('2006')
  })

  it('should watch value and run transition', async () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: 2005
      }
    })

    wrapper.setProps({
      value: 2006
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-date-picker-header__value strong')[0].hasClass('tab-transition-enter')).toBe(true)
    expect(wrapper.find('.v-date-picker-header__value strong')[0].hasClass('tab-transition-enter-active')).toBe(true)
  })

  it('should watch value and run reverse transition', async () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: 2005
      }
    })

    wrapper.setProps({
      value: 2004
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.v-date-picker-header__value strong')[0].hasClass('tab-reverse-transition-enter')).toBe(true)
    expect(wrapper.find('.v-date-picker-header__value strong')[0].hasClass('tab-reverse-transition-enter-active')).toBe(true)
  })

})
