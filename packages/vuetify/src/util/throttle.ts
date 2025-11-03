export function throttle<T extends (...args: any[]) => any> (
  fn: T,
  delay: number,
  options = { leading: true, trailing: true },
) {
  let timeoutId = 0 as any
  let lastExec = 0
  let throttling = false
  let start = 0

  function clear () {
    clearTimeout(timeoutId)
    throttling = false
    start = 0
  }

  const wrap = (...args: Parameters<T>): void | ReturnType<T> => {
    clearTimeout(timeoutId)

    const now = Date.now()

    if (!start) start = now
    const elapsed = now - Math.max(start, lastExec)

    function invoke () {
      lastExec = Date.now()
      timeoutId = setTimeout(clear, delay)
      fn(...args)
    }

    if (!throttling) {
      throttling = true
      if (options.leading) {
        invoke()
      }
    } else if (elapsed >= delay) {
      invoke()
    } else if (options.trailing) {
      timeoutId = setTimeout(invoke, delay - elapsed)
    }
  }

  wrap.clear = clear
  wrap.immediate = fn
  return wrap
}
