import { NAME } from '..'
import { render, showcase, userEvent } from '@test'

const props = {}

const stories = {
  Default: <NAME />,
}

// Tests
describe('NAME', () => {
  it('does something', async () => {
    render(<NAME />)

    await userEvent.click(screen.getByTestId(''))
    await expect.element(screen.getByTestId('')).toHaveTextContent('')
  })

  showcase({ stories, props, component: NAME })
})
