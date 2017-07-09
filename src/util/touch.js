const touchstart = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchstartX = touch.screenX
  wrapper.touchstartY = touch.screenY

  const e = {
    touchstartX: touch.screenX,
    touchstartY: touch.screenY
  }

  wrapper.startCb && wrapper.startCb(Object.assign(event, e))
}

const touchend = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchendX = touch.screenX
  wrapper.touchendY = touch.screenY

  const e = {
    touchendX: touch.screenX,
    touchendY: touch.screenY,
    offsetX: touch.screenX - wrapper.touchstartX,
    offsetY: touch.screenY - wrapper.touchstartY
  }

  wrapper.endCb && wrapper.endCb(Object.assign(event, e))
  handleGesture(wrapper)
}

const touchmove = (event, wrapper) => {
  const touch = event.changedTouches[0]

  const e = {
    touchmoveX: touch.screenX,
    touchmoveY: touch.screenY,
    offsetX: touch.screenX - wrapper.touchstartX,
    offsetY: touch.screenY - wrapper.touchstartY
  }

  wrapper.moveCb && wrapper.moveCb(Object.assign(event, e))
}

const handleGesture = (wrapper) => {
  const { touchstartX, touchendX, touchstartY, touchendY } = wrapper

  if (touchendX < touchstartX) {
    wrapper.leftCb && wrapper.leftCb(wrapper)
  }
  if (touchendX > touchstartX) {
    wrapper.rightCb && wrapper.rightCb(wrapper)
  }
  if (touchendY < touchstartY) {
    wrapper.upCb && wrapper.upCb(wrapper)
  }
  if (touchendY > touchstartY) {
    wrapper.downCb && wrapper.downCb(wrapper)
  }
}

export function unbind (el) {
  el.removeEventListener('touchstart', touchstart, { passive: true })
  el.removeEventListener('touchend', touchend, { passive: true })
  el.removeEventListener('touchmove', touchmove, { passive: true })
}

export function bind (el, move) {
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    leftCb: null,
    rightCb: null,
    upCb: null,
    downCb: null,
    startCb: null,
    moveCb: null,
    endCb: null,
    left: function (cb) {
      this.leftCb = cb

      return wrapper
    },
    right: function (cb) {
      this.rightCb = cb

      return wrapper
    },
    up: function (cb) {
      this.upCb = cb

      return wrapper
    },
    down: function (cb) {
      this.downCb = cb

      return wrapper
    },
    start: function (cb) {
      this.startCb = cb

      return wrapper
    },
    move: function (cb) {
      this.moveCb = cb

      return wrapper
    },
    end: function (cb) {
      this.endCb = cb

      return wrapper
    }
  }

  el.addEventListener('touchstart', e => touchstart(e, wrapper), { passive: true })
  el.addEventListener('touchend', e => touchend(e, wrapper), { passive: true })
  if (move) el.addEventListener('touchmove', e => touchmove(e, wrapper), { passive: true })

  return wrapper
}

export default {
  bind,
  unbind
}
