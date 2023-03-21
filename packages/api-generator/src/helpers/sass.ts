import fs from 'fs'

function processVariableFile (filePath: string) {
  if (fs.existsSync(filePath)) {
    const varFile = fs.readFileSync(filePath, 'utf8')
    const vars = varFile.replace(/\/\/.+[\r\n]+/g, '').split(/;[\n]*/g)
    const varValues = {}
    for (const [index, variable] of vars.entries()) {
      const varArr = variable.split(':')
      if (varArr.length >= 2 && varArr[0].startsWith('$')) {
        const varName = varArr.shift().trim()
        const varDefault = (vars[index + 1].startsWith('@'))
          ? vars[index + 1]
          : varArr.join(':')
        varValues[varName] = {
          default: varDefault.replace('!default', '').trim(),
        }
      }
    }
    return varValues
  }

  return {}
}

export const parseSassVariables = (componentName: string) => {
  const rootDir = './../vuetify/src/components'
  return processVariableFile(`${rootDir}/${componentName}/_variables.scss`)
}

// export function parseGlobalSassVariables () {
//   return [
//     './../vuetify/src/styles/settings/_colors.scss',
//     './../vuetify/src/styles/settings/_dark.scss',
//     './../vuetify/src/styles/settings/_elevations.scss',
//     './../vuetify/src/styles/settings/_light.scss',
//     './../vuetify/src/styles/settings/_theme.scss',
//     './../vuetify/src/styles/settings/_variables.scss',
//   ].reduce((acc, path) => {
//     acc.push(...processVariableFile(path))
//     return acc
//   }, []).sort((a, b) => a.name.localeCompare(b.name))
// }
