import { VMaskInput } from '../VMaskInput'

// Utilities
import { render, screen } from '@test'
import { ref } from 'vue'

describe('VMaskInput', () => {
  it('should mask model-value but keep v-model intact', async () => {
    const inputValue = ref('4567')
    render(() => (
      <VMaskInput
        v-model={ inputValue.value }
        mask="(###) #"
      />
    ))

    await expect.element(screen.getByCSS('input')).toHaveValue('(456) 7')
    expect(inputValue.value).toBe('4567')
  })

  it('should mask model-value and also return v-model to be masked value', async () => {
    const inputValue = ref('4567')
    render(() => (
      <VMaskInput
        v-model={ inputValue.value }
        mask="(###) #"
        returnMaskedValue
      />
    ))

    await expect.element(screen.getByCSS('input')).toHaveValue('(456) 7')
    expect(inputValue.value).toBe('(456) 7')
  })
})
