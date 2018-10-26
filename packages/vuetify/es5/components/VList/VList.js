'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Mixins


require('../../../src/stylus/components/_lists.styl');

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _registrable = require('../../mixins/registrable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-list',
    mixins: [(0, _registrable.provide)('list'), _themeable2.default],
    provide: function provide() {
        return {
            'listClick': this.listClick
        };
    },

    props: {
        dense: Boolean,
        expand: Boolean,
        subheader: Boolean,
        threeLine: Boolean,
        twoLine: Boolean
    },
    data: function data() {
        return {
            groups: []
        };
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-list--dense': this.dense,
                'v-list--subheader': this.subheader,
                'v-list--two-line': this.twoLine,
                'v-list--three-line': this.threeLine
            }, this.themeClasses);
        }
    },
    methods: {
        register: function register(uid, cb) {
            this.groups.push({ uid: uid, cb: cb });
        },
        unregister: function unregister(uid) {
            var index = this.groups.findIndex(function (g) {
                return g.uid === uid;
            });
            if (index > -1) {
                this.groups.splice(index, 1);
            }
        },
        listClick: function listClick(uid) {
            if (this.expand) return;
            for (var i = this.groups.length; i--;) {
                this.groups[i].cb(uid);
            }
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-list',
            'class': this.classes
        };
        return h('div', data, [this.$slots.default]);
    }
};
//# sourceMappingURL=VList.js.map