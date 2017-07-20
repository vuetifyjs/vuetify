import {
  easings,
  addTransform,
  timeout,
  opacity,
  clipPath,
  horizontal,
  vertical,
  run
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

  let targetX = (contentWidth * 0.3)
  targetX = origin === 'left' ? -targetX : targetX

  const transitions = [
    [opacity, [0, 1], [200, 100], [easeInCubic, easeOutCubic]],
    [horizontal, [targetX, 0], [300, 200], [easeOutCubic, easeInCubic]],
    [clipPath, [activatorWidth / 2, contentWidth * 0.6], [300, 100], [easeInQuart, easeOutQuart]]
  ]

  return {
    beforeEnter (el) {
      el.style.transition = 'none'
      el.style.opacity = 0
      el.style.clipPath = 'circle(100%)'
      el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 0)
      addTransform(el, `translateX(${targetX}px)`)
    },
    enter (el, done) {
      Promise.all([
        run(el, transitions, 500, false),
        timeout(() => {
          el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 1)
        }, 450)
      ]).then(done)
    },
    beforeLeave (el) {
      el.style.opacity = 1
      el.style.clipPath = `circle(100%)`
      el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 0)
    },
    leave (el, done) {
      run(el, transitions, 500, true).then(done)
    }
  }
}

export const activator = (origin, contentWidth, contentHeight, activatorWidth) => {
  const activatorX = contentWidth - ((activatorWidth / 2))
  let targetX = activatorX - contentWidth * 0.65
  targetX = origin === 'right' ? -targetX : targetX
  const targetY = 16

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
      run(el, transitions, 200, false).then(done)
    },
    afterLeave (el) {
      el.style.transition = 'none'
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
        run(el, transitions, 400, true),
        timeout(() => {
          el.querySelector('.btn__content').style.transition = ''
          el.querySelector('.btn__content').style.opacity = 1
          el.style.boxShadow = ''
        }, 350)
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
