function ripple (el, binding) {
  let container = document.createElement('span')
  let animation = document.createElement('span')

  container.appendChild(animation)
  container.classList.add('ripple__container')
  
  if (binding.value.class) {
    container.classList.add(binding.value.class)
  }

  animation.classList.add('ripple__animation')
  animation.style.width = `${el.clientWidth * 2.2}px`
  animation.style.height = animation.style.width

  el.appendChild(container)

  return animation
}

function directive (el, binding, v) {
  if (!binding.value) {
    return
  }

  const animation = ripple(el, binding)

  el.onmousedown = e => {
    animation.classList.add('ripple__animation--enter')
    animation.classList.add('ripple__animation--visible')
    animation.style.transform = `translate(-50%, -50%) translate(${e.layerX}px, ${e.layerY}px) scale(.001)`

    setTimeout(() => {
      animation.classList.remove('ripple__animation--enter')
      animation.style.transform = `translate(-50%, -50%) translate(${e.layerX}px, ${e.layerY}px)`
    }, 0)
  }

  el.onmouseup = e => {
    animation.classList.remove('ripple__animation--visible')
  }
}

export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind (el) {
    el.removeAttribute('onmousedown')
    el.removeAttribute('onmouseup')
    
    let container = el.querySelector('.ripple__container')
    if (container) {
      container.remove()
    }
  }
}
