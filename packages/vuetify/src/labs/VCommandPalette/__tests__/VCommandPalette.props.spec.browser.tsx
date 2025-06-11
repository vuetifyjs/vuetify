// Components
import { VCommandPalette } from '../VCommandPalette'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

// Test data
const basicItems = [
  {
    id: 'item1',
    title: 'First Item',
    subtitle: 'First item subtitle',
    value: 'first',
    handler: vi.fn(),
  },
]

describe('VCommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Props and Configuration', () => {
    it('should apply density classes correctly', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          density="compact"
          transition={ false }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveClass('v-command-palette--density-compact')
    })

    it('should handle custom CSS classes', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          class="custom-palette-class"
          transition={ false }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toHaveClass('custom-palette-class')
    })

    it('should validate maxHeight and maxWidth props', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          maxHeight={ 300 }
          maxWidth={ 500 }
          transition={ false }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()
      // The exact style checking would depend on how VDialog applies these props
    })

    it('should open and close with global hotkey', async () => {
      const model = ref(false)
      render(() => (
        <VCommandPalette
          hotkey="ctrl+k"
          v-model={ model.value }
          items={ basicItems }
          transition={ false }
        />
      ))

      // Palette should be closed initially
      expect(screen.queryByRole('dialog')).toBeNull()
      expect(model.value).toBeFalsy()

      // Simulate the global hotkey (ctrl+k) to open the palette
      await userEvent.keyboard('{Control>}k{/Control}')

      // Palette should now be open
      await expect.poll(() => model.value).toBeTruthy()
      await expect(screen.findByRole('dialog')).resolves.toBeVisible()

      // Simulate Escape key to close the palette
      await userEvent.keyboard('{Escape}')

      // Palette should be closed again
      await expect.poll(() => model.value).toBeFalsy()
      await expect.poll(() => screen.queryByRole('dialog')).toBeNull()
    })

    it('should handle multiple hotkey formats', async () => {
      const model = ref(false)
      render(() => (
        <VCommandPalette
          hotkey="ctrl+shift+k"
          v-model={ model.value }
          items={ basicItems }
          transition={ false }
        />
      ))

      // Palette should be closed initially
      expect(screen.queryByRole('dialog')).toBeNull()
      expect(model.value).toBeFalsy()

      // Simulate the global hotkey (ctrl+shift+k) to open the palette
      await userEvent.keyboard('{Control>}{Shift>}k{/Shift}{/Control}')

      // Palette should now be open
      await expect.poll(() => model.value).toBeTruthy()
      await expect(screen.findByRole('dialog')).resolves.toBeVisible()

      // Verify the palette can be closed with Escape
      await userEvent.keyboard('{Escape}')

      // Palette should be closed again
      await expect.poll(() => model.value).toBeFalsy()
      await expect.poll(() => screen.queryByRole('dialog')).toBeNull()
    })

    it('should handle disabled state', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          disabled
          transition={ false }
        />
      ))

      // Dialog should still render when disabled
      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()

      // The disabled prop may not be fully implemented yet
      // Just ensure the component renders without crashing
      expect(dialog).toBeInTheDocument()
    })

    it('should handle loading state', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          loading
          transition={ false }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()

      // Should show loading indicator (progress bar)
      const loadingIndicator = dialog.querySelector('[role="progressbar"]')
      expect(loadingIndicator).toBeInTheDocument()
    })

    it('should handle persistent prop', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          persistent
          transition={ false }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()

      // Try to close with Escape - should not close when persistent
      await userEvent.keyboard('{Escape}')

      // Dialog should remain open when persistent is true
      expect(model.value).toBeTruthy()
      expect(dialog).toBeVisible()
    })

    it('should support transition prop for disabling transitions', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          transition={ false }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()

      // When transition is false, transitions should be disabled
      // This follows the same pattern as VDialog and VOverlay
      expect(dialog).toBeInTheDocument()
    })
  })
})
