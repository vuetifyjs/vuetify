import { directiveConfig } from '../util/helpers'

function directive (el, binding, v) {
  const config = directiveConfig(binding)

  el.dataset.modal = config.value

  function click (e) {
    e.preventDefault()
    
    v.context.$vuetify.bus.pub(`modal:open:${config.value}`)
  }

  el.removeEventListener('click', click, false)
  el.addEventListener('click', click, false)
}

export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind (el) {
    el.removeAttribute('onclick')
    el.removeAttribute('data-modal')
  }
}
