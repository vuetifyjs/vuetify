import type { CustomCommands } from './setup/browser-commands.ts'

interface CustomMatchers<R = unknown> {
  toHaveBeenTipped: () => R
  toHaveBeenWarned: () => R
  toBeOnScreen: () => R
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

declare module '@vitest/browser/context' {
  interface BrowserCommands extends CustomCommands {}
}
