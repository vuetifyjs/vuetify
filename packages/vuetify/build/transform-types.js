import fg from 'fast-glob'
import fs from 'node:fs/promises'
import { codeTransform } from './rollup.types.config.js'

const files = fg.sync('lib/**/*.d.ts')

for (const name of files) {
  const code = await fs.readFile(name, 'utf-8')

  const newCode = codeTransform(code)

  if (newCode === code) continue
  await fs.writeFile(name, newCode, 'utf-8')
}
