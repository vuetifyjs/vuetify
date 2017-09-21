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

  it('should match snapshot with formatting functions', () => {
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
})
