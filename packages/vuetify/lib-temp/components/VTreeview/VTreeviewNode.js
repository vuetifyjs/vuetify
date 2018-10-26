// Components
import { VExpandTransition } from '../transitions';
import { VIcon } from '../VIcon';
import VTreeviewNode from './VTreeviewNode';
// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable';
// Utils
import mixins from '../../util/mixins';
import { getObjectValueByPath } from '../../util/helpers';
export const VTreeviewNodeProps = {
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
    props: {
        item: {
            type: Object,
            default: () => null
        },
        ...VTreeviewNodeProps
    },
    data: () => ({
        isOpen: false,
        isSelected: false,
        isIndeterminate: false,
        isActive: false,
        isLoading: false,
        hasLoaded: false
    }),
    computed: {
        key() {
            return getObjectValueByPath(this.item, this.itemKey);
        },
        children() {
            return getObjectValueByPath(this.item, this.itemChildren);
        },
        text() {
            return getObjectValueByPath(this.item, this.itemText);
        },
        scopedProps() {
            return {
                item: this.item,
                leaf: !this.children,
                selected: this.isSelected,
                indeterminate: this.isIndeterminate,
                active: this.isActive,
                open: this.isOpen
            };
        },
        computedIcon() {
            if (this.isIndeterminate)
                return this.indeterminateIcon;
            else if (this.isSelected)
                return this.onIcon;
            else
                return this.offIcon;
        }
    },
    created() {
        this.treeview.register(this);
    },
    beforeDestroy() {
        this.treeview.unregister(this);
    },
    methods: {
        checkChildren() {
            return new Promise(resolve => {
                // TODO: Potential issue with always trying
                // to load children if response is empty?
                if (!this.children || this.children.length || !this.loadChildren || this.hasLoaded)
                    return resolve();
                this.isLoading = true;
                resolve(this.loadChildren(this.item));
            }).then(() => {
                this.isLoading = false;
                this.hasLoaded = true;
            });
        },
        open() {
            this.isOpen = !this.isOpen;
            this.treeview.updateOpen(this.key, this.isOpen);
            this.treeview.emitOpen();
        },
        genLabel() {
            return this.$createElement('label', {
                slot: 'label',
                staticClass: 'v-treeview-node__label'
            }, [this.text]);
        },
        genContent() {
            const children = [
                this.$scopedSlots.prepend && this.$scopedSlots.prepend(this.scopedProps),
                this.genLabel(),
                this.$scopedSlots.append && this.$scopedSlots.append(this.scopedProps)
            ];
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__content'
            }, children);
        },
        genToggle() {
            return this.$createElement(VIcon, {
                staticClass: 'v-treeview-node__toggle',
                class: {
                    'v-treeview-node__toggle--open': this.isOpen,
                    'v-treeview-node__toggle--loading': this.isLoading
                },
                slot: 'prepend',
                on: {
                    click: (e) => {
                        e.stopPropagation();
                        if (this.isLoading)
                            return;
                        this.checkChildren().then(() => this.open());
                    }
                }
            }, [this.isLoading ? this.loadingIcon : this.expandIcon]);
        },
        genCheckbox() {
            return this.$createElement(VIcon, {
                staticClass: 'v-treeview-node__checkbox',
                props: {
                    color: this.isSelected ? this.selectedColor : undefined
                },
                on: {
                    click: (e) => {
                        e.stopPropagation();
                        if (this.isLoading)
                            return;
                        this.checkChildren().then(() => {
                            // We nextTick here so that items watch in VTreeview has a chance to run first
                            this.$nextTick(() => {
                                this.isSelected = !this.isSelected;
                                this.isIndeterminate = false;
                                this.treeview.updateSelected(this.key, this.isSelected);
                                this.treeview.emitSelected();
                            });
                        });
                    }
                }
            }, [this.computedIcon]);
        },
        genNode() {
            const children = [this.genContent()];
            if (this.selectable)
                children.unshift(this.genCheckbox());
            if (this.children)
                children.unshift(this.genToggle());
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__root',
                on: {
                    click: () => {
                        if (this.openOnClick && this.children) {
                            this.open();
                        }
                        else if (this.activatable) {
                            this.isActive = !this.isActive;
                            this.treeview.updateActive(this.key, this.isActive);
                            this.treeview.emitActive();
                        }
                    }
                }
            }, children);
        },
        genChild(item) {
            return this.$createElement(VTreeviewNode, {
                key: getObjectValueByPath(item, this.itemKey),
                props: {
                    activatable: this.activatable,
                    activeClass: this.activeClass,
                    item,
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
        genChildrenWrapper() {
            if (!this.isOpen || !this.children)
                return null;
            const children = [this.children.map(this.genChild)];
            return this.$createElement('div', {
                staticClass: 'v-treeview-node__children'
            }, children);
        },
        genTransition() {
            return this.$createElement(VExpandTransition, [this.genChildrenWrapper()]);
        }
    },
    render(h) {
        const children = [this.genNode()];
        if (this.transition)
            children.push(this.genTransition());
        else
            children.push(this.genChildrenWrapper());
        return h('div', {
            staticClass: 'v-treeview-node',
            class: {
                [this.activeClass]: this.isActive,
                'v-treeview-node--leaf': !this.children,
                'v-treeview-node--click': this.openOnClick,
                'v-treeview-node--selected': this.isSelected
            }
        }, children);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRyZWV2aWV3Tm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZUcmVldmlldy9WVHJlZXZpZXdOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGFBQWE7QUFDYixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUNsRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBRWhDLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFBO0FBRTNDLFNBQVM7QUFDVCxPQUFPLEVBQUUsTUFBTSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFFdEUsUUFBUTtBQUNSLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFBO0FBQ3RDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBWXpELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHO0lBQ2hDLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLHlCQUF5QjtLQUNuQztJQUNELFVBQVUsRUFBRSxPQUFPO0lBQ25CLGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFDRCxpQkFBaUIsRUFBRTtRQUNqQixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxzQ0FBc0M7S0FDaEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSwyQkFBMkI7S0FDckM7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSw0QkFBNEI7S0FDdEM7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSx5QkFBeUI7S0FDbkM7SUFDRCxXQUFXLEVBQUU7UUFDWCxJ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bmltcG9ydCB7IFZFeHBhbmRUcmFuc2l0aW9uIH0gZnJvbSAnLi4vdHJhbnNpdGlvbnMnXG5pbXBvcnQgeyBWSWNvbiB9IGZyb20gJy4uL1ZJY29uJ1xuaW1wb3J0IFZUcmVldmlldyBmcm9tICcuL1ZUcmVldmlldydcbmltcG9ydCBWVHJlZXZpZXdOb2RlIGZyb20gJy4vVlRyZWV2aWV3Tm9kZSdcblxuLy8gTWl4aW5zXG5pbXBvcnQgeyBpbmplY3QgYXMgUmVnaXN0cmFibGVJbmplY3QgfSBmcm9tICcuLi8uLi9taXhpbnMvcmVnaXN0cmFibGUnXG5cbi8vIFV0aWxzXG5pbXBvcnQgbWl4aW5zIGZyb20gJy4uLy4uL3V0aWwvbWl4aW5zJ1xuaW1wb3J0IHsgZ2V0T2JqZWN0VmFsdWVCeVBhdGggfSBmcm9tICcuLi8uLi91dGlsL2hlbHBlcnMnXG5pbXBvcnQgeyBQcm9wVmFsaWRhdG9yIH0gZnJvbSAndnVlL3R5cGVzL29wdGlvbnMnXG5cbi8vIFR5cGVzXG5pbXBvcnQgVnVlLCB7IFZOb2RlIH0gZnJvbSAndnVlJ1xuXG50eXBlIFZUcmVlVmlld0luc3RhbmNlID0gSW5zdGFuY2VUeXBlPHR5cGVvZiBWVHJlZXZpZXc+XG5cbmludGVyZmFjZSBvcHRpb25zIGV4dGVuZHMgVnVlIHtcbiAgdHJlZXZpZXc6IFZUcmVlVmlld0luc3RhbmNlXG59XG5cbmV4cG9ydCBjb25zdCBWVHJlZXZpZXdOb2RlUHJvcHMgPSB7XG4gIGFjdGl2YXRhYmxlOiBCb29sZWFuLFxuICBhY3RpdmVDbGFzczoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAndi10cmVldmlldy1ub2RlLS1hY3RpdmUnXG4gIH0sXG4gIHNlbGVjdGFibGU6IEJvb2xlYW4sXG4gIHNlbGVjdGVkQ29sb3I6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2FjY2VudCdcbiAgfSxcbiAgaW5kZXRlcm1pbmF0ZUljb246IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLmNoZWNrYm94SW5kZXRlcm1pbmF0ZSdcbiAgfSxcbiAgb25JY29uOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5jaGVja2JveE9uJ1xuICB9LFxuICBvZmZJY29uOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5jaGVja2JveE9mZidcbiAgfSxcbiAgZXhwYW5kSWNvbjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnJHZ1ZXRpZnkuaWNvbnMuc3ViZ3JvdXAnXG4gIH0sXG4gIGxvYWRpbmdJY29uOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5sb2FkaW5nJ1xuICB9LFxuICBpdGVtS2V5OiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdpZCdcbiAgfSxcbiAgaXRlbVRleHQ6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ25hbWUnXG4gIH0sXG4gIGl0ZW1DaGlsZHJlbjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAnY2hpbGRyZW4nXG4gIH0sXG4gIGxvYWRDaGlsZHJlbjogRnVuY3Rpb24gYXMgUHJvcFZhbGlkYXRvcjwoaXRlbTogYW55KSA9PiBQcm9taXNlPHZvaWQ+PixcbiAgb3Blbk9uQ2xpY2s6IEJvb2xlYW4sXG4gIHRyYW5zaXRpb246IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWl4aW5zPG9wdGlvbnM+KFxuICBSZWdpc3RyYWJsZUluamVjdCgndHJlZXZpZXcnKVxuICAvKiBAdnVlL2NvbXBvbmVudCAqL1xuKS5leHRlbmQoe1xuICBuYW1lOiAndi10cmVldmlldy1ub2RlJyxcblxuICBpbmplY3Q6IHtcbiAgICB0cmVldmlldzoge1xuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH1cbiAgfSxcblxuICBwcm9wczoge1xuICAgIGl0ZW06IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IG51bGxcbiAgICB9LFxuICAgIC4uLlZUcmVldmlld05vZGVQcm9wc1xuICB9LFxuXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgaXNPcGVuOiBmYWxzZSwgLy8gTm9kZSBpcyBvcGVuL2V4cGFuZGVkXG4gICAgaXNTZWxlY3RlZDogZmFsc2UsIC8vIE5vZGUgaXMgc2VsZWN0ZWQgKGNoZWNrYm94KVxuICAgIGlzSW5kZXRlcm1pbmF0ZTogZmFsc2UsIC8vIE5vZGUgaGFzIGF0IGxlYXN0IG9uZSBzZWxlY3RlZCBjaGlsZFxuICAgIGlzQWN0aXZlOiBmYWxzZSwgLy8gTm9kZSBpcyBzZWxlY3RlZCAocm93KVxuICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgaGFzTG9hZGVkOiBmYWxzZVxuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGtleSAoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBnZXRPYmplY3RWYWx1ZUJ5UGF0aCh0aGlzLml0ZW0sIHRoaXMuaXRlbUtleSlcbiAgICB9LFxuICAgIGNoaWxkcmVuICgpOiBhbnlbXSB8IG51bGwge1xuICAgICAgcmV0dXJuIGdldE9iamVjdFZhbHVlQnlQYXRoKHRoaXMuaXRlbSwgdGhpcy5pdGVtQ2hpbGRyZW4pXG4gICAgfSxcbiAgICB0ZXh0ICgpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIGdldE9iamVjdFZhbHVlQnlQYXRoKHRoaXMuaXRlbSwgdGhpcy5pdGVtVGV4dClcbiAgICB9LFxuICAgIHNjb3BlZFByb3BzICgpOiBvYmplY3Qge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXRlbTogdGhpcy5pdGVtLFxuICAgICAgICBsZWFmOiAhdGhpcy5jaGlsZHJlbixcbiAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuaXNTZWxlY3RlZCxcbiAgICAgICAgaW5kZXRlcm1pbmF0ZTogdGhpcy5pc0luZGV0ZXJtaW5hdGUsXG4gICAgICAgIGFjdGl2ZTogdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgb3BlbjogdGhpcy5pc09wZW5cbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbXB1dGVkSWNvbiAoKTogc3RyaW5nIHtcbiAgICAgIGlmICh0aGlzLmlzSW5kZXRlcm1pbmF0ZSkgcmV0dXJuIHRoaXMuaW5kZXRlcm1pbmF0ZUljb25cbiAgICAgIGVsc2UgaWYgKHRoaXMuaXNTZWxlY3RlZCkgcmV0dXJuIHRoaXMub25JY29uXG4gICAgICBlbHNlIHJldHVybiB0aGlzLm9mZkljb25cbiAgICB9XG4gIH0sXG5cbiAgY3JlYXRlZCAoKSB7XG4gICAgdGhpcy50cmVldmlldy5yZWdpc3Rlcih0aGlzKVxuICB9LFxuXG4gIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIHRoaXMudHJlZXZpZXcudW5yZWdpc3Rlcih0aGlzKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBjaGVja0NoaWxkcmVuICgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgLy8gVE9ETzogUG90ZW50aWFsIGlzc3VlIHdpdGggYWx3YXlzIHRyeWluZ1xuICAgICAgICAvLyB0byBsb2FkIGNoaWxkcmVuIGlmIHJlc3BvbnNlIGlzIGVtcHR5P1xuICAgICAgICBpZiAoIXRoaXMuY2hpbGRyZW4gfHwgdGhpcy5jaGlsZHJlbi5sZW5ndGggfHwgIXRoaXMubG9hZENoaWxkcmVuIHx8IHRoaXMuaGFzTG9hZGVkKSByZXR1cm4gcmVzb2x2ZSgpXG5cbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlXG4gICAgICAgIHJlc29sdmUodGhpcy5sb2FkQ2hpbGRyZW4odGhpcy5pdGVtKSlcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIHRoaXMuaGFzTG9hZGVkID0gdHJ1ZVxuICAgICAgfSlcbiAgICB9LFxuICAgIG9wZW4gKCkge1xuICAgICAgdGhpcy5pc09wZW4gPSAhdGhpcy5pc09wZW5cbiAgICAgIHRoaXMudHJlZXZpZXcudXBkYXRlT3Blbih0aGlzLmtleSwgdGhpcy5pc09wZW4pXG4gICAgICB0aGlzLnRyZWV2aWV3LmVtaXRPcGVuKClcbiAgICB9LFxuICAgIGdlbkxhYmVsICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHtcbiAgICAgICAgc2xvdDogJ2xhYmVsJyxcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRyZWV2aWV3LW5vZGVfX2xhYmVsJ1xuICAgICAgfSwgW3RoaXMudGV4dF0pXG4gICAgfSxcbiAgICBnZW5Db250ZW50ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICB0aGlzLiRzY29wZWRTbG90cy5wcmVwZW5kICYmIHRoaXMuJHNjb3BlZFNsb3RzLnByZXBlbmQodGhpcy5zY29wZWRQcm9wcyksXG4gICAgICAgIHRoaXMuZ2VuTGFiZWwoKSxcbiAgICAgICAgdGhpcy4kc2NvcGVkU2xvdHMuYXBwZW5kICYmIHRoaXMuJHNjb3BlZFNsb3RzLmFwcGVuZCh0aGlzLnNjb3BlZFByb3BzKVxuICAgICAgXVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtdHJlZXZpZXctbm9kZV9fY29udGVudCdcbiAgICAgIH0sIGNoaWxkcmVuKVxuICAgIH0sXG4gICAgZ2VuVG9nZ2xlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZJY29uLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi10cmVldmlldy1ub2RlX190b2dnbGUnLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICd2LXRyZWV2aWV3LW5vZGVfX3RvZ2dsZS0tb3Blbic6IHRoaXMuaXNPcGVuLFxuICAgICAgICAgICd2LXRyZWV2aWV3LW5vZGVfX3RvZ2dsZS0tbG9hZGluZyc6IHRoaXMuaXNMb2FkaW5nXG4gICAgICAgIH0sXG4gICAgICAgIHNsb3Q6ICdwcmVwZW5kJyxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBjbGljazogKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nKSByZXR1cm5cblxuICAgICAgICAgICAgdGhpcy5jaGVja0NoaWxkcmVuKCkudGhlbigoKSA9PiB0aGlzLm9wZW4oKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFt0aGlzLmlzTG9hZGluZyA/IHRoaXMubG9hZGluZ0ljb24gOiB0aGlzLmV4cGFuZEljb25dKVxuICAgIH0sXG4gICAgZ2VuQ2hlY2tib3ggKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkljb24sIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXRyZWV2aWV3LW5vZGVfX2NoZWNrYm94JyxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5pc1NlbGVjdGVkID8gdGhpcy5zZWxlY3RlZENvbG9yIDogdW5kZWZpbmVkXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9hZGluZykgcmV0dXJuXG5cbiAgICAgICAgICAgIHRoaXMuY2hlY2tDaGlsZHJlbigpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAvLyBXZSBuZXh0VGljayBoZXJlIHNvIHRoYXQgaXRlbXMgd2F0Y2ggaW4gVlRyZWV2aWV3IGhhcyBhIGNoYW5jZSB0byBydW4gZmlyc3RcbiAgICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RlZCA9ICF0aGlzLmlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICB0aGlzLmlzSW5kZXRlcm1pbmF0ZSA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICB0aGlzLnRyZWV2aWV3LnVwZGF0ZVNlbGVjdGVkKHRoaXMua2V5LCB0aGlzLmlzU2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgdGhpcy50cmVldmlldy5lbWl0U2VsZWN0ZWQoKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFt0aGlzLmNvbXB1dGVkSWNvbl0pXG4gICAgfSxcbiAgICBnZW5Ob2RlICgpOiBWTm9kZSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IFt0aGlzLmdlbkNvbnRlbnQoKV1cblxuICAgICAgaWYgKHRoaXMuc2VsZWN0YWJsZSkgY2hpbGRyZW4udW5zaGlmdCh0aGlzLmdlbkNoZWNrYm94KCkpXG4gICAgICBpZiAodGhpcy5jaGlsZHJlbikgY2hpbGRyZW4udW5zaGlmdCh0aGlzLmdlblRvZ2dsZSgpKVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtdHJlZXZpZXctbm9kZV9fcm9vdCcsXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZW5PbkNsaWNrICYmIHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy5vcGVuKClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmF0YWJsZSkge1xuICAgICAgICAgICAgICB0aGlzLmlzQWN0aXZlID0gIXRoaXMuaXNBY3RpdmVcbiAgICAgICAgICAgICAgdGhpcy50cmVldmlldy51cGRhdGVBY3RpdmUodGhpcy5rZXksIHRoaXMuaXNBY3RpdmUpXG4gICAgICAgICAgICAgIHRoaXMudHJlZXZpZXcuZW1pdEFjdGl2ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBjaGlsZHJlbilcbiAgICB9LFxuICAgIGdlbkNoaWxkIChpdGVtOiBhbnkpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWVHJlZXZpZXdOb2RlLCB7XG4gICAgICAgIGtleTogZ2V0T2JqZWN0VmFsdWVCeVBhdGgoaXRlbSwgdGhpcy5pdGVtS2V5KSxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBhY3RpdmF0YWJsZTogdGhpcy5hY3RpdmF0YWJsZSxcbiAgICAgICAgICBhY3RpdmVDbGFzczogdGhpcy5hY3RpdmVDbGFzcyxcbiAgICAgICAgICBpdGVtLFxuICAgICAgICAgIHNlbGVjdGFibGU6IHRoaXMuc2VsZWN0YWJsZSxcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiB0aGlzLnNlbGVjdGVkQ29sb3IsXG4gICAgICAgICAgZXhwYW5kSWNvbjogdGhpcy5leHBhbmRJY29uLFxuICAgICAgICAgIGluZGV0ZXJtaW5hdGVJY29uOiB0aGlzLmluZGV0ZXJtaW5hdGVJY29uLFxuICAgICAgICAgIG9mZkljb246IHRoaXMub2ZmSWNvbixcbiAgICAgICAgICBvbkljb246IHRoaXMub25JY29uLFxuICAgICAgICAgIGxvYWRpbmdJY29uOiB0aGlzLmxvYWRpbmdJY29uLFxuICAgICAgICAgIGl0ZW1LZXk6IHRoaXMuaXRlbUtleSxcbiAgICAgICAgICBpdGVtVGV4dDogdGhpcy5pdGVtVGV4dCxcbiAgICAgICAgICBpdGVtQ2hpbGRyZW46IHRoaXMuaXRlbUNoaWxkcmVuLFxuICAgICAgICAgIGxvYWRDaGlsZHJlbjogdGhpcy5sb2FkQ2hpbGRyZW4sXG4gICAgICAgICAgdHJhbnNpdGlvbjogdGhpcy50cmFuc2l0aW9uLFxuICAgICAgICAgIG9wZW5PbkNsaWNrOiB0aGlzLm9wZW5PbkNsaWNrXG4gICAgICAgIH0sXG4gICAgICAgIHNjb3BlZFNsb3RzOiB0aGlzLiRzY29wZWRTbG90c1xuICAgICAgfSlcbiAgICB9LFxuICAgIGdlbkNoaWxkcmVuV3JhcHBlciAoKTogYW55IHtcbiAgICAgIGlmICghdGhpcy5pc09wZW4gfHwgIXRoaXMuY2hpbGRyZW4pIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gW3RoaXMuY2hpbGRyZW4ubWFwKHRoaXMuZ2VuQ2hpbGQpXVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtdHJlZXZpZXctbm9kZV9fY2hpbGRyZW4nXG4gICAgICB9LCBjaGlsZHJlbilcbiAgICB9LFxuICAgIGdlblRyYW5zaXRpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkV4cGFuZFRyYW5zaXRpb24sIFt0aGlzLmdlbkNoaWxkcmVuV3JhcHBlcigpXSlcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKTogVk5vZGUge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW3RoaXMuZ2VuTm9kZSgpXVxuXG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbikgY2hpbGRyZW4ucHVzaCh0aGlzLmdlblRyYW5zaXRpb24oKSlcbiAgICBlbHNlIGNoaWxkcmVuLnB1c2godGhpcy5nZW5DaGlsZHJlbldyYXBwZXIoKSlcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtdHJlZXZpZXctbm9kZScsXG4gICAgICBjbGFzczoge1xuICAgICAgICBbdGhpcy5hY3RpdmVDbGFzc106IHRoaXMuaXNBY3RpdmUsXG4gICAgICAgICd2LXRyZWV2aWV3LW5vZGUtLWxlYWYnOiAhdGhpcy5jaGlsZHJlbixcbiAgICAgICAgJ3YtdHJlZXZpZXctbm9kZS0tY2xpY2snOiB0aGlzLm9wZW5PbkNsaWNrLFxuICAgICAgICAndi10cmVldmlldy1ub2RlLS1zZWxlY3RlZCc6IHRoaXMuaXNTZWxlY3RlZFxuICAgICAgfVxuICAgIH0sIGNoaWxkcmVuKVxuICB9XG59KVxuIl19