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

  function wrap (node: Node, wrapper: Element) {
    const parent = node.parentNode
    if (!parent) return

    parent.insertBefore(wrapper, node) // insert wrapper before node
    wrapper.appendChild(node) // move node inside wrapper
    return wrapper
  }

  function wrapAll (nodes: Node[], wrapper: Element) {
    nodes.forEach(node => {
      wrap(node, wrapper)
    })
    return wrapper
  }

  function isBlock (element: Element) {
    if (element.nodeType !== Node.ELEMENT_NODE) return false

    const display = window.getComputedStyle(element).display
    return ['block', 'list-item', 'table'].includes(display)
  }

  function getCurrentLine () {
    const selectionResult = selection.get()
    if (!selectionResult) return null

    let node = selectionResult.selection.anchorNode
    if (!node) return null

    if (node === editorRef.value) {
      node = editorRef.value.firstChild
    }

    while (node && node.parentNode !== editorRef.value) {
      node = node.parentNode
    }

    if (!node) return null

    if (isBlock(node as Element)) {
      return node as Element
    }

    caret.save()
    const line: Node[] = []
    let prev = node.previousSibling
    let next = node.nextSibling

    while (prev && !(prev.nodeType === Node.ELEMENT_NODE && isBlock(prev as Element))) {
      line.unshift(prev)
      prev = prev.previousSibling
    }

    line.push(node)

    while (next && !(next.nodeType === Node.ELEMENT_NODE && isBlock(next as Element))) {
      line.push(next)
      next = next.nextSibling
    }

    const wrappedLine = wrapAll(line, document.createElement('div'))
    caret.restore()

    return wrappedLine
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
      const emptyFragment = emptyNode()

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

    const emptyFragment = emptyNode()

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
    wrap,
    wrapAll,
    unwrap,
    isBlock,
    wrapChildren,
    getCurrentLine,
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
