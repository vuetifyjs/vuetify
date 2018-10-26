var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Components
import { VExpandTransition } from '../transitions';
import { VIcon } from '../VIcon';
import VTreeviewNode from './VTreeviewNode';
// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable';
// Utils
import mixins from '../../util/mixins';
import { getObjectValueByPath } from '../../util/helpers';
export var VTreeviewNodeProps = {
    activatable: Boolean,
    activeClass: {
        type: String,
        default: 'v-treeview-node--active'
    },
    selectable: Boolean,
    selectedColor: {
        type: String,
        default: 'accent'
    },
    indeterminateIcon: {
        type: String,
        default: '$vuetify.icons.checkboxIndeterminate'
    },
    onIcon: {
        type: String,
        default: '$vuetify.icons.checkboxOn'
    },
    offIcon: {
        type: String,
        default: '$vuetify.icons.checkboxOff'
    },
    expandIcon: {
        type: String,
        default: '$vuetify.icons.subgroup'
    },
    loadingIcon: {
        type: String,
        default: '$vuetify.icons.loading'
    },
    itemKey: {
        type: String,
        default: 'id'
    },
    itemText: {
        type: String,
        default: 'name'
    },
    itemChildren: {
        type: String,
        default: 'children'
    },
    loadChildren: Function,
    openOnClick: Boolean,
    transition: Boolean
};
export default mixins(RegistrableInject('treeview')
/* @vue/component */
).extend({
    name: 'v-treeview-node',
    inject: {
        treeview: {
            default: null
        }
    },
    props: _extends({
        item: {
            type: Object,
            default: function _default() {
                return null;
            }
        }
    }, VTreeviewNodeProps),
    data: function data() {
        return {
            isOpen: false,
            isSelected: false,
            isIndeterminate: false,
            isActive: false,
            isLoading: false,
            hasLoaded: false
        };
    },
    computed: {
        key: function key() {
            return getObjectValueByPath(this.item, this.itemKey);
        },
        children: function children() {
            return getObjectValueByPath(this.item, this.itemChildren);
        },
        text: function text() {
            return getObjectValueByPath(this.item, this.itemText);
        },
        scopedProps: function scopedProps() {
            return {
                item: this.item,
                leaf: !this.children,
                selected: this.isSelected,
                indeterminate: this.isIndeterminate,
                active: this.isActive,
                open: this.isOpen
            };
        },
        computedIcon: function computedIcon() {
            if (this.isIndeterminate) return this.indeterminateIcon;else if (this.isSelected) return this.onIcon;else return this.offIcon;
        }
    },
    created: function created() {
        this.treeview.register(this);
    },
    beforeDestroy: function beforeDestroy() {
        this.treeview.unregister(this);
    },

    methods: {
        checkChildren: function checkChildren() {
            var _this = this;

            return new Promise(function (resolve) {
                // TODO: Potential issue with always trying
                // to load children if response is empty?
                if (!_this.children || _this.children.length || !_this.loadChildren || _this.hasLoaded) return resolve();
                _this.isLoading = true;
                resolve(_this.loadChildren(_this.item));
            }).then(function () {
                _this.isLoading = false;
                _this.hasLoaded = true;
            });
        },
        open: function open() {
            this.isOpen = !this.isOpen;
            this.treeview.updateOpen(this.key, this.isOpen);
            this.treeview.emitOpen();
        },
        genLabel: function genLabel() {
            return this.$createElement('label', {
                slot: 'label',
                staticClass: 'v-treeview-node__label'
            }, [this.text]);
        },
        genContent: function genContent() {
            var children = [this.$scopedSlots.prepend && this.$scopedSlots.prepend(this.scopedProps), this.genLabel(), this.$scopedSlots.append && this.$scopedSlots.append(this.scopedProps)];
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__content'
            }, children);
        },
        genToggle: function genToggle() {
            var _this2 = this;

            return this.$createElement(VIcon, {
                staticClass: 'v-treeview-node__toggle',
                class: {
                    'v-treeview-node__toggle--open': this.isOpen,
                    'v-treeview-node__toggle--loading': this.isLoading
                },
                slot: 'prepend',
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        if (_this2.isLoading) return;
                        _this2.checkChildren().then(function () {
                            return _this2.open();
                        });
                    }
                }
            }, [this.isLoading ? this.loadingIcon : this.expandIcon]);
        },
        genCheckbox: function genCheckbox() {
            var _this3 = this;

            return this.$createElement(VIcon, {
                staticClass: 'v-treeview-node__checkbox',
                props: {
                    color: this.isSelected ? this.selectedColor : undefined
                },
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        if (_this3.isLoading) return;
                        _this3.checkChildren().then(function () {
                            // We nextTick here so that items watch in VTreeview has a chance to run first
                            _this3.$nextTick(function () {
                                _this3.isSelected = !_this3.isSelected;
                                _this3.isIndeterminate = false;
                                _this3.treeview.updateSelected(_this3.key, _this3.isSelected);
                                _this3.treeview.emitSelected();
                            });
                        });
                    }
                }
            }, [this.computedIcon]);
        },
        genNode: function genNode() {
            var _this4 = this;

            var children = [this.genContent()];
            if (this.selectable) children.unshift(this.genCheckbox());
            if (this.children) children.unshift(this.genToggle());
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__root',
                on: {
                    click: function click() {
                        if (_this4.openOnClick && _this4.children) {
                            _this4.open();
                        } else if (_this4.activatable) {
                            _this4.isActive = !_this4.isActive;
                            _this4.treeview.updateActive(_this4.key, _this4.isActive);
                            _this4.treeview.emitActive();
                        }
                    }
                }
            }, children);
        },
        genChild: function genChild(item) {
            return this.$createElement(VTreeviewNode, {
                key: getObjectValueByPath(item, this.itemKey),
                props: {
                    activatable: this.activatable,
                    activeClass: this.activeClass,
                    item: item,
                    selectable: this.selectable,
                    selectedColor: this.selectedColor,
                    expandIcon: this.expandIcon,
                    indeterminateIcon: this.indeterminateIcon,
                    offIcon: this.offIcon,
                    onIcon: this.onIcon,
                    loadingIcon: this.loadingIcon,
                    itemKey: this.itemKey,
                    itemText: this.itemText,
                    itemChildren: this.itemChildren,
                    loadChildren: this.loadChildren,
                    transition: this.transition,
                    openOnClick: this.openOnClick
                },
                scopedSlots: this.$scopedSlots
            });
        },
        genChildrenWrapper: function genChildrenWrapper() {
            if (!this.isOpen || !this.children) return null;
            var children = [this.children.map(this.genChild)];
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__children'
            }, children);
        },
        genTransition: function genTransition() {
            return this.$createElement(VExpandTransition, [this.genChildrenWrapper()]);
        }
    },
    render: function render(h) {
        var _class;

        var children = [this.genNode()];
        if (this.transition) children.push(this.genTransition());else children.push(this.genChildrenWrapper());
        return h('div', {
            staticClass: 'v-treeview-node',
            class: (_class = {}, _defineProperty(_class, this.activeClass, this.isActive), _defineProperty(_class, 'v-treeview-node--leaf', !this.children), _defineProperty(_class, 'v-treeview-node--click', this.openOnClick), _defineProperty(_class, 'v-treeview-node--selected', this.isSelected), _class)
        }, children);
    }
});
//# sourceMappingURL=VTreeviewNode.js.map