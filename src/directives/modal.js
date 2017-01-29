import { directiveConfig } from '../util/helpers'

var config = {}

function click (e, config, v) {
  e.stopPropagation()
  e.preventDefault()

  v.context.$vuetify().event('component toggle', {
    active: true,
    component: 'modal',
    id: config.value
  })
}

function directive (el, binding, v) {
  config = directiveConfig(binding)

  el.dataset.modal = config.value

  el.removeEventListener('click', e => click(e, config, v), false)
  el.addEventListener('click', e => click(e, config, v), false)
}

export default {
  bind: directive,
  unbind (el, binding, v) {
    // const event = click.bind(v, config)

    // el.removeEventListener('click', event, false)
    // el.removeAttribute('data-modal')
  }
}
