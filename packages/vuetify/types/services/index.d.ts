export interface VuetifyServiceInstance {}

export interface VuetifyService {
  new (options?: any): VuetifyServiceInstance
  property: string
}
