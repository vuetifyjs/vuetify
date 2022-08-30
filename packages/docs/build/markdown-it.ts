import fs from 'fs'
import path from 'path'
import Ajv from 'ajv'
import fm from 'front-matter'
import MarkdownIt from 'markdown-it'
import MarkdownItPrism from 'markdown-it-prism'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItHeaderSections from 'markdown-it-header-sections'
import markdownRules from './rules'

export const configureMarkdown = (md: MarkdownIt) => {
  md.use(MarkdownItPrism)
    .use(MarkdownItLinkAttributes, {
      matcher (href: string) {
        return /^https?:\/\//.test(href)
      },
      attrs: {
        target: '_blank',
        rel: 'noopener',
      },
    })
    .use(MarkdownItAttrs)
    .use(MarkdownItAnchor, {
      tabIndex: false,
      permalink: MarkdownItAnchor.permalink.headerLink(),
      slugify: (str: unknown) => {
        let slug = String(str)
          .trim()
          .toLowerCase()
          .replace(/[\s,.[\]{}()/]+/g, '-')
          .replace(/[^a-z0-9 -]/g, c => c.charCodeAt(0).toString(16))
          .replace(/-{2,}/g, '-')
          .replace(/^-*|-*$/g, '')

        if (slug.charAt(0).match(/[^a-z]/g)) {
          slug = 'section-' + slug
        }

        return encodeURIComponent(slug)
      },
    })
    .use(MarkdownItHeaderSections)

  markdownRules.forEach(rule => rule(md))

  return md
}

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
