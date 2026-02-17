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
  footer: IndentLineType[] | undefined
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
  const isLastLeaf = isLast && (!isLastGroup || separateRoots || depth > 1)

  if (!parentIndentLines || !depth) {
    return {
      leaf: undefined,
      node: undefined,
      children: parentIndentLines,
      footer: parentIndentLines && (!isLastLeaf || variant === 'simple')
        ? [...parentIndentLines, separateRoots ? 'none' : 'line']
        : ['none'],
    }
  }

  if (variant === 'simple') {
    return {
      leaf: [...parentIndentLines, 'line'],
      node: [...parentIndentLines, 'line'],
      children: [...parentIndentLines, 'line'],
      footer: [...parentIndentLines, 'line', 'line'],
    }
  }

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
    footer: [
      ...parentIndentLines,
      isLastLeaf ? 'none' : 'line',
    ],
  }
}
