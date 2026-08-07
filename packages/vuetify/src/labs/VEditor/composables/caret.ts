// Composables
import { useSelection } from './selection'

// Types
import type { Ref } from 'vue'

const markerId = 'caret-marker'
const zeroWidthSpace = '\u200B'

function createMarker (): HTMLElement {
  const marker = document.createElement('span')
  marker.id = markerId

  return marker
}

function removeMarker (): void {
  const marker = document.getElementById(markerId)
  if (marker && marker.parentNode) {
    marker.parentNode.removeChild(marker)
  }
}

export function useCaret (editorRef: Ref<HTMLDivElement | undefined>) {
  const selection = useSelection(editorRef)

  function save (): HTMLElement | null {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return null

    const range = sel.getRangeAt(0).cloneRange()

    const marker = createMarker()
    range.collapse(true)
    range.insertNode(marker)

    return marker
  }

  function restore (): void {
    const marker = document.getElementById(markerId)
    if (!marker || !marker.parentNode) return

    // If marker is the only child of it's parent, a text node is needed to place the cursor into
    if (marker.parentNode.childNodes.length === 1) {
      insertInto(marker.parentNode)
      removeMarker()
      return
    }

    const range = document.createRange()
    const sel = window.getSelection()
    if (!sel) return

    range.setStartAfter(marker)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)

    removeMarker()
  }

  function insertInto (node: Node) {
    const textNode = document.createTextNode(zeroWidthSpace)

    if (node.nodeType === Node.TEXT_NODE) {
      selection.select(node)
    } else if (!node.textContent) {
      node.appendChild(textNode)
      selection.select(textNode)
    } else {
      selection.select(node)
    }

    const selectionResult = selection.get()
    if (!selectionResult) return

    selectionResult.range.collapse(false)
    selectionResult.selection.removeAllRanges()
    selectionResult.selection.addRange(selectionResult.range)
  }

  return {
    save,
    restore,
    insertInto,
  }
}
