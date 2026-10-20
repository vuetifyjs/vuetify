import { VAlert } from '..'

// Utilities
import { render, screen, showcase, wait } from '@test'

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
      render(() => (
        <>
          { defaultColors.map((color, idx) => (
            <VAlert color={ color } text={ idx.toString() }>
              { color } alert
            </VAlert>
          ))}
        </>
      ))

      const alerts = await screen.findAllByCSS('.v-alert')
      expect(alerts).toHaveLength(defaultColors.length)

      Array.from(alerts).forEach((alert, idx) => {
        // TODO: useless assert
        expect(alert).toHaveTextContent(defaultColors[idx])
      })
    })
  })

  describe('timeout', () => {
    // keeps the alert away from the resting cursor, which would pause the countdown
    const offset = { paddingTop: '200px' }

    it('starts counting once scrolled into view', async () => {
      render(() => (
        <div style={ offset }>
          <div style={{ height: '200vh' }} />
          <VAlert text="hidden" timeout={ 200 } />
        </div>
      ))

      const alert = await screen.findByCSS('.v-alert')
      await wait(400)
      expect(alert).toBeInTheDocument()

      alert.scrollIntoView()
      await expect.poll(() => screen.queryByCSS('.v-alert')).toBeNull()
    })
  })

  showcase({ stories, props, component: VAlert })
})
