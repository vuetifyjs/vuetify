import { readFileSync } from 'node:fs'
import { glob, mkdir, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PAGES_DIR = resolve(__dirname, '../src/pages/en')
const DIST_DIR = resolve(__dirname, '../dist')

function load (path: string): ArrayBuffer {
  const buffer = readFileSync(path)
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
}

const logo = `data:image/png;base64,${readFileSync(resolve(__dirname, 'fonts/vuetify-logo.png')).toString('base64')}`
const icon = `data:image/png;base64,${readFileSync(resolve(__dirname, 'fonts/vuetify-icon-white.png')).toString('base64')}`

const fonts = [
  {
    name: 'Inter',
    data: load(resolve(__dirname, 'fonts/Inter-Regular.ttf')),
    weight: 400 as const,
    style: 'normal' as const,
  },
  {
    name: 'Inter',
    data: load(resolve(__dirname, 'fonts/Inter-Bold.ttf')),
    weight: 700 as const,
    style: 'normal' as const,
  },
]

function getPath (file: string): string {
  return '/' + relative(PAGES_DIR, file)
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .replace(/^index$/, '')
}

const CATEGORY_MAP: Record<string, string> = {
  components: 'Components',
  directives: 'Directives',
  features: 'Features',
  styles: 'Styles',
  'getting-started': 'Getting Started',
  introduction: 'Introduction',
  labs: 'Labs',
  resources: 'Resources',
  about: 'About',
  blog: 'Blog',
  api: 'API Reference',
  concepts: 'Concepts',
  wireframes: 'Wireframes',
}

function inferCategory (path: string): string | undefined {
  return CATEGORY_MAP[path.split('/')[1]]
}

function extractFrontmatter (content: string): { title?: string, description?: string } {
  if (!content.startsWith('---')) return {}
  const end = content.indexOf('---', 3)
  if (end === -1) return {}

  const fm = content.slice(3, end)
  let title: string | undefined
  let description: string | undefined

  for (const line of fm.split('\n')) {
    const trimmed = line.trim()
    if (trimmed.startsWith('title:')) {
      title = trimmed.slice(6).trim().replace(/^['"]|['"]$/g, '')
    } else if (trimmed.startsWith('description:')) {
      description = trimmed.slice(12).trim().replace(/^['"]|['"]$/g, '')
    }
  }

  return { title, description }
}

function template (title: string, description: string, category?: string) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
        fontFamily: 'Inter',
      },
      children: [
        // Watermark icon
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              position: 'absolute',
              top: '80px',
              right: '40px',
              opacity: 0.06,
            },
            children: [{
              type: 'img',
              props: {
                src: icon,
                width: 345,
                height: 300,
                style: {},
              },
            }],
          },
        },
        // Content
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: '1',
              padding: '60px',
            },
            children: [
              // Header: logo + category
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '40px',
                  },
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: logo,
                        width: 260,
                        height: 81,
                        style: {},
                      },
                    },
                    ...(category
                      ? [{
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '22px',
                              color: 'rgba(255, 255, 255, 0.4)',
                              marginLeft: '4px',
                            },
                            children: `/ ${category}`,
                          },
                        }]
                      : []),
                  ],
                },
              },
              // Title + description
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1',
                    justifyContent: 'center',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '76px',
                          fontWeight: 700,
                          lineHeight: '1.2',
                          marginBottom: '24px',
                          color: 'white',
                        },
                        children: title,
                      },
                    },
                    ...(description
                      ? [{
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '34px',
                              color: 'rgba(255, 255, 255, 0.7)',
                              lineHeight: '1.5',
                            },
                            children: description,
                          },
                        }]
                      : []),
                  ],
                },
              },
              // Footer
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '22px',
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                  children: 'vuetifyjs.com',
                },
              },
            ],
          },
        },
      ],
    },
  }
}

async function render (title: string, description: string, category?: string): Promise<Buffer> {
  const svg = await satori(template(title, description, category) as any, {
    width: 1200,
    height: 630,
    fonts,
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
  })

  return resvg.render().asPng()
}

export async function generateOgImages (): Promise<void> {
  const start = performance.now()
  let count = 0

  const files: Array<{ path: string, title: string, description: string, category?: string }> = [{
    path: '/',
    title: 'Vuetify',
    description: 'Build beautiful Vue applications with Material Design components',
  }]

  // Generate for markdown pages
  for await (const file of glob(`${PAGES_DIR}/**/*.md`)) {
    const raw = readFileSync(file, 'utf8')
    const { title, description } = extractFrontmatter(raw)

    if (!title) continue

    const path = getPath(file)
    files.push({
      path,
      title,
      description: description ?? '',
      category: inferCategory(path),
    })
  }

  // Render in batches
  const batch = 20
  for (let i = 0; i < files.length; i += batch) {
    const chunk = files.slice(i, i + batch)
    await Promise.all(chunk.map(async ({ path, title, description, category }) => {
      const png = await render(title, description, category)
      const outPath = path === '' || path === '/' ? '/index' : path
      const outFile = resolve(DIST_DIR, `og${outPath}.png`)
      await mkdir(dirname(outFile), { recursive: true })
      await writeFile(outFile, png)
      count++
    }))
  }

  const elapsed = ((performance.now() - start) / 1000).toFixed(1)
  console.log(`[og-images] Generated ${count} images in ${elapsed}s`)
}
