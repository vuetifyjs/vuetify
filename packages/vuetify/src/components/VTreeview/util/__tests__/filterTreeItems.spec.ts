import { filterTreeItem, filterTreeItems } from '../filterTreeItems'

describe('filterTreeItems.ts', () => {
  it('should filter single tree item', () => {
    expect(filterTreeItem({ text: 'foo' }, 'foo', 'text')).toBeTruthy()
    expect(filterTreeItem({ text: 'foo' }, 'bar', 'text')).toBeFalsy()
    expect(filterTreeItem({ text: 'foobar' }, 'foo', 'text')).toBeTruthy()
    expect(filterTreeItem({ text: 'FoObAr' }, 'foo', 'text')).toBeTruthy()
    expect(filterTreeItem({ text: 'oof' }, 'bar', 'text')).toBeFalsy()
    expect(filterTreeItem({ data: 'foo' }, 'foo', 'data')).toBeTruthy()
  })

  it('should filter all tree items', () => {
    expect(filterTreeItems(filterTreeItem, { text: 'foo' }, 'foo', 'id', 'text', 'children', new Set<string | number>())).toBeTruthy()
    expect(filterTreeItems(filterTreeItem, { text: 'bar' }, 'foo', 'id', 'text', 'children', new Set<string | number>())).toBeFalsy()
    expect(filterTreeItems(filterTreeItem, { text: 'bar', children: [{ text: 'foo' }] }, 'foo', 'id', 'text', 'children', new Set<string | number>())).toBeTruthy()
    expect(filterTreeItems(filterTreeItem, { text: 'foo', children: [{ text: 'foo' }] }, 'foo', 'id', 'text', 'children', new Set<string | number>())).toBeTruthy()
    expect(filterTreeItems(filterTreeItem, { text: 'bar', children: [{ text: 'baz' }] }, 'foo', 'id', 'text', 'children', new Set<string | number>())).toBeFalsy()
  })
})
