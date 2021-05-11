// Components
import { VAppBarTitle } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VAppBarTitle', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount({
      render: () => <VAppBarTitle />,
    }, {
      global: { plugins: [vuetify] },
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
