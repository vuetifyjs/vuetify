// Components
import { VBottomNavigation } from '..'
import { VLayout } from '@/components'

// Utilities
import { createVuetify } from '@/framework'
import { mount } from '@vue/test-utils'

describe('VBottomNavigation', () => {
  const vuetify = createVuetify()

  function mountFunction (options: Record<string, any> = {}) {
    const { slots, ...props } = options

    return mount({
      render: () => (
        <VLayout>
          <VBottomNavigation
            { ...props }
            v-slots={ slots }
          />
        </VLayout>
      ),
    }, {
      global: { plugins: [vuetify] },
    }).findComponent(VBottomNavigation)
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction({
      slots: { default: () => <div>foobar</div> },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should not render content with no default slot and match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should translate off screen when not active', () => {
    const wrapper = mountFunction()
    const element = wrapper.element as HTMLElement

    expect(element.style.transform).toBe('translateY(0%)')
  })

  it.each([
    [true, 0],
    [false, 100],
  ])('should translate when modelValue is %s', async (modelValue: boolean, expected: number) => {
    const wrapper = mountFunction({ modelValue })

    const element = wrapper.element as HTMLElement

    expect(element.style.transform).toBe(`translateY(${expected}%)`)
  })

  it.each([
    [{}, 56],
    [{ density: 'comfortable' }, 48],
    [{ density: 'compact' }, 40],
    [{ height: 72 }, 72],
  ])('should have the correct height', async (props: any, expected: number) => {
    const wrapper = mountFunction(props)

    const element = wrapper.element as HTMLElement

    expect(element.style.height).toBe(`${expected}px`)
  })
})
