import fs from 'fs/promises'
import path from 'node:path'
import { ESLint } from 'eslint'
import { convertSrc } from 'vue-composition-converter'

const DIR = 'packages/docs/src/examples/'

const linter = new ESLint({
  fix: true,
  cwd: path.resolve(DIR),
})

for (const group of await fs.readdir(DIR)) {
  for (const file of await fs.readdir(path.join(DIR, group))) {
    const code = await fs.readFile(path.join(DIR, group, file), 'utf-8')

    const composition = /(<script setup>[\w\W]*?<\/script>)/g.exec(code)
    const options = /(<script>[\w\W]*?<\/script>)/g.exec(code)

    if (!(composition || options) || (composition && options)) continue
    if (composition && !options) {
      console.log('composition only', path.join(group, file))
      continue
    }

    let output
    try {
      output = convertSrc(code)
    } catch (e) {
      if (e.message === 'no convert target') continue
      else throw e
    }

    output = await linter.lintText(`<script setup>\n${output}</script>`, { filePath: path.join(group, file) })

    output = code.slice(0, options.index) + output[0].output + '\n' + code.slice(options.index)

    await fs.writeFile(path.join(DIR, group, file), output)
    console.log('converted', path.join(group, file))
  }
}
