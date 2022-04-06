export function bias (val: number) {
  const c = 0.501
  const x = Math.abs(val)
  return Math.sign(val) * (x / ((1 / c - 2) * (1 - x) + 1))
}

export function calculateUpdatedOffset ({
  selectedElement,
  containerSize,
  contentSize,
  isRtl,
  currentScrollOffset,
  isHorizontal,
}: {
  selectedElement: HTMLElement
  containerSize: number
  contentSize: number
  isRtl: boolean
  currentScrollOffset: number
  isHorizontal: boolean
}): number {
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop
  const adjustedOffsetStart = isRtl ? (contentSize - offsetStart - clientSize) : offsetStart

  if (isRtl) {
    currentScrollOffset = -currentScrollOffset
  }

  const totalSize = containerSize + currentScrollOffset
  const itemOffset = clientSize + adjustedOffsetStart
  const additionalOffset = clientSize * 0.4

  if (adjustedOffsetStart <= currentScrollOffset) {
    currentScrollOffset = Math.max(adjustedOffsetStart - additionalOffset, 0)
  } else if (totalSize <= itemOffset) {
    currentScrollOffset = Math.min(currentScrollOffset - (totalSize - itemOffset - additionalOffset), contentSize - containerSize)
  }

  return isRtl ? -currentScrollOffset : currentScrollOffset
}

export function calculateCenteredOffset ({
  selectedElement,
  containerSize,
  contentSize,
  isRtl,
  isHorizontal,
}: {
  selectedElement: HTMLElement
  containerSize: number
  contentSize: number
  isRtl: boolean
  isHorizontal: boolean
}): number {
  const clientSize = isHorizontal ? selectedElement.clientWidth : selectedElement.clientHeight
  const offsetStart = isHorizontal ? selectedElement.offsetLeft : selectedElement.offsetTop

  if (isRtl) {
    const offsetCentered = contentSize - offsetStart - clientSize / 2 - containerSize / 2
    return -Math.min(contentSize - containerSize, Math.max(0, offsetCentered))
  } else {
    const offsetCentered = offsetStart + clientSize / 2 - containerSize / 2
    return Math.min(contentSize - containerSize, Math.max(0, offsetCentered))
  }
}
