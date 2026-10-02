// Components
import { VWindow } from '../VWindow'
import { VWindowItem } from '../VWindowItem'

// Utilities
import { commands, page, render, screen, showcase, userEvent, wait } from '@test'
import { ref } from 'vue'

function wheel (element: Element, options: WheelEventInit) {
  const event = new WheelEvent('wheel', { bubbles: true, cancelable: true, ...options })
  element.dispatchEvent(event)
  return event
}

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

  it('should animate wraps in the step direction and jumps in index order', async () => {
    const model = ref(1)

    render(() => (
      <VWindow v-model={ model.value } continuous showArrows>
        <VWindowItem value={ 1 }><h1>1</h1></VWindowItem>
        <VWindowItem value={ 2 }><h1>2</h1></VWindowItem>
        <VWindowItem value={ 3 }><h1>3</h1></VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    await userEvent.click(screen.getByCSS('.v-window__left'))
    expect(model.value).toBe(3)
    await expect.poll(() => document.querySelector('.v-window-x-reverse-transition-enter-active')).toBeTruthy()

    await commands.waitStable('.v-window')
    model.value = 1
    await commands.waitStable('.v-window')
    model.value = 3
    await expect.poll(() => document.querySelector('.v-window-x-transition-enter-active')).toBeTruthy()
  })

  it('should navigate once per wheel gesture', async () => {
    const model = ref(1)

    render(() => (
      <VWindow v-model={ model.value } wheel>
        <VWindowItem value={ 1 }><h1>1</h1></VWindowItem>
        <VWindowItem value={ 2 }><h1>2</h1></VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    const windowEl = screen.getByCSS('.v-window')

    expect(wheel(windowEl, { deltaX: 100 }).defaultPrevented).toBe(true)
    expect(wheel(windowEl, { deltaX: -100 }).defaultPrevented).toBe(true)
    await commands.waitStable('.v-window')
    expect(model.value).toBe(2)

    await wait(160)
    wheel(windowEl, { deltaX: -100 })
    await commands.waitStable('.v-window')
    expect(model.value).toBe(1)
  })

  it('should only use horizontal or shift wheel input on horizontal windows', async () => {
    const model = ref(1)

    render(() => (
      <VWindow v-model={ model.value } wheel>
        <VWindowItem value={ 1 }><h1>1</h1></VWindowItem>
        <VWindowItem value={ 2 }><h1>2</h1></VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    const windowEl = screen.getByCSS('.v-window')

    expect(wheel(windowEl, { deltaY: 100 }).defaultPrevented).toBe(false)
    expect(model.value).toBe(1)

    expect(wheel(windowEl, { deltaY: 100, shiftKey: true }).defaultPrevented).toBe(true)
    await commands.waitStable('.v-window')
    expect(model.value).toBe(2)
  })

  it('should only use vertical wheel input on vertical windows', async () => {
    const model = ref(1)

    render(() => (
      <VWindow v-model={ model.value } direction="vertical" wheel>
        <VWindowItem value={ 1 }><h1>1</h1></VWindowItem>
        <VWindowItem value={ 2 }><h1>2</h1></VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    const windowEl = screen.getByCSS('.v-window')

    expect(wheel(windowEl, { deltaX: 100 }).defaultPrevented).toBe(false)
    expect(wheel(windowEl, { deltaY: 100, shiftKey: true }).defaultPrevented).toBe(false)
    expect(model.value).toBe(1)

    expect(wheel(windowEl, { deltaY: 100 }).defaultPrevented).toBe(true)
    await commands.waitStable('.v-window')
    expect(model.value).toBe(2)
  })

  it('should leave wheel input to a nested scroller until it reaches the end', async () => {
    const model = ref(1)

    render(() => (
      <VWindow v-model={ model.value } wheel>
        <VWindowItem value={ 1 }>
          <div class="scroller" style="overflow-x: auto">
            <div style="width: 300vw; height: 50px" />
          </div>
        </VWindowItem>
        <VWindowItem value={ 2 }><h1>2</h1></VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    const scroller = screen.getByCSS('.scroller')

    expect(wheel(scroller, { deltaX: 100 }).defaultPrevented).toBe(false)
    expect(model.value).toBe(1)

    scroller.scrollLeft = scroller.scrollWidth
    await wait(160)
    expect(wheel(scroller, { deltaX: 100 }).defaultPrevented).toBe(true)
    expect(model.value).toBe(2)
  })

  it('should scroll the nested scroller under the pointer when the wheel target is stale', async () => {
    const model = ref(1)

    render(() => (
      <VWindow v-model={ model.value } wheel>
        <VWindowItem value={ 1 }><h1 class="stale">1</h1></VWindowItem>
        <VWindowItem value={ 2 }>
          <div class="scroller" style="overflow-x: auto">
            <div style="width: 300vw; height: 50px" />
          </div>
        </VWindowItem>
      </VWindow>
    ))

    await commands.waitStable('.v-window')
    model.value = 2
    await commands.waitStable('.v-window')

    const scroller = screen.getByCSS('.scroller')
    const { x, y } = scroller.getBoundingClientRect()

    expect(wheel(screen.getByCSS('.stale'), { deltaX: 100, clientX: x + 10, clientY: y + 10 }).defaultPrevented).toBe(true)
    expect(scroller.scrollLeft).toBeGreaterThan(0)
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
