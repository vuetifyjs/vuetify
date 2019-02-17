export interface VuetifyServiceContract {
  framework: Record<string, VuetifyServiceContract>
  init: (ssrContext?: object) => void
}

export interface VuetifyService {
  new (options?: any): VuetifyServiceContract
  property: string
}
