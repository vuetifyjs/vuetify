import { VExpandTransition } from '../transitions';
import Bootable from '../../mixins/bootable';
import Toggleable from '../../mixins/toggleable';
import Rippleable from '../../mixins/rippleable';
import { inject as RegistrableInject } from '../../mixins/registrable';
import VIcon from '../VIcon';
import mixins from '../../util/mixins';
import { consoleWarn } from '../../util/console';
export default mixins(Bootable, Toggleable, Rippleable, RegistrableInject('expansionPanel', 'v-expansion-panel-content', 'v-expansion-panel')
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
    data: () => ({
        height: 'auto'
    }),
    computed: {
        containerClasses() {
            return {
                'v-expansion-panel__container--active': this.isActive,
                'v-expansion-panel__container--disabled': this.isDisabled
            };
        },
        isDisabled() {
            return this.expansionPanel.disabled || this.disabled;
        },
        isReadonly() {
            return this.expansionPanel.readonly || this.readonly;
        }
    },
    mounted() {
        this.expansionPanel.register(this);
        // Can be removed once fully deprecated
        if (typeof this.value !== 'undefined')
            consoleWarn('v-model has been deprecated', this);
    },
    beforeDestroy() {
        this.expansionPanel.unregister(this);
    },
    methods: {
        onKeydown(e) {
            // Ensure element is the activeElement
            if (e.keyCode === 13 &&
                this.$el === document.activeElement)
                this.expansionPanel.panelClick(this._uid);
        },
        onHeaderClick() {
            this.isReadonly || this.expansionPanel.panelClick(this._uid);
        },
        genBody() {
            return this.$createElement('div', {
                ref: 'body',
                class: 'v-expansion-panel__body',
                directives: [{
                        name: 'show',
                        value: this.isActive
                    }]
            }, this.showLazyContent(this.$slots.default));
        },
        genHeader() {
            const children = [...this.$slots.header];
            if (!this.hideActions)
                children.push(this.genIcon());
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
        genIcon() {
            const icon = this.$slots.actions ||
                [this.$createElement(VIcon, this.expandIcon)];
            return this.$createElement('transition', {
                attrs: { name: 'fade-transition' }
            }, [
                this.$createElement('div', {
                    staticClass: 'v-expansion-panel__header__icon',
                    directives: [{
                            name: 'show',
                            value: !this.isDisabled
                        }]
                }, icon)
            ]);
        },
        toggle(active) {
            if (active)
                this.isBooted = true;
            // We treat bootable differently
            // Needs time to calc height
            this.$nextTick(() => (this.isActive = active));
        }
    },
    render(h) {
        const children = [];
        this.$slots.header && children.push(this.genHeader());
        children.push(h(VExpandTransition, [this.genBody()]));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkV4cGFuc2lvblBhbmVsQ29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZFeHBhbnNpb25QYW5lbC9WRXhwYW5zaW9uUGFuZWxDb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRWxELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFBO0FBQzVDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBQ2hELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBQ2hELE9BQU8sRUFBZSxNQUFNLElBQUksaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQTtBQUVuRixPQUFPLEtBQUssTUFBTSxVQUFVLENBQUE7QUFHNUIsT0FBTyxNQUFzQixNQUFNLG1CQUFtQixDQUFBO0FBR3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQVFoRCxlQUFlLE1BQU0sQ0FVbkIsUUFBUSxFQUNSLFVBQVUsRUFDVixVQUFVLEVBQ1YsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsMkJBQTJCLEVBQUUsbUJBQW1CLENBQUM7QUFDckYsb0JBQW9CO0NBQ3JCLENBQUMsTUFBTSxDQUFDO0lBQ1AsSUFBSSxFQUFFLDJCQUEyQjtJQUVqQyxLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsT0FBTztRQUNqQixRQUFRLEVBQUUsT0FBTztRQUNqQixVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSx1QkFBdUI7U0FDakM7UUFDRCxXQUFXLEVBQUUsT0FBTztRQUNwQixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUVELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsTUFB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YW5kVHJhbnNpdGlvbiB9IGZyb20gJy4uL3RyYW5zaXRpb25zJ1xuXG5pbXBvcnQgQm9vdGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2Jvb3RhYmxlJ1xuaW1wb3J0IFRvZ2dsZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RvZ2dsZWFibGUnXG5pbXBvcnQgUmlwcGxlYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvcmlwcGxlYWJsZSdcbmltcG9ydCB7IFJlZ2lzdHJhYmxlLCBpbmplY3QgYXMgUmVnaXN0cmFibGVJbmplY3QgfSBmcm9tICcuLi8uLi9taXhpbnMvcmVnaXN0cmFibGUnXG5cbmltcG9ydCBWSWNvbiBmcm9tICcuLi9WSWNvbidcbmltcG9ydCBWRXhwYW5zaW9uUGFuZWwgZnJvbSAnLi9WRXhwYW5zaW9uUGFuZWwnXG5cbmltcG9ydCBtaXhpbnMsIHsgRXh0cmFjdFZ1ZSB9IGZyb20gJy4uLy4uL3V0aWwvbWl4aW5zJ1xuaW1wb3J0IFZ1ZSwgeyBWTm9kZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY29uc29sZVdhcm4gfSBmcm9tICcuLi8uLi91dGlsL2NvbnNvbGUnXG5cbnR5cGUgVkV4cGFuc2lvblBhbmVsSW5zdGFuY2UgPSBJbnN0YW5jZVR5cGU8dHlwZW9mIFZFeHBhbnNpb25QYW5lbD5cblxuaW50ZXJmYWNlIG9wdGlvbnMgZXh0ZW5kcyBWdWUge1xuICBleHBhbnNpb25QYW5lbDogVkV4cGFuc2lvblBhbmVsSW5zdGFuY2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWl4aW5zPG9wdGlvbnMgJlxuLyogZXNsaW50LWRpc2FibGUgaW5kZW50ICovXG4gIEV4dHJhY3RWdWU8W1xuICAgIHR5cGVvZiBCb290YWJsZSxcbiAgICB0eXBlb2YgVG9nZ2xlYWJsZSxcbiAgICB0eXBlb2YgUmlwcGxlYWJsZSxcbiAgICBSZWdpc3RyYWJsZTwnZXhwYW5zaW9uUGFuZWwnPlxuICBdPlxuLyogZXNsaW50LWVuYWJsZSBpbmRlbnQgKi9cbj4oXG4gIEJvb3RhYmxlLFxuICBUb2dnbGVhYmxlLFxuICBSaXBwbGVhYmxlLFxuICBSZWdpc3RyYWJsZUluamVjdCgnZXhwYW5zaW9uUGFuZWwnLCAndi1leHBhbnNpb24tcGFuZWwtY29udGVudCcsICd2LWV4cGFuc2lvbi1wYW5lbCcpXG4gIC8qIEB2dWUvY29tcG9uZW50ICovXG4pLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50JyxcblxuICBwcm9wczoge1xuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIHJlYWRvbmx5OiBCb29sZWFuLFxuICAgIGV4cGFuZEljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5leHBhbmQnXG4gICAgfSxcbiAgICBoaWRlQWN0aW9uczogQm9vbGVhbixcbiAgICByaXBwbGU6IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBPYmplY3RdLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgZGF0YTogKCkgPT4gKHtcbiAgICBoZWlnaHQ6ICdhdXRvJ1xuICB9KSxcblxuICBjb21wdXRlZDoge1xuICAgIGNvbnRhaW5lckNsYXNzZXMgKCk6IG9iamVjdCB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndi1leHBhbnNpb24tcGFuZWxfX2NvbnRhaW5lci0tYWN0aXZlJzogdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgJ3YtZXhwYW5zaW9uLXBhbmVsX19jb250YWluZXItLWRpc2FibGVkJzogdGhpcy5pc0Rpc2FibGVkXG4gICAgICB9XG4gICAgfSxcbiAgICBpc0Rpc2FibGVkICgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLmV4cGFuc2lvblBhbmVsLmRpc2FibGVkIHx8IHRoaXMuZGlzYWJsZWRcbiAgICB9LFxuICAgIGlzUmVhZG9ubHkgKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuZXhwYW5zaW9uUGFuZWwucmVhZG9ubHkgfHwgdGhpcy5yZWFkb25seVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLmV4cGFuc2lvblBhbmVsLnJlZ2lzdGVyKHRoaXMpXG5cbiAgICAvLyBDYW4gYmUgcmVtb3ZlZCBvbmNlIGZ1bGx5IGRlcHJlY2F0ZWRcbiAgICBpZiAodHlwZW9mIHRoaXMudmFsdWUgIT09ICd1bmRlZmluZWQnKSBjb25zb2xlV2Fybigndi1tb2RlbCBoYXMgYmVlbiBkZXByZWNhdGVkJywgdGhpcylcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICB0aGlzLmV4cGFuc2lvblBhbmVsLnVucmVnaXN0ZXIodGhpcylcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgb25LZXlkb3duIChlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAvLyBFbnN1cmUgZWxlbWVudCBpcyB0aGUgYWN0aXZlRWxlbWVudFxuICAgICAgaWYgKFxuICAgICAgICBlLmtleUNvZGUgPT09IDEzICYmXG4gICAgICAgIHRoaXMuJGVsID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICApIHRoaXMuZXhwYW5zaW9uUGFuZWwucGFuZWxDbGljayh0aGlzLl91aWQpXG4gICAgfSxcbiAgICBvbkhlYWRlckNsaWNrICgpIHtcbiAgICAgIHRoaXMuaXNSZWFkb25seSB8fCB0aGlzLmV4cGFuc2lvblBhbmVsLnBhbmVsQ2xpY2sodGhpcy5fdWlkKVxuICAgIH0sXG4gICAgZ2VuQm9keSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICByZWY6ICdib2R5JyxcbiAgICAgICAgY2xhc3M6ICd2LWV4cGFuc2lvbi1wYW5lbF9fYm9keScsXG4gICAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgICAgbmFtZTogJ3Nob3cnLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLmlzQWN0aXZlXG4gICAgICAgIH1dIGFzIGFueVxuICAgICAgfSwgdGhpcy5zaG93TGF6eUNvbnRlbnQodGhpcy4kc2xvdHMuZGVmYXVsdCkpXG4gICAgfSxcbiAgICBnZW5IZWFkZXIgKCkge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbLi4udGhpcy4kc2xvdHMuaGVhZGVyXVxuXG4gICAgICBpZiAoIXRoaXMuaGlkZUFjdGlvbnMpIGNoaWxkcmVuLnB1c2godGhpcy5nZW5JY29uKCkpXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1leHBhbnNpb24tcGFuZWxfX2hlYWRlcicsXG4gICAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgICAgbmFtZTogJ3JpcHBsZScsXG4gICAgICAgICAgdmFsdWU6IHRoaXMucmlwcGxlXG4gICAgICAgIH1dIGFzIGFueSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBjbGljazogdGhpcy5vbkhlYWRlckNsaWNrXG4gICAgICAgIH1cbiAgICAgIH0sIGNoaWxkcmVuKVxuICAgIH0sXG4gICAgZ2VuSWNvbiAoKSB7XG4gICAgICBjb25zdCBpY29uID0gdGhpcy4kc2xvdHMuYWN0aW9ucyB8fFxuICAgICAgICBbdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwgdGhpcy5leHBhbmRJY29uKV1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RyYW5zaXRpb24nLCB7XG4gICAgICAgIGF0dHJzOiB7IG5hbWU6ICdmYWRlLXRyYW5zaXRpb24nIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1leHBhbnNpb24tcGFuZWxfX2hlYWRlcl9faWNvbicsXG4gICAgICAgICAgZGlyZWN0aXZlczogW3tcbiAgICAgICAgICAgIG5hbWU6ICdzaG93JyxcbiAgICAgICAgICAgIHZhbHVlOiAhdGhpcy5pc0Rpc2FibGVkXG4gICAgICAgICAgfV0gYXMgYW55XG4gICAgICAgIH0sIGljb24pXG4gICAgICBdKVxuICAgIH0sXG4gICAgdG9nZ2xlIChhY3RpdmU6IGJvb2xlYW4pIHtcbiAgICAgIGlmIChhY3RpdmUpIHRoaXMuaXNCb290ZWQgPSB0cnVlXG5cbiAgICAgIC8vIFdlIHRyZWF0IGJvb3RhYmxlIGRpZmZlcmVudGx5XG4gICAgICAvLyBOZWVkcyB0aW1lIHRvIGNhbGMgaGVpZ2h0XG4gICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiAodGhpcy5pc0FjdGl2ZSA9IGFjdGl2ZSkpXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdXG5cbiAgICB0aGlzLiRzbG90cy5oZWFkZXIgJiYgY2hpbGRyZW4ucHVzaCh0aGlzLmdlbkhlYWRlcigpKVxuICAgIGNoaWxkcmVuLnB1c2goaChWRXhwYW5kVHJhbnNpdGlvbiwgW3RoaXMuZ2VuQm9keSgpXSkpXG5cbiAgICByZXR1cm4gaCgnbGknLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtZXhwYW5zaW9uLXBhbmVsX19jb250YWluZXInLFxuICAgICAgY2xhc3M6IHRoaXMuY29udGFpbmVyQ2xhc3NlcyxcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHRhYmluZGV4OiB0aGlzLmlzUmVhZG9ubHkgfHwgdGhpcy5pc0Rpc2FibGVkID8gbnVsbCA6IDBcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICBrZXlkb3duOiB0aGlzLm9uS2V5ZG93blxuICAgICAgfVxuICAgIH0sIGNoaWxkcmVuKVxuICB9XG59KVxuIl19