// Styles
import '../../stylus/components/_windows.styl';
// Components
import { BaseItemGroup } from '../VItemGroup/VItemGroup';
// Directives
import Touch from '../../directives/touch';
/* @vue/component */
export default BaseItemGroup.extend({
    name: 'v-window',
    provide: function () {
        return {
            windowGroup: this
        };
    },
    directives: { Touch: Touch },
    props: {
        mandatory: {
            type: Boolean,
            default: true
        },
        reverse: {
            type: Boolean,
            default: undefined
        },
        touch: Object,
        touchless: Boolean,
        value: {
            required: false
        },
        vertical: Boolean
    },
    data: function () {
        return {
            internalHeight: undefined,
            isActive: false,
            isBooted: false,
            isReverse: false
        };
    },
    computed: {
        computedTransition: function () {
            if (!this.isBooted)
                return '';
            var axis = this.vertical ? 'y' : 'x';
            var direction = this.internalReverse === !this.$vuetify.rtl
                ? '-reverse'
                : '';
            return "v-window-" + axis + direction + "-transition";
        },
        internalIndex: function () {
            var _this = this;
            return this.items.findIndex(function (item, i) {
                return _this.internalValue === _this.getValue(item, i);
            });
        },
        internalReverse: function () {
            if (this.reverse !== undefined)
                return this.reverse;
            return this.isReverse;
        }
    },
    watch: {
        internalIndex: 'updateReverse'
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () { return (_this.isBooted = true); });
    },
    methods: {
        genContainer: function () {
            return this.$createElement('div', {
                staticClass: 'v-window__container',
                class: {
                    'v-window__container--is-active': this.isActive
                },
                style: {
                    height: this.internalHeight
                }
            }, this.$slots.default);
        },
        next: function () {
            this.isReverse = false;
            var nextIndex = (this.internalIndex + 1) % this.items.length;
            var item = this.items[nextIndex];
            this.internalValue = this.getValue(item, nextIndex);
        },
        prev: function () {
            this.isReverse = true;
            var lastIndex = (this.internalIndex + this.items.length - 1) % this.items.length;
            var item = this.items[lastIndex];
            this.internalValue = this.getValue(item, lastIndex);
        },
        updateReverse: function (val, oldVal) {
            this.isReverse = val < oldVal;
        }
    },
    render: function (h) {
        var data = {
            staticClass: 'v-window',
            directives: []
        };
        if (!this.touchless) {
            var value = this.touch || {
                left: this.next,
                right: this.prev
            };
            data.directives.push({
                name: 'touch',
                value: value
            });
        }
        return h('div', data, [this.genContainer()]);
    }
});
//# sourceMappingURL=VWindow.js.map
//# sourceMappingURL=VWindow.js.map
//# sourceMappingURL=VWindow.js.map