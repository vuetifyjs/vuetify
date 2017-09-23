// From Vue, slightly modified

function noop() { }

if (typeof console === 'undefined') {
  window.console = {
    warn: noop,
    error: noop
  }
}

// avoid info messages during test
console.info = noop

const asserted = []

function createCompareFn (spy) {
  const hasWarned = msg => {
    for (const args of spy.calls.allArgs()) {
      if (args.some(arg => (
        arg.toString().includes(msg)
      ))) return true
    }
  }

  return {
    compare: msg => {
      asserted.push(msg)
      const warned = Array.isArray(msg)
        ? msg.some(hasWarned)
        : hasWarned(msg)
      return {
        pass: warned,
        message: warned
          ? `Expected message "${msg}" not to have been warned`
          : `Expected message "${msg}" to have been warned`
      }
    }
  }
}

function toHaveBeenWarnedInit() {
  // define custom matcher for warnings
  beforeEach(() => {
    asserted.length = 0
    spyOn(console, 'warn')
    spyOn(console, 'error')
    jasmine.addMatchers({
      toHaveBeenWarned: () => createCompareFn(console.error),
      toHaveBeenTipped: () => createCompareFn(console.warn)
    })
  })

  afterEach(done => {
    for (const type of ['error', 'warn']) {
      const warned = msg => asserted.some(assertedMsg => msg.toString().includes(assertedMsg))
      for (const args of console[type].calls.allArgs()) {
        if (!warned(args[0])) {
          done.fail(`Unexpected console.${type} message: ${args[0]}`)
          return
        }
      }
    }
    done()
  })
}

export default toHaveBeenWarnedInit
