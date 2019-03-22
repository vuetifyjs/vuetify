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
import '../../stylus/components/_bottom-sheets.styl';
import VDialog from '../VDialog/VDialog';
/* @vue/component */
export default {
    name: 'v-bottom-sheet',
    props: {
        disabled: Boolean,
        fullWidth: Boolean,
        hideOverlay: Boolean,
        inset: Boolean,
        lazy: Boolean,
        maxWidth: {
            type: [String, Number],
            default: 'auto'
        },
        persistent: Boolean,
        value: null
    },
    render: function (h) {
        var activator = h('template', {
            slot: 'activator'
        }, this.$slots.activator);
        var contentClass = [
            'v-bottom-sheet',
            this.inset ? 'v-bottom-sheet--inset' : ''
        ].join(' ');
        return h(VDialog, {
            attrs: __assign({}, this.$props),
            on: __assign({}, this.$listeners),
            props: {
                contentClass: contentClass,
                noClickAnimation: true,
                transition: 'bottom-sheet-transition',
                value: this.value
            }
        }, [activator, this.$slots.default]);
    }
};
//# sourceMappingURL=VBottomSheet.js.map
//# sourceMappingURL=VBottomSheet.js.map
//# sourceMappingURL=VBottomSheet.js.map
//# sourceMappingURL=VBottomSheet.js.map