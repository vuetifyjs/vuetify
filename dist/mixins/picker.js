// Components
import VPicker from '../components/VPicker';
// Mixins
import Colorable from './colorable';
import Themeable from './themeable';
// Utils
import mixins from '../util/mixins';
export default mixins(Colorable, Themeable
/* @vue/component */
).extend({
    name: 'picker',
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
        genPickerTitle: function () {
            return null;
        },
        genPickerBody: function () {
            return null;
        },
        genPickerActionsSlot: function () {
            return this.$scopedSlots.default ? this.$scopedSlots.default({
                save: this.save,
                cancel: this.cancel
            }) : this.$slots.default;
        },
        genPicker: function (staticClass) {
            var children = [];
            if (!this.noTitle) {
                var title = this.genPickerTitle();
                title && children.push(title);
            }
            var body = this.genPickerBody();
            body && children.push(body);
            children.push(this.$createElement('template', { slot: 'actions' }, [this.genPickerActionsSlot()]));
            return this.$createElement(VPicker, {
                staticClass: staticClass,
                props: {
                    color: this.headerColor || this.color,
                    dark: this.dark,
                    fullWidth: this.fullWidth,
                    landscape: this.landscape,
                    light: this.light,
                    width: this.width
                }
            }, children);
        }
    }
});
//# sourceMappingURL=picker.js.map