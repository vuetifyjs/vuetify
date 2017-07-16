import { test } from '~util/testing'
import Checkbox from '~components/selection-controls/Checkbox'

test('Checkbox.js', ({ mount }) => {
  it('should return true when clicked', () => {
    const wrapper = mount(Checkbox, {
      propsData: {
        inputValue: false
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)
    wrapper.find('.input-group--selection-controls__ripple')[0].trigger('click')

    expect(change).toBeCalledWith(true)
  })

  it('should return a value when clicked with a specified value', () => {
    const wrapper = mount(Checkbox, {
      propsData: {
        value: 'John',
        inputValue: null
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)
    wrapper.find('.input-group--selection-controls__ripple')[0].trigger('click')

    expect(change).toBeCalledWith('John')
  })

  it('should return null when clicked with a specified value', () => {
    const wrapper = mount(Checkbox, {
      propsData: {
        value: 'John',
        inputValue: 'John'
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)
    wrapper.find('.input-group--selection-controls__ripple')[0].trigger('click')

    expect(change).toBeCalledWith(null)
  })
})