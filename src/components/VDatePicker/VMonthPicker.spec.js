import { VMonthPicker } from '~components/VDatePicker'
import { test } from '~util/testing'

test('VMonthPicker.js', ({ mount }) => {
  it('should display the correct date in title and header', () => {
    const wrapper = mount(VMonthPicker, {
      propsData: {
        value: '2014-10'
      }
    })

    const title = wrapper.find('.picker--date__title-date div')[0]
    const header = wrapper.find('.picker--date__header-selector-date strong')[0]

    expect(title.text()).toBe('October')
    expect(header.text()).toBe('2014')
  })

  it('should match snapshot with default settings', () => {
    const wrapper = mount(VMonthPicker, {
      propsData: {
        value: '2013-05'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with dark theme', () => {
    const wrapper = mount(VMonthPicker, {
      propsData: {
        value: '2013-05',
        dark: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with allowed dates', () => {
    const wrapper = mount(VMonthPicker, {
      propsData: {
        value: '2013-05',
        allowedDates: { min: '2013-03', max: '2013-10' }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with no title', () => {
    const wrapper = mount(VMonthPicker, {
      propsData: {
        value: '2013-05',
        noTitle: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
