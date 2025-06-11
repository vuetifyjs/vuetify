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
  {
    id: 'item3',
    title: 'Third Item',
    value: 'third',
    handler: vi.fn(),
  },
]

const itemsWithParent = [
  ...basicItems,
  {
    id: 'parent1',
    type: 'parent' as const,
    title: 'Parent Item',
    subtitle: 'Has children',
    children: [
      {
        id: 'child1',
        title: 'Child One',
        value: 'child1',
        handler: vi.fn(),
      },
      {
        id: 'child2',
        title: 'Child Two',
        value: 'child2',
        handler: vi.fn(),
      },
    ],
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
]

describe('VCommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Keyboard Navigation', () => {
    it('should move selection down with ArrowDown key', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      await screen.findByRole('dialog')

      // Initially no item should be selected (selectedIndex = -1)
      const firstItem = await screen.findByText('First Item')
      const firstListItem = firstItem.closest('.v-list-item')
      expect(firstListItem).not.toHaveClass('v-list-item--active')

      // First arrow down should select first item (selectedIndex = 0)
      await userEvent.keyboard('{ArrowDown}')
      await expect.poll(() =>
        firstListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()

      // Second arrow down should select second item (selectedIndex = 1)
      await userEvent.keyboard('{ArrowDown}')
      const secondItem = await screen.findByText('Second Item')
      const secondListItem = secondItem.closest('.v-list-item')
      await expect.poll(() =>
        secondListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()
      expect(firstListItem).not.toHaveClass('v-list-item--active')
    })

    it('should move selection up with ArrowUp key', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      await screen.findByRole('dialog')

      // Arrow up from no selection should wrap to last item
      await userEvent.keyboard('{ArrowUp}')
      const thirdItem = await screen.findByText('Third Item')
      // Verify the last item remains visible
      expect(thirdItem).toBeVisible()

      // Arrow up again should go to second item
      await userEvent.keyboard('{ArrowUp}')
      const secondItem = await screen.findByText('Second Item')
      const secondListItem = secondItem.closest('.v-list-item')
      await expect.poll(() =>
        secondListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()
      expect(thirdItem).not.toHaveClass('v-list-item--active')
    })

    it('should wrap selection from last to first item', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      await screen.findByRole('dialog')

      // Navigate to last item (0 -> 1 -> 2)
      await userEvent.keyboard('{ArrowDown}') // to first (index 0)
      await userEvent.keyboard('{ArrowDown}') // to second (index 1)
      await userEvent.keyboard('{ArrowDown}') // to third (index 2)

      // Should be on third item
      const thirdItem = await screen.findByText('Third Item')
      const thirdListItem = thirdItem.closest('.v-list-item')
      await expect.poll(() =>
        thirdListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()

      // One more down should wrap to first
      await userEvent.keyboard('{ArrowDown}')
      const firstItem = await screen.findByText('First Item')
      const firstListItem = firstItem.closest('.v-list-item')
      await expect.poll(() =>
        firstListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()
      expect(thirdListItem).not.toHaveClass('v-list-item--active')
    })

    it('should execute selected item with Enter key', async () => {
      const model = ref(true)
      const handler = vi.fn()
      const items = [{ id: 'test', title: 'Test Item', handler }]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
        />
      ))

      await screen.findByRole('dialog')

      // First select an item, then execute it
      await userEvent.keyboard('{ArrowDown}') // Select first item
      await userEvent.keyboard('{Enter}') // Execute it

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should execute first item immediately when Enter is pressed without navigation', async () => {
      const model = ref(true)
      const handler = vi.fn()
      const items = [
        { id: 'first', title: 'First Item', handler },
        { id: 'second', title: 'Second Item', handler: vi.fn() },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
        />
      ))

      await screen.findByRole('dialog')

      // Wait a moment for the component to fully initialize
      await new Promise(resolve => setTimeout(resolve, 50))

      // Immediately press Enter without any ArrowDown/ArrowUp navigation
      // The first item should be auto-selected and executed
      await userEvent.keyboard('{Enter}')

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should navigate into parent items with click', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithParent }
        />
      ))

      await screen.findByRole('dialog')

      // Click on parent item to drill down
      await userEvent.click(await screen.findByText('Parent Item'))

      // Should now see children
      await expect(screen.findByText('Child One')).resolves.toBeVisible()
      await expect(screen.findByText('Child Two')).resolves.toBeVisible()
      expect(screen.queryByText('First Item')).toBeNull()
    })

    it('should navigate into parent items with Enter key', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithParent }
        />
      ))

      await screen.findByRole('dialog')

      // Navigate to parent item and press Enter
      await userEvent.keyboard('{ArrowDown}') // First Item
      await userEvent.keyboard('{ArrowDown}') // Second Item
      await userEvent.keyboard('{ArrowDown}') // Third Item
      await userEvent.keyboard('{ArrowDown}') // Parent Item
      await userEvent.keyboard('{Enter}')

      // Should now see children
      await expect(screen.findByText('Child One')).resolves.toBeVisible()
      await expect(screen.findByText('Child Two')).resolves.toBeVisible()
      expect(screen.queryByText('First Item')).toBeNull()
    })

    it('should emit click:item event when executing with Enter key', async () => {
      const model = ref(true)
      const onClickItem = vi.fn()
      const handler = vi.fn()
      const items = [{ id: 'test', title: 'Test Item', handler }]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items }
          onClick:item={ (item: any) => onClickItem(item) }
        />
      ))

      await screen.findByRole('dialog')

      // Select and execute with Enter
      await userEvent.keyboard('{ArrowDown}') // Select first item
      await userEvent.keyboard('{Enter}') // Execute it

      expect(handler).toHaveBeenCalledTimes(1)
      await expect.poll(() => onClickItem.mock.calls.length).toBe(1)
      expect(onClickItem).toHaveBeenCalledWith(expect.objectContaining({ id: 'test' }))
    })

    it('should skip non-selectable group headers during navigation', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithGroups }
        />
      ))

      await screen.findByRole('dialog')

      // First arrow down should skip group header and select first group item
      await userEvent.keyboard('{ArrowDown}')

      const firstGroupItem = await screen.findByText('Group Item 1')
      const firstGroupListItem = firstGroupItem.closest('.v-list-item')
      await expect.poll(() =>
        firstGroupListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()

      // Group header should not be selectable
      const groupHeader = await screen.findByText('First Group')
      // Note: Group headers might not be wrapped in .v-list-item elements
      // Just verify the group header exists and is not the active item
      expect(groupHeader).toBeVisible()
      expect(groupHeader.closest('.v-list-item--active')).toBeNull()
    })

    it('should navigate back with Backspace when search is empty', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithParent }
        />
      ))

      await screen.findByRole('dialog')

      // Click parent to drill down
      await userEvent.click(await screen.findByText('Parent Item'))

      // Should now see children, not parent items
      await expect(screen.findByText('Child One')).resolves.toBeVisible()
      expect(screen.queryByText('First Item')).toBeNull()

      // Press Backspace to go back
      await userEvent.keyboard('{Backspace}')

      // Poll until the parent item is visible again
      await expect.poll(() => screen.queryByText('Parent Item')).toBeTruthy()

      // Now assert the final state
      expect(screen.queryByText('Child One')).toBeNull()
      expect(screen.queryByText('First Item')).not.toBeNull()
    })

    it('should not navigate back with Backspace when search has content', async () => {
      const model = ref(true)
      render(() => <VCommandPalette v-model={ model.value } items={ itemsWithParent } />)

      await userEvent.click(await screen.findByText('Parent Item'))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'Child')

      await userEvent.keyboard('{Backspace}')

      // Should still be in children view (though filtered by search)
      await expect(screen.findByText('Child One')).resolves.toBeVisible()
      expect(screen.queryByText('First Item')).toBeNull()
    })

    it('should handle Backspace at top level gracefully', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      await screen.findByRole('dialog')

      // Press Backspace at top level - should do nothing
      await userEvent.keyboard('{Backspace}')

      // Should still show all top-level items
      await expect(screen.findByText('First Item')).resolves.toBeVisible()
      await expect(screen.findByText('Second Item')).resolves.toBeVisible()
      await expect(screen.findByText('Third Item')).resolves.toBeVisible()
    })

    it('should close palette with Escape from child view', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithParent }
        />
      ))

      await screen.findByRole('dialog')

      // Navigate into parent
      await userEvent.click(await screen.findByText('Parent Item'))
      await expect(screen.findByText('Child One')).resolves.toBeVisible()

      // Press Escape - should close the entire palette
      await userEvent.keyboard('{Escape}')

      await expect.poll(() => model.value).toBeFalsy()
      await expect.poll(() => screen.queryByRole('dialog')).toBeNull()
    })

    it('should clear search when navigating into parent', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithParent }
        />
      ))

      await screen.findByRole('dialog')

      // Add search text
      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'parent')

      // Navigate into parent
      await userEvent.click(await screen.findByText('Parent Item'))

      // Search should be cleared
      await expect.poll(() => (searchInput as HTMLInputElement).value).toBe('')
    })

    it('should restore parent selection when navigating back', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithParent }
        />
      ))

      await screen.findByRole('dialog')

      // Navigate to and select parent item
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}') // Navigate to Parent Item
      await userEvent.keyboard('{Enter}') // Enter parent

      await expect(screen.findByText('Child One')).resolves.toBeVisible()

      // Navigate back
      await userEvent.keyboard('{Backspace}')

      // Parent item should be selected again
      const parentItem = await screen.findByText('Parent Item')
      const parentListItem = parentItem.closest('.v-list-item')

      await expect.poll(() =>
        parentListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()
    })
  })
})
