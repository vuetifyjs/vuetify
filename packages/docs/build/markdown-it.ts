import fs from 'fs'
import path from 'path'
import Ajv from 'ajv'
import fm from 'front-matter'
import MarkdownIt from 'markdown-it'
import { configureMarkdown } from '../src/util/markdown-it'
export { configureMarkdown } from '../src/util/markdown-it'

export const md = configureMarkdown(new MarkdownIt())

const generateToc = (content: string) => {
  const headings = []
  const tokens = md.parse(content, {})
  const length = tokens.length

  for (let i = 0; i < length; i++) {
    const token = tokens[i]

    if (token.type !== 'heading_open') continue

    // heading level by hash length '###' === h3
    const level = token.markup.length

    if (level <= 1) continue

    const next = tokens[i + 1]
    const link = next.children?.find(child => child.type === 'link_open')
    const text = next.children?.filter(child => !!child.content).map(child => child.content).join('')
    const anchor = link?.attrs?.find(([attr]) => attr === 'href')
    const [, to] = anchor ?? []

    headings.push({
      text,
      to,
      level,
    })
  }

  return headings
}

const ajv = new Ajv()
const validate = ajv.compile({
  type: 'object',
  additionalProperties: false,
  properties: {
    nav: { type: 'string' },
    layout: { type: 'string' },
    meta: {
      type: 'object',
      additionalProperties: false,
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        keywords: { type: 'string' },
      },
    },
    related: {
      type: 'array',
      maxItems: 3,
      uniqueItems: true,
      items: { type: 'string' },
    },
    assets: {
      type: 'array',
      uniqueItems: true,
      items: { type: 'string' },
    },
    disabled: { type: 'boolean' },
    emphasized: { type: 'boolean' },
  },
})

export const parseMeta = (componentPath: string) => {
  const str = fs.readFileSync(path.resolve(componentPath.slice(1)), { encoding: 'utf-8' })
  const { attributes, body } = fm(str)

  const valid = validate(attributes)
  if (!valid) {
    throw new Error(`\nInvalid frontmatter: ${componentPath}` + validate.errors!.map(error => (
      `\n  | Property ${error.instancePath} ${error.message}`
    )).join())
  }

  const { meta, ...rest } = attributes as any

  return {
    ...rest,
    ...meta,
    toc: generateToc(body),
  }
}
