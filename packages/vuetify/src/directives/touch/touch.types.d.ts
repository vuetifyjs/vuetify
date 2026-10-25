export interface TouchHandlers {
  start?: (wrapperEvent: { originalEvent: TouchEvent } & TouchData) => void
  end?: (wrapperEvent: { originalEvent: TouchEvent } & TouchData) => void
  move?: (wrapperEvent: { originalEvent: TouchEvent } & TouchData) => void
  left?: (wrapper: TouchData) => void
  right?: (wrapper: TouchData) => void
  up?: (wrapper: TouchData) => void
  down?: (wrapper: TouchData) => void
}

export interface TouchData {
  touchstartX: number
  touchstartY: number
  touchmoveX: number
  touchmoveY: number
  touchendX: number
  touchendY: number
  offsetX: number
  offsetY: number
}

export {}
