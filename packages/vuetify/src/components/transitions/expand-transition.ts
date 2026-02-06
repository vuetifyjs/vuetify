interface HTMLExpandElement extends HTMLElement {
  _parent?: (Node & ParentNode & HTMLElement) | null
  _initialStyle?: {
    transition: string
    overflow: string
    height?: string | null
    width?: string | null
  }
}

export default function (expandedParentClass = '', type: 'x' | 'y' | 'both' = 'y') {
  return {
    onBeforeEnter (el: HTMLExpandElement) {
      el._parent = el.parentNode as (Node & ParentNode & HTMLElement) | null
      el._initialStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        width: el.style.width,
        height: el.style.height,
      }
    },

    onEnter (el: HTMLExpandElement) {
      const initialStyle = el._initialStyle
      if (!initialStyle) return

      el.style.setProperty('transition', 'none', 'important')
      // Hide overflow to account for collapsed margins in the calculated height
      el.style.overflow = 'hidden'
      const offsetWidth = `${el.offsetWidth}px`
      const offsetHeight = `${el.offsetHeight}px`

      if (['x', 'both'].includes(type)) el.style.width = '0'
      if (['y', 'both'].includes(type)) el.style.height = '0'

      void el.offsetHeight // force reflow

      el.style.transition = initialStyle.transition

      if (expandedParentClass && el._parent) {
        el._parent.classList.add(expandedParentClass)
      }

      requestAnimationFrame(() => {
        el.style.width = offsetWidth
        el.style.height = offsetHeight
      })
    },

    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,

    onLeave (el: HTMLExpandElement) {
      el._initialStyle = {
        transition: '',
        overflow: el.style.overflow,
        width: el.style.width,
        height: el.style.height,
      }

      el.style.overflow = 'hidden'
      if (['x', 'both'].includes(type)) el.style.width = `${el.offsetWidth}px`
      if (['y', 'both'].includes(type)) el.style.height = `${el.offsetHeight}px`
      void el.offsetHeight // force reflow

      requestAnimationFrame(() => {
        el.style.width = '0'
        el.style.height = '0'
      })
    },

    onAfterLeave,
    onLeaveCancelled: onAfterLeave,
  }

  function onAfterLeave (el: HTMLExpandElement) {
    if (expandedParentClass && el._parent) {
      el._parent.classList.remove(expandedParentClass)
    }
    resetStyles(el)
  }

  function resetStyles (el: HTMLExpandElement) {
    if (!el._initialStyle) return

    const { width: w, height: h } = el._initialStyle
    el.style.overflow = el._initialStyle.overflow
    if (w != null && ['x', 'both'].includes(type)) el.style.width = w
    if (h != null && ['y', 'both'].includes(type)) el.style.height = h
    delete el._initialStyle
  }
}
