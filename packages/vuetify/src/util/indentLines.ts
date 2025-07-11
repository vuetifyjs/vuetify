// Types
export type IndentLinesVariant = 'default' | 'simple'
export type IndentLineType = 'leaf' | 'last-leaf' | 'line' | 'leaf-link' | 'none'

export type IndentLinesOptions = {
  depth: number
  isLast: boolean
  isLastGroup: boolean
  leafLinks: boolean
  separateRoots: boolean
  parentIndentLines: IndentLineType[] | undefined
  variant: IndentLinesVariant | undefined
}

export type IndentLines = {
  leaf: IndentLineType[] | undefined
  node: IndentLineType[] | undefined
  children: IndentLineType[] | undefined
}

export function getIndentLines ({
  depth,
  isLast,
  isLastGroup,
  leafLinks,
  separateRoots,
  parentIndentLines,
  variant,
}: IndentLinesOptions): IndentLines {
  if (!parentIndentLines || !depth) {
    return {
      leaf: undefined,
      node: undefined,
      children: parentIndentLines,
    }
  }

  if (variant === 'simple') {
    return {
      leaf: [...parentIndentLines, 'line'],
      node: [...parentIndentLines, 'line'],
      children: [...parentIndentLines, 'line'],
    }
  }

  const isLastLeaf = isLast && (!isLastGroup || separateRoots || depth > 1)

  return {
    leaf: [
      ...parentIndentLines,
      isLastLeaf ? 'last-leaf' : 'leaf',
      ...leafLinks ? ['leaf-link'] as IndentLineType[] : [],
    ],
    node: [
      ...parentIndentLines,
      isLastLeaf ? 'last-leaf' : 'leaf',
    ],
    children: [
      ...parentIndentLines,
      isLastLeaf ? 'none' : 'line',
    ],
  }
}
