// Components
import { VSplitBtn } from '../VSplitBtn'

// Utilities
import { render, screen, userEvent } from '@test'
import { shallowRef } from 'vue'

describe('VSplitBtn', () => {
  it('should run the action without opening the menu', async () => {
    const onClick = vi.fn()
    const menu = shallowRef(false)
    render(() => (
      <VSplitBtn v-model:menu={ menu.value } text="Save" onClick={ onClick }>
        {{ menu: () => <div>Save as</div> }}
      </VSplitBtn>
    ))

    await userEvent.click(screen.getByText('Save'))

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
