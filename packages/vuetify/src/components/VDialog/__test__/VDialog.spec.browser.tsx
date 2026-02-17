// Components
import { VDialog } from '../VDialog'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

// Tests
describe('VDialog', () => {
  it('should render correctly', async () => {
    const model = ref(false)
    render(() => (
      <div>
        <VDialog v-model={ model.value } data-testid="dialog">
          <div data-testid="content">Content</div>
        </VDialog>
      </div>
    ))

    expect(screen.queryByTestId('dialog')).toBeNull()

    model.value = true
    await nextTick()
    await expect(screen.findByTestId('dialog')).resolves.toBeVisible()
    await expect.element(await screen.findByTestId('content')).toBeVisible()

    await commands.click(0, 0)
    await expect.poll(() => model.value).toBeFalsy()
    await expect.poll(() => screen.queryByTestId('dialog')).toBeNull()
    await expect.poll(() => screen.queryByTestId('content')).toBeNull()
  })

  it('should emit afterLeave', async () => {
    const model = ref(true)
    const onAfterLeave = vi.fn()
    render(() => (
      <div>
        <VDialog v-model={ model.value } onAfterLeave={ onAfterLeave }>
          <div data-test="content">Content</div>
        </VDialog>
      </div>
    ))

    await commands.click(0, 0)
    await expect.poll(() => onAfterLeave).toHaveBeenCalledTimes(1)
  })

  it('should focus on the last element when shift + tab key is pressed on the first element', async () => {
    const model = ref(true)
    render(() => (
      <div>
        <VDialog v-model={ model.value } persistent>
          <div>
            <button data-testid="first">First</button>
            <button data-testid="last">Last</button>
          </div>
        </VDialog>
      </div>
    ))
    const first = screen.getByCSS('button[data-testid="first"]')
    const last = screen.getByCSS('button[data-testid="last"]')

    first.focus()
    await expect.poll(() => document.activeElement).toBe(first)

    await userEvent.tab({ shift: true })
    await expect.poll(() => document.activeElement).toBe(last)
  })

  it('should focus on the first element when Tab key is pressed on the last element', async () => {
    const model = ref(true)
    render(() => (
      <div>
        <VDialog v-model={ model.value }>
          <div>
            <button data-testid="first">First</button>
            <button data-testid="last">Last</button>
          </div>
        </VDialog>
      </div>
    ))
    const first = screen.getByCSS('button[data-testid="first"]')
    const last = screen.getByCSS('button[data-testid="last"]')

    last.focus()
    await expect.poll(() => document.activeElement).toBe(last)

    await userEvent.tab()
    await expect.poll(() => document.activeElement).toBe(first)
  })
})
