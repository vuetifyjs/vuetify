import Vue from 'vue'
import Main from '@/components/VSnackbar/VSnackbar'
const SnackbarConstructor = Vue.extend(Main)

let instance = null
const instances = []
const types = ['success', 'warning', 'info', 'error']
let seed = 1

const Snackbar = function (options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  const id = 'snackbar_' + seed++

  instance = new SnackbarConstructor()
  instance.id = id
  for (const prop in options) {
    if (options.hasOwnProperty(prop)) {
      instance[prop] = options[prop]
    }
  }
  instance.$slots.default = [instance.message]
  instance.vm = instance.$mount()
  document.querySelector('.application').appendChild(instance.vm.$el)
  instance.vm.isActive = true
  instance.dom = instance.vm.$el
  instances.push(instance)
  return instance.vm
}

types.forEach(type => {
  Snackbar[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.color = type
    return Snackbar(options)
  }
})

Snackbar.close = function (id) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      instances.splice(i, 1)
      break
    }
  }
}

Snackbar.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default Snackbar
