/**
 * Returns:
 *  - 'null' if the node is not attached to the DOM
 *  - the root node (HTMLDocument | ShadowRoot) otherwise
 */
export function attachedRoot (node: Node): null | HTMLDocument | ShadowRoot {
  /* istanbul ignore next */
  if (typeof node.getRootNode !== 'function') {
    // Shadow DOM not supported (IE11), lets find the root of this node
    while (node.parentNode) node = node.parentNode

    // The root parent is the document if the node is attached to the DOM
    if (node !== document) return null

    return document
  }

  const root = node.getRootNode()

  // The composed root node is the document if the node is attached to the DOM
  if (root !== document && root.getRootNode({ composed: true }) !== document) return null

  return root as HTMLDocument | ShadowRoot
}
