// Components
import { VCommandPalette } from '../VCommandPalette'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

// Test data
const basicItems = [
  {
    id: 'item1',
    title: 'First Item',
    subtitle: 'First item subtitle',
    value: 'first',
    handler: vi.fn(),
  },
  {
    id: 'item2',
    title: 'Second Item',
    subtitle: 'Second item subtitle',
    value: 'second',
    handler: vi.fn(),
  },
  {
    id: 'item3',
    title: 'Third Item',
    value: 'third',
    handler: vi.fn(),
  },
]

describe('VCommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Core Functionality & Rendering', () => {
    it('should render the dialog when modelValue is true', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          title="Test Palette"
          placeholder="Search items..."
        />
      ))

      await expect(screen.findByRole('dialog')).resolves.toBeVisible()
      await expect(screen.findByText('Test Palette')).resolves.toBeVisible()
      await expect(screen.findByPlaceholderText('Search items...')).resolves.toBeVisible()
      await expect(screen.findByText('First Item')).resolves.toBeVisible()
    })

    it('should not render when modelValue is false', async () => {
      const model = ref(false)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          title="Test Palette"
        />
      ))

      expect(screen.queryByRole('dialog')).toBeNull()
      expect(screen.queryByText('Test Palette')).toBeNull()
    })

    it('should open and close when modelValue changes', async () => {
      const model = ref(false)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      expect(screen.queryByRole('dialog')).toBeNull()

      model.value = true
      await nextTick()
      await expect(screen.findByRole('dialog')).resolves.toBeVisible()

      model.value = false
      await nextTick()
      await expect.poll(() => screen.queryByRole('dialog')).toBeNull()
    })

    it('should emit afterEnter and afterLeave events', async () => {
      const model = ref(false)
      const onAfterEnter = vi.fn()
      const onAfterLeave = vi.fn()

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          onAfterEnter={ onAfterEnter }
          onAfterLeave={ onAfterLeave }
        />
      ))

      model.value = true
      await nextTick()
      await expect.poll(() => onAfterEnter.mock.calls.length).toBe(1)

      model.value = false
      await nextTick()
      await expect.poll(() => onAfterLeave.mock.calls.length).toBe(1)
    })

    it('should close after item execution when closeOnExecute is true', async () => {
      const model = ref(true)
      const handler = vi.fn()
      const items = [{ id: 'test', title: 'Test Item', handler }]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
          closeOnExecute
        />
      ))

      await userEvent.click(await screen.findByText('Test Item'))
      expect(handler).toHaveBeenCalledTimes(1)
      await expect.poll(() => model.value).toBeFalsy()
    })

    it('should NOT close after item execution when closeOnExecute is false', async () => {
      const model = ref(true)
      const handler = vi.fn()
      const items = [{ id: 'test', title: 'Test Item', handler }]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
          closeOnExecute={ false }
        />
      ))

      await userEvent.click(await screen.findByText('Test Item'))
      expect(handler).toHaveBeenCalledTimes(1)
      expect(model.value).toBeTruthy()
    })
  })
})
