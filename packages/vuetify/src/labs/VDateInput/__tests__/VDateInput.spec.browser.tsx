import { VDateInput } from '../VDateInput'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'
import { render, screen, userEvent } from '@test'

// global.ResizeObserver = require('resize-observer-polyfill')

describe('VDateInput', () => {
  const vuetify = createVuetify()

  afterEach(() => {
    vi.clearAllMocks()
  })

  function mountFunction (component: any, options = {}) {
    return mount(component, {
      global: {
        plugins: [vuetify],
      },
      ...options,
    })
  }

  describe('update-on prop', () => {
    const TEST_DATE = '2025-01-01'

    it('should update modelValue only on enter key press', async () => {
      const wrapper = mountFunction(
        <VDateInput
          updateOn={['enter']}
          modelValue={ null }
        />
      )
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
      const wrapper = mountFunction(
        <VDateInput
          updateOn={['blur']}
          modelValue={ null }
        />
      )
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
      const wrapper = mountFunction(
        <VDateInput
          updateOn={['enter', 'blur']}
          modelValue={ null }
        />
      )
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
      const wrapper = mountFunction(
        <VDateInput
          updateOn={[]}
          modelValue={ null }
        />
      )
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

  describe('typing values', () => {
    it.each([
      { multiple: false, typing: '07/01/2022', expected: '07/01/2022' },
      { multiple: false, typing: '4/15/26', expected: '04/15/2026' },
      { multiple: 'range', typing: '07/01/2022', expected: '07/01/2022 - 07/01/2022' },
      { multiple: 'range', typing: '4/15/26', expected: '04/15/2026 - 04/15/2026' },
      { multiple: 'range', typing: '05/02/2025 - 05/14/2025', expected: '05/02/2025 - 05/14/2025' },
      { multiple: true, typing: '07/01/2022', expected: '1 selected' },
      { multiple: true, typing: '05/02/2025 05/14/2025', expected: '2 selected' },
      { multiple: true, typing: '4/15/25 04/22/25 04/15/25', expected: '3 selected' },
    ])('should accept pasted and typed values', async ({ multiple, typing, expected }) => {
      const { element } = render(() => <VDateInput multiple={ multiple } />)
      const input = screen.getByCSS('input')
      await userEvent.click(element)
      await userEvent.keyboard(typing)
      await userEvent.click(document.body)
      expect(input).toHaveValue(expected)
    })

    it.each([
      { multiple: false, initial: '05/16/2025', typing: '←←←←←×2', expected: '05/12/2025' },
      { multiple: 'range', initial: '05/16/2025 - 05/24/2025', typing: '←←←←←××3', expected: '05/03/2025 - 05/16/2025' },
    ])('should accept changes typed from keyboard', async ({ multiple, initial, typing, expected }) => {
      const { element } = render(() => <VDateInput multiple={ multiple } />)
      const input = screen.getByCSS('input')
      await userEvent.click(element)
      await userEvent.keyboard(`${initial}{Enter}`)
      expect(input).toHaveValue(initial)
      const typingSequence = typing
        .replaceAll('←', '{ArrowLeft}')
        .replaceAll('×', '{Backspace}')
      await userEvent.keyboard(typingSequence)
      await userEvent.click(document.body)
      expect(input).toHaveValue(expected)
    })
  })
})
