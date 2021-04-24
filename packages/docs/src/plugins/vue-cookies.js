import Cookies from 'vue-cookies'

export function useCookies (app) {
  app.use(Cookies)
}
