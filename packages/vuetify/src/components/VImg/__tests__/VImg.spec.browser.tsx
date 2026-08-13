// Components
import { VImg } from '..'

// Utilities
import { render, screen } from '@test'

const src = 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'

// Tests
describe('VImg', () => {
  describe('alt', () => {
    it('labels the root element of an informative image', async () => {
      render(() => <VImg src={ src } alt="Material design background" />)

      const img = await screen.findByCSS('.v-img')
      expect(img).toHaveAttribute('role', 'img')
      expect(img).toHaveAttribute('aria-label', 'Material design background')
    })

    it('leaves the root element of a decorative image unlabelled', async () => {
      render(() => <VImg src={ src } alt="" />)

      const img = await screen.findByCSS('.v-img')
      expect(img).not.toHaveAttribute('role')
      expect(img).not.toHaveAttribute('aria-label')
    })
  })
})
