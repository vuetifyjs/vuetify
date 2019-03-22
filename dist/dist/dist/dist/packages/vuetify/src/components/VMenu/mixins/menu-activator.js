/**
 * Menu activator
 *
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 */
/* @vue/component */
export default {
    methods: {
        activatorClickHandler: function (e) {
            if (this.openOnClick && !this.isActive) {
                this.getActivator(e).focus();
                this.isActive = true;
                this.absoluteX = e.clientX;
                this.absoluteY = e.clientY;
            }
            else if (this.closeOnClick && this.isActive) {
                this.getActivator(e).blur();
                this.isActive = false;
            }
        },
        mouseEnterHandler: function () {
            var _this = this;
            this.runDelay('open', function () {
                if (_this.hasJustFocused)
                    return;
                _this.hasJustFocused = true;
                _this.isActive = true;
            });
        },
        mouseLeaveHandler: function (e) {
            var _this = this;
            // Prevent accidental re-activation
            this.runDelay('close', function () {
                if (_this.$refs.content.contains(e.relatedTarget))
                    return;
                requestAnimationFrame(function () {
                    _this.isActive = false;
                    _this.callDeactivate();
                });
            });
        },
        addActivatorEvents: function (activator) {
            if (activator === void 0) {
                activator = null;
            }
            if (!activator || this.disabled)
                return;
            activator.addEventListener('click', this.activatorClickHandler);
        },
        removeActivatorEvents: function (activator) {
            if (activator === void 0) {
                activator = null;
            }
            if (!activator)
                return;
            activator.removeEventListener('click', this.activatorClickHandler);
        }
    }
};
//# sourceMappingURL=menu-activator.js.map
//# sourceMappingURL=menu-activator.js.map
//# sourceMappingURL=menu-activator.js.map
//# sourceMappingURL=menu-activator.js.map