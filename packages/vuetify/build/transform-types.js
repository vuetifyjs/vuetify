import fg from 'fast-glob'
import fs from 'node:fs/promises'
import ts from 'typescript'
import { codeTransform } from './types-code-transform.js'
import path from 'upath'

for (const source of fg.sync('src/**/*.types.d.ts')) {
  const target = source.replace(/^src\//, 'lib/')
  await fs.copyFile(source, target)

  const sourceCode = await fs.readFile(source, 'utf-8')
  const sourceImport = sourceCode.match(/from '((?:@|\.)\/[^']*)'/g)?.find(m => !m.endsWith(".types'"))
  if (sourceImport) throw new Error(`${source} imports a source module (${sourceImport}), which loads its emitted declarations`)

  const name = path.basename(source, '.types.d.ts')
  const components = [...sourceCode.matchAll(/^export declare const (\w+)/gm)].map(m => m[1])
  if (!components.length) continue

  const index = path.join(path.dirname(target), 'index.d.ts')
  const code = await fs.readFile(index, 'utf-8')
  await fs.writeFile(index, code.replaceAll(`from './${name}'`, `from './${name}.types'`), 'utf-8')

  const emitted = target.replace(/\.types\.d\.ts$/, '.d.ts')
  await fs.writeFile(emitted, reexportComponents(await fs.readFile(emitted, 'utf-8'), components, name), 'utf-8')
}

// Deep imports of the emitted module would otherwise get a second, heavier declaration of the same component
function reexportComponents (code, components, name) {
  const file = ts.createSourceFile('x.d.ts', code, ts.ScriptTarget.Latest)
  const ranges = file.statements.filter(node => {
    if (ts.isTypeAliasDeclaration(node)) return components.includes(node.name.text)
    return ts.isVariableStatement(node) && node.declarationList.declarations.some(d => components.includes(d.name.text))
  }).map(node => [node.getFullStart(), node.getEnd()])

  for (const [start, end] of ranges.reverse()) {
    code = code.slice(0, start) + code.slice(end)
  }

  return code + `export { ${components.join(', ')} } from './${name}.types';\n`
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
