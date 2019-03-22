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
    props: __assign({ item: {
            type: Object,
            default: function () { return null; }
        } }, VTreeviewNodeProps),
    data: function () {
        return ({
            isOpen: false,
            isSelected: false,
            isIndeterminate: false,
            isActive: false,
            isLoading: false,
            hasLoaded: false
        });
    },
    computed: {
        key: function () {
            return getObjectValueByPath(this.item, this.itemKey);
        },
        children: function () {
            return getObjectValueByPath(this.item, this.itemChildren);
        },
        text: function () {
            return getObjectValueByPath(this.item, this.itemText);
        },
        scopedProps: function () {
            return {
                item: this.item,
                leaf: !this.children,
                selected: this.isSelected,
                indeterminate: this.isIndeterminate,
                active: this.isActive,
                open: this.isOpen
            };
        },
        computedIcon: function () {
            if (this.isIndeterminate)
                return this.indeterminateIcon;
            else if (this.isSelected)
                return this.onIcon;
            else
                return this.offIcon;
        },
        hasChildren: function () {
            return !!this.children && (!!this.children.length || !!this.loadChildren);
        }
    },
    created: function () {
        this.treeview.register(this);
    },
    beforeDestroy: function () {
        this.treeview.unregister(this);
    },
    methods: {
        checkChildren: function () {
            var _this = this;
            return new Promise(function (resolve) {
                // TODO: Potential issue with always trying
                // to load children if response is empty?
                if (!_this.children || _this.children.length || !_this.loadChildren || _this.hasLoaded)
                    return resolve();
                _this.isLoading = true;
                resolve(_this.loadChildren(_this.item));
            }).then(function () {
                _this.isLoading = false;
                _this.hasLoaded = true;
            });
        },
        open: function () {
            this.isOpen = !this.isOpen;
            this.treeview.updateOpen(this.key, this.isOpen);
            this.treeview.emitOpen();
        },
        genLabel: function () {
            var children = [];
            if (this.$scopedSlots.label)
                children.push(this.$scopedSlots.label(this.scopedProps));
            else
                children.push(this.text);
            return this.$createElement('div', {
                slot: 'label',
                staticClass: 'v-treeview-node__label'
            }, children);
        },
        genContent: function () {
            var children = [
                this.$scopedSlots.prepend && this.$scopedSlots.prepend(this.scopedProps),
                this.genLabel(),
                this.$scopedSlots.append && this.$scopedSlots.append(this.scopedProps)
            ];
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__content'
            }, children);
        },
        genToggle: function () {
            var _this = this;
            return this.$createElement(VIcon, {
                staticClass: 'v-treeview-node__toggle',
                class: {
                    'v-treeview-node__toggle--open': this.isOpen,
                    'v-treeview-node__toggle--loading': this.isLoading
                },
                slot: 'prepend',
                on: {
                    click: function (e) {
                        e.stopPropagation();
                        if (_this.isLoading)
                            return;
                        _this.checkChildren().then(function () { return _this.open(); });
                    }
                }
            }, [this.isLoading ? this.loadingIcon : this.expandIcon]);
        },
        genCheckbox: function () {
            var _this = this;
            return this.$createElement(VIcon, {
                staticClass: 'v-treeview-node__checkbox',
                props: {
                    color: this.isSelected ? this.selectedColor : undefined
                },
                on: {
                    click: function (e) {
                        e.stopPropagation();
                        if (_this.isLoading)
                            return;
                        _this.checkChildren().then(function () {
                            // We nextTick here so that items watch in VTreeview has a chance to run first
                            _this.$nextTick(function () {
                                _this.isSelected = !_this.isSelected;
                                _this.isIndeterminate = false;
                                _this.treeview.updateSelected(_this.key, _this.isSelected);
                                _this.treeview.emitSelected();
                            });
                        });
                    }
                }
            }, [this.computedIcon]);
        },
        genNode: function () {
            var _this = this;
            var _a;
            var children = [this.genContent()];
            if (this.selectable)
                children.unshift(this.genCheckbox());
            if (this.hasChildren)
                children.unshift(this.genToggle());
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__root',
                class: (_a = {},
                    _a[this.activeClass] = this.isActive,
                    _a),
                on: {
                    click: function () {
                        if (_this.openOnClick && _this.children) {
                            _this.open();
                        }
                        else if (_this.activatable) {
                            _this.isActive = !_this.isActive;
                            _this.treeview.updateActive(_this.key, _this.isActive);
                            _this.treeview.emitActive();
                        }
                    }
                }
            }, children);
        },
        genChild: function (item) {
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
        genChildrenWrapper: function () {
            if (!this.isOpen || !this.children)
                return null;
            var children = [this.children.map(this.genChild)];
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__children'
            }, children);
        },
        genTransition: function () {
            return this.$createElement(VExpandTransition, [this.genChildrenWrapper()]);
        }
    },
    render: function (h) {
        var children = [this.genNode()];
        if (this.transition)
            children.push(this.genTransition());
        else
            children.push(this.genChildrenWrapper());
        return h('div', {
            staticClass: 'v-treeview-node',
            class: {
                'v-treeview-node--leaf': !this.hasChildren,
                'v-treeview-node--click': this.openOnClick,
                'v-treeview-node--selected': this.isSelected,
                'v-treeview-node--excluded': this.treeview.isExcluded(this.key)
            }
        }, children);
    }
});
//# sourceMappingURL=VTreeviewNode.js.map
//# sourceMappingURL=VTreeviewNode.js.map
//# sourceMappingURL=VTreeviewNode.js.map
//# sourceMappingURL=VTreeviewNode.js.map