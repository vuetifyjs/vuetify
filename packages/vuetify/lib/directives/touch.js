import { keys } from '../util/helpers';
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
    keys(handlers).forEach(function (eventName) {
        target.addEventListener(eventName, handlers[eventName], options);
    });
}
function unbind(el, binding, vnode) {
    var target = binding.value.parent ? el.parentElement : el;
    if (!target || !target._touchHandlers) return;
    var handlers = target._touchHandlers[vnode.context._uid];
    keys(handlers).forEach(function (eventName) {
        target.removeEventListener(eventName, handlers[eventName]);
    });
    delete target._touchHandlers[vnode.context._uid];
}
export default {
    inserted: inserted,
    unbind: unbind
};
//# sourceMappingURL=touch.js.map