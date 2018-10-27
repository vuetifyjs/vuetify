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
    name: 'click-outside',
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
        const app = document.querySelector('[data-app]') ||
            document.body; // This is only for unit tests
        app && app.removeEventListener('click', el._clickOutside, true);
        delete el._clickOutside;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaXJlY3RpdmVzL2NsaWNrLW91dHNpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JBLFNBQVMsZ0JBQWdCO0lBQ3ZCLE9BQU8sS0FBSyxDQUFBO0FBQ2QsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFFLENBQWUsRUFBRSxFQUFlLEVBQUUsT0FBOEI7SUFDbEYsa0NBQWtDO0lBQ2xDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUE7SUFFakMsdURBQXVEO0lBQ3ZELE1BQU0sUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFBO0lBRXBFLHVEQUF1RDtJQUN2RCx5REFBeUQ7SUFDekQsNkRBQTZEO0lBQzdELGlDQUFpQztJQUNqQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLO1FBQUUsT0FBTTtJQUV2Qyw4REFBOEQ7SUFDOUQsMkNBQTJDO0lBQzNDLDRDQUE0QztJQUM1QywrREFBK0Q7SUFDL0Qsc0JBQXNCO0lBQ3RCLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3RDLE9BQU07SUFFUixtRUFBbUU7SUFDbkUsd0RBQXdEO0lBQ3hELE1BQU0sUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFDdkQsdUVBQXVFO0lBQ3ZFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFakIscUZBQXFGO0lBQ3JGLG1GQUFtRjtJQUNuRix3REFBd0Q7SUFDeEQsa0ZBQWtGO0lBQ2xGLG9EQUFvRDtJQUNwRCxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUM1QyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDUCxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUUsQ0FBZSxFQUFFLFFBQXVCO0lBQzdELHdCQUF3QjtJQUN4QixNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3BDLHFFQUFxRTtJQUNyRSxLQUFLLE1BQU0sRUFBRSxJQUFJLFFBQVEsRUFBRTtRQUN6QixJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFBO0tBQ3ZDO0lBRUQsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUUsRUFBZSxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQ3pELGdDQUFnQztJQUNoQyx3RUFBd0U7SUFDeEUseUJBQXlCO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO0lBQ3BDLHdEQUF3RDtJQUV4RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFBO0FBQ25FLENBQUM7QUFFRCxlQUFlO0lBQ2IsSUFBSSxFQUFFLGVBQWU7SUFFckIsOEJBQThCO0lBQzlCLGdDQUFnQztJQUNoQyxnQ0FBZ0M7SUFDaEMsa0NBQWtDO0lBQ2xDLGlCQUFpQjtJQUNqQixRQUFRLENBQUUsRUFBMkIsRUFBRSxPQUE4QjtRQUNuRSxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQWlCLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZFLGtEQUFrRDtRQUNsRCxtREFBbUQ7UUFDbkQsK0NBQStDO1FBQy9DLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUEsQ0FBQyw4QkFBOEI7UUFDOUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDNUMsRUFBRSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUE7SUFDNUIsQ0FBQztJQUVELE1BQU0sQ0FBRSxFQUEyQjtRQUNqQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFBLENBQUMsOEJBQThCO1FBQzlDLEdBQUcsSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDL0QsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFBO0lBQ3pCLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVk5vZGVEaXJlY3RpdmUgfSBmcm9tICd2dWUvdHlwZXMvdm5vZGUnXG5cbmludGVyZmFjZSBDbGlja091dHNpZGVCaW5kaW5nQXJncyB7XG4gIGNsb3NlQ29uZGl0aW9uYWw/OiAoZTogRXZlbnQpID0+IGJvb2xlYW5cbiAgaW5jbHVkZT86ICgpID0+IEhUTUxFbGVtZW50W11cbn1cblxuaW50ZXJmYWNlIENsaWNrT3V0c2lkZURpcmVjdGl2ZSBleHRlbmRzIFZOb2RlRGlyZWN0aXZlIHtcbiAgdmFsdWU6IChlOiBFdmVudCkgPT4gdm9pZFxuICBhcmdzPzogQ2xpY2tPdXRzaWRlQmluZGluZ0FyZ3Ncbn1cblxuaW50ZXJmYWNlIENsaWNrT3V0c2lkZUhUTUxFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBfY2xpY2tPdXRzaWRlOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0XG59XG5cbmZ1bmN0aW9uIGNsb3NlQ29uZGl0aW9uYWwgKCkge1xuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gZGlyZWN0aXZlIChlOiBQb2ludGVyRXZlbnQsIGVsOiBIVE1MRWxlbWVudCwgYmluZGluZzogQ2xpY2tPdXRzaWRlRGlyZWN0aXZlKTogdm9pZCB7XG4gIC8vIEFyZ3MgbWF5IG5vdCBhbHdheXMgYmUgc3VwcGxpZWRcbiAgYmluZGluZy5hcmdzID0gYmluZGluZy5hcmdzIHx8IHt9XG5cbiAgLy8gSWYgbm8gY2xvc2VDb25kaXRpb25hbCB3YXMgc3VwcGxpZWQgYXNzaWduIGEgZGVmYXVsdFxuICBjb25zdCBpc0FjdGl2ZSA9IChiaW5kaW5nLmFyZ3MuY2xvc2VDb25kaXRpb25hbCB8fCBjbG9zZUNvbmRpdGlvbmFsKVxuXG4gIC8vIFRoZSBpbmNsdWRlIGVsZW1lbnQgY2FsbGJhY2tzIGJlbG93IGNhbiBiZSBleHBlbnNpdmVcbiAgLy8gc28gd2Ugc2hvdWxkIGF2b2lkIGNhbGxpbmcgdGhlbSB3aGVuIHdlJ3JlIG5vdCBhY3RpdmUuXG4gIC8vIEV4cGxpY2l0bHkgY2hlY2sgZm9yIGZhbHNlIHRvIGFsbG93IGZhbGxiYWNrIGNvbXBhdGliaWxpdHlcbiAgLy8gd2l0aCBub24tdG9nZ2xlYWJsZSBjb21wb25lbnRzXG4gIGlmICghZSB8fCBpc0FjdGl2ZShlKSA9PT0gZmFsc2UpIHJldHVyblxuXG4gIC8vIElmIGNsaWNrIHdhcyB0cmlnZ2VyZWQgcHJvZ3JhbW1hdGljYWx5IChkb21FbC5jbGljaygpKSB0aGVuXG4gIC8vIGl0IHNob3VsZG4ndCBiZSB0cmVhdGVkIGFzIGNsaWNrLW91dHNpZGVcbiAgLy8gQ2hyb21lL0ZpcmVmb3ggc3VwcG9ydCBpc1RydXN0ZWQgcHJvcGVydHlcbiAgLy8gSUUvRWRnZSBzdXBwb3J0IHBvaW50ZXJUeXBlIHByb3BlcnR5IChlbXB0eSBpZiBub3QgdHJpZ2dlcmVkXG4gIC8vIGJ5IHBvaW50aW5nIGRldmljZSlcbiAgaWYgKCgnaXNUcnVzdGVkJyBpbiBlICYmICFlLmlzVHJ1c3RlZCkgfHxcbiAgICAoJ3BvaW50ZXJUeXBlJyBpbiBlICYmICFlLnBvaW50ZXJUeXBlKVxuICApIHJldHVyblxuXG4gIC8vIENoZWNrIGlmIGFkZGl0aW9uYWwgZWxlbWVudHMgd2VyZSBwYXNzZWQgdG8gYmUgaW5jbHVkZWQgaW4gY2hlY2tcbiAgLy8gKGNsaWNrIG11c3QgYmUgb3V0c2lkZSBhbGwgaW5jbHVkZWQgZWxlbWVudHMsIGlmIGFueSlcbiAgY29uc3QgZWxlbWVudHMgPSAoYmluZGluZy5hcmdzLmluY2x1ZGUgfHwgKCgpID0+IFtdKSkoKVxuICAvLyBBZGQgdGhlIHJvb3QgZWxlbWVudCBmb3IgdGhlIGNvbXBvbmVudCB0aGlzIGRpcmVjdGl2ZSB3YXMgZGVmaW5lZCBvblxuICBlbGVtZW50cy5wdXNoKGVsKVxuXG4gIC8vIENoZWNrIGlmIGl0J3MgYSBjbGljayBvdXRzaWRlIG91ciBlbGVtZW50cywgYW5kIHRoZW4gaWYgb3VyIGNhbGxiYWNrIHJldHVybnMgdHJ1ZS5cbiAgLy8gTm9uLXRvZ2dsZWFibGUgY29tcG9uZW50cyBzaG91bGQgdGFrZSBhY3Rpb24gaW4gdGhlaXIgY2FsbGJhY2sgYW5kIHJldHVybiBmYWxzeS5cbiAgLy8gVG9nZ2xlYWJsZSBjYW4gcmV0dXJuIHRydWUgaWYgaXQgd2FudHMgdG8gZGVhY3RpdmF0ZS5cbiAgLy8gTm90ZSB0aGF0LCBiZWNhdXNlIHdlJ3JlIGluIHRoZSBjYXB0dXJlIHBoYXNlLCB0aGlzIGNhbGxiYWNrIHdpbGwgb2NjdXJlIGJlZm9yZVxuICAvLyB0aGUgYnViYmxpbmcgY2xpY2sgZXZlbnQgb24gYW55IG91dHNpZGUgZWxlbWVudHMuXG4gICFjbGlja2VkSW5FbHMoZSwgZWxlbWVudHMpICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlzQWN0aXZlKGUpICYmIGJpbmRpbmcudmFsdWUoZSlcbiAgfSwgMClcbn1cblxuZnVuY3Rpb24gY2xpY2tlZEluRWxzIChlOiBQb2ludGVyRXZlbnQsIGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdKTogYm9vbGVhbiB7XG4gIC8vIEdldCBwb3NpdGlvbiBvZiBjbGlja1xuICBjb25zdCB7IGNsaWVudFg6IHgsIGNsaWVudFk6IHkgfSA9IGVcbiAgLy8gTG9vcCBvdmVyIGFsbCBpbmNsdWRlZCBlbGVtZW50cyB0byBzZWUgaWYgY2xpY2sgd2FzIGluIGFueSBvZiB0aGVtXG4gIGZvciAoY29uc3QgZWwgb2YgZWxlbWVudHMpIHtcbiAgICBpZiAoY2xpY2tlZEluRWwoZWwsIHgsIHkpKSByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIGNsaWNrZWRJbkVsIChlbDogSFRNTEVsZW1lbnQsIHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gIC8vIEdldCBib3VuZGluZyByZWN0IGZvciBlbGVtZW50XG4gIC8vICh3ZSdyZSBpbiBjYXB0dXJpbmcgZXZlbnQgYW5kIHdlIHdhbnQgdG8gY2hlY2sgZm9yIG11bHRpcGxlIGVsZW1lbnRzLFxuICAvLyAgc28gY2FuJ3QgdXNlIHRhcmdldC4pXG4gIGNvbnN0IGIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAvLyBDaGVjayBpZiB0aGUgY2xpY2sgd2FzIGluIHRoZSBlbGVtZW50J3MgYm91bmRpbmcgcmVjdFxuXG4gIHJldHVybiB4ID49IGIubGVmdCAmJiB4IDw9IGIucmlnaHQgJiYgeSA+PSBiLnRvcCAmJiB5IDw9IGIuYm90dG9tXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2NsaWNrLW91dHNpZGUnLFxuXG4gIC8vIFtkYXRhLWFwcF0gbWF5IG5vdCBiZSBmb3VuZFxuICAvLyBpZiB1c2luZyBiaW5kLCBpbnNlcnRlZCBtYWtlc1xuICAvLyBzdXJlIHRoYXQgdGhlIHJvb3QgZWxlbWVudCBpc1xuICAvLyBhdmFpbGFibGUsIGlPUyBkb2VzIG5vdCBzdXBwb3J0XG4gIC8vIGNsaWNrcyBvbiBib2R5XG4gIGluc2VydGVkIChlbDogQ2xpY2tPdXRzaWRlSFRNTEVsZW1lbnQsIGJpbmRpbmc6IENsaWNrT3V0c2lkZURpcmVjdGl2ZSkge1xuICAgIGNvbnN0IG9uQ2xpY2sgPSAoZTogRXZlbnQpID0+IGRpcmVjdGl2ZShlIGFzIFBvaW50ZXJFdmVudCwgZWwsIGJpbmRpbmcpXG4gICAgLy8gaU9TIGRvZXMgbm90IHJlY29nbml6ZSBjbGljayBldmVudHMgb24gZG9jdW1lbnRcbiAgICAvLyBvciBib2R5LCB0aGlzIGlzIHRoZSBlbnRpcmUgcHVycG9zZSBvZiB0aGUgdi1hcHBcbiAgICAvLyBjb21wb25lbnQgYW5kIFtkYXRhLWFwcF0sIHN0b3AgcmVtb3ZpbmcgdGhpc1xuICAgIGNvbnN0IGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFwcF0nKSB8fFxuICAgICAgZG9jdW1lbnQuYm9keSAvLyBUaGlzIGlzIG9ubHkgZm9yIHVuaXQgdGVzdHNcbiAgICBhcHAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrLCB0cnVlKVxuICAgIGVsLl9jbGlja091dHNpZGUgPSBvbkNsaWNrXG4gIH0sXG5cbiAgdW5iaW5kIChlbDogQ2xpY2tPdXRzaWRlSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hcHBdJykgfHxcbiAgICAgIGRvY3VtZW50LmJvZHkgLy8gVGhpcyBpcyBvbmx5IGZvciB1bml0IHRlc3RzXG4gICAgYXBwICYmIGFwcC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGVsLl9jbGlja091dHNpZGUsIHRydWUpXG4gICAgZGVsZXRlIGVsLl9jbGlja091dHNpZGVcbiAgfVxufVxuIl19