export type EasingFunction = (t: number) => number

// linear
export const linear = (t: number) => t
// accelerating from zero velocity
export const easeInQuad = (t: number) => t ** 2
// decelerating to zero velocity
export const easeOutQuad = (t: number) => t * (2 - t)
// acceleration until halfway, then deceleration
export const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t)
// accelerating from zero velocity
export const easeInCubic = (t: number) => t ** 3
// decelerating to zero velocity
export const easeOutCubic = (t: number) => --t ** 3 + 1
// acceleration until halfway, then deceleration
export const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
// accelerating from zero velocity
export const easeInQuart = (t: number) => t ** 4
// decelerating to zero velocity
export const easeOutQuart = (t: number) => 1 - --t ** 4
// acceleration until halfway, then deceleration
export const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t)
// accelerating from zero velocity
export const easeInQuint = (t: number) => t ** 5
// decelerating to zero velocity
export const easeOutQuint = (t: number) => 1 + --t ** 5
// acceleration until halfway, then deceleration
export const easeInOutQuint = (t: number) => t < 0.5 ? 16 * t ** 5 : 1 + 16 * --t ** 5
