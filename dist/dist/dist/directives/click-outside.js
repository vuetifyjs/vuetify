function closeConditional() {
    return false;
}
function directive(e, el, binding) {
    // Args may not always be supplied
    binding.args = binding.args || {};
    // If no closeConditional was supplied assign a default
    var isActive = (binding.args.closeConditional || closeConditional);
    // The include element callbacks below can be expensive
    // so we should avoid calling them when we're not active.
    // Explicitly check for false to allow fallback compatibility
    // with non-toggleable components
    if (!e || isActive(e) === false)
        return;
    // If click was triggered programmaticaly (domEl.click()) then
    // it shouldn't be treated as click-outside
    // Chrome/Firefox support isTrusted property
    // IE/Edge support pointerType property (empty if not triggered
    // by pointing device)
    if (('isTrusted' in e && !e.isTrusted) ||
        ('pointerType' in e && !e.pointerType))
        return;
    // Check if additional elements were passed to be included in check
    // (click must be outside all included elements, if any)
    var elements = (binding.args.include || (function () { return []; }))();
    // Add the root element for the component this directive was defined on
    elements.push(el);
    // Check if it's a click outside our elements, and then if our callback returns true.
    // Non-toggleable components should take action in their callback and return falsy.
    // Toggleable can return true if it wants to deactivate.
    // Note that, because we're in the capture phase, this callback will occur before
    // the bubbling click event on any outside elements.
    !elements.some(function (el) { return el.contains(e.target); }) && setTimeout(function () {
        isActive(e) && binding.value && binding.value(e);
    }, 0);
}
export default {
    // [data-app] may not be found
    // if using bind, inserted makes
    // sure that the root element is
    // available, iOS does not support
    // clicks on body
    inserted: function (el, binding) {
        var onClick = function (e) { return directive(e, el, binding); };
        // iOS does not recognize click events on document
        // or body, this is the entire purpose of the v-app
        // component and [data-app], stop removing this
        var app = document.querySelector('[data-app]') ||
            document.body; // This is only for unit tests
        app.addEventListener('click', onClick, true);
        el._clickOutside = onClick;
    },
    unbind: function (el) {
        if (!el._clickOutside)
            return;
        var app = document.querySelector('[data-app]') ||
            document.body; // This is only for unit tests
        app && app.removeEventListener('click', el._clickOutside, true);
        delete el._clickOutside;
    }
};
//# sourceMappingURL=click-outside.js.map
//# sourceMappingURL=click-outside.js.map
//# sourceMappingURL=click-outside.js.map