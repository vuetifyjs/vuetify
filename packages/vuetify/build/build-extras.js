import fg from 'fast-glob'
import fs from 'node:fs/promises'
import path from 'upath'
import { initAsyncCompiler } from 'sass-embedded'
import { libDir, root, srcDir } from './constants.js'

const dist = path.resolve(root, 'dist')

async function compileStyles () {
  const compiler = await initAsyncCompiler()
  try {
    await Promise.all(fg.sync(['**/*.{sass,scss}', '!**/_*'], { cwd: srcDir }).map(async file => {
      const { css } = await compiler.compileAsync(path.join(srcDir, file), { charset: false })
      const target = path.join(libDir, file.replace(/\.s[ac]ss$/, '.css'))
      await fs.mkdir(path.dirname(target), { recursive: true })
      await fs.writeFile(target, css, 'utf8')
    }))
  } finally {
    await compiler.dispose()
  }
}

// Index files only re-export (see AGENTS.md), so a regex covers what rollup read from the AST
function exportedNames (code) {
  return [...code.replace(/export type \{[^}]*\}[^\n]*/g, '').matchAll(/export \{([^}]*)\}/g)]
    .flatMap(m => m[1].split(',').map(name => name.trim()).filter(Boolean))
}

async function componentMap (barrel) {
  const components = {}
  const variables = []
  for (const [, dir] of (await fs.readFile(path.join(srcDir, barrel), 'utf8')).matchAll(/^export \* from '\.\/([^']+)'/gm)) {
    const from = path.join(path.dirname(barrel), dir)
    for (const name of exportedNames(await fs.readFile(path.join(srcDir, from, 'index.ts'), 'utf8'))) {
      components[name] = { from, styles: [] }
    }
    if (await fs.access(path.join(srcDir, from, '_variables.scss')).then(() => true, () => false)) variables.push(from)
  }
  return { components, variables }
}

function forwards (variables) {
  return variables.map(from => `@forward '../lib/${from}/_variables.scss'`).sort().join('\n')
}

async function writeMeta () {
  const core = await componentMap('components/index.ts')
  const labs = await componentMap('labs/components.ts')
  const directives = exportedNames(await fs.readFile(path.join(srcDir, 'directives/index.ts'), 'utf8'))
  const directiveVariables = []
  for (const name of await fs.readdir(path.join(srcDir, 'directives'))) {
    if (await fs.access(path.join(srcDir, 'directives', name, '_variables.scss')).then(() => true, () => false)) {
      directiveVariables.push(`directives/${name}`)
    }
  }

  await fs.mkdir(path.join(dist, 'json'), { recursive: true })
  await Promise.all([
    fs.writeFile(path.join(dist, 'json/importMap.json'), JSON.stringify({ components: core.components, directives }, null, 2)),
    fs.writeFile(path.join(dist, 'json/importMap-labs.json'), JSON.stringify({ components: labs.components }, null, 2)),
    fs.writeFile(path.join(dist, '_component-variables.sass'), forwards([...core.variables, ...directiveVariables])),
    fs.writeFile(path.join(dist, '_component-variables-labs.sass'), forwards(labs.variables)),
  ])
}

async function copyCjs () {
  for (const name of ['vuetify', 'vuetify-labs']) {
    const code = await fs.readFile(path.join(dist, `${name}.js`), 'utf8')
    await fs.writeFile(path.join(dist, `${name}.cjs`), code.replace(`//# sourceMappingURL=${name}.js.map`, `//# sourceMappingURL=${name}.cjs.map`))
    if (name === 'vuetify') await fs.copyFile(path.join(dist, `${name}.js.map`), path.join(dist, `${name}.cjs.map`))
  }
}

await Promise.all([compileStyles(), writeMeta(), copyCjs()])
