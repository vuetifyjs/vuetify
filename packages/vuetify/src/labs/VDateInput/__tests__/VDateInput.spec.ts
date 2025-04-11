import { VDateInput } from '../VDateInput'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

// Types
import type { VueWrapper } from '@vue/test-utils'
import type { ComponentPublicInstance } from 'vue'

// Mock ResizeObserver
class ResizeObserver {
  observe () {}
  unobserve () {}
  disconnect () {}
}
global.ResizeObserver = ResizeObserver

describe('VDateInput', () => {
  const vuetify = createVuetify()

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('update-on prop', () => {
    const TEST_DATE = '2025-01-01'

    interface MountOptions {
      updateOn?: ('blur' | 'enter')[]
      modelValue?: string | null
    }

    function mountFunction (options: MountOptions = {}): VueWrapper<ComponentPublicInstance> {
      return mount(VDateInput, {
        global: {
          plugins: [vuetify],
        },
        props: {
          updateOn: options.updateOn ?? [],
          modelValue: options.modelValue ?? null,
        },
      })
    }

    it('should update modelValue only on enter key press', async () => {
      const wrapper = mountFunction({ updateOn: ['enter'] })
      const input = wrapper.find('input')

      await input.trigger('click')
      await input.trigger('focus')
      await input.setValue(TEST_DATE)

      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()

      await input.trigger('blur')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    })

    it('should update modelValue only on blur event', async () => {
      const wrapper = mountFunction({ updateOn: ['blur'] })
      const input = wrapper.find('input')

      await input.trigger('click')
      await input.trigger('focus')
      await input.setValue(TEST_DATE)

      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()

      await input.trigger('blur')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('should update modelValue on both enter key press and blur event', async () => {
      const wrapper = mountFunction({ updateOn: ['enter', 'blur'] })
      const input = wrapper.find('input')

      await input.trigger('click')
      await input.trigger('focus')
      await input.setValue(TEST_DATE)

      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()

      await input.trigger('blur')
      expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
    })

    it('should make the input readonly and prevent value updates', async () => {
      const wrapper = mountFunction({ updateOn: [] })
      const input = wrapper.find('input')

      expect(input.attributes('readonly')).toBeDefined()
      expect(input.element.readOnly).toBe(true)

      await input.trigger('click')
      await input.trigger('focus')

      await input.setValue(TEST_DATE)
      await input.trigger('keydown', { key: 'Enter' })
      await input.trigger('blur')

      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })
})
