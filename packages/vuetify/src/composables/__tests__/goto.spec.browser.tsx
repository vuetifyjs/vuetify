// Utilities
import { render, screen, userEvent } from '@test'
import { defineComponent } from 'vue'
import { useGoTo } from '../goto'

const ComponentA = defineComponent({
  props: {
    target: String,
  },

  setup (props) {
    const goTo = useGoTo()

    function onClick () {
      return goTo(props.target!)
    }

    return () => (
      <button onClick={ onClick }>Click me</button>
    )
  },
})

const ComponentB = defineComponent({
  props: {
    target: String,
    container: String,
  },

  setup (props) {
    const goTo = useGoTo()

    function onClick () {
      return goTo.horizontal(props.target!, { container: props.container })
    }

    return () => (
      <button onClick={ onClick }>Click me</button>
    )
  },
})

describe('goto', () => {
  it('scrolls vertically', async () => {
    render(() => (
      <div>
        <ComponentA id="top" target="#bottom" />
        <div style="height: 2000px" />
        <ComponentA id="bottom" target="#top" />
      </div>
    ))

    const top = screen.getByCSS('#top')
    const bottom = screen.getByCSS('#bottom')

    await userEvent.click(top)
    await expect.poll(() => window.scrollY).toBeCloseTo(1250, -1)

    await userEvent.click(bottom)
    await expect.poll(() => window.scrollY).toBe(0)
  })

  it('scrolls horizontally', async () => {
    render(() => (
      <div>
        <ComponentB id="start" target="#end" />

        <ComponentB id="end" target="#start" style="margin-inline-start: 2000px;" />
      </div>
    ))

    const start = screen.getByCSS('#start')
    const end = screen.getByCSS('#end')

    await userEvent.click(start)
    await expect.poll(() => window.scrollX).toBeCloseTo(755, -1)

    await userEvent.click(end)
    await expect.poll(() => window.scrollX).toBe(0)
  })
})
