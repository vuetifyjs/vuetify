// Utilities
import { omit } from '@/util/helpers'

// Types
import type { Ref } from 'vue'
import { useCaret } from './caret'
import { useElement } from './element'
import { useSelection } from './selection'
import { getObjectStyles, getStringStyles, isEmptyNode } from '../utils'

export type Formats = 'block' |
  'bold' |
  'italic' |
  'underline' |
  'strike-through' |
  'subscript' |
  'superscript' |
  'code' |
  'highlight' |
  'heading1' |
  'heading2' |
  'heading3' |
  'heading4' |
  'heading5' |
  'heading6' |
  'align-center' |
  'align-left' |
  'align-right' |
  'align-justify'

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
  name: 'block',
  icon: '',
  config: { tag: 'div' },
}

export const generalFormats: Formatter[] = [
  {
    name: 'bold',
    icon: 'mdi-format-bold',
    config: { tag: 'b' },
  },
  {
    name: 'italic',
    icon: 'mdi-format-italic',
    config: { tag: 'i' },
  },
  {
    name: 'underline',
    icon: 'mdi-format-underline',
    config: { tag: 'u' },
  },
  {
    name: 'strike-through',
    icon: 'mdi-format-strikethrough',
    config: { tag: 's' },
  },
  {
    name: 'subscript',
    icon: 'mdi-format-subscript',
    config: { tag: 'sub' },
  },
  {
    name: 'superscript',
    icon: 'mdi-format-superscript',
    config: { tag: 'sup' },
  },
  {
    name: 'code',
    icon: 'mdi-code-tags',
    config: { tag: 'code' },
  },
  {
    name: 'highlight',
    icon: 'mdi-format-color-highlight',
    config: { tag: 'mark' },
  },
]

export const headingFormats: Formatter[] = [
  {
    name: 'heading1',
    category: FormatCategory.Heading,
    icon: 'mdi-format-header-1',
    config: { tag: 'h1' },
  },
  {
    name: 'heading2',
    icon: 'mdi-format-header-2',
    category: FormatCategory.Heading,
    config: { tag: 'h2' },
  },
  {
    name: 'heading3',
    icon: 'mdi-format-header-3',
    category: FormatCategory.Heading,
    config: { tag: 'h3' },
  },
  {
    name: 'heading4',
    icon: 'mdi-format-header-4',
    category: FormatCategory.Heading,
    config: { tag: 'h4' },
  },
  {
    name: 'heading5',
    icon: 'mdi-format-header-5',
    category: FormatCategory.Heading,
    config: { tag: 'h5' },
  },
  {
    name: 'heading6',
    icon: 'mdi-format-header-6',
    category: FormatCategory.Heading,
    config: { tag: 'h6' },
  },
]

export const alignmentFormats: Formatter[] = [
  {
    name: 'align-left',
    icon: 'mdi-format-align-left',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'left' } },
  },
  {
    name: 'align-right',
    icon: 'mdi-format-align-right',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'right' } },
  },
  {
    name: 'align-center',
    icon: 'mdi-format-align-center',
    category: FormatCategory.Alignment,
    config: { styles: { textAlign: 'center' } },
  },
  {
    name: 'align-justify',
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
