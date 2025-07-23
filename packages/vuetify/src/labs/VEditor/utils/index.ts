// Utilities
import { camelize } from 'vue'
import { toKebabCase } from '@/util'

export function getObjectStyles (styleString: string): Record<string, string> {
  const styles: Record<string, string> = {}
  if (!styleString) return styles

  styleString.split(';').forEach(rule => {
    const [property, value] = rule.split(':').map(s => s.trim())
    if (property && value) {
      styles[camelize(property)] = value
    }
  })

  return styles
}

export function getStringStyles (styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([property, value]) => {
      return `${toKebabCase(property)}: ${value}`
    })
    .join('; ')
}

export function wrapByTag (node: Node, tag: string) {
  const newElement = document.createElement(tag)
  newElement.appendChild(node)
  return newElement
}

export function isEmptyNode (node: Node): boolean {
  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.ELEMENT_NODE) {
      const content = (child.nodeType === Node.ELEMENT_NODE ? (child as Element) : child).textContent
      if (content?.replace(/\u200B/g, '').trim()) {
        return false
      }
    }
  }
  return true
}
