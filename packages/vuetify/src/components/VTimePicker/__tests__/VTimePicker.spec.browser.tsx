// Components
import { VTimePicker } from '../VTimePicker'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VTimePicker', () => {
  describe('variant input', () => {
    it('constrains typing to emit valid time', async () => {
      const model = ref<string | null>(null)
      render(() => (
        <VTimePicker
          v-model={ model.value }
          variant="input"
        />
      ))

      const input = screen.getAllByCSS('input')
      await userEvent.click(input[0])
      await userEvent.keyboard('7')
      await userEvent.click(input[1])
      await userEvent.keyboard('5')

      expect(model.value).toBe('07:05')
      await userEvent.keyboard('2')
      expect(model.value).toBe('07:52')
      await userEvent.keyboard('4')
      expect(model.value).toBe('07:04')
      await userEvent.keyboard('9')
      expect(model.value).toBe('07:49')
      await userEvent.keyboard('8')
      expect(model.value).toBe('07:08')
      await userEvent.keyboard('8')
      expect(model.value).toBe('07:08') // ignored, cannot set 88

      await userEvent.click(input[0])
      await userEvent.keyboard('3')
      expect(model.value).toBe('03:08')
      await userEvent.keyboard('1')
      expect(model.value).toBe('01:08')
      await userEvent.keyboard('2')
      expect(model.value).toBe('00:08') // 12:08 AM
      await userEvent.keyboard('2')
      expect(model.value).toBe('02:08')
      await userEvent.keyboard('2')
      expect(model.value).toBe('02:08') // ignored, cannot set 22
    })

    it('emits correct value when using arrows up/down', async () => {
      const model = ref<string | null>('00:02')
      render(() => (
        <VTimePicker
          v-model={ model.value }
          variant="input"
        />
      ))

      const input = screen.getAllByCSS('input')
      await userEvent.click(input[0])
      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe('23:02') // cycle hours
      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe('00:02')
      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe('01:02')

      await userEvent.click(input[1])
      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe('01:01')
      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe('01:00')
      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe('01:59') // cycle minutes
      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe('01:00')
    })
  })
})
