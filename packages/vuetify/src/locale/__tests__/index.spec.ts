import * as locales from '../'
import fs from 'fs'
import path from 'path'

describe('locale.ts', () => {
  it('should have listed all available locales in index.ts', async () => {
    const imported = Object.keys(locales)
    const dir = fs.readdirSync(path.resolve(__dirname, '..')).filter(filename => !['index.ts', '__tests__'].includes(filename))

    expect(dir).toHaveLength(imported.length)

    dir.forEach(filename => expect(locales[filename.replace(/\.ts$/, '').replace('-', '')]).not.toBeUndefined())
  })
})
