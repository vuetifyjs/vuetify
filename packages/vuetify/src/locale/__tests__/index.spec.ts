import * as locales from '../'
import fs from 'fs'
import path from 'path'

describe('locale.ts', () => {
  it('should have listed all available locales in index.ts', async () => {
    const imported = Object.keys(locales)
    const dir = fs.readdirSync(path.resolve(__dirname, '..')).filter(filename => !['adapters', 'index.ts', '__tests__'].includes(filename))

    expect(dir).toHaveLength(imported.length - 1) // Minus one for rtl object.

    dir.forEach(filename => expect(locales[filename.replace(/\.ts$/, '').replace('-', '')]).toBeDefined())
  })

  it('should have same structure for all translations', () => {
    const unfill = (o: object) => Object.keys(o).reduce((result, key) => {
      result[key] = typeof o[key] === 'object' ? unfill(o[key]) : typeof o[key]
      return result
    }, {})
    const enUnfilled = unfill(locales.en)

    Object.entries(locales).forEach(([locale, messages]) => locale !== 'defaultRtl' && expect(unfill(messages)).toStrictEqual(enUnfilled))
  })
})
