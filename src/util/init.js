// import Store from '../store/index'

export default function () {
  if (!this.$store) {
    console.warn('Vuetify.js requires the installation of Vuex')
  }

  // this.$store.registerModule('vuetify', Store)

  const click = e => {
    this.$store.commit('vuetify/BODY_CLICK', e)
  }

  if (typeof window.orientation !== 'undefined') {
    document.body.addEventListener('touchstart', click, false)
  } else {
    document.body.addEventListener('click', click, false)
  }

  this.$store.watch(state => state.vuetify.common.meta.title, title => {
    document.title = title
  })

  this.$store.watch(state => state.vuetify.common.meta.description, description => {
    document.head.querySelector('meta[name=description]').content = description
  })

  this.$store.watch(state => state.vuetify.common.meta.keywords, keywords => {
    document.head.querySelector('meta[name=keywords]').content = keywords
  })
}
