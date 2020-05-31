// Types
export type BreakpointName = number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

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
  mobile: boolean
  mobileBreakPoint: BreakpointName
  thresholds: BreakpointThresholds
  scrollBarWidth: number
}

export interface BreakpointOptions {
  mobileBreakPoint?: BreakpointName
  scrollBarWidth?: number
  thresholds?: Partial<BreakpointThresholds>
}

export interface BreakpointThresholds {
  xs: number
  sm: number
  md: number
  lg: number
}
