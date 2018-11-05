import api from '@vuetify/api-generator'
import deprecatedIn from '@/data/deprecatedIn'
import newIn from '@/data/newIn'
import removed from '@/data/removed'

export default () => ({
  api,
  appDrawer: null,
  appFooter: true,
  appSnackbar: {
    color: 'success',
    href: false,
    msg: '',
    text: 'Close',
    to: false,
    timeout: 6000
  },
  appToolbar: null,
  currentVersion: null,
  deprecatedIn,
  isFullscreen: false,
  loadedLangs: [],
  newIn,
  releases: [],
  removed,
  stateless: false
})
