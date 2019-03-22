var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles
import '../../stylus/components/_item-group.styl';
import Proxyable from '../../mixins/proxyable';
import Themeable from '../../mixins/themeable';
// Utilities
import mixins from '../../util/mixins';
import { consoleWarn } from '../../util/console';
export var BaseItemGroup = mixins(Proxyable, Themeable).extend({
    name: 'base-item-group',
    props: {
        activeClass: {
            type: String,
            default: 'v-item--active'
        },
        mandatory: Boolean,
        max: {
            type: [Number, String],
            default: null
        },
        multiple: Boolean
    },
    data: function () {
        return {
            // As long as a value is defined, show it
            // Otherwise, check if multiple
            // to determine which default to provide
            internalLazyValue: this.value !== undefined
                ? this.value
                : this.multiple ? [] : undefined,
            items: []
        };
    },
    computed: {
        classes: function () {
            return __assign({}, this.themeClasses);
        },
        selectedItems: function () {
            var _this = this;
            return this.items.filter(function (item, index) {
                return _this.toggleMethod(_this.getValue(item, index));
            });
        },
        selectedValues: function () {
            return Array.isArray(this.internalValue)
                ? this.internalValue
                : [this.internalValue];
        },
        toggleMethod: function () {
            var _this = this;
            if (!this.multiple) {
                return function (v) { return _this.internalValue === v; };
            }
            var internalValue = this.internalValue;
            if (Array.isArray(internalValue)) {
                return function (v) { return internalValue.includes(v); };
            }
            return function () { return false; };
        }
    },
    watch: {
        internalValue: function () {
            // https://github.com/vuetifyjs/vuetify/issues/5352
            this.$nextTick(this.updateItemsState);
        }
    },
    created: function () {
        if (this.multiple && !Array.isArray(this.internalValue)) {
            consoleWarn('Model must be bound to an array if the multiple property is true.', this);
        }
    },
    methods: {
        getValue: function (item, i) {
            return item.value == null || item.value === ''
                ? i
                : item.value;
        },
        onClick: function (item, index) {
            this.updateInternalValue(this.getValue(item, index));
        },
        register: function (item) {
            var _this = this;
            var index = this.items.push(item) - 1;
            item.$on('change', function () { return _this.onClick(item, index); });
            // If no value provided and mandatory,
            // assign first registered item
            if (this.mandatory && this.internalLazyValue == null) {
                this.updateMandatory();
            }
            this.updateItem(item, index);
        },
        unregister: function (item) {
            if (this._isDestroyed)
                return;
            var index = this.items.indexOf(item);
            var value = this.getValue(item, index);
            this.items.splice(index, 1);
            var valueIndex = this.selectedValues.indexOf(value);
            // Items is not selected, do nothing
            if (valueIndex < 0)
                return;
            // If not mandatory, use regular update process
            if (!this.mandatory) {
                return this.updateInternalValue(value);
            }
            // Remove the value
            if (this.multiple && Array.isArray(this.internalValue)) {
                this.internalValue = this.internalValue.filter(function (v) { return v !== value; });
            }
            else {
                this.internalValue = undefined;
            }
            // If mandatory and we have no selection
            // add the last item as value
            /* istanbul ignore else */
            if (!this.selectedItems.length) {
                this.updateMandatory(true);
            }
        },
        updateItem: function (item, index) {
            var value = this.getValue(item, index);
            item.isActive = this.toggleMethod(value);
        },
        updateItemsState: function () {
            if (this.mandatory &&
                !this.selectedItems.length) {
                return this.updateMandatory();
            }
            // TODO: Make this smarter so it
            // doesn't have to iterate every
            // child in an update
            this.items.forEach(this.updateItem);
        },
        updateInternalValue: function (value) {
            this.multiple
                ? this.updateMultiple(value)
                : this.updateSingle(value);
        },
        updateMandatory: function (last) {
            if (!this.items.length)
                return;
            var index = last ? this.items.length - 1 : 0;
            this.updateInternalValue(this.getValue(this.items[index], index));
        },
        updateMultiple: function (value) {
            var defaultValue = Array.isArray(this.internalValue)
                ? this.internalValue
                : [];
            var internalValue = defaultValue.slice();
            var index = internalValue.findIndex(function (val) { return val === value; });
            if (this.mandatory &&
                // Item already exists
                index > -1 &&
                // value would be reduced below min
                internalValue.length - 1 < 1)
                return;
            if (
            // Max is set
            this.max != null &&
                // Item doesn't exist
                index < 0 &&
                // value would be increased above max
                internalValue.length + 1 > this.max)
                return;
            index > -1
                ? internalValue.splice(index, 1)
                : internalValue.push(value);
            this.internalValue = internalValue;
        },
        updateSingle: function (value) {
            var isSame = value === this.internalValue;
            if (this.mandatory && isSame)
                return;
            this.internalValue = isSame ? undefined : value;
        }
    },
    render: function (h) {
        return h('div', {
            staticClass: 'v-item-group',
            class: this.classes
        }, this.$slots.default);
    }
});
export default BaseItemGroup.extend({
    name: 'v-item-group',
    provide: function () {
        return {
            itemGroup: this
        };
    }
});
//# sourceMappingURL=VItemGroup.js.map
//# sourceMappingURL=VItemGroup.js.map
//# sourceMappingURL=VItemGroup.js.map