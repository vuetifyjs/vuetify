import Bus from './bus'

export default function () {
  document.body.addEventListener('click', e => {
    Bus.pub('body:click', e)
  })

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