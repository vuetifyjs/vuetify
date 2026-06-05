// Components
import { VTreeview } from '../VTreeview'

// Utilities
import { render, screen, userEvent, waitAnimationFrame, waitIdle } from '@test'
import { nextTick } from 'vue'

const items = [
  {
    id: 1,
    title: 'Vuetify Human Resources',
    children: [
      {
        id: 2,
        title: 'Core team',
        children: [
          { id: 201, title: 'John' },
          { id: 202, title: 'Kael' },
          { id: 203, title: 'Nekosaur', disabled: true },
          { id: 204, title: 'Jacek' },
          { id: 205, title: 'Andrew' },
        ],
      },
      {
        id: 3,
        title: 'Administrators',
        children: [
          { id: 301, title: 'Mike' },
          { id: 302, title: 'Hunt' },
        ],
      },
      { id: 4, title: 'Other contributors' },
    ],
  },
]

describe('VTreeview a11y', () => {
  function treeitem (title: string) {
    return screen.getByText(new RegExp(title)).closest('[role="treeitem"]')!
  }

  it('exposes tree role and treeitem positional aria attributes', async () => {
    render(() => (
      <VTreeview openAll items={ items } itemValue="id" />
    ))

    expect(screen.getByCSS('.v-treeview')).toHaveAttribute('role', 'tree')

    const root = treeitem('Vuetify Human Resources')
    expect(root).toHaveAttribute('aria-level', '1')
    expect(root).toHaveAttribute('aria-posinset', '1')
    expect(root).toHaveAttribute('aria-setsize', '1')

    // Core team / Administrators / Other contributors are the three children at level 2
    const coreTeam = treeitem('Core team')
    expect(coreTeam).toHaveAttribute('aria-level', '2')
    expect(coreTeam).toHaveAttribute('aria-posinset', '1')
    expect(coreTeam).toHaveAttribute('aria-setsize', '3')

    const otherContributors = treeitem('Other contributors')
    expect(otherContributors).toHaveAttribute('aria-level', '2')
    expect(otherContributors).toHaveAttribute('aria-posinset', '3')
    expect(otherContributors).toHaveAttribute('aria-setsize', '3')

    // A leaf at level 3
    const john = treeitem('John')
    expect(john).toHaveAttribute('aria-level', '3')
    expect(john).toHaveAttribute('aria-posinset', '1')
    expect(john).toHaveAttribute('aria-setsize', '5')
  })

  it('emits aria-expanded only on expandable nodes and reflects open state', async () => {
    render(() => (
      <VTreeview items={ items } itemValue="id" openOnClick />
    ))

    // Collapsed parent announces as expandable
    const root = treeitem('Vuetify Human Resources')
    expect(root).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(screen.getByText(/Vuetify Human Resources/))
    await waitIdle()
    expect(treeitem('Vuetify Human Resources')).toHaveAttribute('aria-expanded', 'true')

    // Leaves never carry aria-expanded
    expect(treeitem('Other contributors')).not.toHaveAttribute('aria-expanded')
  })

  it('exposes aria-multiselectable and aria-label on a selectable tree', async () => {
    render(() => (
      <VTreeview items={ items } itemValue="id" selectable selectStrategy="classic" aria-label="Org" />
    ))

    const tree = screen.getByCSS('.v-treeview')
    expect(tree).toHaveAttribute('aria-multiselectable', 'true')
    expect(tree).toHaveAttribute('aria-label', 'Org')
  })

  it('keeps the expand/collapse toggle out of the tab order', async () => {
    render(() => (
      <VTreeview items={ items } itemValue="id" />
    ))

    const toggles = screen.getAllByCSS('.v-treeview-item__toggle')
    expect(toggles.length).toBeGreaterThan(0)
    toggles.forEach(toggle => expect(toggle).toHaveAttribute('tabindex', '-1'))
  })

  it('ArrowRight expands a collapsed parent, then moves focus to its first child', async () => {
    render(() => (
      <VTreeview items={ items } itemValue="id" />
    ))

    expect(treeitem('Vuetify Human Resources')).toHaveAttribute('aria-expanded', 'false')

    await userEvent.tab()
    expect(document.activeElement).toBe(treeitem('Vuetify Human Resources'))

    await userEvent.keyboard('{ArrowRight}')
    await waitIdle()
    expect(treeitem('Vuetify Human Resources')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Core team/)).toBeVisible()

    await userEvent.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(treeitem('Core team'))
  })

  it('ArrowLeft collapses an expanded parent, then moves focus to its parent', async () => {
    render(() => (
      <VTreeview items={ items } itemValue="id" openAll />
    ))

    expect(treeitem('Core team')).toHaveAttribute('aria-expanded', 'true')

    await userEvent.tab() // focus the root
    await userEvent.keyboard('{ArrowDown}') // move to Core team
    expect(document.activeElement).toBe(treeitem('Core team'))

    await userEvent.keyboard('{ArrowLeft}') // collapse it
    await waitIdle()
    expect(treeitem('Core team')).toHaveAttribute('aria-expanded', 'false')

    await userEvent.keyboard('{ArrowLeft}') // move to its parent
    expect(document.activeElement).toBe(treeitem('Vuetify Human Resources'))
  })

  it('ArrowDown / ArrowUp move focus through visible items', async () => {
    render(() => (
      <VTreeview items={ items } itemValue="id" openAll />
    ))

    await userEvent.tab()
    expect(document.activeElement).toBe(treeitem('Vuetify Human Resources'))

    await userEvent.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(treeitem('Core team'))

    await userEvent.keyboard('{ArrowUp}')
    expect(document.activeElement).toBe(treeitem('Vuetify Human Resources'))
  })

  it('* expands all sibling parents at the focused level', async () => {
    render(() => (
      <VTreeview items={ items } itemValue="id" />
    ))

    // Open the root and move focus to its first child (Core team)
    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}') // expand the root
    await waitIdle()
    await userEvent.keyboard('{ArrowRight}') // move to Core team
    expect(document.activeElement).toBe(treeitem('Core team'))

    expect(treeitem('Core team')).toHaveAttribute('aria-expanded', 'false')
    expect(treeitem('Administrators')).toHaveAttribute('aria-expanded', 'false')

    // `*` is awkward to synthesize via userEvent (shifted key); dispatch directly
    document.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key: '*', bubbles: true }))
    await waitIdle()

    expect(treeitem('Core team')).toHaveAttribute('aria-expanded', 'true')
    expect(treeitem('Administrators')).toHaveAttribute('aria-expanded', 'true')
  })

  it('marks a collapsing subtree inert so focus can not enter it', async () => {
    render(() => (
      <VTreeview items={ items } itemValue="id" openAll />
    ))

    const itemsContainer = treeitem('Core team')
      .closest('.v-list-group')!
      .querySelector(':scope > .v-list-group__items')!
    expect(itemsContainer).not.toHaveAttribute('inert')

    await userEvent.tab() // focus the root
    await userEvent.keyboard('{ArrowDown}') // move to Core team
    await userEvent.keyboard('{ArrowLeft}') // collapse it
    await nextTick()

    expect(itemsContainer).toHaveAttribute('inert')
  })

  it('does not move focus into a subtree that is mid-collapse', async () => {
    render(() => (
      <VTreeview items={ items } itemValue="id" openAll />
    ))
    // Let ssr-boot settle so the collapse transition is actually live (the bug
    // window only exists while the subtree is still laid out but on its way out).
    await waitAnimationFrame()

    await userEvent.tab() // focus the root
    await userEvent.keyboard('{ArrowDown}') // move to Core team
    await userEvent.keyboard('{ArrowLeft}') // collapse Core team
    await nextTick()
    await userEvent.keyboard('{ArrowDown}') // navigate before the transition ends

    // Focus skips the collapsing children (John/Kael/...) and lands on the sibling.
    expect(document.activeElement).toBe(treeitem('Administrators'))
  })
})
