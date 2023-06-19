import { capitalize } from 'lodash-es'

export { camelCase, capitalize } from 'lodash-es'

export const kebabCase = (str: string) => {
  let kebab = ''
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)
    if (charCode >= 65 && charCode <= 90) {
      kebab += `${i > 0 ? '-' : ''}${str[i].toLowerCase()}`
    } else {
      kebab += str[i]
    }
  }
  return kebab
}

export const pascalize = (str: string) => str.split('-').map(capitalize).join('')
