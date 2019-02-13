import {
  parse
} from '../theme'

describe('theme-utilities.ts', () => {
  it('should parse a theme or theme item', () => {
    const theme = {
      primary: '#000',
      secondary: '#fff'
    }
    const theme2 = {
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
        darken4: '#33303a'
      }
    }

    expect(parse(theme)).toMatchSnapshot()
    expect(parse(theme2)).toMatchSnapshot()
  })
})
