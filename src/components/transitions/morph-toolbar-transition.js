import {
  easings,
  addTransform,
  timeout,
  opacity,
  clipPath,
  horizontal,
  vertical,
  animate,
  height
} from './animation'

const {
  easeInCubic,
  easeOutCubic,
  easeInQuart,
  easeOutQuart
} = easings

const activator = {
  beforeLeave (el) {
    const { contentWidth } = el.parentNode.dataset
    el.parentNode.dataset.origin = el.offsetLeft > contentWidth / 2 ? 'right' : 'left'
    el.style.transition = 'none'
    el.querySelector('.btn__content').style.opacity = 0
  },
  leave (el, done) {
    const { origin, contentWidth, contentHeight, toolbar } = el.parentNode.dataset
    const activatorX = contentWidth - ((el.clientWidth / 2))
    let targetX = activatorX - contentWidth * 0.65
    targetX = origin === 'right' ? -targetX : targetX
    const targetY = toolbar ? 16 : contentHeight / 2

    Promise.all([
      animate(d => opacity(el, 1, 0, d), 200, 100),
      animate(p => horizontal(el, 0, targetX, p), 300, 0, easeInCubic),
      animate(p => vertical(el, 0, targetY, p), 300, 0, easeOutCubic)
    ]).then(done)
  },
  afterLeave (el) {
    el.style.transition = 'none'
  },
  beforeEnter (el) {
    const { origin, toolbar, contentWidth, contentHeight } = el.parentNode.dataset
    const left = contentWidth - ((el.clientWidth / 2))
    let targetX = left - contentWidth * 0.65
    targetX = origin === 'right' ? -targetX : targetX
    const targetY = toolbar ? 16 : contentHeight / 2
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
    const { origin, contentWidth, contentHeight, toolbar } = el.parentNode.dataset
    const left = contentWidth - ((el.clientWidth / 2))
    let targetX = left - contentWidth * 0.65
    targetX = origin === 'right' ? -targetX : targetX
    const targetY = toolbar ? 16 : contentHeight / 2
    const button = el.querySelector('.btn__content')

    Promise.all([
      timeout(() => {
        button.style.transition = ''
        button.style.opacity = 1
        el.style.boxShadow = ''
      }, 500),
      animate(d => opacity(el, 0, 1, d), 350, 50),
      animate(p => horizontal(el, targetX, 0, p), 300, 200, easeOutCubic),
      animate(p => vertical(el, targetY, 0, p), 300, 200, easeInCubic)
    ]).then(done)
  },
  afterEnter (el) {
    el.style['-webkit-clip-path'] = 'none'
  }
}

const content = {
  beforeEnter (el) {
    const { origin, sheet, contentWidth, activatorWidth } = el.parentNode.dataset
    let targetX = (contentWidth / 2) - activatorWidth
    targetX = origin === 'left' ? -targetX : targetX
    el.style.transition = 'none'
    el.style.opacity = 0
    el.style.clipPath = 'circle(1%)'
    el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 0)
    addTransform(el, `translateX(${targetX}px)`)
    sheet && (el.style.height = '0px')
  },
  enter (el, done) {
    const { origin, sheet, contentWidth, contentHeight, activatorWidth, clipPathX, clipPathY } = el.parentNode.dataset
    let targetX = (contentWidth / 2) - activatorWidth
    targetX = origin === 'left' ? -targetX : targetX
    Promise.all([
      animate(d => opacity(el, 0, 1, d), 100, 0, easeInCubic),
      animate(d => horizontal(el, targetX, 0, d), 300, 200, easeOutCubic),
      animate(d => clipPath(el, activatorWidth / 2, contentWidth * 0.6, clipPathX, clipPathY, d), 400, 100, easeInQuart),
      timeout(() => {
        el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 1)
      }, 450),
      sheet && animate(d => height(el, 0, contentHeight, d), 350, 50, easeOutCubic)
    ]).then(done)
  },
  beforeLeave (el) {
    el.style.opacity = 1
    el.style.clipPath = `circle(100%)`
  },
  leave (el, done) {
    const { origin, sheet, contentWidth, contentHeight, activatorWidth, clipPathX, clipPathY } = el.parentNode.dataset
    let targetX = (contentWidth / 2) - activatorWidth
    targetX = origin === 'left' ? -targetX : targetX
    Promise.all([
      timeout(() => {
        el.querySelectorAll('.btn__content').forEach(e => e.style.opacity = 0)
      }, 150),
      animate(d => opacity(el, 1, 0, d), 100, 300),
      animate(d => horizontal(el, 0, targetX, d), 300, 150, easeOutCubic),
      animate(d => clipPath(el, contentWidth * 0.6, activatorWidth / 2, clipPathX, clipPathY, d), 300, easeOutQuart),
      sheet && animate(d => height(el, contentHeight, 0, d), 300, 200, easeInCubic)
    ]).then(done)
  }
}

export default {
  activator,
  content
}
