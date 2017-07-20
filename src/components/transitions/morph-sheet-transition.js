import {
  easings,
  addTransform,
  timeout,
  opacity,
  clipPath,
  clipPathX,
  horizontal,
  vertical,
  run,
  height
} from './animation'

const {
  easeInCubic,
  easeOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInQuad,
  easeOutQuad
} = easings

export const content = (origin, contentWidth, contentHeight, activatorWidth) => {
  // const [clipPathSize, clipPathX, clipPathY] = [0, 50, 50]

  const transitions = [
    [opacity, [0, 1], [200, 0], [easeOutCubic, easeInCubic]],
    [clipPathX, [contentWidth - activatorWidth / 2, contentWidth / 2], [300, 0], [easeInCubic, easeOutCubic]],
    [clipPath, [activatorWidth / 2, contentWidth * 0.7], [400, 0], [easeInQuart, easeOutQuart]],
    [height, [0, contentHeight], [400, 0], [easeOutQuart, easeInCubic]]
  ]

  return {
    beforeEnter (el) {
      el.style.transition = 'none'
      el.style['will-change'] = 'transform, opacity, clipPath, height'
      el.style.opacity = 0
      el.style.clipPath = 'circle(100%)'
      el.querySelectorAll('*').forEach(e => e.style.opacity = 0)
      el.style.height = 0
    },
    enter (el, done) {
      Promise.all([
        run(el, transitions, 500, false),
        timeout(() => {
          el.querySelectorAll('*').forEach(e => {
            e.style.transition = '0.3s all ease-in'
            e.style.opacity = 1
          })
        }, 125)
      ]).then(done)
    },
    beforeLeave (el) {
      el.style.opacity = 1
      el.style.clipPath = `circle(100%)`
      el.querySelectorAll('*').forEach(e => e.style.opacity = 0)
    },
    leave (el, done) {
      run(el, transitions, 500, true).then(done)
    }
  }
}

export const activator = (origin, contentWidth, contentHeight, activatorWidth) => {
  const activatorX = contentWidth - ((activatorWidth / 2))
  let targetX = activatorX - contentWidth * 0.55
  targetX = origin === 'right' ? -targetX : targetX
  const targetY = contentHeight / 2

  const transitions = [
    [opacity, [1, 0], [100, 100], [easeOutCubic, easeInCubic]],
    [horizontal, [0, targetX], [200, 0], [easeInQuad, easeOutQuad]],
    [vertical, [0, targetY], [200, 0], [easeOutQuad, easeInQuad]]
  ]

  return {
    beforeLeave (el) {
      el.style.transition = 'none'
      el.querySelector('.btn__content').style.opacity = 0
    },
    leave (el, done) {
      run(el, transitions, 350, false).then(done)
    },
    afterLeave (el) {
    },
    beforeEnter (el) {
      const button = el.querySelector('.btn__content')
      button.style.transition = 'none'
      button.style.opacity = 0
      el.style.transition = 'none'
      el.style.boxShadow = 'none'
      el.style.opacity = 0
      addTransform(el, `translateX(${targetX}px)`)
      addTransform(el, `translateY(${targetY}px)`)
    },
    enter (el, done) {
      Promise.all([
        run(el, transitions, 350, true),
        timeout(() => {
          el.querySelector('.btn__content').style.transition = ''
          el.querySelector('.btn__content').style.opacity = 1
          el.style.boxShadow = ''
        }, 175)
      ]).then(done)
    },
    afterEnter (el) {
      el.style['-webkit-clip-path'] = 'none'
    }
  }
}

export default function (...args) {
  return {
    activator: activator(...args),
    content: content(...args)
  }
}
