import VDatePicker from '~components/VDatePicker'
import { test } from '~util/testing'

test('VDatePicker.js', ({ mount }) => {
  it('should display the correct date in title and header', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: new Date('November 1 2005')
      }
    })

    const title = wrapper.find('.picker--date__title-date div')[0]
    const header = wrapper.find('.picker--date__header-selector-date strong')[0]

    expect(title.text()).toBe('Tue, Nov 1')
    expect(header.text()).toBe('November 2005')
  })

  it('should match snapshot with default settings', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with pick-month prop', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        pickMonth: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with dark theme', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        dark: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with allowed dates', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        allowedDates: { min: '2013-05-03', max: '2013-05-19' }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with no title', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        noTitle: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
