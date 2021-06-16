// Components
import { VLazy } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

describe('VLazy', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VLazy, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should match a snapshot', async () => {
    const wrapper = mountFunction({
      slots: {
        default: '<div>foobar</div>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ modelValue: true })

    await nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ modelValue: false })

    await nextTick()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
