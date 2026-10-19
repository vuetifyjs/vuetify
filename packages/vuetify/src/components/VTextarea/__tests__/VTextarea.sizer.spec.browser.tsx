import { VTextarea } from '..'

// Utilities
import { Application, page, render, screen, userEvent } from '@test'
import { ref } from 'vue'

vi.mock(import('@/util/globals'), async importOriginal => ({
  ...(await importOriginal()),
  SUPPORTS_FIELD_SIZING: false,
}))

describe('VTextarea without field-sizing support', () => {
  it('should auto-grow and shrink with the sizer', async () => {
    await page.viewport(500, 500)
    const model = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
    const rows = ref<number>()

    render(() => (
      <Application>
        <div>
          <VTextarea autoGrow rows="1" maxRows="3" v-model={ model.value } onUpdate:rows={ val => { rows.value = val } } />
        </div>
      </Application>
    ))

    const el = screen.getByCSS('textarea[rows]')
    expect(screen.getByCSS('.v-textarea__sizer')).toBeTruthy()
    expect(el.offsetHeight).toBe(56)

    await userEvent.tab()
    await userEvent.keyboard('{Enter}')
    await expect.poll(() => el.offsetHeight).toBe(80)
    await expect.poll(() => rows.value).toBe(2)

    await userEvent.keyboard('{Enter}{Enter}{Enter}')
    await expect.poll(() => el.offsetHeight).toBe(104)

    model.value = 'Lorem'
    await expect.poll(() => el.offsetHeight).toBe(56)
  })
})
