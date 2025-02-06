// Utilities
import { render } from '@test'
import { userEvent } from '@testing-library/user-event'
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
    const { container } = render(() => (
      <div>
        <ComponentA id="top" target="#bottom" />
        <div style="height: 2000px" />
        <ComponentA id="bottom" target="#top" />
      </div>
    ))

    const top = container.querySelector('#top')!
    const bottom = container.querySelector('#bottom')!

    await userEvent.click(top)
    await expect.poll(() => window.scrollY).toBeCloseTo(1260, -1)

    await userEvent.click(bottom)
    await expect.poll(() => window.scrollY).toBe(0)
  })

  it('scrolls horizontally', async () => {
    const { container } = render(() => (
      <div>
        <ComponentB id="start" target="#end" />

        <ComponentB id="end" target="#start" style="margin-inline-start: 2000px;" />
      </div>
    ))

    const start = container.querySelector('#start')!
    const end = container.querySelector('#end')!

    await userEvent.click(start)
    await expect.poll(() => window.scrollX).toBeCloseTo(770, -1)

    await userEvent.click(end)
    await expect.poll(() => window.scrollX).toBe(0)
  })
})
