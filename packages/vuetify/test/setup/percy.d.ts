declare module '@percy/sdk-utils' {
  const utils: {
    logger: any
    fetchPercyDOM: () => Promise<string>
    isPercyEnabled: () => Promise<boolean>
    postSnapshot: (...args: any[]) => Promise<void>
  }
  export default utils

  export interface PercyOptions {
    //
  }
}
