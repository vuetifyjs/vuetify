(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vuetify"] = factory();
	else
		root["Vuetify"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 152);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports) {

"use strict";
throw new Error("Module build failed: \n76 :     'webkitTransform'\r\n77 :   ].forEach(i => {\r\n78 :     el.style[i] = value\r\n79 :   })\r\n80 : <<<<<<< HEAD\r\n        ^\nUnexpected token (80:3)");

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

"use strict";
function load (cb) {
  if (document.readyState === 'complete') {
    return setTimeout(cb, 0)
  }

  if (document.readyState === 'interactive') {
    return setTimeout(function () { return load(cb); }, 500)
  }

  document.addEventListener('DOMContentLoaded', cb)
}

/* harmony default export */ exports["a"] = load;

/***/ },

/***/ 11:
/***/ function(module, exports) {

throw new Error("Module build failed: Error\n    at /home/homeserver/Sites/vuetify.js/vuetify/node_modules/webpack/lib/NormalModule.js:143:35\n    at /home/homeserver/Sites/vuetify.js/vuetify/node_modules/loader-runner/lib/LoaderRunner.js:359:11\n    at /home/homeserver/Sites/vuetify.js/vuetify/node_modules/loader-runner/lib/LoaderRunner.js:225:18\n    at context.callback (/home/homeserver/Sites/vuetify.js/vuetify/node_modules/loader-runner/lib/LoaderRunner.js:106:13)\n    at /home/homeserver/Sites/vuetify.js/vuetify/node_modules/stylus-loader/index.js:165:11\n    at Renderer.render (/home/homeserver/Sites/vuetify.js/vuetify/node_modules/stylus/lib/renderer.js:107:12)\n    at /home/homeserver/Sites/vuetify.js/vuetify/node_modules/stylus-loader/index.js:163:12\n    at tryCatchReject (/home/homeserver/Sites/vuetify.js/vuetify/node_modules/when/lib/makePromise.js:840:30)\n    at runContinuation1 (/home/homeserver/Sites/vuetify.js/vuetify/node_modules/when/lib/makePromise.js:799:4)\n    at Fulfilled.when (/home/homeserver/Sites/vuetify.js/vuetify/node_modules/when/lib/makePromise.js:590:4)\n    at Pending.run (/home/homeserver/Sites/vuetify.js/vuetify/node_modules/when/lib/makePromise.js:481:13)\n    at Scheduler._drain (/home/homeserver/Sites/vuetify.js/vuetify/node_modules/when/lib/Scheduler.js:62:19)\n    at Scheduler.drain (/home/homeserver/Sites/vuetify.js/vuetify/node_modules/when/lib/Scheduler.js:27:9)\n    at _combinedTickCallback (internal/process/next_tick.js:67:7)\n    at process._tickCallback (internal/process/next_tick.js:98:9)");

/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_bus__ = __webpack_require__(3);
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_index__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_init__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_load__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__functions_toast__ = __webpack_require__(8);
__webpack_require__(11)








function plugin(Vue) {
  Object.keys(__WEBPACK_IMPORTED_MODULE_2__directives_index__["a" /* default */]).forEach(function (key) {
    Vue.directive(key, __WEBPACK_IMPORTED_MODULE_2__directives_index__["a" /* default */][key])
  })
  
  Object.keys(__WEBPACK_IMPORTED_MODULE_1__components_index__["default"]).forEach(function (key) {
    Vue.component(key, __WEBPACK_IMPORTED_MODULE_1__components_index__["default"][key])
  })

  Vue.prototype.$vuetify = {
    bus: __WEBPACK_IMPORTED_MODULE_0__util_bus__["a" /* default */],

    load: __WEBPACK_IMPORTED_MODULE_4__util_load__["a" /* default */],

    init: __WEBPACK_IMPORTED_MODULE_3__util_init__["a" /* default */],

    toast: __WEBPACK_IMPORTED_MODULE_5__functions_toast__["a" /* default */]
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);


var Bus = (function (EventEmitter) {
  function Bus () {
    EventEmitter.call(this)
    this.setMaxListeners(500)
  }

  if ( EventEmitter ) Bus.__proto__ = EventEmitter;
  Bus.prototype = Object.create( EventEmitter && EventEmitter.prototype );
  Bus.prototype.constructor = Bus;

  Bus.prototype.sub = function sub (event, cb) {
    var this$1 = this;

    var type = typeof event
    
    if (type !== 'object' && type !== 'array') {
      return this.on(event, cb)
    }

    event.forEach(function (i) { return this$1.on.apply(this$1, i); })
  };

  Bus.prototype.unsub = function unsub (event, cb) {
    var this$1 = this;

    var type = typeof event

    if (type !== 'object' && type !== 'array') {
      return this.removeListener(event, cb)
    }
    
    event.forEach(function (i) { return this$1.removeListener.apply(this$1, i); })
  };

  Bus.prototype.pub = function pub () {
    this.emit.apply(this, arguments)
  };

  return Bus;
}(__WEBPACK_IMPORTED_MODULE_0_events___default.a));

/* harmony default export */ exports["a"] = new Bus();


/***/ },

/***/ 6:
/***/ function(module, exports) {

"use strict";
throw new Error("Module build failed: \n19 : import Sidebar from './sidebar/index'\r\n20 : import Slider from './slider/index'\r\n21 : import Tabs from './tabs/index'\r\n22 : import Transitions from './transitions/_index'\r\n23 : <<<<<<< HEAD\r\n     ^\nUnexpected token (23:0)");

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__badge__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ripple__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sidebar__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tooltip__ = __webpack_require__(75);







/* harmony default export */ exports["a"] = {
  Badge: __WEBPACK_IMPORTED_MODULE_0__badge__["a" /* default */],
  Dropdown: __WEBPACK_IMPORTED_MODULE_1__dropdown__["a" /* default */],
  Modal: __WEBPACK_IMPORTED_MODULE_2__modal__["a" /* default */],
  Ripple: __WEBPACK_IMPORTED_MODULE_3__ripple__["a" /* default */],
  SideBar: __WEBPACK_IMPORTED_MODULE_4__sidebar__["a" /* default */],
  sidebar: __WEBPACK_IMPORTED_MODULE_4__sidebar__["a" /* default */],
  Tooltip: __WEBPACK_IMPORTED_MODULE_5__tooltip__["a" /* default */]
};

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__util_helpers__);


function directive (el, binding) {
  var config = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["directiveConfig"])(
    binding,
    {
      icon: false,
      left: false,
      overlap: false
    }
  )

  if (config.overlap) { el.classList.add('badge--overlap') }
  if (config.icon)    { el.classList.add('badge--icon') }
  if (config.left)    { el.classList.add('badge--left') }

  el.dataset.badge = config.value
  el.classList.add('badge')
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: function (el) {
    el.removeAttribute('data-badge')
    el.classList.remove('badge')
  }
};

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

"use strict";
function dropdown (e, el, binding, bus, hover) {
  e.preventDefault()

  var component = document.getElementById(binding.arg)

  if (!component
    ||!component.dataset.hover && hover 
    || component.style.display !== 'none'
  ) {
    return
  }

  var width = 0
  var height = 0
  var offset = component.dataset.offset

  component.style.minWidth = (el.clientWidth) + "px"
  component.style.display = 'block'
  var componentWidth = component.clientWidth
  var componentHeight = component.clientHeight
  component.style.display = 'none'

  if (component.dataset.bottom) {
    height = componentHeight - (offset ? 0 : el.clientHeight)
  } else {
    height = offset ? -el.clientHeight : 0
  }

  if (component.dataset.right) {
    width = componentWidth - (offset ? 0 : el.clientWidth)
  } else {
    width = offset ? -el.clientWidth : 0
  }

  component.style.left = (el.offsetLeft - width) + "px"
  component.style.top = (el.offsetTop - height) + "px"

  bus.pub(("dropdown:open:" + (binding.arg)))
}

function directive (el, binding, v) {
  el.dataset.dropdown = binding.arg

  // Directive binding happens before all components are rendered
  // When changing routes, dropdown element may not be ready
  // Do hover check within dropdown function
  el.onclick = function (e) { return dropdown(e, el, binding, v.context.$vuetify.bus, false); }
  el.onmouseenter = function (e) { return dropdown(e, el, binding, v.context.$vuetify.bus, true); }
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: function unbind (el) {
    el.removeAttribute('onclick')
    el.removeAttribute('onmouseenter')
    el.removeAttribute('onmouseleave')
    el.removeAttribute('data-dropdown')
  }
};

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__util_helpers__);


function directive (el, binding, v) {
  var config = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["directiveConfig"])(binding)
  el.dataset.modal = config.value

  el.onclick = function (e) {
    e.preventDefault()
    
    v.context.$vuetify.bus.pub(("modal:open:" + (config.value)))
  }
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: function unbind (el) {
    el.removeAttribute('onclick')
    el.removeAttribute('data-modal')
  }
};


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__util_helpers__);


var ripple = {
  show: function (e, el, binding) {
    var container = document.createElement('span')
    var animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'ripple__container'
    
    if ((binding.value || {}).class) {
      container.classList.add(binding.value.class)
    }

    animation.className = 'ripple__animation'
    animation.style.width = (el.clientWidth * 2) + "px"
    animation.style.height = animation.style.width

    el.appendChild(container)

    var offset = el.getBoundingClientRect()
    var x = e.x - offset.left
    var y = e.y - offset.top

    animation.classList.add('ripple__animation--enter')
    animation.classList.add('ripple__animation--visible')
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["browserTransform"])(animation, ("translate3d(-50%, -50%, 0) translate3d(" + x + "px, " + y + "px, 0) scale3d(.001, .001, 1)"))
    animation.dataset.activated = Date.now()

    setTimeout(function () {
      animation.classList.remove('ripple__animation--enter')
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["browserTransform"])(animation, ("translate3d(-50%, -50%, 0) translate3d(" + x + "px, " + y + "px, 0)"))
    }, 0)
  },

  hide: function (el) {
    var ripples = el.getElementsByClassName('ripple__animation')

    if (ripples.length === 0) { return }
    var animation = ripples[ripples.length - 1]
    var diff = Date.now() - Number(animation.dataset.activated)
    var delay = 400 - diff

    delay = delay < 0 ? 0 : delay

    setTimeout(function () {
      animation.classList.remove('ripple__animation--visible')

      setTimeout(function () {
        animation.parentNode.remove()
      }, 300)
    }, delay)
  }
}

function directive (el, binding, v) {
  if (binding.value === false) { return }

  if ('ontouchstart' in window) {
    // el.addEventListener('touchstart', e => ripple.show(e, el, binding), false)
    el.addEventListener('touchend', function () { return ripple.hide(el); }, false)
    el.addEventListener('touchcancel', function () { return ripple.hide(el); }, false)
  }

  el.addEventListener('mousedown', function (e) { return ripple.show(e, el, binding); }, false)
  el.addEventListener('mouseup', function () { return ripple.hide(el); }, false)
  el.addEventListener('mouseleave', function () { return ripple.hide(el); }, false)
}

function unbind (el, binding) {
  el.removeEventListener('touchstart', function (e) { return ripple.show(e, el, binding); }, false)
  el.removeEventListener('mousedown', function (e) { return ripple.show(e, el, binding); }, false)
  el.removeEventListener('touchend', function () { return ripple.hide(el); }, false)
  el.removeEventListener('touchcancel', function () { return ripple.hide(el); }, false)
  el.removeEventListener('mouseup', function () { return ripple.hide(el); }, false)
  el.removeEventListener('mouseleave', function () { return ripple.hide(el); }, false)
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  unbind: unbind
};


/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

"use strict";
function directive (el, binding, v) {
  el.dataset.sidebar = binding.arg

  el.onclick = function (e) {
    e.preventDefault()
    
    v.context.$vuetify.bus.pub(("sidebar:toggle:" + (binding.arg)))
  }
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: function unbind (el) {
    el.removeAttribute('onclick')
    el.removeAttribute('data-sidebar')
  }
};

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__util_helpers__);


function directive (el, binding) {
  var config = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["directiveConfig"])(
    binding,
    { top: true }
  )

  unbind(el, binding, config)

  el.dataset.tooltip = config.html
  el.dataset['tooltipLocation'] = config.value
}

function unbind (el, binding, config) {
  el.removeAttribute('data-tooltip')
  el.removeAttribute('data-tooltip-location')
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
};

/***/ },

/***/ 77:
/***/ function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

"use strict";
var Toast = function Toast () {};

Toast.prototype.toast = function toast (location) {
  var toast = document.createElement('div')

  toast.classList.add('toast')
  toast.classList.add(("toast--" + location))

  document.body.appendChild(toast)

  return toast
};

Toast.prototype.create = function create (message, location, duration, cb) {
    if ( location === void 0 ) location = 'right';
    if ( duration === void 0 ) duration = 3000;

  var toast = document.querySelector((".toast--" + location))

  if (!toast) {
    toast = this.toast(location)
  }

  var content = document.createElement('div')
  content.classList.add('toast__content')
  content.innerHTML = message

  toast.appendChild(content)
  setTimeout(function () { return content.classList.add('toast__content--active'); }, 10)

  setTimeout(function () {
    content.classList.add('toast__content--remove')

    setTimeout(function () {
      content.remove()

      if (cb) {
        cb()
      }
    }, 300)
  }, duration)
};

/* harmony default export */ exports["a"] = new Toast();

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bus__ = __webpack_require__(3);


/* harmony default export */ exports["a"] = function () {
  var click = function (e) { return __WEBPACK_IMPORTED_MODULE_0__bus__["a" /* default */].pub('body:click', e); }

  if (typeof window.orientation !== 'undefined') {
    document.body.addEventListener('touchstart', click, false)
  } else {
    document.body.addEventListener('click', click, false)
  }

  __WEBPACK_IMPORTED_MODULE_0__bus__["a" /* default */].sub('meta:title', function (title) {
    document.title = title
  })

  __WEBPACK_IMPORTED_MODULE_0__bus__["a" /* default */].sub('meta:description', function (description) {
    document.head.querySelector('meta[name=description]').content = description
  })

  __WEBPACK_IMPORTED_MODULE_0__bus__["a" /* default */].sub('meta:keywords', function (keywords) {
    document.head.querySelector('meta[name=keywords]').content = keywords
  })
};

/***/ }

/******/ });
});