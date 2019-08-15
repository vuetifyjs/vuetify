export interface VuetifyBreakpointOptions {
  thresholds?: Partial<VuetifyBreakpointThresholds>
  scrollBarWidth?: number
}

export interface VuetifyBreakpointThresholds {
  xs: number
  sm: number
  md: number
  lg: number
}

export interface VuetifyBreakpoint {
  height: number
  lg: boolean
  lgAndDown: boolean
  lgAndUp: boolean
  lgOnly: boolean
  md: boolean
  mdAndDown: boolean
  mdAndUp: boolean
  mdOnly: boolean
  name: string
  sm: boolean
  smAndDown: boolean
  smAndUp: boolean
  smOnly: boolean
  width: number
  xl: boolean
  xlOnly: boolean
  xs: boolean
  xsOnly: boolean
  thresholds: VuetifyBreakpointThresholds
  scrollbarWidth: number
}
