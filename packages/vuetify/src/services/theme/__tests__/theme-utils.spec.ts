import {
  genStyles,
  parse,
} from '../utils'

describe('theme-utilities.ts', () => {
  let parsedTheme

  beforeEach(() => {
    parsedTheme = {
      primary: {
        base: '#c42742',
        lighten5: '#2c0447',
        lighten4: '#cfa854',
        lighten3: '#dd88cc',
        lighten2: '#b49921',
        lighten1: '#f899c7',
        darken1: '#0169dc',
        darken2: '#c28fd0',
        darken3: '#fbe002',
        darken4: '#33303a',
      },
      anchor: '#c42742',
    }
  })

  it('should parse a theme or theme item', () => {
    const theme = {
      primary: '#000',
      secondary: '#fff',
    }

    expect(parse(theme)).toMatchSnapshot()
    expect(parse(parsedTheme)).toMatchSnapshot()
  })

  it('should generate styles', () => {
    // No values provided
    expect(genStyles({})).toBe('')

    expect(genStyles(parsedTheme)).toMatchSnapshot()
  })

  it('should generate css vars', () => {
    expect(genStyles(parsedTheme, true)).toMatchSnapshot()
  })

  it('should use custom anchor color', () => {
    // Uses primary base as fallback
    expect(genStyles(parsedTheme)).toContain('a { color: #c42742; }')

    parsedTheme.anchor = '#000000'
    expect(genStyles(parsedTheme)).toContain('a { color: #000000; }')
  })
})
