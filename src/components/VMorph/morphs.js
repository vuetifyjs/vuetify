import anime from 'animejs'

function enterToolbar (el, width, size, right, done) {
  const timeline = anime.timeline()
  const start = right ? 70 : 30
  el.style.opacity = 0
  el.style.zIndex = 999

  const icons = el.querySelectorAll('.icon')
  Array.from(icons).forEach(el => {
    el.style.opacity = 0
  })

  timeline
    .add({
      targets: el,
      opacity: 1,
      duration: 1,
      offset: 200,
      easing: 'linear'
    })
    .add({
      targets: icons,
      opacity: 1,
      duration: 200,
      offset: 200
    })
    .add({
      targets: el,
      clipPath: [`circle(${size}px at ${start}% 50%)`, `circle(${(width / 2 + 10)}px at 50% 50%)`],
      easing: 'easeOutSine',
      duration: 250,
      offset: 200,
      complete: done
    })
}

function leaveToolbar (el, width, size, right, done) {
  const timeline = anime.timeline()
  const start = right ? 70 : 30

  const icons = el.querySelectorAll('.icon')

  timeline
    .add({
      targets: el,
      clipPath: [`circle(${(width / 2) + 10}px at 50% 50%)`, `circle(${size}px at ${start}% 50%)`],
      easing: 'easeOutSine',
      duration: 250,
      offset: 0
    })
    .add({
      targets: icons,
      opacity: 0,
      duration: 25,
      offset: 0
    })
    .add({
      targets: '.toolbar',
      opacity: 0,
      duration: 1,
      offset: 250,
      complete: done
    })
}

function enterButton (el, done) {
  const timeline = anime.timeline()
  const path = anime.path('#morphPath #reverse')
  el.style.opacity = 0
  el.querySelector('.icon').style.opacity = 0

  timeline
    .add({
      targets: el,
      translateX: path('x'),
      translateY: path('y'),
      easing: 'easeOutSine',
      offset: 200,
      duration: 300
    })
    .add({
      targets: el,
      opacity: 1,
      duration: 1,
      offset: 50
    })
    .add({
      targets: el.querySelector('.icon'),
      offset: 200,
      opacity: 1,
      duration: 300,
      complete: done
    })
}

function leaveButton (el, done) {
  const timeline = anime.timeline()
  const path = anime.path('#morphPath #forward')

  timeline
    .add({
      targets: el,
      translateX: path('x'),
      translateY: path('y'),
      easing: 'easeOutSine',
      duration: 300
    })
    .add({
      targets: el.querySelector('.icon'),
      offset: 0,
      opacity: 0,
      duration: 50
    })
    .add({
      targets: el,
      opacity: 0,
      duration: 1,
      offset: 300,
      complete: done
    })
}

export default {
  enterToolbar,
  enterButton,
  leaveToolbar,
  leaveButton
}
