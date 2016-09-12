import Bus from './bus'
import Load from './load'
import Toast from '../functions/toast'

export default {
  bus: Bus,

  load: Load,

  init: () => {
    document.body.addEventListener('click', e => {
      Bus.pub('body:click', e)
    })
  },

  toast: Toast
}