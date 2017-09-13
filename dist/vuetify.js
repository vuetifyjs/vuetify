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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    themeClasses: function themeClasses() {
      return {
        'theme--light': this.light,
        'theme--dark': this.dark
      };
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = createSimpleFunctional;
/* harmony export (immutable) */ __webpack_exports__["e"] = createSimpleTransition;
/* harmony export (immutable) */ __webpack_exports__["b"] = createJavaScriptTransition;
/* harmony export (immutable) */ __webpack_exports__["f"] = directiveConfig;
/* harmony export (immutable) */ __webpack_exports__["a"] = addOnceEventListener;
/* harmony export (immutable) */ __webpack_exports__["g"] = getObjectValueByPath;
/* harmony export (immutable) */ __webpack_exports__["c"] = createRange;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createSimpleFunctional(c) {
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';

  var name = c.replace(/__/g, '-');
  return {
    name: 'v-' + name,
    functional: true,

    render: function render(h, _ref) {
      var data = _ref.data,
          children = _ref.children;

      data.staticClass = (c + ' ' + (data.staticClass || '')).trim();

      return h(el, data, children);
    }
  };
}

function createSimpleTransition(name) {
  var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top center 0';
  var mode = arguments[2];

  return {
    name: name,

    functional: true,

    props: {
      origin: {
        type: String,
        default: origin
      }
    },

    render: function render(h, context) {
      context.data = context.data || {};
      context.data.props = { name: name };
      context.data.on = context.data.on || {};
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = _extends({}, context.data.on);
      }

      if (mode) context.data.props.mode = mode;

      context.data.on.beforeEnter = function (el) {
        el.style.transformOrigin = context.props.origin;
        el.style.webkitTransformOrigin = context.props.origin;
      };

      return h('transition', context.data, context.children);
    }
  };
}

function createJavaScriptTransition(name, functions) {
  var css = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'in-out';

  return {
    name: name,

    functional: true,

    props: {
      css: {
        type: Boolean,
        default: css
      },
      mode: {
        type: String,
        default: mode
      }
    },

    render: function render(h, context) {
      var data = {
        props: _extends({}, context.props, {
          name: name
        }),
        on: functions
      };

      return h('transition', data, context.children);
    }
  };
}

function directiveConfig(binding) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.assign({}, defaults, binding.modifiers, { value: binding.arg }, binding.value || {});
}

function addOnceEventListener(el, event, cb) {
  var once = function once() {
    cb();
    el.removeEventListener(event, once, false);
  };

  el.addEventListener(event, once, false);
}

function getObjectValueByPath(obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) return;
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  var a = path.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (obj instanceof Object && k in obj) {
      obj = obj[k];
    } else {
      return;
    }
  }
  return obj;
}

function createRange(length) {
  return [].concat(_toConsumableArray(Array.from({ length: length }, function (v, k) {
    return k;
  })));
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(48);


__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = factory;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function factory() {
  var _watch;

  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'input';

  return {
    model: { prop: prop, event: event },

    props: _defineProperty({}, prop, { required: false }),

    data: function data() {
      return {
        isActive: !!this[prop]
      };
    },


    watch: (_watch = {}, _defineProperty(_watch, prop, function (val) {
      this.isActive = !!val;
    }), _defineProperty(_watch, 'isActive', function isActive(val) {
      !!val !== this[prop] && this.$emit(event, val);
    }), _watch)
  };
}

var Toggleable = factory();

/* harmony default export */ __webpack_exports__["a"] = (Toggleable);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VBottomSheetTranstion */
/* unused harmony export VCarouselTransition */
/* unused harmony export VCarouselReverseTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return VTabTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return VTabReverseTransition; });
/* unused harmony export VMenuTransition */
/* unused harmony export VFabTransition */
/* unused harmony export VDialogTransition */
/* unused harmony export VDialogBottomTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VFadeTransition; });
/* unused harmony export VScaleTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return VSlideXTransition; });
/* unused harmony export VSlideXReverseTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return VSlideYTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return VSlideYReverseTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VExpandTransition; });
/* harmony export (immutable) */ __webpack_exports__["h"] = install;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__expand_transition__ = __webpack_require__(95);




// Component specific transitions
var VBottomSheetTranstion = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('bottom-sheet-transition');
var VCarouselTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('carousel-transition');
var VCarouselReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('carousel-reverse-transition');
var VTabTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('tab-transition');
var VTabReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('tab-reverse-transition');
var VMenuTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('menu-transition');
var VFabTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('fab-transition', 'center center', 'out-in');

// Generic transitions
var VDialogTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('dialog-transition');
var VDialogBottomTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('dialog-bottom-transition');
var VFadeTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('fade-transition');
var VScaleTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('scale-transition');
var VSlideXTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-x-transition');
var VSlideXReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-x-reverse-transition');
var VSlideYTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-y-transition');
var VSlideYReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-y-reverse-transition');

// JavaScript transitions
var VExpandTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createJavaScriptTransition */])('expand-transition', __WEBPACK_IMPORTED_MODULE_1__expand_transition__["a" /* default */]);

function install(Vue) {
  Vue.component('v-bottom-sheet-transition', VBottomSheetTranstion);
  Vue.component('v-carousel-transition', VCarouselTransition);
  Vue.component('v-carousel-reverse-transition', VCarouselReverseTransition);
  Vue.component('v-dialog-transition', VDialogTransition);
  Vue.component('v-dialog-bottom-transition', VDialogBottomTransition);
  Vue.component('v-fab-transition', VFabTransition);
  Vue.component('v-fade-transition', VFadeTransition);
  Vue.component('v-menu-transition', VMenuTransition);
  Vue.component('v-scale-transition', VScaleTransition);
  Vue.component('v-slide-x-transition', VSlideXTransition);
  Vue.component('v-slide-x-reverse-transition', VSlideXReverseTransition);
  Vue.component('v-slide-y-transition', VSlideYTransition);
  Vue.component('v-slide-y-reverse-transition', VSlideYReverseTransition);
  Vue.component('v-tab-reverse-transition', VTabReverseTransition);
  Vue.component('v-tab-transition', VTabTransition);
  Vue.component('v-expand-transition', VExpandTransition);
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function directive(e, el, binding, v) {
  var cb = function cb() {
    return true;
  };

  if (binding.value) cb = binding.value;

  if (v.context.isActive && e && e.target && e.target !== el && !el.contains(e.target) && cb(e)) {
    v.context.isActive = false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'click-outside',

  bind: function bind(el, binding, v) {
    v.context.$vuetify.load(function () {
      var outside = document.querySelector('[data-app]');
      var click = function click(e) {
        return directive(e, el, binding, v);
      };
      outside && outside.addEventListener('click', click, false);
      el._clickOutside = click;
    });
  },
  unbind: function unbind(el) {
    var outside = document.querySelector('[data-app]');
    outside && outside.removeEventListener('click', el._clickOutside, false);
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function style(el, value) {
  ['transform', 'webkitTransform'].forEach(function (i) {
    el.style[i] = value;
  });
}

var ripple = {
  show: function show(e, el, _ref) {
    var _ref$value = _ref.value,
        value = _ref$value === undefined ? {} : _ref$value;

    var container = document.createElement('span');
    var animation = document.createElement('span');

    container.appendChild(animation);
    container.className = 'ripple__container';

    if (value.class) {
      container.className += ' ' + value.class;
    }

    var size = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight;
    animation.className = 'ripple__animation';
    animation.style.width = size * (value.center ? 1 : 2) + 'px';
    animation.style.height = animation.style.width;

    el.appendChild(container);
    var computed = window.getComputedStyle(el);
    if (computed.position !== 'absolute' && computed.position !== 'fixed') el.style.position = 'relative';

    var offset = el.getBoundingClientRect();
    var x = value.center ? '50%' : e.clientX - offset.left + 'px';
    var y = value.center ? '50%' : e.clientY - offset.top + 'px';

    animation.classList.add('ripple__animation--enter');
    animation.classList.add('ripple__animation--visible');
    style(animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ') scale3d(0.01,0.01,0.01)');
    animation.dataset.activated = Date.now();

    setTimeout(function () {
      animation.classList.remove('ripple__animation--enter');
      style(animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ')  scale3d(0.99,0.99,0.99)');
    }, 0);
  },

  hide: function hide(el) {
    var ripples = el.getElementsByClassName('ripple__animation');

    if (ripples.length === 0) return;
    var animation = ripples[ripples.length - 1];
    var diff = Date.now() - Number(animation.dataset.activated);
    var delay = 400 - diff;

    delay = delay < 0 ? 0 : delay;

    setTimeout(function () {
      animation.classList.remove('ripple__animation--visible');

      setTimeout(function () {
        // Need to figure out a new way to do this
        try {
          if (ripples.length < 1) el.style.position = null;
          animation.parentNode && el.removeChild(animation.parentNode);
        } catch (e) {}
      }, 300);
    }, delay);
  }
};

function directive(el, binding, v) {
  if (binding.value === false) return;

  if ('ontouchstart' in window) {
    el.addEventListener('touchend', function () {
      return ripple.hide(el);
    }, false);
    el.addEventListener('touchcancel', function () {
      return ripple.hide(el);
    }, false);
  }

  el.addEventListener('mousedown', function (e) {
    return ripple.show(e, el, binding);
  }, false);
  el.addEventListener('mouseup', function () {
    return ripple.hide(el);
  }, false);
  el.addEventListener('mouseleave', function () {
    return ripple.hide(el);
  }, false);
  // Anchor tags can be dragged, causes other hides to fail - #1537
  el.addEventListener('dragstart', function () {
    return ripple.hide(el);
  }, false);
}

function unbind(el, binding) {
  el.removeEventListener('touchstart', function (e) {
    return ripple.show(e, el, binding);
  }, false);
  el.removeEventListener('mousedown', function (e) {
    return ripple.show(e, el, binding);
  }, false);
  el.removeEventListener('touchend', function () {
    return ripple.hide(el);
  }, false);
  el.removeEventListener('touchcancel', function () {
    return ripple.hide(el);
  }, false);
  el.removeEventListener('mouseup', function () {
    return ripple.hide(el);
  }, false);
  el.removeEventListener('mouseleave', function () {
    return ripple.hide(el);
  }, false);
  el.removeEventListener('dragstart', function () {
    return ripple.hide(el);
  }, false);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ripple',
  bind: directive,
  unbind: unbind
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function inserted(el, binding) {
  var cb = binding.value;
  var debounce = 200;

  if (typeof binding.value !== 'function') {
    cb = binding.value.value;
    debounce = binding.value.debounce;
  }

  var fn = function fn(cb) {
    return setTimeout(cb, debounce);
  };
  var onResize = function onResize() {
    clearTimeout(fn);
    fn(cb);
  };

  window.addEventListener('resize', onResize, { passive: true });
  el._onResize = onResize;

  onResize();
}

function unbind(el, binding) {
  window.removeEventListener('resize', el._onResize);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'resize',
  inserted: inserted,
  unbind: unbind
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtn__ = __webpack_require__(74);


__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */]);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var touchstart = function touchstart(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;

  wrapper.start && wrapper.start(Object.assign(event, wrapper));
};

var touchend = function touchend(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;

  wrapper.end && wrapper.end(Object.assign(event, wrapper));

  handleGesture(wrapper);
};

var touchmove = function touchmove(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;

  wrapper.move && wrapper.move(Object.assign(event, wrapper));
};

var handleGesture = function handleGesture(wrapper) {
  var touchstartX = wrapper.touchstartX,
      touchendX = wrapper.touchendX,
      touchstartY = wrapper.touchstartY,
      touchendY = wrapper.touchendY;

  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;

  if (touchendX < touchstartX) {
    wrapper.left && wrapper.left(wrapper);
  }
  if (touchendX > touchstartX) {
    wrapper.right && wrapper.right(wrapper);
  }
  if (touchendY < touchstartY) {
    wrapper.up && wrapper.up(wrapper);
  }
  if (touchendY > touchstartY) {
    wrapper.down && wrapper.down(wrapper);
  }
};

function inserted(el, _ref) {
  var value = _ref.value;

  var wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };

  var target = value.parent ? el.parentNode : el;
  var options = value.options || { passive: true

    // Needed to pass unit tests
  };if (!target) return;
  target.addEventListener('touchstart', function (e) {
    return touchstart(e, wrapper);
  }, options);
  target.addEventListener('touchend', function (e) {
    return touchend(e, wrapper);
  }, options);
  target.addEventListener('touchmove', function (e) {
    return touchmove(e, wrapper);
  }, options);
}

function unbind(el, _ref2) {
  var value = _ref2.value;

  var target = value.parent ? el.parentNode : el;

  if (!target) return;

  target.removeEventListener('touchstart', touchstart);
  target.removeEventListener('touchend', touchend);
  target.removeEventListener('touchmove', touchmove);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'touch',
  inserted: inserted,
  unbind: unbind
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validatable__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_VIcon__ = __webpack_require__(3);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_2__components_VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__themeable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__validatable__["a" /* default */]],

  data: function data() {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    };
  },


  props: {
    appendIcon: String,
    appendIconCb: Function,
    asyncLoading: Boolean,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: function _default() {
        return [13, 32];
      }
    },
    value: {
      required: false
    }
  },

  computed: {
    inputGroupClasses: function inputGroupClasses() {
      return Object.assign({
        'input-group': true,
        'input-group--async-loading': this.asyncLoading,
        'input-group--focused': this.isFocused,
        'input-group--dirty': this.isDirty,
        'input-group--tab-focused': this.tabFocused,
        'input-group--disabled': this.disabled,
        'input-group--error': this.hasError,
        'input-group--append-icon': this.appendIcon,
        'input-group--prepend-icon': this.prependIcon,
        'input-group--required': this.required,
        'input-group--hide-details': this.hideDetails,
        'input-group--placeholder': !!this.placeholder,
        'theme--dark': this.dark,
        'theme--light': this.light
      }, this.classes);
    },
    isDirty: function isDirty() {
      return !!this.inputValue;
    }
  },

  methods: {
    groupFocus: function groupFocus(e) {},
    groupBlur: function groupBlur(e) {
      this.tabFocused = false;
    },
    genLabel: function genLabel() {
      return this.$createElement('label', {
        attrs: {
          for: this.$attrs.id
        }
      }, this.$slots.label || this.label);
    },
    genMessages: function genMessages() {
      var messages = [];

      if ((this.hint && this.isFocused || this.hint && this.persistentHint) && this.validations.length === 0) {
        messages = [this.genHint()];
      } else if (this.validations.length) {
        messages = [this.genError(this.validations[0])];
      }

      return this.$createElement('transition-group', {
        'class': 'input-group__messages',
        props: {
          tag: 'div',
          name: 'slide-y-transition'
        }
      }, messages);
    },
    genHint: function genHint() {
      return this.$createElement('div', {
        'class': 'input-group__hint',
        key: this.hint,
        domProps: { innerHTML: this.hint }
      });
    },
    genError: function genError(error) {
      return this.$createElement('div', {
        'class': 'input-group__error',
        key: error
      }, error);
    },
    genIcon: function genIcon(type) {
      var _class;

      var defaultCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var shouldClear = this.clearable && this.isDirty;
      var icon = shouldClear ? 'clear' : this[type + 'Icon'];
      var callback = shouldClear ? this.clearableCallback : this[type + 'IconCb'] || defaultCallback;

      return this.$createElement('v-icon', {
        attrs: {
          'aria-hidden': true
        },
        'class': (_class = {}, _defineProperty(_class, 'input-group__' + type + '-icon', true), _defineProperty(_class, 'input-group__icon-cb', !!callback), _class),
        props: {
          disabled: this.disabled
        },
        on: {
          click: function click(e) {
            if (!callback) return;

            e.stopPropagation();
            callback();
          }
        }
      }, icon);
    },
    genInputGroup: function genInputGroup(input) {
      var _this = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaultAppendCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var children = [];
      var wrapperChildren = [];
      var detailsChildren = [];

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.disabled ? -1 : this.internalTabIndex || this.tabindex
        },
        on: {
          focus: this.groupFocus,
          blur: this.groupBlur,
          click: function click() {
            return _this.tabFocused = false;
          },
          keyup: function keyup(e) {
            if ([9, 16].includes(e.keyCode)) {
              _this.tabFocused = true;
            }
          },
          keydown: function keydown(e) {
            if (!_this.toggle) return;

            if (_this.toggleKeys.includes(e.keyCode)) {
              e.preventDefault();
              _this.toggle();
            }
          }
        }
      }, data);

      if (this.$slots.label || this.label) {
        children.push(this.genLabel());
      }

      wrapperChildren.push(input);

      if (this.prependIcon) {
        wrapperChildren.unshift(this.genIcon('prepend'));
      }

      if (this.appendIcon || this.clearable) {
        wrapperChildren.push(this.genIcon('append', defaultAppendCallback));
      }

      if (this.asyncLoading) {
        detailsChildren.push(this.$createElement('v-progress-linear', {
          props: {
            indeterminate: true,
            height: 2
          }
        }));
      }

      children.push(this.$createElement('div', {
        'class': 'input-group__input'
      }, wrapperChildren));
      detailsChildren.push(this.genMessages());

      if (this.counter) {
        detailsChildren.push(this.genCounter());
      }

      children.push(this.$createElement('div', {
        'class': 'input-group__details'
      }, detailsChildren));

      return this.$createElement('div', data, children);
    }
  }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    primary: Boolean,
    secondary: Boolean,
    success: Boolean,
    info: Boolean,
    warning: Boolean,
    error: Boolean
  }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      isBooted: false
    };
  },


  watch: {
    isActive: function isActive() {
      this.isBooted = true;
    }
  },

  methods: {
    showLazyContent: function showLazyContent(content) {
      return this.lazy && this.isBooted || !this.lazy ? content : null;
    }
  }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_ripple__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["a"] = ({
  directives: {
    Ripple: __WEBPACK_IMPORTED_MODULE_0__directives_ripple__["a" /* default */]
  },

  props: {
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    router: Boolean,
    ripple: Boolean,
    tag: String
  },

  methods: {
    click: function click() {},
    generateRouteLink: function generateRouteLink() {
      var exact = this.exact;
      var tag = void 0;

      var data = {
        attrs: { disabled: this.disabled },
        class: this.classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.ripple || false
        }],
        on: _extends({}, this.$listeners || {}, {
          click: this.click
        })
      };

      if (typeof this.exact === 'undefined') {
        exact = this.to === '/' || this.to === Object(this.to) && this.to.path === '/';
      }

      if (this.to) {
        tag = this.nuxt ? 'nuxt-link' : 'router-link';
        data.props.to = this.to;
        data.props.exact = exact;
        data.props.activeClass = this.activeClass;
        data.props.append = this.append;
        data.props.replace = this.replace;
      } else {
        tag = this.href && 'a' || this.tag || 'a';

        if (tag === 'a') {
          data.attrs.href = this.href || 'javascript:;';
        }
      }

      return { tag: tag, data: data };
    }
  }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCard__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VCardMedia__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VCardTitle__ = __webpack_require__(85);
/* unused harmony reexport VCard */
/* unused harmony reexport VCardMedia */
/* unused harmony reexport VCardTitle */







__WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */].install = function install(Vue) {
  var VCardActions = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('card__actions');
  var VCardText = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('card__text');

  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VCardMedia__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VCardMedia__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VCardTitle__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VCardTitle__["a" /* default */]);
  Vue.component('v-card-actions', VCardActions);
  Vue.component('v-card-text', VCardText);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */]);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;
function Grid(name) {
  return {
    name: 'v-' + name,

    functional: true,

    props: {
      id: String
    },

    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;

      data.staticClass = (name + ' ' + (data.staticClass || '')).trim();

      if (data.attrs) {
        data.staticClass += ' ' + Object.keys(data.attrs).join(' ');
        delete data.attrs;
      }

      if (props.id) {
        data.domProps = data.domProps || {};
        data.domProps.id = props.id;
      }

      return h('div', data, children);
    }
  };
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      buttons: [],
      listeners: []
    };
  },


  methods: {
    getValue: function getValue(i) {
      if (this.buttons[i].value != null) {
        return this.buttons[i].value;
      }

      // Fix for testing, this should always be false in the browser
      if (this.buttons[i].$el.value != null && this.buttons[i].$el.value !== '') {
        return this.buttons[i].$el.value;
      }

      return i;
    },
    update: function update() {
      var _this = this;

      var selected = [];

      this.buttons.forEach(function (button, i) {
        var elm = button.$el;

        // Fix for testing, dataset does not exist on elm?
        if (!elm.dataset) elm.dataset = {};

        elm.removeAttribute('data-only-child');

        if (_this.isSelected(i)) {
          elm.setAttribute('data-selected', true);
          elm.classList.add('btn--active');
          selected.push(i);
        } else {
          elm.removeAttribute('data-selected');
          elm.classList.remove('btn--active');
        }

        elm.dataset.index = i;
      });

      if (selected.length === 1) {
        this.buttons[selected[0]].$el.setAttribute('data-only-child', true);
      }
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    this.$vuetify.load(function () {
      _this2.buttons = _this2.$children;

      _this2.buttons.forEach(function (button, i) {
        _this2.listeners.push(_this2.updateValue.bind(_this2, i));
        button.$on('click', _this2.listeners[i]);
      });

      _this2.update();
    });
  },
  beforeDestroy: function beforeDestroy() {
    var _this3 = this;

    this.buttons.forEach(function (button, i) {
      button.$off('click', _this3.listeners[i]);
    });
  }
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VDialog_vue__ = __webpack_require__(65);
function injectStyle (ssrContext) {
  __webpack_require__(64)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VDialog_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    contentClass: {
      default: ''
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.$vuetify.load(function () {
      if (_this._isDestroyed) return;

      var app = document.querySelector('[data-app]');

      if (!app) {
        return console.warn('Application is missing <v-app> component.');
      }

      // If child has already been removed, bail
      if (!_this.$refs.content) return;

      app.insertBefore(_this.$refs.content, app.firstChild);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.$refs.content) return;

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content);
    } catch (e) {}
  }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_overlayable_vue__ = __webpack_require__(67);
function injectStyle (ssrContext) {
  __webpack_require__(66)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_overlayable_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    absolute: Boolean,
    bottom: Boolean,
    fixed: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean
  }
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VCheckbox__ = __webpack_require__(91);


__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */]);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colorable__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(11);



/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__colorable__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    inputValue: null,
    falseValue: null,
    trueValue: null
  },

  computed: {
    isActive: function isActive() {
      if (Array.isArray(this.inputValue)) {
        return this.inputValue.indexOf(this.value) !== -1;
      }

      if (!this.trueValue || !this.falseValue) {
        return this.value ? this.value === this.inputValue : Boolean(this.inputValue);
      }

      return this.inputValue === this.trueValue;
    },
    isDirty: function isDirty() {
      return this.isActive;
    }
  },

  watch: {
    indeterminate: function indeterminate(val) {
      this.inputIndeterminate = val;
    }
  },

  methods: {
    genLabel: function genLabel() {
      return this.$createElement('label', {
        on: { click: this.toggle },
        attrs: {
          for: this.$attrs.id
        }
      }, this.$slots.label || this.label);
    },
    toggle: function toggle() {
      if (this.disabled) {
        return;
      }

      var input = this.inputValue;
      if (Array.isArray(input)) {
        input = input.slice();
        var i = input.indexOf(this.value);

        if (i === -1) {
          input.push(this.value);
        } else {
          input.splice(i, 1);
        }
      } else if (this.trueValue || this.falseValue) {
        input = input === this.trueValue ? this.falseValue : this.trueValue;
      } else if (this.value) {
        input = this.value === this.inputValue ? null : this.value;
      } else {
        input = !input;
      }

      this.validate(true, input);

      this.$emit('change', input);
    }
  }
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    color: String
  },
  methods: {
    addColorClassChecks: function addColorClassChecks(classes) {
      var parts = this.color ? this.color.trim().split(' ') : [''];
      var color = parts[0] + '--text';
      if (parts.length > 1) color += ' text--' + parts[1];
      classes[color] = !!this.color;
      return classes;
    }
  }
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VProgressLinear__ = __webpack_require__(106);


__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */]);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSelect__ = __webpack_require__(109);


__WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */]);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VListTileActionText */
/* unused harmony export VListTileAvatar */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return VListTileContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return VListTileTitle; });
/* unused harmony export VListTileSubTitle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VList__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VListGroup__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VListTile__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VListTileAction__ = __webpack_require__(119);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__VList__["a"]; });
/* unused harmony reexport VListGroup */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__VListTile__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a"]; });








var VListTileActionText = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__action-text', 'span');
var VListTileAvatar = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__avatar', 'v-avatar');
var VListTileContent = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__content', 'div');
var VListTileTitle = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__title', 'div');
var VListTileSubTitle = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__sub-title', 'div');

__WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VListGroup__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VListGroup__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VListTile__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VListTile__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a" /* default */]);
  Vue.component('v-list-tile-action-text', VListTileActionText);
  Vue.component('v-list-tile-avatar', VListTileAvatar);
  Vue.component('v-list-tile-content', VListTileContent);
  Vue.component('v-list-tile-sub-title', VListTileSubTitle);
  Vue.component('v-list-tile-title', VListTileTitle);
};

/* harmony default export */ __webpack_exports__["f"] = (__WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */]);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VMenu__ = __webpack_require__(120);


__WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */]);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    noDataText: {
      type: String,
      default: 'No data available'
    }
  }
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__themeable__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__themeable__["a" /* default */]],

  data: function data() {
    return {
      isSaving: false
    };
  },


  props: {
    actions: Boolean,
    autosave: Boolean,
    landscape: Boolean,
    noTitle: Boolean,
    scrollable: Boolean,
    value: {
      required: true
    },
    light: {
      type: Boolean,
      default: true
    },
    dark: Boolean
  },

  methods: {
    save: function save() {},
    cancel: function cancel() {},
    genSlot: function genSlot() {
      return this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      });
    }
  }
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_semver__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_semver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_semver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives__ = __webpack_require__(254);
__webpack_require__(32);





function Vuetify(Vue) {
  var Vuetify = __WEBPACK_IMPORTED_MODULE_2__components__["Vuetify"];

  Vue.use(Vuetify, {
    components: __WEBPACK_IMPORTED_MODULE_2__components__,
    directives: __WEBPACK_IMPORTED_MODULE_3__directives__
  });
}

Vuetify.version = __WEBPACK_IMPORTED_MODULE_1__package_json__["version"];

function checkVueVersion() {
  var vueDep = __WEBPACK_IMPORTED_MODULE_1__package_json__["devDependencies"].vue;
  if (!__WEBPACK_IMPORTED_MODULE_0_semver___default.a.satisfies(window.Vue.version, vueDep)) {
    console.warn('Vuetify requires Vue version ' + vueDep);
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion();
  window.Vue.use(Vuetify);
}

/* harmony default export */ __webpack_exports__["default"] = (Vuetify);

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.
/* nomin */ var debug;
/* nomin */ if (typeof process === 'object' &&
    /* nomin */ process.env &&
    /* nomin */ process.env.NODE_DEBUG &&
    /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
  /* nomin */ debug = function() {
    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
    /* nomin */ args.unshift('SEMVER');
    /* nomin */ console.log.apply(console, args);
    /* nomin */ };
/* nomin */ else
  /* nomin */ debug = function() {};

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?';

var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i]);
  if (!re[i])
    re[i] = new RegExp(src[i]);
}

exports.parse = parse;
function parse(version, loose) {
  if (version instanceof SemVer)
    return version;

  if (typeof version !== 'string')
    return null;

  if (version.length > MAX_LENGTH)
    return null;

  var r = loose ? re[LOOSE] : re[FULL];
  if (!r.test(version))
    return null;

  try {
    return new SemVer(version, loose);
  } catch (er) {
    return null;
  }
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      return version;
    else
      version = version.version;
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (version.length > MAX_LENGTH)
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

  if (!(this instanceof SemVer))
    return new SemVer(version, loose);

  debug('SemVer', version, loose);
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    throw new TypeError('Invalid Version: ' + version);

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
    throw new TypeError('Invalid major version')

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
    throw new TypeError('Invalid minor version')

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
    throw new TypeError('Invalid patch version')

  // numberify any prerelease numeric ids
  if (!m[4])
    this.prerelease = [];
  else
    this.prerelease = m[4].split('.').map(function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER)
          return num;
      }
      return id;
    });

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    this.version += '-' + this.prerelease.join('.');
  return this.version;
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  debug('SemVer.compare', this.version, this.loose, other);
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    return -1;
  else if (!this.prerelease.length && other.prerelease.length)
    return 1;
  else if (!this.prerelease.length && !other.prerelease.length)
    return 0;

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined)
      return 0;
    else if (b === undefined)
      return 1;
    else if (a === undefined)
      return -1;
    else if (a === b)
      continue;
    else
      return compareIdentifiers(a, b);
  } while (++i);
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break;
    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break;
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0)
        this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
        this.major++;
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0)
        this.minor++;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0)
        this.patch++;
      this.prerelease = [];
      break;
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0)
        this.prerelease = [0];
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          this.prerelease.push(0);
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1]))
            this.prerelease = [identifier, 0];
        } else
          this.prerelease = [identifier, 0];
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  this.raw = this.version;
  return this;
};

exports.inc = inc;
function inc(version, release, loose, identifier) {
  if (typeof(loose) === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}

exports.diff = diff;
function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    if (v1.prerelease.length || v2.prerelease.length) {
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return 'pre'+key;
          }
        }
      }
      return 'prerelease';
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return key;
        }
      }
    }
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.major = major;
function major(a, loose) {
  return new SemVer(a, loose).major;
}

exports.minor = minor;
function minor(a, loose) {
  return new SemVer(a, loose).minor;
}

exports.patch = patch;
function patch(a, loose) {
  return new SemVer(a, loose).patch;
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose));
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a === b;
      break;
    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a !== b;
      break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      return comp;
    else
      comp = comp.value;
  }

  if (!(this instanceof Comparator))
    return new Comparator(comp, loose);

  debug('comparator', comp, loose);
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    this.value = '';
  else
    this.value = this.operator + this.semver.version;

  debug('comp', this);
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    throw new TypeError('Invalid comparator: ' + comp);

  this.operator = m[1];
  if (this.operator === '=')
    this.operator = '';

  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    this.semver = ANY;
  else
    this.semver = new SemVer(m[2], this.loose);
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  debug('Comparator.test', version, this.loose);

  if (this.semver === ANY)
    return true;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  return cmp(version, this.operator, this.semver, this.loose);
};

Comparator.prototype.intersects = function(comp, loose) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required');
  }

  var rangeTmp;

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, loose);
    return satisfies(this.value, rangeTmp, loose);
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, loose);
    return satisfies(comp.semver, rangeTmp, loose);
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>');
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<');
  var sameSemVer = this.semver.version === comp.semver.version;
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=');
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, loose) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'));
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, loose) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'));

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
};


exports.Range = Range;
function Range(range, loose) {
  if (range instanceof Range) {
    if (range.loose === loose) {
      return range;
    } else {
      return new Range(range.raw, loose);
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, loose);
  }

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  debug('range', range, loose);
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]);

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

Range.prototype.intersects = function(range, loose) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required');
  }

  return this.set.some(function(thisComparators) {
    return thisComparators.every(function(thisComparator) {
      return range.set.some(function(rangeComparators) {
        return rangeComparators.every(function(rangeComparator) {
          return thisComparator.intersects(rangeComparator, loose);
        });
      });
    });
  });
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  debug('comp', comp);
  comp = replaceCarets(comp, loose);
  debug('caret', comp);
  comp = replaceTildes(comp, loose);
  debug('tildes', comp);
  comp = replaceXRanges(comp, loose);
  debug('xrange', comp);
  comp = replaceStars(comp, loose);
  debug('stars', comp);
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p))
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    else if (pr) {
      debug('replaceTilde pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0';
    } else
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0';

    debug('tilde return', ret);
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  debug('caret', comp, loose);
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p)) {
      if (M === '0')
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      else
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
    } else if (pr) {
      debug('replaceCaret pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0';
    } else {
      debug('no pr');
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0';
    }

    debug('caret return', ret);
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  debug('replaceXRanges', comp, loose);
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      gtlt = '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // replace X with 0
      if (xm)
        m = 0;
      if (xp)
        p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        if (xm)
          M = +M + 1;
        else
          m = +m + 1;
      }

      ret = gtlt + M + '.' + m + '.' + p;
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    }

    debug('xRange return', ret);

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  debug('replaceStars', comp, loose);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    from = '';
  else if (isX(fm))
    from = '>=' + fM + '.0.0';
  else if (isX(fp))
    from = '>=' + fM + '.' + fm + '.0';
  else
    from = '>=' + from;

  if (isX(tM))
    to = '';
  else if (isX(tm))
    to = '<' + (+tM + 1) + '.0.0';
  else if (isX(tp))
    to = '<' + tM + '.' + (+tm + 1) + '.0';
  else if (tpr)
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  else
    to = '<=' + to;

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  if (!version)
    return false;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version))
      return true;
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      return false;
  }

  if (version.prerelease.length) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === ANY)
        continue;

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch)
          return true;
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false;
  }

  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  var max = null;
  var maxSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!max || maxSV.compare(v) === -1) { // compare(max, v, true)
        max = v;
        maxSV = new SemVer(max, loose);
      }
    }
  })
  return max;
}

exports.minSatisfying = minSatisfying;
function minSatisfying(versions, range, loose) {
  var min = null;
  var minSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!min || minSV.compare(v) === 1) { // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, loose);
      }
    }
  })
  return min;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

exports.prerelease = prerelease;
function prerelease(version, loose) {
  var parsed = parse(version, loose);
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
}

exports.intersects = intersects;
function intersects(r1, r2, loose) {
  r1 = new Range(r1, loose)
  r2 = new Range(r2, loose)
  return r1.intersects(r2)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)))

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = {"name":"vuetify","version":"0.15.5","author":{"name":"John Leider","email":"john@vuetifyjs.com"},"license":"MIT","homepage":"http://vuetifyjs.com","main":"dist/vuetify.js","unpkg":"dist/vuetify.js","types":"index.d.ts","scripts":{"watch":"cross-env TARGET=development webpack --config build/config.js --progress --hide-modules --watch","dev":"cross-env NODE_ENV=development webpack-dev-server --config build/webpack.dev.config.js --open --hot","build:dev":"cross-env NODE_ENV=production node build/webpack.dev.config.js","build":"rimraf dist && cross-env NODE_ENV=production webpack --config build/config.js --progress --hide-modules","debug-build":"node --inspect --debug-brk build/config.js","test":"cross-env NODE_ENV=test jest --no-cache --verbose","test-coverage":"cross-env NODE_ENV=test jest --no-cache --coverage --verbose","lint":"eslint --ext .js,.vue src","precommit":"yarn run lint && yarn test","prepush":"yarn run lint && yarn test"},"description":"Vue.js 2 Semantic Component Framework","devDependencies":{"autoprefixer":"^7.1.4","avoriaz":"^4.1.0","babel-cli":"^6.26.0","babel-core":"^6.26.0","babel-eslint":"^8.0.0","babel-jest":"^21.0.2","babel-loader":"^7.1.2","babel-plugin-add-filehash":"^6.9.4","babel-plugin-module-resolver":"^2.7.1","babel-plugin-transform-async-to-generator":"^6.24.1","babel-plugin-transform-runtime":"^6.23.0","babel-polyfill":"^6.26.0","babel-preset-env":"^1.5.1","babel-preset-es2015":"^6.24.1","babel-preset-stage-2":"^6.24.1","chalk":"^2.1.0","chromedriver":"^2.32.2","cross-env":"^5.0.5","cross-spawn":"^5.1.0","css-loader":"^0.28.7","css-mqpacker":"^6.0.1","cssnano":"^3.10.0","eslint":"^4.6.1","eslint-config-standard":"^10.2.1","eslint-config-vue":"^2.0.2","eslint-friendly-formatter":"^3.0.0","eslint-loader":"^1.6.1","eslint-plugin-html":"^3.2.1","eslint-plugin-import":"^2.7.0","eslint-plugin-node":"^5.1.1","eslint-plugin-promise":"^3.4.0","eslint-plugin-pug":"^1.0.0","eslint-plugin-standard":"^3.0.1","eslint-plugin-vue":"^2.1.0","eventsource-polyfill":"^0.9.6","extract-text-webpack-plugin":"^3.0.0","friendly-errors-webpack-plugin":"^1.6.1","function-bind":"^1.1.1","husky":"^0.14.3","jest":"^21.0.2","jest-cli":"^21.0.2","jest-css-modules":"^1.1.0","jest-serializer-html":"^4.0.0","jest-vue-preprocessor":"^1.1.0","lolex":"^2.1.2","nightwatch":"^0.9.8","opn":"^5.1.0","optimize-css-assets-webpack-plugin":"^3.1.1","optimize-js-plugin":"^0.0.4","ora":"^1.3.0","phantomjs-prebuilt":"^2.1.15","postcss-loader":"^1.3.3","precss":"^2.0.0","progress-bar-webpack-plugin":"^1.10.0","pug":"^2.0.0-rc.4","pug-loader":"^2.3.0","ress":"^1.1.1","rimraf":"^2.6.2","selenium-server":"^3.5.3","semver":"^5.3.0","serialize-javascript":"^1.3.0","shelljs":"^0.7.4","style-loader":"^0.18.2","stylus":"^0.54.5","stylus-loader":"^3.0.1","uglifyjs-webpack-plugin":"^0.4.6","vue":"^2.4.3","vue-loader":"^13.0.4","vue-router":"^2.7.0","vue-server-renderer":"^2.4.3","vue-template-compiler":"^2.4.3","webpack":"^3.5.6","webpack-bundle-analyzer":"^2.9.0","webpack-bundle-size-analyzer":"^2.7.0","webpack-dev-server":"^2.7.1","webpack-merge":"^4.1.0","write-file-webpack-plugin":"^4.1.0"},"dependencies":{},"engines":{"node":">= 4.0.0","npm":">= 3.0.0"},"jest":{"verbose":false,"roots":["<rootDir>/src"],"moduleFileExtensions":["js","vue"],"moduleDirectories":["node_modules"],"moduleNameMapper":{"src/(.*)":"<rootDir>/src/$1"},"transform":{".*\\.(vue)$":"<rootDir>/node_modules/jest-vue-preprocessor","\\.(styl)$":"<rootDir>/node_modules/jest-css-modules",".*\\.(vue|js)$":"<rootDir>/node_modules/babel-jest"},"transformIgnorePatterns":["node_modules/(?!vue-router)"],"snapshotSerializers":["jest-serializer-html"]}}

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vuetify__ = __webpack_require__(37);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Vuetify", function() { return __WEBPACK_IMPORTED_MODULE_0__Vuetify__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VApp__ = __webpack_require__(39);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VApp", function() { return __WEBPACK_IMPORTED_MODULE_1__VApp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VAlert__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VAlert", function() { return __WEBPACK_IMPORTED_MODULE_2__VAlert__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VAvatar__ = __webpack_require__(52);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VAvatar", function() { return __WEBPACK_IMPORTED_MODULE_3__VAvatar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VBottomNav__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBottomNav", function() { return __WEBPACK_IMPORTED_MODULE_4__VBottomNav__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VBottomSheet__ = __webpack_require__(60);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBottomSheet", function() { return __WEBPACK_IMPORTED_MODULE_5__VBottomSheet__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VBreadcrumbs__ = __webpack_require__(68);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBreadcrumbs", function() { return __WEBPACK_IMPORTED_MODULE_6__VBreadcrumbs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__VBtn__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBtn", function() { return __WEBPACK_IMPORTED_MODULE_7__VBtn__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__VBtnToggle__ = __webpack_require__(77);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBtnToggle", function() { return __WEBPACK_IMPORTED_MODULE_8__VBtnToggle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__VCard__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VCard", function() { return __WEBPACK_IMPORTED_MODULE_9__VCard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__VCarousel__ = __webpack_require__(86);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VCarousel", function() { return __WEBPACK_IMPORTED_MODULE_10__VCarousel__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__VCheckbox__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VCheckbox", function() { return __WEBPACK_IMPORTED_MODULE_11__VCheckbox__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__VChip__ = __webpack_require__(97);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VChip", function() { return __WEBPACK_IMPORTED_MODULE_12__VChip__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__VDataTable__ = __webpack_require__(101);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDataTable", function() { return __WEBPACK_IMPORTED_MODULE_13__VDataTable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__VDatePicker__ = __webpack_require__(137);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDatePicker", function() { return __WEBPACK_IMPORTED_MODULE_14__VDatePicker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__VDialog__ = __webpack_require__(146);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDialog", function() { return __WEBPACK_IMPORTED_MODULE_15__VDialog__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__VDivider__ = __webpack_require__(147);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDivider", function() { return __WEBPACK_IMPORTED_MODULE_16__VDivider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__VExpansionPanel__ = __webpack_require__(151);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VExpansionPanel", function() { return __WEBPACK_IMPORTED_MODULE_17__VExpansionPanel__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__VFooter__ = __webpack_require__(156);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VFooter", function() { return __WEBPACK_IMPORTED_MODULE_18__VFooter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__VForm__ = __webpack_require__(160);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VForm", function() { return __WEBPACK_IMPORTED_MODULE_19__VForm__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__VGrid__ = __webpack_require__(162);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VGrid", function() { return __WEBPACK_IMPORTED_MODULE_20__VGrid__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__VIcon__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VIcon", function() { return __WEBPACK_IMPORTED_MODULE_21__VIcon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__VList__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VList", function() { return __WEBPACK_IMPORTED_MODULE_22__VList__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__VMenu__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VMenu", function() { return __WEBPACK_IMPORTED_MODULE_23__VMenu__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__VNavigationDrawer__ = __webpack_require__(172);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VNavigationDrawer", function() { return __WEBPACK_IMPORTED_MODULE_24__VNavigationDrawer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__VPagination__ = __webpack_require__(176);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VPagination", function() { return __WEBPACK_IMPORTED_MODULE_25__VPagination__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__VParallax__ = __webpack_require__(180);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VParallax", function() { return __WEBPACK_IMPORTED_MODULE_26__VParallax__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__VProgressCircular__ = __webpack_require__(185);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VProgressCircular", function() { return __WEBPACK_IMPORTED_MODULE_27__VProgressCircular__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__VProgressLinear__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VProgressLinear", function() { return __WEBPACK_IMPORTED_MODULE_28__VProgressLinear__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__VRadioGroup__ = __webpack_require__(189);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VRadioGroup", function() { return __WEBPACK_IMPORTED_MODULE_29__VRadioGroup__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__VSelect__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSelect", function() { return __WEBPACK_IMPORTED_MODULE_30__VSelect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__VSlider__ = __webpack_require__(198);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSlider", function() { return __WEBPACK_IMPORTED_MODULE_31__VSlider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__VSnackbar__ = __webpack_require__(202);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSnackbar", function() { return __WEBPACK_IMPORTED_MODULE_32__VSnackbar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__VSpeedDial__ = __webpack_require__(206);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSpeedDial", function() { return __WEBPACK_IMPORTED_MODULE_33__VSpeedDial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__VStepper__ = __webpack_require__(210);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VStepper", function() { return __WEBPACK_IMPORTED_MODULE_34__VStepper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__VSubheader__ = __webpack_require__(216);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSubheader", function() { return __WEBPACK_IMPORTED_MODULE_35__VSubheader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__VSwitch__ = __webpack_require__(220);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSwitch", function() { return __WEBPACK_IMPORTED_MODULE_36__VSwitch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__VSystemBar__ = __webpack_require__(226);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSystemBar", function() { return __WEBPACK_IMPORTED_MODULE_37__VSystemBar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__VTabs__ = __webpack_require__(230);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTabs", function() { return __WEBPACK_IMPORTED_MODULE_38__VTabs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__VTextField__ = __webpack_require__(237);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTextField", function() { return __WEBPACK_IMPORTED_MODULE_39__VTextField__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__VTimePicker__ = __webpack_require__(242);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTimePicker", function() { return __WEBPACK_IMPORTED_MODULE_40__VTimePicker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__VToolbar__ = __webpack_require__(249);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VToolbar", function() { return __WEBPACK_IMPORTED_MODULE_41__VToolbar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__transitions__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Transitions", function() { return __WEBPACK_IMPORTED_MODULE_42__transitions__["h"]; });












































/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_load__ = __webpack_require__(38);


var Vuetify = {
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var $vuetify = {
      load: __WEBPACK_IMPORTED_MODULE_0__util_load__["a" /* default */],
      breakpoint: {}
    };

    Vue.util.defineReactive({}, 'breakpoint', $vuetify);

    Vue.prototype.$vuetify = $vuetify;

    if (opts.transitions) {
      Object.keys(opts.transitions).forEach(function (key) {
        var t = opts.transitions[key];
        if (t.name !== undefined && t.name.startsWith('v-')) {
          Vue.component(t.name, t);
        }
      });
    }

    if (opts.directives) {
      Object.keys(opts.directives).forEach(function (key) {
        var d = opts.directives[key];
        Vue.directive(d.name, d);
      });
    }

    if (opts.components) {
      Object.keys(opts.components).forEach(function (key) {
        var c = opts.components[key];
        Vue.use(c);
      });
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Vuetify);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function load(cb) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (document.readyState === 'complete') {
    return setTimeout(cb, 0);
  }

  if (document.readyState === 'interactive' && i <= 10) {
    return setTimeout(function () {
      return load(cb, i + 1);
    }, 200);
  }

  window.addEventListener('load', cb);
}

/* harmony default export */ __webpack_exports__["a"] = (load);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VApp__ = __webpack_require__(40);


__WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */]);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VApp_vue__ = __webpack_require__(42);
function injectStyle (ssrContext) {
  __webpack_require__(41)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VApp_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_breakpoint__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_resize__ = __webpack_require__(8);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-app',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__util_breakpoint__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  directives: {
    Resize: __WEBPACK_IMPORTED_MODULE_2__directives_resize__["a" /* default */]
  },

  data: function data() {
    return {
      resizeTimeout: {}
    };
  },

  props: {
    fixedFooter: Boolean,
    footer: Boolean,
    id: {
      type: String,
      default: 'app'
    },
    toolbar: Boolean
  },

  methods: {
    resizeDebounce: function resizeDebounce() {
      clearTimeout(this.resizeTimeout);

      this.resizeTimeout = setTimeout(this.onResize, 200);
    }
  },

  mounted: function mounted() {
    this.onResize();
  },
  render: function render(h) {
    var data = {
      staticClass: 'application',
      'class': {
        'application--dark': this.dark,
        'application--light': !this.dark,
        'application--footer': this.footer || this.fixedFooter,
        'application--footer-fixed': this.fixedFooter,
        'application--toolbar': this.toolbar
      },
      attrs: { 'data-app': true },
      domProps: { id: this.id },
      directives: [{
        name: 'resize',
        value: this.resizeDebounce
      }]
    };

    return h('div', data, this.$slots.default);
  }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b
 */

/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 * Useful to e.g. adapt the user interface from inside a Vue component
 * as opposed to using CSS classes. The breakpoint pixel values and
 * range names are taken from Vuetify (https://github.com/vuetifyjs).
 *
 * Use within a component:
 *
 *   import breakpoint from './breakpoint.js'
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [breakpoint],
 *     ...
 *
 * Then inside a template:
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 */
var breakpoint = {
  data: function data() {
    return {
      clientWidth: 0,
      clientHeight: 0
    };
  },


  computed: {
    breakpoint: function breakpoint() {
      var xs = this.clientWidth < 600;
      var sm = this.clientWidth < 960 && !xs;
      var md = this.clientWidth < 1280 - 16 && !(sm || xs);
      var lg = this.clientWidth < 1920 - 16 && !(md || sm || xs);
      var xl = this.clientWidth >= 1920 - 16 && !(lg || md || sm || xs);

      var xsOnly = xs;
      var smOnly = sm;
      var smAndDown = (xs || sm) && !(md || lg || xl);
      var smAndUp = !xs && (sm || md || lg || xl);
      var mdOnly = md;
      var mdAndDown = (xs || sm || md) && !(lg || xl);
      var mdAndUp = !(xs || sm) && (md || lg || xl);
      var lgOnly = lg;
      var lgAndDown = (xs || sm || md || lg) && !xl;
      var lgAndUp = !(xs || sm || md) && (lg || xl);
      var xlOnly = xl;

      var name = void 0;
      switch (true) {
        case xs:
          name = 'xs';
          break;
        case sm:
          name = 'sm';
          break;
        case md:
          name = 'md';
          break;
        case lg:
          name = 'lg';
          break;
        default:
          name = 'xl';
          break;
      }

      var result = {
        // Definite breakpoint.
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        xl: xl,

        // Useful e.g. to construct CSS class names dynamically.
        name: name,

        // Breakpoint ranges.
        xsOnly: xsOnly,
        smOnly: smOnly,
        smAndDown: smAndDown,
        smAndUp: smAndUp,
        mdOnly: mdOnly,
        mdAndDown: mdAndDown,
        mdAndUp: mdAndUp,
        lgOnly: lgOnly,
        lgAndDown: lgAndDown,
        lgAndUp: lgAndUp,
        xlOnly: xlOnly,

        // For custom breakpoint logic.
        width: this.clientWidth,
        height: this.clientHeight
      };

      return result;
    }
  },

  watch: {
    breakpoint: function breakpoint(val) {
      this.$vuetify.breakpoint = val;
    }
  },

  methods: {
    onResize: function onResize() {
      // Cross-browser support as described in:
      // https://stackoverflow.com/questions/1248081
      this.clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      this.clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (breakpoint);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VAlert__ = __webpack_require__(45);


__WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */]);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VAlert_vue__ = __webpack_require__(47);
function injectStyle (ssrContext) {
  __webpack_require__(46)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VAlert_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_transitionable__ = __webpack_require__(51);







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-alert',

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_transitionable__["a" /* default */]],

  props: {
    dismissible: Boolean,
    hideIcon: Boolean,
    icon: String
  },

  computed: {
    classes: function classes() {
      return {
        'alert': true,
        'alert--dismissible': this.dismissible,
        'error': this.error,
        'info': this.info,
        'primary': this.primary,
        'secondary': this.secondary,
        'success': this.success,
        'warning': this.warning
      };
    },
    mdIcon: function mdIcon() {
      switch (true) {
        case !!this.icon:
          return this.icon;
        case this.error:
          return 'warning';
        case this.info:
          return 'info';
        case this.success:
          return 'check_circle';
        case this.warning:
          return 'priority_high';
      }
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [h('div', this.$slots.default)];

    if (!this.hideIcon && this.mdIcon) {
      children.unshift(h('v-icon', {
        'class': 'alert__icon'
      }, this.mdIcon));
    }

    if (this.dismissible) {
      var close = h('a', {
        'class': 'alert__dismissible',
        domProps: { href: 'javascript:;' },
        on: { click: function click() {
            return _this.$emit('input', false);
          } }
      }, [h('v-icon', {
        props: {
          right: true
        }
      }, 'cancel')]);

      children.push(close);
    }

    var alert = h('div', {
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }, children);

    if (!this.transition) return alert;

    return h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, [alert]);
  }
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VIcon_vue__ = __webpack_require__(50);
function injectStyle (ssrContext) {
  __webpack_require__(49)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VIcon_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 49 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__ = __webpack_require__(12);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-icon',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__["a" /* default */]],

  props: {
    disabled: Boolean,
    fa: Boolean,
    mdi: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        _ref$children = _ref.children,
        children = _ref$children === undefined ? [] : _ref$children;

    if (props.fa || props.mdi) console.warn('The v-icon prop \'fa\' and \'mdi\' will be deprecated in the next release. Use \'fa\' or \'mdi\' prefix in icon name instead.');
    var iconName = '';
    var iconType = 'material-icons';

    if (children.length) {
      iconName = children.pop().text;
    } else if (data.domProps && data.domProps.textContent) {
      iconName = data.domProps.textContent;
      delete data.domProps.textContent;
    } else if (data.domProps && data.domProps.innerHTML) {
      iconName = data.domProps.innerHTML;
      delete data.domProps.innerHTML;
    }

    var thirdPartyIcon = iconName.indexOf('-') > -1;
    if (thirdPartyIcon) iconType = iconName.slice(0, iconName.indexOf('-'));

    // To keep things backwards compatible for now
    iconType = props.fa ? 'fa' : props.mdi ? 'mdi' : iconType;

    data.staticClass = (iconType + ' icon ' + (data.staticClass || '')).trim();
    data.attrs = data.attrs || {};

    var classes = {
      'icon--disabled': props.disabled,
      'icon--large': props.large,
      'icon--left': props.left,
      'icon--medium': props.medium,
      'icon--right': props.right,
      'icon--x-large': props.xLarge,
      'primary--text': props.primary,
      'secondary--text': props.secondary,
      'success--text': props.success,
      'info--text': props.info,
      'warning--text': props.warning,
      'error--text': props.error,
      'theme--dark': props.dark,
      'theme--light': props.light
    };

    var iconClasses = Object.keys(classes).filter(function (k) {
      return classes[k];
    }).join(' ');
    iconClasses && (data.staticClass += ' ' + iconClasses);

    // To keep things backwards compatible for now
    if (props.fa || props.mdi) {
      var comparison = props.fa ? 'fa' : 'mdi';

      if (iconName.indexOf(' ') > -1) data.staticClass += ' ' + comparison + '-' + iconName;else data.staticClass += ' ' + comparison + '-' + iconName.split(' ').join('-');
    }

    if (thirdPartyIcon) data.staticClass += ' ' + iconName;
    !(thirdPartyIcon || props.fa || props.mdi) && children.push(iconName);

    return h('i', data, children);
  }
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    mode: String,
    origin: String,
    transition: String
  }
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VAvatar__ = __webpack_require__(53);


__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */]);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VAvatar_vue__ = __webpack_require__(55);
function injectStyle (ssrContext) {
  __webpack_require__(54)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VAvatar_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 54 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-avatar',

  functional: true,

  props: {
    size: {
      type: String,
      default: '48px'
    },
    tile: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('avatar ' + (data.staticClass || '')).trim();
    data.style = data.style || {};

    if (props.tile) data.staticClass += ' avatar--tile';

    data.style.height = props.size;
    data.style.width = props.size;

    return h('div', data, children);
  }
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBottomNav__ = __webpack_require__(57);


__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */]);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBottomNav_vue__ = __webpack_require__(59);
function injectStyle (ssrContext) {
  __webpack_require__(58)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBottomNav_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 58 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_button_group__ = __webpack_require__(17);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-bottom-nav',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_button_group__["a" /* default */]],

  props: {
    absolute: Boolean,
    active: [Number, String],
    shift: Boolean,
    value: { required: false }
  },

  watch: {
    active: function active() {
      this.update();
    }
  },

  computed: {
    classes: function classes() {
      return {
        'bottom-nav': true,
        'bottom-nav--absolute': this.absolute,
        'bottom-nav--shift': this.shift,
        'bottom-nav--active': this.value
      };
    }
  },

  methods: {
    isSelected: function isSelected(i) {
      var item = this.getValue(i);
      return this.active === item;
    },
    updateValue: function updateValue(i) {
      var item = this.getValue(i);
      this.$emit('update:active', item);
    }
  },

  render: function render(h) {
    return h('div', {
      class: this.classes
    }, this.$slots.default);
  }
});

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBottomSheet__ = __webpack_require__(61);


__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */]);

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBottomSheet_vue__ = __webpack_require__(63);
function injectStyle (ssrContext) {
  __webpack_require__(62)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBottomSheet_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDialog_VDialog__ = __webpack_require__(18);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-bottom-sheet',

  components: {
    VDialog: __WEBPACK_IMPORTED_MODULE_0__VDialog_VDialog__["a" /* default */]
  },

  props: {
    inset: Boolean,
    value: null
  },

  render: function render(h) {
    var activator = h('template', {
      slot: 'activator'
    }, this.$slots.activator);

    var contentClass = ['bottom-sheet', this.inset ? 'bottom-sheet--inset' : ''].join(' ');

    return h(__WEBPACK_IMPORTED_MODULE_0__VDialog_VDialog__["a" /* default */], {
      attrs: _extends({}, this.$attrs),
      on: _extends({}, this.$listeners),
      props: {
        contentClass: contentClass,
        transition: 'bottom-sheet-transition',
        value: this.value
      }
    }, [activator, this.$slots.default]);
  }
});

/***/ }),
/* 64 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_detachable__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_click_outside__ = __webpack_require__(6);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-dialog',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__["a" /* default */]],

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_4__directives_click_outside__["a" /* default */]
  },

  props: {
    disabled: Boolean,
    persistent: Boolean,
    fullscreen: Boolean,
    fullWidth: Boolean,
    lazy: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    width: {
      type: [String, Number],
      default: 290
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition'
    }
  },

  computed: {
    classes: function classes() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, ('dialog ' + this.contentClass).trim(), true), _defineProperty(_ref, 'dialog--active', this.isActive), _defineProperty(_ref, 'dialog--persistent', this.persistent), _defineProperty(_ref, 'dialog--fullscreen', this.fullscreen), _defineProperty(_ref, 'dialog--stacked-actions', this.stackedActions && !this.fullscreen), _defineProperty(_ref, 'dialog--scrollable', this.scrollable), _ref;
    }
  },

  watch: {
    isActive: function isActive(val) {
      if (val) {
        !this.fullscreen && !this.hideOverlay && this.genOverlay();
        this.fullscreen && this.hideScroll();
        this.$refs.content.focus();
      } else {
        if (!this.fullscreen) this.removeOverlay();else this.showScroll();
      }
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.isBooted = this.isActive;
    this.$vuetify.load(function () {
      return _this.isActive && _this.genOverlay();
    });
  },


  methods: {
    closeConditional: function closeConditional(e) {
      // close dialog if !persistent and clicked outside
      return !this.persistent;
    }
  },

  render: function render(h) {
    var _this2 = this;

    var children = [];
    var data = {
      'class': this.classes,
      ref: 'dialog',
      directives: [{ name: 'click-outside', value: this.closeConditional }, { name: 'show', value: this.isActive }]
    };

    if (!this.fullscreen) {
      data.style = {
        width: isNaN(this.width) ? this.width : this.width + 'px'
      };
    }

    if (this.$slots.activator) {
      children.push(h('div', {
        'class': 'dialog__activator',
        on: {
          click: function click(e) {
            e.stopPropagation();
            if (!_this2.disabled) _this2.isActive = !_this2.isActive;
          }
        }
      }, [this.$slots.activator]));
    }

    var dialog = h('transition', {
      props: {
        name: this.transition || '', // If false, show nothing
        origin: this.origin
      }
    }, [h('div', data, this.lazy && this.isBooted || !this.lazy ? this.$slots.default : null)]);

    children.push(h('div', {
      'class': 'dialog__content',
      ref: 'content'
    }, [dialog]));

    return h('div', {
      'class': 'dialog__container',
      style: {
        display: !this.$slots.activator && 'none' || this.fullWidth ? 'block' : 'inline-block'
      }
    }, children);
  }
});

/***/ }),
/* 66 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      overlay: null,
      overlayOffset: 0,
      overlayTimeout: null,
      overlayTransitionDuration: 500
    };
  },


  props: {
    hideOverlay: Boolean
  },

  beforeDestroy: function beforeDestroy() {
    this.removeOverlay();
  },


  methods: {
    genOverlay: function genOverlay() {
      var _this = this;

      // If fn is called and timeout is active
      // or overlay already exists
      // cancel removal of overlay and re-add active
      if (!this.isActive || this.hideOverlay || this.isActive && this.overlayTimeout || this.overlay) {
        clearTimeout(this.overlayTimeout);

        return this.overlay && this.overlay.classList.add('overlay--active');
      }

      this.overlay = document.createElement('div');
      this.overlay.className = 'overlay';
      this.overlay.onclick = function () {
        if (_this.permanent) return;else if (!_this.persistent) _this.isActive = false;else if (_this.isMobile) _this.isActive = false;
      };

      if (this.absolute) this.overlay.className += ' overlay--absolute';

      this.hideScroll();

      if (this.absolute) {
        // Required for IE11
        var parent = this.$el.parentNode;
        parent.insertBefore(this.overlay, parent.firstChild);
      } else {
        document.querySelector('[data-app]').appendChild(this.overlay);
      }

      this.overlay.clientHeight; // Force repaint
      requestAnimationFrame(function () {
        _this.overlay.className += ' overlay--active';
      });

      return true;
    },
    removeOverlay: function removeOverlay() {
      var _this2 = this;

      if (!this.overlay) {
        return this.showScroll();
      }

      this.overlay.classList.remove('overlay--active');

      this.overlayTimeout = setTimeout(function () {
        // IE11 Fix
        try {
          _this2.overlay.parentNode.removeChild(_this2.overlay);
          _this2.overlay = null;
          _this2.showScroll();
        } catch (e) {}

        clearTimeout(_this2.overlayTimeout);
        _this2.overlayTimeout = null;
      }, this.overlayTransitionDuration);
    },
    scrollListener: function scrollListener(e) {
      if (e.type === 'keydown') {
        var up = [38, 33];
        var down = [40, 34];

        if (up.includes(e.keyCode)) {
          e.deltaY = -1;
        } else if (down.includes(e.keyCode)) {
          e.deltaY = 1;
        } else {
          return;
        }
      }

      if (e.target === this.overlay || e.type !== 'keydown' && e.target === document.body || this.checkPath(e)) e.preventDefault();
    },
    composedPath: function composedPath(e) {
      var path = [];
      var el = e.target;

      while (el) {
        path.push(el);

        if (el.tagName === 'HTML') {
          path.push(document);
          path.push(window);

          return path;
        }

        el = el.parentElement;
      }
    },
    hasScrollbar: function hasScrollbar(el) {
      var style = window.getComputedStyle(el);
      return ['auto', 'scroll'].includes(style['overflow-y']);
    },
    shouldScroll: function shouldScroll(el, delta) {
      if (el.scrollTop === 0 && delta < 0) return true;else if (el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0) return true;else return false;
    },
    isInside: function isInside(el, parent) {
      if (el === parent) {
        return true;
      } else if (el === null || el === document.body) {
        return false;
      } else {
        return this.isInside(el.parentNode, parent);
      }
    },
    checkPath: function checkPath(e) {
      var path = e.path || this.composedPath(e);
      var delta = e.deltaY || -e.wheelDelta;

      if (e.type === 'keydown' && path[0] === document.body) {
        var dialog = this.$refs.content.querySelector('.dialog');
        var selected = window.getSelection().anchorNode;
        if (this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta);
        }
        return true;
      }

      for (var i = 0; i < path.length; i++) {
        var el = path[i];

        if (el === document) return true;else if (this.hasScrollbar(el)) {
          return this.shouldScroll(el, delta);
        } else if (el === this.$refs.content) return true;
      }

      return true;
    },
    hideScroll: function hideScroll() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        document.documentElement.style.overflow = 'hidden';
      } else {
        window.addEventListener('mousewheel', this.scrollListener);
        window.addEventListener('keydown', this.scrollListener);
      }
    },
    showScroll: function showScroll() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        document.documentElement.removeAttribute('style');
      } else {
        window.removeEventListener('mousewheel', this.scrollListener);
        window.removeEventListener('keydown', this.scrollListener);
      }
    }
  }
});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__ = __webpack_require__(72);
/* unused harmony reexport VBreadcrumbs */
/* unused harmony reexport VBreadcrumbsItem */





__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */]);

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBreadcrumbs_vue__ = __webpack_require__(71);
function injectStyle (ssrContext) {
  __webpack_require__(70)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBreadcrumbs_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 70 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-breadcrumbs',

  provide: function provide() {
    return {
      divider: this.divider
    };
  },


  props: {
    divider: {
      type: String,
      default: '/'
    },
    icons: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'breadcrumbs': true,
        'breadcrumbs--with-icons': this.icons
      };
    }
  },

  render: function render(h) {
    return h('ul', {
      'class': this.classes,
      props: { items: this.items }
    }, this.$slots.default);
  }
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBreadcrumbsItem_vue__ = __webpack_require__(73);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBreadcrumbsItem_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(14);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-breadcrumbs-item',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_route_link__["a" /* default */]],

  inject: ['divider'],

  props: {
    activeClass: {
      type: String,
      default: 'breadcrumbs__item--disabled'
    }
  },

  computed: {
    classes: function classes() {
      var classes = {
        'breadcrumbs__item': true
      };

      classes[this.activeClass] = this.disabled;

      return classes;
    }
  },

  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    return h('li', {
      attrs: { 'data-divider': this.divider }
    }, [h(tag, data, this.$slots.default)]);
  }
});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBtn_vue__ = __webpack_require__(76);
function injectStyle (ssrContext) {
  __webpack_require__(75)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBtn_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 75 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_positionable__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_route_link__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__ = __webpack_require__(4);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-btn',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_route_link__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__["b" /* factory */])('inputValue')],

  props: {
    activeClass: {
      type: String,
      default: 'btn--active'
    },
    block: Boolean,
    fab: Boolean,
    flat: Boolean,
    icon: Boolean,
    large: Boolean,
    loading: Boolean,
    outline: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    round: Boolean,
    small: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    value: null
  },

  computed: {
    classes: function classes() {
      return _extends({
        'btn': true,
        'btn--active': this.isActive,
        'btn--absolute': this.absolute,
        'btn--block': this.block,
        'btn--bottom': this.bottom,
        'btn--disabled': this.disabled,
        'btn--flat': this.flat,
        'btn--floating': this.fab,
        'btn--fixed': this.fixed,
        'btn--hover': this.hover,
        'btn--icon': this.icon,
        'btn--large': this.large,
        'btn--left': this.left,
        'btn--loader': this.loading,
        'btn--outline': this.outline,
        'btn--raised': !this.flat,
        'btn--right': this.right,
        'btn--round': this.round,
        'btn--small': this.small,
        'btn--top': this.top,
        'primary': this.primary && !this.outline && !this.flat,
        'secondary': this.secondary && !this.outline && !this.flat,
        'success': this.success && !this.outline && !this.flat,
        'info': this.info && !this.outline && !this.flat,
        'warning': this.warning && !this.outline && !this.flat,
        'error': this.error && !this.outline && !this.flat,
        'primary--text': !this.disabled && this.primary && (this.outline || this.flat),
        'secondary--text': !this.disabled && this.secondary && (this.outline || this.flat),
        'success--text': !this.disabled && this.success && (this.outline || this.flat),
        'info--text': !this.disabled && this.info && (this.outline || this.flat),
        'warning--text': !this.disabled && this.warning && (this.outline || this.flat),
        'error--text': !this.disabled && this.error && (this.outline || this.flat)
      }, this.themeClasses);
    }
  },

  methods: {
    // Prevent focus to match md spec
    click: function click(e) {
      !this.fab && e.detail && this.$el.blur();

      this.$emit('click', e);
    },
    genContent: function genContent() {
      return this.$createElement('div', { 'class': 'btn__content' }, [this.$slots.default]);
    },
    genLoader: function genLoader() {
      var children = [];

      if (!this.$slots.loader) {
        children.push(this.$createElement('v-progress-circular', {
          props: {
            indeterminate: true,
            size: 26
          }
        }));
      } else {
        children.push(this.$slots.loader);
      }

      return this.$createElement('span', { 'class': 'btn__loading' }, children);
    }
  },

  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    var children = [this.genContent()];

    tag === 'button' && (data.attrs.type = this.type);
    this.loading && children.push(this.genLoader());

    data.attrs.value = ['string', 'number'].includes(_typeof(this.value)) ? this.value : JSON.stringify(this.value);

    return h(tag, data, children);
  }
});

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtnToggle__ = __webpack_require__(78);


__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */]);

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBtnToggle_vue__ = __webpack_require__(80);
function injectStyle (ssrContext) {
  __webpack_require__(79)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VBtnToggle_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 79 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_button_group__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-btn-toggle',

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_button_group__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  props: {
    inputValue: {
      required: false
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    mandatory: Boolean,
    multiple: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'btn-toggle': true,
        'btn-toggle--selected': this.hasValue,
        'theme--light': this.light,
        'theme--dark': this.dark
      };
    },
    hasValue: function hasValue() {
      return this.multiple && this.inputValue.length || !this.multiple && this.inputValue !== null && typeof this.inputValue !== 'undefined';
    }
  },

  watch: {
    inputValue: {
      handler: function handler() {
        this.update();
      },

      deep: true
    }
  },

  methods: {
    isSelected: function isSelected(i) {
      var item = this.getValue(i);
      if (!this.multiple) {
        return this.inputValue === item;
      }

      return this.inputValue.includes(item);
    },
    updateValue: function updateValue(i) {
      var item = this.getValue(i);
      if (!this.multiple) {
        if (this.mandatory && this.inputValue === item) return;
        return this.$emit('change', this.inputValue === item ? null : item);
      }

      var items = this.inputValue.slice();

      var index = items.indexOf(item);
      if (index > -1) {
        if (this.mandatory && items.length === 1) return;
        items.length >= 1 && items.splice(index, 1);
      } else {
        items.push(item);
      }

      this.$emit('change', items);
    }
  },

  mounted: function mounted() {
    if (this.items.length > 0) {
      console.warn('The \'items\' props has been deprecated. v-btn-toggle now has a default slot where you can place buttons.');
    }
  },
  render: function render(h) {
    return h('div', { class: this.classes }, this.$slots.default);
  }
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VCard_vue__ = __webpack_require__(83);
function injectStyle (ssrContext) {
  __webpack_require__(82)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VCard_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 82 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-card',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  props: {
    flat: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    hover: Boolean,
    img: String,
    raised: Boolean,
    tile: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('card ' + (data.staticClass || '')).trim();
    data.style = data.style || {};
    data.style.height = props.height;

    if (props.flat) data.staticClass += ' card--flat';
    if (props.horizontal) data.staticClass += ' card--horizontal';
    if (props.hover) data.staticClass += ' card--hover';
    if (props.raised) data.staticClass += ' card--raised';
    if (props.tile) data.staticClass += ' card--tile';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    if (props.img) {
      data.style.background = 'url(' + props.img + ') center center / cover no-repeat';
    }

    return h('div', data, children);
  }
});

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-card-media',

  props: {
    contain: Boolean,
    height: {
      type: [Number, String],
      default: 'auto'
    },
    src: {
      type: String
    }
  },

  render: function render(h) {
    var data = {
      'class': 'card__media',
      style: {
        height: !isNaN(this.height) ? this.height + 'px' : this.height
      },
      on: this.$listeners
    };

    var children = [];

    if (this.src) {
      children.push(h('div', {
        'class': 'card__media__background',
        style: {
          background: 'url(' + this.src + ') center center / ' + (this.contain ? 'contain' : 'cover') + ' no-repeat'
        }
      }));
    }

    children.push(h('div', {
      'class': 'card__media__content'
    }, this.$slots.default));

    return h('div', data, children);
  }
});

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-card-title',

  functional: true,

  props: {
    primaryTitle: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('card__title ' + (data.staticClass || '')).trim();

    if (props.primaryTitle) data.staticClass += ' card__title--primary';

    return h('div', data, children);
  }
});

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VCarousel__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCarouselItem__ = __webpack_require__(90);
/* unused harmony reexport VCarousel */
/* unused harmony reexport VCarouselItem */





__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VCarouselItem__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VCarouselItem__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */]);

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VCarousel_vue__ = __webpack_require__(89);
function injectStyle (ssrContext) {
  __webpack_require__(88)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VCarousel_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 88 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_bootable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_touch__ = __webpack_require__(10);









/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-carousel',

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */]],

  directives: { Touch: __WEBPACK_IMPORTED_MODULE_4__directives_touch__["a" /* default */] },

  data: function data() {
    return {
      inputValue: null,
      items: [],
      slideTimeout: null,
      reverse: false
    };
  },


  props: {
    cycle: {
      type: Boolean,
      default: true
    },
    hideControls: Boolean,
    icon: {
      type: String,
      default: 'fiber_manual_record'
    },
    interval: {
      type: [Number, String],
      default: 6000,
      validator: function validator(value) {
        return value > 0;
      }
    },
    leftControlIcon: {
      type: [Boolean, String],
      default: 'chevron_left'
    },
    rightControlIcon: {
      type: [Boolean, String],
      default: 'chevron_right'
    },
    value: Number
  },

  watch: {
    inputValue: function inputValue() {
      var _this = this;

      // Evaluate items when inputValue changes to account for
      // dynamic changing of children
      this.items = this.$children.filter(function (i) {
        return i.$el.classList && i.$el.classList.contains('carousel__item');
      });

      this.items.forEach(function (i) {
        return i.open(_this.items[_this.inputValue]._uid, _this.reverse);
      });

      this.$emit('input', this.inputValue);
      this.restartTimeout();
    },
    value: function value(val) {
      this.inputValue = val;
    },
    interval: function interval() {
      this.restartTimeout();
    },
    cycle: function cycle(val) {
      if (val) {
        this.restartTimeout();
      } else {
        clearTimeout(this.slideTimeout);
        this.slideTimeout = null;
      }
    }
  },

  mounted: function mounted() {
    this.init();
  },


  methods: {
    genControls: function genControls() {
      return this.$createElement('div', {
        staticClass: 'carousel__controls'
      }, this.genItems());
    },
    genIcon: function genIcon(direction, icon, fn) {
      if (!icon) return null;

      return this.$createElement('div', {
        staticClass: 'carousel__' + direction
      }, [this.$createElement(__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */], {
        props: {
          icon: true,
          dark: this.dark || !this.light,
          light: this.light
        },
        on: { click: fn }
      }, [this.$createElement(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */], icon)])]);
    },
    genItems: function genItems() {
      var _this2 = this;

      return this.items.map(function (item, index) {
        return _this2.$createElement(__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */], {
          class: {
            'carousel__controls__item': true,
            'carousel__controls__item--active': index === _this2.inputValue
          },
          props: {
            icon: true,
            dark: _this2.dark || !_this2.light,
            light: _this2.light
          },
          key: index,
          on: { click: _this2.select.bind(_this2, index) }
        }, [_this2.$createElement(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */], _this2.icon)]);
      });
    },
    restartTimeout: function restartTimeout() {
      this.slideTimeout && clearTimeout(this.slideTimeout);
      this.slideTimeout = null;

      var raf = requestAnimationFrame || setTimeout;
      raf(this.startTimeout);
    },
    init: function init() {
      this.inputValue = this.value || 0;
    },
    next: function next() {
      this.reverse = false;
      this.inputValue = (this.inputValue + 1) % this.items.length;
    },
    prev: function prev() {
      this.reverse = true;
      this.inputValue = (this.inputValue + this.items.length - 1) % this.items.length;
    },
    select: function select(index) {
      this.reverse = index < this.inputValue;
      this.inputValue = index;
    },
    startTimeout: function startTimeout() {
      var _this3 = this;

      if (!this.cycle) return;

      this.slideTimeout = setTimeout(function () {
        return _this3.next();
      }, this.interval > 0 ? this.interval : 6000);
    }
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'carousel',
      directives: [{
        name: 'touch',
        value: {
          left: this.next,
          right: this.prev
        }
      }]
    }, [this.genIcon('left', this.leftControlIcon, this.prev), this.genIcon('right', this.rightControlIcon, this.next), this.hideControls ? null : this.genControls(), this.$slots.default]);
  }
});

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-carousel-item',

  data: function data() {
    return {
      active: false,
      reverse: false
    };
  },


  props: {
    src: {
      type: String,
      required: true
    },

    transition: {
      type: String,
      default: 'tab-transition'
    },

    reverseTransition: {
      type: String,
      default: 'tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    },
    styles: function styles() {
      return {
        backgroundImage: 'url(' + this.src + ')'
      };
    }
  },

  methods: {
    open: function open(id, reverse) {
      this.active = this._uid === id;
      this.reverse = reverse;
    }
  },

  render: function render(h) {
    var item = h('div', {
      class: {
        'carousel__item': true,
        'reverse': this.reverse
      },
      style: this.styles,
      on: this.$listeners,
      directives: [{
        name: 'show',
        value: this.active
      }]
    }, [this.$slots.default]);

    return h('transition', { props: { name: this.computedTransition } }, [item]);
  }
});

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VCheckbox_vue__ = __webpack_require__(94);
function injectStyle (ssrContext) {
  __webpack_require__(92)
  __webpack_require__(93)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VCheckbox_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 92 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 93 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_selectable__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_ripple__ = __webpack_require__(7);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-checkbox',

  components: {
    VFadeTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["b" /* VFadeTransition */],
    VIcon: __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]
  },

  directives: {
    Ripple: __WEBPACK_IMPORTED_MODULE_3__directives_ripple__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_selectable__["a" /* default */]],

  data: function data() {
    return {
      inputIndeterminate: this.indeterminate
    };
  },


  props: {
    indeterminate: Boolean
  },

  computed: {
    classes: function classes() {
      return this.addColorClassChecks({
        'checkbox': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive
      });
    },
    icon: function icon() {
      if (this.inputIndeterminate) {
        return 'indeterminate_check_box';
      } else if (this.isActive) {
        return 'check_box';
      } else {
        return 'check_box_outline_blank';
      }
    }
  },

  methods: {
    groupFocus: function groupFocus(e) {
      this.isFocused = true;
      this.$emit('focus', e);
    },
    groupBlur: function groupBlur(e) {
      this.isFocused = false;
      this.tabFocused = false;
      this.$emit('blur', this.inputValue);
    }
  },

  render: function render(h) {
    var transition = h('v-fade-transition', [h('v-icon', {
      'class': {
        'icon--checkbox': this.icon === 'check_box'
      },
      key: this.icon
    }, this.icon)]);

    var ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: Object.assign({}, {
        click: this.toggle
      }, this.$listeners),
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    });

    var data = {
      attrs: {
        tabindex: this.disabled ? -1 : this.internalTabIndex || this.tabindex,
        role: 'checkbox',
        'aria-checked': this.inputIndeterminate && 'mixed' || this.isActive && 'true' || 'false',
        'aria-label': this.label
      }
    };

    return this.genInputGroup([transition, ripple], data);
  }
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = ({
  enter: function enter(el, done) {
    // Remove initial transition
    el.style.transition = 'none';
    Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(el, 'transitionend', done);

    // Get height that is to be scrolled
    el.style.overflow = 'hidden';
    el.style.height = null;
    el.style.display = 'block';
    var height = el.clientHeight + 'px';
    el.style.height = 0;
    el.style.transition = null;

    setTimeout(function () {
      return el.style.height = height;
    }, 100);
  },
  afterEnter: function afterEnter(el) {
    el.style.height = 'auto';
    el.style.overflow = null;
  },
  leave: function leave(el, done) {
    Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(el, 'transitionend', done);

    // Set height before we transition to 0
    el.style.overflow = 'hidden';
    el.style.height = el.clientHeight + 'px';

    setTimeout(function () {
      return el.style.height = 0;
    }, 100);
  }
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      errorBucket: [],
      hasFocused: false,
      hasInput: false,
      shouldValidate: false,
      valid: false
    };
  },


  props: {
    error: {
      type: Boolean
    },
    errorMessages: {
      type: [String, Array],
      default: function _default() {
        return [];
      }
    },
    rules: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    validateOnBlur: Boolean
  },

  computed: {
    validations: function validations() {
      if (!Array.isArray(this.errorMessages)) {
        return [this.errorMessages];
      } else if (this.errorMessages.length > 0) {
        return this.errorMessages;
      } else if (this.shouldValidate) {
        return this.errorBucket;
      } else {
        return [];
      }
    },
    hasError: function hasError() {
      return this.validations.length > 0 || this.errorMessages.length > 0 || this.error;
    }
  },

  watch: {
    rules: {
      handler: function handler(newVal, oldVal) {
        // TODO: This handler seems to trigger when input changes, even though
        // rules array stays the same? Solved it like this for now
        if (newVal.length === oldVal.length) return;

        this.validate();
      },

      deep: true
    },
    inputValue: function inputValue(val) {
      // If it's the first time we're setting input,
      // mark it with hasInput
      if (!!val && !this.hasInput) this.hasInput = true;

      if (this.hasInput && !this.validateOnBlur) this.shouldValidate = true;
    },
    isFocused: function isFocused(val) {
      // If we're not focused, and it's the first time
      // we're defocusing, set shouldValidate to true
      if (!val && !this.hasFocused) {
        this.hasFocused = true;
        this.shouldValidate = true;

        this.$emit('update:error', this.errorBucket.length > 0);
      }
    },
    hasError: function hasError(val) {
      if (this.shouldValidate) {
        this.$emit('update:error', val);
      }
    },
    error: function error(val) {
      this.shouldValidate = !!val;
    }
  },

  mounted: function mounted() {
    this.shouldValidate = !!this.error;
    this.validate();
  },


  methods: {
    reset: function reset() {
      var _this = this;

      // TODO: Do this another way!
      // This is so that we can reset all types of inputs
      this.$emit('input', this.multiple ? [] : null);
      this.$emit('change', null);

      this.$nextTick(function () {
        _this.shouldValidate = false;
        _this.hasFocused = false;
        _this.validate();
      });
    },
    validate: function validate() {
      var _this2 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var value = arguments[1];

      if (force) this.shouldValidate = true;

      this.errorBucket = [];

      this.rules.forEach(function (rule) {
        var valid = typeof rule === 'function' ? rule(typeof value !== 'undefined' ? value : _this2.inputValue) : rule;

        if (valid !== true) {
          _this2.errorBucket.push(valid);
        }
      });

      this.valid = this.errorBucket.length === 0;

      return this.valid;
    }
  }
});

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VChip__ = __webpack_require__(98);


__WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */]);

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VChip_vue__ = __webpack_require__(100);
function injectStyle (ssrContext) {
  __webpack_require__(99)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VChip_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 99 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(4);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-chip',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  props: {
    close: Boolean,
    disabled: Boolean,
    label: Boolean,
    outline: Boolean,
    // Used for selects/tagging
    selected: Boolean,
    small: Boolean,
    value: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes: function classes() {
      return {
        'chip': true,
        'chip--disabled': this.disabled,
        'chip--selected': this.selected,
        'chip--label': this.label,
        'chip--outline': this.outline,
        'chip--small': this.small,
        'chip--removable': this.close,
        'theme--light': this.light,
        'theme--dark': this.dark
      };
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [this.$slots.default];
    var data = {
      'class': this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    };

    if (this.close) {
      var _data = {
        staticClass: 'chip__close',
        on: {
          click: function click(e) {
            e.stopPropagation();

            _this.$emit('input', false);
          }
        }
      };

      children.push(h('div', _data, [h('v-icon', { props: { right: true } }, 'cancel')]));
    }

    return h('span', data, children);
  }
});

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VDataTable__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VEditDialog__ = __webpack_require__(134);





__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */].install = function install(Vue) {
  var VTableOverflow = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('table__overflow');

  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VEditDialog__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VEditDialog__["a" /* default */]);
  Vue.component('v-table-overflow', VTableOverflow);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */]);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VDataTable_vue__ = __webpack_require__(105);
function injectStyle (ssrContext) {
  __webpack_require__(103)
  __webpack_require__(104)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VDataTable_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 103 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 104 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VProgressLinear__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VSelect__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_filterable__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_head__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_body__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_foot__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mixins_progress__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util_helpers__ = __webpack_require__(2);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };















/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-data-table',

  components: {
    VBtn: __WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */],
    VIcon: __WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */],
    VProgressLinear: __WEBPACK_IMPORTED_MODULE_2__VProgressLinear__["a" /* default */],
    VSelect: __WEBPACK_IMPORTED_MODULE_3__VSelect__["a" /* default */],
    // Importing does not work properly
    'v-table-overflow': Object(__WEBPACK_IMPORTED_MODULE_10__util_helpers__["d" /* createSimpleFunctional */])('table__overflow')
  },

  data: function data() {
    return {
      all: false,
      searchLength: 0,
      defaultPagination: {
        page: 1,
        rowsPerPage: 5,
        descending: false,
        totalItems: 0
      }
    };
  },


  mixins: [__WEBPACK_IMPORTED_MODULE_6__mixins_head__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__mixins_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_filterable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__mixins_foot__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9__mixins_progress__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_themeable__["a" /* default */]],

  props: {
    headers: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    headerText: {
      type: String,
      default: 'text'
    },
    hideActions: Boolean,
    noResultsText: {
      type: String,
      default: 'No matching records found'
    },
    rowsPerPageItems: {
      type: Array,
      default: function _default() {
        return [5, 10, 25, { text: 'All', value: -1 }];
      }
    },
    rowsPerPageText: {
      type: String,
      default: 'Rows per page:'
    },
    selectAll: [Boolean, String],
    search: {
      required: false
    },
    filter: {
      type: Function,
      default: function _default(val, search) {
        return val !== null && ['undefined', 'boolean'].indexOf(typeof val === 'undefined' ? 'undefined' : _typeof(val)) === -1 && val.toString().toLowerCase().indexOf(search) !== -1;
      }
    },
    customFilter: {
      type: Function,
      default: function _default(items, search, filter) {
        search = search.toString().toLowerCase();
        return items.filter(function (i) {
          return Object.keys(i).some(function (j) {
            return filter(i[j], search);
          });
        });
      }
    },
    customSort: {
      type: Function,
      default: function _default(items, index, isDescending) {
        if (index === null) return items;

        return items.sort(function (a, b) {
          var sortA = Object(__WEBPACK_IMPORTED_MODULE_10__util_helpers__["g" /* getObjectValueByPath */])(a, index);
          var sortB = Object(__WEBPACK_IMPORTED_MODULE_10__util_helpers__["g" /* getObjectValueByPath */])(b, index);

          if (isDescending) {
            var _ref = [sortB, sortA];
            sortA = _ref[0];
            sortB = _ref[1];
          }

          // Check if both are numbers
          if (!isNaN(sortA) && !isNaN(sortB)) {
            return sortA - sortB;
          }

          // Check if both cannot be evaluated
          if (sortA === null && sortB === null) {
            return 0;
          }

          var _map = [sortA, sortB].map(function (s) {
            return (s || '').toString().toLocaleLowerCase();
          });

          var _map2 = _slicedToArray(_map, 2);

          sortA = _map2[0];
          sortB = _map2[1];


          if (sortA > sortB) return 1;
          if (sortA < sortB) return -1;

          return 0;
        });
      }
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    items: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      }
    },
    totalItems: {
      type: Number,
      default: null
    },
    loading: {
      type: [Boolean, String],
      default: false
    },
    selectedKey: {
      type: String,
      default: 'id'
    },
    pagination: {
      type: Object,
      default: null
    }
  },

  computed: {
    classes: function classes() {
      return {
        'datatable table': true,
        'datatable--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    },
    computedPagination: function computedPagination() {
      return this.pagination || this.defaultPagination;
    },
    hasSelectAll: function hasSelectAll() {
      return this.selectAll !== undefined && this.selectAll !== false;
    },
    itemsLength: function itemsLength() {
      if (this.search) return this.searchLength;
      return this.totalItems || this.items.length;
    },
    indeterminate: function indeterminate() {
      return this.hasSelectAll && this.someItems && !this.everyItem;
    },
    everyItem: function everyItem() {
      var _this = this;

      return this.filteredItems.length && this.filteredItems.every(function (i) {
        return _this.isSelected(i);
      });
    },
    someItems: function someItems() {
      var _this2 = this;

      return this.filteredItems.some(function (i) {
        return _this2.isSelected(i);
      });
    },
    getPage: function getPage() {
      var rowsPerPage = this.computedPagination.rowsPerPage;


      return rowsPerPage === Object(rowsPerPage) ? rowsPerPage.value : rowsPerPage;
    },
    pageStart: function pageStart() {
      return this.getPage === -1 ? 0 : (this.computedPagination.page - 1) * this.getPage;
    },
    pageStop: function pageStop() {
      return this.getPage === -1 ? this.itemsLength : this.computedPagination.page * this.getPage;
    },
    filteredItems: function filteredItems() {
      if (this.totalItems) return this.items;

      var items = this.items.slice();
      var hasSearch = typeof this.search !== 'undefined' && this.search !== null;

      if (hasSearch) {
        items = this.customFilter(items, this.search, this.filter);
        this.searchLength = items.length;
      }

      items = this.customSort(items, this.computedPagination.sortBy, this.computedPagination.descending);

      return this.hideActions && !this.pagination ? items : items.slice(this.pageStart, this.pageStop);
    },
    selected: function selected() {
      var _this3 = this;

      var selected = {};
      this.value.forEach(function (i) {
        return selected[i[_this3.selectedKey]] = true;
      });
      return selected;
    }
  },

  watch: {
    indeterminate: function indeterminate(val) {
      if (val) this.all = true;
    },
    someItems: function someItems(val) {
      if (!val) this.all = false;
    },
    search: function search() {
      this.updatePagination({ page: 1, totalItems: this.itemsLength });
    },
    everyItem: function everyItem(val) {
      if (val) this.all = true;
    }
  },

  methods: {
    updatePagination: function updatePagination(val) {
      var pagination = this.pagination || this.defaultPagination;
      var updatedPagination = Object.assign({}, pagination, val);

      if (this.pagination) {
        this.$emit('update:pagination', updatedPagination);
      } else {
        this.defaultPagination = updatedPagination;
      }
    },
    isSelected: function isSelected(item) {
      return this.selected[item[this.selectedKey]];
    },
    sort: function sort(index) {
      var _computedPagination = this.computedPagination,
          sortBy = _computedPagination.sortBy,
          descending = _computedPagination.descending;

      if (sortBy === null) {
        this.updatePagination({ sortBy: index, descending: false });
      } else if (sortBy === index && !descending) {
        this.updatePagination({ descending: true });
      } else if (sortBy !== index) {
        this.updatePagination({ sortBy: index, descending: false });
      } else {
        this.updatePagination({ sortBy: null, descending: null });
      }
    },
    needsTR: function needsTR(row) {
      return row.length && row.find(function (c) {
        return c.tag === 'td';
      });
    },
    genTR: function genTR(children) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.$createElement('tr', data, children);
    },
    toggle: function toggle(value) {
      var _this4 = this;

      var selected = Object.assign({}, this.selected);
      this.filteredItems.forEach(function (i) {
        return selected[i[_this4.selectedKey]] = value;
      });

      this.$emit('input', this.items.filter(function (i) {
        return selected[i[_this4.selectedKey]];
      }));
    }
  },

  created: function created() {
    var firstSortable = this.headers.find(function (h) {
      return !('sortable' in h) || h.sortable;
    });

    this.defaultPagination.sortBy = firstSortable ? firstSortable.value : null;

    if (!this.rowsPerPageItems.length) {
      console.warn('The prop \'rows-per-page-items\' in v-data-table can not be empty.');
    } else {
      this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0];
    }

    this.defaultPagination.totalItems = this.itemsLength;

    this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination));
  },
  render: function render(h) {
    return h('v-table-overflow', {}, [h('table', {
      'class': this.classes
    }, [this.genTHead(), this.genTProgress(), this.genTBody(), this.genTFoot()])]);
  }
});

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VProgressLinear_vue__ = __webpack_require__(108);
function injectStyle (ssrContext) {
  __webpack_require__(107)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VProgressLinear_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 107 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-progress-linear',

  components: {
    VFadeTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["b" /* VFadeTransition */],
    VSlideXTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["c" /* VSlideXTransition */]
  },

  props: {
    active: {
      type: Boolean,
      default: true
    },
    buffer: Boolean,
    bufferValue: Number,
    error: Boolean,
    height: {
      type: [Number, String],
      default: 7
    },
    indeterminate: Boolean,
    info: Boolean,
    secondary: Boolean,
    success: Boolean,
    query: Boolean,
    warning: Boolean,
    value: {
      type: [Number, String],
      default: 0
    },
    colorFront: {
      type: String,
      default: null
    },
    colorBack: {
      type: String,
      default: null
    }
  },

  computed: {
    classes: function classes() {
      return {
        'progress-linear--query': this.query,
        'progress-linear--secondary': this.secondary,
        'progress-linear--success': this.success,
        'progress-linear--info': this.info,
        'progress-linear--warning': this.warning,
        'progress-linear--error': this.error
      };
    },
    styles: function styles() {
      var styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      if (this.buffer) {
        styles.width = this.bufferValue + '%';
      }

      return styles;
    },
    bufferStyles: function bufferStyles() {
      var styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      return styles;
    }
  },

  methods: {
    genDeterminate: function genDeterminate(h) {
      return h('div', {
        ref: 'front',
        class: ['progress-linear__bar__determinate', this.colorFront],
        style: { width: this.value + '%' }
      });
    },
    genBar: function genBar(h, name) {
      return h('div', {
        class: ['progress-linear__bar__indeterminate', name, this.colorFront]
      });
    },
    genIndeterminate: function genIndeterminate(h) {
      return h('div', {
        ref: 'front',
        class: {
          'progress-linear__bar__indeterminate': true,
          'progress-linear__bar__indeterminate--active': this.active
        }
      }, [this.genBar(h, 'long'), this.genBar(h, 'short')]);
    }
  },

  render: function render(h) {
    var fade = h('v-fade-transition', [this.indeterminate && this.genIndeterminate(h)]);
    var slide = h('v-slide-x-transition', [!this.indeterminate && this.genDeterminate(h)]);

    var bar = h('div', { class: ['progress-linear__bar', this.colorBack], style: this.styles }, [fade, slide]);

    return h('div', {
      class: ['progress-linear', this.classes],
      style: { height: this.height + 'px' },
      on: this.$listeners
    }, [bar]);
  }
});

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSelect_vue__ = __webpack_require__(113);
function injectStyle (ssrContext) {
  __webpack_require__(110)
  __webpack_require__(111)
  __webpack_require__(112)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSelect_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 111 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 112 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCard__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VCheckbox__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VList__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VMenu__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_filterable__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_input__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_autocomplete__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_generators__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_click_outside__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }















/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-select',

  inheritAttrs: false,

  components: {
    VCard: __WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */],
    VCheckbox: __WEBPACK_IMPORTED_MODULE_2__VCheckbox__["a" /* default */],
    VList: __WEBPACK_IMPORTED_MODULE_3__VList__["a" /* VList */],
    VListTile: __WEBPACK_IMPORTED_MODULE_3__VList__["b" /* VListTile */],
    VListTileAction: __WEBPACK_IMPORTED_MODULE_3__VList__["c" /* VListTileAction */],
    VListTileContent: __WEBPACK_IMPORTED_MODULE_3__VList__["d" /* VListTileContent */],
    VListTileTitle: __WEBPACK_IMPORTED_MODULE_3__VList__["e" /* VListTileTitle */],
    VMenu: __WEBPACK_IMPORTED_MODULE_4__VMenu__["a" /* default */]
  },

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_9__directives_click_outside__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_7__mixins_autocomplete__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_filterable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__mixins_generators__["a" /* default */]],

  data: function data() {
    return {
      cachedItems: [],
      content: {},
      inputValue: (this.multiple || this.tags) && !this.value ? [] : this.value,
      isBooted: false,
      lastItem: 20,
      lazySearch: null,
      isActive: false,
      menuIsActive: false,
      searchTimeout: null,
      selectedIndex: -1,
      selectedItems: [],
      shouldBreak: false
    };
  },


  props: {
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    appendIconCb: Function,
    auto: Boolean,
    autocomplete: Boolean,
    bottom: Boolean,
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    close: Boolean,
    debounceSearch: {
      type: [Number, String],
      default: 200
    },
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    itemDisabled: {
      type: String,
      default: 'disabled'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    minWidth: {
      type: [Boolean, Number, String],
      default: false
    },
    multiple: Boolean,
    multiLine: Boolean,
    offset: Boolean,
    solo: Boolean,
    searchInput: {
      default: null
    },
    singleLine: Boolean,
    tags: Boolean,
    top: Boolean,
    returnObject: Boolean,
    overflow: Boolean,
    segmented: Boolean,
    editable: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'input-group--text-field input-group--select': true,
        'input-group--auto': this.auto,
        'input-group--overflow': this.overflow,
        'input-group--segmented': this.segmented,
        'input-group--editable': this.editable,
        'input-group--autocomplete': this.isAutocomplete,
        'input-group--single-line': this.singleLine || this.isDropdown,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips,
        'input-group--solo': this.solo,
        'input-group--multiple': this.multiple
      };
    },
    computedContentClass: function computedContentClass() {
      var children = ['menu__content--select', this.auto ? 'menu__content--auto' : '', this.isDropdown ? 'menu__content--dropdown' : '', this.isAutocomplete ? 'menu__content--autocomplete' : ''];

      return children.join(' ');
    },
    computedItems: function computedItems() {
      return this.filterDuplicates(this.items.concat(this.cachedItems));
    },
    filteredItems: function filteredItems() {
      // If we are not actively filtering
      // Show all available items
      var items = this.isAutocomplete && this.isDirty && this.searchValue === this.selectedItem ? this.computedItems : this.filterSearch();

      return !this.auto ? items.slice(0, this.lastItem) : items;
    },
    hideSelections: function hideSelections() {
      return this.isAutocomplete && !this.isMultiple && this.isFocused && this.isDirty && !this.chips;
    },
    isAutocomplete: function isAutocomplete() {
      return this.autocomplete || this.editable || this.tags;
    },
    isDirty: function isDirty() {
      return this.selectedItems.length > 0;
    },
    isDropdown: function isDropdown() {
      return this.segmented || this.overflow || this.editable || this.solo;
    },
    isMultiple: function isMultiple() {
      return this.multiple || this.tags;
    },

    searchValue: {
      get: function get() {
        return this.lazySearch;
      },
      set: function set(val) {
        var _this = this;

        if (!this.isAutocomplete || this.selectedIndex > -1) return;

        this.lazySearch = val;

        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(function () {
          _this.$emit('update:searchInput', val);
        }, this.debounceSearch);
      }
    },
    selectedItem: function selectedItem() {
      var _this2 = this;

      if (this.isMultiple) return null;

      return this.selectedItems.find(function (i) {
        return _this2.getValue(i) === _this2.getValue(_this2.inputValue);
      }) || null;
    }
  },

  watch: {
    inputValue: function inputValue(val) {
      // Populate selected items
      this.genSelectedItems(val);

      this.$emit('input', val);
    },
    isActive: function isActive(val) {
      if (!val) {
        this.searchValue = null;
        this.menuIsActive = false;
        this.isFocused = false;
        this.selectedIndex = -1;
      } else {
        this.searchValue = this.getText(this.selectedItem);
      }

      // this.lastItem += !val ? 20 : 0
    },
    isBooted: function isBooted() {
      var _this3 = this;

      this.$nextTick(function () {
        if (_this3.content) {
          _this3.content.addEventListener('scroll', _this3.onScroll, false);
        }
      });
    },
    items: function items(val) {
      var _this4 = this;

      if (this.cacheItems) {
        this.cachedItems = this.returnObject ? [].concat(_toConsumableArray(val)) : this.filterDuplicates(this.cachedItems.concat(val));
      }

      this.$refs.menu.listIndex = -1;

      this.searchValue && this.$nextTick(function () {
        _this4.$refs.menu.listIndex = 0;
      });
    },
    menuIsActive: function menuIsActive(val) {
      if (!val) return;

      this.isBooted = true;
      this.isActive = true;
    },
    isMultiple: function isMultiple(val) {
      this.inputValue = val ? [] : null;
    },
    searchValue: function searchValue(val) {
      var _this5 = this;

      // Wrap input to next line if overflowing
      if (this.$refs.input.scrollWidth > this.$refs.input.clientWidth) {
        this.shouldBreak = true;
        this.$nextTick(this.$refs.menu.updateDimensions);
      } else if (val === null) {
        this.shouldBreak = false;
      }

      // Activate menu if inactive and searching
      if (this.isActive && !this.menuIsActive && val !== this.getValue(this.selectedItem)) {
        this.menuIsActive = true;
      }

      this.$refs.menu.listIndex = null;

      this.$nextTick(function () {
        _this5.$refs.menu.listIndex = val ? 0 : -1;
      });
    },
    selectedItems: function selectedItems() {
      clearTimeout(this.searchTimeout);

      if (this.isAutocomplete) {
        this.$nextTick(this.$refs.menu.updateDimensions);
      }
    },
    value: function value(val) {
      this.inputValue = val;
      this.validate();
    }
  },

  created: function created() {
    if (this.tags) this.selectedItems = this.inputValue;
  },
  mounted: function mounted() {
    var _this6 = this;

    this.$vuetify.load(function () {
      if (_this6._isDestroyed) return;

      _this6.content = _this6.$refs.menu.$refs.content;
      _this6.genSelectedItems();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isBooted) {
      if (this.content) {
        this.content.removeEventListener('scroll', this.onScroll, false);
      }
    }
  },


  methods: {
    blur: function blur() {
      var _this7 = this;

      this.$emit('blur');
      if (this.isAutocomplete && this.$refs.input) this.$refs.input.blur();
      this.$nextTick(function () {
        return _this7.isActive = false;
      });
    },
    changeSelectedIndex: function changeSelectedIndex(keyCode) {
      if (keyCode === 32 || ![8, 37, 39, 46].includes(keyCode)) return;

      var indexes = this.selectedItems.length - 1;

      if (keyCode === 37) {
        this.selectedIndex = this.selectedIndex === -1 ? indexes : this.selectedIndex - 1;
      } else if (keyCode === 39) {
        this.selectedIndex = this.selectedIndex >= indexes ? -1 : this.selectedIndex + 1;
      } else if (this.selectedIndex === -1) {
        this.selectedIndex = indexes;
        return;
      }

      if (![8, 46].includes(keyCode)) return;
      var newIndex = this.selectedIndex === indexes ? this.selectedIndex - 1 : this.selectedItems[this.selectedIndex + 1] ? this.selectedIndex : -1;

      this.selectItem(this.selectedItems[this.selectedIndex]);
      this.selectedIndex = newIndex;
    },
    compareObjects: function compareObjects(a, b) {
      var aProps = Object.keys(a);
      var bProps = Object.keys(b);

      if (aProps.length !== bProps.length) return false;

      for (var i = 0, length = aProps.length; i < length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) return false;
      }

      return true;
    },
    filterDuplicates: function filterDuplicates(arr) {
      return arr.filter(function (el, i, self) {
        return i === self.indexOf(el);
      });
    },
    focus: function focus() {
      this.isActive = true;
      this.isFocused = true;

      if (this.$refs.input && this.isAutocomplete) {
        this.$nextTick(function () {
          // this.$refs.input.focus()
        });
      }

      this.$emit('focus');
    },
    genDirectives: function genDirectives() {
      var _this8 = this;

      return [{
        name: 'click-outside',
        value: function value() {
          return _this8.isActive = false;
        }
      }];
    },
    genListeners: function genListeners() {
      var _this9 = this;

      var listeners = Object.assign({}, this.$listeners);
      delete listeners.input;

      return _extends({}, listeners, {
        click: function click() {
          if (_this9.disabled || _this9.readonly) return;
          _this9.showMenuItems();
          _this9.selectedIndex = -1;
        },
        focus: function focus() {
          if (_this9.disabled || _this9.readonly) return;

          !_this9.isFocused && _this9.focus();
        },
        keydown: this.onKeyDown // Located in mixins/autocomplete.js
      });
    },
    genLabel: function genLabel() {
      var singleLine = this.singleLine || this.isDropdown;
      if (singleLine && this.isDirty || singleLine && this.isFocused && this.searchValue) return null;

      var data = {};

      if (this.id) data.attrs = { for: this.id };

      return this.$createElement('label', data, this.$slots.label || this.label);
    },
    getPropertyFromItem: function getPropertyFromItem(item, field) {
      if (item !== Object(item)) return item;

      var value = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["g" /* getObjectValueByPath */])(item, field);

      return typeof value === 'undefined' ? item : value;
    },
    genSelectedItems: function genSelectedItems(val) {
      var _this10 = this;

      val = val || this.inputValue;

      // If we are using tags, don't filter results
      if (this.tags) return this.selectedItems = val;

      var selectedItems = this.computedItems.filter(function (i) {
        if (!_this10.isMultiple) {
          return _this10.getValue(i) === _this10.getValue(val);
        } else {
          // Always return Boolean
          return val.find(function (j) {
            var a = _this10.getValue(j);
            var b = _this10.getValue(i);

            if (a !== Object(a)) return a === b;

            return _this10.compareObjects(a, b);
          }) !== undefined;
        }
      });

      if (!selectedItems.length && val != null && this.tags) {
        selectedItems = Array.isArray(val) ? val : [val];
      }

      this.selectedItems = selectedItems;
    },
    getText: function getText(item) {
      return this.getPropertyFromItem(item, this.itemText);
    },
    getValue: function getValue(item) {
      return this.getPropertyFromItem(item, this.itemValue);
    },
    clearableCallback: function clearableCallback() {
      var inputValue = this.isMultiple ? [] : null;

      this.inputValue = inputValue;
      this.searchValue = null;
      this.$emit('change', inputValue);
      this.genSelectedItems();
      this.showMenu();
    },
    showMenu: function showMenu() {
      this.showMenuItems();
      this.isAutocomplete && this.focus();
    },
    onScroll: function onScroll() {
      var _this11 = this;

      if (!this.isActive) {
        requestAnimationFrame(function () {
          return _this11.content.scrollTop = 0;
        });
      } else {
        var showMoreItems = this.content.scrollHeight - (this.content.scrollTop + this.content.clientHeight) < 200;

        if (showMoreItems) {
          this.lastItem += 20;
        }
      }
    },
    selectItem: function selectItem(item) {
      var _this12 = this;

      if (!this.isMultiple) {
        this.inputValue = this.returnObject ? item : this.getValue(item);
        this.selectedItems = [item];
      } else {
        var selectedItems = [];
        var inputValue = this.inputValue.slice();
        var i = this.inputValue.findIndex(function (i) {
          var a = _this12.getValue(i);
          var b = _this12.getValue(item);

          if (a !== Object(a)) return a === b;

          return _this12.compareObjects(a, b);
        });

        i !== -1 && inputValue.splice(i, 1) || inputValue.push(item);
        this.inputValue = inputValue.map(function (i) {
          selectedItems.push(i);
          return _this12.returnObject ? i : _this12.getValue(i);
        });

        this.selectedItems = selectedItems;
      }

      this.searchValue = !this.isMultiple || this.chips ? this.getText(this.selectedItem) : '';

      this.$emit('change', this.inputValue);

      // List tile will re-render, reset index to
      // maintain highlighting
      var savedIndex = this.$refs.menu.listIndex;
      this.$refs.menu.listIndex = -1;

      this.$nextTick(function () {
        if (_this12.isAutocomplete && _this12.$refs.input) _this12.$refs.input.focus();else _this12.$el.focus();
        _this12.$refs.menu.listIndex = savedIndex;
      });
    },
    showMenuItems: function showMenuItems() {
      this.isActive = true;
      this.menuIsActive = true;
    }
  },

  render: function render(h) {
    var _this13 = this;

    var data = {
      attrs: _extends({
        tabindex: this.isAutocomplete || this.disabled ? -1 : this.tabindex
      }, this.isAutocomplete ? null : this.$attrs, {
        role: this.isAutocomplete ? null : 'combobox'
      })
    };

    if (!this.isAutocomplete) {
      data.on = this.genListeners();
      data.directives = this.genDirectives();
    } else {
      data.on = {
        click: function click() {
          if (_this13.disabled || _this13.readonly) return;

          // Workaround for clicking select
          // when using autocomplete
          // and click doesn't target the input
          setTimeout(function () {
            if (_this13.menuIsActive) return;

            _this13.focus();
            _this13.menuIsActive = true;
          }, 100);
        }
      };
    }

    return this.genInputGroup([this.genSelectionsAndSearch(), this.genMenu()], data, function () {
      return _this13.showMenu();
    });
  }
});

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VList_vue__ = __webpack_require__(116);
function injectStyle (ssrContext) {
  __webpack_require__(115)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VList_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 115 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-list',

  provide: function provide() {
    return {
      listClick: this.listClick,
      listClose: this.listClose
    };
  },


  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  data: function data() {
    return {
      uid: null,
      groups: []
    };
  },


  props: {
    dense: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'list': true,
        'list--two-line': this.twoLine,
        'list--dense': this.dense,
        'list--three-line': this.threeLine,
        'list--subheader': this.subheader,
        'theme--dark dark--bg': this.dark,
        'theme--light light--bg': this.light
      };
    }
  },

  watch: {
    uid: function uid() {
      var _this = this;

      this.$children.filter(function (i) {
        return i.$options._componentTag === 'v-list-group';
      }).forEach(function (i) {
        return i.toggle(_this.uid);
      });
    }
  },

  methods: {
    listClick: function listClick(uid, force) {
      if (force) {
        this.uid = uid;
      } else {
        this.uid = this.uid === uid ? null : uid;
      }
    },
    listClose: function listClose(uid) {
      if (this.uid === uid) {
        this.uid = null;
      }
    }
  },

  render: function render(h) {
    var data = {
      'class': this.classes,
      attrs: { 'data-uid': this._uid }
    };

    return h('ul', data, [this.$slots.default]);
  }
});

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(4);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-list-group',

  inject: ['listClick', 'listClose'],

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  data: function data() {
    return {
      isBooted: this.value
    };
  },


  props: {
    group: String,
    lazy: Boolean,
    noAction: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'list--group__header': true,
        'list--group__header--active': this.isActive,
        'list--group__header--no-action': this.noAction
      };
    }
  },

  watch: {
    isActive: function isActive() {
      this.isBooted = true;

      if (!this.isActive) {
        this.listClose(this._uid);
      }
    },
    $route: function $route(to) {
      var isActive = this.matchRoute(to.path);

      if (this.group) {
        if (isActive && this.isActive !== isActive) {
          this.listClick(this._uid);
        }
        this.isActive = isActive;
      }
    }
  },

  mounted: function mounted() {
    if (this.group) {
      this.isActive = this.matchRoute(this.$route.path);
    }

    if (this.isActive) {
      this.listClick(this._uid);
    }
  },


  methods: {
    click: function click() {
      var _this = this;

      if (!this.$refs.item.querySelector('.list__tile--disabled')) {
        requestAnimationFrame(function () {
          return _this.listClick(_this._uid);
        });
      }
    },
    toggle: function toggle(uid) {
      this.isActive = this._uid === uid;
    },
    matchRoute: function matchRoute(to) {
      if (!this.group) return false;
      return to.match(this.group) !== null;
    }
  },

  render: function render(h) {
    var group = h('ul', {
      'class': 'list list--group',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      ref: 'group'
    }, [this.lazy && !this.isBooted ? null : this.$slots.default]);

    var item = h('div', {
      'class': this.classes,
      on: Object.assign({}, { click: this.click }, this.$listeners),
      ref: 'item'
    }, [this.$slots.item]);

    var transition = h(__WEBPACK_IMPORTED_MODULE_0__transitions__["a" /* VExpandTransition */], [group]);

    return h('div', { 'class': 'list--group__container' }, [item, transition]);
  }
});

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_ripple__ = __webpack_require__(7);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-list-tile',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_route_link__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  directives: {
    Ripple: __WEBPACK_IMPORTED_MODULE_2__directives_ripple__["a" /* default */]
  },

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default: 'list__tile--active'
    },
    avatar: Boolean,
    tag: String
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'list__tile': true,
        'list__tile--link': this.isLink,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled
      }, this.activeClass, this.isActive);
    },
    isLink: function isLink() {
      return this.href || this.to || this.$listeners && (this.$listeners.click || this.$listeners['!click']);
    }
  },

  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    var newTag = tag;

    data.attrs = Object.assign({}, data.attrs, this.$attrs);

    if (!this.href && !this.to && !this.tag) newTag = 'div';

    return h('li', {
      attrs: {
        disabled: this.disabled
      },
      on: _extends({}, this.$listeners)
    }, [h(newTag, data, this.$slots.default)]);
  }
});

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  functional: true,

  name: 'v-list-tile-action',

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;

    data.staticClass = data.staticClass ? 'list__tile__action ' + (data.staticClass || '') : 'list__tile__action';
    if ((children || []).length > 1) data.staticClass += ' list__tile__action--stack';

    return h('div', data, children);
  }
});

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VMenu_vue__ = __webpack_require__(122);
function injectStyle (ssrContext) {
  __webpack_require__(121)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VMenu_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 121 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_detachable__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_activator__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_generators__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_position__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_utils__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_keyable__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_click_outside__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_resize__ = __webpack_require__(8);












/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-menu',

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_activator__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_generators__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_keyable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_position__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_utils__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_7__directives_click_outside__["a" /* default */],
    Resize: __WEBPACK_IMPORTED_MODULE_8__directives_resize__["a" /* default */]
  },

  data: function data() {
    return {
      autoIndex: null,
      defaultOffset: 8,
      dimensions: {
        activator: {
          top: 0, left: 0,
          bottom: 0, right: 0,
          width: 0, height: 0,
          offsetTop: 0, scrollHeight: 0
        },
        content: {
          top: 0, left: 0,
          bottom: 0, right: 0,
          width: 0, height: 0,
          offsetTop: 0, scrollHeight: 0
        },
        list: null,
        selected: null
      },
      direction: { vert: 'bottom', horiz: 'right' },
      isContentActive: false,
      isBooted: false,
      maxHeightAutoDefault: '200px',
      startIndex: 3,
      stopIndex: 0,
      tileLength: 0,
      window: {},
      absoluteX: 0,
      absoluteY: 0,
      pageYOffset: 0,
      insideContent: false,
      hasJustFocused: false,
      focusedTimeout: {}
    };
  },


  props: {
    allowOverflow: Boolean,
    top: Boolean,
    left: Boolean,
    bottom: Boolean,
    right: Boolean,
    fullWidth: Boolean,
    auto: Boolean,
    offsetX: Boolean,
    offsetY: Boolean,
    disabled: Boolean,
    maxHeight: {
      default: 'auto'
    },
    nudgeTop: {
      type: Number,
      default: 0
    },
    nudgeBottom: {
      type: Number,
      default: 0
    },
    nudgeLeft: {
      type: Number,
      default: 0
    },
    nudgeRight: {
      type: Number,
      default: 0
    },
    nudgeWidth: {
      type: Number,
      default: 0
    },
    openOnClick: {
      type: Boolean,
      default: true
    },
    openOnHover: {
      type: Boolean,
      default: false
    },
    lazy: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    activator: {
      default: null
    },
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: [Boolean, String],
      default: 'menu-transition'
    },
    positionX: {
      type: Number,
      default: null
    },
    positionY: {
      type: Number,
      default: null
    },
    positionAbsolutely: {
      type: Boolean,
      default: false
    },
    maxWidth: [Number, String],
    minWidth: [Number, String],
    zIndex: {
      type: [Number, String],
      default: 6
    }
  },

  computed: {
    calculatedMinWidth: function calculatedMinWidth() {
      var minWidth = parseInt(this.minWidth) || this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0);

      if (!this.maxWidth) return minWidth;

      var maxWidth = parseInt(this.maxWidth);

      return maxWidth < minWidth ? maxWidth : minWidth;
    },
    styles: function styles() {
      return {
        maxHeight: this.auto ? '200px' : isNaN(this.maxHeight) ? this.maxHeight : this.maxHeight + 'px',
        minWidth: this.calculatedMinWidth + 'px',
        maxWidth: parseInt(this.maxWidth) + 'px',
        top: this.calcYOverflow(this.calcTop()) + 'px',
        left: this.calcXOverflow(this.calcLeft()) + 'px',
        transformOrigin: this.origin,
        zIndex: this.zIndex
      };
    },
    hasActivator: function hasActivator() {
      return !!this.$slots.activator || this.activator;
    }
  },

  watch: {
    activator: function activator(newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator);
      this.addActivatorEvents(newActivator);
    },
    disabled: function disabled(val) {
      val && this.deactivate();
    },
    isContentActive: function isContentActive(val) {
      this.hasJustFocused = val;
    },
    isActive: function isActive(val) {
      if (this.disabled) return;

      val && this.activate() || this.deactivate();
    }
  },

  methods: {
    activate: function activate() {
      if (typeof window === 'undefined') return;
      this.pageYOffset = this.getOffsetTop();
      this.isBooted = true;
      this.insideContent = true;
      this.getTiles();
      this.updateDimensions();
      requestAnimationFrame(this.startTransition);
    },
    deactivate: function deactivate() {
      this.isContentActive = false;
    },
    onResize: function onResize() {
      if (!this.isActive) return;

      this.updateDimensions();
    },
    getOffsetTop: function getOffsetTop() {
      if (typeof window === 'undefined') return 0;

      return window.pageYOffset || document.documentElement.scrollTop;
    },
    startTransition: function startTransition() {
      var _this = this;

      requestAnimationFrame(function () {
        return _this.isContentActive = true;
      });
      requestAnimationFrame(this.calculateScroll);
    }
  },

  render: function render(h) {
    var _this2 = this;

    var directives = !this.openOnHover ? [{
      name: 'click-outside',
      value: function value() {
        return _this2.closeOnClick;
      }
    }] : [];

    directives.push({
      name: 'resize',
      value: {
        debounce: 500,
        value: this.onResize
      }
    });

    var data = {
      staticClass: 'menu',
      class: {
        'menu--disabled': this.disabled
      },
      style: {
        display: this.fullWidth ? 'block' : 'inline-block'
      },
      directives: directives,
      on: {
        keydown: function keydown(e) {
          if (e.keyCode === 27) _this2.isActive = false;else _this2.changeListIndex(e);
        }
      }
    };

    return h('div', data, [this.genActivator(), this.genTransition()]);
  }
});

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    getActivator: function getActivator() {
      if (this.activator) return this.activator;
      return this.$refs.activator.children ? this.$refs.activator.children[0] : this.$refs.activator;
    },
    activatorClickHandler: function activatorClickHandler(e) {
      if (this.disabled) return;else if (this.openOnClick && !this.isActive) {
        this.isActive = true;
        this.absoluteX = e.clientX;
        this.absoluteY = e.clientY;
      } else if (this.closeOnClick && this.isActive) this.isActive = false;
    },
    mouseEnterHandler: function mouseEnterHandler(e) {
      clearTimeout(this.focusedTimeout);

      if (this.disabled || this.hasJustFocused) return;
      this.hasJustFocused = true;
      this.isActive = true;
    },
    mouseLeaveHandler: function mouseLeaveHandler(e) {
      var _this = this;

      clearTimeout(this.focusedTimeout);

      if (this.disabled || this.$refs.content.contains(e.relatedTarget)) return;

      this.focusedTimeout = setTimeout(function () {
        return _this.isActive = false;
      }, 500);
    },
    addActivatorEvents: function addActivatorEvents() {
      var activator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!activator) return;
      activator.addEventListener('click', this.activatorClickHandler);
    },
    removeActivatorEvents: function removeActivatorEvents() {
      var activator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!activator) return;
      activator.removeEventListener('click', this.activatorClickHandler);
    }
  }
});

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genActivator: function genActivator() {
      if (!this.$slots.activator) return null;

      var options = {
        'class': {
          'menu__activator--active': this.hasJustFocused || this.isActive
        },
        staticClass: 'menu__activator',
        ref: 'activator',
        on: {}
      };

      if (this.openOnHover) {
        options.on['mouseenter'] = this.mouseEnterHandler;
        options.on['mouseleave'] = this.mouseLeaveHandler;
      } else if (this.openOnClick) {
        options.on['click'] = this.activatorClickHandler;
      }

      return this.$createElement('div', options, this.$slots.activator);
    },
    genTransition: function genTransition() {
      if (!this.transition) return this.genContent();

      return this.$createElement('transition', {
        props: {
          name: this.transition
        }
      }, [this.genContent()]);
    },
    genContent: function genContent() {
      var _this = this;

      var booted = this.lazy && this.isBooted || !this.lazy;
      return this.$createElement('div', {
        'class': ('menu__content ' + this.contentClass).trim(),
        ref: 'content',
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isContentActive
        }],
        on: {
          click: function click(e) {
            e.stopPropagation();
            if (e.target.getAttribute('disabled')) return;
            if (_this.closeOnContentClick) _this.isActive = false;
          },
          mouseenter: function mouseenter(e) {
            _this.openOnHover && _this.mouseEnterHandler;
          },
          mouseleave: function mouseleave(e) {
            _this.openOnHover && _this.mouseLeaveHandler(e);
          }
        }
      }, [booted ? this.$slots.default : null]);
    }
  }
});

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    // Revisit this
    calculateScroll: function calculateScroll() {
      if (this.selectedIndex === null) return;

      var scrollTop = 0;

      if (this.selectedIndex >= this.stopIndex) {
        scrollTop = this.$refs.content.scrollHeight;
      } else if (this.selectedIndex > this.startIndex) {
        scrollTop = this.selectedIndex * (this.defaultOffset * 6) - this.defaultOffset * 7;
      }

      this.$refs.content.scrollTop = scrollTop;
    },
    calcLeftAuto: function calcLeftAuto() {
      var a = this.dimensions.activator;

      return parseInt(a.left - this.defaultOffset * 2);
    },
    calcTopAuto: function calcTopAuto() {
      if (!this.hasActivator) return this.calcTop(true);

      var selectedIndex = Array.from(this.tiles).findIndex(function (n) {
        return n.classList.contains('list__tile--active');
      });

      if (selectedIndex === -1) {
        this.selectedIndex = null;

        return this.calcTop(true);
      }

      this.selectedIndex = selectedIndex;
      var actingIndex = selectedIndex;

      var offsetPadding = -(this.defaultOffset * 2);
      // #708 Stop index should vary by tile length
      this.stopIndex = this.tiles.length > 4 ? this.tiles.length - 4 : this.tiles.length;

      if (selectedIndex > this.startIndex && selectedIndex < this.stopIndex) {
        actingIndex = 2;
        offsetPadding = this.defaultOffset * 3;
      } else if (selectedIndex >= this.stopIndex) {
        offsetPadding = -this.defaultOffset;
        actingIndex = selectedIndex - this.stopIndex;
      }

      // Is always off by 1 pixel, send help (┛ಠ_ಠ)┛彡┻━┻
      offsetPadding--;

      return this.calcTop(true) + offsetPadding - actingIndex * (this.defaultOffset * 6);
    },
    calcLeft: function calcLeft() {
      if (this.auto) return this.calcLeftAuto();

      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      var left = this.left ? a.right - c.width : a.left;

      if (this.offsetX) left += this.left ? -a.width : a.width;
      if (this.nudgeLeft) left += this.nudgeLeft;
      if (this.nudgeRight) left -= this.nudgeRight;

      return left;
    },
    calcTop: function calcTop(force) {
      if (this.auto && !force) return this.calcTopAuto();

      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      var top = this.top ? a.bottom - c.height : a.top;

      if (this.offsetY) top += this.top ? -a.height : a.height;
      if (this.nudgeTop) top -= this.nudgeTop;
      if (this.nudgeBottom) top += this.nudgeBottom;

      return top + this.pageYOffset;
    },
    calcXOverflow: function calcXOverflow(left) {
      var hasWindow = typeof window !== 'undefined';
      var innerWidth = hasWindow ? window.innerWidth : 0;
      var maxWidth = Math.max(this.dimensions.content.width, this.calculatedMinWidth, parseInt(this.maxWidth) || 0);
      var totalWidth = left + maxWidth;
      var availableWidth = totalWidth - innerWidth;

      if ((!this.left || this.right) && availableWidth > 0) {
        left = innerWidth - maxWidth - (innerWidth > 1024 ? 30 : 12) // Account for scrollbar
        ;
      } else if (this.left && left < 0) left = 12;

      return left;
    },
    calcYOverflow: function calcYOverflow(top) {
      var documentHeight = typeof window !== 'undefined' ? window.innerHeight || document.documentElement.clientHeight : 0;
      var toTop = this.pageYOffset + documentHeight;
      var contentHeight = this.dimensions.content.height;
      var totalHeight = top + contentHeight;

      // If overflowing bottom
      if (toTop < totalHeight && !this.allowOverflow) top = toTop - contentHeight - 12;
      // If overflowing top
      else if (top < this.pageYOffset && !this.allowOverflow) top = this.pageYOffset + 12;

      return top < 12 ? 12 : top;
    },
    sneakPeek: function sneakPeek(cb) {
      var _this = this;

      requestAnimationFrame(function () {
        var el = _this.$refs.content;
        var currentDisplay = el.style.display;

        el.style.display = 'inline-block';
        cb();
        el.style.display = currentDisplay;
      });
    },
    absolutePosition: function absolutePosition() {
      return {
        offsetTop: 0,
        scrollHeight: 0,
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0
      };
    },
    updateDimensions: function updateDimensions() {
      var _this2 = this;

      this.sneakPeek(function () {
        _this2.dimensions = {
          activator: !_this2.hasActivator || _this2.positionAbsolutely ? _this2.absolutePosition() : _this2.measure(_this2.getActivator()),
          content: _this2.measure(_this2.$refs.content)
        };
      });
    }
  }
});

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    measure: function measure(el, selector) {
      var getParent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      el = selector ? el.querySelector(selector) : el;

      if (!el) return null;

      var _el$getBoundingClient = el.getBoundingClientRect(),
          top = _el$getBoundingClient.top,
          bottom = _el$getBoundingClient.bottom,
          left = _el$getBoundingClient.left,
          right = _el$getBoundingClient.right,
          height = _el$getBoundingClient.height,
          width = _el$getBoundingClient.width;

      return {
        offsetTop: el.offsetTop,
        scrollHeight: el.scrollHeight,
        top: top, bottom: bottom, left: left, right: right, height: height, width: width
      };
    }
  }
});

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      listIndex: -1,
      isUsingKeys: false,
      tiles: []
    };
  },

  watch: {
    isActive: function isActive(val) {
      if (!val) this.listIndex = -1;
    },
    listIndex: function listIndex(next, prev) {
      // For infinite scroll and autocomplete, re-evaluate children
      this.getTiles();

      if (next in this.tiles) {
        this.tiles[next].classList.add('list__tile--highlighted');
        this.$refs.content.scrollTop = next * 48;
      }

      prev in this.tiles && this.tiles[prev].classList.remove('list__tile--highlighted');
    }
  },

  methods: {
    changeListIndex: function changeListIndex(e) {
      [40, 38, 13].includes(e.keyCode) && e.preventDefault();
      e.keyCode === 32 && !this.isActive && e.preventDefault();

      if ([27, 9].includes(e.keyCode)) return this.isActive = false;else if (!this.isActive && [13, 32].includes(e.keyCode) && this.openOnClick) {
        return this.isActive = true;
      }

      if (e.keyCode === 40 && this.listIndex < this.tiles.length - 1) {
        this.listIndex++;
      } else if (e.keyCode === 38 && this.listIndex > 0) {
        this.listIndex--;
      } else if (e.keyCode === 13 && this.listIndex !== -1) {
        this.tiles[this.listIndex].click();
      }

      if (this.listIndex === -1) this.setActiveListIndex();
    },
    getTiles: function getTiles() {
      this.tiles = this.$refs.content.querySelectorAll('.list__tile');
    },
    setActiveListIndex: function setActiveListIndex() {
      var _this = this;

      var tiles = Array.from(this.tiles || []);
      tiles.forEach(function (t, i) {
        if (t.classList.contains('list__tile--active')) {
          _this.listIndex = i;
          return;
        }
      });
    }
  }
});

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    filter: {
      type: Function,
      default: function _default(item, queryText, itemText) {
        var hasValue = function hasValue(val) {
          return [undefined, null].includes(val);
        };

        var text = hasValue(itemText) ? '' : itemText;
        var query = hasValue(queryText) ? '' : queryText;

        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
      }
    }
  },

  methods: {
    filterSearch: function filterSearch() {
      var _this = this;

      if (!this.isAutocomplete) return this.computedItems;

      return this.computedItems.filter(function (i) {
        return _this.filter(i, _this.searchValue, _this.getText(i));
      });
    },
    onKeyDown: function onKeyDown(e) {
      var _this2 = this;

      // If enter or space is pressed, open menu
      if (!this.menuIsActive && [13, 32, 38, 40].includes(e.keyCode)) {
        return this.showMenuItems();
      } else if ([9, 27].includes(e.keyCode)) {
        // If select is being tabbed, blur
        return this.blur();
      } else if (e.keyCode === 13 && this.searchValue && this.tags && !this.filteredItems.length) {
        this.selectedItems.push(this.searchValue);

        this.$nextTick(function () {
          _this2.searchValue = null;
          _this2.$emit('change', _this2.selectedItems);
        });
      }

      if (!this.tags || ![32].includes(e.keyCode)) this.$refs.menu.changeListIndex(e);

      if ([38, 40].includes(e.keyCode)) this.selectedIndex = -1;

      if (this.isAutocomplete && !this.hideSelections && !this.searchValue) this.changeSelectedIndex(e.keyCode);
    }
  }
});

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genMenu: function genMenu() {
      var _this = this;

      var offsetY = this.isAutocomplete || this.offset || this.isDropdown;
      var data = {
        ref: 'menu',
        props: {
          activator: this.$refs.activator,
          allowOverflow: this.isAutocomplete,
          auto: this.auto,
          closeOnClick: false,
          closeOnContentClick: !this.isMultiple,
          contentClass: this.computedContentClass,
          disabled: this.disabled,
          maxHeight: this.maxHeight,
          nudgeTop: this.isDropdown ? -12 : offsetY ? -2 : 0,
          nudgeRight: this.isDropdown ? 16 : 0,
          nudgeWidth: this.isDropdown ? 56 : 36,
          offsetY: offsetY,
          openOnClick: false,
          value: this.menuIsActive && this.computedItems.length && (!this.tags || this.tags && this.filteredItems.length > 0),
          zIndex: this.menuZIndex
        },
        on: {
          input: function input(val) {
            if (!val) {
              _this.menuIsActive = false;
            }
          }
        }
      };

      if (this.isAutocomplete) data.props.transition = '';

      this.minWidth && (data.props.minWidth = this.minWidth);

      return this.$createElement('v-menu', data, [this.genList()]);
    },
    genSelectionsAndSearch: function genSelectionsAndSearch() {
      var _this2 = this;

      var data = {
        staticClass: 'input-group--select__autocomplete',
        'class': {
          'input-group--select__autocomplete--index': this.selectedIndex > -1
        },
        style: {
          flex: this.shouldBreak ? '1 0 100%' : null
        },
        attrs: _extends({}, this.$attrs, {
          disabled: this.disabled || !this.isAutocomplete,
          readonly: this.readonly,
          tabindex: this.disabled || !this.isAutocomplete ? -1 : this.tabindex
        }),
        domProps: {
          value: this.lazySearch
        },
        directives: [{
          name: 'show',
          value: this.isAutocomplete || this.placeholder && !this.selectedItems.length
        }],
        ref: 'input',
        key: 'input'
      };

      if (this.isAutocomplete) {
        data.attrs.role = 'combobox';
        data.domProps.autocomplete = this.browserAutocomplete;

        data.on = _extends({}, this.genListeners(), {
          input: function input(e) {
            return _this2.searchValue = e.target.value;
          }
        });

        data.directives = data.directives.concat(this.genDirectives());
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder;

      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [this.genSelections(), this.$createElement('input', data)]);
    },
    genSelections: function genSelections() {
      var _this3 = this;

      if (this.hideSelections) return [];

      var children = [];
      var chips = this.chips;
      var slots = this.$scopedSlots.selection;
      var length = this.selectedItems.length;

      this.selectedItems.forEach(function (item, i) {
        if (slots) {
          children.push(_this3.genSlotSelection(item, i));
        } else if (chips) {
          children.push(_this3.genChipSelection(item, i));
        } else {
          children.push(_this3.genCommaSelection(item, i < length - 1, i));
        }
      });

      return children;
    },
    genSlotSelection: function genSlotSelection(item, index) {
      return this.$scopedSlots.selection({
        parent: this,
        item: item,
        index: index,
        selected: index === this.selectedIndex,
        disabled: this.disabled || this.readonly
      });
    },
    genChipSelection: function genChipSelection(item, index) {
      var _this4 = this;

      var isDisabled = this.disabled || this.readonly;
      var click = function click(e) {
        if (isDisabled) return;

        e.stopPropagation();
        _this4.focus();
        _this4.selectedIndex = index;
      };

      return this.$createElement('v-chip', {
        staticClass: 'chip--select-multi',
        props: {
          close: !isDisabled,
          dark: this.dark,
          disabled: isDisabled,
          selected: index === this.selectedIndex
        },
        on: {
          click: click,
          focus: click,
          input: function input() {
            return _this4.selectItem(item);
          }
        },
        key: this.getValue(item)
      }, this.getText(item));
    },
    genCommaSelection: function genCommaSelection(item, comma, index) {
      return this.$createElement('div', {
        staticClass: 'input-group__selections__comma',
        'class': {
          'input-group__selections__comma--active': index === this.selectedIndex
        },
        key: JSON.stringify(this.getValue(item)) // Item may be an object
      }, '' + this.getText(item) + (comma ? ', ' : ''));
    },
    genList: function genList() {
      var _this5 = this;

      var children = this.filteredItems.map(function (o) {
        if (o.header) return _this5.genHeader(o);
        if (o.divider) return _this5.genDivider(o);else return _this5.genTile(o);
      });

      if (!children.length) {
        children.push(this.genTile(this.noDataText, true));
      }

      return this.$createElement('v-card', [this.$createElement('v-list', {
        ref: 'list'
      }, children)]);
    },
    genHeader: function genHeader(item) {
      return this.$createElement('v-subheader', {
        props: item
      }, item.header);
    },
    genDivider: function genDivider(item) {
      return this.$createElement('v-divider', {
        props: item
      });
    },
    genTile: function genTile(item, disabled) {
      var _this6 = this;

      var active = this.selectedItems.indexOf(item) !== -1;

      if (typeof disabled === 'undefined') {
        disabled = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["g" /* getObjectValueByPath */])(item, this.itemDisabled);
      }

      var data = {
        on: {
          click: function click(e) {
            if (disabled) return;

            _this6.selectItem(item);
          }
        },
        props: {
          avatar: item === Object(item) && 'avatar' in item,
          ripple: true,
          value: active
        }
      };

      if (disabled) {
        data.props.disabled = disabled;
      }

      if (this.$scopedSlots.item) {
        return this.$createElement('v-list-tile', data, [this.$scopedSlots.item({ parent: this, item: item })]);
      }

      return this.$createElement('v-list-tile', data, [this.genAction(item, active && !disabled), this.genContent(item)]);
    },
    genAction: function genAction(item, active) {
      var _this7 = this;

      if (!this.isMultiple) return null;

      var data = {
        staticClass: 'list__tile__action--select-multi',
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this7.selectItem(item);
          }
        }
      };

      return this.$createElement('v-list-tile-action', data, [this.$createElement('v-checkbox', { props: { inputValue: active } })]);
    },
    genContent: function genContent(item) {
      return this.$createElement('v-list-tile-content', [this.$createElement('v-list-tile-title', this.getText(item))]);
    }
  }
});

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTHead: function genTHead() {
      var _this = this;

      var children = [];

      if (this.$scopedSlots.headers) {
        var row = this.$scopedSlots.headers({
          headers: this.headers,
          indeterminate: this.indeterminate,
          all: this.all
        });

        children = this.needsTR(row) ? this.genTR(row) : row;
      } else {
        var _row = this.headers.map(function (o) {
          return _this.genHeader(o);
        });
        var checkbox = this.$createElement('v-checkbox', {
          props: {
            dark: this.dark,
            light: this.light,
            color: this.selectAll === true && '' || this.selectAll,
            hideDetails: true,
            inputValue: this.all,
            indeterminate: this.indeterminate
          },
          on: { change: this.toggle }
        });

        this.hasSelectAll && _row.unshift(this.$createElement('th', [checkbox]));

        children = this.genTR(_row);
      }

      return this.$createElement('thead', [children]);
    },
    genHeader: function genHeader(header) {
      var array = [this.$scopedSlots.headerCell ? this.$scopedSlots.headerCell({ header: header }) : header[this.headerText]];

      return this.$createElement.apply(this, ['th'].concat(_toConsumableArray(this.genHeaderData(header, array))));
    },
    genHeaderData: function genHeaderData(header, children) {
      var classes = ['column'];
      var data = {
        attrs: {
          role: 'columnheader',
          scope: 'col',
          'aria-label': header[this.headerText] || '',
          'aria-sort': 'none'
        }
      };

      if ('sortable' in header && header.sortable || !('sortable' in header)) {
        this.genHeaderSortingData(header, children, data, classes);
      } else {
        data.attrs['aria-label'] += ': Not sorted.'; // TODO: Localization
      }

      classes.push('text-xs-' + (header.align || 'right'));
      data.class = classes;

      return [data, children];
    },
    genHeaderSortingData: function genHeaderSortingData(header, children, data, classes) {
      var _this2 = this;

      if (!('value' in header)) {
        console.warn('Data table headers must have a value property that corresponds to a value in the v-model array');
      }

      data.attrs.tabIndex = 0;
      data.on = {
        click: function click() {
          return _this2.sort(header.value);
        },
        keydown: function keydown(e) {
          // check for space
          if (e.keyCode === 32) {
            e.preventDefault();
            _this2.sort(header.value);
          }
        }
      };

      classes.push('sortable');
      var icon = this.$createElement('v-icon', { attrs: { 'aria-hidden': true } }, 'arrow_upward');
      if (header.align && header.align === 'left') {
        children.push(icon);
      } else {
        children.unshift(icon);
      }

      var pagination = this.computedPagination;
      var beingSorted = pagination.sortBy === header.value;
      if (beingSorted) {
        classes.push('active');
        if (pagination.descending) {
          classes.push('desc');
          data.attrs['aria-sort'] = 'descending';
          data.attrs['aria-label'] += ': Sorted descending. Activate to remove sorting.'; // TODO: Localization
        } else {
          classes.push('asc');
          data.attrs['aria-sort'] = 'ascending';
          data.attrs['aria-label'] += ': Sorted ascending. Activate to sort descending.'; // TODO: Localization
        }
      } else {
        data.attrs['aria-label'] += ': Not sorted. Activate to sort ascending.'; // TODO: Localization
      }
    }
  }
});

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTBody: function genTBody() {
      var children = [];

      if (!this.itemsLength) {
        children.push(this.genEmptyBody(this.noDataText));
      } else if (!this.filteredItems.length) {
        children.push(this.genEmptyBody(this.noResultsText));
      } else {
        children.push(this.genFilteredItems());
      }

      return this.$createElement('tbody', children);
    },
    genFilteredItems: function genFilteredItems() {
      var _this = this;

      return this.filteredItems.map(function (item, index) {
        var props = { item: item, index: index };
        var key = _this.selectedKey;

        Object.defineProperty(props, 'selected', {
          get: function get() {
            return _this.selected[item[_this.selectedKey]];
          },
          set: function set(value) {
            var selected = _this.value.slice();
            if (value) selected.push(item);else selected = selected.filter(function (i) {
              return i[key] !== item[key];
            });

            _this.$emit('input', selected);
          }
        });

        var row = _this.$scopedSlots.items(props);

        return _this.needsTR(row) ? _this.genTR(row, {
          attrs: { active: _this.isSelected(item) }
        }) : row;
      });
    },
    genEmptyBody: function genEmptyBody(text) {
      return this.genTR([this.$createElement('td', {
        'class': 'text-xs-center',
        attrs: { colspan: '100%' }
      }, text)]);
    }
  }
});

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genPrevIcon: function genPrevIcon() {
      var _this = this;

      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page === 1,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: function click() {
            var page = _this.computedPagination.page;
            _this.updatePagination({ page: page - 1 });
          }
        },
        attrs: {
          'aria-label': 'Previous page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', 'chevron_left')]);
    },
    genNextIcon: function genNextIcon() {
      var _this2 = this;

      var pagination = this.computedPagination;
      var disabled = pagination.rowsPerPage < 0 || pagination.page * pagination.rowsPerPage >= this.itemsLength || this.pageStop < 0;

      return this.$createElement('v-btn', {
        props: {
          disabled: disabled,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: function click() {
            var page = _this2.computedPagination.page;
            _this2.updatePagination({ page: page + 1 });
          }
        },
        attrs: {
          'aria-label': 'Next page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', 'chevron_right')]);
    },
    genSelect: function genSelect() {
      var _this3 = this;

      return this.$createElement('div', {
        'class': 'datatable__actions__select'
      }, [this.rowsPerPageText, this.$createElement('v-select', {
        attrs: {
          'aria-label': this.rowsPerPageText
        },
        props: {
          items: this.rowsPerPageItems,
          value: this.computedPagination.rowsPerPage,
          hideDetails: true,
          auto: true,
          minWidth: '75px'
        },
        on: {
          input: function input(val) {
            _this3.updatePagination({
              page: 1,
              rowsPerPage: val
            });
          }
        }
      })]);
    },
    genPagination: function genPagination() {
      var pagination = '–';

      if (this.itemsLength) {
        var stop = this.itemsLength < this.pageStop || this.pageStop < 0 ? this.itemsLength : this.pageStop;

        pagination = this.$scopedSlots.pageText ? this.$scopedSlots.pageText({
          pageStart: this.pageStart + 1,
          pageStop: stop,
          itemsLength: this.itemsLength
        }) : this.pageStart + 1 + '-' + stop + ' of ' + this.itemsLength;
      }

      return this.$createElement('div', {
        'class': 'datatable__actions__pagination'
      }, [pagination]);
    },
    genActions: function genActions() {
      return [this.$createElement('div', {
        'class': 'datatable__actions'
      }, [this.genSelect(), this.genPagination(), this.genPrevIcon(), this.genNextIcon()])];
    },
    genTFoot: function genTFoot() {
      var children = [];

      if (this.$slots.footer) {
        var footer = this.$slots.footer;
        var row = this.needsTR(footer) ? this.genTR(footer) : footer;

        children.push(row);
      }

      if (!this.hideActions) {
        children.push(this.genTR([this.$createElement('td', {
          attrs: { colspan: '100%' }
        }, this.genActions())]));
      }

      if (!children.length) return null;
      return this.$createElement('tfoot', children);
    }
  }
});

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      color: ''
    };
  },


  watch: {
    loading: function loading(val) {
      if (val) this.color = val;
    }
  },

  methods: {
    genTProgress: function genTProgress() {
      var loader = this.$createElement('v-progress-linear', {
        props: {
          primary: this.color === 'primary',
          secondary: this.color === 'secondary',
          success: this.color === 'success',
          info: this.color === 'info',
          warning: this.color === 'warning',
          error: this.color === 'error',
          indeterminate: true,
          height: 3,
          active: !!this.loading
        }
      });

      var col = this.$createElement('th', {
        class: 'column',
        attrs: {
          colspan: '100%'
        }
      }, [loader]);

      return this.$createElement('thead', {
        class: 'datatable__progress'
      }, [this.genTR([col])]);
    }
  }
});

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VEditDialog_vue__ = __webpack_require__(136);
function injectStyle (ssrContext) {
  __webpack_require__(135)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VEditDialog_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 135 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-edit-dialog',

  data: function data() {
    return {
      isActive: false,
      isSaving: false
    };
  },


  props: {
    cancelText: {
      default: 'Cancel'
    },
    large: Boolean,
    lazy: Boolean,
    saveText: {
      default: 'Save'
    },
    transition: {
      type: String,
      default: 'slide-x-reverse-transition'
    }
  },

  watch: {
    isActive: function isActive(val) {
      val && this.$emit('open') && setTimeout(this.focus, 50); // Give DOM time to paint

      if (!val) {
        !this.isSaving && this.$emit('cancel');
        this.isSaving && this.$emit('close');
        this.isSaving = false;
      }
    }
  },

  methods: {
    cancel: function cancel() {
      this.isActive = false;
    },
    focus: function focus() {
      var input = this.$refs.content.querySelector('input');
      input && input.focus();
    },
    save: function save() {
      this.isSaving = true;
      this.isActive = false;
      this.$emit('save');
    },
    genButton: function genButton(fn, text) {
      return this.$createElement('v-btn', {
        props: {
          flat: true,
          primary: true,
          light: true
        },
        on: { click: fn }
      }, text);
    },
    genActions: function genActions() {
      return this.$createElement('div', {
        'class': 'small-dialog__actions',
        directives: [{
          name: 'show',
          value: this.large
        }]
      }, [this.genButton(this.cancel, this.cancelText), this.genButton(this.save, this.saveText)]);
    },
    genContent: function genContent() {
      var _this = this;

      return this.$createElement('div', {
        on: {
          keydown: function keydown(e) {
            e.keyCode === 27 && _this.cancel();
            e.keyCode === 13 && _this.save();
          }
        },
        ref: 'content'
      }, [this.$slots.input]);
    }
  },

  render: function render(h) {
    var _this2 = this;

    return h('v-menu', {
      'class': 'small-dialog',
      props: {
        contentClass: 'small-dialog__content',
        transition: this.transition,
        origin: 'top right',
        right: true,
        value: this.isActive,
        closeOnContentClick: false,
        lazy: this.lazy
      },
      on: {
        input: function input(val) {
          return _this2.isActive = val;
        }
      }
    }, [h('a', {
      domProps: { href: 'javascript:;' },
      slot: 'activator'
    }, this.$slots.default), this.genContent(), this.genActions()]);
  }
});

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDatePicker__ = __webpack_require__(138);


__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */]);

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VDatePicker_vue__ = __webpack_require__(141);
function injectStyle (ssrContext) {
  __webpack_require__(139)
  __webpack_require__(140)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VDatePicker_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 139 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 140 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_picker__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_date_title__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_date_header__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_date_table__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_date_years__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VBtn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__VCard__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_touch__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };














var defaultDateFormat = function defaultDateFormat(val) {
  return new Date(val).toISOString().substr(0, 10);
};

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-date-picker',

  components: {
    VBtn: __WEBPACK_IMPORTED_MODULE_6__VBtn__["a" /* default */],
    VCard: __WEBPACK_IMPORTED_MODULE_7__VCard__["a" /* default */],
    VIcon: __WEBPACK_IMPORTED_MODULE_8__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_date_title__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_date_header__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_date_table__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_date_years__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_picker__["a" /* default */]],

  directives: { Touch: __WEBPACK_IMPORTED_MODULE_9__directives_touch__["a" /* default */] },

  data: function data() {
    return {
      tableDate: new Date(),
      originalDate: this.value,
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      isSelected: false,
      isReversing: false,
      narrowDays: []
    };
  },


  props: {
    locale: {
      type: String,
      default: 'en-us'
    },
    dateFormat: {
      type: Function,
      default: defaultDateFormat
    },
    titleDateFormat: {
      type: [Object, Function],
      default: function _default() {
        return { weekday: 'short', month: 'short', day: 'numeric' };
      }
    },
    headerDateFormat: {
      type: [Object, Function],
      default: function _default() {
        return { month: 'long', year: 'numeric' };
      }
    },
    formattedValue: {
      required: false
    },
    allowedDates: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    yearIcon: String
  },

  computed: {
    supportsLocaleFormat: function supportsLocaleFormat() {
      return 'toLocaleDateString' in Date.prototype && new Date(2000, 0, 15).toLocaleDateString('en', { day: 'numeric' }) === '15';
    },
    firstAllowedDate: function firstAllowedDate() {
      var date = new Date();
      date.setHours(12, 0, 0, 0);

      if (this.allowedDates) {
        var millisecondOffset = 1 * 24 * 60 * 60 * 1000;
        var valid = new Date(date);
        for (var i = 0; i < 31; i++) {
          if (this.isAllowed(valid)) return valid;

          valid.setTime(valid.getTime() + millisecondOffset);
        }
      }

      return date;
    },

    inputDate: {
      get: function get() {
        if (!this.value) return this.firstAllowedDate;
        if (this.value instanceof Date) return this.value;
        if (!isNaN(this.value) || typeof this.value === 'string' && this.value.indexOf(':') !== -1) return new Date(this.value);

        return new Date(this.value + 'T12:00:00');
      },
      set: function set(val) {
        this.$emit('input', val ? defaultDateFormat(val) : this.originalDate);
        this.$emit('update:formattedValue', val ? this.dateFormat(val) : this.dateFormat(this.originalDate));
      }
    },
    day: function day() {
      return this.inputDate.getDate();
    },
    month: function month() {
      return this.inputDate.getMonth();
    },
    year: function year() {
      return this.inputDate.getFullYear();
    },
    tableMonth: function tableMonth() {
      return this.tableDate.getMonth();
    },
    tableYear: function tableYear() {
      return this.tableDate.getFullYear();
    },
    computedTransition: function computedTransition() {
      return this.isReversing ? 'tab-reverse-transition' : 'tab-transition';
    }
  },

  watch: {
    isSelected: function isSelected(val) {
      var _this = this;

      val && this.$nextTick(function () {
        _this.$refs.years.scrollTop = _this.$refs.years.scrollHeight / 2 - 125;
      });
    },
    tableDate: function tableDate(val, prev) {
      this.isReversing = val < prev;
    },
    value: function value(val) {
      if (val) this.tableDate = this.inputDate;
    }
  },

  methods: {
    save: function save() {
      if (this.originalDate) {
        this.originalDate = this.value;
      } else {
        this.originalDate = this.inputDate;
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    cancel: function cancel() {
      this.inputDate = this.originalDate;
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    isAllowed: function isAllowed(date) {
      if (!this.allowedDates) return true;

      if (Array.isArray(this.allowedDates)) {
        return !!this.allowedDates.find(function (allowedDate) {
          var d = new Date(allowedDate);
          d.setHours(12, 0, 0, 0);

          return d - date === 0;
        });
      } else if (this.allowedDates instanceof Function) {
        return this.allowedDates(date);
      } else if (this.allowedDates instanceof Object) {
        var min = new Date(this.allowedDates.min);
        min.setHours(12, 0, 0, 0);
        var max = new Date(this.allowedDates.max);
        max.setHours(12, 0, 0, 0);

        return date >= min && date <= max;
      }

      return true;
    }
  },

  created: function created() {
    var _this2 = this;

    var date = new Date();
    date.setDate(date.getDate() - date.getDay() + parseInt(this.firstDayOfWeek));

    Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createRange */])(7).forEach(function (index) {
      var narrow = void 0;
      if (_this2.supportsLocaleFormat) {
        narrow = date.toLocaleDateString(_this2.locale, { weekday: 'narrow' });
      } else {
        narrow = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(index + parseInt(_this2.firstDayOfWeek)) % 7];
      }
      _this2.narrowDays.push(narrow);

      date.setDate(date.getDate() + 1);
    });

    this.tableDate = this.inputDate;
  },
  mounted: function mounted() {
    var date = new Date();
    this.currentDay = date.getDate();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
  },
  render: function render(h) {
    var children = [];

    !this.noTitle && children.push(this.genTitle());

    if (!this.isSelected) {
      var bodyChildren = [];

      bodyChildren.push(this.genHeader());
      bodyChildren.push(this.genTable());

      children.push(h('div', {
        'class': 'picker__body'
      }, bodyChildren));
    } else {
      children.push(this.genYears());
    }

    this.$scopedSlots.default && children.push(this.genSlot());

    return h('v-card', {
      'class': _extends({
        'picker picker--date': true,
        'picker--landscape': this.landscape
      }, this.themeClasses)
    }, children);
  }
});

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genYearIcon: function genYearIcon() {
      return this.yearIcon ? this.$createElement('v-icon', {
        props: {
          dark: true
        }
      }, this.yearIcon) : null;
    },
    genTitle: function genTitle() {
      var _this = this;

      var date = new Date(this.year, this.month, this.day);

      // Workaround for #1409
      date.setHours(1);

      if (typeof this.titleDateFormat === 'function') {
        date = this.titleDateFormat(date);
      } else if (this.supportsLocaleFormat) {
        date = date.toLocaleDateString(this.locale, this.titleDateFormat);
      } else if ('toLocaleDateString' in Date.prototype) {
        date = date.toLocaleDateString(this.locale);
      } else {
        date = date.toISOString().substr(0, 10);
      }

      if (this.landscape) {
        if (date.indexOf(',') > -1) date = date.replace(',', ',<br>');else if (date.indexOf(' ') > -1) date = date.replace(' ', '<br>');
      }

      var text = this.$createElement('transition', {
        props: {
          name: 'slide-x-transition',
          mode: 'out-in'
        }
      }, [this.$createElement('div', {
        domProps: { innerHTML: date },
        key: date
      })]);

      var titleDate = new Date(this.year, this.month, this.day, 12);
      return this.$createElement('div', {
        'class': 'picker__title'
      }, [this.$createElement('div', {
        'class': {
          'picker--date__title-year': true,
          'active': this.isSelected
        },
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this.isSelected = true;
          }
        }
      }, [this.supportsLocaleFormat ? titleDate.toLocaleDateString(this.locale, { year: 'numeric' }) : this.year, this.genYearIcon()]), this.$createElement('div', {
        'class': {
          'picker--date__title-date': true,
          'active': !this.isSelected
        },
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this.isSelected = false;
          }
        }
      }, [text])]);
    }
  }
});

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genHeader: function genHeader() {
      return this.$createElement('div', {
        'class': 'picker--date__header'
      }, [this.genSelector()]);
    },
    genBtn: function genBtn(change, children) {
      var _this = this;

      return this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: function click(e) {
            e.stopPropagation();
            _this.tableDate = new Date(_this.tableYear, change);
          }
        }
      }, children);
    },
    genSelector: function genSelector() {
      var date = new Date(this.tableYear, this.tableMonth);

      // Workaround for #1409
      date.setHours(1);

      var buttonText = void 0;
      if (typeof this.headerDateFormat === 'function') {
        buttonText = this.headerDateFormat(date);
      } else if (this.supportsLocaleFormat) {
        buttonText = date.toLocaleDateString(this.locale, this.headerDateFormat);
      } else {
        buttonText = date.getFullYear() + '/';
        if (date.getMonth() < 9) buttonText += '0';
        buttonText += 1 + date.getMonth();
      }

      var header = this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [this.$createElement('transition', {
        props: { name: this.computedTransition }
      }, [this.$createElement('strong', {
        key: this.tableMonth
      }, buttonText)])]);

      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [this.genBtn(this.tableMonth - 1, [this.$createElement('v-icon', 'chevron_left')]), header, this.genBtn(this.tableMonth + 1, [this.$createElement('v-icon', 'chevron_right')])]);
    }
  }
});

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    wheelScroll: function wheelScroll(e) {
      e.preventDefault();

      var month = this.tableMonth;

      if (e.deltaY < 0) month++;else month--;

      this.tableDate = new Date(this.tableYear, month);
    },
    touch: function touch(value) {
      this.tableDate = new Date(this.tableYear, this.tableMonth + value);
    },
    genTable: function genTable() {
      var _this = this;

      var children = [];
      var data = {
        'class': 'picker--date__table',
        directives: [{
          name: 'touch',
          value: {
            left: function left(e) {
              return e.offsetX < -15 && _this.touch(1);
            },
            right: function right(e) {
              return e.offsetX > 15 && _this.touch(-1);
            }
          }
        }]
      };

      if (this.scrollable) {
        data.on = { wheel: this.wheelScroll };
      }

      children.push(this.$createElement('table', {
        key: this.tableMonth
      }, [this.genTHead(), this.genTBody()]));

      return this.$createElement('div', data, [this.$createElement('transition', {
        props: { name: this.computedTransition }
      }, children)]);
    },
    genTHead: function genTHead() {
      var _this2 = this;

      var days = this.narrowDays.map(function (day) {
        return _this2.$createElement('th', day);
      });
      return this.$createElement('thead', this.genTR(days));
    },
    genTBody: function genTBody() {
      var _this3 = this;

      var children = [];
      var rows = [];
      var length = new Date(this.tableYear, this.tableMonth + 1, 0).getDate();

      var day = new Date(this.tableYear, this.tableMonth).getDay();
      day = (day + 7 - parseInt(this.firstDayOfWeek)) % 7;

      for (var i = 0; i < day; i++) {
        rows.push(this.$createElement('td'));
      }

      var _loop = function _loop(_i) {
        var date = new Date(_this3.tableYear, _this3.tableMonth, _i, 12, 0, 0, 0);
        var buttonText = _this3.supportsLocaleFormat ? date.toLocaleDateString(_this3.locale, { day: 'numeric' }) : _i;
        rows.push(_this3.$createElement('td', [_this3.$createElement('button', {
          'class': {
            'btn btn--date-picker btn--floating btn--small btn--flat': true,
            'btn--active': _this3.isActive(_i),
            'btn--current': _this3.isCurrent(_i),
            'btn--light': _this3.dark,
            'btn--disabled': !_this3.isAllowed(date)
          },
          attrs: {
            type: 'button'
          },
          domProps: {
            innerHTML: '<span class="btn__content">' + buttonText + '</span>'
          },
          on: {
            click: function click() {
              var day = _i < 10 ? '0' + _i : _i;
              var tableYear = _this3.tableYear;
              var tableMonth = _this3.tableMonth + 1;
              tableMonth = tableMonth < 10 ? '0' + tableMonth : tableMonth;

              _this3.inputDate = tableYear + '-' + tableMonth + '-' + day + 'T12:00:00';
              _this3.$nextTick(function () {
                return _this3.autosave && _this3.save();
              });
            }
          }
        })]));

        if (rows.length % 7 === 0) {
          children.push(_this3.genTR(rows));
          rows = [];
        }
      };

      for (var _i = 1; _i <= length; _i++) {
        _loop(_i);
      }

      if (rows.length) {
        children.push(this.genTR(rows));
      }

      children.length < 6 && children.push(this.genTR([this.$createElement('td', { domProps: { innerHTML: '&nbsp;' } })]));

      return this.$createElement('tbody', children);
    },
    genTR: function genTR() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return [this.$createElement('tr', data, children)];
    },
    isActive: function isActive(i) {
      return this.tableYear === this.year && this.tableMonth === this.month && this.day === i;
    },
    isCurrent: function isCurrent(i) {
      return this.currentYear === this.tableYear && this.currentMonth === this.tableMonth && this.currentDay === i;
    }
  }
});

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genYears: function genYears() {
      return this.$createElement('ul', {
        'class': 'picker--date__years',
        ref: 'years'
      }, this.genYearItems());
    },
    genYearItems: function genYearItems() {
      var _this = this;

      var children = [];

      var _loop = function _loop(i, length) {
        var date = new Date(i, _this.month, _this.day, 12);
        var buttonText = _this.supportsLocaleFormat ? date.toLocaleDateString(_this.locale, { year: 'numeric' }) : i;

        children.push(_this.$createElement('li', {
          'class': {
            active: _this.year === i
          },
          on: {
            click: function click(e) {
              e.stopPropagation();

              var tableMonth = _this.tableMonth + 1;
              var day = _this.day;
              tableMonth = tableMonth < 10 ? '0' + tableMonth : tableMonth;
              day = day < 10 ? '0' + day : day;

              _this.inputDate = i + '-' + tableMonth + '-' + day;
              _this.isSelected = false;
            }
          }
        }, buttonText));
      };

      for (var i = this.year + 100, length = this.year - 100; i > length; i--) {
        _loop(i, length);
      }
      return children;
    }
  }
});

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDialog__ = __webpack_require__(18);


__WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */]);

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDivider__ = __webpack_require__(148);


__WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */]);

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VDivider_vue__ = __webpack_require__(150);
function injectStyle (ssrContext) {
  __webpack_require__(149)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VDivider_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 149 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-divider',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  props: {
    inset: Boolean
  },

  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    data.staticClass = ('divider ' + (data.staticClass || '')).trim();

    if (props.inset) data.staticClass += ' divider--inset';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    return h('hr', data);
  }
});

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__ = __webpack_require__(155);



__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */]);

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VExpansionPanel_vue__ = __webpack_require__(154);
function injectStyle (ssrContext) {
  __webpack_require__(153)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VExpansionPanel_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 153 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-expansion-panel',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  provide: function provide() {
    return {
      panelClick: this.panelClick,
      focusable: this.focusable
    };
  },


  props: {
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },

  methods: {
    getChildren: function getChildren() {
      return this.$children.filter(function (c) {
        if (!c.$options) return;

        return c.$options._componentTag === 'v-expansion-panel-content';
      });
    },
    panelClick: function panelClick(uid) {
      if (!this.expand) {
        return this.getChildren().forEach(function (e) {
          return e.toggle(uid);
        });
      }

      var panel = this.$children.find(function (e) {
        return e._uid === uid;
      });

      panel && panel.toggle(uid);
    }
  },

  render: function render(h) {
    return h('ul', {
      staticClass: 'expansion-panel',
      'class': _extends({
        'expansion-panel--focusable': this.focusable,
        'expansion-panel--popout': this.popout,
        'expansion-panel--inset': this.inset
      }, this.themeClasses)
    }, this.$slots.default);
  }
});

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_bootable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_ripple__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_click_outside__ = __webpack_require__(6);










/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-expansion-panel-content',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */]],

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_3__VIcon__["a" /* default */]
  },

  directives: {
    Ripple: __WEBPACK_IMPORTED_MODULE_4__directives_ripple__["a" /* default */],
    ClickOutside: __WEBPACK_IMPORTED_MODULE_5__directives_click_outside__["a" /* default */]
  },

  inject: ['focusable', 'panelClick'],

  data: function data() {
    return {
      height: 'auto'
    };
  },


  props: {
    hideActions: Boolean,
    lazy: Boolean,
    ripple: Boolean
  },

  methods: {
    genBody: function genBody() {
      return this.$createElement('div', {
        ref: 'body',
        class: 'expansion-panel__body',
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, this.showLazyContent(this.$slots.default));
    },
    genHeader: function genHeader() {
      var _this = this;

      return this.$createElement('div', {
        staticClass: 'expansion-panel__header',
        directives: [{
          name: 'ripple',
          value: this.ripple
        }],
        on: {
          click: function click() {
            return _this.panelClick(_this._uid);
          }
        }
      }, [this.$slots.header, this.genIcon()]);
    },
    genIcon: function genIcon(h) {
      if (this.hideActions) return null;

      var icon = this.$slots.actions || this.$createElement('v-icon', 'keyboard_arrow_down');

      return this.$createElement('div', {
        staticClass: 'header__icon'
      }, [icon]);
    },
    toggle: function toggle(uid) {
      var _this2 = this;

      var isActive = this._uid === uid && !this.isActive;

      if (isActive) this.isBooted = true;

      // We treat bootable differently
      // Needs time to calc height
      this.$nextTick(function () {
        return _this2.isActive = isActive;
      });
    }
  },

  render: function render(h) {
    var _this3 = this;

    var children = [];

    this.$slots.header && children.push(this.genHeader());
    children.push(h(__WEBPACK_IMPORTED_MODULE_0__transitions__["a" /* VExpandTransition */], [this.genBody()]));

    return h('li', {
      staticClass: 'expansion-panel__container',
      'class': {
        'expansion-panel__container--active': this.isActive
      },
      attrs: {
        tabindex: 0
      },
      on: {
        keydown: function keydown(e) {
          // Ensure element is focusable and the activeElement
          if (_this3.focusable && _this3.$el === document.activeElement && e.keyCode === 13) _this3.panelClick(_this3._uid);
        }
      }
    }, children);
  }
});

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VFooter__ = __webpack_require__(157);


__WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */]);

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VFooter_vue__ = __webpack_require__(159);
function injectStyle (ssrContext) {
  __webpack_require__(158)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VFooter_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 158 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-footer',

  functional: true,

  props: {
    absolute: Boolean,
    fixed: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('footer ' + (data.staticClass || '')).trim();

    if (props.absolute) data.staticClass += ' footer--absolute';
    if (props.fixed) data.staticClass += ' footer--fixed';

    return h('footer', data, children);
  }
});

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VForm__ = __webpack_require__(161);


__WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */]);

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-form',

  inheritAttrs: false,

  data: function data() {
    return {
      inputs: [],
      errorBag: {}
    };
  },


  props: {
    value: Boolean,
    lazyValidation: Boolean
  },

  watch: {
    errorBag: {
      handler: function handler() {
        var errors = Object.values(this.errorBag).includes(true);

        this.$emit('input', !errors);

        return !errors;
      },

      deep: true
    }
  },

  methods: {
    getInputs: function getInputs() {
      var results = [];

      var search = function search(children) {
        var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;

            if (child.errorBucket !== undefined) {
              results.push(child);
            } else {
              search(child.$children, depth + 1);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (depth === 0) return results;
      };

      return search(this.$children);
    },
    watchInputs: function watchInputs() {
      var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getInputs();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = inputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var child = _step2.value;

          if (this.inputs.includes(child)) {
            continue; // We already know about this input
          }

          this.inputs.push(child);
          this.watchChild(child);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },
    watchChild: function watchChild(child) {
      var _this = this;

      var watcher = function watcher(child) {
        child.$watch('valid', function (val) {
          _this.$set(_this.errorBag, child._uid, !val);
        }, { immediate: true });
      };

      if (!this.lazyValidation) return watcher(child);

      // Only start watching inputs if we need to
      child.$watch('shouldValidate', function (val) {
        if (!val) return;

        // Only watch if we're not already doing it
        if (_this.errorBag.hasOwnProperty(child._uid)) return;

        watcher(child);
      });
    },
    validate: function validate() {
      var errors = this.inputs.filter(function (input) {
        return !input.validate(true);
      }).length;
      return !errors;
    },
    reset: function reset() {
      var _this2 = this;

      this.inputs.forEach(function (input) {
        return input.reset();
      });
      if (this.lazyValidation) {
        Object.keys(this.errorBag).forEach(function (key) {
          return _this2.$delete(_this2.errorBag, key);
        });
      }
    }
  },

  mounted: function mounted() {
    var _this3 = this;

    this.$vuetify.load(function () {
      return _this3.watchInputs();
    });
  },
  updated: function updated() {
    var inputs = this.getInputs();

    if (inputs.length < this.inputs.length) {
      // Something was removed, we don't want it in the errorBag any more
      var removed = this.inputs.filter(function (i) {
        return !inputs.includes(i);
      });

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = removed[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var input = _step3.value;

          this.$delete(this.errorBag, input._uid);
          this.$delete(this.inputs, this.inputs.indexOf(input));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    this.watchInputs(inputs);
  },
  render: function render(h) {
    var _this4 = this;

    return h('form', {
      attrs: this.$attrs,
      on: {
        submit: function submit(e) {
          return _this4.$emit('submit', e);
        }
      }
    }, this.$slots.default);
  }
});

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VSpacer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VContainer__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VFlex__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VLayout__ = __webpack_require__(169);
/* unused harmony reexport VContainer */
/* unused harmony reexport VFlex */
/* unused harmony reexport VLayout */





var VSpacer = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('spacer');


var VGrid = {};

VGrid.install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VContainer__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VContainer__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VFlex__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VFlex__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VLayout__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VLayout__["a" /* default */]);
  Vue.component(VSpacer.name, VSpacer);
};

/* harmony default export */ __webpack_exports__["a"] = (VGrid);

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VContainer_vue__ = __webpack_require__(165);
function injectStyle (ssrContext) {
  __webpack_require__(164)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VContainer_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 164 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid__ = __webpack_require__(16);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */])('container'));

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VFlex_vue__ = __webpack_require__(168);
function injectStyle (ssrContext) {
  __webpack_require__(167)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VFlex_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 167 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid__ = __webpack_require__(16);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */])('flex'));

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VLayout_vue__ = __webpack_require__(171);
function injectStyle (ssrContext) {
  __webpack_require__(170)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VLayout_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 170 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid__ = __webpack_require__(16);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */])('layout'));

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__ = __webpack_require__(173);


__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */]);

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VNavigationDrawer_vue__ = __webpack_require__(175);
function injectStyle (ssrContext) {
  __webpack_require__(174)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VNavigationDrawer_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 174 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_overlayable__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_resize__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_touch__ = __webpack_require__(10);








/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-navigation-drawer',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__["a" /* default */],
    Resize: __WEBPACK_IMPORTED_MODULE_3__directives_resize__["a" /* default */],
    Touch: __WEBPACK_IMPORTED_MODULE_4__directives_touch__["a" /* default */]
  },

  data: function data() {
    return {
      isActive: this.value,
      isBooted: false,
      isMobile: false,
      touchArea: {
        left: 0,
        right: 0
      }
    };
  },


  props: {
    absolute: Boolean,
    clipped: Boolean,
    disableRouteWatcher: Boolean,
    enableResizeWatcher: Boolean,
    height: String,
    floating: Boolean,
    miniVariant: Boolean,
    mobileBreakPoint: {
      type: Number,
      default: 1280
    },
    permanent: Boolean,
    persistent: Boolean,
    right: Boolean,
    temporary: Boolean,
    touchless: Boolean,
    value: { required: false }
  },

  computed: {
    calculatedHeight: function calculatedHeight() {
      return this.height || '100%';
    },
    classes: function classes() {
      return {
        'navigation-drawer': true,
        'navigation-drawer--absolute': this.absolute,
        'navigation-drawer--clipped': this.clipped,
        'navigation-drawer--close': !this.isActive,
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--is-booted': this.isBooted,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive,
        'navigation-drawer--permanent': this.permanent,
        'navigation-drawer--persistent': this.persistent,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    },
    showOverlay: function showOverlay() {
      return !this.permanent && this.isActive && (this.temporary || this.isMobile);
    }
  },

  watch: {
    $route: function $route() {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.closeConditional();
      }
    },
    isActive: function isActive(val) {
      this.$emit('input', val);
      this.showOverlay && val && this.genOverlay() || this.removeOverlay();
      this.$el.scrollTop = 0;
    },
    isMobile: function isMobile(val) {
      !val && this.removeOverlay();
    },
    permanent: function permanent(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      if (this.permanent) return;
      if (val !== this.isActive) this.isActive = val;
    }
  },

  mounted: function mounted() {
    this.$vuetify.load(this.init);
  },


  methods: {
    init: function init() {
      var _this = this;

      this.checkIfMobile();
      setTimeout(function () {
        return _this.isBooted = true;
      }, 0);

      if (this.permanent) this.isActive = true;else if (this.isMobile) this.isActive = false;else if (!this.value && (this.persistent || this.temporary)) this.isActive = false;else this.isActive = true;
    },
    checkIfMobile: function checkIfMobile() {
      this.isMobile = window.innerWidth < parseInt(this.mobileBreakPoint);
    },
    closeConditional: function closeConditional() {
      return !this.permanent && (this.temporary || this.isMobile);
    },
    onResize: function onResize() {
      if (!this.enableResizeWatcher || this.permanent || this.temporary) return;

      this.checkIfMobile();
      this.isActive = !this.isMobile;
    },
    swipeRight: function swipeRight(e) {
      if (this.isActive && !this.right) return;
      this.calculateTouchArea();

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return;else if (!this.right && e.touchstartX <= this.touchArea.left) this.isActive = true;else if (this.right && this.isActive) this.isActive = false;
    },
    swipeLeft: function swipeLeft(e) {
      if (this.isActive && this.right) return;
      this.calculateTouchArea();

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return;else if (this.right && e.touchstartX >= this.touchArea.right) this.isActive = true;else if (!this.right && this.isActive) this.isActive = false;
    },
    calculateTouchArea: function calculateTouchArea() {
      if (!this.$el.parentNode) return;
      var parentRect = this.$el.parentNode.getBoundingClientRect();

      this.touchArea = {
        left: parentRect.left + 50,
        right: parentRect.right - 50
      };
    },
    genDirectives: function genDirectives() {
      var directives = [{
        name: 'click-outside',
        value: this.closeConditional
      }, {
        name: 'resize',
        value: this.onResize
      }];

      !this.touchless && directives.push({
        name: 'touch',
        value: {
          parent: true,
          left: this.swipeLeft,
          right: this.swipeRight
        }
      });

      return directives;
    }
  },

  render: function render(h) {
    var _this2 = this;

    var data = {
      'class': this.classes,
      style: { height: this.calculatedHeight },
      directives: this.genDirectives(),
      on: {
        click: function click() {
          return _this2.$emit('update:miniVariant', false);
        }
      }
    };

    return h('aside', data, [this.$slots.default, h('div', { 'class': 'navigation-drawer__border' })]);
  }
});

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VPagination__ = __webpack_require__(177);


__WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */]);

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VPagination_vue__ = __webpack_require__(179);
function injectStyle (ssrContext) {
  __webpack_require__(178)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VPagination_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 178 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_resize__ = __webpack_require__(8);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-pagination',

  directives: { Resize: __WEBPACK_IMPORTED_MODULE_1__directives_resize__["a" /* default */] },

  props: {
    circle: Boolean,
    disabled: Boolean,
    length: {
      type: Number,
      default: 0,
      validator: function validator(val) {
        return val % 1 === 0;
      }
    },
    totalVisible: [Number, String],
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    value: {
      type: Number,
      default: 0
    }
  },

  data: function data() {
    return {
      maxButtons: 0
    };
  },


  watch: {
    value: function value() {
      this.init();
    }
  },

  computed: {
    classes: function classes() {
      return {
        'pagination': true,
        'pagination--circle': this.circle,
        'pagination--disabled': this.disabled
      };
    },
    items: function items() {
      var maxLength = this.totalVisible || this.maxButtons;
      if (this.length <= maxLength) {
        return this.range(1, this.length);
      }

      var even = maxLength % 2 === 0 ? 1 : 0;
      var left = Math.floor(maxLength / 2);
      var right = this.length - left + 1 + even;

      if (this.value >= left && this.value <= right) {
        var start = this.value - left + 2;
        var end = this.value + left - 2 - even;

        return [1, '...'].concat(_toConsumableArray(this.range(start, end)), ['...', this.length]);
      } else {
        return [].concat(_toConsumableArray(this.range(1, left)), ['...'], _toConsumableArray(this.range(this.length - left + 1 + even, this.length)));
      }
    }
  },

  mounted: function mounted() {
    this.$vuetify.load.call(this, this.init);
  },


  methods: {
    onResize: function onResize() {
      var width = this.$el && this.$el.parentNode ? this.$el.parentNode.clientWidth : window.innerWidth;

      this.maxButtons = Math.floor((width - 96) / 42);
    },
    init: function init() {
      var _this = this;

      this.selected = null;

      // Change this
      setTimeout(function () {
        return _this.selected = _this.value;
      }, 100);
    },
    next: function next(e) {
      e.preventDefault();
      this.$emit('input', this.value + 1);
      this.$emit('next');
    },
    previous: function previous(e) {
      e.preventDefault();
      this.$emit('input', this.value - 1);
      this.$emit('previous');
    },
    range: function range(from, to) {
      var range = [];

      from = from > 0 ? from : 1;

      for (var i = from; i <= to; i++) {
        range.push(i);
      }

      return range;
    },
    genIcon: function genIcon(h, icon, disabled, fn) {
      return h('li', [h('a', {
        class: {
          'pagination__navigation': true,
          'pagination__navigation--disabled': disabled
        },
        attrs: { href: '#!' },
        on: { click: fn }
      }, [h(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */], [icon])])]);
    },
    genItem: function genItem(h, i) {
      var _this2 = this;

      return h('a', {
        class: {
          'pagination__item': true,
          'pagination__item--active': i === this.value
        },
        attrs: { href: '#!' },
        on: {
          click: function click(e) {
            e.preventDefault();
            _this2.$emit('input', i);
          }
        }
      }, [i]);
    },
    genItems: function genItems(h) {
      var _this3 = this;

      return this.items.map(function (i) {
        return h('li', [isNaN(i) && h('span', { class: 'pagination__more' }, [i]) || _this3.genItem(h, i)]);
      });
    }
  },

  render: function render(h) {
    var children = [this.genIcon(h, this.prevIcon, this.value === 1, this.previous), this.genItems(h), this.genIcon(h, this.nextIcon, this.value === this.length, this.next)];

    return h('ul', {
      directives: [{ name: 'resize', value: this.onResize }],
      class: this.classes
    }, children);
  }
});

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VParallax__ = __webpack_require__(181);


__WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */]);

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VParallax_vue__ = __webpack_require__(183);
function injectStyle (ssrContext) {
  __webpack_require__(182)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VParallax_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 182 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_translatable__ = __webpack_require__(184);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-parallax',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_translatable__["a" /* default */]],

  data: function data() {
    return {
      isBooted: false
    };
  },


  props: {
    height: {
      type: [String, Number],
      default: 500
    },
    jumbotron: Boolean,
    src: String
  },

  computed: {
    styles: function styles() {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: 'translate3d(-50%, ' + (this.jumbotron ? 0 : this.parallax + 'px') + ', 0)'
      };
    }
  },

  watch: {
    parallax: function parallax() {
      this.isBooted = true;
    }
  },

  methods: {
    init: function init() {
      var _this = this;

      if (!this.$refs.img) return;

      if (this.$refs.img.complete) {
        this.translate();
        this.listeners();
      } else {
        this.$refs.img.addEventListener('load', function () {
          _this.translate();
          _this.listeners();
        }, false);
      }
    },
    objHeight: function objHeight() {
      return this.$refs.img.naturalHeight;
    },
    elOffsetTop: function elOffsetTop() {
      return this.$el.offsetTop;
    }
  },

  render: function render(h) {
    var container = h('div', {
      staticClass: 'parallax__image-container'
    }, [h('img', {
      staticClass: 'parallax__image',
      'class': {
        'parallax__image--jumbotron': this.jumbotron
      },
      style: this.styles,
      attrs: {
        src: this.src
      },
      ref: 'img'
    })]);

    var content = h('div', {
      staticClass: 'parallax__content'
    }, this.$slots.default);

    return h('div', {
      staticClass: 'parallax',
      style: {
        height: this.jumbotron ? this.normalizedHeight : this.normalizedHeight + 'px'
      },
      on: this.$listeners
    }, [container, content]);
  }
});

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      parallax: null,
      parallaxDist: null,
      percentScrolled: null,
      scrollTop: null,
      windowHeight: null,
      windowBottom: null
    };
  },


  computed: {
    normalizedHeight: function normalizedHeight() {
      if (this.jumbotron) {
        return isNaN(this.height) ? this.height : this.height + 'px';
      }

      return Number(this.height.toString().replace(/(^[0-9]*$)/, '$1'));
    },
    imgHeight: function imgHeight() {
      return this.objHeight();
    }
  },

  mounted: function mounted() {
    this.$vuetify.load(this.init);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.translate, false);
    window.removeEventListener('resize', this.translate, false);
  },


  methods: {
    listeners: function listeners() {
      window.addEventListener('scroll', this.translate, false);
      window.addEventListener('resize', this.translate, false);
    },
    translate: function translate() {
      this.calcDimensions();

      this.percentScrolled = (this.windowBottom - this.elOffsetTop) / (this.normalizedHeight + this.windowHeight);

      this.parallax = Math.round(this.parallaxDist * this.percentScrolled);

      if (this.translated) {
        this.translated();
      }
    },
    calcDimensions: function calcDimensions() {
      var offset = this.$el.getBoundingClientRect();

      this.scrollTop = window.pageYOffset;
      this.parallaxDist = this.imgHeight - this.normalizedHeight;
      this.elOffsetTop = offset.top + this.scrollTop;
      this.windowHeight = window.innerHeight;
      this.windowBottom = this.scrollTop + this.windowHeight;
    }
  }
});

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VProgressCircular__ = __webpack_require__(186);


__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */]);

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VProgressCircular_vue__ = __webpack_require__(188);
function injectStyle (ssrContext) {
  __webpack_require__(187)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VProgressCircular_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 187 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _this = this;

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-progress-circular',

  props: {
    button: Boolean,

    fill: {
      type: String,
      default: function _default() {
        return _this.indeterminate ? 'none' : 'transparent';
      }
    },

    indeterminate: Boolean,

    rotate: {
      type: Number,
      default: 0
    },

    size: {
      type: [Number, String],
      default: 32
    },

    width: {
      type: Number,
      default: 4
    },

    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    calculatedSize: function calculatedSize() {
      var size = Number(this.size);

      if (this.button) {
        size += 8;
      }

      return size;
    },
    circumference: function circumference() {
      return 2 * Math.PI * this.radius;
    },
    classes: function classes() {
      return {
        'progress-circular': true,
        'progress-circular--indeterminate': this.indeterminate,
        'progress-circular--button': this.button
      };
    },
    cxy: function cxy() {
      return this.indeterminate && !this.button ? 50 : this.calculatedSize / 2;
    },
    normalizedValue: function normalizedValue() {
      if (this.value < 0) {
        return 0;
      }

      if (this.value > 100) {
        return 100;
      }

      return this.value;
    },
    radius: function radius() {
      return this.indeterminate && !this.button ? 20 : (this.calculatedSize - this.width) / 2;
    },
    strokeDashArray: function strokeDashArray() {
      return Math.round(this.circumference * 1000) / 1000;
    },
    strokeDashOffset: function strokeDashOffset() {
      return (100 - this.normalizedValue) / 100 * this.circumference + 'px';
    },
    styles: function styles() {
      return {
        height: this.calculatedSize + 'px',
        width: this.calculatedSize + 'px'
      };
    },
    svgSize: function svgSize() {
      return this.indeterminate ? false : this.calculatedSize;
    },
    svgStyles: function svgStyles() {
      return {
        transform: 'rotate(' + this.rotate + 'deg)'
      };
    },
    viewBox: function viewBox() {
      return this.indeterminate ? '25 25 50 50' : false;
    }
  },

  methods: {
    genCircle: function genCircle(h, name, offset) {
      return h('circle', {
        class: 'progress-circular__' + name,
        attrs: {
          fill: 'transparent',
          cx: this.cxy,
          cy: this.cxy,
          r: this.radius,
          'stroke-width': this.width,
          'stroke-dasharray': this.strokeDashArray,
          'stroke-dashoffset': offset
        }
      });
    },
    genSvg: function genSvg(h) {
      var children = [!this.indeterminate && this.genCircle(h, 'underlay', 0), this.genCircle(h, 'overlay', this.strokeDashOffset)];

      return h('svg', {
        style: this.svgStyles,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          height: this.svgSize,
          width: this.svgSize,
          viewBox: this.viewBox
        }
      }, children);
    }
  },

  render: function render(h) {
    var info = h('div', { class: 'progress-circular__info' }, [this.$slots.default]);
    var svg = this.genSvg(h);

    return h('div', {
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    }, [svg, info]);
  }
});

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VRadioGroup__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VRadio__ = __webpack_require__(195);
/* unused harmony reexport VRadioGroup */
/* unused harmony reexport VRadio */





__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VRadio__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VRadio__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */]);

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VRadioGroup_vue__ = __webpack_require__(194);
function injectStyle (ssrContext) {
  __webpack_require__(191)
  __webpack_require__(192)
  __webpack_require__(193)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VRadioGroup_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 191 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 192 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 193 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(11);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-radio-group',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  provide: function provide() {
    var _this = this;

    return {
      isMandatory: function isMandatory() {
        return _this.mandatory;
      },
      name: function name() {
        return _this.name;
      }
    };
  },


  props: {
    column: {
      type: Boolean,
      default: true
    },
    inputValue: null,
    mandatory: {
      type: Boolean,
      default: true
    },
    name: String,
    row: Boolean
  },

  data: function data() {
    return {
      internalTabIndex: -1
    };
  },


  watch: {
    inputValue: function inputValue(val) {
      this.getRadios().forEach(function (radio) {
        radio.isActive = val === radio.value;
      });
    }
  },

  computed: {
    classes: function classes() {
      return {
        'radio-group': true,
        'radio-group--column': this.column && !this.row,
        'radio-group--row': this.row
      };
    }
  },

  methods: {
    getRadios: function getRadios() {
      return this.$children.filter(function (child) {
        return child.$el.classList.contains('radio');
      });
    },
    toggleRadio: function toggleRadio(value) {
      var _this2 = this;

      if (this.disabled) {
        return;
      }

      this.shouldValidate = true;
      this.$emit('change', value);
      this.$nextTick(function () {
        return _this2.validate();
      });

      this.getRadios().filter(function (r) {
        return r.value !== value;
      }).forEach(function (r) {
        return r.isActive = false;
      });
    },
    radioBlur: function radioBlur(e) {
      if (!e.relatedTarget || !e.relatedTarget.classList.contains('radio')) {
        this.shouldValidate = true;
        this.$emit('blur', this.inputValue);
      }
    }
  },

  mounted: function mounted() {
    var _this3 = this;

    this.getRadios().forEach(function (radio) {
      radio.isActive = _this3.inputValue === radio.value;
      radio.$el.tabIndex = radio.$el.tabIndex > 0 ? radio.$el.tabIndex : 0;
      radio.$on('change', _this3.toggleRadio);
      radio.$on('blur', _this3.radioBlur);
      radio.$on('focus', _this3.radioFocus);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var _this4 = this;

    this.getRadios().forEach(function (radio) {
      radio.$off('change', _this4.toggleRadio);
      radio.$off('blur', _this4.radioBlur);
      radio.$off('focus', _this4.radioFocus);
    });
  },
  render: function render(h) {
    var data = {
      attrs: {
        role: 'radiogroup'
      }
    };
    return this.genInputGroup(this.$slots.default, data);
  }
});

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VRadio_vue__ = __webpack_require__(196);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VRadio_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_tab_focusable__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_ripple__ = __webpack_require__(7);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };










/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-radio',

  inheritAttrs: false,

  inject: ['isMandatory', 'name'],

  components: {
    VFadeTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["b" /* VFadeTransition */],
    VIcon: __WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_tab_focusable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__["a" /* default */]],

  directives: { Ripple: __WEBPACK_IMPORTED_MODULE_5__directives_ripple__["a" /* default */] },

  props: {
    disabled: Boolean,
    value: null,
    label: String
  },

  data: function data() {
    return {
      isActive: false
    };
  },


  computed: {
    classes: function classes() {
      return this.addColorClassChecks({
        'input-group': true,
        'input-group--active': this.isActive,
        'input-group--disabled': this.disabled,
        'input-group--selection-controls': true,
        'input-group--tab-focused': this.tabFocused,
        'radio': true,
        'theme--dark': this.dark,
        'theme--light': this.light
      });
    },
    icon: function icon() {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked';
    }
  },

  methods: {
    genInput: function genInput(radio) {
      var value = ['string', 'number'].includes(_typeof(this.value)) ? this.value : JSON.stringify(this.value);
      var input = this.$createElement('input', {
        ref: 'input',
        style: {
          display: 'none'
        },
        attrs: Object.assign({
          name: this.name && this.name(),
          id: this.id,
          type: 'radio',
          value: value
        }, this.$attrs)
      }, [value]);

      radio.push(input);

      return this.$createElement('div', {
        class: 'input-group__input'
      }, radio);
    },
    genWrapper: function genWrapper(radio) {
      var _this = this;

      var children = [];

      children.push(this.genLabel());
      children.push(this.genInput(radio));

      return this.$createElement('div', {
        class: this.classes,
        attrs: {
          role: 'radio',
          'aria-checked': this.isActive && 'true' || 'false',
          'aria-label': this.label
        },
        on: {
          keydown: function keydown(e) {
            if ([13, 32].includes(e.keyCode)) {
              e.preventDefault();
              _this.click();
            }
          },
          blur: function blur(e) {
            _this.$emit('blur', e);
            _this.tabFocused = false;
          }
        }
      }, children);
    },
    genLabel: function genLabel() {
      return this.$createElement('label', {
        on: {
          click: this.click
        }
      }, this.$slots.label || this.label);
    },
    click: function click() {
      var mandatory = this.isMandatory && this.isMandatory() || false;

      if (!this.disabled && (!this.isActive || !mandatory)) {
        this.$refs.input.checked = true;
        this.isActive = true;
        this.$emit('change', this.value);
      }
    }
  },

  created: function created() {
    // Semantic check to help people identify the reason for the inject error above it.
    if (!this.$parent || !this.$parent.$vnode || !this.$parent.$vnode.tag || !this.$parent.$vnode.tag.endsWith('v-radio-group')) {
      console.warn('[Vuetify] Warn: The v-radio component must have an immediate parent of v-radio-group.');
    }
  },
  render: function render(h) {
    var transition = h('v-fade-transition', {}, [h('v-icon', {
      'class': {
        'icon--radio': this.isActive
      },
      key: this.icon
    }, this.icon)]);

    var ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: Object.assign({}, {
        click: this.click
      }, this.$listeners),
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    });

    return this.genWrapper([transition, ripple]);
  }
});

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      tabFocused: false
    };
  }
});

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSlider__ = __webpack_require__(199);


__WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */]);

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSlider_vue__ = __webpack_require__(201);
function injectStyle (ssrContext) {
  __webpack_require__(200)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSlider_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 200 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_input__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__ = __webpack_require__(6);







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-slider',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_input__["a" /* default */]],

  directives: { ClickOutside: __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__["a" /* default */] },

  data: function data() {
    return {
      app: {},
      isActive: false,
      keyPressed: 0
    };
  },


  props: {
    inverted: Boolean,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: null
    },
    thumbLabel: Boolean,
    value: [Number, String],
    vertical: Boolean,
    snap: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'input-group--slider': true,
        'input-group--active': this.isActive,
        'input-group--dirty': this.inputWidth > 0,
        'input-group--disabled': this.disabled,
        'input-group--ticks': !this.disabled && this.step
      };
    },

    inputValue: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        var min = this.min,
            max = this.max,
            step = this.step,
            snap = this.snap;

        val = val < min && min || val > max && max || val;
        /*
        if (Math.ceil(val) % Math.ceil(this.lazyValue) < 2) {
          this.inputWidth = this.calculateWidth(val)
        }
        */

        var value = snap ? Math.round(val / step) * step : parseInt(val);
        this.lazyValue = value;

        if (value !== this.value) {
          this.$emit('input', value);
        }
      }
    },
    interval: function interval() {
      return 100 / (this.max - this.min) * this.step;
    },
    thumbContainerClasses: function thumbContainerClasses() {
      return {
        'slider__thumb-container': true,
        'slider__thumb-container--label': this.thumbLabel
      };
    },
    thumbStyles: function thumbStyles() {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        left: this.inputWidth + '%'
      };
    },
    tickContainerStyles: function tickContainerStyles() {
      return {
        transform: 'translate3d(0, -50%, 0)'
      };
    },
    trackStyles: function trackStyles() {
      var scaleX = this.calculateScale(1 - this.inputWidth / 100);
      var offsetX = this.thumbLabel ? 0 : !this.isActive ? 8 : 12;
      var translateX = offsetX + 'px';
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        transform: 'scaleX(' + scaleX + ') translateX(' + translateX + ')'
      };
    },
    trackFillStyles: function trackFillStyles() {
      var inputWidth = this.inputWidth;
      var scaleX = this.calculateScale(inputWidth / 100);
      var translateX = inputWidth > 99 && !this.thumbLabel ? -8 + 'px' : 0;
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        transform: 'scaleX(' + scaleX + ') translateX(' + translateX + ')'
      };
    },
    numTicks: function numTicks() {
      return parseInt((this.max - this.min) / this.step);
    },
    inputWidth: function inputWidth() {
      var val = this.inputValue;
      if (this.snap) {
        val = Math.round(val / this.step) * this.step;
      }

      val = (val - this.min) / (this.max - this.min) * 100;

      return val < 0.15 ? 0 : val;
    }
  },

  watch: {
    value: function value(val) {
      this.inputValue = val;
    },
    min: function min(val) {
      val > this.inputValue && this.$emit('input', val);
    },
    max: function max(val) {
      val < this.inputValue && this.$emit('input', val);
    }
  },

  mounted: function mounted() {
    this.inputValue = this.value;

    // Without a v-app, iOS does not work with body selectors
    this.app = document.querySelector('[data-app]') || console.warn('The v-slider component requires the present of v-app or a non-body wrapping element with the [data-app] attribute.');
  },


  methods: {
    calculateScale: function calculateScale(scale) {
      return this.disabled ? scale - 0.015 : scale;
    },
    onMouseDown: function onMouseDown(e) {
      this.keyPressed = 2;
      var options = { passive: true };
      this.isActive = true;

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, options);
        Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(this.app, 'touchend', this.onMouseUp);
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, options);
        Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(this.app, 'mouseup', this.onMouseUp);
      }
    },
    onMouseUp: function onMouseUp() {
      this.keyPressed = 0;
      var options = { passive: true };
      this.isActive = false;
      this.app.removeEventListener('touchmove', this.onMouseMove, options);
      this.app.removeEventListener('mousemove', this.onMouseMove, options);
    },
    onMouseMove: function onMouseMove(e) {
      var _$refs$track$getBound = this.$refs.track.getBoundingClientRect(),
          offsetLeft = _$refs$track$getBound.left,
          trackWidth = _$refs$track$getBound.width;

      var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      var left = (clientX - offsetLeft) / trackWidth * 100;

      left = left < 0 ? 0 : left > 100 ? 100 : left;

      this.inputValue = parseInt(this.min, 10) + left / 100 * (this.max - this.min);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        this.keyPressed += 1;

        var direction = e.keyCode === 37 && -1 || e.keyCode === 39 && 1 || 0;
        var multiplier = e.shiftKey && 3 || e.ctrlKey && 2 || 1;
        var amount = this.snap && this.step || 1;

        this.inputValue = this.inputValue + direction * amount * multiplier;
      }
    },
    onKeyUp: function onKeyUp(e) {
      this.keyPressed = 0;
    },
    sliderMove: function sliderMove(e) {
      if (!this.isActive) {
        this.onMouseMove(e);
      }
    },
    genThumbLabel: function genThumbLabel(h) {
      return h('v-scale-transition', {
        props: { origin: 'bottom center' }
      }, [h('div', {
        'class': 'slider__thumb--label__container',
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, [h('div', { 'class': 'slider__thumb--label' }, [h('span', {}, parseInt(this.inputValue))])])]);
    },
    genThumbContainer: function genThumbContainer(h) {
      var children = [];
      children.push(h('div', { 'class': 'slider__thumb' }));

      this.thumbLabel && children.push(this.genThumbLabel(h));

      return h('div', {
        'class': this.thumbContainerClasses,
        style: this.thumbStyles,
        on: {
          touchstart: this.onMouseDown,
          mousedown: this.onMouseDown
        },
        ref: 'thumb'
      }, children);
    },
    genSteps: function genSteps(h) {
      var _this = this;

      var ticks = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createRange */])(this.numTicks + 1).map(function (i) {
        var span = h('span', {
          class: 'slider__tick',
          style: {
            left: i * (100 / _this.numTicks) + '%'
          }
        });

        return span;
      });

      return h('div', {
        'class': 'slider__ticks-container',
        style: this.tickContainerStyles
      }, ticks);
    },
    genTrackContainer: function genTrackContainer(h) {
      var children = [h('div', {
        'class': 'slider__track',
        style: this.trackStyles
      }), h('div', {
        'class': 'slider__track-fill',
        style: this.trackFillStyles
      })];

      return h('div', {
        'class': 'slider__track__container',
        ref: 'track'
      }, children);
    }
  },

  render: function render(h) {
    var children = [];

    children.push(this.genTrackContainer(h));
    this.step && children.push(this.genSteps(h));
    children.push(this.genThumbContainer(h));

    var slider = h('div', { 'class': 'slider' }, children);

    return this.genInputGroup([slider], {
      attrs: {
        role: 'slider',
        tabindex: this.tabindex
      },
      on: Object.assign({}, {
        mouseup: this.sliderMove,
        keydown: this.onKeyDown,
        keyup: this.onKeyUp
      }, this.$listeners),
      directives: [{
        name: 'click-outside'
      }]
    });
  }
});

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSnackbar__ = __webpack_require__(203);


__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */]);

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSnackbar_vue__ = __webpack_require__(205);
function injectStyle (ssrContext) {
  __webpack_require__(204)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSnackbar_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 204 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(4);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-snackbar',

  components: {
    VSlideYTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["e" /* VSlideYTransition */],
    VSlideYReverseTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["d" /* VSlideYReverseTransition */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */]],

  data: function data() {
    return {
      activeTimeout: {}
    };
  },


  props: {
    absolute: Boolean,
    bottom: Boolean,
    left: Boolean,
    multiLine: Boolean,
    right: Boolean,
    top: Boolean,
    timeout: {
      type: Number,
      default: 6000
    },
    vertical: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'snack': true,
        'snack--active': this.isActive,
        'snack--absolute': this.absolute,
        'snack--bottom': this.bottom || !this.top,
        'snack--left': this.left,
        'snack--multi-line': this.multiLine && !this.vertical,
        'snack--right': this.right,
        'snack--top': this.top,
        'snack--vertical': this.vertical,
        'primary': this.primary,
        'secondary': this.secondary,
        'success': this.success,
        'info': this.info,
        'warning': this.warning,
        'error': this.error
      };
    },
    computedTransition: function computedTransition() {
      return this.top ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition';
    }
  },

  watch: {
    isActive: function isActive() {
      this.setTimeout();
    }
  },

  methods: {
    setTimeout: function (_setTimeout) {
      function setTimeout() {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function () {
      var _this = this;

      clearTimeout(this.activeTimeout);

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(function () {
          _this.isActive = false;
        }, this.timeout);
      }
    })
  },

  mounted: function mounted() {
    this.setTimeout();
  },
  render: function render(h) {
    var children = [];

    if (this.isActive) {
      children.push(h('div', {
        'class': 'snack__content'
      }, this.$slots.default));
    }

    return h('div', {
      'class': this.classes,
      on: this.$listeners
    }, [h(this.computedTransition, children)]);
  }
});

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSpeedDial__ = __webpack_require__(207);


__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */]);

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSpeedDial_vue__ = __webpack_require__(209);
function injectStyle (ssrContext) {
  __webpack_require__(208)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSpeedDial_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 208 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_positionable__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__ = __webpack_require__(6);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-speed-dial',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  directives: { ClickOutside: __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__["a" /* default */] },

  props: {
    direction: {
      type: String,
      default: 'top',
      validator: function validator(val) {
        return ['top', 'right', 'bottom', 'left'].includes(val);
      }
    },
    hover: Boolean,
    transition: {
      type: String,
      default: 'scale-transition'
    }
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'speed-dial': true,
        'speed-dial--top': this.top,
        'speed-dial--right': this.right,
        'speed-dial--bottom': this.bottom,
        'speed-dial--left': this.left,
        'speed-dial--absolute': this.absolute,
        'speed-dial--fixed': this.fixed
      }, 'speed-dial--direction-' + this.direction, true);
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [];
    var data = {
      'class': this.classes,
      directives: [{
        name: 'click-outside'
      }],
      on: {
        click: function click() {
          return _this.isActive = !_this.isActive;
        }
      }
    };

    if (this.hover) {
      data.on.mouseenter = function () {
        return _this.isActive = true;
      };
      data.on.mouseleave = function () {
        return _this.isActive = false;
      };
    }

    if (this.isActive) {
      children = (this.$slots.default || []).map(function (b, i) {
        b.key = i;

        return b;
      });
    }

    var list = h('transition-group', {
      'class': 'speed-dial__list',
      props: {
        name: this.transition,
        tag: 'div'
      }
    }, children);

    return h('div', data, [this.$slots.activator, list]);
  }
});

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VStepper__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VStepperStep__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VStepperContent__ = __webpack_require__(215);





__WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */].install = function install(Vue) {
  var VStepperHeader = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('stepper__header');

  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VStepperContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VStepperContent__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VStepperStep__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VStepperStep__["a" /* default */]);
  Vue.component('v-stepper-header', VStepperHeader);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */]);

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VStepper_vue__ = __webpack_require__(213);
function injectStyle (ssrContext) {
  __webpack_require__(212)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VStepper_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 212 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-stepper',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  provide: function provide() {
    return {
      stepClick: this.stepClick
    };
  },
  data: function data() {
    return {
      inputValue: null,
      isBooted: false,
      steps: [],
      content: [],
      isReverse: false
    };
  },


  props: {
    nonLinear: Boolean,
    altLabels: Boolean,
    vertical: Boolean,
    value: [Number, String]
  },

  computed: {
    classes: function classes() {
      return {
        'stepper': true,
        'stepper--is-booted': this.isBooted,
        'stepper--vertical': this.vertical,
        'stepper--alt-labels': this.altLabels,
        'stepper--non-linear': this.nonLinear,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    }
  },

  watch: {
    inputValue: function inputValue(val, prev) {
      var _this = this;

      this.isReverse = Number(val) < Number(prev);
      this.steps.forEach(function (i) {
        return i.toggle(_this.inputValue);
      });
      this.content.forEach(function (i) {
        return i.toggle(_this.inputValue, _this.isReverse);
      });

      this.$emit('input', this.inputValue);
      prev && (this.isBooted = true);
    },
    value: function value() {
      var _this2 = this;

      this.getSteps();
      this.$nextTick(function () {
        return _this2.inputValue = _this2.value;
      });
    }
  },

  mounted: function mounted() {
    this.$vuetify.load(this.init);
  },


  methods: {
    init: function init() {
      this.getSteps();

      this.inputValue = this.value || this.steps[0].step || 1;
    },
    getSteps: function getSteps() {
      var _this3 = this;

      this.steps = [];
      this.content = [];
      this.$children.forEach(function (i) {
        if (i.$options._componentTag === 'v-stepper-step') {
          _this3.steps.push(i);
        } else if (i.$options._componentTag === 'v-stepper-content') {
          i.isVertical = _this3.vertical;
          _this3.content.push(i);
        }
      });
    },
    stepClick: function stepClick(step) {
      var _this4 = this;

      this.getSteps();
      this.$nextTick(function () {
        return _this4.inputValue = step;
      });
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes
    }, this.$slots.default);
  }
});

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_ripple__ = __webpack_require__(7);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-stepper-step',

  components: { VIcon: __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */] },

  directives: { Ripple: __WEBPACK_IMPORTED_MODULE_1__directives_ripple__["a" /* default */] },

  inject: ['stepClick'],

  data: function data() {
    return {
      isActive: false,
      isInactive: true
    };
  },


  props: {
    complete: Boolean,
    completeIcon: {
      type: String,
      default: 'check'
    },
    editIcon: {
      type: String,
      default: 'edit'
    },
    errorIcon: {
      type: String,
      default: 'warning'
    },
    editable: Boolean,
    rules: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    step: [Number, String]
  },

  computed: {
    classes: function classes() {
      return {
        'stepper__step': true,
        'stepper__step--active': this.isActive,
        'stepper__step--editable': this.editable,
        'stepper__step--inactive': this.isInactive,
        'stepper__step--error': this.hasError,
        'stepper__step--complete': this.complete
      };
    },
    hasError: function hasError() {
      return this.rules.some(function (i) {
        return i() !== true;
      });
    }
  },

  methods: {
    click: function click(e) {
      e.stopPropagation();

      if (this.editable) {
        this.stepClick(this.step);
      }
    },
    toggle: function toggle(step) {
      this.isActive = step.toString() === this.step.toString();
      this.isInactive = Number(step) < Number(this.step);
    }
  },

  render: function render(h) {
    var data = {
      'class': this.classes,
      directives: [{
        name: 'ripple',
        value: this.editable
      }],
      on: { click: this.click }
    };
    var stepContent = void 0;

    if (this.hasError) {
      stepContent = [h('v-icon', {}, this.errorIcon)];
    } else if (this.complete) {
      if (this.editable) {
        stepContent = [h('v-icon', {}, this.editIcon)];
      } else {
        stepContent = [h('v-icon', {}, this.completeIcon)];
      }
    } else {
      stepContent = this.step;
    }

    var step = h('span', { 'class': 'stepper__step__step' }, stepContent);
    var label = h('div', { 'class': 'stepper__label' }, this.$slots.default);

    return h('div', data, [step, label]);
  }
});

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-stepper-content',

  components: {
    VTabTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["g" /* VTabTransition */],
    VTabReverseTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["f" /* VTabReverseTransition */]
  },

  data: function data() {
    return {
      height: 0,
      isActive: false,
      isReverse: false,
      isVertical: false
    };
  },


  props: {
    step: {
      type: [Number, String],
      required: true
    }
  },

  computed: {
    classes: function classes() {
      return {
        'stepper__content': true
      };
    },
    computedTransition: function computedTransition() {
      return this.isReverse ? 'v-tab-reverse-transition' : 'v-tab-transition';
    },
    styles: function styles() {
      if (!this.isVertical) return {};

      return {
        height: !isNaN(this.height) ? this.height + 'px' : this.height
      };
    },
    wrapperClasses: function wrapperClasses() {
      return {
        'stepper__wrapper': true
      };
    }
  },

  watch: {
    isActive: function isActive() {
      if (!this.isVertical) {
        return;
      }

      if (this.isActive) {
        this.enter();
      } else {
        this.leave();
      }
    }
  },

  mounted: function mounted() {
    this.$refs.wrapper.addEventListener('transitionend', this.onTransition, false);
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.wrapper.removeEventListener('transitionend', this.onTransition, false);
  },


  methods: {
    onTransition: function onTransition() {
      if (!this.isActive) return;

      this.height = 'auto';
    },
    enter: function enter() {
      var _this = this;

      var scrollHeight = 0;

      // Render bug with height
      setTimeout(function () {
        scrollHeight = _this.$refs.wrapper.scrollHeight;
      }, 0);

      this.height = 0;

      // Give the collapsing element time to collapse
      setTimeout(function () {
        return _this.height = scrollHeight || 'auto';
      }, 450);
    },
    leave: function leave() {
      var _this2 = this;

      this.height = this.$refs.wrapper.clientHeight;
      setTimeout(function () {
        return _this2.height = 0;
      }, 0);
    },
    toggle: function toggle(step, reverse) {
      this.isActive = step.toString() === this.step.toString();
      this.isReverse = reverse;
    }
  },

  render: function render(h) {
    var contentData = {
      'class': this.classes
    };
    var wrapperData = {
      'class': this.wrapperClasses,
      style: this.styles,
      ref: 'wrapper'
    };

    if (!this.isVertical) {
      contentData.directives = [{
        name: 'show',
        value: this.isActive
      }];
    }

    var wrapper = h('div', wrapperData, [this.$slots.default]);
    var content = h('div', contentData, [wrapper]);

    return h(this.computedTransition, {
      on: this.$listeners
    }, [content]);
  }
});

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSubheader__ = __webpack_require__(217);


__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */]);

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSubheader_vue__ = __webpack_require__(219);
function injectStyle (ssrContext) {
  __webpack_require__(218)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSubheader_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 218 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-subheader',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  props: {
    inset: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children,
        props = _ref.props;

    data.staticClass = ('subheader ' + (data.staticClass || '')).trim();

    if (props.inset) data.staticClass += ' subheader--inset';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    return h('li', data, children);
  }
});

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSwitch__ = __webpack_require__(221);


__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */]);

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSwitch_vue__ = __webpack_require__(225);
function injectStyle (ssrContext) {
  __webpack_require__(222)
  __webpack_require__(223)
  __webpack_require__(224)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSwitch_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 222 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 223 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 224 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_selectable__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_ripple__ = __webpack_require__(7);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-switch',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_selectable__["a" /* default */]],

  directives: { Ripple: __WEBPACK_IMPORTED_MODULE_1__directives_ripple__["a" /* default */] },

  computed: {
    classes: function classes() {
      return {
        'input-group--selection-controls switch': true
      };
    },
    rippleClasses: function rippleClasses() {
      return {
        'input-group--selection-controls__ripple': true,
        'input-group--selection-controls__ripple--active': this.isActive
      };
    },
    containerClasses: function containerClasses() {
      return this.addColorClassChecks({
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--disabled': this.disabled
      });
    },
    toggleClasses: function toggleClasses() {
      return {
        'input-group--selection-controls__toggle': true,
        'input-group--selection-controls__toggle--active': this.isActive
      };
    }
  },

  render: function render(h) {
    var ripple = h('div', {
      'class': this.rippleClasses,
      on: Object.assign({}, {
        click: this.toggle
      }, this.$listeners),
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    });

    var container = h('div', {
      'class': this.containerClasses
    }, [h('div', { 'class': this.toggleClasses }), ripple]);

    return this.genInputGroup([container]);
  }
});

/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSystemBar__ = __webpack_require__(227);


__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */]);

/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSystemBar_vue__ = __webpack_require__(229);
function injectStyle (ssrContext) {
  __webpack_require__(228)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VSystemBar_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 228 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-system-bar',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  props: {
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('system-bar ' + (data.staticClass || '')).trim();

    if (props.dark) data.staticClass += ' theme--dark';
    if (props.light) data.staticClass += ' theme--light';
    if (props.status) data.staticClass += ' system-bar--status';
    if (props.window) data.staticClass += ' system-bar--window';
    if (props.lightsOut) data.staticClass += ' system-bar--lights-out';

    return h('div', data, children);
  }
});

/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VTabs__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VTabsItem__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VTabsContent__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VTabsBar__ = __webpack_require__(236);







__WEBPACK_IMPORTED_MODULE_1__VTabs__["a" /* default */].install = function install(Vue) {
  var VTabsSlider = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('tabs__slider', 'li');
  var VTabsItems = {
    name: 'v-tabs-items',

    functional: true,

    render: function render(h, _ref) {
      var slots = _ref.slots;

      return h('div', { 'class': { 'tabs__items': true } }, [slots().default]);
    }
  };

  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VTabs__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VTabs__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_4__VTabsBar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__VTabsBar__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VTabsContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VTabsContent__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VTabsItem__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VTabsItem__["a" /* default */]);
  Vue.component(VTabsSlider.name, VTabsSlider);
  Vue.component(VTabsItems.name, VTabsItems);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VTabs__["a" /* default */]);

/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VTabs_vue__ = __webpack_require__(233);
function injectStyle (ssrContext) {
  __webpack_require__(232)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VTabs_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 232 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_resize__ = __webpack_require__(8);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs',

  directives: {
    Resize: __WEBPACK_IMPORTED_MODULE_1__directives_resize__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  provide: function provide() {
    var _this = this;

    return {
      registerContent: this.registerContent,
      unregisterContent: this.unregisterContent,
      registerTabItem: this.registerTabItem,
      unregisterTabItem: this.unregisterTabItem,
      slider: this.slider,
      tabClick: this.tabClick,
      isScrollable: function isScrollable() {
        return _this.scrollable;
      },
      isMobile: function isMobile() {
        return _this.isMobile;
      }
    };
  },
  data: function data() {
    return {
      content: [],
      tabItems: [],
      activeIndex: null,
      isMobile: false,
      reverse: false,
      target: null,
      tabsSlider: null,
      targetEl: null,
      tabsContainer: null
    };
  },


  props: {
    centered: Boolean,
    fixed: Boolean,
    grow: Boolean,
    icons: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1280
    },
    value: String,
    scrollable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes: function classes() {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--fixed': this.fixed,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--mobile': this.isMobile,
        'tabs--scroll-bars': this.scrollable,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    }
  },

  watch: {
    value: function value() {
      this.tabClick(this.value);
    },
    activeIndex: function activeIndex() {
      this.updateTabs();
      this.isBooted = true;
    },
    tabItems: function tabItems(newItems, oldItems) {
      var _this2 = this;

      // Tab item got removed
      if (oldItems.length > newItems.length) {
        if (!newItems.find(function (o) {
          return o.id === _this2.target;
        })) {
          var i = oldItems.findIndex(function (o) {
            return o.id === _this2.target;
          });

          this.$nextTick(function () {
            _this2.activeIndex = _this2.tabItems[i > 0 ? i - 1 : 0].id;
            _this2.target = _this2.activeIndex;
          });
        }
      }
      this.slider();
    }
  },

  mounted: function mounted() {
    var _this3 = this;

    this.$vuetify.load(function () {
      // // This is a workaround to detect if link is active
      // // when being used as a router or nuxt link
      var i = _this3.tabItems.findIndex(function (_ref) {
        var el = _ref.el;

        return el.firstChild.classList.contains('tabs__item--active');
      });

      var tab = _this3.value || (_this3.tabItems[i !== -1 ? i : 0] || {}).id;

      tab && _this3.tabClick(tab) && _this3.onResize();
    });
  },


  methods: {
    registerContent: function registerContent(id, toggle) {
      this.content.push({ id: id, toggle: toggle });
    },
    registerTabItem: function registerTabItem(id, toggle, el) {
      this.tabItems.push({ id: id, toggle: toggle, el: el });
    },
    unregisterContent: function unregisterContent(id) {
      this.content = this.content.filter(function (o) {
        return o.id !== id;
      });
    },
    unregisterTabItem: function unregisterTabItem(id) {
      this.tabItems = this.tabItems.filter(function (o) {
        return o.id !== id;
      });
    },
    onResize: function onResize() {
      this.isMobile = window.innerWidth < this.mobileBreakPoint;
      this.slider();
    },
    slider: function slider(el) {
      var _this4 = this;

      this.tabsSlider = this.tabsSlider || this.$el.querySelector('.tabs__slider');

      this.tabsContainer = this.tabsContainer || this.$el.querySelector('.tabs__container');

      if (!this.tabsSlider || !this.tabsContainer) return;

      this.targetEl = el || this.targetEl;

      if (!this.targetEl) return;

      // Gives DOM time to paint when
      // processing slider for
      // dynamic tabs
      this.$nextTick(function () {
        // #684 Calculate width as %
        var width = _this4.targetEl.scrollWidth / _this4.tabsContainer.clientWidth * 100;

        _this4.tabsSlider.style.width = width + '%';
        _this4.tabsSlider.style.left = _this4.targetEl.offsetLeft + 'px';
      });
    },
    tabClick: function tabClick(target) {
      var _this5 = this;

      var setActiveIndex = function setActiveIndex(index) {
        if (_this5.activeIndex === index) {
          // #762 update tabs display
          // In case tabs count got changed but activeIndex didn't
          _this5.updateTabs();
        } else {
          _this5.activeIndex = index;
        }
      };

      this.target = target;

      this.$nextTick(function () {
        var nextIndex = _this5.content.findIndex(function (o) {
          return o.id === target;
        });
        _this5.reverse = nextIndex < _this5.activeIndex;
        setActiveIndex(nextIndex);

        _this5.$emit('input', _this5.target);
      });
    },
    updateTabs: function updateTabs() {
      var _this6 = this;

      this.content.forEach(function (_ref2) {
        var toggle = _ref2.toggle;

        toggle(_this6.target, _this6.reverse, _this6.isBooted);
      });

      this.tabItems.forEach(function (_ref3) {
        var toggle = _ref3.toggle;

        toggle(_this6.target);
      });
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }, this.$slots.default);
  }
});

/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(14);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-item',

  inject: ['slider', 'tabClick', 'registerTabItem', 'unregisterTabItem'],

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_route_link__["a" /* default */]],

  data: function data() {
    return {
      isActive: false
    };
  },


  props: {
    activeClass: {
      type: String,
      default: 'tabs__item--active'
    }
  },

  computed: {
    classes: function classes() {
      var classes = {
        'tabs__item': true,
        'tabs__item--disabled': this.disabled
      };

      classes[this.activeClass] = !this.to && this.isActive;

      return classes;
    },
    action: function action() {
      var to = this.to || this.href;

      if (!to || to === Object(to)) return this._uid;

      return to.replace('#', '');
    }
  },

  watch: {
    $route: function $route() {
      this.to && this.callSlider();
    }
  },

  mounted: function mounted() {
    this.registerTabItem(this.action, this.toggle, this.$el);
    this.callSlider();
  },
  beforeDestroy: function beforeDestroy() {
    this.unregisterTabItem(this.action);
  },


  methods: {
    callSlider: function callSlider() {
      var _this = this;

      setTimeout(function () {
        _this.$el.firstChild.classList.contains('tabs__item--active') && _this.slider(_this.$el);
      }, 0);
    },
    click: function click(e) {
      e.preventDefault();

      if (!this.to && !this.href) return;

      if (!this.to) {
        this.tabClick(this.action);
      }

      this.callSlider();
    },
    toggle: function toggle(action) {
      var _this2 = this;

      this.isActive = this.action === action;

      this.$nextTick(function () {
        _this2.isActive && _this2.slider(_this2.$el);
      });
    }
  },

  render: function render(h) {
    var link = this.generateRouteLink();
    var data = link.data;

    // If disabled, use div as anchor tags do not support
    // being disabled

    var tag = this.disabled ? 'div' : link.tag;

    return h('li', {
      'class': 'tabs__li'
    }, [h(tag, data, this.$slots.default)]);
  }
});

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transitions__ = __webpack_require__(5);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-content',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */]],

  inject: ['registerContent', 'unregisterContent'],

  components: {
    VTabTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["g" /* VTabTransition */],
    VTabReverseTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["f" /* VTabReverseTransition */]
  },

  data: function data() {
    return {
      isActive: false,
      reverse: false
    };
  },


  props: {
    id: {
      type: String,
      required: true
    },
    lazy: Boolean,
    transition: {
      type: [Boolean, String],
      default: 'tab-transition'
    },
    reverseTransition: {
      type: [Boolean, String],
      default: 'tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    }
  },

  methods: {
    toggle: function toggle(target, reverse, showTransition) {
      this.$el.style.transition = !showTransition ? 'none' : null;
      this.reverse = reverse;
      this.isActive = this.id === target;
    }
  },

  mounted: function mounted() {
    this.registerContent(this.id, this.toggle);
  },
  beforeDestroy: function beforeDestroy() {
    this.unregisterContent(this.id);
  },
  render: function render(h) {
    var div = h('div', {
      'class': 'tabs__content',
      domProps: { id: this.id },
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }, this.showLazyContent(this.$slots.default));

    if (!this.computedTransition) {
      return div;
    }

    return h('transition', {
      props: {
        name: this.computedTransition
      }
    }, [div]);
  }
});

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_resize__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_touch__ = __webpack_require__(10);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-bar',

  directives: {
    Resize: __WEBPACK_IMPORTED_MODULE_1__directives_resize__["a" /* default */],
    Touch: __WEBPACK_IMPORTED_MODULE_2__directives_touch__["a" /* default */]
  },

  inject: ['isScrollable', 'isMobile'],

  data: function data() {
    return {
      isOverflowing: false,
      scrollOffset: 0,
      itemOffset: 0,
      startX: 0
    };
  },


  computed: {
    classes: function classes() {
      return {
        'tabs__bar': true
      };
    },
    containerClasses: function containerClasses() {
      return {
        'tabs__container': true
      };
    },
    wrapperClasses: function wrapperClasses() {
      return {
        'tabs__wrapper': true,
        'tabs__wrapper--scrollable': this.isScrollable(),
        'tabs__wrapper--overflow': this.isOverflowing
      };
    },
    containerStyles: function containerStyles() {
      return {
        'transform': 'translateX(' + -this.scrollOffset + 'px)'
      };
    },
    leftIconVisible: function leftIconVisible() {
      return !this.isMobile() && this.isScrollable() && this.isOverflowing && this.scrollOffset > 0;
    },
    rightIconVisible: function rightIconVisible() {
      if (this.isMobile() || !this.isScrollable() || !this.isOverflowing) return;

      // Check one scroll ahead to know the width of right-most item
      var container = this.$refs.container;
      var item = this.newOffsetRight(this.scrollOffset, this.itemOffset);
      var itemWidth = item && container.children[item.index].clientWidth || 0;
      var scrollOffset = this.scrollOffset + container.clientWidth;

      return container.scrollWidth - scrollOffset > itemWidth * 0.30;
    }
  },

  methods: {
    genContainer: function genContainer() {
      return this.$createElement('ul', {
        'class': this.containerClasses,
        'style': this.containerStyles,
        ref: 'container'
      }, this.$slots.default);
    },
    genIcon: function genIcon(direction) {
      var capitalize = direction.charAt(0).toUpperCase() + direction.slice(1);
      return this.$createElement(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */], {
        props: _defineProperty({}, '' + direction, true),
        style: { display: 'inline-flex' },
        on: {
          click: this['scroll' + capitalize]
        }
      }, 'chevron_' + direction);
    },
    genWrapper: function genWrapper() {
      return this.$createElement('div', {
        class: this.wrapperClasses,
        directives: [{
          name: 'touch',
          value: {
            start: this.start,
            move: this.move,
            end: this.end
          }
        }]
      }, [this.genContainer()]);
    },
    start: function start(e) {
      this.startX = this.scrollOffset + e.touchstartX;
      this.$refs.container.style.transition = 'none';
    },
    move: function move(e) {
      var offset = this.startX - e.touchmoveX;
      this.scrollOffset = offset;
    },
    end: function end(e) {
      this.onResize();
      var container = this.$refs.container;
      var scrollWidth = container.scrollWidth - this.$el.clientWidth / 2;
      container.style.transition = null;

      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0;
      } else if (this.scrollOffset >= scrollWidth) {
        var lastItem = container.children[container.children.length - 1];
        this.scrollOffset = scrollWidth - lastItem.clientWidth;
      }
    },
    scrollLeft: function scrollLeft() {
      var _newOffset = this.newOffset('Left'),
          offset = _newOffset.offset,
          index = _newOffset.index;

      this.scrollOffset = offset;
      this.itemOffset = index;
    },
    scrollRight: function scrollRight() {
      var _newOffset2 = this.newOffset('Right'),
          offset = _newOffset2.offset,
          index = _newOffset2.index;

      this.scrollOffset = offset;
      this.itemOffset = index;
    },
    onResize: function onResize() {
      if (this._isDestroyed) return;

      var container = this.$refs.container;
      this.isOverflowing = container.clientWidth < container.scrollWidth;
    },
    newOffset: function newOffset(direction) {
      return this['newOffset' + direction](this.scrollOffset, this.itemOffset);
    },
    newOffsetLeft: function newOffsetLeft(currentOffset, currentIndex) {
      var container = this.$refs.container;
      var items = container.children;
      var offset = 0;

      for (var index = currentIndex - 1; index >= 0; index--) {
        if (!items[index].classList.contains('tabs__slider')) {
          var newOffset = offset + items[index].clientWidth;
          if (newOffset >= container.clientWidth) {
            return { offset: currentOffset - offset, index: index + 1 };
          }
          offset = newOffset;
        }
      }

      return { offset: 0, index: 0 };
    },
    newOffsetRight: function newOffsetRight(currentOffset, currentIndex) {
      var container = this.$refs.container;
      var items = container.children;
      var offset = currentOffset;

      for (var index = currentIndex; index < items.length; index++) {
        if (!items[index].classList.contains('tabs__slider')) {
          var newOffset = offset + items[index].clientWidth;
          if (newOffset > currentOffset + container.clientWidth) {
            return { offset: offset, index: index };
          }
          offset = newOffset;
        }
      }

      return null;
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }, [this.genWrapper(), this.leftIconVisible ? this.genIcon('left') : null, this.rightIconVisible ? this.genIcon('right') : null]);
  }
});

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTextField__ = __webpack_require__(238);


__WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */]);

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VTextField_vue__ = __webpack_require__(241);
function injectStyle (ssrContext) {
  __webpack_require__(239)
  __webpack_require__(240)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VTextField_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 239 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 240 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(11);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-text-field',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

  inheritAttrs: false,

  data: function data() {
    return {
      inputHeight: null,
      badInput: false
    };
  },


  props: {
    autofocus: Boolean,
    autoGrow: Boolean,
    box: Boolean,
    clearable: Boolean,
    counter: [Boolean, Number, String],
    fullWidth: Boolean,
    multiLine: Boolean,
    placeholder: String,
    prefix: String,
    rows: {
      default: 5
    },
    singleLine: Boolean,
    solo: Boolean,
    suffix: String,
    textarea: Boolean,
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    classes: function classes() {
      return {
        'input-group--text-field': true,
        'input-group--text-field-box': this.box,
        'input-group--single-line': this.singleLine || this.solo,
        'input-group--solo': this.solo,
        'input-group--multi-line': this.multiLine,
        'input-group--full-width': this.fullWidth,
        'input-group--prefix': this.prefix,
        'input-group--suffix': this.suffix,
        'input-group--textarea': this.textarea
      };
    },
    count: function count() {
      var inputLength = void 0;
      if (this.inputValue) inputLength = this.inputValue.toString().length;else inputLength = 0;

      return inputLength + ' / ' + this.counterLength;
    },
    counterLength: function counterLength() {
      var parsedLength = parseInt(this.counter, 10);
      return isNaN(parsedLength) ? 25 : parsedLength;
    },

    inputValue: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.lazyValue = val;
        this.$emit('input', val);
      }
    },
    isDirty: function isDirty() {
      return this.lazyValue != null && this.lazyValue.toString().length > 0 || this.badInput || ['time', 'date', 'datetime-local', 'week', 'month'].includes(this.type);
    },
    shouldAutoGrow: function shouldAutoGrow() {
      return (this.multiLine || this.textarea) && this.autoGrow;
    }
  },

  watch: {
    isFocused: function isFocused(val) {
      if (!val) {
        this.$emit('change', this.lazyValue);
      }
    },
    value: function value(val) {
      // Value was changed externally, update lazy
      if (!this.isFocused) this.lazyValue = val;
      !this.validateOnBlur && this.validate();
      this.shouldAutoGrow && this.calculateInputHeight();
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.$vuetify.load(function () {
      _this.shouldAutoGrow && _this.calculateInputHeight();
      _this.autofocus && _this.focus();
    });
  },


  methods: {
    calculateInputHeight: function calculateInputHeight() {
      var _this2 = this;

      this.inputHeight = null;

      this.$nextTick(function () {
        var height = _this2.$refs.input ? _this2.$refs.input.scrollHeight : 0;
        var minHeight = _this2.rows * 24;
        var inputHeight = height < minHeight ? minHeight : height;
        _this2.inputHeight = inputHeight + (_this2.textarea ? 4 : 0);
      });
    },
    onInput: function onInput(e) {
      this.inputValue = e.target.value;
      this.badInput = e.target.validity && e.target.validity.badInput;
      this.shouldAutoGrow && this.calculateInputHeight();
    },
    blur: function blur(e) {
      var _this3 = this;

      this.isFocused = false;

      this.$nextTick(function () {
        _this3.validate();
      });
      this.$emit('blur', e);
    },
    focus: function focus(e) {
      this.isFocused = true;
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.focus();
      }
      this.$emit('focus', e);
    },
    genCounter: function genCounter() {
      return this.$createElement('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': this.hasError
        }
      }, this.count);
    },
    genInput: function genInput() {
      var tag = this.multiLine || this.textarea ? 'textarea' : 'input';
      var listeners = this.$listeners || {};
      delete listeners['change']; // Change should not be bound externally

      var data = {
        style: {},
        domProps: {
          autofocus: this.autofocus,
          disabled: this.disabled,
          required: this.required,
          value: this.lazyValue
        },
        attrs: _extends({}, this.$attrs, {
          readonly: this.readonly,
          tabindex: this.tabindex,
          'aria-label': (!this.$attrs || !this.$attrs.id) && this.label // Label `for` will be set if we have an id
        }),
        on: Object.assign({}, listeners, {
          blur: this.blur,
          input: this.onInput,
          focus: this.focus
        }),
        ref: 'input'
      };

      if (this.shouldAutoGrow) {
        data.style.height = this.inputHeight && this.inputHeight + 'px';
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder;

      if (!this.textarea && !this.multiLine) {
        data.domProps.type = this.type;
      } else {
        data.domProps.rows = this.rows;
      }

      var children = [this.$createElement(tag, data)];

      this.prefix && children.unshift(this.genFix('prefix'));
      this.suffix && children.push(this.genFix('suffix'));

      return children;
    },
    genFix: function genFix(type) {
      return this.$createElement('span', {
        'class': 'input-group--text-field__' + type
      }, this[type]);
    },
    clearableCallback: function clearableCallback() {
      var _this4 = this;

      this.inputValue = null;
      this.$nextTick(function () {
        return _this4.$refs.input.focus();
      });
    }
  },

  render: function render() {
    return this.genInputGroup(this.genInput(), { attrs: { tabindex: false } });
  }
});

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTimePicker__ = __webpack_require__(243);


__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */]);

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VTimePicker_vue__ = __webpack_require__(246);
function injectStyle (ssrContext) {
  __webpack_require__(244)
  __webpack_require__(245)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VTimePicker_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 244 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 245 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCard__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_picker__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_time_title__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_time_body__ = __webpack_require__(248);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-time-picker',

  components: {
    VCard: __WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_picker__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_time_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_time_title__["a" /* default */]],

  data: function data() {
    return {
      isDragging: false,
      rotate: 0,
      originalTime: this.value,
      period: 'am',
      selectingHour: true,
      ranges: {
        hours: Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createRange */])(24),
        minutes: Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createRange */])(60)
      }
    };
  },


  props: {
    format: {
      type: String,
      default: 'ampm',
      validator: function validator(val) {
        return ['ampm', '24hr'].includes(val);
      }
    },
    allowedHours: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    allowedMinutes: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    }
  },

  computed: {
    is24hr: function is24hr() {
      return this.format !== 'ampm';
    },
    is24hrAfter12: function is24hrAfter12() {
      return this.selectingHour && this.is24hr && this.hour >= 12;
    },
    divider: function divider() {
      return this.selectingHour ? 12 : 60;
    },
    degrees: function degrees() {
      return this.degreesPerUnit * Math.PI / 180;
    },
    degreesPerUnit: function degreesPerUnit() {
      return 360 / this.divider;
    },

    inputTime: {
      get: function get() {
        if (this.value && !(this.value instanceof Date)) {
          if (!this.is24hr) {
            this.period = this.value.match(/pm/i) ? 'pm' : 'am';
          }

          return this.value;
        }
        var value = new Date();

        if (this.value instanceof Date) {
          value = this.value;
        }

        var hour = value.getHours();
        var minute = value.getMinutes();
        var period = '';

        if (!this.is24hr) {
          period = hour >= 12 ? 'pm' : 'am';
          hour = hour > 12 ? hour - 12 : hour;
          hour = hour === 0 ? 12 : hour;
        }

        period && (this.period = period);

        hour = this.firstAllowed('hour', hour);
        minute = this.firstAllowed('minute', minute);

        minute = minute < 10 ? '0' + minute : minute > 59 ? '00' : minute;

        return hour + ':' + minute + period;
      },
      set: function set(val) {
        return this.$emit('input', val);
      }
    },
    timeArray: function timeArray() {
      return this.inputTime.replace(/(am|pm)/, '').split(':');
    },

    hour: {
      get: function get() {
        return parseInt(this.timeArray[0]);
      },
      set: function set(val) {
        if (!this.is24hr) {
          val = val > 12 ? val - 12 : val < 1 ? 12 : val;
        } else {
          val = val < 10 ? '0' + val : val > 23 ? '00' : val;
        }

        this.inputTime = val + ':' + this.minute + (!this.is24hr ? this.period : '');
      }
    },
    minute: {
      get: function get() {
        var minute = parseInt(this.timeArray[1]);

        return minute < 10 ? '0' + minute : minute > 59 ? '00' : minute;
      },
      set: function set(val) {
        val = val < 10 ? '0' + parseInt(val) : val > 59 ? '00' : val;
        var hour = this.hour;

        if (this.is24hr && hour < 10) {
          hour = '0' + hour;
        }

        this.inputTime = hour + ':' + val + (!this.is24hr ? this.period : '');
      }
    },
    clockHand: function clockHand() {
      if (this.selectingHour) return this.degreesPerUnit * this.hour;
      return this.degreesPerUnit * this.minute;
    },
    radius: function radius() {
      return this.clockSize / 2;
    },

    clockSize: {
      get: function get() {
        return this.size;
      },
      set: function set(val) {
        this.size = val;
      }
    },
    size: function size() {
      return this.landscape ? 250 : 280;
    }
  },

  watch: {
    period: function period(val) {
      var hour = !!this.allowedHours && this.selectingHour ? this.firstAllowed('hour', this.hour - 1) : this.hour;
      this.inputTime = hour + ':' + this.minute + val;
    },
    value: function value(val) {
      if (this.isSaving) {
        this.originalTime = this.inputTime;
        this.isSaving = false;
      }
    }
  },

  methods: {
    save: function save() {
      if (this.originalTime) {
        this.originalTime = this.value;
      } else {
        this.inputTime = this.inputTime;
        this.originalTime = this.inputTime;
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
      this.selectingHour = true;
    },
    cancel: function cancel() {
      this.inputTime = this.originalTime;
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
      this.selectingHour = true;
    },
    isAllowed: function isAllowed(type, value) {
      var allowed = this['allowed' + (type.charAt(0).toUpperCase() + type.slice(1)) + 's'];

      if (!allowed) return true;

      if (Array.isArray(allowed)) {
        return !!allowed.some(function (v) {
          return v === value;
        });
      } else if (allowed instanceof Function) {
        return allowed(value);
      } else if (allowed === Object(allowed)) {
        var range = type === 'minute' ? this.ranges.minutes : this.ranges.hours;
        var mod = type === 'minute' ? 60 : 24;

        if (allowed.min === String(allowed.min)) {
          allowed.min = this.convert12to24hr(allowed.min);
        }

        if (allowed.max === String(allowed.max)) {
          allowed.max = this.convert12to24hr(allowed.max);
        }

        var steps = allowed.max - allowed.min;
        value = type === 'hour' && !this.is24hr && this.period === 'pm' ? value + 12 : value;

        for (var i = 0; i <= steps; i++) {
          var index = (allowed.min + i) % mod;
          if (range[index] === value) return true;
        }

        return false;
      }

      return true;
    },
    convert12to24hr: function convert12to24hr(input) {
      input = input.toLowerCase();
      var pm = input.indexOf('pm') !== -1;
      var hour = parseInt(input.slice(0, input.indexOf(pm ? 'pm' : 'am')));

      return pm ? hour + 12 : hour;
    },
    generateRange: function generateRange(type, start) {
      var range = type === 'hour' ? this.ranges.hours : this.ranges.minutes;
      var offset = 1;

      if (type === 'hour' && !this.is24hr) {
        range = range.slice(1, 13);
        offset = 0;
      }

      return range.slice(start + offset, range.length).concat(range.slice(0, start + offset));
    },
    firstAllowed: function firstAllowed(type, value) {
      var _this = this;

      var allowed = this['allowed' + (type.charAt(0).toUpperCase() + type.slice(1)) + 's'];

      if (!allowed) return value;

      var range = this.generateRange(type, value);

      var first = range.find(function (v) {
        return _this.isAllowed(type, v);
      });

      return first || value;
    }
  },

  render: function render(h) {
    var children = [this.genBody()];

    !this.noTitle && children.unshift(this.genTitle());
    this.$scopedSlots.default && children.push(this.genSlot());

    return h('v-card', {
      'class': _extends({
        'picker picker--time': true,
        'picker--landscape': this.landscape,
        'picker--time--hours': this.selectingHour
      }, this.themeClasses)
    }, children);
  }
});

/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTitle: function genTitle() {
      var children = [this.genTime()];

      if (this.format === 'ampm') {
        children.push(this.genAMPM());
      }

      return this.$createElement('div', {
        'class': 'picker__title'
      }, children);
    },
    genTime: function genTime() {
      var _this = this;

      var hour = this.hour;

      if (this.is24hr && hour < 10) {
        hour = '0' + hour;
      }

      return this.$createElement('div', {
        'class': 'picker--time__title'
      }, [this.$createElement('span', {
        'class': { active: this.selectingHour },
        on: {
          click: function click() {
            return _this.selectingHour = true;
          }
        }
      }, hour), this.$createElement('span', {
        'class': { active: !this.selectingHour },
        on: {
          click: function click() {
            return _this.selectingHour = false;
          }
        }
      }, ':' + this.minute)]);
    },
    genAMPM: function genAMPM() {
      return this.$createElement('div', [this.genPeriod('am'), this.genPeriod('pm')]);
    },
    genPeriod: function genPeriod(period) {
      var _this2 = this;

      return this.$createElement('span', {
        'class': { active: this.period === period },
        on: { click: function click() {
            return _this2.period = period;
          } }
      }, period.toUpperCase());
    }
  }
});

/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      hasChanged: false
    };
  },

  methods: {
    genBody: function genBody() {
      var _this = this;

      var children = [this.genHand(this.selectingHour ? 'hour' : 'minute')];
      var data = {
        'class': 'picker--time__clock',
        on: {
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
          mouseleave: function mouseleave() {
            _this.isDragging && _this.onMouseUp();
          },
          touchstart: this.onMouseDown,
          touchend: this.onMouseUp,
          mousemove: this.onDragMove,
          touchmove: this.onDragMove
        },
        key: this.selectingHour ? 'hour' : 'minute',
        ref: 'clock'
      };

      this.selectingHour && children.push(this.genHours()) || children.push(this.genMinutes());

      if (this.scrollable) {
        data.on.wheel = function (e) {
          e.preventDefault();

          var diff = e.wheelDelta > 0 ? 1 : -1;
          var changing = _this.selectingHour ? 'changeHour' : 'changeMinute';

          _this[changing](diff);
        };
      }

      return this.$createElement('div', {
        'class': 'picker__body'
      }, [this.$createElement('transition', {
        props: {
          name: 'fade-transition',
          mode: 'out-in'
        }
      }, [this.$createElement('div', data, children)])]);
    },
    genHand: function genHand(type) {
      var scale = this.is24hrAfter12 ? 'scaleY(0.6)' : '';
      return [this.$createElement('div', {
        'class': 'picker--time__clock-hand ' + type,
        style: {
          transform: 'rotate(' + this.clockHand + 'deg) ' + scale
        }
      })];
    },
    genHours: function genHours() {
      var hours = this.is24hr ? 24 : 12;
      var children = [];
      var start = 0;

      if (hours === 12) {
        hours++;
        start = 1;
      }

      for (var i = start; i < hours; i++) {
        children.push(this.$createElement('span', {
          'class': {
            'active': i === this.hour,
            'disabled': !this.isAllowed('hour', i)
          },
          style: this.getTransform(i),
          domProps: { innerHTML: '<span>' + i + '</span>' }
        }));
      }

      return children;
    },
    genMinutes: function genMinutes() {
      var children = [];

      for (var i = 0; i < 60; i = i + 5) {
        var num = i;

        if (num < 10) num = '0' + num;
        if (num === 60) num = '00';

        children.push(this.$createElement('span', {
          'class': {
            'active': num.toString() === this.minute.toString(),
            'disabled': !this.isAllowed('minute', i)
          },
          style: this.getTransform(i),
          domProps: { innerHTML: '<span>' + num + '</span>' }
        }));
      }

      return children;
    },
    getTransform: function getTransform(i) {
      var _getPosition = this.getPosition(i),
          x = _getPosition.x,
          y = _getPosition.y;

      return { transform: 'translate(' + x + 'px, ' + y + 'px)' };
    },
    getPosition: function getPosition(i) {
      var radiusPercentage = this.selectingHour && this.is24hr && i >= 12 ? 0.5 : 0.8;
      var r = this.radius * radiusPercentage;
      i = this.selectingHour && this.is24hr ? i % 12 : i;
      return {
        x: Math.round(Math.sin(i * this.degrees) * r),
        y: Math.round(-Math.cos(i * this.degrees) * r)
      };
    },
    changeHour: function changeHour(time) {
      var _this2 = this;

      var range = this.generateRange('hour', this.hour);

      time < 0 && (range = range.reverse().slice(1));
      this.hour = range.find(function (h) {
        return _this2.allowedHours ? _this2.isAllowed('hour', h) : true;
      });

      return true;
    },
    changeMinute: function changeMinute(time) {
      var _this3 = this;

      var current = Number(this.minute);
      var range = this.generateRange('minute', current);

      time < 0 && (range = range.reverse().slice(1));
      var minute = range.find(function (m) {
        return _this3.allowedMinutes ? _this3.isAllowed('minute', m) : true;
      });

      this.minute = minute < 10 ? '0' + minute : minute;

      return true;
    },
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();

      this.isDragging = true;
      this.onDragMove(e);
    },
    onMouseUp: function onMouseUp() {
      this.isDragging = false;
      !this.selectingHour && this.autosave && this.save();
      if (this.hasChanged) {
        this.selectingHour = false;
        this.hasChanged = false;
      }
    },
    onDragMove: function onDragMove(e) {
      e.preventDefault();
      if (!this.isDragging && e.type !== 'click') return;

      var rect = this.$refs.clock.getBoundingClientRect();
      var center = { x: rect.width / 2, y: 0 - rect.width / 2 };
      var clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      var coords = {
        y: rect.top - clientY,
        x: clientX - rect.left
      };

      var selecting = this.selectingHour ? 'hour' : 'minute';
      var value = Math.round(this.angle(center, coords) / this.degreesPerUnit);

      if (this.selectingHour && this.is24hr) {
        var insideClick = this.euclidean(center, coords) / this.radius < 0.65;
        value = insideClick ? value + 12 : value;

        // Necessary to fix edge case when selecting left part of 0 and 12
        value = this.angle(center, coords) >= 345 ? (value + 12) % 24 : value;
      }

      if (this.isAllowed(selecting, value)) {
        this[selecting] = value;
        this.hasChanged = true;
      }
    },
    euclidean: function euclidean(p0, p1) {
      var dx = Math.abs(p1.x - p0.x);
      var dy = Math.abs(p1.y - p0.y);

      return Math.sqrt(dx * dx + dy * dy);
    },
    angle: function angle(center, p1) {
      var p0 = {
        x: center.x,
        y: center.y + Math.sqrt(Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x) + Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))
      };

      var value = 2 * Math.atan2(p1.y - p0.y, p1.x - p0.x);
      return Math.abs(value * 180 / Math.PI);
    }
  }
});

/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VToolbarTitle */
/* unused harmony export VToolbarItems */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VToolbar__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__ = __webpack_require__(253);
/* unused harmony reexport VToolbar */
/* unused harmony reexport VToolbarSideIcon */






var VToolbarTitle = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('toolbar__title');
var VToolbarItems = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('toolbar__items');

__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */].install = function install(Vue) {
  Vue.component('v-toolbar', __WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */]);
  Vue.component('v-toolbar-items', VToolbarItems);
  Vue.component('v-toolbar-title', VToolbarTitle);
  Vue.component('v-toolbar-side-icon', __WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */]);

/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VToolbar_vue__ = __webpack_require__(252);
function injectStyle (ssrContext) {
  __webpack_require__(251)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VToolbar_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 251 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-toolbar',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  data: function data() {
    return {
      isExtended: false,
      isScrolling: false,
      marginTop: 0,
      previousScroll: null,
      target: null
    };
  },

  props: {
    absolute: Boolean,
    card: Boolean,
    dense: Boolean,
    extended: Boolean,
    fixed: Boolean,
    flat: Boolean,
    floating: Boolean,
    prominent: Boolean,
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 100
    }
  },

  computed: {
    classes: function classes() {
      return {
        'toolbar': true,
        'elevation-0': this.flat,
        'toolbar--absolute': this.absolute,
        'toolbar--card': this.card,
        'toolbar--dense': this.dense,
        'toolbar--fixed': this.fixed,
        'toolbar--floating': this.floating,
        'toolbar--prominent': this.prominent,
        'toolbar--extended': this.isExtended,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    },
    styles: function styles() {
      return {
        marginTop: this.marginTop
      };
    }
  },

  watch: {
    isScrolling: function isScrolling(val) {
      if (!val) this.marginTop = 0;else this.marginTop = -this.$refs.content.clientHeight - 6 + 'px';
    }
  },

  methods: {
    onScroll: function onScroll() {
      if (typeof window === 'undefined') return;

      if (!this.target) {
        this.target = this.scrollTarget ? document.querySelector(this.scrollTarget) : window;
      }

      var currentScroll = this.scrollTarget ? this.target.scrollTop : this.target.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll < this.scrollThreshold) return;

      if (this.previousScroll === null) {
        this.previousScroll = currentScroll;
      }

      this.isScrolling = this.previousScroll < currentScroll;

      this.previousScroll = currentScroll;
    }
  },

  render: function render(h) {
    this.isExtended = this.extended || !!this.$slots.extension;
    var children = [];
    var data = {
      'class': this.classes,
      style: this.styles,
      on: this.$listeners
    };

    if (this.scrollOffScreen) {
      data.directives = [{
        name: 'scroll',
        value: {
          callback: this.onScroll,
          target: this.scrollTarget
        }
      }];
    }

    children.push(h('div', {
      'class': 'toolbar__content',
      ref: 'content'
    }, this.$slots.default));

    if (this.isExtended) {
      children.push(h('div', {
        'class': 'toolbar__extension'
      }, this.$slots.extension));
    }

    return h('nav', data, children);
  }
});

/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VBtn__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VIcon__ = __webpack_require__(3);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-toolbar-side-icon',

  functional: true,

  render: function render(h, _ref) {
    var slots = _ref.slots,
        listeners = _ref.listeners,
        props = _ref.props,
        data = _ref.data;

    var classes = data.staticClass ? data.staticClass + ' toolbar__side-icon' : 'toolbar__side-icon';

    var d = Object.assign(data, {
      staticClass: classes,
      props: Object.assign(props, {
        icon: true
      }),
      on: listeners
    });

    var defaultSlot = slots().default;

    return h(__WEBPACK_IMPORTED_MODULE_0__components_VBtn__["a" /* default */], d, defaultSlot || [h(__WEBPACK_IMPORTED_MODULE_1__components_VIcon__["a" /* default */], 'menu')]);
  }
});

/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = install;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__badge__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__click_outside__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resize__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ripple__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scroll__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tooltip__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__touch__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Badge", function() { return __WEBPACK_IMPORTED_MODULE_0__badge__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ClickOutside", function() { return __WEBPACK_IMPORTED_MODULE_1__click_outside__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ripple", function() { return __WEBPACK_IMPORTED_MODULE_3__ripple__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Resize", function() { return __WEBPACK_IMPORTED_MODULE_2__resize__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scroll", function() { return __WEBPACK_IMPORTED_MODULE_4__scroll__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return __WEBPACK_IMPORTED_MODULE_5__tooltip__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Touch", function() { return __WEBPACK_IMPORTED_MODULE_6__touch__["a"]; });










function install(Vue) {
  Vue.directive('badge', __WEBPACK_IMPORTED_MODULE_0__badge__["a" /* default */]);
  Vue.directive('click-outside', __WEBPACK_IMPORTED_MODULE_1__click_outside__["a" /* default */]);
  Vue.directive('ripple', __WEBPACK_IMPORTED_MODULE_3__ripple__["a" /* default */]);
  Vue.directive('resize', __WEBPACK_IMPORTED_MODULE_2__resize__["a" /* default */]);
  Vue.directive('scroll', __WEBPACK_IMPORTED_MODULE_4__scroll__["a" /* default */]);
  Vue.directive('tooltip', __WEBPACK_IMPORTED_MODULE_5__tooltip__["a" /* default */]);
  Vue.directive('touch', __WEBPACK_IMPORTED_MODULE_6__touch__["a" /* default */]);
}

/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);


function directive(el, binding) {
  var config = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* directiveConfig */])(binding, {
    icon: false,
    left: false,
    bottom: false,
    overlap: false,
    visible: true
  });

  if (!config.visible || binding.expression && !binding.value) {
    return unbind(el);
  }

  if (config.overlap) el.classList.add('badge--overlap');
  if (config.icon) el.classList.add('badge--icon');
  if (config.left) el.classList.add('badge--left');
  if (config.bottom) el.classList.add('badge--bottom');

  el.dataset.badge = config.value;
  el.classList.add('badge');
}

function unbind(el) {
  el.removeAttribute('data-badge');
  el.classList.remove('badge');
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'badge',
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
});

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function inserted(el, binding) {
  var callback = typeof binding.value === 'function' ? binding.value : binding.value.callback;
  var options = binding.value.options || { passive: true };
  var target = binding.value.target || window;
  if (target === 'undefined') return;

  if (target !== window) {
    target = document.querySelector(target);
  }

  target.addEventListener('scroll', callback, options);

  el._onScroll = {
    target: target,
    options: options
  };
}

function unbind(el, binding) {
  var _el$_onScroll = el._onScroll,
      target = _el$_onScroll.target,
      options = _el$_onScroll.options;


  target.removeEventListener('scroll', binding.callback, options);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'scroll',
  inserted: inserted,
  unbind: unbind
});

/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(2);


function directive(el, binding) {
  var config = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* directiveConfig */])(binding, {
    top: true,
    visible: true
  });

  if (!config.visible || binding.expression && !binding.value) {
    return unbind(el);
  }

  unbind(el, binding, config);

  el.dataset.tooltip = config.html;
  el.dataset['tooltipLocation'] = config.value;
}

function unbind(el) {
  el.removeAttribute('data-tooltip');
  el.removeAttribute('data-tooltip-location');
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'tooltip',
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=vuetify.js.map