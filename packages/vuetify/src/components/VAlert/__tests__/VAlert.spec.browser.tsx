import { VAlert } from '..'

// Utilities
import { generate, render } from '@test'

const defaultColors = ['success', 'info', 'warning', 'error', 'invalid']

const props = {
  color: defaultColors,
  icon: ['$vuetify'],
  modelValue: true,
}

const stories = {
  'Default alert': <VAlert />,
  'Icon alert': <VAlert icon="$vuetify" />,
}

// Tests
describe('VAlert', () => {
  describe('color', () => {
    it('supports default color props', async () => {
      const { container } = render(() => (
        <>
          { defaultColors.map((color, idx) => (
            <VAlert color={ color } text={ idx.toString() }>
              { color } alert
            </VAlert>
          ))}
        </>
      ))

      const alerts = container.querySelectorAll('.v-alert')
      expect(alerts).toHaveLength(defaultColors.length)

      Array.from(alerts).forEach((alert, idx) => {
        // TODO: useless assert
        expect(alert).toHaveTextContent(defaultColors[idx])
      })
    })
  })

  describe('Showcase', () => {
    generate({ stories, props, component: VAlert })
  })
})
