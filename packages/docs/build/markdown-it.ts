import fs from 'fs'
import path from 'path'
import Ajv from 'ajv'
import fm from 'front-matter'
import MarkdownIt from 'markdown-it'
import { configureMarkdown } from '../src/utils/markdown-it'
export { configureMarkdown } from '../src/utils/markdown-it'

export const md = configureMarkdown(new MarkdownIt())

const generateToc = (content: string) => {
  const headings = []
  const tokens = md.parse(content, {})
  const length = tokens.length

  for (let i = 0; i < length; i++) {
    const token = tokens[i]

    if (token.type === 'inline' && token.content.startsWith('<!--') && !token.content.endsWith('-->')) {
      do {
        i++
      } while (i < length && !tokens[i].content.endsWith('-->'))
      continue
    }

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
    meta: {
      type: 'object',
      additionalProperties: false,
      properties: {
        nav: { type: 'string' }, // Title used in navigation links
        title: { type: 'string' }, // SEO title
        description: { type: 'string' }, // SEO description
        keywords: { type: 'string' }, // SEO keywords
      },
    },
    layout: { type: 'string' },
    related: {
      type: 'array',
      maxItems: 3,
      uniqueItems: true,
      items: { type: 'string' }, // Absolute paths to related pages
    },
    assets: {
      type: 'array',
      uniqueItems: true,
      items: { type: 'string' }, // Additional stylesheets to load
    },
    disabled: { type: 'boolean' }, // The page is not published
    emphasized: { type: 'boolean' }, // The page is emphasized in the navigation
    fluid: { type: 'boolean' }, // Hide the Toc
    backmatter: { type: 'boolean' }, // Hide the backmatter
    features: {
      type: 'object',
      additionalProperties: false,
      properties: {
        figma: { type: 'boolean' },
        label: { type: 'string' },
        report: { type: 'boolean' },
        github: { type: 'string' },
        spec: { type: 'string' },
      },
    },
  },
})

export function parseMeta (componentPath: string, locale: string) {
  const str = fs.readFileSync(path.resolve(componentPath.slice(1)), { encoding: 'utf-8' })
  const { attributes, body } = fm(str)

  const valid = validate(attributes)
  if (!valid && locale !== 'eo-UY') {
    throw new Error(`\nInvalid frontmatter: ${componentPath}` + validate.errors!.map(error => (
      `\n  | Property ${error.instancePath} ${error.message}`
    )).join())
  }

  const { meta, ...rest } = attributes as any

  if (locale !== 'en') {
    const original = parseMeta(componentPath.replace(`/${locale}/`, '/en/'), 'en')
    Object.assign(rest, {
      layout: original.layout,
      related: original.related,
      assets: original.assets,
      disabled: original.disabled,
      emphasized: original.emphasized,
    })
  }

  return {
    ...rest,
    ...meta,
    toc: generateToc(body),
  }
}
