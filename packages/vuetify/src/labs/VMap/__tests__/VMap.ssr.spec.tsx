// Components
import { VMap } from '../VMap'

// Utilities
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import { MAP } from './fixtures'
import { createVuetify } from '@/framework'

describe('VMap server rendering', () => {
  it('should render a stable shell without parsing SVG', async () => {
    const parse = vi.spyOn(DOMParser.prototype, 'parseFromString')
    try {
      const app = createSSRApp(() => <VMap svg={ MAP } />)
      app.use(createVuetify())
      const markup = await renderToString(app)
      expect(markup).toContain('v-map')
      expect(markup).not.toContain('<svg')
      expect(parse).not.toHaveBeenCalled()
    } finally {
      parse.mockRestore()
    }
  })
})
