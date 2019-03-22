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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m)
        return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length)
                o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
// Styles
import '../../stylus/components/_lists.styl';
// Mixins
import Themeable from '../../mixins/themeable';
import { provide as RegistrableProvide } from '../../mixins/registrable';
// Types
import mixins from '../../util/mixins';
export default mixins(RegistrableProvide('list'), Themeable
/* @vue/component */
).extend({
    name: 'v-list',
    provide: function () {
        return {
            listClick: this.listClick
        };
    },
    props: {
        dense: Boolean,
        expand: Boolean,
        subheader: Boolean,
        threeLine: Boolean,
        twoLine: Boolean
    },
    data: function () {
        return ({
            groups: []
        });
    },
    computed: {
        classes: function () {
            return __assign({ 'v-list--dense': this.dense, 'v-list--subheader': this.subheader, 'v-list--two-line': this.twoLine, 'v-list--three-line': this.threeLine }, this.themeClasses);
        }
    },
    methods: {
        register: function (content) {
            this.groups.push(content);
        },
        unregister: function (content) {
            var index = this.groups.findIndex(function (g) { return g._uid === content._uid; });
            if (index > -1)
                this.groups.splice(index, 1);
        },
        listClick: function (uid) {
            var e_1, _a;
            if (this.expand)
                return;
            try {
                for (var _b = __values(this.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var group = _c.value;
                    group.toggle(uid);
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return))
                        _a.call(_b);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
        }
    },
    render: function (h) {
        var data = {
            staticClass: 'v-list',
            class: this.classes,
            attrs: {
                role: 'list'
            }
        };
        return h('div', data, [this.$slots.default]);
    }
});
//# sourceMappingURL=VList.js.map
//# sourceMappingURL=VList.js.map
//# sourceMappingURL=VList.js.map
//# sourceMappingURL=VList.js.map
//# sourceMappingURL=VList.js.map