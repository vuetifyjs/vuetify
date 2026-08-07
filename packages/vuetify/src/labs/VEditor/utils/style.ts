// Utilities
import { camelize } from 'vue'
import { omit, toKebabCase } from '@/util'

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

export function toggleElementStyle (element: Element, style: string, value: string) {
  const currentStyleString = element.getAttribute('style') || ''
  const currentStyles = getObjectStyles(currentStyleString)
  const currentStyleValue = currentStyles[style]

  if (currentStyleValue === value) {
    const newStyles = omit(currentStyles, [style])
    const newStyleString = getStringStyles(newStyles)

    if (newStyleString) {
      element.setAttribute('style', newStyleString)
    } else {
      element.removeAttribute('style')
    }
  } else {
    const newStyles = { ...currentStyles, [style]: value }
    const newStyleString = getStringStyles(newStyles)
    element.setAttribute('style', newStyleString)
  }
}
