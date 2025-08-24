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
