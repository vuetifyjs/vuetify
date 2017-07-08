const touchstart = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchstartX = touch.screenX
  wrapper.touchstartY = touch.screenY

  wrapper.startCb && wrapper.startCb({ touchstartX: touch.screenX, touchstartY: touch.screenY })
}

const touchend = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchendX = touch.screenX
  wrapper.touchendY = touch.screenY

  wrapper.endCb && wrapper.endCb({ touchendX: touch.screenX, touchendY: touch.screenY })
  handleGesture(wrapper)
}

const touchmove = (event, wrapper) => {
  const touch = event.changedTouches[0]

  wrapper.moveCb && wrapper.moveCb({ touchmoveX: touch.screenX, touchmoveY: touch.screenY })
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

export function uninstall (el) {
  el.removeEventListener('touchstart', touchstart, { passive: true })
  el.removeEventListener('touchend', touchend, { passive: true })
  el.removeEventListener('touchmove', touchmove, { passive: true })
}

export function install (el, move) {
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
  install,
  uninstall
}
