// Components
import { VWindow } from '../VWindow'
import { VWindowItem } from '../VWindowItem'

// Utilities
import { commands, generate, page, render, screen, userEvent } from '@test'

const stories = {
  'Without arrows': (
    <VWindow>
      <VWindowItem>
        <div class="bg-grey d-flex justify-center align-center">
          <h1>1. foo</h1>
        </div>
      </VWindowItem>
      <VWindowItem>
        <div class="bg-grey d-flex justify-center align-center">
          <h1>2. bar</h1>
        </div>
      </VWindowItem>
    </VWindow>
  ),
  'With arrows': (
    <VWindow showArrows>
      <VWindowItem>
        <div class="bg-grey d-flex justify-center align-center">
          <h1>1. foo</h1>
        </div>
      </VWindowItem>
      <VWindowItem>
        <div class="bg-grey d-flex justify-center align-center">
          <h1>2. bar</h1>
        </div>
      </VWindowItem>
    </VWindow>
  ),
  Vertical: (
    <VWindow direction="vertical" verticalArrows="right" continuous showArrows>
      <VWindowItem value="one">
        <div class="bg-grey d-flex justify-center align-center py-16">
          <h1>1. foo</h1>
        </div>
      </VWindowItem>
      <VWindowItem value="two">
        <div class="bg-grey d-flex justify-center align-center py-16">
          <h1>2. bar</h1>
        </div>
      </VWindowItem>
    </VWindow>
  ),
}

describe('VWindow', () => {
  it('should have clickable arrows', async () => {
    render(() => (
      <VWindow showArrows>
        <VWindowItem>
          <div class="bg-grey d-flex justify-center align-center">
            <h1>1. foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem>
          <div class="bg-grey d-flex justify-center align-center">
            <h1>2. bar</h1>
          </div>
        </VWindowItem>
        <VWindowItem>
          <div class="bg-grey d-flex justify-center align-center">
            <h1>3. baz</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    let arrows = screen.getAllByCSS('.v-window__controls > .v-btn')
    expect(arrows).toHaveLength(1)
    await userEvent.click(arrows[0])
    arrows = screen.getAllByCSS('.v-window__controls > .v-btn')
    expect(arrows).toHaveLength(2)
    await userEvent.click(arrows[1])
    arrows = screen.getAllByCSS('.v-window__controls > .v-btn')
    expect(arrows).toHaveLength(1)
  })

  it('should not wrap around by default', async () => {
    render(() => (
      <VWindow showArrows>
        <VWindowItem>
          <div class="bg-grey d-flex justify-center align-center">
            <h1>1. foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem>
          <div class="bg-grey d-flex justify-center align-center">
            <h1>2. bar</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('1. foo')

    let arrows = screen.getAllByCSS('.v-window__controls > .v-btn')
    expect(arrows).toHaveLength(1)
    await userEvent.click(arrows[0])

    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('2. bar')

    arrows = screen.getAllByCSS('.v-window__controls > .v-btn')
    expect(arrows).toHaveLength(1)
    await userEvent.click(arrows[0])

    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('1. foo')
  })

  it('should wrap around when using continuous prop', async () => {
    render(() => (
      <VWindow showArrows continuous>
        <VWindowItem>
          <div class="bg-grey d-flex justify-center align-center">
            <h1>1. foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem>
          <div class="bg-grey d-flex justify-center align-center">
            <h1>2. bar</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('1. foo')
    await userEvent.click(screen.getAllByCSS('.v-window__controls > .v-btn')[0])
    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('2. bar')
    await userEvent.click(screen.getAllByCSS('.v-window__controls > .v-btn')[1])
    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('1. foo')
  })

  it('should emit new value when clicking arrows', async () => {
    const values: string[] = []
    render(() => (
      <VWindow showArrows modelValue="two" onUpdate:modelValue={ (v: string) => values.push(v) }>
        <VWindowItem value="one">
          <div class="bg-grey d-flex justify-center align-center">
            <h1>1. foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem value="two">
          <div class="bg-grey d-flex justify-center align-center">
            <h1>2. bar</h1>
          </div>
        </VWindowItem>
        <VWindowItem value="three">
          <div class="bg-grey d-flex justify-center align-center">
            <h1>3. baz</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    await userEvent.click(screen.getAllByCSS('.v-window__controls > .v-btn')[0])
    await userEvent.click(screen.getAllByCSS('.v-window__controls > .v-btn')[1])
    expect(values).toEqual(['one', 'three'])
  })

  it('should support touch control', async () => {
    await page.viewport(500, 300)

    render(() => (
      <VWindow>
        <VWindowItem value="one">
          <div class="bg-grey d-flex justify-center align-center">
            <h1>1. foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem value="two">
          <div class="bg-grey d-flex justify-center align-center">
            <h1>2. bar</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('1. foo')

    await commands.drag([200, 15], [50, 15])
    await commands.waitStable('.v-window')
    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('2. bar')

    await commands.drag([50, 15], [200, 15])
    await commands.waitStable('.v-window')
    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('1. foo')
  })

  it('should skip disabled items', async () => {
    render(() => (
      <VWindow showArrows>
        <VWindowItem value="one">
          <div class="bg-grey d-flex justify-center align-center">
            <h1>1. foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem value="two" disabled>
          <div class="bg-grey d-flex justify-center align-center">
            <h1>2. bar</h1>
          </div>
        </VWindowItem>
        <VWindowItem value="three">
          <div class="bg-grey d-flex justify-center align-center">
            <h1>3. baz</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    const arrows = screen.getAllByCSS('.v-window__controls > .v-btn')
    await userEvent.click(arrows[0])
    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('3. baz')
  })

  it('should disable touch support', async () => {
    await page.viewport(500, 300)

    render(() => (
      <VWindow touch={ false }>
        <VWindowItem value="one">
          <div class="bg-grey d-flex justify-center align-center">
            <h1>1. foo</h1>
          </div>
        </VWindowItem>
        <VWindowItem value="two">
          <div class="bg-grey d-flex justify-center align-center">
            <h1>1. bar</h1>
          </div>
        </VWindowItem>
      </VWindow>
    ))

    await commands.drag([200, 15], [50, 15])
    await commands.waitStable('.v-window')
    expect(screen.getByCSS('.v-window-item--active h1')).toHaveTextContent('1. foo')
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
