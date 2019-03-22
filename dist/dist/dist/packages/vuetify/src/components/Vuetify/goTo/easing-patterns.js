// linear
export var linear = function (t) { return t; };
// accelerating from zero velocity
export var easeInQuad = function (t) { return t * t; };
// decelerating to zero velocity
export var easeOutQuad = function (t) { return t * (2 - t); };
// acceleration until halfway, then deceleration
export var easeInOutQuad = function (t) { return (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); };
// accelerating from zero velocity
export var easeInCubic = function (t) { return t * t * t; };
// decelerating to zero velocity
export var easeOutCubic = function (t) { return --t * t * t + 1; };
// acceleration until halfway, then deceleration
export var easeInOutCubic = function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; };
// accelerating from zero velocity
export var easeInQuart = function (t) { return t * t * t * t; };
// decelerating to zero velocity
export var easeOutQuart = function (t) { return 1 - --t * t * t * t; };
// acceleration until halfway, then deceleration
export var easeInOutQuart = function (t) { return (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t); };
// accelerating from zero velocity
export var easeInQuint = function (t) { return t * t * t * t * t; };
// decelerating to zero velocity
export var easeOutQuint = function (t) { return 1 + --t * t * t * t * t; };
// acceleration until halfway, then deceleration
export var easeInOutQuint = function (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t; };
//# sourceMappingURL=easing-patterns.js.map
//# sourceMappingURL=easing-patterns.js.map
//# sourceMappingURL=easing-patterns.js.map