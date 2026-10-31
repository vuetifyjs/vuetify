// Utilities
import { parseMapSvg } from '../svg'

// Types
import type { MapNode } from '../svg'

describe('VMap SVG source', () => {
  it('should reject an invalid SVG source', () => {
    expect(() => parseMapSvg('<svg>', 'map')).toThrow(/VMap requires/)
  })

  it('should remove executable content, links, and external resources', () => {
    const result = parseMapSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <script>alert(1)</script>
      <foreignObject><div xmlns="http://www.w3.org/1999/xhtml">unsafe</div></foreignObject>
      <image href="https://example.com/image.svg" />
      <style>path { fill: url(https://example.com/fill.svg) }</style>
      <path id="safe" onclick="alert(1)" onload="alert(1)" fill="url(https://example.com/fill.svg)" style="stroke: red; filter: url(https://example.com/filter.svg)" d="M0 0H10V10Z" />
      <use href="javascript:alert(1)" />
      <use href="https://example.com/map.svg#safe" />
    </svg>`, 'map')
    const nodes = result.children.filter(child => typeof child !== 'string') as MapNode[]
    expect(nodes.map(node => node.tag)).toEqual(['path', 'use', 'use'])
    expect(nodes[0].attributes).toEqual({ id: expect.any(String), stroke: 'red', d: 'M0 0H10V10Z' })
    expect(nodes.slice(1).every(node => !node.attributes.href)).toBe(true)
  })
})
