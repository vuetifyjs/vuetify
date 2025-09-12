// Types
import type { Ref } from 'vue'

function getFirstLeafNode (node: Node): Node {
  let current = node
  while (current.firstChild && current.firstChild.nodeType !== Node.TEXT_NODE) {
    current = current.firstChild
  }
  return current
}

function getLastLeafNode (node: Node): Node {
  let current = node
  while (current.lastChild && current.lastChild.nodeType !== Node.TEXT_NODE) {
    current = current.lastChild
  }
  return current
}

export function useSelection (editorRef: Ref<HTMLDivElement | undefined>) {
  function get () {
    if (!editorRef.value) return null

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return null

    const range = selection.getRangeAt(0)

    if (!editorRef.value?.contains(range.commonAncestorContainer)) return null

    return { selection, range }
  }

  function getContainer (): Element | null {
    const result = get()
    if (!result) return null

    const commonAncestor = result.range.commonAncestorContainer

    const container = commonAncestor.nodeType === Node.TEXT_NODE
      ? commonAncestor.parentNode
      : commonAncestor

    return container && container.nodeType === Node.ELEMENT_NODE
      ? container as Element
      : null
  }

  function hasText (): boolean {
    const selection = get()?.selection

    if (!selection) return false
    return !selection.isCollapsed && !['\u200B', ''].includes(selection.toString())
  }

  function wrap (wrapper: Element) {
    const result = get()
    if (!result) return

    const { range } = result

    try {
      range.surroundContents(wrapper)
    } catch (e) {
      const fragment = range.extractContents()
      wrapper.appendChild(fragment)
      range.insertNode(wrapper)
    }
  }

  function select (node: Node) {
    const selection = window.getSelection()
    if (!selection) return

    const range = document.createRange()

    range.selectNodeContents(node)

    selection.removeAllRanges()
    selection.addRange(range)
  }

  function selectBetween (start: Node, end: Node) {
    const selection = window.getSelection()
    if (!selection) return

    const range = document.createRange()

    const startTextNode = getFirstLeafNode(start)
    const endTextNode = getLastLeafNode(end)

    range.setStart(startTextNode, 0)

    if (endTextNode.nodeType === Node.ELEMENT_NODE) {
      range.setEnd(endTextNode, endTextNode.childNodes.length)
    } else {
      range.setEnd(endTextNode, endTextNode.textContent?.length || 0)
    }

    selection.removeAllRanges()
    selection.addRange(range)
  }

  return {
    get,
    getContainer,
    hasText,
    select,
    wrap,
    selectBetween,
  }
}
