export function calculateUpdatedTarget ({
  selectedElement,
  containerElement,
  isRtl,
  isHorizontal,
}: {
  selectedElement: HTMLElement
  containerElement: HTMLElement
  isRtl: boolean
  isHorizontal: boolean
}): number {
  const containerSize = getOffsetSize(isHorizontal, containerElement)
  const scrollPosition = getScrollPosition(isHorizontal, isRtl, containerElement)

  const childrenSize = getOffsetSize(isHorizontal, selectedElement)
  const childrenStartPosition = getOffsetPosition(isHorizontal, selectedElement)

  const additionalOffset = childrenSize * 0.4

  if (scrollPosition > childrenStartPosition) {
    return childrenStartPosition - additionalOffset
  } else if (scrollPosition + containerSize < childrenStartPosition + childrenSize) {
    return childrenStartPosition - containerSize + childrenSize + additionalOffset
  }

  return scrollPosition
}

export function calculateCenteredTarget ({
  selectedElement,
  containerElement,
  isHorizontal,
}: {
  selectedElement: HTMLElement
  containerElement: HTMLElement
  isHorizontal: boolean
}): number {
  const containerOffsetSize = getOffsetSize(isHorizontal, containerElement)
  const childrenOffsetPosition = getOffsetPosition(isHorizontal, selectedElement)
  const childrenOffsetSize = getOffsetSize(isHorizontal, selectedElement)

  return childrenOffsetPosition - (containerOffsetSize / 2) + (childrenOffsetSize / 2)
}

export function getScrollSize (isHorizontal: boolean, element?: HTMLElement) {
  const key = isHorizontal ? 'scrollWidth' : 'scrollHeight'
  return element?.[key] || 0
}

export function getClientSize (isHorizontal: boolean, element?: HTMLElement) {
  const key = isHorizontal ? 'clientWidth' : 'clientHeight'
  return element?.[key] || 0
}

export function getScrollPosition (isHorizontal: boolean, rtl: boolean, element?: HTMLElement) {
  if (!element) {
    return 0
  }

  const {
    scrollLeft,
    offsetWidth,
    scrollWidth,
  } = element

  if (isHorizontal) {
    return rtl
      ? scrollWidth - offsetWidth + scrollLeft
      : scrollLeft
  }

  return element.scrollTop
}

export function getOffsetSize (isHorizontal: boolean, element?: HTMLElement) {
  const key = isHorizontal ? 'offsetWidth' : 'offsetHeight'
  return element?.[key] || 0
}

export function getOffsetPosition (isHorizontal: boolean, element?: HTMLElement) {
  const key = isHorizontal ? 'offsetLeft' : 'offsetTop'
  return element?.[key] || 0
}
