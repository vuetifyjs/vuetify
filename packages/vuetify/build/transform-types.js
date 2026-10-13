import fg from 'fast-glob'
import fs from 'node:fs/promises'
import { codeTransform } from './types-code-transform.js'
import path from 'upath'

for (const source of fg.sync('src/**/*.types.d.ts')) {
  const target = source.replace(/^src\//, 'lib/')
  await fs.copyFile(source, target)

  const name = path.basename(source, '.types.d.ts')
  if (!/^export declare const /m.test(await fs.readFile(source, 'utf-8'))) continue

  const index = path.join(path.dirname(target), 'index.d.ts')
  const code = await fs.readFile(index, 'utf-8')
  await fs.writeFile(index, code.replaceAll(`from './${name}'`, `from './${name}.types'`), 'utf-8')
}

const files = fg.sync('lib/**/*.d.ts')

const importRegexp = /(?<a1>(?:import|export)(?:[^;])*?from ['"])(?<a2>(?:\.\.?|@)(?:\/[^;'"]*)?)(?<a3>['"];?)|(?<b1>import\(['"])(?<b2>(?:\.\.?|@)(?:\/[^;'"]*)?)(?<b3>['"]\))/gm

for (const name of files) {
  const code = await fs.readFile(name, 'utf-8')

  let newCode = codeTransform(code)

  for (const match of code.matchAll(importRegexp)) {
    const pre = match.groups.a1 ?? match.groups.b1
    let matchPath = match.groups.a2 ?? match.groups.b2
    const post = match.groups.a3 ?? match.groups.b3

    let target = matchPath
    if (target.startsWith('@/')) {
      target = path.relative(path.dirname(name), target.replace(/^@\//, 'lib/'))
      if (!target.startsWith('.')) {
        target = './' + target
      }
    }

    if (!/\.[jt]s$/.test(target)) {
      try {
        const dir = await fs.stat(path.join(path.dirname(name), target))
        target = target + '/index.js'
      } catch (err) {
        if (err.code !== 'ENOENT') throw err
        target = target + '.js'
      }
    }
    if (target !== matchPath) {
      newCode = newCode.replace(match[0], pre + target + post)
    }
  }

  if (newCode === code) continue
  await fs.writeFile(name, newCode, 'utf-8')
}
