import * as sass from 'sass'
import { resolve } from 'node:path'

const stylesPath = resolve(process.cwd(), 'src/styles')

describe('styles utilities', () => {
  it.each(['0', '0px'])('should generate base display utilities when xs is %s', breakpoint => {
    const { css } = sass.compileString(
      `@use "settings" with ($grid-breakpoints: ("xs": ${breakpoint}));\n@use "utilities";`,
      { loadPaths: [stylesPath] },
    )
    const hasBaseDisplayUtility = css.includes('.d-flex {')
    const hasResponsiveDisplayUtility = css.includes('.d-xs-flex {')

    expect(hasBaseDisplayUtility).toBe(true)
    expect(hasResponsiveDisplayUtility).toBe(false)
  })
})
