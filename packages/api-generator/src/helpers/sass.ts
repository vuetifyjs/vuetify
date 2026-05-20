import fs from 'node:fs'

function processVariableFile (filePath: string, tagUse: string | string[]) {
  if (fs.existsSync(filePath)) {
    const varFile = fs.readFileSync(filePath, 'utf8')
    const vars = varFile.replace(/\/\/.+[\r\n]+/g, '').split(/;[\n]*/g)
    const varValues: Record<string, { default: string, use?: string }> = {}
    for (const [index, variable] of vars.entries()) {
      const varArr = variable.split(':')
      if (varArr.length >= 2 && varArr[0].startsWith('$')) {
        const varName = varArr.shift()!.trim()
        const varDefault = (vars[index + 1].startsWith('@'))
          ? vars[index + 1]
          : varArr.join(':')
        varValues[varName] = {
          default: varDefault.replace('!default', '').trim(),
          ...{ use: tagUse === 'all' || tagUse?.includes(varName) ? 'vuetify' : 'vuetify/settings' },
        }
      }
    }
    return varValues
  }

  return {}
}

export const parseSassVariables = (componentName: string) => {
  const rootDir = './../vuetify/src/components'
  return processVariableFile(`${rootDir}/${componentName}/_variables.scss`, '')
}

export function parseGlobalSassVariables () {
  return {
    ...processVariableFile(`./../vuetify/src/styles/settings/_variables.scss`, ['$reset', '$color-pack', '$utilities']),
    ...processVariableFile(`./../vuetify/src/styles/settings/_colors.scss`, 'all'),
    ...processVariableFile(`./../vuetify/src/styles/settings/_elevations.scss`, []),
  }
}
