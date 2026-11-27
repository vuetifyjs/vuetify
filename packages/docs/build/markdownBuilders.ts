import { createBuilder } from '@yankeeinlondon/builder-api'
import type { Pipeline } from '@yankeeinlondon/builder-api'
import type { Plugin } from 'vite'
import Ajv from 'ajv'
import { md } from './markdown-it.ts'
import fm from 'front-matter'
import fs from 'node:fs'
import path from 'node:path'

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

type OriginalPage = {
  frontmatter: Record<string, any>
  setup?: string
}

async function setupPages<T extends Pipeline<any>> (
  payload: T,
  options: {
    files?: Map<string, OriginalPage>
    awaiting?: Map<string, ((v: OriginalPage) => void)[]>
    pages?: ReadonlyArray<Record<'name' | 'path' | 'component', string>>
  }
) {
  if (!options.pages) {
    const pagesPlugin = payload.viteConfig.plugins!
      .find((p: any) => p && 'name' in p && p.name === 'vite-plugin-pages') as Plugin
    options.pages = await pagesPlugin.api.getResolvedRoutes() as []
  }

  // en components are shared with untranslated locale routes
  const page = options.pages.find(p => (
    payload.fileName.endsWith(p.component) && p.component.includes(`/${p.path.split('/')[1]}/`)
  ))

  if (!page) throw new Error('Unable to find page')

  const locale = page.path.split('/').at(1)!

  // Cached for the whole build, so it must not hold the payload: that keeps every page's DOM alive
  const current: OriginalPage = {
    frontmatter: payload.frontmatter ?? {},
    setup: 'html' in payload && typeof payload.html !== 'string'
      ? payload.html.querySelector('script[setup]')?.innerHTML
      : undefined,
  }

  let original: OriginalPage
  if (locale !== 'en') {
    const originalPath = page.path.replace(`/${locale}/`, '/en/')
    const cached = options.files?.get(originalPath)
    if (cached) {
      original = cached
    } else {
      options.awaiting ??= new Map()
      const awaiting = options.awaiting.get(originalPath) ?? []
      const { promise, resolve } = Promise.withResolvers<OriginalPage>()
      awaiting.push(resolve)
      options.awaiting.set(originalPath, awaiting)
      original = await promise
    }
  } else {
    original = current
    options.files ??= new Map()
    options.files.set(page.path, current)
    options.awaiting?.get(page.path)?.forEach(fn => fn(current))
    options.awaiting?.delete(page.path)
  }

  return { page, locale, original }
}

export const frontmatterBuilder = createBuilder('frontmatterBuilder', 'metaExtracted')
  .options()
  .initializer()
  .handler(async (payload, options) => {
    const { locale, original } = await setupPages(payload, options)

    const { meta, ...rest } = payload.frontmatter

    if (locale !== 'en') {
      Object.assign(rest, {
        assets: original.frontmatter.assets,
        related: original.frontmatter.related,
      })
    }

    payload.frontmatter = {
      meta,
      assets: rest.assets,
      backmatter: rest.backmatter,
      features: rest.features,
      fluid: rest.fluid,
      related: rest.related,
      toc: generateToc(payload.md),
    }

    return payload
  })
  .meta()

export function getRouteMeta (componentPath: string, locale: string) {
  const resolved = path.resolve(componentPath.slice(1))

  if (!fs.existsSync(resolved)) {
    return { disabled: true }
  }

  const str = fs.readFileSync(resolved, { encoding: 'utf-8' })
  const { attributes } = fm(str)

  const valid = validate(attributes)
  if (!valid && locale !== 'eo-UY') {
    throw new Error(`\nInvalid frontmatter: ${componentPath}` + validate.errors!.map(error => (
      `\n  | Property ${error.instancePath} ${error.message}`
    )).join())
  }

  const a = attributes as any

  if (locale !== 'en') {
    const original = getRouteMeta(componentPath.replace(`/${locale}/`, '/en/'), 'en')
    a.disabled = original.disabled
    a.emphasized = original.emphasized
    a.layout = original.layout
  }

  return {
    disabled: a.disabled,
    emphasized: a.emphasized,
    layout: a.layout,
    ...a.meta,
  }
}

// Crowdin exports untranslated pages as copies of en, building them again only costs memory
export function resolveComponent (componentPath: string, locale: string) {
  if (locale === 'en' || !componentPath.endsWith('.md')) return componentPath

  const original = componentPath.replace(`/${locale}/`, '/en/')
  const read = (file: string) => fs.readFileSync(path.resolve(file.slice(1)), 'utf-8').replace(/\s+/g, '')

  return read(componentPath) === read(original) ? original : componentPath
}

function generateToc (content: string) {
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

export const scriptFixer = createBuilder('scriptFixer', 'dom')
  .options()
  .initializer()
  .handler(async (payload, options) => {
    const { locale, original } = await setupPages(payload, options)

    if (locale !== 'en') {
      const setup = payload.html.querySelector('script[setup]')
      if (setup) {
        if (original.setup == null) {
          throw new Error(`Extra setup in ${payload.fileName}`)
        }
        setup.innerHTML = original.setup
      }
    }

    return payload
  })
  .meta()
