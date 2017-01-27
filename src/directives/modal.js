import { directiveConfig } from '../util/helpers'

var config = {}

function click (config, e) {
  e.stopPropagation()
  
  this.context.$vuetify().event('component toggle', { 
    active: true,
    component: 'modal',
    id: config.value
  })
}

function directive (el, binding, v) {
  config = directiveConfig(binding)

  el.dataset.modal = config.value

  let event = click.bind(v, config)

  el.removeEventListener('click', event, false)
  el.addEventListener('click', event, false)
}

export default {
  bind: directive,
  updated: directive,
  commponentUpdated: directive,
  unbind (el, binding, v) {
    let event = click.bind(v, config)

    el.removeEventListener('click', event, false)
    el.removeAttribute('data-modal')
  }
}
