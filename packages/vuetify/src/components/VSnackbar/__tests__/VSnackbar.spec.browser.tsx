import { VSnackbar } from '..'

// Utilities
import { render, screen, userEvent, wait } from '@test'

const CONTENT = '.v-snackbar .v-overlay__content'

describe('VSnackbar', () => {
  describe('timeout', () => {
    it('auto-dismisses after the timeout elapses', async () => {
      render(() => <VSnackbar modelValue timeout={ 300 } text="auto dismiss" />)

      await expect.poll(() => screen.queryByCSS(CONTENT)).toBeVisible()

      // should still be visible shortly before the timeout elapses
      await wait(100)
      expect(screen.queryByCSS(CONTENT)).toBeVisible()

      // should be dismissed after the timeout
      await expect.poll(() => screen.queryByCSS(CONTENT), { timeout: 2000 }).toBeNull()
    })

    it('pauses the timer while hovered and resumes on leave', async () => {
      render(() => <VSnackbar modelValue timeout={ 500 } text="hover" />)

      const content = await screen.findByCSS(CONTENT)

      await userEvent.hover(content)
      // stays visible past its timeout while hovered
      await wait(700)
      expect(screen.queryByCSS(CONTENT)).toBeVisible()

      // resumes and dismisses once the pointer leaves
      await userEvent.unhover(content)
      await expect.poll(() => screen.queryByCSS(CONTENT), { timeout: 2000 }).toBeNull()
    })

    it('stays open indefinitely when timeout is -1', async () => {
      render(() => <VSnackbar modelValue timeout={ -1 } text="persistent" />)

      await expect.poll(() => screen.queryByCSS(CONTENT)).toBeVisible()
      await wait(300)

      expect(screen.queryByCSS(CONTENT)).toBeVisible()
    })
  })
})
