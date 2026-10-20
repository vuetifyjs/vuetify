// Components
import { VSplitBtn } from '../VSplitBtn'
import { VBtn } from '@/components/VBtn'
import { VBtnGroup } from '@/components/VBtnGroup'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Utilities
import { render, screen, userEvent } from '@test'
import { shallowRef } from 'vue'

describe('VSplitBtn', () => {
  describe.each([
    ['default', 36],
    ['comfortable', 28],
    ['compact', 24],
  ] as const)('%s density', (density, height) => {
    it.each([undefined, '$vuetify'])('should match the default button size with icon %s', async icon => {
      const { container } = render(() => (
        <>
          <VSplitBtn text="Save" density={ density } icon={ icon } />
          <VSplitBtn text="Save" size="default" density={ density } icon={ icon } />
          <VBtn density={ density }>Reference</VBtn>
        </>
      ))

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(5)
      buttons.forEach(button => expect(button.tagName).toBe('BUTTON'))

      const elements = [...container.querySelectorAll('.v-split-btn'), ...buttons]
      await expect.poll(() => elements.map(element => element.getBoundingClientRect().height))
        .toEqual(Array(7).fill(height))
    })
  })

  it.each([
    ['large', 44],
    [52, 52],
  ] as const)('should respect an explicit size of %s', async (size, height) => {
    const { container } = render(() => <VSplitBtn text="Save" size={ size } />)

    const elements = [...container.querySelectorAll('.v-split-btn'), ...screen.getAllByRole('button')]
    await expect.poll(() => elements.map(element => element.getBoundingClientRect().height))
      .toEqual([height, height, height])
  })

  it('should respect global size defaults and explicit overrides', async () => {
    const { container } = render(() => (
      <>
        <VSplitBtn text="Save" />
        <VSplitBtn text="Save" size="small" />
      </>
    ), null, { defaults: { VSplitBtn: { size: 'large' } } })

    const groups = [...container.querySelectorAll('.v-split-btn')]
    await expect.poll(() => groups.map(group => [
      group.getBoundingClientRect().height,
      ...Array.from(group.querySelectorAll('button'), button => button.getBoundingClientRect().height),
    ])).toEqual([[44, 44, 44], [28, 28, 28]])
  })

  it('should react to size defaults from a provider', async () => {
    const size = shallowRef('large')
    const { container } = render(() => (
      <VDefaultsProvider defaults={{ VSplitBtn: { size: size.value } }}>
        <VSplitBtn text="Save" />
      </VDefaultsProvider>
    ))

    const elements = [...container.querySelectorAll('.v-split-btn'), ...screen.getAllByRole('button')]
    await expect.poll(() => elements.map(element => element.getBoundingClientRect().height))
      .toEqual([44, 44, 44])

    size.value = 'small'
    await expect.poll(() => elements.map(element => element.getBoundingClientRect().height))
      .toEqual([28, 28, 28])
  })

  it('should retain the height of a button group without a size', async () => {
    const { container } = render(() => (
      <VBtnGroup>
        <VBtn>Save</VBtn>
        <VBtn>Cancel</VBtn>
      </VBtnGroup>
    ))

    const elements = [...container.querySelectorAll('.v-btn-group'), ...screen.getAllByRole('button')]
    await expect.poll(() => elements.map(element => element.getBoundingClientRect().height))
      .toEqual([48, 48, 48])
  })

  it('should run the action without opening the menu', async () => {
    const onClick = vi.fn()
    const menu = shallowRef(false)
    render(() => (
      <VSplitBtn v-model:menu={ menu.value } text="Save" onClick={ onClick }>
        {{ menu: () => <div>Save as</div> }}
      </VSplitBtn>
    ))

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(menu.value).toBe(false)
  })

  it('should toggle the menu from the labelled trailing button', async () => {
    const menu = shallowRef(false)
    render(() => (
      <VSplitBtn v-model:menu={ menu.value } text="Save">
        {{ menu: () => <div>Save as</div> }}
      </VSplitBtn>
    ))

    const toggle = screen.getByRole('button', { name: 'More options' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(toggle)

    expect(menu.value).toBe(true)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveClass('v-btn--active')
    await expect.poll(() => screen.queryByText('Save as')).toBeVisible()
  })

  it('should disable both buttons', () => {
    render(() => <VSplitBtn text="Save" disabled />)

    screen.getAllByRole('button').forEach(button => expect(button).toBeDisabled())
  })
})
