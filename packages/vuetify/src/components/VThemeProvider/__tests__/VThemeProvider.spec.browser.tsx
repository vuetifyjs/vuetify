// Components
import { VThemeProvider } from '..'
import { VBtn } from '@/components/VBtn'

// Utilities
import { render } from '@test'
import { createVuetify } from '@/framework'

describe('VThemeProvider', () => {
  it('should use provided theme', () => {
    const { container } = render(() => (
      <VThemeProvider>
        <div class="pa-10">
          <VBtn color="primary">button</VBtn>
        </div>
      </VThemeProvider>
    ))

    expect(container.querySelector('.v-btn')).toHaveClass('v-theme--light')
  })

  it('should use theme defined in prop', () => {
    const { container } = render(() => (
      <VThemeProvider theme="dark">
        <div class="pa-10">
          <VBtn color="primary">button</VBtn>
        </div>
      </VThemeProvider>
    ))

    expect(container.querySelector('.v-btn')).toHaveClass('v-theme--dark')
  })

  it('should render element when using with-background prop', () => {
    const { container } = render(() => (
      <VThemeProvider theme="dark" withBackground>
        <div class="pa-10">
          <VBtn color="primary">button</VBtn>
        </div>
      </VThemeProvider>
    ))

    expect(container.querySelector('.v-theme-provider')).toBeTruthy()
  })
})
