export default function (expandedParentClass = '') {
  return {
    enter (el) {
      el._parent = el.parentNode

      // Get height that is to be scrolled
      el.style.overflow = 'hidden'
      el.style.height = 0
      expandedParentClass && el._parent.classList.add(expandedParentClass)

      requestAnimationFrame(() => {
        el.style.height = el.scrollHeight
          ? `${el.scrollHeight}px`
          : 'auto'
      })
    },

    afterEnter (el) {
      el.style.overflow = null
      el.style.height = null
    },

    leave (el) {
      // Set height before we transition to 0
      el.style.overflow = 'hidden'
      el.style.height = `${el.scrollHeight}px`

      requestAnimationFrame(() => el.style.height = 0)
    },

    afterLeave (el) {
      expandedParentClass && el._parent && el._parent.classList.remove(expandedParentClass)
    }
  }
}
