import { VFileUpload } from '../VFileUpload'

// Utilities
import { render, screen } from '@test'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import { createVuetify } from '@/framework'

describe('VFileUpload', () => {
  it('server-renders with an empty file list', async () => {
    const app = createSSRApp(() => <VFileUpload />)
    app.use(createVuetify())

    await expect(renderToString(app)).resolves.toContain('v-file-upload')
  })

  it('labels the default loading progress bar', () => {
    render(() => <VFileUpload loading />)

    expect(screen.getByRole('progressbar', { name: 'Loading...' })).toBeTruthy()
  })
})
