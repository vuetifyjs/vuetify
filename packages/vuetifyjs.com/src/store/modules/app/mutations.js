export default {
  STATELESS (state, payload) {
    state.stateless = payload
  },
  DRAWER (state, payload) {
    state.appDrawer = payload
  },
  DRAWER_TOGGLE (state) {
    state.appDrawer = !state.appDrawer
  },
  RELEASES (state, payload) {
    state.releases = payload
  },
  LOAD_LANG (state, payload) {
    state.loadedLangs.push(payload)
  },
  FULLSCREEN (state, payload) {
    state.isFullscreen = payload
    state.stateless = payload
    state.appDrawer = !payload && null
    state.appToolbar = !payload
  },
  SNACKBAR: (state, payload) => {
    state.appSnackbar = Object.assign({}, {
      color: 'success',
      href: false,
      msg: '',
      text: 'Close',
      to: false,
      timeout: 6000
    }, payload)
  }
}
