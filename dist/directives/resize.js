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
    if (!el._onResize)
        return;
    var _a = el._onResize, callback = _a.callback, options = _a.options;
    window.removeEventListener('resize', callback, options);
    delete el._onResize;
}
export default {
    inserted: inserted,
    unbind: unbind
};
//# sourceMappingURL=resize.js.map