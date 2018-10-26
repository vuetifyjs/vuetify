function closeConditional() {
    return false;
}
function directive(e, el, binding) {
    // Args may not always be supplied
    binding.args = binding.args || {};
    // If no closeConditional was supplied assign a default
    const isActive = (binding.args.closeConditional || closeConditional);
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
    const elements = (binding.args.include || (() => []))();
    // Add the root element for the component this directive was defined on
    elements.push(el);
    // Check if it's a click outside our elements, and then if our callback returns true.
    // Non-toggleable components should take action in their callback and return falsy.
    // Toggleable can return true if it wants to deactivate.
    // Note that, because we're in the capture phase, this callback will occure before
    // the bubbling click event on any outside elements.
    !clickedInEls(e, elements) && setTimeout(() => {
        isActive(e) && binding.value(e);
    }, 0);
}
function clickedInEls(e, elements) {
    // Get position of click
    const { clientX: x, clientY: y } = e;
    // Loop over all included elements to see if click was in any of them
    for (const el of elements) {
        if (clickedInEl(el, x, y))
            return true;
    }
    return false;
}
function clickedInEl(el, x, y) {
    // Get bounding rect for element
    // (we're in capturing event and we want to check for multiple elements,
    //  so can't use target.)
    const b = el.getBoundingClientRect();
    // Check if the click was in the element's bounding rect
    return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
}
export default {
    // [data-app] may not be found
    // if using bind, inserted makes
    // sure that the root element is
    // available, iOS does not support
    // clicks on body
    inserted(el, binding) {
        const onClick = (e) => directive(e, el, binding);
        // iOS does not recognize click events on document
        // or body, this is the entire purpose of the v-app
        // component and [data-app], stop removing this
        const app = document.querySelector('[data-app]') ||
            document.body; // This is only for unit tests
        app.addEventListener('click', onClick, true);
        el._clickOutside = onClick;
    },
    unbind(el) {
        if (!el._clickOutside)
            return;
        const app = document.querySelector('[data-app]') ||
            document.body; // This is only for unit tests
        app && app.removeEventListener('click', el._clickOutside, true);
        delete el._clickOutside;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWUEsU0FBUyxnQkFBZ0I7SUFDdkIsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUUsQ0FBZSxFQUFFLEVBQWUsRUFBRSxPQUE4QjtJQUNsRixrQ0FBa0M7SUFDbEMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQTtJQUVqQyx1REFBdUQ7SUFDdkQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLENBQUE7SUFFcEUsdURBQXVEO0lBQ3ZELHlEQUF5RDtJQUN6RCw2REFBNkQ7SUFDN0QsaUNBQWlDO0lBQ2pDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUs7UUFBRSxPQUFNO0lBRXZDLDhEQUE4RDtJQUM5RCwyQ0FBMkM7SUFDM0MsNENBQTRDO0lBQzVDLCtEQUErRDtJQUMvRCxzQkFBc0I7SUFDdEIsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3BDLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDdEMsT0FBTTtJQUVSLG1FQUFtRTtJQUNuRSx3REFBd0Q7SUFDeEQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUN2RCx1RUFBdUU7SUFDdkUsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVqQixxRkFBcUY7SUFDckYsbUZBQW1GO0lBQ25GLHdEQUF3RDtJQUN4RCxrRkFBa0Y7SUFDbEYsb0RBQW9EO0lBQ3BELENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQzVDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2pDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNQLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBRSxDQUFlLEVBQUUsUUFBdUI7SUFDN0Qsd0JBQXdCO0lBQ3hCLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7SUFDcEMscUVBQXFFO0lBQ3JFLEtBQUssTUFBTSxFQUFFLElBQUksUUFBUSxFQUFFO1FBQ3pCLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUE7S0FDdkM7SUFFRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBRSxFQUFlLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDekQsZ0NBQWdDO0lBQ2hDLHdFQUF3RTtJQUN4RSx5QkFBeUI7SUFDekIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUE7SUFDcEMsd0RBQXdEO0lBRXhELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDbkUsQ0FBQztBQUVELGVBQWU7SUFDYiw4QkFBOEI7SUFDOUIsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyxrQ0FBa0M7SUFDbEMsaUJBQWlCO0lBQ2pCLFFBQVEsQ0FBRSxFQUFlLEVBQUUsT0FBOEI7UUFDdkQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFpQixFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUN2RSxrREFBa0Q7UUFDbEQsbURBQW1EO1FBQ25ELCtDQUErQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFBLENBQUMsOEJBQThCO1FBQzlDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzVDLEVBQUUsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFBO0lBQzVCLENBQUM7SUFFRCxNQUFNLENBQUUsRUFBZTtRQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWE7WUFBRSxPQUFNO1FBRTdCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUEsQ0FBQyw4QkFBOEI7UUFDOUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMvRCxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUE7SUFDekIsQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWTm9kZURpcmVjdGl2ZSB9IGZyb20gJ3Z1ZS90eXBlcy92bm9kZSdcblxuaW50ZXJmYWNlIENsaWNrT3V0c2lkZUJpbmRpbmdBcmdzIHtcbiAgY2xvc2VDb25kaXRpb25hbD86IChlOiBFdmVudCkgPT4gYm9vbGVhblxuICBpbmNsdWRlPzogKCkgPT4gSFRNTEVsZW1lbnRbXVxufVxuXG5pbnRlcmZhY2UgQ2xpY2tPdXRzaWRlRGlyZWN0aXZlIGV4dGVuZHMgVk5vZGVEaXJlY3RpdmUge1xuICB2YWx1ZTogKGU6IEV2ZW50KSA9PiB2b2lkXG4gIGFyZ3M/OiBDbGlja091dHNpZGVCaW5kaW5nQXJnc1xufVxuXG5mdW5jdGlvbiBjbG9zZUNvbmRpdGlvbmFsICgpIHtcbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIGRpcmVjdGl2ZSAoZTogUG9pbnRlckV2ZW50LCBlbDogSFRNTEVsZW1lbnQsIGJpbmRpbmc6IENsaWNrT3V0c2lkZURpcmVjdGl2ZSk6IHZvaWQge1xuICAvLyBBcmdzIG1heSBub3QgYWx3YXlzIGJlIHN1cHBsaWVkXG4gIGJpbmRpbmcuYXJncyA9IGJpbmRpbmcuYXJncyB8fCB7fVxuXG4gIC8vIElmIG5vIGNsb3NlQ29uZGl0aW9uYWwgd2FzIHN1cHBsaWVkIGFzc2lnbiBhIGRlZmF1bHRcbiAgY29uc3QgaXNBY3RpdmUgPSAoYmluZGluZy5hcmdzLmNsb3NlQ29uZGl0aW9uYWwgfHwgY2xvc2VDb25kaXRpb25hbClcblxuICAvLyBUaGUgaW5jbHVkZSBlbGVtZW50IGNhbGxiYWNrcyBiZWxvdyBjYW4gYmUgZXhwZW5zaXZlXG4gIC8vIHNvIHdlIHNob3VsZCBhdm9pZCBjYWxsaW5nIHRoZW0gd2hlbiB3ZSdyZSBub3QgYWN0aXZlLlxuICAvLyBFeHBsaWNpdGx5IGNoZWNrIGZvciBmYWxzZSB0byBhbGxvdyBmYWxsYmFjayBjb21wYXRpYmlsaXR5XG4gIC8vIHdpdGggbm9uLXRvZ2dsZWFibGUgY29tcG9uZW50c1xuICBpZiAoIWUgfHwgaXNBY3RpdmUoZSkgPT09IGZhbHNlKSByZXR1cm5cblxuICAvLyBJZiBjbGljayB3YXMgdHJpZ2dlcmVkIHByb2dyYW1tYXRpY2FseSAoZG9tRWwuY2xpY2soKSkgdGhlblxuICAvLyBpdCBzaG91bGRuJ3QgYmUgdHJlYXRlZCBhcyBjbGljay1vdXRzaWRlXG4gIC8vIENocm9tZS9GaXJlZm94IHN1cHBvcnQgaXNUcnVzdGVkIHByb3BlcnR5XG4gIC8vIElFL0VkZ2Ugc3VwcG9ydCBwb2ludGVyVHlwZSBwcm9wZXJ0eSAoZW1wdHkgaWYgbm90IHRyaWdnZXJlZFxuICAvLyBieSBwb2ludGluZyBkZXZpY2UpXG4gIGlmICgoJ2lzVHJ1c3RlZCcgaW4gZSAmJiAhZS5pc1RydXN0ZWQpIHx8XG4gICAgKCdwb2ludGVyVHlwZScgaW4gZSAmJiAhZS5wb2ludGVyVHlwZSlcbiAgKSByZXR1cm5cblxuICAvLyBDaGVjayBpZiBhZGRpdGlvbmFsIGVsZW1lbnRzIHdlcmUgcGFzc2VkIHRvIGJlIGluY2x1ZGVkIGluIGNoZWNrXG4gIC8vIChjbGljayBtdXN0IGJlIG91dHNpZGUgYWxsIGluY2x1ZGVkIGVsZW1lbnRzLCBpZiBhbnkpXG4gIGNvbnN0IGVsZW1lbnRzID0gKGJpbmRpbmcuYXJncy5pbmNsdWRlIHx8ICgoKSA9PiBbXSkpKClcbiAgLy8gQWRkIHRoZSByb290IGVsZW1lbnQgZm9yIHRoZSBjb21wb25lbnQgdGhpcyBkaXJlY3RpdmUgd2FzIGRlZmluZWQgb25cbiAgZWxlbWVudHMucHVzaChlbClcblxuICAvLyBDaGVjayBpZiBpdCdzIGEgY2xpY2sgb3V0c2lkZSBvdXIgZWxlbWVudHMsIGFuZCB0aGVuIGlmIG91ciBjYWxsYmFjayByZXR1cm5zIHRydWUuXG4gIC8vIE5vbi10b2dnbGVhYmxlIGNvbXBvbmVudHMgc2hvdWxkIHRha2UgYWN0aW9uIGluIHRoZWlyIGNhbGxiYWNrIGFuZCByZXR1cm4gZmFsc3kuXG4gIC8vIFRvZ2dsZWFibGUgY2FuIHJldHVybiB0cnVlIGlmIGl0IHdhbnRzIHRvIGRlYWN0aXZhdGUuXG4gIC8vIE5vdGUgdGhhdCwgYmVjYXVzZSB3ZSdyZSBpbiB0aGUgY2FwdHVyZSBwaGFzZSwgdGhpcyBjYWxsYmFjayB3aWxsIG9jY3VyZSBiZWZvcmVcbiAgLy8gdGhlIGJ1YmJsaW5nIGNsaWNrIGV2ZW50IG9uIGFueSBvdXRzaWRlIGVsZW1lbnRzLlxuICAhY2xpY2tlZEluRWxzKGUsIGVsZW1lbnRzKSAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpc0FjdGl2ZShlKSAmJiBiaW5kaW5nLnZhbHVlKGUpXG4gIH0sIDApXG59XG5cbmZ1bmN0aW9uIGNsaWNrZWRJbkVscyAoZTogUG9pbnRlckV2ZW50LCBlbGVtZW50czogSFRNTEVsZW1lbnRbXSk6IGJvb2xlYW4ge1xuICAvLyBHZXQgcG9zaXRpb24gb2YgY2xpY2tcbiAgY29uc3QgeyBjbGllbnRYOiB4LCBjbGllbnRZOiB5IH0gPSBlXG4gIC8vIExvb3Agb3ZlciBhbGwgaW5jbHVkZWQgZWxlbWVudHMgdG8gc2VlIGlmIGNsaWNrIHdhcyBpbiBhbnkgb2YgdGhlbVxuICBmb3IgKGNvbnN0IGVsIG9mIGVsZW1lbnRzKSB7XG4gICAgaWYgKGNsaWNrZWRJbkVsKGVsLCB4LCB5KSkgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBjbGlja2VkSW5FbCAoZWw6IEhUTUxFbGVtZW50LCB4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAvLyBHZXQgYm91bmRpbmcgcmVjdCBmb3IgZWxlbWVudFxuICAvLyAod2UncmUgaW4gY2FwdHVyaW5nIGV2ZW50IGFuZCB3ZSB3YW50IHRvIGNoZWNrIGZvciBtdWx0aXBsZSBlbGVtZW50cyxcbiAgLy8gIHNvIGNhbid0IHVzZSB0YXJnZXQuKVxuICBjb25zdCBiID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgLy8gQ2hlY2sgaWYgdGhlIGNsaWNrIHdhcyBpbiB0aGUgZWxlbWVudCdzIGJvdW5kaW5nIHJlY3RcblxuICByZXR1cm4geCA+PSBiLmxlZnQgJiYgeCA8PSBiLnJpZ2h0ICYmIHkgPj0gYi50b3AgJiYgeSA8PSBiLmJvdHRvbVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIFtkYXRhLWFwcF0gbWF5IG5vdCBiZSBmb3VuZFxuICAvLyBpZiB1c2luZyBiaW5kLCBpbnNlcnRlZCBtYWtlc1xuICAvLyBzdXJlIHRoYXQgdGhlIHJvb3QgZWxlbWVudCBpc1xuICAvLyBhdmFpbGFibGUsIGlPUyBkb2VzIG5vdCBzdXBwb3J0XG4gIC8vIGNsaWNrcyBvbiBib2R5XG4gIGluc2VydGVkIChlbDogSFRNTEVsZW1lbnQsIGJpbmRpbmc6IENsaWNrT3V0c2lkZURpcmVjdGl2ZSkge1xuICAgIGNvbnN0IG9uQ2xpY2sgPSAoZTogRXZlbnQpID0+IGRpcmVjdGl2ZShlIGFzIFBvaW50ZXJFdmVudCwgZWwsIGJpbmRpbmcpXG4gICAgLy8gaU9TIGRvZXMgbm90IHJlY29nbml6ZSBjbGljayBldmVudHMgb24gZG9jdW1lbnRcbiAgICAvLyBvciBib2R5LCB0aGlzIGlzIHRoZSBlbnRpcmUgcHVycG9zZSBvZiB0aGUgdi1hcHBcbiAgICAvLyBjb21wb25lbnQgYW5kIFtkYXRhLWFwcF0sIHN0b3AgcmVtb3ZpbmcgdGhpc1xuICAgIGNvbnN0IGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFwcF0nKSB8fFxuICAgICAgZG9jdW1lbnQuYm9keSAvLyBUaGlzIGlzIG9ubHkgZm9yIHVuaXQgdGVzdHNcbiAgICBhcHAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrLCB0cnVlKVxuICAgIGVsLl9jbGlja091dHNpZGUgPSBvbkNsaWNrXG4gIH0sXG5cbiAgdW5iaW5kIChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoIWVsLl9jbGlja091dHNpZGUpIHJldHVyblxuXG4gICAgY29uc3QgYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtYXBwXScpIHx8XG4gICAgICBkb2N1bWVudC5ib2R5IC8vIFRoaXMgaXMgb25seSBmb3IgdW5pdCB0ZXN0c1xuICAgIGFwcCAmJiBhcHAucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlbC5fY2xpY2tPdXRzaWRlLCB0cnVlKVxuICAgIGRlbGV0ZSBlbC5fY2xpY2tPdXRzaWRlXG4gIH1cbn1cbiJdfQ==