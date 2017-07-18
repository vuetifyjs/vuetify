const touchevent = (touch, wrapper) => {
  return {
    touchendX: touch.clientX,
    touchendY: touch.clientY,
    offsetX: touch.clientX - wrapper.touchstartX,
    offsetY: touch.clientY - wrapper.touchstartY
  }
}

const touchstart = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchstartX = touch.clientX
  wrapper.touchstartY = touch.clientY

  const e = {
    touchstartX: touch.clientX,
    touchstartY: touch.clientY
  }

  wrapper.start &&
    wrapper.start(Object.assign(event, touchevent(touch, wrapper)))
}

const touchend = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchendX = touch.clientX
  wrapper.touchendY = touch.clientY

  wrapper.end &&
    wrapper.end(Object.assign(event, touchevent(touch, wrapper)))

  handleGesture(wrapper)
}

const touchmove = (event, wrapper) => {
  const touch = event.changedTouches[0]

  const e = {
    touchmoveX: touch.clientX,
    touchmoveY: touch.clientY,
    offsetX: touch.clientX - wrapper.touchstartX,
    offsetY: touch.clientY - wrapper.touchstartY
  }

  wrapper.move && wrapper.move(Object.assign(event, e))
}

const handleGesture = (wrapper) => {
  const { touchstartX, touchendX, touchstartY, touchendY } = wrapper

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
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  }

  const target = value.parent ? el.parentNode : el
  const options = value.options || {}

  target.addEventListener('touchstart', e => touchstart(e, wrapper), options)
  target.addEventListener('touchend', e => touchend(e, wrapper), options)
  target.addEventListener('touchmove', e => touchmove(e, wrapper), options)
}

function unbind (el, { value }) {
  const target = value.parent ? el.parentNode : el

  target.removeEventListener('touchstart', touchstart)
  target.removeEventListener('touchend', touchend)
  target.removeEventListener('touchmove', touchmove)
}

export default {
  inserted,
  unbind
}
