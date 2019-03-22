import { upperFirst } from '../../util/helpers';
export default function (expandedParentClass, x) {
    if (expandedParentClass === void 0) {
        expandedParentClass = '';
    }
    if (x === void 0) {
        x = false;
    }
    var sizeProperty = x ? 'width' : 'height';
    return {
        beforeEnter: function (el) {
            var _a;
            el._parent = el.parentNode;
            el._initialStyle = (_a = {
                transition: el.style.transition,
                visibility: el.style.visibility,
                overflow: el.style.overflow
            },
                _a[sizeProperty] = el.style[sizeProperty],
                _a);
        },
        enter: function (el) {
            var initialStyle = el._initialStyle;
            el.style.setProperty('transition', 'none', 'important');
            el.style.visibility = 'hidden';
            var size = el['offset' + upperFirst(sizeProperty)] + "px";
            el.style.visibility = initialStyle.visibility;
            el.style.overflow = 'hidden';
            el.style[sizeProperty] = 0;
            void el.offsetHeight; // force reflow
            el.style.transition = initialStyle.transition;
            expandedParentClass && el._parent && el._parent.classList.add(expandedParentClass);
            requestAnimationFrame(function () {
                el.style[sizeProperty] = size;
            });
        },
        afterEnter: resetStyles,
        enterCancelled: resetStyles,
        leave: function (el) {
            var _a;
            el._initialStyle = (_a = {
                overflow: el.style.overflow
            },
                _a[sizeProperty] = el.style[sizeProperty],
                _a);
            el.style.overflow = 'hidden';
            el.style[sizeProperty] = el['offset' + upperFirst(sizeProperty)] + "px";
            void el.offsetHeight; // force reflow
            requestAnimationFrame(function () { return el.style[sizeProperty] = 0; });
        },
        afterLeave: afterLeave,
        leaveCancelled: afterLeave
    };
    function afterLeave(el) {
        expandedParentClass && el._parent && el._parent.classList.remove(expandedParentClass);
        resetStyles(el);
    }
    function resetStyles(el) {
        el.style.overflow = el._initialStyle.overflow;
        el.style[sizeProperty] = el._initialStyle[sizeProperty];
        delete el._initialStyle;
    }
}
//# sourceMappingURL=expand-transition.js.map
//# sourceMappingURL=expand-transition.js.map
//# sourceMappingURL=expand-transition.js.map
//# sourceMappingURL=expand-transition.js.map
//# sourceMappingURL=expand-transition.js.map