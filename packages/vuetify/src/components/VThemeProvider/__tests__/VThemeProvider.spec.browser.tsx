// Components
import { VThemeProvider } from '../VThemeProvider'
import { VBtn } from '@/components/VBtn'

// Utilities
import { render, screen } from '@test'

describe('VThemeProvider', () => {
  it('should use provided theme', () => {
    render(() => (
      <VThemeProvider theme="dark">
        <VBtn color="primary">button</VBtn>
      </VThemeProvider>
    ))

    expect(screen.getByCSS('.v-btn')).toHaveClass('v-theme--dark')
  })

  it('should use theme defined in prop', () => {
    render(() => (
      <VThemeProvider theme="dark">
        <VBtn color="primary" theme="light">button</VBtn>
      </VThemeProvider>
    ))

    expect(screen.getByCSS('.v-btn')).toHaveClass('v-theme--light')
  })

  it('should render element when using with-background prop', async () => {
    render(() => (
      <VThemeProvider theme="dark" withBackground>
        <VBtn color="primary">button</VBtn>
      </VThemeProvider>
    ))

    await expect(screen.getByCSS('.v-theme-provider')).toBeDisplayed()
  })
})
