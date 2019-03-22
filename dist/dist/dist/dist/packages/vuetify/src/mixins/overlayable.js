// Styles
import '../stylus/components/_overlay.styl';
// Utilities
import { keyCodes } from '../util/helpers';
// Types
import Vue from 'vue';
/* @vue/component */
export default Vue.extend().extend({
    name: 'overlayable',
    props: {
        hideOverlay: Boolean
    },
    data: function () {
        return {
            overlay: null,
            overlayOffset: 0,
            overlayTimeout: undefined,
            overlayTransitionDuration: 500 + 150 // transition + delay
        };
    },
    watch: {
        hideOverlay: function (value) {
            if (value)
                this.removeOverlay();
            else
                this.genOverlay();
        }
    },
    beforeDestroy: function () {
        this.removeOverlay();
    },
    methods: {
        genOverlay: function () {
            var _this = this;
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
            var parent = this.absolute
                ? this.$el.parentNode
                : document.querySelector('[data-app]');
            parent && parent.insertBefore(this.overlay, parent.firstChild);
            // eslint-disable-next-line no-unused-expressions
            this.overlay.clientHeight; // Force repaint
            requestAnimationFrame(function () {
                // https://github.com/vuetifyjs/vuetify/issues/4678
                if (!_this.overlay)
                    return;
                _this.overlay.className += ' v-overlay--active';
                if (_this.activeZIndex !== undefined) {
                    _this.overlay.style.zIndex = String(_this.activeZIndex - 1);
                }
            });
            return true;
        },
        /** removeOverlay(false) will not restore the scollbar afterwards */
        removeOverlay: function (showScroll) {
            var _this = this;
            if (showScroll === void 0) {
                showScroll = true;
            }
            if (!this.overlay) {
                return showScroll && this.showScroll();
            }
            this.overlay.classList.remove('v-overlay--active');
            this.overlayTimeout = window.setTimeout(function () {
                // IE11 Fix
                try {
                    if (_this.overlay && _this.overlay.parentNode) {
                        _this.overlay.parentNode.removeChild(_this.overlay);
                    }
                    _this.overlay = null;
                    showScroll && _this.showScroll();
                }
                catch (e) {
                    console.log(e);
                }
                clearTimeout(_this.overlayTimeout);
                _this.overlayTimeout = undefined;
            }, this.overlayTransitionDuration);
        },
        scrollListener: function (e) {
            if (e.type === 'keydown') {
                if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) ||
                    // https://github.com/vuetifyjs/vuetify/issues/4715
                    e.target.isContentEditable)
                    return;
                var up = [keyCodes.up, keyCodes.pageup];
                var down = [keyCodes.down, keyCodes.pagedown];
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
        hasScrollbar: function (el) {
            if (!el || el.nodeType !== Node.ELEMENT_NODE)
                return false;
            var style = window.getComputedStyle(el);
            return ['auto', 'scroll'].includes(style.overflowY) && el.scrollHeight > el.clientHeight;
        },
        shouldScroll: function (el, delta) {
            if (el.scrollTop === 0 && delta < 0)
                return true;
            return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
        },
        isInside: function (el, parent) {
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
        checkPath: function (e) {
            var path = e.path || this.composedPath(e);
            var delta = e.deltaY;
            if (e.type === 'keydown' && path[0] === document.body) {
                var dialog = this.$refs.dialog;
                var selected = window.getSelection().anchorNode;
                if (dialog && this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
                    return this.shouldScroll(dialog, delta);
                }
                return true;
            }
            for (var index = 0; index < path.length; index++) {
                var el = path[index];
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
         */
        composedPath: function (e) {
            if (e.composedPath)
                return e.composedPath();
            var path = [];
            var el = e.target;
            while (el) {
                path.push(el);
                if (el.tagName === 'HTML') {
                    path.push(document);
                    path.push(window);
                    return path;
                }
                el = el.parentElement;
            }
            return path;
        },
        hideScroll: function () {
            if (this.$vuetify.breakpoint.smAndDown) {
                document.documentElement.classList.add('overflow-y-hidden');
            }
            else {
                window.addEventListener('wheel', this.scrollListener, { passive: false });
                window.addEventListener('keydown', this.scrollListener);
            }
        },
        showScroll: function () {
            document.documentElement.classList.remove('overflow-y-hidden');
            window.removeEventListener('wheel', this.scrollListener);
            window.removeEventListener('keydown', this.scrollListener);
        }
    }
});
//# sourceMappingURL=overlayable.js.map
//# sourceMappingURL=overlayable.js.map
//# sourceMappingURL=overlayable.js.map
//# sourceMappingURL=overlayable.js.map