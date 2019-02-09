export interface VuetifyServiceInstance {
  framework: Record<string, VuetifyServiceInstance>
  init: (ssrContext?: object) => void
}

export interface VuetifyService {
  new (options?: any): VuetifyServiceInstance
  property: string
}
