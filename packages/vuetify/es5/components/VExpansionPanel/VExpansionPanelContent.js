'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _transitions = require('../transitions');

var _bootable = require('../../mixins/bootable');

var _bootable2 = _interopRequireDefault(_bootable);

var _toggleable = require('../../mixins/toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

var _rippleable = require('../../mixins/rippleable');

var _rippleable2 = _interopRequireDefault(_rippleable);

var _registrable = require('../../mixins/registrable');

var _VIcon = require('../VIcon');

var _VIcon2 = _interopRequireDefault(_VIcon);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _console = require('../../util/console');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = (0, _mixins2.default)(_bootable2.default, _toggleable2.default, _rippleable2.default, (0, _registrable.inject)('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel')
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
    data: function data() {
        return {
            height: 'auto'
        };
    },
    computed: {
        containerClasses: function containerClasses() {
            return {
                'v-expansion-panel__container--active': this.isActive,
                'v-expansion-panel__container--disabled': this.isDisabled
            };
        },
        isDisabled: function isDisabled() {
            return this.expansionPanel.disabled || this.disabled;
        },
        isReadonly: function isReadonly() {
            return this.expansionPanel.readonly || this.readonly;
        }
    },
    mounted: function mounted() {
        this.expansionPanel.register(this);
        // Can be removed once fully deprecated
        if (typeof this.value !== 'undefined') (0, _console.consoleWarn)('v-model has been deprecated', this);
    },
    beforeDestroy: function beforeDestroy() {
        this.expansionPanel.unregister(this);
    },

    methods: {
        onKeydown: function onKeydown(e) {
            // Ensure element is the activeElement
            if (e.keyCode === 13 && this.$el === document.activeElement) this.expansionPanel.panelClick(this._uid);
        },
        onHeaderClick: function onHeaderClick() {
            this.isReadonly || this.expansionPanel.panelClick(this._uid);
        },
        genBody: function genBody() {
            return this.$createElement('div', {
                ref: 'body',
                class: 'v-expansion-panel__body',
                directives: [{
                    name: 'show',
                    value: this.isActive
                }]
            }, this.showLazyContent(this.$slots.default));
        },
        genHeader: function genHeader() {
            var children = [].concat(_toConsumableArray(this.$slots.header));
            if (!this.hideActions) children.push(this.genIcon());
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
        genIcon: function genIcon() {
            var icon = this.$slots.actions || [this.$createElement(_VIcon2.default, this.expandIcon)];
            return this.$createElement('transition', {
                attrs: { name: 'fade-transition' }
            }, [this.$createElement('div', {
                staticClass: 'v-expansion-panel__header__icon',
                directives: [{
                    name: 'show',
                    value: !this.isDisabled
                }]
            }, icon)]);
        },
        toggle: function toggle(active) {
            var _this = this;

            if (active) this.isBooted = true;
            // We treat bootable differently
            // Needs time to calc height
            this.$nextTick(function () {
                return _this.isActive = active;
            });
        }
    },
    render: function render(h) {
        var children = [];
        this.$slots.header && children.push(this.genHeader());
        children.push(h(_transitions.VExpandTransition, [this.genBody()]));
        return h('li', {
            staticClass: 'v-expansion-panel__container',
            class: this.containerClasses,
            attrs: {
                tabindex: this.isReadonly || this.isDisabled ? null : 0
            },
            on: {
                keydown: this.onKeydown
            }
        }, children);
    }
});
//# sourceMappingURL=VExpansionPanelContent.js.map