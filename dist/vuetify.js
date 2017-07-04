/*!
* Vuetify v0.13.0
* Forged by John Leider
* Released under the MIT License.
*/   
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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = createSimpleFunctional;
/* harmony export (immutable) */ __webpack_exports__["d"] = createSimpleTransition;
/* harmony export (immutable) */ __webpack_exports__["e"] = directiveConfig;
/* harmony export (immutable) */ __webpack_exports__["a"] = addOnceEventListener;
/* harmony export (immutable) */ __webpack_exports__["f"] = getObjectValueByPath;
/* harmony export (immutable) */ __webpack_exports__["b"] = createRange;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createSimpleFunctional(c) {
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';

  return {
    functional: true,

    render: function render(h, _ref) {
      var data = _ref.data,
          children = _ref.children;

      data.staticClass = data.staticClass ? c + ' ' + (data.staticClass || '') : c;

      return h(el, data, children);
    }
  };
}

function createSimpleTransition(name) {
  var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top center 0';
  var mode = arguments[2];

  return {
    functional: true,

    props: {
      origin: String,
      default: origin
    },

    render: function render(h, context) {
      context.data = context.data || {};
      context.data.props = { name: name };
      context.data.on = context.data.on || {};

      if (mode) context.data.props.mode = mode;

      context.data.on.beforeEnter = function (el) {
        el.style.transformOrigin = origin;
        el.style.webkitTransformOrigin = origin;
      };

      return h('transition', context.data, context.children);
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
  path = path.replace(/\[(\w+)\]/g, '.$1' // convert indexes to properties
  );path = path.replace(/^\./, '' // strip a leading dot
  );var a = path.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (obj.constructor === Object && k in obj) {
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      isActive: !!this.value
    };
  },


  props: {
    value: {
      required: false
    }
  },

  watch: {
    value: function value(val) {
      this.isActive = !!val;
    },
    isActive: function isActive(val) {
      !!val !== this.value && this.$emit('input', val);
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    dark: Boolean,
    light: Boolean
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
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

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__themeable__ = __webpack_require__(2);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__themeable__["a" /* default */]],

  data: function data() {
    return {
      errorBucket: [],
      focused: false,
      tabFocused: false,
      lazyValue: this.value
    };
  },


  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    error: Boolean,
    errorMessages: {
      type: [String, Array],
      default: function _default() {
        return [];
      }
    },
    hint: String,
    hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    required: Boolean,
    rules: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    tabindex: {
      default: 0
    },
    value: {
      required: false
    }
  },

  computed: {
    hasError: function hasError() {
      return this.validations.length || this.error;
    },
    inputGroupClasses: function inputGroupClasses() {
      return Object.assign({
        'input-group': true,
        'input-group--focused': this.focused,
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
      return this.inputValue;
    },
    modifiers: function modifiers() {
      var modifiers = {
        lazy: false,
        number: false,
        trim: false
      };

      if (!this.$vnode.data.directives) {
        return modifiers;
      }

      var model = this.$vnode.data.directives.find(function (i) {
        return i.name === 'model';
      });

      if (!model) {
        return modifiers;
      }

      return Object.assign(modifiers, model.modifiers);
    },
    validations: function validations() {
      return (!Array.isArray(this.errorMessages) ? [this.errorMessages] : this.errorMessages).concat(this.errorBucket);
    }
  },

  watch: {
    rules: function rules() {
      this.validate();
    }
  },

  mounted: function mounted() {
    this.validate();
  },


  methods: {
    genLabel: function genLabel() {
      var data = {};

      if (this.id) data.attrs = { for: this.id };

      return this.$createElement('label', data, this.label);
    },
    genMessages: function genMessages() {
      var _this = this;

      var messages = [];

      if ((this.hint && this.focused || this.hint && this.persistentHint) && this.validations.length === 0) {
        messages = [this.genHint()];
      } else if (this.validations.length) {
        messages = this.validations.map(function (i) {
          return _this.genError(i);
        });
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
        key: this.hint
      }, this.hint);
    },
    genError: function genError(error) {
      return this.$createElement('div', {
        'class': 'input-group__error',
        key: error
      }, error);
    },
    genIcon: function genIcon(type) {
      var _class;

      var icon = this[type + 'Icon'];
      var cb = this[type + 'IconCb'];
      var hasCallback = typeof cb === 'function';

      return this.$createElement('v-icon', {
        'class': (_class = {}, _defineProperty(_class, 'input-group__' + type + '-icon', true), _defineProperty(_class, 'input-group__icon-cb', hasCallback), _class),
        on: {
          click: function click(e) {
            hasCallback && cb(e);
          }
        }
      }, icon);
    },
    genInputGroup: function genInputGroup(input) {
      var _this2 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var children = [];
      var wrapperChildren = [];
      var detailsChildren = [];

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.tabindex
        },
        on: {
          blur: function blur() {
            return _this2.tabFocused = false;
          },
          click: function click() {
            return _this2.tabFocused = false;
          },
          keyup: function keyup(e) {
            if ([9, 16].includes(e.keyCode)) {
              _this2.tabFocused = true;
            }
          },
          keydown: function keydown(e) {
            if (!_this2.toggle) return;

            if ([13, 32].includes(e.keyCode)) {
              e.preventDefault();
              _this2.toggle();
            }
          }
        }
      }, data);

      if (this.label) {
        children.push(this.genLabel());
      }

      wrapperChildren.push(input);

      if (this.prependIcon) {
        wrapperChildren.unshift(this.genIcon('prepend'));
      }

      if (this.appendIcon) {
        wrapperChildren.push(this.genIcon('append'));
      }

      children.push(this.$createElement('div', {
        'class': 'input-group__input'
      }, wrapperChildren));

      detailsChildren.push(this.genMessages());
      this.counter && detailsChildren.push(this.genCounter());

      children.push(this.$createElement('div', {
        'class': 'input-group__details'
      }, detailsChildren));

      return this.$createElement('div', data, children);
    },
    validate: function validate() {
      var _this3 = this;

      this.errorBucket = [];

      this.rules.forEach(function (rule) {
        var valid = typeof rule === 'function' ? rule(_this3.value) : rule;

        if (valid !== true) {
          _this3.errorBucket.push(valid);
        }
      });
    }
  }
});

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: Boolean,
    router: Boolean,
    tag: String,
    target: String,
    download: String
  },

  methods: {
    click: function click() {},
    generateRouteLink: function generateRouteLink() {
      var exact = this.exact;
      var tag = void 0;
      var options = this.to || this.href;

      var data = {
        attrs: { disabled: this.disabled },
        class: this.classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.ripple || false
        }]
      };

      if (!this.exact) {
        exact = this.href === '/' || this.to === '/' || this.href === Object(this.href) && this.href.path === '/' || this.to === Object(this.to) && this.to.path === '/';
      }

      if (options && this.router) {
        tag = this.nuxt ? 'nuxt-link' : 'router-link';
        data.props.to = options;
        data.props.exact = exact;
        data.props.activeClass = this.activeClass;
        data.props.append = this.append;
        data.props.replace = this.replace;
        data.nativeOn = { click: this.click };
      } else {
        tag = this.tag || 'a';

        if (tag === 'a') {
          data.attrs.href = options || 'javascript:;';
          if (this.target) data.attrs.target = this.target;

          data.attrs.download = this.download;
        }

        data.on = { click: this.click };
      }

      return { tag: tag, data: data };
    }
  }
});

/***/ }),
/* 7 */
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
/* 8 */
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
  }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
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
/* 10 */
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
      var app = document.querySelector('[data-app]');
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      overlayOffset: 0,
      overlay: null
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

      if (!this.isActive || this.hideOverlay) return;

      var overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.onclick = function () {
        if (_this.permanet) return;else if (!_this.persistent) _this.isActive = false;else if (_this.isMobile) _this.isActive = false;
      };

      if (this.absolute) overlay.className += ' overlay--absolute';

      this.hideScroll();

      if (this.absolute) {
        // Required for IE11
        this.$el.parentNode.insertBefore(overlay, this.$el.parentNode.firstChild);
      } else {
        document.querySelector('[data-app]').appendChild(overlay);
      }

      setTimeout(function () {
        overlay.className += ' overlay--active';
        _this.overlay = overlay;
      }, 0);

      return true;
    },
    removeOverlay: function removeOverlay() {
      var _this2 = this;

      if (!this.overlay) {
        return this.showScroll();
      }

      this.overlay.className = this.overlay.className.replace('overlay--active', '');

      requestAnimationFrame(function () {
        // IE11 Fix
        try {
          _this2.overlay.parentNode.removeChild(_this2.overlay);
          _this2.overlay = null;
          _this2.showScroll();
        } catch (e) {}
      });
    },
    hideScroll: function hideScroll() {
      // Check documentElement first for IE11
      // this.overlayOffset = document.documentElement &&
      //   document.documentElement.scrollTop ||
      //   document.body.scrollTop

      // document.body.style.top = `-${this.overlayOffset}px`
      // document.body.style.position = 'fixed'
      document.documentElement.style.overflow = 'hidden';
    },
    showScroll: function showScroll() {
      document.documentElement.removeAttribute('style'

      // if (!this.overlayOffset) return
      // document.body.scrollTop = this.overlayOffset
      // document.documentElement.scrollTop = this.overlayOffset
      );
    }
  }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    enter: function enter(el, done) {
      // Remove initial transition
      el.style.transition = 'none';
      __WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */](el, 'transitionend', done

      // Get height that is to be scrolled
      );el.style.overflow = 'hidden';
      el.style.height = null;
      el.style.display = 'block';
      var height = el.clientHeight + 'px';
      el.style.height = 0;
      el.style.transition = null;

      setTimeout(function () {
        return el.style.height = height;
      }, 50);
    },
    afterEnter: function afterEnter(el) {
      el.style.height = 'auto';
      el.style.overflow = null;
    },
    leave: function leave(el, done) {
      // Remove initial transition
      el.style.transition = 'none';
      __WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */](el, 'transitionend', done

      // Set height before we transition to 0
      );el.style.overflow = 'hidden';
      el.style.height = el.clientHeight + 'px';
      el.style.transition = null;

      setTimeout(function () {
        return el.style.height = 0;
      }, 50);
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(4);



/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */]],

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
    }
  },

  watch: {
    indeterminate: function indeterminate(val) {
      this.inputDeterminate = val;
    }
  },

  methods: {
    genLabel: function genLabel() {
      return this.$createElement('label', { on: { click: this.toggle } }, this.label);
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

      this.$emit('change', input);
    }
  }
});

/***/ }),
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_index__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_index__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_load__ = __webpack_require__(137);
__webpack_require__(17);





function plugin(Vue) {
  Object.keys(__WEBPACK_IMPORTED_MODULE_0__components_index__["a" /* default */]).forEach(function (key) {
    Vue.component('V' + key, __WEBPACK_IMPORTED_MODULE_0__components_index__["a" /* default */][key]);
  });

  Object.keys(__WEBPACK_IMPORTED_MODULE_1__directives_index__["a" /* default */]).forEach(function (key) {
    Vue.directive(key, __WEBPACK_IMPORTED_MODULE_1__directives_index__["a" /* default */][key]);
  });

  Vue.prototype.$vuetify = {
    load: __WEBPACK_IMPORTED_MODULE_2__util_load__["a" /* default */]
  };
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

/* harmony default export */ __webpack_exports__["default"] = (plugin);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alerts_index__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_index__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__avatars_index__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__breadcrumbs_index__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buttons_index__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cards_index__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__carousel_index__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__chips_index__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pickers_index__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dialogs_index__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dividers_index__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__expansion_panel_index__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__footer_index__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__forms_index__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__grid_index__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__icons_index__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lists_index__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__menus_index__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__navigation_drawer_index__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__toolbar_index__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pagination_index__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__parallax_index__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__progress_index__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__selects_index__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__sliders_index__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__subheaders_index__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__steppers_index__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__tables_index__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__tabs_index__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__transitions_index__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__snackbars_index__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__bottom_nav_index__ = __webpack_require__(130);

































/* harmony default export */ __webpack_exports__["a"] = (Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__alerts_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__app_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__avatars_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__breadcrumbs_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__buttons_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__cards_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__carousel_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__chips_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__pickers_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9__dialogs_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_10__dividers_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_11__expansion_panel_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_12__footer_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_13__forms_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_14__grid_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_15__icons_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_16__lists_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_17__menus_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_18__navigation_drawer_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_19__toolbar_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_20__pagination_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_21__parallax_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_22__progress_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_23__selects_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_24__sliders_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_25__subheaders_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_26__steppers_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_27__tables_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_28__tabs_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_29__transitions_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_30__snackbars_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_31__bottom_nav_index__["a" /* default */]));

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Alert__ = __webpack_require__(20);


/* harmony default export */ __webpack_exports__["a"] = ({
  Alert: __WEBPACK_IMPORTED_MODULE_0__Alert__["a" /* default */]
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_transitionable__ = __webpack_require__(21);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'alert',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_transitionable__["a" /* default */]],

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
        'success': this.success,
        'warning': this.warning,
        'primary': this.primary,
        'secondary': this.secondary
      };
    },
    mdIcon: function mdIcon() {
      switch (true) {
        case Boolean(this.icon):
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

    !this.hideIcon && this.mdIcon && children.unshift(h('v-icon', {
      'class': 'alert__icon',
      props: { large: true }
    }, this.mdIcon));

    if (this.dismissible) {
      children.push(h('a', {
        'class': 'alert__dismissible',
        domProps: { href: 'javascript:;' },
        on: { click: function click() {
            return _this.$emit('input', false);
          } }
      }, [h('v-icon', { props: { right: true, large: true } }, 'cancel')]));
    }

    var alert = h('div', {
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }]
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
/* 21 */
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App__ = __webpack_require__(23);


/* harmony default export */ __webpack_exports__["a"] = ({
  App: __WEBPACK_IMPORTED_MODULE_0__App__["a" /* default */]
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  functional: true,

  props: {
    light: {
      type: Boolean,
      default: true
    },
    dark: Boolean,
    id: {
      type: String,
      default: 'app'
    }
  },

  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    data.staticClass = data.staticClass ? 'application ' + data.staticClass + ' ' : 'application ';

    data.staticClass += 'application--' + (props.dark ? 'dark' : 'light');

    var toolbar = children.find(function (c) {
      return c.tag === 'nav';
    });
    var footer = children.find(function (c) {
      return c.tag === 'footer';
    });

    if (toolbar) data.staticClass += ' application--toolbar';
    if (footer) {
      data.staticClass += ' application--footer';

      if (footer.data && (footer.data.staticClass.indexOf('--fixed') !== -1 || footer.data.staticClass.indexOf('--absolute') !== -1)) data.staticClass += ' application--footer-fixed';
    }

    data.attrs = { 'data-app': true };
    data.domProps = { id: props.id };

    return h('div', data, children);
  }
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Avatar */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


var Avatar = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('avatar');

/* harmony default export */ __webpack_exports__["a"] = ({
  Avatar: Avatar
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Breadcrumbs__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BreadcrumbsItem__ = __webpack_require__(27);



/* harmony default export */ __webpack_exports__["a"] = ({
  Breadcrumbs: __WEBPACK_IMPORTED_MODULE_0__Breadcrumbs__["a" /* default */],
  BreadcrumbsItem: __WEBPACK_IMPORTED_MODULE_1__BreadcrumbsItem__["a" /* default */]
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'breadcrumbs',

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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(6);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'breadcrumbs-item',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_route_link__["a" /* default */]],

  inject: ['divider'],

  props: {
    activeClass: {
      type: String,
      default: 'breadcrumbs__item--active'
    }
  },

  computed: {
    classes: function classes() {
      return {
        'breadcrumbs__item': true,
        'breadcrumbs__item--disabled': this.disabled
      };
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Button__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonToggle_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonToggle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ButtonToggle_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SpeedDial__ = __webpack_require__(33);




/* harmony default export */ __webpack_exports__["a"] = ({
  Btn: __WEBPACK_IMPORTED_MODULE_0__Button__["a" /* default */],
  BtnToggle: __WEBPACK_IMPORTED_MODULE_1__ButtonToggle_vue___default.a,
  SpeedDial: __WEBPACK_IMPORTED_MODULE_2__SpeedDial__["a" /* default */]
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_positionable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_route_link__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__ = __webpack_require__(1);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'btn',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_route_link__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__["a" /* default */]],

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
    }
  },

  computed: {
    classes: function classes() {
      return {
        'btn': true,
        'btn--absolute': this.absolute,
        'btn--active': this.isActive,
        'btn--block': this.block,
        'btn--bottom': this.bottom,
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
        'theme--dark dark--bg': this.dark,
        'theme--light light--bg': this.light,
        'primary': this.primary && !this.outline,
        'secondary': this.secondary && !this.outline,
        'success': this.success && !this.outline,
        'info': this.info && !this.outline,
        'warning': this.warning && !this.outline,
        'error': this.error && !this.outline,
        'primary--text': this.primary && (this.outline || this.flat),
        'secondary--text': this.secondary && (this.outline || this.flat),
        'success--text': this.success && (this.outline || this.flat),
        'info--text': this.info && (this.outline || this.flat),
        'warning--text': this.warning && (this.outline || this.flat),
        'error--text': this.error && (this.outline || this.flat)
      };
    }
  },

  methods: {
    // Prevent focus to match md spec
    click: function click(e) {
      !this.fab && e.detail && this.$el.blur();
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

    return h(tag, data, children);
  }
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(32),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'button-toggle',

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    multiple: Boolean,

    mandatory: {
      type: Boolean,
      value: false
    },

    inputValue: {
      required: false
    }
  },

  computed: {
    classes: function classes() {
      return {
        'btn-toggle--selected': this.inputValue && !this.multiple || this.inputValue && this.inputValue.length > 0
      };
    }
  },

  methods: {
    isSelected: function isSelected(item) {
      if (!this.multiple) {
        return this.inputValue === item.value;
      }

      return this.inputValue.includes(item.value);
    },
    updateValue: function updateValue(item) {
      if (!this.multiple) {
        if (this.mandatory && this.inputValue === item.value) return;
        return this.$emit('change', this.inputValue === item.value ? null : item.value);
      }

      var items = this.inputValue.slice();

      var i = items.indexOf(item.value);
      if (i !== -1) {
        items.length > 1 && !this.mandatory && items.splice(i, 1);
      } else {
        items.push(item.value);
      }

      this.$emit('change', items);
    }
  }
});

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "btn-toggle",
    class: _vm.classes
  }, _vm._l((_vm.items), function(item, index) {
    return _c('v-btn', {
      key: index,
      attrs: {
        "data-selected": _vm.isSelected(item),
        "data-index": index,
        "data-only-child": _vm.isSelected(item) && (!_vm.multiple || _vm.inputValue.length === 1),
        "flat": "flat"
      },
      nativeOn: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.updateValue(item)
        }
      }
    }, [(item.text) ? _c('span', {
      domProps: {
        "textContent": _vm._s(item.text)
      }
    }) : _vm._e(), (item.icon) ? _c('v-icon', [_vm._v(_vm._s(item.icon))]) : _vm._e()], 1)
  }))
},staticRenderFns: []}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_positionable__ = __webpack_require__(7);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'speed-dial',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

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
      children = this.$slots.default.map(function (b, i) {
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Card__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CardMedia__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CardTitle__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_helpers__ = __webpack_require__(0);





var CardActions = __WEBPACK_IMPORTED_MODULE_3__util_helpers__["c" /* createSimpleFunctional */]('card__actions');
var CardText = __WEBPACK_IMPORTED_MODULE_3__util_helpers__["c" /* createSimpleFunctional */]('card__text');

/* harmony default export */ __webpack_exports__["a"] = ({
  Card: __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* default */],
  CardActions: CardActions,
  CardMedia: __WEBPACK_IMPORTED_MODULE_1__CardMedia__["a" /* default */],
  CardText: CardText,
  CardTitle: __WEBPACK_IMPORTED_MODULE_2__CardTitle__["a" /* default */]
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = ({
  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  props: {
    flat: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    img: String,
    hover: Boolean,
    raised: Boolean,
    tile: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children,
        style = _ref.style;

    data.staticClass = data.staticClass ? 'card ' + data.staticClass : 'card';
    data.style = style || {};
    data.style.height = props.height;

    if (props.horizontal) data.staticClass += ' card--horizontal';
    if (props.hover) data.staticClass += ' card--hover';
    if (props.raised) data.staticClass += ' card--raised';
    if (props.tile) data.staticClass += ' card--tile';
    if (props.flat) data.staticClass += ' card--flat';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    if (props.img) {
      data.style.background = 'url(' + props.img + ') center center / cover no-repeat';
    }

    return h('div', data, children);
  }
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'card-media',

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
      }
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
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
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
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Carousel_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Carousel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Carousel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue__);



/* harmony default export */ __webpack_exports__["a"] = ({
  Carousel: __WEBPACK_IMPORTED_MODULE_0__Carousel_vue___default.a,
  CarouselItem: __WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue___default.a
});

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(40),
  /* template */
  __webpack_require__(41),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(8);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'carousel',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */]],

  data: function data() {
    return {
      current: null,
      items: [],
      slideInterval: {},
      reverse: false
    };
  },


  props: {
    cycle: {
      type: Boolean,
      default: true
    },

    icon: {
      type: String,
      default: 'fiber_manual_record'
    },

    interval: {
      type: Number,
      default: 6000
    }
  },

  computed: {
    defaultState: function defaultState() {
      return {
        current: null,
        reverse: false
      };
    }
  },

  watch: {
    current: function current() {
      var _this = this;

      // Evaluate items when current changes to account for
      // dynamic changing of children
      this.items = this.$children.filter(function (i) {
        return i.$el.classList && i.$el.classList.contains('carousel__item');
      });

      this.items.forEach(function (i) {
        return i.open(_this.items[_this.current]._uid, _this.reverse);
      });

      !this.isBooted && this.cycle && this.restartInterval();
      this.isBooted = true;
    },
    cycle: function cycle(val) {
      val && this.restartInterval() || clearInterval(this.slideInterval);
    }
  },

  mounted: function mounted() {
    this.init();
  },


  methods: {
    restartInterval: function restartInterval() {
      clearInterval(this.slideInterval);
      this.$nextTick(this.startInterval);
    },
    init: function init() {
      this.current = 0;
    },
    next: function next() {
      this.reverse = false;

      if (this.current + 1 === this.items.length) {
        return this.current = 0;
      }

      this.current++;
    },
    prev: function prev() {
      this.reverse = true;

      if (this.current - 1 < 0) {
        return this.current = this.items.length - 1;
      }

      this.current--;
    },
    select: function select(index) {
      this.reverse = index < this.current;
      this.current = index;
    },
    startInterval: function startInterval() {
      this.slideInterval = setInterval(this.next, this.interval);
    }
  }
});

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "carousel"
  }, [_c('div', {
    staticClass: "carousel__left"
  }, [_c('v-btn', {
    attrs: {
      "icon": "icon",
      "dark": "dark"
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.prev($event)
      }
    }
  }, [_c('v-icon', [_vm._v("chevron_left")])], 1)], 1), _c('div', {
    staticClass: "carousel__right"
  }, [_c('v-btn', {
    attrs: {
      "icon": "icon",
      "dark": "dark"
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.next($event)
      }
    }
  }, [_c('v-icon', [_vm._v("chevron_right")])], 1)], 1), _c('div', {
    staticClass: "carousel__controls"
  }, _vm._l((_vm.items), function(item, index) {
    return _c('v-btn', {
      staticClass: "carousel__controls__item",
      class: {
        'carousel__controls__item--active': index === _vm.current
      },
      attrs: {
        "icon": "icon",
        "dark": "dark"
      },
      nativeOn: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.select(index)
        }
      }
    }, [_c('v-icon', [_vm._v(_vm._s(_vm.icon))])], 1)
  })), _vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(43),
  /* template */
  __webpack_require__(44),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'carousel-item',

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
      default: 'v-tab-transition'
    },

    reverseTransition: {
      type: String,
      default: 'v-tab-reverse-transition'
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
  }
});

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c(_vm.computedTransition, {
    tag: "component"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.active),
      expression: "active"
    }],
    staticClass: "carousel__item",
    class: {
      'reverse': _vm.reverse
    },
    style: (_vm.styles)
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Chip__ = __webpack_require__(46);


/* harmony default export */ __webpack_exports__["a"] = ({
  Chip: __WEBPACK_IMPORTED_MODULE_0__Chip__["a" /* default */]
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'chip',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  props: {
    close: Boolean,
    label: Boolean,
    outline: Boolean,
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
        'chip--label': this.label,
        'chip--outline': this.outline,
        'chip--small': this.small,
        'chip--removable': this.close
      };
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [this.$slots.default];
    var data = {
      'class': this.classes,
      attrs: {
        tabindex: -1
      },
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    };

    if (this.close) {
      var icon = h('v-icon', { props: { right: true } }, 'cancel');

      children.push(h('a', {
        'class': 'chip__close',
        domProps: { href: 'javascript:;' },
        on: {
          click: function click(e) {
            e.preventDefault();

            _this.$emit('input', false);
          }
        }
      }, [icon]));
    }

    return h('span', data, children);
  }
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DatePicker__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TimePicker__ = __webpack_require__(53);



/* harmony default export */ __webpack_exports__["a"] = ({
  DatePicker: __WEBPACK_IMPORTED_MODULE_0__DatePicker__["a" /* default */],
  TimePicker: __WEBPACK_IMPORTED_MODULE_1__TimePicker__["a" /* default */]
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_date_title__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_date_header__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_date_table__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_date_years__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_picker__ = __webpack_require__(9);






var defaultDateFormat = function defaultDateFormat(val) {
  return new Date(val).toISOString().substr(0, 10);
};

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'date-picker',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_date_title__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_date_header__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_date_table__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_date_years__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_picker__["a" /* default */]],

  data: function data() {
    return {
      tableDate: new Date(),
      originalDate: this.value,
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      isSelected: false,
      isReversing: false
    };
  },


  props: {
    dateFormat: {
      type: Function,
      default: defaultDateFormat
    },
    titleDateFormat: {
      type: Function,
      default: function _default(_ref) {
        var day = _ref.day,
            dayName = _ref.dayName,
            month = _ref.month,
            monthName = _ref.monthName,
            landscape = _ref.landscape;

        return dayName.substr(0, 3) + ',' + (landscape ? '<br>' : '') + ' ' + monthName.substr(0, 3) + ' ' + day;
      }
    },
    headerDateFormat: {
      type: Function,
      default: function _default(_ref2) {
        var month = _ref2.month,
            monthName = _ref2.monthName,
            year = _ref2.year;
        return monthName + ' ' + year;
      }
    },
    days: {
      type: Array,
      default: function _default() {
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      }
    },
    shortDays: {
      type: [Function, Array],
      default: function _default(day) {
        return day && day.substr(0, 1);
      }
    },
    formattedValue: {
      required: false
    },
    months: {
      type: Array,
      default: function _default() {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      }
    },
    allowedDates: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    firstDayOfWeek: {
      type: String,
      default: 'Sunday'
    }
  },

  computed: {
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
    dayName: function dayName() {
      return this.inputDate ? this.week[this.inputDate.getDay()] : '';
    },
    monthName: function monthName() {
      return this.inputDate ? this.months[this.month] : '';
    },
    computedTransition: function computedTransition() {
      return this.isReversing ? 'v-tab-reverse-transition' : 'v-tab-transition';
    },
    week: function week() {
      var week = [];
      var index = this.days.indexOf(this.firstDayOfWeek);

      while (week.length < 7) {
        week.push(this.days[index % 7]);
        index += 1;
      }

      return week;
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

  mounted: function mounted() {
    this.currentDay = this.tableDate.getDate();
    this.currentMonth = this.tableDate.getMonth();
    this.currentYear = this.tableDate.getFullYear();
    this.tableDate = this.inputDate;
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
      'class': {
        'picker picker--date': true,
        'picker--landscape': this.landscape,
        'picker--dark': this.dark,
        'picker--light': this.light && !this.dark
      }
    }, children);
  }
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTitle: function genTitle() {
      var _this = this;

      var date = this.titleDateFormat({
        day: this.day,
        dayName: this.dayName,
        month: this.month,
        monthName: this.monthName,
        landscape: this.landscape
      });

      var text = this.$createElement('transition', {
        props: {
          name: 'slide-x-transition',
          mode: 'out-in'
        }
      }, [this.$createElement('div', {
        domProps: { innerHTML: date },
        key: date
      })]);

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
      }, this.year), this.$createElement('div', {
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
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genHeader: function genHeader() {
      return this.$createElement('div', {
        'class': 'picker--date__header'
      }, [this.genSelector()]);
    },
    genSelector: function genSelector() {
      var _this = this;

      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: function click(e) {
            e.stopPropagation();
            _this.tableDate = new Date(_this.tableYear, _this.tableMonth - 1);
          }
        }
      }, [this.$createElement('v-icon', 'chevron_left')]), this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [this.$createElement(this.computedTransition, [this.$createElement('strong', {
        key: this.tableMonth
      }, this.headerDateFormat({ month: this.tableMonth, monthName: this.months[this.tableMonth], year: this.tableYear }))])]), this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: function click(e) {
            e.stopPropagation();
            _this.tableDate = new Date(_this.tableYear, _this.tableMonth + 1);
          }
        }
      }, [this.$createElement('v-icon', 'chevron_right')])]);
    }
  }
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTable: function genTable() {
      var _this = this;

      var children = [];
      var data = {
        'class': 'picker--date__table'
      };

      if (this.scrollable) {
        data.on = {
          wheel: function wheel(e) {
            e.preventDefault();

            var month = _this.tableMonth;
            var year = _this.tableYear;
            var next = e.deltaY < 0;

            if (next) month++;else month--;

            _this.tableDate = new Date(year, month);
          }
        };
      }

      children.push(this.$createElement('table', {
        key: this.tableMonth
      }, [this.genTHead(), this.genTBody()]));

      return this.$createElement('div', data, [this.$createElement(this.computedTransition, children)]);
    },
    genTHead: function genTHead() {
      var _this2 = this;

      return this.$createElement('thead', {}, this.genTR(this.week.map(function (o, i) {
        return _this2.$createElement('th', Array.isArray(_this2.shortDays) && _this2.shortDays[i] || _this2.shortDays(o));
      })));
    },
    genTBody: function genTBody() {
      var _this3 = this;

      var children = [];
      var rows = [];
      var length = new Date(this.tableYear, this.tableMonth + 1, 0).getDate();

      var day = new Date(this.tableYear, this.tableMonth).getDay() - this.days.indexOf(this.firstDayOfWeek);

      for (var i = 0; i < day; i++) {
        rows.push(this.$createElement('td'));
      }

      var _loop = function _loop(_i) {
        rows.push(_this3.$createElement('td', [_this3.$createElement('button', {
          'class': {
            'btn btn--floating btn--small btn--flat': true,
            'btn--active': _this3.isActive(_i),
            'btn--current': _this3.isCurrent(_i),
            'btn--light': _this3.dark
          },
          attrs: {
            disabled: !_this3.isAllowed(new Date(_this3.tableYear, _this3.tableMonth, _i, 12, 0, 0, 0)),
            type: 'button'
          },
          domProps: {
            innerHTML: '<span class="btn__content">' + _i + '</span>'
          },
          on: {
            click: function click() {
              var day = _i < 10 ? '0' + _i : _i;
              var tableMonth = _this3.tableMonth + 1;
              tableMonth = tableMonth < 10 ? '0' + tableMonth : tableMonth;

              _this3.inputDate = _this3.tableYear + '-' + tableMonth + '-' + day + 'T12:00:00';
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
/* 52 */
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
        }, i));
      };

      for (var i = this.year + 100, length = this.year - 100; i > length; i--) {
        _loop(i, length);
      }
      return children;
    }
  }
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_picker__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_time_title__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_time_body__ = __webpack_require__(55);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'time-picker',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_picker__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_time_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_time_title__["a" /* default */]],

  data: function data() {
    return {
      isDragging: false,
      rotate: 0,
      originalTime: this.value,
      period: 'am',
      selectingHour: true,
      ranges: {
        hours: [].concat(_toConsumableArray(Array.from({ length: 24 }, function (v, k) {
          return k;
        }))),
        minutes: [].concat(_toConsumableArray(Array.from({ length: 60 }, function (v, k) {
          return k;
        })))
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
    divider: function divider() {
      if (!this.selectingHour) return 60;
      return this.is24hr ? 24 : 12;
    },
    degrees: function degrees() {
      return this.degreesPerUnit * Math.PI / 180;
    },
    degreesPerUnit: function degreesPerUnit() {
      return 360 / this.divider;
    },

    inputTime: {
      get: function get() {
        if (this.value && !(this.value instanceof Date)) return this.value;
        var value = new Date();

        if (this.value instanceof Date) {
          value = this.value;
        }

        var hour = value.getHours();
        var minute = value.getMinutes();
        var period = '';

        if (!this.is24hr) {
          hour = hour > 12 ? hour - 12 : hour;
          period = this.period;
        }

        hour = this.firstAllowed('hour', hour);
        minute = this.firstAllowed('minute', minute);

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
    },
    cancel: function cancel() {
      this.inputTime = this.originalTime;
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    isAllowed: function isAllowed(type, value) {
      var allowed = this['allowed' + (type.charAt(0).toUpperCase() + type.slice(1)) + 's'];

      if (!allowed) return true;

      if (Array.isArray(allowed)) {
        return !!allowed.find(function (v) {
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
      'class': {
        'picker picker--time': true,
        'picker--landscape': this.landscape,
        'picker--dark': this.dark,
        'picker--light': this.light && !this.dark,
        'picker--time--hours': this.selectingHour
      }
    }, children);
  }
});

/***/ }),
/* 54 */
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
      var _this2 = this;

      return this.$createElement('div', [this.$createElement('span', {
        'class': { active: this.period === 'am' },
        on: { click: function click() {
            return _this2.period = 'am';
          } }
      }, 'AM'), this.$createElement('span', {
        'class': { active: this.period === 'pm' },
        on: { click: function click() {
            return _this2.period = 'pm';
          } }
      }, 'PM')]);
    }
  }
});

/***/ }),
/* 55 */
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
          mousemove: this.onDragMove,
          touchstart: this.onMouseDown,
          touchcancel: this.onMouseUp,
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
      }, [this.$createElement('v-fade-transition', {
        props: { mode: 'out-in' }
      }, [this.$createElement('div', data, children)])]);
    },
    genHand: function genHand(type) {
      return [this.$createElement('div', {
        'class': 'picker--time__clock-hand ' + type,
        style: {
          transform: 'rotate(' + this.clockHand + 'deg)'
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
      return {
        x: Math.round(Math.sin(i * this.degrees) * this.radius * 0.8),
        y: Math.round(-Math.cos(i * this.degrees) * this.radius * 0.8)
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

      if (this.isAllowed(selecting, value)) {
        this[selecting] = value;
        this.hasChanged = true;
      }
    },
    angle: function angle(center, p1) {
      var p0 = {
        x: center.x,
        y: center.y + Math.sqrt(Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x) + Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))
      };
      return Math.abs(2 * Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI);
    }
  }
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dialog__ = __webpack_require__(57);


/* harmony default export */ __webpack_exports__["a"] = ({
  Dialog: __WEBPACK_IMPORTED_MODULE_0__Dialog__["a" /* default */]
});

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_detachable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__ = __webpack_require__(1);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'dialog',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__["a" /* default */]],

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
      default: 'v-dialog-transition'
    }
  },

  computed: {
    classes: function classes() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, ('dialog ' + this.contentClass).trim(), true), _defineProperty(_ref, 'dialog--active', this.isActive), _defineProperty(_ref, 'dialog--persistent', this.persistent), _defineProperty(_ref, 'dialog--fullscreen', this.fullscreen), _defineProperty(_ref, 'dialog--stacked-actions', this.stackedActions && !this.fullscreen), _defineProperty(_ref, 'dialog--scrollable', this.scrollable), _ref;
    },
    computedTransition: function computedTransition() {
      return !this.transition ? 'transition' : this.transition;
    }
  },

  watch: {
    isActive: function isActive(val) {
      if (val) {
        !this.fullscreen && !this.hideOverlay && this.genOverlay();
        this.fullscreen && this.hideScroll();
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

    var dialog = h(this.computedTransition, {
      props: { origin: this.origin }
    }, [h('div', data, this.lazy && this.isBooted || !this.lazy ? this.$slots.default : null)]);

    children.push(h('div', {
      'class': 'dialog__content',
      ref: 'content'
    }, [dialog]));

    return h('div', {
      'class': 'dialog__container',
      style: {
        display: this.fullWidth ? 'block' : 'inline-block'
      }
    }, children);
  }
});

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Divider = {
  functional: true,

  props: {
    dark: Boolean,
    inset: Boolean,
    light: Boolean
  },

  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    data.staticClass = data.staticClass ? 'divider ' + data.staticClass : 'divider';

    if (props.inset) data.staticClass += ' divider--inset';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    return h('hr', data);
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  Divider: Divider
});

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ExpansionPanel__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue__);



/* harmony default export */ __webpack_exports__["a"] = ({
  ExpansionPanel: __WEBPACK_IMPORTED_MODULE_0__ExpansionPanel__["a" /* default */],
  ExpansionPanelContent: __WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue___default.a
});

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'expansion-panel',

  props: {
    expand: Boolean
  },

  computed: {
    params: function params() {
      return {
        expand: this.expand
      };
    }
  },

  render: function render(h) {
    return h('ul', {
      'class': 'expansion-panel'
    }, this.$slots.default);
  }
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(62),
  /* template */
  __webpack_require__(63),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'expansion-panel-content',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  data: function data() {
    return {
      height: 'auto'
    };
  },


  props: {
    ripple: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'expansion-panel__header--active': this.isActive
      };
    }
  },

  methods: {
    closeConditional: function closeConditional(e) {
      return this.$parent.$el.contains(e.target) && !this.$parent.expand && !this.$el.contains(e.target);
    },
    toggle: function toggle() {
      this.isActive = !this.isActive;
    }
  }
});

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [(_vm.$slots.header) ? _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: (_vm.closeConditional),
      expression: "closeConditional"
    }, {
      name: "ripple",
      rawName: "v-ripple",
      value: (_vm.ripple),
      expression: "ripple"
    }],
    staticClass: "expansion-panel__header",
    class: _vm.classes,
    on: {
      "click": function($event) {
        _vm.isActive = !_vm.isActive
      }
    }
  }, [_vm._t("header")], 2) : _vm._e(), _c('transition', {
    on: {
      "enter": _vm.enter,
      "after-enter": _vm.afterEnter,
      "leave": _vm.leave
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isActive),
      expression: "isActive"
    }],
    ref: "body",
    staticClass: "expansion-panel__body"
  }, [_vm._t("default")], 2)])], 1)
},staticRenderFns: []}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Footer = {
  functional: true,

  props: {
    absolute: Boolean,
    fixed: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = data.staticClass ? 'footer ' + data.staticClass : 'footer';

    if (props.absolute) data.staticClass += ' footer--absolute';
    if (props.fixed) data.staticClass += ' footer--fixed';

    return h('footer', data, children);
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  Footer: Footer
});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Checkbox__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Radio__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Switch__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TextField__ = __webpack_require__(69);





/* harmony default export */ __webpack_exports__["a"] = ({
  Checkbox: __WEBPACK_IMPORTED_MODULE_0__Checkbox__["a" /* default */],
  Radio: __WEBPACK_IMPORTED_MODULE_1__Radio__["a" /* default */],
  Switch: __WEBPACK_IMPORTED_MODULE_2__Switch__["a" /* default */],
  TextField: __WEBPACK_IMPORTED_MODULE_3__TextField__["a" /* default */]
});

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__ = __webpack_require__(13);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'checkbox',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__["a" /* default */]],

  data: function data() {
    return {
      inputDeterminate: this.indeterminate
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
      if (this.inputDeterminate) {
        return 'indeterminate_check_box';
      } else if (this.isActive) {
        return 'check_box';
      } else {
        return 'check_box_outline_blank';
      }
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
      on: { click: this.toggle },
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    });

    return this.genInputGroup([transition, ripple]);
  }
});

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(14);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'radio',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    inputValue: [String, Number]
  },

  computed: {
    isActive: function isActive() {
      return this.inputValue === this.value;
    },
    classes: function classes() {
      return this.addColorClassChecks({
        'radio': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive
      });
    },
    icon: function icon() {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked';
    }
  },

  methods: {
    genLabel: function genLabel() {
      return this.$createElement('label', { on: { click: this.toggle } }, this.label);
    },
    toggle: function toggle() {
      if (!this.disabled) {
        this.$emit('change', this.value);
      }
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
      on: { click: this.toggle },
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    });

    return this.genInputGroup([transition, ripple]);
  }
});

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__ = __webpack_require__(13);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'switch',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__["a" /* default */]],

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
      on: { click: this.toggle },
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
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(4);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'text-field',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

  data: function data() {
    return {
      hasFocused: false,
      inputHeight: null
    };
  },


  props: {
    autofocus: Boolean,
    autoGrow: Boolean,
    counter: Boolean,
    fullWidth: Boolean,
    id: String,
    name: String,
    maxlength: [Number, String],
    max: [Number, String],
    min: [Number, String],
    step: [Number, String],
    multiLine: Boolean,
    prefix: String,
    readonly: Boolean,
    rows: {
      default: 5
    },
    singleLine: Boolean,
    solo: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    classes: function classes() {
      return {
        'input-group--text-field': true,
        'input-group--single-line': this.singleLine,
        'input-group--solo': this.solo,
        'input-group--multi-line': this.multiLine,
        'input-group--full-width': this.fullWidth,
        'input-group--prefix': this.prefix,
        'input-group--suffix': this.suffix
      };
    },
    hasError: function hasError() {
      return this.validations.length || this.errorMessages.length > 0 || !this.counterIsValid() || !this.validateIsValid() || this.error;
    },
    count: function count() {
      var inputLength = (this.inputValue && this.inputValue.toString() || '').length;
      var min = inputLength;

      if (this.counterMin !== 0 && inputLength < this.counterMin) {
        min = this.counterMin;
      }

      return min + ' / ' + this.counterMax;
    },
    counterMin: function counterMin() {
      var parsedMin = Number.parseInt(this.min, 10);
      return Number.isNaN(parsedMin) ? 0 : parsedMin;
    },
    counterMax: function counterMax() {
      var parsedMax = Number.parseInt(this.max, 10);
      return Number.isNaN(parsedMax) ? 25 : parsedMax;
    },

    inputValue: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        if (this.modifiers.trim) {
          val = val.trim();
        }

        if (this.modifiers.number) {
          val = Number(val);
        }

        if (!this.modifiers.lazy) {
          this.$emit('input', val);
        }

        this.lazyValue = val;
      }
    },
    isDirty: function isDirty() {
      return this.lazyValue !== null && typeof this.lazyValue !== 'undefined' && this.lazyValue.toString().length > 0;
    }
  },

  watch: {
    focused: function focused(val) {
      this.hasFocused = true;

      !val && this.$emit('change', this.lazyValue);
    },
    value: function value() {
      this.lazyValue = this.value;
      this.validate();
      this.multiLine && this.autoGrow && this.calculateInputHeight();
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.$vuetify.load(function () {
      _this.multiLine && _this.autoGrow && _this.calculateInputHeight();
      _this.autofocus && _this.focus();
    });
  },


  methods: {
    calculateInputHeight: function calculateInputHeight() {
      var height = this.$refs.input.scrollHeight;
      var minHeight = this.rows * 24;
      this.inputHeight = height < minHeight ? minHeight : height;
    },
    onInput: function onInput(e) {
      this.inputValue = e.target.value;
      this.multiLine && this.autoGrow && this.calculateInputHeight();
    },
    blur: function blur(e) {
      var _this2 = this;

      this.validate();
      this.$nextTick(function () {
        return _this2.focused = false;
      });
      this.$emit('blur', e);
    },
    focus: function focus(e) {
      this.focused = true;
      this.$refs.input.focus();
      this.$emit('focus', e);
    },
    genCounter: function genCounter() {
      return this.$createElement('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': !this.counterIsValid()
        }
      }, this.count);
    },
    genInput: function genInput() {
      var tag = this.multiLine ? 'textarea' : 'input';

      var data = {
        style: {
          'height': this.inputHeight && this.inputHeight + 'px'
        },
        domProps: {
          disabled: this.disabled,
          required: this.required,
          value: this.lazyValue,
          autofucus: this.autofocus
        },
        attrs: {
          tabindex: this.tabindex,
          readonly: this.readonly
        },
        on: {
          blur: this.blur,
          input: this.onInput,
          focus: this.focus
        },
        ref: 'input'
      };

      if (this.placeholder) data.domProps.placeholder = this.placeholder;
      if (this.autocomplete) data.domProps.autocomplete = true;
      if (this.name) data.attrs.name = this.name;
      if (this.maxlength) data.attrs.maxlength = this.maxlength;
      if (this.id) data.domProps.id = this.id;
      if (this.step) data.attrs.step = this.step;
      if (!this.counter) {
        if (this.max) data.attrs.max = this.max;
        if (this.min) data.attrs.min = this.min;
      }

      if (this.multiLine) {
        data.domProps.rows = this.rows;
      } else {
        data.domProps.type = this.type;
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

    counterIsValid: function counterIsValid() {
      var val = this.inputValue && this.inputValue.toString() || '';

      return !this.counter || val.length >= this.counterMin && val.length <= this.counterMax;
    },
    validateIsValid: function validateIsValid() {
      return !this.required || this.required && this.isDirty || !this.hasFocused || this.hasFocused && this.focused;
    }
  },

  render: function render() {
    return this.genInputGroup(this.genInput(), { attrs: { tabindex: false } });
  }
});

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


var Grid = function Grid(name) {
  return {
    functional: true,

    render: function render(h, _ref) {
      var data = _ref.data,
          children = _ref.children;

      data.staticClass = (name + ' ' + (data.staticClass || '')).trim();

      if (data.attrs) {
        data.staticClass += ' ' + Object.keys(data.attrs).join(' ');
        delete data.attrs;
      }

      return h('div', data, children);
    }
  };
};

var Container = Grid('container');
var Layout = Grid('layout');
var Flex = Grid('flex');

var Spacer = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('spacer');

/* harmony default export */ __webpack_exports__["a"] = ({
  Flex: Flex,
  Container: Container,
  Spacer: Spacer,
  Layout: Layout
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Icon__ = __webpack_require__(72);


/* harmony default export */ __webpack_exports__["a"] = ({
  Icon: __WEBPACK_IMPORTED_MODULE_0__Icon__["a" /* default */]
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__ = __webpack_require__(5);



/* harmony default export */ __webpack_exports__["a"] = ({
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
        children = _ref.children;

    var icon = props.fa ? 'fa' : props.mdi ? 'mdi' : 'material-icons';
    data.staticClass = data.staticClass ? icon + ' icon ' + data.staticClass + ' ' : icon + ' icon';
    data.attrs = data.attrs || {};

    if (props.dark) data.staticClass += ' theme--dark';
    if (props.light) data.staticClass += ' theme--light';

    var classes = {
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
      'error--text': props.error
    };

    var iconClasses = Object.keys(classes).filter(function (k) {
      return classes[k];
    }).join(' ');
    iconClasses && (data.staticClass += ' ' + iconClasses);

    if (props.fa || props.mdi) {
      var comparison = props.fa ? 'fa' : 'mdi';
      var text = children.pop().text;

      if (text.indexOf(' ') === -1) data.staticClass += ' ' + comparison + '-' + text;else data.staticClass += ' ' + comparison + '-' + text.split(' ').join('-');
    }

    if (props.disabled) {
      data.attrs.disabled = props.disabled;
    }

    return h('i', data, children);
  }
});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__List__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ListGroup__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ListTile__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ListTileAction__ = __webpack_require__(77);







var ListTileActionText = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('list__tile__action-text', 'span');
var ListTileAvatar = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('list__tile__avatar', 'v-avatar');
var ListTileContent = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('list__tile__content', 'div');
var ListTileTitle = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('list__tile__title', 'div');
var ListTileSubTitle = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('list__tile__sub-title', 'div');

/* harmony default export */ __webpack_exports__["a"] = ({
  List: __WEBPACK_IMPORTED_MODULE_1__List__["a" /* default */],
  ListTile: __WEBPACK_IMPORTED_MODULE_3__ListTile__["a" /* default */],
  ListGroup: __WEBPACK_IMPORTED_MODULE_2__ListGroup__["a" /* default */],
  ListTileAction: __WEBPACK_IMPORTED_MODULE_4__ListTileAction__["a" /* default */],
  ListTileActionText: ListTileActionText,
  ListTileAvatar: ListTileAvatar,
  ListTileContent: ListTileContent,
  ListTileTitle: ListTileTitle,
  ListTileSubTitle: ListTileSubTitle
});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'list',

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
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'list-group',

  inject: ['listClick', 'listClose'],

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

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
    '$route': function $route(to) {
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
      if (!this.$refs.item.querySelector('.list__tile--disabled')) {
        this.listClick(this._uid);
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
      on: { click: this.click },
      ref: 'item'
    }, [this.$slots.item]);

    var transition = h('transition', {
      on: {
        enter: this.enter,
        afterEnter: this.afterEnter,
        leave: this.leave
      }
    }, [group]);

    return h('div', { 'class': 'list--group__container' }, [item, transition]);
  }
});

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'list-tile',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_route_link__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  props: {
    activeClass: {
      type: String,
      default: 'list__tile--active'
    },
    avatar: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'list__tile': true,
        'list__tile--active': this.isActive,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled
      };
    }
  },

  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    return h('li', [h(tag, data, [this.$slots.default])]);
  }
});

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  functional: true,

  name: 'list-tile-action',

  render: function render(h, context) {
    var data = {
      'class': {
        'list__tile__action': true,
        'list__tile__action--stack': (context.children || []).length > 1
      }
    };

    return h('div', data, context.children);
  }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Menu_js__ = __webpack_require__(79);


/* harmony default export */ __webpack_exports__["a"] = ({
  Menu: __WEBPACK_IMPORTED_MODULE_0__Menu_js__["a" /* default */]
});

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_activator__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_detachable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_generators__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_position__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_utils__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_keyable__ = __webpack_require__(84);








/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'menu',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_activator__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_generators__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_keyable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_position__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_utils__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__["a" /* default */]],

  data: function data() {
    return {
      autoIndex: null,
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
      resizeTimeout: {},
      startIndex: 3,
      stopIndex: 0,
      tileLength: 0,
      window: {},
      absoluteX: 0,
      absoluteY: 0,
      insideContent: false,
      hasJustFocused: false,
      focusedTimeout: {}
    };
  },


  props: {
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
      type: String,
      default: 'v-menu-transition'
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
    minWidth: [Number, String]
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
        top: this.calcTop() + 'px',
        left: this.calcLeft() + 'px'
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
    hasJustFocused: function hasJustFocused(val) {
      var _this = this;

      if (!val) return;

      clearTimeout(this.focusedTimeout);
      this.focusedTimeout = setTimeout(function () {
        return _this.hasJustFocused = false;
      }, 100);
    },
    isActive: function isActive(val) {
      if (this.disabled) return;

      val && this.activate() || this.deactivate();
    },
    windowResizeHandler: function windowResizeHandler() {
      this.isBooted = false;
    }
  },

  mounted: function mounted() {
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.onResize, { passive: true });
    window.removeEventListener('resize', this.windowResizeHandler);
  },


  methods: {
    activate: function activate() {
      if (typeof window === 'undefined') return;
      this.insideContent = true;
      this.initWindow();
      this.getTiles();
      this.updateDimensions();
      requestAnimationFrame(this.startTransition);
    },
    deactivate: function deactivate() {
      this.isContentActive = false;
    },
    onResize: function onResize() {
      clearTimeout(this.resizeTimeout);
      if (!this.isActive) return;
      this.resizeTimeout = setTimeout(this.updateDimensions, 200);
    },
    startTransition: function startTransition() {
      this.isContentActive = true;
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

    var data = {
      'class': 'menu',
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
/* 80 */
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
      if (this.disabled || this.hasJustFocused) return;
      this.isActive = true;
    },
    mouseLeaveHandler: function mouseLeaveHandler(e) {
      if (this.insideContent) return;
      this.isActive = false;
      this.hasJustFocused = true;
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
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genActivator: function genActivator() {
      if (!this.$slots.activator) return null;

      var options = {
        'class': 'menu__activator',
        ref: 'activator',
        slot: 'activator',
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
      return this.$createElement(this.transition, {
        props: { origin: this.origin }
      }, [this.genContent()]);
    },
    genContent: function genContent() {
      var _this = this;

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
            if (_this.closeOnContentClick) _this.isActive = false;
          },
          mouseenter: function mouseenter(e) {
            _this.insideContent = true;
          },
          mouseleave: function mouseleave(e) {
            _this.insideContent = false;
            _this.openOnHover && _this.mouseLeaveHandler();
          }
        }
      }, [this.lazy && this.isBooted || !this.lazy ? this.$slots.default : null]);
    }
  }
});

/***/ }),
/* 82 */
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
        scrollTop = this.selectedIndex * 48 - 56;
      }

      this.$refs.content.scrollTop = scrollTop;
    },
    calcLeftAuto: function calcLeftAuto() {
      var a = this.dimensions.activator;

      return parseInt(a.left - 16);
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

      var offsetPadding = -16;
      // #708 Stop index should vary by tile length
      this.stopIndex = this.tiles.length > 4 ? this.tiles.length - 4 : this.tiles.length;

      if (selectedIndex > this.startIndex && selectedIndex < this.stopIndex) {
        actingIndex = 2;
        offsetPadding = 24;
      } else if (selectedIndex >= this.stopIndex) {
        offsetPadding = -8;
        actingIndex = selectedIndex - this.stopIndex;
      }

      return this.calcTop(true) + offsetPadding - actingIndex * 48;
    },
    calcLeft: function calcLeft() {
      if (this.auto) return this.calcLeftAuto();

      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      var left = this.left ? a.right - c.width : a.left;

      if (this.offsetX) left += this.left ? -a.width : a.width;
      if (this.nudgeLeft) left += this.nudgeLeft;
      if (this.nudgeRight) left -= this.nudgeRight;

      return this.calcXOverflow(left);
    },
    calcTop: function calcTop(force) {
      if (this.auto && !force) return this.calcTopAuto();

      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      var top = this.top ? a.bottom - c.height : a.top;

      if (this.offsetY) top += this.top ? -a.height : a.height;
      if (this.nudgeTop) top -= this.nudgeTop;
      if (this.nudgeBottom) top += this.nudgeBottom;

      return this.calcYOverflow(top) + this.window.pageYOffset;
    },
    calcXOverflow: function calcXOverflow(left) {
      var maxWidth = Math.max(this.dimensions.content.width, this.calculatedMinWidth, parseInt(this.maxWidth) || 0);
      var totalWidth = left + maxWidth;
      var availableWidth = totalWidth - this.window.innerWidth;

      if ((!this.left || this.right) && availableWidth > 0) {
        left = this.window.innerWidth - maxWidth - (this.window.innerWidth > 1024 ? 30 : 12) // Account for scrollbar
        ;
      } else if (this.left && left < 0) left = 12;

      return left;
    },
    calcYOverflow: function calcYOverflow(top) {
      var totalHeight = top + this.dimensions.content.height;

      if (this.top && top < 0) top = 12;else if ((!this.top || this.bottom) && this.window.innerHeight < totalHeight) {
        top = this.window.innerHeight - this.dimensions.content.height - 12;
      }

      return top;
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
/* 83 */
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
    },
    initWindow: function initWindow() {
      this.isBooted = true;

      if (this.window === window) return;

      this.window = window;
      this.window.addEventListener('resize', this.windowResizeHandler);
    }
  }
});

/***/ }),
/* 84 */
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

      if (this.listIndex === -1) this.setActiveListIndex();
      if ([27, 9].includes(e.keyCode)) return this.isActive = false;else if (!this.isActive && [13, 32].includes(e.keyCode)) return this.isActive = true;

      if (e.keyCode === 40 && this.listIndex < this.tiles.length - 1) this.listIndex++;else if (e.keyCode === 38 && this.listIndex > 0) this.listIndex--;else if (e.keyCode === 13 && this.listIndex !== -1) this.tiles[this.listIndex].click();
    },
    getTiles: function getTiles() {
      this.tiles = this.$refs.content.querySelectorAll('.list__tile');
    },
    setActiveListIndex: function setActiveListIndex() {
      var _this = this;

      this.tiles.forEach(function (t, i) {
        if (t.classList.contains('list__tile--active')) {
          _this.listIndex = i;
          return;
        }
      });
    }
  }
});

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NavigationDrawer__ = __webpack_require__(86);


/* harmony default export */ __webpack_exports__["a"] = ({
  NavigationDrawer: __WEBPACK_IMPORTED_MODULE_0__NavigationDrawer__["a" /* default */]
});

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_overlayable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(2);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'navigation-drawer',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  data: function data() {
    return {
      isActive: this.value,
      isBooted: false,
      isMobile: false,
      mobileBreakPoint: 1024
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
    permanent: Boolean,
    persistent: Boolean,
    right: Boolean,
    temporary: Boolean,
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
        'navigation-drawer--is-booted': this.isBooted,
        'navigation-drawer--clipped': this.clipped,
        'navigation-drawer--close': !this.isActive,
        'navigation-drawer--floating': this.floating,
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
    isActive: function isActive(val) {
      this.$emit('input', val);
      this.showOverlay && val && this.genOverlay() || this.removeOverlay();
    },
    '$route': function $route() {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.closeConditional();
      }
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
  beforeDestroy: function beforeDestroy() {
    if (this.permanent) return;
    window.removeEventListener('resize', this.onResize, { passive: false });
  },


  methods: {
    init: function init() {
      var _this = this;

      this.checkIfMobile();
      setTimeout(function () {
        return _this.isBooted = true;
      }, 0);

      if (this.permanent) {
        this.isActive = true;
        return;
      } else if (this.isMobile) this.isActive = false;else if (!this.value && (this.persistent || this.temporary)) this.isActive = false;

      window.addEventListener('resize', this.onResize, { passive: false });
    },
    checkIfMobile: function checkIfMobile() {
      this.isMobile = window.innerWidth <= parseInt(this.mobileBreakPoint);
    },
    closeConditional: function closeConditional() {
      return !this.permanent && (this.temporary || this.isMobile);
    },
    onResize: function onResize() {
      if (!this.enableResizeWatcher || this.permanent || this.temporary) return;
      this.checkIfMobile();
      this.isActive = !this.isMobile;
    }
  },

  render: function render(h) {
    var _this2 = this;

    var data = {
      'class': this.classes,
      style: { height: this.calculatedHeight },
      directives: [{
        name: 'click-outside',
        value: this.closeConditional
      }],
      on: {
        click: function click() {
          _this2.$emit('update:miniVariant', false);
        }
      }
    };

    return h('aside', data, [this.$slots.default]);
  }
});

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_helpers__ = __webpack_require__(0);




var ToolbarTitle = __WEBPACK_IMPORTED_MODULE_1__util_helpers__["c" /* createSimpleFunctional */]('toolbar__title');
var ToolbarItems = __WEBPACK_IMPORTED_MODULE_1__util_helpers__["c" /* createSimpleFunctional */]('toolbar__items');
var ToolbarSideIcon = {
  functional: true,

  props: {
    dark: Boolean,
    light: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = data.staticClass ? 'toolbar__side-icon ' + data.staticClass : 'toolbar__side-icon';
    data.props = Object.assign({
      icon: true
    }, props);

    return h('v-btn', data, [h('v-icon', 'menu')]);
  }
};
var SystemBar = {
  functional: true,

  props: {
    dark: Boolean,
    light: Boolean,
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  render: function render(h, _ref2) {
    var data = _ref2.data,
        props = _ref2.props,
        children = _ref2.children;

    data.staticClass = ('system-bar ' + (data.staticClass || '')).trim();

    if (props.dark) data.staticClass += ' theme--dark';
    if (props.light) data.staticClass += ' theme--light';
    if (props.status) data.staticClass += ' system-bar--status';
    if (props.window) data.staticClass += ' system-bar--window';
    if (props.lightsOut) data.staticClass += ' system-bar--lights-out';

    return h('div', data, children);
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  SystemBar: SystemBar,
  Toolbar: __WEBPACK_IMPORTED_MODULE_0__Toolbar__["a" /* default */],
  ToolbarItems: ToolbarItems,
  ToolbarTitle: ToolbarTitle,
  ToolbarSideIcon: ToolbarSideIcon
});

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  props: {
    absolute: Boolean,
    card: Boolean,
    dense: Boolean,
    extended: Boolean,
    fixed: Boolean,
    flat: Boolean,
    floating: Boolean,
    prominent: Boolean
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
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    }
  },

  render: function render(h) {
    var children = [];
    var data = {
      'class': this.classes
    };

    children.push(h('div', {
      'class': 'toolbar__content'
    }, this.$slots.default));

    if (this.$slots.extension || this.extended) {
      children.push(h('div', {
        'class': 'toolbar__extension'
      }, this.$slots.extension));
    }

    return h('nav', data, children);
  }
});

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pagination_vue__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pagination_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Pagination_vue__);


/* harmony default export */ __webpack_exports__["a"] = ({
  Pagination: __WEBPACK_IMPORTED_MODULE_0__Pagination_vue___default.a
});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(91),
  /* template */
  __webpack_require__(92),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'pagination',

  props: {
    circle: Boolean,

    disabled: Boolean,

    length: {
      type: Number,
      default: 0
    },

    value: {
      type: Number,
      default: 0
    }
  },

  watch: {
    value: function value() {
      this.init();
    }
  },

  computed: {
    classes: function classes() {
      return {
        'pagination--circle': this.circle,
        'pagination--disabled': this.disabled
      };
    },
    items: function items() {
      if (this.length <= 5) {
        return this.range(1, this.length);
      }

      var min = this.value - 3;
      min = min > 0 ? min : 1;

      var max = min + 6;
      max = max <= this.length ? max : this.length;

      if (max === this.length) {
        min = this.length - 6;
      }

      var range = this.range(min, max);

      if (this.value >= 4 && this.length > 6) {
        range.splice(0, 2, 1, '...');
      }

      if (this.value + 3 < this.length && this.length > 6) {
        range.splice(range.length - 2, 2, '...', this.length);
      }

      return range;
    }
  },

  mounted: function mounted() {
    this.$vuetify.load.call(this, this.init);
  },


  methods: {
    init: function init() {
      var _this = this;

      this.selected = null;

      // Change this
      setTimeout(function () {
        return _this.selected = _this.value;
      }, 100);
    },
    range: function range(from, to) {
      var range = [];

      from = from > 0 ? from : 1;

      for (var i = from; i <= to; i++) {
        range.push(i);
      }

      return range;
    }
  }
});

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "pagination",
    class: _vm.classes
  }, [_c('li', [_c('a', {
    staticClass: "pagination__navigation",
    class: {
      'pagination__navigation--disabled': _vm.value === 1
    },
    attrs: {
      "href": "#!"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$emit('input', _vm.value - 1)
      }
    }
  }, [_c('v-icon', [_vm._v("chevron_left")])], 1)]), _vm._l((_vm.items), function(n) {
    return _c('li', [(!isNaN(n)) ? _c('a', {
      staticClass: "pagination__item",
      class: {
        'pagination__item--active': n === _vm.value
      },
      attrs: {
        "href": "#!"
      },
      domProps: {
        "textContent": _vm._s(n)
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.$emit('input', n)
        }
      }
    }) : _c('span', {
      staticClass: "pagination__more",
      domProps: {
        "textContent": _vm._s(n)
      }
    })])
  }), _c('li', [_c('a', {
    staticClass: "pagination__navigation",
    class: {
      'pagination__navigation--disabled': _vm.value === _vm.length
    },
    attrs: {
      "href": "#!"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$emit('input', _vm.value + 1)
      }
    }
  }, [_c('v-icon', [_vm._v("chevron_right")])], 1)])], 2)
},staticRenderFns: []}

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parallax_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parallax_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Parallax_vue__);


/* harmony default export */ __webpack_exports__["a"] = ({
  Parallax: __WEBPACK_IMPORTED_MODULE_0__Parallax_vue___default.a
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(95),
  /* template */
  __webpack_require__(97),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_translatable__ = __webpack_require__(96);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'parallax',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_translatable__["a" /* default */]],

  props: {
    height: {
      type: [String, Number],
      default: 500
    },

    src: {
      type: String,
      required: true
    }
  },

  computed: {
    styles: function styles() {
      return {
        display: 'block',
        transform: 'translate3d(-50%, ' + this.parallax + 'px, 0)'
      };
    }
  },

  methods: {
    init: function init() {
      var _this = this;

      if (this.$refs.img.complete) {
        this.translate();
        this.listeners();
      }

      this.$refs.img.addEventListener('load', function () {
        _this.translate();
        _this.listeners();
      }, false);
    },
    objHeight: function objHeight() {
      return this.$refs.img.naturalHeight;
    },
    elOffsetTop: function elOffsetTop() {
      return this.$el.offsetTop;
    }
  }
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      parallax: null,
      parallaxDist: null,
      elOffsetTop: null,
      percentScrolled: null,
      scrollTop: null,
      windowHeight: null,
      windowBottom: null
    };
  },


  computed: {
    normalizedHeight: function normalizedHeight() {
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
/* 97 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "parallax",
    style: ({
      height: this.normalizedHeight + 'px'
    })
  }, [_c('div', {
    staticClass: "parallax__image-container"
  }, [_c('img', {
    ref: "img",
    staticClass: "parallax__image",
    style: (_vm.styles),
    attrs: {
      "src": _vm.src
    }
  })]), _c('div', {
    staticClass: "parallax__content"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue__);



/* harmony default export */ __webpack_exports__["a"] = ({
  ProgressLinear: __WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue___default.a,
  ProgressCircular: __WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue___default.a
});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(100),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'progress',

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

  render: function render(h) {
    var fade = h('v-fade-transition', [this.indeterminate && h('div', {
      class: ['progress-linear__bar__indeterminate', this.active && 'progress-linear__bar__indeterminate--active', this.colorFront]
    })]);

    var slide = h('v-slide-x-transition', [!this.indeterminate && h('div', { class: ['progress-linear__bar__determinate', this.colorFront], style: { width: this.value + '%' } })]);

    var bar = h('div', { class: ['progress-linear__bar', this.colorBack], style: this.styles }, [fade, slide]);

    return h('div', { class: ['progress-linear', this.classes], style: { height: this.height + 'px' } }, [bar]);
  }
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(102),
  /* template */
  __webpack_require__(103),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _this = this;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'progress-circular',

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
  }
});

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "progress-circular",
    class: _vm.classes,
    style: (_vm.styles)
  }, [_c('svg', {
    style: (_vm.svgStyles),
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "height": _vm.svgSize,
      "width": _vm.svgSize,
      "viewBox": _vm.viewBox
    }
  }, [(!_vm.indeterminate) ? _c('circle', {
    staticClass: "progress-circular__underlay",
    attrs: {
      "fill": "transparent",
      "cx": _vm.cxy,
      "cy": _vm.cxy,
      "r": _vm.radius,
      "stroke-width": _vm.width,
      "stroke-dasharray": _vm.strokeDashArray,
      "stroke-dashoffset": 0
    }
  }) : _vm._e(), _c('circle', {
    staticClass: "progress-circular__overlay",
    attrs: {
      "fill": _vm.fill,
      "cx": _vm.cxy,
      "cy": _vm.cxy,
      "r": _vm.radius,
      "stroke-width": _vm.width,
      "stroke-dasharray": _vm.strokeDashArray,
      "stroke-dashoffset": _vm.strokeDashOffset
    }
  })]), _c('div', {
    staticClass: "progress-circular__info"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Select__ = __webpack_require__(105);


/* harmony default export */ __webpack_exports__["a"] = ({
  Select: __WEBPACK_IMPORTED_MODULE_0__Select__["a" /* default */]
});

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_autocomplete__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_filterable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_generators__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_input__ = __webpack_require__(4);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'select',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_autocomplete__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_filterable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_generators__["a" /* default */]],

  data: function data() {
    return {
      content: {},
      inputValue: this.multiple && !this.value ? [] : this.value,
      isBooted: false,
      lastItem: 20,
      isActive: false
    };
  },


  props: {
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    auto: Boolean,
    autocomplete: Boolean,
    bottom: Boolean,
    chips: Boolean,
    close: Boolean,
    debounce: {
      type: Number,
      default: 200
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    filter: Function,
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    multiple: Boolean,
    multiLine: Boolean,
    offset: Boolean,
    singleLine: Boolean,
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
        'input-group--autocomplete': this.autocomplete,
        'input-group--single-line': this.singleLine || this.isDropdown,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips,
        'input-group--multiple': this.multiple
      };
    },
    computedContentClass: function computedContentClass() {
      var children = [this.auto ? 'menu__content--auto' : '', this.isDropdown ? 'menu__content--dropdown' : ''];

      return children.join(' ');
    },
    filteredItems: function filteredItems() {
      var items = this.autocomplete && this.searchValue ? this.filterSearch() : this.items;

      return !this.auto ? items.slice(0, this.lastItem) : items;
    },
    isDirty: function isDirty() {
      return this.selectedItems.length;
    },
    isDropdown: function isDropdown() {
      return this.segmented || this.overflow || this.editable;
    },
    selectedItems: function selectedItems() {
      var _this = this;

      if (this.inputValue === null || typeof this.inputValue === 'undefined') return [];

      return this.items.filter(function (i) {
        if (!_this.multiple) {
          return _this.getValue(i) === _this.getValue(_this.inputValue);
        } else {
          // Always return Boolean
          return _this.inputValue.find(function (j) {
            return _this.getValue(j) === _this.getValue(i);
          }) !== undefined;
        }
      });
    }
  },

  watch: {
    inputValue: function inputValue(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      this.inputValue = val;
      this.validate();
      if (this.autocomplete || this.editable) this.$nextTick(this.$refs.menu.updateDimensions);
    },
    isActive: function isActive(val) {
      this.isBooted = true;
      this.lastItem += !val ? 20 : 0;

      if (!val) this.blur();else this.focus();
    },
    isBooted: function isBooted() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.content && _this2.content.addEventListener('scroll', _this2.onScroll, false);
      });
    },
    searchValue: function searchValue() {
      this.$refs.menu.listIndex = -1;
    }
  },

  mounted: function mounted() {
    this.content = this.$refs.menu.$refs.content;
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isBooted) {
      this.content && this.content.removeEventListener('scroll', this.onScroll, false);
    }
  },


  methods: {
    blur: function blur() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.focused = false;
        _this3.$el.blur();
      });
    },
    focus: function focus() {
      var _this4 = this;

      this.focused = true;
      this.$refs.input && (this.autocomplete || this.editable) && this.$refs.input.focus();

      if (this.editable && this.inputValue !== null && typeof this.inputValue !== 'undefined') {
        this.$nextTick(function () {
          return _this4.$refs.input.value = _this4.getValue(_this4.inputValue);
        });
      }
    },
    genLabel: function genLabel() {
      if (this.editable && this.focused) return null;

      var data = {};

      if (this.id) data.attrs = { for: this.id };

      return this.$createElement('label', data, this.label);
    },
    getText: function getText(item) {
      return item === Object(item) ? item[this.itemText] : item;
    },
    getValue: function getValue(item) {
      return item === Object(item) && this.itemValue in item ? item[this.itemValue] : item;
    },
    onScroll: function onScroll() {
      var _this5 = this;

      if (!this.isActive) {
        requestAnimationFrame(function () {
          return _this5.content.scrollTop = 0;
        });
      } else {
        var showMoreItems = this.content.scrollHeight - (this.content.scrollTop + this.content.clientHeight) < 200;

        if (showMoreItems) {
          this.lastItem += 20;
        }
      }
    },
    selectItem: function selectItem(item) {
      var _this6 = this;

      if (!this.multiple) {
        this.inputValue = this.returnObject ? item : this.getValue(item);
      } else {
        var inputValue = this.inputValue.slice();
        var i = this.inputValue.findIndex(function (i) {
          return _this6.getValue(i) === _this6.getValue(item);
        });

        i !== -1 && inputValue.splice(i, 1) || inputValue.push(item);
        this.inputValue = inputValue.map(function (i) {
          return _this6.returnObject ? i : _this6.getValue(i);
        });
      }

      if (this.autocomplete) {
        this.$nextTick(function () {
          _this6.searchValue = null;
          _this6.$refs.input && _this6.$refs.input.focus();
        });
      }

      this.$emit('change', this.inputValue);
    }
  },

  render: function render(h) {
    var _this7 = this;

    return this.genInputGroup([this.genSelectionsAndSearch(), this.genMenu()], {
      ref: 'activator',
      directives: [{
        name: 'click-outside',
        value: function value() {
          return _this7.isActive = false;
        }
      }],
      on: {
        keydown: function keydown(e) {
          return _this7.$refs.menu.changeListIndex(e);
        }
      }
    });
  }
});

/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      searchValue: null
    };
  },


  methods: {
    filterSearch: function filterSearch() {
      var _this = this;

      return this.items.filter(function (i) {
        var text = _this.getText(i);
        if (typeof text === 'undefined') return false;

        return text.toLowerCase().indexOf(_this.searchValue.toLowerCase()) !== -1;
      });
    }
  }
});

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genMenu: function genMenu() {
      var _this = this;

      var data = {
        ref: 'menu',
        props: {
          activator: this.$refs.activator,
          auto: this.auto,
          closeOnClick: false,
          closeOnContentClick: !this.multiple,
          contentClass: this.computedContentClass,
          disabled: this.disabled,
          maxHeight: this.maxHeight,
          nudgeTop: this.isDropdown ? 22 : 0,
          offsetY: this.autocomplete || this.offset || this.isDropdown,
          value: this.isActive
        },
        on: { input: function input(val) {
            return _this.isActive = val;
          } }
      };

      return this.$createElement('v-menu', data, [this.genList()]);
    },
    genSelectionsAndSearch: function genSelectionsAndSearch() {
      var _this2 = this;

      var input = void 0;

      if (this.autocomplete || this.editable) {
        input = this.$createElement('input', {
          'class': 'input-group--select__autocomplete',
          domProps: { value: this.searchValue },
          on: { input: function input(e) {
              return _this2.searchValue = e.target.value;
            } },
          ref: 'input',
          key: 'input'
        });
      }

      var selections = this.isDirty && (!this.editable || this.editable && !this.focused) ? this.genSelections() : [];
      input && selections.push(input);
      var group = this.$createElement('div', selections);

      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [group]);
    },
    genSelections: function genSelections() {
      var _this3 = this;

      var children = [];
      var chips = this.chips;
      var slots = this.$scopedSlots.selection;
      var length = this.selectedItems.length;

      this.selectedItems.forEach(function (item, i) {
        if (slots) {
          children.push(_this3.genSlotSelection(item));
        } else if (chips) {
          children.push(_this3.genChipSelection(item));
        } else {
          children.push(_this3.genCommaSelection(item, i < length - 1));
        }
      });

      return children;
    },
    genSlotSelection: function genSlotSelection(item) {
      return this.$scopedSlots.selection({ parent: this, item: item });
    },
    genChipSelection: function genChipSelection(item) {
      var _this4 = this;

      return this.$createElement('v-chip', {
        'class': 'chip--select-multi',
        props: { close: true },
        on: { input: function input() {
            return _this4.selectItem(item);
          } },
        nativeOn: { click: function click(e) {
            return e.stopPropagation();
          } },
        key: item
      }, this.getText(item));
    },
    genCommaSelection: function genCommaSelection(item, comma) {
      if (!item) {
        console.log(this.selectedItems);
      }
      return this.$createElement('div', {
        'class': 'input-group__selections__comma',
        key: item
      }, '' + this.getText(item) + (comma ? ', ' : ''));
    },
    genList: function genList() {
      var _this5 = this;

      var children = this.filteredItems.map(function (o) {
        if (o.header) return _this5.genHeader(o);
        if (o.divider) return _this5.genDivider(o);else return _this5.genTile(o);
      });

      if (!children.length) {
        children.push(this.genTile(this.noDataText));
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
    genTile: function genTile(item) {
      var _this6 = this;

      var active = this.selectedItems.indexOf(item) !== -1;
      var data = {
        nativeOn: { click: function click() {
            return _this6.selectItem(item);
          } },
        props: {
          avatar: item === Object(item) && 'avatar' in item,
          ripple: true,
          value: active
        }
      };

      if (this.$scopedSlots.item) {
        return this.$createElement('v-list-tile', data, [this.$scopedSlots.item({ parent: this, item: item })]);
      }

      return this.$createElement('v-list-tile', data, [this.genAction(item, active), this.genContent(item)]);
    },
    genAction: function genAction(item, active) {
      var _this7 = this;

      if (!this.multiple) return null;

      var data = {
        'class': {
          'list__tile__action--select-multi': this.multiple
        },
        nativeOn: { click: function click() {
            return _this7.selectItem(item);
          } }
      };

      return this.$createElement('v-list-tile-action', data, [this.$createElement('v-checkbox', { props: { inputValue: active } })]);
    },
    genContent: function genContent(item) {
      return this.$createElement('v-list-tile-content', [this.$createElement('v-list-tile-title', this.getText(item))]);
    }
  }
});

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slider__ = __webpack_require__(109);


/* harmony default export */ __webpack_exports__["a"] = ({
  Slider: __WEBPACK_IMPORTED_MODULE_0__Slider__["a" /* default */]
});

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_helpers__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'slider',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

  data: function data() {
    return {
      app: {},
      isActive: false,
      inputWidth: 0
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
        'input-group input-group--slider': true,
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
        val = val < this.min ? this.min : val > this.max ? this.max : val;
        if (Math.ceil(val) !== Math.ceil(this.lazyValue)) {
          this.inputWidth = this.calculateWidth(val);
        }

        var value = this.snap ? Math.round(val / this.step) * this.step : parseInt(val);
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
      var translateX = this.inputWidth < 1 && !this.isActive ? 8 + 'px' : 0;
      return {
        transform: 'scaleX(' + scaleX + ') translateX(' + translateX + ')'
      };
    },
    trackFillStyles: function trackFillStyles() {
      var scaleX = this.calculateScale(this.inputWidth / 100);
      var translateX = this.inputWidth > 99 && !this.thumbLabel ? -8 + 'px' : 0;
      return {
        transform: 'scaleX(' + scaleX + ') translateX(' + translateX + ')'
      };
    },
    numTicks: function numTicks() {
      return parseInt((this.max - this.min) / this.step);
    }
  },

  watch: {
    value: function value() {
      this.inputValue = this.value;
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.inputValue = this.value;
    this.$nextTick(function () {
      return _this.inputWidth = _this.calculateWidth(_this.inputValue);
    }

    // Without a v-app, iOS does not work with body selectors
    );this.app = document.querySelector('[data-app]') || console.warn('The v-slider component requires the present of v-app or a non-body wrapping element with the [data-app] attribute.');
  },


  methods: {
    calculateWidth: function calculateWidth(val) {
      if (this.snap) {
        val = Math.round(val / this.step) * this.step;
      }

      val = (val - this.min) / (this.max - this.min) * 100;

      return val < 0.15 ? 0 : val;
    },
    calculateScale: function calculateScale(scale) {
      if (scale < 0.02 && !this.thumbLabel) {
        return 0;
      }

      return this.disabled ? scale - 0.015 : scale;
    },
    onMouseDown: function onMouseDown(e) {
      this.isActive = true;

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, { passive: true });
        __WEBPACK_IMPORTED_MODULE_1__util_helpers__["a" /* addOnceEventListener */](this.app, 'touchend', this.onMouseUp);
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, { passive: true });
        __WEBPACK_IMPORTED_MODULE_1__util_helpers__["a" /* addOnceEventListener */](this.app, 'mouseup', this.onMouseUp);
      }
    },
    onMouseUp: function onMouseUp() {
      this.isActive = false;
      this.app.removeEventListener('touchmove', this.onMouseMove, { passive: true });
      this.app.removeEventListener('mousemove', this.onMouseMove, { passive: true });
    },
    onMouseMove: function onMouseMove(e) {
      var _$refs$track$getBound = this.$refs.track.getBoundingClientRect(),
          offsetLeft = _$refs$track$getBound.left,
          trackWidth = _$refs$track$getBound.width;

      var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      var left = (clientX - offsetLeft) / trackWidth * 100;

      left = left < 0 ? 0 : left > 100 ? 100 : left;

      this.inputValue = this.min + left / 100 * (this.max - this.min);
    },
    onKeyDown: function onKeyDown(e) {
      if (!e.keyCode === 37 && !e.keyCode === 39) return;

      var direction = e.keyCode === 37 && -1 || e.keyCode === 39 && 1 || 0;
      var multiplier = e.shiftKey && 3 || e.ctrlKey && 2 || 1;
      var amount = this.snap && this.step || 1;

      this.inputValue = this.inputValue + direction * amount * multiplier;
    },
    sliderMove: function sliderMove(e) {
      if (!this.isActive) {
        this.onMouseMove(e);
      }
    }
  },

  render: function render(h) {
    var _this2 = this;

    var children = [];
    var trackChildren = [];
    var thumbChildren = [];

    trackChildren.push(h('div', { 'class': 'slider__track', style: this.trackStyles }));
    trackChildren.push(h('div', { 'class': 'slider__track-fill', style: this.trackFillStyles }));
    children.push(h('div', { 'class': 'slider__track__container', ref: 'track' }, trackChildren));

    if (this.step) {
      var ticks = __WEBPACK_IMPORTED_MODULE_1__util_helpers__["b" /* createRange */](this.numTicks + 1).map(function (i) {
        var span = h('span', {
          class: 'slider__tick',
          style: {
            left: i * (100 / _this2.numTicks) + '%'
          }
        });

        return span;
      });

      children.push(h('div', { 'class': 'slider__ticks-container', style: this.tickContainerStyles }, ticks));
    }

    thumbChildren.push(h('div', { 'class': 'slider__thumb' }));

    if (this.thumbLabel) {
      thumbChildren.push(h('v-scale-transition', { props: { origin: 'bottom center' } }, [h('div', {
        'class': 'slider__thumb--label__container',
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, [h('div', { 'class': 'slider__thumb--label' }, [h('span', {}, parseInt(this.inputValue))])])]));
    }

    var thumbContainer = h('div', {
      'class': this.thumbContainerClasses,
      style: this.thumbStyles,
      on: {
        touchstart: this.onMouseDown,
        mousedown: this.onMouseDown
      },
      ref: 'thumb'
    }, thumbChildren);

    children.push(thumbContainer);

    var slider = h('div', { 'class': 'slider' }, children);

    return this.genInputGroup([slider], {
      attrs: {
        role: 'slider',
        tabindex: this.tabindex
      },
      on: {
        mouseup: this.sliderMove,
        keydown: this.onKeyDown
      },
      directives: [{
        name: 'click-outside'
      }]
    });
  }
});

/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Subheader = {
  functional: true,

  props: {
    inset: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children,
        props = _ref.props;

    data.staticClass = data.staticClass ? 'subheader ' + data.staticClass : 'subheader';
    if (props.inset) data.staticClass += ' subheader--inset';

    return h('li', data, children);
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  Subheader: Subheader
});

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stepper__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StepperStep__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StepperContent__ = __webpack_require__(114);





var StepperHeader = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('stepper__header');

/* harmony default export */ __webpack_exports__["a"] = ({
  Stepper: __WEBPACK_IMPORTED_MODULE_1__Stepper__["a" /* default */],
  StepperContent: __WEBPACK_IMPORTED_MODULE_3__StepperContent__["a" /* default */],
  StepperHeader: StepperHeader,
  StepperStep: __WEBPACK_IMPORTED_MODULE_2__StepperStep__["a" /* default */]
});

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'stepper',

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
        'stepper--non-linear': this.nonLinear
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
    },
    value: function value() {
      this.inputValue = this.value;
    }
  },

  mounted: function mounted() {
    this.$vuetify.load(this.init);
  },


  methods: {
    init: function init() {
      var _this2 = this;

      this.$children.forEach(function (i) {
        if (i.$options._componentTag === 'v-stepper-step') {
          _this2.steps.push(i);
        } else if (i.$options._componentTag === 'v-stepper-content') {
          i.isVertical = _this2.vertical;
          _this2.content.push(i);
        }
      });

      this.inputValue = this.value || this.steps[0].step || 1;

      // TODO: Figure out a way to fix this hack
      // No transition before booted
      setTimeout(function () {
        return _this2.isBooted = true;
      }, 25);
    },
    stepClick: function stepClick(step) {
      this.inputValue = step;
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes
    }, this.$slots.default);
  }
});

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'stepper-step',

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
    click: function click() {
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
      on: {
        click: this.click
      }
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
    var label = h('div', { 'class': 'stepper__label' }, [this.$slots.default]);

    return h('div', data, [step, label]);
  }
});

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'stepper-content',

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

    return h(this.computedTransition, {}, [content]);
  }
});

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DataTable__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EditDialog__ = __webpack_require__(121);




var TableOverflow = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('table__overflow');

/* harmony default export */ __webpack_exports__["a"] = ({
  DataTable: __WEBPACK_IMPORTED_MODULE_1__DataTable__["a" /* default */],
  EditDialog: __WEBPACK_IMPORTED_MODULE_2__EditDialog__["a" /* default */],
  TableOverflow: TableOverflow
});

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_head__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_body__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_foot__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_progress__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_filterable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_helpers__ = __webpack_require__(0);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };








/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'datatable',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_head__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_filterable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_foot__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_progress__["a" /* default */]],

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
      default: function _default(items, index, descending) {
        return items.sort(function (a, b) {
          var sortA = __WEBPACK_IMPORTED_MODULE_5__util_helpers__["f" /* getObjectValueByPath */](a, index);
          var sortB = __WEBPACK_IMPORTED_MODULE_5__util_helpers__["f" /* getObjectValueByPath */](b, index);

          if (descending) {
            var _ref = [sortB, sortA];
            sortA = _ref[0];
            sortB = _ref[1];
          }

          if (!isNaN(sortA) && !isNaN(sortB)) return sortA - sortB;else if (sortA == null && sortB == null) return 0;

          var _map = [sortA, sortB].map(function (s) {
            return s.toLocaleLowerCase();
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
    computedPagination: function computedPagination() {
      return this.pagination || this.defaultPagination;
    },
    hasSelectAll: function hasSelectAll() {
      return this.selectAll !== undefined && this.selectAll !== false;
    },
    itemsLength: function itemsLength() {
      return this.totalItems || this.search && this.searchLength || this.items.length;
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
    pageStart: function pageStart() {
      var page = this.computedPagination.rowsPerPage === Object(this.computedPagination.rowsPerPage) ? this.computedPagination.rowsPerPage.value : this.computedPagination.rowsPerPage;
      return page === -1 ? 0 : (this.computedPagination.page - 1) * page;
    },
    pageStop: function pageStop() {
      var page = this.computedPagination.rowsPerPage === Object(this.computedPagination.rowsPerPage) ? this.computedPagination.rowsPerPage.value : this.computedPagination.rowsPerPage;
      return page === -1 ? this.itemsLength : this.computedPagination.page * page;
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
      this.updatePagination({ page: 1 });
    },
    everyItem: function everyItem(val) {
      if (val) this.all = true;
    }
  },

  methods: {
    updatePagination: function updatePagination(val) {
      if (this.pagination) return this.$emit('update:pagination', Object.assign({}, this.pagination, val));else this.defaultPagination = Object.assign({}, this.defaultPagination, val);
    },
    isSelected: function isSelected(item) {
      return this.selected[item[this.selectedKey]];
    },
    sort: function sort(index) {
      if (this.computedPagination.sortBy === null) {
        this.updatePagination({ sortBy: index, descending: false });
      } else if (this.computedPagination.sortBy === index && !this.computedPagination.descending) {
        this.updatePagination({ descending: true });
      } else if (this.computedPagination.sortBy !== index) {
        this.updatePagination({ sortBy: index, descending: false });
      } else {
        this.updatePagination({ sortBy: null, descending: null });
      }
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

    this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination));
  },
  render: function render(h) {
    return h('v-table-overflow', {}, [h('table', {
      'class': {
        'datatable table': true,
        'datatable--select-all': this.selectAll !== false
      }
    }, [this.genTHead(), this.genTProgress(), this.genTBody(), this.hideActions ? null : this.genTFoot()])]);
  }
});

/***/ }),
/* 117 */
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

        children = row.length && row[0].tag === 'tr' ? row : this.genTR(row);
      } else {
        var _row = this.headers.map(function (o) {
          return _this.genHeader(o);
        });
        var checkbox = this.$createElement('v-checkbox', {
          props: {
            dark: this.dark,
            light: this.light,
            color: this.hasSelectAll ? this.selectAll : '',
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
      var _this2 = this;

      var beingSorted = false;
      var classes = ['column'];
      var data = {};

      if ('sortable' in header && header.sortable || !('sortable' in header)) {
        data.on = { click: function click() {
            return _this2.sort(header.value);
          } };
        !('value' in header) && console.warn('Data table headers must have a value property that corresponds to a value in the v-model array');

        classes.push('sortable');
        var icon = this.$createElement('v-icon', 'arrow_upward');
        header.align && header.align === 'left' && children.push(icon) || children.unshift(icon);

        beingSorted = this.computedPagination.sortBy === header.value;
        beingSorted && classes.push('active');
        beingSorted && this.computedPagination.descending && classes.push('desc') || classes.push('asc');
      }

      header.align && classes.push('text-xs-' + header.align) || classes.push('text-xs-right');

      data.class = classes;

      return [data, children];
    }
  }
});

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTBody: function genTBody() {
      var _this = this;

      var children = [];

      if (!this.itemsLength) {
        children = [this.genEmptyBody(this.noDataText)];
      } else if (!this.filteredItems.length) {
        children = [this.genEmptyBody(this.noResultsText)];
      } else {
        children = this.filteredItems.map(function (item, index) {
          var props = { item: item, index: index };

          Object.defineProperty(props, 'selected', {
            get: function get() {
              return _this.selected[item[_this.selectedKey]];
            },
            set: function set(value) {
              var selected = _this.value.slice();
              value && selected.push(item) || (selected = selected.filter(function (i) {
                return i[_this.selectedKey] !== item[_this.selectedKey];
              }));
              _this.$emit('input', selected);
            }
          });

          var row = _this.$scopedSlots.items(props);

          if (row.length && row[0].tag === 'tr') {
            return row;
          } else {
            return _this.genTR(row, { attrs: { active: _this.isSelected(item) } });
          }
        });
      }

      return this.$createElement('tbody', children);
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
/* 119 */
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
          flat: true
        },
        nativeOn: { click: function click() {
            return _this.computedPagination.page--;
          } }
      }, [this.$createElement('v-icon', 'chevron_left')]);
    },
    genNextIcon: function genNextIcon() {
      var _this2 = this;

      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page * this.computedPagination.rowsPerPage >= this.itemsLength || this.pageStop < 0,
          icon: true,
          flat: true
        },
        nativeOn: { click: function click() {
            return _this2.computedPagination.page++;
          } }
      }, [this.$createElement('v-icon', 'chevron_right')]);
    },
    genSelect: function genSelect() {
      var _this3 = this;

      return this.$createElement('div', {
        'class': 'datatable__actions__select'
      }, [this.rowsPerPageText, this.$createElement('v-select', {
        props: {
          items: this.rowsPerPageItems,
          value: this.computedPagination.rowsPerPage,
          hideDetails: true,
          auto: true
        },
        on: { input: function input(val) {
            _this3.computedPagination.rowsPerPage = val;_this3.computedPagination.page = 1;
          } }
      })]);
    },
    genPagination: function genPagination() {
      var pagination = '&mdash;';

      if (this.itemsLength) {
        var stop = this.itemsLength < this.pageStop || this.pageStop < 0 ? this.itemsLength : this.pageStop;

        pagination = this.$scopedSlots.pageText ? this.$scopedSlots.pageText({
          pageStart: this.pageStart,
          pageStop: this.itemsLength
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
      return this.$createElement('tfoot', [this.genTR([this.$createElement('td', {
        attrs: { colspan: '100%' }
      }, this.genActions())])]);
    }
  }
});

/***/ }),
/* 120 */
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

      return this.$createElement('thead', { class: 'datatable__progress' }, [this.genTR([col])]);
    }
  }
});

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'edit-dialog',

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
      default: 'v-slide-x-reverse-transition'
    }
  },

  watch: {
    isActive: function isActive(val) {
      val && this.$emit('open') && this.$nextTick(this.focus);
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
      var input = this.$el.querySelector('input');
      input && setTimeout(function () {
        return input.focus();
      }, 0);
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
        nativeOn: { click: fn }
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
        'class': 'small-dialog__content',
        on: {
          keydown: function keydown(e) {
            e.keyCode === 27 && _this.cancel();
            e.keyCode === 13 && _this.save();
          }
        }
      }, [this.$slots.input]);
    }
  },

  render: function render(h) {
    var _this2 = this;

    return h('v-menu', {
      'class': 'small-dialog',
      props: {
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
    }, [this.$slots.default]), this.genContent(), this.genActions()]);
  }
});

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tabs__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TabsItem__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TabsContent__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TabsBar__ = __webpack_require__(126);






var TabsSlider = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */]('tabs__slider', 'li');

var TabsItems = {
  name: 'tabs-items',

  render: function render(h) {
    return h('div', { 'class': { 'tabs__items': true } }, [this.$slots.default]);
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  TabsItem: __WEBPACK_IMPORTED_MODULE_2__TabsItem__["a" /* default */],
  TabsItems: TabsItems,
  Tabs: __WEBPACK_IMPORTED_MODULE_1__Tabs__["a" /* default */],
  TabsContent: __WEBPACK_IMPORTED_MODULE_3__TabsContent__["a" /* default */],
  TabsBar: __WEBPACK_IMPORTED_MODULE_4__TabsBar__["a" /* default */],
  TabsSlider: TabsSlider
});

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'tabs',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  provide: function provide() {
    return {
      slider: this.slider,
      tabClick: this.tabClick,
      isScrollable: this.isScrollable
    };
  },
  data: function data() {
    return {
      activators: [],
      activeIndex: null,
      isMobile: false,
      reverse: false,
      target: null,
      resizeDebounce: {},
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
      default: 1024
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
      this.$emit('input', this.target);
      this.isBooted = true;
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.$vuetify.load(function () {
      window.addEventListener('resize', _this.resize, { passive: true });
      _this.resize();

      var activators = _this.$slots.activators;

      if (!activators || !activators.length || !activators[0].componentInstance) return;

      var bar = activators[0].componentInstance.$children;
      // // This is a workaround to detect if link is active
      // // when being used as a router or nuxt link
      var i = bar.findIndex(function (t) {
        return t.$el.firstChild.classList.contains('tabs__item--active');
      });

      var tab = _this.value || (bar[i !== -1 ? i : 0] || {}).action;

      tab && _this.tabClick(tab) && _this.resize();
    });
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.resize, { passive: true });
  },


  methods: {
    isScrollable: function isScrollable() {
      return this.scrollable;
    },
    resize: function resize() {
      var _this2 = this;

      clearTimeout(this.resizeDebounce);

      this.resizeDebounce = setTimeout(function () {
        _this2.isMobile = window.innerWidth < _this2.mobileBreakPoint;
        _this2.slider();
      }, 50);
    },
    slider: function slider(el) {
      var _this3 = this;

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
        var width = _this3.targetEl.scrollWidth / _this3.tabsContainer.clientWidth * 100;

        _this3.tabsSlider.style.width = width + '%';
        _this3.tabsSlider.style.left = _this3.targetEl.offsetLeft + 'px';
      });
    },
    tabClick: function tabClick(target) {
      var _this4 = this;

      var setActiveIndex = function setActiveIndex(index) {
        if (_this4.activeIndex === index) {
          // #762 update tabs display
          // In case tabs count got changed but activeIndex didn't
          _this4.updateTabs();
        } else {
          _this4.activeIndex = index;
        }
      };

      this.target = target;

      if (!this.$refs.content) {
        setActiveIndex(target);
        return;
      }

      this.$nextTick(function () {
        var nextIndex = _this4.$refs.content.$children.findIndex(function (i) {
          return i.id === _this4.target;
        });
        _this4.reverse = nextIndex < _this4.activeIndex;
        setActiveIndex(nextIndex);
      });
    },
    updateTabs: function updateTabs() {
      var _this5 = this;

      var activators = this.$slots.activators;

      if (!activators || !activators.length || activators.length && !activators[0].componentInstance) return;

      activators[0].componentInstance.$children.filter(function (i) {
        return i.$options._componentTag === 'v-tabs-item';
      }).forEach(function (i) {
        return i.toggle(_this5.target);
      });

      this.$refs.content && this.$refs.content.$children.forEach(function (i) {
        return i.toggle(_this5.target, _this5.reverse, _this5.isBooted);
      });
    }
  },

  render: function render(h) {
    var content = [];
    var slot = [];
    var iter = this.$slots.default || [];

    iter.forEach(function (c) {
      if (!c.componentOptions) slot.push(c);else if (c.componentOptions.tag === 'v-tabs-content') content.push(c);else slot.push(c);
    });

    var tabs = content.length ? h('v-tabs-items', {
      ref: 'content'
    }, content) : null;

    return h('div', {
      'class': this.classes
    }, [slot, this.$slots.activators, tabs]);
  }
});

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(6);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'tabs-item',

  inject: ['slider', 'tabClick'],

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_route_link__["a" /* default */]],

  data: function data() {
    return {
      isActive: false,
      defaultActiveClass: 'tabs__item--active'
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
      return {
        'tabs__item': true,
        'tabs__item--active': !this.router && this.isActive,
        'tabs__item--disabled': this.disabled
      };
    },
    action: function action() {
      var to = this.to || this.href;

      if (!to || to === Object(to)) return this._uid;

      return to.replace('#', '');
    }
  },

  watch: {
    '$route': function $route() {
      this.router && this.callSlider();
    }
  },

  mounted: function mounted() {
    this.callSlider();
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

      if (!this.router) {
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
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    return h('li', {
      'class': 'tabs__li'
    }, [h(tag, data, [this.$slots.default])]);
  }
});

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'tabs-content',

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
    transition: {
      type: String,
      default: 'v-tab-transition'
    },
    reverseTransition: {
      type: String,
      default: 'v-tab-reverse-transition'
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

  render: function render(h) {
    return h(this.computedTransition, {}, [h('div', {
      'class': 'tabs__content',
      domProps: { id: this.id },
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, [this.$slots.default])]);
  }
});

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'tabs-bar',

  inject: ['isScrollable'],

  data: function data() {
    return {
      resizeDebounce: null,
      isOverflowing: false,
      scrollOffset: 0,
      itemOffset: 0
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
        'transform': 'translateX(-' + this.scrollOffset + 'px)'
      };
    },
    leftIconVisible: function leftIconVisible() {
      return this.isScrollable() && this.isOverflowing && this.scrollOffset > 0;
    },
    rightIconVisible: function rightIconVisible() {
      if (!this.isScrollable() || !this.isOverflowing) return;

      // Check one scroll ahead to know the width of right-most item
      var item = this.newOffsetRight(this.scrollOffset, this.itemOffset);
      var lastItemWidth = item && this.$refs.container.children[item.index].clientWidth || 0;

      return this.$refs.container.scrollWidth - (this.scrollOffset + this.$refs.container.clientWidth) > lastItemWidth * 0.30;
    }
  },

  methods: {
    scrollLeft: function scrollLeft() {
      var _newOffsetLeft = this.newOffsetLeft(this.scrollOffset, this.itemOffset),
          offset = _newOffsetLeft.offset,
          index = _newOffsetLeft.index;

      this.scrollOffset = offset;
      this.itemOffset = index;
    },
    scrollRight: function scrollRight() {
      var _newOffsetRight = this.newOffsetRight(this.scrollOffset, this.itemOffset),
          offset = _newOffsetRight.offset,
          index = _newOffsetRight.index;

      this.scrollOffset = offset;
      this.itemOffset = index;
    },
    resize: function resize() {
      var _this = this;

      clearTimeout(this.resizeDebounce);

      this.resizeDebounce = setTimeout(function () {
        _this.isOverflowing = _this.$refs.container.clientWidth < _this.$refs.container.scrollWidth;
      }, 50);
    },
    newOffsetLeft: function newOffsetLeft(currentOffset, currentIndex) {
      var items = this.$refs.container.children;
      var offset = 0;

      for (var index = currentIndex - 1; index >= 0; index--) {
        if (!items[index].classList.contains('tabs__slider')) {
          if (offset + items[index].clientWidth >= this.$refs.container.clientWidth) {
            return { offset: currentOffset - offset, index: index + 1 };
          }
          offset += items[index].clientWidth;
        }
      }

      return { offset: 0, index: 0 };
    },
    newOffsetRight: function newOffsetRight(currentOffset, currentIndex) {
      var items = this.$refs.container.children;
      var offset = currentOffset;

      for (var index = currentIndex; index < items.length; index++) {
        if (!items[index].classList.contains('tabs__slider')) {
          if (offset + items[index].clientWidth > currentOffset + this.$refs.container.clientWidth) {
            return { offset: offset, index: index };
          }
          offset += items[index].clientWidth;
        }
      }

      return null;
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    this.$vuetify.load(function () {
      window.addEventListener('resize', _this2.resize, { passive: true });
      _this2.resize();
    });
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.resize, { passive: true });
  },
  render: function render(h) {
    var container = h('ul', {
      'class': this.containerClasses,
      'style': this.containerStyles,
      ref: 'container'
    }, this.$slots.default);

    var left = h('v-icon', {
      props: {
        left: true
      },
      style: {
        display: this.leftIconVisible ? 'inline-flex' : 'none'
      },
      on: {
        click: this.scrollLeft
      }
    }, 'chevron_left');

    var right = h('v-icon', {
      props: {
        right: true
      },
      style: {
        display: this.rightIconVisible ? 'inline-flex' : 'none'
      },
      on: {
        click: this.scrollRight
      }
    }, 'chevron_right');

    var wrapper = h('div', { class: this.wrapperClasses }, [container]);

    return h('div', {
      'class': this.classes
    }, [wrapper, left, right]);
  }
});

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


// Component specific transitions
var CarouselTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('carousel-transition');
var CarouselReverseTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('carousel-reverse-transition');
var TabTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('tab-transition');
var TabReverseTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('tab-reverse-transition');
var MenuTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('menu-transition');
var FabTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('fab-transition', 'center center', 'out-in'

// Generic transitions
);var DialogTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('dialog-transition');
var DialogBottomTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('dialog-bottom-transition');
var FadeTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('fade-transition');
var ScaleTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('scale-transition');
var SlideXTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('slide-x-transition');
var SlideXReverseTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('slide-x-reverse-transition');
var SlideYTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('slide-y-transition');
var SlideYReverseTransition = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleTransition */]('slide-y-reverse-transition');

/* harmony default export */ __webpack_exports__["a"] = ({
  CarouselTransition: CarouselTransition,
  CarouselReverseTransition: CarouselReverseTransition,
  DialogTransition: DialogTransition,
  DialogBottomTransition: DialogBottomTransition,
  FabTransition: FabTransition,
  FadeTransition: FadeTransition,
  MenuTransition: MenuTransition,
  ScaleTransition: ScaleTransition,
  SlideXTransition: SlideXTransition,
  SlideXReverseTransition: SlideXReverseTransition,
  SlideYTransition: SlideYTransition,
  SlideYReverseTransition: SlideYReverseTransition,
  TabTransition: TabTransition,
  TabReverseTransition: TabReverseTransition
});

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Snackbar__ = __webpack_require__(129);


/* harmony default export */ __webpack_exports__["a"] = ({
  Snackbar: __WEBPACK_IMPORTED_MODULE_0__Snackbar__["a" /* default */]
});

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__ = __webpack_require__(5);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'snackbar',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

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
        'snack--right': this.right,
        'snack--top': this.top,
        'snack--multi-line': this.multiLine && !this.vertical,
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
      var _this = this;

      clearTimeout(this.activeTimeout);

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(function () {
          return _this.isActive = false;
        }, this.timeout);
      }
    }
  },

  render: function render(h) {
    var children = [];

    if (this.isActive) {
      children.push(h('div', {
        'class': 'snack__content'
      }, [this.$slots.default]));
    }

    return h('div', {
      'class': this.classes
    }, [h(this.computedTransition, {}, children)]);
  }
});

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BottomNav__ = __webpack_require__(131);


/* harmony default export */ __webpack_exports__["a"] = ({
  BottomNav: __WEBPACK_IMPORTED_MODULE_0__BottomNav__["a" /* default */]
});

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  functional: true,

  props: {
    absolute: Boolean,
    shift: Boolean,
    value: { required: false }
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = data.staticClass ? 'bottom-nav ' + data.staticClass : 'bottom-nav';

    if (props.absolute) data.staticClass += ' bottom-nav--absolute';
    if (props.shift) data.staticClass += ' bottom-nav--shift';
    if (props.value) data.staticClass += ' bottom-nav--active';

    return h('div', data, [h('div', children)]);
  }
});

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__badge__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__click_outside__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ripple__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tooltip__ = __webpack_require__(136);





/* harmony default export */ __webpack_exports__["a"] = ({
  Badge: __WEBPACK_IMPORTED_MODULE_0__badge__["a" /* default */],
  ClickOutside: __WEBPACK_IMPORTED_MODULE_1__click_outside__["a" /* default */],
  Ripple: __WEBPACK_IMPORTED_MODULE_2__ripple__["a" /* default */],
  Tooltip: __WEBPACK_IMPORTED_MODULE_3__tooltip__["a" /* default */]
});

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


function directive(el, binding) {
  var config = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* directiveConfig */](binding, {
    icon: false,
    left: false,
    bottom: false,
    overlap: false,
    visible: true
  });

  if (!config.visible || binding.expression && !binding.value) {
    el.classList.remove('badge');

    return;
  }

  if (config.overlap) el.classList.add('badge--overlap');
  if (config.icon) el.classList.add('badge--icon');
  if (config.left) el.classList.add('badge--left');
  if (config.bottom) el.classList.add('badge--bottom');

  el.dataset.badge = config.value;
  el.classList.add('badge');
}

/* harmony default export */ __webpack_exports__["a"] = ({
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: function unbind(el) {
    el.removeAttribute('data-badge');
    el.classList.remove('badge');
  }
});

/***/ }),
/* 134 */
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
  bind: function bind(el, binding, v) {
    v.context.$vuetify.load(function () {
      var outside = document.querySelector('[data-app]');
      var click = function click(e) {
        return directive(e, el, binding, v);
      };
      outside.addEventListener('click', click, false);
      el._clickOutside = click;
    });
  },
  unbind: function unbind(el) {
    var outside = document.querySelector('[data-app]');
    outside.removeEventListener('click', el._clickOutside, false);
  }
});

/***/ }),
/* 135 */
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
}

/* harmony default export */ __webpack_exports__["a"] = ({
  bind: directive,
  unbind: unbind
});

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


function directive(el, binding) {
  var config = __WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* directiveConfig */](binding, { top: true });

  unbind(el, binding, config);

  el.dataset.tooltip = config.html;
  el.dataset['tooltipLocation'] = config.value;
}

function unbind(el) {
  el.removeAttribute('data-tooltip');
  el.removeAttribute('data-tooltip-location');
}

/* harmony default export */ __webpack_exports__["a"] = ({
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
});

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function load(cb) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (i > 4) return;

  if (document.readyState === 'complete') {
    return setTimeout(cb, 0);
  }

  if (document.readyState === 'interactive') {
    return setTimeout(function () {
      return load(cb, i + 1);
    }, 150);
  }

  document.addEventListener('DOMContentLoaded', cb);
}

/* harmony default export */ __webpack_exports__["a"] = (load);

/***/ })
/******/ ]);
});
//# sourceMappingURL=vuetify.js.map