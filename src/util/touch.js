const touchstart = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchstartX = touch.clientX
  wrapper.touchstartY = touch.clientY

  const e = {
    touchstartX: touch.clientX,
    touchstartY: touch.clientY
  }

  wrapper.startCb && wrapper.startCb(Object.assign(event, e))
}

const touchend = (event, wrapper) => {
  const touch = event.changedTouches[0]
  wrapper.touchendX = touch.clientX
  wrapper.touchendY = touch.clientY

  const e = {
    touchendX: touch.clientX,
    touchendY: touch.clientY,
    offsetX: touch.clientX - wrapper.touchstartX,
    offsetY: touch.clientY - wrapper.touchstartY
  }

  wrapper.endCb && wrapper.endCb(Object.assign(event, e))
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
  if (!el) return
  el.removeEventListener('touchstart', touchstart)
  el.removeEventListener('touchend', touchend)
  el.removeEventListener('touchmove', touchmove)
}

export function bind (el, move, passive = true) {
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

  el.addEventListener('touchstart', e => touchstart(e, wrapper), { passive })
  el.addEventListener('touchend', e => touchend(e, wrapper), { passive })
  if (move) el.addEventListener('touchmove', e => touchmove(e, wrapper), { passive })

  return wrapper
}

export default {
  bind,
  unbind
}
