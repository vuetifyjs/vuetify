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
// Components
import VIcon from '../VIcon';
// Mixins
import Bootable from '../../mixins/bootable';
import Toggleable from '../../mixins/toggleable';
import { inject as RegistrableInject } from '../../mixins/registrable';
// Transitions
import { VExpandTransition } from '../transitions';
// Utils
import mixins from '../../util/mixins';
export default mixins(Bootable, RegistrableInject('list', 'v-list-group', 'v-list'), Toggleable
/* @vue/component */
).extend({
    name: 'v-list-group',
    inject: ['listClick'],
    props: {
        activeClass: {
            type: String,
            default: 'primary--text'
        },
        appendIcon: {
            type: String,
            default: '$vuetify.icons.expand'
        },
        disabled: Boolean,
        group: String,
        noAction: Boolean,
        prependIcon: String,
        subGroup: Boolean
    },
    data: function () { return ({
        groups: []
    }); },
    computed: {
        groupClasses: function () {
            return {
                'v-list__group--active': this.isActive,
                'v-list__group--disabled': this.disabled
            };
        },
        headerClasses: function () {
            return {
                'v-list__group__header--active': this.isActive,
                'v-list__group__header--sub-group': this.subGroup
            };
        },
        itemsClasses: function () {
            return {
                'v-list__group__items--no-action': this.noAction
            };
        }
    },
    watch: {
        isActive: function (val) {
            if (!this.subGroup && val) {
                this.listClick(this._uid);
            }
        },
        $route: function (to) {
            var isActive = this.matchRoute(to.path);
            if (this.group) {
                if (isActive && this.isActive !== isActive) {
                    this.listClick(this._uid);
                }
                this.isActive = isActive;
            }
        }
    },
    mounted: function () {
        this.list.register(this);
        if (this.group &&
            this.$route &&
            this.value == null) {
            this.isActive = this.matchRoute(this.$route.path);
        }
    },
    beforeDestroy: function () {
        this.list.unregister(this._uid);
    },
    methods: {
        click: function (e) {
            if (this.disabled)
                return;
            this.$emit('click', e);
            this.isActive = !this.isActive;
        },
        genIcon: function (icon) {
            return this.$createElement(VIcon, icon);
        },
        genAppendIcon: function () {
            var icon = !this.subGroup ? this.appendIcon : false;
            if (!icon && !this.$slots.appendIcon)
                return null;
            return this.$createElement('div', {
                staticClass: 'v-list__group__header__append-icon'
            }, [
                this.$slots.appendIcon || this.genIcon(icon)
            ]);
        },
        genGroup: function () {
            return this.$createElement('div', {
                staticClass: 'v-list__group__header',
                class: this.headerClasses,
                on: __assign({}, this.$listeners, { click: this.click }),
                ref: 'item'
            }, [
                this.genPrependIcon(),
                this.$slots.activator,
                this.genAppendIcon()
            ]);
        },
        genItems: function () {
            return this.$createElement('div', {
                staticClass: 'v-list__group__items',
                class: this.itemsClasses,
                directives: [{
                        name: 'show',
                        value: this.isActive
                    }],
                ref: 'group'
            }, this.showLazyContent(this.$slots.default));
        },
        genPrependIcon: function () {
            var _a;
            var icon = this.prependIcon
                ? this.prependIcon
                : this.subGroup
                    ? '$vuetify.icons.subgroup'
                    : false;
            if (!icon && !this.$slots.prependIcon)
                return null;
            return this.$createElement('div', {
                staticClass: 'v-list__group__header__prepend-icon',
                'class': (_a = {},
                    _a[this.activeClass] = this.isActive,
                    _a)
            }, [
                this.$slots.prependIcon || this.genIcon(icon)
            ]);
        },
        toggle: function (uid) {
            this.isActive = this._uid === uid;
        },
        matchRoute: function (to) {
            if (!this.group)
                return false;
            return to.match(this.group) !== null;
        }
    },
    render: function (h) {
        return h('div', {
            staticClass: 'v-list__group',
            class: this.groupClasses
        }, [
            this.genGroup(),
            h(VExpandTransition, [this.genItems()])
        ]);
    }
});
//# sourceMappingURL=VListGroup.js.map