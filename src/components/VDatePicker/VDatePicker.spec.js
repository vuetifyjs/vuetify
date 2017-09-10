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
        type: 'month'
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

  it('should match snapshot with allowed dates and pick-month prop', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: ['2013-01', '2013-03', '2013-05', '2013-07', '2013-09']
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

  it('should match snapshot with first day of week', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        firstDayOfWeek: 2
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // Avoriaz/Jsdom (?) doesn't fully support date formatting using locale
  // This should be tested in browser env
  it('should match snapshot with locale', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        locale: 'fa-AF'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with title/header formatting functions', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: new Date('November 1 2005'),
        headerDateFormat: date => {
          return (date.getFullYear() * 2).toString() + ' ' + ['حمل', 'ثور', 'جوزا', 'سرطان',' اسد', 'سنبله' ,'میزان' ,'عقرب' ,'قوس', 'جدی' ,'دلو', 'حوت'][11-date.getMonth()]
        },
        titleDateFormat: date => {
          return (date.getFullYear() * 2).toString() + ' ' + ['حمل', 'ثور', 'جوزا', 'سرطان',' اسد', 'سنبله' ,'میزان' ,'عقرب' ,'قوس', 'جدی' ,'دلو', 'حوت'][11-date.getMonth()]
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should match snapshot with month formatting functions', () => {
    const wrapper = mount(VDatePicker, {
      propsData: {
        value: new Date('November 1 2005'),
        type: 'month',
        monthFormat: date => {
          return ['حمل', 'ثور', 'جوزا', 'سرطان',' اسد', 'سنبله' ,'میزان' ,'عقرب' ,'قوس', 'جدی' ,'دلو', 'حوت'][11-date.getMonth()]
        }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
