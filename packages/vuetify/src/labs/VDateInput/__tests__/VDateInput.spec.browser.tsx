// Components
import { VDateInput } from '../VDateInput'

// Utilities
import { commands, render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VDateInput', () => {
  it('accepts keyboard input even if the picker is hidden', async () => {
    const model = ref<Date | null>(null)
    const { element } = render(() => <VDateInput v-model={ model.value } />)

    await userEvent.click(element)
    await commands.waitStable('.v-picker')
    expect(screen.getByCSS('.v-picker')).toBeVisible()

    await userEvent.keyboard('{Escape}') // hide picker, but keep the focus

    await commands.waitStable('.v-picker')
    expect(screen.getByCSS('.v-picker')).not.toBeVisible()

    const input = screen.getByCSS('input') as HTMLInputElement
    await userEvent.type(input, '02/20/2022{Enter}')

    expect(model.value).toBeDefined()
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
    expect(formatter.format(model.value!)).toBe('Feb 20, 2022')
  })
})
