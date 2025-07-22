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
    node.appendChild(textNode)
    selection.select(textNode)
    selection.focus()
  }

  return {
    save,
    restore,
    insertInto,
  }
}
