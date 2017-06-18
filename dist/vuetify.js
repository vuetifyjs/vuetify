/*!
* Vuetify v0.12.5
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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 136);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["c"] = createSimpleFunctional;
/* harmony export (immutable) */ exports["b"] = createSimpleTransition;
/* harmony export (immutable) */ exports["a"] = directiveConfig;
/* harmony export (immutable) */ exports["e"] = addOnceEventListener;
/* harmony export (immutable) */ exports["d"] = getObjectValueByPath;
function createSimpleFunctional(c, el = 'div') {
  return {
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = data.staticClass ? `${c} ${data.staticClass}` : c;

      return h(el, data, children);
    }
  };
}

function createSimpleTransition(name) {
  return {
    functional: true,

    render(h, context) {
      const origin = (context.data.attrs || context.data.props || {}).origin || 'top center 0';
      context.data = context.data || {};
      context.data.props = { name };
      context.data.on = context.data.on || {};

      context.data.on.beforeEnter = el => {
        el.style.transformOrigin = origin;
        el.style.webkitTransformOrigin = origin;
      };

      return h('transition', context.data, context.children);
    }
  };
}

function directiveConfig(binding, defaults = {}) {
  return Object.assign({}, defaults, binding.modifiers, { value: binding.arg }, binding.value || {});
}

function addOnceEventListener(el, event, cb) {
  var once = () => {
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
  );let a = path.split('.');
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data() {
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
    value(val) {
      this.isActive = !!val;
    },
    isActive(val) {
      !!val !== this.isActive && this.$emit('input', val);
    }
  }
};

/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  props: {
    primary: Boolean,
    secondary: Boolean,
    success: Boolean,
    info: Boolean,
    warning: Boolean,
    error: Boolean
  }
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
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
    target: String
  },

  methods: {
    click() {},
    generateRouteLink() {
      let exact = this.exact;
      let tag;
      const options = this.to || this.href;

      const data = {
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
        }

        data.on = { click: this.click };
      }

      return { tag, data };
    }
  }
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  props: {
    dark: Boolean,
    light: Boolean
  }
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schemable__ = __webpack_require__(5);


/* harmony default export */ exports["a"] = {
  mixins: [__WEBPACK_IMPORTED_MODULE_0__schemable__["a" /* default */]],

  data() {
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
    errors: {
      type: [String, Array],
      default: () => []
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
      default: () => []
    },
    tabindex: {
      default: 0
    },
    value: {
      required: false
    }
  },

  computed: {
    hasError() {
      return this.validations.length || this.error;
    },
    inputGroupClasses() {
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
        'dark--text': this.dark,
        'light--text': this.light
      }, this.classes);
    },
    isDirty() {
      return this.inputValue;
    },
    modifiers() {
      const modifiers = {
        lazy: false,
        number: false,
        trim: false
      };

      if (!this.$vnode.data.directives) {
        return modifiers;
      }

      const model = this.$vnode.data.directives.find(i => i.name === 'model');

      if (!model) {
        return modifiers;
      }

      return Object.assign(modifiers, model.modifiers);
    },
    validations() {
      return (!Array.isArray(this.errors) ? [this.errors] : this.errors).concat(this.errorBucket);
    }
  },

  watch: {
    rules() {
      this.validate();
    }
  },

  mounted() {
    this.validate();
  },

  methods: {
    genLabel() {
      const data = {};

      if (this.id) data.attrs = { for: this.id };

      return this.$createElement('label', data, this.label);
    },
    toggle() {},
    genMessages() {
      let messages = [];

      if ((this.hint && this.focused || this.hint && this.persistentHint) && this.validations.length === 0) {
        messages = [this.genHint()];
      } else if (this.validations.length) {
        messages = this.validations.map(i => this.genError(i));
      }

      return this.$createElement('transition-group', {
        'class': 'input-group__messages',
        props: {
          tag: 'div',
          name: 'slide-y-transition'
        }
      }, messages);
    },
    genHint() {
      return this.$createElement('div', {
        'class': 'input-group__hint',
        key: this.hint
      }, this.hint);
    },
    genError(error) {
      return this.$createElement('div', {
        'class': 'input-group__error',
        key: error
      }, error);
    },
    genIcon(type) {
      const icon = this[`${type}Icon`];
      const cb = this[`${type}IconCb`];
      const hasCallback = typeof cb === 'function';

      return this.$createElement('v-icon', {
        'class': {
          [`input-group__${type}-icon`]: true,
          'input-group__icon-cb': hasCallback
        },
        on: {
          click: e => {
            hasCallback && cb(e);
          }
        }
      }, icon);
    },
    genInputGroup(input, data = {}) {
      const children = [];
      const wrapperChildren = [];
      const detailsChildren = [];

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.tabindex
        },
        on: {
          blur: () => this.tabFocused = false,
          click: () => this.tabFocused = false,
          keyup: e => {
            if ([9, 16].includes(e.keyCode)) {
              this.tabFocused = true;
            }

            if (e.keyCode === 13) {
              this.toggle();
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
    validate() {
      this.errorBucket = [];

      this.rules.forEach(rule => {
        const valid = typeof rule === 'function' ? rule(this.value) : rule;

        if (valid !== true) {
          this.errorBucket.push(valid);
        }
      });
    }
  }
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data() {
    return {
      isBooted: false
    };
  },

  watch: {
    isActive() {
      this.isBooted = true;
    }
  }
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contextualable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(6);



/* harmony default export */ exports["a"] = {
  mixins: [__WEBPACK_IMPORTED_MODULE_0__contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    inputValue: [Array, Boolean, String],
    falseValue: String,
    trueValue: String
  },

  computed: {
    isActive() {
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
    indeterminate(val) {
      this.inputDeterminate = val;
    }
  },

  methods: {
    genLabel() {
      return this.$createElement('label', { on: { click: this.toggle } }, this.label);
    },
    toggle() {
      if (this.disabled) {
        return;
      }

      let input = this.inputValue;
      if (Array.isArray(input)) {
        input = input.slice();
        const i = input.indexOf(this.value);

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
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


/* harmony default export */ exports["a"] = {
  methods: {
    enter(el, done) {
      // Remove initial transition
      el.style.transition = 'none';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* addOnceEventListener */])(el, 'transitionend', done

      // Get height that is to be scrolled
      );el.style.overflow = 'hidden';
      el.style.height = null;
      el.style.display = 'block';
      const height = `${el.clientHeight}px`;
      el.style.height = 0;
      el.style.transition = null;

      setTimeout(() => el.style.height = height, 50);
    },
    afterEnter(el) {
      el.style.height = 'auto';
      el.style.overflow = null;
    },
    leave(el, done) {
      // Remove initial transition
      el.style.transition = 'none';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* addOnceEventListener */])(el, 'transitionend', done

      // Set height before we transition to 0
      );el.style.overflow = 'hidden';
      el.style.height = `${el.clientHeight}px`;
      el.style.transition = null;

      setTimeout(() => el.style.height = 0, 50);
    }
  }
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


/* harmony default export */ exports["a"] = {
  data() {
    return {
      overlay: null,
      isTransitioning: false
    };
  },

  props: {
    hideOverlay: Boolean
  },

  methods: {
    genOverlay() {
      if (!this.isActive || this.hideOverlay) return;

      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.onclick = () => {
        if (this.permanet) return;else if (!this.persistent) this.isActive = false;else if (this.isMobile) this.isActive = false;
      };

      if (this.absolute) overlay.className += ' overlay--absolute';

      this.hideScroll();

      const app = this.$el.closest('[data-app]');
      app && app.appendChild(overlay) || document.body.appendChild(overlay);

      this.isTransitioning = true;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* addOnceEventListener */])(overlay, 'transitionend', () => this.isTransitioning = false);

      setTimeout(() => {
        overlay.className += ' overlay--active';
        this.overlay = overlay;
      }, 0);
    },
    removeOverlay() {
      if (!this.overlay) return;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* addOnceEventListener */])(this.overlay, 'transitionend', () => {
        this.overlay && this.overlay.remove();
        this.overlay = null;
        this.showScroll();
        this.isTransitioning = false;
      });

      if (this.isTransitioning) return;

      this.overlay.className = this.overlay.className.replace('overlay--active', '');
    },
    hideScroll() {
      document.documentElement.style.overflowY = 'hidden';
    },
    showScroll() {
      document.documentElement.style.overflowY = null;
    }
  }
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data() {
    return {
      isSaving: false
    };
  },

  props: {
    actions: Boolean,
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
    save() {},
    cancel() {},
    genSlot() {
      return this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      });
    }
  }
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__alerts_index__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_index__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__avatars_index__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__breadcrumbs_index__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buttons_index__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cards_index__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__carousel_index__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__chips_index__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pickers_index__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dialogs_index__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dividers_index__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__expansion_panel_index__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__footer_index__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__forms_index__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__grid_index__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__icons_index__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lists_index__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__menus_index__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__navigation_drawer_index__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__toolbar_index__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pagination_index__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__parallax_index__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__progress_index__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__selects_index__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__sliders_index__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__subheaders_index__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__steppers_index__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__tables_index__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__tabs_index__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__transitions_index__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__snackbars_index__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__bottom_nav_index__ = __webpack_require__(22);

































/* harmony default export */ exports["a"] = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__alerts_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__app_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__avatars_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__breadcrumbs_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__buttons_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__cards_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__carousel_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__chips_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__pickers_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9__dialogs_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_10__dividers_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_11__expansion_panel_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_12__footer_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_13__forms_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_14__grid_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_15__icons_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_16__lists_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_17__menus_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_18__navigation_drawer_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_19__toolbar_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_20__pagination_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_21__parallax_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_22__progress_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_23__selects_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_24__sliders_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_25__subheaders_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_26__steppers_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_27__tables_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_28__tabs_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_29__transitions_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_30__snackbars_index__["a" /* default */], __WEBPACK_IMPORTED_MODULE_31__bottom_nav_index__["a" /* default */]);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__badge__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__click_outside__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ripple__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tooltip__ = __webpack_require__(107);





/* harmony default export */ exports["a"] = {
  Badge: __WEBPACK_IMPORTED_MODULE_0__badge__["a" /* default */],
  ClickOutside: __WEBPACK_IMPORTED_MODULE_1__click_outside__["a" /* default */],
  Ripple: __WEBPACK_IMPORTED_MODULE_2__ripple__["a" /* default */],
  Tooltip: __WEBPACK_IMPORTED_MODULE_3__tooltip__["a" /* default */]
};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function load(cb, i = 0) {
  if (i > 4) return;

  if (document.readyState === 'complete') {
    return setTimeout(cb, 0);
  }

  if (document.readyState === 'interactive') {
    return setTimeout(() => load(cb, i + 1), 150);
  }

  document.addEventListener('DOMContentLoaded', cb);
}

/* harmony default export */ exports["a"] = load;

/***/ },
/* 15 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__ = __webpack_require__(3);



/* harmony default export */ exports["a"] = {
  name: 'alert',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  props: {
    dismissible: Boolean,
    hideIcon: Boolean,
    icon: String
  },

  computed: {
    classes() {
      return {
        'alert': true,
        'alert--dismissible': this.dismissible,
        'alert--error': this.error,
        'alert--info': this.info,
        'alert--success': this.success,
        'alert--warning': this.warning,
        'alert--primary': this.primary,
        'alert--secondary': this.secondary
      };
    },

    mdIcon() {
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

  render(h) {
    const children = [h('div', this.$slots.default)];

    !this.hideIcon && this.mdIcon && children.unshift(h('v-icon', {
      'class': 'alert__icon',
      props: { large: true }
    }, this.mdIcon));

    if (this.dismissible) {
      children.push(h('a', {
        'class': 'alert__dismissible',
        domProps: { href: 'javascript:;' },
        on: { click: () => this.$emit('input', false) }
      }, [h('v-icon', { props: { right: true, large: true } }, 'cancel')]));
    }

    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, children);
  }
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Alert__ = __webpack_require__(16);


/* harmony default export */ exports["a"] = {
  Alert: __WEBPACK_IMPORTED_MODULE_0__Alert__["a" /* default */]
};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
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

  render(h, { props, data, children }) {
    data.staticClass = data.staticClass ? `application ${data.staticClass} ` : 'application ';

    const classes = {
      'application--dark': props.dark,
      'application--light': props.light && !props.dark
    };

    data.staticClass += Object.keys(classes).filter(k => classes[k]).join(' ');

    const toolbar = children.find(c => c.tag === 'nav');
    const footer = children.find(c => c.tag === 'footer');

    if (toolbar) data.staticClass += ' application--toolbar';
    if (footer) {
      data.staticClass += ' application--footer';

      if (footer.data.staticClass.indexOf('--fixed') !== -1 || footer.data.staticClass.indexOf('--absolute') !== -1) data.staticClass += ' application--footer-fixed';
    }

    data.attrs = { 'data-app': true };
    data.domProps = { id: props.id };

    return h('div', data, children);
  }
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(18);



const AppBar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('app__bar');

/* harmony default export */ exports["a"] = {
  App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */],
  AppBar
};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


const Avatar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('avatar');

/* harmony default export */ exports["a"] = {
  Avatar
};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  functional: true,

  props: {
    absolute: Boolean,
    shift: Boolean,
    value: { required: false }
  },

  render(h, { data, props, children }) {
    data.staticClass = data.staticClass ? `bottom-nav ${data.staticClass}` : 'bottom-nav';

    if (props.absolute) data.staticClass += ' bottom-nav--absolute';
    if (props.shift) data.staticClass += ' bottom-nav--shift';
    if (props.value) data.staticClass += ' bottom-nav--active';

    return h('div', data, children);
  }
};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BottomNav__ = __webpack_require__(21);


/* harmony default export */ exports["a"] = {
  BottomNav: __WEBPACK_IMPORTED_MODULE_0__BottomNav__["a" /* default */]
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'breadcrumbs',

  provide() {
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
    classes() {
      return {
        'breadcrumbs': true,
        'breadcrumbs--with-icons': this.icons
      };
    }
  },

  render(h) {
    return h('ul', {
      'class': this.classes,
      props: { items: this.items }
    }, this.$slots.default);
  }
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(4);


/* harmony default export */ exports["a"] = {
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
    classes() {
      return {
        'breadcrumbs__item': true,
        'breadcrumbs__item--disabled': this.disabled
      };
    }
  },

  render(h) {
    const { tag, data } = this.generateRouteLink();

    return h('li', {
      attrs: { 'data-divider': this.divider }
    }, [h(tag, data, this.$slots.default)]);
  }
};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Breadcrumbs__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BreadcrumbsItem__ = __webpack_require__(24);



/* harmony default export */ exports["a"] = {
  Breadcrumbs: __WEBPACK_IMPORTED_MODULE_0__Breadcrumbs__["a" /* default */],
  BreadcrumbsItem: __WEBPACK_IMPORTED_MODULE_1__BreadcrumbsItem__["a" /* default */]
};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_schemable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_route_link__ = __webpack_require__(4);





/* harmony default export */ exports["a"] = {
  name: 'btn',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_route_link__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_schemable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  props: {
    activeClass: {
      type: String,
      default: 'btn--active'
    },
    block: Boolean,
    flat: Boolean,
    floating: Boolean,
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
    classes() {
      return {
        'btn': true,
        'btn--active': this.isActive,
        'btn--block': this.block,
        'btn--flat': this.flat,
        'btn--floating': this.floating,
        'btn--icon': this.icon,
        'btn--large': this.large,
        'btn--loader': this.loading,
        'btn--outline': this.outline,
        'btn--raised': !this.flat,
        'btn--round': this.round,
        'btn--small': this.small,
        'dark--text dark--bg': this.dark,
        'light--text light--bg': this.light,
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
    genContent(h) {
      return h('div', { 'class': 'btn__content' }, [h('span', this.$slots.default)]);
    },
    genLoader(h) {
      const children = [];

      if (!this.$slots.loader) {
        children.push(h('v-progress-circular', {
          props: {
            indeterminate: true,
            size: 26
          }
        }));
      } else {
        children.push(this.$slots.loader);
      }

      return h('span', { 'class': 'btn__loading' }, children);
    }
  },

  render(h) {
    const { tag, data } = this.generateRouteLink();
    const children = [];

    if (tag === 'button') {
      data.attrs.type = this.type;
    }

    children.push(this.genContent(h));

    if (this.loading) {
      children.push(this.genLoader(h));
    }

    return h(tag, data, children);
  }
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_route_link__ = __webpack_require__(4);




/* harmony default export */ exports["a"] = {
  name: 'fab',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_route_link__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  data: () => ({
    changeTimeout: {},
    isChanging: false
  }),

  props: {
    activeClass: {
      type: String,
      default: 'fab--active'
    },
    default: Boolean,
    flat: Boolean,
    lateral: Boolean,
    loading: Boolean,
    outline: Boolean,
    hidden: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    mini: Boolean,
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
    classes() {
      return {
        'fab': true,
        'fab--small': this.mini,
        'fab--hidden': this.hidden,
        'fab--lateral': this.lateral,
        'fab--is-changing': this.isChanging,
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
    changeAction() {
      this.isChanging = true;
      clearTimeout(this.changeTimeout);
      this.changeTimeout = setTimeout(() => this.isChanging = false, 600);
    },
    genContent(h) {
      return h('span', { 'class': 'fab__content' }, [this.$slots.default]);
    },
    genLoader(h) {
      const children = [];

      if (!this.$slots.loader) {
        children.push(h('v-progress-circular', {
          props: {
            indeterminate: true,
            size: 26
          }
        }));
      } else {
        children.push(this.$slots.loader);
      }

      return h('span', { 'class': 'fab__loading' }, children);
    }
  },

  render(h) {
    const { tag, data } = this.generateRouteLink();
    const children = [];

    if (tag === 'button') {
      data.attrs.type = this.type;
    }

    children.push(this.genContent(h));

    if (this.loading) {
      children.push(this.genLoader(h));
    }

    return h(tag, data, children);
  }
};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Button__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonDropdown_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ButtonDropdown_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ButtonDropdown_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonToggle_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ButtonToggle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ButtonToggle_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FAB__ = __webpack_require__(27);





/* harmony default export */ exports["a"] = {
  Btn: __WEBPACK_IMPORTED_MODULE_0__Button__["a" /* default */],
  BtnDropdown: __WEBPACK_IMPORTED_MODULE_1__ButtonDropdown_vue___default.a,
  BtnToggle: __WEBPACK_IMPORTED_MODULE_2__ButtonToggle_vue___default.a,
  Fab: __WEBPACK_IMPORTED_MODULE_3__FAB__["a" /* default */]
};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  functional: true,

  name: 'card',

  props: {
    flat: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    horizontal: Boolean,
    img: String,
    hover: Boolean,
    raised: Boolean
  },

  render(h, { data, props, children, style }) {
    data.staticClass = data.staticClass ? `card ${data.staticClass}` : 'card';
    data.style = style || {};
    data.style.height = props.height;

    if (props.horizontal) data.staticClass += ' card--horizontal';
    if (props.hover) data.staticClass += ' card--hover';
    if (props.raised) data.staticClass += ' card--raised';
    if (props.flat) data.staticClass += ' card--flat';

    if (props.img) {
      data.style.background = `url(${props.img}) center center / cover no-repeat`;
    }

    return h('div', data, children);
  }
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  functional: true,

  props: {
    actions: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    img: String,
    stackedActions: Boolean
  },

  render(h, { props, data, children }) {
    data.staticClass = data.staticClass ? `card__row ${data.staticClass}` : 'card__row';
    data.style = data.style || {};
    data.style.height = props.height;

    if (props.img) data.style.background = `url(${props.img}) center center / cover no-repeat`;
    if (props.actions) {
      data.ref = 'actions';
      data.staticClass += ' card__row--actions';
    }

    return h('div', data, children);
  }
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Card__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CardRow__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_helpers__ = __webpack_require__(0);




const CardColumn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["c" /* createSimpleFunctional */])('card__column');
const CardText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["c" /* createSimpleFunctional */])('card__text');
const CardTitle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["c" /* createSimpleFunctional */])('card__title');

/* harmony default export */ exports["a"] = {
  Card: __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* default */],
  CardRow: __WEBPACK_IMPORTED_MODULE_1__CardRow__["a" /* default */],
  CardColumn,
  CardText,
  CardTitle
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Carousel_vue__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Carousel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Carousel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue__);



/* harmony default export */ exports["a"] = {
  Carousel: __WEBPACK_IMPORTED_MODULE_0__Carousel_vue___default.a,
  CarouselItem: __WEBPACK_IMPORTED_MODULE_1__CarouselItem_vue___default.a
};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);


/* harmony default export */ exports["a"] = {
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
    classes() {
      return {
        'chip': true,
        'chip--label': this.label,
        'chip--outline': this.outline,
        'chip--small': this.small,
        'chip--removable': this.close
      };
    }
  },

  render(h) {
    const children = [this.$slots.default];
    const data = {
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
      const icon = h('v-icon', { props: { right: true } }, 'cancel');

      children.push(h('a', {
        'class': 'chip__close',
        domProps: { href: 'javascript:;' },
        on: {
          click: e => {
            e.preventDefault();

            this.$emit('input', false);
          }
        }
      }, [icon]));
    }

    return h('span', data, children);
  }
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Chip__ = __webpack_require__(33);


/* harmony default export */ exports["a"] = {
  Chip: __WEBPACK_IMPORTED_MODULE_0__Chip__["a" /* default */]
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_overlayable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(1);




/* harmony default export */ exports["a"] = {
  name: 'dialog',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */]],

  data: () => ({
    app: null
  }),

  props: {
    disabled: Boolean,
    persistent: Boolean,
    fullscreen: Boolean,
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
    classes() {
      return {
        'dialog': true,
        'dialog--active': this.isActive,
        'dialog--persistent': this.persistent,
        'dialog--fullscreen': this.fullscreen,
        'dialog--stacked-actions': this.stackedActions && !this.fullscreen,
        'dialog--scrollable': this.scrollable
      };
    },
    computedTransition() {
      return !this.transition ? 'transition' : this.transition;
    }
  },

  watch: {
    isActive(val) {
      if (val) {
        !this.fullscreen && !this.hideOverlay && this.genOverlay();
        this.fullscreen && this.hideScroll();
      } else {
        if (!this.fullscreen) this.removeOverlay();else this.showScroll();
      }
    }
  },

  mounted() {
    this.app = document.querySelector('[data-app]');
    this.$nextTick(() => {
      this.app && this.app.appendChild(this.$refs.content);
    });
  },

  beforeDestroy() {
    this.app && this.app.contains(this.$refs.content) && this.app.removeChild(this.$refs.content);
  },

  methods: {
    closeConditional(e) {
      // close dialog if !persistent and clicked outside
      return !this.persistent;
    }
  },

  render(h) {
    const children = [];
    const data = {
      'class': this.classes,
      ref: 'dialog',
      directives: [{ name: 'click-outside', value: this.closeConditional }, { name: 'show', value: this.isActive }]
    };

    if (!this.fullscreen) {
      data.style = {
        width: isNaN(this.width) ? this.width : `${this.width}px`
      };
    }

    if (this.$slots.activator) {
      children.push(h('div', {
        'class': 'dialog__activator',
        on: {
          click: e => {
            e.stopPropagation();
            if (!this.disabled) this.isActive = !this.isActive;
          }
        }
      }, [this.$slots.activator]));
    }

    const dialog = h(this.computedTransition, {
      props: { origin: this.origin }
    }, [h('div', data, [this.$slots.default])]);

    children.push(h('div', {
      'class': 'dialog__content',
      ref: 'content'
    }, [dialog]));

    return h('div', {
      'class': 'dialog__container'
    }, children);
  }
};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dialog__ = __webpack_require__(35);


/* harmony default export */ exports["a"] = {
  Dialog: __WEBPACK_IMPORTED_MODULE_0__Dialog__["a" /* default */]
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const Divider = {
  functional: true,

  props: {
    dark: Boolean,
    inset: Boolean,
    light: Boolean
  },

  render(h, { props, data, children }) {
    data.staticClass = data.staticClass ? `divider ${data.staticClass}` : 'divider';

    if (props.inset) data.staticClass += ' divider--inset';
    if (props.light) data.staticClass += ' light--text';
    if (props.dark) data.staticClass += ' dark--text';

    return h('hr', data);
  }
};

/* harmony default export */ exports["a"] = {
  Divider
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'expansion-panel',

  props: {
    expand: Boolean
  },

  computed: {
    params() {
      return {
        expand: this.expand
      };
    }
  },

  render(h) {
    return h('ul', {
      'class': 'expansion-panel'
    }, this.$slots.default);
  }
};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ExpansionPanel__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue__);



/* harmony default export */ exports["a"] = {
  ExpansionPanel: __WEBPACK_IMPORTED_MODULE_0__ExpansionPanel__["a" /* default */],
  ExpansionPanelContent: __WEBPACK_IMPORTED_MODULE_1__ExpansionPanelContent_vue___default.a
};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const Footer = {
  functional: true,

  props: {
    absolute: Boolean,
    fixed: Boolean
  },

  render(h, { data, props, children }) {
    data.staticClass = data.staticClass ? `footer ${data.staticClass}` : 'footer';

    if (props.absolute) data.staticClass += ' footer--absolute';
    if (props.fixed) data.staticClass += ' footer--fixed';

    return h('footer', data, children);
  }
};

/* harmony default export */ exports["a"] = {
  Footer
};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__ = __webpack_require__(8);


/* harmony default export */ exports["a"] = {
  name: 'checkbox',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__["a" /* default */]],

  data() {
    return {
      inputDeterminate: this.indeterminate
    };
  },

  props: {
    indeterminate: Boolean
  },

  computed: {
    classes() {
      return {
        'checkbox': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      };
    },
    icon() {
      if (this.inputDeterminate) {
        return 'indeterminate_check_box';
      } else if (this.isActive) {
        return 'check_box';
      } else {
        return 'check_box_outline_blank';
      }
    }
  },

  render(h) {
    const transition = h('v-fade-transition', [h('v-icon', {
      'class': {
        'icon--checkbox': this.icon === 'check_box'
      },
      key: this.icon
    }, this.icon)]);

    const ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: { click: this.toggle },
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    });

    return this.genInputGroup([transition, ripple]);
  }
};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_input__ = __webpack_require__(6);



/* harmony default export */ exports["a"] = {
  name: 'radio',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_input__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    inputValue: [String, Number]
  },

  computed: {
    isActive() {
      return this.inputValue === this.value;
    },
    classes() {
      return {
        'radio': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      };
    },

    icon() {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked';
    }
  },

  methods: {
    genLabel() {
      return this.$createElement('label', { on: { click: this.toggle } }, this.label);
    },
    toggle() {
      if (!this.disabled) {
        this.$emit('change', this.value);
      }
    }
  },

  render(h) {
    const transition = h('v-fade-transition', {}, [h('v-icon', {
      'class': {
        'icon--radio': this.isActive
      },
      key: this.icon
    }, this.icon)]);

    const ripple = h('div', {
      'class': 'input-group--selection-controls__ripple',
      on: { click: this.toggle },
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    });

    return this.genInputGroup([transition, ripple]);
  }
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__ = __webpack_require__(8);


/* harmony default export */ exports["a"] = {
  name: 'switch',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_checkbox__["a" /* default */]],

  computed: {
    classes() {
      return {
        'input-group--selection-controls switch': true
      };
    },
    rippleClasses() {
      return {
        'input-group--selection-controls__ripple': true,
        'input-group--selection-controls__ripple--active': this.isActive
      };
    },
    containerClasses() {
      return {
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--disabled': this.disabled,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      };
    },
    toggleClasses() {
      return {
        'input-group--selection-controls__toggle': true,
        'input-group--selection-controls__toggle--active': this.isActive
      };
    }
  },

  render(h) {
    const ripple = h('div', {
      'class': this.rippleClasses,
      on: { click: this.toggle },
      directives: [{
        name: 'ripple',
        value: { center: true }
      }]
    });

    const container = h('div', {
      'class': this.containerClasses
    }, [h('div', { 'class': this.toggleClasses }), ripple]);

    return this.genInputGroup([container, h('label', { on: { click: this.toggle } }, this.label)]);
  }
};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(6);


/* harmony default export */ exports["a"] = {
  name: 'text-field',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

  data() {
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
    suffix: String,
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    classes() {
      return {
        'input-group--text-field': true,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine,
        'input-group--full-width': this.fullWidth
      };
    },
    hasError() {
      return this.errors.length > 0 || !this.counterIsValid() || !this.validateIsValid() || this.error;
    },
    count() {
      const inputLength = (this.inputValue && this.inputValue.toString() || '').length;
      let min = inputLength;

      if (this.counterMin !== 0 && inputLength < this.counterMin) {
        min = this.counterMin;
      }

      return `${min} / ${this.counterMax}`;
    },
    counterMin() {
      const parsedMin = Number.parseInt(this.min, 10);
      return Number.isNaN(parsedMin) ? 0 : parsedMin;
    },
    counterMax() {
      const parsedMax = Number.parseInt(this.max, 10);
      return Number.isNaN(parsedMax) ? 25 : parsedMax;
    },
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
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
    isDirty() {
      return this.lazyValue !== null && typeof this.lazyValue !== 'undefined' && this.lazyValue.toString().length > 0;
    }
  },

  watch: {
    focused(val) {
      this.hasFocused = true;

      !val && this.$emit('change', this.lazyValue);
    },
    value() {
      this.lazyValue = this.value;
      this.validate();
      this.multiLine && this.autoGrow && this.calculateInputHeight();
    }
  },

  mounted() {
    this.$vuetify.load(() => {
      this.multiLine && this.autoGrow && this.calculateInputHeight();
      this.autofocus && this.focus();
    });
  },

  methods: {
    calculateInputHeight() {
      const height = this.$refs.input.scrollHeight;
      const minHeight = this.rows * 24;
      this.inputHeight = height < minHeight ? minHeight : height;
    },
    onInput(e) {
      this.inputValue = e.target.value;
      this.multiLine && this.autoGrow && this.calculateInputHeight();
    },
    blur(e) {
      this.validate();
      this.$nextTick(() => this.focused = false);
      this.$emit('blur', e);
    },
    focus(e) {
      this.focused = true;
      this.$refs.input.focus();
      this.$emit('focus', e);
    },
    genCounter() {
      return this.$createElement('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': !this.counterIsValid()
        }
      }, this.count);
    },
    genInput() {
      const tag = this.multiLine ? 'textarea' : 'input';

      const data = {
        style: {
          'height': this.inputHeight && `${this.inputHeight}px`
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

      const children = [this.$createElement(tag, data)];

      this.prefix && children.unshift(this.genFix('prefix'));
      this.suffix && children.push(this.genFix('suffix'));

      return children;
    },
    genFix(type) {
      return this.$createElement('span', {
        'class': `input-group--text-field__${type}`
      }, this[type]);
    },
    counterIsValid: function counterIsValid() {
      const val = this.inputValue && this.inputValue.toString() || '';

      return !this.counter || val.length >= this.counterMin && val.length <= this.counterMax;
    },
    validateIsValid() {
      return !this.required || this.required && this.isDirty || !this.hasFocused || this.hasFocused && this.focused;
    }
  },

  render() {
    return this.genInputGroup(this.genInput(), { attrs: { tabindex: -1 } });
  }
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Checkbox__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Radio__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Switch__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TextField__ = __webpack_require__(44);





/* harmony default export */ exports["a"] = {
  Checkbox: __WEBPACK_IMPORTED_MODULE_0__Checkbox__["a" /* default */],
  Radio: __WEBPACK_IMPORTED_MODULE_1__Radio__["a" /* default */],
  Switch: __WEBPACK_IMPORTED_MODULE_2__Switch__["a" /* default */],
  TextField: __WEBPACK_IMPORTED_MODULE_3__TextField__["a" /* default */]
};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


const Flex = {
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = data.staticClass ? `flex ${data.staticClass}` : 'flex';
    data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`;
    delete data.attrs;

    return h('div', data, children);
  }
};

const Layout = {
  functional: true,

  render: (h, { data, children }) => {
    data.staticClass = data.staticClass ? `layout ${data.staticClass}` : 'layout';

    if (data.attrs) {
      data.staticClass += ` ${Object.keys(data.attrs).join(' ')}`;
      delete data.attrs;
    }

    return h('div', data, children);
  }
};

const Container = {
  functional: true,

  props: {
    fluid: Boolean
  },

  render(h, { props, data, children }) {
    data.staticClass = data.staticClass ? `container ${data.staticClass}` : 'container';

    if (props.fluid) data.staticClass += ' container--fluid';

    return h('div', data, children);
  }
};

const Spacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('spacer');

/* harmony default export */ exports["a"] = {
  Flex,
  Container,
  Spacer,
  Layout
};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_schemable__ = __webpack_require__(5);


/* harmony default export */ exports["a"] = {
  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_schemable__["a" /* default */]],

  props: {
    disabled: Boolean,
    fa: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  render(h, { props, data, children }) {
    const icon = props.fa ? 'fa' : 'material-icons';
    data.staticClass = data.staticClass ? `${icon} icon ${data.staticClass} ` : `${icon} icon`;
    data.attrs = data.attrs || {};

    if (props.dark) data.staticClass += ' dark--text';
    if (props.light) data.staticClass += ' light--text';

    const classes = {
      'icon--large': props.large,
      'icon--left': props.left,
      'icon--medium': props.medium,
      'icon--right': props.right,
      'icon--x-large': props.xLarge
    };

    const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ');
    iconClasses && (data.staticClass += ` ${iconClasses}`);

    if (props.fa) {
      const text = children.pop().text;

      if (text.indexOf(' ') === -1) data.staticClass += ` fa-${text}`;else data.staticClass += ` ${text.split(' ').join('fa- ')}`;
    }

    if (props.disabled) {
      data.attrs.disabled = props.disabled;
    }

    return h('i', data, children);
  }
};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Icon__ = __webpack_require__(47);


/* harmony default export */ exports["a"] = {
  Icon: __WEBPACK_IMPORTED_MODULE_0__Icon__["a" /* default */]
};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_schemable__ = __webpack_require__(5);


/* harmony default export */ exports["a"] = {
  name: 'list',

  provide() {
    return {
      listClick: this.listClick,
      listClose: this.listClose
    };
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_schemable__["a" /* default */]],

  data() {
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
    classes() {
      return {
        'list': true,
        'list--two-line': this.twoLine,
        'list--dense': this.dense,
        'list--three-line': this.threeLine,
        'list--subheader': this.subheader,
        'dark--text dark--bg': this.dark,
        'light--text light--bg': this.light
      };
    }
  },

  watch: {
    uid() {
      this.$children.filter(i => i.$options._componentTag === 'v-list-group').forEach(i => i.toggle(this.uid));
    }
  },

  methods: {
    listClick(uid, force) {
      if (force) {
        this.uid = uid;
      } else {
        this.uid = this.uid === uid ? null : uid;
      }
    },

    listClose(uid) {
      if (this.uid === uid) {
        this.uid = null;
      }
    }
  },

  render(h) {
    const data = {
      'class': this.classes,
      attrs: { 'data-uid': this._uid }
    };

    return h('ul', data, [this.$slots.default]);
  }
};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);



/* harmony default export */ exports["a"] = {
  name: 'list-group',

  inject: ['listClick', 'listClose'],

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  data() {
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
    classes() {
      return {
        'list--group__header': true,
        'list--group__header--active': this.isActive,
        'list--group__header--no-action': this.noAction
      };
    }
  },

  watch: {
    isActive() {
      this.isBooted = true;

      if (!this.isActive) {
        this.listClose(this._uid);
      }
    },
    '$route'(to) {
      const isActive = this.matchRoute(to.path);

      if (this.group) {
        if (isActive && this.isActive !== isActive) {
          this.listClick(this._uid);
        }
        this.isActive = isActive;
      }
    }
  },

  mounted() {
    if (this.group) {
      this.isActive = this.matchRoute(this.$route.path);
    }

    if (this.isActive) {
      this.listClick(this._uid);
    }
  },

  methods: {
    click() {
      if (!this.$refs.item.querySelector('.list__tile--disabled')) {
        this.listClick(this._uid);
      }
    },
    toggle(uid) {
      this.isActive = this._uid === uid;
    },
    matchRoute(to) {
      if (!this.group) return false;
      return to.match(this.group) !== null;
    }
  },

  render(h) {
    const group = h('ul', {
      'class': 'list list--group',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      ref: 'group'
    }, [this.lazy && !this.isBooted ? null : this.$slots.default]);

    const item = h('div', {
      'class': this.classes,
      on: { click: this.click },
      ref: 'item'
    }, [this.$slots.item]);

    const transition = h('transition', {
      on: {
        enter: this.enter,
        afterEnter: this.afterEnter,
        leave: this.leave
      }
    }, [group]);

    return h('div', { 'class': 'list--group__container' }, [item, transition]);
  }
};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(1);



/* harmony default export */ exports["a"] = {
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
    classes() {
      return {
        'list__tile': true,
        'list__tile--active': this.isActive,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled
      };
    }
  },

  render(h) {
    const { tag, data } = this.generateRouteLink();

    return h('li', [h(tag, data, [this.$slots.default])]);
  }
};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  functional: true,

  name: 'list-tile-action',

  render(h, context) {
    const data = {
      'class': {
        'list__tile__action': true,
        'list__tile__action--stack': (context.children || []).length > 1
      }
    };

    return h('div', data, context.children);
  }
};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__List__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ListGroup__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ListTile__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ListTileAction__ = __webpack_require__(52);







const ListTileActionText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('list__tile__action-text', 'span');
const ListTileAvatar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('list__tile__avatar', 'v-avatar');
const ListTileContent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('list__tile__content', 'div');
const ListTileTitle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('list__tile__title', 'div');
const ListTileSubTitle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('list__tile__sub-title', 'div');

/* harmony default export */ exports["a"] = {
  List: __WEBPACK_IMPORTED_MODULE_1__List__["a" /* default */],
  ListTile: __WEBPACK_IMPORTED_MODULE_3__ListTile__["a" /* default */],
  ListGroup: __WEBPACK_IMPORTED_MODULE_2__ListGroup__["a" /* default */],
  ListTileAction: __WEBPACK_IMPORTED_MODULE_4__ListTileAction__["a" /* default */],
  ListTileActionText,
  ListTileAvatar,
  ListTileContent,
  ListTileTitle,
  ListTileSubTitle
};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_activator__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_generators__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_position__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_utils__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_keyable__ = __webpack_require__(58);







/* harmony default export */ exports["a"] = {
  name: 'menu',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_activator__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_generators__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_keyable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_position__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_utils__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__["a" /* default */]],

  data() {
    return {
      app: null,
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
    }
  },

  computed: {
    minWidth() {
      return this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0);
    },
    styles() {
      return {
        maxHeight: this.auto ? '200px' : isNaN(this.maxHeight) ? this.maxHeight : `${this.maxHeight}px`,
        minWidth: `${this.minWidth}px`,
        top: `${this.calcTop()}px`,
        left: `${this.calcLeft()}px`
      };
    },
    hasActivator() {
      return !!this.$refs.activator || this.activator;
    }
  },

  watch: {
    activator(newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator);
      this.addActivatorEvents(newActivator);
    },
    disabled(val) {
      val && this.deactivate();
    },
    hasJustFocused(val) {
      if (!val) return;

      clearTimeout(this.focusedTimeout);
      this.focusedTimeout = setTimeout(() => this.hasJustFocused = false, 600);
    },
    isActive(val) {
      if (this.disabled) return;

      val && this.activate() || this.deactivate();
    },
    windowResizeHandler() {
      this.isBooted = false;
    }
  },

  mounted() {
    window.addEventListener('resize', this.onResize, { passive: true });
    this.app = document.querySelector('[data-app]');
    this.$nextTick(() => {
      this.app && this.app.appendChild(this.$refs.content);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize, { passive: true });
    this.app && this.app.contains(this.$refs.content) && this.app.removeChild(this.$refs.content);

    window.removeEventListener('resize', this.windowResizeHandler);
  },

  methods: {
    activate() {
      this.insideContent = true;
      this.initWindow();
      this.getTiles();
      this.updateDimensions();
      setTimeout(this.startTransition, 50);
    },
    deactivate() {
      this.isContentActive = false;
    },
    onResize() {
      clearTimeout(this.resizeTimeout);
      if (!this.isActive) return;
      this.resizeTimeout = setTimeout(this.updateDimensions, 200);
    },
    startTransition() {
      this.isContentActive = true;
      setTimeout(this.calculateScroll, 0);
    }
  },

  render(h) {
    const directives = !this.openOnHover ? [{
      name: 'click-outside',
      value: () => this.closeOnClick
    }] : [];

    const data = {
      'class': 'menu',
      directives,
      on: {
        keydown: e => {
          if (e.keyCode === 27) this.isActive = false;else this.changeListIndex(e);
        }
      }
    };

    return h('div', data, [this.genActivator(), this.genTransition()]);
  }
};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Menu_js__ = __webpack_require__(54);


/* harmony default export */ exports["a"] = {
  Menu: __WEBPACK_IMPORTED_MODULE_0__Menu_js__["a" /* default */]
};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    getActivator() {
      if (this.activator) return this.activator;
      return this.$refs.activator.children ? this.$refs.activator.children[0] : this.$refs.activator;
    },
    activatorClickHandler(e) {
      if (!this.closeOnClick) e.stopPropagation();
      if (this.disabled) return;else if (this.openOnClick && !this.isActive) {
        this.isActive = true;
        this.absoluteX = e.clientX;
        this.absoluteY = e.clientY;
      } else if (this.closeOnClick && this.isActive) this.isActive = false;
    },
    mouseEnterHandler(e) {
      if (this.disabled || this.hasJustFocused) return;
      this.isActive = true;
    },
    mouseLeaveHandler(e) {
      if (this.insideContent) return;
      this.isActive = false;
      this.hasJustFocused = true;
    },
    addActivatorEvents(activator = null) {
      if (!activator) return;
      activator.addEventListener('click', this.activatorClickHandler);
    },
    removeActivatorEvents(activator = null) {
      if (!activator) return;
      activator.removeEventListener('click', this.activatorClickHandler);
    }
  }
};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genActivator() {
      if (!this.$slots.activator) return null;

      const options = {
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

    genTransition() {
      return this.$createElement(this.transition, {
        props: { origin: this.origin }
      }, [this.genContent()]);
    },

    genContent() {
      return this.$createElement('div', {
        'class': 'menu__content',
        ref: 'content',
        style: this.styles,
        directives: [{
          name: 'show',
          value: this.isContentActive
        }],
        on: {
          click: e => {
            e.stopPropagation();
            if (this.closeOnContentClick) this.isActive = false;
          },
          mouseenter: e => {
            this.insideContent = true;
          },
          mouseleave: e => {
            this.insideContent = false;
            this.openOnHover && this.mouseLeaveHandler();
          }
        }
      }, [this.lazy && this.isBooted || !this.lazy ? this.$slots.default : null]);
    }
  }
};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data: () => ({
    listIndex: -1,
    isUsingKeys: false,
    tiles: []
  }),

  watch: {
    isActive(val) {
      if (!val) this.listIndex = -1;
    },
    listIndex(next, prev) {
      // For infinite scroll, re-evaluate children
      next === this.tiles.length - 1 && this.getTiles();

      if (next !== -1) {
        this.tiles[next].classList.add('list__tile--highlighted');
        this.$refs.content.scrollTop = next * 48;
      }

      prev !== -1 && this.tiles[prev].classList.remove('list__tile--highlighted');
    }
  },

  methods: {
    changeListIndex(e) {
      [40, 38, 13].includes(e.keyCode) && e.preventDefault();

      if (this.listIndex === -1) this.setActiveListIndex();
      if ([27, 9].includes(e.keyCode)) this.isActive = false;else if (e.keyCode === 40 && this.listIndex < this.tiles.length - 1) this.listIndex++;else if (e.keyCode === 38 && this.listIndex > 0) this.listIndex--;else if (e.keyCode === 13 && this.listIndex !== -1) this.tiles[this.listIndex].click();else if (e.keyCode === 13) this.isActive = true;
    },
    getTiles() {
      this.tiles = this.$refs.content.querySelectorAll('.list__tile');
    },
    setActiveListIndex() {
      this.tiles.forEach((t, i) => {
        if (t.classList.contains('list__tile--active')) {
          this.listIndex = i;
          return;
        }
      });
    }
  }
};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    // Revisit this
    calculateScroll() {
      if (this.selectedIndex === null) return;

      let scrollTop = 0;

      if (this.selectedIndex >= this.stopIndex) {
        scrollTop = this.$refs.content.scrollHeight;
      } else if (this.selectedIndex > this.startIndex) {
        scrollTop = this.selectedIndex * 48 - 56;
      }

      this.$refs.content.scrollTop = scrollTop;
    },
    calcLeftAuto() {
      const a = this.dimensions.activator;

      return parseInt(a.left - 16);
    },
    calcTopAuto() {
      if (!this.hasActivator) return this.calcTop(true);

      const selectedIndex = Array.from(this.tiles).findIndex(n => n.classList.contains('list__tile--active'));

      if (selectedIndex === -1) {
        this.selectedIndex = null;

        return this.calcTop(true);
      }

      this.selectedIndex = selectedIndex;
      let actingIndex = selectedIndex;

      let offsetPadding = -16;
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
    calcLeft() {
      if (this.auto) return this.calcLeftAuto();

      const a = this.dimensions.activator;
      const c = this.dimensions.content;
      let left = this.left ? a.right - c.width : a.left;

      if (this.offsetX) left += this.left ? -a.width : a.width;
      if (this.nudgeLeft) left += this.nudgeLeft;
      if (this.nudgeRight) left -= this.nudgeRight;

      const totalWidth = left + this.minWidth - this.window.innerWidth;

      if (totalWidth > 0) left -= totalWidth + 24; // give a little extra space

      return left;
    },
    calcTop(force) {
      if (this.auto && !force) return this.calcTopAuto();

      const a = this.dimensions.activator;
      const c = this.dimensions.content;
      let top = this.top ? a.bottom - c.height : a.top;

      if (this.offsetY) top += this.top ? -a.height : a.height;
      if (this.nudgeTop) top -= this.nudgeTop;
      if (this.nudgeBottom) top += this.nudgeBottom;

      return top + this.window.pageYOffset;
    },
    sneakPeek(cb) {
      const el = this.$refs.content;
      const currentDisplay = el.style.display;

      el.style.display = 'inline-block';
      cb();
      el.style.display = currentDisplay;
    },
    absolutePosition() {
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
    updateDimensions() {
      this.sneakPeek(() => {
        this.dimensions = {
          activator: !this.hasActivator || this.positionAbsolutely ? this.absolutePosition() : this.measure(this.getActivator()),
          content: this.measure(this.$refs.content)
        };
      });
    }
  }
};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    measure(el, selector, getParent = false) {
      el = selector ? el.querySelector(selector) : el;

      if (!el) return null;

      const { top, bottom, left, right, height, width } = el.getBoundingClientRect();

      return {
        offsetTop: el.offsetTop,
        scrollHeight: el.scrollHeight,
        top, bottom, left, right, height, width
      };
    },
    initWindow() {
      this.isBooted = true;

      if (this.window === window) return;

      this.window = window;
      this.window.addEventListener('resize', this.windowResizeHandler);
    }
  }
};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_overlayable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_schemable__ = __webpack_require__(5);



/* harmony default export */ exports["a"] = {
  name: 'navigation-drawer',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_schemable__["a" /* default */]],

  data() {
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
    fullHeight: Boolean,
    miniVariant: Boolean,
    permanent: Boolean,
    persistent: Boolean,
    right: Boolean,
    temporary: Boolean,
    value: { required: false }
  },

  computed: {
    calculatedHeight() {
      return this.height || '100%';
    },
    classes() {
      return {
        'navigation-drawer': true,
        'navigation-drawer--absolute': this.absolute,
        'navigation-drawer--is-booted': this.isBooted,
        'navigation-drawer--clipped': this.clipped,
        'navigation-drawer--close': !this.isActive,
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--full-height': this.fullHeight,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive,
        'navigation-drawer--permanent': this.permanent,
        'navigation-drawer--persistent': this.persistent,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary,
        'dark--text': this.dark,
        'light--text': this.light
      };
    },
    showOverlay() {
      return !this.permanent && this.isActive && (this.temporary || this.isMobile);
    }
  },

  watch: {
    isActive(val) {
      this.$emit('input', val);
    },
    showOverlay(val) {
      val && this.genOverlay() || this.removeOverlay();
    },
    '$route'() {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.closeConditional();
      }
    },
    value(val) {
      if (this.permanent) return;
      if (val !== this.isActive) this.isActive = val;
    }
  },

  mounted() {
    this.$vuetify.load(this.init);
  },

  beforeDestroy() {
    if (this.permanent) return;
    window.removeEventListener('resize', this.onResize, { passive: false });
  },

  methods: {
    init() {
      this.checkIfMobile();
      setTimeout(() => this.isBooted = true, 0);

      if (this.permanent) {
        this.isActive = true;
        return;
      } else if (this.isMobile) this.isActive = false;else if (!this.value && (this.persistent || this.temporary)) this.isActive = false;

      window.addEventListener('resize', this.onResize, { passive: false });
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth <= parseInt(this.mobileBreakPoint);
    },
    closeConditional() {
      return !this.permanent && (this.temporary || this.isMobile);
    },
    onResize() {
      if (!this.enableResizeWatcher || this.permanent || this.temporary) return;
      this.checkIfMobile();
      this.isActive = !this.isMobile;
    }
  },

  render(h) {
    const data = {
      'class': this.classes,
      style: { height: this.calculatedHeight },
      directives: [{
        name: 'click-outside',
        value: this.closeConditional
      }],
      on: {
        click: () => {
          this.$emit('update:miniVariant', false);
        }
      }
    };

    return h('aside', data, [this.$slots.default]);
  }
};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NavigationDrawer__ = __webpack_require__(61);


/* harmony default export */ exports["a"] = {
  NavigationDrawer: __WEBPACK_IMPORTED_MODULE_0__NavigationDrawer__["a" /* default */]
};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pagination_vue__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pagination_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Pagination_vue__);


/* harmony default export */ exports["a"] = {
  Pagination: __WEBPACK_IMPORTED_MODULE_0__Pagination_vue___default.a
};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parallax_vue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Parallax_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Parallax_vue__);


/* harmony default export */ exports["a"] = {
  Parallax: __WEBPACK_IMPORTED_MODULE_0__Parallax_vue___default.a
};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_date_title__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_date_header__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_date_table__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_date_years__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_picker__ = __webpack_require__(11);






const defaultDateFormat = val => new Date(val).toISOString().substr(0, 10);

/* harmony default export */ exports["a"] = {
  name: 'date-picker',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_date_title__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_date_header__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_date_table__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_date_years__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_picker__["a" /* default */]],

  data() {
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
    days: {
      type: Array,
      default: () => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    formattedValue: {
      required: false
    },
    months: {
      type: Array,
      default: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    allowedDates: {
      type: [Array, Object, Function],
      default: () => null
    },
    firstDayOfWeek: {
      type: String,
      default: 'Sunday'
    }
  },

  computed: {
    firstAllowedDate() {
      const date = new Date();
      date.setHours(12, 0, 0, 0);

      if (this.allowedDates) {
        const millisecondOffset = 1 * 24 * 60 * 60 * 1000;
        const valid = new Date(date);
        for (let i = 0; i < 31; i++) {
          if (this.isAllowed(valid)) return valid;

          valid.setTime(valid.getTime() + millisecondOffset);
        }
      }

      return date;
    },
    inputDate: {
      get() {
        if (!this.value) return this.firstAllowedDate;
        if (this.value instanceof Date) return this.value;
        if (!isNaN(this.value) || typeof this.value === 'string' && this.value.indexOf(':') !== -1) return new Date(this.value);

        return new Date(`${this.value}T12:00:00`);
      },
      set(val) {
        this.$emit('input', val ? defaultDateFormat(val) : this.originalDate);
        this.$emit('update:formattedValue', val ? this.dateFormat(val) : this.dateFormat(this.originalDate));
      }
    },
    day() {
      return this.inputDate.getDate();
    },
    month() {
      return this.inputDate.getMonth();
    },
    year() {
      return this.inputDate.getFullYear();
    },
    tableMonth() {
      return this.tableDate.getMonth();
    },
    tableYear() {
      return this.tableDate.getFullYear();
    },
    dayName() {
      return this.inputDate ? this.week[this.inputDate.getDay()] : '';
    },
    monthName() {
      return this.inputDate ? this.months[this.month] : '';
    },
    computedTransition() {
      return this.isReversing ? 'v-tab-reverse-transition' : 'v-tab-transition';
    },
    week() {
      const week = [];
      let index = this.days.indexOf(this.firstDayOfWeek);

      while (week.length < 7) {
        week.push(this.days[index % 7]);
        index += 1;
      }

      return week;
    }
  },

  watch: {
    isSelected(val) {
      val && this.$nextTick(() => {
        this.$refs.years.scrollTop = this.$refs.years.scrollHeight / 2 - 125;
      });
    },
    tableDate(val, prev) {
      this.isReversing = val < prev;
    },
    value(val) {
      if (val) this.tableDate = this.inputDate;
    }
  },

  methods: {
    save() {
      if (this.originalDate) {
        this.originalDate = this.value;
      } else {
        this.originalDate = this.inputDate;
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    cancel() {
      this.inputDate = this.originalDate;
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    isAllowed(date) {
      if (!this.allowedDates) return true;

      if (Array.isArray(this.allowedDates)) {
        return !!this.allowedDates.find(allowedDate => {
          const d = new Date(allowedDate);
          d.setHours(12, 0, 0, 0);

          return d - date === 0;
        });
      } else if (this.allowedDates instanceof Function) {
        return this.allowedDates(date);
      } else if (this.allowedDates instanceof Object) {
        const min = new Date(this.allowedDates.min);
        min.setHours(12, 0, 0, 0);
        const max = new Date(this.allowedDates.max);
        max.setHours(12, 0, 0, 0);

        return date >= min && date <= max;
      }

      return true;
    }
  },

  mounted() {
    this.currentDay = this.tableDate.getDate();
    this.currentMonth = this.tableDate.getMonth();
    this.currentYear = this.tableDate.getFullYear();
    this.tableDate = this.inputDate;
  },

  render(h) {
    const children = [];

    !this.noTitle && children.push(this.genTitle());

    if (!this.isSelected) {
      const bodyChildren = [];

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
};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_picker__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_time_title__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_time_body__ = __webpack_require__(72);




/* harmony default export */ exports["a"] = {
  name: 'time-picker',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_picker__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_time_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_time_title__["a" /* default */]],

  data() {
    return {
      isDragging: false,
      rotate: 0,
      originalTime: this.value,
      period: 'am',
      selectingHour: true,
      ranges: {
        hours: [...Array.from({ length: 24 }, (v, k) => k)],
        minutes: [...Array.from({ length: 60 }, (v, k) => k)]
      }
    };
  },

  props: {
    format: {
      type: String,
      default: 'ampm',
      validator(val) {
        return ['ampm', '24hr'].includes(val);
      }
    },
    allowedHours: {
      type: [Array, Object, Function],
      default: () => null
    },
    allowedMinutes: {
      type: [Array, Object, Function],
      default: () => null
    }
  },

  computed: {
    is24hr() {
      return this.format !== 'ampm';
    },
    divider() {
      if (!this.selectingHour) return 60;
      return this.is24hr ? 24 : 12;
    },
    degrees() {
      return this.degreesPerUnit * Math.PI / 180;
    },
    degreesPerUnit() {
      return 360 / this.divider;
    },
    inputTime: {
      get() {
        if (this.value && !(this.value instanceof Date)) return this.value;
        let value = new Date();

        if (this.value instanceof Date) {
          value = this.value;
        }

        let hour = value.getHours();
        let minute = value.getMinutes();
        let period = '';

        if (!this.is24hr) {
          hour = hour > 12 ? hour - 12 : hour;
          period = this.period;
        }

        hour = this.firstAllowed('hour', hour);
        minute = this.firstAllowed('minute', minute);

        return `${hour}:${minute}${period}`;
      },
      set(val) {
        return this.$emit('input', val);
      }
    },
    timeArray() {
      return this.inputTime.replace(/(am|pm)/, '').split(':');
    },
    hour: {
      get() {
        return parseInt(this.timeArray[0]);
      },
      set(val) {
        if (!this.is24hr) {
          val = val > 12 ? val - 12 : val < 1 ? 12 : val;
        } else {
          val = val < 10 ? `0${val}` : val > 23 ? '00' : val;
        }

        this.inputTime = `${val}:${this.minute}${!this.is24hr ? this.period : ''}`;
      }
    },
    minute: {
      get() {
        const minute = parseInt(this.timeArray[1]);

        return minute < 10 ? `0${minute}` : minute > 59 ? '00' : minute;
      },
      set(val) {
        val = val < 10 ? `0${parseInt(val)}` : val > 59 ? '00' : val;
        let hour = this.hour;

        if (this.is24hr && hour < 10) {
          hour = `0${hour}`;
        }

        this.inputTime = `${hour}:${val}${!this.is24hr ? this.period : ''}`;
      }
    },
    clockHand() {
      if (this.selectingHour) return this.degreesPerUnit * this.hour;
      return this.degreesPerUnit * this.minute;
    },
    radius() {
      return this.clockSize / 2;
    },
    clockSize: {
      get() {
        return this.size;
      },
      set(val) {
        this.size = val;
      }
    },
    size() {
      return this.landscape ? 250 : 280;
    }
  },

  watch: {
    period(val) {
      const hour = !!this.allowedHours && this.selectingHour ? this.firstAllowed('hour', this.hour - 1) : this.hour;
      this.inputTime = `${hour}:${this.minute}${val}`;
    },
    value(val) {
      if (this.isSaving) {
        this.originalTime = this.inputTime;
        this.isSaving = false;
      }
    }
  },

  methods: {
    save() {
      if (this.originalTime) {
        this.originalTime = this.value;
      } else {
        this.inputTime = this.inputTime;
        this.originalTime = this.inputTime;
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    cancel() {
      this.inputTime = this.originalTime;
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    isAllowed(type, value) {
      const allowed = this[`allowed${type.charAt(0).toUpperCase() + type.slice(1)}s`];

      if (!allowed) return true;

      if (Array.isArray(allowed)) {
        return !!allowed.find(v => v === value);
      } else if (allowed instanceof Function) {
        return allowed(value);
      } else if (allowed === Object(allowed)) {
        const range = type === 'minute' ? this.ranges.minutes : this.ranges.hours;
        const mod = type === 'minute' ? 60 : 24;

        if (allowed.min === String(allowed.min)) {
          allowed.min = this.convert12to24hr(allowed.min);
        }

        if (allowed.max === String(allowed.max)) {
          allowed.max = this.convert12to24hr(allowed.max);
        }

        const steps = allowed.max - allowed.min;
        value = type === 'hour' && !this.is24hr && this.period === 'pm' ? value + 12 : value;

        for (let i = 0; i <= steps; i++) {
          const index = (allowed.min + i) % mod;
          if (range[index] === value) return true;
        }

        return false;
      }

      return true;
    },
    convert12to24hr(input) {
      input = input.toLowerCase();
      const pm = input.indexOf('pm') !== -1;
      const hour = parseInt(input.slice(0, input.indexOf(pm ? 'pm' : 'am')));

      return pm ? hour + 12 : hour;
    },
    generateRange(type, start) {
      let range = type === 'hour' ? this.ranges.hours : this.ranges.minutes;
      let offset = 1;

      if (type === 'hour' && !this.is24hr) {
        range = range.slice(1, 13);
        offset = 0;
      }

      return range.slice(start + offset, range.length).concat(range.slice(0, start + offset));
    },
    firstAllowed(type, value) {
      const allowed = this[`allowed${type.charAt(0).toUpperCase() + type.slice(1)}s`];

      if (!allowed) return value;

      const range = this.generateRange(type, value);

      const first = range.find(v => this.isAllowed(type, v));

      return first || value;
    }
  },

  render(h) {
    const children = [this.genBody()];

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
};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DatePicker__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TimePicker__ = __webpack_require__(66);



/* harmony default export */ exports["a"] = {
  DatePicker: __WEBPACK_IMPORTED_MODULE_0__DatePicker__["a" /* default */],
  TimePicker: __WEBPACK_IMPORTED_MODULE_1__TimePicker__["a" /* default */]
};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genHeader() {
      return this.$createElement('div', {
        'class': 'picker--date__header'
      }, [this.genSelector()]);
    },
    genSelector() {
      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: e => {
            e.stopPropagation();
            this.tableDate = new Date(this.tableYear, this.tableMonth - 1);
          }
        }
      }, [this.$createElement('v-icon', 'chevron_left')]), this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [this.$createElement(this.computedTransition, [this.$createElement('strong', {
        key: this.tableMonth
      }, `${this.months[this.tableMonth]} ${this.tableYear}`)])]), this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: e => {
            e.stopPropagation();
            this.tableDate = new Date(this.tableYear, this.tableMonth + 1);
          }
        }
      }, [this.$createElement('v-icon', 'chevron_right')])]);
    }
  }
};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genTable() {
      const children = [];
      const data = {
        'class': 'picker--date__table'
      };

      if (this.scrollable) {
        data.on = {
          wheel: e => {
            e.preventDefault();

            let month = this.tableMonth;
            const year = this.tableYear;
            const next = e.deltaY < 0;

            if (next) month++;else month--;

            this.tableDate = new Date(year, month);
          }
        };
      }

      children.push(this.$createElement('table', {
        key: this.tableMonth
      }, [this.genTHead(), this.genTBody()]));

      return this.$createElement('div', data, [this.$createElement(this.computedTransition, children)]);
    },
    genTHead() {
      return this.$createElement('thead', {}, this.genTR(this.week.map(o => {
        return this.$createElement('th', o.substr(0, 1));
      })));
    },
    genTBody() {
      const children = [];
      let rows = [];
      const length = new Date(this.tableYear, this.tableMonth + 1, 0).getDate();

      const day = new Date(this.tableYear, this.tableMonth).getDay() - this.days.indexOf(this.firstDayOfWeek);

      for (let i = 0; i < day; i++) {
        rows.push(this.$createElement('td'));
      }

      for (let i = 1; i <= length; i++) {
        rows.push(this.$createElement('td', [this.$createElement('button', {
          'class': {
            'btn btn--floating btn--small btn--flat': true,
            'btn--active': this.isActive(i),
            'btn--current': this.isCurrent(i),
            'btn--light': this.dark
          },
          attrs: {
            disabled: !this.isAllowed(new Date(this.tableYear, this.tableMonth, i, 12, 0, 0, 0)),
            type: 'button'
          },
          domProps: {
            innerHTML: `<span class="btn__content">${i}</span>`
          },
          on: {
            click: () => {
              const day = i < 10 ? `0${i}` : i;
              let tableMonth = this.tableMonth + 1;
              tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth;

              this.inputDate = `${this.tableYear}-${tableMonth}-${day}T12:00:00`;
              this.$nextTick(() => !this.actions && this.save());
            }
          }
        })]));

        if (rows.length % 7 === 0) {
          children.push(this.genTR(rows));
          rows = [];
        }
      }

      if (rows.length) {
        children.push(this.genTR(rows));
      }

      children.length < 6 && children.push(this.genTR([this.$createElement('td', { domProps: { innerHTML: '&nbsp;' } })]));

      return this.$createElement('tbody', children);
    },
    genTR(children = [], data = {}) {
      return [this.$createElement('tr', data, children)];
    },
    isActive(i) {
      return this.tableYear === this.year && this.tableMonth === this.month && this.day === i;
    },
    isCurrent(i) {
      return this.currentYear === this.tableYear && this.currentMonth === this.tableMonth && this.currentDay === i;
    }
  }
};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony default export */ exports["a"] = {
  methods: {
    genTitle() {
      const date = `${this.dayName.substr(0, 3)},${this.landscape ? '<br>' : ''} ${this.monthName.substr(0, 3)} ${this.day}`;

      const text = this.$createElement('transition', {
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
          click: e => {
            e.stopPropagation();
            this.isSelected = true;
          }
        }
      }, this.year), this.$createElement('div', {
        'class': {
          'picker--date__title-date': true,
          'active': !this.isSelected
        },
        on: {
          click: e => {
            e.stopPropagation();
            this.isSelected = false;
          }
        }
      }, [text])]);
    }
  }
};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genYears() {
      return this.$createElement('ul', {
        'class': 'picker--date__years',
        ref: 'years'
      }, this.genYearItems());
    },
    genYearItems() {
      const children = [];
      for (let i = this.year + 100, length = this.year - 100; i > length; i--) {
        children.push(this.$createElement('li', {
          'class': {
            active: this.year === i
          },
          on: {
            click: e => {
              e.stopPropagation();

              let tableMonth = this.tableMonth + 1;
              let day = this.day;
              tableMonth = tableMonth < 10 ? `0${tableMonth}` : tableMonth;
              day = day < 10 ? `0${day}` : day;

              this.inputDate = `${i}-${tableMonth}-${day}`;
              this.isSelected = false;
            }
          }
        }, i));
      }
      return children;
    }
  }
};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data() {
    return {
      hasChanged: false
    };
  },
  methods: {
    genBody() {
      const children = [this.genHand(this.selectingHour ? 'hour' : 'minute')];
      const data = {
        'class': 'picker--time__clock',
        on: {
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
          mouseleave: () => {
            this.isDragging && this.onMouseUp();
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
        data.on.wheel = e => {
          e.preventDefault();

          const diff = e.wheelDelta > 0 ? 1 : -1;
          const changing = this.selectingHour ? 'changeHour' : 'changeMinute';

          this[changing](diff);
        };
      }

      return this.$createElement('div', {
        'class': 'picker__body'
      }, [this.$createElement('v-fade-transition', {
        props: { mode: 'out-in' }
      }, [this.$createElement('div', data, children)])]);
    },
    genHand(type) {
      return [this.$createElement('div', {
        'class': `picker--time__clock-hand ${type}`,
        style: {
          transform: `rotate(${this.clockHand}deg)`
        }
      })];
    },
    genHours() {
      let hours = this.is24hr ? 24 : 12;
      const children = [];
      let start = 0;

      if (hours === 12) {
        hours++;
        start = 1;
      }

      for (let i = start; i < hours; i++) {
        children.push(this.$createElement('span', {
          'class': {
            'active': i === this.hour,
            'disabled': !this.isAllowed('hour', i)
          },
          style: this.getTransform(i),
          domProps: { innerHTML: `<span>${i}</span>` }
        }));
      }

      return children;
    },
    genMinutes() {
      const children = [];

      for (let i = 0; i < 60; i = i + 5) {
        let num = i;

        if (num < 10) num = `0${num}`;
        if (num === 60) num = '00';

        children.push(this.$createElement('span', {
          'class': {
            'active': num.toString() === this.minute.toString(),
            'disabled': !this.isAllowed('minute', i)
          },
          style: this.getTransform(i),
          domProps: { innerHTML: `<span>${num}</span>` }
        }));
      }

      return children;
    },
    getTransform(i) {
      const { x, y } = this.getPosition(i);

      return { transform: `translate(${x}px, ${y}px)` };
    },
    getPosition(i) {
      return {
        x: Math.round(Math.sin(i * this.degrees) * this.radius * 0.8),
        y: Math.round(-Math.cos(i * this.degrees) * this.radius * 0.8)
      };
    },
    changeHour(time) {
      let range = this.generateRange('hour', this.hour);

      time < 0 && (range = range.reverse().slice(1));
      this.hour = range.find(h => this.allowedHours ? this.isAllowed('hour', h) : true);

      return true;
    },
    changeMinute(time) {
      const current = Number(this.minute);
      let range = this.generateRange('minute', current);

      time < 0 && (range = range.reverse().slice(1));
      const minute = range.find(m => this.allowedMinutes ? this.isAllowed('minute', m) : true);

      this.minute = minute < 10 ? `0${minute}` : minute;

      return true;
    },
    onMouseDown(e) {
      e.preventDefault();

      this.isDragging = true;
      this.onDragMove(e);
    },
    onMouseUp() {
      this.isDragging = false;
      !this.selectingHour && !this.actions && this.save();
      if (this.hasChanged) {
        this.selectingHour = false;
        this.hasChanged = false;
      }
    },
    onDragMove(e) {
      if (!this.isDragging && e.type !== 'click') return;

      const rect = this.$refs.clock.getBoundingClientRect();
      const center = { x: rect.width / 2, y: 0 - rect.width / 2 };
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const coords = {
        y: rect.top - clientY,
        x: clientX - rect.left
      };

      const selecting = this.selectingHour ? 'hour' : 'minute';
      const value = Math.round(this.angle(center, coords) / this.degreesPerUnit);

      if (this.isAllowed(selecting, value)) {
        this[selecting] = value;
        this.hasChanged = true;
      }
    },
    angle(center, p1) {
      var p0 = {
        x: center.x,
        y: center.y + Math.sqrt(Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x) + Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))
      };
      return Math.abs(2 * Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI);
    }
  }
};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genTitle() {
      const children = [this.genTime()];

      if (this.format === 'ampm') {
        children.push(this.genAMPM());
      }

      return this.$createElement('div', {
        'class': 'picker__title'
      }, children);
    },
    genTime() {
      let hour = this.hour;

      if (this.is24hr && hour < 10) {
        hour = `0${hour}`;
      }

      return this.$createElement('div', {
        'class': 'picker--time__title'
      }, [this.$createElement('span', {
        'class': { active: this.selectingHour },
        on: {
          click: () => this.selectingHour = true
        }
      }, hour), this.$createElement('span', {
        'class': { active: !this.selectingHour },
        on: {
          click: () => this.selectingHour = false
        }
      }, `:${this.minute}`)]);
    },
    genAMPM() {
      return this.$createElement('div', [this.$createElement('span', {
        'class': { active: this.period === 'am' },
        on: { click: () => this.period = 'am' }
      }, 'AM'), this.$createElement('span', {
        'class': { active: this.period === 'pm' },
        on: { click: () => this.period = 'pm' }
      }, 'PM')]);
    }
  }
};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue__);



/* harmony default export */ exports["a"] = {
  ProgressLinear: __WEBPACK_IMPORTED_MODULE_0__ProgressLinear_vue___default.a,
  ProgressCircular: __WEBPACK_IMPORTED_MODULE_1__ProgressCircular_vue___default.a
};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_generators__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_autocomplete__ = __webpack_require__(77);




/* harmony default export */ exports["a"] = {
  name: 'select',

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_autocomplete__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_generators__["a" /* default */]],

  data() {
    return {
      content: {},
      inputValue: this.value,
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
      default: () => []
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
    returnObject: Boolean
  },

  computed: {
    classes() {
      return {
        'input-group--text-field input-group--select': true,
        'input-group--autocomplete': this.autocomplete,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips,
        'input-group--multiple': this.multiple
      };
    },
    filteredItems() {
      const items = this.autocomplete && this.searchValue ? this.filterSearch() : this.items;

      return !this.auto ? items.slice(0, this.lastItem) : items;
    },
    isDirty() {
      return this.selectedItems.length;
    },
    selectedItems() {
      if (this.inputValue === null) return [];

      return this.items.filter(i => {
        if (!this.multiple) {
          return this.getValue(i) === this.getValue(this.inputValue);
        } else {
          return this.inputValue.find(j => this.getValue(j) === this.getValue(i));
        }
      });
    }
  },

  watch: {
    inputValue(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.inputValue = val;
      this.validate();
      this.autocomplete && this.$nextTick(this.$refs.menu.updateDimensions);
    },
    isActive(val) {
      this.isBooted = true;
      this.lastItem += !val ? 20 : 0;

      if (!val) this.blur();else this.focus();
    },
    isBooted() {
      this.$nextTick(() => {
        this.content && this.content.addEventListener('scroll', this.onScroll, false);
      });
    }
  },

  mounted() {
    this.content = this.$refs.menu.$refs.content;
  },

  beforeDestroy() {
    if (this.isBooted) {
      this.content && this.content.removeEventListener('scroll', this.onScroll, false);
    }
  },

  methods: {
    blur() {
      this.$nextTick(() => this.focused = false);
    },
    focus() {
      this.focused = true;
      this.autocomplete && this.$refs.input.focus();
    },
    getText(item) {
      return item === Object(item) ? item[this.itemText] : item;
    },
    getValue(item) {
      return item === Object(item) && this.itemValue in item ? item[this.itemValue] : item;
    },
    onScroll() {
      if (!this.isActive) {
        setTimeout(() => this.content.scrollTop = 0, 50);
      } else {
        const showMoreItems = this.content.scrollHeight - (this.content.scrollTop + this.content.clientHeight) < 200;

        if (showMoreItems) {
          this.lastItem += 20;
        }
      }
    },
    selectItem(item) {
      if (!this.multiple) {
        this.inputValue = this.returnObject ? item : this.getValue(item);
      } else {
        const inputValue = this.inputValue.slice();
        const i = this.inputValue.findIndex(i => this.getValue(i) === this.getValue(item));

        i !== -1 && inputValue.splice(i, 1) || inputValue.push(item);
        this.inputValue = inputValue.map(i => this.returnObject ? i : this.getValue(i));
      }

      if (this.autocomplete) {
        this.$nextTick(() => {
          this.searchValue = null;
          this.$refs.input.focus();
        });
      }
    }
  },

  render(h) {
    return this.genInputGroup([this.genSelectionsAndSearch(), this.genMenu()], {
      ref: 'activator',
      directives: [{
        name: 'click-outside',
        value: () => this.isActive = false
      }],
      on: {
        keydown: e => this.$refs.menu.changeListIndex(e)
      }
    });
  }
};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Select__ = __webpack_require__(75);


/* harmony default export */ exports["a"] = {
  Select: __WEBPACK_IMPORTED_MODULE_0__Select__["a" /* default */]
};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data() {
    return {
      searchValue: null
    };
  },

  methods: {
    filterSearch() {
      return this.items.filter(i => {
        const text = this.getText(i);
        if (typeof text === 'undefined') return false;

        return text.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1;
      });
    }
  }
};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genMenu() {
      const data = {
        ref: 'menu',
        props: {
          auto: this.auto,
          closeOnClick: false,
          closeOnContentClick: !this.multiple,
          disabled: this.disabled,
          offsetY: this.autocomplete || this.offset,
          maxHeight: this.maxHeight,
          activator: this.$refs.activator,
          value: this.isActive
        },
        on: { input: val => this.isActive = val }
      };

      return this.$createElement('v-menu', data, [this.genList()]);
    },
    genSelectionsAndSearch() {
      let input;

      if (this.autocomplete) {
        input = [this.$createElement('input', {
          'class': 'input-group--select__autocomplete',
          domProps: { value: this.searchValue },
          on: {
            input: e => this.searchValue = e.target.value,
            keyup: e => {
              if (e.keyCode === 27) {
                this.isActive = false;
                e.target.blur();
              }
            }
          },
          ref: 'input',
          key: 'input'
        })];
      }

      const group = this.$createElement('transition-group', {
        props: {
          name: 'fade-transition'
        }
      }, this.isDirty ? this.genSelections() : []);

      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [group, input]);
    },
    genSelections() {
      const children = [];
      const chips = this.chips;
      const slots = this.$scopedSlots.selection;
      const length = this.selectedItems.length;

      this.selectedItems.forEach((item, i) => {
        if (slots) {
          children.push(this.genSlotSelection(item));
        } else if (chips) {
          children.push(this.genChipSelection(item));
        } else {
          children.push(this.genCommaSelection(item, i < length - 1));
        }
      });

      return children;
    },
    genSlotSelection(item) {
      return this.$scopedSlots.selection({ parent: this, item });
    },
    genChipSelection(item) {
      return this.$createElement('v-chip', {
        'class': 'chip--select-multi',
        props: { close: true },
        on: { input: () => this.selectItem(item) },
        nativeOn: { click: e => e.stopPropagation() },
        key: item
      }, this.getText(item));
    },
    genCommaSelection(item, comma) {
      return this.$createElement('div', {
        'class': 'input-group__selections__comma',
        key: item
      }, `${this.getText(item)}${comma ? ', ' : ''}`);
    },
    genList() {
      return this.$createElement('v-card', [this.$createElement('v-list', {
        ref: 'list'
      }, this.filteredItems.map(o => {
        if (o.header) return this.genHeader(o);
        if (o.divider) return this.genDivider(o);else return this.genTile(o);
      }))]);
    },
    genHeader(item) {
      return this.$createElement('v-subheader', {
        props: item
      }, item.header);
    },
    genDivider(item) {
      return this.$createElement('v-divider', {
        props: item
      });
    },
    genTile(item) {
      const active = this.selectedItems.indexOf(item) !== -1;
      const data = {
        nativeOn: { click: () => this.selectItem(item) },
        props: {
          avatar: item === Object(item) && 'avatar' in item,
          ripple: true,
          value: active
        }
      };

      if (this.$scopedSlots.item) {
        return this.$createElement('v-list-tile', data, [this.$scopedSlots.item({ parent: this, item })]);
      }

      return this.$createElement('v-list-tile', data, [this.genAction(item, active), this.genContent(item)]);
    },
    genAction(item, active) {
      if (!this.multiple) return null;

      const data = {
        'class': {
          'list__tile__action--select-multi': this.multiple
        },
        nativeOn: { click: () => this.selectItem(item) }
      };

      return this.$createElement('v-list-tile-action', data, [this.$createElement('v-checkbox', { props: { inputValue: active } })]);
    },
    genContent(item) {
      return this.$createElement('v-list-tile-content', [this.$createElement('v-list-tile-title', this.getText(item))]);
    }
  }
};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_helpers__ = __webpack_require__(0);



/* harmony default export */ exports["a"] = {
  name: 'slider',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

  data() {
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
      default: 1
    },
    thumbLabel: Boolean,
    value: [Number, String],
    vertical: Boolean
  },

  computed: {
    classes() {
      return {
        'input-group input-group--slider': true,
        'input-group--active': this.isActive,
        'input-group--dirty': this.inputValue > this.min,
        'input-group--disabled': this.disabled,
        'input-group--ticks': this.thumbLabel
      };
    },
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        val = val < this.min ? this.min : val > this.max ? this.max : val;
        if (Math.ceil(val) !== Math.ceil(this.lazyValue)) {
          this.inputWidth = this.calculateWidth(val);
        }

        const value = parseInt(val);
        this.lazyValue = value;

        if (value !== this.value) {
          this.$emit('input', value);
        }
      }
    },
    interval() {
      return 100 / (this.max - this.min) * this.step;
    },
    thumbContainerClasses() {
      return {
        'slider__thumb-container': true,
        'slider__thumb-container--label': this.thumbLabel
      };
    },
    thumbStyles() {
      return {
        left: `${this.inputWidth}%`
      };
    },
    tickContainerStyles() {
      return {
        transform: `translate3d(-${this.interval}%, -50%, 0)`
      };
    },
    tickStyles() {
      return {
        backgroundSize: `${this.interval}% 2px`,
        transform: `translate3d(${this.interval}%, 0, 0)`
      };
    },
    trackStyles() {
      const scaleX = this.calculateScale(1 - this.inputWidth / 100);
      const translateX = this.inputWidth < 1 && !this.thumbLabel ? `${8}px` : 0;
      return {
        transform: `scaleX(${scaleX}) translateX(${translateX})`
      };
    },
    trackFillStyles() {
      const scaleX = this.calculateScale(this.inputWidth / 100);
      const translateX = this.inputWidth > 99 && !this.thumbLabel ? `${-8}px` : 0;
      return {
        transform: `scaleX(${scaleX}) translateX(${translateX})`
      };
    }
  },

  watch: {
    value() {
      this.inputValue = this.value;
    }
  },

  mounted() {
    this.inputValue = this.value;
    this.inputWidth = this.calculateWidth(this.inputValue);
    this.app = document.querySelector('[data-app]');
  },

  methods: {
    calculateWidth(val) {
      return (val - this.min) / (this.max - this.min) * 100;
    },
    calculateScale(scale) {
      if (scale < 0.02 && !this.thumbLabel) {
        return 0;
      }

      return this.disabled ? scale - 0.015 : scale;
    },
    onMouseDown(e) {
      this.isActive = true;

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, false);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["e" /* addOnceEventListener */])(this.app, 'touchend', this.onMouseUp);
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, false);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_helpers__["e" /* addOnceEventListener */])(this.app, 'mouseup', this.onMouseUp);
      }
    },
    onMouseUp() {
      this.isActive = false;
      this.app.removeEventListener('touchmove', this.onMouseMove, false);
      this.app.removeEventListener('mousemove', this.onMouseMove, false);
    },
    onMouseMove(e) {
      const { left: offsetLeft, width: trackWidth } = this.$refs.track.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      let left = (clientX - offsetLeft) / trackWidth * 100;

      left = left < 0 ? 0 : left > 100 ? 100 : left;

      this.inputValue = this.min + left / 100 * (this.max - this.min);
    },
    sliderMove(e) {
      if (!this.isActive) {
        this.onMouseMove(e);
      }
    }
  },

  render(h) {
    const children = [];
    const trackChildren = [];
    const thumbChildren = [];

    trackChildren.push(h('div', { 'class': 'slider__track', style: this.trackStyles }));
    trackChildren.push(h('div', { 'class': 'slider__track-fill', style: this.trackFillStyles }));
    children.push(h('div', { 'class': 'slider__track__container', ref: 'track' }, trackChildren));

    if (this.step) {
      children.push(h('div', { 'class': 'slider__ticks-container', style: this.tickContainerStyles }, [h('div', { 'class': 'slider__ticks', style: this.tickStyles })]));
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

    const thumbContainer = h('div', {
      'class': this.thumbContainerClasses,
      style: this.thumbStyles,
      on: {
        touchstart: this.onMouseDown,
        mousedown: this.onMouseDown
      },
      ref: 'thumb'
    }, thumbChildren);

    children.push(thumbContainer);

    const slider = h('div', { 'class': 'slider' }, children);

    return this.genInputGroup([slider], {
      attrs: {
        role: 'slider',
        tabindex: this.tabindex
      },
      on: {
        mouseup: this.sliderMove
      },
      directives: [{
        name: 'click-outside'
      }]
    });
  }
};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slider__ = __webpack_require__(79);


/* harmony default export */ exports["a"] = {
  Slider: __WEBPACK_IMPORTED_MODULE_0__Slider__["a" /* default */]
};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__ = __webpack_require__(3);



/* harmony default export */ exports["a"] = {
  name: 'snackbar',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  data() {
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
    classes() {
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
    computedTransition() {
      return this.top ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition';
    }
  },

  watch: {
    isActive() {
      clearTimeout(this.activeTimeout);

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(() => this.isActive = false, this.timeout);
      }
    }
  },

  render(h) {
    const children = [];

    if (this.isActive) {
      children.push(h('div', {
        'class': 'snack__content'
      }, [this.$slots.default]));
    }

    return h('div', {
      'class': this.classes
    }, [h(this.computedTransition, {}, children)]);
  }
};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Snackbar__ = __webpack_require__(81);


/* harmony default export */ exports["a"] = {
  Snackbar: __WEBPACK_IMPORTED_MODULE_0__Snackbar__["a" /* default */]
};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'stepper',

  provide() {
    return {
      stepClick: this.stepClick
    };
  },

  data() {
    return {
      inputValue: null,
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
    classes() {
      return {
        'stepper': true,
        'stepper--vertical': this.vertical,
        'stepper--alt-labels': this.altLabels,
        'stepper--non-linear': this.nonLinear
      };
    }
  },

  watch: {
    inputValue(val, prev) {
      this.isReverse = Number(val) < Number(prev);
      this.steps.forEach(i => i.toggle(this.inputValue));
      this.content.forEach(i => i.toggle(this.inputValue, this.isReverse));

      this.$emit('input', this.inputValue);
    },
    value() {
      this.inputValue = this.value;
    }
  },

  mounted() {
    this.$vuetify.load(this.init);
  },

  methods: {
    init() {
      this.$children.forEach(i => {
        if (i.$options._componentTag === 'v-stepper-step') {
          this.steps.push(i);
        } else if (i.$options._componentTag === 'v-stepper-content') {
          i.isVertical = this.vertical;
          this.content.push(i);
        }
      });

      this.inputValue = this.value || this.steps[0].step || 1;
    },
    stepClick(step) {
      this.inputValue = step;
    }
  },

  render(h) {
    return h('div', {
      'class': this.classes
    }, this.$slots.default);
  }
};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'stepper-content',

  data() {
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
    classes() {
      return {
        'stepper__content': true
      };
    },
    computedTransition() {
      return this.isReverse ? 'v-tab-reverse-transition' : 'v-tab-transition';
    },
    styles() {
      if (!this.isVertical) return {};

      return {
        height: !isNaN(this.height) ? `${this.height}px` : this.height
      };
    },
    wrapperClasses() {
      return {
        'stepper__wrapper': true
      };
    }
  },

  watch: {
    isActive() {
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

  mounted() {
    this.$refs.wrapper.addEventListener('transitionend', this.onTransition, false);
  },

  beforeDestroy() {
    this.$refs.wrapper.removeEventListener('transitionend', this.onTransition, false);
  },

  methods: {
    onTransition() {
      if (!this.isActive) return;

      this.height = 'auto';
    },
    enter() {
      let scrollHeight = 0;

      // Render bug with height
      setTimeout(() => {
        scrollHeight = this.$refs.wrapper.scrollHeight;
      }, 0);

      this.height = 0;

      // Give the collapsing element time to collapse
      setTimeout(() => this.height = scrollHeight, 450);
    },
    leave() {
      this.height = this.$refs.wrapper.clientHeight;
      setTimeout(() => this.height = 0, 0);
    },
    toggle(step, reverse) {
      this.isActive = step.toString() === this.step.toString();
      this.isReverse = reverse;
    }
  },

  render(h) {
    const contentData = {
      'class': this.classes
    };
    const wrapperData = {
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

    const wrapper = h('div', wrapperData, [this.$slots.default]);
    const content = h('div', contentData, [wrapper]);

    return h(this.computedTransition, {}, [content]);
  }
};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'stepper-step',

  inject: ['stepClick'],

  data() {
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
      default: () => []
    },
    step: [Number, String]
  },

  computed: {
    classes() {
      return {
        'stepper__step': true,
        'stepper__step--active': this.isActive,
        'stepper__step--editable': this.editable,
        'stepper__step--inactive': this.isInactive,
        'stepper__step--error': this.hasError,
        'stepper__step--complete': this.complete
      };
    },
    hasError() {
      return this.rules.some(i => i() !== true);
    }
  },

  methods: {
    click() {
      if (this.editable) {
        this.stepClick(this.step);
      }
    },
    toggle(step) {
      this.isActive = step.toString() === this.step.toString();
      this.isInactive = Number(step) < Number(this.step);
    }
  },

  render(h) {
    const data = {
      'class': this.classes,
      directives: [{
        name: 'ripple',
        value: this.editable
      }],
      on: {
        click: this.click
      }
    };
    let stepContent;

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

    const step = h('span', { 'class': 'stepper__step__step' }, stepContent);
    const label = h('div', { 'class': 'stepper__label' }, [this.$slots.default]);

    return h('div', data, [step, label]);
  }
};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Stepper__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StepperStep__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StepperContent__ = __webpack_require__(84);





const StepperHeader = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('stepper__header');

/* harmony default export */ exports["a"] = {
  Stepper: __WEBPACK_IMPORTED_MODULE_1__Stepper__["a" /* default */],
  StepperContent: __WEBPACK_IMPORTED_MODULE_3__StepperContent__["a" /* default */],
  StepperHeader,
  StepperStep: __WEBPACK_IMPORTED_MODULE_2__StepperStep__["a" /* default */]
};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const Subheader = {
  functional: true,

  props: {
    inset: Boolean
  },

  render(h, { data, children, props }) {
    data.staticClass = data.staticClass ? `subheader ${data.staticClass}` : 'subheader';
    if (props.inset) data.staticClass += ' subheader--inset';

    return h('li', data, children);
  }
};

/* harmony default export */ exports["a"] = {
  Subheader
};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_head__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_body__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_foot__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_progress__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_helpers__ = __webpack_require__(0);






/* harmony default export */ exports["a"] = {
  name: 'datatable',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_head__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_foot__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_progress__["a" /* default */]],

  data() {
    return {
      all: false,
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
      default: () => []
    },
    headerText: {
      type: String,
      default: 'text'
    },
    hideActions: Boolean,
    noDataText: {
      type: String,
      default: 'No data available in table'
    },
    noResultsText: {
      type: String,
      default: 'No matching records found'
    },
    rowsPerPageItems: {
      type: Array,
      default() {
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
      default: (val, search) => {
        return val !== null && ['undefined', 'boolean'].indexOf(typeof val) === -1 && val.toString().toLowerCase().indexOf(search) !== -1;
      }
    },
    customFilter: {
      type: Function,
      default: (items, search, filter) => {
        search = search.toString().toLowerCase();
        return items.filter(i => Object.keys(i).some(j => filter(i[j], search)));
      }
    },
    customSort: {
      type: Function,
      default: (items, index, descending) => {
        return items.sort((a, b) => {
          const sortA = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_helpers__["d" /* getObjectValueByPath */])(a, index);
          const sortB = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_helpers__["d" /* getObjectValueByPath */])(b, index);

          if (descending) {
            if (!isNaN(sortA) && !isNaN(sortB)) return sortB - sortA;
            if (sortA < sortB) return 1;
            if (sortA > sortB) return -1;
            return 0;
          } else {
            if (!isNaN(sortA) && !isNaN(sortB)) return sortA - sortB;
            if (sortA < sortB) return -1;
            if (sortA > sortB) return 1;
            return 0;
          }
        });
      }
    },
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      required: true,
      default: () => []
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
    computedPagination() {
      return this.pagination || this.defaultPagination;
    },
    itemsLength() {
      return this.totalItems || this.items.length;
    },
    indeterminate() {
      return this.selectAll !== false && this.someItems && !this.everyItem;
    },
    everyItem() {
      return this.filteredItems.length && this.filteredItems.every(i => this.isSelected(i));
    },
    someItems() {
      return this.filteredItems.some(i => this.isSelected(i));
    },
    pageStart() {
      const page = this.computedPagination.rowsPerPage === Object(this.computedPagination.rowsPerPage) ? this.computedPagination.rowsPerPage.value : this.computedPagination.rowsPerPage;
      return page === -1 ? 0 : (this.computedPagination.page - 1) * page;
    },
    pageStop() {
      const page = this.computedPagination.rowsPerPage === Object(this.computedPagination.rowsPerPage) ? this.computedPagination.rowsPerPage.value : this.computedPagination.rowsPerPage;
      return page === -1 ? this.itemsLength : this.computedPagination.page * page;
    },
    filteredItems() {
      if (this.totalItems) return this.items;

      let items = this.items.slice();
      const hasSearch = typeof this.search !== 'undefined' && this.search !== null;

      if (hasSearch) {
        items = this.customFilter(items, this.search, this.filter);
      }

      items = this.customSort(items, this.computedPagination.sortBy, this.computedPagination.descending);

      return this.hideActions && !this.pagination ? items : items.slice(this.pageStart, this.pageStop);
    },
    selected() {
      const selected = {};
      this.value.forEach(i => selected[i[this.selectedKey]] = true);
      return selected;
    }
  },

  watch: {
    indeterminate(val) {
      if (val) this.all = true;
    },
    someItems(val) {
      if (!val) this.all = false;
    },
    search() {
      this.page = 1;
    },
    everyItem(val) {
      if (val) this.all = true;
    },
    itemsLength() {
      this.updatePagination({ totalItems: this.itemsLength });
    }
  },

  methods: {
    updatePagination(val) {
      if (this.pagination) return this.$emit('update:pagination', Object.assign({}, this.pagination, val));else this.defaultPagination = Object.assign({}, this.defaultPagination, val);
    },
    isSelected(item) {
      return this.selected[item[this.selectedKey]];
    },
    sort(index) {
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
    genTR(children, data = {}) {
      return this.$createElement('tr', data, children);
    },
    toggle(value) {
      const selected = Object.assign({}, this.selected);
      this.filteredItems.forEach(i => selected[i[this.selectedKey]] = value);

      this.$emit('input', this.items.filter(i => selected[i[this.selectedKey]]));
    }
  },

  created() {
    const firstSortable = this.headers.find(h => !('sortable' in h) || h.sortable);
    this.defaultPagination.sortBy = firstSortable ? firstSortable.value : null;

    this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination, { totalItems: this.itemsLength }));
  },

  render(h) {
    return h('v-table-overflow', {}, [h('table', {
      'class': {
        'datatable table': true,
        'datatable--select-all': this.selectAll !== false
      }
    }, [this.genTHead(), this.genTProgress(), this.genTBody(), this.hideActions ? null : this.genTFoot()])]);
  }
};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'edit-dialog',

  data() {
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
    isActive(val) {
      val && this.$emit('open') && this.$nextTick(this.focus);
      if (!val) {
        !this.isSaving && this.$emit('cancel');
        this.isSaving && this.$emit('close');
        this.isSaving = false;
      }
    }
  },

  methods: {
    cancel() {
      this.isActive = false;
    },
    focus() {
      const input = this.$el.querySelector('input');
      input && setTimeout(() => input.focus(), 0);
    },
    save() {
      this.isSaving = true;
      this.isActive = false;
      this.$emit('save');
    },
    genButton(fn, text) {
      return this.$createElement('v-btn', {
        props: {
          flat: true,
          primary: true,
          light: true
        },
        nativeOn: { click: fn }
      }, text);
    },
    genActions() {
      return this.$createElement('div', {
        'class': 'small-dialog__actions',
        directives: [{
          name: 'show',
          value: this.large
        }]
      }, [this.genButton(this.cancel, this.cancelText), this.genButton(this.save, this.saveText)]);
    },
    genContent() {
      return this.$createElement('div', {
        'class': 'small-dialog__content',
        on: {
          keydown: e => {
            e.keyCode === 27 && this.cancel();
            e.keyCode === 13 && this.save();
          }
        }
      }, [this.$slots.input]);
    }
  },

  render(h) {
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
        input: val => this.isActive = val
      }
    }, [h('a', {
      domProps: { href: 'javascript:;' },
      slot: 'activator'
    }, [this.$slots.default]), this.genContent(), this.genActions()]);
  }
};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DataTable__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EditDialog__ = __webpack_require__(89);




const TableOverflow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('table__overflow');

/* harmony default export */ exports["a"] = {
  DataTable: __WEBPACK_IMPORTED_MODULE_1__DataTable__["a" /* default */],
  EditDialog: __WEBPACK_IMPORTED_MODULE_2__EditDialog__["a" /* default */],
  TableOverflow
};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genTBody() {
      let children = [];

      if (!this.itemsLength) {
        children = [this.genEmptyBody(this.noDataText)];
      } else if (!this.filteredItems.length) {
        children = [this.genEmptyBody(this.noResultsText)];
      } else {
        children = this.filteredItems.map(item => {
          const props = { item };

          Object.defineProperty(props, 'selected', {
            get: () => this.selected[item[this.selectedKey]],
            set: value => {
              let selected = this.value.slice();
              value && selected.push(item) || (selected = selected.filter(i => i[this.selectedKey] !== item[this.selectedKey]));
              this.$emit('input', selected);
            }
          });

          return this.genTR(this.$scopedSlots.items(props), {
            attrs: { active: this.isSelected(item) }
          });
        });
      }

      return this.$createElement('tbody', children);
    },
    genEmptyBody(text) {
      return this.genTR([this.$createElement('td', {
        'class': 'text-xs-center',
        attrs: { colspan: '100%' }
      }, text)]);
    }
  }
};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genPrevIcon() {
      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page === 1,
          icon: true,
          flat: true
        },
        nativeOn: { click: () => this.computedPagination.page-- }
      }, [this.$createElement('v-icon', 'chevron_left')]);
    },
    genNextIcon() {
      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page * this.computedPagination.rowsPerPage >= this.itemsLength || this.pageStop < 0,
          icon: true,
          flat: true
        },
        nativeOn: { click: () => this.computedPagination.page++ }
      }, [this.$createElement('v-icon', 'chevron_right')]);
    },
    genSelect() {
      return this.$createElement('div', {
        'class': 'datatable__actions__select'
      }, [this.rowsPerPageText, this.$createElement('v-select', {
        props: {
          items: this.rowsPerPageItems,
          value: this.computedPagination.rowsPerPage,
          hideDetails: true,
          auto: true
        },
        on: { input: val => {
            this.computedPagination.rowsPerPage = val;this.computedPagination.page = 1;
          } }
      })]);
    },
    genPagination() {
      let pagination = '&mdash;';

      if (this.itemsLength) {
        const stop = this.itemsLength < this.pageStop || this.pageStop < 0 ? this.itemsLength : this.pageStop;

        pagination = this.$scopedSlots.pageText ? this.$scopedSlots.pageText({
          pageStart: this.pageStart,
          pageStop: this.itemsLength
        }) : `${this.pageStart + 1}-${stop} of ${this.itemsLength}`;
      }

      return this.$createElement('div', {
        'class': 'datatable__actions__pagination'
      }, [pagination]);
    },
    genActions() {
      return [this.$createElement('div', {
        'class': 'datatable__actions'
      }, [this.genSelect(), this.genPagination(), this.genPrevIcon(), this.genNextIcon()])];
    },
    genTFoot() {
      return this.$createElement('tfoot', [this.genTR([this.$createElement('td', {
        attrs: { colspan: '100%' }
      }, this.genActions())])]);
    }
  }
};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  methods: {
    genTHead() {
      const children = this.headers.map(o => this.genHeader(o));
      const checkbox = this.$createElement('v-checkbox', {
        props: {
          dark: this.dark,
          light: this.light,
          primary: this.selectAll === 'primary',
          secondary: this.selectAll === 'secondary',
          success: this.selectAll === 'success',
          info: this.selectAll === 'info',
          warning: this.selectAll === 'warning',
          error: this.selectAll === 'error',
          hideDetails: true,
          inputValue: this.all,
          indeterminate: this.indeterminate
        },
        on: { change: this.toggle }
      });

      this.selectAll !== false && children.unshift(this.$createElement('th', [checkbox]));

      return this.$createElement('thead', [this.genTR(children)]);
    },
    genHeader(item) {
      const array = [this.$scopedSlots.headers ? this.$scopedSlots.headers({ item }) : item[this.headerText]];

      return this.$createElement('th', ...this.genHeaderData(item, array));
    },
    genHeaderData(item, children) {
      let beingSorted = false;
      const classes = ['column'];
      const data = {};

      if ('sortable' in item && item.sortable || !('sortable' in item)) {
        data.on = { click: () => this.sort(item.value) };
        !('value' in item) && console.warn('Data table headers must have a value property that corresponds to a value in the v-model array');

        classes.push('sortable');
        const icon = this.$createElement('v-icon', 'arrow_upward');
        item.left && children.push(icon) || children.unshift(icon);

        beingSorted = this.computedPagination.sortBy === item.value;
        beingSorted && classes.push('active');
        beingSorted && this.computedPagination.descending && classes.push('desc') || classes.push('asc');
      }

      item.left && classes.push('text-xs-left') || classes.push('text-xs-right');

      data.class = classes;

      return [data, children];
    }
  }
};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data() {
    return {
      color: ''
    };
  },

  watch: {
    loading(val) {
      if (!!val) this.color = val;
    }
  },

  methods: {
    genTProgress() {
      const loader = this.$createElement('v-progress-linear', {
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

      const col = this.$createElement('th', {
        class: 'column',
        attrs: {
          colspan: '100%'
        }
      }, [loader]);

      return this.$createElement('thead', { class: 'datatable__progress' }, [this.genTR([col])]);
    }
  }
};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(7);


/* harmony default export */ exports["a"] = {
  name: 'tabs',

  provide() {
    return {
      slider: this.slider,
      tabClick: this.tabClick
    };
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */]],

  data() {
    return {
      activators: [],
      activeIndex: null,
      isMobile: false,
      reverse: false,
      target: null,
      resizeDebounce: {},
      tabsSlider: null,
      targetEl: null
    };
  },

  props: {
    centered: Boolean,
    grow: Boolean,
    icons: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1024
    },
    scrollBars: Boolean,
    value: String
  },

  computed: {
    classes() {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--scroll-bars': this.scrollBars
      };
    }
  },

  watch: {
    value() {
      this.tabClick(this.value);
    },
    activeIndex() {
      if (this.isBooted) this.overflow = true;

      const activators = this.$slots.activators;

      if (!activators || !activators.length || activators.length && !activators[0].componentInstance.$children) return;

      activators[0].componentInstance.$children.filter(i => i.$options._componentTag === 'v-tabs-item').forEach(i => i.toggle(this.target));

      this.$refs.content && this.$refs.content.$children.forEach(i => i.toggle(this.target, this.reverse, this.isBooted));
      this.$emit('input', this.target);
      this.isBooted = true;
    }
  },

  mounted() {
    this.$vuetify.load(() => {
      window.addEventListener('resize', this.resize, { passive: true });

      const activators = this.$slots.activators;

      if (!activators || !activators.length || !activators[0].componentInstance.$children) return;

      const bar = activators[0].componentInstance.$children;
      // // This is a workaround to detect if link is active
      // // when being used as a router or nuxt link
      const i = bar.findIndex(t => {
        return t.$el.firstChild.classList.contains('tabs__item--active');
      });

      const tab = this.value || (bar[i !== -1 ? i : 0] || {}).action;

      tab && this.tabClick(tab) && this.resize();
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize, { passive: true });
  },

  methods: {
    resize() {
      clearTimeout(this.resizeDebounce);

      this.resizeDebounce = setTimeout(() => {
        this.isMobile = window.innerWidth < this.mobileBreakPoint;
        this.slider();
      }, 50);
    },
    slider(el) {
      this.tabsSlider = this.tabsSlider || this.$el.querySelector('.tabs__slider');

      if (!this.tabsSlider) return;

      this.targetEl = el || this.targetEl;

      if (!this.targetEl) return;

      // Gives DOM time to paint when
      // processing slider for
      // dynamic tabs
      this.$nextTick(() => {
        // #684 Calculate width as %
        const width = this.targetEl.scrollWidth / this.$el.clientWidth * 100;

        this.tabsSlider.style.width = `${width}%`;
        this.tabsSlider.style.left = `${this.targetEl.offsetLeft}px`;
      });
    },
    tabClick(target) {
      this.target = target;

      if (!this.$refs.content) {
        this.activeIndex = target;
        return;
      }

      this.$nextTick(() => {
        const nextIndex = this.$refs.content.$children.findIndex(i => i.id === this.target);
        this.reverse = nextIndex < this.activeIndex;
        this.activeIndex = nextIndex;
      });
    }
  },

  render(h) {
    const content = [];
    const slot = [];
    const iter = this.$slots.default || [];

    iter.forEach(c => {
      if (!c.componentOptions) slot.push(c);else if (c.componentOptions.tag === 'v-tabs-content') content.push(c);else slot.push(c);
    });

    const tabs = content.length ? h('v-tabs-items', {
      ref: 'content'
    }, content) : null;

    return h('div', {
      'class': this.classes
    }, [slot, this.$slots.activators, tabs]);
  }
};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'tabs-bar',

  props: {
    mobile: Boolean
  },

  computed: {
    classes() {
      return {
        'tabs__bar': true,
        'tabs__bar--mobile': this.mobile
      };
    }
  },

  methods: {
    scrollLeft() {
      this.$refs.container.scrollLeft -= 75;
    },
    scrollRight() {
      this.$refs.container.scrollLeft += 75;
    }
  },

  render(h) {
    const container = h('ul', {
      'class': 'tabs__container',
      ref: 'container'
    }, this.$slots.default);

    const left = h('v-icon', {
      props: {
        left: true
      },
      directives: [{
        name: 'ripple',
        value: ''
      }],
      on: {
        click: this.scrollLeft
      }
    }, 'chevron_left');

    const right = h('v-icon', {
      props: {
        right: true
      },
      directives: [{
        name: 'ripple',
        value: ''
      }],
      on: {
        click: this.scrollRight
      }
    }, 'chevron_right');

    return h('div', {
      'class': this.classes
    }, [container, left, right]);
  }
};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  name: 'tabs-content',

  data() {
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
    computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    }
  },

  methods: {
    toggle(target, reverse, showTransition) {
      this.$el.style.transition = !showTransition ? 'none' : null;
      this.reverse = reverse;
      this.isActive = this.id === target;
    }
  },

  render(h) {
    return h(this.computedTransition, {}, [h('div', {
      'class': 'tabs__content',
      domProps: { id: this.id },
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, [this.$slots.default])]);
  }
};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(4);


/* harmony default export */ exports["a"] = {
  name: 'tabs-item',

  inject: ['slider', 'tabClick'],

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_route_link__["a" /* default */]],

  data() {
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
    classes() {
      return {
        'tabs__item': true,
        'tabs__item--active': !this.router && this.isActive,
        'tabs__item--disabled': this.disabled
      };
    },
    action() {
      const to = this.to || this.href;

      if (to === Object(to)) return this._uid;

      return to.replace('#', '');
    }
  },

  watch: {
    '$route'() {
      this.router && this.callSlider();
    }
  },

  mounted() {
    this.callSlider();
  },

  methods: {
    callSlider() {
      setTimeout(() => {
        this.$el.firstChild.classList.contains('tabs__item--active') && this.slider(this.$el);
      }, 0);
    },
    click(e) {
      e.preventDefault();

      !this.router && this.tabClick(this.action) || this.callSlider();
    },

    toggle(action) {
      this.isActive = this.action === action;
      this.$nextTick(() => {
        this.isActive && this.slider(this.$el);
      });
    }
  },

  render(h) {
    const { tag, data } = this.generateRouteLink();

    return h('li', {
      'class': 'tabs__li'
    }, [h(tag, data, [this.$slots.default])]);
  }
};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Tabs__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TabsItem__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TabsContent__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TabsBar__ = __webpack_require__(96);






const TabsSlider = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createSimpleFunctional */])('tabs__slider', 'li');

const TabsItems = {
  name: 'tabs-items',

  render(h) {
    return h('div', { 'class': { 'tabs__items': true } }, [this.$slots.default]);
  }
};

/* harmony default export */ exports["a"] = {
  TabsItem: __WEBPACK_IMPORTED_MODULE_2__TabsItem__["a" /* default */],
  TabsItems,
  Tabs: __WEBPACK_IMPORTED_MODULE_1__Tabs__["a" /* default */],
  TabsContent: __WEBPACK_IMPORTED_MODULE_3__TabsContent__["a" /* default */],
  TabsBar: __WEBPACK_IMPORTED_MODULE_4__TabsBar__["a" /* default */],
  TabsSlider
};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_schemable__ = __webpack_require__(5);


/* harmony default export */ exports["a"] = {
  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_schemable__["a" /* default */]],

  props: {
    fixed: Boolean
  },

  render(h, { data, children, props }) {
    data.staticClass = data.staticClass ? `toolbar ${data.staticClass}` : 'toolbar';
    if (props.fixed) data.staticClass += ' toolbar--fixed';
    if (props.dark) data.staticClass += ' dark--text dark--bg';
    if (props.light) data.staticClass += ' light--text light--bg';

    return h('nav', data, children);
  }
};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_route_link__ = __webpack_require__(4);


/* harmony default export */ exports["a"] = {
  name: 'toolbar-item',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_route_link__["a" /* default */]],

  props: {
    activeClass: {
      type: String,
      default: 'toolbar__item--active'
    }
  },

  computed: {
    classes() {
      return {
        'toolbar__item': true,
        'toolbar__item--disabled': this.disabled
      };
    }
  },

  render(h) {
    const { tag, data } = this.generateRouteLink();

    return h('li', {}, [h(tag, data, [this.$slots.default])]);
  }
};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Toolbar__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ToolbarItem__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_helpers__ = __webpack_require__(0);





const ToolbarLogo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["c" /* createSimpleFunctional */])('toolbar__logo');
const ToolbarTitle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["c" /* createSimpleFunctional */])('toolbar__title');
const ToolbarSub = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["c" /* createSimpleFunctional */])('toolbar__sub');
const ToolbarItems = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_helpers__["c" /* createSimpleFunctional */])('toolbar__items', 'ul');
const ToolbarSideIcon = {
  functional: true,

  props: {
    dark: Boolean,
    light: Boolean
  },

  render(h, { data, props, children }) {
    data.staticClass = data.staticClass ? `toolbar__side-icon ${data.staticClass}` : 'toolbar__side-icon';
    data.props = Object.assign({
      icon: true
    }, props);

    return h('v-btn', data, [h('v-icon', 'menu')]);
  }
};

/* harmony default export */ exports["a"] = {
  Toolbar: __WEBPACK_IMPORTED_MODULE_0__Toolbar__["a" /* default */],
  ToolbarItem: __WEBPACK_IMPORTED_MODULE_1__ToolbarItem__["a" /* default */],
  ToolbarItems,
  ToolbarLogo,
  ToolbarTitle,
  ToolbarSideIcon,
  ToolbarSub
};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


const SlideXTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('slide-x-transition');
const SlideXReverseTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('slide-x-reverse-transition');
const SlideYTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('slide-y-transition');
const SlideYReverseTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('slide-y-reverse-transition');
const ScaleTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('scale-transition');
const TabTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('tab-transition');
const TabReverseTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('tab-reverse-transition');
const CarouselTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('carousel-transition');
const CarouselReverseTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('carousel-reverse-transition');
const DialogTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('dialog-transition');
const DialogBottomTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('dialog-bottom-transition');
const FadeTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('fade-transition');
const MenuTransition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createSimpleTransition */])('menu-transition');

/* harmony default export */ exports["a"] = {
  SlideXTransition,
  SlideXReverseTransition,
  SlideYTransition,
  SlideYReverseTransition,
  ScaleTransition,
  FadeTransition,
  TabTransition,
  TabReverseTransition,
  DialogTransition,
  DialogBottomTransition,
  MenuTransition,
  CarouselTransition,
  CarouselReverseTransition
};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


function directive(el, binding) {
  const config = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* directiveConfig */])(binding, {
    icon: false,
    left: false,
    overlap: false
  });

  if (config.overlap) el.classList.add('badge--overlap');
  if (config.icon) el.classList.add('badge--icon');
  if (config.left) el.classList.add('badge--left');

  el.dataset.badge = config.value;
  el.classList.add('badge');
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: el => {
    el.removeAttribute('data-badge');
    el.classList.remove('badge');
  }
};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function directive(e, el, binding, v) {
  let cb = () => true;

  if (binding.value) cb = binding.value;

  if (v.context.isActive && e && e.target && e.target !== el && !el.contains(e.target) && cb(e)) {
    v.context.isActive = false;
  }
}

/* harmony default export */ exports["a"] = {
  bind(el, binding, v) {
    v.context.$vuetify.load(() => {
      const outside = document.querySelector('[data-app]') || document.body;
      const click = e => directive(e, el, binding, v);
      outside.addEventListener('click', click, false);
      el._clickOutside = click;
    });
  },

  unbind(el) {
    const outside = document.querySelector('[data-app]') || document.body;
    outside.removeEventListener('click', el._clickOutside, false);
  }
};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function style(el, value) {
  ['transform', 'webkitTransform'].forEach(i => {
    el.style[i] = value;
  });
}

const ripple = {
  show: (e, el, { value = {} }) => {
    var container = document.createElement('span');
    var animation = document.createElement('span');

    container.appendChild(animation);
    container.className = 'ripple__container';

    if (value.class) {
      container.className += ` ${value.class}`;
    }

    const size = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight;
    animation.className = 'ripple__animation';
    animation.style.width = `${size * (value.center ? 1 : 2)}px`;
    animation.style.height = animation.style.width;

    el.appendChild(container);

    const offset = el.getBoundingClientRect();
    const x = value.center ? '50%' : `${e.clientX - offset.left}px`;
    const y = value.center ? '50%' : `${e.clientY - offset.top}px`;

    animation.classList.add('ripple__animation--enter');
    animation.classList.add('ripple__animation--visible');
    style(animation, `translate(-50%, -50%) translate(${x}, ${y}) scale3d(0.01,0.01,0.01)`);
    animation.dataset.activated = Date.now();

    setTimeout(() => {
      animation.classList.remove('ripple__animation--enter');
      style(animation, `translate(-50%, -50%) translate(${x}, ${y})  scale3d(0.99,0.99,0.99)`);
    }, 0);
  },

  hide: el => {
    const ripples = el.getElementsByClassName('ripple__animation');

    if (ripples.length === 0) return;
    const animation = ripples[ripples.length - 1];
    const diff = Date.now() - Number(animation.dataset.activated);
    let delay = 400 - diff;

    delay = delay < 0 ? 0 : delay;

    setTimeout(() => {
      animation.classList.remove('ripple__animation--visible');

      setTimeout(() => {
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
    el.addEventListener('touchend', () => ripple.hide(el), false);
    el.addEventListener('touchcancel', () => ripple.hide(el), false);
  }

  el.addEventListener('mousedown', e => ripple.show(e, el, binding), false);
  el.addEventListener('mouseup', () => ripple.hide(el), false);
  el.addEventListener('mouseleave', () => ripple.hide(el), false);
}

function unbind(el, binding) {
  el.removeEventListener('touchstart', e => ripple.show(e, el, binding), false);
  el.removeEventListener('mousedown', e => ripple.show(e, el, binding), false);
  el.removeEventListener('touchend', () => ripple.hide(el), false);
  el.removeEventListener('touchcancel', () => ripple.hide(el), false);
  el.removeEventListener('mouseup', () => ripple.hide(el), false);
  el.removeEventListener('mouseleave', () => ripple.hide(el), false);
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  unbind: unbind
};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(0);


function directive(el, binding) {
  const config = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* directiveConfig */])(binding, { top: true });

  unbind(el, binding, config);

  el.dataset.tooltip = config.html;
  el.dataset['tooltipLocation'] = config.value;
}

function unbind(el) {
  el.removeAttribute('data-tooltip');
  el.removeAttribute('data-tooltip-location');
}

/* harmony default export */ exports["a"] = {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  data() {
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
    normalizedHeight() {
      return Number(this.height.toString().replace(/(^[0-9]*$)/, '$1'));
    },

    imgHeight() {
      return this.objHeight();
    }
  },

  mounted() {
    this.$vuetify.load(this.init);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.translate, false);
    document.removeEventListener('resize', this.translate, false);
  },

  methods: {
    listeners() {
      window.addEventListener('scroll', this.translate, false);
      document.addEventListener('resize', this.translate, false);
    },

    translate() {
      this.calcDimensions();

      this.percentScrolled = (this.windowBottom - this.elOffsetTop) / (this.normalizedHeight + this.windowHeight);

      this.parallax = Math.round(this.parallaxDist * this.percentScrolled);

      if (this.translated) {
        this.translated();
      }
    },

    calcDimensions() {
      const offset = this.$el.getBoundingClientRect();

      this.scrollTop = window.pageYOffset;
      this.parallaxDist = this.imgHeight - this.normalizedHeight;
      this.elOffsetTop = offset.top + this.scrollTop;
      this.windowHeight = window.innerHeight;
      this.windowBottom = this.scrollTop + this.windowHeight;
    }
  }
};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//
//
//


/* harmony default export */ exports["default"] = {
  name: 'button-dropdown',

  data() {
    return {
      isActive: false,
      inputValue: this.value,
      editableValue: null
    };
  },

  props: {
    editable: Boolean,
    options: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: [String, Number],
      default: 200
    },
    overflow: Boolean,
    label: {
      type: String,
      default: 'Select'
    },
    segmented: Boolean,
    value: {
      required: false
    }
  },

  computed: {
    classes() {
      return {
        'btn-dropdown--editable': this.editable,
        'btn-dropdown--overflow': this.overflow || this.segmented || this.editable,
        'btn-dropdown--segmented': this.segmented
      };
    },

    computedItems() {
      if (this.editable) {
        return this.options;
      }

      if (this.index !== -1 && (this.overflow || this.segmented)) {
        return this.options.filter((obj, i) => i !== this.index);
      }

      return this.options;
    },

    index() {
      return this.options.findIndex(i => i === this.inputValue);
    }
  },

  mounted() {
    if (this.inputValue) {
      this.editableValue = this.inputValue.text;
    }
  },

  watch: {
    inputValue() {
      this.$emit('input', this.inputValue);
    },

    value() {
      this.inputValue = typeof this.value === 'string' ? { text: this.value } : this.value;
      this.editableValue = this.inputValue.text;
    }
  },

  methods: {
    toggle(active) {
      this.isActive = active;
    },

    updateValue(e, obj) {
      if (e.keyCode === 13) {
        this.$refs.input.$el.querySelector('input').blur();
        this.isActive = false;
      }

      if (typeof obj === 'string') {
        obj = { text: obj };
      }

      this.inputValue = obj;
      this.editableValue = obj.text || obj.action;
      this.isActive = false;
    }
  }
};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

/* harmony default export */ exports["default"] = {
  name: 'button-toggle',

  data() {
    return {
      inputValue: this.value
    };
  },

  props: {
    options: {
      type: Array,
      default: () => []
    },

    multiple: Boolean,

    value: {
      required: false
    }
  },

  computed: {
    classes() {
      return {
        'btn-toggle--selected': this.inputValue && !this.multiple || this.inputValue && this.inputValue.length > 0
      };
    }
  },

  watch: {
    value() {
      this.inputValue = this.value;
    }
  },

  methods: {
    isSelected(item) {
      if (!this.multiple) {
        return this.inputValue === item.value;
      }

      return this.inputValue.includes(item.value);
    },

    updateValue(item) {
      if (!this.multiple) {
        return this.$emit('input', this.inputValue === item.value ? null : item.value);
      }

      const items = this.inputValue.slice();

      const i = items.indexOf(item.value);
      if (i !== -1) {
        items.splice(i, 1);
      } else {
        items.push(item.value);
      }

      this.$emit('input', items);
    }
  }
};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(7);
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



/* harmony default export */ exports["default"] = {
  name: 'carousel',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */]],

  data() {
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
    defaultState() {
      return {
        current: null,
        reverse: false
      };
    }
  },

  watch: {
    current() {
      // Evaluate items when current changes to account for
      // dynamic changing of children
      this.items = this.$children.filter(i => {
        return i.$el.classList && i.$el.classList.contains('carousel__item');
      });

      this.items.forEach(i => i.open(this.items[this.current]._uid, this.reverse));

      !this.isBooted && this.cycle && this.restartInterval();
      this.isBooted = true;
    },
    cycle(val) {
      val && this.restartInterval() || clearInterval(this.slideInterval);
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    restartInterval() {
      clearInterval(this.slideInterval);
      this.$nextTick(this.startInterval);
    },
    init() {
      this.current = 0;
    },
    next() {
      this.reverse = false;

      if (this.current + 1 === this.items.length) {
        return this.current = 0;
      }

      this.current++;
    },
    prev() {
      this.reverse = true;

      if (this.current - 1 < 0) {
        return this.current = this.items.length - 1;
      }

      this.current--;
    },
    select(index) {
      this.reverse = index < this.current;
      this.current = index;
    },
    startInterval() {
      this.slideInterval = setInterval(this.next, this.interval);
    }
  }
};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

/* harmony default export */ exports["default"] = {
  name: 'carousel-item',

  data() {
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
    computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    },

    styles() {
      return {
        backgroundImage: `url(${this.src})`
      };
    }
  },

  methods: {
    open(id, reverse) {
      this.active = this._uid === id;
      this.reverse = reverse;
    }
  }
};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__ = __webpack_require__(9);
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




/* harmony default export */ exports["default"] = {
  name: 'expansion-panel-content',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_expand_transition__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  data() {
    return {
      height: 'auto'
    };
  },

  props: {
    ripple: Boolean
  },

  computed: {
    classes() {
      return {
        'expansion-panel__header--active': this.isActive
      };
    }
  },

  mounted() {
    // TODO: This is temporary, replace
    if (this.value) {
      this.$vuetify.load(() => {
        setTimeout(() => {
          this.$refs.body.style.height = `${this.$refs.body.clientHeight}px`;
        }, 1000);
      });
    }
  },

  methods: {
    closeConditional(e) {
      return this.$parent.$el.contains(e.target) && !this.$parent.expand && !this.$el.contains(e.target);
    },

    toggle() {
      this.isActive = !this.isActive;
    }
  }
};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

/* harmony default export */ exports["default"] = {
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
    value() {
      this.init();
    }
  },

  computed: {
    classes() {
      return {
        'pagination--circle': this.circle,
        'pagination--disabled': this.disabled
      };
    },

    items() {
      if (this.length <= 5) {
        return this.range(1, this.length);
      }

      let min = this.value - 3;
      min = min > 0 ? min : 1;

      let max = min + 6;
      max = max <= this.length ? max : this.length;

      if (max === this.length) {
        min = this.length - 6;
      }

      const range = this.range(min, max);

      if (this.value >= 4 && this.length > 6) {
        range.splice(0, 2, 1, '...');
      }

      if (this.value + 3 < this.length && this.length > 6) {
        range.splice(range.length - 2, 2, '...', this.length);
      }

      return range;
    }
  },

  mounted() {
    this.$vuetify.load.call(this, this.init);
  },

  methods: {
    init() {
      this.selected = null;

      // Change this
      setTimeout(() => this.selected = this.value, 100);
    },

    range(from, to) {
      const range = [];

      from = from > 0 ? from : 1;

      for (let i = from; i <= to; i++) {
        range.push(i);
      }

      return range;
    }
  }
};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_translatable__ = __webpack_require__(108);
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



/* harmony default export */ exports["default"] = {
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
    styles() {
      return {
        display: 'block',
        transform: `translate3d(-50%, ${this.parallax}px, 0)`
      };
    }
  },

  methods: {
    init() {
      if (this.$refs.img.complete) {
        this.translate();
        this.listeners();
      }

      this.$refs.img.addEventListener('load', () => {
        this.translate();
        this.listeners();
      }, false);
    },

    objHeight() {
      return this.$refs.img.naturalHeight;
    },

    elOffsetTop() {
      return this.$el.offsetTop;
    }
  }
};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

/* harmony default export */ exports["default"] = {
  name: 'progress-circular',

  props: {
    button: Boolean,

    fill: {
      type: String,
      default: () => _this.indeterminate ? 'none' : 'transparent'
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
    calculatedSize() {
      let size = Number(this.size);

      if (this.button) {
        size += 8;
      }

      return size;
    },

    circumference() {
      return 2 * Math.PI * this.radius;
    },

    classes() {
      return {
        'progress-circular--indeterminate': this.indeterminate,
        'progress-circular--button': this.button
      };
    },

    cxy() {
      return this.indeterminate && !this.button ? 50 : this.calculatedSize / 2;
    },

    normalizedValue() {
      if (this.value < 0) {
        return 0;
      }

      if (this.value > 100) {
        return 100;
      }

      return this.value;
    },

    radius() {
      return this.indeterminate && !this.button ? 20 : (this.calculatedSize - this.width) / 2;
    },

    strokeDashArray() {
      return Math.round(this.circumference * 1000) / 1000;
    },

    strokeDashOffset() {
      return (100 - this.normalizedValue) / 100 * this.circumference + 'px';
    },

    styles() {
      return {
        height: `${this.calculatedSize}px`,
        width: `${this.calculatedSize}px`
      };
    },

    svgSize() {
      return this.indeterminate ? false : this.calculatedSize;
    },

    svgStyles() {
      return {
        transform: `rotate(${this.rotate}deg)`
      };
    },

    viewBox() {
      return this.indeterminate ? '25 25 50 50' : false;
    }
  }
};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

/* harmony default export */ exports["default"] = {
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
    }
  },

  computed: {
    classes() {
      return {
        'progress-linear--query': this.query,
        'progress-linear--secondary': this.secondary,
        'progress-linear--success': this.success,
        'progress-linear--info': this.info,
        'progress-linear--warning': this.warning,
        'progress-linear--error': this.error
      };
    },

    styles() {
      const styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      if (this.buffer) {
        styles.width = `${this.bufferValue}%`;
      }

      return styles;
    },

    bufferStyles() {
      const styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      return styles;
    }
  }
};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(109),
  /* template */
  __webpack_require__(127),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(110),
  /* template */
  __webpack_require__(135),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(111),
  /* template */
  __webpack_require__(130),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(112),
  /* template */
  __webpack_require__(129),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(113),
  /* template */
  __webpack_require__(131),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(114),
  /* template */
  __webpack_require__(132),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(115),
  /* template */
  __webpack_require__(133),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(116),
  /* template */
  __webpack_require__(128),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(117),
  /* template */
  __webpack_require__(134),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ },
/* 127 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "btn-dropdown",
    class: _vm.classes
  }, [_c('v-menu', {
    attrs: {
      "auto": !_vm.overflow && !_vm.segmented && !_vm.editable,
      "right": !_vm.overflow && !_vm.segmented && !_vm.editable,
      "max-height": _vm.maxHeight,
      "offset-y": _vm.overflow || _vm.segmented || _vm.editable,
      "close-on-click": _vm.isActive,
      "open-on-click": !_vm.isActive,
      "bottom": "bottom"
    },
    model: {
      value: (_vm.isActive),
      callback: function($$v) {
        _vm.isActive = $$v
      },
      expression: "isActive"
    }
  }, [_c('v-text-field', {
    ref: "input",
    attrs: {
      "type": _vm.editable ? 'text' : 'button',
      "label": _vm.label,
      "light": _vm.light || !_vm.dark,
      "dark": !_vm.light && _vm.dark,
      "single-line": "single-line",
      "append-icon": "arrow_drop_down"
    },
    on: {
      "focus": function($event) {
        _vm.isActive = arguments[0]
      }
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        (function (e) { return _vm.updateValue(e, _vm.editableValue); })($event)
      }
    },
    slot: "activator",
    model: {
      value: (_vm.editableValue),
      callback: function($$v) {
        _vm.editableValue = $$v
      },
      expression: "editableValue"
    }
  }), _c('v-list', _vm._l((_vm.options), function(option, index) {
    return _c('v-list-tile', {
      key: option,
      class: {
        'list__tile--active': _vm.inputValue === option
      },
      nativeOn: {
        "click": function($event) {
          (function (e) { return _vm.updateValue(e, option); })($event)
        }
      }
    }, [(option.action) ? _c('v-list-tile-action', [_c('v-icon', {
      attrs: {
        "light": _vm.light || !_vm.dark,
        "dark": !_vm.light && _vm.dark
      }
    }, [_vm._v(_vm._s(option.action))])], 1) : _vm._e(), (option.text) ? _c('v-list-tile-content', [_c('v-list-tile-title', [_vm._v(_vm._s(option.text))])], 1) : _vm._e()], 1)
  }))], 1)], 1)
},staticRenderFns: []}

/***/ },
/* 128 */
/***/ function(module, exports) {

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

/***/ },
/* 129 */
/***/ function(module, exports) {

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

/***/ },
/* 130 */
/***/ function(module, exports) {

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

/***/ },
/* 131 */
/***/ function(module, exports) {

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

/***/ },
/* 132 */
/***/ function(module, exports) {

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

/***/ },
/* 133 */
/***/ function(module, exports) {

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

/***/ },
/* 134 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "progress-linear",
    class: _vm.classes,
    style: ({
      height: _vm.height + 'px'
    })
  }, [_c('div', {
    staticClass: "progress-linear__bar",
    style: (_vm.styles)
  }, [_c('v-fade-transition', [(_vm.indeterminate) ? _c('div', {
    class: ['progress-linear__bar__indeterminate', {
      'progress-linear__bar__indeterminate--active': _vm.active
    }]
  }) : _vm._e()]), _c('v-slide-x-transition', [(!_vm.indeterminate) ? _c('div', {
    staticClass: "progress-linear__bar__determinate",
    style: ({
      width: _vm.value + '%'
    })
  }) : _vm._e()])], 1)])
},staticRenderFns: []}

/***/ },
/* 135 */
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "btn-toggle",
    class: _vm.classes
  }, _vm._l((_vm.options), function(option, index) {
    return _c('v-btn', {
      attrs: {
        "data-selected": _vm.isSelected(option),
        "data-index": index,
        "data-only-child": _vm.isSelected(option) && (!_vm.multiple || _vm.inputValue.length === 1),
        "flat": "flat"
      },
      nativeOn: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.updateValue(option)
        }
      }
    }, [(option.text) ? _c('span', {
      domProps: {
        "textContent": _vm._s(option.text)
      }
    }) : _vm._e(), (option.icon) ? _c('v-icon', [_vm._v(_vm._s(option.icon))]) : _vm._e()], 1)
  }))
},staticRenderFns: []}

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_index__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_load__ = __webpack_require__(14);
__webpack_require__(15);





function plugin(Vue) {
  Object.keys(__WEBPACK_IMPORTED_MODULE_0__components_index__["a" /* default */]).forEach(key => {
    Vue.component(`V${key}`, __WEBPACK_IMPORTED_MODULE_0__components_index__["a" /* default */][key]);
  });

  Object.keys(__WEBPACK_IMPORTED_MODULE_1__directives_index__["a" /* default */]).forEach(key => {
    Vue.directive(key, __WEBPACK_IMPORTED_MODULE_1__directives_index__["a" /* default */][key]);
  });

  Vue.prototype.$vuetify = {
    load: __WEBPACK_IMPORTED_MODULE_2__util_load__["a" /* default */]
  };
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

/* harmony default export */ exports["default"] = plugin;

/***/ }
/******/ ]);
});
//# sourceMappingURL=vuetify.js.map