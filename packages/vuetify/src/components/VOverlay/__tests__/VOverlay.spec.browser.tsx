// Components
import { VOverlay } from '../VOverlay'
import { VApp } from '@/components/VApp'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer'

// Utilities
import { commands, isClickable, render, screen, userEvent } from '@test'
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

    await userEvent.click(screen.getByCSS('.v-overlay__scrim'))
    await expect.poll(() => screen.queryAllByTestId('content')).toHaveLength(0)
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

    await userEvent.click(screen.getByCSS('.v-overlay__scrim'))

    await expect.poll(() => screen.queryAllByTestId('content')).toHaveLength(0)
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
    await expect(isClickable(screen.getByTestId('drawer'))).resolves.toBe(true)

    await userEvent.click(screen.getByTestId('activator'))

    await commands.waitStable('.v-overlay__content')
    expect(screen.getByTestId('content')).toBeVisible()

    await expect(isClickable(screen.getByTestId('drawer'))).resolves.toBe(false)

    await userEvent.click(screen.getByCSS('.v-overlay__scrim'))

    await expect.poll(() => screen.queryAllByTestId('content')).toHaveLength(0)
    expect(screen.getByTestId('drawer')).toBeVisible()
    await expect(isClickable(screen.getByTestId('drawer'))).resolves.toBe(true)
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

    await expect(isClickable(screen.getByTestId('first-activator'))).resolves.toBe(false)

    await userEvent.click(screen.getAllByCSS('.v-overlay__scrim').at(-1)!)

    await expect.poll(() => screen.queryAllByTestId('second-content')).toHaveLength(0)
    expect(screen.getByTestId('first-content')).toBeVisible()
    await expect(isClickable(screen.getByTestId('first-activator'))).resolves.toBe(false)

    await userEvent.click(screen.getByCSS('.v-overlay__scrim'))

    await expect.poll(() => screen.queryAllByTestId('first-content')).toHaveLength(0)
    await expect(isClickable(screen.getByTestId('first-activator'))).resolves.toBe(true)
  })
})
