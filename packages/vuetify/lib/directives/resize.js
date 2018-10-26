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
    var _el$_onResize = el._onResize,
        callback = _el$_onResize.callback,
        options = _el$_onResize.options;

    window.removeEventListener('resize', callback, options);
    delete el._onResize;
}
export default {
    inserted: inserted,
    unbind: unbind
};
//# sourceMappingURL=resize.js.map