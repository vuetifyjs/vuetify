// Components
import { VMap } from '../VMap'

// Utilities
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import { createVuetify } from '@/framework'

describe('VMap server rendering', () => {
  it('should render a stable shell without fetching or parsing SVG', async () => {
    const fetch = vi.spyOn(globalThis, 'fetch')
    const parse = vi.spyOn(DOMParser.prototype, 'parseFromString')
    try {
      const app = createSSRApp(() => <VMap src="/maps/world.svg" />)
      app.use(createVuetify())
      const markup = await renderToString(app)
      expect(markup).toContain('v-map')
      expect(markup).not.toContain('<svg')
      expect(fetch).not.toHaveBeenCalled()
      expect(parse).not.toHaveBeenCalled()
    } finally {
      fetch.mockRestore()
      parse.mockRestore()
    }
  })
})
