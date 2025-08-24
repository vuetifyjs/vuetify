// Composables
import { useCaret } from './caret'
import { useSelection } from './selection'
import { isEmptyNode, wrapByTag } from '../utils'

// Types
import type { Ref } from 'vue'

const zeroWidthSpace = '\u200B'
const emptyNode = () => document.createTextNode(zeroWidthSpace)

export function useElement (editorRef: Ref<HTMLDivElement | undefined>) {
  const caret = useCaret(editorRef)
  const selection = useSelection(editorRef)

  function remove (element: Element) {
    const parent = element.parentNode
    if (!parent) return
    parent.removeChild(element)
  }

  function replaceContainer (element: Element, newElement: Element) {
    const attributes = element.attributes
    for (const attribute of attributes) {
      newElement.setAttribute(attribute.name, attribute.value)
    }

    while (element.firstChild) {
      newElement.appendChild(element.firstChild)
    }
    element.parentNode?.replaceChild(newElement, element)
  }

  function wrapChildren (element: Element, wrapper: Element) {
    while (element.firstChild) {
      wrapper.appendChild(element.firstChild)
    }
    element.insertBefore(wrapper, element.firstChild)
  }

  function unwrap (element: Element) {
    const parent = element.parentNode
    if (!parent) return

    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element)
    }

    parent.removeChild(element)
  }

  function getCurrentBlock () {
    const selectionResult = selection.get()
    if (!selectionResult) return null

    let node = selectionResult.selection.anchorNode

    // If it's a text node, move up to the parent
    if (node?.nodeType === 3) node = node.parentNode

    // Traverse up until we find a block element
    while (node && node !== editorRef.value) {
      const display = window.getComputedStyle(node as Element).display
      if (['block', 'list-item', 'table'].includes(display)) {
        return node as Element
      }
      node = node.parentNode
    }

    return null
  }

  function getRemainingFormats (element: Element, innerContent: Node = emptyNode()): Node | null {
    const selectionResult = selection.get()
    if (!selectionResult) return null
    const { range } = selectionResult

    const remainingFormatStack: HTMLElement[] = []
    let current: Node | null = range.startContainer
    while (current && current !== element) {
      if (current instanceof HTMLElement) {
        remainingFormatStack.unshift(current.cloneNode(false) as HTMLElement)
      }
      current = current.parentNode
    }

    return remainingFormatStack.reduce((child: Node, wrapper: Node) => {
      wrapper.appendChild(child)
      return wrapper
    }, innerContent)
  }

  function getRemainingFormatsAtSelection (element: Element) {
    const selectionResult = selection.get()
    if (!selectionResult) return null
    const { range } = selectionResult

    if (range.collapsed) return null

    const contents = range.cloneContents()

    if (isEmptyNode(contents)) return null

    const remainingFormats = getRemainingFormats(element, contents)

    if (remainingFormats?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return wrapByTag(remainingFormats, 'span')
    }

    return remainingFormats
  }

  function getFragmentAfterSelection (element: Element) {
    const selectionResult = selection.get()
    if (!selectionResult) return null
    const { range } = selectionResult

    const afterRange = range.cloneRange()
    afterRange.setStart(range.endContainer, range.endOffset)
    afterRange.setEndAfter(element)

    const fragment = afterRange.cloneContents()
    return isEmptyNode(fragment) ? null : fragment
  }

  function getFragmentBeforeSelection (element: Element) {
    const selectionResult = selection.get()
    if (!selectionResult) return null
    const { range } = selectionResult

    const beforeRange = range.cloneRange()
    beforeRange.setStartBefore(element)
    beforeRange.setEnd(range.startContainer, range.startOffset)
    const fragment = beforeRange.cloneContents()

    return isEmptyNode(fragment) ? null : fragment
  }

  function getFragmentAfterCaret (element: Element) {
    const selectionResult = selection.get()
    if (!selectionResult) return null
    const { range } = selectionResult

    const afterRange = range.cloneRange()
    afterRange.setStart(range.startContainer, range.startOffset)
    afterRange.setEndAfter(element)

    const fragment = afterRange.cloneContents()
    return isEmptyNode(fragment) ? null : fragment
  }

  function removeFormatAtSelection (element: Element) {
    const parent = element.parentNode
    if (!parent) return

    const firstChild = element.firstChild
    if (!firstChild) return

    const lastChild = element.lastChild
    if (!lastChild) return

    const selectedContent = getRemainingFormatsAtSelection(element)
    if (!selectedContent) return

    const afterFragment = getFragmentAfterSelection(element)
    const beforeFragment = getFragmentBeforeSelection(element)

    if (!beforeFragment && !afterFragment) {
      unwrap(element)
      selection.selectBetween(firstChild, lastChild)
    } else {
      const emptyFragment = document.createTextNode(zeroWidthSpace)

      parent.insertBefore(beforeFragment || emptyFragment, element)
      parent.insertBefore(selectedContent, element)
      parent.insertBefore(afterFragment || emptyFragment, element)
      parent.removeChild(element)

      selection.select(selectedContent.lastChild || selectedContent)
    }
  }

  function removeFormatAtCaret (element: Element) {
    const parent = element.parentNode
    if (!parent) return

    const emptyFragment = document.createTextNode(zeroWidthSpace)

    const middle = getRemainingFormats(element) || emptyFragment
    const afterFragment = getFragmentAfterCaret(element) || emptyFragment
    const beforeFragment = getFragmentBeforeSelection(element) || emptyFragment

    parent.insertBefore(beforeFragment, element)
    parent.insertBefore(middle, element)
    parent.insertBefore(afterFragment, element)
    parent.removeChild(element)

    caret.insertInto(middle.firstChild || middle)
  }

  return {
    remove,
    unwrap,
    wrapChildren,
    getCurrentBlock,
    replaceContainer,
    removeFormatAtCaret,
    removeFormatAtSelection,
    getRemainingFormats,
    getRemainingFormatsAtSelection,
    getFragmentAfterCaret,
    getFragmentAfterSelection,
    getFragmentBeforeSelection,
  }
}
