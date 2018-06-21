import { pascalize } from '../../../src/util/stringcase'
import { mapOrUndefined } from './utils'
export const pascalizeTree = (
  tree: PostHTML.PostHTMLTree
): PostHTML.PostHTMLTree => mapOrUndefined(tree, pascalizeTag) || tree

const pascalizeTag = (
  node: PostHTML.PostHTMLBranch
): PostHTML.PostHTMLBranch => {
  if (typeof node === 'string') return node

  const tag = node.tag.substr(0, 2) === 'v-' && pascalize(node.tag)
  const content = node.content && mapOrUndefined(node.content, pascalizeTag)
  return tag
    ? content
      ? { ...node, tag, content }
      : { ...node, tag }
    : content
      ? { ...node, content }
      : node
}
