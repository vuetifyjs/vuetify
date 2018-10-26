'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var expandedParentClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return {
        enter: function enter(el, done) {
            el._parent = el.parentNode;
            el._height = el._height != null ? el._height : el.style.height;
            (0, _helpers.addOnceEventListener)(el, 'transitionend', done);
            // Get height that is to be scrolled
            el.style.overflow = 'hidden';
            el.style.height = 0;
            el.style.display = 'block';
            expandedParentClass && el._parent.classList.add(expandedParentClass);
            setTimeout(function () {
                el.style.height = el._height || (!el.scrollHeight ? 'auto' : el.scrollHeight + 'px');
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
            (0, _helpers.addOnceEventListener)(el, 'transitionend', done);
            // Set height before we transition to 0
            el.style.overflow = 'hidden';
            // If no user supplied height
            // pass in the scrollHeight
            if (!el._height) {
                el.style.height = el.scrollHeight + 'px';
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
};

var _helpers = require('../../util/helpers');
//# sourceMappingURL=expand-transition.js.map