var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { getSlotType } from '../../../util/helpers';
/* @vue/component */
export default {
    methods: {
        genActivator: function () {
            if (!this.$slots.activator && !this.$scopedSlots.activator)
                return null;
            var listeners = {};
            if (!this.disabled) {
                if (this.openOnHover) {
                    listeners.mouseenter = this.mouseEnterHandler;
                    listeners.mouseleave = this.mouseLeaveHandler;
                }
                else if (this.openOnClick) {
                    listeners.click = this.activatorClickHandler;
                }
            }
            if (getSlotType(this, 'activator') === 'scoped') {
                listeners.keydown = this.onKeyDown;
                var activator = this.$scopedSlots.activator({ on: listeners });
                this.activatorNode = activator;
                return activator;
            }
            return this.$createElement('div', {
                staticClass: 'v-menu__activator',
                'class': {
                    'v-menu__activator--active': this.hasJustFocused || this.isActive,
                    'v-menu__activator--disabled': this.disabled
                },
                ref: 'activator',
                on: listeners
            }, this.$slots.activator);
        },
        genTransition: function () {
            if (!this.transition)
                return this.genContent();
            return this.$createElement('transition', {
                props: {
                    name: this.transition
                }
            }, [this.genContent()]);
        },
        genDirectives: function () {
            var _this = this;
            // Do not add click outside for hover menu
            var directives = !this.openOnHover && this.closeOnClick ? [{
                    name: 'click-outside',
                    value: function () { _this.isActive = false; },
                    args: {
                        closeConditional: this.closeConditional,
                        include: function () { return __spread([_this.$el], _this.getOpenDependentElements()); }
                    }
                }] : [];
            directives.push({
                name: 'show',
                value: this.isContentActive
            });
            return directives;
        },
        genContent: function () {
            var _this = this;
            var _a;
            var options = {
                attrs: this.getScopeIdAttrs(),
                staticClass: 'v-menu__content',
                'class': __assign({}, this.rootThemeClasses, (_a = { 'v-menu__content--auto': this.auto, 'v-menu__content--fixed': this.activatorFixed, 'menuable__content__active': this.isActive }, _a[this.contentClass.trim()] = true, _a)),
                style: this.styles,
                directives: this.genDirectives(),
                ref: 'content',
                on: {
                    click: function (e) {
                        e.stopPropagation();
                        if (e.target.getAttribute('disabled'))
                            return;
                        if (_this.closeOnContentClick)
                            _this.isActive = false;
                    },
                    keydown: this.onKeyDown
                }
            };
            !this.disabled && this.openOnHover && (options.on.mouseenter = this.mouseEnterHandler);
            this.openOnHover && (options.on.mouseleave = this.mouseLeaveHandler);
            return this.$createElement('div', options, this.showLazyContent(this.$slots.default));
        }
    }
};
//# sourceMappingURL=menu-generators.js.map