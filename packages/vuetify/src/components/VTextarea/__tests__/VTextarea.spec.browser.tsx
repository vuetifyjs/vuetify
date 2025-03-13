import { VTextarea } from '..'

// Utilities
import { Application, page, render, screen, userEvent } from '@test'
import { ref } from 'vue'

// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

describe('VTextarea', () => {
  it('should auto-grow', async () => {
    await page.viewport(500, 500)
    const model = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit')

    render(() => (
      <Application>
        <div>
          <VTextarea auto-grow rows="1" v-model={ model.value } />
        </div>
      </Application>
    ))

    const el = screen.getByCSS('#input-0')

    expect(el.offsetHeight).toBe(56)

    await userEvent.tab()
    await userEvent.keyboard('sed d')
    await expect.poll(() => el.offsetHeight).toBe(56)

    await userEvent.keyboard('o')
    await expect.poll(() => el.offsetHeight).toBe(80)
  })

  it('should respect max-rows', async () => {
    await page.viewport(500, 500)
    const model = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit')

    render(() => (
      <Application>
        <div>
          <VTextarea auto-grow rows="1" max-rows="2" v-model={ model.value } />
        </div>
      </Application>
    ))

    const el = screen.getByCSS('#input-0')

    expect(el.offsetHeight).toBe(56)

    await userEvent.tab()
    await userEvent.keyboard('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
    await expect.poll(() => el.offsetHeight).toBe(80)

    await userEvent.keyboard('Lorem ipsum dolor sit amet consectetur adipisicing elit. ')
    await expect.poll(() => el.offsetHeight).toBe(80)
  })
})
