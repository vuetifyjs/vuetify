// Types
export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Interfaces
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
  name: BreakpointName
  sm: boolean
  smAndDown: boolean
  smAndUp: boolean
  smOnly: boolean
  width: number
  xl: boolean
  xlOnly: boolean
  xs: boolean
  xsOnly: boolean
  mobile: boolean
  mobileBreakpoint: number | BreakpointName
  thresholds: BreakpointThresholds
  scrollBarWidth: number
}

export interface BreakpointOptions {
  mobileBreakpoint?: number | BreakpointName
  scrollBarWidth?: number
  thresholds?: Partial<BreakpointThresholds>
}

export interface BreakpointThresholds {
  xs: number
  sm: number
  md: number
  lg: number
}
