import { upperFirst } from '../../util/helpers'

export default function (expandedParentClass = '', x = false) {
  const sizeProperty = x ? 'width' : 'height'

  return {
    beforeEnter (el) {
      el._parent = el.parentNode
      el._initialStyle = {
        transition: el.style.transition,
        visibility: el.style.visibility,
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      }
    },

    enter (el) {
      const initialStyle = el._initialStyle
      el.style.setProperty('transition', 'none', 'important')
      el.style.visibility = 'hidden'
      const size = `${el['offset' + upperFirst(sizeProperty)]}px`
      el.style.visibility = initialStyle.visibility
      el.style.overflow = 'hidden'
      el.style[sizeProperty] = 0
      void el.offsetHeight // force reflow
      el.style.transition = initialStyle.transition

      expandedParentClass && el._parent && el._parent.classList.add(expandedParentClass)

      requestAnimationFrame(() => {
        el.style[sizeProperty] = size
      })
    },

    afterEnter: resetStyles,
    enterCancelled: resetStyles,

    leave (el) {
      el._initialStyle = {
        overflow: el.style.overflow,
        [sizeProperty]: el.style[sizeProperty]
      }

      el.style.overflow = 'hidden'
      el.style[sizeProperty] = `${el['offset' + upperFirst(sizeProperty)]}px`
      void el.offsetHeight // force reflow

      requestAnimationFrame(() => el.style[sizeProperty] = 0)
    },

    afterLeave,
    leaveCancelled: afterLeave
  }

  function afterLeave (el) {
    expandedParentClass && el._parent && el._parent.classList.remove(expandedParentClass)
    resetStyles(el)
  }

  function resetStyles (el) {
    el.style.overflow = el._initialStyle.overflow
    el.style[sizeProperty] = el._initialStyle[sizeProperty]
    delete el._initialStyle
  }
}
