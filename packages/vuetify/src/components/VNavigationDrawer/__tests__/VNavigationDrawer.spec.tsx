// Components
import { VLayout } from '@/components/VLayout'
import { VNavigationDrawer } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VNavigationDrawer', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount({
      render: () => <VLayout><VNavigationDrawer /></VLayout>,
    }, {
      global: { plugins: [vuetify] },
      ...options,
    }).findComponent(VNavigationDrawer)
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
