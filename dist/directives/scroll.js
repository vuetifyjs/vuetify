function inserted(el, binding) {
    var callback = binding.value;
    var options = binding.options || { passive: true };
    var target = binding.arg ? document.querySelector(binding.arg) : window;
    if (!target)
        return;
    target.addEventListener('scroll', callback, options);
    el._onScroll = {
        callback: callback,
        options: options,
        target: target
    };
}
function unbind(el) {
    if (!el._onScroll)
        return;
    var _a = el._onScroll, callback = _a.callback, options = _a.options, target = _a.target;
    target.removeEventListener('scroll', callback, options);
    delete el._onScroll;
}
export default {
    inserted: inserted,
    unbind: unbind
};
//# sourceMappingURL=scroll.js.map