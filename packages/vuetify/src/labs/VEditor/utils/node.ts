export function wrapByTag (node: Node, tag: string) {
  const newElement = document.createElement(tag)
  newElement.appendChild(node)
  return newElement
}

export function isEmptyNode (node: Node): boolean {
  for (const child of node.childNodes) {
    if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.ELEMENT_NODE) {
      const content = (child.nodeType === Node.ELEMENT_NODE ? (child as Element) : child).textContent
      if (content?.replace(/\u200B/g, '').trim()) {
        return false
      }
    }
  }
  return true
}
