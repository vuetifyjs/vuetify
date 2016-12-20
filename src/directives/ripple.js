function ripple (e, el, binding, v) {
  //
}

function directive (el, binding, v) {
  el.onclick = e => ripple(e, el, binding, v)
}

export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind (el) {
    el.removeAttribute('onclick')
  }
}
