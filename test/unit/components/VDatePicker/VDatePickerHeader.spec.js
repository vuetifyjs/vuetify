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

  it('should render component with year value and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005'
      }
    })

    expect(wrapper.find('.v-date-picker-header__value strong').text()).toBe('2005')
  })

  it('should render prev/next icons', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005',
        prevIcon: 'foo',
        nextIcon: 'bar'
      }
    })

    expect(wrapper.find('.v-icon').text()).toBe('foo')
    expect(wrapper.findAll('.v-icon')[1].text()).toBe('bar')
  })

  it('should render component with own formatter and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11',
        format: value => `(${value})`
      }
    })

    expect(wrapper.find('.v-date-picker-header__value strong').text()).toBe('(2005-11)')
  })

  it('should render colored component and match snapshot', () => {
    const wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11',
        color: 'green lighten-1'
      }
    })

    const strong = wrapper.find('.v-date-picker-header__value strong')
    expect(strong.classes()).toContain('green--text')
    expect(strong.classes()).toContain('text--lighten-1')
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

    wrapper.find('.v-date-picker-header__value strong').trigger('click')
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

    wrapper.find('button').trigger('click')
    expect(input).toBeCalledWith('2005-11')

    wrapper.findAll('button')[1].trigger('click')
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
    expect(wrapper.find('.v-date-picker-header__value strong').classes()).toContain('tab-transition-enter')
    expect(wrapper.find('.v-date-picker-header__value strong').classes()).toContain('tab-transition-enter-active')
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
    expect(wrapper.find('.v-date-picker-header__value strong').classes()).toContain('tab-reverse-transition-enter')
    expect(wrapper.find('.v-date-picker-header__value strong').classes()).toContain('tab-reverse-transition-enter-active')
  })

})
