import { set } from '@/util/vuex'

const DEFAULT_SNACKBAR = Object.freeze({
  color: 'success',
  href: false,
  msg: '',
  text: 'Close',
  to: false,
  timeout: 6000
})

export default {
  namespaced: true,
  state: {
    snackbar: {
      ...DEFAULT_SNACKBAR
    },
    value: false
  },
  mutations: {
    setSnackbar: (state, payload) => {
      state.snackbar = Object.assign({}, {
        color: 'success',
        href: false,
        msg: '',
        text: 'Close',
        to: false,
        timeout: 6000
      }, payload)
    },
    setValue: set('value')
  }
}
