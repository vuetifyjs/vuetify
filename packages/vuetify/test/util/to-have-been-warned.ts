import { afterEach, beforeAll, beforeEach, expect, jest } from '@jest/globals'

// From Vue, slightly modified
function noop () { }

if (typeof console === 'undefined') {
  (window as any).console = {
    warn: noop,
    error: noop,
  }
}

// avoid info messages during test
// eslint-disable-next-line no-console
console.info = noop

const asserted: string[] = []

function createCompareFn (spy: jest.Mock) {
  const hasWarned = (msg: string) => {
    for (const args of spy.mock.calls) {
      if (args.some((arg: any) => (
        arg.toString().includes(msg)
      ))) return true
    }
    return false
  }

  return (msg: string) => {
    asserted.push(msg)
    const warned = Array.isArray(msg)
      ? msg.some(hasWarned)
      : hasWarned(msg)
    return {
      pass: warned,
      message: warned
        ? () => (`Expected message "${msg}" not to have been warned`)
        : () => (`Expected message "${msg}" to have been warned`),
    }
  }
}

function toHaveBeenWarnedInit () {
  let warn: jest.Mock
  let error: jest.Mock
  beforeAll(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(noop) as any
    error = jest.spyOn(console, 'error').mockImplementation(noop) as any
    expect.extend({
      toHaveBeenWarned: createCompareFn(error),
      toHaveBeenTipped: createCompareFn(warn),
    })
  })

  beforeEach(() => {
    asserted.length = 0
    warn.mockClear()
    error.mockClear()
  })

  afterEach(done => {
    for (const type of ['error', 'warn']) {
      const warned = (msg: string) => asserted.some(assertedMsg => msg.toString().includes(assertedMsg))
      for (const args of (console as any)[type].mock.calls) {
        if (!warned(args[0])) {
          done!(new Error(`Unexpected console.${type} message: ${args[0]}`))
          return
        }
      }
    }
    done!()
  })
}

export default toHaveBeenWarnedInit
