// Return target's cumulative offset from the top
export function getOffset(target) {
    if (typeof target === 'number') {
        return target;
    }
    var el = $(target);
    if (!el) {
        throw typeof target === 'string'
            ? new Error("Target element \"" + target + "\" not found.")
            : new TypeError("Target must be a Number/Selector/HTMLElement/VueComponent, received " + type(target) + " instead.");
    }
    var totalOffset = 0;
    while (el) {
        totalOffset += el.offsetTop;
        el = el.offsetParent;
    }
    return totalOffset;
}
export function getContainer(container) {
    var el = $(container);
    if (el)
        return el;
    throw typeof container === 'string'
        ? new Error("Container element \"" + container + "\" not found.")
        : new TypeError("Container must be a Selector/HTMLElement/VueComponent, received " + type(container) + " instead.");
}
function type(el) {
    return el == null ? el : el.constructor.name;
}
function $(el) {
    if (typeof el === 'string') {
        return document.querySelector(el);
    }
    else if (el && el._isVue) {
        return el.$el;
    }
    else if (el instanceof HTMLElement) {
        return el;
    }
    else {
        return null;
    }
}
//# sourceMappingURL=util.js.map
//# sourceMappingURL=util.js.map