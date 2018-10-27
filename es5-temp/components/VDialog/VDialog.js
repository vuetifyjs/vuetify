import '../../stylus/components/_dialogs.styl';
// Mixins
import Dependent from '../../mixins/dependent';
import Detachable from '../../mixins/detachable';
import Overlayable from '../../mixins/overlayable';
import Returnable from '../../mixins/returnable';
import Stackable from '../../mixins/stackable';
import Toggleable from '../../mixins/toggleable';
// Directives
import ClickOutside from '../../directives/click-outside';
// Helpers
import { getZIndex, convertToUnit } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-dialog',
    directives: {
        ClickOutside
    },
    mixins: [
        Dependent,
        Detachable,
        Overlayable,
        Returnable,
        Stackable,
        Toggleable
    ],
    props: {
        disabled: Boolean,
        persistent: Boolean,
        fullscreen: Boolean,
        fullWidth: Boolean,
        noClickAnimation: Boolean,
        maxWidth: {
            type: [String, Number],
            default: 'none'
        },
        origin: {
            type: String,
            default: 'center center'
        },
        width: {
            type: [String, Number],
            default: 'auto'
        },
        scrollable: Boolean,
        transition: {
            type: [String, Boolean],
            default: 'dialog-transition'
        }
    },
    data() {
        return {
            animate: false,
            animateTimeout: null,
            stackClass: 'v-dialog__content--active',
            stackMinZIndex: 200
        };
    },
    computed: {
        classes() {
            return {
                [(`v-dialog ${this.contentClass}`).trim()]: true,
                'v-dialog--active': this.isActive,
                'v-dialog--persistent': this.persistent,
                'v-dialog--fullscreen': this.fullscreen,
                'v-dialog--scrollable': this.scrollable,
                'v-dialog--animated': this.animate
            };
        },
        contentClasses() {
            return {
                'v-dialog__content': true,
                'v-dialog__content--active': this.isActive
            };
        }
    },
    watch: {
        isActive(val) {
            if (val) {
                this.show();
            }
            else {
                this.removeOverlay();
                this.unbind();
            }
        }
    },
    mounted() {
        this.isBooted = this.isActive;
        this.isActive && this.show();
    },
    beforeDestroy() {
        if (typeof window !== 'undefined')
            this.unbind();
    },
    methods: {
        animateClick() {
            this.animate = false;
            // Needed for when clicking very fast
            // outside of the dialog
            this.$nextTick(() => {
                this.animate = true;
                clearTimeout(this.animateTimeout);
                this.animateTimeout = setTimeout(() => (this.animate = false), 150);
            });
        },
        closeConditional(e) {
            // If the dialog content contains
            // the click event, or if the
            // dialog is not active
            if (this.$refs.content.contains(e.target) ||
                !this.isActive)
                return false;
            // If we made it here, the click is outside
            // and is active. If persistent, and the
            // click is on the overlay, animate
            if (this.persistent) {
                if (!this.noClickAnimation &&
                    this.overlay === e.target)
                    this.animateClick();
                return false;
            }
            // close dialog if !persistent, clicked outside and we're the topmost dialog.
            // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
            return getZIndex(this.$refs.content) >= this.getMaxZIndex();
        },
        show() {
            !this.fullscreen && !this.hideOverlay && this.genOverlay();
            this.fullscreen && this.hideScroll();
            this.$refs.content.focus();
            this.$listeners.keydown && this.bind();
        },
        bind() {
            window.addEventListener('keydown', this.onKeydown);
        },
        unbind() {
            window.removeEventListener('keydown', this.onKeydown);
        },
        onKeydown(e) {
            this.$emit('keydown', e);
        }
    },
    render(h) {
        const children = [];
        const data = {
            'class': this.classes,
            ref: 'dialog',
            directives: [
                {
                    name: 'click-outside',
                    value: () => (this.isActive = false),
                    args: {
                        closeConditional: this.closeConditional,
                        include: this.getOpenDependentElements
                    }
                },
                { name: 'show', value: this.isActive }
            ],
            on: {
                click: e => { e.stopPropagation(); }
            }
        };
        if (!this.fullscreen) {
            data.style = {
                maxWidth: this.maxWidth === 'none' ? undefined : convertToUnit(this.maxWidth),
                width: this.width === 'auto' ? undefined : convertToUnit(this.width)
            };
        }
        if (this.$slots.activator) {
            children.push(h('div', {
                staticClass: 'v-dialog__activator',
                'class': {
                    'v-dialog__activator--disabled': this.disabled
                },
                on: {
                    click: e => {
                        e.stopPropagation();
                        if (!this.disabled)
                            this.isActive = !this.isActive;
                    }
                }
            }, [this.$slots.activator]));
        }
        let dialog = h('div', data, this.showLazyContent(this.$slots.default));
        if (this.transition) {
            dialog = h('transition', {
                props: {
                    name: this.transition,
                    origin: this.origin
                }
            }, [dialog]);
        }
        children.push(h('div', {
            'class': this.contentClasses,
            attrs: {
                tabIndex: '-1',
                ...this.getScopeIdAttrs()
            },
            style: { zIndex: this.activeZIndex },
            ref: 'content'
        }, [dialog]));
        return h('div', {
            staticClass: 'v-dialog__container',
            style: {
                display: (!this.$slots.activator || this.fullWidth) ? 'block' : 'inline-block'
            }
        }, children);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEaWFsb2cvVkRpYWxvZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHVDQUF1QyxDQUFBO0FBRTlDLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQTtBQUNsRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUVoRCxhQUFhO0FBQ2IsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUE7QUFFekQsVUFBVTtBQUNWLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFN0Qsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBVTtJQUVoQixVQUFVLEVBQUU7UUFDVixZQUFZO0tBQ2I7SUFFRCxNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsVUFBVTtRQUNWLFdBQVc7UUFDWCxVQUFVO1FBQ1YsU0FBUztRQUNULFVBQVU7S0FDWDtJQUVELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFVBQVUsRUFBRSxPQUFPO1FBQ25CLFVBQVUsRUFBRSxPQUFPO1FBQ25CLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLGdCQUFnQixFQUFFLE9BQU87UUFDekIsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGVBQWU7U0FDekI7UUFDRCxLQUFLLEVBQUU7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Z3Muc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgRGVwZW5kZW50IGZyb20gJy4uLy4uL21peGlucy9kZXBlbmRlbnQnXG5pbXBvcnQgRGV0YWNoYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvZGV0YWNoYWJsZSdcbmltcG9ydCBPdmVybGF5YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvb3ZlcmxheWFibGUnXG5pbXBvcnQgUmV0dXJuYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvcmV0dXJuYWJsZSdcbmltcG9ydCBTdGFja2FibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3N0YWNrYWJsZSdcbmltcG9ydCBUb2dnbGVhYmxlIGZyb20gJy4uLy4uL21peGlucy90b2dnbGVhYmxlJ1xuXG4vLyBEaXJlY3RpdmVzXG5pbXBvcnQgQ2xpY2tPdXRzaWRlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvY2xpY2stb3V0c2lkZSdcblxuLy8gSGVscGVyc1xuaW1wb3J0IHsgZ2V0WkluZGV4LCBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1kaWFsb2cnLFxuXG4gIGRpcmVjdGl2ZXM6IHtcbiAgICBDbGlja091dHNpZGVcbiAgfSxcblxuICBtaXhpbnM6IFtcbiAgICBEZXBlbmRlbnQsXG4gICAgRGV0YWNoYWJsZSxcbiAgICBPdmVybGF5YWJsZSxcbiAgICBSZXR1cm5hYmxlLFxuICAgIFN0YWNrYWJsZSxcbiAgICBUb2dnbGVhYmxlXG4gIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBkaXNhYmxlZDogQm9vbGVhbixcbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIGZ1bGxzY3JlZW46IEJvb2xlYW4sXG4gICAgZnVsbFdpZHRoOiBCb29sZWFuLFxuICAgIG5vQ2xpY2tBbmltYXRpb246IEJvb2xlYW4sXG4gICAgbWF4V2lkdGg6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiAnbm9uZSdcbiAgICB9LFxuICAgIG9yaWdpbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2NlbnRlciBjZW50ZXInXG4gICAgfSxcbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6ICdhdXRvJ1xuICAgIH0sXG4gICAgc2Nyb2xsYWJsZTogQm9vbGVhbixcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBCb29sZWFuXSxcbiAgICAgIGRlZmF1bHQ6ICdkaWFsb2ctdHJhbnNpdGlvbidcbiAgICB9XG4gIH0sXG5cbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFuaW1hdGU6IGZhbHNlLFxuICAgICAgYW5pbWF0ZVRpbWVvdXQ6IG51bGwsXG4gICAgICBzdGFja0NsYXNzOiAndi1kaWFsb2dfX2NvbnRlbnQtLWFjdGl2ZScsXG4gICAgICBzdGFja01pblpJbmRleDogMjAwXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3NlcyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbKGB2LWRpYWxvZyAke3RoaXMuY29udGVudENsYXNzfWApLnRyaW0oKV06IHRydWUsXG4gICAgICAgICd2LWRpYWxvZy0tYWN0aXZlJzogdGhpcy5pc0FjdGl2ZSxcbiAgICAgICAgJ3YtZGlhbG9nLS1wZXJzaXN0ZW50JzogdGhpcy5wZXJzaXN0ZW50LFxuICAgICAgICAndi1kaWFsb2ctLWZ1bGxzY3JlZW4nOiB0aGlzLmZ1bGxzY3JlZW4sXG4gICAgICAgICd2LWRpYWxvZy0tc2Nyb2xsYWJsZSc6IHRoaXMuc2Nyb2xsYWJsZSxcbiAgICAgICAgJ3YtZGlhbG9nLS1hbmltYXRlZCc6IHRoaXMuYW5pbWF0ZVxuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudENsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3YtZGlhbG9nX19jb250ZW50JzogdHJ1ZSxcbiAgICAgICAgJ3YtZGlhbG9nX19jb250ZW50LS1hY3RpdmUnOiB0aGlzLmlzQWN0aXZlXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaXNBY3RpdmUgKHZhbCkge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICB0aGlzLnNob3coKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVPdmVybGF5KClcbiAgICAgICAgdGhpcy51bmJpbmQoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtb3VudGVkICgpIHtcbiAgICB0aGlzLmlzQm9vdGVkID0gdGhpcy5pc0FjdGl2ZVxuICAgIHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5zaG93KClcbiAgfSxcblxuICBiZWZvcmVEZXN0cm95ICgpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHRoaXMudW5iaW5kKClcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgYW5pbWF0ZUNsaWNrICgpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZSA9IGZhbHNlXG4gICAgICAvLyBOZWVkZWQgZm9yIHdoZW4gY2xpY2tpbmcgdmVyeSBmYXN0XG4gICAgICAvLyBvdXRzaWRlIG9mIHRoZSBkaWFsb2dcbiAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy5hbmltYXRlID0gdHJ1ZVxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5hbmltYXRlVGltZW91dClcbiAgICAgICAgdGhpcy5hbmltYXRlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gKHRoaXMuYW5pbWF0ZSA9IGZhbHNlKSwgMTUwKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNsb3NlQ29uZGl0aW9uYWwgKGUpIHtcbiAgICAgIC8vIElmIHRoZSBkaWFsb2cgY29udGVudCBjb250YWluc1xuICAgICAgLy8gdGhlIGNsaWNrIGV2ZW50LCBvciBpZiB0aGVcbiAgICAgIC8vIGRpYWxvZyBpcyBub3QgYWN0aXZlXG4gICAgICBpZiAodGhpcy4kcmVmcy5jb250ZW50LmNvbnRhaW5zKGUudGFyZ2V0KSB8fFxuICAgICAgICAhdGhpcy5pc0FjdGl2ZVxuICAgICAgKSByZXR1cm4gZmFsc2VcblxuICAgICAgLy8gSWYgd2UgbWFkZSBpdCBoZXJlLCB0aGUgY2xpY2sgaXMgb3V0c2lkZVxuICAgICAgLy8gYW5kIGlzIGFjdGl2ZS4gSWYgcGVyc2lzdGVudCwgYW5kIHRoZVxuICAgICAgLy8gY2xpY2sgaXMgb24gdGhlIG92ZXJsYXksIGFuaW1hdGVcbiAgICAgIGlmICh0aGlzLnBlcnNpc3RlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vQ2xpY2tBbmltYXRpb24gJiZcbiAgICAgICAgICB0aGlzLm92ZXJsYXkgPT09IGUudGFyZ2V0XG4gICAgICAgICkgdGhpcy5hbmltYXRlQ2xpY2soKVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICAvLyBjbG9zZSBkaWFsb2cgaWYgIXBlcnNpc3RlbnQsIGNsaWNrZWQgb3V0c2lkZSBhbmQgd2UncmUgdGhlIHRvcG1vc3QgZGlhbG9nLlxuICAgICAgLy8gU2luY2UgdGhpcyBzaG91bGQgb25seSBiZSBjYWxsZWQgaW4gYSBjYXB0dXJlIGV2ZW50IChib3R0b20gdXApLCB3ZSBzaG91bGRuJ3QgbmVlZCB0byBzdG9wIHByb3BhZ2F0aW9uXG4gICAgICByZXR1cm4gZ2V0WkluZGV4KHRoaXMuJHJlZnMuY29udGVudCkgPj0gdGhpcy5nZXRNYXhaSW5kZXgoKVxuICAgIH0sXG4gICAgc2hvdyAoKSB7XG4gICAgICAhdGhpcy5mdWxsc2NyZWVuICYmICF0aGlzLmhpZGVPdmVybGF5ICYmIHRoaXMuZ2VuT3ZlcmxheSgpXG4gICAgICB0aGlzLmZ1bGxzY3JlZW4gJiYgdGhpcy5oaWRlU2Nyb2xsKClcbiAgICAgIHRoaXMuJHJlZnMuY29udGVudC5mb2N1cygpXG4gICAgICB0aGlzLiRsaXN0ZW5lcnMua2V5ZG93biAmJiB0aGlzLmJpbmQoKVxuICAgIH0sXG4gICAgYmluZCAoKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlkb3duKVxuICAgIH0sXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pXG4gICAgfSxcbiAgICBvbktleWRvd24gKGUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2tleWRvd24nLCBlKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3NlcyxcbiAgICAgIHJlZjogJ2RpYWxvZycsXG4gICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnY2xpY2stb3V0c2lkZScsXG4gICAgICAgICAgdmFsdWU6ICgpID0+ICh0aGlzLmlzQWN0aXZlID0gZmFsc2UpLFxuICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIGNsb3NlQ29uZGl0aW9uYWw6IHRoaXMuY2xvc2VDb25kaXRpb25hbCxcbiAgICAgICAgICAgIGluY2x1ZGU6IHRoaXMuZ2V0T3BlbkRlcGVuZGVudEVsZW1lbnRzXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7IG5hbWU6ICdzaG93JywgdmFsdWU6IHRoaXMuaXNBY3RpdmUgfVxuICAgICAgXSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGNsaWNrOiBlID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKSB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmZ1bGxzY3JlZW4pIHtcbiAgICAgIGRhdGEuc3R5bGUgPSB7XG4gICAgICAgIG1heFdpZHRoOiB0aGlzLm1heFdpZHRoID09PSAnbm9uZScgPyB1bmRlZmluZWQgOiBjb252ZXJ0VG9Vbml0KHRoaXMubWF4V2lkdGgpLFxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCA9PT0gJ2F1dG8nID8gdW5kZWZpbmVkIDogY29udmVydFRvVW5pdCh0aGlzLndpZHRoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLiRzbG90cy5hY3RpdmF0b3IpIHtcbiAgICAgIGNoaWxkcmVuLnB1c2goaCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtZGlhbG9nX19hY3RpdmF0b3InLFxuICAgICAgICAnY2xhc3MnOiB7XG4gICAgICAgICAgJ3YtZGlhbG9nX19hY3RpdmF0b3ItLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGNsaWNrOiBlID0+IHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkgdGhpcy5pc0FjdGl2ZSA9ICF0aGlzLmlzQWN0aXZlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBbdGhpcy4kc2xvdHMuYWN0aXZhdG9yXSkpXG4gICAgfVxuXG4gICAgbGV0IGRpYWxvZyA9IGgoJ2RpdicsIGRhdGEsIHRoaXMuc2hvd0xhenlDb250ZW50KHRoaXMuJHNsb3RzLmRlZmF1bHQpKVxuICAgIGlmICh0aGlzLnRyYW5zaXRpb24pIHtcbiAgICAgIGRpYWxvZyA9IGgoJ3RyYW5zaXRpb24nLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgbmFtZTogdGhpcy50cmFuc2l0aW9uLFxuICAgICAgICAgIG9yaWdpbjogdGhpcy5vcmlnaW5cbiAgICAgICAgfVxuICAgICAgfSwgW2RpYWxvZ10pXG4gICAgfVxuXG4gICAgY2hpbGRyZW4ucHVzaChoKCdkaXYnLCB7XG4gICAgICAnY2xhc3MnOiB0aGlzLmNvbnRlbnRDbGFzc2VzLFxuICAgICAgYXR0cnM6IHtcbiAgICAgICAgdGFiSW5kZXg6ICctMScsXG4gICAgICAgIC4uLnRoaXMuZ2V0U2NvcGVJZEF0dHJzKClcbiAgICAgIH0sXG4gICAgICBzdHlsZTogeyB6SW5kZXg6IHRoaXMuYWN0aXZlWkluZGV4IH0sXG4gICAgICByZWY6ICdjb250ZW50J1xuICAgIH0sIFtkaWFsb2ddKSlcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtZGlhbG9nX19jb250YWluZXInLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogKCF0aGlzLiRzbG90cy5hY3RpdmF0b3IgfHwgdGhpcy5mdWxsV2lkdGgpID8gJ2Jsb2NrJyA6ICdpbmxpbmUtYmxvY2snXG4gICAgICB9XG4gICAgfSwgY2hpbGRyZW4pXG4gIH1cbn1cbiJdfQ==