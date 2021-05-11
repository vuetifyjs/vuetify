// Components
import { VAppBar } from '..'
import { VLayout } from '@/components'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VAppBar', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount({
      render: () => (
        <VLayout>
          <VAppBar { ...options } />
        </VLayout>
      ),
    }, {
      global: { plugins: [vuetify] },
    }).findComponent(VAppBar)
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([
    [{}, 64],
    [{ density: 'comfortable' }, 56],
    [{ density: 'compact' }, 48],
    [{ height: 72 }, 72],
    [{ prominent: true }, 128],
    [{ prominent: true, prominentHeight: 164 }, 164],
  ])('should have the correct height', async (props: any, expected: number) => {
    const wrapper = mountFunction(props)

    const element = wrapper.element as HTMLElement

    expect(element.style.height).toBe(`${expected}px`)
  })

  it('should render image', () => {
    const wrapper = mountFunction({ image: 'foo.png' })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
