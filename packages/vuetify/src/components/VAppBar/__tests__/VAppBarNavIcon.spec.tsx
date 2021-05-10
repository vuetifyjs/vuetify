// Components
import { VAppBarNavIcon } from '..'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VAppBar', () => {
  const vuetify = createVuetify()
  function mountFunction (options = {}) {
    return mount({
      render: () => <VAppBarNavIcon />,
    }, {
      global: { plugins: [vuetify] },
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
