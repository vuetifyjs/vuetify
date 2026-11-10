import { VFileUpload } from '../VFileUpload'

// Utilities
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import { createVuetify } from '@/framework'

describe('VFileUpload', () => {
  it('server-renders with an empty file list', async () => {
    const app = createSSRApp(() => <VFileUpload />)
    app.use(createVuetify())

    await expect(renderToString(app)).resolves.toContain('v-file-upload')
  })

  it('should pass id to the file input', async () => {
    const app = createSSRApp(() => <VFileUpload id="upload" />)
    app.use(createVuetify())

    await expect(renderToString(app)).resolves.toMatch(/<input[^>]* id="upload"/)
  })
})
