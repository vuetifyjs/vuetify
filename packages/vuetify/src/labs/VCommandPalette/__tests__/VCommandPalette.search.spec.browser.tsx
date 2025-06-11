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

  describe('Search and Filtering', () => {
    it('should allow typing into the search input', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          placeholder="Search..."
        />
      ))

      const searchInput = await screen.findByPlaceholderText('Search...')
      await userEvent.type(searchInput, 'first')

      await expect.element(searchInput).toHaveValue('first')
    })

    it('should filter items based on search query', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'first')

      await expect(screen.findByText('First Item')).resolves.toBeVisible()
      expect(screen.queryByText('Second Item')).toBeNull()
      expect(screen.queryByText('Third Item')).toBeNull()
    })

    it('should filter case-insensitively', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'FIRST')

      await expect(screen.findByText('First Item')).resolves.toBeVisible()
      expect(screen.queryByText('Second Item')).toBeNull()
    })

    it('should filter by subtitle', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'subtitle')

      await expect(screen.findByText('First Item')).resolves.toBeVisible()
      await expect(screen.findByText('Second Item')).resolves.toBeVisible()
      expect(screen.queryByText('Third Item')).toBeNull()
    })

    it('should restore full list when search is cleared', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          clearableSearch
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'first')

      // Only first item should be visible
      await expect(screen.findByText('First Item')).resolves.toBeVisible()
      expect(screen.queryByText('Second Item')).toBeNull()

      // Click the clear button instead of using userEvent.clear
      const clearButton = await screen.findByRole('button', { name: /Clear/ })
      await userEvent.click(clearButton)
      await nextTick()

      // All items should be visible again
      await expect(screen.findByText('First Item')).resolves.toBeVisible()
      await expect(screen.findByText('Second Item')).resolves.toBeVisible()
      await expect(screen.findByText('Third Item')).resolves.toBeVisible()
    })

    it('should focus search input when dialog opens', async () => {
      const model = ref(false)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      model.value = true
      await nextTick()

      const searchInput = await screen.findByRole('textbox')
      await expect.poll(() => document.activeElement === searchInput).toBeTruthy()
    })

    it('should handle group filtering correctly', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithGroups }
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'Group Item 1')

      // Should show the group header and matching item
      await expect(screen.findByText('First Group')).resolves.toBeVisible()
      await expect(screen.findByText('Group Item 1')).resolves.toBeVisible()
      expect(screen.queryByText('Group Item 2')).toBeNull()
      expect(screen.queryByText('Second Group')).toBeNull()
    })

    it('should not show clear button when clearableSearch is false', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
          clearableSearch={ false }
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'test')

      expect(screen.queryByRole('button', { name: /Clear/ })).toBeNull()
    })

    it('should filter within drilled-down parent view', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithParent }
        />
      ))

      // Navigate into parent
      await userEvent.click(await screen.findByText('Parent Item'))
      await expect(screen.findByText('Child One')).resolves.toBeVisible()

      // Search within children
      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'One')

      await expect(screen.findByText('Child One')).resolves.toBeVisible()
      expect(screen.queryByText('Child Two')).toBeNull()
    })

    it('should display no data message when no items provided', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={[]}
        />
      ))

      await expect(screen.findByText('No data available')).resolves.toBeVisible()
    })

    it('should display no data message when search yields no results', async () => {
      const model = ref(true)
      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ basicItems }
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'nonexistent')

      await expect(screen.findByText('No data available')).resolves.toBeVisible()
    })

    it('should handle items being updated asynchronously', async () => {
      const model = ref(true)
      const items = ref(basicItems.slice(0, 1))

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ items.value }
        />
      ))

      // Initially only first item
      await expect(screen.findByText('First Item')).resolves.toBeVisible()
      expect(screen.queryByText('Second Item')).toBeNull()

      // Update items
      items.value = basicItems

      await nextTick()

      // Now all items should be visible
      await expect(screen.findByText('Second Item')).resolves.toBeVisible()
      await expect(screen.findByText('Third Item')).resolves.toBeVisible()
    })

    it('should show only parent item when parent title matches search', async () => {
      const model = ref(true)
      const itemsWithNamedParent = [
        ...basicItems,
        {
          id: 'settings-parent',
          type: 'parent' as const,
          title: 'Settings Menu',
          subtitle: 'Configuration options',
          children: [
            {
              id: 'setting1',
              title: 'User Preferences',
              handler: vi.fn(),
            },
            {
              id: 'setting2',
              title: 'System Config',
              handler: vi.fn(),
            },
          ],
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithNamedParent }
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'settings')

      // Should show only the parent item, not its children
      await expect(screen.findByText('Settings Menu')).resolves.toBeVisible()
      expect(screen.queryByText('User Preferences')).toBeNull()
      expect(screen.queryByText('System Config')).toBeNull()

      // Should not show other items
      expect(screen.queryByText('First Item')).toBeNull()
    })

    it('should show group and children when group title matches search', async () => {
      const model = ref(true)
      const itemsWithNamedGroup = [
        ...basicItems,
        {
          id: 'actions-group',
          type: 'group' as const,
          title: 'File Actions',
          divider: 'start' as const,
          children: [
            {
              id: 'action1',
              title: 'Open File',
              handler: vi.fn(),
            },
            {
              id: 'action2',
              title: 'Save File',
              handler: vi.fn(),
            },
          ],
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ itemsWithNamedGroup }
        />
      ))

      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, 'file actions')

      // Should show the group header and all its children
      await expect(screen.findByText('File Actions')).resolves.toBeVisible()
      await expect(screen.findByText('Open File')).resolves.toBeVisible()
      await expect(screen.findByText('Save File')).resolves.toBeVisible()

      // Should not show other items
      expect(screen.queryByText('First Item')).toBeNull()
    })

    it('should handle special characters in search', async () => {
      const model = ref(true)
      const specialItems = [
        {
          id: 'special1',
          title: 'Item with quotes',
          value: 'quotes',
          handler: vi.fn(),
        },
        {
          id: 'special2',
          title: 'Item with tags',
          value: 'tags',
          handler: vi.fn(),
        },
        {
          id: 'special3',
          title: 'Item with symbols',
          value: 'symbols',
          handler: vi.fn(),
        },
      ]

      render(() => (
        <VCommandPalette
          v-model={ model.value }
          items={ specialItems }
          clearableSearch
        />
      ))

      const searchInput = await screen.findByRole('textbox')

      // Search for quotes - should find the item
      await userEvent.type(searchInput, 'quotes')
      await expect(screen.findByText('Item with quotes')).resolves.toBeVisible()

      // Clear and search for tags
      await userEvent.tripleClick(searchInput)
      await userEvent.type(searchInput, 'tags')
      await expect(screen.findByText('Item with tags')).resolves.toBeVisible()

      // Clear and search for symbols
      await userEvent.tripleClick(searchInput)
      await userEvent.type(searchInput, 'symbols')
      await expect(screen.findByText('Item with symbols')).resolves.toBeVisible()
    })

    it('should treat whitespace-only search as empty (no filtering)', async () => {
      const model = ref(true)
      render(() => <VCommandPalette v-model={ model.value } items={ basicItems } />)
      const searchInput = await screen.findByRole('textbox')
      await userEvent.type(searchInput, '   ')
      await expect(screen.findByText('First Item')).resolves.toBeVisible()
      await expect(screen.findByText('Second Item')).resolves.toBeVisible()
      await expect(screen.findByText('Third Item')).resolves.toBeVisible()
    })
  })
})
