import Bus from './bus'

export default function () {
  const click = e => Bus.pub('body:click', e)

  if (window.orientation !== 'undefined') {
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