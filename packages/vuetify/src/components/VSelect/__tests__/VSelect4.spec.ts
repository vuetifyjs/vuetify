// Components
import VSelect from '../VSelect'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'
import { rafPolyfill } from '../../../../test'

describe('.ts', () => {
  type Instance = InstanceType<typeof VSelect>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let el

  (global as any).performance = {
    now: () => {}
  }
  rafPolyfill(window)

  beforeEach(() => {
    mountFunction = (options = {}) => {
      el = document.createElement('div')
      el.setAttribute('data-app', 'true')
      document.body.appendChild(el)
      return mount(VSelect, {
        ...options,
        mocks: {
          $vuetify: {
            lang: {
              t: (val: string) => val
            },
            theme: {
              dark: false
            }
          }
        }
      })
    }
  })

  it('should not call change when model updated externally', async () => {
    const change = jest.fn()
    const wrapper = mountFunction()

    wrapper.vm.$on('change', change)

    wrapper.setProps({ value: 'bar' })

    expect(change).not.toHaveBeenCalled()

    wrapper.vm.setValue('foo')

    expect(change).toHaveBeenCalledWith('foo')
    expect(change).toHaveBeenCalledTimes(1)
  })

  // https://github.com/vuetifyjs/vuetify/issues/4713
  it('should nudge select menu', () => {
    const wrapper = mountFunction({
      propsData: {
        menuProps: {
          nudgeTop: 5,
          nudgeRight: 5,
          nudgeBottom: 5,
          nudgeLeft: 5
        }
      }
    })

    const menu = wrapper.vm.$refs.menu

    expect(menu.nudgeTop).toBe(5)
    expect(menu.nudgeRight).toBe(5)
    expect(menu.nudgeBottom).toBe(5)
    expect(menu.nudgeLeft).toBe(5)
  })

  // https://github.com/vuetifyjs/vuetify/issues/5774
  it('should close menu on tab down when no selectedIndex', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['foo', 'bar']
      }
    })

    const menu = wrapper.find('.v-input__slot')
    const input = wrapper.find('input')

    menu.trigger('click')

    expect(wrapper.vm.isFocused).toBe(true)
    expect(wrapper.vm.isMenuActive).toBe(true)

    input.trigger('keydown.tab')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.isFocused).toBe(false)
    expect(wrapper.vm.isMenuActive).toBe(false)
  })
  // https://github.com/vuetifyjs/vuetify/issues/4853
  it('should select item after typing its first few letters', async () => {
    const wrapper = mountFunction({
      propsData: {
        items: ['aaa', 'foo', 'faa']
      }
    })

    const input = wrapper.find('input')
    input.trigger('focus')
    await wrapper.vm.$nextTick()

    input.trigger('keypress', { key: 'f' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual('foo')

    input.trigger('keypress', { key: 'a' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.internalValue).toEqual('faa')
  })
})
