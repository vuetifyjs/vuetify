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

export function stripLinks (str: string): [string, Record<string, string>] {
  let out = str.slice()
  const obj: Record<string, string> = {}
  const regexp = /<a.*?>(.*?)<\/a>/g

  let matches = regexp.exec(str)

  while (matches !== null) {
    obj[matches[1]] = matches[0]
    out = out.replace(matches[0], matches[1])

    matches = regexp.exec(str)
  }

  return [out, obj]
}

export function insertLinks (str: string, stripped: Record<string, string>) {
  for (const [key, value] of Object.entries(stripped)) {
    str = str.replaceAll(new RegExp(`(^|\\W)(${key})(\\W|$)`, 'g'), `$1${value}$3`)
  }
  return str
}

export async function getType (item: { formatted: string }) {
  const [{ default: prettier }, { default: typescriptParser }] = await Promise.all([
    import ('prettier'),
    import('prettier/parser-typescript'),
  ])
  const prefix = 'type Type = '
  const [str, stripped] = stripLinks(item.formatted)
  const formatted = prettier.format(prefix + str, {
    parser: 'typescript',
    plugins: [typescriptParser],
    bracketSpacing: true,
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  })

  return insertLinks(formatted, stripped).replace(/type\sType\s=\s+?/m, '')
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
