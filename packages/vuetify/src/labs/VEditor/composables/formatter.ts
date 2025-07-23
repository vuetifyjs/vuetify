// Types
import type { Ref } from 'vue'
import { getObjectStyles, getStringStyles } from '../utils'

import { useSelection } from './selection'

export enum Formats {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  StrikeThrough = 'strike-through',
  Subscript = 'subscript',
  Superscript = 'superscript',
  Code = 'code',
  Highlight = 'highlight',
  Heading1 = 'heading1',
  Heading2 = 'heading2',
  Heading3 = 'heading3',
  Heading4 = 'heading4',
  Heading5 = 'heading5',
  Heading6 = 'heading6',
  Center = 'center',
  Left = 'left',
  Right = 'right',
  Justify = 'justify',
  Block = 'block',
}

export enum FormatCategory {
  Heading = 'heading',
  Alignment = 'alignment',
}

export type Formatter = {
  name: Formats
  icon: string
  category?: FormatCategory
  config: { tag?: string, styles?: Record<string, string>}
}

export const blockFormatter: Formatter = {
  name: Formats.Block,
  icon: '',
  config: { tag: 'div' },
}

export const formats: Formatter[] = [
  {
    name: Formats.Bold,
    icon: 'mdi-format-bold',
    config: { tag: 'b' },
  },
  {
    name: Formats.Italic,
    icon: 'mdi-format-italic',
    config: { tag: 'i' },
  },
  {
    name: Formats.Underline,
    icon: 'mdi-format-underline',
    config: { tag: 'u' },
  },
  {
    name: Formats.StrikeThrough,
    icon: 'mdi-format-strikethrough',
    config: { tag: 's' },
  },
  {
    name: Formats.Subscript,
    icon: 'mdi-format-subscript',
    config: { tag: 'sub' },
  },
  {
    name: Formats.Superscript,
    icon: 'mdi-format-superscript',
    config: { tag: 'sup' },
  },
  {
    name: Formats.Code,
    icon: 'mdi-code-tags',
    config: { tag: 'code' },
  },
  {
    name: Formats.Highlight,
    icon: 'mdi-format-color-highlight',
    config: { tag: 'mark' },
  },
  {
    name: Formats.Heading1,
    category: FormatCategory.Heading,
    icon: 'mdi-format-header-1',
    config: { tag: 'h1' },
  },
  {
    name: Formats.Heading2,
    icon: 'mdi-format-header-2',
    category: FormatCategory.Heading,
    config: { tag: 'h2' },
  },
  {
    name: Formats.Heading3,
    icon: 'mdi-format-header-3',
    category: FormatCategory.Heading,
    config: { tag: 'h3' },
  },
  {
    name: Formats.Heading4,
    icon: 'mdi-format-header-4',
    category: FormatCategory.Heading,
    config: { tag: 'h4' },
  },
  {
    name: Formats.Heading5,
    icon: 'mdi-format-header-5',
    category: FormatCategory.Heading,
    config: { tag: 'h5' },
  },
  {
    name: Formats.Heading6,
    icon: 'mdi-format-header-6',
    category: FormatCategory.Heading,
    config: { tag: 'h6' },
  },
  {
    name: Formats.Left,
    icon: 'mdi-format-align-left',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'left' } },
  },
  {
    name: Formats.Right,
    icon: 'mdi-format-align-right',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'right' } },
  },
  {
    name: Formats.Center,
    icon: 'mdi-format-align-center',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'center' } },
  },
  {
    name: Formats.Justify,
    icon: 'mdi-format-align-justify',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'justify' } },
  },
]

export function useFormatter (editorRef: Ref<HTMLDivElement | undefined>) {
  const selection = useSelection(editorRef)

  function get (format: Formatter) {
    const { tag, styles } = format.config
    const newElement = document.createElement(tag || 'div')

    if (styles) {
      const styleString = getStringStyles(styles)
      newElement.setAttribute('style', styleString)
    }

    return newElement
  }

  function isApplied (format: Formatter, element: Element) {
    const { tag, styles } = format.config

    const hasSameTag = tag ? element.tagName.toLowerCase() === tag.toLowerCase() : true

    const hasSameStyles = styles ? (() => {
      const elementStyleString = element.getAttribute('style') || ''
      const elementStyles = getObjectStyles(elementStyleString)
      return Object.entries(styles).every(([key, value]) => elementStyles[key] === value)
    })() : true

    return hasSameTag && hasSameStyles
  }

  function findElementWithFormat (format: Formatter) {
    let element = selection.getContainer()
    if (!element) return null

    while (element && element !== editorRef.value) {
      if (isApplied(format, element)) {
        return element
      }
      element = element.parentElement
    }

    return null
  }

  return {
    get,
    isApplied,
    findElementWithFormat,
  }
}
