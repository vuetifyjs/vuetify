import { test } from '@/test'
import * as locales from '@/locale'
import fs from 'fs'

test('locale.js', ({ mount }) => {
  it('should have listed all available locales in index.ts', async () => {
    const imported = Object.keys(locales)
    const dir = fs.readdirSync('src/locale').filter(filename => !['gr.ts', 'index.ts'].includes(filename))

    expect(dir).toHaveLength(imported.length)

    dir.forEach(filename => expect(locales[filename.replace(/\.ts$/, '').replace('-', '')]).not.toBeUndefined())
  })
})
