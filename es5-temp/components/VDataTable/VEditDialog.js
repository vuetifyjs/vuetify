import '../../stylus/components/_small-dialog.styl';
// Mixins
import Returnable from '../../mixins/returnable';
// Utils
import { keyCodes } from '../../util/helpers';
import VBtn from '../VBtn';
import VMenu from '../VMenu';
/* @vue/component */
export default {
    name: 'v-edit-dialog',
    mixins: [Returnable],
    props: {
        cancelText: {
            default: 'Cancel'
        },
        large: Boolean,
        lazy: Boolean,
        persistent: Boolean,
        saveText: {
            default: 'Save'
        },
        transition: {
            type: String,
            default: 'slide-x-reverse-transition'
        }
    },
    data() {
        return {
            isActive: false
        };
    },
    watch: {
        isActive(val) {
            if (val) {
                this.$emit('open');
                setTimeout(this.focus, 50); // Give DOM time to paint
            }
            else {
                this.$emit('close');
            }
        }
    },
    methods: {
        cancel() {
            this.isActive = false;
            this.$emit('cancel');
        },
        focus() {
            const input = this.$refs.content.querySelector('input');
            input && input.focus();
        },
        genButton(fn, text) {
            return this.$createElement(VBtn, {
                props: {
                    flat: true,
                    color: 'primary',
                    light: true
                },
                on: { click: fn }
            }, text);
        },
        genActions() {
            return this.$createElement('div', {
                'class': 'v-small-dialog__actions'
            }, [
                this.genButton(this.cancel, this.cancelText),
                this.genButton(() => {
                    this.save(this.returnValue);
                    this.$emit('save');
                }, this.saveText)
            ]);
        },
        genContent() {
            return this.$createElement('div', {
                on: {
                    keydown: e => {
                        const input = this.$refs.content.querySelector('input');
                        e.keyCode === keyCodes.esc && this.cancel();
                        if (e.keyCode === keyCodes.enter && input) {
                            this.save(input.value);
                            this.$emit('save');
                        }
                    }
                },
                ref: 'content'
            }, [this.$slots.input]);
        }
    },
    render(h) {
        return h(VMenu, {
            'class': 'v-small-dialog',
            props: {
                contentClass: 'v-small-dialog__content',
                transition: this.transition,
                origin: 'top right',
                right: true,
                value: this.isActive,
                closeOnClick: !this.persistent,
                closeOnContentClick: false,
                lazy: this.lazy
            },
            on: {
                input: val => (this.isActive = val)
            }
        }, [
            h('a', {
                slot: 'activator'
            }, this.$slots.default),
            this.genContent(),
            this.large ? this.genActions() : null
        ]);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkVkaXREaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WRGF0YVRhYmxlL1ZFZGl0RGlhbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sNENBQTRDLENBQUE7QUFFbkQsU0FBUztBQUNULE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBRWhELFFBQVE7QUFDUixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFN0MsT0FBTyxJQUFJLE1BQU0sU0FBUyxDQUFBO0FBQzFCLE9BQU8sS0FBSyxNQUFNLFVBQVUsQ0FBQTtBQUU1QixvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxlQUFlO0lBRXJCLE1BQU0sRUFBRSxDQUFFLFVBQVUsQ0FBRTtJQUV0QixLQUFLLEVBQUU7UUFDTCxVQUFVLEVBQUU7WUFDVixPQUFPLEVBQUUsUUFBUTtTQUNsQjtRQUNELEtBQUssRUFBRSxPQUFPO1FBQ2QsSUFBSSxFQUFFLE9BQU87UUFDYixVQUFVLEVBQUUsT0FBTztRQUNuQixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLDRCQUE0QjtTQUN0QztLQUNGO0lBRUQsSUFBSTtRQUNGLE9BQU87WUFDTCxRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFBO0lBQ0gsQ0FBQztJQUVELEtBQUssRUFBRTtRQUNMLFFBQVEsQ0FBRSxHQUFHO1lBQ1gsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDbEIsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQyx5QkFBeUI7YUFDckQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTthQUNw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QUcsRUFBRTtnQkFDTCxJQUFJLEVBQUUsV0FBVzthQUNsQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ3RDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc21hbGwtZGlhbG9nLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IFJldHVybmFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3JldHVybmFibGUnXG5cbi8vIFV0aWxzXG5pbXBvcnQgeyBrZXlDb2RlcyB9IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcblxuaW1wb3J0IFZCdG4gZnJvbSAnLi4vVkJ0bidcbmltcG9ydCBWTWVudSBmcm9tICcuLi9WTWVudSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtZWRpdC1kaWFsb2cnLFxuXG4gIG1peGluczogWyBSZXR1cm5hYmxlIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBjYW5jZWxUZXh0OiB7XG4gICAgICBkZWZhdWx0OiAnQ2FuY2VsJ1xuICAgIH0sXG4gICAgbGFyZ2U6IEJvb2xlYW4sXG4gICAgbGF6eTogQm9vbGVhbixcbiAgICBwZXJzaXN0ZW50OiBCb29sZWFuLFxuICAgIHNhdmVUZXh0OiB7XG4gICAgICBkZWZhdWx0OiAnU2F2ZSdcbiAgICB9LFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdzbGlkZS14LXJldmVyc2UtdHJhbnNpdGlvbidcbiAgICB9XG4gIH0sXG5cbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZlOiBmYWxzZVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGlzQWN0aXZlICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnb3BlbicpXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5mb2N1cywgNTApIC8vIEdpdmUgRE9NIHRpbWUgdG8gcGFpbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGNhbmNlbCAoKSB7XG4gICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoJ2NhbmNlbCcpXG4gICAgfSxcbiAgICBmb2N1cyAoKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMuJHJlZnMuY29udGVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG4gICAgICBpbnB1dCAmJiBpbnB1dC5mb2N1cygpXG4gICAgfSxcbiAgICBnZW5CdXR0b24gKGZuLCB0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWQnRuLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgICAgICBjb2xvcjogJ3ByaW1hcnknLFxuICAgICAgICAgIGxpZ2h0OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7IGNsaWNrOiBmbiB9XG4gICAgICB9LCB0ZXh0KVxuICAgIH0sXG4gICAgZ2VuQWN0aW9ucyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAnY2xhc3MnOiAndi1zbWFsbC1kaWFsb2dfX2FjdGlvbnMnXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuQnV0dG9uKHRoaXMuY2FuY2VsLCB0aGlzLmNhbmNlbFRleHQpLFxuICAgICAgICB0aGlzLmdlbkJ1dHRvbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zYXZlKHRoaXMucmV0dXJuVmFsdWUpXG4gICAgICAgICAgdGhpcy4kZW1pdCgnc2F2ZScpXG4gICAgICAgIH0sIHRoaXMuc2F2ZVRleHQpXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBvbjoge1xuICAgICAgICAgIGtleWRvd246IGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLiRyZWZzLmNvbnRlbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKVxuICAgICAgICAgICAgZS5rZXlDb2RlID09PSBrZXlDb2Rlcy5lc2MgJiYgdGhpcy5jYW5jZWwoKVxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0ga2V5Q29kZXMuZW50ZXIgJiYgaW5wdXQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zYXZlKGlucHV0LnZhbHVlKVxuICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdzYXZlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlZjogJ2NvbnRlbnQnXG4gICAgICB9LCBbdGhpcy4kc2xvdHMuaW5wdXRdKVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpIHtcbiAgICByZXR1cm4gaChWTWVudSwge1xuICAgICAgJ2NsYXNzJzogJ3Ytc21hbGwtZGlhbG9nJyxcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIGNvbnRlbnRDbGFzczogJ3Ytc21hbGwtZGlhbG9nX19jb250ZW50JyxcbiAgICAgICAgdHJhbnNpdGlvbjogdGhpcy50cmFuc2l0aW9uLFxuICAgICAgICBvcmlnaW46ICd0b3AgcmlnaHQnLFxuICAgICAgICByaWdodDogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHRoaXMuaXNBY3RpdmUsXG4gICAgICAgIGNsb3NlT25DbGljazogIXRoaXMucGVyc2lzdGVudCxcbiAgICAgICAgY2xvc2VPbkNvbnRlbnRDbGljazogZmFsc2UsXG4gICAgICAgIGxhenk6IHRoaXMubGF6eVxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGlucHV0OiB2YWwgPT4gKHRoaXMuaXNBY3RpdmUgPSB2YWwpXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgaCgnYScsIHtcbiAgICAgICAgc2xvdDogJ2FjdGl2YXRvcidcbiAgICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpLFxuICAgICAgdGhpcy5nZW5Db250ZW50KCksXG4gICAgICB0aGlzLmxhcmdlID8gdGhpcy5nZW5BY3Rpb25zKCkgOiBudWxsXG4gICAgXSlcbiAgfVxufVxuIl19