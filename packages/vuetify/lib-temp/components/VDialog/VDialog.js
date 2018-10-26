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
import ThemeProvider from '../../util/ThemeProvider';
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
        light: Boolean,
        dark: Boolean,
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
        },
        fullscreen(val) {
            if (val)
                this.hideScroll();
            else
                this.showScroll();
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
        hideScroll() {
            if (this.fullscreen) {
                document.documentElement.classList.add('overflow-y-hidden');
            }
            else {
                Overlayable.methods.hideScroll.call(this);
            }
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
        }, [
            this.$createElement(ThemeProvider, {
                props: {
                    root: true,
                    light: this.light,
                    dark: this.dark
                }
            }, [dialog])
        ]));
        return h('div', {
            staticClass: 'v-dialog__container',
            style: {
                display: (!this.$slots.activator || this.fullWidth) ? 'block' : 'inline-block'
            }
        }, children);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZEaWFsb2cvVkRpYWxvZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHVDQUF1QyxDQUFBO0FBRTlDLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQTtBQUNsRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUNoRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUM5QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQTtBQUVoRCxhQUFhO0FBQ2IsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUE7QUFFekQsVUFBVTtBQUNWLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDN0QsT0FBTyxhQUFhLE1BQU0sMEJBQTBCLENBQUE7QUFFcEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsVUFBVTtJQUVoQixVQUFVLEVBQUU7UUFDVixZQUFZO0tBQ2I7SUFFRCxNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsVUFBVTtRQUNWLFdBQVc7UUFDWCxVQUFVO1FBQ1YsU0FBUztRQUNULFVBQVU7S0FDWDtJQUVELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFVBQVUsRUFBRSxPQUFPO1FBQ25CLFVBQVUsRUFBRSxPQUFPO1FBQ25CLFNBQVMsRUFBRSxPQUFPO1FBQ2xCLGdCQUFnQixFQUFFLE9BQU87UUFDekIsS0FBSyxFQUFFLE9BQU87UUFDZCxJQUFJLEVBQUUsT0FBTztRQUNiLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLE1BQU07U0FDaEI7UUFD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RSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxTQUFTO1NBQ2YsRUFBRTtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFO2dCQUNqQyxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLElBQUk7b0JBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7aUJBQ2hCO2FBQ0YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2IsQ0FBQyxDQUFDLENBQUE7UUFFSCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDZCxXQUFXLEVBQUUscUJBQXFCO1lBQ2xDLEtBQUssRUFBRTtnQkFDTCxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjO2FBQy9FO1NBQ0YsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNkLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fZGlhbG9ncy5zdHlsJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBEZXBlbmRlbnQgZnJvbSAnLi4vLi4vbWl4aW5zL2RlcGVuZGVudCdcbmltcG9ydCBEZXRhY2hhYmxlIGZyb20gJy4uLy4uL21peGlucy9kZXRhY2hhYmxlJ1xuaW1wb3J0IE92ZXJsYXlhYmxlIGZyb20gJy4uLy4uL21peGlucy9vdmVybGF5YWJsZSdcbmltcG9ydCBSZXR1cm5hYmxlIGZyb20gJy4uLy4uL21peGlucy9yZXR1cm5hYmxlJ1xuaW1wb3J0IFN0YWNrYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvc3RhY2thYmxlJ1xuaW1wb3J0IFRvZ2dsZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RvZ2dsZWFibGUnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCBDbGlja091dHNpZGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlJ1xuXG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBnZXRaSW5kZXgsIGNvbnZlcnRUb1VuaXQgfSBmcm9tICcuLi8uLi91dGlsL2hlbHBlcnMnXG5pbXBvcnQgVGhlbWVQcm92aWRlciBmcm9tICcuLi8uLi91dGlsL1RoZW1lUHJvdmlkZXInXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LWRpYWxvZycsXG5cbiAgZGlyZWN0aXZlczoge1xuICAgIENsaWNrT3V0c2lkZVxuICB9LFxuXG4gIG1peGluczogW1xuICAgIERlcGVuZGVudCxcbiAgICBEZXRhY2hhYmxlLFxuICAgIE92ZXJsYXlhYmxlLFxuICAgIFJldHVybmFibGUsXG4gICAgU3RhY2thYmxlLFxuICAgIFRvZ2dsZWFibGVcbiAgXSxcblxuICBwcm9wczoge1xuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgZnVsbHNjcmVlbjogQm9vbGVhbixcbiAgICBmdWxsV2lkdGg6IEJvb2xlYW4sXG4gICAgbm9DbGlja0FuaW1hdGlvbjogQm9vbGVhbixcbiAgICBsaWdodDogQm9vbGVhbixcbiAgICBkYXJrOiBCb29sZWFuLFxuICAgIG1heFdpZHRoOiB7XG4gICAgICB0eXBlOiBbU3RyaW5nLCBOdW1iZXJdLFxuICAgICAgZGVmYXVsdDogJ25vbmUnXG4gICAgfSxcbiAgICBvcmlnaW46IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjZW50ZXIgY2VudGVyJ1xuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE51bWJlcl0sXG4gICAgICBkZWZhdWx0OiAnYXV0bydcbiAgICB9LFxuICAgIHNjcm9sbGFibGU6IEJvb2xlYW4sXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogW1N0cmluZywgQm9vbGVhbl0sXG4gICAgICBkZWZhdWx0OiAnZGlhbG9nLXRyYW5zaXRpb24nXG4gICAgfVxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhbmltYXRlOiBmYWxzZSxcbiAgICAgIGFuaW1hdGVUaW1lb3V0OiBudWxsLFxuICAgICAgc3RhY2tDbGFzczogJ3YtZGlhbG9nX19jb250ZW50LS1hY3RpdmUnLFxuICAgICAgc3RhY2tNaW5aSW5kZXg6IDIwMFxuICAgIH1cbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGNsYXNzZXMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgWyhgdi1kaWFsb2cgJHt0aGlzLmNvbnRlbnRDbGFzc31gKS50cmltKCldOiB0cnVlLFxuICAgICAgICAndi1kaWFsb2ctLWFjdGl2ZSc6IHRoaXMuaXNBY3RpdmUsXG4gICAgICAgICd2LWRpYWxvZy0tcGVyc2lzdGVudCc6IHRoaXMucGVyc2lzdGVudCxcbiAgICAgICAgJ3YtZGlhbG9nLS1mdWxsc2NyZWVuJzogdGhpcy5mdWxsc2NyZWVuLFxuICAgICAgICAndi1kaWFsb2ctLXNjcm9sbGFibGUnOiB0aGlzLnNjcm9sbGFibGUsXG4gICAgICAgICd2LWRpYWxvZy0tYW5pbWF0ZWQnOiB0aGlzLmFuaW1hdGVcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbnRlbnRDbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWRpYWxvZ19fY29udGVudCc6IHRydWUsXG4gICAgICAgICd2LWRpYWxvZ19fY29udGVudC0tYWN0aXZlJzogdGhpcy5pc0FjdGl2ZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGlzQWN0aXZlICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy5zaG93KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlT3ZlcmxheSgpXG4gICAgICAgIHRoaXMudW5iaW5kKClcbiAgICAgIH1cbiAgICB9LFxuICAgIGZ1bGxzY3JlZW4gKHZhbCkge1xuICAgICAgaWYgKHZhbCkgdGhpcy5oaWRlU2Nyb2xsKClcbiAgICAgIGVsc2UgdGhpcy5zaG93U2Nyb2xsKClcbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy5pc0Jvb3RlZCA9IHRoaXMuaXNBY3RpdmVcbiAgICB0aGlzLmlzQWN0aXZlICYmIHRoaXMuc2hvdygpXG4gIH0sXG5cbiAgYmVmb3JlRGVzdHJveSAoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB0aGlzLnVuYmluZCgpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGFuaW1hdGVDbGljayAoKSB7XG4gICAgICB0aGlzLmFuaW1hdGUgPSBmYWxzZVxuICAgICAgLy8gTmVlZGVkIGZvciB3aGVuIGNsaWNraW5nIHZlcnkgZmFzdFxuICAgICAgLy8gb3V0c2lkZSBvZiB0aGUgZGlhbG9nXG4gICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSA9IHRydWVcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYW5pbWF0ZVRpbWVvdXQpXG4gICAgICAgIHRoaXMuYW5pbWF0ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+ICh0aGlzLmFuaW1hdGUgPSBmYWxzZSksIDE1MClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjbG9zZUNvbmRpdGlvbmFsIChlKSB7XG4gICAgICAvLyBJZiB0aGUgZGlhbG9nIGNvbnRlbnQgY29udGFpbnNcbiAgICAgIC8vIHRoZSBjbGljayBldmVudCwgb3IgaWYgdGhlXG4gICAgICAvLyBkaWFsb2cgaXMgbm90IGFjdGl2ZVxuICAgICAgaWYgKHRoaXMuJHJlZnMuY29udGVudC5jb250YWlucyhlLnRhcmdldCkgfHxcbiAgICAgICAgIXRoaXMuaXNBY3RpdmVcbiAgICAgICkgcmV0dXJuIGZhbHNlXG5cbiAgICAgIC8vIElmIHdlIG1hZGUgaXQgaGVyZSwgdGhlIGNsaWNrIGlzIG91dHNpZGVcbiAgICAgIC8vIGFuZCBpcyBhY3RpdmUuIElmIHBlcnNpc3RlbnQsIGFuZCB0aGVcbiAgICAgIC8vIGNsaWNrIGlzIG9uIHRoZSBvdmVybGF5LCBhbmltYXRlXG4gICAgICBpZiAodGhpcy5wZXJzaXN0ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5ub0NsaWNrQW5pbWF0aW9uICYmXG4gICAgICAgICAgdGhpcy5vdmVybGF5ID09PSBlLnRhcmdldFxuICAgICAgICApIHRoaXMuYW5pbWF0ZUNsaWNrKClcblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgLy8gY2xvc2UgZGlhbG9nIGlmICFwZXJzaXN0ZW50LCBjbGlja2VkIG91dHNpZGUgYW5kIHdlJ3JlIHRoZSB0b3Btb3N0IGRpYWxvZy5cbiAgICAgIC8vIFNpbmNlIHRoaXMgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIGluIGEgY2FwdHVyZSBldmVudCAoYm90dG9tIHVwKSwgd2Ugc2hvdWxkbid0IG5lZWQgdG8gc3RvcCBwcm9wYWdhdGlvblxuICAgICAgcmV0dXJuIGdldFpJbmRleCh0aGlzLiRyZWZzLmNvbnRlbnQpID49IHRoaXMuZ2V0TWF4WkluZGV4KClcbiAgICB9LFxuICAgIGhpZGVTY3JvbGwgKCkge1xuICAgICAgaWYgKHRoaXMuZnVsbHNjcmVlbikge1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3cteS1oaWRkZW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT3ZlcmxheWFibGUubWV0aG9kcy5oaWRlU2Nyb2xsLmNhbGwodGhpcylcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3cgKCkge1xuICAgICAgIXRoaXMuZnVsbHNjcmVlbiAmJiAhdGhpcy5oaWRlT3ZlcmxheSAmJiB0aGlzLmdlbk92ZXJsYXkoKVxuICAgICAgdGhpcy5mdWxsc2NyZWVuICYmIHRoaXMuaGlkZVNjcm9sbCgpXG4gICAgICB0aGlzLiRyZWZzLmNvbnRlbnQuZm9jdXMoKVxuICAgICAgdGhpcy4kbGlzdGVuZXJzLmtleWRvd24gJiYgdGhpcy5iaW5kKClcbiAgICB9LFxuICAgIGJpbmQgKCkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5ZG93bilcbiAgICB9LFxuICAgIHVuYmluZCAoKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlkb3duKVxuICAgIH0sXG4gICAgb25LZXlkb3duIChlKSB7XG4gICAgICB0aGlzLiRlbWl0KCdrZXlkb3duJywgZSlcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXVxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAnY2xhc3MnOiB0aGlzLmNsYXNzZXMsXG4gICAgICByZWY6ICdkaWFsb2cnLFxuICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2NsaWNrLW91dHNpZGUnLFxuICAgICAgICAgIHZhbHVlOiAoKSA9PiAodGhpcy5pc0FjdGl2ZSA9IGZhbHNlKSxcbiAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICBjbG9zZUNvbmRpdGlvbmFsOiB0aGlzLmNsb3NlQ29uZGl0aW9uYWwsXG4gICAgICAgICAgICBpbmNsdWRlOiB0aGlzLmdldE9wZW5EZXBlbmRlbnRFbGVtZW50c1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyBuYW1lOiAnc2hvdycsIHZhbHVlOiB0aGlzLmlzQWN0aXZlIH1cbiAgICAgIF0sXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogZSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCkgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5mdWxsc2NyZWVuKSB7XG4gICAgICBkYXRhLnN0eWxlID0ge1xuICAgICAgICBtYXhXaWR0aDogdGhpcy5tYXhXaWR0aCA9PT0gJ25vbmUnID8gdW5kZWZpbmVkIDogY29udmVydFRvVW5pdCh0aGlzLm1heFdpZHRoKSxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggPT09ICdhdXRvJyA/IHVuZGVmaW5lZCA6IGNvbnZlcnRUb1VuaXQodGhpcy53aWR0aClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy4kc2xvdHMuYWN0aXZhdG9yKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKGgoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWRpYWxvZ19fYWN0aXZhdG9yJyxcbiAgICAgICAgJ2NsYXNzJzoge1xuICAgICAgICAgICd2LWRpYWxvZ19fYWN0aXZhdG9yLS1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWRcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBjbGljazogZSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHRoaXMuaXNBY3RpdmUgPSAhdGhpcy5pc0FjdGl2ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgW3RoaXMuJHNsb3RzLmFjdGl2YXRvcl0pKVxuICAgIH1cblxuICAgIGxldCBkaWFsb2cgPSBoKCdkaXYnLCBkYXRhLCB0aGlzLnNob3dMYXp5Q29udGVudCh0aGlzLiRzbG90cy5kZWZhdWx0KSlcbiAgICBpZiAodGhpcy50cmFuc2l0aW9uKSB7XG4gICAgICBkaWFsb2cgPSBoKCd0cmFuc2l0aW9uJywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMudHJhbnNpdGlvbixcbiAgICAgICAgICBvcmlnaW46IHRoaXMub3JpZ2luXG4gICAgICAgIH1cbiAgICAgIH0sIFtkaWFsb2ddKVxuICAgIH1cblxuICAgIGNoaWxkcmVuLnB1c2goaCgnZGl2Jywge1xuICAgICAgJ2NsYXNzJzogdGhpcy5jb250ZW50Q2xhc3NlcyxcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIHRhYkluZGV4OiAnLTEnLFxuICAgICAgICAuLi50aGlzLmdldFNjb3BlSWRBdHRycygpXG4gICAgICB9LFxuICAgICAgc3R5bGU6IHsgekluZGV4OiB0aGlzLmFjdGl2ZVpJbmRleCB9LFxuICAgICAgcmVmOiAnY29udGVudCdcbiAgICB9LCBbXG4gICAgICB0aGlzLiRjcmVhdGVFbGVtZW50KFRoZW1lUHJvdmlkZXIsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICByb290OiB0cnVlLFxuICAgICAgICAgIGxpZ2h0OiB0aGlzLmxpZ2h0LFxuICAgICAgICAgIGRhcms6IHRoaXMuZGFya1xuICAgICAgICB9XG4gICAgICB9LCBbZGlhbG9nXSlcbiAgICBdKSlcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3YtZGlhbG9nX19jb250YWluZXInLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogKCF0aGlzLiRzbG90cy5hY3RpdmF0b3IgfHwgdGhpcy5mdWxsV2lkdGgpID8gJ2Jsb2NrJyA6ICdpbmxpbmUtYmxvY2snXG4gICAgICB9XG4gICAgfSwgY2hpbGRyZW4pXG4gIH1cbn1cbiJdfQ==