export interface BreakpointOptions {
  scrollBarWidth?: number
  thresholds?: Partial<BreakpointThresholds>
}

export interface BreakpointThresholds {
  xs: number
  sm: number
  md: number
  lg: number
}

export interface Breakpoint {
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
  thresholds: BreakpointThresholds
  scrollBarWidth: number
}
