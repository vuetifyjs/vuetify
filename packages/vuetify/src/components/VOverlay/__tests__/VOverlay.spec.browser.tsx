// Components
import { VOverlay } from '../VOverlay'
import { VApp } from '@/components/VApp'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer'

// Utilities
import { commands, render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'

describe('VOverlay', () => {
  it('without activator', async () => {
    const model = ref(false)
    render(() => (
      <div data-testid="container">
        <VLayout>
          <VOverlay v-model={ model.value }>
            <div data-testid="content">Content</div>
          </VOverlay>
        </VLayout>
      </div>
    ))

    expect(screen.queryAllByTestId('content')).toHaveLength(0)
    model.value = true

    await commands.waitStable('.v-overlay__content')
    expect(screen.queryAllByTestId('content')).toHaveLength(1)

    await userEvent.click(screen.getByTestId('container'))
    await wait(400)
    expect(screen.queryAllByTestId('content')).toHaveLength(0)
    expect(model.value).toBe(false)
  })

  it('should use activator', async () => {
    render(() => (
      <div data-testid="container">
        <VLayout>
          <VOverlay>
            {{
              activator: ({ props }) => <div { ...props } data-testid="activator">Click me</div>,
              default: () => <div data-testid="content">Content</div>,
            }}
          </VOverlay>
        </VLayout>
      </div>
    ))

    expect(screen.queryAllByTestId('content')).toHaveLength(0)

    await userEvent.click(screen.getByTestId('activator'))

    await commands.waitStable('.v-overlay__content')
    expect(screen.getByTestId('content')).toBeVisible()

    await userEvent.click(screen.getByTestId('container'))

    await wait(400)
    expect(screen.queryAllByTestId('content')).toHaveLength(0)
  })

  it('should render overlay on top of layout', async () => {
    render(() => (
      <VApp>
        <VNavigationDrawer permanent class="bg-blue" data-testid="drawer" />
        <VMain>
          <div data-testid="container">
            <VOverlay>
              {{
                activator: ({ props }) => <div { ...props } data-testid="activator">Click me</div>,
                default: () => <div data-testid="content">Content</div>,
              }}
            </VOverlay>
          </div>
        </VMain>
      </VApp>
    ))

    expect(screen.queryAllByTestId('content')).toHaveLength(0)

    await userEvent.click(screen.getByTestId('activator'))

    await commands.waitStable('.v-overlay__content')
    expect(screen.getByTestId('content')).toBeVisible()

    // does not work the same as in Cypress, we need a workaround
    // await expect(screen.queryByTestId('drawer')).not.toBeVisible()

    await userEvent.click(screen.getByTestId('container'))

    await wait(400)
    expect(screen.queryAllByTestId('content')).toHaveLength(0)
    expect(screen.getByTestId('drawer')).toBeVisible()
  })

  it('should render nested overlays', async () => {
    render(() => (
      <VApp>
        <div data-testid="container">
          <VOverlay>
            {{
              activator: ({ props }) => <div { ...props } data-testid="first-activator">Click me</div>,
              default: () => (
                <div data-testid="first-content">
                  <VOverlay>
                    {{
                      activator: ({ props }) => <div { ...props } data-testid="second-activator">Click me nested</div>,
                      default: () => <div data-testid="second-content">Content</div>,
                    }}
                  </VOverlay>
                </div>
              ),
            }}
          </VOverlay>
        </div>
      </VApp>
    ))

    expect(screen.queryAllByTestId('first-content')).toHaveLength(0)

    await userEvent.click(screen.getByTestId('first-activator'))

    await commands.waitStable('.v-overlay__content')
    expect(screen.getByTestId('first-content')).toBeVisible()

    expect(screen.queryAllByTestId('second-content')).toHaveLength(0)

    await userEvent.click(screen.getByTestId('second-activator'))

    await commands.waitStable('.v-overlay__content')
    expect(screen.getByTestId('second-content')).toBeVisible()

    // does not work the same as in Cypress, we need a workaround
    // await expect(screen.queryByTestId('first-content')).not.toBeVisible()

    await userEvent.click(screen.getByTestId('container'))

    await wait(400)
    expect(screen.queryAllByTestId('second-content')).toHaveLength(0)
    expect(screen.getByTestId('first-content')).toBeVisible()

    await userEvent.click(screen.getByTestId('container'))

    await wait(400)
    expect(screen.queryAllByTestId('first-content')).toHaveLength(0)
  })
})
