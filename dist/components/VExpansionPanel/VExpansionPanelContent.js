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
import { VExpandTransition } from '../transitions';
import Bootable from '../../mixins/bootable';
import Toggleable from '../../mixins/toggleable';
import Rippleable from '../../mixins/rippleable';
import { inject as RegistrableInject } from '../../mixins/registrable';
import VIcon from '../VIcon';
import mixins from '../../util/mixins';
import { consoleWarn } from '../../util/console';
export default mixins(Bootable, Toggleable, Rippleable, RegistrableInject('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel')
/* @vue/component */
).extend({
    name: 'v-expansion-panel-content',
    props: {
        disabled: Boolean,
        readonly: Boolean,
        expandIcon: {
            type: String,
            default: '$vuetify.icons.expand'
        },
        hideActions: Boolean,
        ripple: {
            type: [Boolean, Object],
            default: false
        }
    },
    data: function () { return ({
        height: 'auto'
    }); },
    computed: {
        containerClasses: function () {
            return {
                'v-expansion-panel__container--active': this.isActive,
                'v-expansion-panel__container--disabled': this.isDisabled
            };
        },
        isDisabled: function () {
            return this.expansionPanel.disabled || this.disabled;
        },
        isReadonly: function () {
            return this.expansionPanel.readonly || this.readonly;
        }
    },
    beforeMount: function () {
        this.expansionPanel.register(this);
        // Can be removed once fully deprecated
        if (typeof this.value !== 'undefined')
            consoleWarn('v-model has been deprecated', this);
    },
    beforeDestroy: function () {
        this.expansionPanel.unregister(this);
    },
    methods: {
        onKeydown: function (e) {
            // Ensure element is the activeElement
            if (e.keyCode === 13 &&
                this.$el === document.activeElement)
                this.expansionPanel.panelClick(this._uid);
        },
        onHeaderClick: function () {
            this.isReadonly || this.expansionPanel.panelClick(this._uid);
        },
        genBody: function () {
            return this.$createElement('div', {
                ref: 'body',
                class: 'v-expansion-panel__body',
                directives: [{
                        name: 'show',
                        value: this.isActive
                    }]
            }, this.showLazyContent(this.$slots.default));
        },
        genHeader: function () {
            var children = __spread((this.$slots.header || []));
            if (!this.hideActions)
                children.push(this.genIcon());
            return this.$createElement('div', {
                staticClass: 'v-expansion-panel__header',
                directives: [{
                        name: 'ripple',
                        value: this.ripple
                    }],
                on: {
                    click: this.onHeaderClick
                }
            }, children);
        },
        genIcon: function () {
            var icon = this.$slots.actions ||
                [this.$createElement(VIcon, this.expandIcon)];
            return this.$createElement('transition', {
                attrs: { name: 'fade-transition' }
            }, [
                this.$createElement('div', {
                    staticClass: 'v-expansion-panel__header__icon',
                    directives: [{
                            name: 'show',
                            value: !this.isDisabled
                        }]
                }, icon)
            ]);
        },
        toggle: function (active) {
            var _this = this;
            if (active)
                this.isBooted = true;
            this.$nextTick(function () { return (_this.isActive = active); });
        }
    },
    render: function (h) {
        return h('li', {
            staticClass: 'v-expansion-panel__container',
            class: this.containerClasses,
            attrs: {
                tabindex: this.isReadonly || this.isDisabled ? null : 0,
                'aria-expanded': Boolean(this.isActive)
            },
            on: {
                keydown: this.onKeydown
            }
        }, [
            this.$slots.header && this.genHeader(),
            h(VExpandTransition, [this.genBody()])
        ]);
    }
});
//# sourceMappingURL=VExpansionPanelContent.js.map