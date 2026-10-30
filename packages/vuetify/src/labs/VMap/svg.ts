// Types
import type { MapViewBox } from './viewport'

export type MapRegion = { id: string, title: string }
export type MapNode = {
  tag: string
  attributes: Record<string, string>
  region?: MapRegion
  reference?: MapNode
  children: (MapNode | string)[]
}
export type MapDocument = {
  viewBox: MapViewBox
  attributes: Record<string, string>
  children: (MapNode | string)[]
  regions: MapRegion[]
}

type MapSvgContext = {
  identifiers: Map<string, string>
  references: Set<Element>
  definitions: boolean
  region?: MapRegion
  group?: MapRegion
}

const namespace = 'http://www.w3.org/2000/svg'
const elements = new Set([
  'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
  'text', 'tspan', 'title', 'desc', 'defs', 'linearGradient', 'radialGradient',
  'stop', 'clipPath', 'mask', 'symbol', 'use',
])
const shapes = new Set(['g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'use'])
const attributes = new Set([
  'id', 'd', 'points', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry',
  'width', 'height', 'dx', 'dy', 'rotate', 'transform', 'opacity', 'fill', 'fill-opacity',
  'fill-rule', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linecap',
  'stroke-linejoin', 'stroke-miterlimit', 'stroke-dasharray', 'stroke-dashoffset',
  'clip-path', 'clip-rule', 'mask', 'vector-effect', 'paint-order', 'color',
  'font-family', 'font-size', 'font-weight', 'font-style', 'text-anchor',
  'dominant-baseline', 'alignment-baseline', 'letter-spacing', 'word-spacing',
  'gradientUnits', 'gradientTransform', 'spreadMethod', 'offset', 'stop-color',
  'stop-opacity', 'fx', 'fy', 'fr', 'clipPathUnits', 'maskUnits', 'maskContentUnits',
  'viewBox', 'preserveAspectRatio', 'href',
])
const presentation = new Set([
  'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-opacity',
  'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-dasharray',
  'stroke-dashoffset', 'clip-path', 'clip-rule', 'mask', 'opacity', 'color',
  'font-family', 'font-size', 'font-weight', 'font-style', 'text-anchor',
  'dominant-baseline', 'alignment-baseline', 'letter-spacing', 'word-spacing',
  'stop-color', 'stop-opacity', 'vector-effect', 'paint-order',
])

export function parseMapSvg (source: string, prefix: string): MapDocument {
  const document = new DOMParser().parseFromString(source, 'image/svg+xml')
  const root = document.documentElement

  if (document.querySelector('parsererror') || document.doctype || root.localName !== 'svg' || root.namespaceURI !== namespace) {
    throw new Error('VMap requires a valid SVG document without a document type')
  }

  const numbers = root.getAttribute('viewBox')?.trim().split(/[\s,]+/).map(Number)
  const width = Number(root.getAttribute('width'))
  const height = Number(root.getAttribute('height'))
  const viewBox = numbers ?? [0, 0, width, height]

  if (viewBox.length !== 4 || !viewBox.every(Number.isFinite) || viewBox[2] <= 0 || viewBox[3] <= 0) {
    throw new Error('VMap requires a positive viewBox or numeric width and height')
  }

  const identifiers = new Map<string, string>()
  const sources = new Map<string, Element>()
  for (const element of [root, ...root.querySelectorAll('[id]')]) {
    const id = element.getAttribute('id')
    if (!id) continue
    if (identifiers.has(id)) throw new Error(`VMap requires unique SVG identifiers: ${id}`)
    const scoped = `${prefix}-${identifiers.size}`
    identifiers.set(id, scoped)
    sources.set(scoped, element)
  }

  function readAttributes (element: Element, identifiers: Map<string, string>) {
    const result: Record<string, string> = {}
    const values = new Map(Array.from(element.attributes, attribute => [attribute.localName, attribute.value]))
    for (const declaration of (element.getAttribute('style') ?? '').split(';')) {
      const separator = declaration.indexOf(':')
      const name = declaration.slice(0, separator).trim()
      if (separator > 0 && presentation.has(name)) values.set(name, declaration.slice(separator + 1).trim())
    }

    for (const [name, value] of values) {
      if (!attributes.has(name) || /[\\<>]|\/\*|\*\/|@|!|expression\s*\(/i.test(value)) continue
      if (name === 'id') {
        result.id = identifiers.get(value)!
      } else if (name === 'href') {
        if (value.startsWith('#') && identifiers.has(value.slice(1))) result.href = `#${identifiers.get(value.slice(1))}`
      } else if (/url\s*\(/i.test(value)) {
        const reference = /^url\(\s*['"]?#([^\s'"()]+)['"]?\s*\)$/.exec(value)
        if (reference && identifiers.has(reference[1])) result[name] = `url(#${identifiers.get(reference[1])})`
      } else {
        result[name] = value
      }
    }
    return result
  }

  const regions: MapRegion[] = []
  const regionIds = new Set<string>()
  let referenceIndex = 0

  function readElement (element: Element, context: MapSvgContext): MapNode | undefined {
    if (element.namespaceURI !== namespace || !elements.has(element.localName)) return

    const tag = element.localName
    const definitions = context.definitions || ['defs', 'clipPath', 'mask', 'symbol', 'linearGradient', 'radialGradient'].includes(tag)
    const explicit = element.getAttribute('data-region')
    const id = explicit || (context.group ? undefined : element.getAttribute('id'))
    const title = element.getAttribute('aria-label') ||
      Array.from(element.children).find(child => child.localName === 'title')?.textContent || id
    const region = !definitions && shapes.has(tag) && id ? { id, title: title! } : undefined
    if (region && !regionIds.has(region.id)) {
      regionIds.add(region.id)
      regions.push(region)
    }

    const childContext = {
      ...context,
      definitions,
      region: region ?? context.region,
      group: tag === 'g' && explicit && region ? region : context.group,
    }
    const node: MapNode = {
      tag,
      attributes: readAttributes(element, context.identifiers),
      region,
      children: readChildren(element, childContext),
    }

    const source = tag === 'use' && childContext.region && node.attributes.href && sources.get(node.attributes.href.slice(1))
    if (source) {
      if (context.references.has(source)) {
        delete node.attributes.href
      } else {
        const scoped = new Map(context.identifiers)
        const referencePrefix = `${prefix}-ref-${referenceIndex++}`
        for (const [index, element] of [source, ...source.querySelectorAll('[id]')].entries()) {
          const id = element.getAttribute('id')
          if (!id) continue
          const identifier = `${referencePrefix}-${index}`
          scoped.set(id, identifier)
          sources.set(identifier, element)
        }
        node.reference = readElement(source, {
          identifiers: scoped,
          references: new Set([...context.references, source]),
          definitions: true,
          region: childContext.region,
        })
      }
    }

    return node
  }

  function readChildren (element: Element, context: MapSvgContext): (MapNode | string)[] {
    return Array.from(element.childNodes).flatMap<MapNode | string>(child => {
      if (child.nodeType === 3) return [child.textContent ?? '']
      if (child.nodeType !== 1) return []
      const node = readElement(child as Element, context)
      return node ? [node] : []
    })
  }

  const rootAttributes = readAttributes(root, identifiers)
  for (const name of ['id', 'x', 'y', 'width', 'height', 'viewBox', 'preserveAspectRatio']) delete rootAttributes[name]

  return {
    viewBox: { x: viewBox[0], y: viewBox[1], width: viewBox[2], height: viewBox[3] },
    attributes: rootAttributes,
    children: readChildren(root, { identifiers, references: new Set(), definitions: false }),
    regions,
  }
}
