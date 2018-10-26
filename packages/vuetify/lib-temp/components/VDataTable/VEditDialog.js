import '../../stylus/components/_small-dialog.styl';
// Mixins
import Returnable from '../../mixins/returnable';
import Themeable from '../../mixins/themeable';
// Utils
import { keyCodes } from '../../util/helpers';
import VBtn from '../VBtn';
import VMenu from '../VMenu';
/* @vue/component */
export default {
    name: 'v-edit-dialog',
    mixins: [Returnable, Themeable],
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
            staticClass: 'v-small-dialog',
            class: this.themeClasses,
            props: {
                contentClass: 'v-small-dialog__content',
                transition: this.transition,
                origin: 'top right',
                right: true,
                value: this.isActive,
                closeOnClick: !this.persistent,
                closeOnContentClick: false,
                lazy: this.lazy,
                light: this.light,
                dark: this.dark
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkVkaXREaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WRGF0YVRhYmxlL1ZFZGl0RGlhbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sNENBQTRDLENBQUE7QUFFbkQsU0FBUztBQUNULE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBQ2hELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBRTlDLFFBQVE7QUFDUixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFN0MsT0FBTyxJQUFJLE1BQU0sU0FBUyxDQUFBO0FBQzFCLE9BQU8sS0FBSyxNQUFNLFVBQVUsQ0FBQTtBQUU1QixvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxlQUFlO0lBRXJCLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUM7SUFFL0IsS0FBSyxFQUFFO1FBQ0wsVUFBVSxFQUFFO1lBQ1YsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxLQUFLLEVBQUUsT0FBTztRQUNkLElBQUksRUFBRSxPQUFPO1FBQ2IsVUFBVSxFQUFFLE9BQU87UUFDbkIsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLE1BQU07U0FDaEI7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSw0QkFBNEI7U0FDdEM7S0FDRjtJQUVELElBQUk7UUFDRixPQUFPO1lBQ0wsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQTtJQUNILENBQUM7SUFFRCxLQUFLLEVBQUU7UUFDTCxRQUFRLENBQUUsR0FBRztZQUNYLElBQUksR0FBRyxFQUFFO2dCQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ2xCLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBLENBQUMseUJBQXlCO2FBQ3JEO2lCQUFNO2dC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SSxDQUFDLElBQUk7YUFDaEI7WUFDRCxFQUFFLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzthQUNwQztTQUNGLEVBQUU7WUFDRCxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUNMLElBQUksRUFBRSxXQUFXO2FBQ2xCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDdEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19zbWFsbC1kaWFsb2cuc3R5bCdcblxuLy8gTWl4aW5zXG5pbXBvcnQgUmV0dXJuYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvcmV0dXJuYWJsZSdcbmltcG9ydCBUaGVtZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RoZW1lYWJsZSdcblxuLy8gVXRpbHNcbmltcG9ydCB7IGtleUNvZGVzIH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG5pbXBvcnQgVkJ0biBmcm9tICcuLi9WQnRuJ1xuaW1wb3J0IFZNZW51IGZyb20gJy4uL1ZNZW51J1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1lZGl0LWRpYWxvZycsXG5cbiAgbWl4aW5zOiBbUmV0dXJuYWJsZSwgVGhlbWVhYmxlXSxcblxuICBwcm9wczoge1xuICAgIGNhbmNlbFRleHQ6IHtcbiAgICAgIGRlZmF1bHQ6ICdDYW5jZWwnXG4gICAgfSxcbiAgICBsYXJnZTogQm9vbGVhbixcbiAgICBsYXp5OiBCb29sZWFuLFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgc2F2ZVRleHQ6IHtcbiAgICAgIGRlZmF1bHQ6ICdTYXZlJ1xuICAgIH0sXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3NsaWRlLXgtcmV2ZXJzZS10cmFuc2l0aW9uJ1xuICAgIH1cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmU6IGZhbHNlXG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgaXNBY3RpdmUgKHZhbCkge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICB0aGlzLiRlbWl0KCdvcGVuJylcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLmZvY3VzLCA1MCkgLy8gR2l2ZSBET00gdGltZSB0byBwYWludFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgY2FuY2VsICgpIHtcbiAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgdGhpcy4kZW1pdCgnY2FuY2VsJylcbiAgICB9LFxuICAgIGZvY3VzICgpIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy4kcmVmcy5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcbiAgICAgIGlucHV0ICYmIGlucHV0LmZvY3VzKClcbiAgICB9LFxuICAgIGdlbkJ1dHRvbiAoZm4sIHRleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZCdG4sIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBmbGF0OiB0cnVlLFxuICAgICAgICAgIGNvbG9yOiAncHJpbWFyeScsXG4gICAgICAgICAgbGlnaHQ6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgb246IHsgY2xpY2s6IGZuIH1cbiAgICAgIH0sIHRleHQpXG4gICAgfSxcbiAgICBnZW5BY3Rpb25zICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICdjbGFzcyc6ICd2LXNtYWxsLWRpYWxvZ19fYWN0aW9ucydcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5CdXR0b24odGhpcy5jYW5jZWwsIHRoaXMuY2FuY2VsVGV4dCksXG4gICAgICAgIHRoaXMuZ2VuQnV0dG9uKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNhdmUodGhpcy5yZXR1cm5WYWx1ZSlcbiAgICAgICAgICB0aGlzLiRlbWl0KCdzYXZlJylcbiAgICAgICAgfSwgdGhpcy5zYXZlVGV4dClcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5Db250ZW50ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIG9uOiB7XG4gICAgICAgICAga2V5ZG93bjogZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuJHJlZnMuY29udGVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG4gICAgICAgICAgICBlLmtleUNvZGUgPT09IGtleUNvZGVzLmVzYyAmJiB0aGlzLmNhbmNlbCgpXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBrZXlDb2Rlcy5lbnRlciAmJiBpbnB1dCkge1xuICAgICAgICAgICAgICB0aGlzLnNhdmUoaW5wdXQudmFsdWUpXG4gICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3NhdmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVmOiAnY29udGVudCdcbiAgICAgIH0sIFt0aGlzLiRzbG90cy5pbnB1dF0pXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIHJldHVybiBoKFZNZW51LCB7XG4gICAgICBzdGF0aWNDbGFzczogJ3Ytc21hbGwtZGlhbG9nJyxcbiAgICAgIGNsYXNzOiB0aGlzLnRoZW1lQ2xhc3NlcyxcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIGNvbnRlbnRDbGFzczogJ3Ytc21hbGwtZGlhbG9nX19jb250ZW50JyxcbiAgICAgICAgdHJhbnNpdGlvbjogdGhpcy50cmFuc2l0aW9uLFxuICAgICAgICBvcmlnaW46ICd0b3AgcmlnaHQnLFxuICAgICAgICByaWdodDogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHRoaXMuaXNBY3RpdmUsXG4gICAgICAgIGNsb3NlT25DbGljazogIXRoaXMucGVyc2lzdGVudCxcbiAgICAgICAgY2xvc2VPbkNvbnRlbnRDbGljazogZmFsc2UsXG4gICAgICAgIGxhenk6IHRoaXMubGF6eSxcbiAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHQsXG4gICAgICAgIGRhcms6IHRoaXMuZGFya1xuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGlucHV0OiB2YWwgPT4gKHRoaXMuaXNBY3RpdmUgPSB2YWwpXG4gICAgICB9XG4gICAgfSwgW1xuICAgICAgaCgnYScsIHtcbiAgICAgICAgc2xvdDogJ2FjdGl2YXRvcidcbiAgICAgIH0sIHRoaXMuJHNsb3RzLmRlZmF1bHQpLFxuICAgICAgdGhpcy5nZW5Db250ZW50KCksXG4gICAgICB0aGlzLmxhcmdlID8gdGhpcy5nZW5BY3Rpb25zKCkgOiBudWxsXG4gICAgXSlcbiAgfVxufVxuIl19