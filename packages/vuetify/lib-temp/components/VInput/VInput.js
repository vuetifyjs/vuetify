// Styles
import '../../stylus/components/_inputs.styl';
// Components
import VIcon from '../VIcon';
import VLabel from '../VLabel';
import VMessages from '../VMessages';
// Mixins
import Colorable from '../../mixins/colorable';
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
        hasMouseDown: false,
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
                'v-input--is-loading': this.loading !== false && this.loading !== undefined,
                'v-input--is-readonly': this.readonly,
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
            return this.$createElement('div', this.setBackgroundColor(this.backgroundColor, {
                staticClass: 'v-input__slot',
                style: { height: convertToUnit(this.height) },
                directives: this.directivesInput,
                on: {
                    click: this.onClick,
                    mousedown: this.onMouseDown,
                    mouseup: this.onMouseUp
                },
                ref: 'input-slot'
            }), [this.genDefaultSlot()]);
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
            this.hasMouseDown = true;
            this.$emit('mousedown', e);
        },
        onMouseUp(e) {
            this.hasMouseDown = false;
            this.$emit('mouseup', e);
        }
    },
    render(h) {
        return h('div', this.setTextColor(this.validationState, {
            staticClass: 'v-input',
            attrs: this.attrsInput,
            'class': this.classesInput
        }), this.genContent());
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVklucHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVklucHV0L1ZJbnB1dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyxzQ0FBc0MsQ0FBQTtBQUU3QyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sVUFBVSxDQUFBO0FBQzVCLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQTtBQUM5QixPQUFPLFNBQVMsTUFBTSxjQUFjLENBQUE7QUFFcEMsU0FBUztBQUNULE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFBO0FBQzlDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFBO0FBRWxELFlBQVk7QUFDWixPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVixNQUFNLG9CQUFvQixDQUFBO0FBQzNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU5QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxTQUFTO0lBRWYsTUFBTSxFQUFFO1FBQ04sU0FBUztRQUNULFNBQVM7UUFDVCxXQUFXO0tBQ1o7SUFFRCxLQUFLLEVBQUU7UUFDTCxVQUFVLEVBQUUsTUFBTTtRQUNsQixrQkFBa0I7UUFDbEIsWUFBWSxFQUFFLFFBQVE7UUFDdEIsZUFBZSxFQUFFO1lBQ2YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0QsUUFBUSxFQUFFLE9BQU87UUFDakIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4QixXQUFXLEVBQUUsT0FBTztRQUNwQixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxNQUFNO1FBQ2IsY0FBYyxFQUFFLE9BQU87UUFDdkIsV0FBVyxFQUFFLE1BQU07UUFDbkIsa0JBQWtCO1FBQ2xCLGFBQWEsRUFBRSxRQUFRO1FB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QU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzlDLENBQUM7UUFDRCxPQUFPLENBQUUsQ0FBQztZQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3hCLENBQUM7UUFDRCxXQUFXLENBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzVCLENBQUM7UUFDRCxTQUFTLENBQUUsQ0FBQztZQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzFCLENBQUM7S0FDRjtJQUVELE1BQU0sQ0FBRSxDQUFDO1FBQ1AsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0RCxXQUFXLEVBQUUsU0FBUztZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDdEIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQzNCLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUN4QixDQUFDO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9faW5wdXRzLnN0eWwnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCBWSWNvbiBmcm9tICcuLi9WSWNvbidcbmltcG9ydCBWTGFiZWwgZnJvbSAnLi4vVkxhYmVsJ1xuaW1wb3J0IFZNZXNzYWdlcyBmcm9tICcuLi9WTWVzc2FnZXMnXG5cbi8vIE1peGluc1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuaW1wb3J0IFZhbGlkYXRhYmxlIGZyb20gJy4uLy4uL21peGlucy92YWxpZGF0YWJsZSdcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQge1xuICBjb252ZXJ0VG9Vbml0LFxuICBrZWJhYkNhc2Vcbn0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuaW1wb3J0IHsgZGVwcmVjYXRlIH0gZnJvbSAnLi4vLi4vdXRpbC9jb25zb2xlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1pbnB1dCcsXG5cbiAgbWl4aW5zOiBbXG4gICAgQ29sb3JhYmxlLFxuICAgIFRoZW1lYWJsZSxcbiAgICBWYWxpZGF0YWJsZVxuICBdLFxuXG4gIHByb3BzOiB7XG4gICAgYXBwZW5kSWNvbjogU3RyaW5nLFxuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIGFwcGVuZEljb25DYjogRnVuY3Rpb24sXG4gICAgYmFja2dyb3VuZENvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH0sXG4gICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG4gICAgaGVpZ2h0OiBbTnVtYmVyLCBTdHJpbmddLFxuICAgIGhpZGVEZXRhaWxzOiBCb29sZWFuLFxuICAgIGhpbnQ6IFN0cmluZyxcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIHBlcnNpc3RlbnRIaW50OiBCb29sZWFuLFxuICAgIHByZXBlbmRJY29uOiBTdHJpbmcsXG4gICAgLyoqIEBkZXByZWNhdGVkICovXG4gICAgcHJlcGVuZEljb25DYjogRnVuY3Rpb24sXG4gICAgcmVhZG9ubHk6IEJvb2xlYW4sXG4gICAgdmFsdWU6IHsgcmVxdWlyZWQ6IGZhbHNlIH1cbiAgfSxcblxuICBkYXRhOiB2bSA9PiAoe1xuICAgIGxhenlWYWx1ZTogdm0udmFsdWUsXG4gICAgaGFzTW91c2VEb3duOiBmYWxzZSxcbiAgICBpc0ZvY3VzZWQ6IGZhbHNlXG4gIH0pLFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY2xhc3Nlc0lucHV0ICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnRoaXMuY2xhc3NlcyxcbiAgICAgICAgJ3YtaW5wdXQtLWhhcy1zdGF0ZSc6IHRoaXMuaGFzU3RhdGUsXG4gICAgICAgICd2LWlucHV0LS1oaWRlLWRldGFpbHMnOiB0aGlzLmhpZGVEZXRhaWxzLFxuICAgICAgICAndi1pbnB1dC0taXMtbGFiZWwtYWN0aXZlJzogdGhpcy5pc0xhYmVsQWN0aXZlLFxuICAgICAgICAndi1pbnB1dC0taXMtZGlydHknOiB0aGlzLmlzRGlydHksXG4gICAgICAgICd2LWlucHV0LS1pcy1kaXNhYmxlZCc6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICd2LWlucHV0LS1pcy1mb2N1c2VkJzogdGhpcy5pc0ZvY3VzZWQsXG4gICAgICAgICd2LWlucHV0LS1pcy1sb2FkaW5nJzogdGhpcy5sb2FkaW5nICE9PSBmYWxzZSAmJiB0aGlzLmxvYWRpbmcgIT09IHVuZGVmaW5lZCxcbiAgICAgICAgJ3YtaW5wdXQtLWlzLXJlYWRvbmx5JzogdGhpcy5yZWFkb25seSxcbiAgICAgICAgLi4udGhpcy50aGVtZUNsYXNzZXNcbiAgICAgIH1cbiAgICB9LFxuICAgIGRpcmVjdGl2ZXNJbnB1dCAoKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9LFxuICAgIGhhc0hpbnQgKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmhhc01lc3NhZ2VzICYmXG4gICAgICAgIHRoaXMuaGludCAmJlxuICAgICAgICAodGhpcy5wZXJzaXN0ZW50SGludCB8fCB0aGlzLmlzRm9jdXNlZClcbiAgICB9LFxuICAgIGhhc0xhYmVsICgpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuJHNsb3RzLmxhYmVsIHx8IHRoaXMubGFiZWwpXG4gICAgfSxcbiAgICAvLyBQcm94eSBmb3IgYGxhenlWYWx1ZWBcbiAgICAvLyBUaGlzIGFsbG93cyBhbiBpbnB1dFxuICAgIC8vIHRvIGZ1bmN0aW9uIHdpdGhvdXRcbiAgICAvLyBhIHByb3ZpZGVkIG1vZGVsXG4gICAgaW50ZXJuYWxWYWx1ZToge1xuICAgICAgZ2V0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF6eVZhbHVlXG4gICAgICB9LFxuICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSB2YWxcbiAgICAgICAgdGhpcy4kZW1pdCh0aGlzLiRfbW9kZWxFdmVudCwgdmFsKVxuICAgICAgfVxuICAgIH0sXG4gICAgaXNEaXJ0eSAoKSB7XG4gICAgICByZXR1cm4gISF0aGlzLmxhenlWYWx1ZVxuICAgIH0sXG4gICAgaXNEaXNhYmxlZCAoKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpXG4gICAgfSxcbiAgICBpc0xhYmVsQWN0aXZlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzRGlydHlcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICB2YWx1ZSAodmFsKSB7XG4gICAgICB0aGlzLmxhenlWYWx1ZSA9IHZhbFxuICAgIH1cbiAgfSxcblxuICBiZWZvcmVDcmVhdGUgKCkge1xuICAgIC8vIHYtcmFkaW8tZ3JvdXAgbmVlZHMgdG8gZW1pdCBhIGRpZmZlcmVudCBldmVudFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92dWV0aWZ5anMvdnVldGlmeS9pc3N1ZXMvNDc1MlxuICAgIHRoaXMuJF9tb2RlbEV2ZW50ID0gKHRoaXMuJG9wdGlvbnMubW9kZWwgJiYgdGhpcy4kb3B0aW9ucy5tb2RlbC5ldmVudCkgfHwgJ2lucHV0J1xuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5Db250ZW50ICgpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuZ2VuUHJlcGVuZFNsb3QoKSxcbiAgICAgICAgdGhpcy5nZW5Db250cm9sKCksXG4gICAgICAgIHRoaXMuZ2VuQXBwZW5kU2xvdCgpXG4gICAgICBdXG4gICAgfSxcbiAgICBnZW5Db250cm9sICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1pbnB1dF9fY29udHJvbCdcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5JbnB1dFNsb3QoKSxcbiAgICAgICAgdGhpcy5nZW5NZXNzYWdlcygpXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuRGVmYXVsdFNsb3QgKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdGhpcy5nZW5MYWJlbCgpLFxuICAgICAgICB0aGlzLiRzbG90cy5kZWZhdWx0XG4gICAgICBdXG4gICAgfSxcbiAgICAvLyBUT0RPOiByZW1vdmUgc2hvdWxkRGVwcmVjYXRlICgyLjApLCB1c2VkIGZvciBjbGVhckljb25cbiAgICBnZW5JY29uICh0eXBlLCBjYiwgc2hvdWxkRGVwcmVjYXRlID0gdHJ1ZSkge1xuICAgICAgY29uc3QgaWNvbiA9IHRoaXNbYCR7dHlwZX1JY29uYF1cbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGBjbGljazoke2tlYmFiQ2FzZSh0eXBlKX1gXG4gICAgICBjYiA9IGNiIHx8IHRoaXNbYCR7dHlwZX1JY29uQ2JgXVxuXG4gICAgICBpZiAoc2hvdWxkRGVwcmVjYXRlICYmIHR5cGUgJiYgY2IpIHtcbiAgICAgICAgZGVwcmVjYXRlKGA6JHt0eXBlfS1pY29uLWNiYCwgYEAke2V2ZW50TmFtZX1gLCB0aGlzKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbG9yOiB0aGlzLnZhbGlkYXRpb25TdGF0ZSxcbiAgICAgICAgICBkYXJrOiB0aGlzLmRhcmssXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgb246ICEodGhpcy4kbGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgY2IpXG4gICAgICAgICAgPyBudWxsXG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICBjbGljazogZSA9PiB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICAgICAgdGhpcy4kZW1pdChldmVudE5hbWUsIGUpXG4gICAgICAgICAgICAgIGNiICYmIGNiKGUpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQ29udGFpbmVyIGhhcyBtb3VzZXVwIGV2ZW50IHRoYXQgd2lsbFxuICAgICAgICAgICAgLy8gdHJpZ2dlciBtZW51IG9wZW4gaWYgZW5jbG9zZWRcbiAgICAgICAgICAgIG1vdXNldXA6IGUgPT4ge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IGB2LWlucHV0X19pY29uIHYtaW5wdXRfX2ljb24tLSR7a2ViYWJDYXNlKHR5cGUpfWAsXG4gICAgICAgIGtleTogYCR7dHlwZX0ke2ljb259YFxuICAgICAgfSwgW1xuICAgICAgICB0aGlzLiRjcmVhdGVFbGVtZW50KFxuICAgICAgICAgIFZJY29uLFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgaWNvblxuICAgICAgICApXG4gICAgICBdKVxuICAgIH0sXG4gICAgZ2VuSW5wdXRTbG90ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB0aGlzLnNldEJhY2tncm91bmRDb2xvcih0aGlzLmJhY2tncm91bmRDb2xvciwge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtaW5wdXRfX3Nsb3QnLFxuICAgICAgICBzdHlsZTogeyBoZWlnaHQ6IGNvbnZlcnRUb1VuaXQodGhpcy5oZWlnaHQpIH0sXG4gICAgICAgIGRpcmVjdGl2ZXM6IHRoaXMuZGlyZWN0aXZlc0lucHV0LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGNsaWNrOiB0aGlzLm9uQ2xpY2ssXG4gICAgICAgICAgbW91c2Vkb3duOiB0aGlzLm9uTW91c2VEb3duLFxuICAgICAgICAgIG1vdXNldXA6IHRoaXMub25Nb3VzZVVwXG4gICAgICAgIH0sXG4gICAgICAgIHJlZjogJ2lucHV0LXNsb3QnXG4gICAgICB9KSwgW3RoaXMuZ2VuRGVmYXVsdFNsb3QoKV0pXG4gICAgfSxcbiAgICBnZW5MYWJlbCAoKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzTGFiZWwpIHJldHVybiBudWxsXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZMYWJlbCwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNvbG9yOiB0aGlzLnZhbGlkYXRpb25TdGF0ZSxcbiAgICAgICAgICBkYXJrOiB0aGlzLmRhcmssXG4gICAgICAgICAgZm9jdXNlZDogdGhpcy5oYXNTdGF0ZSxcbiAgICAgICAgICBmb3I6IHRoaXMuJGF0dHJzLmlkLFxuICAgICAgICAgIGxpZ2h0OiB0aGlzLmxpZ2h0XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMuJHNsb3RzLmxhYmVsIHx8IHRoaXMubGFiZWwpXG4gICAgfSxcbiAgICBnZW5NZXNzYWdlcyAoKSB7XG4gICAgICBpZiAodGhpcy5oaWRlRGV0YWlscykgcmV0dXJuIG51bGxcblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSB0aGlzLmhhc0hpbnRcbiAgICAgICAgPyBbdGhpcy5oaW50XVxuICAgICAgICA6IHRoaXMudmFsaWRhdGlvbnNcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVk1lc3NhZ2VzLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29sb3I6IHRoaXMuaGFzSGludCA/ICcnIDogdGhpcy52YWxpZGF0aW9uU3RhdGUsXG4gICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgIGxpZ2h0OiB0aGlzLmxpZ2h0LFxuICAgICAgICAgIHZhbHVlOiAodGhpcy5oYXNNZXNzYWdlcyB8fCB0aGlzLmhhc0hpbnQpID8gbWVzc2FnZXMgOiBbXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2VuU2xvdCAodHlwZSwgbG9jYXRpb24sIHNsb3QpIHtcbiAgICAgIGlmICghc2xvdC5sZW5ndGgpIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IHJlZiA9IGAke3R5cGV9LSR7bG9jYXRpb259YFxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogYHYtaW5wdXRfXyR7cmVmfWAsXG4gICAgICAgIHJlZlxuICAgICAgfSwgc2xvdClcbiAgICB9LFxuICAgIGdlblByZXBlbmRTbG90ICgpIHtcbiAgICAgIGNvbnN0IHNsb3QgPSBbXVxuXG4gICAgICBpZiAodGhpcy4kc2xvdHNbJ3ByZXBlbmQnXSkge1xuICAgICAgICBzbG90LnB1c2godGhpcy4kc2xvdHNbJ3ByZXBlbmQnXSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmVwZW5kSWNvbikge1xuICAgICAgICBzbG90LnB1c2godGhpcy5nZW5JY29uKCdwcmVwZW5kJykpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdlblNsb3QoJ3ByZXBlbmQnLCAnb3V0ZXInLCBzbG90KVxuICAgIH0sXG4gICAgZ2VuQXBwZW5kU2xvdCAoKSB7XG4gICAgICBjb25zdCBzbG90ID0gW11cblxuICAgICAgLy8gQXBwZW5kIGljb24gZm9yIHRleHQgZmllbGQgd2FzIHJlYWxseVxuICAgICAgLy8gYW4gYXBwZW5kZWQgaW5uZXIgaWNvbiwgdi10ZXh0LWZpZWxkXG4gICAgICAvLyB3aWxsIG92ZXJ3cml0ZSB0aGlzIG1ldGhvZCBpbiBvcmRlciB0byBvYnRhaW5cbiAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXRcbiAgICAgIGlmICh0aGlzLiRzbG90c1snYXBwZW5kJ10pIHtcbiAgICAgICAgc2xvdC5wdXNoKHRoaXMuJHNsb3RzWydhcHBlbmQnXSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcHBlbmRJY29uKSB7XG4gICAgICAgIHNsb3QucHVzaCh0aGlzLmdlbkljb24oJ2FwcGVuZCcpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5nZW5TbG90KCdhcHBlbmQnLCAnb3V0ZXInLCBzbG90KVxuICAgIH0sXG4gICAgb25DbGljayAoZSkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBlKVxuICAgIH0sXG4gICAgb25Nb3VzZURvd24gKGUpIHtcbiAgICAgIHRoaXMuaGFzTW91c2VEb3duID0gdHJ1ZVxuICAgICAgdGhpcy4kZW1pdCgnbW91c2Vkb3duJywgZSlcbiAgICB9LFxuICAgIG9uTW91c2VVcCAoZSkge1xuICAgICAgdGhpcy5oYXNNb3VzZURvd24gPSBmYWxzZVxuICAgICAgdGhpcy4kZW1pdCgnbW91c2V1cCcsIGUpXG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCkge1xuICAgIHJldHVybiBoKCdkaXYnLCB0aGlzLnNldFRleHRDb2xvcih0aGlzLnZhbGlkYXRpb25TdGF0ZSwge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LWlucHV0JyxcbiAgICAgIGF0dHJzOiB0aGlzLmF0dHJzSW5wdXQsXG4gICAgICAnY2xhc3MnOiB0aGlzLmNsYXNzZXNJbnB1dFxuICAgIH0pLCB0aGlzLmdlbkNvbnRlbnQoKSlcbiAgfVxufVxuIl19