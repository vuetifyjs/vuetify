export type EasingFunction = (t: number) => number

// linear
export const linear = (t: number) => t
// accelerating from zero velocity
export const easeInQuad = (t: number) => t * t
// decelerating to zero velocity
export const easeOutQuad = (t: number) => t * (2 - t)
// acceleration until halfway, then deceleration
export const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
// accelerating from zero velocity
export const easeInCubic = (t: number) => t * t * t
// decelerating to zero velocity
export const easeOutCubic = (t: number) => --t * t * t + 1
// acceleration until halfway, then deceleration
export const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
// accelerating from zero velocity
export const easeInQuart = (t: number) => t * t * t * t
// decelerating to zero velocity
export const easeOutQuart = (t: number) => 1 - --t * t * t * t
// acceleration until halfway, then deceleration
export const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t)
// accelerating from zero velocity
export const easeInQuint = (t: number) => t * t * t * t * t
// decelerating to zero velocity
export const easeOutQuint = (t: number) => 1 + --t * t * t * t * t
// acceleration until halfway, then deceleration
export const easeInOutQuint = (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
