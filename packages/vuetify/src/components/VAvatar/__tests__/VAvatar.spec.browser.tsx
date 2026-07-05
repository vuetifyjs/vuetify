import { VAvatar } from '../VAvatar'

// Utilities
import { render, screen } from '@test'

describe('VAvatar', () => {
  // https://github.com/vuetifyjs/vuetify/issues/22868
  it('does not round the tonal underlay so it stays flush with the border', () => {
    render(() => (
      <VAvatar variant="tonal" border rounded />
    ))

    const underlay = screen.getByCSS('.v-avatar__underlay')

    expect(getComputedStyle(underlay).borderRadius).toBe('0px')
  })
})
