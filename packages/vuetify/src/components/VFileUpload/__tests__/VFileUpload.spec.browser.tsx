// Components
import { VFileUpload } from '../VFileUpload'

// Utilities
import { render, screen } from '@test'

describe('VFileUpload', () => {
  it.each([
    [{ width: '80%' }, 400],
    [{ maxWidth: '80%' }, 400],
    [{ width: 300 }, 300],
    [{ maxWidth: 300 }, 300],
    [{ width: '80%', insetFileList: true }, 400],
  ])('should size the dropzone to the input with %o', (props, expected) => {
    render(() => (
      <div style="width: 500px">
        <VFileUpload { ...props } />
      </div>
    ))

    const input = screen.getByCSS('.v-file-upload').getBoundingClientRect()
    const dropzone = screen.getByCSS('.v-file-upload-dropzone').getBoundingClientRect()

    expect(input.width).toBeCloseTo(expected, 0)
    expect(dropzone.width).toBeCloseTo(expected, 0)
  })
})
