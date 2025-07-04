// Utilities
import { unfill } from '@test'
import fs from 'node:fs'
import path from 'node:path'
import * as locales from '../'

describe('locales', () => {
  it('should have listed all available locales in index.ts', async () => {
    const imported = Object.keys(locales).filter(key => key !== 'default')
    const dir = fs.readdirSync(path.resolve(__dirname, '..'))
      .filter(filename => !['adapters', 'index.ts', '__tests__'].includes(filename))
      .map(filename => filename.replace(/\.ts$/, '').replace('-', ''))

    expect(imported).toHaveLength(dir.length)
    expect(imported).toStrictEqual(expect.arrayContaining(dir))
  })

  it('should have same structure for all translations', () => {
    /** replace all values of deeply nested objects with their types */
    const enUnfilled = unfill(locales.en)

    for (const [locale, messages] of Object.entries(locales)) {
      expect({ [locale]: unfill(messages) }).toStrictEqual(expect.objectContaining({ [locale]: enUnfilled }))
    }
  })
})
