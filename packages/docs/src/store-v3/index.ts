import { createLogger, createStore } from 'vuex'
import pathify from 'vuex-pathify'
import sponsors from './modules/sponsors'

const debug = process.env.NODE_ENV !== 'production'
pathify.mapping = 'simple'

export default createStore({
  modules: {
    sponsors,
  },
  strict: debug,
  plugins: debug ? [
    createLogger(),
    pathify.plugin,
  ] : [
    pathify.plugin,
  ],
})
