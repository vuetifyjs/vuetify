// Components
import { VDateInput } from '../VDateInput'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

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

  describe('parseDateString', () => {
    const testCases = [
      {
        format: 'YYYY-MM-DD',
        input: '2024-03-15',
        expected: { year: 2024, month: 2, day: 15 },
      },
      {
        format: 'MM/DD/YYYY',
        input: '03/15/2024',
        expected: { year: 2024, month: 2, day: 15 },
      },
      {
        format: 'DD-MM-YYYY',
        input: '15-03-2024',
        expected: { year: 2024, month: 2, day: 15 },
      },
      {
        format: 'YYYY-MM-DD',
        input: '2023-02-29',
        expected: { year: 2023, month: 2, day: 1 },
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-02-29',
        expected: { year: 2024, month: 1, day: 29 },
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-12-31',
        expected: { year: 2024, month: 11, day: 31 },
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-01-01',
        expected: { year: 2024, month: 0, day: 1 },
      },
      {
        format: (value: string) => new Date(2024, 0, 1),
        input: '2024-01-01',
        expected: { year: 2024, month: 0, day: 1 },
      },
    ]

    testCases.forEach(({ format, input, expected }) => {
      it(`should select date with ${format} format`, async () => {
        const wrapper = mountFunction(
          <VDateInput
            inputFormat={ format }
            modelValue={ null }
          />
        )

        const inputElement = wrapper.find('input')
        await inputElement.trigger('click')
        await inputElement.trigger('focus')
        await inputElement.setValue(input)
        await inputElement.trigger('keydown', { key: 'Enter' })

        const date = wrapper.emitted('update:modelValue')![0][0] as Date
        expect(date.getFullYear()).toBe(expected.year)
        expect(date.getMonth()).toBe(expected.month)
        expect(date.getDate()).toBe(expected.day)
      })
    })

    const invalidTestCases = [
      {
        format: 'YYYY-MM-DD',
        input: 'invalid-date',
        description: 'invalid date string',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-13-45',
        description: 'out of range date',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-00-01',
        description: 'zero month',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-01-00',
        description: 'zero day',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-12-32',
        description: 'day exceeds 31',
      },
      {
        format: 'YYYY-MM-DD',
        input: '2024-13-01',
        description: 'month exceeds year length',
      },
    ]

    invalidTestCases.forEach(({ format, input, description }) => {
      it(`should handle ${description}`, async () => {
        const wrapper = mountFunction(
          <VDateInput
            inputFormat={ format }
            modelValue={ null }
          />
        )

        const inputElement = wrapper.find('input')
        await inputElement.trigger('click')
        await inputElement.trigger('focus')
        await inputElement.setValue(input)
        await inputElement.trigger('keydown', { key: 'Enter' })

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      })
    })

    it(`should reset if empty string is inputted`, async () => {
      const wrapper = mountFunction(
        <VDateInput
          modelValue={ new Date() }
        />
      )

      const inputElement = wrapper.find('input')
      await inputElement.trigger('click')
      await inputElement.trigger('focus')
      await inputElement.setValue('')
      await inputElement.trigger('keydown', { key: 'Enter' })

      const date = wrapper.emitted('update:modelValue')![0][0] as Date
      expect(date).toBeNull()
    })
  })

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
})
