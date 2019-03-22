var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { consoleWarn } from '../util/console';
function transform(el, value) {
    el.style['transform'] = value;
    el.style['webkitTransform'] = value;
}
function opacity(el, value) {
    el.style['opacity'] = value.toString();
}
function isTouchEvent(e) {
    return e.constructor.name === 'TouchEvent';
}
var calculate = function (e, el, value) {
    if (value === void 0) {
        value = {};
    }
    var offset = el.getBoundingClientRect();
    var target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    var localX = target.clientX - offset.left;
    var localY = target.clientY - offset.top;
    var radius = 0;
    var scale = 0.3;
    if (el._ripple && el._ripple.circle) {
        scale = 0.15;
        radius = el.clientWidth / 2;
        radius = value.center ? radius : radius + Math.sqrt(Math.pow((localX - radius), 2) + Math.pow((localY - radius), 2)) / 4;
    }
    else {
        radius = Math.sqrt(Math.pow(el.clientWidth, 2) + Math.pow(el.clientHeight, 2)) / 2;
    }
    var centerX = (el.clientWidth - (radius * 2)) / 2 + "px";
    var centerY = (el.clientHeight - (radius * 2)) / 2 + "px";
    var x = value.center ? centerX : localX - radius + "px";
    var y = value.center ? centerY : localY - radius + "px";
    return { radius: radius, scale: scale, x: x, y: y, centerX: centerX, centerY: centerY };
};
var ripple = {
    /* eslint-disable max-statements */
    show: function (e, el, value) {
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
        var _a = calculate(e, el, value), radius = _a.radius, scale = _a.scale, x = _a.x, y = _a.y, centerX = _a.centerX, centerY = _a.centerY;
        var size = radius * 2 + "px";
        animation.className = 'v-ripple__animation';
        animation.style.width = size;
        animation.style.height = size;
        el.appendChild(container);
        var computed = window.getComputedStyle(el);
        if (computed && computed.position === 'static') {
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
        }, 0);
    },
    hide: function (el) {
        if (!el || !el._ripple || !el._ripple.enabled)
            return;
        var ripples = el.getElementsByClassName('v-ripple__animation');
        if (ripples.length === 0)
            return;
        var animation = ripples[ripples.length - 1];
        if (animation.dataset.isHiding)
            return;
        else
            animation.dataset.isHiding = 'true';
        var diff = performance.now() - Number(animation.dataset.activated);
        var delay = Math.max(250 - diff, 0);
        setTimeout(function () {
            animation.classList.remove('v-ripple__animation--in');
            animation.classList.add('v-ripple__animation--out');
            opacity(animation, 0);
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
    if (!element || !element._ripple || element._ripple.touched)
        return;
    if (isTouchEvent(e)) {
        element._ripple.touched = true;
    }
    value.center = element._ripple.centered;
    if (element._ripple.class) {
        value.class = element._ripple.class;
    }
    ripple.show(e, element, value);
}
function rippleHide(e) {
    var element = e.currentTarget;
    if (!element)
        return;
    window.setTimeout(function () {
        if (element._ripple) {
            element._ripple.touched = false;
        }
    });
    ripple.hide(element);
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
        el.addEventListener('touchstart', rippleShow, { passive: true });
        el.addEventListener('touchend', rippleHide, { passive: true });
        el.addEventListener('touchcancel', rippleHide);
        el.addEventListener('mousedown', rippleShow);
        el.addEventListener('mouseup', rippleHide);
        el.addEventListener('mouseleave', rippleHide);
        // Anchor tags can be dragged, causes other hides to fail - #1537
        el.addEventListener('dragstart', rippleHide, { passive: true });
    }
    else if (!enabled && wasEnabled) {
        removeListeners(el);
    }
}
function removeListeners(el) {
    el.removeEventListener('mousedown', rippleShow);
    el.removeEventListener('touchstart', rippleHide);
    el.removeEventListener('touchend', rippleHide);
    el.removeEventListener('touchcancel', rippleHide);
    el.removeEventListener('mouseup', rippleHide);
    el.removeEventListener('mouseleave', rippleHide);
    el.removeEventListener('dragstart', rippleHide);
}
function directive(el, binding, node) {
    updateRipple(el, binding, false);
    // warn if an inline element is used, waiting for el to be in the DOM first
    node.context && node.context.$nextTick(function () {
        var computed = window.getComputedStyle(el);
        if (computed && computed.display === 'inline') {
            var context = node.fnOptions ? [node.fnOptions, node.context] : [node.componentInstance];
            consoleWarn.apply(void 0, __spread(['v-ripple can only be used on block-level elements'], context));
        }
    });
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
export default {
    bind: directive,
    unbind: unbind,
    update: update
};
//# sourceMappingURL=ripple.js.map
//# sourceMappingURL=ripple.js.map
//# sourceMappingURL=ripple.js.map
//# sourceMappingURL=ripple.js.map