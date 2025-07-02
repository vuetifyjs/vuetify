// Types
export type IndentLineType = 'leaf' | 'last-leaf' | 'line' | 'leaf-link' | 'none'

export type IndentLinesOptions = {
  depth: number
  isLast: boolean
  isLastGroup: boolean
  leafLinks: boolean
  separateRoots: boolean
  parentIndentLines: IndentLineType[] | undefined
}

export function getIndentLines ({
  depth,
  isLast,
  isLastGroup,
  leafLinks,
  separateRoots,
  parentIndentLines,
}: IndentLinesOptions) {
  if (!parentIndentLines) {
    return { leaf: [], node: [], children: undefined }
  }

  const isLastLeaf = isLast && (!isLastGroup || depth > (separateRoots ? 0 : 1))

  const leaf = depth > 0
    ? [
      ...parentIndentLines,
      isLastLeaf ? 'last-leaf' : 'leaf',
      ...leafLinks ? ['leaf-link'] : [],
    ]
    : []

  const node = depth > 0
    ? [
      ...parentIndentLines,
      isLastLeaf ? 'last-leaf' : 'leaf',
    ]
    : []

  const children = depth > 0
    ? [...parentIndentLines, isLastLeaf ? 'none' : 'line']
    : []

  return {
    leaf,
    node,
    children,
  }
}
