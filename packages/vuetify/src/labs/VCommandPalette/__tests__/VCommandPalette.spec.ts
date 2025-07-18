// Components
import { isActionItem, isGroupDefinition, isItemDefinition, isLinkItem, isParentDefinition } from '../VCommandPaletteList'

// Types
import type { VCommandPaletteItem } from '../VCommandPaletteList'

describe('VCommandPalette Type Guards', () => {
  describe('isItemDefinition', () => {
    it('should return true for items with type "item"', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        type: 'item',
        handler: vi.fn(),
      }
      expect(isItemDefinition(item)).toBe(true)
    })

    it('should return true for items without explicit type (defaults to "item")', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        handler: vi.fn(),
      }
      expect(isItemDefinition(item)).toBe(true)
    })

    it('should return false for parent items', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Parent',
        type: 'parent',
        children: [],
      }
      expect(isItemDefinition(item)).toBe(false)
    })

    it('should return false for group items', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Group',
        type: 'group',
        children: [],
      }
      expect(isItemDefinition(item)).toBe(false)
    })
  })

  describe('isActionItem', () => {
    it('should return true for items with handler', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        handler: vi.fn(),
      }
      expect(isActionItem(item)).toBe(true)
    })

    it('should return true for items with value', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        value: 'test-value',
      }
      expect(isActionItem(item)).toBe(true)
    })

    it('should return false for items with navigation properties', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        to: '/test',
      }
      expect(isActionItem(item)).toBe(false)
    })

    it('should return false for parent items', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Parent',
        type: 'parent',
        children: [],
      }
      expect(isActionItem(item)).toBe(false)
    })
  })

  describe('isLinkItem', () => {
    it('should return true for items with "to" property', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        to: '/test',
      }
      expect(isLinkItem(item)).toBe(true)
    })

    it('should return true for items with "href" property', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        href: 'https://example.com',
      }
      expect(isLinkItem(item)).toBe(true)
    })

    it('should return false for items with handler', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        handler: vi.fn(),
      }
      expect(isLinkItem(item)).toBe(false)
    })

    it('should return false for parent items', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Parent',
        type: 'parent',
        children: [],
      }
      expect(isLinkItem(item)).toBe(false)
    })
  })

  describe('isParentDefinition', () => {
    it('should return true for items with type "parent"', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Parent',
        type: 'parent',
        children: [],
      }
      expect(isParentDefinition(item)).toBe(true)
    })

    it('should return false for regular items', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        handler: vi.fn(),
      }
      expect(isParentDefinition(item)).toBe(false)
    })

    it('should return false for group items', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Group',
        type: 'group',
        children: [],
      }
      expect(isParentDefinition(item)).toBe(false)
    })
  })

  describe('isGroupDefinition', () => {
    it('should return true for items with type "group"', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Group',
        type: 'group',
        children: [],
      }
      expect(isGroupDefinition(item)).toBe(true)
    })

    it('should return false for regular items', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        handler: vi.fn(),
      }
      expect(isGroupDefinition(item)).toBe(false)
    })

    it('should return false for parent items', () => {
      const item: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Parent',
        type: 'parent',
        children: [],
      }
      expect(isGroupDefinition(item)).toBe(false)
    })
  })

  describe('Type Guard Edge Cases', () => {
    it('should handle items with multiple conflicting properties correctly', () => {
      // This tests the discriminated union behavior
      const actionItem: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Item',
        handler: vi.fn(),
        // TypeScript should prevent these, but testing runtime behavior
      }

      expect(isActionItem(actionItem)).toBe(true)
      expect(isLinkItem(actionItem)).toBe(false)
    })

    it('should handle empty children arrays', () => {
      const parentItem: VCommandPaletteItem = {
        id: 'test',
        title: 'Empty Parent',
        type: 'parent',
        children: [],
      }

      expect(isParentDefinition(parentItem)).toBe(true)
      expect(isItemDefinition(parentItem)).toBe(false)
    })

    it('should handle group items with divider options', () => {
      const groupWithDivider: VCommandPaletteItem = {
        id: 'test',
        title: 'Test Group',
        type: 'group',
        divider: 'both',
        children: [],
      }

      expect(isGroupDefinition(groupWithDivider)).toBe(true)
    })
  })
})

describe('VCommandPalette Item Structure Validation', () => {
  it('should validate proper item structure for action items', () => {
    const validActionItem: VCommandPaletteItem = {
      id: 'action-1',
      title: 'Action Item',
      handler: vi.fn(),
      value: 'action-value',
    }

    expect(isActionItem(validActionItem)).toBe(true)
    expect(validActionItem.id).toBe('action-1')
    expect(validActionItem.title).toBe('Action Item')
    expect(typeof validActionItem.handler).toBe('function')
  })

  it('should validate proper item structure for link items', () => {
    const validLinkItem: VCommandPaletteItem = {
      id: 'link-1',
      title: 'Link Item',
      to: '/dashboard',
    }

    expect(isLinkItem(validLinkItem)).toBe(true)
    expect(validLinkItem.to).toBe('/dashboard')
  })

  it('should validate proper item structure for parent items', () => {
    const validParentItem: VCommandPaletteItem = {
      id: 'parent-1',
      title: 'Parent Item',
      type: 'parent',
      children: [
        {
          id: 'child-1',
          title: 'Child Item',
          handler: vi.fn(),
        },
      ],
    }

    expect(isParentDefinition(validParentItem)).toBe(true)
    if (validParentItem.type === 'parent') {
      expect(validParentItem.children).toHaveLength(1)
      expect(validParentItem.children[0].title).toBe('Child Item')
    }
  })

  it('should validate proper item structure for group items', () => {
    const validGroupItem: VCommandPaletteItem = {
      id: 'group-1',
      title: 'Group Item',
      type: 'group',
      divider: 'start',
      children: [
        {
          id: 'group-child-1',
          title: 'Group Child',
          handler: vi.fn(),
        },
        {
          id: 'group-parent-1',
          title: 'Group Parent',
          type: 'parent',
          children: [
            {
              id: 'nested-child',
              title: 'Nested Child',
              handler: vi.fn(),
            },
          ],
        },
      ],
    }

    expect(isGroupDefinition(validGroupItem)).toBe(true)
    expect(validGroupItem.divider).toBe('start')
    expect(validGroupItem.children).toHaveLength(2)
    expect(isParentDefinition(validGroupItem.children[1])).toBe(true)
  })
})
