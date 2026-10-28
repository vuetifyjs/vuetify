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

  it.each(['default', 'comfortable', 'compact'] as const)('renders the subtitle right after the title with %s density', density => {
    render(<VFileUpload density={ density } title="Drop files here" subtitle="Up to 10 MB each" />)

    const title = screen.getByText('Drop files here')

    expect(title.nextElementSibling).toBe(screen.getByText('Up to 10 MB each'))
  })
})
