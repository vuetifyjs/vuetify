// Styles
import '../../stylus/components/_inputs.styl';
// Components
import VIcon from '../VIcon';
import VLabel from '../VLabel';
import VMessages from '../VMessages';
// Mixins
import Colorable from '../../mixins/colorable';
import Loadable from '../../mixins/loadable';
import Themeable from '../../mixins/themeable';
import Validatable from '../../mixins/validatable';
// Utilities
import { convertToUnit, kebabCase } from '../../util/helpers';
import { deprecate } from '../../util/console';
/* @vue/component */
export default {
    name: 'v-input',
    mixins: [
        Colorable,
        Loadable,
        Themeable,
        Validatable
    ],
    props: {
        appendIcon: String,
        /** @deprecated */
        appendIconCb: Function,
        backgroundColor: {
            type: String,
            default: ''
        },
        disabled: Boolean,
        height: [Number, String],
        hideDetails: Boolean,
        hint: String,
        label: String,
        persistentHint: Boolean,
        prependIcon: String,
        /** @deprecated */
        prependIconCb: Function,
        readonly: Boolean,
        value: { required: false }
    },
    data: vm => ({
        lazyValue: vm.value,
        isFocused: false
    }),
    computed: {
        classesInput() {
            return {
                ...this.classes,
                'v-input--has-state': this.hasState,
                'v-input--hide-details': this.hideDetails,
                'v-input--is-label-active': this.isLabelActive,
                'v-input--is-dirty': this.isDirty,
                'v-input--is-disabled': this.disabled,
                'v-input--is-focused': this.isFocused,
                'v-input--is-loading': this.loading !== false,
                'v-input--is-readonly': this.readonly,
                ...this.addTextColorClassChecks({}, this.validationState),
                ...this.themeClasses
            };
        },
        directivesInput() {
            return [];
        },
        hasHint() {
            return !this.hasMessages &&
                this.hint &&
                (this.persistentHint || this.isFocused);
        },
        hasLabel() {
            return Boolean(this.$slots.label || this.label);
        },
        // Proxy for `lazyValue`
        // This allows an input
        // to function without
        // a provided model
        internalValue: {
            get() {
                return this.lazyValue;
            },
            set(val) {
                this.lazyValue = val;
                this.$emit(this.$_modelEvent, val);
            }
        },
        isDirty() {
            return !!this.lazyValue;
        },
        isDisabled() {
            return Boolean(this.disabled || this.readonly);
        },
        isLabelActive() {
            return this.isDirty;
        }
    },
    watch: {
        value(val) {
            this.lazyValue = val;
        }
    },
    beforeCreate() {
        // v-radio-group needs to emit a different event
        // https://github.com/vuetifyjs/vuetify/issues/4752
        this.$_modelEvent = (this.$options.model && this.$options.model.event) || 'input';
    },
    methods: {
        genContent() {
            return [
                this.genPrependSlot(),
                this.genControl(),
                this.genAppendSlot()
            ];
        },
        genControl() {
            return this.$createElement('div', {
                staticClass: 'v-input__control'
            }, [
                this.genInputSlot(),
                this.genMessages()
            ]);
        },
        genDefaultSlot() {
            return [
                this.genLabel(),
                this.$slots.default
            ];
        },
        // TODO: remove shouldDeprecate (2.0), used for clearIcon
        genIcon(type, cb, shouldDeprecate = true) {
            const icon = this[`${type}Icon`];
            const eventName = `click:${kebabCase(type)}`;
            cb = cb || this[`${type}IconCb`];
            if (shouldDeprecate && type && cb) {
                deprecate(`:${type}-icon-cb`, `@${eventName}`, this);
            }
            const data = {
                props: {
                    color: this.validationState,
                    dark: this.dark,
                    disabled: this.disabled,
                    light: this.light
                },
                on: !(this.$listeners[eventName] || cb)
                    ? null
                    : {
                        click: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.$emit(eventName, e);
                            cb && cb(e);
                        },
                        // Container has mouseup event that will
                        // trigger menu open if enclosed
                        mouseup: e => {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
            };
            return this.$createElement('div', {
                staticClass: `v-input__icon v-input__icon--${kebabCase(type)}`,
                key: `${type}${icon}`
            }, [
                this.$createElement(VIcon, data, icon)
            ]);
        },
        genInputSlot() {
            return this.$createElement('div', {
                staticClass: 'v-input__slot',
                class: this.addBackgroundColorClassChecks({}, this.backgroundColor),
                style: { height: convertToUnit(this.height) },
                directives: this.directivesInput,
                on: {
                    click: this.onClick,
                    mousedown: this.onMouseDown,
                    mouseup: this.onMouseUp
                },
                ref: 'input-slot'
            }, [
                this.genDefaultSlot(),
                this.genProgress()
            ]);
        },
        genLabel() {
            if (!this.hasLabel)
                return null;
            return this.$createElement(VLabel, {
                props: {
                    color: this.validationState,
                    dark: this.dark,
                    focused: this.hasState,
                    for: this.$attrs.id,
                    light: this.light
                }
            }, this.$slots.label || this.label);
        },
        genMessages() {
            if (this.hideDetails)
                return null;
            const messages = this.hasHint
                ? [this.hint]
                : this.validations;
            return this.$createElement(VMessages, {
                props: {
                    color: this.hasHint ? '' : this.validationState,
                    dark: this.dark,
                    light: this.light,
                    value: (this.hasMessages || this.hasHint) ? messages : []
                }
            });
        },
        genSlot(type, location, slot) {
            if (!slot.length)
                return null;
            const ref = `${type}-${location}`;
            return this.$createElement('div', {
                staticClass: `v-input__${ref}`,
                ref
            }, slot);
        },
        genPrependSlot() {
            const slot = [];
            if (this.$slots['prepend']) {
                slot.push(this.$slots['prepend']);
            }
            else if (this.prependIcon) {
                slot.push(this.genIcon('prepend'));
            }
            return this.genSlot('prepend', 'outer', slot);
        },
        genAppendSlot() {
            const slot = [];
            // Append icon for text field was really
            // an appended inner icon, v-text-field
            // will overwrite this method in order to obtain
            // backwards compat
            if (this.$slots['append']) {
                slot.push(this.$slots['append']);
            }
            else if (this.appendIcon) {
                slot.push(this.genIcon('append'));
            }
            return this.genSlot('append', 'outer', slot);
        },
        onClick(e) {
            this.$emit('click', e);
        },
        onMouseDown(e) {
            this.$emit('mousedown', e);
        },
        onMouseUp(e) {
            this.$emit('mouseup', e);
        }
    },
    render(h) {
        return h('div', {
            staticClass: 'v-input',
            attrs: this.attrsInput,
            'class': this.classesInput
        }, this.genContent());
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVklucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVklucHV0L1ZJbnB1dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBQzVCLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQTtBQUM5QixPQUFPLFNBQVMsTUFBTSxjQUFjLENBQUE7QUFFcEMsU0FBUztBQUNULE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFBO0FBQzVDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFBO0FBRWxELFlBQVk7QUFDWixPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVixNQUFNLG9CQUFvQixDQUFBO0FBQzNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU5QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxTQUFTO0lBRWYsTUFBTSxFQUFFO1FBQ04sU0FBUztRQUNULFFBQVE7UUFDUixTQUFTO1FBQ1QsV0FBVztLQUNaO0lBRUQsS0FBSyxFQUFFO1FBQ0wsVUFBVSxFQUFFLE1BQU07UUFDbEIsa0JBQWtCO1FBQ2xCLFlBQVksRUFBRSxRQUFRO1FBQ3RCLGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLEVBQUU7U0FDWjtRQUNELFFBQVEsRUFBRSxPQUFPO1FBQ2pCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEIsV0FBVyxFQUFFLE9BQU87UUFDcEIsSUFBSSxFQUFFLE1BQU07UUFDWixLQUFLLEVBQUUsTUFBTTtRQUNiLGNBQWMsRUFBRSxPQUFPO1FBQ3ZCLFdBQVcsRUFB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LElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7YUFDbEM7WUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM5QyxDQUFDO1FBQ0QsT0FBTyxDQUFFLENBQUM7WUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN4QixDQUFDO1FBQ0QsV0FBVyxDQUFFLENBQUM7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM1QixDQUFDO1FBQ0QsU0FBUyxDQUFFLENBQUM7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMxQixDQUFDO0tBQ0Y7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNkLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtZQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDM0IsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUN2QixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9faW5wdXRzLnN0eWwnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBWSWNvbiBmcm9tICcuLi9WSWNvbidcbmltcG9ydCBWTGFiZWwgZnJvbSAnLi4vVkxhYmVsJ1xuaW1wb3J0IFZNZXNzYWdlcyBmcm9tICcuLi9WTWVzc2FnZXMnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IExvYWRhYmxlIGZyb20gJy4uLy4uL21peGlucy9sb2FkYWJsZSdcbmltcG9ydCBUaGVtZWFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3RoZW1lYWJsZSdcbmltcG9ydCBWYWxpZGF0YWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdmFsaWRhdGFibGUnXG5cbi8vIFV0aWxpdGllc1xuaW1wb3J0IHtcbiAgY29udmVydFRvVW5pdCxcbiAga2ViYWJDYXNlXG59IGZyb20gJy4uLy4uL3V0aWwvaGVscGVycydcbmltcG9ydCB7IGRlcHJlY2F0ZSB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3YtaW5wdXQnLFxuXG4gIG1peGluczogW1xuICAgIENvbG9yYWJsZSxcbiAgICBMb2FkYWJsZSxcbiAgICBUaGVtZWFibGUsXG4gICAgVmFsaWRhdGFibGVcbiAgXSxcblxuICBwcm9wczoge1xuICAgIGFwcGVuZEljb246IFN0cmluZyxcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICBhcHBlbmRJY29uQ2I6IEZ1bmN0aW9uLFxuICAgIGJhY2tncm91bmRDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJydcbiAgICB9LFxuICAgIGRpc2FibGVkOiBCb29sZWFuLFxuICAgIGhlaWdodDogW051bWJlciwgU3RyaW5nXSxcbiAgICBoaWRlRGV0YWlsczogQm9vbGVhbixcbiAgICBoaW50OiBTdHJpbmcsXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBwZXJzaXN0ZW50SGludDogQm9vbGVhbixcbiAgICBwcmVwZW5kSWNvbjogU3RyaW5nLFxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIHByZXBlbmRJY29uQ2I6IEZ1bmN0aW9uLFxuICAgIHJlYWRvbmx5OiBCb29sZWFuLFxuICAgIHZhbHVlOiB7IHJlcXVpcmVkOiBmYWxzZSB9XG4gIH0sXG5cbiAgZGF0YTogdm0gPT4gKHtcbiAgICBsYXp5VmFsdWU6IHZtLnZhbHVlLFxuICAgIGlzRm9jdXNlZDogZmFsc2VcbiAgfSksXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzSW5wdXQgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4udGhpcy5jbGFzc2VzLFxuICAgICAgICAndi1pbnB1dC0taGFzLXN0YXRlJzogdGhpcy5oYXNTdGF0ZSxcbiAgICAgICAgJ3YtaW5wdXQtLWhpZGUtZGV0YWlscyc6IHRoaXMuaGlkZURldGFpbHMsXG4gICAgICAgICd2LWlucHV0LS1pcy1sYWJlbC1hY3RpdmUnOiB0aGlzLmlzTGFiZWxBY3RpdmUsXG4gICAgICAgICd2LWlucHV0LS1pcy1kaXJ0eSc6IHRoaXMuaXNEaXJ0eSxcbiAgICAgICAgJ3YtaW5wdXQtLWlzLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZCxcbiAgICAgICAgJ3YtaW5wdXQtLWlzLWZvY3VzZWQnOiB0aGlzLmlzRm9jdXNlZCxcbiAgICAgICAgJ3YtaW5wdXQtLWlzLWxvYWRpbmcnOiB0aGlzLmxvYWRpbmcgIT09IGZhbHNlLFxuICAgICAgICAndi1pbnB1dC0taXMtcmVhZG9ubHknOiB0aGlzLnJlYWRvbmx5LFxuICAgICAgICAuLi50aGlzLmFkZFRleHRDb2xvckNsYXNzQ2hlY2tzKHt9LCB0aGlzLnZhbGlkYXRpb25TdGF0ZSksXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9XG4gICAgfSxcbiAgICBkaXJlY3RpdmVzSW5wdXQgKCkge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfSxcbiAgICBoYXNIaW50ICgpIHtcbiAgICAgIHJldHVybiAhdGhpcy5oYXNNZXNzYWdlcyAmJlxuICAgICAgICB0aGlzLmhpbnQgJiZcbiAgICAgICAgKHRoaXMucGVyc2lzdGVudEhpbnQgfHwgdGhpcy5pc0ZvY3VzZWQpXG4gICAgfSxcbiAgICBoYXNMYWJlbCAoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLiRzbG90cy5sYWJlbCB8fCB0aGlzLmxhYmVsKVxuICAgIH0sXG4gICAgLy8gUHJveHkgZm9yIGBsYXp5VmFsdWVgXG4gICAgLy8gVGhpcyBhbGxvd3MgYW4gaW5wdXRcbiAgICAvLyB0byBmdW5jdGlvbiB3aXRob3V0XG4gICAgLy8gYSBwcm92aWRlZCBtb2RlbFxuICAgIGludGVybmFsVmFsdWU6IHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhenlWYWx1ZVxuICAgICAgfSxcbiAgICAgIHNldCAodmFsKSB7XG4gICAgICAgIHRoaXMubGF6eVZhbHVlID0gdmFsXG4gICAgICAgIHRoaXMuJGVtaXQodGhpcy4kX21vZGVsRXZlbnQsIHZhbClcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzRGlydHkgKCkge1xuICAgICAgcmV0dXJuICEhdGhpcy5sYXp5VmFsdWVcbiAgICB9LFxuICAgIGlzRGlzYWJsZWQgKCkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KVxuICAgIH0sXG4gICAgaXNMYWJlbEFjdGl2ZSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc0RpcnR5XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgdmFsdWUgKHZhbCkge1xuICAgICAgdGhpcy5sYXp5VmFsdWUgPSB2YWxcbiAgICB9XG4gIH0sXG5cbiAgYmVmb3JlQ3JlYXRlICgpIHtcbiAgICAvLyB2LXJhZGlvLWdyb3VwIG5lZWRzIHRvIGVtaXQgYSBkaWZmZXJlbnQgZXZlbnRcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdnVldGlmeWpzL3Z1ZXRpZnkvaXNzdWVzLzQ3NTJcbiAgICB0aGlzLiRfbW9kZWxFdmVudCA9ICh0aGlzLiRvcHRpb25zLm1vZGVsICYmIHRoaXMuJG9wdGlvbnMubW9kZWwuZXZlbnQpIHx8ICdpbnB1dCdcbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuQ29udGVudCAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB0aGlzLmdlblByZXBlbmRTbG90KCksXG4gICAgICAgIHRoaXMuZ2VuQ29udHJvbCgpLFxuICAgICAgICB0aGlzLmdlbkFwcGVuZFNsb3QoKVxuICAgICAgXVxuICAgIH0sXG4gICAgZ2VuQ29udHJvbCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtaW5wdXRfX2NvbnRyb2wnXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuSW5wdXRTbG90KCksXG4gICAgICAgIHRoaXMuZ2VuTWVzc2FnZXMoKVxuICAgICAgXSlcbiAgICB9LFxuICAgIGdlbkRlZmF1bHRTbG90ICgpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuZ2VuTGFiZWwoKSxcbiAgICAgICAgdGhpcy4kc2xvdHMuZGVmYXVsdFxuICAgICAgXVxuICAgIH0sXG4gICAgLy8gVE9ETzogcmVtb3ZlIHNob3VsZERlcHJlY2F0ZSAoMi4wKSwgdXNlZCBmb3IgY2xlYXJJY29uXG4gICAgZ2VuSWNvbiAodHlwZSwgY2IsIHNob3VsZERlcHJlY2F0ZSA9IHRydWUpIHtcbiAgICAgIGNvbnN0IGljb24gPSB0aGlzW2Ake3R5cGV9SWNvbmBdXG4gICAgICBjb25zdCBldmVudE5hbWUgPSBgY2xpY2s6JHtrZWJhYkNhc2UodHlwZSl9YFxuICAgICAgY2IgPSBjYiB8fCB0aGlzW2Ake3R5cGV9SWNvbkNiYF1cblxuICAgICAgaWYgKHNob3VsZERlcHJlY2F0ZSAmJiB0eXBlICYmIGNiKSB7XG4gICAgICAgIGRlcHJlY2F0ZShgOiR7dHlwZX0taWNvbi1jYmAsIGBAJHtldmVudE5hbWV9YCwgdGhpcylcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xvcjogdGhpcy52YWxpZGF0aW9uU3RhdGUsXG4gICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxuICAgICAgICAgIGxpZ2h0OiB0aGlzLmxpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIG9uOiAhKHRoaXMuJGxpc3RlbmVyc1tldmVudE5hbWVdIHx8IGNiKVxuICAgICAgICAgID8gbnVsbFxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgY2xpY2s6IGUgPT4ge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgICAgIHRoaXMuJGVtaXQoZXZlbnROYW1lLCBlKVxuICAgICAgICAgICAgICBjYiAmJiBjYihlKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIENvbnRhaW5lciBoYXMgbW91c2V1cCBldmVudCB0aGF0IHdpbGxcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgbWVudSBvcGVuIGlmIGVuY2xvc2VkXG4gICAgICAgICAgICBtb3VzZXVwOiBlID0+IHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBgdi1pbnB1dF9faWNvbiB2LWlucHV0X19pY29uLS0ke2tlYmFiQ2FzZSh0eXBlKX1gLFxuICAgICAgICBrZXk6IGAke3R5cGV9JHtpY29ufWBcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBWSWNvbixcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGljb25cbiAgICAgICAgKVxuICAgICAgXSlcbiAgICB9LFxuICAgIGdlbklucHV0U2xvdCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtaW5wdXRfX3Nsb3QnLFxuICAgICAgICBjbGFzczogdGhpcy5hZGRCYWNrZ3JvdW5kQ29sb3JDbGFzc0NoZWNrcyh7fSwgdGhpcy5iYWNrZ3JvdW5kQ29sb3IpLFxuICAgICAgICBzdHlsZTogeyBoZWlnaHQ6IGNvbnZlcnRUb1VuaXQodGhpcy5oZWlnaHQpIH0sXG4gICAgICAgIGRpcmVjdGl2ZXM6IHRoaXMuZGlyZWN0aXZlc0lucHV0LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGNsaWNrOiB0aGlzLm9uQ2xpY2ssXG4gICAgICAgICAgbW91c2Vkb3duOiB0aGlzLm9uTW91c2VEb3duLFxuICAgICAgICAgIG1vdXNldXA6IHRoaXMub25Nb3VzZVVwXG4gICAgICAgIH0sXG4gICAgICAgIHJlZjogJ2lucHV0LXNsb3QnXG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuZ2VuRGVmYXVsdFNsb3QoKSxcbiAgICAgICAgdGhpcy5nZW5Qcm9ncmVzcygpXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuTGFiZWwgKCkge1xuICAgICAgaWYgKCF0aGlzLmhhc0xhYmVsKSByZXR1cm4gbnVsbFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWTGFiZWwsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xvcjogdGhpcy52YWxpZGF0aW9uU3RhdGUsXG4gICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgIGZvY3VzZWQ6IHRoaXMuaGFzU3RhdGUsXG4gICAgICAgICAgZm9yOiB0aGlzLiRhdHRycy5pZCxcbiAgICAgICAgICBsaWdodDogdGhpcy5saWdodFxuICAgICAgICB9XG4gICAgICB9LCB0aGlzLiRzbG90cy5sYWJlbCB8fCB0aGlzLmxhYmVsKVxuICAgIH0sXG4gICAgZ2VuTWVzc2FnZXMgKCkge1xuICAgICAgaWYgKHRoaXMuaGlkZURldGFpbHMpIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5oYXNIaW50XG4gICAgICAgID8gW3RoaXMuaGludF1cbiAgICAgICAgOiB0aGlzLnZhbGlkYXRpb25zXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZNZXNzYWdlcywge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbG9yOiB0aGlzLmhhc0hpbnQgPyAnJyA6IHRoaXMudmFsaWRhdGlvblN0YXRlLFxuICAgICAgICAgIGRhcms6IHRoaXMuZGFyayxcbiAgICAgICAgICBsaWdodDogdGhpcy5saWdodCxcbiAgICAgICAgICB2YWx1ZTogKHRoaXMuaGFzTWVzc2FnZXMgfHwgdGhpcy5oYXNIaW50KSA/IG1lc3NhZ2VzIDogW11cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdlblNsb3QgKHR5cGUsIGxvY2F0aW9uLCBzbG90KSB7XG4gICAgICBpZiAoIXNsb3QubGVuZ3RoKSByZXR1cm4gbnVsbFxuXG4gICAgICBjb25zdCByZWYgPSBgJHt0eXBlfS0ke2xvY2F0aW9ufWBcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IGB2LWlucHV0X18ke3JlZn1gLFxuICAgICAgICByZWZcbiAgICAgIH0sIHNsb3QpXG4gICAgfSxcbiAgICBnZW5QcmVwZW5kU2xvdCAoKSB7XG4gICAgICBjb25zdCBzbG90ID0gW11cblxuICAgICAgaWYgKHRoaXMuJHNsb3RzWydwcmVwZW5kJ10pIHtcbiAgICAgICAgc2xvdC5wdXNoKHRoaXMuJHNsb3RzWydwcmVwZW5kJ10pXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJlcGVuZEljb24pIHtcbiAgICAgICAgc2xvdC5wdXNoKHRoaXMuZ2VuSWNvbigncHJlcGVuZCcpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZW5TbG90KCdwcmVwZW5kJywgJ291dGVyJywgc2xvdClcbiAgICB9LFxuICAgIGdlbkFwcGVuZFNsb3QgKCkge1xuICAgICAgY29uc3Qgc2xvdCA9IFtdXG5cbiAgICAgIC8vIEFwcGVuZCBpY29uIGZvciB0ZXh0IGZpZWxkIHdhcyByZWFsbHlcbiAgICAgIC8vIGFuIGFwcGVuZGVkIGlubmVyIGljb24sIHYtdGV4dC1maWVsZFxuICAgICAgLy8gd2lsbCBvdmVyd3JpdGUgdGhpcyBtZXRob2QgaW4gb3JkZXIgdG8gb2J0YWluXG4gICAgICAvLyBiYWNrd2FyZHMgY29tcGF0XG4gICAgICBpZiAodGhpcy4kc2xvdHNbJ2FwcGVuZCddKSB7XG4gICAgICAgIHNsb3QucHVzaCh0aGlzLiRzbG90c1snYXBwZW5kJ10pXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXBwZW5kSWNvbikge1xuICAgICAgICBzbG90LnB1c2godGhpcy5nZW5JY29uKCdhcHBlbmQnKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuZ2VuU2xvdCgnYXBwZW5kJywgJ291dGVyJywgc2xvdClcbiAgICB9LFxuICAgIG9uQ2xpY2sgKGUpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgZSlcbiAgICB9LFxuICAgIG9uTW91c2VEb3duIChlKSB7XG4gICAgICB0aGlzLiRlbWl0KCdtb3VzZWRvd24nLCBlKVxuICAgIH0sXG4gICAgb25Nb3VzZVVwIChlKSB7XG4gICAgICB0aGlzLiRlbWl0KCdtb3VzZXVwJywgZSlcbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKSB7XG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIHN0YXRpY0NsYXNzOiAndi1pbnB1dCcsXG4gICAgICBhdHRyczogdGhpcy5hdHRyc0lucHV0LFxuICAgICAgJ2NsYXNzJzogdGhpcy5jbGFzc2VzSW5wdXRcbiAgICB9LCB0aGlzLmdlbkNvbnRlbnQoKSlcbiAgfVxufVxuIl19