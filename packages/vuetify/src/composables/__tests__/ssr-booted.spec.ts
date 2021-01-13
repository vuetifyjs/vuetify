// Utilities
import { useSSRBooted } from '../ssr-booted'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { waitAnimationFrame } from '../../../test'

describe('ssr-booted.ts', () => {
  it('should set isBooted ref to true', async () => {
    const wrapper = mount({
      setup () {
        const root = ref(null)

        const { isBooted } = useSSRBooted({ el: root })

        return { root, isBooted }
      },
      template: '<div ref="root">{{ isBooted }}</div>',
    })

    await waitAnimationFrame()

    expect(wrapper.html()).toEqual('<div data-booted="true">true</div>')
  })
})
