let clean = true
const frames = [] as any[]

/**
 * Schedule a task to run in an animation frame on its own
 * This is useful for heavy tasks that may cause jank if all ran together
 */
export function requestNewFrame (cb: () => void) {
  if (!clean || frames.length) {
    frames.push(cb)
    run()
  } else {
    clean = false
    cb()
    run()
  }
}

let raf = -1
function run () {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const frame = frames.shift()
    if (frame) frame()

    if (frames.length) run()
    else clean = true
  })
}
