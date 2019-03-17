// Components
import VSelect from '../VSelect'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

describe('.ts', () => {
  type Instance = InstanceType<typeof VSelect>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
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
