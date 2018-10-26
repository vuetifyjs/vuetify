'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VPicker = require('../components/VPicker');

var _VPicker2 = _interopRequireDefault(_VPicker);

var _colorable = require('./colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _themeable = require('./themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Mixins
exports.default = {
    name: 'picker',
    mixins: [_colorable2.default, _themeable2.default],
    props: {
        fullWidth: Boolean,
        headerColor: String,
        landscape: Boolean,
        noTitle: Boolean,
        width: {
            type: [Number, String],
            default: 290
        }
    },
    methods: {
        genPickerTitle: function genPickerTitle() {},
        genPickerBody: function genPickerBody() {},
        genPickerActionsSlot: function genPickerActionsSlot() {
            return this.$scopedSlots.default ? this.$scopedSlots.default({
                save: this.save,
                cancel: this.cancel
            }) : this.$slots.default;
        },
        genPicker: function genPicker(staticClass) {
            return this.$createElement(_VPicker2.default, {
                staticClass: staticClass,
                props: {
                    color: this.headerColor || this.color,
                    dark: this.dark,
                    fullWidth: this.fullWidth,
                    landscape: this.landscape,
                    light: this.light,
                    width: this.width
                }
            }, [this.noTitle ? null : this.genPickerTitle(), this.genPickerBody(), this.$createElement('template', { slot: 'actions' }, [this.genPickerActionsSlot()])]);
        }
    }
}; // Components
//# sourceMappingURL=picker.js.map