var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Vue from 'vue';
export function createSimpleFunctional(c, el, name) {
    if (el === void 0) {
        el = 'div';
    }
    return Vue.extend({
        name: name || c.replace(/__/g, '-'),
        functional: true,
        render: function (h, _a) {
            var data = _a.data, children = _a.children;
            data.staticClass = (c + " " + (data.staticClass || '')).trim();
            return h(el, data, children);
        }
    });
}
function mergeTransitions(transitions, array) {
    if (Array.isArray(transitions))
        return transitions.concat(array);
    if (transitions)
        array.push(transitions);
    return array;
}
export function createSimpleTransition(name, origin, mode) {
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
        render: function (h, context) {
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
            var absolute = function (el) { return (el.style.position = 'absolute'); };
            ourBeforeEnter.push(function (el) {
                el.style.transformOrigin = context.props.origin;
                el.style.webkitTransformOrigin = context.props.origin;
            });
            if (context.props.leaveAbsolute)
                ourLeave.push(absolute);
            if (context.props.hideOnLeave) {
                ourLeave.push(function (el) { return (el.style.display = 'none'); });
            }
            var _a = context.data.on, beforeEnter = _a.beforeEnter, leave = _a.leave;
            // Type says Function | Function[] but
            // will only work if provided a function
            context.data.on.beforeEnter = function () { return mergeTransitions(beforeEnter, ourBeforeEnter); };
            context.data.on.leave = mergeTransitions(leave, ourLeave);
            return h(tag, context.data, context.children);
        }
    };
}
export function createJavaScriptTransition(name, functions, mode) {
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
        render: function (h, context) {
            var data = {
                props: __assign({}, context.props, { name: name }),
                on: functions
            };
            return h('transition', data, context.children);
        }
    };
}
export function directiveConfig(binding, defaults) {
    if (defaults === void 0) {
        defaults = {};
    }
    return __assign({}, defaults, binding.modifiers, { value: binding.arg }, (binding.value || {}));
}
export function addOnceEventListener(el, event, cb) {
    var once = function () {
        cb();
        el.removeEventListener(event, once, false);
    };
    el.addEventListener(event, once, false);
}
export function getNestedValue(obj, path, fallback) {
    var last = path.length - 1;
    if (last < 0)
        return obj === undefined ? fallback : obj;
    for (var i = 0; i < last; i++) {
        if (obj == null) {
            return fallback;
        }
        obj = obj[path[i]];
    }
    if (obj == null)
        return fallback;
    return obj[path[last]] === undefined ? fallback : obj[path[last]];
}
export function deepEqual(a, b) {
    if (a === b)
        return true;
    if (a instanceof Date && b instanceof Date) {
        // If the values are Date, they were convert to timestamp with getTime and compare it
        if (a.getTime() !== b.getTime())
            return false;
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
    return props.every(function (p) { return deepEqual(a[p], b[p]); });
}
export function getObjectValueByPath(obj, path, fallback) {
    // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
    if (!path || path.constructor !== String)
        return fallback;
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    return getNestedValue(obj, path.split('.'), fallback);
}
export function getPropertyFromItem(item, property, fallback) {
    if (property == null)
        return item === undefined ? fallback : item;
    if (item !== Object(item))
        return fallback === undefined ? item : fallback;
    if (typeof property === 'string')
        return getObjectValueByPath(item, property, fallback);
    if (Array.isArray(property))
        return getNestedValue(item, property, fallback);
    if (typeof property !== 'function')
        return fallback;
    var value = property(item, fallback);
    return typeof value === 'undefined' ? fallback : value;
}
export function createRange(length) {
    return Array.from({ length: length }, function (v, k) { return k; });
}
export function getZIndex(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE)
        return 0;
    var index = +window.getComputedStyle(el).getPropertyValue('z-index');
    if (isNaN(index))
        return getZIndex(el.parentNode);
    return index;
}
var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
export function escapeHTML(str) {
    return str.replace(/[&<>]/g, function (tag) { return tagsToReplace[tag] || tag; });
}
export function filterObjectOnKeys(obj, keys) {
    var filtered = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (typeof obj[key] !== 'undefined') {
            filtered[key] = obj[key];
        }
    }
    return filtered;
}
export function filterChildren(array, tag) {
    if (array === void 0) {
        array = [];
    }
    return array.filter(function (child) {
        return child.componentOptions &&
            child.componentOptions.Ctor.options.name === tag;
    });
}
export function convertToUnit(str, unit) {
    if (unit === void 0) {
        unit = 'px';
    }
    if (str == null || str === '') {
        return undefined;
    }
    else if (isNaN(+str)) {
        return String(str);
    }
    else {
        return "" + Number(str) + unit;
    }
}
export function kebabCase(str) {
    return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
// KeyboardEvent.keyCode aliases
export var keyCodes = Object.freeze({
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
// This remaps internal names like '$vuetify.icons.cancel'
// to the current name or component for that icon.
export function remapInternalIcon(vm, iconName) {
    if (!iconName.startsWith(ICONS_PREFIX)) {
        return iconName;
    }
    // Now look up icon indirection name, e.g. '$vuetify.icons.cancel'
    return getObjectValueByPath(vm, iconName, iconName);
}
export function keys(o) {
    return Object.keys(o);
}
/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
export var camelize = function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; });
};
/**
 * Returns the set difference of B and A, i.e. the set of elements in B but not in A
 */
export function arrayDiff(a, b) {
    var diff = [];
    for (var i = 0; i < b.length; i++) {
        if (a.indexOf(b[i]) < 0)
            diff.push(b[i]);
    }
    return diff;
}
/**
 * Makes the first character of a string uppercase
 */
export function upperFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Returns:
 *  - 'normal' for old style slots - `<template slot="default">`
 *  - 'scoped' for old style scoped slots (`<template slot="default" slot-scope="data">`) or bound v-slot (`#default="data"`)
 *  - 'v-slot' for unbound v-slot (`#default`) - only if the third param is true, otherwise counts as scoped
 */
export function getSlotType(vm, name, split) {
    if (vm.$slots[name] && vm.$scopedSlots[name] && vm.$scopedSlots[name].name) {
        return split ? 'v-slot' : 'scoped';
    }
    if (vm.$slots[name])
        return 'normal';
    if (vm.$scopedSlots[name])
        return 'scoped';
}
//# sourceMappingURL=helpers.js.map
//# sourceMappingURL=helpers.js.map
//# sourceMappingURL=helpers.js.map