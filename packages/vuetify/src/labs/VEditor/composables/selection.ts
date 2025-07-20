// Types
import type { Ref } from 'vue'

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
    return !selection.isCollapsed && selection.toString() !== '\u200B'
  }

  function focus () {
    const selectionResult = get()
    if (!selectionResult) return

    selectionResult.range.collapse(false)
    selectionResult.selection.removeAllRanges()
    selectionResult.selection.addRange(selectionResult.range)
  }

  function select (node: Node) {
    selectBetween(node)
  }

  function selectBetween (start: Node, end?: Node | null) {
    const selection = window.getSelection()
    if (!selection) return

    const range = document.createRange()

    if (!end) {
      range.selectNodeContents(start)
    } else {
      range.setStart(start, 0)
      if (end.nodeType === Node.ELEMENT_NODE) {
        range.setEnd(end, end.childNodes.length)
      } else {
        range.setEnd(end, end.textContent?.length || 0)
      }
    }

    selection.removeAllRanges()
    selection.addRange(range)
  }

  return {
    get,
    getContainer,
    hasText,
    focus,
    select,
    selectBetween,
  }
}
