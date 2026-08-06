// Components
import { VFileUploadList } from '../VFileUploadList'

// Utilities
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import { createVuetify } from '@/framework'

describe('VFileUploadList', () => {
  it('should render on the server without any files', async () => {
    const app = createSSRApp({ render: () => <VFileUploadList /> })

    app.use(createVuetify())

    await expect(renderToString(app)).resolves.toBe('<!--[--><!--]-->')
  })

  it('should render on the server with files', async () => {
    const app = createSSRApp({ render: () => <VFileUploadList files={[new File([''], 'foo.txt')]} /> })

    app.use(createVuetify())

    await expect(renderToString(app)).resolves.toContain('v-file-upload-list')
  })
})
