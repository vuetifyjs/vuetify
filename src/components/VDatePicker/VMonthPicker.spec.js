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
})
