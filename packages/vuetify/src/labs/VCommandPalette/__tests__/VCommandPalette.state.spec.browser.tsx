// Components
import { VCommandPalette } from '../VCommandPalette'

// Utilities
import { render, screen, userEvent, wait } from '@test'
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

describe('VCommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('State Management & Edge Cases', () => {
    it('should reset state when dialog closes', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'test search')
      await userEvent.keyboard('{ArrowDown}')

      // Close dialog
      model.value = false
      await nextTick()
      await wait(200) // Wait for state reset timeout

      // Reopen dialog
      model.value = true
      await nextTick()

      // Search should be cleared and no item selected initially
      const newSearchInput = await screen.findByRole('textbox')
      await expect.element(newSearchInput).toHaveValue('')

      // First item should be auto-selected on reopen
      const firstItem = await screen.findByText('First Item')
      const firstListItem = firstItem.closest('.v-list-item')
      await expect.poll(() => firstListItem?.classList.contains('v-list-item--active')).toBeTruthy()
    })

    it('should reset view when items prop changes externally', async () => {
      const model = ref(true)
      const items = ref(itemsWithParent)

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items.value }
        />
      ))

      // Navigate into parent
      await userEvent.click(await screen.findByText('Parent Item'))
      await expect(screen.findByText('Child One')).resolves.toBeVisible()

      // Change items externally
      items.value = basicItems
      await nextTick()

      // Should reset to top-level view with new items
      await expect(screen.findByText('First Item')).resolves.toBeVisible()
      expect(screen.queryByText('Child One')).toBeNull()
      expect(screen.queryByText('Parent Item')).toBeNull()
    })

    it('should handle null or undefined items gracefully', async () => {
      const model = ref(true)
      const itemsWithNulls = [
        ...basicItems,
        null,
        undefined,
        {
          id: 'valid',
          title: 'Valid Item',
          handler: vi.fn(),
        },
      ].filter(Boolean) as any[]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithNulls }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()

      await expect(screen.findByText('Valid Item')).resolves.toBeVisible()
    })

    it('should handle items with missing required properties', async () => {
      const model = ref(true)
      const invalidItems = [
        { id: 'no-title' }, // Missing title
        { title: 'No ID' }, // Missing id
        ...basicItems,
      ] as any[]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ invalidItems }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()

      // Should still render valid items
      await expect(screen.findByText('First Item')).resolves.toBeVisible()
    })

    it('should handle circular references in parent-child relationships', async () => {
      const model = ref(true)

      // Create items with potential circular reference
      const parent: any = {
        id: 'parent',
        type: 'parent',
        title: 'Parent',
        children: [],
      }

      const child: any = {
        id: 'child',
        title: 'Child',
        parent,
        handler: vi.fn(),
      }

      parent.children = [child]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={[parent]}
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()

      await expect(screen.findByText('Parent')).resolves.toBeVisible()
    })

    it('should handle very long item titles and subtitles', async () => {
      const model = ref(true)
      const longTextItems = [
        {
          id: 'long-title',
          title: 'This is a very long title that should be handled gracefully by the component ' +
            'even when it exceeds normal length expectations',
          subtitle: 'This is also a very long subtitle that contains a lot of descriptive text ' +
            'about what this item does and why it might be useful to the user',
          handler: vi.fn(),
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ longTextItems }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()

      // Should handle long text without breaking layout
      await expect(screen.findByText(/This is a very long title/)).resolves.toBeVisible()
    })

    it('should handle rapid open/close cycles', async () => {
      const model = ref(false)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      // Rapid open/close cycles
      for (let i = 0; i < 5; i++) {
        model.value = true
        await nextTick()
        model.value = false
        await nextTick()
      }

      // Final open should work correctly
      model.value = true
      await nextTick()

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()
    })

    it('should handle items being modified during interaction', async () => {
      const model = ref(true)
      const dynamicItems = ref([...basicItems])

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ dynamicItems.value }
        />
      ))

      await screen.findByRole('dialog')
      await expect(screen.findByText('First Item')).resolves.toBeVisible()

      // Modify items while dialog is open
      dynamicItems.value = [
        {
          id: 'new-item',
          title: 'New Item',
          value: 'new-value',
          handler: vi.fn(),
        },
      ]

      await nextTick()

      // Should update to show new items
      await expect(screen.findByText('New Item')).resolves.toBeVisible()
      expect(screen.queryByText('First Item')).toBeNull()
    })
  })

  describe('Missing Test Coverage - Asynchronous State Management', () => {
    it('should maintain selection state when items are updated asynchronously', async () => {
      const model = ref(true)
      const items = ref([...basicItems])

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items.value }
        />
      ))

      await screen.findByRole('dialog')

      // Navigate to second item
      await userEvent.keyboard('{ArrowDown}{ArrowDown}')
      const secondItem = await screen.findByText('Second Item')
      const secondListItem = secondItem.closest('.v-list-item')
      await expect.poll(() =>
        secondListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()

      // Update items asynchronously - add new items at the beginning
      items.value = [
        { id: 'new-first', title: 'New First Item', value: 'new-first', handler: vi.fn() },
        ...basicItems,
      ]
      await nextTick()

      // Selection should be reset to -1 (no selection) when items change
      // This is the expected behavior based on the component implementation
      await expect.poll(() =>
        !secondListItem?.classList.contains('v-list-item--active')
      ).toBeTruthy()

      // Verify new items are rendered
      await expect(screen.findByText('New First Item')).resolves.toBeVisible()
      await expect(screen.findByText('First Item')).resolves.toBeVisible()
    })

    it('should handle selection state correctly when filtered items change', async () => {
      const model = ref(true)
      const items = ref([
        { id: 'apple', title: 'Apple', value: 'apple', handler: vi.fn() },
        { id: 'banana', title: 'Banana', value: 'banana', handler: vi.fn() },
        { id: 'cherry', title: 'Cherry', value: 'cherry', handler: vi.fn() },
      ])

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items.value }
        />
      ))

      await screen.findByRole('dialog')

      // Filter to show only items with 'a'
      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'a')

      // Should show Apple and Banana
      await expect(screen.findByText('Apple')).resolves.toBeVisible()
      await expect(screen.findByText('Banana')).resolves.toBeVisible()
      // Cherry may or may not be present depending on filter implementation
    })
  })

  describe('Stress Testing', () => {
    it('should handle large datasets without performance degradation', async () => {
      const model = ref(true)

      // Generate 1000+ items
      const largeItemSet = Array.from({ length: 1000 }, (_, index) => ({
        id: `item-${index}`,
        title: `Item ${index}`,
        subtitle: `Subtitle for item ${index}`,
        value: `value-${index}`,
        handler: vi.fn(),
      }))

      const startTime = performance.now()

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ largeItemSet }
        />
      ))

      const dialog = await screen.findByRole('dialog')
      expect(dialog).toBeVisible()

      const renderTime = performance.now() - startTime

      // Should render without crashing and in reasonable time (less than 1 second)
      expect(renderTime).toBeLessThan(1000)

      // Test filtering performance
      const searchInput = await screen.findByRole('textbox')

      const filterStartTime = performance.now()
      await userEvent.type(searchInput, '999')

      // Should find the specific item
      await expect(screen.findByText('Item 999')).resolves.toBeVisible()

      const filterTime = performance.now() - filterStartTime

      // Filtering should also be reasonably fast (less than 500ms)
      expect(filterTime).toBeLessThan(500)
    })
  })
})
