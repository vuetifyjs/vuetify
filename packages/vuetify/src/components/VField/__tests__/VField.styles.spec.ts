import * as sass from 'sass'
import { resolve } from 'node:path'

const srcPath = resolve(process.cwd(), 'src')

function compile (config = '') {
  return sass.compileString(
    `${config}\n@use "components/VField/VField";\n@use "components/VInput/VInput";`,
    { loadPaths: [srcPath] },
  ).css
}

describe('VField styles', () => {
  it('should use the theme error color by default', () => {
    expect(compile()).toContain('color: rgb(var(--v-theme-error))')
  })

  it('should use $field-error-color and $input-error-color for the error state', () => {
    const css = compile(
      '@use "components/VField/variables" with ($field-error-color: #123456, $input-error-color: #654321);',
    )

    expect(css.match(/color: #123456/g)).toHaveLength(3)
    expect(css.match(/color: #654321/g)).toHaveLength(1)
    expect(css).not.toContain('rgb(var(--v-theme-error))')
  })
})
