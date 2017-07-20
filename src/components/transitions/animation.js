import BezierEasing from '~util/bezier-easing'

export const addTransform = (el, transform) => {
  let transforms = el.style.transform.split(' ')

  transforms = transforms.filter(t => !t.includes(transform.split('(')[0]))

  transforms.push(transform)

  el.style.transform = transforms.join(' ')
}

export const interpolate = (start, end, delta) => {
  return start + (delta * (end - start))
}

export const timeout = (fn, delay, el) => {
  return new Promise(resolve => {
    setTimeout(() => {
      fn(el)
      resolve()
    }, delay)
  })
}

export const frame = () => new Promise(resolve => requestAnimationFrame(resolve))

export const run = (el, transitions, length, reverse) => {
  return Promise.all(transitions.map(([transition, args, timings, easings]) => {
    if (typeof args === 'function') {
      return transition(args, reverse ? length - timings : timings, el)
    }

    if (reverse) {
      args = args.slice().reverse()
      timings = [timings[0], length - (timings[0] + timings[1])]
      easings = easings.slice().reverse()
    }

    return animate(d => transition(el, ...args, d), timings[0], timings[1], easings[0])
  }))
}

export const animate = (fn, duration, delay = 0, curve = null) => {
  let start = null

  const animateFrame = (timestamp) => {
    const runtime = timestamp - start
    const progress = Math.min(runtime / duration, 1)

    fn(curve && curve(progress) || progress)

    if (runtime < duration) {
      return frame().then(animateFrame)
    }
  }

  return timeout(() => {}, delay).then(() => {
    return frame().then(timestamp => {
      start = timestamp
      return animateFrame(timestamp)
    })
  })
}

export const rotate = (el, start, end, delta) => {
  const value = interpolate(start, end, delta)

  addTransform(el, `rotate(${value}deg)`)
}

export const height = (el, start, end, delta) => {
  const value = interpolate(start, end, delta)
  el.style.height = `${value}px`
}

export const opacity = (el, start, end, delta) => {
  const value = interpolate(start, end, delta)
  el.style.opacity = `${value}`
}

export const scale = (el, start, end, delta) => {
  const value = interpolate(start, end, delta)

  addTransform(el, `scale(${value})`)
}

export const vertical = (el, start, end, delta) => {
  const value = interpolate(start, end, delta)

  addTransform(el, `translateY(${value}px`)
}

export const horizontal = (el, start, end, delta) => {
  const value = interpolate(start, end, delta)

  addTransform(el, `translateX(${value}px`)
}

export const clipPath = (el, start, end, delta, x = 50, y = 50) => {
  const value = interpolate(start, end, delta)

  el.style.clipPath = `circle(${value}px at ${x}% ${y}%)`
}

export const easings = {
  easeInQuad: BezierEasing(0.55, 0.085, 0.68, 0.53),
  easeOutQuad: BezierEasing(0.25, 0.46, 0.45, 0.94),
  easeInCubic: BezierEasing(0.55, 0.055, 0.675, 0.19),
  easeOutCubic: BezierEasing(0.215, 0.61, 0.355, 1),
  easeInQuart: BezierEasing(0.895, 0.03, 0.685, 0.22),
  easeOutQuart: BezierEasing(0.165, 0.84, 0.44, 1)
}

export default {
  addTransform,
  interpolate,
  frame,
  timeout,
  animate,
  rotate,
  height,
  opacity,
  scale,
  vertical,
  horizontal,
  clipPath,
  easings
}
