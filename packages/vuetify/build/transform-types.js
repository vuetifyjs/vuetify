import fg from 'fast-glob'
import fs from 'node:fs/promises'
import { codeTransform } from './rollup.types.config.js'
import path from 'upath'

const files = fg.sync('lib/**/*.d.ts')

const importRegexp = /(?<a1>(?:import|export)(?:[^;])*?from ['"])(?<a2>\.\.?(?:\/[^;'"]*)?)(?<a3>['"];)|(?<b1>import\(['"])(?<b2>\.\.?(?:\/[^;'"]*)?)(?<b3>['"]\))/gm

for (const name of files) {
  const code = await fs.readFile(name, 'utf-8')

  let newCode = codeTransform(code)

  for (const match of code.matchAll(importRegexp)) {
    const pre = match.groups.a1 ?? match.groups.b1
    const matchPath = match.groups.a2 ?? match.groups.b2
    const post = match.groups.a3 ?? match.groups.b3
    if (/\.[jt]s$/.test(matchPath)) continue

    let target
    try {
      const dir = await fs.stat(path.join(path.dirname(name), matchPath))
      target = matchPath + '/index.js'
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
      target = matchPath + '.js'
    }
    newCode = newCode.replace(match[0], pre + target + post)
  }

  if (newCode === code) continue
  await fs.writeFile(name, newCode, 'utf-8')
}
