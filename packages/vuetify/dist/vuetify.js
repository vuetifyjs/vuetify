(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["Vuetify"] = factory(require("vue"));
	else
		root["Vuetify"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_vue__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/VAlert/VAlert.ts":
/*!*****************************************!*\
  !*** ./src/components/VAlert/VAlert.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_alerts_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_alerts.styl */ "./src/stylus/components/_alerts.styl");
/* harmony import */ var _stylus_components_alerts_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_alerts_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _mixins_transitionable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/transitionable */ "./src/mixins/transitionable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
// Styles

// Components

// Mixins




/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_5__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_transitionable__WEBPACK_IMPORTED_MODULE_4__["default"]).extend({
    name: 'v-alert',
    props: {
        dismissible: Boolean,
        icon: String,
        outline: Boolean,
        type: {
            type: String,
            validator: function validator(val) {
                return ['info', 'error', 'success', 'warning'].includes(val);
            }
        }
    },
    computed: {
        computedColor: function computedColor() {
            return this.type && !this.color ? this.type : this.color || 'error';
        },
        computedIcon: function computedIcon() {
            if (this.icon || !this.type) return this.icon;
            switch (this.type) {
                case 'info':
                    return '$vuetify.icons.info';
                case 'error':
                    return '$vuetify.icons.error';
                case 'success':
                    return '$vuetify.icons.success';
                case 'warning':
                    return '$vuetify.icons.warning';
            }
        }
    },
    methods: {
        genIcon: function genIcon() {
            if (!this.computedIcon) return null;
            return this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
                'class': 'v-alert__icon'
            }, this.computedIcon);
        },
        genDismissible: function genDismissible() {
            var _this = this;
            if (!this.dismissible) return null;
            return this.$createElement('a', {
                'class': 'v-alert__dismissible',
                on: { click: function click() {
                        _this.isActive = false;
                    } }
            }, [this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
                props: {
                    right: true
                }
            }, '$vuetify.icons.cancel')]);
        }
    },
    render: function render(h) {
        var children = [this.genIcon(), h('div', this.$slots.default), this.genDismissible()];
        var setColor = this.outline ? this.setTextColor : this.setBackgroundColor;
        var alert = h('div', setColor(this.computedColor, {
            staticClass: 'v-alert',
            'class': {
                'v-alert--outline': this.outline
            },
            directives: [{
                name: 'show',
                value: this.isActive
            }],
            on: this.$listeners
        }), children);
        if (!this.transition) return alert;
        return h('transition', {
            props: {
                name: this.transition,
                origin: this.origin,
                mode: this.mode
            }
        }, [alert]);
    }
}));

/***/ }),

/***/ "./src/components/VAlert/index.ts":
/*!****************************************!*\
  !*** ./src/components/VAlert/index.ts ***!
  \****************************************/
/*! exports provided: VAlert, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VAlert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VAlert */ "./src/components/VAlert/VAlert.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAlert", function() { return _VAlert__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VAlert__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VApp/VApp.js":
/*!*************************************!*\
  !*** ./src/components/VApp/VApp.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_app_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_app.styl */ "./src/stylus/components/_app.styl");
/* harmony import */ var _stylus_components_app_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_app_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_app_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/app-theme */ "./src/components/VApp/mixins/app-theme.js");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _directives_resize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/resize */ "./src/directives/resize.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// Component level mixins


// Directives

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-app',
    directives: {
        Resize: _directives_resize__WEBPACK_IMPORTED_MODULE_3__["default"]
    },
    mixins: [_mixins_app_theme__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        id: {
            type: String,
            default: 'app'
        },
        dark: Boolean
    },
    computed: {
        classes: function classes() {
            return __assign({ 'application--is-rtl': this.$vuetify.rtl }, this.themeClasses);
        }
    },
    watch: {
        dark: function dark() {
            this.$vuetify.dark = this.dark;
        }
    },
    mounted: function mounted() {
        this.$vuetify.dark = this.dark;
    },
    render: function render(h) {
        var data = {
            staticClass: 'application',
            'class': this.classes,
            attrs: { 'data-app': true },
            domProps: { id: this.id }
        };
        var wrapper = h('div', { staticClass: 'application--wrap' }, this.$slots.default);
        return h('div', data, [wrapper]);
    }
});

/***/ }),

/***/ "./src/components/VApp/index.js":
/*!**************************************!*\
  !*** ./src/components/VApp/index.js ***!
  \**************************************/
/*! exports provided: VApp, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VApp */ "./src/components/VApp/VApp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VApp", function() { return _VApp__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VApp__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VApp/mixins/app-theme.js":
/*!*************************************************!*\
  !*** ./src/components/VApp/mixins/app-theme.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/theme */ "./src/util/theme.ts");

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            style: null
        };
    },
    computed: {
        parsedTheme: function parsedTheme() {
            return _util_theme__WEBPACK_IMPORTED_MODULE_0__["parse"](this.$vuetify.theme);
        },
        /** @return string */
        generatedStyles: function generatedStyles() {
            var theme = this.parsedTheme;
            var css;
            if (this.$vuetify.options.themeCache != null) {
                css = this.$vuetify.options.themeCache.get(theme);
                if (css != null) return css;
            }
            css = _util_theme__WEBPACK_IMPORTED_MODULE_0__["genStyles"](theme, this.$vuetify.options.customProperties);
            if (this.$vuetify.options.minifyTheme != null) {
                css = this.$vuetify.options.minifyTheme(css);
            }
            if (this.$vuetify.options.themeCache != null) {
                this.$vuetify.options.themeCache.set(theme, css);
            }
            return css;
        },
        vueMeta: function vueMeta() {
            if (this.$vuetify.theme === false) return {};
            var options = {
                cssText: this.generatedStyles,
                id: 'vuetify-theme-stylesheet',
                type: 'text/css'
            };
            if (this.$vuetify.options.cspNonce) {
                options.nonce = this.$vuetify.options.cspNonce;
            }
            return {
                style: [options]
            };
        }
    },
    // Regular vue-meta
    metaInfo: function metaInfo() {
        return this.vueMeta;
    },
    // Nuxt
    head: function head() {
        return this.vueMeta;
    },
    watch: {
        generatedStyles: function generatedStyles() {
            !this.meta && this.applyTheme();
        }
    },
    created: function created() {
        if (this.$vuetify.theme === false) return;
        if (this.$meta) {
            // Vue-meta
            // Handled by metaInfo()/nuxt()
        } else if (typeof document === 'undefined' && this.$ssrContext) {
            // SSR
            var nonce = this.$vuetify.options.cspNonce ? " nonce=\"" + this.$vuetify.options.cspNonce + "\"" : '';
            this.$ssrContext.head = this.$ssrContext.head || '';
            this.$ssrContext.head += "<style type=\"text/css\" id=\"vuetify-theme-stylesheet\"" + nonce + ">" + this.generatedStyles + "</style>";
        } else if (typeof document !== 'undefined') {
            // Client-side
            this.genStyle();
            this.applyTheme();
        }
    },
    methods: {
        applyTheme: function applyTheme() {
            if (this.style) this.style.innerHTML = this.generatedStyles;
        },
        genStyle: function genStyle() {
            var style = document.getElementById('vuetify-theme-stylesheet');
            if (!style) {
                style = document.createElement('style');
                style.type = 'text/css';
                style.id = 'vuetify-theme-stylesheet';
                if (this.$vuetify.options.cspNonce) {
                    style.setAttribute('nonce', this.$vuetify.options.cspNonce);
                }
                document.head.appendChild(style);
            }
            this.style = style;
        }
    }
});

/***/ }),

/***/ "./src/components/VAutocomplete/VAutocomplete.js":
/*!*******************************************************!*\
  !*** ./src/components/VAutocomplete/VAutocomplete.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_autocompletes_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_autocompletes.styl */ "./src/stylus/components/_autocompletes.styl");
/* harmony import */ var _stylus_components_autocompletes_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_autocompletes_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VSelect/VSelect */ "./src/components/VSelect/VSelect.js");
/* harmony import */ var _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VTextField/VTextField */ "./src/components/VTextField/VTextField.js");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Extensions


// Utils

var defaultMenuProps = __assign({}, _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["defaultMenuProps"], { offsetY: true, offsetOverflow: true, transition: false });
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-autocomplete',
    extends: _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"],
    props: {
        allowOverflow: {
            type: Boolean,
            default: true
        },
        browserAutocomplete: {
            type: String,
            default: 'off'
        },
        filter: {
            type: Function,
            default: function _default(item, queryText, itemText) {
                var hasValue = function hasValue(val) {
                    return val != null ? val : '';
                };
                var text = hasValue(itemText);
                var query = hasValue(queryText);
                return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
            }
        },
        hideNoData: Boolean,
        noFilter: Boolean,
        searchInput: {
            default: undefined
        },
        menuProps: {
            type: _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].props.menuProps.type,
            default: function _default() {
                return defaultMenuProps;
            }
        }
    },
    data: function data(vm) {
        return {
            attrsInput: null,
            lazySearch: vm.searchInput
        };
    },
    computed: {
        classes: function classes() {
            return Object.assign({}, _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].computed.classes.call(this), {
                'v-autocomplete': true,
                'v-autocomplete--is-selecting-index': this.selectedIndex > -1
            });
        },
        computedItems: function computedItems() {
            return this.filteredItems;
        },
        displayedItemsCount: function displayedItemsCount() {
            return this.hideSelected ? this.filteredItems.length - this.selectedItems.length : this.filteredItems.length;
        },
        /**
         * The range of the current input text
         *
         * @return {Number}
         */
        currentRange: function currentRange() {
            if (this.selectedItem == null) return 0;
            return this.getText(this.selectedItem).toString().length;
        },
        filteredItems: function filteredItems() {
            var _this = this;
            if (!this.isSearching || this.noFilter) return this.allItems;
            return this.allItems.filter(function (i) {
                return _this.filter(i, _this.internalSearch, _this.getText(i));
            });
        },
        internalSearch: {
            get: function get() {
                return this.lazySearch;
            },
            set: function set(val) {
                this.lazySearch = val;
                this.$emit('update:searchInput', val);
            }
        },
        isAnyValueAllowed: function isAnyValueAllowed() {
            return false;
        },
        isDirty: function isDirty() {
            return this.searchIsDirty || this.selectedItems.length > 0;
        },
        isSearching: function isSearching() {
            if (this.multiple) return this.searchIsDirty;
            return this.searchIsDirty && this.internalSearch !== this.getText(this.selectedItem);
        },
        menuCanShow: function menuCanShow() {
            if (!this.isFocused) return false;
            return this.displayedItemsCount > 0 || !this.hideNoData;
        },
        $_menuProps: function $_menuProps() {
            var props = _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].computed.$_menuProps.call(this);
            props.contentClass = ("v-autocomplete__content " + (props.contentClass || '')).trim();
            return __assign({}, defaultMenuProps, props);
        },
        searchIsDirty: function searchIsDirty() {
            return this.internalSearch != null && this.internalSearch !== '';
        },
        selectedItem: function selectedItem() {
            var _this = this;
            if (this.multiple) return null;
            return this.selectedItems.find(function (i) {
                return _this.valueComparator(_this.getValue(i), _this.getValue(_this.internalValue));
            });
        },
        listData: function listData() {
            var data = _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].computed.listData.call(this);
            Object.assign(data.props, {
                items: this.virtualizedItems,
                noFilter: this.noFilter || !this.isSearching || !this.filteredItems.length,
                searchInput: this.internalSearch
            });
            return data;
        }
    },
    watch: {
        filteredItems: function filteredItems(val) {
            this.onFilteredItemsChanged(val);
        },
        internalValue: function internalValue() {
            this.setSearch();
        },
        isFocused: function isFocused(val) {
            if (val) {
                this.$refs.input && this.$refs.input.select();
            } else {
                this.updateSelf();
            }
        },
        isMenuActive: function isMenuActive(val) {
            if (val || !this.hasSlot) return;
            this.lazySearch = null;
        },
        items: function items(val, oldVal) {
            // If we are focused, the menu
            // is not active, hide no data is enabled,
            // and items change
            // User is probably async loading
            // items, try to activate the menu
            if (!(oldVal && oldVal.length) && this.hideNoData && this.isFocused && !this.isMenuActive && val.length) this.activateMenu();
        },
        searchInput: function searchInput(val) {
            this.lazySearch = val;
        },
        internalSearch: function internalSearch(val) {
            this.onInternalSearchChanged(val);
        }
    },
    created: function created() {
        this.setSearch();
    },
    methods: {
        onFilteredItemsChanged: function onFilteredItemsChanged(val) {
            var _this = this;
            this.setMenuIndex(-1);
            this.$nextTick(function () {
                _this.setMenuIndex(val.length === 1 ? 0 : -1);
            });
        },
        onInternalSearchChanged: function onInternalSearchChanged(val) {
            this.updateMenuDimensions();
        },
        updateMenuDimensions: function updateMenuDimensions() {
            if (this.isMenuActive && this.$refs.menu) {
                this.$refs.menu.updateDimensions();
            }
        },
        changeSelectedIndex: function changeSelectedIndex(keyCode) {
            // Do not allow changing of selectedIndex
            // when search is dirty
            if (this.searchIsDirty) return;
            if (![_util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].backspace, _util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].left, _util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].right, _util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].delete].includes(keyCode)) return;
            var indexes = this.selectedItems.length - 1;
            if (keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].left) {
                this.selectedIndex = this.selectedIndex === -1 ? indexes : this.selectedIndex - 1;
            } else if (keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].right) {
                this.selectedIndex = this.selectedIndex >= indexes ? -1 : this.selectedIndex + 1;
            } else if (this.selectedIndex === -1) {
                this.selectedIndex = indexes;
                return;
            }
            var currentItem = this.selectedItems[this.selectedIndex];
            if ([_util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].backspace, _util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].delete].includes(keyCode) && !this.getDisabled(currentItem)) {
                var newIndex = this.selectedIndex === indexes ? this.selectedIndex - 1 : this.selectedItems[this.selectedIndex + 1] ? this.selectedIndex : -1;
                if (newIndex === -1) {
                    this.setValue(this.multiple ? [] : undefined);
                } else {
                    this.selectItem(currentItem);
                }
                this.selectedIndex = newIndex;
            }
        },
        clearableCallback: function clearableCallback() {
            this.internalSearch = undefined;
            _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.clearableCallback.call(this);
        },
        genInput: function genInput() {
            var input = _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_2__["default"].methods.genInput.call(this);
            input.data.attrs.role = 'combobox';
            input.data.domProps.value = this.internalSearch;
            return input;
        },
        genSelections: function genSelections() {
            return this.hasSlot || this.multiple ? _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.genSelections.call(this) : [];
        },
        onClick: function onClick() {
            if (this.isDisabled) return;
            this.selectedIndex > -1 ? this.selectedIndex = -1 : this.onFocus();
            this.activateMenu();
        },
        onEnterDown: function onEnterDown() {
            // Avoid invoking this method
            // will cause updateSelf to
            // be called emptying search
        },
        onInput: function onInput(e) {
            if (this.selectedIndex > -1) return;
            // If typing and menu is not currently active
            if (e.target.value) {
                this.activateMenu();
                if (!this.isAnyValueAllowed) this.setMenuIndex(0);
            }
            this.mask && this.resetSelections(e.target);
            this.internalSearch = e.target.value;
            this.badInput = e.target.validity && e.target.validity.badInput;
        },
        onKeyDown: function onKeyDown(e) {
            var keyCode = e.keyCode;
            _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.onKeyDown.call(this, e);
            // The ordering is important here
            // allows new value to be updated
            // and then moves the index to the
            // proper location
            this.changeSelectedIndex(keyCode);
        },
        onTabDown: function onTabDown(e) {
            _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.onTabDown.call(this, e);
            this.updateSelf();
        },
        setSelectedItems: function setSelectedItems() {
            _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.setSelectedItems.call(this);
            // #4273 Don't replace if searching
            // #4403 Don't replace if focused
            if (!this.isFocused) this.setSearch();
        },
        setSearch: function setSearch() {
            var _this = this;
            // Wait for nextTick so selectedItem
            // has had time to update
            this.$nextTick(function () {
                _this.internalSearch = !_this.selectedItems.length || _this.multiple || _this.hasSlot ? null : _this.getText(_this.selectedItem);
            });
        },
        updateSelf: function updateSelf() {
            this.updateAutocomplete();
        },
        updateAutocomplete: function updateAutocomplete() {
            if (!this.searchIsDirty && !this.internalValue) return;
            if (!this.valueComparator(this.internalSearch, this.getValue(this.internalValue))) {
                this.setSearch();
            }
        }
    }
});

/***/ }),

/***/ "./src/components/VAutocomplete/index.js":
/*!***********************************************!*\
  !*** ./src/components/VAutocomplete/index.js ***!
  \***********************************************/
/*! exports provided: VAutocomplete, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VAutocomplete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VAutocomplete */ "./src/components/VAutocomplete/VAutocomplete.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAutocomplete", function() { return _VAutocomplete__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VAutocomplete__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VAvatar/VAvatar.ts":
/*!*******************************************!*\
  !*** ./src/components/VAvatar/VAvatar.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_avatars_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_avatars.styl */ "./src/stylus/components/_avatars.styl");
/* harmony import */ var _stylus_components_avatars_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_avatars_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// Mixins



/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_3__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"]).extend({
    name: 'v-avatar',
    functional: true,
    props: {
        // TODO: inherit these
        color: String,
        size: {
            type: [Number, String],
            default: 48
        },
        tile: Boolean
    },
    render: function render(h, _a) {
        var data = _a.data,
            props = _a.props,
            children = _a.children;
        data.staticClass = ("v-avatar " + (data.staticClass || '')).trim();
        if (props.tile) data.staticClass += ' v-avatar--tile';
        var size = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__["convertToUnit"])(props.size);
        data.style = __assign({ height: size, width: size }, data.style);
        return h('div', _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"].options.methods.setBackgroundColor(props.color, data), children);
    }
}));

/***/ }),

/***/ "./src/components/VAvatar/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VAvatar/index.ts ***!
  \*****************************************/
/*! exports provided: VAvatar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VAvatar */ "./src/components/VAvatar/VAvatar.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAvatar", function() { return _VAvatar__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VAvatar__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VBadge/VBadge.ts":
/*!*****************************************!*\
  !*** ./src/components/VBadge/VBadge.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_badges_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_badges.styl */ "./src/stylus/components/_badges.styl");
/* harmony import */ var _stylus_components_badges_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_badges_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _mixins_positionable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/positionable */ "./src/mixins/positionable.ts");
/* harmony import */ var _mixins_transitionable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/transitionable */ "./src/mixins/transitionable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
// Styles

// Mixins





/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_5__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__["default"], Object(_mixins_positionable__WEBPACK_IMPORTED_MODULE_3__["factory"])(['left', 'bottom']), _mixins_transitionable__WEBPACK_IMPORTED_MODULE_4__["default"]
/* @vue/component */
).extend({
    name: 'v-badge',
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        overlap: Boolean,
        transition: {
            type: String,
            default: 'fab-transition'
        },
        value: {
            default: true
        }
    },
    computed: {
        classes: function classes() {
            return {
                'v-badge--bottom': this.bottom,
                'v-badge--left': this.left,
                'v-badge--overlap': this.overlap
            };
        }
    },
    render: function render(h) {
        var badge = this.$slots.badge ? [h('span', this.setBackgroundColor(this.color, {
            staticClass: 'v-badge__badge',
            attrs: this.$attrs,
            directives: [{
                name: 'show',
                value: this.isActive
            }]
        }), this.$slots.badge)] : null;
        return h('span', {
            staticClass: 'v-badge',
            'class': this.classes
        }, [this.$slots.default, h('transition', {
            props: {
                name: this.transition,
                origin: this.origin,
                mode: this.mode
            }
        }, badge)]);
    }
}));

/***/ }),

/***/ "./src/components/VBadge/index.ts":
/*!****************************************!*\
  !*** ./src/components/VBadge/index.ts ***!
  \****************************************/
/*! exports provided: VBadge, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VBadge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBadge */ "./src/components/VBadge/VBadge.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBadge", function() { return _VBadge__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VBadge__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VBottomNav/VBottomNav.ts":
/*!*************************************************!*\
  !*** ./src/components/VBottomNav/VBottomNav.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_bottom_navs_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_bottom-navs.styl */ "./src/stylus/components/_bottom-navs.styl");
/* harmony import */ var _stylus_components_bottom_navs_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_bottom_navs_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/applicationable */ "./src/mixins/applicationable.ts");
/* harmony import */ var _mixins_button_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/button-group */ "./src/mixins/button-group.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
// Styles

// Mixins



// Util

/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__["default"])('bottom', ['height', 'value']), _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__["default"]
/* @vue/component */
).extend({
    name: 'v-bottom-nav',
    props: {
        active: [Number, String],
        mandatory: Boolean,
        height: {
            default: 56,
            type: [Number, String],
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
        },
        shift: Boolean,
        value: null
    },
    computed: {
        classes: function classes() {
            return {
                'v-bottom-nav--absolute': this.absolute,
                'v-bottom-nav--fixed': !this.absolute && (this.app || this.fixed),
                'v-bottom-nav--shift': this.shift,
                'v-bottom-nav--active': this.value
            };
        },
        computedHeight: function computedHeight() {
            return parseInt(this.height);
        }
    },
    methods: {
        updateApplication: function updateApplication() {
            return !this.value ? 0 : this.computedHeight;
        },
        updateValue: function updateValue(val) {
            this.$emit('update:active', val);
        }
    },
    render: function render(h) {
        return h(_mixins_button_group__WEBPACK_IMPORTED_MODULE_2__["default"], this.setBackgroundColor(this.color, {
            staticClass: 'v-bottom-nav',
            class: this.classes,
            style: {
                height: parseInt(this.computedHeight) + "px"
            },
            props: {
                mandatory: Boolean(this.mandatory || this.active !== undefined),
                value: this.active
            },
            on: { change: this.updateValue }
        }), this.$slots.default);
    }
}));

/***/ }),

/***/ "./src/components/VBottomNav/index.ts":
/*!********************************************!*\
  !*** ./src/components/VBottomNav/index.ts ***!
  \********************************************/
/*! exports provided: VBottomNav, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VBottomNav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBottomNav */ "./src/components/VBottomNav/VBottomNav.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBottomNav", function() { return _VBottomNav__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VBottomNav__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VBottomSheet/VBottomSheet.js":
/*!*****************************************************!*\
  !*** ./src/components/VBottomSheet/VBottomSheet.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_bottom_sheets_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_bottom-sheets.styl */ "./src/stylus/components/_bottom-sheets.styl");
/* harmony import */ var _stylus_components_bottom_sheets_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_bottom_sheets_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VDialog_VDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VDialog/VDialog */ "./src/components/VDialog/VDialog.js");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-bottom-sheet',
    props: {
        disabled: Boolean,
        fullWidth: Boolean,
        hideOverlay: Boolean,
        inset: Boolean,
        lazy: Boolean,
        maxWidth: {
            type: [String, Number],
            default: 'auto'
        },
        persistent: Boolean,
        value: null
    },
    render: function render(h) {
        var activator = h('template', {
            slot: 'activator'
        }, this.$slots.activator);
        var contentClass = ['v-bottom-sheet', this.inset ? 'v-bottom-sheet--inset' : ''].join(' ');
        return h(_VDialog_VDialog__WEBPACK_IMPORTED_MODULE_1__["default"], {
            attrs: __assign({}, this.$props),
            on: __assign({}, this.$listeners),
            props: {
                contentClass: contentClass,
                noClickAnimation: true,
                transition: 'bottom-sheet-transition',
                value: this.value
            }
        }, [activator, this.$slots.default]);
    }
});

/***/ }),

/***/ "./src/components/VBottomSheet/index.js":
/*!**********************************************!*\
  !*** ./src/components/VBottomSheet/index.js ***!
  \**********************************************/
/*! exports provided: VBottomSheet, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VBottomSheet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBottomSheet */ "./src/components/VBottomSheet/VBottomSheet.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBottomSheet", function() { return _VBottomSheet__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VBottomSheet__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VBreadcrumbs/VBreadcrumbs.ts":
/*!*****************************************************!*\
  !*** ./src/components/VBreadcrumbs/VBreadcrumbs.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_breadcrumbs_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_breadcrumbs.styl */ "./src/stylus/components/_breadcrumbs.styl");
/* harmony import */ var _stylus_components_breadcrumbs_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_breadcrumbs_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ "./src/components/VBreadcrumbs/index.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Components

// Mixins

// Utils


/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__["default"])(_mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]
/* @vue/component */
).extend({
    name: 'v-breadcrumbs',
    props: {
        divider: {
            type: String,
            default: '/'
        },
        items: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        large: Boolean,
        justifyCenter: Boolean,
        justifyEnd: Boolean
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-breadcrumbs--large': this.large, 'justify-center': this.justifyCenter, 'justify-end': this.justifyEnd }, this.themeClasses);
        }
    },
    mounted: function mounted() {
        if (this.justifyCenter) Object(_util_console__WEBPACK_IMPORTED_MODULE_3__["deprecate"])('justify-center', 'class="justify-center"', this);
        if (this.justifyEnd) Object(_util_console__WEBPACK_IMPORTED_MODULE_3__["deprecate"])('justify-end', 'class="justify-end"', this);
        if (this.$slots.default) Object(_util_console__WEBPACK_IMPORTED_MODULE_3__["deprecate"])('default slot', ':items and scoped slot "item"', this);
    },
    methods: {
        /* @deprecated */
        genChildren /* istanbul ignore next */: function genChildren() {
            if (!this.$slots.default) return undefined;
            var children = [];
            var createDividers = false;
            for (var i = 0; i < this.$slots.default.length; i++) {
                var elm = this.$slots.default[i];
                if (!elm.componentOptions || elm.componentOptions.Ctor.options.name !== 'v-breadcrumbs-item') {
                    children.push(elm);
                } else {
                    if (createDividers) {
                        children.push(this.genDivider());
                    }
                    children.push(elm);
                    createDividers = true;
                }
            }
            return children;
        },
        genDivider: function genDivider() {
            return this.$createElement(___WEBPACK_IMPORTED_MODULE_1__["VBreadcrumbsDivider"], this.$slots.divider ? this.$slots.divider : this.divider);
        },
        genItems: function genItems() {
            var items = [];
            var hasSlot = !!this.$scopedSlots.item;
            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (hasSlot) items.push(this.$scopedSlots.item({ item: item }));else items.push(this.$createElement(___WEBPACK_IMPORTED_MODULE_1__["VBreadcrumbsItem"], { key: item.text, props: item }, [item.text]));
                if (i < this.items.length - 1) items.push(this.genDivider());
            }
            return items;
        }
    },
    render: function render(h) {
        var children = this.$slots.default ? this.genChildren() : this.genItems();
        return h('ul', {
            staticClass: 'v-breadcrumbs',
            'class': this.classes
        }, children);
    }
}));

/***/ }),

/***/ "./src/components/VBreadcrumbs/VBreadcrumbsItem.ts":
/*!*********************************************************!*\
  !*** ./src/components/VBreadcrumbs/VBreadcrumbsItem.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/routable */ "./src/mixins/routable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_1__["default"])(_mixins_routable__WEBPACK_IMPORTED_MODULE_0__["default"]).extend({
    name: 'v-breadcrumbs-item',
    props: {
        // In a breadcrumb, the currently
        // active item should be dimmed
        activeClass: {
            type: String,
            default: 'v-breadcrumbs__item--disabled'
        }
    },
    computed: {
        classes: function classes() {
            var _a;
            return _a = {
                'v-breadcrumbs__item': true
            }, _a[this.activeClass] = this.disabled, _a;
        }
    },
    render: function render(h) {
        var _a = this.generateRouteLink(this.classes),
            tag = _a.tag,
            data = _a.data;
        return h('li', [h(tag, data, this.$slots.default)]);
    }
}));

/***/ }),

/***/ "./src/components/VBreadcrumbs/index.ts":
/*!**********************************************!*\
  !*** ./src/components/VBreadcrumbs/index.ts ***!
  \**********************************************/
/*! exports provided: VBreadcrumbs, VBreadcrumbsItem, VBreadcrumbsDivider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VBreadcrumbsDivider", function() { return VBreadcrumbsDivider; });
/* harmony import */ var _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBreadcrumbs */ "./src/components/VBreadcrumbs/VBreadcrumbs.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBreadcrumbs", function() { return _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VBreadcrumbsItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VBreadcrumbsItem */ "./src/components/VBreadcrumbs/VBreadcrumbsItem.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBreadcrumbsItem", function() { return _VBreadcrumbsItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");



var VBreadcrumbsDivider = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__["createSimpleFunctional"])('v-breadcrumbs__divider', 'li');

/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VBreadcrumbs: _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_0__["default"],
        VBreadcrumbsItem: _VBreadcrumbsItem__WEBPACK_IMPORTED_MODULE_1__["default"],
        VBreadcrumbsDivider: VBreadcrumbsDivider
    }
});

/***/ }),

/***/ "./src/components/VBtn/VBtn.ts":
/*!*************************************!*\
  !*** ./src/components/VBtn/VBtn.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_buttons_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_buttons.styl */ "./src/stylus/components/_buttons.styl");
/* harmony import */ var _stylus_components_buttons_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_buttons_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _VProgressCircular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VProgressCircular */ "./src/components/VProgressCircular/index.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_groupable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/groupable */ "./src/mixins/groupable.ts");
/* harmony import */ var _mixins_positionable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/positionable */ "./src/mixins/positionable.ts");
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/routable */ "./src/mixins/routable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles


// Components

// Mixins






/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_1__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_routable__WEBPACK_IMPORTED_MODULE_6__["default"], _mixins_positionable__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_mixins_groupable__WEBPACK_IMPORTED_MODULE_4__["factory"])('btnToggle'), Object(_mixins_toggleable__WEBPACK_IMPORTED_MODULE_8__["factory"])('inputValue')
/* @vue/component */
).extend({
    name: 'v-btn',
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        },
        block: Boolean,
        depressed: Boolean,
        fab: Boolean,
        flat: Boolean,
        icon: Boolean,
        large: Boolean,
        loading: Boolean,
        outline: Boolean,
        ripple: {
            type: [Boolean, Object],
            default: null
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
            var _a;
            return __assign((_a = { 'v-btn': true }, _a[this.activeClass] = this.isActive, _a['v-btn--absolute'] = this.absolute, _a['v-btn--block'] = this.block, _a['v-btn--bottom'] = this.bottom, _a['v-btn--disabled'] = this.disabled, _a['v-btn--flat'] = this.flat, _a['v-btn--floating'] = this.fab, _a['v-btn--fixed'] = this.fixed, _a['v-btn--icon'] = this.icon, _a['v-btn--large'] = this.large, _a['v-btn--left'] = this.left, _a['v-btn--loader'] = this.loading, _a['v-btn--outline'] = this.outline, _a['v-btn--depressed'] = this.depressed && !this.flat || this.outline, _a['v-btn--right'] = this.right, _a['v-btn--round'] = this.round, _a['v-btn--router'] = this.to, _a['v-btn--small'] = this.small, _a['v-btn--top'] = this.top, _a), this.themeClasses);
        },
        computedRipple: function computedRipple() {
            var defaultRipple = this.icon || this.fab ? { circle: true } : true;
            if (this.disabled) return false;else return this.ripple !== null ? this.ripple : defaultRipple;
        }
    },
    methods: {
        // Prevent focus to match md spec
        click: function click(e) {
            !this.fab && e.detail && this.$el.blur();
            this.$emit('click', e);
            this.btnToggle && this.toggle();
        },
        genContent: function genContent() {
            return this.$createElement('div', { 'class': 'v-btn__content' }, [this.$slots.default]);
        },
        genLoader: function genLoader() {
            var children = [];
            if (!this.$slots.loader) {
                children.push(this.$createElement(_VProgressCircular__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    props: {
                        indeterminate: true,
                        size: 23,
                        width: 2
                    }
                }));
            } else {
                children.push(this.$slots.loader);
            }
            return this.$createElement('span', { 'class': 'v-btn__loading' }, children);
        }
    },
    render: function render(h) {
        var setColor = !this.outline && !this.flat ? this.setBackgroundColor : this.setTextColor;
        var _a = this.generateRouteLink(this.classes),
            tag = _a.tag,
            data = _a.data;
        var children = [this.genContent()];
        tag === 'button' && (data.attrs.type = this.type);
        this.loading && children.push(this.genLoader());
        data.attrs.value = ['string', 'number'].includes(_typeof(this.value)) ? this.value : JSON.stringify(this.value);
        return h(tag, setColor(this.color, data), children);
    }
}));

/***/ }),

/***/ "./src/components/VBtn/index.ts":
/*!**************************************!*\
  !*** ./src/components/VBtn/index.ts ***!
  \**************************************/
/*! exports provided: VBtn, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBtn */ "./src/components/VBtn/VBtn.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBtn", function() { return _VBtn__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VBtn__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VBtnToggle/VBtnToggle.ts":
/*!*************************************************!*\
  !*** ./src/components/VBtnToggle/VBtnToggle.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_button_toggle_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_button-toggle.styl */ "./src/stylus/components/_button-toggle.styl");
/* harmony import */ var _stylus_components_button_toggle_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_button_toggle_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_button_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/button-group */ "./src/mixins/button-group.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Mixins

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (_mixins_button_group__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    name: 'v-btn-toggle',
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        }
    },
    computed: {
        classes: function classes() {
            return __assign({}, _mixins_button_group__WEBPACK_IMPORTED_MODULE_1__["default"].options.computed.classes.call(this), { 'v-btn-toggle': true, 'v-btn-toggle--only-child': this.selectedItems.length === 1, 'v-btn-toggle--selected': this.selectedItems.length > 0 });
        }
    }
}));

/***/ }),

/***/ "./src/components/VBtnToggle/index.ts":
/*!********************************************!*\
  !*** ./src/components/VBtnToggle/index.ts ***!
  \********************************************/
/*! exports provided: VBtnToggle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VBtnToggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VBtnToggle */ "./src/components/VBtnToggle/VBtnToggle.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBtnToggle", function() { return _VBtnToggle__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VBtnToggle__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VCard/VCard.ts":
/*!***************************************!*\
  !*** ./src/components/VCard/VCard.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_cards_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_cards.styl */ "./src/stylus/components/_cards.styl");
/* harmony import */ var _stylus_components_cards_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_cards_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VPaper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VPaper */ "./src/components/VPaper/index.ts");
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/routable */ "./src/mixins/routable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Extensions

// Mixins

// Helpers

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_3__["default"])(_mixins_routable__WEBPACK_IMPORTED_MODULE_2__["default"], _VPaper__WEBPACK_IMPORTED_MODULE_1__["default"]).extend({
    name: 'v-card',
    props: {
        elevation: {
            type: [Number, String],
            default: 2
        },
        flat: Boolean,
        hover: Boolean,
        img: String,
        raised: Boolean
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-card': true, 'v-card--hover': this.hover }, _VPaper__WEBPACK_IMPORTED_MODULE_1__["default"].options.computed.classes.call(this));
        },
        computedElevation: function computedElevation() {
            if (this.flat) return 0;
            if (this.raised) return 3;
            return _VPaper__WEBPACK_IMPORTED_MODULE_1__["default"].options.computed.computedElevation.call(this);
        },
        styles: function styles() {
            var style = __assign({}, _VPaper__WEBPACK_IMPORTED_MODULE_1__["default"].options.computed.styles.call(this));
            if (this.img) {
                style.background = "url(\"" + this.img + "\") center center / cover no-repeat";
            }
            return style;
        }
    },
    render: function render(h) {
        var _a = this.generateRouteLink(this.classes),
            tag = _a.tag,
            data = _a.data;
        data.style = this.styles;
        return h(tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
}));

/***/ }),

/***/ "./src/components/VCard/VCardMedia.ts":
/*!********************************************!*\
  !*** ./src/components/VCard/VCardMedia.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VImg_VImg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VImg/VImg */ "./src/components/VImg/VImg.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
// Components

// Utils

/* istanbul ignore next */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (_VImg_VImg__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
    name: 'v-card-media',
    mounted: function mounted() {
        Object(_util_console__WEBPACK_IMPORTED_MODULE_1__["deprecate"])('v-card-media', this.src ? 'v-img' : 'v-responsive', this);
    }
}));

/***/ }),

/***/ "./src/components/VCard/VCardTitle.ts":
/*!********************************************!*\
  !*** ./src/components/VCard/VCardTitle.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
// Types

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'v-card-title',
    functional: true,
    props: {
        primaryTitle: Boolean
    },
    render: function render(h, _a) {
        var data = _a.data,
            props = _a.props,
            children = _a.children;
        data.staticClass = ("v-card__title " + (data.staticClass || '')).trim();
        if (props.primaryTitle) data.staticClass += ' v-card__title--primary';
        return h('div', data, children);
    }
}));

/***/ }),

/***/ "./src/components/VCard/index.ts":
/*!***************************************!*\
  !*** ./src/components/VCard/index.ts ***!
  \***************************************/
/*! exports provided: VCard, VCardMedia, VCardTitle, VCardActions, VCardText, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCardActions", function() { return VCardActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCardText", function() { return VCardText; });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _VCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VCard */ "./src/components/VCard/VCard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCard", function() { return _VCard__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _VCardMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VCardMedia */ "./src/components/VCard/VCardMedia.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCardMedia", function() { return _VCardMedia__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _VCardTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VCardTitle */ "./src/components/VCard/VCardTitle.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCardTitle", function() { return _VCardTitle__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_4__);





var VCardActions = vue__WEBPACK_IMPORTED_MODULE_4___default.a.extend(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-card__actions'));
var VCardText = vue__WEBPACK_IMPORTED_MODULE_4___default.a.extend(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-card__text'));

/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VCard: _VCard__WEBPACK_IMPORTED_MODULE_1__["default"],
        VCardMedia: _VCardMedia__WEBPACK_IMPORTED_MODULE_2__["default"],
        VCardTitle: _VCardTitle__WEBPACK_IMPORTED_MODULE_3__["default"],
        VCardActions: VCardActions,
        VCardText: VCardText
    }
});

/***/ }),

/***/ "./src/components/VCarousel/VCarousel.ts":
/*!***********************************************!*\
  !*** ./src/components/VCarousel/VCarousel.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_carousel_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_carousel.styl */ "./src/stylus/components/_carousel.styl");
/* harmony import */ var _stylus_components_carousel_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_carousel_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VWindow_VWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VWindow/VWindow */ "./src/components/VWindow/VWindow.ts");
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VBtn */ "./src/components/VBtn/index.ts");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_button_group__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/button-group */ "./src/mixins/button-group.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
// Styles

// Extensions

// Components


// Mixins
// TODO: Move this into core components v2.0

// Utilities

/* harmony default export */ __webpack_exports__["default"] = (_VWindow_VWindow__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    name: 'v-carousel',
    props: {
        cycle: {
            type: Boolean,
            default: true
        },
        delimiterIcon: {
            type: String,
            default: '$vuetify.icons.delimiter'
        },
        height: {
            type: [Number, String],
            default: 500
        },
        hideControls: Boolean,
        hideDelimiters: Boolean,
        interval: {
            type: [Number, String],
            default: 6000,
            validator: function validator(value) {
                return value > 0;
            }
        },
        mandatory: {
            type: Boolean,
            default: true
        },
        nextIcon: {
            type: [Boolean, String],
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: [Boolean, String],
            default: '$vuetify.icons.prev'
        }
    },
    data: function data() {
        return {
            changedByControls: false,
            internalHeight: this.height,
            slideTimeout: undefined
        };
    },
    computed: {
        isDark: function isDark() {
            return this.dark || !this.light;
        }
    },
    watch: {
        internalValue: 'restartTimeout',
        interval: 'restartTimeout',
        cycle: function cycle(val) {
            if (val) {
                this.restartTimeout();
            } else {
                clearTimeout(this.slideTimeout);
                this.slideTimeout = undefined;
            }
        }
    },
    mounted: function mounted() {
        this.startTimeout();
    },
    methods: {
        genDelimiters: function genDelimiters() {
            return this.$createElement('div', {
                staticClass: 'v-carousel__controls'
            }, [this.genItems()]);
        },
        genIcon: function genIcon(direction, icon, fn) {
            return this.$createElement('div', {
                staticClass: "v-carousel__" + direction
            }, [this.$createElement(_VBtn__WEBPACK_IMPORTED_MODULE_2__["default"], {
                props: {
                    icon: true
                },
                on: { click: fn }
            }, [this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {
                props: { 'size': '46px' }
            }, icon)])]);
        },
        genIcons: function genIcons() {
            var icons = [];
            var prevIcon = this.$vuetify.rtl ? this.nextIcon : this.prevIcon;
            if (prevIcon && typeof prevIcon === 'string') {
                icons.push(this.genIcon('prev', prevIcon, this.prev));
            }
            var nextIcon = this.$vuetify.rtl ? this.prevIcon : this.nextIcon;
            if (nextIcon && typeof nextIcon === 'string') {
                icons.push(this.genIcon('next', nextIcon, this.next));
            }
            return icons;
        },
        genItems: function genItems() {
            var _this = this;
            var length = this.items.length;
            var children = [];
            for (var i = 0; i < length; i++) {
                var child = this.$createElement(_VBtn__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    class: {
                        'v-carousel__controls__item': true
                    },
                    props: {
                        icon: true,
                        small: true
                    }
                }, [this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    props: { size: 18 }
                }, this.delimiterIcon)]);
                children.push(child);
            }
            return this.$createElement(_mixins_button_group__WEBPACK_IMPORTED_MODULE_4__["default"], {
                props: {
                    value: this.internalValue
                },
                on: {
                    change: function change(val) {
                        _this.changedByControls = true;
                        _this.internalValue = val;
                    }
                }
            }, children);
        },
        restartTimeout: function restartTimeout() {
            this.slideTimeout && clearTimeout(this.slideTimeout);
            this.slideTimeout = undefined;
            var raf = requestAnimationFrame || setTimeout;
            raf(this.startTimeout);
        },
        startTimeout: function startTimeout() {
            if (!this.cycle) return;
            this.slideTimeout = window.setTimeout(this.next, +this.interval > 0 ? +this.interval : 6000);
        },
        updateReverse: function updateReverse(val, oldVal) {
            if (this.changedByControls) {
                this.changedByControls = false;
                _VWindow_VWindow__WEBPACK_IMPORTED_MODULE_1__["default"].options.methods.updateReverse.call(this, val, oldVal);
            }
        }
    },
    render: function render(h) {
        var children = [];
        var data = {
            staticClass: 'v-window v-carousel',
            style: {
                height: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__["convertToUnit"])(this.height)
            },
            directives: []
        };
        if (!this.touchless) {
            data.directives.push({
                name: 'touch',
                value: {
                    left: this.next,
                    right: this.prev
                }
            });
        }
        if (!this.hideControls) {
            children.push(this.genIcons());
        }
        if (!this.hideDelimiters) {
            children.push(this.genDelimiters());
        }
        return h('div', data, [children, this.genContainer()]);
    }
}));

/***/ }),

/***/ "./src/components/VCarousel/VCarouselItem.ts":
/*!***************************************************!*\
  !*** ./src/components/VCarousel/VCarouselItem.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VWindow_VWindowItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VWindow/VWindowItem */ "./src/components/VWindow/VWindowItem.ts");
/* harmony import */ var _VImg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VImg */ "./src/components/VImg/index.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Extensions

// Components

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (_VWindow_VWindowItem__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
    name: 'v-carousel-item',
    inheritAttrs: false,
    methods: {
        genDefaultSlot: function genDefaultSlot() {
            return [this.$createElement(_VImg__WEBPACK_IMPORTED_MODULE_1__["VImg"], {
                staticClass: 'v-carousel__item',
                props: __assign({}, this.$attrs, { height: this.windowGroup.internalHeight }),
                on: this.$listeners
            }, this.$slots.default)];
        },
        onBeforeEnter: function onBeforeEnter() {},
        onEnter: function onEnter() {},
        onAfterEnter: function onAfterEnter() {},
        onBeforeLeave: function onBeforeLeave() {},
        onEnterCancelled: function onEnterCancelled() {}
    }
}));

/***/ }),

/***/ "./src/components/VCarousel/index.ts":
/*!*******************************************!*\
  !*** ./src/components/VCarousel/index.ts ***!
  \*******************************************/
/*! exports provided: VCarousel, VCarouselItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VCarousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VCarousel */ "./src/components/VCarousel/VCarousel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCarousel", function() { return _VCarousel__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VCarouselItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VCarouselItem */ "./src/components/VCarousel/VCarouselItem.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCarouselItem", function() { return _VCarouselItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VCarousel: _VCarousel__WEBPACK_IMPORTED_MODULE_0__["default"],
        VCarouselItem: _VCarouselItem__WEBPACK_IMPORTED_MODULE_1__["default"]
    }
});

/***/ }),

/***/ "./src/components/VCheckbox/VCheckbox.js":
/*!***********************************************!*\
  !*** ./src/components/VCheckbox/VCheckbox.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_selection_controls_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_selection-controls.styl */ "./src/stylus/components/_selection-controls.styl");
/* harmony import */ var _stylus_components_selection_controls_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_selection_controls_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_selectable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/selectable */ "./src/mixins/selectable.js");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Components

// import { VFadeTransition } from '../transitions'
// Mixins

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-checkbox',
    mixins: [_mixins_selectable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        indeterminate: Boolean,
        indeterminateIcon: {
            type: String,
            default: '$vuetify.icons.checkboxIndeterminate'
        },
        onIcon: {
            type: String,
            default: '$vuetify.icons.checkboxOn'
        },
        offIcon: {
            type: String,
            default: '$vuetify.icons.checkboxOff'
        }
    },
    data: function data(vm) {
        return {
            inputIndeterminate: vm.indeterminate
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-input--selection-controls': true,
                'v-input--checkbox': true
            };
        },
        computedIcon: function computedIcon() {
            if (this.inputIndeterminate) {
                return this.indeterminateIcon;
            } else if (this.isActive) {
                return this.onIcon;
            } else {
                return this.offIcon;
            }
        }
    },
    watch: {
        indeterminate: function indeterminate(val) {
            this.inputIndeterminate = val;
        }
    },
    methods: {
        genCheckbox: function genCheckbox() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [this.genInput('checkbox', __assign({}, this.$attrs, { 'aria-checked': this.inputIndeterminate ? 'mixed' : this.isActive.toString() })), !this.disabled && this.genRipple(this.setTextColor(this.computedColor)), this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], this.setTextColor(this.computedColor, {
                props: {
                    dark: this.dark,
                    light: this.light
                }
            }), this.computedIcon)]);
        },
        genDefaultSlot: function genDefaultSlot() {
            return [this.genCheckbox(), this.genLabel()];
        }
    }
});

/***/ }),

/***/ "./src/components/VCheckbox/index.js":
/*!*******************************************!*\
  !*** ./src/components/VCheckbox/index.js ***!
  \*******************************************/
/*! exports provided: VCheckbox, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VCheckbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VCheckbox */ "./src/components/VCheckbox/VCheckbox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCheckbox", function() { return _VCheckbox__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VCheckbox__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VChip/VChip.ts":
/*!***************************************!*\
  !*** ./src/components/VChip/VChip.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_chips_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_chips.styl */ "./src/stylus/components/_chips.styl");
/* harmony import */ var _stylus_components_chips_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_chips_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


// Components

// Mixins



/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_1__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_5__["default"]).extend({
    name: 'v-chip',
    props: {
        close: Boolean,
        disabled: Boolean,
        label: Boolean,
        outline: Boolean,
        // Used for selects/tagging
        selected: Boolean,
        small: Boolean,
        textColor: String,
        value: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-chip--disabled': this.disabled, 'v-chip--selected': this.selected && !this.disabled, 'v-chip--label': this.label, 'v-chip--outline': this.outline, 'v-chip--small': this.small, 'v-chip--removable': this.close }, this.themeClasses);
        }
    },
    methods: {
        genClose: function genClose(h) {
            var _this = this;
            var data = {
                staticClass: 'v-chip__close',
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        _this.$emit('input', false);
                    }
                }
            };
            return h('div', data, [h(_VIcon__WEBPACK_IMPORTED_MODULE_2__["default"], '$vuetify.icons.delete')]);
        },
        genContent: function genContent(h) {
            var children = [this.$slots.default];
            this.close && children.push(this.genClose(h));
            return h('span', {
                staticClass: 'v-chip__content'
            }, children);
        }
    },
    render: function render(h) {
        var data = this.setBackgroundColor(this.color, {
            staticClass: 'v-chip',
            'class': this.classes,
            attrs: { tabindex: this.disabled ? -1 : 0 },
            directives: [{
                name: 'show',
                value: this.isActive
            }],
            on: this.$listeners
        });
        var color = this.textColor || this.outline && this.color;
        return h('span', this.setTextColor(color, data), [this.genContent(h)]);
    }
}));

/***/ }),

/***/ "./src/components/VChip/index.ts":
/*!***************************************!*\
  !*** ./src/components/VChip/index.ts ***!
  \***************************************/
/*! exports provided: VChip, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VChip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VChip */ "./src/components/VChip/VChip.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VChip", function() { return _VChip__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VChip__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VCombobox/VCombobox.js":
/*!***********************************************!*\
  !*** ./src/components/VCombobox/VCombobox.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_autocompletes_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_autocompletes.styl */ "./src/stylus/components/_autocompletes.styl");
/* harmony import */ var _stylus_components_autocompletes_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_autocompletes_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VSelect/VSelect */ "./src/components/VSelect/VSelect.js");
/* harmony import */ var _VAutocomplete_VAutocomplete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VAutocomplete/VAutocomplete */ "./src/components/VAutocomplete/VAutocomplete.js");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
// Styles

// Extensions


// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-combobox',
    extends: _VAutocomplete_VAutocomplete__WEBPACK_IMPORTED_MODULE_2__["default"],
    props: {
        delimiters: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        returnObject: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            editingIndex: -1
        };
    },
    computed: {
        counterValue: function counterValue() {
            return this.multiple ? this.selectedItems.length : (this.internalSearch || '').toString().length;
        },
        hasSlot: function hasSlot() {
            return _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].computed.hasSlot.call(this) || this.multiple;
        },
        isAnyValueAllowed: function isAnyValueAllowed() {
            return true;
        },
        menuCanShow: function menuCanShow() {
            if (!this.isFocused) return false;
            return this.displayedItemsCount > 0 || !!this.$slots['no-data'] && !this.hideNoData;
        }
    },
    methods: {
        onFilteredItemsChanged: function onFilteredItemsChanged() {
            // nop
        },
        onInternalSearchChanged: function onInternalSearchChanged(val) {
            if (val && this.multiple && this.delimiters) {
                var delimiter = this.delimiters.find(function (d) {
                    return val.endsWith(d);
                });
                if (delimiter == null) return;
                this.internalSearch = val.slice(0, val.length - delimiter.length);
                this.updateTags();
            }
            this.updateMenuDimensions();
        },
        genChipSelection: function genChipSelection(item, index) {
            var _this = this;
            var chip = _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.genChipSelection.call(this, item, index);
            // Allow user to update an existing value
            if (this.multiple) {
                chip.componentOptions.listeners.dblclick = function () {
                    _this.editingIndex = index;
                    _this.internalSearch = _this.getText(item);
                    _this.selectedIndex = -1;
                };
            }
            return chip;
        },
        onChipInput: function onChipInput(item) {
            _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.onChipInput.call(this, item);
            this.editingIndex = -1;
        },
        // Requires a manual definition
        // to overwrite removal in v-autocomplete
        onEnterDown: function onEnterDown(e) {
            e.preventDefault();
            _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.onEnterDown.call(this);
            // If has menu index, let v-select-list handle
            if (this.getMenuIndex() > -1) return;
            this.updateSelf();
        },
        onKeyDown: function onKeyDown(e) {
            var keyCode = e.keyCode;
            _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.onKeyDown.call(this, e);
            // If user is at selection index of 0
            // create a new tag
            if (this.multiple && keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].left && this.$refs.input.selectionStart === 0) {
                this.updateSelf();
            }
            // The ordering is important here
            // allows new value to be updated
            // and then moves the index to the
            // proper location
            this.changeSelectedIndex(keyCode);
        },
        onTabDown: function onTabDown(e) {
            // When adding tags, if searching and
            // there is not a filtered options,
            // add the value to the tags list
            if (this.multiple && this.internalSearch && this.getMenuIndex() === -1) {
                e.preventDefault();
                e.stopPropagation();
                return this.updateTags();
            }
            _VAutocomplete_VAutocomplete__WEBPACK_IMPORTED_MODULE_2__["default"].methods.onTabDown.call(this, e);
        },
        selectItem: function selectItem(item) {
            // Currently only supports items:<string[]>
            if (this.editingIndex > -1) {
                this.updateEditing();
            } else {
                _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.selectItem.call(this, item);
            }
        },
        setSelectedItems: function setSelectedItems() {
            if (this.internalValue == null || this.internalValue === '') {
                this.selectedItems = [];
            } else {
                this.selectedItems = this.multiple ? this.internalValue : [this.internalValue];
            }
        },
        setValue: function setValue(value) {
            if (value === void 0) {
                value = this.internalSearch;
            }
            _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.setValue.call(this, value);
        },
        updateEditing: function updateEditing() {
            var value = this.internalValue.slice();
            value[this.editingIndex] = this.internalSearch;
            this.setValue(value);
            this.editingIndex = -1;
        },
        updateCombobox: function updateCombobox() {
            var isUsingSlot = Boolean(this.$scopedSlots.selection) || this.hasChips;
            // If search is not dirty and is
            // using slot, do nothing
            if (isUsingSlot && !this.searchIsDirty) return;
            // The internal search is not matching
            // the internal value, update the input
            if (this.internalSearch !== this.getText(this.internalValue)) this.setValue();
            // Reset search if using slot
            // to avoid a double input
            if (isUsingSlot) this.internalSearch = undefined;
        },
        updateSelf: function updateSelf() {
            this.multiple ? this.updateTags() : this.updateCombobox();
        },
        updateTags: function updateTags() {
            var menuIndex = this.getMenuIndex();
            // If the user is not searching
            // and no menu item is selected
            // do nothing
            if (menuIndex < 0 && !this.searchIsDirty) return;
            if (this.editingIndex > -1) {
                return this.updateEditing();
            }
            var index = this.selectedItems.indexOf(this.internalSearch);
            // If it already exists, do nothing
            // this might need to change to bring
            // the duplicated item to the last entered
            if (index > -1) {
                var internalValue = this.internalValue.slice();
                internalValue.splice(index, 1);
                this.setValue(internalValue);
            }
            // If menu index is greater than 1
            // the selection is handled elsewhere
            // TODO: find out where
            if (menuIndex > -1) return this.internalSearch = null;
            this.selectItem(this.internalSearch);
            this.internalSearch = null;
        }
    }
});

/***/ }),

/***/ "./src/components/VCombobox/index.js":
/*!*******************************************!*\
  !*** ./src/components/VCombobox/index.js ***!
  \*******************************************/
/*! exports provided: VCombobox, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VCombobox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VCombobox */ "./src/components/VCombobox/VCombobox.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCombobox", function() { return _VCombobox__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VCombobox__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VCounter/VCounter.js":
/*!*********************************************!*\
  !*** ./src/components/VCounter/VCounter.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_counters_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_counters.styl */ "./src/stylus/components/_counters.styl");
/* harmony import */ var _stylus_components_counters_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_counters_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Mixins

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-counter',
    functional: true,
    mixins: [_mixins_themeable__WEBPACK_IMPORTED_MODULE_1__["default"]],
    props: {
        value: {
            type: [Number, String],
            default: ''
        },
        max: [Number, String]
    },
    render: function render(h, ctx) {
        var props = ctx.props;
        var max = parseInt(props.max, 10);
        var value = parseInt(props.value, 10);
        var content = max ? value + " / " + max : props.value;
        var isGreater = max && value > max;
        return h('div', {
            staticClass: 'v-counter',
            class: __assign({ 'error--text': isGreater }, Object(_mixins_themeable__WEBPACK_IMPORTED_MODULE_1__["functionalThemeClasses"])(ctx))
        }, content);
    }
});

/***/ }),

/***/ "./src/components/VCounter/index.js":
/*!******************************************!*\
  !*** ./src/components/VCounter/index.js ***!
  \******************************************/
/*! exports provided: VCounter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VCounter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VCounter */ "./src/components/VCounter/VCounter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCounter", function() { return _VCounter__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VCounter__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VDataIterator/VDataIterator.js":
/*!*******************************************************!*\
  !*** ./src/components/VDataIterator/VDataIterator.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_data_iterator_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_data-iterator.styl */ "./src/stylus/components/_data-iterator.styl");
/* harmony import */ var _stylus_components_data_iterator_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_data_iterator_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_data_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/data-iterable */ "./src/mixins/data-iterable.js");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-data-iterator',
    mixins: [_mixins_data_iterable__WEBPACK_IMPORTED_MODULE_1__["default"]],
    inheritAttrs: false,
    props: {
        contentTag: {
            type: String,
            default: 'div'
        },
        contentProps: {
            type: Object,
            required: false
        },
        contentClass: {
            type: String,
            required: false
        }
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-data-iterator': true, 'v-data-iterator--select-all': this.selectAll !== false }, this.themeClasses);
        }
    },
    created: function created() {
        this.initPagination();
    },
    methods: {
        genContent: function genContent() {
            var children = this.genItems();
            var data = {
                'class': this.contentClass,
                attrs: this.$attrs,
                on: this.$listeners,
                props: this.contentProps
            };
            return this.$createElement(this.contentTag, data, children);
        },
        genEmptyItems: function genEmptyItems(content) {
            return [this.$createElement('div', {
                'class': 'text-xs-center',
                style: 'width: 100%'
            }, content)];
        },
        genFilteredItems: function genFilteredItems() {
            if (!this.$scopedSlots.item) {
                return null;
            }
            var items = [];
            for (var index = 0, len = this.filteredItems.length; index < len; ++index) {
                var item = this.filteredItems[index];
                var props = this.createProps(item, index);
                items.push(this.$scopedSlots.item(props));
            }
            return items;
        },
        genFooter: function genFooter() {
            var children = [];
            if (this.$slots.footer) {
                children.push(this.$slots.footer);
            }
            if (!this.hideActions) {
                children.push(this.genActions());
            }
            if (!children.length) return null;
            return this.$createElement('div', children);
        },
        genHeader: function genHeader() {
            var children = [];
            if (this.$slots.header) {
                children.push(this.$slots.header);
            }
            if (!children.length) return null;
            return this.$createElement('div', children);
        }
    },
    render: function render(h) {
        return h('div', {
            'class': this.classes
        }, [this.genHeader(), this.genContent(), this.genFooter()]);
    }
});

/***/ }),

/***/ "./src/components/VDataIterator/index.js":
/*!***********************************************!*\
  !*** ./src/components/VDataIterator/index.js ***!
  \***********************************************/
/*! exports provided: VDataIterator, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VDataIterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VDataIterator */ "./src/components/VDataIterator/VDataIterator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDataIterator", function() { return _VDataIterator__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VDataIterator__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VDataTable/VDataTable.js":
/*!*************************************************!*\
  !*** ./src/components/VDataTable/VDataTable.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_tables_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_tables.styl */ "./src/stylus/components/_tables.styl");
/* harmony import */ var _stylus_components_tables_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_tables_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stylus_components_data_table_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stylus/components/_data-table.styl */ "./src/stylus/components/_data-table.styl");
/* harmony import */ var _stylus_components_data_table_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_data_table_styl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_data_iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/data-iterable */ "./src/mixins/data-iterable.js");
/* harmony import */ var _mixins_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mixins/head */ "./src/components/VDataTable/mixins/head.js");
/* harmony import */ var _mixins_body__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mixins/body */ "./src/components/VDataTable/mixins/body.js");
/* harmony import */ var _mixins_foot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mixins/foot */ "./src/components/VDataTable/mixins/foot.js");
/* harmony import */ var _mixins_progress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mixins/progress */ "./src/components/VDataTable/mixins/progress.js");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};








// Importing does not work properly
var VTableOverflow = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["createSimpleFunctional"])('v-table__overflow');
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-data-table',
    mixins: [_mixins_data_iterable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_head__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_body__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_foot__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_progress__WEBPACK_IMPORTED_MODULE_6__["default"]],
    props: {
        headers: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        headersLength: {
            type: Number
        },
        headerText: {
            type: String,
            default: 'text'
        },
        headerKey: {
            type: String,
            default: null
        },
        hideHeaders: Boolean,
        rowsPerPageText: {
            type: String,
            default: '$vuetify.dataTable.rowsPerPageText'
        },
        customFilter: {
            type: Function,
            default: function _default(items, search, filter, headers) {
                search = search.toString().toLowerCase();
                if (search.trim() === '') return items;
                var props = headers.map(function (h) {
                    return h.value;
                });
                return items.filter(function (item) {
                    return props.some(function (prop) {
                        return filter(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["getObjectValueByPath"])(item, prop, item[prop]), search);
                    });
                });
            }
        }
    },
    data: function data() {
        return {
            actionsClasses: 'v-datatable__actions',
            actionsRangeControlsClasses: 'v-datatable__actions__range-controls',
            actionsSelectClasses: 'v-datatable__actions__select',
            actionsPaginationClasses: 'v-datatable__actions__pagination'
        };
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-datatable v-table': true, 'v-datatable--select-all': this.selectAll !== false }, this.themeClasses);
        },
        filteredItems: function filteredItems() {
            return this.filteredItemsImpl(this.headers);
        },
        headerColumns: function headerColumns() {
            return this.headersLength || this.headers.length + (this.selectAll !== false);
        }
    },
    created: function created() {
        var firstSortable = this.headers.find(function (h) {
            return !('sortable' in h) || h.sortable;
        });
        this.defaultPagination.sortBy = !this.disableInitialSort && firstSortable ? firstSortable.value : null;
        this.initPagination();
    },
    methods: {
        hasTag: function hasTag(elements, tag) {
            return Array.isArray(elements) && elements.find(function (e) {
                return e.tag === tag;
            });
        },
        genTR: function genTR(children, data) {
            if (data === void 0) {
                data = {};
            }
            return this.$createElement('tr', data, children);
        }
    },
    render: function render(h) {
        var tableOverflow = h(VTableOverflow, {}, [h('table', {
            'class': this.classes
        }, [this.genTHead(), this.genTBody(), this.genTFoot()])]);
        return h('div', [tableOverflow, this.genActionsFooter()]);
    }
});

/***/ }),

/***/ "./src/components/VDataTable/VEditDialog.js":
/*!**************************************************!*\
  !*** ./src/components/VDataTable/VEditDialog.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_small_dialog_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_small-dialog.styl */ "./src/stylus/components/_small-dialog.styl");
/* harmony import */ var _stylus_components_small_dialog_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_small_dialog_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_returnable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/returnable */ "./src/mixins/returnable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../VBtn */ "./src/components/VBtn/index.ts");
/* harmony import */ var _VMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VMenu */ "./src/components/VMenu/index.js");

// Mixins


// Utils



/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-edit-dialog',
    mixins: [_mixins_returnable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        cancelText: {
            default: 'Cancel'
        },
        large: Boolean,
        lazy: Boolean,
        persistent: Boolean,
        saveText: {
            default: 'Save'
        },
        transition: {
            type: String,
            default: 'slide-x-reverse-transition'
        }
    },
    data: function data() {
        return {
            isActive: false
        };
    },
    watch: {
        isActive: function isActive(val) {
            if (val) {
                this.$emit('open');
                setTimeout(this.focus, 50); // Give DOM time to paint
            } else {
                this.$emit('close');
            }
        }
    },
    methods: {
        cancel: function cancel() {
            this.isActive = false;
            this.$emit('cancel');
        },
        focus: function focus() {
            var input = this.$refs.content.querySelector('input');
            input && input.focus();
        },
        genButton: function genButton(fn, text) {
            return this.$createElement(_VBtn__WEBPACK_IMPORTED_MODULE_4__["default"], {
                props: {
                    flat: true,
                    color: 'primary',
                    light: true
                },
                on: { click: fn }
            }, text);
        },
        genActions: function genActions() {
            var _this = this;
            return this.$createElement('div', {
                'class': 'v-small-dialog__actions'
            }, [this.genButton(this.cancel, this.cancelText), this.genButton(function () {
                _this.save(_this.returnValue);
                _this.$emit('save');
            }, this.saveText)]);
        },
        genContent: function genContent() {
            var _this = this;
            return this.$createElement('div', {
                on: {
                    keydown: function keydown(e) {
                        var input = _this.$refs.content.querySelector('input');
                        e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].esc && _this.cancel();
                        if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_3__["keyCodes"].enter && input) {
                            _this.save(input.value);
                            _this.$emit('save');
                        }
                    }
                },
                ref: 'content'
            }, [this.$slots.input]);
        }
    },
    render: function render(h) {
        var _this = this;
        return h(_VMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
            staticClass: 'v-small-dialog',
            class: this.themeClasses,
            props: {
                contentClass: 'v-small-dialog__content',
                transition: this.transition,
                origin: 'top right',
                right: true,
                value: this.isActive,
                closeOnClick: !this.persistent,
                closeOnContentClick: false,
                lazy: this.lazy,
                light: this.light,
                dark: this.dark
            },
            on: {
                input: function input(val) {
                    return _this.isActive = val;
                }
            }
        }, [h('a', {
            slot: 'activator'
        }, this.$slots.default), this.genContent(), this.large ? this.genActions() : null]);
    }
});

/***/ }),

/***/ "./src/components/VDataTable/index.js":
/*!********************************************!*\
  !*** ./src/components/VDataTable/index.js ***!
  \********************************************/
/*! exports provided: VDataTable, VEditDialog, VTableOverflow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VTableOverflow", function() { return VTableOverflow; });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _VDataTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VDataTable */ "./src/components/VDataTable/VDataTable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDataTable", function() { return _VDataTable__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _VEditDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VEditDialog */ "./src/components/VDataTable/VEditDialog.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEditDialog", function() { return _VEditDialog__WEBPACK_IMPORTED_MODULE_2__["default"]; });




var VTableOverflow = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-table__overflow');

/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VDataTable: _VDataTable__WEBPACK_IMPORTED_MODULE_1__["default"],
        VEditDialog: _VEditDialog__WEBPACK_IMPORTED_MODULE_2__["default"],
        VTableOverflow: VTableOverflow
    }
});

/***/ }),

/***/ "./src/components/VDataTable/mixins/body.js":
/*!**************************************************!*\
  !*** ./src/components/VDataTable/mixins/body.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transitions_expand_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../transitions/expand-transition */ "./src/components/transitions/expand-transition.js");

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        genTBody: function genTBody() {
            var children = this.genItems();
            return this.$createElement('tbody', children);
        },
        genExpandedRow: function genExpandedRow(props) {
            var children = [];
            if (this.isExpanded(props.item)) {
                var expand = this.$createElement('div', {
                    class: 'v-datatable__expand-content',
                    key: props.item[this.itemKey]
                }, [this.$scopedSlots.expand(props)]);
                children.push(expand);
            }
            var transition = this.$createElement('transition-group', {
                class: 'v-datatable__expand-col',
                attrs: { colspan: this.headerColumns },
                props: {
                    tag: 'td'
                },
                on: Object(_transitions_expand_transition__WEBPACK_IMPORTED_MODULE_0__["default"])('v-datatable__expand-col--expanded')
            }, children);
            return this.genTR([transition], { class: 'v-datatable__expand-row' });
        },
        genFilteredItems: function genFilteredItems() {
            if (!this.$scopedSlots.items) {
                return null;
            }
            var rows = [];
            for (var index = 0, len = this.filteredItems.length; index < len; ++index) {
                var item = this.filteredItems[index];
                var props = this.createProps(item, index);
                var row = this.$scopedSlots.items(props);
                rows.push(this.hasTag(row, 'td') ? this.genTR(row, {
                    key: this.itemKey ? props.item[this.itemKey] : index,
                    attrs: { active: this.isSelected(item) }
                }) : row);
                if (this.$scopedSlots.expand) {
                    var expandRow = this.genExpandedRow(props);
                    rows.push(expandRow);
                }
            }
            return rows;
        },
        genEmptyItems: function genEmptyItems(content) {
            if (this.hasTag(content, 'tr')) {
                return content;
            } else if (this.hasTag(content, 'td')) {
                return this.genTR(content);
            } else {
                return this.genTR([this.$createElement('td', {
                    class: {
                        'text-xs-center': typeof content === 'string'
                    },
                    attrs: { colspan: this.headerColumns }
                }, content)]);
            }
        }
    }
});

/***/ }),

/***/ "./src/components/VDataTable/mixins/foot.js":
/*!**************************************************!*\
  !*** ./src/components/VDataTable/mixins/foot.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        genTFoot: function genTFoot() {
            if (!this.$slots.footer) {
                return null;
            }
            var footer = this.$slots.footer;
            var row = this.hasTag(footer, 'td') ? this.genTR(footer) : footer;
            return this.$createElement('tfoot', [row]);
        },
        genActionsFooter: function genActionsFooter() {
            if (this.hideActions) {
                return null;
            }
            return this.$createElement('div', {
                'class': this.classes
            }, this.genActions());
        }
    }
});

/***/ }),

/***/ "./src/components/VDataTable/mixins/head.js":
/*!**************************************************!*\
  !*** ./src/components/VDataTable/mixins/head.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/console */ "./src/util/console.ts");
/* harmony import */ var _VCheckbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../VCheckbox */ "./src/components/VCheckbox/index.js");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VIcon */ "./src/components/VIcon/index.ts");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};



/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        sortIcon: {
            type: String,
            default: '$vuetify.icons.sort'
        }
    },
    methods: {
        genTHead: function genTHead() {
            var _this = this;
            if (this.hideHeaders) return; // Exit Early since no headers are needed.
            var children = [];
            if (this.$scopedSlots.headers) {
                var row = this.$scopedSlots.headers({
                    headers: this.headers,
                    indeterminate: this.indeterminate,
                    all: this.everyItem
                });
                children = [this.hasTag(row, 'th') ? this.genTR(row) : row, this.genTProgress()];
            } else {
                var row = this.headers.map(function (o, i) {
                    return _this.genHeader(o, _this.headerKey ? o[_this.headerKey] : i);
                });
                var checkbox = this.$createElement(_VCheckbox__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    props: {
                        dark: this.dark,
                        light: this.light,
                        color: this.selectAll === true ? '' : this.selectAll,
                        hideDetails: true,
                        inputValue: this.everyItem,
                        indeterminate: this.indeterminate
                    },
                    on: { change: this.toggle }
                });
                this.hasSelectAll && row.unshift(this.$createElement('th', [checkbox]));
                children = [this.genTR(row), this.genTProgress()];
            }
            return this.$createElement('thead', [children]);
        },
        genHeader: function genHeader(header, key) {
            var array = [this.$scopedSlots.headerCell ? this.$scopedSlots.headerCell({ header: header }) : header[this.headerText]];
            return this.$createElement.apply(this, __spread(['th'], this.genHeaderData(header, array, key)));
        },
        genHeaderData: function genHeaderData(header, children, key) {
            var classes = ['column'];
            var data = {
                key: key,
                attrs: {
                    role: 'columnheader',
                    scope: 'col',
                    width: header.width || null,
                    'aria-label': header[this.headerText] || '',
                    'aria-sort': 'none'
                }
            };
            if (header.sortable == null || header.sortable) {
                this.genHeaderSortingData(header, children, data, classes);
            } else {
                data.attrs['aria-label'] += ': Not sorted.'; // TODO: Localization
            }
            classes.push("text-xs-" + (header.align || 'left'));
            if (Array.isArray(header.class)) {
                classes.push.apply(classes, __spread(header.class));
            } else if (header.class) {
                classes.push(header.class);
            }
            data.class = classes;
            return [data, children];
        },
        genHeaderSortingData: function genHeaderSortingData(header, children, data, classes) {
            var _this = this;
            if (!('value' in header)) {
                Object(_util_console__WEBPACK_IMPORTED_MODULE_0__["consoleWarn"])('Headers must have a value property that corresponds to a value in the v-model array', this);
            }
            data.attrs.tabIndex = 0;
            data.on = {
                click: function click() {
                    _this.expanded = {};
                    _this.sort(header.value);
                },
                keydown: function keydown(e) {
                    // check for space
                    if (e.keyCode === 32) {
                        e.preventDefault();
                        _this.sort(header.value);
                    }
                }
            };
            classes.push('sortable');
            var icon = this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                props: {
                    small: true
                }
            }, this.sortIcon);
            if (!header.align || header.align === 'left') {
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

/***/ "./src/components/VDataTable/mixins/progress.js":
/*!******************************************************!*\
  !*** ./src/components/VDataTable/mixins/progress.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        genTProgress: function genTProgress() {
            var col = this.$createElement('th', {
                staticClass: 'column',
                attrs: {
                    colspan: this.headerColumns
                }
            }, [this.genProgress()]);
            return this.genTR([col], {
                staticClass: 'v-datatable__progress'
            });
        }
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/VDatePicker.js":
/*!***************************************************!*\
  !*** ./src/components/VDatePicker/VDatePicker.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VDatePickerTitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VDatePickerTitle */ "./src/components/VDatePicker/VDatePickerTitle.js");
/* harmony import */ var _VDatePickerHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VDatePickerHeader */ "./src/components/VDatePicker/VDatePickerHeader.js");
/* harmony import */ var _VDatePickerDateTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VDatePickerDateTable */ "./src/components/VDatePicker/VDatePickerDateTable.js");
/* harmony import */ var _VDatePickerMonthTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VDatePickerMonthTable */ "./src/components/VDatePicker/VDatePickerMonthTable.js");
/* harmony import */ var _VDatePickerYears__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VDatePickerYears */ "./src/components/VDatePicker/VDatePickerYears.js");
/* harmony import */ var _mixins_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/picker */ "./src/mixins/picker.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util */ "./src/components/VDatePicker/util/index.js");
/* harmony import */ var _util_isDateAllowed__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/isDateAllowed */ "./src/components/VDatePicker/util/isDateAllowed.js");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
// Components





// Mixins

// Utils



/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-date-picker',
    mixins: [_mixins_picker__WEBPACK_IMPORTED_MODULE_5__["default"]],
    props: {
        allowedDates: Function,
        // Function formatting the day in date picker table
        dayFormat: {
            type: Function,
            default: null
        },
        events: {
            type: [Array, Object, Function],
            default: function _default() {
                return null;
            }
        },
        eventColor: {
            type: [String, Function, Object],
            default: 'warning'
        },
        firstDayOfWeek: {
            type: [String, Number],
            default: 0
        },
        // Function formatting the tableDate in the day/month table header
        headerDateFormat: {
            type: Function,
            default: null
        },
        locale: {
            type: String,
            default: 'en-us'
        },
        max: String,
        min: String,
        // Function formatting month in the months table
        monthFormat: {
            type: Function,
            default: null
        },
        multiple: Boolean,
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next'
        },
        pickerDate: String,
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        reactive: Boolean,
        readonly: Boolean,
        scrollable: Boolean,
        showCurrent: {
            type: [Boolean, String],
            default: true
        },
        // Function formatting currently selected date in the picker title
        titleDateFormat: {
            type: Function,
            default: null
        },
        type: {
            type: String,
            default: 'date',
            validator: function validator(type) {
                return ['date', 'month'].includes(type);
            } // TODO: year
        },
        value: [Array, String],
        weekdayFormat: {
            type: Function,
            default: null
        },
        // Function formatting the year in table header and pickup title
        yearFormat: {
            type: Function,
            default: null
        },
        yearIcon: String
    },
    data: function data() {
        var _this = this;
        var now = new Date();
        return {
            activePicker: this.type.toUpperCase(),
            inputDay: null,
            inputMonth: null,
            inputYear: null,
            isReversing: false,
            now: now,
            // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
            tableDate: function () {
                if (_this.pickerDate) {
                    return _this.pickerDate;
                }
                var date = (_this.multiple ? _this.value[_this.value.length - 1] : _this.value) || now.getFullYear() + "-" + (now.getMonth() + 1);
                var type = _this.type === 'date' ? 'month' : 'year';
                return _this.sanitizeDateString(date, type);
            }()
        };
    },
    computed: {
        lastValue: function lastValue() {
            return this.multiple ? this.value[this.value.length - 1] : this.value;
        },
        selectedMonths: function selectedMonths() {
            if (!this.value || !this.value.length || this.type === 'month') {
                return this.value;
            } else if (this.multiple) {
                return this.value.map(function (val) {
                    return val.substr(0, 7);
                });
            } else {
                return this.value.substr(0, 7);
            }
        },
        current: function current() {
            if (this.showCurrent === true) {
                return this.sanitizeDateString(this.now.getFullYear() + "-" + (this.now.getMonth() + 1) + "-" + this.now.getDate(), this.type);
            }
            return this.showCurrent || null;
        },
        inputDate: function inputDate() {
            return this.type === 'date' ? this.inputYear + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_6__["pad"])(this.inputMonth + 1) + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_6__["pad"])(this.inputDay) : this.inputYear + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_6__["pad"])(this.inputMonth + 1);
        },
        tableMonth: function tableMonth() {
            return (this.pickerDate || this.tableDate).split('-')[1] - 1;
        },
        tableYear: function tableYear() {
            return (this.pickerDate || this.tableDate).split('-')[0] * 1;
        },
        minMonth: function minMonth() {
            return this.min ? this.sanitizeDateString(this.min, 'month') : null;
        },
        maxMonth: function maxMonth() {
            return this.max ? this.sanitizeDateString(this.max, 'month') : null;
        },
        minYear: function minYear() {
            return this.min ? this.sanitizeDateString(this.min, 'year') : null;
        },
        maxYear: function maxYear() {
            return this.max ? this.sanitizeDateString(this.max, 'year') : null;
        },
        formatters: function formatters() {
            return {
                year: this.yearFormat || Object(_util__WEBPACK_IMPORTED_MODULE_6__["createNativeLocaleFormatter"])(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
                titleDate: this.titleDateFormat || (this.multiple ? this.defaultTitleMultipleDateFormatter : this.defaultTitleDateFormatter)
            };
        },
        defaultTitleMultipleDateFormatter: function defaultTitleMultipleDateFormatter() {
            var _this = this;
            if (this.value.length < 2) {
                return function (dates) {
                    return dates.length ? _this.defaultTitleDateFormatter(dates[0]) : '0 selected';
                };
            }
            return function (dates) {
                return dates.length + " selected";
            };
        },
        defaultTitleDateFormatter: function defaultTitleDateFormatter() {
            var titleFormats = {
                year: { year: 'numeric', timeZone: 'UTC' },
                month: { month: 'long', timeZone: 'UTC' },
                date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }
            };
            var titleDateFormatter = Object(_util__WEBPACK_IMPORTED_MODULE_6__["createNativeLocaleFormatter"])(this.locale, titleFormats[this.type], {
                start: 0,
                length: { date: 10, month: 7, year: 4 }[this.type]
            });
            var landscapeFormatter = function landscapeFormatter(date) {
                return titleDateFormatter(date).replace(/([^\d\s])([\d])/g, function (match, nonDigit, digit) {
                    return nonDigit + " " + digit;
                }).replace(', ', ',<br>');
            };
            return this.landscape ? landscapeFormatter : titleDateFormatter;
        }
    },
    watch: {
        tableDate: function tableDate(val, prev) {
            // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
            // compare for example '2000-9' and '2000-10'
            var sanitizeType = this.type === 'month' ? 'year' : 'month';
            this.isReversing = this.sanitizeDateString(val, sanitizeType) < this.sanitizeDateString(prev, sanitizeType);
            this.$emit('update:pickerDate', val);
        },
        pickerDate: function pickerDate(val) {
            if (val) {
                this.tableDate = val;
            } else if (this.lastValue && this.type === 'date') {
                this.tableDate = this.sanitizeDateString(this.lastValue, 'month');
            } else if (this.lastValue && this.type === 'month') {
                this.tableDate = this.sanitizeDateString(this.lastValue, 'year');
            }
        },
        value: function value(newValue, oldValue) {
            this.checkMultipleProp();
            this.setInputDate();
            if (!this.multiple && this.value && !this.pickerDate) {
                this.tableDate = this.sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month');
            } else if (this.multiple && this.value.length && !oldValue.length && !this.pickerDate) {
                this.tableDate = this.sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month');
            }
        },
        type: function type(_type) {
            var _this = this;
            this.activePicker = _type.toUpperCase();
            if (this.value && this.value.length) {
                var output = (this.multiple ? this.value : [this.value]).map(function (val) {
                    return _this.sanitizeDateString(val, _type);
                }).filter(this.isDateAllowed);
                this.$emit('input', this.multiple ? output : output[0]);
            }
        }
    },
    created: function created() {
        this.checkMultipleProp();
        if (this.pickerDate !== this.tableDate) {
            this.$emit('update:pickerDate', this.tableDate);
        }
        this.setInputDate();
    },
    methods: {
        emitInput: function emitInput(newInput) {
            var output = this.multiple ? this.value.indexOf(newInput) === -1 ? this.value.concat([newInput]) : this.value.filter(function (x) {
                return x !== newInput;
            }) : newInput;
            this.$emit('input', output);
            this.multiple || this.$emit('change', newInput);
        },
        checkMultipleProp: function checkMultipleProp() {
            if (this.value == null) return;
            var valueType = this.value.constructor.name;
            var expected = this.multiple ? 'Array' : 'String';
            if (valueType !== expected) {
                Object(_util_console__WEBPACK_IMPORTED_MODULE_8__["consoleWarn"])("Value must be " + (this.multiple ? 'an' : 'a') + " " + expected + ", got " + valueType, this);
            }
        },
        isDateAllowed: function isDateAllowed(value) {
            return Object(_util_isDateAllowed__WEBPACK_IMPORTED_MODULE_7__["default"])(value, this.min, this.max, this.allowedDates);
        },
        yearClick: function yearClick(value) {
            this.inputYear = value;
            if (this.type === 'month') {
                this.tableDate = "" + value;
            } else {
                this.tableDate = value + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_6__["pad"])(this.tableMonth + 1);
            }
            this.activePicker = 'MONTH';
            this.reactive && !this.multiple && this.isDateAllowed(this.inputDate) && this.$emit('input', this.inputDate);
        },
        monthClick: function monthClick(value) {
            this.inputYear = parseInt(value.split('-')[0], 10);
            this.inputMonth = parseInt(value.split('-')[1], 10) - 1;
            if (this.type === 'date') {
                this.tableDate = value;
                this.activePicker = 'DATE';
                this.reactive && !this.multiple && this.isDateAllowed(this.inputDate) && this.$emit('input', this.inputDate);
            } else {
                this.emitInput(this.inputDate);
            }
        },
        dateClick: function dateClick(value) {
            this.inputYear = parseInt(value.split('-')[0], 10);
            this.inputMonth = parseInt(value.split('-')[1], 10) - 1;
            this.inputDay = parseInt(value.split('-')[2], 10);
            this.emitInput(this.inputDate);
        },
        genPickerTitle: function genPickerTitle() {
            var _this = this;
            return this.$createElement(_VDatePickerTitle__WEBPACK_IMPORTED_MODULE_0__["default"], {
                props: {
                    date: this.value ? this.formatters.titleDate(this.value) : '',
                    selectingYear: this.activePicker === 'YEAR',
                    year: this.formatters.year("" + this.inputYear),
                    yearIcon: this.yearIcon,
                    value: this.multiple ? this.value[0] : this.value
                },
                slot: 'title',
                style: this.readonly ? {
                    'pointer-events': 'none'
                } : undefined,
                on: {
                    'update:selectingYear': function updateSelectingYear(value) {
                        return _this.activePicker = value ? 'YEAR' : _this.type.toUpperCase();
                    }
                }
            });
        },
        genTableHeader: function genTableHeader() {
            var _this = this;
            return this.$createElement(_VDatePickerHeader__WEBPACK_IMPORTED_MODULE_1__["default"], {
                props: {
                    nextIcon: this.nextIcon,
                    color: this.color,
                    dark: this.dark,
                    disabled: this.readonly,
                    format: this.headerDateFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.activePicker === 'DATE' ? this.minMonth : this.minYear,
                    max: this.activePicker === 'DATE' ? this.maxMonth : this.maxYear,
                    prevIcon: this.prevIcon,
                    value: this.activePicker === 'DATE' ? this.tableYear + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_6__["pad"])(this.tableMonth + 1) : "" + this.tableYear
                },
                on: {
                    toggle: function toggle() {
                        return _this.activePicker = _this.activePicker === 'DATE' ? 'MONTH' : 'YEAR';
                    },
                    input: function input(value) {
                        return _this.tableDate = value;
                    }
                }
            });
        },
        genDateTable: function genDateTable() {
            var _this = this;
            return this.$createElement(_VDatePickerDateTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
                props: {
                    allowedDates: this.allowedDates,
                    color: this.color,
                    current: this.current,
                    dark: this.dark,
                    disabled: this.readonly,
                    events: this.events,
                    eventColor: this.eventColor,
                    firstDayOfWeek: this.firstDayOfWeek,
                    format: this.dayFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.min,
                    max: this.max,
                    tableDate: this.tableYear + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_6__["pad"])(this.tableMonth + 1),
                    scrollable: this.scrollable,
                    value: this.value,
                    weekdayFormat: this.weekdayFormat
                },
                ref: 'table',
                on: {
                    input: this.dateClick,
                    tableDate: function tableDate(value) {
                        return _this.tableDate = value;
                    }
                }
            });
        },
        genMonthTable: function genMonthTable() {
            var _this = this;
            return this.$createElement(_VDatePickerMonthTable__WEBPACK_IMPORTED_MODULE_3__["default"], {
                props: {
                    allowedDates: this.type === 'month' ? this.allowedDates : null,
                    color: this.color,
                    current: this.current ? this.sanitizeDateString(this.current, 'month') : null,
                    dark: this.dark,
                    disabled: this.readonly,
                    format: this.monthFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.minMonth,
                    max: this.maxMonth,
                    scrollable: this.scrollable,
                    value: this.selectedMonths,
                    tableDate: "" + this.tableYear
                },
                ref: 'table',
                on: {
                    input: this.monthClick,
                    tableDate: function tableDate(value) {
                        return _this.tableDate = value;
                    }
                }
            });
        },
        genYears: function genYears() {
            return this.$createElement(_VDatePickerYears__WEBPACK_IMPORTED_MODULE_4__["default"], {
                props: {
                    color: this.color,
                    format: this.yearFormat,
                    locale: this.locale,
                    min: this.minYear,
                    max: this.maxYear,
                    value: "" + this.tableYear
                },
                on: {
                    input: this.yearClick
                }
            });
        },
        genPickerBody: function genPickerBody() {
            var children = this.activePicker === 'YEAR' ? [this.genYears()] : [this.genTableHeader(), this.activePicker === 'DATE' ? this.genDateTable() : this.genMonthTable()];
            return this.$createElement('div', {
                key: this.activePicker,
                style: this.readonly ? {
                    'pointer-events': 'none'
                } : undefined
            }, children);
        },
        // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
        // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
        sanitizeDateString: function sanitizeDateString(dateString, type) {
            var _a = __read(dateString.split('-'), 3),
                year = _a[0],
                _b = _a[1],
                month = _b === void 0 ? 1 : _b,
                _c = _a[2],
                date = _c === void 0 ? 1 : _c;
            return (year + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_6__["pad"])(month) + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_6__["pad"])(date)).substr(0, { date: 10, month: 7, year: 4 }[type]);
        },
        setInputDate: function setInputDate() {
            if (this.lastValue) {
                var array = this.lastValue.split('-');
                this.inputYear = parseInt(array[0], 10);
                this.inputMonth = parseInt(array[1], 10) - 1;
                if (this.type === 'date') {
                    this.inputDay = parseInt(array[2], 10);
                }
            } else {
                this.inputYear = this.inputYear || this.now.getFullYear();
                this.inputMonth = this.inputMonth == null ? this.inputMonth : this.now.getMonth();
                this.inputDay = this.inputDay || this.now.getDate();
            }
        }
    },
    render: function render() {
        return this.genPicker('v-picker--date');
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/VDatePickerDateTable.js":
/*!************************************************************!*\
  !*** ./src/components/VDatePicker/VDatePickerDateTable.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_date_picker_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/date-picker-table */ "./src/components/VDatePicker/mixins/date-picker-table.js");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/components/VDatePicker/util/index.js");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
// Mixins



// Utils


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-date-picker-date-table',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_0__["default"], _mixins_date_picker_table__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        events: {
            type: [Array, Object, Function],
            default: function _default() {
                return null;
            }
        },
        eventColor: {
            type: [String, Function, Object],
            default: 'warning'
        },
        firstDayOfWeek: {
            type: [String, Number],
            default: 0
        },
        weekdayFormat: {
            type: Function,
            default: null
        }
    },
    computed: {
        formatter: function formatter() {
            return this.format || Object(_util__WEBPACK_IMPORTED_MODULE_3__["createNativeLocaleFormatter"])(this.locale, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 });
        },
        weekdayFormatter: function weekdayFormatter() {
            return this.weekdayFormat || Object(_util__WEBPACK_IMPORTED_MODULE_3__["createNativeLocaleFormatter"])(this.locale, { weekday: 'narrow', timeZone: 'UTC' });
        },
        weekDays: function weekDays() {
            var _this = this;
            var first = parseInt(this.firstDayOfWeek, 10);
            return this.weekdayFormatter ? Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["createRange"])(7).map(function (i) {
                return _this.weekdayFormatter("2017-01-" + (first + i + 15));
            }) // 2017-01-15 is Sunday
            : Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["createRange"])(7).map(function (i) {
                return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7];
            });
        }
    },
    methods: {
        calculateTableDate: function calculateTableDate(delta) {
            return Object(_util__WEBPACK_IMPORTED_MODULE_3__["monthChange"])(this.tableDate, Math.sign(delta || 1));
        },
        genTHead: function genTHead() {
            var _this = this;
            var days = this.weekDays.map(function (day) {
                return _this.$createElement('th', day);
            });
            return this.$createElement('thead', this.genTR(days));
        },
        genEvent: function genEvent(date) {
            var eventColor;
            if (typeof this.eventColor === 'string') {
                eventColor = this.eventColor;
            } else if (typeof this.eventColor === 'function') {
                eventColor = this.eventColor(date);
            } else {
                eventColor = this.eventColor[date];
            }
            return this.$createElement('div', this.setBackgroundColor(eventColor || this.color || 'accent', {
                staticClass: 'v-date-picker-table__event'
            }));
        },
        // Returns number of the days from the firstDayOfWeek to the first day of the current month
        weekDaysBeforeFirstDayOfTheMonth: function weekDaysBeforeFirstDayOfTheMonth() {
            var firstDayOfTheMonth = new Date(this.displayedYear + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_3__["pad"])(this.displayedMonth + 1) + "-01T00:00:00+00:00");
            var weekDay = firstDayOfTheMonth.getUTCDay();
            return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7;
        },
        isEvent: function isEvent(date) {
            if (Array.isArray(this.events)) {
                return this.events.indexOf(date) > -1;
            } else if (this.events instanceof Function) {
                return this.events(date);
            } else {
                return false;
            }
        },
        genTBody: function genTBody() {
            var children = [];
            var daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate();
            var rows = [];
            var day = this.weekDaysBeforeFirstDayOfTheMonth();
            while (day--) {
                rows.push(this.$createElement('td'));
            }for (day = 1; day <= daysInMonth; day++) {
                var date = this.displayedYear + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_3__["pad"])(this.displayedMonth + 1) + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_3__["pad"])(day);
                rows.push(this.$createElement('td', [this.genButton(date, true), this.isEvent(date) ? this.genEvent(date) : null]));
                if (rows.length % 7 === 0) {
                    children.push(this.genTR(rows));
                    rows = [];
                }
            }
            if (rows.length) {
                children.push(this.genTR(rows));
            }
            return this.$createElement('tbody', children);
        },
        genTR: function genTR(children) {
            return [this.$createElement('tr', children)];
        }
    },
    render: function render() {
        return this.genTable('v-date-picker-table v-date-picker-table--date', [this.genTHead(), this.genTBody()]);
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/VDatePickerHeader.js":
/*!*********************************************************!*\
  !*** ./src/components/VDatePicker/VDatePickerHeader.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_date_picker_header_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_date-picker-header.styl */ "./src/stylus/components/_date-picker-header.styl");
/* harmony import */ var _stylus_components_date_picker_header_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_date_picker_header_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VBtn */ "./src/components/VBtn/index.ts");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./src/components/VDatePicker/util/index.js");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};

// Components


// Mixins


// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-date-picker-header',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_4__["default"]],
    props: {
        disabled: Boolean,
        format: {
            type: Function,
            default: null
        },
        locale: {
            type: String,
            default: 'en-us'
        },
        min: String,
        max: String,
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        value: {
            type: [Number, String],
            required: true
        }
    },
    data: function data() {
        return {
            isReversing: false
        };
    },
    computed: {
        formatter: function formatter() {
            if (this.format) {
                return this.format;
            } else if (String(this.value).split('-')[1]) {
                return Object(_util__WEBPACK_IMPORTED_MODULE_5__["createNativeLocaleFormatter"])(this.locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }, { length: 7 });
            } else {
                return Object(_util__WEBPACK_IMPORTED_MODULE_5__["createNativeLocaleFormatter"])(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
            }
        }
    },
    watch: {
        value: function value(newVal, oldVal) {
            this.isReversing = newVal < oldVal;
        }
    },
    methods: {
        genBtn: function genBtn(change) {
            var _this = this;
            var disabled = this.disabled || change < 0 && this.min && this.calculateChange(change) < this.min || change > 0 && this.max && this.calculateChange(change) > this.max;
            return this.$createElement(_VBtn__WEBPACK_IMPORTED_MODULE_1__["default"], {
                props: {
                    dark: this.dark,
                    disabled: disabled,
                    icon: true,
                    light: this.light
                },
                nativeOn: {
                    click: function click(e) {
                        e.stopPropagation();
                        _this.$emit('input', _this.calculateChange(change));
                    }
                }
            }, [this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_2__["default"], change < 0 === !this.$vuetify.rtl ? this.prevIcon : this.nextIcon)]);
        },
        calculateChange: function calculateChange(sign) {
            var _a = __read(String(this.value).split('-').map(function (v) {
                return 1 * v;
            }), 2),
                year = _a[0],
                month = _a[1];
            if (month == null) {
                return "" + (year + sign);
            } else {
                return Object(_util__WEBPACK_IMPORTED_MODULE_5__["monthChange"])(String(this.value), sign);
            }
        },
        genHeader: function genHeader() {
            var _this = this;
            var color = !this.disabled && (this.color || 'accent');
            var header = this.$createElement('strong', this.setTextColor(color, {
                key: String(this.value),
                on: {
                    click: function click() {
                        return _this.$emit('toggle');
                    }
                }
            }), [this.$slots.default || this.formatter(String(this.value))]);
            var transition = this.$createElement('transition', {
                props: {
                    name: this.isReversing === !this.$vuetify.rtl ? 'tab-reverse-transition' : 'tab-transition'
                }
            }, [header]);
            return this.$createElement('div', {
                staticClass: 'v-date-picker-header__value',
                class: {
                    'v-date-picker-header__value--disabled': this.disabled
                }
            }, [transition]);
        }
    },
    render: function render() {
        return this.$createElement('div', {
            staticClass: 'v-date-picker-header',
            class: this.themeClasses
        }, [this.genBtn(-1), this.genHeader(), this.genBtn(+1)]);
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/VDatePickerMonthTable.js":
/*!*************************************************************!*\
  !*** ./src/components/VDatePicker/VDatePickerMonthTable.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_date_picker_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/date-picker-table */ "./src/components/VDatePicker/mixins/date-picker-table.js");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./src/components/VDatePicker/util/index.js");
// Mixins



// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-date-picker-month-table',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_0__["default"], _mixins_date_picker_table__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    computed: {
        formatter: function formatter() {
            return this.format || Object(_util__WEBPACK_IMPORTED_MODULE_3__["createNativeLocaleFormatter"])(this.locale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 });
        }
    },
    methods: {
        calculateTableDate: function calculateTableDate(delta) {
            return "" + (parseInt(this.tableDate, 10) + Math.sign(delta || 1));
        },
        genTBody: function genTBody() {
            var _this = this;
            var children = [];
            var cols = Array(3).fill(null);
            var rows = 12 / cols.length;
            var _loop_1 = function _loop_1(row) {
                var tds = cols.map(function (_, col) {
                    var month = row * cols.length + col;
                    return _this.$createElement('td', {
                        key: month
                    }, [_this.genButton(_this.displayedYear + "-" + Object(_util__WEBPACK_IMPORTED_MODULE_3__["pad"])(month + 1), false)]);
                });
                children.push(this_1.$createElement('tr', {
                    key: row
                }, tds));
            };
            var this_1 = this;
            for (var row = 0; row < rows; row++) {
                _loop_1(row);
            }
            return this.$createElement('tbody', children);
        }
    },
    render: function render() {
        return this.genTable('v-date-picker-table v-date-picker-table--month', [this.genTBody()]);
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/VDatePickerTitle.js":
/*!********************************************************!*\
  !*** ./src/components/VDatePicker/VDatePickerTitle.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_date_picker_title_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_date-picker-title.styl */ "./src/stylus/components/_date-picker-title.styl");
/* harmony import */ var _stylus_components_date_picker_title_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_date_picker_title_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_picker_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/picker-button */ "./src/mixins/picker-button.js");

// Components

// Mixins

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-date-picker-title',
    mixins: [_mixins_picker_button__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        date: {
            type: String,
            default: ''
        },
        selectingYear: Boolean,
        year: {
            type: [Number, String],
            default: ''
        },
        yearIcon: {
            type: String
        },
        value: {
            type: String
        }
    },
    data: function data() {
        return {
            isReversing: false
        };
    },
    computed: {
        computedTransition: function computedTransition() {
            return this.isReversing ? 'picker-reverse-transition' : 'picker-transition';
        }
    },
    watch: {
        value: function value(val, prev) {
            this.isReversing = val < prev;
        }
    },
    methods: {
        genYearIcon: function genYearIcon() {
            return this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
                props: {
                    dark: true
                }
            }, this.yearIcon);
        },
        getYearBtn: function getYearBtn() {
            return this.genPickerButton('selectingYear', true, [this.year, this.yearIcon ? this.genYearIcon() : null], false, 'v-date-picker-title__year');
        },
        genTitleText: function genTitleText() {
            return this.$createElement('transition', {
                props: {
                    name: this.computedTransition
                }
            }, [this.$createElement('div', {
                domProps: { innerHTML: this.date || '&nbsp;' },
                key: this.value
            })]);
        },
        genTitleDate: function genTitleDate(title) {
            return this.genPickerButton('selectingYear', false, this.genTitleText(title), false, 'v-date-picker-title__date');
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-date-picker-title'
        }, [this.getYearBtn(), this.genTitleDate()]);
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/VDatePickerYears.js":
/*!********************************************************!*\
  !*** ./src/components/VDatePicker/VDatePickerYears.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_date_picker_years_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_date-picker-years.styl */ "./src/stylus/components/_date-picker-years.styl");
/* harmony import */ var _stylus_components_date_picker_years_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_date_picker_years_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/components/VDatePicker/util/index.js");

// Mixins

// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-date-picker-years',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"]],
    props: {
        format: {
            type: Function,
            default: null
        },
        locale: {
            type: String,
            default: 'en-us'
        },
        min: [Number, String],
        max: [Number, String],
        value: [Number, String]
    },
    data: function data() {
        return {
            defaultColor: 'primary'
        };
    },
    computed: {
        formatter: function formatter() {
            return this.format || Object(_util__WEBPACK_IMPORTED_MODULE_2__["createNativeLocaleFormatter"])(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
        }
    },
    mounted: function mounted() {
        var activeItem = this.$el.getElementsByClassName('active')[0];
        if (activeItem) {
            this.$el.scrollTop = activeItem.offsetTop - this.$el.offsetHeight / 2 + activeItem.offsetHeight / 2;
        } else {
            this.$el.scrollTop = this.$el.scrollHeight / 2 - this.$el.offsetHeight / 2;
        }
    },
    methods: {
        genYearItem: function genYearItem(year) {
            var _this = this;
            var formatted = this.formatter("" + year);
            var active = parseInt(this.value, 10) === year;
            var color = active && (this.color || 'primary');
            return this.$createElement('li', this.setTextColor(color, {
                key: year,
                'class': { active: active },
                on: {
                    click: function click() {
                        return _this.$emit('input', year);
                    }
                }
            }), formatted);
        },
        genYearItems: function genYearItems() {
            var children = [];
            var selectedYear = this.value ? parseInt(this.value, 10) : new Date().getFullYear();
            var maxYear = this.max ? parseInt(this.max, 10) : selectedYear + 100;
            var minYear = Math.min(maxYear, this.min ? parseInt(this.min, 10) : selectedYear - 100);
            for (var year = maxYear; year >= minYear; year--) {
                children.push(this.genYearItem(year));
            }
            return children;
        }
    },
    render: function render() {
        return this.$createElement('ul', {
            staticClass: 'v-date-picker-years',
            ref: 'years'
        }, this.genYearItems());
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/index.js":
/*!*********************************************!*\
  !*** ./src/components/VDatePicker/index.js ***!
  \*********************************************/
/*! exports provided: VDatePicker, VDatePickerTitle, VDatePickerHeader, VDatePickerDateTable, VDatePickerMonthTable, VDatePickerYears, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VDatePicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VDatePicker */ "./src/components/VDatePicker/VDatePicker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePicker", function() { return _VDatePicker__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VDatePickerTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VDatePickerTitle */ "./src/components/VDatePicker/VDatePickerTitle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerTitle", function() { return _VDatePickerTitle__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _VDatePickerHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VDatePickerHeader */ "./src/components/VDatePicker/VDatePickerHeader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerHeader", function() { return _VDatePickerHeader__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _VDatePickerDateTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VDatePickerDateTable */ "./src/components/VDatePicker/VDatePickerDateTable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerDateTable", function() { return _VDatePickerDateTable__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _VDatePickerMonthTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VDatePickerMonthTable */ "./src/components/VDatePicker/VDatePickerMonthTable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerMonthTable", function() { return _VDatePickerMonthTable__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _VDatePickerYears__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VDatePickerYears */ "./src/components/VDatePicker/VDatePickerYears.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerYears", function() { return _VDatePickerYears__WEBPACK_IMPORTED_MODULE_5__["default"]; });








/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VDatePicker: _VDatePicker__WEBPACK_IMPORTED_MODULE_0__["default"],
        VDatePickerTitle: _VDatePickerTitle__WEBPACK_IMPORTED_MODULE_1__["default"],
        VDatePickerHeader: _VDatePickerHeader__WEBPACK_IMPORTED_MODULE_2__["default"],
        VDatePickerDateTable: _VDatePickerDateTable__WEBPACK_IMPORTED_MODULE_3__["default"],
        VDatePickerMonthTable: _VDatePickerMonthTable__WEBPACK_IMPORTED_MODULE_4__["default"],
        VDatePickerYears: _VDatePickerYears__WEBPACK_IMPORTED_MODULE_5__["default"]
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/mixins/date-picker-table.js":
/*!****************************************************************!*\
  !*** ./src/components/VDatePicker/mixins/date-picker-table.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_date_picker_table_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../stylus/components/_date-picker-table.styl */ "./src/stylus/components/_date-picker-table.styl");
/* harmony import */ var _stylus_components_date_picker_table_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_date_picker_table_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _directives_touch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../directives/touch */ "./src/directives/touch.ts");
/* harmony import */ var _util_isDateAllowed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .././util/isDateAllowed */ "./src/components/VDatePicker/util/isDateAllowed.js");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// Directives

// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    directives: { Touch: _directives_touch__WEBPACK_IMPORTED_MODULE_1__["default"] },
    props: {
        allowedDates: Function,
        current: String,
        disabled: Boolean,
        format: {
            type: Function,
            default: null
        },
        locale: {
            type: String,
            default: 'en-us'
        },
        min: String,
        max: String,
        scrollable: Boolean,
        tableDate: {
            type: String,
            required: true
        },
        value: [String, Array]
    },
    data: function data() {
        return {
            isReversing: false
        };
    },
    computed: {
        computedTransition: function computedTransition() {
            return this.isReversing === !this.$vuetify.rtl ? 'tab-reverse-transition' : 'tab-transition';
        },
        displayedMonth: function displayedMonth() {
            return this.tableDate.split('-')[1] - 1;
        },
        displayedYear: function displayedYear() {
            return this.tableDate.split('-')[0] * 1;
        }
    },
    watch: {
        tableDate: function tableDate(newVal, oldVal) {
            this.isReversing = newVal < oldVal;
        }
    },
    methods: {
        genButtonClasses: function genButtonClasses(isAllowed, isFloating, isSelected, isCurrent) {
            return __assign({ 'v-btn--active': isSelected, 'v-btn--flat': !isSelected, 'v-btn--icon': isSelected && isAllowed && isFloating, 'v-btn--floating': isFloating, 'v-btn--depressed': !isFloating && isSelected, 'v-btn--disabled': !isAllowed || this.disabled && isSelected, 'v-btn--outline': isCurrent && !isSelected }, this.themeClasses);
        },
        genButton: function genButton(value, isFloating) {
            var _this = this;
            var isAllowed = Object(_util_isDateAllowed__WEBPACK_IMPORTED_MODULE_2__["default"])(value, this.min, this.max, this.allowedDates);
            var isSelected = value === this.value || Array.isArray(this.value) && this.value.indexOf(value) !== -1;
            var isCurrent = value === this.current;
            var setColor = isSelected ? this.setBackgroundColor : this.setTextColor;
            var color = (isSelected || isCurrent) && (this.color || 'accent');
            return this.$createElement('button', setColor(color, {
                staticClass: 'v-btn',
                'class': this.genButtonClasses(isAllowed, isFloating, isSelected, isCurrent),
                attrs: {
                    type: 'button'
                },
                domProps: {
                    disabled: !isAllowed,
                    innerHTML: "<div class=\"v-btn__content\">" + this.formatter(value) + "</div>"
                },
                on: this.disabled || !isAllowed ? {} : {
                    click: function click() {
                        return _this.$emit('input', value);
                    }
                }
            }));
        },
        wheel: function wheel(e) {
            e.preventDefault();
            this.$emit('tableDate', this.calculateTableDate(e.deltaY));
        },
        touch: function touch(value) {
            this.$emit('tableDate', this.calculateTableDate(value));
        },
        genTable: function genTable(staticClass, children) {
            var _this = this;
            var transition = this.$createElement('transition', {
                props: { name: this.computedTransition }
            }, [this.$createElement('table', { key: this.tableDate }, children)]);
            var touchDirective = {
                name: 'touch',
                value: {
                    left: function left(e) {
                        return e.offsetX < -15 && _this.touch(1);
                    },
                    right: function right(e) {
                        return e.offsetX > 15 && _this.touch(-1);
                    }
                }
            };
            return this.$createElement('div', {
                staticClass: staticClass,
                class: this.themeClasses,
                on: this.scrollable ? { wheel: this.wheel } : undefined,
                directives: [touchDirective]
            }, [transition]);
        }
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/util/createNativeLocaleFormatter.js":
/*!************************************************************************!*\
  !*** ./src/components/VDatePicker/util/createNativeLocaleFormatter.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pad */ "./src/components/VDatePicker/util/pad.js");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};

/* harmony default export */ __webpack_exports__["default"] = (function (locale, options, _a) {
    var _b = _a === void 0 ? { start: 0, length: 0 } : _a,
        start = _b.start,
        length = _b.length;
    var makeIsoString = function makeIsoString(dateString) {
        var _a = __read(dateString.trim().split(' ')[0].split('-'), 3),
            year = _a[0],
            month = _a[1],
            date = _a[2];
        return [year, Object(_pad__WEBPACK_IMPORTED_MODULE_0__["default"])(month || 1), Object(_pad__WEBPACK_IMPORTED_MODULE_0__["default"])(date || 1)].join('-');
    };
    try {
        var intlFormatter_1 = new Intl.DateTimeFormat(locale || undefined, options);
        return function (dateString) {
            return intlFormatter_1.format(new Date(makeIsoString(dateString) + "T00:00:00+00:00"));
        };
    } catch (e) {
        return start || length ? function (dateString) {
            return makeIsoString(dateString).substr(start, length);
        } : null;
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/util/index.js":
/*!**************************************************!*\
  !*** ./src/components/VDatePicker/util/index.js ***!
  \**************************************************/
/*! exports provided: createNativeLocaleFormatter, monthChange, pad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createNativeLocaleFormatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createNativeLocaleFormatter */ "./src/components/VDatePicker/util/createNativeLocaleFormatter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createNativeLocaleFormatter", function() { return _createNativeLocaleFormatter__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _monthChange__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monthChange */ "./src/components/VDatePicker/util/monthChange.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "monthChange", function() { return _monthChange__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _pad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pad */ "./src/components/VDatePicker/util/pad.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pad", function() { return _pad__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./src/components/VDatePicker/util/isDateAllowed.js":
/*!**********************************************************!*\
  !*** ./src/components/VDatePicker/util/isDateAllowed.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isDateAllowed; });
function isDateAllowed(date, min, max, allowedFn) {
    return (!allowedFn || allowedFn(date)) && (!min || date >= min) && (!max || date <= max);
}

/***/ }),

/***/ "./src/components/VDatePicker/util/monthChange.js":
/*!********************************************************!*\
  !*** ./src/components/VDatePicker/util/monthChange.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pad__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pad */ "./src/components/VDatePicker/util/pad.js");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};

/**
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 */
/* harmony default export */ __webpack_exports__["default"] = (function (value, sign) {
    var _a = __read(value.split('-').map(function (v) {
        return 1 * v;
    }), 2),
        year = _a[0],
        month = _a[1];
    if (month + sign === 0) {
        return year - 1 + "-12";
    } else if (month + sign === 13) {
        return year + 1 + "-01";
    } else {
        return year + "-" + Object(_pad__WEBPACK_IMPORTED_MODULE_0__["default"])(month + sign);
    }
});

/***/ }),

/***/ "./src/components/VDatePicker/util/pad.js":
/*!************************************************!*\
  !*** ./src/components/VDatePicker/util/pad.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var padStart = function padStart(string, targetLength, padString) {
    targetLength = targetLength >> 0;
    string = String(string);
    padString = String(padString);
    if (string.length > targetLength) {
        return String(string);
    }
    targetLength = targetLength - string.length;
    if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(string);
};
/* harmony default export */ __webpack_exports__["default"] = (function (n, length) {
    if (length === void 0) {
        length = 2;
    }
    return padStart(n, length, '0');
});

/***/ }),

/***/ "./src/components/VDialog/VDialog.js":
/*!*******************************************!*\
  !*** ./src/components/VDialog/VDialog.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_dialogs_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_dialogs.styl */ "./src/stylus/components/_dialogs.styl");
/* harmony import */ var _stylus_components_dialogs_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_dialogs_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/dependent */ "./src/mixins/dependent.ts");
/* harmony import */ var _mixins_detachable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/detachable */ "./src/mixins/detachable.js");
/* harmony import */ var _mixins_overlayable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/overlayable */ "./src/mixins/overlayable.js");
/* harmony import */ var _mixins_returnable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/returnable */ "./src/mixins/returnable.ts");
/* harmony import */ var _mixins_stackable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/stackable */ "./src/mixins/stackable.js");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../directives/click-outside */ "./src/directives/click-outside.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_ThemeProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/ThemeProvider */ "./src/util/ThemeProvider.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// Mixins






// Directives

// Helpers


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-dialog',
    directives: {
        ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_7__["default"]
    },
    mixins: [_mixins_dependent__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_detachable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_overlayable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_returnable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_stackable__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_6__["default"]],
    props: {
        disabled: Boolean,
        persistent: Boolean,
        fullscreen: Boolean,
        fullWidth: Boolean,
        noClickAnimation: Boolean,
        light: Boolean,
        dark: Boolean,
        maxWidth: {
            type: [String, Number],
            default: 'none'
        },
        origin: {
            type: String,
            default: 'center center'
        },
        width: {
            type: [String, Number],
            default: 'auto'
        },
        scrollable: Boolean,
        transition: {
            type: [String, Boolean],
            default: 'dialog-transition'
        }
    },
    data: function data() {
        return {
            animate: false,
            animateTimeout: null,
            stackClass: 'v-dialog__content--active',
            stackMinZIndex: 200
        };
    },
    computed: {
        classes: function classes() {
            var _a;
            return _a = {}, _a[("v-dialog " + this.contentClass).trim()] = true, _a['v-dialog--active'] = this.isActive, _a['v-dialog--persistent'] = this.persistent, _a['v-dialog--fullscreen'] = this.fullscreen, _a['v-dialog--scrollable'] = this.scrollable, _a['v-dialog--animated'] = this.animate, _a;
        },
        contentClasses: function contentClasses() {
            return {
                'v-dialog__content': true,
                'v-dialog__content--active': this.isActive
            };
        }
    },
    watch: {
        isActive: function isActive(val) {
            if (val) {
                this.show();
            } else {
                this.removeOverlay();
                this.unbind();
            }
        },
        fullscreen: function fullscreen(val) {
            if (val) this.hideScroll();else this.showScroll();
        }
    },
    mounted: function mounted() {
        this.isBooted = this.isActive;
        this.isActive && this.show();
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window !== 'undefined') this.unbind();
    },
    methods: {
        animateClick: function animateClick() {
            var _this = this;
            this.animate = false;
            // Needed for when clicking very fast
            // outside of the dialog
            this.$nextTick(function () {
                _this.animate = true;
                clearTimeout(_this.animateTimeout);
                _this.animateTimeout = setTimeout(function () {
                    return _this.animate = false;
                }, 150);
            });
        },
        closeConditional: function closeConditional(e) {
            // If the dialog content contains
            // the click event, or if the
            // dialog is not active
            if (this.$refs.content.contains(e.target) || !this.isActive) return false;
            // If we made it here, the click is outside
            // and is active. If persistent, and the
            // click is on the overlay, animate
            if (this.persistent) {
                if (!this.noClickAnimation && this.overlay === e.target) this.animateClick();
                return false;
            }
            // close dialog if !persistent, clicked outside and we're the topmost dialog.
            // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
            return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_8__["getZIndex"])(this.$refs.content) >= this.getMaxZIndex();
        },
        hideScroll: function hideScroll() {
            if (this.fullscreen) {
                document.documentElement.classList.add('overflow-y-hidden');
            } else {
                _mixins_overlayable__WEBPACK_IMPORTED_MODULE_3__["default"].methods.hideScroll.call(this);
            }
        },
        show: function show() {
            !this.fullscreen && !this.hideOverlay && this.genOverlay();
            this.fullscreen && this.hideScroll();
            this.$refs.content.focus();
            this.$listeners.keydown && this.bind();
        },
        bind: function bind() {
            window.addEventListener('keydown', this.onKeydown);
        },
        unbind: function unbind() {
            window.removeEventListener('keydown', this.onKeydown);
        },
        onKeydown: function onKeydown(e) {
            this.$emit('keydown', e);
        }
    },
    render: function render(h) {
        var _this = this;
        var children = [];
        var data = {
            'class': this.classes,
            ref: 'dialog',
            directives: [{
                name: 'click-outside',
                value: function value() {
                    return _this.isActive = false;
                },
                args: {
                    closeConditional: this.closeConditional,
                    include: this.getOpenDependentElements
                }
            }, { name: 'show', value: this.isActive }],
            on: {
                click: function click(e) {
                    e.stopPropagation();
                }
            }
        };
        if (!this.fullscreen) {
            data.style = {
                maxWidth: this.maxWidth === 'none' ? undefined : Object(_util_helpers__WEBPACK_IMPORTED_MODULE_8__["convertToUnit"])(this.maxWidth),
                width: this.width === 'auto' ? undefined : Object(_util_helpers__WEBPACK_IMPORTED_MODULE_8__["convertToUnit"])(this.width)
            };
        }
        if (this.$slots.activator) {
            children.push(h('div', {
                staticClass: 'v-dialog__activator',
                'class': {
                    'v-dialog__activator--disabled': this.disabled
                },
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        if (!_this.disabled) _this.isActive = !_this.isActive;
                    }
                }
            }, [this.$slots.activator]));
        }
        var dialog = h('div', data, this.showLazyContent(this.$slots.default));
        if (this.transition) {
            dialog = h('transition', {
                props: {
                    name: this.transition,
                    origin: this.origin
                }
            }, [dialog]);
        }
        children.push(h('div', {
            'class': this.contentClasses,
            attrs: __assign({ tabIndex: '-1' }, this.getScopeIdAttrs()),
            style: { zIndex: this.activeZIndex },
            ref: 'content'
        }, [this.$createElement(_util_ThemeProvider__WEBPACK_IMPORTED_MODULE_9__["default"], {
            props: {
                root: true,
                light: this.light,
                dark: this.dark
            }
        }, [dialog])]));
        return h('div', {
            staticClass: 'v-dialog__container',
            style: {
                display: !this.$slots.activator || this.fullWidth ? 'block' : 'inline-block'
            }
        }, children);
    }
});

/***/ }),

/***/ "./src/components/VDialog/index.js":
/*!*****************************************!*\
  !*** ./src/components/VDialog/index.js ***!
  \*****************************************/
/*! exports provided: VDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VDialog */ "./src/components/VDialog/VDialog.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDialog", function() { return _VDialog__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VDialog__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VDivider/VDivider.ts":
/*!*********************************************!*\
  !*** ./src/components/VDivider/VDivider.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_dividers_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_dividers.styl */ "./src/stylus/components/_dividers.styl");
/* harmony import */ var _stylus_components_dividers_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_dividers_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Mixins

/* harmony default export */ __webpack_exports__["default"] = (_mixins_themeable__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    name: 'v-divider',
    props: {
        inset: Boolean,
        vertical: Boolean
    },
    render: function render(h) {
        return h('hr', {
            class: __assign({ 'v-divider': true, 'v-divider--inset': this.inset, 'v-divider--vertical': this.vertical }, this.themeClasses),
            attrs: this.$attrs,
            on: this.$listeners
        });
    }
}));

/***/ }),

/***/ "./src/components/VDivider/index.ts":
/*!******************************************!*\
  !*** ./src/components/VDivider/index.ts ***!
  \******************************************/
/*! exports provided: VDivider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VDivider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VDivider */ "./src/components/VDivider/VDivider.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDivider", function() { return _VDivider__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VDivider__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VExpansionPanel/VExpansionPanel.ts":
/*!***********************************************************!*\
  !*** ./src/components/VExpansionPanel/VExpansionPanel.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_expansion_panel_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_expansion-panel.styl */ "./src/stylus/components/_expansion-panel.styl");
/* harmony import */ var _stylus_components_expansion_panel_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_expansion_panel_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_3__["default"])(_mixins_themeable__WEBPACK_IMPORTED_MODULE_1__["default"], Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_2__["provide"])('expansionPanel')).extend({
    name: 'v-expansion-panel',
    provide: function provide() {
        return {
            expansionPanel: this
        };
    },
    props: {
        disabled: Boolean,
        readonly: Boolean,
        expand: Boolean,
        focusable: Boolean,
        inset: Boolean,
        popout: Boolean,
        value: {
            type: [Number, Array],
            default: function _default() {
                return null;
            }
        }
    },
    data: function data() {
        return {
            items: [],
            open: []
        };
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-expansion-panel--focusable': this.focusable, 'v-expansion-panel--popout': this.popout, 'v-expansion-panel--inset': this.inset }, this.themeClasses);
        }
    },
    watch: {
        expand: function expand(v) {
            var openIndex = -1;
            if (!v) {
                // Close all panels unless only one is open
                var openCount = this.open.reduce(function (acc, val) {
                    return val ? acc + 1 : acc;
                }, 0);
                var open = Array(this.items.length).fill(false);
                if (openCount === 1) {
                    openIndex = this.open.indexOf(true);
                }
                if (openIndex > -1) {
                    open[openIndex] = true;
                }
                this.open = open;
            }
            this.$emit('input', v ? this.open : openIndex > -1 ? openIndex : null);
        },
        value: function value(v) {
            this.updateFromValue(v);
        }
    },
    mounted: function mounted() {
        this.value !== null && this.updateFromValue(this.value);
    },
    methods: {
        updateFromValue: function updateFromValue(v) {
            if (Array.isArray(v) && !this.expand) return;
            var open = Array(this.items.length).fill(false);
            if (typeof v === 'number') {
                open[v] = true;
            } else if (v !== null) {
                open = v;
            }
            this.updatePanels(open);
        },
        updatePanels: function updatePanels(open) {
            this.open = open;
            for (var i = 0; i < this.items.length; i++) {
                var active = open && open[i];
                this.items[i].toggle(active);
            }
        },
        panelClick: function panelClick(uid) {
            var open = this.expand ? this.open.slice() : Array(this.items.length).fill(false);
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i]._uid === uid) {
                    open[i] = !this.open[i];
                    !this.expand && this.$emit('input', open[i] ? i : null);
                }
            }
            this.updatePanels(open);
            if (this.expand) this.$emit('input', open);
        },
        register: function register(content) {
            this.items.push(content);
            this.open.push(false);
        },
        unregister: function unregister(content) {
            var index = this.items.findIndex(function (i) {
                return i._uid === content._uid;
            });
            this.items.splice(index, 1);
            this.open.splice(index, 1);
        }
    },
    render: function render(h) {
        return h('ul', {
            staticClass: 'v-expansion-panel',
            class: this.classes
        }, this.$slots.default);
    }
}));

/***/ }),

/***/ "./src/components/VExpansionPanel/VExpansionPanelContent.ts":
/*!******************************************************************!*\
  !*** ./src/components/VExpansionPanel/VExpansionPanelContent.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transitions */ "./src/components/transitions/index.js");
/* harmony import */ var _mixins_bootable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/bootable */ "./src/mixins/bootable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _mixins_rippleable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/rippleable */ "./src/mixins/rippleable.ts");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};








/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_6__["default"])(_mixins_bootable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_rippleable__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_4__["inject"])('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel')
/* @vue/component */
).extend({
    name: 'v-expansion-panel-content',
    props: {
        disabled: Boolean,
        readonly: Boolean,
        expandIcon: {
            type: String,
            default: '$vuetify.icons.expand'
        },
        hideActions: Boolean,
        ripple: {
            type: [Boolean, Object],
            default: false
        }
    },
    data: function data() {
        return {
            height: 'auto'
        };
    },
    computed: {
        containerClasses: function containerClasses() {
            return {
                'v-expansion-panel__container--active': this.isActive,
                'v-expansion-panel__container--disabled': this.isDisabled
            };
        },
        isDisabled: function isDisabled() {
            return this.expansionPanel.disabled || this.disabled;
        },
        isReadonly: function isReadonly() {
            return this.expansionPanel.readonly || this.readonly;
        }
    },
    mounted: function mounted() {
        this.expansionPanel.register(this);
        // Can be removed once fully deprecated
        if (typeof this.value !== 'undefined') Object(_util_console__WEBPACK_IMPORTED_MODULE_7__["consoleWarn"])('v-model has been deprecated', this);
    },
    beforeDestroy: function beforeDestroy() {
        this.expansionPanel.unregister(this);
    },
    methods: {
        onKeydown: function onKeydown(e) {
            // Ensure element is the activeElement
            if (e.keyCode === 13 && this.$el === document.activeElement) this.expansionPanel.panelClick(this._uid);
        },
        onHeaderClick: function onHeaderClick() {
            this.isReadonly || this.expansionPanel.panelClick(this._uid);
        },
        genBody: function genBody() {
            return this.$createElement('div', {
                ref: 'body',
                class: 'v-expansion-panel__body',
                directives: [{
                    name: 'show',
                    value: this.isActive
                }]
            }, this.showLazyContent(this.$slots.default));
        },
        genHeader: function genHeader() {
            var children = __spread(this.$slots.header);
            if (!this.hideActions) children.push(this.genIcon());
            return this.$createElement('div', {
                staticClass: 'v-expansion-panel__header',
                directives: [{
                    name: 'ripple',
                    value: this.ripple
                }],
                on: {
                    click: this.onHeaderClick
                }
            }, children);
        },
        genIcon: function genIcon() {
            var icon = this.$slots.actions || [this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_5__["default"], this.expandIcon)];
            return this.$createElement('transition', {
                attrs: { name: 'fade-transition' }
            }, [this.$createElement('div', {
                staticClass: 'v-expansion-panel__header__icon',
                directives: [{
                    name: 'show',
                    value: !this.isDisabled
                }]
            }, icon)]);
        },
        toggle: function toggle(active) {
            var _this = this;
            if (active) this.isBooted = true;
            // We treat bootable differently
            // Needs time to calc height
            this.$nextTick(function () {
                return _this.isActive = active;
            });
        }
    },
    render: function render(h) {
        var children = [];
        this.$slots.header && children.push(this.genHeader());
        children.push(h(_transitions__WEBPACK_IMPORTED_MODULE_0__["VExpandTransition"], [this.genBody()]));
        return h('li', {
            staticClass: 'v-expansion-panel__container',
            class: this.containerClasses,
            attrs: {
                tabindex: this.isReadonly || this.isDisabled ? null : 0
            },
            on: {
                keydown: this.onKeydown
            }
        }, children);
    }
}));

/***/ }),

/***/ "./src/components/VExpansionPanel/index.ts":
/*!*************************************************!*\
  !*** ./src/components/VExpansionPanel/index.ts ***!
  \*************************************************/
/*! exports provided: VExpansionPanel, VExpansionPanelContent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VExpansionPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VExpansionPanel */ "./src/components/VExpansionPanel/VExpansionPanel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VExpansionPanel", function() { return _VExpansionPanel__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VExpansionPanelContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VExpansionPanelContent */ "./src/components/VExpansionPanel/VExpansionPanelContent.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VExpansionPanelContent", function() { return _VExpansionPanelContent__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VExpansionPanel: _VExpansionPanel__WEBPACK_IMPORTED_MODULE_0__["default"],
        VExpansionPanelContent: _VExpansionPanelContent__WEBPACK_IMPORTED_MODULE_1__["default"]
    }
});

/***/ }),

/***/ "./src/components/VFooter/VFooter.js":
/*!*******************************************!*\
  !*** ./src/components/VFooter/VFooter.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_footer_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_footer.styl */ "./src/stylus/components/_footer.styl");
/* harmony import */ var _stylus_components_footer_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_footer_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/applicationable */ "./src/mixins/applicationable.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Mixins



/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-footer',
    mixins: [Object(_mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__["default"])(null, ['height', 'inset']), _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__["default"]],
    props: {
        height: {
            default: 32,
            type: [Number, String]
        },
        inset: Boolean
    },
    computed: {
        applicationProperty: function applicationProperty() {
            return this.inset ? 'insetFooter' : 'footer';
        },
        computedMarginBottom: function computedMarginBottom() {
            if (!this.app) return;
            return this.$vuetify.application.bottom;
        },
        computedPaddingLeft: function computedPaddingLeft() {
            return !this.app || !this.inset ? 0 : this.$vuetify.application.left;
        },
        computedPaddingRight: function computedPaddingRight() {
            return !this.app ? 0 : this.$vuetify.application.right;
        },
        styles: function styles() {
            var styles = {
                height: isNaN(this.height) ? this.height : this.height + "px"
            };
            if (this.computedPaddingLeft) {
                styles.paddingLeft = this.computedPaddingLeft + "px";
            }
            if (this.computedPaddingRight) {
                styles.paddingRight = this.computedPaddingRight + "px";
            }
            if (this.computedMarginBottom) {
                styles.marginBottom = this.computedMarginBottom + "px";
            }
            return styles;
        }
    },
    methods: {
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication: function updateApplication() {
            var height = parseInt(this.height);
            return isNaN(height) ? this.$el ? this.$el.clientHeight : 0 : height;
        }
    },
    render: function render(h) {
        var data = this.setBackgroundColor(this.color, {
            staticClass: 'v-footer',
            'class': __assign({ 'v-footer--absolute': this.absolute, 'v-footer--fixed': !this.absolute && (this.app || this.fixed), 'v-footer--inset': this.inset }, this.themeClasses),
            style: this.styles,
            ref: 'content'
        });
        return h('footer', data, this.$slots.default);
    }
});

/***/ }),

/***/ "./src/components/VFooter/index.js":
/*!*****************************************!*\
  !*** ./src/components/VFooter/index.js ***!
  \*****************************************/
/*! exports provided: VFooter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VFooter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VFooter */ "./src/components/VFooter/VFooter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VFooter", function() { return _VFooter__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VFooter__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VForm/VForm.js":
/*!***************************************!*\
  !*** ./src/components/VForm/VForm.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_forms_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_forms.styl */ "./src/stylus/components/_forms.styl");
/* harmony import */ var _stylus_components_forms_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_forms_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
// Styles


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-form',
    mixins: [Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_1__["provide"])('form')],
    inheritAttrs: false,
    props: {
        value: Boolean,
        lazyValidation: Boolean
    },
    data: function data() {
        return {
            inputs: [],
            watchers: [],
            errorBag: {}
        };
    },
    watch: {
        errorBag: {
            handler: function handler() {
                var errors = Object.values(this.errorBag).includes(true);
                this.$emit('input', !errors);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        watchInput: function watchInput(input) {
            var _this = this;
            var watcher = function watcher(input) {
                return input.$watch('hasError', function (val) {
                    _this.$set(_this.errorBag, input._uid, val);
                }, { immediate: true });
            };
            var watchers = {
                _uid: input._uid,
                valid: undefined,
                shouldValidate: undefined
            };
            if (this.lazyValidation) {
                // Only start watching inputs if we need to
                watchers.shouldValidate = input.$watch('shouldValidate', function (val) {
                    if (!val) return;
                    // Only watch if we're not already doing it
                    if (_this.errorBag.hasOwnProperty(input._uid)) return;
                    watchers.valid = watcher(input);
                });
            } else {
                watchers.valid = watcher(input);
            }
            return watchers;
        },
        /** @public */
        validate: function validate() {
            var errors = this.inputs.filter(function (input) {
                return !input.validate(true);
            }).length;
            return !errors;
        },
        /** @public */
        reset: function reset() {
            var _this = this;
            for (var i = this.inputs.length; i--;) {
                this.inputs[i].reset();
            }
            if (this.lazyValidation) {
                // Account for timeout in validatable
                setTimeout(function () {
                    _this.errorBag = {};
                }, 0);
            }
        },
        /** @public */
        resetValidation: function resetValidation() {
            var _this = this;
            for (var i = this.inputs.length; i--;) {
                this.inputs[i].resetValidation();
            }
            if (this.lazyValidation) {
                // Account for timeout in validatable
                setTimeout(function () {
                    _this.errorBag = {};
                }, 0);
            }
        },
        register: function register(input) {
            var unwatch = this.watchInput(input);
            this.inputs.push(input);
            this.watchers.push(unwatch);
        },
        unregister: function unregister(input) {
            var found = this.inputs.find(function (i) {
                return i._uid === input._uid;
            });
            if (!found) return;
            var unwatch = this.watchers.find(function (i) {
                return i._uid === found._uid;
            });
            unwatch.valid && unwatch.valid();
            unwatch.shouldValidate && unwatch.shouldValidate();
            this.watchers = this.watchers.filter(function (i) {
                return i._uid !== found._uid;
            });
            this.inputs = this.inputs.filter(function (i) {
                return i._uid !== found._uid;
            });
            this.$delete(this.errorBag, found._uid);
        }
    },
    render: function render(h) {
        var _this = this;
        return h('form', {
            staticClass: 'v-form',
            attrs: Object.assign({
                novalidate: true
            }, this.$attrs),
            on: {
                submit: function submit(e) {
                    return _this.$emit('submit', e);
                }
            }
        }, this.$slots.default);
    }
});

/***/ }),

/***/ "./src/components/VForm/index.js":
/*!***************************************!*\
  !*** ./src/components/VForm/index.js ***!
  \***************************************/
/*! exports provided: VForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VForm */ "./src/components/VForm/VForm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VForm", function() { return _VForm__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VForm__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VGrid/VContainer.js":
/*!********************************************!*\
  !*** ./src/components/VGrid/VContainer.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_grid_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_grid.styl */ "./src/stylus/components/_grid.styl");
/* harmony import */ var _stylus_components_grid_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_grid_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid */ "./src/components/VGrid/grid.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_grid__WEBPACK_IMPORTED_MODULE_1__["default"])('container'));

/***/ }),

/***/ "./src/components/VGrid/VContent.js":
/*!******************************************!*\
  !*** ./src/components/VGrid/VContent.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_content_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_content.styl */ "./src/stylus/components/_content.styl");
/* harmony import */ var _stylus_components_content_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_content_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_ssr_bootable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/ssr-bootable */ "./src/mixins/ssr-bootable.ts");
// Styles

// Mixins

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-content',
    mixins: [_mixins_ssr_bootable__WEBPACK_IMPORTED_MODULE_1__["default"]],
    props: {
        tag: {
            type: String,
            default: 'main'
        }
    },
    computed: {
        styles: function styles() {
            var _a = this.$vuetify.application,
                bar = _a.bar,
                top = _a.top,
                right = _a.right,
                footer = _a.footer,
                insetFooter = _a.insetFooter,
                bottom = _a.bottom,
                left = _a.left;
            return {
                paddingTop: top + bar + "px",
                paddingRight: right + "px",
                paddingBottom: footer + insetFooter + bottom + "px",
                paddingLeft: left + "px"
            };
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-content',
            style: this.styles,
            ref: 'content'
        };
        return h(this.tag, data, [h('div', { staticClass: 'v-content__wrap' }, this.$slots.default)]);
    }
});

/***/ }),

/***/ "./src/components/VGrid/VFlex.js":
/*!***************************************!*\
  !*** ./src/components/VGrid/VFlex.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_grid_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_grid.styl */ "./src/stylus/components/_grid.styl");
/* harmony import */ var _stylus_components_grid_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_grid_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid */ "./src/components/VGrid/grid.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_grid__WEBPACK_IMPORTED_MODULE_1__["default"])('flex'));

/***/ }),

/***/ "./src/components/VGrid/VLayout.js":
/*!*****************************************!*\
  !*** ./src/components/VGrid/VLayout.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_grid_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_grid.styl */ "./src/stylus/components/_grid.styl");
/* harmony import */ var _stylus_components_grid_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_grid_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid */ "./src/components/VGrid/grid.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(_grid__WEBPACK_IMPORTED_MODULE_1__["default"])('layout'));

/***/ }),

/***/ "./src/components/VGrid/grid.js":
/*!**************************************!*\
  !*** ./src/components/VGrid/grid.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Grid; });
function Grid(name) {
    /* @vue/component */
    return {
        name: "v-" + name,
        functional: true,
        props: {
            id: String,
            tag: {
                type: String,
                default: 'div'
            }
        },
        render: function render(h, _a) {
            var props = _a.props,
                data = _a.data,
                children = _a.children;
            data.staticClass = (name + " " + (data.staticClass || '')).trim();
            if (data.attrs) {
                var classes = Object.keys(data.attrs).filter(function (key) {
                    // TODO: Remove once resolved
                    // https://github.com/vuejs/vue/issues/7841
                    if (key === 'slot') return false;
                    var value = data.attrs[key];
                    return value || typeof value === 'string';
                });
                if (classes.length) data.staticClass += " " + classes.join(' ');
                delete data.attrs;
            }
            if (props.id) {
                data.domProps = data.domProps || {};
                data.domProps.id = props.id;
            }
            return h(props.tag, data, children);
        }
    };
}

/***/ }),

/***/ "./src/components/VGrid/index.js":
/*!***************************************!*\
  !*** ./src/components/VGrid/index.js ***!
  \***************************************/
/*! exports provided: VContainer, VContent, VFlex, VLayout, VSpacer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VSpacer", function() { return VSpacer; });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _VContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VContainer */ "./src/components/VGrid/VContainer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VContainer", function() { return _VContainer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _VContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VContent */ "./src/components/VGrid/VContent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VContent", function() { return _VContent__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _VFlex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VFlex */ "./src/components/VGrid/VFlex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VFlex", function() { return _VFlex__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _VLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VLayout */ "./src/components/VGrid/VLayout.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VLayout", function() { return _VLayout__WEBPACK_IMPORTED_MODULE_4__["default"]; });






var VSpacer = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('spacer', 'div', 'v-spacer');

/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VContainer: _VContainer__WEBPACK_IMPORTED_MODULE_1__["default"],
        VContent: _VContent__WEBPACK_IMPORTED_MODULE_2__["default"],
        VFlex: _VFlex__WEBPACK_IMPORTED_MODULE_3__["default"],
        VLayout: _VLayout__WEBPACK_IMPORTED_MODULE_4__["default"],
        VSpacer: VSpacer
    }
});

/***/ }),

/***/ "./src/components/VHover/VHover.ts":
/*!*****************************************!*\
  !*** ./src/components/VHover/VHover.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_delayable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/delayable */ "./src/mixins/delayable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
// Mixins


// Utilities


/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_2__["default"])(_mixins_delayable__WEBPACK_IMPORTED_MODULE_0__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_1__["default"]
/* @vue/component */
).extend({
    name: 'v-hover',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: undefined
        }
    },
    methods: {
        onMouseEnter: function onMouseEnter() {
            var _this = this;
            this.runDelay('open', function () {
                _this.isActive = true;
            });
        },
        onMouseLeave: function onMouseLeave() {
            var _this = this;
            this.runDelay('close', function () {
                _this.isActive = false;
            });
        }
    },
    render: function render() {
        if (!this.$scopedSlots.default && this.value === undefined) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_3__["consoleWarn"])('v-hover is missing a default scopedSlot or bound value', this);
            return null;
        }
        var element;
        if (this.$scopedSlots.default) {
            element = this.$scopedSlots.default({ hover: this.isActive });
        } else if (this.$slots.default.length === 1) {
            element = this.$slots.default[0];
        }
        if (!element || typeof element === 'string' || Array.isArray(element)) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_3__["consoleWarn"])('v-hover should only contain a single element', this);
            return element;
        }
        if (!this.disabled) {
            this._g(element.data, {
                mouseenter: this.onMouseEnter,
                mouseleave: this.onMouseLeave
            });
        }
        return element;
    }
}));

/***/ }),

/***/ "./src/components/VHover/index.ts":
/*!****************************************!*\
  !*** ./src/components/VHover/index.ts ***!
  \****************************************/
/*! exports provided: VHover, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VHover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VHover */ "./src/components/VHover/VHover.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VHover", function() { return _VHover__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VHover__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VIcon/VIcon.ts":
/*!***************************************!*\
  !*** ./src/components/VIcon/VIcon.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_icons_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_icons.styl */ "./src/stylus/components/_icons.styl");
/* harmony import */ var _stylus_components_icons_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_icons_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_sizeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/sizeable */ "./src/mixins/sizeable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// Mixins



// Util

// Types


var SIZE_MAP;
(function (SIZE_MAP) {
    SIZE_MAP["small"] = "16px";
    SIZE_MAP["default"] = "24px";
    SIZE_MAP["medium"] = "28px";
    SIZE_MAP["large"] = "36px";
    SIZE_MAP["xLarge"] = "40px";
})(SIZE_MAP || (SIZE_MAP = {}));
function isFontAwesome5(iconType) {
    return ['fas', 'far', 'fal', 'fab'].some(function (val) {
        return iconType.includes(val);
    });
}
var VIcon = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_6__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_sizeable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__["default"]
/* @vue/component */
).extend({
    name: 'v-icon',
    props: {
        disabled: Boolean,
        left: Boolean,
        right: Boolean
    },
    render: function render(h) {
        var _a;
        var sizes = {
            small: this.small,
            medium: this.medium,
            large: this.large,
            xLarge: this.xLarge
        };
        var explicitSize = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["keys"])(sizes).find(function (key) {
            return sizes[key] && !!key;
        });
        var fontSize = explicitSize && SIZE_MAP[explicitSize] || Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["convertToUnit"])(this.size);
        var newChildren = [];
        var data = {
            staticClass: 'v-icon',
            attrs: __assign({ 'aria-hidden': true }, this.$attrs),
            on: this.$listeners
        };
        if (fontSize) data.style = { fontSize: fontSize };
        var iconName = '';
        if (this.$slots.default) iconName = this.$slots.default[0].text;
        // Remap internal names like '$vuetify.icons.cancel' to the current name for that icon
        iconName = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["remapInternalIcon"])(this, iconName);
        var iconType = 'material-icons';
        // Material Icon delimiter is _
        // https://material.io/icons/
        var delimiterIndex = iconName.indexOf('-');
        var isCustomIcon = delimiterIndex > -1;
        if (isCustomIcon) {
            iconType = iconName.slice(0, delimiterIndex);
            if (isFontAwesome5(iconType)) iconType = '';
            // Assume if not a custom icon
            // is Material Icon font
        } else newChildren.push(iconName);
        data.class = __assign((_a = { 'v-icon--disabled': this.disabled, 'v-icon--left': this.left, 'v-icon--link': this.$listeners.click || this.$listeners['!click'], 'v-icon--right': this.right }, _a[iconType] = true, _a[iconName] = isCustomIcon, _a), this.themeClasses);
        return h('i', this.setTextColor(this.color, data), newChildren);
    }
});
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_5___default.a.extend({
    name: 'v-icon',
    $_wrapperFor: VIcon,
    functional: true,
    render: function render(h, _a) {
        var data = _a.data,
            children = _a.children;
        var iconName = '';
        // Support usage of v-text and v-html
        if (data.domProps) {
            iconName = data.domProps.textContent || data.domProps.innerHTML || iconName;
            // Remove nodes so it doesn't
            // overwrite our changes
            delete data.domProps.textContent;
            delete data.domProps.innerHTML;
        }
        return h(VIcon, data, iconName ? [iconName] : children);
    }
}));

/***/ }),

/***/ "./src/components/VIcon/index.ts":
/*!***************************************!*\
  !*** ./src/components/VIcon/index.ts ***!
  \***************************************/
/*! exports provided: VIcon, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VIcon */ "./src/components/VIcon/VIcon.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VIcon", function() { return _VIcon__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VIcon__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VImg/VImg.ts":
/*!*************************************!*\
  !*** ./src/components/VImg/VImg.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_images_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_images.styl */ "./src/stylus/components/_images.styl");
/* harmony import */ var _stylus_components_images_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_images_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VResponsive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VResponsive */ "./src/components/VResponsive/index.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");

// Components

// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (_VResponsive__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
    name: 'v-img',
    props: {
        alt: String,
        contain: Boolean,
        src: {
            type: [String, Object],
            default: ''
        },
        gradient: String,
        lazySrc: String,
        srcset: String,
        sizes: String,
        position: {
            type: String,
            default: 'center center'
        },
        transition: {
            type: [Boolean, String],
            default: 'fade-transition'
        }
    },
    data: function data() {
        return {
            currentSrc: '',
            image: null,
            isLoading: true,
            calculatedAspectRatio: undefined
        };
    },
    computed: {
        computedAspectRatio: function computedAspectRatio() {
            return this.normalisedSrc.aspect;
        },
        normalisedSrc: function normalisedSrc() {
            return typeof this.src === 'string' ? {
                src: this.src,
                srcset: this.srcset,
                lazySrc: this.lazySrc,
                aspect: Number(this.aspectRatio || this.calculatedAspectRatio)
            } : {
                src: this.src.src,
                srcset: this.srcset || this.src.srcset,
                lazySrc: this.lazySrc || this.src.lazySrc,
                aspect: Number(this.aspectRatio || this.src.aspect || this.calculatedAspectRatio)
            };
        },
        __cachedImage: function __cachedImage() {
            if (!(this.normalisedSrc.src || this.normalisedSrc.lazySrc)) return [];
            var backgroundImage = [];
            var src = this.isLoading ? this.normalisedSrc.lazySrc : this.currentSrc;
            if (this.gradient) backgroundImage.push("linear-gradient(" + this.gradient + ")");
            if (src) backgroundImage.push("url(\"" + src + "\")");
            var image = this.$createElement('div', {
                staticClass: 'v-image__image',
                class: {
                    'v-image__image--preload': this.isLoading,
                    'v-image__image--contain': this.contain,
                    'v-image__image--cover': !this.contain
                },
                style: {
                    backgroundImage: backgroundImage.join(', '),
                    backgroundPosition: this.position
                },
                key: +this.isLoading
            });
            if (!this.transition) return image;
            return this.$createElement('transition', {
                attrs: {
                    name: this.transition,
                    mode: 'in-out'
                }
            }, [image]);
        }
    },
    watch: {
        src: function src() {
            if (!this.isLoading) this.init();else this.loadImage();
        },
        '$vuetify.breakpoint.width': 'getSrc'
    },
    beforeMount: function beforeMount() {
        this.init();
    },
    methods: {
        init: function init() {
            if (this.normalisedSrc.lazySrc) {
                var lazyImg = new Image();
                lazyImg.src = this.normalisedSrc.lazySrc;
                this.pollForSize(lazyImg, null);
            }
            /* istanbul ignore else */
            if (this.normalisedSrc.src) this.loadImage();
        },
        onLoad: function onLoad() {
            this.getSrc();
            this.isLoading = false;
            this.$emit('load', this.src);
        },
        onError: function onError() {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_2__["consoleError"])("Image load failed\n\n" + ("src: " + this.normalisedSrc.src), this);
            this.$emit('error', this.src);
        },
        getSrc: function getSrc() {
            /* istanbul ignore else */
            if (this.image) this.currentSrc = this.image.currentSrc || this.image.src;
        },
        loadImage: function loadImage() {
            var _this = this;
            var image = new Image();
            this.image = image;
            image.onload = function () {
                /* istanbul ignore if */
                if (image.decode) {
                    image.decode().catch(function (err) {
                        Object(_util_console__WEBPACK_IMPORTED_MODULE_2__["consoleWarn"])("Failed to decode image, trying to render anyway\n\n" + ("src: " + _this.normalisedSrc.src) + (err.message ? "\nOriginal error: " + err.message : ''), _this);
                    }).then(_this.onLoad);
                } else {
                    _this.onLoad();
                }
            };
            image.onerror = this.onError;
            image.src = this.normalisedSrc.src;
            this.sizes && (image.sizes = this.sizes);
            this.normalisedSrc.srcset && (image.srcset = this.normalisedSrc.srcset);
            this.aspectRatio || this.pollForSize(image);
            this.getSrc();
        },
        pollForSize: function pollForSize(img, timeout) {
            var _this = this;
            if (timeout === void 0) {
                timeout = 100;
            }
            var poll = function poll() {
                var naturalHeight = img.naturalHeight,
                    naturalWidth = img.naturalWidth;
                if (naturalHeight || naturalWidth) {
                    _this.calculatedAspectRatio = naturalWidth / naturalHeight;
                } else {
                    timeout != null && setTimeout(poll, timeout);
                }
            };
            poll();
        },
        __genPlaceholder: function __genPlaceholder() {
            if (this.$slots.placeholder) {
                var placeholder = this.isLoading ? [this.$createElement('div', {
                    staticClass: 'v-image__placeholder'
                }, this.$slots.placeholder)] : [];
                if (!this.transition) return placeholder[0];
                return this.$createElement('transition', {
                    attrs: { name: this.transition }
                }, placeholder);
            }
        }
    },
    render: function render(h) {
        var node = _VResponsive__WEBPACK_IMPORTED_MODULE_1__["default"].options.render.call(this, h);
        node.data.staticClass += ' v-image';
        node.data.attrs = {
            role: this.alt ? 'img' : undefined,
            'aria-label': this.alt
        };
        node.children = [this.__cachedSizer, this.__cachedImage, this.__genPlaceholder(), this.genContent()];
        return h(node.tag, node.data, node.children);
    }
}));

/***/ }),

/***/ "./src/components/VImg/index.ts":
/*!**************************************!*\
  !*** ./src/components/VImg/index.ts ***!
  \**************************************/
/*! exports provided: VImg, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VImg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VImg */ "./src/components/VImg/VImg.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VImg", function() { return _VImg__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VImg__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VInput/VInput.js":
/*!*****************************************!*\
  !*** ./src/components/VInput/VInput.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_inputs_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_inputs.styl */ "./src/stylus/components/_inputs.styl");
/* harmony import */ var _stylus_components_inputs_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_inputs_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _VLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VLabel */ "./src/components/VLabel/index.js");
/* harmony import */ var _VMessages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VMessages */ "./src/components/VMessages/index.js");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_validatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/validatable */ "./src/mixins/validatable.js");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Components



// Mixins



// Utilities


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-input',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_validatable__WEBPACK_IMPORTED_MODULE_6__["default"]],
    props: {
        appendIcon: String,
        /** @deprecated */
        appendIconCb: Function,
        backgroundColor: {
            type: String,
            default: ''
        },
        disabled: Boolean,
        height: [Number, String],
        hideDetails: Boolean,
        hint: String,
        label: String,
        persistentHint: Boolean,
        prependIcon: String,
        /** @deprecated */
        prependIconCb: Function,
        readonly: Boolean,
        value: { required: false }
    },
    data: function data(vm) {
        return {
            lazyValue: vm.value,
            hasMouseDown: false,
            isFocused: false
        };
    },
    computed: {
        classesInput: function classesInput() {
            return __assign({}, this.classes, { 'v-input--has-state': this.hasState, 'v-input--hide-details': this.hideDetails, 'v-input--is-label-active': this.isLabelActive, 'v-input--is-dirty': this.isDirty, 'v-input--is-disabled': this.disabled, 'v-input--is-focused': this.isFocused, 'v-input--is-loading': this.loading !== false && this.loading !== undefined, 'v-input--is-readonly': this.readonly }, this.themeClasses);
        },
        directivesInput: function directivesInput() {
            return [];
        },
        hasHint: function hasHint() {
            return !this.hasMessages && this.hint && (this.persistentHint || this.isFocused);
        },
        hasLabel: function hasLabel() {
            return Boolean(this.$slots.label || this.label);
        },
        // Proxy for `lazyValue`
        // This allows an input
        // to function without
        // a provided model
        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                this.lazyValue = val;
                this.$emit(this.$_modelEvent, val);
            }
        },
        isDirty: function isDirty() {
            return !!this.lazyValue;
        },
        isDisabled: function isDisabled() {
            return Boolean(this.disabled || this.readonly);
        },
        isLabelActive: function isLabelActive() {
            return this.isDirty;
        }
    },
    watch: {
        value: function value(val) {
            this.lazyValue = val;
        }
    },
    beforeCreate: function beforeCreate() {
        // v-radio-group needs to emit a different event
        // https://github.com/vuetifyjs/vuetify/issues/4752
        this.$_modelEvent = this.$options.model && this.$options.model.event || 'input';
    },
    methods: {
        genContent: function genContent() {
            return [this.genPrependSlot(), this.genControl(), this.genAppendSlot()];
        },
        genControl: function genControl() {
            return this.$createElement('div', {
                staticClass: 'v-input__control'
            }, [this.genInputSlot(), this.genMessages()]);
        },
        genDefaultSlot: function genDefaultSlot() {
            return [this.genLabel(), this.$slots.default];
        },
        // TODO: remove shouldDeprecate (2.0), used for clearIcon
        genIcon: function genIcon(type, cb, shouldDeprecate) {
            var _this = this;
            if (shouldDeprecate === void 0) {
                shouldDeprecate = true;
            }
            var icon = this[type + "Icon"];
            var eventName = "click:" + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["kebabCase"])(type);
            cb = cb || this[type + "IconCb"];
            if (shouldDeprecate && type && cb) {
                Object(_util_console__WEBPACK_IMPORTED_MODULE_8__["deprecate"])(":" + type + "-icon-cb", "@" + eventName, this);
            }
            var data = {
                props: {
                    color: this.validationState,
                    dark: this.dark,
                    disabled: this.disabled,
                    light: this.light
                },
                on: !(this.$listeners[eventName] || cb) ? null : {
                    click: function click(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.$emit(eventName, e);
                        cb && cb(e);
                    },
                    // Container has mouseup event that will
                    // trigger menu open if enclosed
                    mouseup: function mouseup(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            };
            return this.$createElement('div', {
                staticClass: "v-input__icon v-input__icon--" + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["kebabCase"])(type),
                key: "" + type + icon
            }, [this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], data, icon)]);
        },
        genInputSlot: function genInputSlot() {
            return this.$createElement('div', this.setBackgroundColor(this.backgroundColor, {
                staticClass: 'v-input__slot',
                style: { height: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["convertToUnit"])(this.height) },
                directives: this.directivesInput,
                on: {
                    click: this.onClick,
                    mousedown: this.onMouseDown,
                    mouseup: this.onMouseUp
                },
                ref: 'input-slot'
            }), [this.genDefaultSlot()]);
        },
        genLabel: function genLabel() {
            if (!this.hasLabel) return null;
            return this.$createElement(_VLabel__WEBPACK_IMPORTED_MODULE_2__["default"], {
                props: {
                    color: this.validationState,
                    dark: this.dark,
                    focused: this.hasState,
                    for: this.$attrs.id,
                    light: this.light
                }
            }, this.$slots.label || this.label);
        },
        genMessages: function genMessages() {
            if (this.hideDetails) return null;
            var messages = this.hasHint ? [this.hint] : this.validations;
            return this.$createElement(_VMessages__WEBPACK_IMPORTED_MODULE_3__["default"], {
                props: {
                    color: this.hasHint ? '' : this.validationState,
                    dark: this.dark,
                    light: this.light,
                    value: this.hasMessages || this.hasHint ? messages : []
                }
            });
        },
        genSlot: function genSlot(type, location, slot) {
            if (!slot.length) return null;
            var ref = type + "-" + location;
            return this.$createElement('div', {
                staticClass: "v-input__" + ref,
                ref: ref
            }, slot);
        },
        genPrependSlot: function genPrependSlot() {
            var slot = [];
            if (this.$slots['prepend']) {
                slot.push(this.$slots['prepend']);
            } else if (this.prependIcon) {
                slot.push(this.genIcon('prepend'));
            }
            return this.genSlot('prepend', 'outer', slot);
        },
        genAppendSlot: function genAppendSlot() {
            var slot = [];
            // Append icon for text field was really
            // an appended inner icon, v-text-field
            // will overwrite this method in order to obtain
            // backwards compat
            if (this.$slots['append']) {
                slot.push(this.$slots['append']);
            } else if (this.appendIcon) {
                slot.push(this.genIcon('append'));
            }
            return this.genSlot('append', 'outer', slot);
        },
        onClick: function onClick(e) {
            this.$emit('click', e);
        },
        onMouseDown: function onMouseDown(e) {
            this.hasMouseDown = true;
            this.$emit('mousedown', e);
        },
        onMouseUp: function onMouseUp(e) {
            this.hasMouseDown = false;
            this.$emit('mouseup', e);
        }
    },
    render: function render(h) {
        return h('div', this.setTextColor(this.validationState, {
            staticClass: 'v-input',
            attrs: this.attrsInput,
            'class': this.classesInput
        }), this.genContent());
    }
});

/***/ }),

/***/ "./src/components/VInput/index.js":
/*!****************************************!*\
  !*** ./src/components/VInput/index.js ***!
  \****************************************/
/*! exports provided: VInput, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VInput */ "./src/components/VInput/VInput.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VInput", function() { return _VInput__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VInput__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VItemGroup/VItem.ts":
/*!********************************************!*\
  !*** ./src/components/VItemGroup/VItem.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_groupable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/groupable */ "./src/mixins/groupable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
// Mixins

// Utilities


/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_mixins_groupable__WEBPACK_IMPORTED_MODULE_0__["factory"])('itemGroup', 'v-item', 'v-item-group')
/* @vue/component */
).extend({
    name: 'v-item',
    props: {
        value: {
            required: false
        }
    },
    render: function render() {
        var _a;
        if (!this.$scopedSlots.default) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_2__["consoleWarn"])('v-item is missing a default scopedSlot', this);
            return null;
        }
        var element;
        /* istanbul ignore else */
        if (this.$scopedSlots.default) {
            element = this.$scopedSlots.default({
                active: this.isActive,
                toggle: this.toggle
            });
        }
        if (!element || typeof element === 'string' || Array.isArray(element)) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_2__["consoleWarn"])('v-item should only contain a single element', this);
            return element;
        }
        element.data = element.data || {};
        element.data.class = [element.data.class, (_a = {}, _a[this.activeClass] = this.isActive, _a)];
        return element;
    }
}));

/***/ }),

/***/ "./src/components/VItemGroup/VItemGroup.ts":
/*!*************************************************!*\
  !*** ./src/components/VItemGroup/VItemGroup.ts ***!
  \*************************************************/
/*! exports provided: BaseItemGroup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseItemGroup", function() { return BaseItemGroup; });
/* harmony import */ var _stylus_components_item_group_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_item-group.styl */ "./src/stylus/components/_item-group.styl");
/* harmony import */ var _stylus_components_item_group_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_item_group_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_proxyable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/proxyable */ "./src/mixins/proxyable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles



// Utilities


var BaseItemGroup = Object(_util_mixins__WEBPACK_IMPORTED_MODULE_3__["default"])(_mixins_proxyable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]).extend({
    name: 'base-item-group',
    props: {
        activeClass: {
            type: String,
            default: 'v-item--active'
        },
        mandatory: Boolean,
        max: {
            type: [Number, String],
            default: null
        },
        multiple: Boolean
    },
    data: function data() {
        return {
            // As long as a value is defined, show it
            // Otherwise, check if multiple
            // to determine which default to provide
            internalLazyValue: this.value !== undefined ? this.value : this.multiple ? [] : undefined,
            items: []
        };
    },
    computed: {
        classes: function classes() {
            return __assign({}, this.themeClasses);
        },
        selectedItems: function selectedItems() {
            var _this = this;
            return this.items.filter(function (item, index) {
                return _this.toggleMethod(_this.getValue(item, index));
            });
        },
        selectedValues: function selectedValues() {
            return Array.isArray(this.internalValue) ? this.internalValue : [this.internalValue];
        },
        toggleMethod: function toggleMethod() {
            var _this = this;
            if (!this.multiple) {
                return function (v) {
                    return _this.internalValue === v;
                };
            }
            var internalValue = this.internalValue;
            if (Array.isArray(internalValue)) {
                return function (v) {
                    return internalValue.includes(v);
                };
            }
            return function () {
                return false;
            };
        }
    },
    watch: {
        internalValue: function internalValue() {
            // https://github.com/vuetifyjs/vuetify/issues/5352
            this.$nextTick(this.updateItemsState);
        }
    },
    created: function created() {
        if (this.multiple && !Array.isArray(this.internalValue)) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_4__["consoleWarn"])('Model must be bound to an array if the multiple property is true.', this);
        }
    },
    methods: {
        getValue: function getValue(item, i) {
            return item.value == null || item.value === '' ? i : item.value;
        },
        onClick: function onClick(item, index) {
            this.updateInternalValue(this.getValue(item, index));
        },
        register: function register(item) {
            var _this = this;
            var index = this.items.push(item) - 1;
            item.$on('change', function () {
                return _this.onClick(item, index);
            });
            // If no value provided and mandatory,
            // assign first registered item
            if (this.mandatory && this.internalLazyValue == null) {
                this.updateMandatory();
            }
            this.updateItem(item, index);
        },
        unregister: function unregister(item) {
            if (this._isDestroyed) return;
            var index = this.items.indexOf(item);
            var value = this.getValue(item, index);
            this.items.splice(index, 1);
            var valueIndex = this.selectedValues.indexOf(value);
            // Items is not selected, do nothing
            if (valueIndex < 0) return;
            // If not mandatory, use regular update process
            if (!this.mandatory) {
                return this.updateInternalValue(value);
            }
            // Remove the value
            if (this.multiple && Array.isArray(this.internalValue)) {
                this.internalValue = this.internalValue.filter(function (v) {
                    return v !== value;
                });
            } else {
                this.internalValue = undefined;
            }
            // If mandatory and we have no selection
            // add the last item as value
            /* istanbul ignore else */
            if (!this.selectedItems.length) {
                this.updateMandatory(true);
            }
        },
        updateItem: function updateItem(item, index) {
            var value = this.getValue(item, index);
            item.isActive = this.toggleMethod(value);
        },
        updateItemsState: function updateItemsState() {
            if (this.mandatory && !this.selectedItems.length) {
                return this.updateMandatory();
            }
            // TODO: Make this smarter so it
            // doesn't have to iterate every
            // child in an update
            this.items.forEach(this.updateItem);
        },
        updateInternalValue: function updateInternalValue(value) {
            this.multiple ? this.updateMultiple(value) : this.updateSingle(value);
        },
        updateMandatory: function updateMandatory(last) {
            if (!this.items.length) return;
            var index = last ? this.items.length - 1 : 0;
            this.updateInternalValue(this.getValue(this.items[index], index));
        },
        updateMultiple: function updateMultiple(value) {
            var defaultValue = Array.isArray(this.internalValue) ? this.internalValue : [];
            var internalValue = defaultValue.slice();
            var index = internalValue.findIndex(function (val) {
                return val === value;
            });
            if (this.mandatory &&
            // Item already exists
            index > -1 &&
            // value would be reduced below min
            internalValue.length - 1 < 1) return;
            if (
            // Max is set
            this.max != null &&
            // Item doesn't exist
            index < 0 &&
            // value woudl be increased above max
            internalValue.length + 1 > this.max) return;
            index > -1 ? internalValue.splice(index, 1) : internalValue.push(value);
            this.internalValue = internalValue;
        },
        updateSingle: function updateSingle(value) {
            var isSame = value === this.internalValue;
            if (this.mandatory && isSame) return;
            this.internalValue = isSame ? undefined : value;
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-item-group',
            class: this.classes
        }, this.$slots.default);
    }
});
/* harmony default export */ __webpack_exports__["default"] = (BaseItemGroup.extend({
    name: 'v-item-group',
    provide: function provide() {
        return {
            itemGroup: this
        };
    }
}));

/***/ }),

/***/ "./src/components/VItemGroup/index.ts":
/*!********************************************!*\
  !*** ./src/components/VItemGroup/index.ts ***!
  \********************************************/
/*! exports provided: VItem, VItemGroup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VItem */ "./src/components/VItemGroup/VItem.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VItem", function() { return _VItem__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VItemGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VItemGroup */ "./src/components/VItemGroup/VItemGroup.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VItemGroup", function() { return _VItemGroup__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VItem: _VItem__WEBPACK_IMPORTED_MODULE_0__["default"],
        VItemGroup: _VItemGroup__WEBPACK_IMPORTED_MODULE_1__["default"]
    }
});

/***/ }),

/***/ "./src/components/VJumbotron/VJumbotron.js":
/*!*************************************************!*\
  !*** ./src/components/VJumbotron/VJumbotron.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_jumbotrons_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_jumbotrons.styl */ "./src/stylus/components/_jumbotrons.styl");
/* harmony import */ var _stylus_components_jumbotrons_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_jumbotrons_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/routable */ "./src/mixins/routable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");

// Mixins



// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-jumbotron',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_routable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__["default"]],
    props: {
        gradient: String,
        height: {
            type: [Number, String],
            default: '400px'
        },
        src: String,
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        backgroundStyles: function backgroundStyles() {
            var styles = {};
            if (this.gradient) {
                styles.background = "linear-gradient(" + this.gradient + ")";
            }
            return styles;
        },
        classes: function classes() {
            return this.themeClasses;
        },
        styles: function styles() {
            return {
                height: this.height
            };
        }
    },
    mounted: function mounted() {
        Object(_util_console__WEBPACK_IMPORTED_MODULE_4__["deprecate"])('v-jumbotron', this.src ? 'v-img' : 'v-responsive', this);
    },
    methods: {
        genBackground: function genBackground() {
            return this.$createElement('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-jumbotron__background',
                style: this.backgroundStyles
            }));
        },
        genContent: function genContent() {
            return this.$createElement('div', {
                staticClass: 'v-jumbotron__content'
            }, this.$slots.default);
        },
        genImage: function genImage() {
            if (!this.src) return null;
            if (this.$slots.img) return this.$slots.img({ src: this.src });
            return this.$createElement('img', {
                staticClass: 'v-jumbotron__image',
                attrs: { src: this.src }
            });
        },
        genWrapper: function genWrapper() {
            return this.$createElement('div', {
                staticClass: 'v-jumbotron__wrapper'
            }, [this.genImage(), this.genBackground(), this.genContent()]);
        }
    },
    render: function render(h) {
        var _a = this.generateRouteLink(this.classes),
            tag = _a.tag,
            data = _a.data;
        data.staticClass = 'v-jumbotron';
        data.style = this.styles;
        return h(tag, data, [this.genWrapper()]);
    }
});

/***/ }),

/***/ "./src/components/VJumbotron/index.js":
/*!********************************************!*\
  !*** ./src/components/VJumbotron/index.js ***!
  \********************************************/
/*! exports provided: VJumbotron, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VJumbotron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VJumbotron */ "./src/components/VJumbotron/VJumbotron.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VJumbotron", function() { return _VJumbotron__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VJumbotron__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VLabel/VLabel.js":
/*!*****************************************!*\
  !*** ./src/components/VLabel/VLabel.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_labels_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_labels.styl */ "./src/stylus/components/_labels.styl");
/* harmony import */ var _stylus_components_labels_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_labels_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Mixins


// Helpers

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-label',
    functional: true,
    mixins: [_mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        absolute: Boolean,
        color: {
            type: [Boolean, String],
            default: 'primary'
        },
        disabled: Boolean,
        focused: Boolean,
        for: String,
        left: {
            type: [Number, String],
            default: 0
        },
        right: {
            type: [Number, String],
            default: 'auto'
        },
        value: Boolean
    },
    render: function render(h, ctx) {
        var children = ctx.children,
            listeners = ctx.listeners,
            props = ctx.props;
        var data = {
            staticClass: 'v-label',
            'class': __assign({ 'v-label--active': props.value, 'v-label--is-disabled': props.disabled }, Object(_mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["functionalThemeClasses"])(ctx)),
            attrs: {
                for: props.for,
                'aria-hidden': !props.for
            },
            on: listeners,
            style: {
                left: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__["convertToUnit"])(props.left),
                right: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__["convertToUnit"])(props.right),
                position: props.absolute ? 'absolute' : 'relative'
            }
        };
        return h('label', _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"].options.methods.setTextColor(props.focused && props.color, data), children);
    }
});

/***/ }),

/***/ "./src/components/VLabel/index.js":
/*!****************************************!*\
  !*** ./src/components/VLabel/index.js ***!
  \****************************************/
/*! exports provided: VLabel, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VLabel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VLabel */ "./src/components/VLabel/VLabel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VLabel", function() { return _VLabel__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VLabel__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VList/VList.js":
/*!***************************************!*\
  !*** ./src/components/VList/VList.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_lists_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_lists.styl */ "./src/stylus/components/_lists.styl");
/* harmony import */ var _stylus_components_lists_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_lists_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Mixins


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-list',
    mixins: [Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_2__["provide"])('list'), _mixins_themeable__WEBPACK_IMPORTED_MODULE_1__["default"]],
    provide: function provide() {
        return {
            'listClick': this.listClick
        };
    },
    props: {
        dense: Boolean,
        expand: Boolean,
        subheader: Boolean,
        threeLine: Boolean,
        twoLine: Boolean
    },
    data: function data() {
        return {
            groups: []
        };
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-list--dense': this.dense, 'v-list--subheader': this.subheader, 'v-list--two-line': this.twoLine, 'v-list--three-line': this.threeLine }, this.themeClasses);
        }
    },
    methods: {
        register: function register(uid, cb) {
            this.groups.push({ uid: uid, cb: cb });
        },
        unregister: function unregister(uid) {
            var index = this.groups.findIndex(function (g) {
                return g.uid === uid;
            });
            if (index > -1) {
                this.groups.splice(index, 1);
            }
        },
        listClick: function listClick(uid) {
            if (this.expand) return;
            for (var i = this.groups.length; i--;) {
                this.groups[i].cb(uid);
            }
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-list',
            'class': this.classes
        };
        return h('div', data, [this.$slots.default]);
    }
});

/***/ }),

/***/ "./src/components/VList/VListGroup.js":
/*!********************************************!*\
  !*** ./src/components/VList/VListGroup.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_VIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_bootable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/bootable */ "./src/mixins/bootable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transitions */ "./src/components/transitions/index.js");
// Components

// Mixins



// Transitions

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-list-group',
    mixins: [_mixins_bootable__WEBPACK_IMPORTED_MODULE_1__["default"], Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_3__["inject"])('list', 'v-list-group', 'v-list'), _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    inject: ['listClick'],
    props: {
        activeClass: {
            type: String,
            default: 'primary--text'
        },
        appendIcon: {
            type: String,
            default: '$vuetify.icons.expand'
        },
        disabled: Boolean,
        group: String,
        noAction: Boolean,
        prependIcon: String,
        subGroup: Boolean
    },
    data: function data() {
        return {
            groups: []
        };
    },
    computed: {
        groupClasses: function groupClasses() {
            return {
                'v-list__group--active': this.isActive,
                'v-list__group--disabled': this.disabled
            };
        },
        headerClasses: function headerClasses() {
            return {
                'v-list__group__header--active': this.isActive,
                'v-list__group__header--sub-group': this.subGroup
            };
        },
        itemsClasses: function itemsClasses() {
            return {
                'v-list__group__items--no-action': this.noAction
            };
        }
    },
    watch: {
        isActive: function isActive(val) {
            if (!this.subGroup && val) {
                this.listClick(this._uid);
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
        this.list.register(this._uid, this.toggle);
        if (this.group && this.$route && this.value == null) {
            this.isActive = this.matchRoute(this.$route.path);
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.list.unregister(this._uid);
    },
    methods: {
        click: function click() {
            if (this.disabled) return;
            this.isActive = !this.isActive;
        },
        genIcon: function genIcon(icon) {
            return this.$createElement(_components_VIcon__WEBPACK_IMPORTED_MODULE_0__["default"], icon);
        },
        genAppendIcon: function genAppendIcon() {
            var icon = !this.subGroup ? this.appendIcon : false;
            if (!icon && !this.$slots.appendIcon) return null;
            return this.$createElement('div', {
                staticClass: 'v-list__group__header__append-icon'
            }, [this.$slots.appendIcon || this.genIcon(icon)]);
        },
        genGroup: function genGroup() {
            return this.$createElement('div', {
                staticClass: 'v-list__group__header',
                'class': this.headerClasses,
                on: Object.assign({}, {
                    click: this.click
                }, this.$listeners),
                ref: 'item'
            }, [this.genPrependIcon(), this.$slots.activator, this.genAppendIcon()]);
        },
        genItems: function genItems() {
            return this.$createElement('div', {
                staticClass: 'v-list__group__items',
                'class': this.itemsClasses,
                directives: [{
                    name: 'show',
                    value: this.isActive
                }],
                ref: 'group'
            }, this.showLazyContent(this.$slots.default));
        },
        genPrependIcon: function genPrependIcon() {
            var _a;
            var icon = this.prependIcon ? this.prependIcon : this.subGroup ? '$vuetify.icons.subgroup' : false;
            if (!icon && !this.$slots.prependIcon) return null;
            return this.$createElement('div', {
                staticClass: 'v-list__group__header__prepend-icon',
                'class': (_a = {}, _a[this.activeClass] = this.isActive, _a)
            }, [this.$slots.prependIcon || this.genIcon(icon)]);
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
        return h('div', {
            staticClass: 'v-list__group',
            'class': this.groupClasses
        }, [this.genGroup(), h(_transitions__WEBPACK_IMPORTED_MODULE_4__["VExpandTransition"], [this.genItems()])]);
    }
});

/***/ }),

/***/ "./src/components/VList/VListTile.js":
/*!*******************************************!*\
  !*** ./src/components/VList/VListTile.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/routable */ "./src/mixins/routable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../directives/ripple */ "./src/directives/ripple.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Mixins




// Directives

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-list-tile',
    directives: {
        Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_4__["default"]
    },
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_0__["default"], _mixins_routable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__["default"]],
    inheritAttrs: false,
    props: {
        activeClass: {
            type: String,
            default: 'primary--text'
        },
        avatar: Boolean,
        inactive: Boolean,
        tag: String
    },
    data: function data() {
        return {
            proxyClass: 'v-list__tile--active'
        };
    },
    computed: {
        listClasses: function listClasses() {
            return this.disabled ? { 'v-list--disabled': true } : undefined;
        },
        classes: function classes() {
            var _a;
            return __assign({ 'v-list__tile': true, 'v-list__tile--link': this.isLink && !this.inactive, 'v-list__tile--avatar': this.avatar, 'v-list__tile--disabled': this.disabled, 'v-list__tile--active': !this.to && this.isActive }, this.themeClasses, (_a = {}, _a[this.activeClass] = this.isActive, _a));
        },
        isLink: function isLink() {
            return this.href || this.to || this.$listeners && (this.$listeners.click || this.$listeners['!click']);
        }
    },
    render: function render(h) {
        var isRouteLink = !this.inactive && this.isLink;
        var _a = isRouteLink ? this.generateRouteLink(this.classes) : {
            tag: this.tag || 'div',
            data: {
                class: this.classes
            }
        },
            tag = _a.tag,
            data = _a.data;
        data.attrs = Object.assign({}, data.attrs, this.$attrs);
        return h('div', this.setTextColor(!this.disabled && this.color, {
            class: this.listClasses,
            attrs: {
                disabled: this.disabled
            },
            on: __assign({}, this.$listeners)
        }), [h(tag, data, this.$slots.default)]);
    }
});

/***/ }),

/***/ "./src/components/VList/VListTileAction.js":
/*!*************************************************!*\
  !*** ./src/components/VList/VListTileAction.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-list-tile-action',
    functional: true,
    render: function render(h, _a) {
        var data = _a.data,
            _b = _a.children,
            children = _b === void 0 ? [] : _b;
        data.staticClass = data.staticClass ? "v-list__tile__action " + data.staticClass : 'v-list__tile__action';
        var filteredChild = children.filter(function (VNode) {
            return VNode.isComment === false && VNode.text !== ' ';
        });
        if (filteredChild.length > 1) data.staticClass += ' v-list__tile__action--stack';
        return h('div', data, children);
    }
});

/***/ }),

/***/ "./src/components/VList/VListTileAvatar.js":
/*!*************************************************!*\
  !*** ./src/components/VList/VListTileAvatar.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VAvatar */ "./src/components/VAvatar/index.ts");
// Components

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-list-tile-avatar',
    functional: true,
    props: {
        color: String,
        size: {
            type: [Number, String],
            default: 40
        },
        tile: Boolean
    },
    render: function render(h, _a) {
        var data = _a.data,
            children = _a.children,
            props = _a.props;
        data.staticClass = ("v-list__tile__avatar " + (data.staticClass || '')).trim();
        var avatar = h(_VAvatar__WEBPACK_IMPORTED_MODULE_0__["default"], {
            props: {
                color: props.color,
                size: props.size,
                tile: props.tile
            }
        }, [children]);
        return h('div', data, [avatar]);
    }
});

/***/ }),

/***/ "./src/components/VList/index.js":
/*!***************************************!*\
  !*** ./src/components/VList/index.js ***!
  \***************************************/
/*! exports provided: VList, VListGroup, VListTile, VListTileAction, VListTileAvatar, VListTileActionText, VListTileContent, VListTileTitle, VListTileSubTitle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VListTileActionText", function() { return VListTileActionText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VListTileContent", function() { return VListTileContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VListTileTitle", function() { return VListTileTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VListTileSubTitle", function() { return VListTileSubTitle; });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _VList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VList */ "./src/components/VList/VList.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VList", function() { return _VList__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _VListGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VListGroup */ "./src/components/VList/VListGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListGroup", function() { return _VListGroup__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _VListTile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VListTile */ "./src/components/VList/VListTile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTile", function() { return _VListTile__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _VListTileAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VListTileAction */ "./src/components/VList/VListTileAction.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTileAction", function() { return _VListTileAction__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _VListTileAvatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VListTileAvatar */ "./src/components/VList/VListTileAvatar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTileAvatar", function() { return _VListTileAvatar__WEBPACK_IMPORTED_MODULE_5__["default"]; });








var VListTileActionText = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-list__tile__action-text', 'span');
var VListTileContent = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-list__tile__content', 'div');
var VListTileTitle = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-list__tile__title', 'div');
var VListTileSubTitle = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-list__tile__sub-title', 'div');
/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VList: _VList__WEBPACK_IMPORTED_MODULE_1__["default"],
        VListGroup: _VListGroup__WEBPACK_IMPORTED_MODULE_2__["default"],
        VListTile: _VListTile__WEBPACK_IMPORTED_MODULE_3__["default"],
        VListTileAction: _VListTileAction__WEBPACK_IMPORTED_MODULE_4__["default"],
        VListTileActionText: VListTileActionText,
        VListTileAvatar: _VListTileAvatar__WEBPACK_IMPORTED_MODULE_5__["default"],
        VListTileContent: VListTileContent,
        VListTileSubTitle: VListTileSubTitle,
        VListTileTitle: VListTileTitle
    }
});

/***/ }),

/***/ "./src/components/VMenu/VMenu.js":
/*!***************************************!*\
  !*** ./src/components/VMenu/VMenu.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_menus_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_menus.styl */ "./src/stylus/components/_menus.styl");
/* harmony import */ var _stylus_components_menus_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_menus_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_delayable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/delayable */ "./src/mixins/delayable.ts");
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/dependent */ "./src/mixins/dependent.ts");
/* harmony import */ var _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/detachable */ "./src/mixins/detachable.js");
/* harmony import */ var _mixins_menuable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/menuable.js */ "./src/mixins/menuable.js");
/* harmony import */ var _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/returnable */ "./src/mixins/returnable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_menu_activator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mixins/menu-activator */ "./src/components/VMenu/mixins/menu-activator.js");
/* harmony import */ var _mixins_menu_generators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mixins/menu-generators */ "./src/components/VMenu/mixins/menu-generators.js");
/* harmony import */ var _mixins_menu_keyable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mixins/menu-keyable */ "./src/components/VMenu/mixins/menu-keyable.js");
/* harmony import */ var _mixins_menu_position__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mixins/menu-position */ "./src/components/VMenu/mixins/menu-position.js");
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../directives/click-outside */ "./src/directives/click-outside.ts");
/* harmony import */ var _directives_resize__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../directives/resize */ "./src/directives/resize.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_ThemeProvider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../util/ThemeProvider */ "./src/util/ThemeProvider.ts");


// Mixins







// Component level mixins




// Directives


// Helpers


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend({
    name: 'v-menu',
    provide: function provide() {
        return {
            // Pass theme through to default slot
            theme: this.theme
        };
    },
    directives: {
        ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_13__["default"],
        Resize: _directives_resize__WEBPACK_IMPORTED_MODULE_14__["default"]
    },
    mixins: [_mixins_menu_activator__WEBPACK_IMPORTED_MODULE_9__["default"], _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_delayable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_menu_generators__WEBPACK_IMPORTED_MODULE_10__["default"], _mixins_menu_keyable__WEBPACK_IMPORTED_MODULE_11__["default"], _mixins_menuable_js__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_menu_position__WEBPACK_IMPORTED_MODULE_12__["default"], _mixins_returnable__WEBPACK_IMPORTED_MODULE_6__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_7__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_8__["default"]],
    props: {
        auto: Boolean,
        closeOnClick: {
            type: Boolean,
            default: true
        },
        closeOnContentClick: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
        fullWidth: Boolean,
        maxHeight: { default: 'auto' },
        offsetX: Boolean,
        offsetY: Boolean,
        openOnClick: {
            type: Boolean,
            default: true
        },
        openOnHover: Boolean,
        origin: {
            type: String,
            default: 'top left'
        },
        transition: {
            type: [Boolean, String],
            default: 'v-menu-transition'
        }
    },
    data: function data() {
        return {
            defaultOffset: 8,
            maxHeightAutoDefault: '200px',
            startIndex: 3,
            stopIndex: 0,
            hasJustFocused: false,
            resizeTimeout: null
        };
    },
    computed: {
        calculatedLeft: function calculatedLeft() {
            if (!this.auto) return this.calcLeft();
            return this.calcXOverflow(this.calcLeftAuto()) + "px";
        },
        calculatedMaxHeight: function calculatedMaxHeight() {
            return this.auto ? '200px' : Object(_util_helpers__WEBPACK_IMPORTED_MODULE_15__["convertToUnit"])(this.maxHeight);
        },
        calculatedMaxWidth: function calculatedMaxWidth() {
            return isNaN(this.maxWidth) ? this.maxWidth : this.maxWidth + "px";
        },
        calculatedMinWidth: function calculatedMinWidth() {
            if (this.minWidth) {
                return isNaN(this.minWidth) ? this.minWidth : this.minWidth + "px";
            }
            var minWidth = this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0);
            var calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth)) ? minWidth : parseInt(this.calculatedMaxWidth);
            return Math.min(calculatedMaxWidth, minWidth) + "px";
        },
        calculatedTop: function calculatedTop() {
            if (!this.auto || this.isAttached) return this.calcTop();
            return this.calcYOverflow(this.calcTopAuto()) + "px";
        },
        styles: function styles() {
            return {
                maxHeight: this.calculatedMaxHeight,
                minWidth: this.calculatedMinWidth,
                maxWidth: this.calculatedMaxWidth,
                top: this.calculatedTop,
                left: this.calculatedLeft,
                transformOrigin: this.origin,
                zIndex: this.zIndex || this.activeZIndex
            };
        },
        tileHeight: function tileHeight() {
            return this.dense ? 36 : 48;
        }
    },
    watch: {
        activator: function activator(newActivator, oldActivator) {
            this.removeActivatorEvents(oldActivator);
            this.addActivatorEvents(newActivator);
        },
        isContentActive: function isContentActive(val) {
            this.hasJustFocused = val;
        }
    },
    methods: {
        activate: function activate() {
            // This exists primarily for v-select
            // helps determine which tiles to activate
            this.getTiles();
            // Update coordinates and dimensions of menu
            // and its activator
            this.updateDimensions();
            // Start the transition
            requestAnimationFrame(this.startTransition);
            // Once transitioning, calculate scroll position
            setTimeout(this.calculateScroll, 50);
        },
        closeConditional: function closeConditional() {
            return this.isActive && this.closeOnClick;
        },
        onResize: function onResize() {
            if (!this.isActive) return;
            // Account for screen resize
            // and orientation change
            // eslint-disable-next-line no-unused-expressions
            this.$refs.content.offsetWidth;
            this.updateDimensions();
            // When resizing to a smaller width
            // content width is evaluated before
            // the new activator width has been
            // set, causing it to not size properly
            // hacky but will revisit in the future
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(this.updateDimensions, 100);
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-menu',
            class: { 'v-menu--inline': !this.fullWidth && this.$slots.activator },
            directives: [{
                arg: 500,
                name: 'resize',
                value: this.onResize
            }],
            on: {
                keydown: this.onKeyDown
            }
        };
        return h('div', data, [this.genActivator(), this.$createElement(_util_ThemeProvider__WEBPACK_IMPORTED_MODULE_16__["default"], {
            props: {
                root: true,
                light: this.light,
                dark: this.dark
            }
        }, [this.genTransition()])]);
    }
}));

/***/ }),

/***/ "./src/components/VMenu/index.js":
/*!***************************************!*\
  !*** ./src/components/VMenu/index.js ***!
  \***************************************/
/*! exports provided: VMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VMenu */ "./src/components/VMenu/VMenu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VMenu", function() { return _VMenu__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VMenu__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VMenu/mixins/menu-activator.js":
/*!*******************************************************!*\
  !*** ./src/components/VMenu/mixins/menu-activator.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Menu activator
 *
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        activatorClickHandler: function activatorClickHandler(e) {
            if (this.disabled) return;
            if (this.openOnClick && !this.isActive) {
                this.getActivator().focus();
                this.isActive = true;
                this.absoluteX = e.clientX;
                this.absoluteY = e.clientY;
            } else if (this.closeOnClick && this.isActive) {
                this.getActivator().blur();
                this.isActive = false;
            }
        },
        mouseEnterHandler: function mouseEnterHandler() {
            var _this = this;
            this.runDelay('open', function () {
                if (_this.hasJustFocused) return;
                _this.hasJustFocused = true;
                _this.isActive = true;
            });
        },
        mouseLeaveHandler: function mouseLeaveHandler(e) {
            var _this = this;
            // Prevent accidental re-activation
            this.runDelay('close', function () {
                if (_this.$refs.content.contains(e.relatedTarget)) return;
                requestAnimationFrame(function () {
                    _this.isActive = false;
                    _this.callDeactivate();
                });
            });
        },
        addActivatorEvents: function addActivatorEvents(activator) {
            if (activator === void 0) {
                activator = null;
            }
            if (!activator) return;
            activator.addEventListener('click', this.activatorClickHandler);
        },
        removeActivatorEvents: function removeActivatorEvents(activator) {
            if (activator === void 0) {
                activator = null;
            }
            if (!activator) return;
            activator.removeEventListener('click', this.activatorClickHandler);
        }
    }
});

/***/ }),

/***/ "./src/components/VMenu/mixins/menu-generators.js":
/*!********************************************************!*\
  !*** ./src/components/VMenu/mixins/menu-generators.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        genActivator: function genActivator() {
            if (!this.$slots.activator) return null;
            var options = {
                staticClass: 'v-menu__activator',
                'class': {
                    'v-menu__activator--active': this.hasJustFocused || this.isActive,
                    'v-menu__activator--disabled': this.disabled
                },
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
        genDirectives: function genDirectives() {
            var _this = this;
            // Do not add click outside for hover menu
            var directives = !this.openOnHover && this.closeOnClick ? [{
                name: 'click-outside',
                value: function value() {
                    return _this.isActive = false;
                },
                args: {
                    closeConditional: this.closeConditional,
                    include: function include() {
                        return __spread([_this.$el], _this.getOpenDependentElements());
                    }
                }
            }] : [];
            directives.push({
                name: 'show',
                value: this.isContentActive
            });
            return directives;
        },
        genContent: function genContent() {
            var _this = this;
            var _a;
            var options = {
                attrs: this.getScopeIdAttrs(),
                staticClass: 'v-menu__content',
                'class': __assign({}, this.rootThemeClasses, (_a = { 'v-menu__content--auto': this.auto, 'menuable__content__active': this.isActive }, _a[this.contentClass.trim()] = true, _a)),
                style: this.styles,
                directives: this.genDirectives(),
                ref: 'content',
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        if (e.target.getAttribute('disabled')) return;
                        if (_this.closeOnContentClick) _this.isActive = false;
                    }
                }
            };
            !this.disabled && this.openOnHover && (options.on.mouseenter = this.mouseEnterHandler);
            this.openOnHover && (options.on.mouseleave = this.mouseLeaveHandler);
            return this.$createElement('div', options, this.showLazyContent(this.$slots.default));
        }
    }
});

/***/ }),

/***/ "./src/components/VMenu/mixins/menu-keyable.js":
/*!*****************************************************!*\
  !*** ./src/components/VMenu/mixins/menu-keyable.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/helpers */ "./src/util/helpers.ts");
/**
 * Menu keyable
 *
 * @mixin
 *
 * Primarily used to support VSelect
 * Handles opening and closing of VMenu from keystrokes
 * Will conditionally highlight VListTiles for VSelect
 */
// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            listIndex: -1,
            tiles: []
        };
    },
    watch: {
        isActive: function isActive(val) {
            if (!val) this.listIndex = -1;
        },
        listIndex: function listIndex(next, prev) {
            if (next in this.tiles) {
                var tile = this.tiles[next];
                tile.classList.add('v-list__tile--highlighted');
                this.$refs.content.scrollTop = tile.offsetTop - tile.clientHeight;
            }
            prev in this.tiles && this.tiles[prev].classList.remove('v-list__tile--highlighted');
        }
    },
    methods: {
        onKeyDown: function onKeyDown(e) {
            if ([_util_helpers__WEBPACK_IMPORTED_MODULE_0__["keyCodes"].down, _util_helpers__WEBPACK_IMPORTED_MODULE_0__["keyCodes"].up, _util_helpers__WEBPACK_IMPORTED_MODULE_0__["keyCodes"].enter].includes(e.keyCode)) e.preventDefault();
            if ([_util_helpers__WEBPACK_IMPORTED_MODULE_0__["keyCodes"].esc, _util_helpers__WEBPACK_IMPORTED_MODULE_0__["keyCodes"].tab].includes(e.keyCode)) {
                return this.isActive = false;
            }
            this.changeListIndex(e);
        },
        changeListIndex: function changeListIndex(e) {
            // For infinite scroll and autocomplete, re-evaluate children
            this.getTiles();
            if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_0__["keyCodes"].down && this.listIndex < this.tiles.length - 1) {
                this.listIndex++;
                // Allow user to set listIndex to -1 so
                // that the list can be un-highlighted
            } else if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_0__["keyCodes"].up && this.listIndex > -1) {
                this.listIndex--;
            } else if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_0__["keyCodes"].enter && this.listIndex !== -1) {
                this.tiles[this.listIndex].click();
            }
        },
        getTiles: function getTiles() {
            this.tiles = this.$refs.content.querySelectorAll('.v-list__tile');
        }
    }
});

/***/ }),

/***/ "./src/components/VMenu/mixins/menu-position.js":
/*!******************************************************!*\
  !*** ./src/components/VMenu/mixins/menu-position.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Menu position
 *
 * @mixin
 *
 * Used for calculating an automatic position (used for VSelect)
 * Will position the VMenu content properly over the VSelect
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        // Revisit this
        calculateScroll: function calculateScroll() {
            if (this.selectedIndex === null) return;
            var scrollTop = 0;
            if (this.selectedIndex >= this.stopIndex) {
                scrollTop = this.$refs.content.scrollHeight;
            } else if (this.selectedIndex > this.startIndex) {
                scrollTop =
                // Top position of selected item
                this.selectedIndex * this.tileHeight +
                // Remove half of a tile's height
                this.tileHeight / 2 +
                // Account for padding offset on lists
                this.defaultOffset / 2 -
                // Half of the auto content's height
                100;
            }
            if (this.$refs.content) {
                this.$refs.content.scrollTop = scrollTop;
            }
        },
        calcLeftAuto: function calcLeftAuto() {
            if (this.isAttached) return 0;
            return parseInt(this.dimensions.activator.left - this.defaultOffset * 2);
        },
        calcTopAuto: function calcTopAuto() {
            var selectedIndex = Array.from(this.tiles).findIndex(function (n) {
                return n.classList.contains('v-list__tile--active');
            });
            if (selectedIndex === -1) {
                this.selectedIndex = null;
                return this.computedTop;
            }
            this.selectedIndex = selectedIndex;
            this.stopIndex = this.tiles.length > 4 ? this.tiles.length - 4 : this.tiles.length;
            var additionalOffset = this.defaultOffset;
            var offsetPadding;
            // Menu should be centered
            if (selectedIndex > this.startIndex && selectedIndex < this.stopIndex) {
                offsetPadding = 1.5 * this.tileHeight;
                // Menu should be offset top
            } else if (selectedIndex >= this.stopIndex) {
                // Being offset top means
                // we have to account for top
                // and bottom list padding
                additionalOffset *= 2;
                offsetPadding = (selectedIndex - this.stopIndex) * this.tileHeight;
                // Menu should be offset bottom
            } else {
                offsetPadding = selectedIndex * this.tileHeight;
            }
            return this.computedTop + additionalOffset - offsetPadding - this.tileHeight / 2;
        }
    }
});

/***/ }),

/***/ "./src/components/VMessages/VMessages.js":
/*!***********************************************!*\
  !*** ./src/components/VMessages/VMessages.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_messages_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_messages.styl */ "./src/stylus/components/_messages.styl");
/* harmony import */ var _stylus_components_messages_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_messages_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
// Styles

// Mixins


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-messages',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        value: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    methods: {
        genChildren: function genChildren() {
            return this.$createElement('transition-group', {
                staticClass: 'v-messages__wrapper',
                attrs: {
                    name: 'message-transition',
                    tag: 'div'
                }
            }, this.value.map(this.genMessage));
        },
        genMessage: function genMessage(message, key) {
            return this.$createElement('div', {
                staticClass: 'v-messages__message',
                key: key,
                domProps: {
                    innerHTML: message
                }
            });
        }
    },
    render: function render(h) {
        return h('div', this.setTextColor(this.color, {
            staticClass: 'v-messages',
            class: this.themeClasses
        }), [this.genChildren()]);
    }
});

/***/ }),

/***/ "./src/components/VMessages/index.js":
/*!*******************************************!*\
  !*** ./src/components/VMessages/index.js ***!
  \*******************************************/
/*! exports provided: VMessages, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VMessages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VMessages */ "./src/components/VMessages/VMessages.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VMessages", function() { return _VMessages__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VMessages__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VNavigationDrawer/VNavigationDrawer.js":
/*!***************************************************************!*\
  !*** ./src/components/VNavigationDrawer/VNavigationDrawer.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_navigation_drawer_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_navigation-drawer.styl */ "./src/stylus/components/_navigation-drawer.styl");
/* harmony import */ var _stylus_components_navigation_drawer_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_navigation_drawer_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/applicationable */ "./src/mixins/applicationable.ts");
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/dependent */ "./src/mixins/dependent.ts");
/* harmony import */ var _mixins_overlayable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/overlayable */ "./src/mixins/overlayable.js");
/* harmony import */ var _mixins_ssr_bootable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/ssr-bootable */ "./src/mixins/ssr-bootable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../directives/click-outside */ "./src/directives/click-outside.ts");
/* harmony import */ var _directives_resize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../directives/resize */ "./src/directives/resize.ts");
/* harmony import */ var _directives_touch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../directives/touch */ "./src/directives/touch.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// Mixins





// Directives



// Helpers

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-navigation-drawer',
    directives: {
        ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_6__["default"],
        Resize: _directives_resize__WEBPACK_IMPORTED_MODULE_7__["default"],
        Touch: _directives_touch__WEBPACK_IMPORTED_MODULE_8__["default"]
    },
    mixins: [Object(_mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__["default"])(null, ['miniVariant', 'right', 'width']), _mixins_dependent__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_overlayable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_ssr_bootable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_5__["default"]],
    props: {
        clipped: Boolean,
        disableRouteWatcher: Boolean,
        disableResizeWatcher: Boolean,
        height: {
            type: [Number, String],
            default: '100%'
        },
        floating: Boolean,
        miniVariant: Boolean,
        miniVariantWidth: {
            type: [Number, String],
            default: 80
        },
        mobileBreakPoint: {
            type: [Number, String],
            default: 1264
        },
        permanent: Boolean,
        right: Boolean,
        stateless: Boolean,
        temporary: Boolean,
        touchless: Boolean,
        width: {
            type: [Number, String],
            default: 300
        },
        value: { required: false }
    },
    data: function data() {
        return {
            isActive: false,
            touchArea: {
                left: 0,
                right: 0
            }
        };
    },
    computed: {
        /**
         * Used for setting an app
         * value from a dynamic
         * property. Called from
         * applicationable.js
         *
         * @return {string}
         */
        applicationProperty: function applicationProperty() {
            return this.right ? 'right' : 'left';
        },
        calculatedTransform: function calculatedTransform() {
            if (this.isActive) return 0;
            return this.right ? this.calculatedWidth : -this.calculatedWidth;
        },
        calculatedWidth: function calculatedWidth() {
            return this.miniVariant ? this.miniVariantWidth : this.width;
        },
        classes: function classes() {
            return __assign({ 'v-navigation-drawer': true, 'v-navigation-drawer--absolute': this.absolute, 'v-navigation-drawer--clipped': this.clipped, 'v-navigation-drawer--close': !this.isActive, 'v-navigation-drawer--fixed': !this.absolute && (this.app || this.fixed), 'v-navigation-drawer--floating': this.floating, 'v-navigation-drawer--is-mobile': this.isMobile, 'v-navigation-drawer--mini-variant': this.miniVariant, 'v-navigation-drawer--open': this.isActive, 'v-navigation-drawer--right': this.right, 'v-navigation-drawer--temporary': this.temporary }, this.themeClasses);
        },
        hasApp: function hasApp() {
            return this.app && !this.isMobile && !this.temporary;
        },
        isMobile: function isMobile() {
            return !this.stateless && !this.permanent && !this.temporary && this.$vuetify.breakpoint.width < parseInt(this.mobileBreakPoint, 10);
        },
        marginTop: function marginTop() {
            if (!this.hasApp) return 0;
            var marginTop = this.$vuetify.application.bar;
            marginTop += this.clipped ? this.$vuetify.application.top : 0;
            return marginTop;
        },
        maxHeight: function maxHeight() {
            if (!this.hasApp) return null;
            var maxHeight = this.$vuetify.application.bottom + this.$vuetify.application.footer + this.$vuetify.application.bar;
            if (!this.clipped) return maxHeight;
            return maxHeight + this.$vuetify.application.top;
        },
        reactsToClick: function reactsToClick() {
            return !this.stateless && !this.permanent && (this.isMobile || this.temporary);
        },
        reactsToMobile: function reactsToMobile() {
            return !this.disableResizeWatcher && !this.stateless && !this.permanent && !this.temporary;
        },
        reactsToRoute: function reactsToRoute() {
            return !this.disableRouteWatcher && !this.stateless && (this.temporary || this.isMobile);
        },
        resizeIsDisabled: function resizeIsDisabled() {
            return this.disableResizeWatcher || this.stateless;
        },
        showOverlay: function showOverlay() {
            return this.isActive && (this.isMobile || this.temporary);
        },
        styles: function styles() {
            var styles = {
                height: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_9__["convertToUnit"])(this.height),
                marginTop: this.marginTop + "px",
                maxHeight: "calc(100% - " + +this.maxHeight + "px)",
                transform: "translateX(" + this.calculatedTransform + "px)",
                width: this.calculatedWidth + "px"
            };
            return styles;
        }
    },
    watch: {
        $route: function $route() {
            if (this.reactsToRoute && this.closeConditional()) {
                this.isActive = false;
            }
        },
        isActive: function isActive(val) {
            this.$emit('input', val);
            this.callUpdate();
        },
        /**
         * When mobile changes, adjust
         * the active state only when
         * there has been a previous
         * value
         */
        isMobile: function isMobile(val, prev) {
            !val && this.isActive && !this.temporary && this.removeOverlay();
            if (prev == null || this.resizeIsDisabled || !this.reactsToMobile) return;
            this.isActive = !val;
            this.callUpdate();
        },
        permanent: function permanent(val) {
            // If enabling prop
            // enable the drawer
            if (val) {
                this.isActive = true;
            }
            this.callUpdate();
        },
        showOverlay: function showOverlay(val) {
            if (val) this.genOverlay();else this.removeOverlay();
        },
        temporary: function temporary() {
            this.callUpdate();
        },
        value: function value(val) {
            if (this.permanent) return;
            if (val == null) return this.init();
            if (val !== this.isActive) this.isActive = val;
        }
    },
    beforeMount: function beforeMount() {
        this.init();
    },
    methods: {
        calculateTouchArea: function calculateTouchArea() {
            if (!this.$el.parentNode) return;
            var parentRect = this.$el.parentNode.getBoundingClientRect();
            this.touchArea = {
                left: parentRect.left + 50,
                right: parentRect.right - 50
            };
        },
        closeConditional: function closeConditional() {
            return this.isActive && this.reactsToClick;
        },
        genDirectives: function genDirectives() {
            var _this = this;
            var directives = [{
                name: 'click-outside',
                value: function value() {
                    return _this.isActive = false;
                },
                args: {
                    closeConditional: this.closeConditional,
                    include: this.getOpenDependentElements
                }
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
        },
        /**
         * Sets state before mount to avoid
         * entry transitions in SSR
         *
         * @return {void}
         */
        init: function init() {
            if (this.permanent) {
                this.isActive = true;
            } else if (this.stateless || this.value != null) {
                this.isActive = this.value;
            } else if (!this.temporary) {
                this.isActive = !this.isMobile;
            }
        },
        swipeRight: function swipeRight(e) {
            if (this.isActive && !this.right) return;
            this.calculateTouchArea();
            if (Math.abs(e.touchendX - e.touchstartX) < 100) return;
            if (!this.right && e.touchstartX <= this.touchArea.left) this.isActive = true;else if (this.right && this.isActive) this.isActive = false;
        },
        swipeLeft: function swipeLeft(e) {
            if (this.isActive && this.right) return;
            this.calculateTouchArea();
            if (Math.abs(e.touchendX - e.touchstartX) < 100) return;
            if (this.right && e.touchstartX >= this.touchArea.right) this.isActive = true;else if (!this.right && this.isActive) this.isActive = false;
        },
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication: function updateApplication() {
            return !this.isActive || this.temporary || this.isMobile ? 0 : this.calculatedWidth;
        }
    },
    render: function render(h) {
        var _this = this;
        var data = {
            'class': this.classes,
            style: this.styles,
            directives: this.genDirectives(),
            on: {
                click: function click() {
                    if (!_this.miniVariant) return;
                    _this.$emit('update:miniVariant', false);
                },
                transitionend: function transitionend(e) {
                    if (e.target !== e.currentTarget) return;
                    _this.$emit('transitionend', e);
                    // IE11 does not support new Event('resize')
                    var resizeEvent = document.createEvent('UIEvents');
                    resizeEvent.initUIEvent('resize', true, false, window, 0);
                    window.dispatchEvent(resizeEvent);
                }
            }
        };
        return h('aside', data, [this.$slots.default, h('div', { 'class': 'v-navigation-drawer__border' })]);
    }
});

/***/ }),

/***/ "./src/components/VNavigationDrawer/index.js":
/*!***************************************************!*\
  !*** ./src/components/VNavigationDrawer/index.js ***!
  \***************************************************/
/*! exports provided: VNavigationDrawer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VNavigationDrawer */ "./src/components/VNavigationDrawer/VNavigationDrawer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VNavigationDrawer", function() { return _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VNavigationDrawer__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VOverflowBtn/VOverflowBtn.js":
/*!*****************************************************!*\
  !*** ./src/components/VOverflowBtn/VOverflowBtn.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_overflow_buttons_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_overflow-buttons.styl */ "./src/stylus/components/_overflow-buttons.styl");
/* harmony import */ var _stylus_components_overflow_buttons_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_overflow_buttons_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VSelect/VSelect */ "./src/components/VSelect/VSelect.js");
/* harmony import */ var _VAutocomplete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VAutocomplete */ "./src/components/VAutocomplete/index.js");
/* harmony import */ var _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VTextField/VTextField */ "./src/components/VTextField/VTextField.js");
/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../VBtn */ "./src/components/VBtn/index.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
// Styles

// Extensions





/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-overflow-btn',
    extends: _VAutocomplete__WEBPACK_IMPORTED_MODULE_2__["default"],
    props: {
        segmented: Boolean,
        editable: Boolean,
        transition: _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].props.transition
    },
    computed: {
        classes: function classes() {
            return Object.assign(_VAutocomplete__WEBPACK_IMPORTED_MODULE_2__["default"].computed.classes.call(this), {
                'v-overflow-btn': true,
                'v-overflow-btn--segmented': this.segmented,
                'v-overflow-btn--editable': this.editable
            });
        },
        isAnyValueAllowed: function isAnyValueAllowed() {
            return this.editable || _VAutocomplete__WEBPACK_IMPORTED_MODULE_2__["default"].computed.isAnyValueAllowed.call(this);
        },
        isSingle: function isSingle() {
            return true;
        },
        computedItems: function computedItems() {
            return this.segmented ? this.allItems : this.filteredItems;
        },
        $_menuProps: function $_menuProps() {
            var props = _VAutocomplete__WEBPACK_IMPORTED_MODULE_2__["default"].computed.$_menuProps.call(this);
            props.transition = props.transition || 'v-menu-transition';
            return props;
        }
    },
    methods: {
        genSelections: function genSelections() {
            return this.editable ? _VAutocomplete__WEBPACK_IMPORTED_MODULE_2__["default"].methods.genSelections.call(this) : _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.genSelections.call(this); // Override v-autocomplete's override
        },
        genCommaSelection: function genCommaSelection(item, index, last) {
            return this.segmented ? this.genSegmentedBtn(item) : _VSelect_VSelect__WEBPACK_IMPORTED_MODULE_1__["default"].methods.genCommaSelection.call(this, item, index, last);
        },
        genInput: function genInput() {
            var input = _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_3__["default"].methods.genInput.call(this);
            input.data.domProps.value = this.editable ? this.internalSearch : '';
            input.data.attrs.readonly = !this.isAnyValueAllowed;
            return input;
        },
        genLabel: function genLabel() {
            if (this.editable && this.isFocused) return null;
            var label = _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_3__["default"].methods.genLabel.call(this);
            if (!label) return label;
            // Reset previously set styles from parent
            label.data.style = {};
            return label;
        },
        genSegmentedBtn: function genSegmentedBtn(item) {
            var _this = this;
            var itemValue = this.getValue(item);
            var itemObj = this.computedItems.find(function (i) {
                return _this.getValue(i) === itemValue;
            }) || item;
            if (!itemObj.text || !itemObj.callback) {
                Object(_util_console__WEBPACK_IMPORTED_MODULE_5__["consoleWarn"])('When using \'segmented\' prop without a selection slot, items must contain both a text and callback property', this);
                return null;
            }
            return this.$createElement(_VBtn__WEBPACK_IMPORTED_MODULE_4__["default"], {
                props: { flat: true },
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        itemObj.callback(e);
                    }
                }
            }, [itemObj.text]);
        },
        setSelectedItems: function setSelectedItems() {
            if (this.internalValue == null) {
                this.selectedItems = [];
            } else {
                this.selectedItems = [this.internalValue];
            }
        }
    }
});

/***/ }),

/***/ "./src/components/VOverflowBtn/index.js":
/*!**********************************************!*\
  !*** ./src/components/VOverflowBtn/index.js ***!
  \**********************************************/
/*! exports provided: VOverflowBtn, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VOverflowBtn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VOverflowBtn */ "./src/components/VOverflowBtn/VOverflowBtn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VOverflowBtn", function() { return _VOverflowBtn__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VOverflowBtn__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VPagination/VPagination.ts":
/*!***************************************************!*\
  !*** ./src/components/VPagination/VPagination.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_pagination_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_pagination.styl */ "./src/stylus/components/_pagination.styl");
/* harmony import */ var _stylus_components_pagination_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_pagination_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _directives_resize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../directives/resize */ "./src/directives/resize.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};


// Directives

// Mixins



/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_3__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_5__["default"]).extend({
    name: 'v-pagination',
    directives: { Resize: _directives_resize__WEBPACK_IMPORTED_MODULE_2__["default"] },
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
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function data() {
        return {
            maxButtons: 0,
            selected: null
        };
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-pagination': true, 'v-pagination--circle': this.circle, 'v-pagination--disabled': this.disabled }, this.themeClasses);
        },
        items: function items() {
            var maxLength = parseInt(this.totalVisible, 10) || this.maxButtons;
            if (this.length <= maxLength) {
                return this.range(1, this.length);
            }
            var even = maxLength % 2 === 0 ? 1 : 0;
            var left = Math.floor(maxLength / 2);
            var right = this.length - left + 1 + even;
            if (this.value > left && this.value < right) {
                var start = this.value - left + 2;
                var end = this.value + left - 2 - even;
                return __spread([1, '...'], this.range(start, end), ['...', this.length]);
            } else if (this.value === left) {
                var end = this.value + left - 1 - even;
                return __spread(this.range(1, end), ['...', this.length]);
            } else if (this.value === right) {
                var start = this.value - left + 1;
                return __spread([1, '...'], this.range(start, this.length));
            } else {
                return __spread(this.range(1, left), ['...'], this.range(right, this.length));
            }
        }
    },
    watch: {
        value: function value() {
            this.init();
        }
    },
    mounted: function mounted() {
        this.init();
    },
    methods: {
        init: function init() {
            var _this = this;
            this.selected = null;
            this.$nextTick(this.onResize);
            // TODO: Change this (f75dee3a, cbdf7caa)
            setTimeout(function () {
                return _this.selected = _this.value;
            }, 100);
        },
        onResize: function onResize() {
            var width = this.$el && this.$el.parentElement ? this.$el.parentElement.clientWidth : window.innerWidth;
            this.maxButtons = Math.floor((width - 96) / 42);
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
            return h('li', [h('button', {
                staticClass: 'v-pagination__navigation',
                class: {
                    'v-pagination__navigation--disabled': disabled
                },
                attrs: {
                    type: 'button'
                },
                on: disabled ? {} : { click: fn }
            }, [h(_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], [icon])])]);
        },
        genItem: function genItem(h, i) {
            var _this = this;
            var color = i === this.value && (this.color || 'primary');
            return h('button', this.setBackgroundColor(color, {
                staticClass: 'v-pagination__item',
                class: {
                    'v-pagination__item--active': i === this.value
                },
                attrs: {
                    type: 'button'
                },
                on: {
                    click: function click() {
                        return _this.$emit('input', i);
                    }
                }
            }), [i.toString()]);
        },
        genItems: function genItems(h) {
            var _this = this;
            return this.items.map(function (i, index) {
                return h('li', { key: index }, [isNaN(Number(i)) ? h('span', { class: 'v-pagination__more' }, [i.toString()]) : _this.genItem(h, i)]);
            });
        }
    },
    render: function render(h) {
        var children = [this.genIcon(h, this.$vuetify.rtl ? this.nextIcon : this.prevIcon, this.value <= 1, this.previous), this.genItems(h), this.genIcon(h, this.$vuetify.rtl ? this.prevIcon : this.nextIcon, this.value >= this.length, this.next)];
        return h('ul', {
            directives: [{
                modifiers: { quiet: true },
                name: 'resize',
                value: this.onResize
            }],
            class: this.classes
        }, children);
    }
}));

/***/ }),

/***/ "./src/components/VPagination/index.ts":
/*!*********************************************!*\
  !*** ./src/components/VPagination/index.ts ***!
  \*********************************************/
/*! exports provided: VPagination, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VPagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VPagination */ "./src/components/VPagination/VPagination.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VPagination", function() { return _VPagination__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VPagination__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VPaper/VPaper.ts":
/*!*****************************************!*\
  !*** ./src/components/VPaper/VPaper.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_paper_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_paper.styl */ "./src/stylus/components/_paper.styl");
/* harmony import */ var _stylus_components_paper_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_paper_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_elevatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/elevatable */ "./src/mixins/elevatable.ts");
/* harmony import */ var _mixins_measurable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/measurable */ "./src/mixins/measurable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Mixins




// Helpers

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_5__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_elevatable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_measurable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_4__["default"]).extend({
    name: 'v-paper',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        tile: Boolean
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-paper': true, 'v-paper--tile': this.tile }, this.themeClasses, this.elevationClasses);
        },
        styles: function styles() {
            return this.measurableStyles;
        }
    },
    render: function render(h) {
        var data = {
            class: this.classes,
            style: this.styles
        };
        return h(this.tag, this.setBackgroundColor(this.color, data), this.$slots.default);
    }
}));

/***/ }),

/***/ "./src/components/VPaper/index.ts":
/*!****************************************!*\
  !*** ./src/components/VPaper/index.ts ***!
  \****************************************/
/*! exports provided: VPaper, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VPaper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VPaper */ "./src/components/VPaper/VPaper.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VPaper", function() { return _VPaper__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VPaper__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VParallax/VParallax.ts":
/*!***********************************************!*\
  !*** ./src/components/VParallax/VParallax.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_parallax_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_parallax.styl */ "./src/stylus/components/_parallax.styl");
/* harmony import */ var _stylus_components_parallax_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_parallax_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_translatable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/translatable */ "./src/mixins/translatable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
// Style

// Mixins


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_2__["default"])(_mixins_translatable__WEBPACK_IMPORTED_MODULE_1__["default"]).extend({
    name: 'v-parallax',
    props: {
        alt: String,
        height: {
            type: [String, Number],
            default: 500
        },
        src: String
    },
    data: function data() {
        return {
            isBooted: false
        };
    },
    computed: {
        styles: function styles() {
            return {
                display: 'block',
                opacity: this.isBooted ? 1 : 0,
                transform: "translate(-50%, " + this.parallax + "px)"
            };
        }
    },
    watch: {
        parallax: function parallax() {
            this.isBooted = true;
        }
    },
    mounted: function mounted() {
        this.init();
    },
    methods: {
        init: function init() {
            var _this = this;
            var img = this.$refs.img;
            if (!img) return;
            if (img.complete) {
                this.translate();
                this.listeners();
            } else {
                img.addEventListener('load', function () {
                    _this.translate();
                    _this.listeners();
                }, false);
            }
        },
        objHeight: function objHeight() {
            return this.$refs.img.naturalHeight;
        }
    },
    render: function render(h) {
        var imgData = {
            staticClass: 'v-parallax__image',
            style: this.styles,
            attrs: {
                src: this.src
            },
            ref: 'img'
        };
        if (this.alt) imgData.attrs.alt = this.alt;
        var container = h('div', {
            staticClass: 'v-parallax__image-container'
        }, [h('img', imgData)]);
        var content = h('div', {
            staticClass: 'v-parallax__content'
        }, this.$slots.default);
        return h('div', {
            staticClass: 'v-parallax',
            style: {
                height: this.height + "px"
            },
            on: this.$listeners
        }, [container, content]);
    }
}));

/***/ }),

/***/ "./src/components/VParallax/index.ts":
/*!*******************************************!*\
  !*** ./src/components/VParallax/index.ts ***!
  \*******************************************/
/*! exports provided: VParallax, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VParallax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VParallax */ "./src/components/VParallax/VParallax.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VParallax", function() { return _VParallax__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VParallax__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VPicker/VPicker.js":
/*!*******************************************!*\
  !*** ./src/components/VPicker/VPicker.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_pickers_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_pickers.styl */ "./src/stylus/components/_pickers.styl");
/* harmony import */ var _stylus_components_pickers_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_pickers_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stylus_components_cards_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stylus/components/_cards.styl */ "./src/stylus/components/_cards.styl");
/* harmony import */ var _stylus_components_cards_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_cards_styl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


// Mixins


// Helpers

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-picker',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__["default"]],
    props: {
        fullWidth: Boolean,
        landscape: Boolean,
        transition: {
            type: String,
            default: 'fade-transition'
        },
        width: {
            type: [Number, String],
            default: 290
        }
    },
    computed: {
        computedTitleColor: function computedTitleColor() {
            var defaultTitleColor = this.isDark ? null : this.color || 'primary';
            return this.color || defaultTitleColor;
        }
    },
    methods: {
        genTitle: function genTitle() {
            return this.$createElement('div', this.setBackgroundColor(this.computedTitleColor, {
                staticClass: 'v-picker__title',
                'class': {
                    'v-picker__title--landscape': this.landscape
                }
            }), this.$slots.title);
        },
        genBodyTransition: function genBodyTransition() {
            return this.$createElement('transition', {
                props: {
                    name: this.transition
                }
            }, this.$slots.default);
        },
        genBody: function genBody() {
            return this.$createElement('div', {
                staticClass: 'v-picker__body',
                'class': this.themeClasses,
                style: this.fullWidth ? undefined : {
                    width: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["convertToUnit"])(this.width)
                }
            }, [this.genBodyTransition()]);
        },
        genActions: function genActions() {
            return this.$createElement('div', {
                staticClass: 'v-picker__actions v-card__actions'
            }, this.$slots.actions);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-picker v-card',
            'class': __assign({ 'v-picker--landscape': this.landscape, 'v-picker--full-width': this.fullWidth }, this.themeClasses)
        }, [this.$slots.title ? this.genTitle() : null, this.genBody(), this.$slots.actions ? this.genActions() : null]);
    }
});

/***/ }),

/***/ "./src/components/VPicker/index.js":
/*!*****************************************!*\
  !*** ./src/components/VPicker/index.js ***!
  \*****************************************/
/*! exports provided: VPicker, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VPicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VPicker */ "./src/components/VPicker/VPicker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VPicker", function() { return _VPicker__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VPicker__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VProgressCircular/VProgressCircular.ts":
/*!***************************************************************!*\
  !*** ./src/components/VProgressCircular/VProgressCircular.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_progress_circular_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_progress-circular.styl */ "./src/stylus/components/_progress-circular.styl");
/* harmony import */ var _stylus_components_progress_circular_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_progress_circular_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");

// Mixins


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_2__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"]).extend({
    name: 'v-progress-circular',
    props: {
        button: Boolean,
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
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        calculatedSize: function calculatedSize() {
            return Number(this.size) + (this.button ? 8 : 0);
        },
        circumference: function circumference() {
            return 2 * Math.PI * this.radius;
        },
        classes: function classes() {
            return {
                'v-progress-circular--indeterminate': this.indeterminate,
                'v-progress-circular--button': this.button
            };
        },
        normalizedValue: function normalizedValue() {
            if (this.value < 0) {
                return 0;
            }
            if (this.value > 100) {
                return 100;
            }
            return parseInt(this.value, 10);
        },
        radius: function radius() {
            return 20;
        },
        strokeDashArray: function strokeDashArray() {
            return Math.round(this.circumference * 1000) / 1000;
        },
        strokeDashOffset: function strokeDashOffset() {
            return (100 - this.normalizedValue) / 100 * this.circumference + 'px';
        },
        strokeWidth: function strokeWidth() {
            return this.width / +this.size * this.viewBoxSize * 2;
        },
        styles: function styles() {
            return {
                height: this.calculatedSize + "px",
                width: this.calculatedSize + "px"
            };
        },
        svgStyles: function svgStyles() {
            return {
                transform: "rotate(" + this.rotate + "deg)"
            };
        },
        viewBoxSize: function viewBoxSize() {
            return this.radius / (1 - this.width / +this.size);
        }
    },
    methods: {
        genCircle: function genCircle(h, name, offset) {
            return h('circle', {
                class: "v-progress-circular__" + name,
                attrs: {
                    fill: 'transparent',
                    cx: 2 * this.viewBoxSize,
                    cy: 2 * this.viewBoxSize,
                    r: this.radius,
                    'stroke-width': this.strokeWidth,
                    'stroke-dasharray': this.strokeDashArray,
                    'stroke-dashoffset': offset
                }
            });
        },
        genSvg: function genSvg(h) {
            var children = [this.indeterminate || this.genCircle(h, 'underlay', 0), this.genCircle(h, 'overlay', this.strokeDashOffset)];
            return h('svg', {
                style: this.svgStyles,
                attrs: {
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: this.viewBoxSize + " " + this.viewBoxSize + " " + 2 * this.viewBoxSize + " " + 2 * this.viewBoxSize
                }
            }, children);
        }
    },
    render: function render(h) {
        var info = h('div', { staticClass: 'v-progress-circular__info' }, [this.$slots.default]);
        var svg = this.genSvg(h);
        return h('div', this.setTextColor(this.color, {
            staticClass: 'v-progress-circular',
            attrs: {
                'role': 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
            },
            class: this.classes,
            style: this.styles,
            on: this.$listeners
        }), [svg, info]);
    }
}));

/***/ }),

/***/ "./src/components/VProgressCircular/index.ts":
/*!***************************************************!*\
  !*** ./src/components/VProgressCircular/index.ts ***!
  \***************************************************/
/*! exports provided: VProgressCircular, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VProgressCircular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VProgressCircular */ "./src/components/VProgressCircular/VProgressCircular.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VProgressCircular", function() { return _VProgressCircular__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VProgressCircular__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VProgressLinear/VProgressLinear.ts":
/*!***********************************************************!*\
  !*** ./src/components/VProgressLinear/VProgressLinear.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_progress_linear_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_progress-linear.styl */ "./src/stylus/components/_progress-linear.styl");
/* harmony import */ var _stylus_components_progress_linear_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_progress_linear_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transitions */ "./src/components/transitions/index.js");

// Mixins

// Helpers



/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_3__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"]).extend({
    name: 'v-progress-linear',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        backgroundColor: {
            type: String,
            default: null
        },
        backgroundOpacity: {
            type: [Number, String],
            default: null
        },
        bufferValue: {
            type: [Number, String],
            default: 100
        },
        color: {
            type: String,
            default: 'primary'
        },
        height: {
            type: [Number, String],
            default: 7
        },
        indeterminate: Boolean,
        query: Boolean,
        value: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        backgroundStyle: function backgroundStyle() {
            var backgroundOpacity = this.backgroundOpacity == null ? this.backgroundColor ? 1 : 0.3 : parseFloat(this.backgroundOpacity);
            return {
                height: this.active ? Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__["convertToUnit"])(this.height) : 0,
                opacity: backgroundOpacity,
                width: this.normalizedBufer + "%"
            };
        },
        effectiveWidth: function effectiveWidth() {
            if (!this.normalizedBufer) {
                return 0;
            }
            return +this.normalizedValue * 100 / +this.normalizedBufer;
        },
        normalizedBufer: function normalizedBufer() {
            if (this.bufferValue < 0) {
                return 0;
            }
            if (this.bufferValue > 100) {
                return 100;
            }
            return parseInt(this.bufferValue, 10);
        },
        normalizedValue: function normalizedValue() {
            if (this.value < 0) {
                return 0;
            }
            if (this.value > 100) {
                return 100;
            }
            return parseInt(this.value, 10);
        },
        styles: function styles() {
            var styles = {};
            if (!this.active) {
                styles.height = 0;
            }
            if (!this.indeterminate && parseInt(this.normalizedBufer, 10) !== 100) {
                styles.width = this.normalizedBufer + "%";
            }
            return styles;
        }
    },
    methods: {
        genDeterminate: function genDeterminate(h) {
            return h('div', this.setBackgroundColor(this.color, {
                ref: 'front',
                staticClass: "v-progress-linear__bar__determinate",
                style: {
                    width: this.effectiveWidth + "%"
                }
            }));
        },
        genBar: function genBar(h, name) {
            var _a;
            return h('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: (_a = {}, _a[name] = true, _a)
            }));
        },
        genIndeterminate: function genIndeterminate(h) {
            return h('div', {
                ref: 'front',
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: {
                    'v-progress-linear__bar__indeterminate--active': this.active
                }
            }, [this.genBar(h, 'long'), this.genBar(h, 'short')]);
        }
    },
    render: function render(h) {
        var fade = h(_transitions__WEBPACK_IMPORTED_MODULE_4__["VFadeTransition"], this.indeterminate ? [this.genIndeterminate(h)] : []);
        var slide = h(_transitions__WEBPACK_IMPORTED_MODULE_4__["VSlideXTransition"], this.indeterminate ? [] : [this.genDeterminate(h)]);
        var bar = h('div', {
            staticClass: 'v-progress-linear__bar',
            style: this.styles
        }, [fade, slide]);
        var background = h('div', this.setBackgroundColor(this.backgroundColor || this.color, {
            staticClass: 'v-progress-linear__background',
            style: this.backgroundStyle
        }));
        return h('div', {
            staticClass: 'v-progress-linear',
            attrs: {
                'role': 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': this.normalizedBufer,
                'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
            },
            class: {
                'v-progress-linear--query': this.query
            },
            style: {
                height: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__["convertToUnit"])(this.height)
            },
            on: this.$listeners
        }, [background, bar]);
    }
}));

/***/ }),

/***/ "./src/components/VProgressLinear/index.ts":
/*!*************************************************!*\
  !*** ./src/components/VProgressLinear/index.ts ***!
  \*************************************************/
/*! exports provided: VProgressLinear, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VProgressLinear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VProgressLinear */ "./src/components/VProgressLinear/VProgressLinear.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VProgressLinear", function() { return _VProgressLinear__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VProgressLinear__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VRadioGroup/VRadio.js":
/*!**********************************************!*\
  !*** ./src/components/VRadioGroup/VRadio.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_radios_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_radios.styl */ "./src/stylus/components/_radios.styl");
/* harmony import */ var _stylus_components_radios_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_radios_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _VLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VLabel */ "./src/components/VLabel/index.js");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_rippleable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/rippleable */ "./src/mixins/rippleable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_selectable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/selectable */ "./src/mixins/selectable.js");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};
// Styles

// Components


// Mixins





/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-radio',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_rippleable__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_7__["inject"])('radio', 'v-radio', 'v-radio-group'), _mixins_themeable__WEBPACK_IMPORTED_MODULE_5__["default"]],
    inheritAttrs: false,
    props: {
        color: {
            type: String,
            default: 'accent'
        },
        disabled: Boolean,
        label: String,
        onIcon: {
            type: String,
            default: '$vuetify.icons.radioOn'
        },
        offIcon: {
            type: String,
            default: '$vuetify.icons.radioOff'
        },
        readonly: Boolean,
        value: null
    },
    data: function data() {
        return {
            isActive: false,
            isFocused: false,
            parentError: false
        };
    },
    computed: {
        computedData: function computedData() {
            return this.setTextColor(!this.parentError && this.isActive && this.color, {
                staticClass: 'v-radio',
                'class': __assign({ 'v-radio--is-disabled': this.isDisabled, 'v-radio--is-focused': this.isFocused }, this.themeClasses)
            });
        },
        computedColor: function computedColor() {
            return this.isActive ? this.color : this.radio.validationState || false;
        },
        computedIcon: function computedIcon() {
            return this.isActive ? this.onIcon : this.offIcon;
        },
        hasState: function hasState() {
            return this.isActive || !!this.radio.validationState;
        },
        isDisabled: function isDisabled() {
            return this.disabled || !!this.radio.disabled;
        },
        isReadonly: function isReadonly() {
            return this.readonly || !!this.radio.readonly;
        }
    },
    mounted: function mounted() {
        this.radio.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.radio.unregister(this);
    },
    methods: {
        genInput: function genInput() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a;
            // We can't actually use the mixin directly because
            // it's made for standalone components, but its
            // genInput method is exactly what we need
            return (_a = _mixins_selectable__WEBPACK_IMPORTED_MODULE_6__["default"].methods.genInput).call.apply(_a, __spread([this], args));
        },
        genLabel: function genLabel() {
            return this.$createElement(_VLabel__WEBPACK_IMPORTED_MODULE_2__["default"], {
                on: { click: this.onChange },
                attrs: {
                    for: this.id
                },
                props: {
                    color: this.radio.validationState || false,
                    dark: this.dark,
                    focused: this.hasState,
                    light: this.light
                }
            }, this.$slots.label || this.label);
        },
        genRadio: function genRadio() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [this.genInput('radio', __assign({ name: this.radio.name || (this.radio._uid ? 'v-radio-' + this.radio._uid : false), value: this.value }, this.$attrs)), !this.isDisabled && this.genRipple(this.setTextColor(this.computedColor)), this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], this.setTextColor(this.computedColor, {
                props: {
                    dark: this.dark,
                    light: this.light
                }
            }), this.computedIcon)]);
        },
        onFocus: function onFocus() {
            this.isFocused = true;
        },
        onBlur: function onBlur(e) {
            this.isFocused = false;
            this.$emit('blur', e);
        },
        onChange: function onChange() {
            if (this.isDisabled || this.isReadonly) return;
            if (!this.isDisabled && (!this.isActive || !this.radio.mandatory)) {
                this.$emit('change', this.value);
            }
        },
        onKeydown: function onKeydown() {}
    },
    render: function render(h) {
        return h('div', this.computedData, [this.genRadio(), this.genLabel()]);
    }
});

/***/ }),

/***/ "./src/components/VRadioGroup/VRadioGroup.js":
/*!***************************************************!*\
  !*** ./src/components/VRadioGroup/VRadioGroup.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_selection_controls_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_selection-controls.styl */ "./src/stylus/components/_selection-controls.styl");
/* harmony import */ var _stylus_components_selection_controls_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_selection_controls_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stylus_components_radio_group_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stylus/components/_radio-group.styl */ "./src/stylus/components/_radio-group.styl");
/* harmony import */ var _stylus_components_radio_group_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_radio_group_styl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _VInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VInput */ "./src/components/VInput/index.js");
/* harmony import */ var _mixins_comparable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/comparable */ "./src/mixins/comparable.ts");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
// Styles


// Components

// Mixins


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-radio-group',
    extends: _VInput__WEBPACK_IMPORTED_MODULE_2__["default"],
    mixins: [_mixins_comparable__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_4__["provide"])('radio')],
    model: {
        prop: 'value',
        event: 'change'
    },
    provide: function provide() {
        return {
            radio: this
        };
    },
    props: {
        column: {
            type: Boolean,
            default: true
        },
        height: {
            type: [Number, String],
            default: 'auto'
        },
        mandatory: {
            type: Boolean,
            default: true
        },
        name: String,
        row: Boolean,
        // If no value set on VRadio
        // will match valueComparator
        // force default to null
        value: {
            default: null
        }
    },
    data: function data() {
        return {
            internalTabIndex: -1,
            radios: []
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-input--selection-controls v-input--radio-group': true,
                'v-input--radio-group--column': this.column && !this.row,
                'v-input--radio-group--row': this.row
            };
        }
    },
    watch: {
        hasError: 'setErrorState',
        internalValue: 'setActiveRadio'
    },
    mounted: function mounted() {
        this.setErrorState(this.hasError);
        this.setActiveRadio();
    },
    methods: {
        genDefaultSlot: function genDefaultSlot() {
            return this.$createElement('div', {
                staticClass: 'v-input--radio-group__input',
                attrs: {
                    role: 'radiogroup'
                }
            }, _VInput__WEBPACK_IMPORTED_MODULE_2__["default"].methods.genDefaultSlot.call(this));
        },
        onRadioChange: function onRadioChange(value) {
            if (this.disabled) return;
            this.hasInput = true;
            this.internalValue = value;
            this.setActiveRadio();
            this.$nextTick(this.validate);
        },
        onRadioBlur: function onRadioBlur(e) {
            if (!e.relatedTarget || !e.relatedTarget.classList.contains('v-radio')) {
                this.hasInput = true;
                this.$emit('blur', e);
            }
        },
        register: function register(radio) {
            radio.isActive = this.valueComparator(this.internalValue, radio.value);
            radio.$on('change', this.onRadioChange);
            radio.$on('blur', this.onRadioBlur);
            this.radios.push(radio);
        },
        setErrorState: function setErrorState(val) {
            for (var index = this.radios.length; --index >= 0;) {
                this.radios[index].parentError = val;
            }
        },
        setActiveRadio: function setActiveRadio() {
            for (var index = this.radios.length; --index >= 0;) {
                var radio = this.radios[index];
                radio.isActive = this.valueComparator(this.internalValue, radio.value);
            }
        },
        unregister: function unregister(radio) {
            radio.$off('change', this.onRadioChange);
            radio.$off('blur', this.onRadioBlur);
            var index = this.radios.findIndex(function (r) {
                return r === radio;
            });
            /* istanbul ignore else */
            if (index > -1) this.radios.splice(index, 1);
        }
    }
});

/***/ }),

/***/ "./src/components/VRadioGroup/index.js":
/*!*********************************************!*\
  !*** ./src/components/VRadioGroup/index.js ***!
  \*********************************************/
/*! exports provided: VRadioGroup, VRadio, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VRadioGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VRadioGroup */ "./src/components/VRadioGroup/VRadioGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VRadioGroup", function() { return _VRadioGroup__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VRadio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VRadio */ "./src/components/VRadioGroup/VRadio.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VRadio", function() { return _VRadio__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VRadioGroup: _VRadioGroup__WEBPACK_IMPORTED_MODULE_0__["default"],
        VRadio: _VRadio__WEBPACK_IMPORTED_MODULE_1__["default"]
    }
});

/***/ }),

/***/ "./src/components/VRangeSlider/VRangeSlider.js":
/*!*****************************************************!*\
  !*** ./src/components/VRangeSlider/VRangeSlider.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_range_sliders_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_range-sliders.styl */ "./src/stylus/components/_range-sliders.styl");
/* harmony import */ var _stylus_components_range_sliders_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_range_sliders_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VSlider */ "./src/components/VSlider/index.js");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
// Styles

// Extensions


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-range-slider',
    extends: _VSlider__WEBPACK_IMPORTED_MODULE_1__["default"],
    props: {
        value: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    data: function data(vm) {
        return {
            activeThumb: null,
            lazyValue: !vm.value.length ? [0, 0] : vm.value
        };
    },
    computed: {
        classes: function classes() {
            return Object.assign({}, {
                'v-input--range-slider': true
            }, _VSlider__WEBPACK_IMPORTED_MODULE_1__["default"].computed.classes.call(this));
        },
        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                var _this = this;
                var _a = this,
                    min = _a.min,
                    max = _a.max;
                // Round value to ensure the
                // entire slider range can
                // be selected with step
                var value = val.map(function (v) {
                    return _this.roundValue(Math.min(Math.max(v, min), max));
                });
                // Switch values if range and wrong order
                if (value[0] > value[1] || value[1] < value[0]) {
                    if (this.activeThumb !== null) this.activeThumb = this.activeThumb === 1 ? 0 : 1;
                    value = [value[1], value[0]];
                }
                this.lazyValue = value;
                if (!Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__["deepEqual"])(value, this.value)) this.$emit('input', value);
                this.validate();
            }
        },
        inputWidth: function inputWidth() {
            var _this = this;
            return this.internalValue.map(function (v) {
                return (_this.roundValue(v) - _this.min) / (_this.max - _this.min) * 100;
            });
        },
        isDirty: function isDirty() {
            var _this = this;
            return this.internalValue.some(function (v) {
                return v !== _this.min;
            }) || this.alwaysDirty;
        },
        trackFillStyles: function trackFillStyles() {
            var styles = _VSlider__WEBPACK_IMPORTED_MODULE_1__["default"].computed.trackFillStyles.call(this);
            var fillPercent = Math.abs(this.inputWidth[0] - this.inputWidth[1]);
            styles.width = "calc(" + fillPercent + "% - " + this.trackPadding + "px)";
            styles[this.$vuetify.rtl ? 'right' : 'left'] = this.inputWidth[0] + "%";
            return styles;
        },
        trackPadding: function trackPadding() {
            if (this.isDirty || this.internalValue[0]) return 0;
            return _VSlider__WEBPACK_IMPORTED_MODULE_1__["default"].computed.trackPadding.call(this);
        }
    },
    methods: {
        getIndexOfClosestValue: function getIndexOfClosestValue(arr, v) {
            if (Math.abs(arr[0] - v) < Math.abs(arr[1] - v)) return 0;else return 1;
        },
        genInput: function genInput() {
            var _this = this;
            return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__["createRange"])(2).map(function (i) {
                var input = _VSlider__WEBPACK_IMPORTED_MODULE_1__["default"].methods.genInput.call(_this);
                input.data.attrs.value = _this.internalValue[i];
                input.data.on.focus = function (e) {
                    _this.activeThumb = i;
                    _VSlider__WEBPACK_IMPORTED_MODULE_1__["default"].methods.onFocus.call(_this, e);
                };
                return input;
            });
        },
        genChildren: function genChildren() {
            var _this = this;
            return [this.genInput(), this.genTrackContainer(), this.genSteps(), Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__["createRange"])(2).map(function (i) {
                var value = _this.internalValue[i];
                var onDrag = function onDrag(e) {
                    _this.isActive = true;
                    _this.activeThumb = i;
                    _this.onThumbMouseDown(e);
                };
                var valueWidth = _this.inputWidth[i];
                var isActive = (_this.isFocused || _this.isActive) && _this.activeThumb === i;
                return _this.genThumbContainer(value, valueWidth, isActive, onDrag);
            })];
        },
        onSliderClick: function onSliderClick(e) {
            if (!this.isActive) {
                this.isFocused = true;
                this.onMouseMove(e, true);
                this.$emit('change', this.internalValue);
            }
        },
        onMouseMove: function onMouseMove(e, trackClick) {
            if (trackClick === void 0) {
                trackClick = false;
            }
            var _a = this.parseMouseMove(e),
                value = _a.value,
                isInsideTrack = _a.isInsideTrack;
            if (isInsideTrack) {
                if (trackClick) this.activeThumb = this.getIndexOfClosestValue(this.internalValue, value);
                this.setInternalValue(value);
            }
        },
        onKeyDown: function onKeyDown(e) {
            var value = this.parseKeyDown(e, this.internalValue[this.activeThumb]);
            if (value == null) return;
            this.setInternalValue(value);
        },
        setInternalValue: function setInternalValue(value) {
            var _this = this;
            this.internalValue = this.internalValue.map(function (v, i) {
                if (i === _this.activeThumb) return value;else return Number(v);
            });
        }
    }
});

/***/ }),

/***/ "./src/components/VRangeSlider/index.js":
/*!**********************************************!*\
  !*** ./src/components/VRangeSlider/index.js ***!
  \**********************************************/
/*! exports provided: VRangeSlider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VRangeSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VRangeSlider */ "./src/components/VRangeSlider/VRangeSlider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VRangeSlider", function() { return _VRangeSlider__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VRangeSlider__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VRating/VRating.ts":
/*!*******************************************!*\
  !*** ./src/components/VRating/VRating.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_rating_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_rating.styl */ "./src/stylus/components/_rating.styl");
/* harmony import */ var _stylus_components_rating_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_rating_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/delayable */ "./src/mixins/delayable.ts");
/* harmony import */ var _mixins_sizeable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/sizeable */ "./src/mixins/sizeable.ts");
/* harmony import */ var _mixins_rippleable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/rippleable */ "./src/mixins/rippleable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
// Styles

// Components

// Mixins





// Utilities


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_8__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_delayable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_rippleable__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_sizeable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__["default"]).extend({
    name: 'v-rating',
    props: {
        backgroundColor: {
            type: String,
            default: 'accent'
        },
        color: {
            type: String,
            default: 'primary'
        },
        dense: Boolean,
        emptyIcon: {
            type: String,
            default: '$vuetify.icons.ratingEmpty'
        },
        fullIcon: {
            type: String,
            default: '$vuetify.icons.ratingFull'
        },
        halfIcon: {
            type: String,
            default: '$vuetify.icons.ratingHalf'
        },
        halfIncrements: Boolean,
        length: {
            type: [Number, String],
            default: 5
        },
        clearable: Boolean,
        readonly: Boolean,
        hover: Boolean,
        value: {
            type: Number,
            default: 0
        }
    },
    data: function data() {
        return {
            hoverIndex: -1,
            internalValue: this.value
        };
    },
    computed: {
        directives: function directives() {
            if (this.readonly || !this.ripple) return [];
            return [{
                name: 'ripple',
                value: { circle: true }
            }];
        },
        iconProps: function iconProps() {
            var _a = this.$props,
                dark = _a.dark,
                medium = _a.medium,
                large = _a.large,
                light = _a.light,
                small = _a.small,
                size = _a.size,
                xLarge = _a.xLarge;
            return {
                dark: dark,
                medium: medium,
                large: large,
                light: light,
                size: size,
                small: small,
                xLarge: xLarge
            };
        },
        isHovering: function isHovering() {
            return this.hover && this.hoverIndex >= 0;
        }
    },
    watch: {
        internalValue: function internalValue(val) {
            val !== this.value && this.$emit('input', val);
        },
        value: function value(val) {
            this.internalValue = val;
        }
    },
    methods: {
        createClickFn: function createClickFn(i) {
            var _this = this;
            return function (e) {
                if (_this.readonly) return;
                var newValue = _this.genHoverIndex(e, i);
                if (_this.clearable && _this.internalValue === newValue) {
                    _this.internalValue = 0;
                } else {
                    _this.internalValue = newValue;
                }
            };
        },
        createProps: function createProps(i) {
            var props = {
                index: i,
                value: this.internalValue,
                click: this.createClickFn(i),
                isFilled: Math.floor(this.internalValue) > i,
                isHovered: Math.floor(this.hoverIndex) > i
            };
            if (this.halfIncrements) {
                props.isHalfHovered = !props.isHovered && (this.hoverIndex - i) % 1 > 0;
                props.isHalfFilled = !props.isFilled && (this.internalValue - i) % 1 > 0;
            }
            return props;
        },
        genHoverIndex: function genHoverIndex(e, i) {
            return i + (this.isHalfEvent(e) ? 0.5 : 1);
        },
        getIconName: function getIconName(props) {
            var isFull = this.isHovering ? props.isHovered : props.isFilled;
            var isHalf = this.isHovering ? props.isHalfHovered : props.isHalfFilled;
            return isFull ? this.fullIcon : isHalf ? this.halfIcon : this.emptyIcon;
        },
        getColor: function getColor(props) {
            if (this.isHovering) {
                if (props.isHovered || props.isHalfHovered) return this.color;
            } else {
                if (props.isFilled || props.isHalfFilled) return this.color;
            }
            return this.backgroundColor;
        },
        isHalfEvent: function isHalfEvent(e) {
            if (this.halfIncrements) {
                var rect = e.target && e.target.getBoundingClientRect();
                if (rect && e.pageX - rect.left < rect.width / 2) return true;
            }
            return false;
        },
        onMouseEnter: function onMouseEnter(e, i) {
            var _this = this;
            this.runDelay('open', function () {
                _this.hoverIndex = _this.genHoverIndex(e, i);
            });
        },
        onMouseLeave: function onMouseLeave() {
            var _this = this;
            this.runDelay('close', function () {
                return _this.hoverIndex = -1;
            });
        },
        genItem: function genItem(i) {
            var _this = this;
            var props = this.createProps(i);
            if (this.$scopedSlots.item) return this.$scopedSlots.item(props);
            var listeners = {
                click: props.click
            };
            if (this.hover) {
                listeners.mouseenter = function (e) {
                    return _this.onMouseEnter(e, i);
                };
                listeners.mouseleave = this.onMouseLeave;
                if (this.halfIncrements) {
                    listeners.mousemove = function (e) {
                        return _this.onMouseEnter(e, i);
                    };
                }
            }
            return this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], this.setTextColor(this.getColor(props), {
                directives: this.directives,
                props: this.iconProps,
                on: listeners
            }), [this.getIconName(props)]);
        }
    },
    render: function render(h) {
        var _this = this;
        var children = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["createRange"])(Number(this.length)).map(function (i) {
            return _this.genItem(i);
        });
        return h('div', {
            staticClass: 'v-rating',
            class: {
                'v-rating--readonly': this.readonly,
                'v-rating--dense': this.dense
            }
        }, children);
    }
}));

/***/ }),

/***/ "./src/components/VRating/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VRating/index.ts ***!
  \*****************************************/
/*! exports provided: VRating, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VRating__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VRating */ "./src/components/VRating/VRating.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VRating", function() { return _VRating__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VRating__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VResponsive/VResponsive.ts":
/*!***************************************************!*\
  !*** ./src/components/VResponsive/VResponsive.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_responsive_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_responsive.styl */ "./src/stylus/components/_responsive.styl");
/* harmony import */ var _stylus_components_responsive_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_responsive_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_measurable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/measurable */ "./src/mixins/measurable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");

// Mixins

// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_2__["default"])(_mixins_measurable__WEBPACK_IMPORTED_MODULE_1__["default"]).extend({
    name: 'v-responsive',
    props: {
        aspectRatio: [String, Number]
    },
    computed: {
        computedAspectRatio: function computedAspectRatio() {
            return Number(this.aspectRatio);
        },
        aspectStyle: function aspectStyle() {
            return this.computedAspectRatio ? { paddingBottom: 1 / this.computedAspectRatio * 100 + '%' } : undefined;
        },
        __cachedSizer: function __cachedSizer() {
            if (!this.aspectStyle) return [];
            return this.$createElement('div', {
                style: this.aspectStyle,
                staticClass: 'v-responsive__sizer'
            });
        }
    },
    methods: {
        genContent: function genContent() {
            return this.$createElement('div', {
                staticClass: 'v-responsive__content'
            }, this.$slots.default);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-responsive',
            style: this.measurableStyles,
            on: this.$listeners
        }, [this.__cachedSizer, this.genContent()]);
    }
}));

/***/ }),

/***/ "./src/components/VResponsive/index.ts":
/*!*********************************************!*\
  !*** ./src/components/VResponsive/index.ts ***!
  \*********************************************/
/*! exports provided: VResponsive, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VResponsive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VResponsive */ "./src/components/VResponsive/VResponsive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VResponsive", function() { return _VResponsive__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VResponsive__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VSelect/VSelect.js":
/*!*******************************************!*\
  !*** ./src/components/VSelect/VSelect.js ***!
  \*******************************************/
/*! exports provided: defaultMenuProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMenuProps", function() { return defaultMenuProps; });
/* harmony import */ var _stylus_components_text_fields_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_text-fields.styl */ "./src/stylus/components/_text-fields.styl");
/* harmony import */ var _stylus_components_text_fields_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_text_fields_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stylus_components_select_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stylus/components/_select.styl */ "./src/stylus/components/_select.styl");
/* harmony import */ var _stylus_components_select_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_select_styl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _VChip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VChip */ "./src/components/VChip/index.ts");
/* harmony import */ var _VMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VMenu */ "./src/components/VMenu/index.js");
/* harmony import */ var _VSelectList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VSelectList */ "./src/components/VSelect/VSelectList.js");
/* harmony import */ var _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VTextField/VTextField */ "./src/components/VTextField/VTextField.js");
/* harmony import */ var _mixins_comparable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/comparable */ "./src/mixins/comparable.ts");
/* harmony import */ var _mixins_filterable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../mixins/filterable */ "./src/mixins/filterable.ts");
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../directives/click-outside */ "./src/directives/click-outside.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __values = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
// Styles


// Components



// Extensions

// Mixins


// Directives

// Helpers


var defaultMenuProps = {
    closeOnClick: false,
    closeOnContentClick: false,
    openOnClick: false,
    maxHeight: 300
};
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-select',
    directives: {
        ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_8__["default"]
    },
    extends: _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_5__["default"],
    mixins: [_mixins_comparable__WEBPACK_IMPORTED_MODULE_6__["default"], _mixins_filterable__WEBPACK_IMPORTED_MODULE_7__["default"]],
    props: {
        appendIcon: {
            type: String,
            default: '$vuetify.icons.dropdown'
        },
        appendIconCb: Function,
        attach: {
            type: null,
            default: false
        },
        browserAutocomplete: {
            type: String,
            default: 'on'
        },
        cacheItems: Boolean,
        chips: Boolean,
        clearable: Boolean,
        deletableChips: Boolean,
        dense: Boolean,
        hideSelected: Boolean,
        items: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        itemAvatar: {
            type: [String, Array, Function],
            default: 'avatar'
        },
        itemDisabled: {
            type: [String, Array, Function],
            default: 'disabled'
        },
        itemText: {
            type: [String, Array, Function],
            default: 'text'
        },
        itemValue: {
            type: [String, Array, Function],
            default: 'value'
        },
        menuProps: {
            type: [String, Array, Object],
            default: function _default() {
                return defaultMenuProps;
            }
        },
        multiple: Boolean,
        openOnClear: Boolean,
        returnObject: Boolean,
        searchInput: {
            default: null
        },
        smallChips: Boolean
    },
    data: function data(vm) {
        return {
            attrsInput: { role: 'combobox' },
            cachedItems: vm.cacheItems ? vm.items : [],
            content: null,
            isBooted: false,
            isMenuActive: false,
            lastItem: 20,
            // As long as a value is defined, show it
            // Otherwise, check if multiple
            // to determine which default to provide
            lazyValue: vm.value !== undefined ? vm.value : vm.multiple ? [] : undefined,
            selectedIndex: -1,
            selectedItems: []
        };
    },
    computed: {
        /* All items that the select has */
        allItems: function allItems() {
            return this.filterDuplicates(this.cachedItems.concat(this.items));
        },
        classes: function classes() {
            return Object.assign({}, _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_5__["default"].computed.classes.call(this), {
                'v-select': true,
                'v-select--chips': this.hasChips,
                'v-select--chips--small': this.smallChips,
                'v-select--is-menu-active': this.isMenuActive
            });
        },
        /* Used by other components to overwrite */
        computedItems: function computedItems() {
            return this.allItems;
        },
        counterValue: function counterValue() {
            return this.multiple ? this.selectedItems.length : (this.getText(this.selectedItems[0]) || '').toString().length;
        },
        directives: function directives() {
            return this.isFocused ? [{
                name: 'click-outside',
                value: this.blur,
                args: {
                    closeConditional: this.closeConditional
                }
            }] : undefined;
        },
        dynamicHeight: function dynamicHeight() {
            return 'auto';
        },
        hasChips: function hasChips() {
            return this.chips || this.smallChips;
        },
        hasSlot: function hasSlot() {
            return Boolean(this.hasChips || this.$scopedSlots.selection);
        },
        isDirty: function isDirty() {
            return this.selectedItems.length > 0;
        },
        listData: function listData() {
            return {
                props: {
                    action: this.multiple && !this.isHidingSelected,
                    color: this.color,
                    dense: this.dense,
                    hideSelected: this.hideSelected,
                    items: this.virtualizedItems,
                    noDataText: this.$vuetify.t(this.noDataText),
                    selectedItems: this.selectedItems,
                    itemAvatar: this.itemAvatar,
                    itemDisabled: this.itemDisabled,
                    itemValue: this.itemValue,
                    itemText: this.itemText
                },
                on: {
                    select: this.selectItem
                },
                scopedSlots: {
                    item: this.$scopedSlots.item
                }
            };
        },
        staticList: function staticList() {
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                Object(_util_console__WEBPACK_IMPORTED_MODULE_10__["consoleError"])('assert: staticList should not be called if slots are used');
            }
            return this.$createElement(_VSelectList__WEBPACK_IMPORTED_MODULE_4__["default"], this.listData);
        },
        virtualizedItems: function virtualizedItems() {
            return this.$_menuProps.auto ? this.computedItems : this.computedItems.slice(0, this.lastItem);
        },
        menuCanShow: function menuCanShow() {
            return true;
        },
        $_menuProps: function $_menuProps() {
            var normalisedProps;
            normalisedProps = typeof this.menuProps === 'string' ? this.menuProps.split(',') : this.menuProps;
            if (Array.isArray(normalisedProps)) {
                normalisedProps = normalisedProps.reduce(function (acc, p) {
                    acc[p.trim()] = true;
                    return acc;
                }, {});
            }
            return __assign({}, defaultMenuProps, { value: this.menuCanShow && this.isMenuActive, nudgeBottom: this.nudgeBottom ? this.nudgeBottom : normalisedProps.offsetY ? 1 : 0 }, normalisedProps);
        }
    },
    watch: {
        internalValue: function internalValue(val) {
            this.initialValue = val;
            this.setSelectedItems();
        },
        isBooted: function isBooted() {
            var _this = this;
            this.$nextTick(function () {
                if (_this.content && _this.content.addEventListener) {
                    _this.content.addEventListener('scroll', _this.onScroll, false);
                }
            });
        },
        isMenuActive: function isMenuActive(val) {
            if (!val) return;
            this.isBooted = true;
        },
        items: {
            immediate: true,
            handler: function handler(val) {
                if (this.cacheItems) {
                    this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
                }
                this.setSelectedItems();
            }
        }
    },
    mounted: function mounted() {
        this.content = this.$refs.menu && this.$refs.menu.$refs.content;
    },
    methods: {
        /** @public */
        blur: function blur() {
            this.isMenuActive = false;
            this.isFocused = false;
            this.$refs.input && this.$refs.input.blur();
            this.selectedIndex = -1;
        },
        /** @public */
        activateMenu: function activateMenu() {
            this.isMenuActive = true;
        },
        clearableCallback: function clearableCallback() {
            var _this = this;
            this.setValue(this.multiple ? [] : undefined);
            this.$nextTick(function () {
                return _this.$refs.input.focus();
            });
            if (this.openOnClear) this.isMenuActive = true;
        },
        closeConditional: function closeConditional(e) {
            return (
                // Click originates from outside the menu content
                !!this.content && !this.content.contains(e.target) &&
                // Click originates from outside the element
                !!this.$el && !this.$el.contains(e.target) && e.target !== this.$el
            );
        },
        filterDuplicates: function filterDuplicates(arr) {
            var uniqueValues = new Map();
            for (var index = 0; index < arr.length; ++index) {
                var item = arr[index];
                var val = this.getValue(item);
                // TODO: comparator
                !uniqueValues.has(val) && uniqueValues.set(val, item);
            }
            return Array.from(uniqueValues.values());
        },
        findExistingIndex: function findExistingIndex(item) {
            var _this = this;
            var itemValue = this.getValue(item);
            return (this.internalValue || []).findIndex(function (i) {
                return _this.valueComparator(_this.getValue(i), itemValue);
            });
        },
        genChipSelection: function genChipSelection(item, index) {
            var _this = this;
            var isDisabled = this.disabled || this.readonly || this.getDisabled(item);
            var focus = function focus(e, cb) {
                if (isDisabled) return;
                e.stopPropagation();
                _this.onFocus();
                cb && cb();
            };
            return this.$createElement(_VChip__WEBPACK_IMPORTED_MODULE_2__["default"], {
                staticClass: 'v-chip--select-multi',
                props: {
                    close: this.deletableChips && !isDisabled,
                    disabled: isDisabled,
                    selected: index === this.selectedIndex,
                    small: this.smallChips
                },
                on: {
                    click: function click(e) {
                        focus(e, function () {
                            _this.selectedIndex = index;
                        });
                    },
                    focus: focus,
                    input: function input() {
                        return _this.onChipInput(item);
                    }
                },
                key: this.getValue(item)
            }, this.getText(item));
        },
        genCommaSelection: function genCommaSelection(item, index, last) {
            // Item may be an object
            // TODO: Remove JSON.stringify
            var key = JSON.stringify(this.getValue(item));
            var color = index === this.selectedIndex && this.color;
            var isDisabled = this.disabled || this.getDisabled(item);
            return this.$createElement('div', this.setTextColor(color, {
                staticClass: 'v-select__selection v-select__selection--comma',
                'class': {
                    'v-select__selection--disabled': isDisabled
                },
                key: key
            }), "" + this.getText(item) + (last ? '' : ', '));
        },
        genDefaultSlot: function genDefaultSlot() {
            var selections = this.genSelections();
            var input = this.genInput();
            // If the return is an empty array
            // push the input
            if (Array.isArray(selections)) {
                selections.push(input);
                // Otherwise push it into children
            } else {
                selections.children = selections.children || [];
                selections.children.push(input);
            }
            return [this.$createElement('div', {
                staticClass: 'v-select__slot',
                directives: this.directives
            }, [this.genLabel(), this.prefix ? this.genAffix('prefix') : null, selections, this.suffix ? this.genAffix('suffix') : null, this.genClearIcon(), this.genIconSlot()]), this.genMenu(), this.genProgress()];
        },
        genInput: function genInput() {
            var input = _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_5__["default"].methods.genInput.call(this);
            input.data.domProps.value = null;
            input.data.attrs.readonly = true;
            input.data.attrs['aria-readonly'] = String(this.readonly);
            return input;
        },
        genList: function genList() {
            // If there's no slots, we can use a cached VNode to improve performance
            if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                return this.genListWithSlot();
            } else {
                return this.staticList;
            }
        },
        genListWithSlot: function genListWithSlot() {
            var _this = this;
            var slots = ['prepend-item', 'no-data', 'append-item'].filter(function (slotName) {
                return _this.$slots[slotName];
            }).map(function (slotName) {
                return _this.$createElement('template', {
                    slot: slotName
                }, _this.$slots[slotName]);
            });
            // Requires destructuring due to Vue
            // modifying the `on` property when passed
            // as a referenced object
            return this.$createElement(_VSelectList__WEBPACK_IMPORTED_MODULE_4__["default"], __assign({}, this.listData), slots);
        },
        genMenu: function genMenu() {
            var _this = this;
            var e_1, _a;
            var props = this.$_menuProps;
            props.activator = this.$refs['input-slot'];
            // Deprecate using menu props directly
            // TODO: remove (2.0)
            var inheritedProps = Object.keys(_VMenu__WEBPACK_IMPORTED_MODULE_3__["default"].options.props);
            var deprecatedProps = Object.keys(this.$attrs).reduce(function (acc, attr) {
                if (inheritedProps.includes(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_9__["camelize"])(attr))) acc.push(attr);
                return acc;
            }, []);
            try {
                for (var deprecatedProps_1 = __values(deprecatedProps), deprecatedProps_1_1 = deprecatedProps_1.next(); !deprecatedProps_1_1.done; deprecatedProps_1_1 = deprecatedProps_1.next()) {
                    var prop = deprecatedProps_1_1.value;
                    props[Object(_util_helpers__WEBPACK_IMPORTED_MODULE_9__["camelize"])(prop)] = this.$attrs[prop];
                }
            } catch (e_1_1) {
                e_1 = { error: e_1_1 };
            } finally {
                try {
                    if (deprecatedProps_1_1 && !deprecatedProps_1_1.done && (_a = deprecatedProps_1.return)) _a.call(deprecatedProps_1);
                } finally {
                    if (e_1) throw e_1.error;
                }
            }
            if (true) {
                if (deprecatedProps.length) {
                    var multiple = deprecatedProps.length > 1;
                    var replacement_1 = deprecatedProps.reduce(function (acc, p) {
                        acc[Object(_util_helpers__WEBPACK_IMPORTED_MODULE_9__["camelize"])(p)] = _this.$attrs[p];
                        return acc;
                    }, {});
                    var props_1 = deprecatedProps.map(function (p) {
                        return "'" + p + "'";
                    }).join(', ');
                    var separator = multiple ? '\n' : '\'';
                    var onlyBools = Object.keys(replacement_1).every(function (prop) {
                        var propType = _VMenu__WEBPACK_IMPORTED_MODULE_3__["default"].options.props[prop];
                        var value = replacement_1[prop];
                        return value === true || (propType.type || propType) === Boolean && value === '';
                    });
                    if (onlyBools) {
                        replacement_1 = Object.keys(replacement_1).join(', ');
                    } else {
                        replacement_1 = JSON.stringify(replacement_1, null, multiple ? 2 : 0).replace(/"([^(")"]+)":/g, '$1:').replace(/"/g, '\'');
                    }
                    Object(_util_console__WEBPACK_IMPORTED_MODULE_10__["consoleWarn"])(props_1 + " " + (multiple ? 'are' : 'is') + " deprecated, use " + separator + ":menu-props=\"" + replacement_1 + "\"" + separator + " instead", this);
                }
            }
            // Attach to root el so that
            // menu covers prepend/append icons
            if (
            // TODO: make this a computed property or helper or something
            this.attach === '' || // If used as a boolean prop (<v-menu attach>)
            this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
            this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
            ) {
                    props.attach = this.$el;
                } else {
                props.attach = this.attach;
            }
            return this.$createElement(_VMenu__WEBPACK_IMPORTED_MODULE_3__["default"], {
                props: props,
                on: {
                    input: function input(val) {
                        _this.isMenuActive = val;
                        _this.isFocused = val;
                    }
                },
                ref: 'menu'
            }, [this.genList()]);
        },
        genSelections: function genSelections() {
            var length = this.selectedItems.length;
            var children = new Array(length);
            var genSelection;
            if (this.$scopedSlots.selection) {
                genSelection = this.genSlotSelection;
            } else if (this.hasChips) {
                genSelection = this.genChipSelection;
            } else {
                genSelection = this.genCommaSelection;
            }
            while (length--) {
                children[length] = genSelection(this.selectedItems[length], length, length === children.length - 1);
            }
            return this.$createElement('div', {
                staticClass: 'v-select__selections'
            }, children);
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
        getMenuIndex: function getMenuIndex() {
            return this.$refs.menu ? this.$refs.menu.listIndex : -1;
        },
        getDisabled: function getDisabled(item) {
            return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_9__["getPropertyFromItem"])(item, this.itemDisabled, false);
        },
        getText: function getText(item) {
            return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_9__["getPropertyFromItem"])(item, this.itemText, item);
        },
        getValue: function getValue(item) {
            return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_9__["getPropertyFromItem"])(item, this.itemValue, this.getText(item));
        },
        onBlur: function onBlur(e) {
            this.$emit('blur', e);
        },
        onChipInput: function onChipInput(item) {
            if (this.multiple) this.selectItem(item);else this.setValue(null);
            // If all items have been deleted,
            // open `v-menu`
            if (this.selectedItems.length === 0) {
                this.isMenuActive = true;
            }
            this.selectedIndex = -1;
        },
        onClick: function onClick() {
            if (this.isDisabled) return;
            this.isMenuActive = true;
            if (!this.isFocused) {
                this.isFocused = true;
                this.$emit('focus');
            }
        },
        onEnterDown: function onEnterDown() {
            this.onBlur();
        },
        onEscDown: function onEscDown(e) {
            e.preventDefault();
            this.isMenuActive = false;
        },
        onKeyDown: function onKeyDown(e) {
            var keyCode = e.keyCode;
            // If enter, space, up, or down is pressed, open menu
            if (!this.isMenuActive && [_util_helpers__WEBPACK_IMPORTED_MODULE_9__["keyCodes"].enter, _util_helpers__WEBPACK_IMPORTED_MODULE_9__["keyCodes"].space, _util_helpers__WEBPACK_IMPORTED_MODULE_9__["keyCodes"].up, _util_helpers__WEBPACK_IMPORTED_MODULE_9__["keyCodes"].down].includes(keyCode)) this.activateMenu();
            if (this.isMenuActive && this.$refs.menu) this.$refs.menu.changeListIndex(e);
            // This should do something different
            if (keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_9__["keyCodes"].enter) return this.onEnterDown(e);
            // If escape deactivate the menu
            if (keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_9__["keyCodes"].esc) return this.onEscDown(e);
            // If tab - select item or close menu
            if (keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_9__["keyCodes"].tab) return this.onTabDown(e);
        },
        onMouseUp: function onMouseUp(e) {
            var _this = this;
            var appendInner = this.$refs['append-inner'];
            // If append inner is present
            // and the target is itself
            // or inside, toggle menu
            if (this.isMenuActive && appendInner && (appendInner === e.target || appendInner.contains(e.target))) {
                this.$nextTick(function () {
                    return _this.isMenuActive = !_this.isMenuActive;
                });
                // If user is clicking in the container
                // and field is enclosed, activate it
            } else if (this.isEnclosed && !this.isDisabled) {
                this.isMenuActive = true;
            }
            _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_5__["default"].methods.onMouseUp.call(this, e);
        },
        onScroll: function onScroll() {
            var _this = this;
            if (!this.isMenuActive) {
                requestAnimationFrame(function () {
                    return _this.content.scrollTop = 0;
                });
            } else {
                if (this.lastItem >= this.computedItems.length) return;
                var showMoreItems = this.content.scrollHeight - (this.content.scrollTop + this.content.clientHeight) < 200;
                if (showMoreItems) {
                    this.lastItem += 20;
                }
            }
        },
        onTabDown: function onTabDown(e) {
            var menuIndex = this.getMenuIndex();
            var listTile = this.$refs.menu.tiles[menuIndex];
            // An item that is selected by
            // menu-index should toggled
            if (listTile && listTile.className.indexOf('v-list__tile--highlighted') > -1 && this.isMenuActive && menuIndex > -1) {
                e.preventDefault();
                e.stopPropagation();
                listTile.click();
            } else {
                // If we make it here,
                // the user has no selected indexes
                // and is probably tabbing out
                _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_5__["default"].methods.onBlur.call(this, e);
            }
        },
        selectItem: function selectItem(item) {
            var _this = this;
            if (!this.multiple) {
                this.setValue(this.returnObject ? item : this.getValue(item));
                this.isMenuActive = false;
            } else {
                var internalValue = (this.internalValue || []).slice();
                var i = this.findExistingIndex(item);
                i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item);
                this.setValue(internalValue.map(function (i) {
                    return _this.returnObject ? i : _this.getValue(i);
                }));
                // When selecting multiple
                // adjust menu after each
                // selection
                this.$nextTick(function () {
                    _this.$refs.menu && _this.$refs.menu.updateDimensions();
                });
            }
        },
        setMenuIndex: function setMenuIndex(index) {
            this.$refs.menu && (this.$refs.menu.listIndex = index);
        },
        setSelectedItems: function setSelectedItems() {
            var _this = this;
            var e_2, _a;
            var selectedItems = [];
            var values = !this.multiple || !Array.isArray(this.internalValue) ? [this.internalValue] : this.internalValue;
            var _loop_1 = function _loop_1(value) {
                var index = this_1.allItems.findIndex(function (v) {
                    return _this.valueComparator(_this.getValue(v), _this.getValue(value));
                });
                if (index > -1) {
                    selectedItems.push(this_1.allItems[index]);
                }
            };
            var this_1 = this;
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var value = values_1_1.value;
                    _loop_1(value);
                }
            } catch (e_2_1) {
                e_2 = { error: e_2_1 };
            } finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                } finally {
                    if (e_2) throw e_2.error;
                }
            }
            this.selectedItems = selectedItems;
        },
        setValue: function setValue(value) {
            this.internalValue = value;
            this.$emit('change', value);
        }
    }
});

/***/ }),

/***/ "./src/components/VSelect/VSelectList.js":
/*!***********************************************!*\
  !*** ./src/components/VSelect/VSelectList.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_cards_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_cards.styl */ "./src/stylus/components/_cards.styl");
/* harmony import */ var _stylus_components_cards_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_cards_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VCheckbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VCheckbox */ "./src/components/VCheckbox/index.js");
/* harmony import */ var _VDivider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VDivider */ "./src/components/VDivider/index.ts");
/* harmony import */ var _VSubheader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VSubheader */ "./src/components/VSubheader/index.js");
/* harmony import */ var _VList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../VList */ "./src/components/VList/index.js");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
var __values = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};

// Components




// Mixins


// Helpers

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-select-list',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_6__["default"]],
    props: {
        action: Boolean,
        dense: Boolean,
        hideSelected: Boolean,
        items: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        itemAvatar: {
            type: [String, Array, Function],
            default: 'avatar'
        },
        itemDisabled: {
            type: [String, Array, Function],
            default: 'disabled'
        },
        itemText: {
            type: [String, Array, Function],
            default: 'text'
        },
        itemValue: {
            type: [String, Array, Function],
            default: 'value'
        },
        noDataText: String,
        noFilter: Boolean,
        searchInput: {
            default: null
        },
        selectedItems: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    computed: {
        parsedItems: function parsedItems() {
            var _this = this;
            return this.selectedItems.map(function (item) {
                return _this.getValue(item);
            });
        },
        tileActiveClass: function tileActiveClass() {
            return Object.keys(this.setTextColor(this.color).class || {}).join(' ');
        },
        staticNoDataTile: function staticNoDataTile() {
            var tile = {
                on: {
                    mousedown: function mousedown(e) {
                        return e.preventDefault();
                    } // Prevent onBlur from being called
                }
            };
            return this.$createElement(_VList__WEBPACK_IMPORTED_MODULE_4__["VListTile"], tile, [this.genTileContent(this.noDataText)]);
        }
    },
    methods: {
        genAction: function genAction(item, inputValue) {
            var _this = this;
            var data = {
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        _this.$emit('select', item);
                    }
                }
            };
            return this.$createElement(_VList__WEBPACK_IMPORTED_MODULE_4__["VListTileAction"], data, [this.$createElement(_VCheckbox__WEBPACK_IMPORTED_MODULE_1__["default"], {
                props: {
                    color: this.color,
                    inputValue: inputValue
                }
            })]);
        },
        genDivider: function genDivider(props) {
            return this.$createElement(_VDivider__WEBPACK_IMPORTED_MODULE_2__["default"], { props: props });
        },
        genFilteredText: function genFilteredText(text) {
            text = (text || '').toString();
            if (!this.searchInput || this.noFilter) return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["escapeHTML"])(text);
            var _a = this.getMaskedCharacters(text),
                start = _a.start,
                middle = _a.middle,
                end = _a.end;
            return "" + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["escapeHTML"])(start) + this.genHighlight(middle) + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["escapeHTML"])(end);
        },
        genHeader: function genHeader(props) {
            return this.$createElement(_VSubheader__WEBPACK_IMPORTED_MODULE_3__["default"], { props: props }, props.header);
        },
        genHighlight: function genHighlight(text) {
            return "<span class=\"v-list__tile__mask\">" + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["escapeHTML"])(text) + "</span>";
        },
        getMaskedCharacters: function getMaskedCharacters(text) {
            var searchInput = (this.searchInput || '').toString().toLowerCase();
            var index = text.toLowerCase().indexOf(searchInput);
            if (index < 0) return { start: '', middle: text, end: '' };
            var start = text.slice(0, index);
            var middle = text.slice(index, index + searchInput.length);
            var end = text.slice(index + searchInput.length);
            return { start: start, middle: middle, end: end };
        },
        genTile: function genTile(item, disabled, avatar, value) {
            var _this = this;
            if (disabled === void 0) {
                disabled = null;
            }
            if (avatar === void 0) {
                avatar = false;
            }
            if (value === void 0) {
                value = this.hasItem(item);
            }
            if (item === Object(item)) {
                avatar = this.getAvatar(item);
                disabled = disabled !== null ? disabled : this.getDisabled(item);
            }
            var tile = {
                on: {
                    mousedown: function mousedown(e) {
                        // Prevent onBlur from being called
                        e.preventDefault();
                    },
                    click: function click() {
                        return disabled || _this.$emit('select', item);
                    }
                },
                props: {
                    activeClass: this.tileActiveClass,
                    avatar: avatar,
                    disabled: disabled,
                    ripple: true,
                    value: value
                }
            };
            if (!this.$scopedSlots.item) {
                return this.$createElement(_VList__WEBPACK_IMPORTED_MODULE_4__["VListTile"], tile, [this.action && !this.hideSelected && this.items.length > 0 ? this.genAction(item, value) : null, this.genTileContent(item)]);
            }
            var parent = this;
            var scopedSlot = this.$scopedSlots.item({ parent: parent, item: item, tile: tile });
            return this.needsTile(scopedSlot) ? this.$createElement(_VList__WEBPACK_IMPORTED_MODULE_4__["VListTile"], tile, [scopedSlot]) : scopedSlot;
        },
        genTileContent: function genTileContent(item) {
            var innerHTML = this.genFilteredText(this.getText(item));
            return this.$createElement(_VList__WEBPACK_IMPORTED_MODULE_4__["VListTileContent"], [this.$createElement(_VList__WEBPACK_IMPORTED_MODULE_4__["VListTileTitle"], {
                domProps: { innerHTML: innerHTML }
            })]);
        },
        hasItem: function hasItem(item) {
            return this.parsedItems.indexOf(this.getValue(item)) > -1;
        },
        needsTile: function needsTile(tile) {
            return tile.componentOptions == null || tile.componentOptions.Ctor.options.name !== 'v-list-tile';
        },
        getAvatar: function getAvatar(item) {
            return Boolean(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["getPropertyFromItem"])(item, this.itemAvatar, false));
        },
        getDisabled: function getDisabled(item) {
            return Boolean(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["getPropertyFromItem"])(item, this.itemDisabled, false));
        },
        getText: function getText(item) {
            return String(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["getPropertyFromItem"])(item, this.itemText, item));
        },
        getValue: function getValue(item) {
            return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["getPropertyFromItem"])(item, this.itemValue, this.getText(item));
        }
    },
    render: function render() {
        var e_1, _a;
        var children = [];
        try {
            for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (this.hideSelected && this.hasItem(item)) continue;
                if (item == null) children.push(this.genTile(item));else if (item.header) children.push(this.genHeader(item));else if (item.divider) children.push(this.genDivider(item));else children.push(this.genTile(item));
            }
        } catch (e_1_1) {
            e_1 = { error: e_1_1 };
        } finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
                if (e_1) throw e_1.error;
            }
        }
        children.length || children.push(this.$slots['no-data'] || this.staticNoDataTile);
        this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item']);
        this.$slots['append-item'] && children.push(this.$slots['append-item']);
        return this.$createElement('div', {
            staticClass: 'v-select-list v-card',
            'class': this.themeClasses
        }, [this.$createElement(_VList__WEBPACK_IMPORTED_MODULE_4__["VList"], {
            props: {
                dense: this.dense
            }
        }, children)]);
    }
});

/***/ }),

/***/ "./src/components/VSelect/index.js":
/*!*****************************************!*\
  !*** ./src/components/VSelect/index.js ***!
  \*****************************************/
/*! exports provided: VSelect, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VSelect", function() { return wrapper; });
/* harmony import */ var _VSelect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSelect */ "./src/components/VSelect/VSelect.js");
/* harmony import */ var _VOverflowBtn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VOverflowBtn */ "./src/components/VOverflowBtn/index.js");
/* harmony import */ var _VAutocomplete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VAutocomplete */ "./src/components/VAutocomplete/index.js");
/* harmony import */ var _VCombobox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VCombobox */ "./src/components/VCombobox/index.js");
/* harmony import */ var _util_rebuildFunctionalSlots__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/rebuildFunctionalSlots */ "./src/util/rebuildFunctionalSlots.js");
/* harmony import */ var _util_dedupeModelListeners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/dedupeModelListeners */ "./src/util/dedupeModelListeners.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");







/* @vue/component */
var wrapper = {
    functional: true,
    $_wrapperFor: _VSelect__WEBPACK_IMPORTED_MODULE_0__["default"],
    props: {
        // VAutoComplete
        /** @deprecated */
        autocomplete: Boolean,
        /** @deprecated */
        combobox: Boolean,
        multiple: Boolean,
        /** @deprecated */
        tags: Boolean,
        // VOverflowBtn
        /** @deprecated */
        editable: Boolean,
        /** @deprecated */
        overflow: Boolean,
        /** @deprecated */
        segmented: Boolean
    },
    render: function render(h, _a) {
        var props = _a.props,
            data = _a.data,
            slots = _a.slots,
            parent = _a.parent;
        Object(_util_dedupeModelListeners__WEBPACK_IMPORTED_MODULE_5__["default"])(data);
        var children = Object(_util_rebuildFunctionalSlots__WEBPACK_IMPORTED_MODULE_4__["default"])(slots(), h);
        if (props.autocomplete) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_6__["deprecate"])('<v-select autocomplete>', '<v-autocomplete>', wrapper, parent);
        }
        if (props.combobox) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_6__["deprecate"])('<v-select combobox>', '<v-combobox>', wrapper, parent);
        }
        if (props.tags) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_6__["deprecate"])('<v-select tags>', '<v-combobox multiple>', wrapper, parent);
        }
        if (props.overflow) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_6__["deprecate"])('<v-select overflow>', '<v-overflow-btn>', wrapper, parent);
        }
        if (props.segmented) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_6__["deprecate"])('<v-select segmented>', '<v-overflow-btn segmented>', wrapper, parent);
        }
        if (props.editable) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_6__["deprecate"])('<v-select editable>', '<v-overflow-btn editable>', wrapper, parent);
        }
        if (props.combobox || props.tags) {
            data.attrs.multiple = props.tags;
            return h(_VCombobox__WEBPACK_IMPORTED_MODULE_3__["default"], data, children);
        } else if (props.autocomplete) {
            data.attrs.multiple = props.multiple;
            return h(_VAutocomplete__WEBPACK_IMPORTED_MODULE_2__["default"], data, children);
        } else if (props.overflow || props.segmented || props.editable) {
            data.attrs.segmented = props.segmented;
            data.attrs.editable = props.editable;
            return h(_VOverflowBtn__WEBPACK_IMPORTED_MODULE_1__["default"], data, children);
        } else {
            data.attrs.multiple = props.multiple;
            return h(_VSelect__WEBPACK_IMPORTED_MODULE_0__["default"], data, children);
        }
    }
};

/* harmony default export */ __webpack_exports__["default"] = (wrapper);

/***/ }),

/***/ "./src/components/VSlider/VSlider.js":
/*!*******************************************!*\
  !*** ./src/components/VSlider/VSlider.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_sliders_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_sliders.styl */ "./src/stylus/components/_sliders.styl");
/* harmony import */ var _stylus_components_sliders_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_sliders_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transitions */ "./src/components/transitions/index.js");
/* harmony import */ var _VInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VInput */ "./src/components/VInput/index.js");
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/click-outside */ "./src/directives/click-outside.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
/* harmony import */ var _mixins_loadable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/loadable */ "./src/mixins/loadable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Components

// Extensions

// Directives

// Utilities



/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-slider',
    directives: { ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_3__["default"] },
    extends: _VInput__WEBPACK_IMPORTED_MODULE_2__["default"],
    mixins: [_mixins_loadable__WEBPACK_IMPORTED_MODULE_6__["default"]],
    props: {
        alwaysDirty: Boolean,
        inverseLabel: Boolean,
        label: String,
        min: {
            type: [Number, String],
            default: 0
        },
        max: {
            type: [Number, String],
            default: 100
        },
        range: Boolean,
        step: {
            type: [Number, String],
            default: 1
        },
        ticks: {
            type: [Boolean, String],
            default: false,
            validator: function validator(v) {
                return typeof v === 'boolean' || v === 'always';
            }
        },
        tickLabels: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        tickSize: {
            type: [Number, String],
            default: 1
        },
        thumbColor: {
            type: String,
            default: null
        },
        thumbLabel: {
            type: [Boolean, String],
            default: null,
            validator: function validator(v) {
                return typeof v === 'boolean' || v === 'always';
            }
        },
        thumbSize: {
            type: [Number, String],
            default: 32
        },
        trackColor: {
            type: String,
            default: null
        },
        value: [Number, String]
    },
    data: function data(vm) {
        return {
            app: {},
            isActive: false,
            keyPressed: 0,
            lazyValue: typeof vm.value !== 'undefined' ? vm.value : Number(vm.min),
            oldValue: null
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-input--slider': true,
                'v-input--slider--ticks': this.showTicks,
                'v-input--slider--inverse-label': this.inverseLabel,
                'v-input--slider--ticks-labels': this.tickLabels.length > 0,
                'v-input--slider--thumb-label': this.thumbLabel || this.$scopedSlots.thumbLabel
            };
        },
        showTicks: function showTicks() {
            return this.tickLabels.length > 0 || !this.disabled && this.stepNumeric && !!this.ticks;
        },
        showThumbLabel: function showThumbLabel() {
            return !this.disabled && (!!this.thumbLabel || this.thumbLabel === '' || this.$scopedSlots['thumb-label']);
        },
        computedColor: function computedColor() {
            if (this.disabled) return null;
            return this.validationState || this.color || 'primary';
        },
        computedTrackColor: function computedTrackColor() {
            return this.disabled ? null : this.trackColor || null;
        },
        computedThumbColor: function computedThumbColor() {
            if (this.disabled || !this.isDirty) return null;
            return this.validationState || this.thumbColor || this.color || 'primary';
        },
        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                var _a = this,
                    min = _a.min,
                    max = _a.max;
                // Round value to ensure the
                // entire slider range can
                // be selected with step
                var value = this.roundValue(Math.min(Math.max(val, min), max));
                if (value === this.lazyValue) return;
                this.lazyValue = value;
                this.$emit('input', value);
                this.validate();
            }
        },
        stepNumeric: function stepNumeric() {
            return this.step > 0 ? parseFloat(this.step) : 0;
        },
        trackFillStyles: function trackFillStyles() {
            var left = this.$vuetify.rtl ? 'auto' : 0;
            var right = this.$vuetify.rtl ? 0 : 'auto';
            var width = this.inputWidth + "%";
            if (this.disabled) width = "calc(" + this.inputWidth + "% - 8px)";
            return {
                transition: this.trackTransition,
                left: left,
                right: right,
                width: width
            };
        },
        trackPadding: function trackPadding() {
            return this.isActive || this.inputWidth > 0 || this.disabled ? 0 : 7;
        },
        trackStyles: function trackStyles() {
            var trackPadding = this.disabled ? "calc(" + this.inputWidth + "% + 8px)" : this.trackPadding + "px";
            var left = this.$vuetify.rtl ? 'auto' : trackPadding;
            var right = this.$vuetify.rtl ? trackPadding : 'auto';
            var width = this.disabled ? "calc(" + (100 - this.inputWidth) + "% - 8px)" : '100%';
            return {
                transition: this.trackTransition,
                left: left,
                right: right,
                width: width
            };
        },
        tickStyles: function tickStyles() {
            var size = Number(this.tickSize);
            return {
                'border-width': size + "px",
                'border-radius': size > 1 ? '50%' : null,
                transform: size > 1 ? "translateX(-" + size + "px) translateY(-" + (size - 1) + "px)" : null
            };
        },
        trackTransition: function trackTransition() {
            return this.keyPressed >= 2 ? 'none' : '';
        },
        numTicks: function numTicks() {
            return Math.ceil((this.max - this.min) / this.stepNumeric);
        },
        inputWidth: function inputWidth() {
            return (this.roundValue(this.internalValue) - this.min) / (this.max - this.min) * 100;
        },
        isDirty: function isDirty() {
            return this.internalValue > this.min || this.alwaysDirty;
        }
    },
    watch: {
        min: function min(val) {
            val > this.internalValue && this.$emit('input', parseFloat(val));
        },
        max: function max(val) {
            val < this.internalValue && this.$emit('input', parseFloat(val));
        },
        value: function value(val) {
            this.internalValue = val;
        }
    },
    mounted: function mounted() {
        // Without a v-app, iOS does not work with body selectors
        this.app = document.querySelector('[data-app]') || Object(_util_console__WEBPACK_IMPORTED_MODULE_5__["consoleWarn"])('Missing v-app or a non-body wrapping element with the [data-app] attribute', this);
    },
    methods: {
        genDefaultSlot: function genDefaultSlot() {
            var children = [this.genLabel()];
            var slider = this.genSlider();
            this.inverseLabel ? children.unshift(slider) : children.push(slider);
            children.push(this.genProgress());
            return children;
        },
        genListeners: function genListeners() {
            return {
                blur: this.onBlur,
                click: this.onSliderClick,
                focus: this.onFocus,
                keydown: this.onKeyDown,
                keyup: this.onKeyUp
            };
        },
        genInput: function genInput() {
            return this.$createElement('input', {
                attrs: __assign({ 'aria-label': this.label, name: this.name, role: 'slider', tabindex: this.disabled ? -1 : this.$attrs.tabindex, value: this.internalValue, readonly: true, 'aria-readonly': String(this.readonly), 'aria-valuemin': this.min, 'aria-valuemax': this.max, 'aria-valuenow': this.internalValue }, this.$attrs),
                on: this.genListeners(),
                ref: 'input'
            });
        },
        genSlider: function genSlider() {
            return this.$createElement('div', {
                staticClass: 'v-slider',
                'class': {
                    'v-slider--is-active': this.isActive
                },
                directives: [{
                    name: 'click-outside',
                    value: this.onBlur
                }]
            }, this.genChildren());
        },
        genChildren: function genChildren() {
            return [this.genInput(), this.genTrackContainer(), this.genSteps(), this.genThumbContainer(this.internalValue, this.inputWidth, this.isFocused || this.isActive, this.onThumbMouseDown)];
        },
        genSteps: function genSteps() {
            var _this = this;
            if (!this.step || !this.showTicks) return null;
            var ticks = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["createRange"])(this.numTicks + 1).map(function (i) {
                var children = [];
                if (_this.tickLabels[i]) {
                    children.push(_this.$createElement('span', _this.tickLabels[i]));
                }
                return _this.$createElement('span', {
                    key: i,
                    staticClass: 'v-slider__ticks',
                    class: {
                        'v-slider__ticks--always-show': _this.ticks === 'always' || _this.tickLabels.length > 0
                    },
                    style: __assign({}, _this.tickStyles, { left: i * (100 / _this.numTicks) + "%" })
                }, children);
            });
            return this.$createElement('div', {
                staticClass: 'v-slider__ticks-container'
            }, ticks);
        },
        genThumb: function genThumb() {
            return this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
                staticClass: 'v-slider__thumb'
            }));
        },
        genThumbContainer: function genThumbContainer(value, valueWidth, isActive, onDrag) {
            var children = [this.genThumb()];
            var thumbLabelContent = this.getLabel(value);
            this.showThumbLabel && children.push(this.genThumbLabel(thumbLabelContent));
            return this.$createElement('div', this.setTextColor(this.computedThumbColor, {
                staticClass: 'v-slider__thumb-container',
                'class': {
                    'v-slider__thumb-container--is-active': isActive,
                    'v-slider__thumb-container--show-label': this.showThumbLabel
                },
                style: {
                    transition: this.trackTransition,
                    left: (this.$vuetify.rtl ? 100 - valueWidth : valueWidth) + "%"
                },
                on: {
                    touchstart: onDrag,
                    mousedown: onDrag
                }
            }), children);
        },
        genThumbLabel: function genThumbLabel(content) {
            var size = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["convertToUnit"])(this.thumbSize);
            return this.$createElement(_transitions__WEBPACK_IMPORTED_MODULE_1__["VScaleTransition"], {
                props: { origin: 'bottom center' }
            }, [this.$createElement('div', {
                staticClass: 'v-slider__thumb-label__container',
                directives: [{
                    name: 'show',
                    value: this.isFocused || this.isActive || this.thumbLabel === 'always'
                }]
            }, [this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
                staticClass: 'v-slider__thumb-label',
                style: {
                    height: size,
                    width: size
                }
            }), [content])])]);
        },
        genTrackContainer: function genTrackContainer() {
            var children = [this.$createElement('div', this.setBackgroundColor(this.computedTrackColor, {
                staticClass: 'v-slider__track',
                style: this.trackStyles
            })), this.$createElement('div', this.setBackgroundColor(this.computedColor, {
                staticClass: 'v-slider__track-fill',
                style: this.trackFillStyles
            }))];
            return this.$createElement('div', {
                staticClass: 'v-slider__track__container',
                ref: 'track'
            }, children);
        },
        getLabel: function getLabel(value) {
            return this.$scopedSlots['thumb-label'] ? this.$scopedSlots['thumb-label']({ value: value }) : this.$createElement('span', value);
        },
        onBlur: function onBlur(e) {
            if (this.keyPressed === 2) return;
            this.isActive = false;
            this.isFocused = false;
            this.$emit('blur', e);
        },
        onFocus: function onFocus(e) {
            this.isFocused = true;
            this.$emit('focus', e);
        },
        onThumbMouseDown: function onThumbMouseDown(e) {
            this.oldValue = this.internalValue;
            this.keyPressed = 2;
            var options = { passive: true };
            this.isActive = true;
            this.isFocused = false;
            if ('touches' in e) {
                this.app.addEventListener('touchmove', this.onMouseMove, options);
                Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["addOnceEventListener"])(this.app, 'touchend', this.onSliderMouseUp);
            } else {
                this.app.addEventListener('mousemove', this.onMouseMove, options);
                Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["addOnceEventListener"])(this.app, 'mouseup', this.onSliderMouseUp);
            }
            this.$emit('start', this.internalValue);
        },
        onSliderMouseUp: function onSliderMouseUp() {
            this.keyPressed = 0;
            var options = { passive: true };
            this.isActive = false;
            this.isFocused = false;
            this.app.removeEventListener('touchmove', this.onMouseMove, options);
            this.app.removeEventListener('mousemove', this.onMouseMove, options);
            this.$emit('end', this.internalValue);
            if (!Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["deepEqual"])(this.oldValue, this.internalValue)) {
                this.$emit('change', this.internalValue);
            }
        },
        onMouseMove: function onMouseMove(e) {
            var _a = this.parseMouseMove(e),
                value = _a.value,
                isInsideTrack = _a.isInsideTrack;
            if (isInsideTrack) {
                this.setInternalValue(value);
            }
        },
        onKeyDown: function onKeyDown(e) {
            if (this.disabled || this.readonly) return;
            var value = this.parseKeyDown(e);
            if (value == null) return;
            this.setInternalValue(value);
            this.$emit('change', value);
        },
        onKeyUp: function onKeyUp() {
            this.keyPressed = 0;
        },
        onSliderClick: function onSliderClick(e) {
            this.isFocused = true;
            this.onMouseMove(e);
            this.$emit('change', this.internalValue);
        },
        parseMouseMove: function parseMouseMove(e) {
            var _a = this.$refs.track.getBoundingClientRect(),
                offsetLeft = _a.left,
                trackWidth = _a.width;
            var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            // It is possible for left to be NaN, force to number
            var left = Math.min(Math.max((clientX - offsetLeft) / trackWidth, 0), 1) || 0;
            if (this.$vuetify.rtl) left = 1 - left;
            var isInsideTrack = clientX >= offsetLeft - 8 && clientX <= offsetLeft + trackWidth + 8;
            var value = parseFloat(this.min) + left * (this.max - this.min);
            return { value: value, isInsideTrack: isInsideTrack };
        },
        parseKeyDown: function parseKeyDown(e, value) {
            if (value === void 0) {
                value = this.internalValue;
            }
            if (this.disabled) return;
            var pageup = _util_helpers__WEBPACK_IMPORTED_MODULE_4__["keyCodes"].pageup,
                pagedown = _util_helpers__WEBPACK_IMPORTED_MODULE_4__["keyCodes"].pagedown,
                end = _util_helpers__WEBPACK_IMPORTED_MODULE_4__["keyCodes"].end,
                home = _util_helpers__WEBPACK_IMPORTED_MODULE_4__["keyCodes"].home,
                left = _util_helpers__WEBPACK_IMPORTED_MODULE_4__["keyCodes"].left,
                right = _util_helpers__WEBPACK_IMPORTED_MODULE_4__["keyCodes"].right,
                down = _util_helpers__WEBPACK_IMPORTED_MODULE_4__["keyCodes"].down,
                up = _util_helpers__WEBPACK_IMPORTED_MODULE_4__["keyCodes"].up;
            if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode)) return;
            e.preventDefault();
            var step = this.stepNumeric || 1;
            var steps = (this.max - this.min) / step;
            if ([left, right, down, up].includes(e.keyCode)) {
                this.keyPressed += 1;
                var increase = this.$vuetify.rtl ? [left, up] : [right, up];
                var direction = increase.includes(e.keyCode) ? 1 : -1;
                var multiplier = e.shiftKey ? 3 : e.ctrlKey ? 2 : 1;
                value = value + direction * step * multiplier;
            } else if (e.keyCode === home) {
                value = parseFloat(this.min);
            } else if (e.keyCode === end) {
                value = parseFloat(this.max);
            } else /* if (e.keyCode === keyCodes.pageup || e.keyCode === pagedown) */{
                    // Page up/down
                    var direction = e.keyCode === pagedown ? 1 : -1;
                    value = value - direction * step * (steps > 100 ? steps / 10 : 10);
                }
            return value;
        },
        roundValue: function roundValue(value) {
            if (!this.stepNumeric) return value;
            // Format input value using the same number
            // of decimals places as in the step prop
            var trimmedStep = this.step.toString().trim();
            var decimals = trimmedStep.indexOf('.') > -1 ? trimmedStep.length - trimmedStep.indexOf('.') - 1 : 0;
            var offset = this.min % this.stepNumeric;
            var newValue = Math.round((value - offset) / this.stepNumeric) * this.stepNumeric + offset;
            return parseFloat(Math.min(newValue, this.max).toFixed(decimals));
        },
        setInternalValue: function setInternalValue(value) {
            this.internalValue = value;
        }
    }
});

/***/ }),

/***/ "./src/components/VSlider/index.js":
/*!*****************************************!*\
  !*** ./src/components/VSlider/index.js ***!
  \*****************************************/
/*! exports provided: VSlider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSlider */ "./src/components/VSlider/VSlider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSlider", function() { return _VSlider__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VSlider__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VSnackbar/VSnackbar.ts":
/*!***********************************************!*\
  !*** ./src/components/VSnackbar/VSnackbar.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_snackbars_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_snackbars.styl */ "./src/stylus/components/_snackbars.styl");
/* harmony import */ var _stylus_components_snackbars_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_snackbars_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _mixins_positionable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/positionable */ "./src/mixins/positionable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");





/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_2__["default"], Object(_mixins_positionable__WEBPACK_IMPORTED_MODULE_3__["factory"])(['absolute', 'top', 'bottom', 'left', 'right'])
/* @vue/component */
).extend({
    name: 'v-snackbar',
    props: {
        autoHeight: Boolean,
        multiLine: Boolean,
        // TODO: change this to closeDelay to match other API in delayable.js
        timeout: {
            type: Number,
            default: 6000
        },
        vertical: Boolean
    },
    data: function data() {
        return {
            activeTimeout: -1
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-snack--active': this.isActive,
                'v-snack--absolute': this.absolute,
                'v-snack--auto-height': this.autoHeight,
                'v-snack--bottom': this.bottom || !this.top,
                'v-snack--left': this.left,
                'v-snack--multi-line': this.multiLine && !this.vertical,
                'v-snack--right': this.right,
                'v-snack--top': this.top,
                'v-snack--vertical': this.vertical
            };
        }
    },
    watch: {
        isActive: function isActive() {
            this.setTimeout();
        }
    },
    mounted: function mounted() {
        this.setTimeout();
    },
    methods: {
        setTimeout: function setTimeout() {
            var _this = this;
            window.clearTimeout(this.activeTimeout);
            if (this.isActive && this.timeout) {
                this.activeTimeout = window.setTimeout(function () {
                    _this.isActive = false;
                }, this.timeout);
            }
        }
    },
    render: function render(h) {
        var children = [];
        if (this.isActive) {
            children.push(h('div', {
                staticClass: 'v-snack',
                class: this.classes,
                on: this.$listeners
            }, [h('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-snack__wrapper'
            }), [h('div', {
                staticClass: 'v-snack__content'
            }, this.$slots.default)])]));
        }
        return h('transition', {
            attrs: { name: 'v-snack-transition' }
        }, children);
    }
}));

/***/ }),

/***/ "./src/components/VSnackbar/index.ts":
/*!*******************************************!*\
  !*** ./src/components/VSnackbar/index.ts ***!
  \*******************************************/
/*! exports provided: VSnackbar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VSnackbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSnackbar */ "./src/components/VSnackbar/VSnackbar.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSnackbar", function() { return _VSnackbar__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VSnackbar__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VSpeedDial/VSpeedDial.js":
/*!*************************************************!*\
  !*** ./src/components/VSpeedDial/VSpeedDial.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_speed_dial_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_speed-dial.styl */ "./src/stylus/components/_speed-dial.styl");
/* harmony import */ var _stylus_components_speed_dial_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_speed_dial_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _mixins_positionable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/positionable */ "./src/mixins/positionable.ts");
/* harmony import */ var _mixins_transitionable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/transitionable */ "./src/mixins/transitionable.ts");
/* harmony import */ var _directives_click_outside__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../directives/click-outside */ "./src/directives/click-outside.ts");





/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-speed-dial',
    directives: { ClickOutside: _directives_click_outside__WEBPACK_IMPORTED_MODULE_4__["default"] },
    mixins: [_mixins_positionable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_transitionable__WEBPACK_IMPORTED_MODULE_3__["default"]],
    props: {
        direction: {
            type: String,
            default: 'top',
            validator: function validator(val) {
                return ['top', 'right', 'bottom', 'left'].includes(val);
            }
        },
        openOnHover: Boolean,
        transition: {
            type: String,
            default: 'scale-transition'
        }
    },
    computed: {
        classes: function classes() {
            var _a;
            return _a = {
                'v-speed-dial': true,
                'v-speed-dial--top': this.top,
                'v-speed-dial--right': this.right,
                'v-speed-dial--bottom': this.bottom,
                'v-speed-dial--left': this.left,
                'v-speed-dial--absolute': this.absolute,
                'v-speed-dial--fixed': this.fixed
            }, _a["v-speed-dial--direction-" + this.direction] = true, _a;
        }
    },
    render: function render(h) {
        var _this = this;
        var children = [];
        var data = {
            'class': this.classes,
            directives: [{
                name: 'click-outside',
                value: function value() {
                    return _this.isActive = false;
                }
            }],
            on: {
                click: function click() {
                    return _this.isActive = !_this.isActive;
                }
            }
        };
        if (this.openOnHover) {
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
            'class': 'v-speed-dial__list',
            props: {
                name: this.transition,
                mode: this.mode,
                origin: this.origin,
                tag: 'div'
            }
        }, children);
        return h('div', data, [this.$slots.activator, list]);
    }
});

/***/ }),

/***/ "./src/components/VSpeedDial/index.js":
/*!********************************************!*\
  !*** ./src/components/VSpeedDial/index.js ***!
  \********************************************/
/*! exports provided: VSpeedDial, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VSpeedDial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSpeedDial */ "./src/components/VSpeedDial/VSpeedDial.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSpeedDial", function() { return _VSpeedDial__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VSpeedDial__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VStepper/VStepper.js":
/*!*********************************************!*\
  !*** ./src/components/VStepper/VStepper.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_steppers_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_steppers.styl */ "./src/stylus/components/_steppers.styl");
/* harmony import */ var _stylus_components_steppers_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_steppers_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Mixins


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-stepper',
    mixins: [Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_1__["provide"])('stepper'), _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    provide: function provide() {
        return {
            stepClick: this.stepClick,
            isVertical: this.vertical
        };
    },
    props: {
        nonLinear: Boolean,
        altLabels: Boolean,
        vertical: Boolean,
        value: [Number, String]
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
    computed: {
        classes: function classes() {
            return __assign({ 'v-stepper': true, 'v-stepper--is-booted': this.isBooted, 'v-stepper--vertical': this.vertical, 'v-stepper--alt-labels': this.altLabels, 'v-stepper--non-linear': this.nonLinear }, this.themeClasses);
        }
    },
    watch: {
        inputValue: function inputValue(val, prev) {
            this.isReverse = Number(val) < Number(prev);
            for (var index = this.steps.length; --index >= 0;) {
                this.steps[index].toggle(this.inputValue);
            }
            for (var index = this.content.length; --index >= 0;) {
                this.content[index].toggle(this.inputValue, this.isReverse);
            }
            this.$emit('input', this.inputValue);
            prev && (this.isBooted = true);
        },
        value: function value() {
            var _this = this;
            this.$nextTick(function () {
                return _this.inputValue = _this.value;
            });
        }
    },
    mounted: function mounted() {
        this.inputValue = this.value || this.steps[0].step || 1;
    },
    methods: {
        register: function register(item) {
            if (item.$options.name === 'v-stepper-step') {
                this.steps.push(item);
            } else if (item.$options.name === 'v-stepper-content') {
                item.isVertical = this.vertical;
                this.content.push(item);
            }
        },
        unregister: function unregister(item) {
            if (item.$options.name === 'v-stepper-step') {
                this.steps = this.steps.filter(function (i) {
                    return i !== item;
                });
            } else if (item.$options.name === 'v-stepper-content') {
                item.isVertical = this.vertical;
                this.content = this.content.filter(function (i) {
                    return i !== item;
                });
            }
        },
        stepClick: function stepClick(step) {
            var _this = this;
            this.$nextTick(function () {
                return _this.inputValue = step;
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

/***/ "./src/components/VStepper/VStepperContent.js":
/*!****************************************************!*\
  !*** ./src/components/VStepper/VStepperContent.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transitions */ "./src/components/transitions/index.js");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
// Components

// Mixins

// Helpers

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-stepper-content',
    mixins: [Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_1__["inject"])('stepper', 'v-stepper-content', 'v-stepper')],
    inject: {
        isVerticalProvided: {
            from: 'isVertical'
        }
    },
    props: {
        step: {
            type: [Number, String],
            required: true
        }
    },
    data: function data() {
        return {
            height: 0,
            // Must be null to allow
            // previous comparison
            isActive: null,
            isReverse: false,
            isVertical: this.isVerticalProvided
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-stepper__content': true
            };
        },
        computedTransition: function computedTransition() {
            return this.isReverse ? _transitions__WEBPACK_IMPORTED_MODULE_0__["VTabReverseTransition"] : _transitions__WEBPACK_IMPORTED_MODULE_0__["VTabTransition"];
        },
        styles: function styles() {
            if (!this.isVertical) return {};
            return {
                height: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_2__["convertToUnit"])(this.height)
            };
        },
        wrapperClasses: function wrapperClasses() {
            return {
                'v-stepper__wrapper': true
            };
        }
    },
    watch: {
        isActive: function isActive(current, previous) {
            // If active and the previous state
            // was null, is just booting up
            if (current && previous == null) {
                return this.height = 'auto';
            }
            if (!this.isVertical) return;
            if (this.isActive) this.enter();else this.leave();
        }
    },
    mounted: function mounted() {
        this.$refs.wrapper.addEventListener('transitionend', this.onTransition, false);
        this.stepper && this.stepper.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.$refs.wrapper.removeEventListener('transitionend', this.onTransition, false);
        this.stepper && this.stepper.unregister(this);
    },
    methods: {
        onTransition: function onTransition(e) {
            if (!this.isActive || e.propertyName !== 'height') return;
            this.height = 'auto';
        },
        enter: function enter() {
            var _this = this;
            var scrollHeight = 0;
            // Render bug with height
            requestAnimationFrame(function () {
                scrollHeight = _this.$refs.wrapper.scrollHeight;
            });
            this.height = 0;
            // Give the collapsing element time to collapse
            setTimeout(function () {
                return _this.isActive && (_this.height = scrollHeight || 'auto');
            }, 450);
        },
        leave: function leave() {
            var _this = this;
            this.height = this.$refs.wrapper.clientHeight;
            setTimeout(function () {
                return _this.height = 0;
            }, 10);
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

/***/ "./src/components/VStepper/VStepperStep.js":
/*!*************************************************!*\
  !*** ./src/components/VStepper/VStepperStep.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/ripple */ "./src/directives/ripple.ts");
// Components

// Mixins


// Directives

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-stepper-step',
    directives: { Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_3__["default"] },
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_2__["inject"])('stepper', 'v-stepper-step', 'v-stepper')],
    inject: ['stepClick'],
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        complete: Boolean,
        completeIcon: {
            type: String,
            default: '$vuetify.icons.complete'
        },
        editIcon: {
            type: String,
            default: '$vuetify.icons.edit'
        },
        errorIcon: {
            type: String,
            default: '$vuetify.icons.error'
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
    data: function data() {
        return {
            isActive: false,
            isInactive: true
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-stepper__step': true,
                'v-stepper__step--active': this.isActive,
                'v-stepper__step--editable': this.editable,
                'v-stepper__step--inactive': this.isInactive,
                'v-stepper__step--error': this.hasError,
                'v-stepper__step--complete': this.complete,
                'error--text': this.hasError
            };
        },
        hasError: function hasError() {
            return this.rules.some(function (i) {
                return i() !== true;
            });
        }
    },
    mounted: function mounted() {
        this.stepper && this.stepper.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.stepper && this.stepper.unregister(this);
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
        var stepContent;
        if (this.hasError) {
            stepContent = [h(_VIcon__WEBPACK_IMPORTED_MODULE_0__["default"], {}, this.errorIcon)];
        } else if (this.complete) {
            if (this.editable) {
                stepContent = [h(_VIcon__WEBPACK_IMPORTED_MODULE_0__["default"], {}, this.editIcon)];
            } else {
                stepContent = [h(_VIcon__WEBPACK_IMPORTED_MODULE_0__["default"], {}, this.completeIcon)];
            }
        } else {
            stepContent = this.step;
        }
        var color = !this.hasError && (this.complete || this.isActive) ? this.color : false;
        var step = h('span', this.setBackgroundColor(color, {
            staticClass: 'v-stepper__step__step'
        }), stepContent);
        var label = h('div', {
            staticClass: 'v-stepper__label'
        }, this.$slots.default);
        return h('div', data, [step, label]);
    }
});

/***/ }),

/***/ "./src/components/VStepper/index.js":
/*!******************************************!*\
  !*** ./src/components/VStepper/index.js ***!
  \******************************************/
/*! exports provided: VStepper, VStepperContent, VStepperStep, VStepperHeader, VStepperItems, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VStepperHeader", function() { return VStepperHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VStepperItems", function() { return VStepperItems; });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _VStepper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VStepper */ "./src/components/VStepper/VStepper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VStepper", function() { return _VStepper__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _VStepperStep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VStepperStep */ "./src/components/VStepper/VStepperStep.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VStepperStep", function() { return _VStepperStep__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _VStepperContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VStepperContent */ "./src/components/VStepper/VStepperContent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VStepperContent", function() { return _VStepperContent__WEBPACK_IMPORTED_MODULE_3__["default"]; });





var VStepperHeader = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-stepper__header');
var VStepperItems = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-stepper__items');

/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VStepper: _VStepper__WEBPACK_IMPORTED_MODULE_1__["default"],
        VStepperContent: _VStepperContent__WEBPACK_IMPORTED_MODULE_3__["default"],
        VStepperStep: _VStepperStep__WEBPACK_IMPORTED_MODULE_2__["default"],
        VStepperHeader: VStepperHeader,
        VStepperItems: VStepperItems
    }
});

/***/ }),

/***/ "./src/components/VSubheader/VSubheader.js":
/*!*************************************************!*\
  !*** ./src/components/VSubheader/VSubheader.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_subheaders_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_subheaders.styl */ "./src/stylus/components/_subheaders.styl");
/* harmony import */ var _stylus_components_subheaders_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_subheaders_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-subheader',
    mixins: [_mixins_themeable__WEBPACK_IMPORTED_MODULE_1__["default"]],
    props: {
        inset: Boolean
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-subheader',
            class: __assign({ 'v-subheader--inset': this.inset }, this.themeClasses),
            attrs: this.$attrs,
            on: this.$listeners
        }, this.$slots.default);
    }
});

/***/ }),

/***/ "./src/components/VSubheader/index.js":
/*!********************************************!*\
  !*** ./src/components/VSubheader/index.js ***!
  \********************************************/
/*! exports provided: VSubheader, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VSubheader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSubheader */ "./src/components/VSubheader/VSubheader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSubheader", function() { return _VSubheader__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VSubheader__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VSwitch/VSwitch.js":
/*!*******************************************!*\
  !*** ./src/components/VSwitch/VSwitch.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_selection_controls_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_selection-controls.styl */ "./src/stylus/components/_selection-controls.styl");
/* harmony import */ var _stylus_components_selection_controls_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_selection_controls_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stylus_components_switch_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stylus/components/_switch.styl */ "./src/stylus/components/_switch.styl");
/* harmony import */ var _stylus_components_switch_styl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_switch_styl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mixins_selectable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/selectable */ "./src/mixins/selectable.js");
/* harmony import */ var _directives_touch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../directives/touch */ "./src/directives/touch.ts");
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transitions */ "./src/components/transitions/index.js");
/* harmony import */ var _VProgressCircular_VProgressCircular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../VProgressCircular/VProgressCircular */ "./src/components/VProgressCircular/VProgressCircular.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


// Mixins

// Directives

// Components


// Helpers

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-switch',
    directives: { Touch: _directives_touch__WEBPACK_IMPORTED_MODULE_3__["default"] },
    mixins: [_mixins_selectable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        loading: {
            type: [Boolean, String],
            default: false
        }
    },
    computed: {
        classes: function classes() {
            return {
                'v-input--selection-controls v-input--switch': true
            };
        },
        switchData: function switchData() {
            return this.setTextColor(this.loading ? undefined : this.computedColor, {
                class: this.themeClasses
            });
        }
    },
    methods: {
        genDefaultSlot: function genDefaultSlot() {
            return [this.genSwitch(), this.genLabel()];
        },
        genSwitch: function genSwitch() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [this.genInput('checkbox', this.$attrs), !this.disabled && this.genRipple(this.setTextColor(this.computedColor, {
                directives: [{
                    name: 'touch',
                    value: {
                        left: this.onSwipeLeft,
                        right: this.onSwipeRight
                    }
                }]
            })), this.$createElement('div', __assign({ staticClass: 'v-input--switch__track' }, this.switchData)), this.$createElement('div', __assign({ staticClass: 'v-input--switch__thumb' }, this.switchData), [this.genProgress()])]);
        },
        genProgress: function genProgress() {
            return this.$createElement(_transitions__WEBPACK_IMPORTED_MODULE_4__["VFabTransition"], {}, [this.loading === false ? null : this.$slots.progress || this.$createElement(_VProgressCircular_VProgressCircular__WEBPACK_IMPORTED_MODULE_5__["default"], {
                props: {
                    color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
                    size: 16,
                    width: 2,
                    indeterminate: true
                }
            })]);
        },
        onSwipeLeft: function onSwipeLeft() {
            if (this.isActive) this.onChange();
        },
        onSwipeRight: function onSwipeRight() {
            if (!this.isActive) this.onChange();
        },
        onKeydown: function onKeydown(e) {
            if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_6__["keyCodes"].left && this.isActive || e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_6__["keyCodes"].right && !this.isActive) this.onChange();
        }
    }
});

/***/ }),

/***/ "./src/components/VSwitch/index.js":
/*!*****************************************!*\
  !*** ./src/components/VSwitch/index.js ***!
  \*****************************************/
/*! exports provided: VSwitch, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VSwitch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSwitch */ "./src/components/VSwitch/VSwitch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSwitch", function() { return _VSwitch__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VSwitch__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VSystemBar/VSystemBar.js":
/*!*************************************************!*\
  !*** ./src/components/VSystemBar/VSystemBar.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_system_bars_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_system-bars.styl */ "./src/stylus/components/_system-bars.styl");
/* harmony import */ var _stylus_components_system_bars_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_system_bars_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/applicationable */ "./src/mixins/applicationable.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-system-bar',
    mixins: [Object(_mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__["default"])('bar', ['height', 'window']), _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__["default"]],
    props: {
        height: {
            type: [Number, String],
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
        },
        lightsOut: Boolean,
        status: Boolean,
        window: Boolean
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-system-bar--lights-out': this.lightsOut, 'v-system-bar--absolute': this.absolute, 'v-system-bar--fixed': !this.absolute && (this.app || this.fixed), 'v-system-bar--status': this.status, 'v-system-bar--window': this.window }, this.themeClasses);
        },
        computedHeight: function computedHeight() {
            if (this.height) return parseInt(this.height);
            return this.window ? 32 : 24;
        }
    },
    methods: {
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication: function updateApplication() {
            return this.computedHeight;
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-system-bar',
            'class': this.classes,
            style: {
                height: this.computedHeight + "px"
            }
        };
        return h('div', this.setBackgroundColor(this.color, data), this.$slots.default);
    }
});

/***/ }),

/***/ "./src/components/VSystemBar/index.js":
/*!********************************************!*\
  !*** ./src/components/VSystemBar/index.js ***!
  \********************************************/
/*! exports provided: VSystemBar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VSystemBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSystemBar */ "./src/components/VSystemBar/VSystemBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSystemBar", function() { return _VSystemBar__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VSystemBar__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VTabs/VTab.js":
/*!**************************************!*\
  !*** ./src/components/VTabs/VTab.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_groupable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/groupable */ "./src/mixins/groupable.ts");
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/routable */ "./src/mixins/routable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Mixins



// Utilities

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-tab',
    mixins: [_mixins_routable__WEBPACK_IMPORTED_MODULE_1__["default"],
    // Must be after routable
    // to overwrite activeClass
    Object(_mixins_groupable__WEBPACK_IMPORTED_MODULE_0__["factory"])('tabGroup'), _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        ripple: {
            type: [Boolean, Object],
            default: true
        }
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-tabs__item': true, 'v-tabs__item--disabled': this.disabled }, this.groupClasses);
        },
        value: function value() {
            var to = this.to || this.href || '';
            if (this.$router && this.to === Object(this.to)) {
                var resolve = this.$router.resolve(this.to, this.$route, this.append);
                to = resolve.href;
            }
            return to.replace('#', '');
        }
    },
    watch: {
        $route: 'onRouteChange'
    },
    mounted: function mounted() {
        this.onRouteChange();
    },
    methods: {
        click: function click(e) {
            // If user provides an
            // actual link, do not
            // prevent default
            if (this.href && this.href.indexOf('#') > -1) e.preventDefault();
            this.$emit('click', e);
            this.to || this.toggle();
        },
        onRouteChange: function onRouteChange() {
            var _this = this;
            if (!this.to || !this.$refs.link) return;
            var path = "_vnode.data.class." + this.activeClass;
            this.$nextTick(function () {
                if (Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__["getObjectValueByPath"])(_this.$refs.link, path)) {
                    _this.toggle();
                }
            });
        }
    },
    render: function render(h) {
        var link = this.generateRouteLink(this.classes);
        var data = link.data;
        // If disabled, use div as anchor tags do not support
        // being disabled
        var tag = this.disabled ? 'div' : link.tag;
        data.ref = 'link';
        return h('div', {
            staticClass: 'v-tabs__div'
        }, [h(tag, data, this.$slots.default)]);
    }
});

/***/ }),

/***/ "./src/components/VTabs/VTabItem.js":
/*!******************************************!*\
  !*** ./src/components/VTabs/VTabItem.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VWindow_VWindowItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VWindow/VWindowItem */ "./src/components/VWindow/VWindowItem.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
// Extensions

// Mixins

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (_VWindow_VWindowItem__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
    name: 'v-tab-item',
    props: {
        id: String
    },
    render: function render(h) {
        var render = _VWindow_VWindowItem__WEBPACK_IMPORTED_MODULE_0__["default"].options.render.call(this, h);
        // For backwards compatibility with v1.2
        /* istanbul ignore next */
        if (this.id) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_1__["deprecate"])('id', 'value', this);
            render.data.domProps = render.data.domProps || {};
            render.data.domProps.id = this.id;
        }
        return render;
    }
}));

/***/ }),

/***/ "./src/components/VTabs/VTabs.js":
/*!***************************************!*\
  !*** ./src/components/VTabs/VTabs.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_tabs_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_tabs.styl */ "./src/stylus/components/_tabs.styl");
/* harmony import */ var _stylus_components_tabs_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_tabs_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VItemGroup/VItemGroup */ "./src/components/VItemGroup/VItemGroup.ts");
/* harmony import */ var _mixins_tabs_computed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/tabs-computed */ "./src/components/VTabs/mixins/tabs-computed.js");
/* harmony import */ var _mixins_tabs_generators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mixins/tabs-generators */ "./src/components/VTabs/mixins/tabs-generators.js");
/* harmony import */ var _mixins_tabs_props__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mixins/tabs-props */ "./src/components/VTabs/mixins/tabs-props.js");
/* harmony import */ var _mixins_tabs_touch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mixins/tabs-touch */ "./src/components/VTabs/mixins/tabs-touch.js");
/* harmony import */ var _mixins_tabs_watchers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mixins/tabs-watchers */ "./src/components/VTabs/mixins/tabs-watchers.js");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_ssr_bootable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../mixins/ssr-bootable */ "./src/mixins/ssr-bootable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _directives_resize__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../directives/resize */ "./src/directives/resize.ts");
/* harmony import */ var _directives_touch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../directives/touch */ "./src/directives/touch.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
/* harmony import */ var _util_ThemeProvider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../util/ThemeProvider */ "./src/util/ThemeProvider.ts");
// Styles

// Extensions

// Component level mixins





// Mixins



// Directives



// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (_VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_1__["BaseItemGroup"].extend({
    name: 'v-tabs',
    directives: {
        Resize: _directives_resize__WEBPACK_IMPORTED_MODULE_10__["default"],
        Touch: _directives_touch__WEBPACK_IMPORTED_MODULE_11__["default"]
    },
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_7__["default"], _mixins_ssr_bootable__WEBPACK_IMPORTED_MODULE_8__["default"], _mixins_tabs_computed__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_tabs_props__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_tabs_generators__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_tabs_touch__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_tabs_watchers__WEBPACK_IMPORTED_MODULE_6__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_9__["default"]],
    provide: function provide() {
        return {
            tabGroup: this,
            tabProxy: this.tabProxy,
            registerItems: this.registerItems,
            unregisterItems: this.unregisterItems
        };
    },
    data: function data() {
        return {
            bar: [],
            content: [],
            isOverflowing: false,
            nextIconVisible: false,
            prevIconVisible: false,
            resizeTimeout: null,
            scrollOffset: 0,
            sliderWidth: null,
            sliderLeft: null,
            startX: 0,
            tabItems: null,
            transitionTime: 300,
            widths: {
                bar: 0,
                container: 0,
                wrapper: 0
            }
        };
    },
    watch: {
        items: 'onResize',
        tabs: 'onResize'
    },
    methods: {
        checkIcons: function checkIcons() {
            this.prevIconVisible = this.checkPrevIcon();
            this.nextIconVisible = this.checkNextIcon();
        },
        checkPrevIcon: function checkPrevIcon() {
            return this.scrollOffset > 0;
        },
        checkNextIcon: function checkNextIcon() {
            // Check one scroll ahead to know the width of right-most item
            return this.widths.container > this.scrollOffset + this.widths.wrapper;
        },
        callSlider: function callSlider() {
            var _this = this;
            if (this.hideSlider || !this.activeTab) return false;
            // Give screen time to paint
            var activeTab = this.activeTab;
            this.$nextTick(function () {
                /* istanbul ignore if */
                if (!activeTab || !activeTab.$el) return;
                _this.sliderWidth = activeTab.$el.scrollWidth;
                _this.sliderLeft = activeTab.$el.offsetLeft;
            });
        },
        // Do not process
        // until DOM is
        // painted
        init: function init() {
            _VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_1__["BaseItemGroup"].options.methods.init.call(this);
            /* istanbul ignore next */
            if (this.$listeners['input']) {
                Object(_util_console__WEBPACK_IMPORTED_MODULE_12__["deprecate"])('@input', '@change', this);
            }
            this.updateTabsView();
        },
        /**
         * When v-navigation-drawer changes the
         * width of the container, call resize
         * after the transition is complete
         */
        onResize: function onResize() {
            if (this._isDestroyed) return;
            this.setWidths();
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(this.updateTabsView, this.transitionTime);
        },
        overflowCheck: function overflowCheck(e, fn) {
            this.isOverflowing && fn(e);
        },
        scrollTo: function scrollTo(direction) {
            this.scrollOffset = this.newOffset(direction);
        },
        setOverflow: function setOverflow() {
            this.isOverflowing = this.widths.bar < this.widths.container;
        },
        setWidths: function setWidths() {
            var bar = this.$refs.bar ? this.$refs.bar.clientWidth : 0;
            var container = this.$refs.container ? this.$refs.container.clientWidth : 0;
            var wrapper = this.$refs.wrapper ? this.$refs.wrapper.clientWidth : 0;
            this.widths = { bar: bar, container: container, wrapper: wrapper };
            this.setOverflow();
        },
        parseNodes: function parseNodes() {
            var item = [];
            var items = [];
            var slider = [];
            var tab = [];
            var length = (this.$slots.default || []).length;
            for (var i = 0; i < length; i++) {
                var vnode = this.$slots.default[i];
                if (vnode.componentOptions) {
                    switch (vnode.componentOptions.Ctor.options.name) {
                        case 'v-tabs-slider':
                            slider.push(vnode);
                            break;
                        case 'v-tabs-items':
                            items.push(vnode);
                            break;
                        case 'v-tab-item':
                            item.push(vnode);
                            break;
                        // case 'v-tab' - intentionally omitted
                        default:
                            tab.push(vnode);
                    }
                } else {
                    tab.push(vnode);
                }
            }
            return { tab: tab, slider: slider, items: items, item: item };
        },
        registerItems: function registerItems(fn) {
            this.tabItems = fn;
            fn(this.internalValue);
        },
        unregisterItems: function unregisterItems() {
            this.tabItems = null;
        },
        updateTabsView: function updateTabsView() {
            this.callSlider();
            this.scrollIntoView();
            this.checkIcons();
        },
        scrollIntoView: function scrollIntoView() {
            /* istanbul ignore next */
            if (!this.activeTab) return;
            if (!this.isOverflowing) return this.scrollOffset = 0;
            var totalWidth = this.widths.wrapper + this.scrollOffset;
            var _a = this.activeTab.$el,
                clientWidth = _a.clientWidth,
                offsetLeft = _a.offsetLeft;
            var itemOffset = clientWidth + offsetLeft;
            var additionalOffset = clientWidth * 0.3;
            if (this.activeTab === this.items[this.items.length - 1]) {
                additionalOffset = 0; // don't add an offset if selecting the last tab
            }
            /* istanbul ignore else */
            if (offsetLeft < this.scrollOffset) {
                this.scrollOffset = Math.max(offsetLeft - additionalOffset, 0);
            } else if (totalWidth < itemOffset) {
                this.scrollOffset -= totalWidth - itemOffset - additionalOffset;
            }
        },
        tabProxy: function tabProxy(val) {
            this.internalValue = val;
        }
    },
    render: function render(h) {
        var _a = this.parseNodes(),
            tab = _a.tab,
            slider = _a.slider,
            items = _a.items,
            item = _a.item;
        return h('div', {
            staticClass: 'v-tabs',
            directives: [{
                name: 'resize',
                modifiers: { quiet: true },
                value: this.onResize
            }]
        }, [this.genBar([this.hideSlider ? null : this.genSlider(slider), tab]), h(_util_ThemeProvider__WEBPACK_IMPORTED_MODULE_13__["default"], {
            props: { dark: this.theme.isDark, light: !this.theme.isDark }
        }, [this.genItems(items, item)])]);
    }
}));

/***/ }),

/***/ "./src/components/VTabs/VTabsItems.js":
/*!********************************************!*\
  !*** ./src/components/VTabs/VTabsItems.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VWindow_VWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VWindow/VWindow */ "./src/components/VWindow/VWindow.ts");
// Extensions

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (_VWindow_VWindow__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
    name: 'v-tabs-items',
    inject: {
        registerItems: {
            default: null
        },
        tabProxy: {
            default: null
        },
        unregisterItems: {
            default: null
        }
    },
    props: {
        cycle: Boolean
    },
    watch: {
        internalValue: function internalValue(val) {
            /* istanbul ignore else */
            if (this.tabProxy) this.tabProxy(val);
        }
    },
    created: function created() {
        this.registerItems && this.registerItems(this.changeModel);
    },
    beforeDestroy: function beforeDestroy() {
        this.unregisterItems && this.unregisterItems();
    },
    methods: {
        changeModel: function changeModel(val) {
            this.internalValue = val;
        },
        // For backwards compatability with v1.2
        getValue: function getValue(item, i) {
            /* istanbul ignore if */
            if (item.id) return item.id;
            return _VWindow_VWindow__WEBPACK_IMPORTED_MODULE_0__["default"].options.methods.getValue.call(this, item, i);
        },
        next: function next() {
            if (!this.cycle && this.internalIndex === this.items.length - 1) {
                return;
            }
            _VWindow_VWindow__WEBPACK_IMPORTED_MODULE_0__["default"].options.methods.next.call(this);
        },
        prev: function prev() {
            if (!this.cycle && this.internalIndex === 0) {
                return;
            }
            _VWindow_VWindow__WEBPACK_IMPORTED_MODULE_0__["default"].options.methods.prev.call(this);
        }
    }
}));

/***/ }),

/***/ "./src/components/VTabs/VTabsSlider.js":
/*!*********************************************!*\
  !*** ./src/components/VTabs/VTabsSlider.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-tabs-slider',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_0__["default"]],
    render: function render(h) {
        return h('div', this.setBackgroundColor(this.color || 'accent', {
            staticClass: 'v-tabs__slider'
        }));
    }
});

/***/ }),

/***/ "./src/components/VTabs/index.js":
/*!***************************************!*\
  !*** ./src/components/VTabs/index.js ***!
  \***************************************/
/*! exports provided: VTabs, VTab, VTabItem, VTabsItems, VTabsSlider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VTabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTabs */ "./src/components/VTabs/VTabs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabs", function() { return _VTabs__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VTab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VTab */ "./src/components/VTabs/VTab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTab", function() { return _VTab__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _VTabsItems__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VTabsItems */ "./src/components/VTabs/VTabsItems.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabsItems", function() { return _VTabsItems__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _VTabItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VTabItem */ "./src/components/VTabs/VTabItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabItem", function() { return _VTabItem__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _VTabsSlider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VTabsSlider */ "./src/components/VTabs/VTabsSlider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabsSlider", function() { return _VTabsSlider__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VTabs: _VTabs__WEBPACK_IMPORTED_MODULE_0__["default"],
        VTab: _VTab__WEBPACK_IMPORTED_MODULE_1__["default"],
        VTabsItems: _VTabsItems__WEBPACK_IMPORTED_MODULE_2__["default"],
        VTabItem: _VTabItem__WEBPACK_IMPORTED_MODULE_3__["default"],
        VTabsSlider: _VTabsSlider__WEBPACK_IMPORTED_MODULE_4__["default"]
    }
});

/***/ }),

/***/ "./src/components/VTabs/mixins/tabs-computed.js":
/*!******************************************************!*\
  !*** ./src/components/VTabs/mixins/tabs-computed.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Tabs computed
 *
 * @mixin
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    computed: {
        activeTab: function activeTab() {
            if (!this.selectedItems.length) return undefined;
            return this.selectedItems[0];
        },
        containerStyles: function containerStyles() {
            return this.height ? {
                height: parseInt(this.height, 10) + "px"
            } : null;
        },
        hasArrows: function hasArrows() {
            return (this.showArrows || !this.isMobile) && this.isOverflowing;
        },
        isMobile: function isMobile() {
            return this.$vuetify.breakpoint.width < this.mobileBreakPoint;
        },
        sliderStyles: function sliderStyles() {
            return {
                left: this.sliderLeft + "px",
                transition: this.sliderLeft != null ? null : 'none',
                width: this.sliderWidth + "px"
            };
        }
    }
});

/***/ }),

/***/ "./src/components/VTabs/mixins/tabs-generators.js":
/*!********************************************************!*\
  !*** ./src/components/VTabs/mixins/tabs-generators.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VTabsItems__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VTabsItems */ "./src/components/VTabs/VTabsItems.js");
/* harmony import */ var _VTabsSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VTabsSlider */ "./src/components/VTabs/VTabsSlider.js");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../VIcon */ "./src/components/VIcon/index.ts");



/**
 * Tabs generators
 *
 * @mixin
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        genBar: function genBar(items) {
            return this.$createElement('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-tabs__bar',
                'class': this.themeClasses,
                ref: 'bar'
            }), [this.genTransition('prev'), this.genWrapper(this.genContainer(items)), this.genTransition('next')]);
        },
        genContainer: function genContainer(items) {
            return this.$createElement('div', {
                staticClass: 'v-tabs__container',
                class: {
                    'v-tabs__container--align-with-title': this.alignWithTitle,
                    'v-tabs__container--centered': this.centered,
                    'v-tabs__container--fixed-tabs': this.fixedTabs,
                    'v-tabs__container--grow': this.grow,
                    'v-tabs__container--icons-and-text': this.iconsAndText,
                    'v-tabs__container--overflow': this.isOverflowing,
                    'v-tabs__container--right': this.right
                },
                style: this.containerStyles,
                ref: 'container'
            }, items);
        },
        genIcon: function genIcon(direction) {
            var _this = this;
            if (!this.hasArrows || !this[direction + "IconVisible"]) return null;
            return this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {
                staticClass: "v-tabs__icon v-tabs__icon--" + direction,
                props: {
                    disabled: !this[direction + "IconVisible"]
                },
                on: {
                    click: function click() {
                        return _this.scrollTo(direction);
                    }
                }
            }, this[direction + "Icon"]);
        },
        genItems: function genItems(items, item) {
            if (items.length > 0) return items;
            if (!item.length) return null;
            return this.$createElement(_VTabsItems__WEBPACK_IMPORTED_MODULE_0__["default"], item);
        },
        genTransition: function genTransition(direction) {
            return this.$createElement('transition', {
                props: { name: 'fade-transition' }
            }, [this.genIcon(direction)]);
        },
        genWrapper: function genWrapper(items) {
            var _this = this;
            return this.$createElement('div', {
                staticClass: 'v-tabs__wrapper',
                class: {
                    'v-tabs__wrapper--show-arrows': this.hasArrows
                },
                ref: 'wrapper',
                directives: [{
                    name: 'touch',
                    value: {
                        start: function start(e) {
                            return _this.overflowCheck(e, _this.onTouchStart);
                        },
                        move: function move(e) {
                            return _this.overflowCheck(e, _this.onTouchMove);
                        },
                        end: function end(e) {
                            return _this.overflowCheck(e, _this.onTouchEnd);
                        }
                    }
                }]
            }, [items]);
        },
        genSlider: function genSlider(items) {
            if (!items.length) {
                items = [this.$createElement(_VTabsSlider__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    props: { color: this.sliderColor }
                })];
            }
            return this.$createElement('div', {
                staticClass: 'v-tabs__slider-wrapper',
                style: this.sliderStyles
            }, items);
        }
    }
});

/***/ }),

/***/ "./src/components/VTabs/mixins/tabs-props.js":
/*!***************************************************!*\
  !*** ./src/components/VTabs/mixins/tabs-props.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Tabs props
 *
 * @mixin
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        activeClass: {
            type: String,
            default: 'v-tabs__item--active'
        },
        alignWithTitle: Boolean,
        centered: Boolean,
        fixedTabs: Boolean,
        grow: Boolean,
        height: {
            type: [Number, String],
            default: undefined,
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
        },
        hideSlider: Boolean,
        iconsAndText: Boolean,
        mandatory: {
            type: Boolean,
            default: true
        },
        mobileBreakPoint: {
            type: [Number, String],
            default: 1264,
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
        },
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        right: Boolean,
        showArrows: Boolean,
        sliderColor: {
            type: String,
            default: 'accent'
        },
        value: [Number, String]
    }
});

/***/ }),

/***/ "./src/components/VTabs/mixins/tabs-touch.js":
/*!***************************************************!*\
  !*** ./src/components/VTabs/mixins/tabs-touch.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Tabs touch
 *
 * @mixin
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        newOffset: function newOffset(direction) {
            var clientWidth = this.$refs.wrapper.clientWidth;
            if (direction === 'prev') {
                return Math.max(this.scrollOffset - clientWidth, 0);
            } else {
                return Math.min(this.scrollOffset + clientWidth, this.$refs.container.clientWidth - clientWidth);
            }
        },
        onTouchStart: function onTouchStart(e) {
            this.startX = this.scrollOffset + e.touchstartX;
            this.$refs.container.style.transition = 'none';
            this.$refs.container.style.willChange = 'transform';
        },
        onTouchMove: function onTouchMove(e) {
            this.scrollOffset = this.startX - e.touchmoveX;
        },
        onTouchEnd: function onTouchEnd() {
            var container = this.$refs.container;
            var wrapper = this.$refs.wrapper;
            var maxScrollOffset = container.clientWidth - wrapper.clientWidth;
            container.style.transition = null;
            container.style.willChange = null;
            /* istanbul ignore else */
            if (this.scrollOffset < 0 || !this.isOverflowing) {
                this.scrollOffset = 0;
            } else if (this.scrollOffset >= maxScrollOffset) {
                this.scrollOffset = maxScrollOffset;
            }
        }
    }
});

/***/ }),

/***/ "./src/components/VTabs/mixins/tabs-watchers.js":
/*!******************************************************!*\
  !*** ./src/components/VTabs/mixins/tabs-watchers.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Tabs watchers
 *
 * @mixin
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    watch: {
        activeTab: function activeTab(val, oldVal) {
            this.setOverflow();
            if (!val) return;
            this.tabItems && this.tabItems(this.getValue(val, this.items.indexOf(val)));
            // Do nothing for first tab
            // is handled from isBooted
            // watcher
            if (oldVal == null) return;
            this.updateTabsView();
        },
        alignWithTitle: 'callSlider',
        centered: 'callSlider',
        fixedTabs: 'callSlider',
        hasArrows: function hasArrows(val) {
            if (!val) this.scrollOffset = 0;
        },
        /* @deprecate */
        internalValue: function internalValue(val) {
            /* istanbul ignore else */
            if (!this.$listeners['input']) return;
            this.$emit('input', val);
        },
        lazyValue: 'updateTabs',
        right: 'callSlider',
        '$vuetify.application.left': 'onResize',
        '$vuetify.application.right': 'onResize',
        scrollOffset: function scrollOffset(val) {
            this.$refs.container.style.transform = "translateX(" + -val + "px)";
            if (this.hasArrows) {
                this.prevIconVisible = this.checkPrevIcon();
                this.nextIconVisible = this.checkNextIcon();
            }
        }
    }
});

/***/ }),

/***/ "./src/components/VTextField/VTextField.js":
/*!*************************************************!*\
  !*** ./src/components/VTextField/VTextField.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_text_fields_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_text-fields.styl */ "./src/stylus/components/_text-fields.styl");
/* harmony import */ var _stylus_components_text_fields_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_text_fields_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VInput */ "./src/components/VInput/index.js");
/* harmony import */ var _VCounter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VCounter */ "./src/components/VCounter/index.js");
/* harmony import */ var _VLabel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VLabel */ "./src/components/VLabel/index.js");
/* harmony import */ var _mixins_maskable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/maskable */ "./src/mixins/maskable.js");
/* harmony import */ var _mixins_loadable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/loadable */ "./src/mixins/loadable.ts");
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../directives/ripple */ "./src/directives/ripple.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Extensions

// Components


// Mixins


// Directives

// Utilities


var dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-text-field',
    directives: { Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_6__["default"] },
    extends: _VInput__WEBPACK_IMPORTED_MODULE_1__["default"],
    mixins: [_mixins_maskable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_loadable__WEBPACK_IMPORTED_MODULE_5__["default"]],
    inheritAttrs: false,
    props: {
        appendOuterIcon: String,
        /** @deprecated */
        appendOuterIconCb: Function,
        autofocus: Boolean,
        box: Boolean,
        browserAutocomplete: String,
        clearable: Boolean,
        clearIcon: {
            type: String,
            default: '$vuetify.icons.clear'
        },
        clearIconCb: Function,
        color: {
            type: String,
            default: 'primary'
        },
        counter: [Boolean, Number, String],
        flat: Boolean,
        fullWidth: Boolean,
        label: String,
        outline: Boolean,
        placeholder: String,
        prefix: String,
        prependInnerIcon: String,
        /** @deprecated */
        prependInnerIconCb: Function,
        reverse: Boolean,
        singleLine: Boolean,
        solo: Boolean,
        soloInverted: Boolean,
        suffix: String,
        textarea: Boolean,
        type: {
            type: String,
            default: 'text'
        }
    },
    data: function data() {
        return {
            badInput: false,
            initialValue: null,
            internalChange: false,
            isClearing: false
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-text-field': true,
                'v-text-field--full-width': this.fullWidth,
                'v-text-field--prefix': this.prefix,
                'v-text-field--single-line': this.isSingle,
                'v-text-field--solo': this.isSolo,
                'v-text-field--solo-inverted': this.soloInverted,
                'v-text-field--solo-flat': this.flat,
                'v-text-field--box': this.box,
                'v-text-field--enclosed': this.isEnclosed,
                'v-text-field--reverse': this.reverse,
                'v-text-field--outline': this.hasOutline
            };
        },
        counterValue: function counterValue() {
            return (this.internalValue || '').toString().length;
        },
        directivesInput: function directivesInput() {
            return [];
        },
        // TODO: Deprecate
        hasOutline: function hasOutline() {
            return this.outline || this.textarea;
        },
        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                if (this.mask) {
                    this.lazyValue = this.unmaskText(this.maskText(this.unmaskText(val)));
                    this.setSelectionRange();
                } else {
                    this.lazyValue = val;
                    this.$emit('input', this.lazyValue);
                }
            }
        },
        isDirty: function isDirty() {
            return this.lazyValue != null && this.lazyValue.toString().length > 0 || this.badInput;
        },
        isEnclosed: function isEnclosed() {
            return this.box || this.isSolo || this.hasOutline || this.fullWidth;
        },
        isLabelActive: function isLabelActive() {
            return this.isDirty || dirtyTypes.includes(this.type);
        },
        isSingle: function isSingle() {
            return this.isSolo || this.singleLine;
        },
        isSolo: function isSolo() {
            return this.solo || this.soloInverted;
        },
        labelPosition: function labelPosition() {
            var offset = this.prefix && !this.labelValue ? 16 : 0;
            return !this.$vuetify.rtl !== !this.reverse ? {
                left: 'auto',
                right: offset
            } : {
                left: offset,
                right: 'auto'
            };
        },
        showLabel: function showLabel() {
            return this.hasLabel && (!this.isSingle || !this.isLabelActive && !this.placeholder);
        },
        labelValue: function labelValue() {
            return !this.isSingle && Boolean(this.isFocused || this.isLabelActive || this.placeholder);
        }
    },
    watch: {
        isFocused: function isFocused(val) {
            // Sets validationState from validatable
            this.hasColor = val;
            if (val) {
                this.initialValue = this.lazyValue;
            } else if (this.initialValue !== this.lazyValue) {
                this.$emit('change', this.lazyValue);
            }
        },
        value: function value(val) {
            var _this = this;
            if (this.mask && !this.internalChange) {
                var masked_1 = this.maskText(this.unmaskText(val));
                this.lazyValue = this.unmaskText(masked_1);
                // Emit when the externally set value was modified internally
                String(val) !== this.lazyValue && this.$nextTick(function () {
                    _this.$refs.input.value = masked_1;
                    _this.$emit('input', _this.lazyValue);
                });
            } else this.lazyValue = val;
        }
    },
    mounted: function mounted() {
        this.autofocus && this.onFocus();
    },
    methods: {
        /** @public */
        focus: function focus() {
            this.onFocus();
        },
        /** @public */
        blur: function blur() {
            this.$refs.input ? this.$refs.input.blur() : this.onBlur();
        },
        clearableCallback: function clearableCallback() {
            var _this = this;
            this.internalValue = null;
            this.$nextTick(function () {
                return _this.$refs.input.focus();
            });
        },
        genAppendSlot: function genAppendSlot() {
            var slot = [];
            if (this.$slots['append-outer']) {
                slot.push(this.$slots['append-outer']);
            } else if (this.appendOuterIcon) {
                slot.push(this.genIcon('appendOuter'));
            }
            return this.genSlot('append', 'outer', slot);
        },
        genPrependInnerSlot: function genPrependInnerSlot() {
            var slot = [];
            if (this.$slots['prepend-inner']) {
                slot.push(this.$slots['prepend-inner']);
            } else if (this.prependInnerIcon) {
                slot.push(this.genIcon('prependInner'));
            }
            return this.genSlot('prepend', 'inner', slot);
        },
        genIconSlot: function genIconSlot() {
            var slot = [];
            if (this.$slots['append']) {
                slot.push(this.$slots['append']);
            } else if (this.appendIcon) {
                slot.push(this.genIcon('append'));
            }
            return this.genSlot('append', 'inner', slot);
        },
        genInputSlot: function genInputSlot() {
            var input = _VInput__WEBPACK_IMPORTED_MODULE_1__["default"].methods.genInputSlot.call(this);
            var prepend = this.genPrependInnerSlot();
            prepend && input.children.unshift(prepend);
            return input;
        },
        genClearIcon: function genClearIcon() {
            if (!this.clearable) return null;
            var icon = !this.isDirty ? false : 'clear';
            if (this.clearIconCb) Object(_util_console__WEBPACK_IMPORTED_MODULE_8__["deprecate"])(':clear-icon-cb', '@click:clear', this);
            return this.genSlot('append', 'inner', [this.genIcon(icon, !this.$listeners['click:clear'] && this.clearIconCb || this.clearableCallback, false)]);
        },
        genCounter: function genCounter() {
            if (this.counter === false || this.counter == null) return null;
            var max = this.counter === true ? this.$attrs.maxlength : this.counter;
            return this.$createElement(_VCounter__WEBPACK_IMPORTED_MODULE_2__["default"], {
                props: {
                    dark: this.dark,
                    light: this.light,
                    max: max,
                    value: this.counterValue
                }
            });
        },
        genDefaultSlot: function genDefaultSlot() {
            return [this.genTextFieldSlot(), this.genClearIcon(), this.genIconSlot(), this.genProgress()];
        },
        genLabel: function genLabel() {
            if (!this.showLabel) return null;
            var data = {
                props: {
                    absolute: true,
                    color: this.validationState,
                    dark: this.dark,
                    disabled: this.disabled,
                    focused: !this.isSingle && (this.isFocused || !!this.validationState),
                    left: this.labelPosition.left,
                    light: this.light,
                    right: this.labelPosition.right,
                    value: this.labelValue
                }
            };
            if (this.$attrs.id) data.props.for = this.$attrs.id;
            return this.$createElement(_VLabel__WEBPACK_IMPORTED_MODULE_3__["default"], data, this.$slots.label || this.label);
        },
        genInput: function genInput() {
            var listeners = Object.assign({}, this.$listeners);
            delete listeners['change']; // Change should not be bound externally
            var data = {
                style: {},
                domProps: {
                    value: this.maskText(this.lazyValue)
                },
                attrs: __assign({ 'aria-label': (!this.$attrs || !this.$attrs.id) && this.label }, this.$attrs, { autofocus: this.autofocus, disabled: this.disabled, readonly: this.readonly, type: this.type }),
                on: Object.assign(listeners, {
                    blur: this.onBlur,
                    input: this.onInput,
                    focus: this.onFocus,
                    keydown: this.onKeyDown
                }),
                ref: 'input'
            };
            if (this.placeholder) data.attrs.placeholder = this.placeholder;
            if (this.mask) data.attrs.maxlength = this.masked.length;
            if (this.browserAutocomplete) data.attrs.autocomplete = this.browserAutocomplete;
            return this.$createElement('input', data);
        },
        genMessages: function genMessages() {
            if (this.hideDetails) return null;
            return this.$createElement('div', {
                staticClass: 'v-text-field__details'
            }, [_VInput__WEBPACK_IMPORTED_MODULE_1__["default"].methods.genMessages.call(this), this.genCounter()]);
        },
        genTextFieldSlot: function genTextFieldSlot() {
            return this.$createElement('div', {
                staticClass: 'v-text-field__slot'
            }, [this.genLabel(), this.prefix ? this.genAffix('prefix') : null, this.genInput(), this.suffix ? this.genAffix('suffix') : null]);
        },
        genAffix: function genAffix(type) {
            return this.$createElement('div', {
                'class': "v-text-field__" + type,
                ref: type
            }, this[type]);
        },
        onBlur: function onBlur(e) {
            this.isFocused = false;
            // Reset internalChange state
            // to allow external change
            // to persist
            this.internalChange = false;
            this.$emit('blur', e);
        },
        onClick: function onClick() {
            if (this.isFocused || this.disabled) return;
            this.$refs.input.focus();
        },
        onFocus: function onFocus(e) {
            if (!this.$refs.input) return;
            if (document.activeElement !== this.$refs.input) {
                return this.$refs.input.focus();
            }
            if (!this.isFocused) {
                this.isFocused = true;
                this.$emit('focus', e);
            }
        },
        onInput: function onInput(e) {
            this.internalChange = true;
            this.mask && this.resetSelections(e.target);
            this.internalValue = e.target.value;
            this.badInput = e.target.validity && e.target.validity.badInput;
        },
        onKeyDown: function onKeyDown(e) {
            this.internalChange = true;
            if (e.keyCode === _util_helpers__WEBPACK_IMPORTED_MODULE_7__["keyCodes"].enter) this.$emit('change', this.internalValue);
            this.$emit('keydown', e);
        },
        onMouseDown: function onMouseDown(e) {
            // Prevent input from being blurred
            if (e.target !== this.$refs.input) {
                e.preventDefault();
                e.stopPropagation();
            }
            _VInput__WEBPACK_IMPORTED_MODULE_1__["default"].methods.onMouseDown.call(this, e);
        },
        onMouseUp: function onMouseUp(e) {
            if (this.hasMouseDown) this.focus();
            _VInput__WEBPACK_IMPORTED_MODULE_1__["default"].methods.onMouseUp.call(this, e);
        }
    }
});

/***/ }),

/***/ "./src/components/VTextField/index.js":
/*!********************************************!*\
  !*** ./src/components/VTextField/index.js ***!
  \********************************************/
/*! exports provided: VTextField, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VTextField", function() { return wrapper; });
/* harmony import */ var _VTextField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTextField */ "./src/components/VTextField/VTextField.js");
/* harmony import */ var _VTextarea_VTextarea__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VTextarea/VTextarea */ "./src/components/VTextarea/VTextarea.js");
/* harmony import */ var _util_rebuildFunctionalSlots__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/rebuildFunctionalSlots */ "./src/util/rebuildFunctionalSlots.js");
/* harmony import */ var _util_dedupeModelListeners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/dedupeModelListeners */ "./src/util/dedupeModelListeners.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");





// TODO: remove this in v2.0
/* @vue/component */
var wrapper = {
    functional: true,
    $_wrapperFor: _VTextField__WEBPACK_IMPORTED_MODULE_0__["default"],
    props: {
        textarea: Boolean,
        multiLine: Boolean
    },
    render: function render(h, _a) {
        var props = _a.props,
            data = _a.data,
            slots = _a.slots,
            parent = _a.parent;
        Object(_util_dedupeModelListeners__WEBPACK_IMPORTED_MODULE_3__["default"])(data);
        var children = Object(_util_rebuildFunctionalSlots__WEBPACK_IMPORTED_MODULE_2__["default"])(slots(), h);
        if (props.textarea) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_4__["deprecate"])('<v-text-field textarea>', '<v-textarea outline>', wrapper, parent);
        }
        if (props.multiLine) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_4__["deprecate"])('<v-text-field multi-line>', '<v-textarea>', wrapper, parent);
        }
        if (props.textarea || props.multiLine) {
            data.attrs.outline = props.textarea;
            return h(_VTextarea_VTextarea__WEBPACK_IMPORTED_MODULE_1__["default"], data, children);
        } else {
            return h(_VTextField__WEBPACK_IMPORTED_MODULE_0__["default"], data, children);
        }
    }
};

/* harmony default export */ __webpack_exports__["default"] = (wrapper);

/***/ }),

/***/ "./src/components/VTextarea/VTextarea.js":
/*!***********************************************!*\
  !*** ./src/components/VTextarea/VTextarea.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_textarea_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_textarea.styl */ "./src/stylus/components/_textarea.styl");
/* harmony import */ var _stylus_components_textarea_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_textarea_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VTextField/VTextField */ "./src/components/VTextField/VTextField.js");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Extensions


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-textarea',
    extends: _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__["default"],
    props: {
        autoGrow: Boolean,
        noResize: Boolean,
        outline: Boolean,
        rowHeight: {
            type: [Number, String],
            default: 24,
            validator: function validator(v) {
                return !isNaN(parseFloat(v));
            }
        },
        rows: {
            type: [Number, String],
            default: 5,
            validator: function validator(v) {
                return !isNaN(parseInt(v, 10));
            }
        }
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-textarea': true, 'v-textarea--auto-grow': this.autoGrow, 'v-textarea--no-resize': this.noResizeHandle }, _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__["default"].computed.classes.call(this, null));
        },
        dynamicHeight: function dynamicHeight() {
            return this.autoGrow ? this.inputHeight : 'auto';
        },
        isEnclosed: function isEnclosed() {
            return this.textarea || _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__["default"].computed.isEnclosed.call(this);
        },
        noResizeHandle: function noResizeHandle() {
            return this.noResize || this.autoGrow;
        }
    },
    watch: {
        lazyValue: function lazyValue() {
            !this.internalChange && this.autoGrow && this.$nextTick(this.calculateInputHeight);
        }
    },
    mounted: function mounted() {
        var _this = this;
        setTimeout(function () {
            _this.autoGrow && _this.calculateInputHeight();
        }, 0);
        // TODO: remove (2.0)
        if (this.autoGrow && this.noResize) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_2__["consoleInfo"])('"no-resize" is now implied when using "auto-grow", and can be removed', this);
        }
    },
    methods: {
        calculateInputHeight: function calculateInputHeight() {
            var input = this.$refs.input;
            if (input) {
                input.style.height = 0;
                var height = input.scrollHeight;
                var minHeight = parseInt(this.rows, 10) * parseFloat(this.rowHeight);
                // This has to be done ASAP, waiting for Vue
                // to update the DOM causes ugly layout jumping
                input.style.height = Math.max(minHeight, height) + 'px';
            }
        },
        genInput: function genInput() {
            var input = _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__["default"].methods.genInput.call(this);
            input.tag = 'textarea';
            delete input.data.attrs.type;
            input.data.attrs.rows = this.rows;
            return input;
        },
        onInput: function onInput(e) {
            _VTextField_VTextField__WEBPACK_IMPORTED_MODULE_1__["default"].methods.onInput.call(this, e);
            this.autoGrow && this.calculateInputHeight();
        },
        onKeyDown: function onKeyDown(e) {
            // Prevents closing of a
            // dialog when pressing
            // enter
            if (this.isFocused && e.keyCode === 13) {
                e.stopPropagation();
            }
            this.internalChange = true;
            this.$emit('keydown', e);
        }
    }
});

/***/ }),

/***/ "./src/components/VTextarea/index.js":
/*!*******************************************!*\
  !*** ./src/components/VTextarea/index.js ***!
  \*******************************************/
/*! exports provided: VTextarea, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VTextarea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTextarea */ "./src/components/VTextarea/VTextarea.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTextarea", function() { return _VTextarea__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VTextarea__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VTimePicker/VTimePicker.js":
/*!***************************************************!*\
  !*** ./src/components/VTimePicker/VTimePicker.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VTimePickerTitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTimePickerTitle */ "./src/components/VTimePicker/VTimePickerTitle.js");
/* harmony import */ var _VTimePickerClock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VTimePickerClock */ "./src/components/VTimePicker/VTimePickerClock.js");
/* harmony import */ var _mixins_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/picker */ "./src/mixins/picker.js");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _VDatePicker_util_pad__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../VDatePicker/util/pad */ "./src/components/VDatePicker/util/pad.js");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
// Components


// Mixins

// Utils


var rangeHours24 = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__["createRange"])(24);
var rangeHours12am = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__["createRange"])(12);
var rangeHours12pm = rangeHours12am.map(function (v) {
    return v + 12;
});
var rangeMinutes = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__["createRange"])(60);
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-time-picker',
    mixins: [_mixins_picker__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        allowedHours: Function,
        allowedMinutes: Function,
        format: {
            type: String,
            default: 'ampm',
            validator: function validator(val) {
                return ['ampm', '24hr'].includes(val);
            }
        },
        min: String,
        max: String,
        readonly: Boolean,
        scrollable: Boolean,
        value: null
    },
    data: function data() {
        return {
            inputHour: null,
            inputMinute: null,
            period: 'am',
            selectingHour: true
        };
    },
    computed: {
        isAllowedHourCb: function isAllowedHourCb() {
            var _this = this;
            if (!this.min && !this.max) return this.allowedHours;
            var minHour = this.min ? this.min.split(':')[0] : 0;
            var maxHour = this.max ? this.max.split(':')[0] : 23;
            return function (val) {
                return val >= minHour * 1 && val <= maxHour * 1 && (!_this.allowedHours || _this.allowedHours(val));
            };
        },
        isAllowedMinuteCb: function isAllowedMinuteCb() {
            var _this = this;
            var isHourAllowed = !this.allowedHours || this.allowedHours(this.inputHour);
            if (!this.min && !this.max) {
                return isHourAllowed ? this.allowedMinutes : function () {
                    return false;
                };
            }
            var _a = __read(this.min ? this.min.split(':') : [0, 0], 2),
                minHour = _a[0],
                minMinute = _a[1];
            var _b = __read(this.max ? this.max.split(':') : [23, 59], 2),
                maxHour = _b[0],
                maxMinute = _b[1];
            var minTime = minHour * 60 + minMinute * 1;
            var maxTime = maxHour * 60 + maxMinute * 1;
            return function (val) {
                var time = 60 * _this.inputHour + val;
                return time >= minTime && time <= maxTime && isHourAllowed && (!_this.allowedMinutes || _this.allowedMinutes(val));
            };
        },
        isAmPm: function isAmPm() {
            return this.format === 'ampm';
        }
    },
    watch: {
        value: 'setInputData'
    },
    mounted: function mounted() {
        this.setInputData(this.value);
    },
    methods: {
        emitValue: function emitValue() {
            if (this.inputHour != null && this.inputMinute != null) {
                this.$emit('input', Object(_VDatePicker_util_pad__WEBPACK_IMPORTED_MODULE_4__["default"])(this.inputHour) + ":" + Object(_VDatePicker_util_pad__WEBPACK_IMPORTED_MODULE_4__["default"])(this.inputMinute));
            }
        },
        setPeriod: function setPeriod(period) {
            this.period = period;
            if (this.inputHour != null) {
                var newHour = this.inputHour + (period === 'am' ? -12 : 12);
                this.inputHour = this.firstAllowed('hour', newHour);
                this.emitValue();
            }
        },
        setInputData: function setInputData(value) {
            if (value == null || value === '') {
                this.inputHour = null;
                this.inputMinute = null;
                return;
            }
            if (value instanceof Date) {
                this.inputHour = value.getHours();
                this.inputMinute = value.getMinutes();
            } else {
                var _a = __read(value.trim().toLowerCase().match(/^(\d+):(\d+)(:\d+)?([ap]m)?$/, '') || [], 5),
                    hour = _a[1],
                    minute = _a[2],
                    period = _a[4];
                this.inputHour = period ? this.convert12to24(parseInt(hour, 10), period) : parseInt(hour, 10);
                this.inputMinute = parseInt(minute, 10);
            }
            this.period = this.inputHour < 12 ? 'am' : 'pm';
        },
        convert24to12: function convert24to12(hour) {
            return hour ? (hour - 1) % 12 + 1 : 12;
        },
        convert12to24: function convert12to24(hour, period) {
            return hour % 12 + (period === 'pm' ? 12 : 0);
        },
        onInput: function onInput(value) {
            if (this.selectingHour) {
                this.inputHour = this.isAmPm ? this.convert12to24(value, this.period) : value;
            } else {
                this.inputMinute = value;
            }
            this.emitValue();
        },
        onChange: function onChange() {
            if (!this.selectingHour) {
                this.$emit('change', this.value);
            } else {
                this.selectingHour = false;
            }
        },
        firstAllowed: function firstAllowed(type, value) {
            var allowedFn = type === 'hour' ? this.isAllowedHourCb : this.isAllowedMinuteCb;
            if (!allowedFn) return value;
            // TODO: clean up
            var range = type === 'minute' ? rangeMinutes : this.isAmPm ? value < 12 ? rangeHours12am : rangeHours12pm : rangeHours24;
            var first = range.find(function (v) {
                return allowedFn((v + value) % range.length + range[0]);
            });
            return ((first || 0) + value) % range.length + range[0];
        },
        genClock: function genClock() {
            return this.$createElement(_VTimePickerClock__WEBPACK_IMPORTED_MODULE_1__["default"], {
                props: {
                    allowedValues: this.selectingHour ? this.isAllowedHourCb : this.isAllowedMinuteCb,
                    color: this.color,
                    dark: this.dark,
                    double: this.selectingHour && !this.isAmPm,
                    format: this.selectingHour ? this.isAmPm ? this.convert24to12 : function (val) {
                        return val;
                    } : function (val) {
                        return Object(_VDatePicker_util_pad__WEBPACK_IMPORTED_MODULE_4__["default"])(val, 2);
                    },
                    light: this.light,
                    max: this.selectingHour ? this.isAmPm && this.period === 'am' ? 11 : 23 : 59,
                    min: this.selectingHour && this.isAmPm && this.period === 'pm' ? 12 : 0,
                    readonly: this.readonly,
                    scrollable: this.scrollable,
                    size: this.width - (!this.fullWidth && this.landscape ? 80 : 20),
                    step: this.selectingHour ? 1 : 5,
                    value: this.selectingHour ? this.inputHour : this.inputMinute
                },
                on: {
                    input: this.onInput,
                    change: this.onChange
                },
                ref: 'clock'
            });
        },
        genPickerBody: function genPickerBody() {
            return this.$createElement('div', {
                staticClass: 'v-time-picker-clock__container',
                key: this.selectingHour
            }, [this.genClock()]);
        },
        genPickerTitle: function genPickerTitle() {
            var _this = this;
            return this.$createElement(_VTimePickerTitle__WEBPACK_IMPORTED_MODULE_0__["default"], {
                props: {
                    ampm: this.isAmPm,
                    hour: this.inputHour,
                    minute: this.inputMinute,
                    period: this.period,
                    readonly: this.readonly,
                    selectingHour: this.selectingHour
                },
                on: {
                    'update:selectingHour': function updateSelectingHour(value) {
                        return _this.selectingHour = value;
                    },
                    'update:period': this.setPeriod
                },
                ref: 'title',
                slot: 'title'
            });
        }
    },
    render: function render() {
        return this.genPicker('v-picker--time');
    }
});

/***/ }),

/***/ "./src/components/VTimePicker/VTimePickerClock.js":
/*!********************************************************!*\
  !*** ./src/components/VTimePicker/VTimePickerClock.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_time_picker_clock_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_time-picker-clock.styl */ "./src/stylus/components/_time-picker-clock.styl");
/* harmony import */ var _stylus_components_time_picker_clock_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_time_picker_clock_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// Mixins


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-time-picker-clock',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        allowedValues: Function,
        double: Boolean,
        format: {
            type: Function,
            default: function _default(val) {
                return val;
            }
        },
        max: {
            type: Number,
            required: true
        },
        min: {
            type: Number,
            required: true
        },
        scrollable: Boolean,
        readonly: Boolean,
        rotate: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        },
        value: Number
    },
    data: function data() {
        return {
            inputValue: this.value,
            isDragging: false,
            valueOnMouseDown: null,
            valueOnMouseUp: null
        };
    },
    computed: {
        count: function count() {
            return this.max - this.min + 1;
        },
        degreesPerUnit: function degreesPerUnit() {
            return 360 / this.roundCount;
        },
        degrees: function degrees() {
            return this.degreesPerUnit * Math.PI / 180;
        },
        displayedValue: function displayedValue() {
            return this.value == null ? this.min : this.value;
        },
        innerRadius: function innerRadius() {
            return 0.62;
        },
        roundCount: function roundCount() {
            return this.double ? this.count / 2 : this.count;
        }
    },
    watch: {
        value: function value(_value) {
            this.inputValue = _value;
        }
    },
    methods: {
        wheel: function wheel(e) {
            e.preventDefault();
            var delta = Math.sign(e.wheelDelta || 1);
            var value = this.displayedValue;
            do {
                value = value + delta;
                value = (value - this.min + this.count) % this.count + this.min;
            } while (!this.isAllowed(value) && value !== this.displayedValue);
            if (value !== this.displayedValue) {
                this.update(value);
            }
        },
        isInner: function isInner(value) {
            return this.double && value - this.min >= this.roundCount;
        },
        handScale: function handScale(value) {
            return this.isInner(value) ? this.innerRadius : 1;
        },
        isAllowed: function isAllowed(value) {
            return !this.allowedValues || this.allowedValues(value);
        },
        genValues: function genValues() {
            var children = [];
            for (var value = this.min; value <= this.max; value = value + this.step) {
                var color = value === this.value && (this.color || 'accent');
                children.push(this.$createElement('span', this.setBackgroundColor(color, {
                    staticClass: 'v-time-picker-clock__item',
                    'class': {
                        'v-time-picker-clock__item--active': value === this.displayedValue,
                        'v-time-picker-clock__item--disabled': !this.isAllowed(value)
                    },
                    style: this.getTransform(value),
                    domProps: { innerHTML: "<span>" + this.format(value) + "</span>" }
                })));
            }
            return children;
        },
        genHand: function genHand() {
            var scale = "scaleY(" + this.handScale(this.displayedValue) + ")";
            var angle = this.rotate + this.degreesPerUnit * (this.displayedValue - this.min);
            var color = this.value != null && (this.color || 'accent');
            return this.$createElement('div', this.setBackgroundColor(color, {
                staticClass: 'v-time-picker-clock__hand',
                'class': {
                    'v-time-picker-clock__hand--inner': this.isInner(this.value)
                },
                style: {
                    transform: "rotate(" + angle + "deg) " + scale
                }
            }));
        },
        getTransform: function getTransform(i) {
            var _a = this.getPosition(i),
                x = _a.x,
                y = _a.y;
            return {
                left: 50 + x * 50 + "%",
                top: 50 + y * 50 + "%"
            };
        },
        getPosition: function getPosition(value) {
            var rotateRadians = this.rotate * Math.PI / 180;
            return {
                x: Math.sin((value - this.min) * this.degrees + rotateRadians) * this.handScale(value),
                y: -Math.cos((value - this.min) * this.degrees + rotateRadians) * this.handScale(value)
            };
        },
        onMouseDown: function onMouseDown(e) {
            e.preventDefault();
            this.valueOnMouseDown = null;
            this.valueOnMouseUp = null;
            this.isDragging = true;
            this.onDragMove(e);
        },
        onMouseUp: function onMouseUp() {
            this.isDragging = false;
            if (this.valueOnMouseUp !== null && this.isAllowed(this.valueOnMouseUp)) {
                this.$emit('change', this.valueOnMouseUp);
            }
        },
        onDragMove: function onDragMove(e) {
            e.preventDefault();
            if (!this.isDragging && e.type !== 'click') return;
            var _a = this.$refs.clock.getBoundingClientRect(),
                width = _a.width,
                top = _a.top,
                left = _a.left;
            var _b = 'touches' in e ? e.touches[0] : e,
                clientX = _b.clientX,
                clientY = _b.clientY;
            var center = { x: width / 2, y: -width / 2 };
            var coords = { x: clientX - left, y: top - clientY };
            var handAngle = Math.round(this.angle(center, coords) - this.rotate + 360) % 360;
            // (1 + this.innerRadius) / 4 = radius of the circle equally distant from inner and outer circles
            var insideClick = this.double && this.euclidean(center, coords) / width < (1 + this.innerRadius) / 4;
            var value = Math.round(handAngle / this.degreesPerUnit) + this.min + (insideClick ? this.roundCount : 0);
            // Necessary to fix edge case when selecting left part of the value(s) at 12 o'clock
            var newValue;
            if (handAngle >= 360 - this.degreesPerUnit / 2) {
                newValue = insideClick ? this.max - this.roundCount + 1 : this.min;
            } else {
                newValue = value;
            }
            if (this.isAllowed(value)) {
                if (this.valueOnMouseDown === null) {
                    this.valueOnMouseDown = newValue;
                }
                this.valueOnMouseUp = newValue;
                this.update(newValue);
            }
        },
        update: function update(value) {
            if (this.inputValue !== value) {
                this.inputValue = value;
                this.$emit('input', value);
            }
        },
        euclidean: function euclidean(p0, p1) {
            var dx = p1.x - p0.x;
            var dy = p1.y - p0.y;
            return Math.sqrt(dx * dx + dy * dy);
        },
        angle: function angle(center, p1) {
            var value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
            return Math.abs(value * 180 / Math.PI);
        }
    },
    render: function render(h) {
        var _this = this;
        var data = {
            staticClass: 'v-time-picker-clock',
            class: __assign({ 'v-time-picker-clock--indeterminate': this.value == null }, this.themeClasses),
            on: this.readonly ? undefined : {
                mousedown: this.onMouseDown,
                mouseup: this.onMouseUp,
                mouseleave: function mouseleave() {
                    return _this.isDragging && _this.onMouseUp();
                },
                touchstart: this.onMouseDown,
                touchend: this.onMouseUp,
                mousemove: this.onDragMove,
                touchmove: this.onDragMove
            },
            ref: 'clock'
        };
        !this.readonly && this.scrollable && (data.on.wheel = this.wheel);
        return h('div', data, [h('div', {
            staticClass: 'v-time-picker-clock__inner'
        }, [this.genHand(), this.genValues()])]);
    }
});

/***/ }),

/***/ "./src/components/VTimePicker/VTimePickerTitle.js":
/*!********************************************************!*\
  !*** ./src/components/VTimePicker/VTimePickerTitle.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_time_picker_title_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_time-picker-title.styl */ "./src/stylus/components/_time-picker-title.styl");
/* harmony import */ var _stylus_components_time_picker_title_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_time_picker_title_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_picker_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/picker-button */ "./src/mixins/picker-button.js");
/* harmony import */ var _VDatePicker_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../VDatePicker/util */ "./src/components/VDatePicker/util/index.js");

// Mixins

// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-time-picker-title',
    mixins: [_mixins_picker_button__WEBPACK_IMPORTED_MODULE_1__["default"]],
    props: {
        ampm: Boolean,
        hour: Number,
        minute: Number,
        period: {
            type: String,
            validator: function validator(period) {
                return period === 'am' || period === 'pm';
            }
        },
        readonly: Boolean,
        selectingHour: Boolean
    },
    methods: {
        genTime: function genTime() {
            var hour = this.hour;
            if (this.ampm) {
                hour = hour ? (hour - 1) % 12 + 1 : 12;
            }
            var displayedHour = this.hour == null ? '--' : this.ampm ? hour : Object(_VDatePicker_util__WEBPACK_IMPORTED_MODULE_2__["pad"])(hour);
            var displayedMinute = this.minute == null ? '--' : Object(_VDatePicker_util__WEBPACK_IMPORTED_MODULE_2__["pad"])(this.minute);
            return this.$createElement('div', {
                'class': 'v-time-picker-title__time'
            }, [this.genPickerButton('selectingHour', true, displayedHour), this.$createElement('span', ':'), this.genPickerButton('selectingHour', false, displayedMinute)]);
        },
        genAmPm: function genAmPm() {
            return this.$createElement('div', {
                staticClass: 'v-time-picker-title__ampm'
            }, [this.genPickerButton('period', 'am', 'am', this.readonly), this.genPickerButton('period', 'pm', 'pm', this.readonly)]);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-time-picker-title'
        }, [this.genTime(), this.ampm ? this.genAmPm() : null]);
    }
});

/***/ }),

/***/ "./src/components/VTimePicker/index.js":
/*!*********************************************!*\
  !*** ./src/components/VTimePicker/index.js ***!
  \*********************************************/
/*! exports provided: VTimePicker, VTimePickerClock, VTimePickerTitle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VTimePicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTimePicker */ "./src/components/VTimePicker/VTimePicker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimePicker", function() { return _VTimePicker__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VTimePickerClock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VTimePickerClock */ "./src/components/VTimePicker/VTimePickerClock.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimePickerClock", function() { return _VTimePickerClock__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _VTimePickerTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VTimePickerTitle */ "./src/components/VTimePicker/VTimePickerTitle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimePickerTitle", function() { return _VTimePickerTitle__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VTimePicker: _VTimePicker__WEBPACK_IMPORTED_MODULE_0__["default"],
        VTimePickerClock: _VTimePickerClock__WEBPACK_IMPORTED_MODULE_1__["default"],
        VTimePickerTitle: _VTimePickerTitle__WEBPACK_IMPORTED_MODULE_2__["default"]
    }
});

/***/ }),

/***/ "./src/components/VTimeline/VTimeline.ts":
/*!***********************************************!*\
  !*** ./src/components/VTimeline/VTimeline.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_timeline_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_timeline.styl */ "./src/stylus/components/_timeline.styl");
/* harmony import */ var _stylus_components_timeline_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_timeline_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles


// Mixins

/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_1__["default"])(_mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]
/* @vue/component */
).extend({
    name: 'v-timeline',
    props: {
        alignTop: Boolean,
        dense: Boolean
    },
    computed: {
        classes: function classes() {
            return __assign({ 'v-timeline--align-top': this.alignTop, 'v-timeline--dense': this.dense }, this.themeClasses);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-timeline',
            'class': this.classes
        }, this.$slots.default);
    }
}));

/***/ }),

/***/ "./src/components/VTimeline/VTimelineItem.ts":
/*!***************************************************!*\
  !*** ./src/components/VTimeline/VTimelineItem.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Types

// Components

// Mixins


/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_0__["default"])(_mixins_colorable__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]
/* @vue/component */
).extend({
    name: 'v-timeline-item',
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        fillDot: Boolean,
        hideDot: Boolean,
        icon: String,
        iconColor: String,
        large: Boolean,
        left: Boolean,
        right: Boolean,
        small: Boolean
    },
    computed: {
        hasIcon: function hasIcon() {
            return !!this.icon || !!this.$slots.icon;
        }
    },
    methods: {
        genBody: function genBody() {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__body'
            }, this.$slots.default);
        },
        genIcon: function genIcon() {
            if (this.$slots.icon) {
                return this.$slots.icon;
            }
            return this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {
                props: {
                    color: this.iconColor,
                    dark: !this.theme.isDark,
                    small: this.small
                }
            }, this.icon);
        },
        genInnerDot: function genInnerDot() {
            var children = [];
            this.hasIcon && children.push(this.genIcon());
            var data = this.setBackgroundColor(this.color);
            return this.$createElement('div', __assign({ staticClass: 'v-timeline-item__inner-dot' }, data), children);
        },
        genDot: function genDot() {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__dot',
                class: {
                    'v-timeline-item__dot--small': this.small,
                    'v-timeline-item__dot--large': this.large
                }
            }, [this.genInnerDot()]);
        },
        genOpposite: function genOpposite() {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__opposite'
            }, [this.$slots.opposite]);
        }
    },
    render: function render(h) {
        var children = [this.genBody()];
        if (!this.hideDot) children.unshift(this.genDot());
        if (this.$slots.opposite) children.push(this.genOpposite());
        return h('div', {
            staticClass: 'v-timeline-item',
            class: __assign({ 'v-timeline-item--fill-dot': this.fillDot, 'v-timeline-item--left': this.left, 'v-timeline-item--right': this.right }, this.themeClasses)
        }, children);
    }
}));

/***/ }),

/***/ "./src/components/VTimeline/index.ts":
/*!*******************************************!*\
  !*** ./src/components/VTimeline/index.ts ***!
  \*******************************************/
/*! exports provided: VTimeline, VTimelineItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VTimeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTimeline */ "./src/components/VTimeline/VTimeline.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimeline", function() { return _VTimeline__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VTimelineItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VTimelineItem */ "./src/components/VTimeline/VTimelineItem.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimelineItem", function() { return _VTimelineItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VTimeline: _VTimeline__WEBPACK_IMPORTED_MODULE_0__["default"],
        VTimelineItem: _VTimelineItem__WEBPACK_IMPORTED_MODULE_1__["default"]
    }
});

/***/ }),

/***/ "./src/components/VToolbar/VToolbar.js":
/*!*********************************************!*\
  !*** ./src/components/VToolbar/VToolbar.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_toolbar_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_toolbar.styl */ "./src/stylus/components/_toolbar.styl");
/* harmony import */ var _stylus_components_toolbar_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_toolbar_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/applicationable */ "./src/mixins/applicationable.ts");
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_ssr_bootable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/ssr-bootable */ "./src/mixins/ssr-bootable.ts");
/* harmony import */ var _directives_scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../directives/scroll */ "./src/directives/scroll.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles

// Mixins




// Directives


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-toolbar',
    directives: { Scroll: _directives_scroll__WEBPACK_IMPORTED_MODULE_5__["default"] },
    mixins: [Object(_mixins_applicationable__WEBPACK_IMPORTED_MODULE_1__["default"])('top', ['clippedLeft', 'clippedRight', 'computedHeight', 'invertedScroll', 'manualScroll']), _mixins_colorable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_ssr_bootable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_themeable__WEBPACK_IMPORTED_MODULE_3__["default"]],
    props: {
        card: Boolean,
        clippedLeft: Boolean,
        clippedRight: Boolean,
        dense: Boolean,
        extended: Boolean,
        extensionHeight: {
            type: [Number, String],
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
        },
        flat: Boolean,
        floating: Boolean,
        height: {
            type: [Number, String],
            validator: function validator(v) {
                return !isNaN(parseInt(v));
            }
        },
        invertedScroll: Boolean,
        manualScroll: Boolean,
        prominent: Boolean,
        scrollOffScreen: Boolean,
        /* @deprecated */
        scrollToolbarOffScreen: Boolean,
        scrollTarget: String,
        scrollThreshold: {
            type: Number,
            default: 300
        },
        tabs: Boolean
    },
    data: function data() {
        return {
            activeTimeout: null,
            currentScroll: 0,
            heights: {
                mobileLandscape: 48,
                mobile: 56,
                desktop: 64,
                dense: 48
            },
            isActive: true,
            isExtended: false,
            isScrollingUp: false,
            previousScroll: null,
            previousScrollDirection: null,
            savedScroll: 0,
            target: null
        };
    },
    computed: {
        canScroll: function canScroll() {
            // TODO: remove
            if (this.scrollToolbarOffScreen) {
                Object(_util_console__WEBPACK_IMPORTED_MODULE_6__["deprecate"])('scrollToolbarOffScreen', 'scrollOffScreen', this);
                return true;
            }
            return this.scrollOffScreen || this.invertedScroll;
        },
        computedContentHeight: function computedContentHeight() {
            if (this.height) return parseInt(this.height);
            if (this.dense) return this.heights.dense;
            if (this.prominent || this.$vuetify.breakpoint.mdAndUp) return this.heights.desktop;
            if (this.$vuetify.breakpoint.smAndDown && this.$vuetify.breakpoint.width > this.$vuetify.breakpoint.height) return this.heights.mobileLandscape;
            return this.heights.mobile;
        },
        computedExtensionHeight: function computedExtensionHeight() {
            if (this.tabs) return 48;
            if (this.extensionHeight) return parseInt(this.extensionHeight);
            return this.computedContentHeight;
        },
        computedHeight: function computedHeight() {
            if (!this.isExtended) return this.computedContentHeight;
            return this.computedContentHeight + this.computedExtensionHeight;
        },
        computedMarginTop: function computedMarginTop() {
            if (!this.app) return 0;
            return this.$vuetify.application.bar;
        },
        classes: function classes() {
            return __assign({ 'v-toolbar': true, 'elevation-0': this.flat || !this.isActive && !this.tabs && this.canScroll, 'v-toolbar--absolute': this.absolute, 'v-toolbar--card': this.card, 'v-toolbar--clipped': this.clippedLeft || this.clippedRight, 'v-toolbar--dense': this.dense, 'v-toolbar--extended': this.isExtended, 'v-toolbar--fixed': !this.absolute && (this.app || this.fixed), 'v-toolbar--floating': this.floating, 'v-toolbar--prominent': this.prominent }, this.themeClasses);
        },
        computedPaddingLeft: function computedPaddingLeft() {
            if (!this.app || this.clippedLeft) return 0;
            return this.$vuetify.application.left;
        },
        computedPaddingRight: function computedPaddingRight() {
            if (!this.app || this.clippedRight) return 0;
            return this.$vuetify.application.right;
        },
        computedTransform: function computedTransform() {
            return !this.isActive ? this.canScroll ? -this.computedContentHeight : -this.computedHeight : 0;
        },
        currentThreshold: function currentThreshold() {
            return Math.abs(this.currentScroll - this.savedScroll);
        },
        styles: function styles() {
            return {
                marginTop: this.computedMarginTop + "px",
                paddingRight: this.computedPaddingRight + "px",
                paddingLeft: this.computedPaddingLeft + "px",
                transform: "translateY(" + this.computedTransform + "px)"
            };
        }
    },
    watch: {
        currentThreshold: function currentThreshold(val) {
            if (this.invertedScroll) {
                return this.isActive = this.currentScroll > this.scrollThreshold;
            }
            if (val < this.scrollThreshold || !this.isBooted) return;
            this.isActive = this.isScrollingUp;
            this.savedScroll = this.currentScroll;
        },
        isActive: function isActive() {
            this.savedScroll = 0;
        },
        invertedScroll: function invertedScroll(val) {
            this.isActive = !val;
        },
        manualScroll: function manualScroll(val) {
            this.isActive = !val;
        },
        isScrollingUp: function isScrollingUp() {
            this.savedScroll = this.savedScroll || this.currentScroll;
        }
    },
    created: function created() {
        if (this.invertedScroll || this.manualScroll) this.isActive = false;
    },
    mounted: function mounted() {
        if (this.scrollTarget) {
            this.target = document.querySelector(this.scrollTarget);
        }
    },
    methods: {
        onScroll: function onScroll() {
            if (!this.canScroll || this.manualScroll || typeof window === 'undefined') return;
            var target = this.target || window;
            this.currentScroll = this.scrollTarget ? target.scrollTop : target.pageYOffset || document.documentElement.scrollTop;
            this.isScrollingUp = this.currentScroll < this.previousScroll;
            this.previousScroll = this.currentScroll;
        },
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication: function updateApplication() {
            return this.invertedScroll || this.manualScroll ? 0 : this.computedHeight;
        }
    },
    render: function render(h) {
        this.isExtended = this.extended || !!this.$slots.extension;
        var children = [];
        var data = this.setBackgroundColor(this.color, {
            'class': this.classes,
            style: this.styles,
            on: this.$listeners
        });
        data.directives = [{
            arg: this.scrollTarget,
            name: 'scroll',
            value: this.onScroll
        }];
        children.push(h('div', {
            staticClass: 'v-toolbar__content',
            style: { height: this.computedContentHeight + "px" },
            ref: 'content'
        }, this.$slots.default));
        if (this.isExtended) {
            children.push(h('div', {
                staticClass: 'v-toolbar__extension',
                style: { height: this.computedExtensionHeight + "px" }
            }, this.$slots.extension));
        }
        return h('nav', data, children);
    }
});

/***/ }),

/***/ "./src/components/VToolbar/VToolbarSideIcon.js":
/*!*****************************************************!*\
  !*** ./src/components/VToolbar/VToolbarSideIcon.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_VBtn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/VBtn */ "./src/components/VBtn/index.ts");
/* harmony import */ var _components_VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/VIcon */ "./src/components/VIcon/index.ts");


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-toolbar-side-icon',
    functional: true,
    render: function render(h, _a) {
        var slots = _a.slots,
            listeners = _a.listeners,
            props = _a.props,
            data = _a.data;
        var classes = data.staticClass ? data.staticClass + " v-toolbar__side-icon" : 'v-toolbar__side-icon';
        var d = Object.assign(data, {
            staticClass: classes,
            props: Object.assign(props, {
                icon: true
            }),
            on: listeners
        });
        var defaultSlot = slots().default;
        return h(_components_VBtn__WEBPACK_IMPORTED_MODULE_0__["default"], d, defaultSlot || [h(_components_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], '$vuetify.icons.menu')]);
    }
});

/***/ }),

/***/ "./src/components/VToolbar/index.js":
/*!******************************************!*\
  !*** ./src/components/VToolbar/index.js ***!
  \******************************************/
/*! exports provided: VToolbar, VToolbarSideIcon, VToolbarTitle, VToolbarItems, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VToolbarTitle", function() { return VToolbarTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VToolbarItems", function() { return VToolbarItems; });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _VToolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VToolbar */ "./src/components/VToolbar/VToolbar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VToolbar", function() { return _VToolbar__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _VToolbarSideIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VToolbarSideIcon */ "./src/components/VToolbar/VToolbarSideIcon.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VToolbarSideIcon", function() { return _VToolbarSideIcon__WEBPACK_IMPORTED_MODULE_2__["default"]; });




var VToolbarTitle = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-toolbar__title');
var VToolbarItems = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleFunctional"])('v-toolbar__items');

/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VToolbar: _VToolbar__WEBPACK_IMPORTED_MODULE_1__["default"],
        VToolbarItems: VToolbarItems,
        VToolbarTitle: VToolbarTitle,
        VToolbarSideIcon: _VToolbarSideIcon__WEBPACK_IMPORTED_MODULE_2__["default"]
    }
});

/***/ }),

/***/ "./src/components/VTooltip/VTooltip.js":
/*!*********************************************!*\
  !*** ./src/components/VTooltip/VTooltip.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_tooltips_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_tooltips.styl */ "./src/stylus/components/_tooltips.styl");
/* harmony import */ var _stylus_components_tooltips_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_tooltips_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _mixins_delayable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/delayable */ "./src/mixins/delayable.ts");
/* harmony import */ var _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/dependent */ "./src/mixins/dependent.ts");
/* harmony import */ var _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/detachable */ "./src/mixins/detachable.js");
/* harmony import */ var _mixins_menuable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/menuable */ "./src/mixins/menuable.js");
/* harmony import */ var _mixins_toggleable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../mixins/toggleable */ "./src/mixins/toggleable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");

// Mixins






// Helpers

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-tooltip',
    mixins: [_mixins_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], _mixins_delayable__WEBPACK_IMPORTED_MODULE_2__["default"], _mixins_dependent__WEBPACK_IMPORTED_MODULE_3__["default"], _mixins_detachable__WEBPACK_IMPORTED_MODULE_4__["default"], _mixins_menuable__WEBPACK_IMPORTED_MODULE_5__["default"], _mixins_toggleable__WEBPACK_IMPORTED_MODULE_6__["default"]],
    props: {
        closeDelay: {
            type: [Number, String],
            default: 200
        },
        debounce: {
            type: [Number, String],
            default: 0
        },
        disabled: Boolean,
        fixed: {
            type: Boolean,
            default: true
        },
        openDelay: {
            type: [Number, String],
            default: 200
        },
        tag: {
            type: String,
            default: 'span'
        },
        transition: String,
        zIndex: {
            default: null
        }
    },
    data: function data() {
        return {
            calculatedMinWidth: 0,
            closeDependents: false
        };
    },
    computed: {
        calculatedLeft: function calculatedLeft() {
            var _a = this.dimensions,
                activator = _a.activator,
                content = _a.content;
            var unknown = !this.bottom && !this.left && !this.top && !this.right;
            var left = 0;
            if (this.top || this.bottom || unknown) {
                left = activator.left + activator.width / 2 - content.width / 2;
            } else if (this.left || this.right) {
                left = activator.left + (this.right ? activator.width : -content.width) + (this.right ? 10 : -10);
            }
            if (this.nudgeLeft) left -= parseInt(this.nudgeLeft);
            if (this.nudgeRight) left += parseInt(this.nudgeRight);
            return this.calcXOverflow(left) + "px";
        },
        calculatedTop: function calculatedTop() {
            var _a = this.dimensions,
                activator = _a.activator,
                content = _a.content;
            var top = 0;
            if (this.top || this.bottom) {
                top = activator.top + (this.bottom ? activator.height : -content.height) + (this.bottom ? 10 : -10);
            } else if (this.left || this.right) {
                top = activator.top + activator.height / 2 - content.height / 2;
            }
            if (this.nudgeTop) top -= parseInt(this.nudgeTop);
            if (this.nudgeBottom) top += parseInt(this.nudgeBottom);
            return this.calcYOverflow(top + this.pageYOffset) + "px";
        },
        classes: function classes() {
            return {
                'v-tooltip--top': this.top,
                'v-tooltip--right': this.right,
                'v-tooltip--bottom': this.bottom,
                'v-tooltip--left': this.left
            };
        },
        computedTransition: function computedTransition() {
            if (this.transition) return this.transition;
            if (this.top) return 'slide-y-reverse-transition';
            if (this.right) return 'slide-x-transition';
            if (this.bottom) return 'slide-y-transition';
            if (this.left) return 'slide-x-reverse-transition';
        },
        offsetY: function offsetY() {
            return this.top || this.bottom;
        },
        offsetX: function offsetX() {
            return this.left || this.right;
        },
        styles: function styles() {
            return {
                left: this.calculatedLeft,
                maxWidth: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_7__["convertToUnit"])(this.maxWidth),
                opacity: this.isActive ? 0.9 : 0,
                top: this.calculatedTop,
                zIndex: this.zIndex || this.activeZIndex
            };
        }
    },
    mounted: function mounted() {
        this.value && this.callActivate();
    },
    methods: {
        activate: function activate() {
            // Update coordinates and dimensions of menu
            // and its activator
            this.updateDimensions();
            // Start the transition
            requestAnimationFrame(this.startTransition);
        }
    },
    render: function render(h) {
        var _this = this;
        var _a;
        var tooltip = h('div', this.setBackgroundColor(this.color, {
            staticClass: 'v-tooltip__content',
            'class': (_a = {}, _a[this.contentClass] = true, _a['menuable__content__active'] = this.isActive, _a),
            style: this.styles,
            attrs: this.getScopeIdAttrs(),
            directives: [{
                name: 'show',
                value: this.isContentActive
            }],
            ref: 'content'
        }), this.showLazyContent(this.$slots.default));
        return h(this.tag, {
            staticClass: 'v-tooltip',
            'class': this.classes
        }, [h('transition', {
            props: {
                name: this.computedTransition
            }
        }, [tooltip]), h('span', {
            on: this.disabled ? {} : {
                mouseenter: function mouseenter() {
                    _this.runDelay('open', function () {
                        return _this.isActive = true;
                    });
                },
                mouseleave: function mouseleave() {
                    _this.runDelay('close', function () {
                        return _this.isActive = false;
                    });
                }
            },
            ref: 'activator'
        }, this.$slots.activator)]);
    }
});

/***/ }),

/***/ "./src/components/VTooltip/index.js":
/*!******************************************!*\
  !*** ./src/components/VTooltip/index.js ***!
  \******************************************/
/*! exports provided: VTooltip, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VTooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTooltip */ "./src/components/VTooltip/VTooltip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTooltip", function() { return _VTooltip__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/* harmony default export */ __webpack_exports__["default"] = (_VTooltip__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/components/VTreeview/VTreeview.ts":
/*!***********************************************!*\
  !*** ./src/components/VTreeview/VTreeview.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_treeview_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_treeview.styl */ "./src/stylus/components/_treeview.styl");
/* harmony import */ var _stylus_components_treeview_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_treeview_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VTreeviewNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VTreeviewNode */ "./src/components/VTreeview/VTreeviewNode.ts");
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};
// Styles

// Components

// Mixins


// Utils



function ston(s) {
    var n = Number(s);
    return !isNaN(n) ? n : s;
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_3__["provide"])('treeview'), _mixins_themeable__WEBPACK_IMPORTED_MODULE_2__["default"]
/* @vue/component */
).extend({
    name: 'v-treeview',
    provide: function provide() {
        return { treeview: this };
    },
    props: __assign({ active: {
            type: Array,
            default: function _default() {
                return [];
            }
        }, items: {
            type: Array,
            default: function _default() {
                return [];
            }
        }, hoverable: Boolean, multipleActive: Boolean, open: {
            type: Array,
            default: function _default() {
                return [];
            }
        }, openAll: Boolean, value: {
            type: Array,
            default: function _default() {
                return [];
            }
        } }, _VTreeviewNode__WEBPACK_IMPORTED_MODULE_1__["VTreeviewNodeProps"]),
    data: function data() {
        return {
            nodes: {},
            selectedCache: new Set(),
            activeCache: new Set(),
            openCache: new Set()
        };
    },
    watch: {
        items: {
            handler: function handler() {
                // We only care if nodes are removed or added
                if (Object.keys(this.nodes).length === this.countItems(this.items)) return;
                var oldSelectedCache = __spread(this.selectedCache);
                this.selectedCache = new Set();
                this.activeCache = new Set();
                this.openCache = new Set();
                this.buildTree(this.items);
                // Only emit selected if selection has changed
                // as a result of items changing. This fixes a
                // potential double emit when selecting a node
                // with dynamic children
                if (!Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["deepEqual"])(oldSelectedCache, __spread(this.selectedCache))) this.emitSelected();
            },
            deep: true
        },
        active: function active(value) {
            var _this = this;
            var old = __spread(this.activeCache);
            if (!value || Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["deepEqual"])(old, value)) return;
            old.forEach(function (key) {
                return _this.updateActive(key, false);
            });
            value.forEach(function (key) {
                return _this.updateActive(key, true);
            });
            this.emitActive();
        },
        value: function value(_value) {
            var _this = this;
            var old = __spread(this.selectedCache);
            if (!_value || Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["deepEqual"])(old, _value)) return;
            old.forEach(function (key) {
                return _this.updateSelected(key, false);
            });
            _value.forEach(function (key) {
                return _this.updateSelected(key, true);
            });
            this.emitSelected();
        },
        open: function open(value) {
            var _this = this;
            var old = __spread(this.openCache);
            if (Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["deepEqual"])(old, value)) return;
            old.forEach(function (key) {
                return _this.updateOpen(key, false);
            });
            value.forEach(function (key) {
                return _this.updateOpen(key, true);
            });
            this.emitOpen();
        }
    },
    created: function created() {
        var _this = this;
        this.buildTree(this.items);
        this.value.forEach(function (key) {
            return _this.updateSelected(key, true);
        });
        this.emitSelected();
        this.active.forEach(function (key) {
            return _this.updateActive(key, true);
        });
        this.emitActive();
    },
    mounted: function mounted() {
        var _this = this;
        // Save the developer from themselves
        if (this.$slots.prepend || this.$slots.append) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_6__["consoleWarn"])('The prepend and append slots require a slot-scope attribute', this);
        }
        if (this.openAll) {
            Object.keys(this.nodes).forEach(function (key) {
                return _this.updateOpen(ston(key), true);
            });
        } else {
            this.open.forEach(function (key) {
                return _this.updateOpen(key, true);
            });
        }
        this.emitOpen();
    },
    methods: {
        buildTree: function buildTree(items, parent) {
            var _this = this;
            if (parent === void 0) {
                parent = null;
            }
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var key = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["getObjectValueByPath"])(item, this.itemKey);
                var children = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["getObjectValueByPath"])(item, this.itemChildren, []);
                var oldNode = this.nodes.hasOwnProperty(key) ? this.nodes[key] : {
                    isSelected: false, isIndeterminate: false, isActive: false, isOpen: false, vnode: null
                };
                var node = {
                    vnode: oldNode.vnode,
                    parent: parent,
                    children: children.map(function (c) {
                        return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["getObjectValueByPath"])(c, _this.itemKey);
                    })
                };
                this.buildTree(children, key);
                // This fixed bug with dynamic children resetting selected parent state
                if (!this.nodes.hasOwnProperty(key) && parent !== null && this.nodes.hasOwnProperty(parent)) {
                    node.isSelected = this.nodes[parent].isSelected;
                    node.isIndeterminate = this.nodes[parent].isIndeterminate;
                } else {
                    node.isSelected = oldNode.isSelected;
                    node.isIndeterminate = oldNode.isIndeterminate;
                }
                node.isActive = oldNode.isActive;
                node.isOpen = oldNode.isOpen;
                this.nodes[key] = !children.length ? node : this.calculateState(node, this.nodes);
                // Don't forget to rebuild cache
                if (this.nodes[key].isSelected) this.selectedCache.add(key);
                if (this.nodes[key].isActive) this.activeCache.add(key);
                if (this.nodes[key].isOpen) this.openCache.add(key);
                this.updateVnodeState(key);
            }
        },
        countItems: function countItems(items) {
            var count = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                count += 1;
                count += item.children ? this.countItems(item.children) : 0;
            }
            return count;
        },
        calculateState: function calculateState(node, state) {
            var counts = node.children.reduce(function (counts, child) {
                counts[0] += +Boolean(state[child].isSelected);
                counts[1] += +Boolean(state[child].isIndeterminate);
                return counts;
            }, [0, 0]);
            node.isSelected = !!node.children.length && counts[0] === node.children.length;
            node.isIndeterminate = !node.isSelected && (counts[0] > 0 || counts[1] > 0);
            return node;
        },
        emitOpen: function emitOpen() {
            this.$emit('update:open', __spread(this.openCache));
        },
        emitSelected: function emitSelected() {
            this.$emit('input', __spread(this.selectedCache));
        },
        emitActive: function emitActive() {
            this.$emit('update:active', __spread(this.activeCache));
        },
        getDescendants: function getDescendants(key, descendants) {
            if (descendants === void 0) {
                descendants = [];
            }
            var children = this.nodes[key].children;
            descendants.push.apply(descendants, __spread(children));
            for (var i = 0; i < children.length; i++) {
                descendants = this.getDescendants(children[i], descendants);
            }
            return descendants;
        },
        getParents: function getParents(key) {
            var parent = this.nodes[key].parent;
            var parents = [];
            while (parent !== null) {
                parents.push(parent);
                parent = this.nodes[parent].parent;
            }
            return parents;
        },
        register: function register(node) {
            var key = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["getObjectValueByPath"])(node.item, this.itemKey);
            this.nodes[key].vnode = node;
            this.updateVnodeState(key);
        },
        unregister: function unregister(node) {
            var key = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_4__["getObjectValueByPath"])(node.item, this.itemKey);
            this.nodes[key].vnode = null;
        },
        updateActive: function updateActive(key, isActive) {
            var _this = this;
            if (!this.nodes.hasOwnProperty(key)) return;
            if (!this.multipleActive) {
                this.activeCache.forEach(function (active) {
                    _this.nodes[active].isActive = false;
                    _this.updateVnodeState(active);
                    _this.activeCache.delete(active);
                });
            }
            var node = this.nodes[key];
            if (!node) return;
            if (isActive) this.activeCache.add(key);else this.activeCache.delete(key);
            node.isActive = isActive;
            this.updateVnodeState(key);
        },
        updateSelected: function updateSelected(key, isSelected) {
            var _this = this;
            if (!this.nodes.hasOwnProperty(key)) return;
            var changed = {};
            var descendants = __spread([key], this.getDescendants(key));
            descendants.forEach(function (descendant) {
                _this.nodes[descendant].isSelected = isSelected;
                _this.nodes[descendant].isIndeterminate = false;
                changed[descendant] = isSelected;
            });
            var parents = this.getParents(key);
            parents.forEach(function (parent) {
                _this.nodes[parent] = _this.calculateState(_this.nodes[parent], _this.nodes);
                changed[parent] = _this.nodes[parent].isSelected;
            });
            var all = __spread([key], descendants, parents);
            all.forEach(this.updateVnodeState);
            Object.keys(changed).forEach(function (k) {
                changed[k] === true ? _this.selectedCache.add(ston(k)) : _this.selectedCache.delete(ston(k));
            });
        },
        updateOpen: function updateOpen(key, isOpen) {
            var _this = this;
            if (!this.nodes.hasOwnProperty(key)) return;
            var node = this.nodes[key];
            if (node.children && !node.children.length && node.vnode && !node.vnode.hasLoaded) {
                node.vnode.checkChildren().then(function () {
                    return _this.updateOpen(key, isOpen);
                });
            } else {
                node.isOpen = isOpen;
                node.isOpen ? this.openCache.add(key) : this.openCache.delete(key);
                this.updateVnodeState(key);
            }
        },
        updateVnodeState: function updateVnodeState(key) {
            var node = this.nodes[key];
            if (node && node.vnode) {
                node.vnode.isSelected = node.isSelected;
                node.vnode.isIndeterminate = node.isIndeterminate;
                node.vnode.isActive = node.isActive;
                node.vnode.isOpen = node.isOpen;
            }
        }
    },
    render: function render(h) {
        var children = this.items.length ? this.items.map(_VTreeviewNode__WEBPACK_IMPORTED_MODULE_1__["default"].options.methods.genChild.bind(this))
        /* istanbul ignore next */
        : this.$slots.default;
        return h('div', {
            staticClass: 'v-treeview',
            class: __assign({ 'v-treeview--hoverable': this.hoverable }, this.themeClasses)
        }, children);
    }
}));

/***/ }),

/***/ "./src/components/VTreeview/VTreeviewNode.ts":
/*!***************************************************!*\
  !*** ./src/components/VTreeview/VTreeviewNode.ts ***!
  \***************************************************/
/*! exports provided: VTreeviewNodeProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VTreeviewNodeProps", function() { return VTreeviewNodeProps; });
/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transitions */ "./src/components/transitions/index.js");
/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _VTreeviewNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VTreeviewNode */ "./src/components/VTreeview/VTreeviewNode.ts");
/* harmony import */ var _mixins_registrable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/registrable */ "./src/mixins/registrable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Components



// Mixins

// Utils


var VTreeviewNodeProps = {
    activatable: Boolean,
    activeClass: {
        type: String,
        default: 'v-treeview-node--active'
    },
    selectable: Boolean,
    selectedColor: {
        type: String,
        default: 'accent'
    },
    indeterminateIcon: {
        type: String,
        default: '$vuetify.icons.checkboxIndeterminate'
    },
    onIcon: {
        type: String,
        default: '$vuetify.icons.checkboxOn'
    },
    offIcon: {
        type: String,
        default: '$vuetify.icons.checkboxOff'
    },
    expandIcon: {
        type: String,
        default: '$vuetify.icons.subgroup'
    },
    loadingIcon: {
        type: String,
        default: '$vuetify.icons.loading'
    },
    itemKey: {
        type: String,
        default: 'id'
    },
    itemText: {
        type: String,
        default: 'name'
    },
    itemChildren: {
        type: String,
        default: 'children'
    },
    loadChildren: Function,
    openOnClick: Boolean,
    transition: Boolean
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_mixins_registrable__WEBPACK_IMPORTED_MODULE_3__["inject"])('treeview')
/* @vue/component */
).extend({
    name: 'v-treeview-node',
    inject: {
        treeview: {
            default: null
        }
    },
    props: __assign({ item: {
            type: Object,
            default: function _default() {
                return null;
            }
        } }, VTreeviewNodeProps),
    data: function data() {
        return {
            isOpen: false,
            isSelected: false,
            isIndeterminate: false,
            isActive: false,
            isLoading: false,
            hasLoaded: false
        };
    },
    computed: {
        key: function key() {
            return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__["getObjectValueByPath"])(this.item, this.itemKey);
        },
        children: function children() {
            return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__["getObjectValueByPath"])(this.item, this.itemChildren);
        },
        text: function text() {
            return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__["getObjectValueByPath"])(this.item, this.itemText);
        },
        scopedProps: function scopedProps() {
            return {
                item: this.item,
                leaf: !this.children,
                selected: this.isSelected,
                indeterminate: this.isIndeterminate,
                active: this.isActive,
                open: this.isOpen
            };
        },
        computedIcon: function computedIcon() {
            if (this.isIndeterminate) return this.indeterminateIcon;else if (this.isSelected) return this.onIcon;else return this.offIcon;
        }
    },
    created: function created() {
        this.treeview.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.treeview.unregister(this);
    },
    methods: {
        checkChildren: function checkChildren() {
            var _this = this;
            return new Promise(function (resolve) {
                // TODO: Potential issue with always trying
                // to load children if response is empty?
                if (!_this.children || _this.children.length || !_this.loadChildren || _this.hasLoaded) return resolve();
                _this.isLoading = true;
                resolve(_this.loadChildren(_this.item));
            }).then(function () {
                _this.isLoading = false;
                _this.hasLoaded = true;
            });
        },
        open: function open() {
            this.isOpen = !this.isOpen;
            this.treeview.updateOpen(this.key, this.isOpen);
            this.treeview.emitOpen();
        },
        genLabel: function genLabel() {
            return this.$createElement('label', {
                slot: 'label',
                staticClass: 'v-treeview-node__label'
            }, [this.text]);
        },
        genContent: function genContent() {
            var children = [this.$scopedSlots.prepend && this.$scopedSlots.prepend(this.scopedProps), this.genLabel(), this.$scopedSlots.append && this.$scopedSlots.append(this.scopedProps)];
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__content'
            }, children);
        },
        genToggle: function genToggle() {
            var _this = this;
            return this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["VIcon"], {
                staticClass: 'v-treeview-node__toggle',
                class: {
                    'v-treeview-node__toggle--open': this.isOpen,
                    'v-treeview-node__toggle--loading': this.isLoading
                },
                slot: 'prepend',
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        if (_this.isLoading) return;
                        _this.checkChildren().then(function () {
                            return _this.open();
                        });
                    }
                }
            }, [this.isLoading ? this.loadingIcon : this.expandIcon]);
        },
        genCheckbox: function genCheckbox() {
            var _this = this;
            return this.$createElement(_VIcon__WEBPACK_IMPORTED_MODULE_1__["VIcon"], {
                staticClass: 'v-treeview-node__checkbox',
                props: {
                    color: this.isSelected ? this.selectedColor : undefined
                },
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        if (_this.isLoading) return;
                        _this.checkChildren().then(function () {
                            // We nextTick here so that items watch in VTreeview has a chance to run first
                            _this.$nextTick(function () {
                                _this.isSelected = !_this.isSelected;
                                _this.isIndeterminate = false;
                                _this.treeview.updateSelected(_this.key, _this.isSelected);
                                _this.treeview.emitSelected();
                            });
                        });
                    }
                }
            }, [this.computedIcon]);
        },
        genNode: function genNode() {
            var _this = this;
            var children = [this.genContent()];
            if (this.selectable) children.unshift(this.genCheckbox());
            if (this.children) children.unshift(this.genToggle());
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__root',
                on: {
                    click: function click() {
                        if (_this.openOnClick && _this.children) {
                            _this.open();
                        } else if (_this.activatable) {
                            _this.isActive = !_this.isActive;
                            _this.treeview.updateActive(_this.key, _this.isActive);
                            _this.treeview.emitActive();
                        }
                    }
                }
            }, children);
        },
        genChild: function genChild(item) {
            return this.$createElement(_VTreeviewNode__WEBPACK_IMPORTED_MODULE_2__["default"], {
                key: Object(_util_helpers__WEBPACK_IMPORTED_MODULE_5__["getObjectValueByPath"])(item, this.itemKey),
                props: {
                    activatable: this.activatable,
                    activeClass: this.activeClass,
                    item: item,
                    selectable: this.selectable,
                    selectedColor: this.selectedColor,
                    expandIcon: this.expandIcon,
                    indeterminateIcon: this.indeterminateIcon,
                    offIcon: this.offIcon,
                    onIcon: this.onIcon,
                    loadingIcon: this.loadingIcon,
                    itemKey: this.itemKey,
                    itemText: this.itemText,
                    itemChildren: this.itemChildren,
                    loadChildren: this.loadChildren,
                    transition: this.transition,
                    openOnClick: this.openOnClick
                },
                scopedSlots: this.$scopedSlots
            });
        },
        genChildrenWrapper: function genChildrenWrapper() {
            if (!this.isOpen || !this.children) return null;
            var children = [this.children.map(this.genChild)];
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__children'
            }, children);
        },
        genTransition: function genTransition() {
            return this.$createElement(_transitions__WEBPACK_IMPORTED_MODULE_0__["VExpandTransition"], [this.genChildrenWrapper()]);
        }
    },
    render: function render(h) {
        var _a;
        var children = [this.genNode()];
        if (this.transition) children.push(this.genTransition());else children.push(this.genChildrenWrapper());
        return h('div', {
            staticClass: 'v-treeview-node',
            class: (_a = {}, _a[this.activeClass] = this.isActive, _a['v-treeview-node--leaf'] = !this.children, _a['v-treeview-node--click'] = this.openOnClick, _a['v-treeview-node--selected'] = this.isSelected, _a)
        }, children);
    }
}));

/***/ }),

/***/ "./src/components/VTreeview/index.ts":
/*!*******************************************!*\
  !*** ./src/components/VTreeview/index.ts ***!
  \*******************************************/
/*! exports provided: VTreeview, VTreeviewNode, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VTreeview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VTreeview */ "./src/components/VTreeview/VTreeview.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTreeview", function() { return _VTreeview__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VTreeviewNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VTreeviewNode */ "./src/components/VTreeview/VTreeviewNode.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTreeviewNode", function() { return _VTreeviewNode__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VTreeview: _VTreeview__WEBPACK_IMPORTED_MODULE_0__["default"],
        VTreeviewNode: _VTreeviewNode__WEBPACK_IMPORTED_MODULE_1__["default"]
    }
});

/***/ }),

/***/ "./src/components/VWindow/VWindow.ts":
/*!*******************************************!*\
  !*** ./src/components/VWindow/VWindow.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_windows_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stylus/components/_windows.styl */ "./src/stylus/components/_windows.styl");
/* harmony import */ var _stylus_components_windows_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_windows_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VItemGroup/VItemGroup */ "./src/components/VItemGroup/VItemGroup.ts");
/* harmony import */ var _directives_touch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../directives/touch */ "./src/directives/touch.ts");
// Styles

// Components

// Directives

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (_VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_1__["BaseItemGroup"].extend({
    name: 'v-window',
    provide: function provide() {
        return {
            windowGroup: this
        };
    },
    directives: { Touch: _directives_touch__WEBPACK_IMPORTED_MODULE_2__["default"] },
    props: {
        mandatory: {
            type: Boolean,
            default: true
        },
        reverse: {
            type: Boolean,
            default: undefined
        },
        touch: Object,
        touchless: Boolean,
        value: {
            required: false
        },
        vertical: Boolean
    },
    data: function data() {
        return {
            internalHeight: undefined,
            isActive: false,
            isBooted: false,
            isReverse: false
        };
    },
    computed: {
        computedTransition: function computedTransition() {
            if (!this.isBooted) return '';
            var axis = this.vertical ? 'y' : 'x';
            var direction = this.internalReverse === !this.$vuetify.rtl ? '-reverse' : '';
            return "v-window-" + axis + direction + "-transition";
        },
        internalIndex: function internalIndex() {
            var _this = this;
            return this.items.findIndex(function (item, i) {
                return _this.internalValue === _this.getValue(item, i);
            });
        },
        internalReverse: function internalReverse() {
            if (this.reverse !== undefined) return this.reverse;
            return this.isReverse;
        }
    },
    watch: {
        internalIndex: 'updateReverse'
    },
    mounted: function mounted() {
        var _this = this;
        this.$nextTick(function () {
            return _this.isBooted = true;
        });
    },
    methods: {
        genContainer: function genContainer() {
            return this.$createElement('div', {
                staticClass: 'v-window__container',
                class: {
                    'v-window__container--is-active': this.isActive
                },
                style: {
                    height: this.internalHeight
                }
            }, this.$slots.default);
        },
        next: function next() {
            this.isReverse = false;
            var nextIndex = (this.internalIndex + 1) % this.items.length;
            var item = this.items[nextIndex];
            this.internalValue = this.getValue(item, nextIndex);
        },
        prev: function prev() {
            this.isReverse = true;
            var lastIndex = (this.internalIndex + this.items.length - 1) % this.items.length;
            var item = this.items[lastIndex];
            this.internalValue = this.getValue(item, lastIndex);
        },
        updateReverse: function updateReverse(val, oldVal) {
            this.isReverse = val < oldVal;
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-window',
            directives: []
        };
        if (!this.touchless) {
            var value = this.touch || {
                left: this.next,
                right: this.prev
            };
            data.directives.push({
                name: 'touch',
                value: value
            });
        }
        return h('div', data, [this.genContainer()]);
    }
}));

/***/ }),

/***/ "./src/components/VWindow/VWindowItem.ts":
/*!***********************************************!*\
  !*** ./src/components/VWindow/VWindowItem.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_bootable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/bootable */ "./src/mixins/bootable.ts");
/* harmony import */ var _mixins_groupable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mixins/groupable */ "./src/mixins/groupable.ts");
/* harmony import */ var _directives_touch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../directives/touch */ "./src/directives/touch.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/mixins */ "./src/util/mixins.ts");
// Mixins


// Directives

// Utilities


/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__["default"])(_mixins_bootable__WEBPACK_IMPORTED_MODULE_0__["default"], Object(_mixins_groupable__WEBPACK_IMPORTED_MODULE_1__["factory"])('windowGroup', 'v-window-item', 'v-window')
/* @vue/component */
).extend({
    name: 'v-window-item',
    directives: {
        Touch: _directives_touch__WEBPACK_IMPORTED_MODULE_2__["default"]
    },
    props: {
        reverseTransition: {
            type: [Boolean, String],
            default: undefined
        },
        transition: {
            type: [Boolean, String],
            default: undefined
        },
        value: {
            required: false
        }
    },
    data: function data() {
        return {
            isActive: false,
            wasCancelled: false
        };
    },
    computed: {
        computedTransition: function computedTransition() {
            if (!this.windowGroup.internalReverse) {
                return typeof this.transition !== 'undefined' ? this.transition || '' : this.windowGroup.computedTransition;
            }
            return typeof this.reverseTransition !== 'undefined' ? this.reverseTransition || '' : this.windowGroup.computedTransition;
        }
    },
    methods: {
        genDefaultSlot: function genDefaultSlot() {
            return this.$slots.default;
        },
        onAfterEnter: function onAfterEnter() {
            var _this = this;
            if (this.wasCancelled) {
                this.wasCancelled = false;
                return;
            }
            requestAnimationFrame(function () {
                _this.windowGroup.internalHeight = undefined;
                _this.windowGroup.isActive = false;
            });
        },
        onBeforeEnter: function onBeforeEnter() {
            this.windowGroup.isActive = true;
        },
        onBeforeLeave: function onBeforeLeave(el) {
            this.windowGroup.internalHeight = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__["convertToUnit"])(el.clientHeight);
        },
        onEnterCancelled: function onEnterCancelled() {
            this.wasCancelled = true;
        },
        onEnter: function onEnter(el, done) {
            var _this = this;
            var isBooted = this.windowGroup.isBooted;
            if (isBooted) {
                Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__["addOnceEventListener"])(el, 'transitionend', done);
            }
            requestAnimationFrame(function () {
                _this.windowGroup.internalHeight = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__["convertToUnit"])(el.clientHeight);
                // On initial render, there is no transition
                // Vue leaves a `enter` transition class
                // if done is called too fast
                !isBooted && setTimeout(done, 100);
            });
        }
    },
    render: function render(h) {
        var div = h('div', {
            staticClass: 'v-window-item',
            directives: [{
                name: 'show',
                value: this.isActive
            }],
            on: this.$listeners
        }, this.showLazyContent(this.genDefaultSlot()));
        return h('transition', {
            props: {
                name: this.computedTransition
            },
            on: {
                afterEnter: this.onAfterEnter,
                beforeEnter: this.onBeforeEnter,
                beforeLeave: this.onBeforeLeave,
                enter: this.onEnter,
                enterCancelled: this.onEnterCancelled
            }
        }, [div]);
    }
}));

/***/ }),

/***/ "./src/components/VWindow/index.ts":
/*!*****************************************!*\
  !*** ./src/components/VWindow/index.ts ***!
  \*****************************************/
/*! exports provided: VWindow, VWindowItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VWindow */ "./src/components/VWindow/VWindow.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VWindow", function() { return _VWindow__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _VWindowItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VWindowItem */ "./src/components/VWindow/VWindowItem.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VWindowItem", function() { return _VWindowItem__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VWindow: _VWindow__WEBPACK_IMPORTED_MODULE_0__["default"],
        VWindowItem: _VWindowItem__WEBPACK_IMPORTED_MODULE_1__["default"]
    }
});

/***/ }),

/***/ "./src/components/Vuetify/index.ts":
/*!*****************************************!*\
  !*** ./src/components/Vuetify/index.ts ***!
  \*****************************************/
/*! exports provided: checkVueVersion, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkVueVersion", function() { return checkVueVersion; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/application */ "./src/components/Vuetify/mixins/application.ts");
/* harmony import */ var _mixins_breakpoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/breakpoint */ "./src/components/Vuetify/mixins/breakpoint.ts");
/* harmony import */ var _mixins_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mixins/theme */ "./src/components/Vuetify/mixins/theme.ts");
/* harmony import */ var _mixins_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mixins/icons */ "./src/components/Vuetify/mixins/icons.js");
/* harmony import */ var _mixins_options__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mixins/options */ "./src/components/Vuetify/mixins/options.js");
/* harmony import */ var _mixins_lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mixins/lang */ "./src/components/Vuetify/mixins/lang.ts");
/* harmony import */ var _util_goTo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util/goTo */ "./src/components/Vuetify/util/goTo.js");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/console */ "./src/util/console.ts");








// Utils

var Vuetify = {
    install: function install(Vue, opts) {
        if (opts === void 0) {
            opts = {};
        }
        if (this.installed) return;
        this.installed = true;
        if (vue__WEBPACK_IMPORTED_MODULE_0___default.a !== Vue) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_8__["consoleError"])('Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you\'re seeing "$attrs is readonly", it\'s caused by this');
        }
        checkVueVersion(Vue);
        var lang = Object(_mixins_lang__WEBPACK_IMPORTED_MODULE_6__["default"])(opts.lang);
        Vue.prototype.$vuetify = new Vue({
            mixins: [_mixins_breakpoint__WEBPACK_IMPORTED_MODULE_2__["default"]],
            data: {
                application: _mixins_application__WEBPACK_IMPORTED_MODULE_1__["default"],
                dark: false,
                icons: Object(_mixins_icons__WEBPACK_IMPORTED_MODULE_4__["default"])(opts.iconfont, opts.icons),
                lang: lang,
                options: Object(_mixins_options__WEBPACK_IMPORTED_MODULE_5__["default"])(opts.options),
                rtl: opts.rtl,
                theme: Object(_mixins_theme__WEBPACK_IMPORTED_MODULE_3__["default"])(opts.theme)
            },
            methods: {
                goTo: _util_goTo__WEBPACK_IMPORTED_MODULE_7__["default"],
                t: lang.t.bind(lang)
            }
        });
        if (opts.directives) {
            for (var name in opts.directives) {
                Vue.directive(name, opts.directives[name]);
            }
        }
        (function registerComponents(components) {
            if (components) {
                for (var key in components) {
                    var component = components[key];
                    if (component && !registerComponents(component.$_vuetify_subcomponents)) {
                        Vue.component(key, component);
                    }
                }
                return true;
            }
            return false;
        })(opts.components);
    },
    version: '1.3.3'
};
function checkVueVersion(Vue, requiredVue) {
    var vueDep = requiredVue || '^2.5.10';
    var required = vueDep.split('.', 3).map(function (v) {
        return v.replace(/\D/g, '');
    }).map(Number);
    var actual = Vue.version.split('.', 3).map(function (n) {
        return parseInt(n, 10);
    });
    // Simple semver caret range comparison
    var passes = actual[0] === required[0] && ( // major matches
    actual[1] > required[1] || // minor is greater
    actual[1] === required[1] && actual[2] >= required[2] // or minor is eq and patch is >=
    );
    if (!passes) {
        Object(_util_console__WEBPACK_IMPORTED_MODULE_8__["consoleWarn"])("Vuetify requires Vue version " + vueDep);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Vuetify);

/***/ }),

/***/ "./src/components/Vuetify/mixins/application.ts":
/*!******************************************************!*\
  !*** ./src/components/Vuetify/mixins/application.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    bar: 0,
    bottom: 0,
    footer: 0,
    insetFooter: 0,
    left: 0,
    right: 0,
    top: 0,
    components: {
        bar: {},
        bottom: {},
        footer: {},
        insetFooter: {},
        left: {},
        right: {},
        top: {}
    },
    bind: function bind(uid, target, value) {
        var _a;
        if (!this.components[target]) return;
        this.components[target] = (_a = {}, _a[uid] = value, _a);
        this.update(target);
    },
    unbind: function unbind(uid, target) {
        if (this.components[target][uid] == null) return;
        delete this.components[target][uid];
        this.update(target);
    },
    update: function update(target) {
        this[target] = Object.values(this.components[target]).reduce(function (acc, cur) {
            return acc + cur;
        }, 0);
    }
});

/***/ }),

/***/ "./src/components/Vuetify/mixins/breakpoint.ts":
/*!*****************************************************!*\
  !*** ./src/components/Vuetify/mixins/breakpoint.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/**
 * A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b
 */
/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 *
 */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    data: function data() {
        return {
            clientHeight: getClientHeight(),
            clientWidth: getClientWidth(),
            resizeTimeout: undefined
        };
    },
    computed: {
        breakpoint: function breakpoint() {
            var xs = this.clientWidth < 600;
            var sm = this.clientWidth < 960 && !xs;
            var md = this.clientWidth < 1280 - 16 && !(sm || xs);
            var lg = this.clientWidth < 1920 - 16 && !(md || sm || xs);
            var xl = this.clientWidth >= 1920 - 16;
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
            var name;
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
            return {
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
        }
    },
    created: function created() {
        if (typeof window === 'undefined') return;
        window.addEventListener('resize', this.onResize, { passive: true });
    },
    beforeDestroy: function beforeDestroy() {
        if (typeof window === 'undefined') return;
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize: function onResize() {
            clearTimeout(this.resizeTimeout);
            // Added debounce to match what
            // v-resize used to do but was
            // removed due to a memory leak
            // https://github.com/vuetifyjs/vuetify/pull/2997
            this.resizeTimeout = window.setTimeout(this.setDimensions, 200);
        },
        setDimensions: function setDimensions() {
            this.clientHeight = getClientHeight();
            this.clientWidth = getClientWidth();
        }
    }
}));
// Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081
function getClientWidth() {
    if (typeof document === 'undefined') return 0; // SSR
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
function getClientHeight() {
    if (typeof document === 'undefined') return 0; // SSR
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

/***/ }),

/***/ "./src/components/Vuetify/mixins/icons.js":
/*!************************************************!*\
  !*** ./src/components/Vuetify/mixins/icons.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return icons; });
// Maps internal Vuetify icon names to actual Material Design icon names.
var ICONS_MATERIAL = {
    'complete': 'check',
    'cancel': 'cancel',
    'close': 'close',
    'delete': 'cancel',
    'clear': 'clear',
    'success': 'check_circle',
    'info': 'info',
    'warning': 'priority_high',
    'error': 'warning',
    'prev': 'chevron_left',
    'next': 'chevron_right',
    'checkboxOn': 'check_box',
    'checkboxOff': 'check_box_outline_blank',
    'checkboxIndeterminate': 'indeterminate_check_box',
    'delimiter': 'fiber_manual_record',
    'sort': 'arrow_upward',
    'expand': 'keyboard_arrow_down',
    'menu': 'menu',
    'subgroup': 'arrow_drop_down',
    'dropdown': 'arrow_drop_down',
    'radioOn': 'radio_button_checked',
    'radioOff': 'radio_button_unchecked',
    'edit': 'edit',
    'ratingEmpty': 'star_border',
    'ratingFull': 'star',
    'ratingHalf': 'star_half',
    'loading': 'cached'
};
// Maps internal Vuetify icon names to actual icons from materialdesignicons.com
var ICONS_MDI = {
    'complete': 'mdi-check',
    'cancel': 'mdi-close-circle',
    'close': 'mdi-close',
    'delete': 'mdi-close-circle',
    'clear': 'mdi-close',
    'success': 'mdi-check-circle',
    'info': 'mdi-information',
    'warning': 'mdi-exclamation',
    'error': 'mdi-alert',
    'prev': 'mdi-chevron-left',
    'next': 'mdi-chevron-right',
    'checkboxOn': 'mdi-checkbox-marked',
    'checkboxOff': 'mdi-checkbox-blank-outline',
    'checkboxIndeterminate': 'mdi-minus-box',
    'delimiter': 'mdi-circle',
    'sort': 'mdi-arrow-up',
    'expand': 'mdi-chevron-down',
    'menu': 'mdi-menu',
    'subgroup': 'mdi-menu-down',
    'dropdown': 'mdi-menu-down',
    'radioOn': 'mdi-radiobox-marked',
    'radioOff': 'mdi-radiobox-blank',
    'edit': 'mdi-pencil',
    'ratingEmpty': 'mdi-star-outline',
    'ratingFull': 'mdi-star',
    'ratingHalf': 'mdi-star-half'
};
// Maps internal Vuetify icon names to actual Font-Awesome 4 icon names.
var ICONS_FONTAWESOME4 = {
    'complete': 'fa fa-check',
    'cancel': 'fa fa-times-circle',
    'close': 'fa fa-times',
    'delete': 'fa fa-times-circle',
    'clear': 'fa fa-times-circle',
    'success': 'fa fa-check-circle',
    'info': 'fa fa-info-circle',
    'warning': 'fa fa-exclamation',
    'error': 'fa fa-exclamation-triangle',
    'prev': 'fa fa-chevron-left',
    'next': 'fa fa-chevron-right',
    'checkboxOn': 'fa fa-check-square',
    'checkboxOff': 'fa fa-square-o',
    'checkboxIndeterminate': 'fa fa-minus-square',
    'delimiter': 'fa fa-circle',
    'sort': 'fa fa-sort-up',
    'expand': 'fa fa-chevron-down',
    'menu': 'fa fa-bars',
    'subgroup': 'fa fa-caret-down',
    'dropdown': 'fa fa-caret-down',
    'radioOn': 'fa fa-dot-circle',
    'radioOff': 'fa fa-circle-o',
    'edit': 'fa fa-pencil',
    'ratingEmpty': 'fa fa-star-o',
    'ratingFull': 'fa fa-star',
    'ratingHalf': 'fa fa-star-half-o'
};
// Maps internal Vuetify icon names to actual Font-Awesome 5+ icon names.
var ICONS_FONTAWESOME = {
    'complete': 'fas fa-check',
    'cancel': 'fas fa-times-circle',
    'close': 'fas fa-times',
    'delete': 'fas fa-times-circle',
    'clear': 'fas fa-times-circle',
    'success': 'fas fa-check-circle',
    'info': 'fas fa-info-circle',
    'warning': 'fas fa-exclamation',
    'error': 'fas fa-exclamation-triangle',
    'prev': 'fas fa-chevron-left',
    'next': 'fas fa-chevron-right',
    'checkboxOn': 'fas fa-check-square',
    'checkboxOff': 'far fa-square',
    'checkboxIndeterminate': 'fas fa-minus-square',
    'delimiter': 'fas fa-circle',
    'sort': 'fas fa-sort-up',
    'expand': 'fas fa-chevron-down',
    'menu': 'fas fa-bars',
    'subgroup': 'fas fa-caret-down',
    'dropdown': 'fas fa-caret-down',
    'radioOn': 'far fa-dot-circle',
    'radioOff': 'far fa-circle',
    'edit': 'fas fa-edit',
    'ratingEmpty': 'far fa-star',
    'ratingFull': 'fas fa-star',
    'ratingHalf': 'fas fa-star-half'
};
var iconSets = {
    md: ICONS_MATERIAL,
    mdi: ICONS_MDI,
    fa: ICONS_FONTAWESOME,
    fa4: ICONS_FONTAWESOME4
};
function icons(iconfont, icons) {
    if (iconfont === void 0) {
        iconfont = 'md';
    }
    if (icons === void 0) {
        icons = {};
    }
    return Object.assign({}, iconSets[iconfont] || iconSets.md, icons);
}

/***/ }),

/***/ "./src/components/Vuetify/mixins/lang.ts":
/*!***********************************************!*\
  !*** ./src/components/Vuetify/mixins/lang.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lang; });
/* harmony import */ var _locale_en__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../locale/en */ "./src/locale/en.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util/console */ "./src/util/console.ts");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};



var LANG_PREFIX = '$vuetify.';
var fallback = Symbol('Lang fallback');
function getTranslation(locale, key, usingFallback) {
    if (usingFallback === void 0) {
        usingFallback = false;
    }
    var shortKey = key.replace(LANG_PREFIX, '');
    var translation = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__["getObjectValueByPath"])(locale, shortKey, fallback);
    if (translation === fallback) {
        if (usingFallback) {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_2__["consoleError"])("Translation key \"" + shortKey + "\" not found in fallback");
            translation = key;
        } else {
            Object(_util_console__WEBPACK_IMPORTED_MODULE_2__["consoleWarn"])("Translation key \"" + shortKey + "\" not found, falling back to default");
            translation = getTranslation(_locale_en__WEBPACK_IMPORTED_MODULE_0__["default"], key, true);
        }
    }
    return translation;
}
function lang(config) {
    if (config === void 0) {
        config = {};
    }
    return {
        locales: Object.assign({ en: _locale_en__WEBPACK_IMPORTED_MODULE_0__["default"] }, config.locales),
        current: config.current || 'en',
        t: function t(key) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (!key.startsWith(LANG_PREFIX)) return key;
            if (config.t) return config.t.apply(config, __spread([key], params));
            var translation = getTranslation(this.locales[this.current], key);
            return translation.replace(/\{(\d+)\}/g, function (match, index) {
                return String(params[+index]);
            });
        }
    };
}

/***/ }),

/***/ "./src/components/Vuetify/mixins/options.js":
/*!**************************************************!*\
  !*** ./src/components/Vuetify/mixins/options.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return options; });
var OPTIONS_DEFAULTS = {
    minifyTheme: null,
    themeCache: null,
    customProperties: false,
    cspNonce: null
};
function options(options) {
    if (options === void 0) {
        options = {};
    }
    return Object.assign({}, OPTIONS_DEFAULTS, options);
}

/***/ }),

/***/ "./src/components/Vuetify/mixins/theme.ts":
/*!************************************************!*\
  !*** ./src/components/Vuetify/mixins/theme.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return theme; });
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable no-multi-spaces */
var THEME_DEFAULTS = {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107' // amber.base
};
function theme(theme) {
    if (theme === void 0) {
        theme = {};
    }
    if (theme === false) return false;
    return __assign({}, THEME_DEFAULTS, theme);
}

/***/ }),

/***/ "./src/components/Vuetify/util/goTo.js":
/*!*********************************************!*\
  !*** ./src/components/Vuetify/util/goTo.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return goTo; });
/* harmony import */ var _util_easing_patterns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util/easing-patterns */ "./src/util/easing-patterns.js");

var defaults = {
    duration: 500,
    offset: 0,
    easing: 'easeInOutCubic'
};
function getDocumentHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
}
function getWindowHeight() {
    return window.innerHeight || (document.documentElement || document.body).clientHeight;
}
function isVueComponent(obj) {
    return obj != null && obj._isVue;
}
function getTargetLocation(target, settings) {
    var location;
    if (isVueComponent(target)) {
        target = target.$el;
    }
    if (target instanceof Element) {
        location = target.getBoundingClientRect().top + window.pageYOffset;
    } else if (typeof target === 'string') {
        var targetEl = document.querySelector(target);
        if (!targetEl) throw new TypeError("Target element \"" + target + "\" not found.");
        location = targetEl.getBoundingClientRect().top + window.pageYOffset;
    } else if (typeof target === 'number') {
        location = target;
    } else {
        var type = target == null ? target : target.constructor.name;
        throw new TypeError("Target must be a Selector/Number/DOMElement/VueComponent, received " + type + " instead.");
    }
    return Math.round(Math.min(Math.max(location + settings.offset, 0), getDocumentHeight() - getWindowHeight()));
}
function goTo(target, options) {
    return new Promise(function (resolve, reject) {
        if (typeof window === 'undefined') return reject('Window is undefined');
        var settings = Object.assign({}, defaults, options);
        var startTime = performance.now();
        var startLocation = window.pageYOffset;
        var targetLocation = getTargetLocation(target, settings);
        var distanceToScroll = targetLocation - startLocation;
        var easingFunction = typeof settings.easing === 'function' ? settings.easing : _util_easing_patterns__WEBPACK_IMPORTED_MODULE_0__[settings.easing];
        if (!easingFunction) throw new TypeError("Easing function '" + settings.easing + "' not found.");
        function step(currentTime) {
            var progressPercentage = Math.min(1, (currentTime - startTime) / settings.duration);
            var targetPosition = Math.floor(startLocation + distanceToScroll * easingFunction(progressPercentage));
            window.scrollTo(0, targetPosition);
            if (Math.round(window.pageYOffset) === targetLocation || progressPercentage === 1) {
                return resolve(target);
            }
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    });
}

/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/*! exports provided: VApp, VAlert, VAutocomplete, VAvatar, VBadge, VBottomNav, VBottomSheet, VBreadcrumbs, VBreadcrumbsItem, VBreadcrumbsDivider, VBtn, VBtnToggle, VCard, VCardMedia, VCardTitle, VCardActions, VCardText, VCarousel, VCarouselItem, VCheckbox, VChip, VCombobox, VCounter, VDataIterator, VDataTable, VEditDialog, VTableOverflow, VDatePicker, VDatePickerTitle, VDatePickerHeader, VDatePickerDateTable, VDatePickerMonthTable, VDatePickerYears, VDialog, VDivider, VExpansionPanel, VExpansionPanelContent, VFooter, VForm, VContainer, VContent, VFlex, VLayout, VSpacer, VHover, VIcon, VImg, VInput, VItem, VItemGroup, VJumbotron, VLabel, VList, VListGroup, VListTile, VListTileAction, VListTileAvatar, VListTileActionText, VListTileContent, VListTileTitle, VListTileSubTitle, VMenu, VMessages, VNavigationDrawer, VOverflowBtn, VPagination, VPaper, VParallax, VPicker, VProgressCircular, VProgressLinear, VRadioGroup, VRadio, VRangeSlider, VRating, VResponsive, VSelect, VSlider, VSnackbar, VSpeedDial, VStepper, VStepperContent, VStepperStep, VStepperHeader, VStepperItems, VSubheader, VSwitch, VSystemBar, VTabs, VTab, VTabItem, VTabsItems, VTabsSlider, VTextarea, VTextField, VTimeline, VTimelineItem, VTimePicker, VTimePickerClock, VTimePickerTitle, VToolbar, VToolbarSideIcon, VToolbarTitle, VToolbarItems, VTooltip, VTreeview, VTreeviewNode, VWindow, VWindowItem, VBottomSheetTransition, VCarouselTransition, VCarouselReverseTransition, VTabTransition, VTabReverseTransition, VMenuTransition, VFabTransition, VDialogTransition, VDialogBottomTransition, VFadeTransition, VScaleTransition, VScrollXTransition, VScrollXReverseTransition, VScrollYTransition, VScrollYReverseTransition, VSlideXTransition, VSlideXReverseTransition, VSlideYTransition, VSlideYReverseTransition, VExpandTransition, VRowExpandTransition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VApp */ "./src/components/VApp/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VApp", function() { return _VApp__WEBPACK_IMPORTED_MODULE_0__["VApp"]; });

/* harmony import */ var _VAlert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VAlert */ "./src/components/VAlert/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAlert", function() { return _VAlert__WEBPACK_IMPORTED_MODULE_1__["VAlert"]; });

/* harmony import */ var _VAutocomplete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VAutocomplete */ "./src/components/VAutocomplete/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAutocomplete", function() { return _VAutocomplete__WEBPACK_IMPORTED_MODULE_2__["VAutocomplete"]; });

/* harmony import */ var _VAvatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VAvatar */ "./src/components/VAvatar/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAvatar", function() { return _VAvatar__WEBPACK_IMPORTED_MODULE_3__["VAvatar"]; });

/* harmony import */ var _VBadge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VBadge */ "./src/components/VBadge/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBadge", function() { return _VBadge__WEBPACK_IMPORTED_MODULE_4__["VBadge"]; });

/* harmony import */ var _VBottomNav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VBottomNav */ "./src/components/VBottomNav/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBottomNav", function() { return _VBottomNav__WEBPACK_IMPORTED_MODULE_5__["VBottomNav"]; });

/* harmony import */ var _VBottomSheet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VBottomSheet */ "./src/components/VBottomSheet/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBottomSheet", function() { return _VBottomSheet__WEBPACK_IMPORTED_MODULE_6__["VBottomSheet"]; });

/* harmony import */ var _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VBreadcrumbs */ "./src/components/VBreadcrumbs/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBreadcrumbs", function() { return _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__["VBreadcrumbs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBreadcrumbsItem", function() { return _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__["VBreadcrumbsItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBreadcrumbsDivider", function() { return _VBreadcrumbs__WEBPACK_IMPORTED_MODULE_7__["VBreadcrumbsDivider"]; });

/* harmony import */ var _VBtn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VBtn */ "./src/components/VBtn/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBtn", function() { return _VBtn__WEBPACK_IMPORTED_MODULE_8__["VBtn"]; });

/* harmony import */ var _VBtnToggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VBtnToggle */ "./src/components/VBtnToggle/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBtnToggle", function() { return _VBtnToggle__WEBPACK_IMPORTED_MODULE_9__["VBtnToggle"]; });

/* harmony import */ var _VCard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./VCard */ "./src/components/VCard/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCard", function() { return _VCard__WEBPACK_IMPORTED_MODULE_10__["VCard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCardMedia", function() { return _VCard__WEBPACK_IMPORTED_MODULE_10__["VCardMedia"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCardTitle", function() { return _VCard__WEBPACK_IMPORTED_MODULE_10__["VCardTitle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCardActions", function() { return _VCard__WEBPACK_IMPORTED_MODULE_10__["VCardActions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCardText", function() { return _VCard__WEBPACK_IMPORTED_MODULE_10__["VCardText"]; });

/* harmony import */ var _VCarousel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./VCarousel */ "./src/components/VCarousel/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCarousel", function() { return _VCarousel__WEBPACK_IMPORTED_MODULE_11__["VCarousel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCarouselItem", function() { return _VCarousel__WEBPACK_IMPORTED_MODULE_11__["VCarouselItem"]; });

/* harmony import */ var _VCheckbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./VCheckbox */ "./src/components/VCheckbox/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCheckbox", function() { return _VCheckbox__WEBPACK_IMPORTED_MODULE_12__["VCheckbox"]; });

/* harmony import */ var _VChip__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./VChip */ "./src/components/VChip/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VChip", function() { return _VChip__WEBPACK_IMPORTED_MODULE_13__["VChip"]; });

/* harmony import */ var _VCombobox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./VCombobox */ "./src/components/VCombobox/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCombobox", function() { return _VCombobox__WEBPACK_IMPORTED_MODULE_14__["VCombobox"]; });

/* harmony import */ var _VCounter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./VCounter */ "./src/components/VCounter/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCounter", function() { return _VCounter__WEBPACK_IMPORTED_MODULE_15__["VCounter"]; });

/* harmony import */ var _VDataIterator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./VDataIterator */ "./src/components/VDataIterator/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDataIterator", function() { return _VDataIterator__WEBPACK_IMPORTED_MODULE_16__["VDataIterator"]; });

/* harmony import */ var _VDataTable__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./VDataTable */ "./src/components/VDataTable/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDataTable", function() { return _VDataTable__WEBPACK_IMPORTED_MODULE_17__["VDataTable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VEditDialog", function() { return _VDataTable__WEBPACK_IMPORTED_MODULE_17__["VEditDialog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTableOverflow", function() { return _VDataTable__WEBPACK_IMPORTED_MODULE_17__["VTableOverflow"]; });

/* harmony import */ var _VDatePicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./VDatePicker */ "./src/components/VDatePicker/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePicker", function() { return _VDatePicker__WEBPACK_IMPORTED_MODULE_18__["VDatePicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerTitle", function() { return _VDatePicker__WEBPACK_IMPORTED_MODULE_18__["VDatePickerTitle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerHeader", function() { return _VDatePicker__WEBPACK_IMPORTED_MODULE_18__["VDatePickerHeader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerDateTable", function() { return _VDatePicker__WEBPACK_IMPORTED_MODULE_18__["VDatePickerDateTable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerMonthTable", function() { return _VDatePicker__WEBPACK_IMPORTED_MODULE_18__["VDatePickerMonthTable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDatePickerYears", function() { return _VDatePicker__WEBPACK_IMPORTED_MODULE_18__["VDatePickerYears"]; });

/* harmony import */ var _VDialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./VDialog */ "./src/components/VDialog/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDialog", function() { return _VDialog__WEBPACK_IMPORTED_MODULE_19__["VDialog"]; });

/* harmony import */ var _VDivider__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./VDivider */ "./src/components/VDivider/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDivider", function() { return _VDivider__WEBPACK_IMPORTED_MODULE_20__["VDivider"]; });

/* harmony import */ var _VExpansionPanel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./VExpansionPanel */ "./src/components/VExpansionPanel/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VExpansionPanel", function() { return _VExpansionPanel__WEBPACK_IMPORTED_MODULE_21__["VExpansionPanel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VExpansionPanelContent", function() { return _VExpansionPanel__WEBPACK_IMPORTED_MODULE_21__["VExpansionPanelContent"]; });

/* harmony import */ var _VFooter__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./VFooter */ "./src/components/VFooter/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VFooter", function() { return _VFooter__WEBPACK_IMPORTED_MODULE_22__["VFooter"]; });

/* harmony import */ var _VForm__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./VForm */ "./src/components/VForm/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VForm", function() { return _VForm__WEBPACK_IMPORTED_MODULE_23__["VForm"]; });

/* harmony import */ var _VGrid__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./VGrid */ "./src/components/VGrid/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VContainer", function() { return _VGrid__WEBPACK_IMPORTED_MODULE_24__["VContainer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VContent", function() { return _VGrid__WEBPACK_IMPORTED_MODULE_24__["VContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VFlex", function() { return _VGrid__WEBPACK_IMPORTED_MODULE_24__["VFlex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VLayout", function() { return _VGrid__WEBPACK_IMPORTED_MODULE_24__["VLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSpacer", function() { return _VGrid__WEBPACK_IMPORTED_MODULE_24__["VSpacer"]; });

/* harmony import */ var _VHover__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./VHover */ "./src/components/VHover/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VHover", function() { return _VHover__WEBPACK_IMPORTED_MODULE_25__["VHover"]; });

/* harmony import */ var _VIcon__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./VIcon */ "./src/components/VIcon/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VIcon", function() { return _VIcon__WEBPACK_IMPORTED_MODULE_26__["VIcon"]; });

/* harmony import */ var _VImg__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./VImg */ "./src/components/VImg/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VImg", function() { return _VImg__WEBPACK_IMPORTED_MODULE_27__["VImg"]; });

/* harmony import */ var _VInput__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./VInput */ "./src/components/VInput/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VInput", function() { return _VInput__WEBPACK_IMPORTED_MODULE_28__["VInput"]; });

/* harmony import */ var _VItemGroup__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./VItemGroup */ "./src/components/VItemGroup/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VItem", function() { return _VItemGroup__WEBPACK_IMPORTED_MODULE_29__["VItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VItemGroup", function() { return _VItemGroup__WEBPACK_IMPORTED_MODULE_29__["VItemGroup"]; });

/* harmony import */ var _VJumbotron__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./VJumbotron */ "./src/components/VJumbotron/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VJumbotron", function() { return _VJumbotron__WEBPACK_IMPORTED_MODULE_30__["VJumbotron"]; });

/* harmony import */ var _VLabel__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./VLabel */ "./src/components/VLabel/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VLabel", function() { return _VLabel__WEBPACK_IMPORTED_MODULE_31__["VLabel"]; });

/* harmony import */ var _VList__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./VList */ "./src/components/VList/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VList", function() { return _VList__WEBPACK_IMPORTED_MODULE_32__["VList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListGroup", function() { return _VList__WEBPACK_IMPORTED_MODULE_32__["VListGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTile", function() { return _VList__WEBPACK_IMPORTED_MODULE_32__["VListTile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTileAction", function() { return _VList__WEBPACK_IMPORTED_MODULE_32__["VListTileAction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTileAvatar", function() { return _VList__WEBPACK_IMPORTED_MODULE_32__["VListTileAvatar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTileActionText", function() { return _VList__WEBPACK_IMPORTED_MODULE_32__["VListTileActionText"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTileContent", function() { return _VList__WEBPACK_IMPORTED_MODULE_32__["VListTileContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTileTitle", function() { return _VList__WEBPACK_IMPORTED_MODULE_32__["VListTileTitle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VListTileSubTitle", function() { return _VList__WEBPACK_IMPORTED_MODULE_32__["VListTileSubTitle"]; });

/* harmony import */ var _VMenu__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./VMenu */ "./src/components/VMenu/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VMenu", function() { return _VMenu__WEBPACK_IMPORTED_MODULE_33__["VMenu"]; });

/* harmony import */ var _VMessages__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./VMessages */ "./src/components/VMessages/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VMessages", function() { return _VMessages__WEBPACK_IMPORTED_MODULE_34__["VMessages"]; });

/* harmony import */ var _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./VNavigationDrawer */ "./src/components/VNavigationDrawer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VNavigationDrawer", function() { return _VNavigationDrawer__WEBPACK_IMPORTED_MODULE_35__["VNavigationDrawer"]; });

/* harmony import */ var _VOverflowBtn__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./VOverflowBtn */ "./src/components/VOverflowBtn/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VOverflowBtn", function() { return _VOverflowBtn__WEBPACK_IMPORTED_MODULE_36__["VOverflowBtn"]; });

/* harmony import */ var _VPagination__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./VPagination */ "./src/components/VPagination/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VPagination", function() { return _VPagination__WEBPACK_IMPORTED_MODULE_37__["VPagination"]; });

/* harmony import */ var _VPaper__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./VPaper */ "./src/components/VPaper/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VPaper", function() { return _VPaper__WEBPACK_IMPORTED_MODULE_38__["VPaper"]; });

/* harmony import */ var _VParallax__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./VParallax */ "./src/components/VParallax/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VParallax", function() { return _VParallax__WEBPACK_IMPORTED_MODULE_39__["VParallax"]; });

/* harmony import */ var _VPicker__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./VPicker */ "./src/components/VPicker/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VPicker", function() { return _VPicker__WEBPACK_IMPORTED_MODULE_40__["VPicker"]; });

/* harmony import */ var _VProgressCircular__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./VProgressCircular */ "./src/components/VProgressCircular/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VProgressCircular", function() { return _VProgressCircular__WEBPACK_IMPORTED_MODULE_41__["VProgressCircular"]; });

/* harmony import */ var _VProgressLinear__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./VProgressLinear */ "./src/components/VProgressLinear/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VProgressLinear", function() { return _VProgressLinear__WEBPACK_IMPORTED_MODULE_42__["VProgressLinear"]; });

/* harmony import */ var _VRadioGroup__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./VRadioGroup */ "./src/components/VRadioGroup/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VRadioGroup", function() { return _VRadioGroup__WEBPACK_IMPORTED_MODULE_43__["VRadioGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VRadio", function() { return _VRadioGroup__WEBPACK_IMPORTED_MODULE_43__["VRadio"]; });

/* harmony import */ var _VRangeSlider__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./VRangeSlider */ "./src/components/VRangeSlider/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VRangeSlider", function() { return _VRangeSlider__WEBPACK_IMPORTED_MODULE_44__["VRangeSlider"]; });

/* harmony import */ var _VRating__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./VRating */ "./src/components/VRating/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VRating", function() { return _VRating__WEBPACK_IMPORTED_MODULE_45__["VRating"]; });

/* harmony import */ var _VResponsive__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./VResponsive */ "./src/components/VResponsive/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VResponsive", function() { return _VResponsive__WEBPACK_IMPORTED_MODULE_46__["VResponsive"]; });

/* harmony import */ var _VSelect__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./VSelect */ "./src/components/VSelect/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSelect", function() { return _VSelect__WEBPACK_IMPORTED_MODULE_47__["VSelect"]; });

/* harmony import */ var _VSlider__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./VSlider */ "./src/components/VSlider/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSlider", function() { return _VSlider__WEBPACK_IMPORTED_MODULE_48__["VSlider"]; });

/* harmony import */ var _VSnackbar__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./VSnackbar */ "./src/components/VSnackbar/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSnackbar", function() { return _VSnackbar__WEBPACK_IMPORTED_MODULE_49__["VSnackbar"]; });

/* harmony import */ var _VSpeedDial__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./VSpeedDial */ "./src/components/VSpeedDial/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSpeedDial", function() { return _VSpeedDial__WEBPACK_IMPORTED_MODULE_50__["VSpeedDial"]; });

/* harmony import */ var _VStepper__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./VStepper */ "./src/components/VStepper/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VStepper", function() { return _VStepper__WEBPACK_IMPORTED_MODULE_51__["VStepper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VStepperContent", function() { return _VStepper__WEBPACK_IMPORTED_MODULE_51__["VStepperContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VStepperStep", function() { return _VStepper__WEBPACK_IMPORTED_MODULE_51__["VStepperStep"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VStepperHeader", function() { return _VStepper__WEBPACK_IMPORTED_MODULE_51__["VStepperHeader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VStepperItems", function() { return _VStepper__WEBPACK_IMPORTED_MODULE_51__["VStepperItems"]; });

/* harmony import */ var _VSubheader__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./VSubheader */ "./src/components/VSubheader/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSubheader", function() { return _VSubheader__WEBPACK_IMPORTED_MODULE_52__["VSubheader"]; });

/* harmony import */ var _VSwitch__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./VSwitch */ "./src/components/VSwitch/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSwitch", function() { return _VSwitch__WEBPACK_IMPORTED_MODULE_53__["VSwitch"]; });

/* harmony import */ var _VSystemBar__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./VSystemBar */ "./src/components/VSystemBar/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSystemBar", function() { return _VSystemBar__WEBPACK_IMPORTED_MODULE_54__["VSystemBar"]; });

/* harmony import */ var _VTabs__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./VTabs */ "./src/components/VTabs/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabs", function() { return _VTabs__WEBPACK_IMPORTED_MODULE_55__["VTabs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTab", function() { return _VTabs__WEBPACK_IMPORTED_MODULE_55__["VTab"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabItem", function() { return _VTabs__WEBPACK_IMPORTED_MODULE_55__["VTabItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabsItems", function() { return _VTabs__WEBPACK_IMPORTED_MODULE_55__["VTabsItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabsSlider", function() { return _VTabs__WEBPACK_IMPORTED_MODULE_55__["VTabsSlider"]; });

/* harmony import */ var _VTextarea__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./VTextarea */ "./src/components/VTextarea/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTextarea", function() { return _VTextarea__WEBPACK_IMPORTED_MODULE_56__["VTextarea"]; });

/* harmony import */ var _VTextField__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./VTextField */ "./src/components/VTextField/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTextField", function() { return _VTextField__WEBPACK_IMPORTED_MODULE_57__["VTextField"]; });

/* harmony import */ var _VTimeline__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./VTimeline */ "./src/components/VTimeline/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimeline", function() { return _VTimeline__WEBPACK_IMPORTED_MODULE_58__["VTimeline"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimelineItem", function() { return _VTimeline__WEBPACK_IMPORTED_MODULE_58__["VTimelineItem"]; });

/* harmony import */ var _VTimePicker__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./VTimePicker */ "./src/components/VTimePicker/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimePicker", function() { return _VTimePicker__WEBPACK_IMPORTED_MODULE_59__["VTimePicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimePickerClock", function() { return _VTimePicker__WEBPACK_IMPORTED_MODULE_59__["VTimePickerClock"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTimePickerTitle", function() { return _VTimePicker__WEBPACK_IMPORTED_MODULE_59__["VTimePickerTitle"]; });

/* harmony import */ var _VToolbar__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./VToolbar */ "./src/components/VToolbar/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VToolbar", function() { return _VToolbar__WEBPACK_IMPORTED_MODULE_60__["VToolbar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VToolbarSideIcon", function() { return _VToolbar__WEBPACK_IMPORTED_MODULE_60__["VToolbarSideIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VToolbarTitle", function() { return _VToolbar__WEBPACK_IMPORTED_MODULE_60__["VToolbarTitle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VToolbarItems", function() { return _VToolbar__WEBPACK_IMPORTED_MODULE_60__["VToolbarItems"]; });

/* harmony import */ var _VTooltip__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./VTooltip */ "./src/components/VTooltip/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTooltip", function() { return _VTooltip__WEBPACK_IMPORTED_MODULE_61__["VTooltip"]; });

/* harmony import */ var _VTreeview__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./VTreeview */ "./src/components/VTreeview/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTreeview", function() { return _VTreeview__WEBPACK_IMPORTED_MODULE_62__["VTreeview"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTreeviewNode", function() { return _VTreeview__WEBPACK_IMPORTED_MODULE_62__["VTreeviewNode"]; });

/* harmony import */ var _VWindow__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./VWindow */ "./src/components/VWindow/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VWindow", function() { return _VWindow__WEBPACK_IMPORTED_MODULE_63__["VWindow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VWindowItem", function() { return _VWindow__WEBPACK_IMPORTED_MODULE_63__["VWindowItem"]; });

/* harmony import */ var _transitions__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./transitions */ "./src/components/transitions/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VBottomSheetTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VBottomSheetTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCarouselTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VCarouselTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VCarouselReverseTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VCarouselReverseTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VTabTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VTabReverseTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VTabReverseTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VMenuTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VMenuTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VFabTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VFabTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDialogTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VDialogTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VDialogBottomTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VDialogBottomTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VFadeTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VFadeTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VScaleTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VScaleTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VScrollXTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VScrollXTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VScrollXReverseTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VScrollXReverseTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VScrollYTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VScrollYTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VScrollYReverseTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VScrollYReverseTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSlideXTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VSlideXTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSlideXReverseTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VSlideXReverseTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSlideYTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VSlideYTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VSlideYReverseTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VSlideYReverseTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VExpandTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VExpandTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VRowExpandTransition", function() { return _transitions__WEBPACK_IMPORTED_MODULE_64__["VRowExpandTransition"]; });



































































/***/ }),

/***/ "./src/components/transitions/expand-transition.js":
/*!*********************************************************!*\
  !*** ./src/components/transitions/expand-transition.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");

/* harmony default export */ __webpack_exports__["default"] = (function (expandedParentClass) {
    if (expandedParentClass === void 0) {
        expandedParentClass = '';
    }
    return {
        enter: function enter(el, done) {
            el._parent = el.parentNode;
            el._height = el._height != null ? el._height : el.style.height;
            Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["addOnceEventListener"])(el, 'transitionend', done);
            // Get height that is to be scrolled
            el.style.overflow = 'hidden';
            el.style.height = 0;
            el.style.display = 'block';
            expandedParentClass && el._parent.classList.add(expandedParentClass);
            setTimeout(function () {
                el.style.height = el._height || (!el.scrollHeight ? 'auto' : el.scrollHeight + "px");
            }, 100);
        },
        afterEnter: function afterEnter(el) {
            el.style.overflow = null;
            // If user supplied height
            // leave it
            if (el._height) return;
            el.style.height = null;
        },
        leave: function leave(el, done) {
            // Remove initial transition
            Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["addOnceEventListener"])(el, 'transitionend', done);
            // Set height before we transition to 0
            el.style.overflow = 'hidden';
            // If no user supplied height
            // pass in the scrollHeight
            if (!el._height) {
                el.style.height = el.scrollHeight + "px";
            }
            setTimeout(function () {
                return el.style.height = 0;
            }, 100);
        },
        afterLeave: function afterLeave(el) {
            expandedParentClass && el._parent && el._parent.classList.remove(expandedParentClass);
            // If user supplied height
            // leave it
            if (el._height) return;
            el.style.height = null;
        }
    };
});

/***/ }),

/***/ "./src/components/transitions/index.js":
/*!*********************************************!*\
  !*** ./src/components/transitions/index.js ***!
  \*********************************************/
/*! exports provided: VBottomSheetTransition, VCarouselTransition, VCarouselReverseTransition, VTabTransition, VTabReverseTransition, VMenuTransition, VFabTransition, VDialogTransition, VDialogBottomTransition, VFadeTransition, VScaleTransition, VScrollXTransition, VScrollXReverseTransition, VScrollYTransition, VScrollYReverseTransition, VSlideXTransition, VSlideXReverseTransition, VSlideYTransition, VSlideYReverseTransition, VExpandTransition, VRowExpandTransition, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VBottomSheetTransition", function() { return VBottomSheetTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCarouselTransition", function() { return VCarouselTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCarouselReverseTransition", function() { return VCarouselReverseTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VTabTransition", function() { return VTabTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VTabReverseTransition", function() { return VTabReverseTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VMenuTransition", function() { return VMenuTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VFabTransition", function() { return VFabTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VDialogTransition", function() { return VDialogTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VDialogBottomTransition", function() { return VDialogBottomTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VFadeTransition", function() { return VFadeTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VScaleTransition", function() { return VScaleTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VScrollXTransition", function() { return VScrollXTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VScrollXReverseTransition", function() { return VScrollXReverseTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VScrollYTransition", function() { return VScrollYTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VScrollYReverseTransition", function() { return VScrollYReverseTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VSlideXTransition", function() { return VSlideXTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VSlideXReverseTransition", function() { return VSlideXReverseTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VSlideYTransition", function() { return VSlideYTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VSlideYReverseTransition", function() { return VSlideYReverseTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VExpandTransition", function() { return VExpandTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VRowExpandTransition", function() { return VRowExpandTransition; });
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _expand_transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expand-transition */ "./src/components/transitions/expand-transition.js");


// Component specific transitions
var VBottomSheetTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('bottom-sheet-transition');
var VCarouselTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('carousel-transition');
var VCarouselReverseTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('carousel-reverse-transition');
var VTabTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('tab-transition');
var VTabReverseTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('tab-reverse-transition');
var VMenuTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('menu-transition');
var VFabTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('fab-transition', 'center center', 'out-in');
// Generic transitions
var VDialogTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('dialog-transition');
var VDialogBottomTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('dialog-bottom-transition');
var VFadeTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('fade-transition');
var VScaleTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('scale-transition');
var VScrollXTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('scroll-x-transition');
var VScrollXReverseTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('scroll-x-reverse-transition');
var VScrollYTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('scroll-y-transition');
var VScrollYReverseTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('scroll-y-reverse-transition');
var VSlideXTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('slide-x-transition');
var VSlideXReverseTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('slide-x-reverse-transition');
var VSlideYTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('slide-y-transition');
var VSlideYReverseTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createSimpleTransition"])('slide-y-reverse-transition');
// JavaScript transitions
var VExpandTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createJavaScriptTransition"])('expand-transition', Object(_expand_transition__WEBPACK_IMPORTED_MODULE_1__["default"])());
var VRowExpandTransition = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["createJavaScriptTransition"])('row-expand-transition', Object(_expand_transition__WEBPACK_IMPORTED_MODULE_1__["default"])('datatable__expand-col--expanded'));
/* harmony default export */ __webpack_exports__["default"] = ({
    $_vuetify_subcomponents: {
        VBottomSheetTransition: VBottomSheetTransition,
        VCarouselTransition: VCarouselTransition,
        VCarouselReverseTransition: VCarouselReverseTransition,
        VDialogTransition: VDialogTransition,
        VDialogBottomTransition: VDialogBottomTransition,
        VFabTransition: VFabTransition,
        VFadeTransition: VFadeTransition,
        VMenuTransition: VMenuTransition,
        VScaleTransition: VScaleTransition,
        VScrollXTransition: VScrollXTransition,
        VScrollXReverseTransition: VScrollXReverseTransition,
        VScrollYTransition: VScrollYTransition,
        VScrollYReverseTransition: VScrollYReverseTransition,
        VSlideXTransition: VSlideXTransition,
        VSlideXReverseTransition: VSlideXReverseTransition,
        VSlideYTransition: VSlideYTransition,
        VSlideYReverseTransition: VSlideYReverseTransition,
        VTabReverseTransition: VTabReverseTransition,
        VTabTransition: VTabTransition,
        VExpandTransition: VExpandTransition,
        VRowExpandTransition: VRowExpandTransition
    }
});

/***/ }),

/***/ "./src/directives/click-outside.ts":
/*!*****************************************!*\
  !*** ./src/directives/click-outside.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __values = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
function closeConditional() {
    return false;
}
function directive(e, el, binding) {
    // Args may not always be supplied
    binding.args = binding.args || {};
    // If no closeConditional was supplied assign a default
    var isActive = binding.args.closeConditional || closeConditional;
    // The include element callbacks below can be expensive
    // so we should avoid calling them when we're not active.
    // Explicitly check for false to allow fallback compatibility
    // with non-toggleable components
    if (!e || isActive(e) === false) return;
    // If click was triggered programmaticaly (domEl.click()) then
    // it shouldn't be treated as click-outside
    // Chrome/Firefox support isTrusted property
    // IE/Edge support pointerType property (empty if not triggered
    // by pointing device)
    if ('isTrusted' in e && !e.isTrusted || 'pointerType' in e && !e.pointerType) return;
    // Check if additional elements were passed to be included in check
    // (click must be outside all included elements, if any)
    var elements = (binding.args.include || function () {
        return [];
    })();
    // Add the root element for the component this directive was defined on
    elements.push(el);
    // Check if it's a click outside our elements, and then if our callback returns true.
    // Non-toggleable components should take action in their callback and return falsy.
    // Toggleable can return true if it wants to deactivate.
    // Note that, because we're in the capture phase, this callback will occure before
    // the bubbling click event on any outside elements.
    !clickedInEls(e, elements) && setTimeout(function () {
        isActive(e) && binding.value(e);
    }, 0);
}
function clickedInEls(e, elements) {
    var e_1, _a;
    // Get position of click
    var x = e.clientX,
        y = e.clientY;
    try {
        // Loop over all included elements to see if click was in any of them
        for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
            var el = elements_1_1.value;
            if (clickedInEl(el, x, y)) return true;
        }
    } catch (e_1_1) {
        e_1 = { error: e_1_1 };
    } finally {
        try {
            if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
        } finally {
            if (e_1) throw e_1.error;
        }
    }
    return false;
}
function clickedInEl(el, x, y) {
    // Get bounding rect for element
    // (we're in capturing event and we want to check for multiple elements,
    //  so can't use target.)
    var b = el.getBoundingClientRect();
    // Check if the click was in the element's bounding rect
    return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
}
/* harmony default export */ __webpack_exports__["default"] = ({
    // [data-app] may not be found
    // if using bind, inserted makes
    // sure that the root element is
    // available, iOS does not support
    // clicks on body
    inserted: function inserted(el, binding) {
        var onClick = function onClick(e) {
            return directive(e, el, binding);
        };
        // iOS does not recognize click events on document
        // or body, this is the entire purpose of the v-app
        // component and [data-app], stop removing this
        var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
        app.addEventListener('click', onClick, true);
        el._clickOutside = onClick;
    },
    unbind: function unbind(el) {
        if (!el._clickOutside) return;
        var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
        app && app.removeEventListener('click', el._clickOutside, true);
        delete el._clickOutside;
    }
});

/***/ }),

/***/ "./src/directives/index.ts":
/*!*********************************!*\
  !*** ./src/directives/index.ts ***!
  \*********************************/
/*! exports provided: ClickOutside, Ripple, Resize, Scroll, Touch, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _click_outside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./click-outside */ "./src/directives/click-outside.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClickOutside", function() { return _click_outside__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _resize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resize */ "./src/directives/resize.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Resize", function() { return _resize__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ripple__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ripple */ "./src/directives/ripple.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Ripple", function() { return _ripple__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scroll */ "./src/directives/scroll.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scroll", function() { return _scroll__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _touch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./touch */ "./src/directives/touch.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Touch", function() { return _touch__WEBPACK_IMPORTED_MODULE_4__["default"]; });







/* harmony default export */ __webpack_exports__["default"] = ({
    ClickOutside: _click_outside__WEBPACK_IMPORTED_MODULE_0__["default"],
    Ripple: _ripple__WEBPACK_IMPORTED_MODULE_2__["default"],
    Resize: _resize__WEBPACK_IMPORTED_MODULE_1__["default"],
    Scroll: _scroll__WEBPACK_IMPORTED_MODULE_3__["default"],
    Touch: _touch__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/directives/resize.ts":
/*!**********************************!*\
  !*** ./src/directives/resize.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function inserted(el, binding) {
    var callback = binding.value;
    var options = binding.options || { passive: true };
    window.addEventListener('resize', callback, options);
    el._onResize = {
        callback: callback,
        options: options
    };
    if (!binding.modifiers || !binding.modifiers.quiet) {
        callback();
    }
}
function unbind(el) {
    if (!el._onResize) return;
    var _a = el._onResize,
        callback = _a.callback,
        options = _a.options;
    window.removeEventListener('resize', callback, options);
    delete el._onResize;
}
/* harmony default export */ __webpack_exports__["default"] = ({
    inserted: inserted,
    unbind: unbind
});

/***/ }),

/***/ "./src/directives/ripple.ts":
/*!**********************************!*\
  !*** ./src/directives/ripple.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function transform(el, value) {
    el.style['transform'] = value;
    el.style['webkitTransform'] = value;
}
function opacity(el, value) {
    el.style['opacity'] = value.toString();
}
var calculate = function calculate(e, el, value) {
    if (value === void 0) {
        value = {};
    }
    var offset = el.getBoundingClientRect();
    var localX = e.clientX - offset.left;
    var localY = e.clientY - offset.top;
    var radius = 0;
    var scale = 0.3;
    if (el._ripple && el._ripple.circle) {
        scale = 0.15;
        radius = el.clientWidth / 2;
        radius = value.center ? radius : radius + Math.sqrt(Math.pow(localX - radius, 2) + Math.pow(localY - radius, 2)) / 4;
    } else {
        radius = Math.sqrt(Math.pow(el.clientWidth, 2) + Math.pow(el.clientHeight, 2)) / 2;
    }
    var centerX = (el.clientWidth - radius * 2) / 2 + "px";
    var centerY = (el.clientHeight - radius * 2) / 2 + "px";
    var x = value.center ? centerX : localX - radius + "px";
    var y = value.center ? centerY : localY - radius + "px";
    return { radius: radius, scale: scale, x: x, y: y, centerX: centerX, centerY: centerY };
};
var ripple = {
    /* eslint-disable max-statements */
    show: function show(e, el, value) {
        if (value === void 0) {
            value = {};
        }
        if (!el._ripple || !el._ripple.enabled) {
            return;
        }
        var container = document.createElement('span');
        var animation = document.createElement('span');
        container.appendChild(animation);
        container.className = 'v-ripple__container';
        if (value.class) {
            container.className += " " + value.class;
        }
        var _a = calculate(e, el, value),
            radius = _a.radius,
            scale = _a.scale,
            x = _a.x,
            y = _a.y,
            centerX = _a.centerX,
            centerY = _a.centerY;
        animation.className = 'v-ripple__animation';
        animation.style.width = radius * 2 + "px";
        animation.style.height = animation.style.width;
        el.appendChild(container);
        var computed = window.getComputedStyle(el);
        if (computed.position === 'static') {
            el.style.position = 'relative';
            el.dataset.previousPosition = 'static';
        }
        animation.classList.add('v-ripple__animation--enter');
        animation.classList.add('v-ripple__animation--visible');
        transform(animation, "translate(" + x + ", " + y + ") scale3d(" + scale + "," + scale + "," + scale + ")");
        opacity(animation, 0);
        animation.dataset.activated = String(performance.now());
        setTimeout(function () {
            animation.classList.remove('v-ripple__animation--enter');
            animation.classList.add('v-ripple__animation--in');
            transform(animation, "translate(" + centerX + ", " + centerY + ") scale3d(1,1,1)");
            opacity(animation, 0.25);
            setTimeout(function () {
                animation.classList.remove('v-ripple__animation--in');
                animation.classList.add('v-ripple__animation--out');
                opacity(animation, 0);
            }, 300);
        }, 0);
    },
    hide: function hide(el) {
        if (!el || !el._ripple || !el._ripple.enabled) return;
        var ripples = el.getElementsByClassName('v-ripple__animation');
        if (ripples.length === 0) return;
        var animation = ripples[ripples.length - 1];
        if (animation.dataset.isHiding) return;else animation.dataset.isHiding = 'true';
        var diff = performance.now() - Number(animation.dataset.activated);
        var delay = Math.max(200 - diff, 0);
        setTimeout(function () {
            animation.classList.remove('v-ripple__animation--out');
            setTimeout(function () {
                var ripples = el.getElementsByClassName('v-ripple__animation');
                if (ripples.length === 1 && el.dataset.previousPosition) {
                    el.style.position = el.dataset.previousPosition;
                    delete el.dataset.previousPosition;
                }
                animation.parentNode && el.removeChild(animation.parentNode);
            }, 300);
        }, delay);
    }
};
function isRippleEnabled(value) {
    return typeof value === 'undefined' || !!value;
}
function rippleShow(e) {
    var value = {};
    var element = e.currentTarget;
    if (!element) return;
    value.center = element._ripple.centered;
    if (element._ripple.class) {
        value.class = element._ripple.class;
    }
    ripple.show(e, element, value);
}
function rippleHide(e) {
    ripple.hide(e.currentTarget);
}
function updateRipple(el, binding, wasEnabled) {
    var enabled = isRippleEnabled(binding.value);
    if (!enabled) {
        ripple.hide(el);
    }
    el._ripple = el._ripple || {};
    el._ripple.enabled = enabled;
    var value = binding.value || {};
    if (value.center) {
        el._ripple.centered = true;
    }
    if (value.class) {
        el._ripple.class = binding.value.class;
    }
    if (value.circle) {
        el._ripple.circle = value.circle;
    }
    if (enabled && !wasEnabled) {
        if ('ontouchstart' in window) {
            el.addEventListener('touchend', rippleHide, false);
            el.addEventListener('touchcancel', rippleHide, false);
        }
        el.addEventListener('mousedown', rippleShow, false);
        el.addEventListener('mouseup', rippleHide, false);
        el.addEventListener('mouseleave', rippleHide, false);
        // Anchor tags can be dragged, causes other hides to fail - #1537
        el.addEventListener('dragstart', rippleHide, false);
    } else if (!enabled && wasEnabled) {
        removeListeners(el);
    }
}
function removeListeners(el) {
    el.removeEventListener('mousedown', rippleShow, false);
    el.removeEventListener('touchend', rippleHide, false);
    el.removeEventListener('touchcancel', rippleHide, false);
    el.removeEventListener('mouseup', rippleHide, false);
    el.removeEventListener('mouseleave', rippleHide, false);
    el.removeEventListener('dragstart', rippleHide, false);
}
function directive(el, binding) {
    updateRipple(el, binding, false);
}
function unbind(el) {
    delete el._ripple;
    removeListeners(el);
}
function update(el, binding) {
    if (binding.value === binding.oldValue) {
        return;
    }
    var wasEnabled = isRippleEnabled(binding.oldValue);
    updateRipple(el, binding, wasEnabled);
}
/* harmony default export */ __webpack_exports__["default"] = ({
    bind: directive,
    unbind: unbind,
    update: update
});

/***/ }),

/***/ "./src/directives/scroll.ts":
/*!**********************************!*\
  !*** ./src/directives/scroll.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function inserted(el, binding) {
    var callback = binding.value;
    var options = binding.options || { passive: true };
    var target = binding.arg ? document.querySelector(binding.arg) : window;
    if (!target) return;
    target.addEventListener('scroll', callback, options);
    el._onScroll = {
        callback: callback,
        options: options,
        target: target
    };
}
function unbind(el) {
    if (!el._onScroll) return;
    var _a = el._onScroll,
        callback = _a.callback,
        options = _a.options,
        target = _a.target;
    target.removeEventListener('scroll', callback, options);
    delete el._onScroll;
}
/* harmony default export */ __webpack_exports__["default"] = ({
    inserted: inserted,
    unbind: unbind
});

/***/ }),

/***/ "./src/directives/touch.ts":
/*!*********************************!*\
  !*** ./src/directives/touch.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");

var handleGesture = function handleGesture(wrapper) {
    var touchstartX = wrapper.touchstartX,
        touchendX = wrapper.touchendX,
        touchstartY = wrapper.touchstartY,
        touchendY = wrapper.touchendY;
    var dirRatio = 0.5;
    var minDistance = 16;
    wrapper.offsetX = touchendX - touchstartX;
    wrapper.offsetY = touchendY - touchstartY;
    if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
        wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
        wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
    }
    if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
        wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
        wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
    }
};
function _touchstart(event, wrapper) {
    var touch = event.changedTouches[0];
    wrapper.touchstartX = touch.clientX;
    wrapper.touchstartY = touch.clientY;
    wrapper.start && wrapper.start(Object.assign(event, wrapper));
}
function _touchend(event, wrapper) {
    var touch = event.changedTouches[0];
    wrapper.touchendX = touch.clientX;
    wrapper.touchendY = touch.clientY;
    wrapper.end && wrapper.end(Object.assign(event, wrapper));
    handleGesture(wrapper);
}
function _touchmove(event, wrapper) {
    var touch = event.changedTouches[0];
    wrapper.touchmoveX = touch.clientX;
    wrapper.touchmoveY = touch.clientY;
    wrapper.move && wrapper.move(Object.assign(event, wrapper));
}
function createHandlers(value) {
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
    return {
        touchstart: function touchstart(e) {
            return _touchstart(e, wrapper);
        },
        touchend: function touchend(e) {
            return _touchend(e, wrapper);
        },
        touchmove: function touchmove(e) {
            return _touchmove(e, wrapper);
        }
    };
}
function inserted(el, binding, vnode) {
    var value = binding.value;
    var target = value.parent ? el.parentElement : el;
    var options = value.options || { passive: true };
    // Needed to pass unit tests
    if (!target) return;
    var handlers = createHandlers(binding.value);
    target._touchHandlers = Object(target._touchHandlers);
    target._touchHandlers[vnode.context._uid] = handlers;
    Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["keys"])(handlers).forEach(function (eventName) {
        target.addEventListener(eventName, handlers[eventName], options);
    });
}
function unbind(el, binding, vnode) {
    var target = binding.value.parent ? el.parentElement : el;
    if (!target || !target._touchHandlers) return;
    var handlers = target._touchHandlers[vnode.context._uid];
    Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["keys"])(handlers).forEach(function (eventName) {
        target.removeEventListener(eventName, handlers[eventName]);
    });
    delete target._touchHandlers[vnode.context._uid];
}
/* harmony default export */ __webpack_exports__["default"] = ({
    inserted: inserted,
    unbind: unbind
});

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_app_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stylus/app.styl */ "./src/stylus/app.styl");
/* harmony import */ var _stylus_app_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_app_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Vuetify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Vuetify */ "./src/components/Vuetify/index.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/components/index.ts");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives */ "./src/directives/index.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var Vuetify = {
    install: function install(Vue, args) {
        Vue.use(_components_Vuetify__WEBPACK_IMPORTED_MODULE_1__["default"], __assign({ components: _components__WEBPACK_IMPORTED_MODULE_2__,
            directives: _directives__WEBPACK_IMPORTED_MODULE_3__["default"] }, args));
    },
    version: '1.3.3'
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Vuetify);
}
/* harmony default export */ __webpack_exports__["default"] = (Vuetify);

/***/ }),

/***/ "./src/locale/en.ts":
/*!**************************!*\
  !*** ./src/locale/en.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    dataIterator: {
        rowsPerPageText: 'Items per page:',
        rowsPerPageAll: 'All',
        pageText: '{0}-{1} of {2}',
        noResultsText: 'No matching records found',
        nextPage: 'Next page',
        prevPage: 'Previous page'
    },
    dataTable: {
        rowsPerPageText: 'Rows per page:'
    },
    noDataText: 'No data available'
});

/***/ }),

/***/ "./src/mixins/applicationable.ts":
/*!***************************************!*\
  !*** ./src/mixins/applicationable.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return applicationable; });
/* harmony import */ var _positionable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positionable */ "./src/mixins/positionable.ts");
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/mixins */ "./src/util/mixins.ts");

// Util

function applicationable(value, events) {
    if (events === void 0) {
        events = [];
    }
    /* @vue/component */
    return Object(_util_mixins__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_positionable__WEBPACK_IMPORTED_MODULE_0__["factory"])(['absolute', 'fixed'])).extend({
        name: 'applicationable',
        props: {
            app: Boolean
        },
        computed: {
            applicationProperty: function applicationProperty() {
                return value;
            }
        },
        watch: {
            // If previous value was app
            // reset the provided prop
            app: function app(x, prev) {
                prev ? this.removeApplication(true) : this.callUpdate();
            },
            applicationProperty: function applicationProperty(newVal, oldVal) {
                this.$vuetify.application.unbind(this._uid, oldVal);
            }
        },
        activated: function activated() {
            this.callUpdate();
        },
        created: function created() {
            for (var i = 0, length = events.length; i < length; i++) {
                this.$watch(events[i], this.callUpdate);
            }
            this.callUpdate();
        },
        mounted: function mounted() {
            this.callUpdate();
        },
        deactivated: function deactivated() {
            this.removeApplication();
        },
        destroyed: function destroyed() {
            this.removeApplication();
        },
        methods: {
            callUpdate: function callUpdate() {
                if (!this.app) return;
                this.$vuetify.application.bind(this._uid, this.applicationProperty, this.updateApplication());
            },
            removeApplication: function removeApplication(force) {
                if (force === void 0) {
                    force = false;
                }
                if (!force && !this.app) return;
                this.$vuetify.application.unbind(this._uid, this.applicationProperty);
            },
            updateApplication: function updateApplication() {
                return 0;
            }
        }
    });
}

/***/ }),

/***/ "./src/mixins/bootable.ts":
/*!********************************!*\
  !*** ./src/mixins/bootable.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend().extend({
    name: 'bootable',
    props: {
        lazy: Boolean
    },
    data: function data() {
        return {
            isBooted: false
        };
    },
    computed: {
        hasContent: function hasContent() {
            return this.isBooted || !this.lazy || this.isActive;
        }
    },
    watch: {
        isActive: function isActive() {
            this.isBooted = true;
        }
    },
    methods: {
        showLazyContent: function showLazyContent(content) {
            return this.hasContent ? content : undefined;
        }
    }
}));

/***/ }),

/***/ "./src/mixins/button-group.ts":
/*!************************************!*\
  !*** ./src/mixins/button-group.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/VItemGroup/VItemGroup */ "./src/components/VItemGroup/VItemGroup.ts");
// Extensions

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (_components_VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_0__["BaseItemGroup"].extend({
    name: 'button-group',
    provide: function provide() {
        return {
            btnToggle: this
        };
    },
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        }
    },
    computed: {
        classes: function classes() {
            return _components_VItemGroup_VItemGroup__WEBPACK_IMPORTED_MODULE_0__["BaseItemGroup"].options.computed.classes.call(this);
        }
    }
}));

/***/ }),

/***/ "./src/mixins/colorable.ts":
/*!*********************************!*\
  !*** ./src/mixins/colorable.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};

function isCssColor(color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
}
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'colorable',
    props: {
        color: String
    },
    methods: {
        setBackgroundColor: function setBackgroundColor(color, data) {
            if (data === void 0) {
                data = {};
            }
            var _a;
            if (isCssColor(color)) {
                data.style = __assign({}, data.style, { 'background-color': "" + color, 'border-color': "" + color });
            } else if (color) {
                data.class = __assign({}, data.class, (_a = {}, _a[color] = true, _a));
            }
            return data;
        },
        setTextColor: function setTextColor(color, data) {
            if (data === void 0) {
                data = {};
            }
            var _a;
            if (isCssColor(color)) {
                data.style = __assign({}, data.style, { 'color': "" + color, 'caret-color': "" + color });
            } else if (color) {
                var _b = __read(color.toString().trim().split(' ', 2), 2),
                    colorName = _b[0],
                    colorModifier = _b[1];
                data.class = __assign({}, data.class, (_a = {}, _a[colorName + '--text'] = true, _a));
                if (colorModifier) {
                    data.class['text--' + colorModifier] = true;
                }
            }
            return data;
        }
    }
}));

/***/ }),

/***/ "./src/mixins/comparable.ts":
/*!**********************************!*\
  !*** ./src/mixins/comparable.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");


/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'comparable',
    props: {
        valueComparator: {
            type: Function,
            default: _util_helpers__WEBPACK_IMPORTED_MODULE_1__["deepEqual"]
        }
    }
}));

/***/ }),

/***/ "./src/mixins/data-iterable.js":
/*!*************************************!*\
  !*** ./src/mixins/data-iterable.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_VBtn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/VBtn */ "./src/components/VBtn/index.ts");
/* harmony import */ var _components_VIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/VIcon */ "./src/components/VIcon/index.ts");
/* harmony import */ var _components_VSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/VSelect */ "./src/components/VSelect/index.js");
/* harmony import */ var _filterable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filterable */ "./src/mixins/filterable.ts");
/* harmony import */ var _themeable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _loadable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loadable */ "./src/mixins/loadable.ts");
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/console */ "./src/util/console.ts");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};








/**
 * DataIterable
 *
 * @mixin
 *
 * Base behavior for data table and data iterator
 * providing selection, pagination, sorting and filtering.
 *
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'data-iterable',
    mixins: [_filterable__WEBPACK_IMPORTED_MODULE_3__["default"], _loadable__WEBPACK_IMPORTED_MODULE_5__["default"], _themeable__WEBPACK_IMPORTED_MODULE_4__["default"]],
    props: {
        expand: Boolean,
        hideActions: Boolean,
        disableInitialSort: Boolean,
        mustSort: Boolean,
        noResultsText: {
            type: String,
            default: '$vuetify.dataIterator.noResultsText'
        },
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        rowsPerPageItems: {
            type: Array,
            default: function _default() {
                return [5, 10, 25, {
                    text: '$vuetify.dataIterator.rowsPerPageAll',
                    value: -1
                }];
            }
        },
        rowsPerPageText: {
            type: String,
            default: '$vuetify.dataIterator.rowsPerPageText'
        },
        selectAll: [Boolean, String],
        search: {
            required: false
        },
        filter: {
            type: Function,
            default: function _default(val, search) {
                return val != null && typeof val !== 'boolean' && val.toString().toLowerCase().indexOf(search) !== -1;
            }
        },
        customFilter: {
            type: Function,
            default: function _default(items, search, filter) {
                search = search.toString().toLowerCase();
                if (search.trim() === '') return items;
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
                    var _a, _b;
                    var sortA = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["getObjectValueByPath"])(a, index);
                    var sortB = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["getObjectValueByPath"])(b, index);
                    if (isDescending) {
                        _a = __read([sortB, sortA], 2), sortA = _a[0], sortB = _a[1];
                    }
                    // Check if both are numbers
                    if (!isNaN(sortA) && !isNaN(sortB)) {
                        return sortA - sortB;
                    }
                    // Check if both cannot be evaluated
                    if (sortA === null && sortB === null) {
                        return 0;
                    }
                    _b = __read([sortA, sortB].map(function (s) {
                        return (s || '').toString().toLocaleLowerCase();
                    }), 2), sortA = _b[0], sortB = _b[1];
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
        itemKey: {
            type: String,
            default: 'id'
        },
        pagination: {
            type: Object,
            default: function _default() {}
        }
    },
    data: function data() {
        return {
            searchLength: 0,
            defaultPagination: {
                descending: false,
                page: 1,
                rowsPerPage: 5,
                sortBy: null,
                totalItems: 0
            },
            expanded: {},
            actionsClasses: 'v-data-iterator__actions',
            actionsRangeControlsClasses: 'v-data-iterator__actions__range-controls',
            actionsSelectClasses: 'v-data-iterator__actions__select',
            actionsPaginationClasses: 'v-data-iterator__actions__pagination'
        };
    },
    computed: {
        computedPagination: function computedPagination() {
            return this.hasPagination ? this.pagination : this.defaultPagination;
        },
        computedRowsPerPageItems: function computedRowsPerPageItems() {
            var _this = this;
            return this.rowsPerPageItems.map(function (item) {
                return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["isObject"])(item) ? Object.assign({}, item, {
                    text: _this.$vuetify.t(item.text)
                }) : { value: item, text: Number(item).toLocaleString(_this.$vuetify.lang.current) };
            });
        },
        hasPagination: function hasPagination() {
            var pagination = this.pagination || {};
            return Object.keys(pagination).length > 0;
        },
        hasSelectAll: function hasSelectAll() {
            return this.selectAll !== undefined && this.selectAll !== false;
        },
        itemsLength: function itemsLength() {
            if (this.hasSearch) return this.searchLength;
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
            var _this = this;
            return this.filteredItems.some(function (i) {
                return _this.isSelected(i);
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
            return this.filteredItemsImpl();
        },
        selected: function selected() {
            var selected = {};
            for (var index = 0; index < this.value.length; index++) {
                var key = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["getObjectValueByPath"])(this.value[index], this.itemKey);
                selected[key] = true;
            }
            return selected;
        },
        hasSearch: function hasSearch() {
            return this.search != null;
        }
    },
    watch: {
        search: function search() {
            var _this = this;
            this.$nextTick(function () {
                _this.updatePagination({ page: 1, totalItems: _this.itemsLength });
            });
        },
        'computedPagination.sortBy': 'resetPagination',
        'computedPagination.descending': 'resetPagination'
    },
    methods: {
        initPagination: function initPagination() {
            if (!this.rowsPerPageItems.length) {
                Object(_util_console__WEBPACK_IMPORTED_MODULE_7__["consoleWarn"])("The prop 'rows-per-page-items' can not be empty", this);
            } else {
                this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0];
            }
            this.defaultPagination.totalItems = this.items.length;
            this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination));
        },
        updatePagination: function updatePagination(val) {
            var pagination = this.hasPagination ? this.pagination : this.defaultPagination;
            var updatedPagination = Object.assign({}, pagination, val);
            this.$emit('update:pagination', updatedPagination);
            if (!this.hasPagination) {
                this.defaultPagination = updatedPagination;
            }
        },
        isSelected: function isSelected(item) {
            return this.selected[Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["getObjectValueByPath"])(item, this.itemKey)];
        },
        isExpanded: function isExpanded(item) {
            return this.expanded[Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["getObjectValueByPath"])(item, this.itemKey)];
        },
        filteredItemsImpl: function filteredItemsImpl() {
            var additionalFilterArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                additionalFilterArgs[_i] = arguments[_i];
            }
            if (this.totalItems) return this.items;
            var items = this.items.slice();
            if (this.hasSearch) {
                items = this.customFilter.apply(this, __spread([items, this.search, this.filter], additionalFilterArgs));
                this.searchLength = items.length;
            }
            items = this.customSort(items, this.computedPagination.sortBy, this.computedPagination.descending);
            return this.hideActions && !this.hasPagination ? items : items.slice(this.pageStart, this.pageStop);
        },
        resetPagination: function resetPagination() {
            this.computedPagination.page !== 1 && this.updatePagination({ page: 1 });
        },
        sort: function sort(index) {
            var _a = this.computedPagination,
                sortBy = _a.sortBy,
                descending = _a.descending;
            if (sortBy === null) {
                this.updatePagination({ sortBy: index, descending: false });
            } else if (sortBy === index && !descending) {
                this.updatePagination({ descending: true });
            } else if (sortBy !== index) {
                this.updatePagination({ sortBy: index, descending: false });
            } else if (!this.mustSort) {
                this.updatePagination({ sortBy: null, descending: null });
            } else {
                this.updatePagination({ sortBy: index, descending: false });
            }
        },
        toggle: function toggle(value) {
            var _this = this;
            var selected = Object.assign({}, this.selected);
            for (var index = 0; index < this.filteredItems.length; index++) {
                var key = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["getObjectValueByPath"])(this.filteredItems[index], this.itemKey);
                selected[key] = value;
            }
            this.$emit('input', this.items.filter(function (i) {
                var key = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["getObjectValueByPath"])(i, _this.itemKey);
                return selected[key];
            }));
        },
        createProps: function createProps(item, index) {
            var _this = this;
            var props = { item: item, index: index };
            var keyProp = this.itemKey;
            var itemKey = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["getObjectValueByPath"])(item, keyProp);
            Object.defineProperty(props, 'selected', {
                get: function get() {
                    return _this.selected[itemKey];
                },
                set: function set(value) {
                    if (itemKey == null) {
                        Object(_util_console__WEBPACK_IMPORTED_MODULE_7__["consoleWarn"])("\"" + keyProp + "\" attribute must be defined for item", _this);
                    }
                    var selected = _this.value.slice();
                    if (value) selected.push(item);else selected = selected.filter(function (i) {
                        return Object(_util_helpers__WEBPACK_IMPORTED_MODULE_6__["getObjectValueByPath"])(i, keyProp) !== itemKey;
                    });
                    _this.$emit('input', selected);
                }
            });
            Object.defineProperty(props, 'expanded', {
                get: function get() {
                    return _this.expanded[itemKey];
                },
                set: function set(value) {
                    if (itemKey == null) {
                        Object(_util_console__WEBPACK_IMPORTED_MODULE_7__["consoleWarn"])("\"" + keyProp + "\" attribute must be defined for item", _this);
                    }
                    if (!_this.expand) {
                        for (var key in _this.expanded) {
                            _this.expanded.hasOwnProperty(key) && _this.$set(_this.expanded, key, false);
                        }
                    }
                    _this.$set(_this.expanded, itemKey, value);
                }
            });
            return props;
        },
        genItems: function genItems() {
            if (!this.itemsLength && !this.items.length) {
                var noData = this.$slots['no-data'] || this.$vuetify.t(this.noDataText);
                return [this.genEmptyItems(noData)];
            }
            if (!this.filteredItems.length) {
                var noResults = this.$slots['no-results'] || this.$vuetify.t(this.noResultsText);
                return [this.genEmptyItems(noResults)];
            }
            return this.genFilteredItems();
        },
        genPrevIcon: function genPrevIcon() {
            var _this = this;
            return this.$createElement(_components_VBtn__WEBPACK_IMPORTED_MODULE_0__["default"], {
                props: {
                    disabled: this.computedPagination.page === 1,
                    icon: true,
                    flat: true
                },
                on: {
                    click: function click() {
                        var page = _this.computedPagination.page;
                        _this.updatePagination({ page: page - 1 });
                    }
                },
                attrs: {
                    'aria-label': this.$vuetify.t('$vuetify.dataIterator.prevPage')
                }
            }, [this.$createElement(_components_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], this.$vuetify.rtl ? this.nextIcon : this.prevIcon)]);
        },
        genNextIcon: function genNextIcon() {
            var _this = this;
            var pagination = this.computedPagination;
            var disabled = pagination.rowsPerPage < 0 || pagination.page * pagination.rowsPerPage >= this.itemsLength || this.pageStop < 0;
            return this.$createElement(_components_VBtn__WEBPACK_IMPORTED_MODULE_0__["default"], {
                props: {
                    disabled: disabled,
                    icon: true,
                    flat: true
                },
                on: {
                    click: function click() {
                        var page = _this.computedPagination.page;
                        _this.updatePagination({ page: page + 1 });
                    }
                },
                attrs: {
                    'aria-label': this.$vuetify.t('$vuetify.dataIterator.nextPage')
                }
            }, [this.$createElement(_components_VIcon__WEBPACK_IMPORTED_MODULE_1__["default"], this.$vuetify.rtl ? this.prevIcon : this.nextIcon)]);
        },
        genSelect: function genSelect() {
            var _this = this;
            return this.$createElement('div', {
                'class': this.actionsSelectClasses
            }, [this.$vuetify.t(this.rowsPerPageText), this.$createElement(_components_VSelect__WEBPACK_IMPORTED_MODULE_2__["default"], {
                attrs: {
                    'aria-label': this.$vuetify.t(this.rowsPerPageText)
                },
                props: {
                    items: this.computedRowsPerPageItems,
                    value: this.computedPagination.rowsPerPage,
                    hideDetails: true,
                    menuProps: {
                        auto: true,
                        dark: this.dark,
                        light: this.light,
                        minWidth: '75px'
                    }
                },
                on: {
                    input: function input(val) {
                        _this.updatePagination({
                            page: 1,
                            rowsPerPage: val
                        });
                    }
                }
            })]);
        },
        genPagination: function genPagination() {
            var _this = this;
            var _a;
            var pagination = '–';
            if (this.itemsLength) {
                var stop = this.itemsLength < this.pageStop || this.pageStop < 0 ? this.itemsLength : this.pageStop;
                pagination = this.$scopedSlots.pageText ? this.$scopedSlots.pageText({
                    pageStart: this.pageStart + 1,
                    pageStop: stop,
                    itemsLength: this.itemsLength
                }) : (_a = this.$vuetify).t.apply(_a, __spread(['$vuetify.dataIterator.pageText'], [this.pageStart + 1, stop, this.itemsLength].map(function (n) {
                    return Number(n).toLocaleString(_this.$vuetify.lang.current);
                })));
            }
            return this.$createElement('div', {
                'class': this.actionsPaginationClasses
            }, [pagination]);
        },
        genActions: function genActions() {
            var rangeControls = this.$createElement('div', {
                'class': this.actionsRangeControlsClasses
            }, [this.genPagination(), this.genPrevIcon(), this.genNextIcon()]);
            return [this.$createElement('div', {
                'class': this.actionsClasses
            }, [this.$slots['actions-prepend'] ? this.$createElement('div', {}, this.$slots['actions-prepend']) : null, this.rowsPerPageItems.length > 1 ? this.genSelect() : null, rangeControls, this.$slots['actions-append'] ? this.$createElement('div', {}, this.$slots['actions-append']) : null])];
        }
    }
});

/***/ }),

/***/ "./src/mixins/delayable.ts":
/*!*********************************!*\
  !*** ./src/mixins/delayable.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close delay time for elements
 */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'delayable',
    props: {
        openDelay: {
            type: [Number, String],
            default: 0
        },
        closeDelay: {
            type: [Number, String],
            default: 0
        }
    },
    data: function data() {
        return {
            openTimeout: undefined,
            closeTimeout: undefined
        };
    },
    methods: {
        /**
         * Clear any pending delay timers from executing
         */
        clearDelay: function clearDelay() {
            clearTimeout(this.openTimeout);
            clearTimeout(this.closeTimeout);
        },
        /**
         * Runs callback after a specified delay
         */
        runDelay: function runDelay(type, cb) {
            this.clearDelay();
            var delay = parseInt(this[type + "Delay"], 10);
            this[type + "Timeout"] = setTimeout(cb, delay);
        }
    }
}));

/***/ }),

/***/ "./src/mixins/dependent.ts":
/*!*********************************!*\
  !*** ./src/mixins/dependent.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/mixins */ "./src/util/mixins.ts");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};

function searchChildren(children) {
    var results = [];
    for (var index = 0; index < children.length; index++) {
        var child = children[index];
        if (child.isActive && child.isDependent) {
            results.push(child);
        } else {
            results.push.apply(results, __spread(searchChildren(child.$children)));
        }
    }
    return results;
}
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_0__["default"])().extend({
    name: 'dependent',
    data: function data() {
        return {
            closeDependents: true,
            isActive: false,
            isDependent: true
        };
    },
    watch: {
        isActive: function isActive(val) {
            if (val) return;
            var openDependents = this.getOpenDependents();
            for (var index = 0; index < openDependents.length; index++) {
                openDependents[index].isActive = false;
            }
        }
    },
    methods: {
        getOpenDependents: function getOpenDependents() {
            if (this.closeDependents) return searchChildren(this.$children);
            return [];
        },
        getOpenDependentElements: function getOpenDependentElements() {
            var result = [];
            var openDependents = this.getOpenDependents();
            for (var index = 0; index < openDependents.length; index++) {
                result.push.apply(result, __spread(openDependents[index].getClickableDependentElements()));
            }
            return result;
        },
        getClickableDependentElements: function getClickableDependentElements() {
            var result = [this.$el];
            if (this.$refs.content) result.push(this.$refs.content);
            result.push.apply(result, __spread(this.getOpenDependentElements()));
            return result;
        }
    }
}));

/***/ }),

/***/ "./src/mixins/detachable.js":
/*!**********************************!*\
  !*** ./src/mixins/detachable.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bootable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bootable */ "./src/mixins/bootable.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/console */ "./src/util/console.ts");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



function validateAttachTarget(val) {
    var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
    if (type === 'boolean' || type === 'string') return true;
    return val.nodeType === Node.ELEMENT_NODE;
}
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'detachable',
    mixins: [_bootable__WEBPACK_IMPORTED_MODULE_0__["default"]],
    props: {
        attach: {
            type: null,
            default: false,
            validator: validateAttachTarget
        },
        contentClass: {
            default: ''
        }
    },
    data: function data() {
        return {
            hasDetached: false
        };
    },
    watch: {
        attach: function attach() {
            this.hasDetached = false;
            this.initDetach();
        },
        hasContent: 'initDetach'
    },
    mounted: function mounted() {
        !this.lazy && this.initDetach();
    },
    deactivated: function deactivated() {
        this.isActive = false;
    },
    beforeDestroy: function beforeDestroy() {
        if (!this.$refs.content) return;
        // IE11 Fix
        try {
            this.$refs.content.parentNode.removeChild(this.$refs.content);
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        getScopeIdAttrs: function getScopeIdAttrs() {
            var _a;
            var scopeId = this.$vnode && this.$vnode.context.$options._scopeId;
            return scopeId && (_a = {}, _a[scopeId] = '', _a);
        },
        initDetach: function initDetach() {
            if (this._isDestroyed || !this.$refs.content || this.hasDetached ||
            // Leave menu in place if attached
            // and dev has not changed target
            this.attach === '' || // If used as a boolean prop (<v-menu attach>)
            this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
            this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
            ) return;
            var target;
            if (this.attach === false) {
                // Default, detach to app
                target = document.querySelector('[data-app]');
            } else if (typeof this.attach === 'string') {
                // CSS selector
                target = document.querySelector(this.attach);
            } else {
                // DOM Element
                target = this.attach;
            }
            if (!target) {
                Object(_util_console__WEBPACK_IMPORTED_MODULE_1__["consoleWarn"])("Unable to locate target " + (this.attach || '[data-app]'), this);
                return;
            }
            target.insertBefore(this.$refs.content, target.firstChild);
            this.hasDetached = true;
        }
    }
});

/***/ }),

/***/ "./src/mixins/elevatable.ts":
/*!**********************************!*\
  !*** ./src/mixins/elevatable.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'elevatable',
    props: {
        elevation: [Number, String]
    },
    computed: {
        computedElevation: function computedElevation() {
            return this.elevation;
        },
        elevationClasses: function elevationClasses() {
            var _a;
            if (!this.computedElevation) return {};
            return _a = {}, _a["elevation-" + this.computedElevation] = true, _a;
        }
    }
}));

/***/ }),

/***/ "./src/mixins/filterable.ts":
/*!**********************************!*\
  !*** ./src/mixins/filterable.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'filterable',
    props: {
        noDataText: {
            type: String,
            default: '$vuetify.noDataText'
        }
    }
}));

/***/ }),

/***/ "./src/mixins/groupable.ts":
/*!*********************************!*\
  !*** ./src/mixins/groupable.ts ***!
  \*********************************/
/*! exports provided: factory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "factory", function() { return factory; });
/* harmony import */ var _registrable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registrable */ "./src/mixins/registrable.ts");
// Mixins

function factory(namespace, child, parent) {
    return Object(_registrable__WEBPACK_IMPORTED_MODULE_0__["inject"])(namespace, child, parent).extend({
        name: 'groupable',
        props: {
            activeClass: {
                type: String,
                default: function _default() {
                    if (!this[namespace]) return undefined;
                    return this[namespace].activeClass;
                }
            },
            disabled: Boolean
        },
        data: function data() {
            return {
                isActive: false
            };
        },
        computed: {
            groupClasses: function groupClasses() {
                var _a;
                if (!this.activeClass) return {};
                return _a = {}, _a[this.activeClass] = this.isActive, _a;
            }
        },
        created: function created() {
            this[namespace] && this[namespace].register(this);
        },
        beforeDestroy: function beforeDestroy() {
            this[namespace] && this[namespace].unregister(this);
        },
        methods: {
            toggle: function toggle() {
                this.$emit('change');
            }
        }
    });
}
/* eslint-disable-next-line no-redeclare */
var Groupable = factory('itemGroup');
/* harmony default export */ __webpack_exports__["default"] = (Groupable);

/***/ }),

/***/ "./src/mixins/loadable.ts":
/*!********************************!*\
  !*** ./src/mixins/loadable.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_VProgressLinear__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/VProgressLinear */ "./src/components/VProgressLinear/index.ts");


/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend().extend({
    name: 'loadable',
    props: {
        loading: {
            type: [Boolean, String],
            default: false
        }
    },
    methods: {
        genProgress: function genProgress() {
            if (this.loading === false) return null;
            return this.$slots.progress || this.$createElement(_components_VProgressLinear__WEBPACK_IMPORTED_MODULE_1__["default"], {
                props: {
                    color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
                    height: 2,
                    indeterminate: true
                }
            });
        }
    }
}));

/***/ }),

/***/ "./src/mixins/maskable.js":
/*!********************************!*\
  !*** ./src/mixins/maskable.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/mask */ "./src/util/mask.js");
/**
 * Maskable
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 * Example: mask="#### #### #### ####"
 */

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'maskable',
    props: {
        dontFillMaskBlanks: Boolean,
        mask: {
            type: [Object, String],
            default: null
        },
        returnMaskedValue: Boolean
    },
    data: function data() {
        return {
            selection: 0,
            lazySelection: 0,
            preDefined: {
                'credit-card': '#### - #### - #### - ####',
                'date': '##/##/####',
                'date-with-time': '##/##/#### ##:##',
                'phone': '(###) ### - ####',
                'social': '###-##-####',
                'time': '##:##',
                'time-with-seconds': '##:##:##'
            }
        };
    },
    computed: {
        masked: function masked() {
            var preDefined = this.preDefined[this.mask];
            var mask = preDefined || this.mask || '';
            return mask.split('');
        }
    },
    watch: {
        /**
         * Make sure the cursor is in the correct
         * location when the mask changes
         */
        mask: function mask() {
            var _this = this;
            if (!this.$refs.input) return;
            var oldValue = this.$refs.input.value;
            var newValue = this.maskText(Object(_util_mask__WEBPACK_IMPORTED_MODULE_0__["unmaskText"])(this.lazyValue));
            var position = 0;
            var selection = this.selection;
            for (var index = 0; index < selection; index++) {
                Object(_util_mask__WEBPACK_IMPORTED_MODULE_0__["isMaskDelimiter"])(oldValue[index]) || position++;
            }
            selection = 0;
            if (newValue) {
                for (var index = 0; index < newValue.length; index++) {
                    Object(_util_mask__WEBPACK_IMPORTED_MODULE_0__["isMaskDelimiter"])(newValue[index]) || position--;
                    selection++;
                    if (position <= 0) break;
                }
            }
            this.$nextTick(function () {
                _this.$refs.input.value = newValue;
                _this.setCaretPosition(selection);
            });
        }
    },
    beforeMount: function beforeMount() {
        if (!this.mask || this.value == null || !this.returnMaskedValue) return;
        var value = this.maskText(this.value);
        // See if masked value does not
        // match the user given value
        if (value === this.value) return;
        this.$emit('input', value);
    },
    methods: {
        setCaretPosition: function setCaretPosition(selection) {
            var _this = this;
            this.selection = selection;
            window.setTimeout(function () {
                _this.$refs.input && _this.$refs.input.setSelectionRange(_this.selection, _this.selection);
            }, 0);
        },
        updateRange: function updateRange() {
            if (!this.$refs.input) return;
            var newValue = this.maskText(this.lazyValue);
            var selection = 0;
            this.$refs.input.value = newValue;
            if (newValue) {
                for (var index = 0; index < newValue.length; index++) {
                    if (this.lazySelection <= 0) break;
                    Object(_util_mask__WEBPACK_IMPORTED_MODULE_0__["isMaskDelimiter"])(newValue[index]) || this.lazySelection--;
                    selection++;
                }
            }
            this.setCaretPosition(selection);
            // this.$emit() must occur only when all internal values are correct
            this.$emit('input', this.returnMaskedValue ? this.$refs.input.value : this.lazyValue);
        },
        maskText: function maskText(text) {
            return this.mask ? Object(_util_mask__WEBPACK_IMPORTED_MODULE_0__["maskText"])(text, this.masked, this.dontFillMaskBlanks) : text;
        },
        unmaskText: function unmaskText(text) {
            return this.mask && !this.returnMaskedValue ? Object(_util_mask__WEBPACK_IMPORTED_MODULE_0__["unmaskText"])(text) : text;
        },
        // When the input changes and is
        // re-created, ensure that the
        // caret location is correct
        setSelectionRange: function setSelectionRange() {
            this.$nextTick(this.updateRange);
        },
        resetSelections: function resetSelections(input) {
            if (!input.selectionEnd) return;
            this.selection = input.selectionEnd;
            this.lazySelection = 0;
            for (var index = 0; index < this.selection; index++) {
                Object(_util_mask__WEBPACK_IMPORTED_MODULE_0__["isMaskDelimiter"])(input.value[index]) || this.lazySelection++;
            }
        }
    }
});

/***/ }),

/***/ "./src/mixins/measurable.ts":
/*!**********************************!*\
  !*** ./src/mixins/measurable.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
// Helpers

// Types

/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend({
    name: 'measurable',
    props: {
        height: [Number, String],
        maxHeight: [Number, String],
        maxWidth: [Number, String],
        width: [Number, String]
    },
    computed: {
        measurableStyles: function measurableStyles() {
            var styles = {};
            var height = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["convertToUnit"])(this.height);
            var maxHeight = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["convertToUnit"])(this.maxHeight);
            var maxWidth = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["convertToUnit"])(this.maxWidth);
            var width = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["convertToUnit"])(this.width);
            if (height) styles.height = height;
            if (maxHeight) styles.maxHeight = maxHeight;
            if (maxWidth) styles.maxWidth = maxWidth;
            if (width) styles.width = width;
            return styles;
        }
    }
}));

/***/ }),

/***/ "./src/mixins/menuable.js":
/*!********************************!*\
  !*** ./src/mixins/menuable.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _positionable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./positionable */ "./src/mixins/positionable.ts");
/* harmony import */ var _stackable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stackable */ "./src/mixins/stackable.js");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




/* eslint-disable object-property-newline */
var dimensions = {
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
    hasWindow: false
};
/* eslint-enable object-property-newline */
/**
 * Menuable
 *
 * @mixin
 *
 * Used for fixed or absolutely positioning
 * elements within the DOM
 * Can calculate X and Y axis overflows
 * As well as be manually positioned
 */
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'menuable',
    mixins: [_positionable__WEBPACK_IMPORTED_MODULE_1__["default"], _stackable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        activator: {
            default: null,
            validator: function validator(val) {
                return ['string', 'object'].includes(typeof val === 'undefined' ? 'undefined' : _typeof(val));
            }
        },
        allowOverflow: Boolean,
        inputActivator: Boolean,
        light: Boolean,
        dark: Boolean,
        maxWidth: {
            type: [Number, String],
            default: 'auto'
        },
        minWidth: [Number, String],
        nudgeBottom: {
            type: [Number, String],
            default: 0
        },
        nudgeLeft: {
            type: [Number, String],
            default: 0
        },
        nudgeRight: {
            type: [Number, String],
            default: 0
        },
        nudgeTop: {
            type: [Number, String],
            default: 0
        },
        nudgeWidth: {
            type: [Number, String],
            default: 0
        },
        offsetOverflow: Boolean,
        positionX: {
            type: Number,
            default: null
        },
        positionY: {
            type: Number,
            default: null
        },
        zIndex: {
            type: [Number, String],
            default: null
        }
    },
    data: function data() {
        return {
            absoluteX: 0,
            absoluteY: 0,
            dimensions: Object.assign({}, dimensions),
            isContentActive: false,
            pageYOffset: 0,
            stackClass: 'v-menu__content--active',
            stackMinZIndex: 6
        };
    },
    computed: {
        computedLeft: function computedLeft() {
            var a = this.dimensions.activator;
            var c = this.dimensions.content;
            var minWidth = a.width < c.width ? c.width : a.width;
            var left = 0;
            left += this.left ? a.left - (minWidth - a.width) : a.left;
            if (this.offsetX) left += this.left ? -a.width : a.width;
            if (this.nudgeLeft) left -= parseInt(this.nudgeLeft);
            if (this.nudgeRight) left += parseInt(this.nudgeRight);
            return left;
        },
        computedTop: function computedTop() {
            var a = this.dimensions.activator;
            var c = this.dimensions.content;
            var top = this.top ? a.bottom - c.height : a.top;
            if (!this.isAttached) top += this.pageYOffset;
            if (this.offsetY) top += this.top ? -a.height : a.height;
            if (this.nudgeTop) top -= parseInt(this.nudgeTop);
            if (this.nudgeBottom) top += parseInt(this.nudgeBottom);
            return top;
        },
        hasActivator: function hasActivator() {
            return !!this.$slots.activator || this.activator || this.inputActivator;
        },
        isAttached: function isAttached() {
            return this.attach !== false;
        }
    },
    watch: {
        disabled: function disabled(val) {
            val && this.callDeactivate();
        },
        isActive: function isActive(val) {
            if (this.disabled) return;
            val ? this.callActivate() : this.callDeactivate();
        }
    },
    beforeMount: function beforeMount() {
        this.checkForWindow();
    },
    methods: {
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
        activate: function activate() {},
        calcLeft: function calcLeft() {
            return (this.isAttached ? this.computedLeft : this.calcXOverflow(this.computedLeft)) + "px";
        },
        calcTop: function calcTop() {
            return (this.isAttached ? this.computedTop : this.calcYOverflow(this.computedTop)) + "px";
        },
        calcXOverflow: function calcXOverflow(left) {
            var parsedMaxWidth = isNaN(parseInt(this.maxWidth)) ? 0 : parseInt(this.maxWidth);
            var innerWidth = this.getInnerWidth();
            var maxWidth = Math.max(this.dimensions.content.width, parsedMaxWidth);
            var totalWidth = left + maxWidth;
            var availableWidth = totalWidth - innerWidth;
            if ((!this.left || this.right) && availableWidth > 0) {
                left = innerWidth - maxWidth - (innerWidth > 600 ? 30 : 12) // Account for scrollbar
                ;
            }
            if (left < 0) left = 12;
            return left;
        },
        calcYOverflow: function calcYOverflow(top) {
            var documentHeight = this.getInnerHeight();
            var toTop = this.pageYOffset + documentHeight;
            var activator = this.dimensions.activator;
            var contentHeight = this.dimensions.content.height;
            var totalHeight = top + contentHeight;
            var isOverflowing = toTop < totalHeight;
            // If overflowing bottom and offset
            // TODO: set 'bottom' position instead of 'top'
            if (isOverflowing && this.offsetOverflow &&
            // If we don't have enough room to offset
            // the overflow, don't offset
            activator.top > contentHeight) {
                top = this.pageYOffset + (activator.top - contentHeight);
                // If overflowing bottom
            } else if (isOverflowing && !this.allowOverflow) {
                top = toTop - contentHeight - 12;
                // If overflowing top
            } else if (top < this.pageYOffset && !this.allowOverflow) {
                top = this.pageYOffset + 12;
            }
            return top < 12 ? 12 : top;
        },
        callActivate: function callActivate() {
            if (!this.hasWindow) return;
            this.activate();
        },
        callDeactivate: function callDeactivate() {
            this.isContentActive = false;
            this.deactivate();
        },
        checkForWindow: function checkForWindow() {
            if (!this.hasWindow) {
                this.hasWindow = typeof window !== 'undefined';
            }
        },
        checkForPageYOffset: function checkForPageYOffset() {
            if (this.hasWindow) {
                this.pageYOffset = this.getOffsetTop();
            }
        },
        deactivate: function deactivate() {},
        getActivator: function getActivator() {
            if (this.inputActivator) {
                return this.$el.querySelector('.v-input__slot');
            }
            if (this.activator) {
                return typeof this.activator === 'string' ? document.querySelector(this.activator) : this.activator;
            }
            return this.$refs.activator.children.length > 0 ? this.$refs.activator.children[0] : this.$refs.activator;
        },
        getInnerHeight: function getInnerHeight() {
            if (!this.hasWindow) return 0;
            return window.innerHeight || document.documentElement.clientHeight;
        },
        getInnerWidth: function getInnerWidth() {
            if (!this.hasWindow) return 0;
            return window.innerWidth;
        },
        getOffsetTop: function getOffsetTop() {
            if (!this.hasWindow) return 0;
            return window.pageYOffset || document.documentElement.scrollTop;
        },
        getRoundedBoundedClientRect: function getRoundedBoundedClientRect(el) {
            var rect = el.getBoundingClientRect();
            return {
                top: Math.round(rect.top),
                left: Math.round(rect.left),
                bottom: Math.round(rect.bottom),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            };
        },
        measure: function measure(el, selector) {
            el = selector ? el.querySelector(selector) : el;
            if (!el || !this.hasWindow) return null;
            var rect = this.getRoundedBoundedClientRect(el);
            // Account for activator margin
            if (this.isAttached) {
                var style = window.getComputedStyle(el);
                rect.left = parseInt(style.marginLeft);
                rect.top = parseInt(style.marginTop);
            }
            return rect;
        },
        sneakPeek: function sneakPeek(cb) {
            var _this = this;
            requestAnimationFrame(function () {
                var el = _this.$refs.content;
                if (!el || _this.isShown(el)) return cb();
                el.style.display = 'inline-block';
                cb();
                el.style.display = 'none';
            });
        },
        startTransition: function startTransition() {
            var _this = this;
            requestAnimationFrame(function () {
                return _this.isContentActive = true;
            });
        },
        isShown: function isShown(el) {
            return el.style.display !== 'none';
        },
        updateDimensions: function updateDimensions() {
            var _this = this;
            this.checkForWindow();
            this.checkForPageYOffset();
            var dimensions = {};
            // Activator should already be shown
            dimensions.activator = !this.hasActivator || this.absolute ? this.absolutePosition() : this.measure(this.getActivator());
            // Display and hide to get dimensions
            this.sneakPeek(function () {
                dimensions.content = _this.measure(_this.$refs.content);
                _this.dimensions = dimensions;
            });
        }
    }
}));

/***/ }),

/***/ "./src/mixins/overlayable.js":
/*!***********************************!*\
  !*** ./src/mixins/overlayable.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylus_components_overlay_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stylus/components/_overlay.styl */ "./src/stylus/components/_overlay.styl");
/* harmony import */ var _stylus_components_overlay_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_components_overlay_styl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");

// Utils

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'overlayable',
    props: {
        hideOverlay: Boolean
    },
    data: function data() {
        return {
            overlay: null,
            overlayOffset: 0,
            overlayTimeout: null,
            overlayTransitionDuration: 500 + 150 // transition + delay
        };
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
                return this.overlay && this.overlay.classList.add('v-overlay--active');
            }
            this.overlay = document.createElement('div');
            this.overlay.className = 'v-overlay';
            if (this.absolute) this.overlay.className += ' v-overlay--absolute';
            this.hideScroll();
            var parent = this.absolute ? this.$el.parentNode : document.querySelector('[data-app]');
            parent && parent.insertBefore(this.overlay, parent.firstChild);
            // eslint-disable-next-line no-unused-expressions
            this.overlay.clientHeight; // Force repaint
            requestAnimationFrame(function () {
                // https://github.com/vuetifyjs/vuetify/issues/4678
                if (!_this.overlay) return;
                _this.overlay.className += ' v-overlay--active';
                if (_this.activeZIndex !== undefined) {
                    _this.overlay.style.zIndex = _this.activeZIndex - 1;
                }
            });
            return true;
        },
        removeOverlay: function removeOverlay() {
            var _this = this;
            if (!this.overlay) {
                return this.showScroll();
            }
            this.overlay.classList.remove('v-overlay--active');
            this.overlayTimeout = setTimeout(function () {
                // IE11 Fix
                try {
                    if (_this.overlay && _this.overlay.parentNode) {
                        _this.overlay.parentNode.removeChild(_this.overlay);
                    }
                    _this.overlay = null;
                    _this.showScroll();
                } catch (e) {
                    console.log(e);
                }
                clearTimeout(_this.overlayTimeout);
                _this.overlayTimeout = null;
            }, this.overlayTransitionDuration);
        },
        /**
         * @param {Event} e
         * @returns void
         */
        scrollListener: function scrollListener(e) {
            if (e.type === 'keydown') {
                if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) ||
                // https://github.com/vuetifyjs/vuetify/issues/4715
                e.target.isContentEditable) return;
                var up = [_util_helpers__WEBPACK_IMPORTED_MODULE_1__["keyCodes"].up, _util_helpers__WEBPACK_IMPORTED_MODULE_1__["keyCodes"].pageup];
                var down = [_util_helpers__WEBPACK_IMPORTED_MODULE_1__["keyCodes"].down, _util_helpers__WEBPACK_IMPORTED_MODULE_1__["keyCodes"].pagedown];
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
        hasScrollbar: function hasScrollbar(el) {
            if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
            var style = window.getComputedStyle(el);
            return ['auto', 'scroll'].includes(style['overflow-y']) && el.scrollHeight > el.clientHeight;
        },
        shouldScroll: function shouldScroll(el, delta) {
            if (el.scrollTop === 0 && delta < 0) return true;
            return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
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
        /**
         * @param {Event} e
         * @returns boolean
         */
        checkPath: function checkPath(e) {
            var path = e.path || this.composedPath(e);
            var delta = e.deltaY || -e.wheelDelta;
            if (e.type === 'keydown' && path[0] === document.body) {
                var dialog = this.$refs.dialog;
                var selected = window.getSelection().anchorNode;
                if (this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
                    return this.shouldScroll(dialog, delta);
                }
                return true;
            }
            for (var index = 0; index < path.length; index++) {
                var el = path[index];
                if (el === document) return true;
                if (el === document.documentElement) return true;
                if (el === this.$refs.content) return true;
                if (this.hasScrollbar(el)) return this.shouldScroll(el, delta);
            }
            return true;
        },
        /**
         * Polyfill for Event.prototype.composedPath
         * @param {Event} e
         * @returns Element[]
         */
        composedPath: function composedPath(e) {
            if (e.composedPath) return e.composedPath();
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
        hideScroll: function hideScroll() {
            if (this.$vuetify.breakpoint.smAndDown) {
                document.documentElement.classList.add('overflow-y-hidden');
            } else {
                window.addEventListener('wheel', this.scrollListener);
                window.addEventListener('keydown', this.scrollListener);
            }
        },
        showScroll: function showScroll() {
            document.documentElement.classList.remove('overflow-y-hidden');
            window.removeEventListener('wheel', this.scrollListener);
            window.removeEventListener('keydown', this.scrollListener);
        }
    }
});

/***/ }),

/***/ "./src/mixins/picker-button.js":
/*!*************************************!*\
  !*** ./src/mixins/picker-button.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    methods: {
        genPickerButton: function genPickerButton(prop, value, content, readonly, staticClass) {
            var _this = this;
            if (readonly === void 0) {
                readonly = false;
            }
            if (staticClass === void 0) {
                staticClass = '';
            }
            var active = this[prop] === value;
            var click = function click(event) {
                event.stopPropagation();
                _this.$emit("update:" + prop, value);
            };
            return this.$createElement('div', {
                staticClass: ("v-picker__title__btn " + staticClass).trim(),
                'class': {
                    'v-picker__title__btn--active': active,
                    'v-picker__title__btn--readonly': readonly
                },
                on: active || readonly ? undefined : { click: click }
            }, Array.isArray(content) ? content : [content]);
        }
    }
});

/***/ }),

/***/ "./src/mixins/picker.js":
/*!******************************!*\
  !*** ./src/mixins/picker.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_VPicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/VPicker */ "./src/components/VPicker/index.js");
/* harmony import */ var _colorable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorable */ "./src/mixins/colorable.ts");
/* harmony import */ var _themeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./themeable */ "./src/mixins/themeable.ts");
// Components

// Mixins


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'picker',
    mixins: [_colorable__WEBPACK_IMPORTED_MODULE_1__["default"], _themeable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    props: {
        fullWidth: Boolean,
        headerColor: String,
        landscape: Boolean,
        noTitle: Boolean,
        width: {
            type: [Number, String],
            default: 290
        }
    },
    methods: {
        genPickerTitle: function genPickerTitle() {},
        genPickerBody: function genPickerBody() {},
        genPickerActionsSlot: function genPickerActionsSlot() {
            return this.$scopedSlots.default ? this.$scopedSlots.default({
                save: this.save,
                cancel: this.cancel
            }) : this.$slots.default;
        },
        genPicker: function genPicker(staticClass) {
            return this.$createElement(_components_VPicker__WEBPACK_IMPORTED_MODULE_0__["default"], {
                staticClass: staticClass,
                props: {
                    color: this.headerColor || this.color,
                    dark: this.dark,
                    fullWidth: this.fullWidth,
                    landscape: this.landscape,
                    light: this.light,
                    width: this.width
                }
            }, [this.noTitle ? null : this.genPickerTitle(), this.genPickerBody(), this.$createElement('template', { slot: 'actions' }, [this.genPickerActionsSlot()])]);
        }
    }
});

/***/ }),

/***/ "./src/mixins/positionable.ts":
/*!************************************!*\
  !*** ./src/mixins/positionable.ts ***!
  \************************************/
/*! exports provided: factory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "factory", function() { return factory; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");


var availableProps = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
};
function factory(selected) {
  if (selected === void 0) {
    selected = [];
  }
  return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'positionable',
    props: selected.length ? Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__["filterObjectOnKeys"])(availableProps, selected) : availableProps
  });
}
/* harmony default export */ __webpack_exports__["default"] = (factory());
// Add a `*` before the second `/`
/* Tests /
let single = factory(['top']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let some = factory(['top', 'bottom']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let all = factory().extend({
  created () {
    this.top
    this.bottom
    this.absolute
    this.foobar
  }
})
/**/

/***/ }),

/***/ "./src/mixins/proxyable.ts":
/*!*********************************!*\
  !*** ./src/mixins/proxyable.ts ***!
  \*********************************/
/*! exports provided: factory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "factory", function() { return factory; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

function factory(prop, event) {
    if (prop === void 0) {
        prop = 'value';
    }
    if (event === void 0) {
        event = 'change';
    }
    var _a, _b;
    return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
        name: 'proxyable',
        model: {
            prop: prop,
            event: event
        },
        props: (_a = {}, _a[prop] = {
            required: false
        }, _a),
        data: function data() {
            return {
                internalLazyValue: this[prop]
            };
        },
        computed: {
            internalValue: {
                get: function get() {
                    return this.internalLazyValue;
                },
                set: function set(val) {
                    if (val === this.internalLazyValue) return;
                    this.internalLazyValue = val;
                    this.$emit(event, val);
                }
            }
        },
        watch: (_b = {}, _b[prop] = function (val) {
            this.internalLazyValue = val;
        }, _b)
    });
}
/* eslint-disable-next-line no-redeclare */
var Proxyable = factory();
/* harmony default export */ __webpack_exports__["default"] = (Proxyable);

/***/ }),

/***/ "./src/mixins/registrable.ts":
/*!***********************************!*\
  !*** ./src/mixins/registrable.ts ***!
  \***********************************/
/*! exports provided: inject, provide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inject", function() { return inject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "provide", function() { return provide; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/console */ "./src/util/console.ts");


function generateWarning(child, parent) {
    return function () {
        return Object(_util_console__WEBPACK_IMPORTED_MODULE_1__["consoleWarn"])("The " + child + " component must be used inside a " + parent);
    };
}
function inject(namespace, child, parent) {
    var _a;
    var defaultImpl = child && parent ? {
        register: generateWarning(child, parent),
        unregister: generateWarning(child, parent)
    } : null;
    return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
        name: 'registrable-inject',
        inject: (_a = {}, _a[namespace] = {
            default: defaultImpl
        }, _a)
    });
}
function provide(namespace) {
    return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
        name: 'registrable-provide',
        methods: {
            register: null,
            unregister: null
        },
        provide: function provide() {
            var _a;
            return _a = {}, _a[namespace] = {
                register: this.register,
                unregister: this.unregister
            }, _a;
        }
    });
}

/***/ }),

/***/ "./src/mixins/returnable.ts":
/*!**********************************!*\
  !*** ./src/mixins/returnable.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'returnable',
    props: {
        returnValue: null
    },
    data: function data() {
        return {
            isActive: false,
            originalValue: null
        };
    },
    watch: {
        isActive: function isActive(val) {
            if (val) {
                this.originalValue = this.returnValue;
            } else {
                this.$emit('update:returnValue', this.originalValue);
            }
        }
    },
    methods: {
        save: function save(value) {
            this.originalValue = value;
            this.isActive = false;
        }
    }
}));

/***/ }),

/***/ "./src/mixins/rippleable.ts":
/*!**********************************!*\
  !*** ./src/mixins/rippleable.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../directives/ripple */ "./src/directives/ripple.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
// Directives

// Types

/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend({
    name: 'rippleable',
    directives: { Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_0__["default"] },
    props: {
        ripple: {
            type: [Boolean, Object],
            default: true
        }
    },
    methods: {
        genRipple: function genRipple(data) {
            if (data === void 0) {
                data = {};
            }
            if (!this.ripple) return null;
            data.staticClass = 'v-input--selection-controls__ripple';
            data.directives = data.directives || [];
            data.directives.push({
                name: 'ripple',
                value: { center: true }
            });
            data.on = Object.assign({
                click: this.onChange
            }, this.$listeners);
            return this.$createElement('div', data);
        },
        onChange: function onChange() {}
    }
}));

/***/ }),

/***/ "./src/mixins/routable.ts":
/*!********************************!*\
  !*** ./src/mixins/routable.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _directives_ripple__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../directives/ripple */ "./src/directives/ripple.ts");
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'routable',
    directives: {
        Ripple: _directives_ripple__WEBPACK_IMPORTED_MODULE_1__["default"]
    },
    props: {
        activeClass: String,
        append: Boolean,
        disabled: Boolean,
        exact: {
            type: Boolean,
            default: undefined
        },
        exactActiveClass: String,
        href: [String, Object],
        to: [String, Object],
        nuxt: Boolean,
        replace: Boolean,
        ripple: [Boolean, Object],
        tag: String,
        target: String
    },
    computed: {
        computedRipple: function computedRipple() {
            return this.ripple && !this.disabled ? this.ripple : false;
        }
    },
    methods: {
        /* eslint-disable-next-line no-unused-vars */
        click: function click(e) {},
        generateRouteLink: function generateRouteLink(classes) {
            var _a;
            var exact = this.exact;
            var tag;
            var data = (_a = {
                attrs: { disabled: this.disabled },
                class: classes,
                props: {},
                directives: [{
                    name: 'ripple',
                    value: this.computedRipple
                }]
            }, _a[this.to ? 'nativeOn' : 'on'] = __assign({}, this.$listeners, { click: this.click }), _a);
            if (typeof this.exact === 'undefined') {
                exact = this.to === '/' || this.to === Object(this.to) && this.to.path === '/';
            }
            if (this.to) {
                // Add a special activeClass hook
                // for component level styles
                var activeClass = this.activeClass;
                var exactActiveClass = this.exactActiveClass || activeClass;
                // TODO: apply only in VListTile
                if (this.proxyClass) {
                    activeClass += ' ' + this.proxyClass;
                    exactActiveClass += ' ' + this.proxyClass;
                }
                tag = this.nuxt ? 'nuxt-link' : 'router-link';
                Object.assign(data.props, {
                    to: this.to,
                    exact: exact,
                    activeClass: activeClass,
                    exactActiveClass: exactActiveClass,
                    append: this.append,
                    replace: this.replace
                });
            } else {
                tag = this.href && 'a' || this.tag || 'a';
                if (tag === 'a' && this.href) data.attrs.href = this.href;
            }
            if (this.target) data.attrs.target = this.target;
            return { tag: tag, data: data };
        }
    }
}));

/***/ }),

/***/ "./src/mixins/selectable.js":
/*!**********************************!*\
  !*** ./src/mixins/selectable.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_VInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/VInput */ "./src/components/VInput/index.js");
/* harmony import */ var _rippleable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rippleable */ "./src/mixins/rippleable.ts");
/* harmony import */ var _comparable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comparable */ "./src/mixins/comparable.ts");
// Components

// Mixins


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'selectable',
    extends: _components_VInput__WEBPACK_IMPORTED_MODULE_0__["default"],
    mixins: [_rippleable__WEBPACK_IMPORTED_MODULE_1__["default"], _comparable__WEBPACK_IMPORTED_MODULE_2__["default"]],
    model: {
        prop: 'inputValue',
        event: 'change'
    },
    props: {
        color: {
            type: String,
            default: 'accent'
        },
        id: String,
        inputValue: null,
        falseValue: null,
        trueValue: null,
        multiple: {
            type: Boolean,
            default: null
        },
        label: String
    },
    data: function data(vm) {
        return {
            lazyValue: vm.inputValue
        };
    },
    computed: {
        computedColor: function computedColor() {
            return this.isActive ? this.color : this.validationState;
        },
        isMultiple: function isMultiple() {
            return this.multiple === true || this.multiple === null && Array.isArray(this.internalValue);
        },
        isActive: function isActive() {
            var _this = this;
            var value = this.value;
            var input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input)) return false;
                return input.some(function (item) {
                    return _this.valueComparator(item, value);
                });
            }
            if (this.trueValue === undefined || this.falseValue === undefined) {
                return value ? this.valueComparator(value, input) : Boolean(input);
            }
            return this.valueComparator(input, this.trueValue);
        },
        isDirty: function isDirty() {
            return this.isActive;
        }
    },
    watch: {
        inputValue: function inputValue(val) {
            this.lazyValue = val;
        }
    },
    methods: {
        genLabel: function genLabel() {
            if (!this.hasLabel) return null;
            var label = _components_VInput__WEBPACK_IMPORTED_MODULE_0__["default"].methods.genLabel.call(this);
            label.data.on = { click: this.onChange };
            return label;
        },
        genInput: function genInput(type, attrs) {
            return this.$createElement('input', {
                attrs: Object.assign({
                    'aria-label': this.label,
                    'aria-checked': this.isActive.toString(),
                    disabled: this.isDisabled,
                    id: this.id,
                    role: type,
                    type: type,
                    value: this.inputValue
                }, attrs),
                domProps: {
                    checked: this.isActive
                },
                on: {
                    blur: this.onBlur,
                    change: this.onChange,
                    focus: this.onFocus,
                    keydown: this.onKeydown
                },
                ref: 'input'
            });
        },
        onBlur: function onBlur() {
            this.isFocused = false;
        },
        onChange: function onChange() {
            var _this = this;
            if (this.isDisabled) return;
            var value = this.value;
            var input = this.internalValue;
            if (this.isMultiple) {
                if (!Array.isArray(input)) {
                    input = [];
                }
                var length = input.length;
                input = input.filter(function (item) {
                    return !_this.valueComparator(item, value);
                });
                if (input.length === length) {
                    input.push(value);
                }
            } else if (this.trueValue !== undefined && this.falseValue !== undefined) {
                input = this.valueComparator(input, this.trueValue) ? this.falseValue : this.trueValue;
            } else if (value) {
                input = this.valueComparator(input, value) ? null : value;
            } else {
                input = !input;
            }
            this.validate(true, input);
            this.internalValue = input;
        },
        onFocus: function onFocus() {
            this.isFocused = true;
        },
        /** @abstract */
        onKeydown: function onKeydown(e) {}
    }
});

/***/ }),

/***/ "./src/mixins/sizeable.ts":
/*!********************************!*\
  !*** ./src/mixins/sizeable.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'sizeable',
    props: {
        large: Boolean,
        medium: Boolean,
        size: {
            type: [Number, String]
        },
        small: Boolean,
        xLarge: Boolean
    }
}));

/***/ }),

/***/ "./src/mixins/ssr-bootable.ts":
/*!************************************!*\
  !*** ./src/mixins/ssr-bootable.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/**
 * SSRBootable
 *
 * @mixin
 *
 * Used in layout components (drawer, toolbar, content)
 * to avoid an entry animation when using SSR
 */
/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'ssr-bootable',
    data: function data() {
        return {
            isBooted: false
        };
    },
    mounted: function mounted() {
        var _this = this;
        // Use setAttribute instead of dataset
        // because dataset does not work well
        // with unit tests
        window.requestAnimationFrame(function () {
            _this.$el.setAttribute('data-booted', 'true');
            _this.isBooted = true;
        });
    }
}));

/***/ }),

/***/ "./src/mixins/stackable.js":
/*!*********************************!*\
  !*** ./src/mixins/stackable.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'stackable',
    data: function data() {
        return {
            stackBase: null,
            stackClass: 'unpecified',
            stackElement: null,
            stackExclude: null,
            stackMinZIndex: 0
        };
    },
    computed: {
        /**
         * Currently active z-index
         *
         * @return {number}
         */
        activeZIndex: function activeZIndex() {
            if (typeof window === 'undefined') return 0;
            var content = this.stackElement || this.$refs.content;
            // Return current zindex if not active
            var index = !this.isActive ? Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["getZIndex"])(content) : this.getMaxZIndex(this.stackExclude || [content]) + 2;
            if (index == null) return index;
            // Return max current z-index (excluding self) + 2
            // (2 to leave room for an overlay below, if needed)
            return parseInt(index);
        }
    },
    methods: {
        getMaxZIndex: function getMaxZIndex(exclude) {
            if (exclude === void 0) {
                exclude = [];
            }
            var base = this.stackBase || this.$el;
            // Start with lowest allowed z-index or z-index of
            // base component's element, whichever is greater
            var zis = [this.stackMinZIndex, Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["getZIndex"])(base)];
            // Convert the NodeList to an array to
            // prevent an Edge bug with Symbol.iterator
            // https://github.com/vuetifyjs/vuetify/issues/2146
            var activeElements = __spread(document.getElementsByClassName(this.stackClass));
            // Get z-index for all active dialogs
            for (var index = 0; index < activeElements.length; index++) {
                if (!exclude.includes(activeElements[index])) {
                    zis.push(Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["getZIndex"])(activeElements[index]));
                }
            }
            return Math.max.apply(Math, __spread(zis));
        }
    }
});

/***/ }),

/***/ "./src/mixins/themeable.ts":
/*!*********************************!*\
  !*** ./src/mixins/themeable.ts ***!
  \*********************************/
/*! exports provided: functionalThemeClasses, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "functionalThemeClasses", function() { return functionalThemeClasses; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function functionalThemeClasses(context) {
    var vm = __assign({}, context.props, context.injections);
    var isDark = Themeable.options.computed.isDark.call(vm);
    return Themeable.options.computed.themeClasses.call({ isDark: isDark });
}
/* @vue/component */
var Themeable = vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend().extend({
    name: 'themeable',
    provide: function provide() {
        return {
            theme: this.themeableProvide
        };
    },
    inject: {
        theme: {
            default: {
                isDark: false
            }
        }
    },
    props: {
        dark: {
            type: Boolean,
            default: null
        },
        light: {
            type: Boolean,
            default: null
        }
    },
    data: function data() {
        return {
            themeableProvide: {
                isDark: false
            }
        };
    },
    computed: {
        isDark: function isDark() {
            if (this.dark === true) {
                // explicitly dark
                return true;
            } else if (this.light === true) {
                // explicitly light
                return false;
            } else {
                // inherit from parent, or default false if there is none
                return this.theme.isDark;
            }
        },
        themeClasses: function themeClasses() {
            return {
                'theme--dark': this.isDark,
                'theme--light': !this.isDark
            };
        },
        /** Used by menus and dialogs, inherits from v-app instead of the parent */
        rootIsDark: function rootIsDark() {
            if (this.dark === true) {
                // explicitly dark
                return true;
            } else if (this.light === true) {
                // explicitly light
                return false;
            } else {
                // inherit from v-app
                return this.$vuetify.dark;
            }
        },
        rootThemeClasses: function rootThemeClasses() {
            return {
                'theme--dark': this.rootIsDark,
                'theme--light': !this.rootIsDark
            };
        }
    },
    watch: {
        isDark: {
            handler: function handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.themeableProvide.isDark = this.isDark;
                }
            },
            immediate: true
        }
    }
});
/* harmony default export */ __webpack_exports__["default"] = (Themeable);

/***/ }),

/***/ "./src/mixins/toggleable.ts":
/*!**********************************!*\
  !*** ./src/mixins/toggleable.ts ***!
  \**********************************/
/*! exports provided: factory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "factory", function() { return factory; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

function factory(prop, event) {
    if (prop === void 0) {
        prop = 'value';
    }
    if (event === void 0) {
        event = 'input';
    }
    var _a, _b;
    return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
        name: 'toggleable',
        model: { prop: prop, event: event },
        props: (_a = {}, _a[prop] = { required: false }, _a),
        data: function data() {
            return {
                isActive: !!this[prop]
            };
        },
        watch: (_b = {}, _b[prop] = function (val) {
            this.isActive = !!val;
        }, _b.isActive = function (val) {
            !!val !== this[prop] && this.$emit(event, val);
        }, _b)
    });
}
/* eslint-disable-next-line no-redeclare */
var Toggleable = factory();
/* harmony default export */ __webpack_exports__["default"] = (Toggleable);

/***/ }),

/***/ "./src/mixins/transitionable.ts":
/*!**************************************!*\
  !*** ./src/mixins/transitionable.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'transitionable',
    props: {
        mode: String,
        origin: String,
        transition: String
    }
}));

/***/ }),

/***/ "./src/mixins/translatable.ts":
/*!************************************!*\
  !*** ./src/mixins/translatable.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
    name: 'translatable',
    props: {
        height: Number
    },
    data: function data() {
        return {
            elOffsetTop: 0,
            parallax: 0,
            parallaxDist: 0,
            percentScrolled: 0,
            scrollTop: 0,
            windowHeight: 0,
            windowBottom: 0
        };
    },
    computed: {
        imgHeight: function imgHeight() {
            return this.objHeight();
        }
    },
    beforeDestroy: function beforeDestroy() {
        window.removeEventListener('scroll', this.translate, false);
        window.removeEventListener('resize', this.translate, false);
    },
    methods: {
        calcDimensions: function calcDimensions() {
            var offset = this.$el.getBoundingClientRect();
            this.scrollTop = window.pageYOffset;
            this.parallaxDist = this.imgHeight - this.height;
            this.elOffsetTop = offset.top + this.scrollTop;
            this.windowHeight = window.innerHeight;
            this.windowBottom = this.scrollTop + this.windowHeight;
        },
        listeners: function listeners() {
            window.addEventListener('scroll', this.translate, false);
            window.addEventListener('resize', this.translate, false);
        },
        /** @abstract **/
        objHeight: function objHeight() {
            throw new Error('Not implemented !');
        },
        translate: function translate() {
            this.calcDimensions();
            this.percentScrolled = (this.windowBottom - this.elOffsetTop) / (parseInt(this.height) + this.windowHeight);
            this.parallax = Math.round(this.parallaxDist * this.percentScrolled);
        }
    }
}));

/***/ }),

/***/ "./src/mixins/validatable.js":
/*!***********************************!*\
  !*** ./src/mixins/validatable.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/helpers */ "./src/util/helpers.ts");
/* harmony import */ var _registrable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registrable */ "./src/mixins/registrable.ts");
/* harmony import */ var _util_console__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/console */ "./src/util/console.ts");
/* harmony import */ var _colorable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./colorable */ "./src/mixins/colorable.ts");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




// Mixins

/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'validatable',
    mixins: [_colorable__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_registrable__WEBPACK_IMPORTED_MODULE_1__["inject"])('form')],
    props: {
        error: Boolean,
        errorCount: {
            type: [Number, String],
            default: 1
        },
        errorMessages: {
            type: [String, Array],
            default: function _default() {
                return [];
            }
        },
        messages: {
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
        success: Boolean,
        successMessages: {
            type: [String, Array],
            default: function _default() {
                return [];
            }
        },
        validateOnBlur: Boolean
    },
    data: function data() {
        return {
            errorBucket: [],
            hasColor: false,
            hasFocused: false,
            hasInput: false,
            isResetting: false,
            valid: false
        };
    },
    computed: {
        hasError: function hasError() {
            return this.internalErrorMessages.length > 0 || this.errorBucket.length > 0 || this.error;
        },
        externalError: function externalError() {
            return this.internalErrorMessages.length > 0 || this.error;
        },
        // TODO: Add logic that allows the user to enable based
        // upon a good validation
        hasSuccess: function hasSuccess() {
            return this.successMessages.length > 0 || this.success;
        },
        hasMessages: function hasMessages() {
            return this.validations.length > 0;
        },
        hasState: function hasState() {
            return this.hasSuccess || this.shouldValidate && this.hasError;
        },
        internalErrorMessages: function internalErrorMessages() {
            return this.errorMessages || '';
        },
        shouldValidate: function shouldValidate() {
            return this.externalError || !this.isResetting && (this.validateOnBlur ? this.hasFocused && !this.isFocused : this.hasInput || this.hasFocused);
        },
        validations: function validations() {
            return this.validationTarget.slice(0, this.errorCount);
        },
        validationState: function validationState() {
            if (this.hasError && this.shouldValidate) return 'error';
            if (this.hasSuccess) return 'success';
            if (this.hasColor) return this.color;
            return null;
        },
        validationTarget: function validationTarget() {
            var target = this.internalErrorMessages.length > 0 ? this.errorMessages : this.successMessages.length > 0 ? this.successMessages : this.messages;
            // String
            if (!Array.isArray(target)) {
                return [target];
                // Array with items
            } else if (target.length > 0) {
                return target;
                // Currently has validation
            } else if (this.shouldValidate) {
                return this.errorBucket;
            } else {
                return [];
            }
        }
    },
    watch: {
        rules: {
            handler: function handler(newVal, oldVal) {
                if (Object(_util_helpers__WEBPACK_IMPORTED_MODULE_0__["deepEqual"])(newVal, oldVal)) return;
                this.validate();
            },
            deep: true
        },
        internalValue: function internalValue() {
            // If it's the first time we're setting input,
            // mark it with hasInput
            this.hasInput = true;
            this.validateOnBlur || this.$nextTick(this.validate);
        },
        isFocused: function isFocused(val) {
            if (!val) {
                this.hasFocused = true;
                this.validateOnBlur && this.validate();
            }
        },
        isResetting: function isResetting() {
            var _this = this;
            setTimeout(function () {
                _this.hasInput = false;
                _this.hasFocused = false;
                _this.isResetting = false;
            }, 0);
        },
        hasError: function hasError(val) {
            if (this.shouldValidate) {
                this.$emit('update:error', val);
            }
        }
    },
    beforeMount: function beforeMount() {
        this.validate();
    },
    created: function created() {
        this.form && this.form.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.form && this.form.unregister(this);
    },
    methods: {
        /** @public */
        reset: function reset() {
            this.isResetting = true;
            this.internalValue = Array.isArray(this.internalValue) ? [] : undefined;
        },
        /** @public */
        resetValidation: function resetValidation() {
            this.isResetting = true;
        },
        /** @public */
        validate: function validate(force, value) {
            if (force === void 0) {
                force = false;
            }
            if (value === void 0) {
                value = this.internalValue;
            }
            var errorBucket = [];
            if (force) this.hasInput = this.hasFocused = true;
            for (var index = 0; index < this.rules.length; index++) {
                var rule = this.rules[index];
                var valid = typeof rule === 'function' ? rule(value) : rule;
                if (valid === false || typeof valid === 'string') {
                    errorBucket.push(valid);
                } else if (valid !== true) {
                    Object(_util_console__WEBPACK_IMPORTED_MODULE_2__["consoleError"])("Rules should return a string or boolean, received '" + (typeof valid === 'undefined' ? 'undefined' : _typeof(valid)) + "' instead", this);
                }
            }
            this.errorBucket = errorBucket;
            this.valid = errorBucket.length === 0;
            return this.valid;
        }
    }
});

/***/ }),

/***/ "./src/stylus/app.styl":
/*!*****************************!*\
  !*** ./src/stylus/app.styl ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_alerts.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_alerts.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_app.styl":
/*!*****************************************!*\
  !*** ./src/stylus/components/_app.styl ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_autocompletes.styl":
/*!***************************************************!*\
  !*** ./src/stylus/components/_autocompletes.styl ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_avatars.styl":
/*!*********************************************!*\
  !*** ./src/stylus/components/_avatars.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_badges.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_badges.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_bottom-navs.styl":
/*!*************************************************!*\
  !*** ./src/stylus/components/_bottom-navs.styl ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_bottom-sheets.styl":
/*!***************************************************!*\
  !*** ./src/stylus/components/_bottom-sheets.styl ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_breadcrumbs.styl":
/*!*************************************************!*\
  !*** ./src/stylus/components/_breadcrumbs.styl ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_button-toggle.styl":
/*!***************************************************!*\
  !*** ./src/stylus/components/_button-toggle.styl ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_buttons.styl":
/*!*********************************************!*\
  !*** ./src/stylus/components/_buttons.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_cards.styl":
/*!*******************************************!*\
  !*** ./src/stylus/components/_cards.styl ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_carousel.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_carousel.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_chips.styl":
/*!*******************************************!*\
  !*** ./src/stylus/components/_chips.styl ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_content.styl":
/*!*********************************************!*\
  !*** ./src/stylus/components/_content.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_counters.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_counters.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_data-iterator.styl":
/*!***************************************************!*\
  !*** ./src/stylus/components/_data-iterator.styl ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_data-table.styl":
/*!************************************************!*\
  !*** ./src/stylus/components/_data-table.styl ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_date-picker-header.styl":
/*!********************************************************!*\
  !*** ./src/stylus/components/_date-picker-header.styl ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_date-picker-table.styl":
/*!*******************************************************!*\
  !*** ./src/stylus/components/_date-picker-table.styl ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_date-picker-title.styl":
/*!*******************************************************!*\
  !*** ./src/stylus/components/_date-picker-title.styl ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_date-picker-years.styl":
/*!*******************************************************!*\
  !*** ./src/stylus/components/_date-picker-years.styl ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_dialogs.styl":
/*!*********************************************!*\
  !*** ./src/stylus/components/_dialogs.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_dividers.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_dividers.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_expansion-panel.styl":
/*!*****************************************************!*\
  !*** ./src/stylus/components/_expansion-panel.styl ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_footer.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_footer.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_forms.styl":
/*!*******************************************!*\
  !*** ./src/stylus/components/_forms.styl ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_grid.styl":
/*!******************************************!*\
  !*** ./src/stylus/components/_grid.styl ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_icons.styl":
/*!*******************************************!*\
  !*** ./src/stylus/components/_icons.styl ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_images.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_images.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_inputs.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_inputs.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_item-group.styl":
/*!************************************************!*\
  !*** ./src/stylus/components/_item-group.styl ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_jumbotrons.styl":
/*!************************************************!*\
  !*** ./src/stylus/components/_jumbotrons.styl ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_labels.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_labels.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_lists.styl":
/*!*******************************************!*\
  !*** ./src/stylus/components/_lists.styl ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_menus.styl":
/*!*******************************************!*\
  !*** ./src/stylus/components/_menus.styl ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_messages.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_messages.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_navigation-drawer.styl":
/*!*******************************************************!*\
  !*** ./src/stylus/components/_navigation-drawer.styl ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_overflow-buttons.styl":
/*!******************************************************!*\
  !*** ./src/stylus/components/_overflow-buttons.styl ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_overlay.styl":
/*!*********************************************!*\
  !*** ./src/stylus/components/_overlay.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_pagination.styl":
/*!************************************************!*\
  !*** ./src/stylus/components/_pagination.styl ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_paper.styl":
/*!*******************************************!*\
  !*** ./src/stylus/components/_paper.styl ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_parallax.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_parallax.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_pickers.styl":
/*!*********************************************!*\
  !*** ./src/stylus/components/_pickers.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_progress-circular.styl":
/*!*******************************************************!*\
  !*** ./src/stylus/components/_progress-circular.styl ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_progress-linear.styl":
/*!*****************************************************!*\
  !*** ./src/stylus/components/_progress-linear.styl ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_radio-group.styl":
/*!*************************************************!*\
  !*** ./src/stylus/components/_radio-group.styl ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_radios.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_radios.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_range-sliders.styl":
/*!***************************************************!*\
  !*** ./src/stylus/components/_range-sliders.styl ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_rating.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_rating.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_responsive.styl":
/*!************************************************!*\
  !*** ./src/stylus/components/_responsive.styl ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_select.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_select.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_selection-controls.styl":
/*!********************************************************!*\
  !*** ./src/stylus/components/_selection-controls.styl ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_sliders.styl":
/*!*********************************************!*\
  !*** ./src/stylus/components/_sliders.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_small-dialog.styl":
/*!**************************************************!*\
  !*** ./src/stylus/components/_small-dialog.styl ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_snackbars.styl":
/*!***********************************************!*\
  !*** ./src/stylus/components/_snackbars.styl ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_speed-dial.styl":
/*!************************************************!*\
  !*** ./src/stylus/components/_speed-dial.styl ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_steppers.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_steppers.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_subheaders.styl":
/*!************************************************!*\
  !*** ./src/stylus/components/_subheaders.styl ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_switch.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_switch.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_system-bars.styl":
/*!*************************************************!*\
  !*** ./src/stylus/components/_system-bars.styl ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_tables.styl":
/*!********************************************!*\
  !*** ./src/stylus/components/_tables.styl ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_tabs.styl":
/*!******************************************!*\
  !*** ./src/stylus/components/_tabs.styl ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_text-fields.styl":
/*!*************************************************!*\
  !*** ./src/stylus/components/_text-fields.styl ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_textarea.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_textarea.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_time-picker-clock.styl":
/*!*******************************************************!*\
  !*** ./src/stylus/components/_time-picker-clock.styl ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_time-picker-title.styl":
/*!*******************************************************!*\
  !*** ./src/stylus/components/_time-picker-title.styl ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_timeline.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_timeline.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_toolbar.styl":
/*!*********************************************!*\
  !*** ./src/stylus/components/_toolbar.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_tooltips.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_tooltips.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_treeview.styl":
/*!**********************************************!*\
  !*** ./src/stylus/components/_treeview.styl ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/stylus/components/_windows.styl":
/*!*********************************************!*\
  !*** ./src/stylus/components/_windows.styl ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/util/ThemeProvider.ts":
/*!***********************************!*\
  !*** ./src/util/ThemeProvider.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_themeable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixins/themeable */ "./src/mixins/themeable.ts");
/* harmony import */ var _mixins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins */ "./src/util/mixins.ts");


/* @vue/component */
/* harmony default export */ __webpack_exports__["default"] = (Object(_mixins__WEBPACK_IMPORTED_MODULE_1__["default"])(_mixins_themeable__WEBPACK_IMPORTED_MODULE_0__["default"]).extend({
    name: 'theme-provider',
    props: {
        root: Boolean
    },
    computed: {
        isDark: function isDark() {
            return this.root ? this.rootIsDark : _mixins_themeable__WEBPACK_IMPORTED_MODULE_0__["default"].options.computed.isDark.call(this);
        }
    },
    render: function render() {
        return this.$slots.default && this.$slots.default.find(function (node) {
            return !node.isComment && node.text !== ' ';
        });
    }
}));

/***/ }),

/***/ "./src/util/color/transformCIELAB.ts":
/*!*******************************************!*\
  !*** ./src/util/color/transformCIELAB.ts ***!
  \*******************************************/
/*! exports provided: fromXYZ, toXYZ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromXYZ", function() { return fromXYZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toXYZ", function() { return toXYZ; });
var delta = 0.20689655172413793; // 6÷29
var cielabForwardTransform = function cielabForwardTransform(t) {
    return t > Math.pow(delta, 3) ? Math.cbrt(t) : t / (3 * Math.pow(delta, 2)) + 4 / 29;
};
var cielabReverseTransform = function cielabReverseTransform(t) {
    return t > delta ? Math.pow(t, 3) : 3 * Math.pow(delta, 2) * (t - 4 / 29);
};
function fromXYZ(xyz) {
    var transform = cielabForwardTransform;
    var transformedY = transform(xyz[1]);
    return [116 * transformedY - 16, 500 * (transform(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform(xyz[2] / 1.08883))];
}
function toXYZ(lab) {
    var transform = cielabReverseTransform;
    var Ln = (lab[0] + 16) / 116;
    return [transform(Ln + lab[1] / 500) * 0.95047, transform(Ln), transform(Ln - lab[2] / 200) * 1.08883];
}

/***/ }),

/***/ "./src/util/color/transformSRGB.ts":
/*!*****************************************!*\
  !*** ./src/util/color/transformSRGB.ts ***!
  \*****************************************/
/*! exports provided: fromXYZ, toXYZ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromXYZ", function() { return fromXYZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toXYZ", function() { return toXYZ; });
// For converting XYZ to sRGB
var srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];
// Forward gamma adjust
var srgbForwardTransform = function srgbForwardTransform(C) {
    return C <= 0.0031308 ? C * 12.92 : 1.055 * Math.pow(C, 1 / 2.4) - 0.055;
};
// For converting sRGB to XYZ
var srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];
// Reverse gamma adjust
var srgbReverseTransform = function srgbReverseTransform(C) {
    return C <= 0.04045 ? C / 12.92 : Math.pow((C + 0.055) / 1.055, 2.4);
};
function clamp(value) {
    return Math.max(0, Math.min(1, value));
}
function fromXYZ(xyz) {
    var rgb = Array(3);
    var transform = srgbForwardTransform;
    var matrix = srgbForwardMatrix;
    // Matrix transform, then gamma adjustment
    for (var i = 0; i < 3; ++i) {
        rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
    }
    // Rescale back to [0, 255]
    return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0);
}
function toXYZ(rgb) {
    var xyz = [0, 0, 0];
    var transform = srgbReverseTransform;
    var matrix = srgbReverseMatrix;
    // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
    var r = transform((rgb >> 16 & 0xff) / 255);
    var g = transform((rgb >> 8 & 0xff) / 255);
    var b = transform((rgb >> 0 & 0xff) / 255);
    // Matrix color space transform
    for (var i = 0; i < 3; ++i) {
        xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
    }
    return xyz;
}

/***/ }),

/***/ "./src/util/colorUtils.ts":
/*!********************************!*\
  !*** ./src/util/colorUtils.ts ***!
  \********************************/
/*! exports provided: colorToInt, intToHex, colorToHex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorToInt", function() { return colorToInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intToHex", function() { return intToHex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorToHex", function() { return colorToHex; });
/* harmony import */ var _console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./console */ "./src/util/console.ts");

function colorToInt(color) {
    var rgb;
    if (typeof color === 'number') {
        rgb = color;
    } else if (typeof color === 'string') {
        var c = color[0] === '#' ? color.substring(1) : color;
        if (c.length === 3) {
            c = c.split('').map(function (char) {
                return char + char;
            }).join('');
        }
        if (c.length !== 6) {
            Object(_console__WEBPACK_IMPORTED_MODULE_0__["consoleWarn"])("'" + color + "' is not a valid rgb color");
        }
        rgb = parseInt(c, 16);
    } else {
        throw new TypeError("Colors can only be numbers or strings, recieved " + (color == null ? color : color.constructor.name) + " instead");
    }
    if (rgb < 0) {
        Object(_console__WEBPACK_IMPORTED_MODULE_0__["consoleWarn"])("Colors cannot be negative: '" + color + "'");
        rgb = 0;
    } else if (rgb > 0xffffff || isNaN(rgb)) {
        Object(_console__WEBPACK_IMPORTED_MODULE_0__["consoleWarn"])("'" + color + "' is not a valid rgb color");
        rgb = 0xffffff;
    }
    return rgb;
}
function intToHex(color) {
    var hexColor = color.toString(16);
    if (hexColor.length < 6) hexColor = '0'.repeat(6 - hexColor.length) + hexColor;
    return '#' + hexColor;
}
function colorToHex(color) {
    return intToHex(colorToInt(color));
}

/***/ }),

/***/ "./src/util/console.ts":
/*!*****************************!*\
  !*** ./src/util/console.ts ***!
  \*****************************/
/*! exports provided: consoleInfo, consoleWarn, consoleError, deprecate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consoleInfo", function() { return consoleInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consoleWarn", function() { return consoleWarn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consoleError", function() { return consoleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deprecate", function() { return deprecate; });
function createMessage(message, vm, parent) {
    if (parent) {
        vm = {
            _isVue: true,
            $parent: parent,
            $options: vm
        };
    }
    if (vm) {
        // Only show each message once per instance
        vm.$_alreadyWarned = vm.$_alreadyWarned || [];
        if (vm.$_alreadyWarned.includes(message)) return;
        vm.$_alreadyWarned.push(message);
    }
    return "[Vuetify] " + message + (vm ? generateComponentTrace(vm) : '');
}
function consoleInfo(message, vm, parent) {
    var newMessage = createMessage(message, vm, parent);
    newMessage != null && console.info(newMessage);
}
function consoleWarn(message, vm, parent) {
    var newMessage = createMessage(message, vm, parent);
    newMessage != null && console.warn(newMessage);
}
function consoleError(message, vm, parent) {
    var newMessage = createMessage(message, vm, parent);
    newMessage != null && console.error(newMessage);
}
function deprecate(original, replacement, vm, parent) {
    consoleWarn("'" + original + "' is deprecated, use '" + replacement + "' instead", vm, parent);
}
/**
 * Shamelessly stolen from vuejs/vue/blob/dev/src/core/util/debug.js
 */
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
        return c.toUpperCase();
    }).replace(/[-_]/g, '');
};
function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
        return '<Root>';
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
    }
    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
}
function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
            if (tree.length > 0) {
                var last = tree[tree.length - 1];
                if (last.constructor === vm.constructor) {
                    currentRecursiveSequence++;
                    vm = vm.$parent;
                    continue;
                } else if (currentRecursiveSequence > 0) {
                    tree[tree.length - 1] = [last, currentRecursiveSequence];
                    currentRecursiveSequence = 0;
                }
            }
            tree.push(vm);
            vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree.map(function (vm, i) {
            return "" + (i === 0 ? '---> ' : ' '.repeat(5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
        }).join('\n');
    } else {
        return "\n\n(found in " + formatComponentName(vm) + ")";
    }
}

/***/ }),

/***/ "./src/util/dedupeModelListeners.ts":
/*!******************************************!*\
  !*** ./src/util/dedupeModelListeners.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dedupeModelListeners; });
/**
 * Removes duplicate `@input` listeners when
 * using v-model with functional components
 *
 * @see https://github.com/vuetifyjs/vuetify/issues/4460
 */
function dedupeModelListeners(data) {
    if (data.model && data.on && data.on.input) {
        if (Array.isArray(data.on.input)) {
            var i = data.on.input.indexOf(data.model.callback);
            if (i > -1) data.on.input.splice(i, 1);
        } else {
            delete data.on.input;
        }
    }
}

/***/ }),

/***/ "./src/util/easing-patterns.js":
/*!*************************************!*\
  !*** ./src/util/easing-patterns.js ***!
  \*************************************/
/*! exports provided: linear, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linear", function() { return linear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInQuad", function() { return easeInQuad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOutQuad", function() { return easeOutQuad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOutQuad", function() { return easeInOutQuad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInCubic", function() { return easeInCubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOutCubic", function() { return easeOutCubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOutCubic", function() { return easeInOutCubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInQuart", function() { return easeInQuart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOutQuart", function() { return easeOutQuart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOutQuart", function() { return easeInOutQuart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInQuint", function() { return easeInQuint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeOutQuint", function() { return easeOutQuint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOutQuint", function() { return easeInOutQuint; });
// linear
var linear = function linear(t) {
  return t;
};
// accelerating from zero velocity
var easeInQuad = function easeInQuad(t) {
  return t * t;
};
// decelerating to zero velocity
var easeOutQuad = function easeOutQuad(t) {
  return t * (2 - t);
};
// acceleration until halfway, then deceleration
var easeInOutQuad = function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
// accelerating from zero velocity
var easeInCubic = function easeInCubic(t) {
  return t * t * t;
};
// decelerating to zero velocity
var easeOutCubic = function easeOutCubic(t) {
  return --t * t * t + 1;
};
// acceleration until halfway, then deceleration
var easeInOutCubic = function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
// accelerating from zero velocity
var easeInQuart = function easeInQuart(t) {
  return t * t * t * t;
};
// decelerating to zero velocity
var easeOutQuart = function easeOutQuart(t) {
  return 1 - --t * t * t * t;
};
// acceleration until halfway, then deceleration
var easeInOutQuart = function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
// accelerating from zero velocity
var easeInQuint = function easeInQuint(t) {
  return t * t * t * t * t;
};
// decelerating to zero velocity
var easeOutQuint = function easeOutQuint(t) {
  return 1 + --t * t * t * t * t;
};
// acceleration until halfway, then deceleration
var easeInOutQuint = function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};

/***/ }),

/***/ "./src/util/helpers.ts":
/*!*****************************!*\
  !*** ./src/util/helpers.ts ***!
  \*****************************/
/*! exports provided: createSimpleFunctional, createSimpleTransition, createJavaScriptTransition, directiveConfig, addOnceEventListener, getNestedValue, deepEqual, getObjectValueByPath, getPropertyFromItem, createRange, getZIndex, escapeHTML, filterObjectOnKeys, filterChildren, convertToUnit, kebabCase, isObject, keyCodes, remapInternalIcon, keys, camelize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSimpleFunctional", function() { return createSimpleFunctional; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSimpleTransition", function() { return createSimpleTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createJavaScriptTransition", function() { return createJavaScriptTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directiveConfig", function() { return directiveConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addOnceEventListener", function() { return addOnceEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNestedValue", function() { return getNestedValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepEqual", function() { return deepEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getObjectValueByPath", function() { return getObjectValueByPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPropertyFromItem", function() { return getPropertyFromItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRange", function() { return createRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZIndex", function() { return getZIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeHTML", function() { return escapeHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterObjectOnKeys", function() { return filterObjectOnKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterChildren", function() { return filterChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToUnit", function() { return convertToUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kebabCase", function() { return kebabCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyCodes", function() { return keyCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remapInternalIcon", function() { return remapInternalIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelize", function() { return camelize; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function createSimpleFunctional(c, el, name) {
    if (el === void 0) {
        el = 'div';
    }
    return {
        name: name || c.replace(/__/g, '-'),
        functional: true,
        render: function render(h, _a) {
            var data = _a.data,
                children = _a.children;
            data.staticClass = (c + " " + (data.staticClass || '')).trim();
            return h(el, data, children);
        }
    };
}
function mergeTransitions(transitions, array) {
    if (Array.isArray(transitions)) return transitions.concat(array);
    if (transitions) array.push(transitions);
    return array;
}
function createSimpleTransition(name, origin, mode) {
    if (origin === void 0) {
        origin = 'top center 0';
    }
    return {
        name: name,
        functional: true,
        props: {
            group: {
                type: Boolean,
                default: false
            },
            hideOnLeave: {
                type: Boolean,
                default: false
            },
            leaveAbsolute: {
                type: Boolean,
                default: false
            },
            mode: {
                type: String,
                default: mode
            },
            origin: {
                type: String,
                default: origin
            }
        },
        render: function render(h, context) {
            var tag = "transition" + (context.props.group ? '-group' : '');
            context.data = context.data || {};
            context.data.props = {
                name: name,
                mode: context.props.mode
            };
            context.data.on = context.data.on || {};
            if (!Object.isExtensible(context.data.on)) {
                context.data.on = __assign({}, context.data.on);
            }
            var ourBeforeEnter = [];
            var ourLeave = [];
            var absolute = function absolute(el) {
                return el.style.position = 'absolute';
            };
            ourBeforeEnter.push(function (el) {
                el.style.transformOrigin = context.props.origin;
                el.style.webkitTransformOrigin = context.props.origin;
            });
            if (context.props.leaveAbsolute) ourLeave.push(absolute);
            if (context.props.hideOnLeave) {
                ourLeave.push(function (el) {
                    return el.style.display = 'none';
                });
            }
            var _a = context.data.on,
                beforeEnter = _a.beforeEnter,
                leave = _a.leave;
            // Type says Function | Function[] but
            // will only work if provided a function
            context.data.on.beforeEnter = function () {
                return mergeTransitions(beforeEnter, ourBeforeEnter);
            };
            context.data.on.leave = mergeTransitions(leave, ourLeave);
            return h(tag, context.data, context.children);
        }
    };
}
function createJavaScriptTransition(name, functions, mode) {
    if (mode === void 0) {
        mode = 'in-out';
    }
    return {
        name: name,
        functional: true,
        props: {
            mode: {
                type: String,
                default: mode
            }
        },
        render: function render(h, context) {
            var data = {
                props: __assign({}, context.props, { name: name }),
                on: functions
            };
            return h('transition', data, context.children);
        }
    };
}
function directiveConfig(binding, defaults) {
    if (defaults === void 0) {
        defaults = {};
    }
    return __assign({}, defaults, binding.modifiers, { value: binding.arg }, binding.value || {});
}
function addOnceEventListener(el, event, cb) {
    var once = function once() {
        cb();
        el.removeEventListener(event, once, false);
    };
    el.addEventListener(event, once, false);
}
function getNestedValue(obj, path, fallback) {
    var last = path.length - 1;
    if (last < 0) return obj === undefined ? fallback : obj;
    for (var i = 0; i < last; i++) {
        if (obj == null) {
            return fallback;
        }
        obj = obj[path[i]];
    }
    if (obj == null) return fallback;
    return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
function deepEqual(a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) {
        // If the values are Date, they were convert to timestamp with getTime and compare it
        if (a.getTime() !== b.getTime()) return false;
    }
    if (a !== Object(a) || b !== Object(b)) {
        // If the values aren't objects, they were already checked for equality
        return false;
    }
    var props = Object.keys(a);
    if (props.length !== Object.keys(b).length) {
        // Different number of props, don't bother to check
        return false;
    }
    return props.every(function (p) {
        return deepEqual(a[p], b[p]);
    });
}
function getObjectValueByPath(obj, path, fallback) {
    // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
    if (!path || path.constructor !== String) return fallback;
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    return getNestedValue(obj, path.split('.'), fallback);
}
function getPropertyFromItem(item, property, fallback) {
    if (property == null) return item === undefined ? fallback : item;
    if (item !== Object(item)) return fallback === undefined ? item : fallback;
    if (typeof property === 'string') return getObjectValueByPath(item, property, fallback);
    if (Array.isArray(property)) return getNestedValue(item, property, fallback);
    if (typeof property !== 'function') return fallback;
    var value = property(item, fallback);
    return typeof value === 'undefined' ? fallback : value;
}
function createRange(length) {
    return Array.from({ length: length }, function (v, k) {
        return k;
    });
}
function getZIndex(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;
    var index = +window.getComputedStyle(el).getPropertyValue('z-index');
    if (isNaN(index)) return getZIndex(el.parentNode);
    return index;
}
var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escapeHTML(str) {
    return str.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag;
    });
}
function filterObjectOnKeys(obj, keys) {
    var filtered = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof obj[key] !== 'undefined') {
            filtered[key] = obj[key];
        }
    }
    return filtered;
}
function filterChildren(array, tag) {
    if (array === void 0) {
        array = [];
    }
    return array.filter(function (child) {
        return child.componentOptions && child.componentOptions.Ctor.options.name === tag;
    });
}
function convertToUnit(str, unit) {
    if (unit === void 0) {
        unit = 'px';
    }
    if (str == null || str === '') {
        return undefined;
    } else if (isNaN(+str)) {
        return String(str);
    } else {
        return "" + Number(str) + unit;
    }
}
function kebabCase(str) {
    return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}
// KeyboardEvent.keyCode aliases
var keyCodes = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34
});
var ICONS_PREFIX = '$vuetify.icons.';
// This remaps internal names like '$vuetify.icons.cancel' to the current name
// for that icon.
function remapInternalIcon(vm, iconName) {
    if (!iconName.startsWith(ICONS_PREFIX)) {
        return iconName;
    }
    // Now look up icon indirection name, e.g. '$vuetify.icons.cancel'
    return getObjectValueByPath(vm, iconName, iconName);
}
function keys(o) {
    return Object.keys(o);
}
/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = function camelize(str) {
    return str.replace(camelizeRE, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
};

/***/ }),

/***/ "./src/util/mask.js":
/*!**************************!*\
  !*** ./src/util/mask.js ***!
  \**************************/
/*! exports provided: defaultDelimiters, isMaskDelimiter, maskText, unmaskText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultDelimiters", function() { return defaultDelimiters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMaskDelimiter", function() { return isMaskDelimiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maskText", function() { return maskText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmaskText", function() { return unmaskText; });
/**
 * Default delimiter RegExp
 *
 * @type {RegExp}
 */
var defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/;
/**
 *
 * @param {String} char
 *
 * @return {Boolean}
 */
var isMaskDelimiter = function isMaskDelimiter(char) {
    return char && defaultDelimiters.test(char);
};
/**
 * Mask keys
 *
 * @type {Object}
 */
var allowedMasks = {
    '#': {
        test: function test(char) {
            return char.match(/[0-9]/);
        }
    },
    'A': {
        test: function test(char) {
            return char.match(/[A-Z]/i);
        },
        convert: function convert(char) {
            return char.toUpperCase();
        }
    },
    'a': {
        test: function test(char) {
            return char.match(/[a-z]/i);
        },
        convert: function convert(char) {
            return char.toLowerCase();
        }
    },
    'N': {
        test: function test(char) {
            return char.match(/[0-9A-Z]/i);
        },
        convert: function convert(char) {
            return char.toUpperCase();
        }
    },
    'n': {
        test: function test(char) {
            return char.match(/[0-9a-z]/i);
        },
        convert: function convert(char) {
            return char.toLowerCase();
        }
    },
    'X': {
        test: isMaskDelimiter
    }
};
/**
 * Is Character mask
 *
 * @param  {String} char
 *
 * @return {Boolean}
 */
var isMask = function isMask(char) {
    return allowedMasks.hasOwnProperty(char);
};
/**
 * Automatically convert char case
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {String}
 */
var convert = function convert(mask, char) {
    return allowedMasks[mask].convert ? allowedMasks[mask].convert(char) : char;
};
/**
 * Mask Validation
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {Boolean}
 */
var maskValidates = function maskValidates(mask, char) {
    if (char == null || !isMask(mask)) return false;
    return allowedMasks[mask].test(char);
};
/**
 * Mask Text
 *
 * Takes a string or an array of characters
 * and returns a masked string
 *
 * @param {*} text
 * @param {Array|String} masked
 * @param {Boolean} [dontFillMaskBlanks]
 *
 * @return {String}
 */
var maskText = function maskText(text, masked, dontFillMaskBlanks) {
    if (text == null) return '';
    text = String(text);
    if (!masked.length || !text.length) return text;
    if (!Array.isArray(masked)) masked = masked.split('');
    var textIndex = 0;
    var maskIndex = 0;
    var newText = '';
    while (maskIndex < masked.length) {
        var mask = masked[maskIndex];
        // Assign the next character
        var char = text[textIndex];
        // Check if mask is delimiter
        // and current char matches
        if (!isMask(mask) && char === mask) {
            newText += mask;
            textIndex++;
            // Check if not mask
        } else if (!isMask(mask) && !dontFillMaskBlanks) {
            newText += mask;
            // Check if is mask and validates
        } else if (maskValidates(mask, char)) {
            newText += convert(mask, char);
            textIndex++;
        } else {
            return newText;
        }
        maskIndex++;
    }
    return newText;
};
/**
 * Unmask Text
 *
 * @param {String} text
 *
 * @return {String}
 */
var unmaskText = function unmaskText(text) {
    return text ? String(text).replace(new RegExp(defaultDelimiters, 'g'), '') : text;
};

/***/ }),

/***/ "./src/util/mixins.ts":
/*!****************************!*\
  !*** ./src/util/mixins.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mixins; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable max-len, import/export, no-use-before-define */

function mixins() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return vue__WEBPACK_IMPORTED_MODULE_0___default.a.extend({ mixins: args });
}

/***/ }),

/***/ "./src/util/rebuildFunctionalSlots.js":
/*!********************************************!*\
  !*** ./src/util/rebuildFunctionalSlots.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rebuildFunctionalSlots; });
/**
 *
 * @param {object} slots
 * @param {function} h
 * @returns {array}
 */
function rebuildFunctionalSlots(slots, h) {
    var children = [];
    for (var slot in slots) {
        if (slots.hasOwnProperty(slot)) {
            children.push(h('template', { slot: slot }, slots[slot]));
        }
    }
    return children;
}

/***/ }),

/***/ "./src/util/theme.ts":
/*!***************************!*\
  !*** ./src/util/theme.ts ***!
  \***************************/
/*! exports provided: parse, genStyles, genVariations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genStyles", function() { return genStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genVariations", function() { return genVariations; });
/* harmony import */ var _colorUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colorUtils */ "./src/util/colorUtils.ts");
/* harmony import */ var _color_transformSRGB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color/transformSRGB */ "./src/util/color/transformSRGB.ts");
/* harmony import */ var _color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color/transformCIELAB */ "./src/util/color/transformCIELAB.ts");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};



function parse(theme, isItem) {
    if (isItem === void 0) {
        isItem = false;
    }
    var colors = Object.keys(theme);
    var parsedTheme = {};
    for (var i = 0; i < colors.length; ++i) {
        var name = colors[i];
        var value = theme[name];
        if (isItem) {
            if (name === 'base' || name.startsWith('lighten') || name.startsWith('darken')) {
                parsedTheme[name] = Object(_colorUtils__WEBPACK_IMPORTED_MODULE_0__["colorToHex"])(value);
            }
        } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
            parsedTheme[name] = parse(value, true);
        } else {
            parsedTheme[name] = genVariations(name, Object(_colorUtils__WEBPACK_IMPORTED_MODULE_0__["colorToInt"])(value));
        }
    }
    return parsedTheme;
}
/**
 * Generate the CSS for a base color (.primary)
 */
var genBaseColor = function genBaseColor(name, value) {
    return "\n." + name + " {\n  background-color: " + value + " !important;\n  border-color: " + value + " !important;\n}\n." + name + "--text {\n  color: " + value + " !important;\n  caret-color: " + value + " !important;\n}";
};
/**
 * Generate the CSS for a variant color (.primary.darken-2)
 */
var genVariantColor = function genVariantColor(name, variant, value) {
    var _a = __read(variant.split(/(\d)/, 2), 2),
        type = _a[0],
        n = _a[1];
    return "\n." + name + "." + type + "-" + n + " {\n  background-color: " + value + " !important;\n  border-color: " + value + " !important;\n}\n." + name + "--text.text--" + type + "-" + n + " {\n  color: " + value + " !important;\n  caret-color: " + value + " !important;\n}";
};
var genColorVariableName = function genColorVariableName(name, variant) {
    if (variant === void 0) {
        variant = 'base';
    }
    return "--v-" + name + "-" + variant;
};
var genColorVariable = function genColorVariable(name, variant) {
    if (variant === void 0) {
        variant = 'base';
    }
    return "var(" + genColorVariableName(name, variant) + ")";
};
function genStyles(theme, cssVar) {
    if (cssVar === void 0) {
        cssVar = false;
    }
    var colors = Object.keys(theme);
    if (!colors.length) return '';
    var variablesCss = '';
    var css = '';
    var aColor = cssVar ? genColorVariable('primary') : theme.primary.base;
    css += "a { color: " + aColor + "; }";
    for (var i = 0; i < colors.length; ++i) {
        var name = colors[i];
        var value = theme[name];
        if ((typeof value === "undefined" ? "undefined" : _typeof(value)) !== 'object') continue;
        css += genBaseColor(name, cssVar ? genColorVariable(name) : value.base);
        cssVar && (variablesCss += "  " + genColorVariableName(name) + ": " + value.base + ";\n");
        var variants = Object.keys(value);
        for (var i_1 = 0; i_1 < variants.length; ++i_1) {
            var variant = variants[i_1];
            var variantValue = value[variant];
            if (variant === 'base') continue;
            css += genVariantColor(name, variant, cssVar ? genColorVariable(name, variant) : variantValue);
            cssVar && (variablesCss += "  " + genColorVariableName(name, variant) + ": " + variantValue + ";\n");
        }
    }
    if (cssVar) {
        variablesCss = ":root {\n" + variablesCss + "}\n\n";
    }
    return variablesCss + css;
}
function genVariations(name, value) {
    var values = {
        base: Object(_colorUtils__WEBPACK_IMPORTED_MODULE_0__["intToHex"])(value)
    };
    for (var i = 5; i > 0; --i) {
        values["lighten" + i] = Object(_colorUtils__WEBPACK_IMPORTED_MODULE_0__["intToHex"])(lighten(value, i));
    }
    for (var i = 1; i <= 4; ++i) {
        values["darken" + i] = Object(_colorUtils__WEBPACK_IMPORTED_MODULE_0__["intToHex"])(darken(value, i));
    }
    return values;
}
function lighten(value, amount) {
    var lab = _color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__["fromXYZ"](_color_transformSRGB__WEBPACK_IMPORTED_MODULE_1__["toXYZ"](value));
    lab[0] = lab[0] + amount * 10;
    return _color_transformSRGB__WEBPACK_IMPORTED_MODULE_1__["fromXYZ"](_color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__["toXYZ"](lab));
}
function darken(value, amount) {
    var lab = _color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__["fromXYZ"](_color_transformSRGB__WEBPACK_IMPORTED_MODULE_1__["toXYZ"](value));
    lab[0] = lab[0] - amount * 10;
    return _color_transformSRGB__WEBPACK_IMPORTED_MODULE_1__["fromXYZ"](_color_transformCIELAB__WEBPACK_IMPORTED_MODULE_2__["toXYZ"](lab));
}

/***/ }),

/***/ "vue":
/*!******************************************************************************!*\
  !*** external {"commonjs":"vue","commonjs2":"vue","amd":"vue","root":"Vue"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vue__;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vuetify.js.map