import Bus from './bus'

export default function () {
  const click = e => {
    this.$store.commit('vuetify/BODY_CLICK', e)
  }

  if (typeof window.orientation !== 'undefined') {
    document.body.addEventListener('touchstart', click, false)
  } else {
    document.body.addEventListener('click', click, false)
  }

  Bus.sub('meta:title', title => {
    document.title = title
  })

  Bus.sub('meta:description', description => {
    document.head.querySelector('meta[name=description]').content = description
  })

  Bus.sub('meta:keywords', keywords => {
    document.head.querySelector('meta[name=keywords]').content = keywords
  })
}
