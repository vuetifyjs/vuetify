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

const handleGesture = (wrapper) => {
  const { touchstartX, touchendX, touchstartY, touchendY } = wrapper
  wrapper.offsetX = touchendX - touchstartX
  wrapper.offsetY = touchendY - touchstartY

  if (touchendX < touchstartX) {
    wrapper.left && wrapper.left(wrapper)
  }
  if (touchendX > touchstartX) {
    wrapper.right && wrapper.right(wrapper)
  }
  if (touchendY < touchstartY) {
    wrapper.up && wrapper.up(wrapper)
  }
  if (touchendY > touchstartY) {
    wrapper.down && wrapper.down(wrapper)
  }
}

function inserted (el, { value }) {
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
  target.addEventListener('touchstart', e => touchstart(e, wrapper), options)
  target.addEventListener('touchend', e => touchend(e, wrapper), options)
  target.addEventListener('touchmove', e => touchmove(e, wrapper), options)
}

function unbind (el, { value }) {
  const target = value.parent ? el.parentNode : el

  if (!target) return

  target.removeEventListener('touchstart', touchstart)
  target.removeEventListener('touchend', touchend)
  target.removeEventListener('touchmove', touchmove)
}

export default {
  name: 'touch',
  inserted,
  unbind
}
