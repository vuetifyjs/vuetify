import '../stylus/components/_overlay.styl';
// Utils
import { keyCodes } from '../util/helpers';
/* @vue/component */
export default {
    name: 'overlayable',
    props: {
        hideOverlay: Boolean
    },
    data() {
        return {
            overlay: null,
            overlayOffset: 0,
            overlayTimeout: null,
            overlayTransitionDuration: 500 + 150 // transition + delay
        };
    },
    beforeDestroy() {
        this.removeOverlay();
    },
    methods: {
        genOverlay() {
            // If fn is called and timeout is active
            // or overlay already exists
            // cancel removal of overlay and re-add active
            if ((!this.isActive || this.hideOverlay) ||
                (this.isActive && this.overlayTimeout) ||
                this.overlay) {
                clearTimeout(this.overlayTimeout);
                return this.overlay &&
                    this.overlay.classList.add('v-overlay--active');
            }
            this.overlay = document.createElement('div');
            this.overlay.className = 'v-overlay';
            if (this.absolute)
                this.overlay.className += ' v-overlay--absolute';
            this.hideScroll();
            const parent = this.absolute
                ? this.$el.parentNode
                : document.querySelector('[data-app]');
            parent && parent.insertBefore(this.overlay, parent.firstChild);
            // eslint-disable-next-line no-unused-expressions
            this.overlay.clientHeight; // Force repaint
            requestAnimationFrame(() => {
                // https://github.com/vuetifyjs/vuetify/issues/4678
                if (!this.overlay)
                    return;
                this.overlay.className += ' v-overlay--active';
                if (this.activeZIndex !== undefined) {
                    this.overlay.style.zIndex = this.activeZIndex - 1;
                }
            });
            return true;
        },
        removeOverlay() {
            if (!this.overlay) {
                return this.showScroll();
            }
            this.overlay.classList.remove('v-overlay--active');
            this.overlayTimeout = setTimeout(() => {
                // IE11 Fix
                try {
                    if (this.overlay && this.overlay.parentNode) {
                        this.overlay.parentNode.removeChild(this.overlay);
                    }
                    this.overlay = null;
                    this.showScroll();
                }
                catch (e) {
                    console.log(e);
                }
                clearTimeout(this.overlayTimeout);
                this.overlayTimeout = null;
            }, this.overlayTransitionDuration);
        },
        /**
         * @param {Event} e
         * @returns void
         */
        scrollListener(e) {
            if (e.type === 'keydown') {
                if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) ||
                    // https://github.com/vuetifyjs/vuetify/issues/4715
                    e.target.isContentEditable)
                    return;
                const up = [keyCodes.up, keyCodes.pageup];
                const down = [keyCodes.down, keyCodes.pagedown];
                if (up.includes(e.keyCode)) {
                    e.deltaY = -1;
                }
                else if (down.includes(e.keyCode)) {
                    e.deltaY = 1;
                }
                else {
                    return;
                }
            }
            if (e.target === this.overlay ||
                (e.type !== 'keydown' && e.target === document.body) ||
                this.checkPath(e))
                e.preventDefault();
        },
        hasScrollbar(el) {
            if (!el || el.nodeType !== Node.ELEMENT_NODE)
                return false;
            const style = window.getComputedStyle(el);
            return ['auto', 'scroll'].includes(style['overflow-y']) && el.scrollHeight > el.clientHeight;
        },
        shouldScroll(el, delta) {
            if (el.scrollTop === 0 && delta < 0)
                return true;
            return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
        },
        isInside(el, parent) {
            if (el === parent) {
                return true;
            }
            else if (el === null || el === document.body) {
                return false;
            }
            else {
                return this.isInside(el.parentNode, parent);
            }
        },
        /**
         * @param {Event} e
         * @returns boolean
         */
        checkPath(e) {
            const path = e.path || this.composedPath(e);
            const delta = e.deltaY || -e.wheelDelta;
            if (e.type === 'keydown' && path[0] === document.body) {
                const dialog = this.$refs.dialog;
                const selected = window.getSelection().anchorNode;
                if (this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
                    return this.shouldScroll(dialog, delta);
                }
                return true;
            }
            for (let index = 0; index < path.length; index++) {
                const el = path[index];
                if (el === document)
                    return true;
                if (el === document.documentElement)
                    return true;
                if (el === this.$refs.content)
                    return true;
                if (this.hasScrollbar(el))
                    return this.shouldScroll(el, delta);
            }
            return true;
        },
        /**
         * Polyfill for Event.prototype.composedPath
         * @param {Event} e
         * @returns Element[]
         */
        composedPath(e) {
            if (e.composedPath)
                return e.composedPath();
            const path = [];
            let el = e.target;
            while (el) {
                path.push(el);
                if (el.tagName === 'HTML') {
                    path.push(document);
                    path.push(window);
                    return path;
                }
                el = el.parentElement;
            }
        },
        hideScroll() {
            if (this.$vuetify.breakpoint.smAndDown) {
                document.documentElement.classList.add('overflow-y-hidden');
            }
            else {
                window.addEventListener('wheel', this.scrollListener);
                window.addEventListener('keydown', this.scrollListener);
            }
        },
        showScroll() {
            document.documentElement.classList.remove('overflow-y-hidden');
            window.removeEventListener('wheel', this.scrollListener);
            window.removeEventListener('keydown', this.scrollListener);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheWFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWl4aW5zL292ZXJsYXlhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sb0NBQW9DLENBQUE7QUFFM0MsUUFBUTtBQUNSLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUUxQyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxhQUFhO0lBRW5CLEtBQUssRUFBRTtRQUNMLFdBQVcsRUFBRSxPQUFPO0tBQ3JCO0lBRUQsSUFBSTtRQUNGLE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSTtZQUNiLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLHlCQUF5QixFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMscUJBQXFCO1NBQzNELENBQUE7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBRUQsT0FBTyxFQUFFO1FBQ1AsVUFBVTtZQUNSLHdDQUF3QztZQUN4Qyw0QkFBNEI7WUFDNUIsOENBQThDO1lBQzlDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDdEMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLEVBQ1o7Z0JBQ0EsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtnQkFFakMsT0FBTyxJQUFJLENBQUMsT0FBTztvQkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7YUFDbEQ7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDNUMsSUFBSSxDQUFDLE9B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T0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtnQkFDckQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7YUFDeEQ7UUFDSCxDQUFDO1FBQ0QsVUFBVTtZQUNSLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1lBQzlELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQ3hELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzVELENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWx1cy9jb21wb25lbnRzL19vdmVybGF5LnN0eWwnXG5cbi8vIFV0aWxzXG5pbXBvcnQgeyBrZXlDb2RlcyB9IGZyb20gJy4uL3V0aWwvaGVscGVycydcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ292ZXJsYXlhYmxlJyxcblxuICBwcm9wczoge1xuICAgIGhpZGVPdmVybGF5OiBCb29sZWFuXG4gIH0sXG5cbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG92ZXJsYXk6IG51bGwsXG4gICAgICBvdmVybGF5T2Zmc2V0OiAwLFxuICAgICAgb3ZlcmxheVRpbWVvdXQ6IG51bGwsXG4gICAgICBvdmVybGF5VHJhbnNpdGlvbkR1cmF0aW9uOiA1MDAgKyAxNTAgLy8gdHJhbnNpdGlvbiArIGRlbGF5XG4gICAgfVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIHRoaXMucmVtb3ZlT3ZlcmxheSgpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbk92ZXJsYXkgKCkge1xuICAgICAgLy8gSWYgZm4gaXMgY2FsbGVkIGFuZCB0aW1lb3V0IGlzIGFjdGl2ZVxuICAgICAgLy8gb3Igb3ZlcmxheSBhbHJlYWR5IGV4aXN0c1xuICAgICAgLy8gY2FuY2VsIHJlbW92YWwgb2Ygb3ZlcmxheSBhbmQgcmUtYWRkIGFjdGl2ZVxuICAgICAgaWYgKCghdGhpcy5pc0FjdGl2ZSB8fCB0aGlzLmhpZGVPdmVybGF5KSB8fFxuICAgICAgICAodGhpcy5pc0FjdGl2ZSAmJiB0aGlzLm92ZXJsYXlUaW1lb3V0KSB8fFxuICAgICAgICB0aGlzLm92ZXJsYXlcbiAgICAgICkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5vdmVybGF5VGltZW91dClcblxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5ICYmXG4gICAgICAgICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Ytb3ZlcmxheS0tYWN0aXZlJylcbiAgICAgIH1cblxuICAgICAgdGhpcy5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIHRoaXMub3ZlcmxheS5jbGFzc05hbWUgPSAndi1vdmVybGF5J1xuXG4gICAgICBpZiAodGhpcy5hYnNvbHV0ZSkgdGhpcy5vdmVybGF5LmNsYXNzTmFtZSArPSAnIHYtb3ZlcmxheS0tYWJzb2x1dGUnXG5cbiAgICAgIHRoaXMuaGlkZVNjcm9sbCgpXG5cbiAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuYWJzb2x1dGVcbiAgICAgICAgPyB0aGlzLiRlbC5wYXJlbnROb2RlXG4gICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtYXBwXScpXG5cbiAgICAgIHBhcmVudCAmJiBwYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMub3ZlcmxheSwgcGFyZW50LmZpcnN0Q2hpbGQpXG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgIHRoaXMub3ZlcmxheS5jbGllbnRIZWlnaHQgLy8gRm9yY2UgcmVwYWludFxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Z1ZXRpZnlqcy92dWV0aWZ5L2lzc3Vlcy80Njc4XG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5KSByZXR1cm5cblxuICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lICs9ICcgdi1vdmVybGF5LS1hY3RpdmUnXG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlWkluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuekluZGV4ID0gdGhpcy5hY3RpdmVaSW5kZXggLSAxXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSxcbiAgICByZW1vdmVPdmVybGF5ICgpIHtcbiAgICAgIGlmICghdGhpcy5vdmVybGF5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dTY3JvbGwoKVxuICAgICAgfVxuXG4gICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgndi1vdmVybGF5LS1hY3RpdmUnKVxuXG4gICAgICB0aGlzLm92ZXJsYXlUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIElFMTEgRml4XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5vdmVybGF5KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsXG4gICAgICAgICAgdGhpcy5zaG93U2Nyb2xsKClcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmxvZyhlKSB9XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMub3ZlcmxheVRpbWVvdXQpXG4gICAgICAgIHRoaXMub3ZlcmxheVRpbWVvdXQgPSBudWxsXG4gICAgICB9LCB0aGlzLm92ZXJsYXlUcmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHNjcm9sbExpc3RlbmVyIChlKSB7XG4gICAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIFsnSU5QVVQnLCAnVEVYVEFSRUEnLCAnU0VMRUNUJ10uaW5jbHVkZXMoZS50YXJnZXQudGFnTmFtZSkgfHxcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdnVldGlmeWpzL3Z1ZXRpZnkvaXNzdWVzLzQ3MTVcbiAgICAgICAgICBlLnRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZVxuICAgICAgICApIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHVwID0gW2tleUNvZGVzLnVwLCBrZXlDb2Rlcy5wYWdldXBdXG4gICAgICAgIGNvbnN0IGRvd24gPSBba2V5Q29kZXMuZG93biwga2V5Q29kZXMucGFnZWRvd25dXG5cbiAgICAgICAgaWYgKHVwLmluY2x1ZGVzKGUua2V5Q29kZSkpIHtcbiAgICAgICAgICBlLmRlbHRhWSA9IC0xXG4gICAgICAgIH0gZWxzZSBpZiAoZG93bi5pbmNsdWRlcyhlLmtleUNvZGUpKSB7XG4gICAgICAgICAgZS5kZWx0YVkgPSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLm92ZXJsYXkgfHxcbiAgICAgICAgKGUudHlwZSAhPT0gJ2tleWRvd24nICYmIGUudGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5KSB8fFxuICAgICAgICB0aGlzLmNoZWNrUGF0aChlKSkgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSxcbiAgICBoYXNTY3JvbGxiYXIgKGVsKSB7XG4gICAgICBpZiAoIWVsIHx8IGVsLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkgcmV0dXJuIGZhbHNlXG5cbiAgICAgIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpXG4gICAgICByZXR1cm4gWydhdXRvJywgJ3Njcm9sbCddLmluY2x1ZGVzKHN0eWxlWydvdmVyZmxvdy15J10pICYmIGVsLnNjcm9sbEhlaWdodCA+IGVsLmNsaWVudEhlaWdodFxuICAgIH0sXG4gICAgc2hvdWxkU2Nyb2xsIChlbCwgZGVsdGEpIHtcbiAgICAgIGlmIChlbC5zY3JvbGxUb3AgPT09IDAgJiYgZGVsdGEgPCAwKSByZXR1cm4gdHJ1ZVxuICAgICAgcmV0dXJuIGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudEhlaWdodCA9PT0gZWwuc2Nyb2xsSGVpZ2h0ICYmIGRlbHRhID4gMFxuICAgIH0sXG4gICAgaXNJbnNpZGUgKGVsLCBwYXJlbnQpIHtcbiAgICAgIGlmIChlbCA9PT0gcGFyZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGVsc2UgaWYgKGVsID09PSBudWxsIHx8IGVsID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNJbnNpZGUoZWwucGFyZW50Tm9kZSwgcGFyZW50KVxuICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICAgKi9cbiAgICBjaGVja1BhdGggKGUpIHtcbiAgICAgIGNvbnN0IHBhdGggPSBlLnBhdGggfHwgdGhpcy5jb21wb3NlZFBhdGgoZSlcbiAgICAgIGNvbnN0IGRlbHRhID0gZS5kZWx0YVkgfHwgLWUud2hlZWxEZWx0YVxuXG4gICAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicgJiYgcGF0aFswXSA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICBjb25zdCBkaWFsb2cgPSB0aGlzLiRyZWZzLmRpYWxvZ1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlXG4gICAgICAgIGlmICh0aGlzLmhhc1Njcm9sbGJhcihkaWFsb2cpICYmIHRoaXMuaXNJbnNpZGUoc2VsZWN0ZWQsIGRpYWxvZykpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zaG91bGRTY3JvbGwoZGlhbG9nLCBkZWx0YSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGF0aC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgZWwgPSBwYXRoW2luZGV4XVxuXG4gICAgICAgIGlmIChlbCA9PT0gZG9jdW1lbnQpIHJldHVybiB0cnVlXG4gICAgICAgIGlmIChlbCA9PT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSByZXR1cm4gdHJ1ZVxuICAgICAgICBpZiAoZWwgPT09IHRoaXMuJHJlZnMuY29udGVudCkgcmV0dXJuIHRydWVcblxuICAgICAgICBpZiAodGhpcy5oYXNTY3JvbGxiYXIoZWwpKSByZXR1cm4gdGhpcy5zaG91bGRTY3JvbGwoZWwsIGRlbHRhKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogUG9seWZpbGwgZm9yIEV2ZW50LnByb3RvdHlwZS5jb21wb3NlZFBhdGhcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAgICogQHJldHVybnMgRWxlbWVudFtdXG4gICAgICovXG4gICAgY29tcG9zZWRQYXRoIChlKSB7XG4gICAgICBpZiAoZS5jb21wb3NlZFBhdGgpIHJldHVybiBlLmNvbXBvc2VkUGF0aCgpXG5cbiAgICAgIGNvbnN0IHBhdGggPSBbXVxuICAgICAgbGV0IGVsID0gZS50YXJnZXRcblxuICAgICAgd2hpbGUgKGVsKSB7XG4gICAgICAgIHBhdGgucHVzaChlbClcblxuICAgICAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgcGF0aC5wdXNoKGRvY3VtZW50KVxuICAgICAgICAgIHBhdGgucHVzaCh3aW5kb3cpXG5cbiAgICAgICAgICByZXR1cm4gcGF0aFxuICAgICAgICB9XG5cbiAgICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50XG4gICAgICB9XG4gICAgfSxcbiAgICBoaWRlU2Nyb2xsICgpIHtcbiAgICAgIGlmICh0aGlzLiR2dWV0aWZ5LmJyZWFrcG9pbnQuc21BbmREb3duKSB7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdy15LWhpZGRlbicpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLnNjcm9sbExpc3RlbmVyKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuc2Nyb2xsTGlzdGVuZXIpXG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93U2Nyb2xsICgpIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy15LWhpZGRlbicpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCB0aGlzLnNjcm9sbExpc3RlbmVyKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLnNjcm9sbExpc3RlbmVyKVxuICAgIH1cbiAgfVxufVxuIl19