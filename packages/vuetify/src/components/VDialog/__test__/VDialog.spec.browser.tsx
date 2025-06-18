// Components
import { VDialog } from '../VDialog'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

// Tests
describe('VDialog', () => {
  it('should render correctly', async () => {
    const model = ref(false)
    const { element } = render(() => (
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

    await userEvent.click(element)
    await expect.poll(() => model.value).toBeFalsy()
    await expect.poll(() => screen.queryByTestId('dialog')).toBeNull()
    await expect.poll(() => screen.queryByTestId('content')).toBeNull()
  })

  it('should emit afterLeave', async () => {
    const model = ref(true)
    const onAfterLeave = vi.fn()
    const { element } = render(() => (
      <div>
        <VDialog v-model={ model.value } onAfterLeave={ onAfterLeave }>
          <div data-test="content">Content</div>
        </VDialog>
      </div>
    ))

    await userEvent.click(element)
    await expect.poll(() => onAfterLeave).toHaveBeenCalledTimes(1)
  })
})
