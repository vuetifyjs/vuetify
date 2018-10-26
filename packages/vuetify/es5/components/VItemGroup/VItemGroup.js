'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseItemGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Utilities


require('../../../src/stylus/components/_item-group.styl');

var _proxyable = require('../../mixins/proxyable');

var _proxyable2 = _interopRequireDefault(_proxyable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseItemGroup = exports.BaseItemGroup = (0, _mixins2.default)(_proxyable2.default, _themeable2.default).extend({
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
    data: function data() {
        return {
            // As long as a value is defined, show it
            // Otherwise, check if multiple
            // to determine which default to provide
            internalLazyValue: this.value !== undefined ? this.value : this.multiple ? [] : undefined,
            items: []
        };
    },

    computed: {
        classes: function classes() {
            return _extends({}, this.themeClasses);
        },
        selectedItems: function selectedItems() {
            var _this = this;

            return this.items.filter(function (item, index) {
                return _this.toggleMethod(_this.getValue(item, index));
            });
        },
        selectedValues: function selectedValues() {
            return Array.isArray(this.internalValue) ? this.internalValue : [this.internalValue];
        },
        toggleMethod: function toggleMethod() {
            var _this2 = this;

            if (!this.multiple) {
                return function (v) {
                    return _this2.internalValue === v;
                };
            }
            var internalValue = this.internalValue;
            if (Array.isArray(internalValue)) {
                return function (v) {
                    return internalValue.includes(v);
                };
            }
            return function () {
                return false;
            };
        }
    },
    watch: {
        internalValue: function internalValue() {
            // https://github.com/vuetifyjs/vuetify/issues/5352
            this.$nextTick(this.updateItemsState);
        }
    },
    created: function created() {
        if (this.multiple && !Array.isArray(this.internalValue)) {
            (0, _console.consoleWarn)('Model must be bound to an array if the multiple property is true.', this);
        }
    },

    methods: {
        getValue: function getValue(item, i) {
            return item.value == null || item.value === '' ? i : item.value;
        },
        onClick: function onClick(item, index) {
            this.updateInternalValue(this.getValue(item, index));
        },
        register: function register(item) {
            var _this3 = this;

            var index = this.items.push(item) - 1;
            item.$on('change', function () {
                return _this3.onClick(item, index);
            });
            // If no value provided and mandatory,
            // assign first registered item
            if (this.mandatory && this.internalLazyValue == null) {
                this.updateMandatory();
            }
            this.updateItem(item, index);
        },
        unregister: function unregister(item) {
            if (this._isDestroyed) return;
            var index = this.items.indexOf(item);
            var value = this.getValue(item, index);
            this.items.splice(index, 1);
            var valueIndex = this.selectedValues.indexOf(value);
            // Items is not selected, do nothing
            if (valueIndex < 0) return;
            // If not mandatory, use regular update process
            if (!this.mandatory) {
                return this.updateInternalValue(value);
            }
            // Remove the value
            if (this.multiple && Array.isArray(this.internalValue)) {
                this.internalValue = this.internalValue.filter(function (v) {
                    return v !== value;
                });
            } else {
                this.internalValue = undefined;
            }
            // If mandatory and we have no selection
            // add the last item as value
            /* istanbul ignore else */
            if (!this.selectedItems.length) {
                this.updateMandatory(true);
            }
        },
        updateItem: function updateItem(item, index) {
            var value = this.getValue(item, index);
            item.isActive = this.toggleMethod(value);
        },
        updateItemsState: function updateItemsState() {
            if (this.mandatory && !this.selectedItems.length) {
                return this.updateMandatory();
            }
            // TODO: Make this smarter so it
            // doesn't have to iterate every
            // child in an update
            this.items.forEach(this.updateItem);
        },
        updateInternalValue: function updateInternalValue(value) {
            this.multiple ? this.updateMultiple(value) : this.updateSingle(value);
        },
        updateMandatory: function updateMandatory(last) {
            if (!this.items.length) return;
            var index = last ? this.items.length - 1 : 0;
            this.updateInternalValue(this.getValue(this.items[index], index));
        },
        updateMultiple: function updateMultiple(value) {
            var defaultValue = Array.isArray(this.internalValue) ? this.internalValue : [];
            var internalValue = defaultValue.slice();
            var index = internalValue.findIndex(function (val) {
                return val === value;
            });
            if (this.mandatory &&
            // Item already exists
            index > -1 &&
            // value would be reduced below min
            internalValue.length - 1 < 1) return;
            if (
            // Max is set
            this.max != null &&
            // Item doesn't exist
            index < 0 &&
            // value woudl be increased above max
            internalValue.length + 1 > this.max) return;
            index > -1 ? internalValue.splice(index, 1) : internalValue.push(value);
            this.internalValue = internalValue;
        },
        updateSingle: function updateSingle(value) {
            var isSame = value === this.internalValue;
            if (this.mandatory && isSame) return;
            this.internalValue = isSame ? undefined : value;
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-item-group',
            class: this.classes
        }, this.$slots.default);
    }
});
exports.default = BaseItemGroup.extend({
    name: 'v-item-group',
    provide: function provide() {
        return {
            itemGroup: this
        };
    }
});
//# sourceMappingURL=VItemGroup.js.map