import { VAlert } from '..'

// Utilities
import { render, screen, showcase, userEvent, wait } from '@test'

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

  describe('duration', () => {
    it('keeps the alert visible until the duration elapses, then dismisses it', async () => {
      render(() => <VAlert text="auto dismiss" duration={ 300 } />)

      await screen.findByCSS('.v-alert')

      // should not be dismissed before the duration elapses
      await wait(100)
      expect(document.querySelector('.v-alert')).not.toBeNull()

      // should be dismissed after the duration
      await expect.poll(() => document.querySelector('.v-alert'), { timeout: 2000 }).toBeNull()
    })

    it('emits update:modelValue when auto-dismissed', async () => {
      const onUpdate = vi.fn()

      render(() => <VAlert text="auto dismiss" duration={ 150 } { ...{ 'onUpdate:modelValue': onUpdate } } />)

      await expect.poll(() => onUpdate.mock.calls.length, { timeout: 2000 }).toBeGreaterThan(0)
      expect(onUpdate).toHaveBeenLastCalledWith(false)
    })

    it('pauses the timer while hovered and resumes on leave', async () => {
      render(() => <VAlert text="hover" duration={ 500 } />)

      const alert = await screen.findByCSS('.v-alert')

      await userEvent.hover(alert)
      // stays visible past its duration while hovered
      await wait(700)
      expect(document.querySelector('.v-alert')).not.toBeNull()

      // resumes and dismisses once the pointer leaves
      await userEvent.unhover(alert)
      await expect.poll(() => document.querySelector('.v-alert'), { timeout: 2000 }).toBeNull()
    })

    it('does not auto-dismiss by default', async () => {
      render(() => <VAlert text="persistent" />)

      await screen.findByCSS('.v-alert')
      await wait(300)

      expect(document.querySelector('.v-alert')).not.toBeNull()
    })
  })

  showcase({ stories, props, component: VAlert })
})
