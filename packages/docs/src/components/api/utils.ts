import prettier from 'prettier'
import typescriptParser from 'prettier/parser-typescript'

export type Item = {
  name: string
  source: string
  type?: string | string[]
  anyOf: Item[]
  enum?: string[]
  parameters?: Item[]
  returnType?: Item
  default: any
  description: Record<string, string>
  snippet: string
  value: any
  example: string
  props: unknown
  $ref?: string
  properties?: Record<string, Item>
  items?: Item | Item[]
  minItems?: number
  maxItems?: number
  allOf?: Item[]
}

function formatObject (obj: object) {
  return JSON.stringify(obj, null, 2)
    .replaceAll('"', '')
    .replaceAll(/(\w+:\s\w+),/g, $1 => $1)
    .replaceAll(',', ', ')
}

export function getType (item: { formatted: string }) {
  const prefix = 'type Type = '
  const formatted = prettier.format(prefix + item.formatted, {
    parser: 'typescript',
    plugins: [typescriptParser],
    bracketSpacing: true,
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  })
  return formatted.replace(/type\sType\s=\s?/m, '')
}

// export function getType (item: Item): string {
//   // Simple string enum
//   if (item.enum) {
//     return item.enum.map(v => typeof v === 'string' ? `'${v}'` : v).join(' | ')
//   }

//   // array
//   if (item.type === 'array' && item.items) {
//     // tuple
//     if (Array.isArray(item.items)) {
//       return `[${item.items?.map(item => getType(item)).join(', ')}]`
//     }

//     return `${getType(item.items)}[]`
//   }

//   // object
//   if (item.type === 'object') {
//     return formatObject(Object.entries(item.properties ?? {}).reduce<any>((obj, [name, prop]) => {
//       obj[name] = getType(prop)
//       return obj
//     }, {}))
//   }

//   // function
//   if (item.type === 'function') {
//     return `(${item.parameters?.map(p => {
//       return `${p.name}: ${getType(p)}`
//     }).join(', ')}) => ${getType(item.returnType!)}`
//   }

//   // primitive types(s)
//   if (item.type) {
//     return Array.isArray(item.type) ? item.type.join(' | ') : item.type
//   }

//   // refs
//   if (item.$ref) {
//     return item.$ref.replace('#/definitions/', '')
//   }

//   // any of
//   if (item.anyOf) {
//     return item.anyOf.map(v => getType(v)).join(' | ')
//   }

//   if (item.allOf) {
//     return `(${item.allOf.map(v => getType(v)).join(' & ')})`
//   }

//   return ''
// }
