// Components
import { VDataTable } from '../VDataTable'

// Utilities
import { commands, page, render, screen, userEvent } from '@test'

// Types
import type { DataTableHeader } from '../types'

const HEADERS: DataTableHeader[] = [
  { title: 'Severity', key: 'severity', initialSortOrder: 'desc' },
  { title: 'Issue', key: 'name', initialSortOrder: 'asc' },
]

const ITEMS = [
  { severity: 1, name: 'Button alignment' },
  { severity: 3, name: 'Dialog does not close' },
  { severity: 2, name: 'Card image is missing' },
]

describe('VDataTable sorting', () => {
  it.each(['asc', 'desc'] as const)('should use column orders instead of the table order %s', async initialSortOrder => {
    render(() => <VDataTable headers={ HEADERS } items={ ITEMS } initialSortOrder={ initialSortOrder } />)

    const severity = screen.getByRole('columnheader', { name: 'Severity' })
    const issue = screen.getByRole('columnheader', { name: 'Issue' })

    expect(severity).not.toHaveAttribute('aria-sort')
    expect(issue).not.toHaveAttribute('aria-sort')
    expect(screen.getAllByCSS('tbody td:first-child').map(cell => cell.textContent)).toEqual(['1', '3', '2'])

    await userEvent.click(page.getByRole('columnheader', { name: 'Severity' }))
    expect(severity).toHaveAttribute('aria-sort', 'descending')
    await userEvent.click(page.getByRole('columnheader', { name: 'Issue' }))
    expect(issue).toHaveAttribute('aria-sort', 'ascending')
  })

  it('should cycle through each column order and restart after sorting is removed', async () => {
    render(() => <VDataTable headers={ HEADERS } items={ ITEMS } />)

    const severity = screen.getByRole('columnheader', { name: 'Severity' })
    const issue = screen.getByRole('columnheader', { name: 'Issue' })

    for (const [order, values] of [
      ['descending', ['3', '2', '1']],
      ['ascending', ['1', '2', '3']],
      [undefined, ['1', '3', '2']],
      ['descending', ['3', '2', '1']],
    ] as const) {
      await userEvent.click(page.getByRole('columnheader', { name: 'Severity' }))
      expect(severity.getAttribute('aria-sort')).toBe(order ?? null)
      expect(screen.getAllByCSS('tbody td:first-child').map(cell => cell.textContent)).toEqual(values)
    }

    await userEvent.click(page.getByRole('columnheader', { name: 'Issue' }))
    expect(issue).toHaveAttribute('aria-sort', 'ascending')
    expect(severity).not.toHaveAttribute('aria-sort')
    expect(screen.getAllByCSS('tbody td:nth-child(2)').map(cell => cell.textContent)).toEqual([
      'Button alignment', 'Card image is missing', 'Dialog does not close',
    ])
  })

  it.each([undefined, 'mdi-swap-vertical'])('should respect column orders and the unsorted icon %s', async sortIcon => {
    render(() => (
      <VDataTable
        headers={ HEADERS }
        items={ ITEMS }
        sortAscIcon="mdi-arrow-up"
        sortDescIcon="mdi-arrow-down"
        sortIcon={ sortIcon }
      >
        {{
          'header.severity': ({ column, getSortIcon }) => (
            <span>{ column.title } <span data-testid="sort-icon">{ String(getSortIcon(column)) }</span></span>
          ),
        }}
      </VDataTable>
    ))

    const severity = screen.getByRole('columnheader', { name: /Severity/ })
    const icon = screen.getByTestId('sort-icon')
    expect(icon).toHaveTextContent(sortIcon ?? 'mdi-arrow-down')
    expect(severity).not.toHaveAttribute('aria-sort')

    await userEvent.click(page.getByRole('columnheader', { name: /Severity/ }))
    expect(icon).toHaveTextContent('mdi-arrow-down')
    await userEvent.click(page.getByRole('columnheader', { name: /Severity/ }))
    expect(icon).toHaveTextContent('mdi-arrow-up')
    await userEvent.click(page.getByRole('columnheader', { name: /Severity/ }))
    expect(icon).toHaveTextContent(sortIcon ?? 'mdi-arrow-down')
  })

  it('should preserve an explicit sort-by order over the column initial order', () => {
    render(() => (
      <VDataTable headers={ HEADERS } items={ ITEMS } sortBy={[{ key: 'severity', order: 'asc' }]} />
    ))

    expect(screen.getByRole('columnheader', { name: 'Severity' })).toHaveAttribute('aria-sort', 'ascending')
    expect(screen.getAllByCSS('tbody td:first-child').map(cell => cell.textContent)).toEqual(['1', '2', '3'])
  })

  it('should use the column initial order when sorting with Enter', async () => {
    render(() => <VDataTable headers={ HEADERS } items={ ITEMS } />)

    const severity = screen.getByRole('columnheader', { name: 'Severity' })
    const lock = await commands.getLock()
    try {
      severity.focus()
      await userEvent.keyboard('{Enter}')
      expect(severity).toHaveAttribute('aria-sort', 'descending')
    } finally {
      await commands.releaseLock(lock)
    }
  })

  it('should use the column order when selecting and toggling a mobile sort chip', async () => {
    const updateSortBy = vi.fn()
    render(() => (
      <VDataTable headers={ HEADERS } items={ ITEMS } mobile onUpdate:sortBy={ updateSortBy } />
    ))

    await userEvent.click(screen.getByCSS('.v-data-table__td-sort-select'))
    await userEvent.click(screen.getByRole('option', { name: 'Severity' }))
    expect(updateSortBy).toHaveBeenLastCalledWith([{ key: 'severity', order: 'desc' }])

    await userEvent.click(screen.getByCSS('.v-chip'))
    expect(updateSortBy).toHaveBeenLastCalledWith([{ key: 'severity', order: 'asc' }])
    await userEvent.click(screen.getByCSS('.v-chip'))
    expect(updateSortBy).toHaveBeenLastCalledWith([{ key: 'severity', order: 'desc' }])
  })

  it('should not sort disabled columns even when an initial order is specified', async () => {
    const updateSortBy = vi.fn()
    render(() => <VDataTable headers={ HEADERS } items={ ITEMS } disableSort onUpdate:sortBy={ updateSortBy } />)

    await userEvent.click(page.getByRole('columnheader', { name: 'Severity' }))
    expect(updateSortBy).not.toHaveBeenCalled()
  })
})
