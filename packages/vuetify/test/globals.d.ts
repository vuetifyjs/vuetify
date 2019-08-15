// https://github.com/Microsoft/TypeScript/issues/17736
export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenWarned(): R
      toHaveBeenTipped(): R
    }
  }
}

declare global {
  interface KeyboardEventInit { keyCode?: number }
}
