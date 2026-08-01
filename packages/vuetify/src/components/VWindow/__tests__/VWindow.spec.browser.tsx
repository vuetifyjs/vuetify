// Components
import { VWindow } from '../VWindow'
import { VWindowItem } from '../VWindowItem'

// Utilities
import { commands, page, render, screen, showcase, userEvent, wait, wheel } from '@test'
import { ref } from 'vue'

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

    await commands.waitStable('.v-window')

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

    await commands.waitStable('.v-window')
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

  it('should navigate horizontal windows with horizontal or shift+wheel input', async () => {
    const model = ref(1)

    render(() => (
      <VWindow v-model={ model.value } wheel>
        <VWindowItem value={ 1 }>
          <div class="bg-grey d-flex justify-center align-center"><h1>1. foo</h1></div>
        </VWindowItem>
        <VWindowItem value={ 2 }>
          <div class="bg-grey d-flex justify-center align-center"><h1>2. bar</h1></div>
        </VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    const windowEl = screen.getByCSS('.v-window')

    // vertical wheel is ignored on a horizontal window
    expect(wheel(windowEl, { deltaY: 100 })).toBe(true)
    expect(model.value).toBe(1)

    // horizontal wheel navigates and prevents default
    expect(wheel(windowEl, { deltaX: 100 })).toBe(false)
    await commands.waitStable('.v-window')
    expect(model.value).toBe(2)

    // a second wheel within the debounce window is swallowed
    wheel(windowEl, { deltaX: -100 })
    await commands.waitStable('.v-window')
    expect(model.value).toBe(2)

    // once the debounce window passes, shift+wheel navigates back
    await wait(160)
    expect(wheel(windowEl, { deltaY: -100, shiftKey: true })).toBe(false)
    await commands.waitStable('.v-window')
    expect(model.value).toBe(1)
  })

  it('should navigate vertical windows only with vertical wheel input', async () => {
    const model = ref(1)

    render(() => (
      <VWindow v-model={ model.value } wheel direction="vertical">
        <VWindowItem value={ 1 }>
          <div class="bg-grey d-flex justify-center align-center"><h1>1. foo</h1></div>
        </VWindowItem>
        <VWindowItem value={ 2 }>
          <div class="bg-grey d-flex justify-center align-center"><h1>2. bar</h1></div>
        </VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    const windowEl = screen.getByCSS('.v-window')

    // horizontal and shift+wheel (horizontal intent) are ignored on a vertical window
    expect(wheel(windowEl, { deltaX: 100 })).toBe(true)
    expect(wheel(windowEl, { deltaY: 100, shiftKey: true })).toBe(true)
    expect(model.value).toBe(1)

    // vertical wheel navigates and prevents default
    expect(wheel(windowEl, { deltaY: 100 })).toBe(false)
    await commands.waitStable('.v-window')
    expect(model.value).toBe(2)
  })

  describe('keyboard controls', () => {
    it('should support horizontal keyboard navigation', async () => {
      const model = ref(1)

      render(() => (
        <VWindow v-model={ model.value } showArrows continuous>
          <VWindowItem value={ 1 }>
            <div class="bg-grey d-flex justify-center align-center">
              <h1>1. foo</h1>
            </div>
          </VWindowItem>
          <VWindowItem value={ 2 }>
            <div class="bg-grey d-flex justify-center align-center">
              <h1>2. bar</h1>
            </div>
          </VWindowItem>
          <VWindowItem value={ 3 }>
            <div class="bg-grey d-flex justify-center align-center">
              <h1>3. baz</h1>
            </div>
          </VWindowItem>
        </VWindow>
      ))

      await commands.waitStable('.v-window')
      const button = screen.getAllByCSS('.v-window__controls > .v-btn')[0]
      await button.focus()

      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe(1)
      await userEvent.keyboard('{ArrowRight}')
      expect(model.value).toBe(2)
      await userEvent.keyboard('{ArrowLeft}')
      expect(model.value).toBe(1)
      await userEvent.keyboard('{ArrowLeft}')
      expect(model.value).toBe(3)
      await userEvent.keyboard('{ArrowRight}')
      expect(model.value).toBe(1)
    })

    it('should support vertical keyboard navigation', async () => {
      const model = ref(1)

      render(() => (
        <VWindow v-model={ model.value } showArrows continuous direction="vertical">
          <VWindowItem value={ 1 }>
            <div class="bg-grey d-flex justify-center align-center">
              <h1>1. foo</h1>
            </div>
          </VWindowItem>
          <VWindowItem value={ 2 }>
            <div class="bg-grey d-flex justify-center align-center">
              <h1>2. bar</h1>
            </div>
          </VWindowItem>
          <VWindowItem value={ 3 }>
            <div class="bg-grey d-flex justify-center align-center">
              <h1>3. baz</h1>
            </div>
          </VWindowItem>
        </VWindow>
      ))

      await commands.waitStable('.v-window')
      const button = screen.getAllByCSS('.v-window__controls > .v-btn')[0]
      await button.focus()

      await userEvent.keyboard('{ArrowLeft}')
      expect(model.value).toBe(1)
      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe(2)
      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe(1)
      await userEvent.keyboard('{ArrowUp}')
      expect(model.value).toBe(3)
      await userEvent.keyboard('{ArrowDown}')
      expect(model.value).toBe(1)
    })
  })

  showcase({ stories })
})
