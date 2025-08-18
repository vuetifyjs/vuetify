// Utilities
import { omit } from '@/util/helpers'

// Types
import type { Ref } from 'vue'
import { useCaret } from './caret'
import { useElement } from './element'
import { useSelection } from './selection'
import { getObjectStyles, getStringStyles, isEmptyNode } from '../utils'

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
  Center = 'align-center',
  Left = 'align-left',
  Right = 'align-right',
  Justify = 'align-justify',
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

export const generalFormats: Formatter[] = [
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
]

export const headingFormats: Formatter[] = [
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
]

export const alignmentFormats: Formatter[] = [
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
  const caret = useCaret(editorRef)
  const editorElement = useElement(editorRef)

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

  function replaceElementFormat (element: Element, format: Formatter) {
    const formatterElement = get(format)
    editorElement.replaceContainer(element, formatterElement)
  }

  function formatElementChildren (element: Element, format: Formatter) {
    const formatterElement = get(format)
    editorElement.wrapChildren(element, formatterElement)
  }

  function addInlineFormat (format: Formatter) {
    if (!editorRef.value) return

    editorRef.value?.focus()

    const formatterElement = get(format)
    selection.wrap(formatterElement)

    if (!selection.hasText()) {
      caret.insertInto(formatterElement)
    } else {
      selection.select(formatterElement)
    }
  }

  function removeInlineFormat (element: Element) {
    if (!editorRef.value) return

    const isElementEmpty = isEmptyNode(element)

    if (isElementEmpty) {
      editorElement.remove(element)
    } else if (selection.hasText()) {
      editorElement.removeFormatAtSelection(element)
    } else {
      editorElement.removeFormatAtCaret(element)
    }
  }

  function toggleInlineFormat (format: Formatter) {
    const formattedElement = findElementWithFormat(format)
    if (formattedElement) {
      removeInlineFormat(formattedElement)
    } else {
      addInlineFormat(format)
    }
  }

  function toggleHeadingFormat (format: Formatter) {
    const currentBlockElement = editorElement.getCurrentBlock()
    const currentBlockTag = currentBlockElement?.tagName.toLowerCase()
    const isCurrentBlockHeadingOrDiv = currentBlockTag?.startsWith('h') || currentBlockTag === 'div'

    if (!editorRef.value) return

    caret.save()

    if (!currentBlockElement) {
      formatElementChildren(editorRef.value, format)
    } else if (isApplied(format, currentBlockElement)) {
      replaceElementFormat(currentBlockElement, blockFormatter)
    } else if (isCurrentBlockHeadingOrDiv) {
      replaceElementFormat(currentBlockElement, format)
    } else {
      formatElementChildren(currentBlockElement, format)
    }

    caret.restore()
  }

  function toggleAlignmentFormat (format: Formatter) {
    const blockElement = editorElement.getCurrentBlock()
    const targetStyles = format.config.styles
    const targetAlignment = targetStyles?.textAlign

    if (!editorRef.value) return

    if (!targetAlignment) return

    if (!blockElement) {
      caret.save()
      formatElementChildren(editorRef.value, format)
      caret.restore()
    } else {
      const currentStyleString = blockElement.getAttribute('style') || ''
      const currentStyles = getObjectStyles(currentStyleString)
      const currentAlignment = currentStyles.textAlign

      if (currentAlignment === targetAlignment) {
        const newStyles = omit(currentStyles, ['textAlign'])
        const newStyleString = getStringStyles(newStyles)

        if (newStyleString) {
          blockElement.setAttribute('style', newStyleString)
        } else {
          blockElement.removeAttribute('style')
        }
      } else {
        const newStyles = { ...currentStyles, textAlign: targetAlignment }
        const newStyleString = getStringStyles(newStyles)
        blockElement.setAttribute('style', newStyleString)
      }
    }
  }

  const inline = {
    toggle: toggleInlineFormat,
    add: addInlineFormat,
    remove: removeInlineFormat,
  }

  const heading = {
    toggle: toggleHeadingFormat,
  }

  const alignment = {
    toggle: toggleAlignmentFormat,
  }

  return {
    isApplied,
    findElementWithFormat,

    inline,
    heading,
    alignment,
  }
}
