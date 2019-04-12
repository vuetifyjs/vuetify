declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenWarned(): R
      toHaveBeenTipped(): R
    }
  }
}
