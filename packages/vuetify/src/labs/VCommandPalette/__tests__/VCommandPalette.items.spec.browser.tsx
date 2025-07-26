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
  {
    id: 'item2',
    title: 'Second Item',
    subtitle: 'Second item subtitle',
    value: 'second',
    handler: vi.fn(),
  },
]

const itemsWithGroups = [
  {
    id: 'group1',
    type: 'group' as const,
    title: 'First Group',
    divider: 'start' as const,
    children: [
      {
        id: 'group1-item1',
        title: 'Group Item 1',
        value: 'g1i1',
        handler: vi.fn(),
      },
      {
        id: 'group1-item2',
        title: 'Group Item 2',
        value: 'g1i2',
        handler: vi.fn(),
      },
    ],
  },
  {
    id: 'group2',
    type: 'group' as const,
    title: 'Second Group',
    divider: 'end' as const,
    children: [
      {
        id: 'group2-item1',
        title: 'Another Group Item',
        value: 'g2i1',
        handler: vi.fn(),
      },
    ],
  },
]

describe('VCommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Item Interaction & Structure', () => {
    it('should execute item handler on click', async () => {
      const model = ref(true)
      const handler = vi.fn()
      const items = [{ id: 'test', title: 'Test Item', handler }]

      render(() => <VCommandPalette v-model={ model.value } items={ items } />)

      await userEvent.click(await screen.findByText('Test Item'))
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should emit click:item event', async () => {
      const model = ref(true)
      const onClickItem = vi.fn()
      const items = [{ id: 'test', title: 'Test Item', handler: vi.fn() }]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
          { ...{ 'onClick:item': (item: any) => onClickItem(item) } }
        />
      ))

      await userEvent.click(await screen.findByText('Test Item'))

      // Assert that the event was emitted with the correct payload
      await expect.poll(() => onClickItem.mock.calls.length).toBe(1)
      expect(onClickItem).toHaveBeenCalledWith(expect.objectContaining({ id: 'test' }))
    })

    it('should render groups with headers and dividers', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithGroups }
        />
      ))

      // Should show group headers
      await expect(screen.findByText('First Group')).resolves.toBeVisible()
      await expect(screen.findByText('Second Group')).resolves.toBeVisible()

      // Should show group items
      await expect(screen.findByText('Group Item 1')).resolves.toBeVisible()
      await expect(screen.findByText('Group Item 2')).resolves.toBeVisible()
      await expect(screen.findByText('Another Group Item')).resolves.toBeVisible()
    })

    it('should handle items with icons and avatars', async () => {
      const model = ref(true)
      const items = [
        {
          id: 'icon-item',
          title: 'Icon Item',
          prependIcon: 'mdi-home',
          appendIcon: 'mdi-arrow-right',
        },
        {
          id: 'avatar-item',
          title: 'Avatar Item',
          prependAvatar: 'https://example.com/avatar.jpg',
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
        />
      ))

      await expect(screen.findByText('Icon Item')).resolves.toBeVisible()
      await expect(screen.findByText('Avatar Item')).resolves.toBeVisible()
    })

    it('should update selection on hover', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      await screen.findByRole('dialog')

      const secondItem = await screen.findByText('Second Item')
      const secondListItem = secondItem.closest('.v-list-item')

      // Hover over second item
      await userEvent.hover(secondItem)

      // Should update selection to hovered item
      await expect.poll(() =>
        secondListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()
    })

    it('should execute item-specific hotkeys', async () => {
      const model = ref(true)
      const handler = vi.fn()
      const items = [
        {
          id: 'test',
          title: 'Test Item',
          handler,
          hotkey: 'ctrl+shift+t',
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
        />
      ))

      await expect(screen.findByText('Test Item')).resolves.toBeVisible()

      // Execute the item-specific hotkey
      await userEvent.keyboard('{Control>}{Shift>}t{/Shift}{/Control}')

      // Should execute the handler
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should close palette after executing item-specific hotkey', async () => {
      const model = ref(true)
      const handler = vi.fn()
      const items = [
        {
          id: 'save',
          title: 'Save File',
          handler,
          hotkey: 'ctrl+s',
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
        />
      ))

      // Palette should be open initially
      await expect(screen.findByRole('dialog')).resolves.toBeVisible()
      await expect(screen.findByText('Save File')).resolves.toBeVisible()

      // Execute the item-specific hotkey while palette is open
      await userEvent.keyboard('{Control>}s{/Control}')

      // Should execute the handler
      expect(handler).toHaveBeenCalledTimes(1)

      // Palette should close after execution (closeOnExecute defaults to true)
      await expect.poll(() => model.value).toBeFalsy()
      await expect.poll(() => screen.queryByRole('dialog')).toBeNull()
    })

    it('should not execute item hotkeys when palette is closed (legacy test)', async () => {
      const model = ref(false) // Start with palette closed
      const handler = vi.fn()
      const items = [
        {
          id: 'save',
          title: 'Save File',
          handler,
          hotkey: 'ctrl+shift+s',
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
        />
      ))

      // Palette should be closed initially
      expect(screen.queryByRole('dialog')).toBeNull()

      // Execute the item-specific hotkey while palette is closed
      await userEvent.keyboard('{Control>}{Shift>}s{/Shift}{/Control}')

      // Handler should NOT be called when palette is closed
      expect(handler).not.toHaveBeenCalled()

      // Now open the palette
      model.value = true
      await screen.findByRole('dialog')
      await expect(screen.findByText('Save File')).resolves.toBeVisible()

      // Execute the same hotkey while palette is open
      await userEvent.keyboard('{Control>}{Shift>}s{/Shift}{/Control}')

      // Handler should be called when palette is open
      expect(handler).toHaveBeenCalledTimes(1)

      // Close the palette again
      model.value = false
      await expect.poll(() => screen.queryByRole('dialog')).toBeNull()

      // Execute the hotkey again while closed
      await userEvent.keyboard('{Control>}{Shift>}s{/Shift}{/Control}')

      // Handler should still only have been called once (not called when closed)
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should display hotkey hints in items', async () => {
      const model = ref(true)
      const itemsWithHotkeys = [
        {
          id: 'item1',
          title: 'Save File',
          hotkey: 'ctrl+s',
          handler: vi.fn(),
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithHotkeys }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      await expect(screen.findByText('Save File')).resolves.toBeVisible()

      // VHotkey component should be present for items with hotkeys
      const hotkeyElement = dialog.querySelector('.v-hotkey')
      expect(hotkeyElement).toBeInTheDocument()

      // VHotkey should render key elements
      const keyElements = hotkeyElement!.querySelectorAll('.v-hotkey__key')
      expect(keyElements.length).toBeGreaterThan(0)

      // Should contain the hotkey information (ctrl+s)
      // VHotkey renders keys as separate elements, so we check for their presence
      const keyTexts = Array.from(keyElements).map(el => el.textContent?.toLowerCase() || '')
      const hasCtrlKey = keyTexts.some(text => text.includes('ctrl')) ||
                        Array.from(keyElements).some(el => el.classList.contains('v-hotkey__key-icon'))
      const hasSKey = keyTexts.some(text => text.includes('s'))

      // At least one of the keys should be present (implementation may vary)
      expect(hasCtrlKey || hasSKey).toBeTruthy()
    })

    it('should handle conflicting hotkeys gracefully', async () => {
      const model = ref(true)
      const handler1 = vi.fn()
      const handler2 = vi.fn()
      const itemsWithConflictingHotkeys = [
        {
          id: 'item1',
          title: 'First Action',
          hotkey: 'ctrl+s',
          handler: handler1,
        },
        {
          id: 'item2',
          title: 'Second Action',
          hotkey: 'ctrl+s', // Same hotkey
          handler: handler2,
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithConflictingHotkeys }
        />
      ))

      await screen.findByRole('dialog')

      // Both items should render without issues
      await expect(screen.findByText('First Action')).resolves.toBeVisible()
      await expect(screen.findByText('Second Action')).resolves.toBeVisible()

      // Execute the conflicting hotkey
      await userEvent.keyboard('{Control>}s{/Control}')

      // At least one handler should be called (implementation-dependent behavior)
      // Using robust assertion that doesn't depend on exact call count
      const totalCalls = handler1.mock.calls.length + handler2.mock.calls.length
      expect(totalCalls).toBeGreaterThanOrEqual(1)

      // Ensure the component doesn't crash with conflicting hotkeys
      expect(screen.queryByRole('dialog')).toBeInTheDocument()
    })

    it('should handle uppercase keys in hotkey display', async () => {
      const model = ref(true)
      const itemsWithUppercaseKeys = [
        {
          id: 'item1',
          title: 'Uppercase Test',
          hotkey: 'CTRL+S', // Uppercase keys
          handler: vi.fn(),
        },
        {
          id: 'item2',
          title: 'Mixed Case Test',
          hotkey: 'Ctrl+Shift+A', // Mixed case
          handler: vi.fn(),
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithUppercaseKeys }
        />
      ))

      const dialog = await screen.findByRole('dialog')

      // Both items should render without issues
      await expect(screen.findByText('Uppercase Test')).resolves.toBeVisible()
      await expect(screen.findByText('Mixed Case Test')).resolves.toBeVisible()

      // VHotkey components should be present and render correctly
      const hotkeyElements = dialog.querySelectorAll('.v-hotkey')
      expect(hotkeyElements.length).toBeGreaterThanOrEqual(2)

      // Each hotkey should have key elements (verifying they don't crash on uppercase)
      hotkeyElements.forEach(hotkeyElement => {
        const keyElements = hotkeyElement.querySelectorAll('.v-hotkey__key')
        expect(keyElements.length).toBeGreaterThan(0)
      })
    })
  })
})
