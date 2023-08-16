// Utilities
import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import path from 'path'
import * as locales from '../'

describe('locales', () => {
  it('should have listed all available locales in index.ts', async () => {
    const imported = Object.keys(locales).filter(key => key !== 'defaultRtl')
    const dir = fs.readdirSync(path.resolve(__dirname, '..'))
      .filter(filename => !['adapters', 'index.ts', '__tests__'].includes(filename))
      .map(filename => filename.replace(/\.ts$/, '').replace('-', ''))

    expect(imported).toHaveLength(dir.length)
    expect(imported).toStrictEqual(expect.arrayContaining(dir))
  })

  it('should have same structure for all translations', () => {
    const unfill = (o: Record<string, any>) => Object.keys(o).reduce((result, key) => {
      result[key] = typeof o[key] === 'object' ? unfill(o[key]) : typeof o[key]
      return result
    }, {} as Record<string, any>)
    const enUnfilled = unfill(locales.en)

    Object.entries(locales).forEach(([locale, messages]) => locale !== 'defaultRtl' && expect(unfill(messages)).toStrictEqual(enUnfilled))
  })
})
