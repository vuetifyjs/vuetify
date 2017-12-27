import { test } from '@/util/testing'
import VTab from './VTab'

const tabClick = 'Injection "tabClick" not found'
const tabsWarning = 'The v-tab component must be used inside a v-tabs.'

test('VTab', ({ mount }) => {
  it('should render a div when disabled', async () => {
    const wrapper = mount(VTab, {
      propsData: {
        href: '#foo'
      }
    })

    expect(wrapper.find('.tabs__item')[0].vNode.elm.tagName).toBe('A')
    wrapper.setProps({ disabled: true })
    expect(wrapper.find('.tabs__item')[0].vNode.elm.tagName).toBe('DIV')

    expect(tabClick).toHaveBeenWarned()
    expect(tabsWarning).toHaveBeenTipped()
  })

  it('should register and unregister', async () => {
    const register = jest.fn()
    const unregister = jest.fn()
    const wrapper = mount({
      provide: {
        tabs: {
          register,
          unregister
        }
      },
      render (h) {
        return h('div', this.$slots.default)
      }
    }, {
      slots: {
        default: [VTab]
      }
    })

    const item = wrapper.find(VTab)[0]
    item.destroy()

    expect(register).toHaveBeenCalled()
    expect(unregister).toHaveBeenCalled()
    expect(tabClick).toHaveBeenWarned()
  })
})
