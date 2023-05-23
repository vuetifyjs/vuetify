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
