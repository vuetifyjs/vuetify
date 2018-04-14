const touchstart = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchstartX = touch.clientX
  wrapper.touchstartY = touch.clientY

  wrapper.start &&
    wrapper.start(Object.assign(event, wrapper))
}

const touchend = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchendX = touch.clientX
  wrapper.touchendY = touch.clientY

  wrapper.end &&
    wrapper.end(Object.assign(event, wrapper))

  handleGesture(wrapper)
}

const touchmove = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchmoveX = touch.clientX
  wrapper.touchmoveY = touch.clientY

  wrapper.move && wrapper.move(Object.assign(event, wrapper))
}

const handleGesture = wrapper => {
  const { touchstartX, touchendX, touchstartY, touchendY } = wrapper
  const dirRatio = 0.5
  const minDistance = 16
  wrapper.offsetX = touchendX - touchstartX
  wrapper.offsetY = touchendY - touchstartY

  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && (touchendX < touchstartX - minDistance) && wrapper.left(wrapper)
    wrapper.right && (touchendX > touchstartX + minDistance) && wrapper.right(wrapper)
  }

  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && (touchendY < touchstartY - minDistance) && wrapper.up(wrapper)
    wrapper.down && (touchendY > touchstartY + minDistance) && wrapper.down(wrapper)
  }
}

function inserted (el, { value }, { context }) {
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  }

  const target = value.parent ? el.parentNode : el
  const options = value.options || { passive: true }

  // Needed to pass unit tests
  if (!target) return

  const handlers = {
    touchstart: e => touchstart(e, wrapper),
    touchend: e => touchend(e, wrapper),
    touchmove: e => touchmove(e, wrapper)
  }
  target._touchHandlers = Object.assign(Object(target._touchHandlers), {
    [context._uid]: handlers
  })
  for (const eventName of Object.keys(handlers)) {
    target.addEventListener(eventName, handlers[eventName], options)
  }
}

function unbind (el, { value }, { context }) {
  const target = value.parent ? el.parentNode : el

  if (!target) return

  const handlers = target._touchHandlers[context._uid]
  for (const eventName of Object.keys(handlers)) {
    target.removeEventListener(eventName, handlers[eventName])
  }
  delete target._touchHandlers[context._uid]
}

export default {
  name: 'touch',
  inserted,
  unbind
}
