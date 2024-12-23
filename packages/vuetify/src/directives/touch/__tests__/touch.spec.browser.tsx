// Directives
import Touch from '../'

// Utilities
import { render } from '@testing-library/vue'
import { commands } from '@vitest/browser/context'
import { defineComponent } from 'vue'

// Types
import type { PropType } from 'vue'
import type { TouchValue } from '../'

const TestComponent = defineComponent({
  directives: { Touch },
  props: {
    value: Object as PropType<TouchValue>,
  },
  setup (props) {
    return () => (
      <div v-touch={ props.value } style="width: 200px; height: 200px; background: red;" />
    )
  },
})

describe('v-touch', () => {
  describe('calls directive handler', () => {
    it.each([
      ['down', [100, 140]],
      ['up', [100, 60]],
      ['left', [60, 100]],
      ['right', [140, 100]],
    ])('%s', async (name, to) => {
      const fn = vi.fn()
      const start = vi.fn()
      const move = vi.fn()
      const end = vi.fn()

      render(<TestComponent value={{ [name]: fn, start, move, end }} />)

      await commands.drag([100, 100], to)

      expect(fn).toHaveBeenCalled()
      expect(start).toHaveBeenCalled()
      expect(move).toHaveBeenCalled()
      expect(end).toHaveBeenCalled()
    })
  })

  describe('calls directive handler if not straight', () => {
    it.each([
      ['down', 'right', [115, 140]],
      ['up', 'left', [85, 60]],
      ['left', 'down', [60, 115]],
      ['right', 'up', [140, 85]],
    ])('%s', async (name, not, to) => {
      const fn = vi.fn()
      const nope = vi.fn()
      const start = vi.fn()
      const move = vi.fn()
      const end = vi.fn()

      render(<TestComponent value={{ [name]: fn, [not]: nope, start, move, end }} />)

      await commands.drag([100, 100], to)

      expect(fn).toHaveBeenCalled()
      expect(nope).not.toHaveBeenCalled()
      expect(start).toHaveBeenCalled()
      expect(move).toHaveBeenCalled()
      expect(end).toHaveBeenCalled()
    })
  })

  describe('does not call directive handlers if distance is too small', () => {
    it.each([
      ['down', [100, 115]],
      ['up', [100, 85]],
      ['left', [85, 100]],
      ['right', [115, 100]],
    ])('%s', async (name, to) => {
      const fn = vi.fn()
      const start = vi.fn()
      const move = vi.fn()
      const end = vi.fn()

      render(<TestComponent value={{ [name]: fn, start, move, end }} />)

      await commands.drag([100, 100], to)

      expect(fn).not.toHaveBeenCalled()
      expect(start).toHaveBeenCalled()
      expect(move).not.toHaveBeenCalled()
      expect(end).toHaveBeenCalled()
    })
  })
})
