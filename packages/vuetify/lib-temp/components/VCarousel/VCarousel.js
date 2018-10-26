// Styles
import '../../stylus/components/_carousel.styl';
// Extensions
import VWindow from '../VWindow/VWindow';
// Components
import VBtn from '../VBtn';
import VIcon from '../VIcon';
// Mixins
// TODO: Move this into core components v2.0
import ButtonGroup from '../../mixins/button-group';
// Utilities
import { convertToUnit } from '../../util/helpers';
export default VWindow.extend({
    name: 'v-carousel',
    props: {
        cycle: {
            type: Boolean,
            default: true
        },
        delimiterIcon: {
            type: String,
            default: '$vuetify.icons.delimiter'
        },
        height: {
            type: [Number, String],
            default: 500
        },
        hideControls: Boolean,
        hideDelimiters: Boolean,
        interval: {
            type: [Number, String],
            default: 6000,
            validator: (value) => value > 0
        },
        mandatory: {
            type: Boolean,
            default: true
        },
        nextIcon: {
            type: [Boolean, String],
            default: '$vuetify.icons.next'
        },
        prevIcon: {
            type: [Boolean, String],
            default: '$vuetify.icons.prev'
        }
    },
    data() {
        return {
            changedByControls: false,
            internalHeight: this.height,
            slideTimeout: undefined
        };
    },
    computed: {
        isDark() {
            return this.dark || !this.light;
        }
    },
    watch: {
        internalValue: 'restartTimeout',
        interval: 'restartTimeout',
        cycle(val) {
            if (val) {
                this.restartTimeout();
            }
            else {
                clearTimeout(this.slideTimeout);
                this.slideTimeout = undefined;
            }
        }
    },
    mounted() {
        this.startTimeout();
    },
    methods: {
        genDelimiters() {
            return this.$createElement('div', {
                staticClass: 'v-carousel__controls'
            }, [this.genItems()]);
        },
        genIcon(direction, icon, fn) {
            return this.$createElement('div', {
                staticClass: `v-carousel__${direction}`
            }, [
                this.$createElement(VBtn, {
                    props: {
                        icon: true
                    },
                    on: { click: fn }
                }, [
                    this.$createElement(VIcon, {
                        props: { 'size': '46px' }
                    }, icon)
                ])
            ]);
        },
        genIcons() {
            const icons = [];
            const prevIcon = this.$vuetify.rtl
                ? this.nextIcon
                : this.prevIcon;
            if (prevIcon && typeof prevIcon === 'string') {
                icons.push(this.genIcon('prev', prevIcon, this.prev));
            }
            const nextIcon = this.$vuetify.rtl
                ? this.prevIcon
                : this.nextIcon;
            if (nextIcon && typeof nextIcon === 'string') {
                icons.push(this.genIcon('next', nextIcon, this.next));
            }
            return icons;
        },
        genItems() {
            const length = this.items.length;
            const children = [];
            for (let i = 0; i < length; i++) {
                const child = this.$createElement(VBtn, {
                    class: {
                        'v-carousel__controls__item': true
                    },
                    props: {
                        icon: true,
                        small: true
                    }
                }, [
                    this.$createElement(VIcon, {
                        props: { size: 18 }
                    }, this.delimiterIcon)
                ]);
                children.push(child);
            }
            return this.$createElement(ButtonGroup, {
                props: {
                    value: this.internalValue
                },
                on: {
                    change: (val) => {
                        this.changedByControls = true;
                        this.internalValue = val;
                    }
                }
            }, children);
        },
        restartTimeout() {
            this.slideTimeout && clearTimeout(this.slideTimeout);
            this.slideTimeout = undefined;
            const raf = requestAnimationFrame || setTimeout;
            raf(this.startTimeout);
        },
        startTimeout() {
            if (!this.cycle)
                return;
            this.slideTimeout = window.setTimeout(this.next, +this.interval > 0 ? +this.interval : 6000);
        },
        updateReverse(val, oldVal) {
            if (this.changedByControls) {
                this.changedByControls = false;
                VWindow.options.methods.updateReverse.call(this, val, oldVal);
            }
        }
    },
    render(h) {
        const children = [];
        const data = {
            staticClass: 'v-window v-carousel',
            style: {
                height: convertToUnit(this.height)
            },
            directives: []
        };
        if (!this.touchless) {
            data.directives.push({
                name: 'touch',
                value: {
                    left: this.next,
                    right: this.prev
                }
            });
        }
        if (!this.hideControls) {
            children.push(this.genIcons());
        }
        if (!this.hideDelimiters) {
            children.push(this.genDelimiters());
        }
        return h('div', data, [children, this.genContainer()]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkNhcm91c2VsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVkNhcm91c2VsL1ZDYXJvdXNlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx3Q0FBd0MsQ0FBQTtBQUUvQyxhQUFhO0FBQ2IsT0FBTyxPQUFPLE1BQU0sb0JBQW9CLENBQUE7QUFFeEMsYUFBYTtBQUNiLE9BQU8sSUFBSSxNQUFNLFNBQVMsQ0FBQTtBQUMxQixPQUFPLEtBQUssTUFBTSxVQUFVLENBQUE7QUFFNUIsU0FBUztBQUNULDRDQUE0QztBQUM1QyxPQUFPLFdBQVcsTUFBTSwyQkFBMkIsQ0FBQTtBQUVuRCxZQUFZO0FBQ1osT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBTWxELGVBQWUsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM1QixJQUFJLEVBQUUsWUFBWTtJQUVsQixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxhQUFhLEVBQUU7WUFDYixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSwwQkFBMEI7U0FDcEM7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxHQUFHO1NBQ2I7UUFDRCxZQUFZLEVBQUUsT0FBTztRQUNyQixjQUFjLEVBQUUsT0FBTztRQUN2QixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsU0FBUyxFQUFFLENBQUMsS0FBc0IsRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUM7U0FDakQ7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsT0FBTztZQUNiLE9BQU8sRUFBRSxJQUFJO1NB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LENBQUMsSUFBSTtpQkFDakI7YUFDZ0IsQ0FBQyxDQUFBO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtTQUMvQjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUE7U0FDcEM7UUFFRCxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDeEQsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fY2Fyb3VzZWwuc3R5bCdcblxuLy8gRXh0ZW5zaW9uc1xuaW1wb3J0IFZXaW5kb3cgZnJvbSAnLi4vVldpbmRvdy9WV2luZG93J1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgVkJ0biBmcm9tICcuLi9WQnRuJ1xuaW1wb3J0IFZJY29uIGZyb20gJy4uL1ZJY29uJ1xuXG4vLyBNaXhpbnNcbi8vIFRPRE86IE1vdmUgdGhpcyBpbnRvIGNvcmUgY29tcG9uZW50cyB2Mi4wXG5pbXBvcnQgQnV0dG9uR3JvdXAgZnJvbSAnLi4vLi4vbWl4aW5zL2J1dHRvbi1ncm91cCdcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQgeyBjb252ZXJ0VG9Vbml0IH0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuXG4vLyBUeXBlc1xuaW1wb3J0IHsgVk5vZGUgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBWTm9kZURpcmVjdGl2ZSB9IGZyb20gJ3Z1ZS90eXBlcy92bm9kZSdcblxuZXhwb3J0IGRlZmF1bHQgVldpbmRvdy5leHRlbmQoe1xuICBuYW1lOiAndi1jYXJvdXNlbCcsXG5cbiAgcHJvcHM6IHtcbiAgICBjeWNsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIGRlbGltaXRlckljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5kZWxpbWl0ZXInXG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiA1MDBcbiAgICB9LFxuICAgIGhpZGVDb250cm9sczogQm9vbGVhbixcbiAgICBoaWRlRGVsaW1pdGVyczogQm9vbGVhbixcbiAgICBpbnRlcnZhbDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDYwMDAsXG4gICAgICB2YWxpZGF0b3I6ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSA9PiB2YWx1ZSA+IDBcbiAgICB9LFxuICAgIG1hbmRhdG9yeToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9LFxuICAgIG5leHRJY29uOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5uZXh0J1xuICAgIH0sXG4gICAgcHJldkljb246IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLnByZXYnXG4gICAgfVxuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjaGFuZ2VkQnlDb250cm9sczogZmFsc2UsXG4gICAgICBpbnRlcm5hbEhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBzbGlkZVRpbWVvdXQ6IHVuZGVmaW5lZCBhcyBudW1iZXIgfCB1bmRlZmluZWRcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBpc0RhcmsgKCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMuZGFyayB8fCAhdGhpcy5saWdodFxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIGludGVybmFsVmFsdWU6ICdyZXN0YXJ0VGltZW91dCcsXG4gICAgaW50ZXJ2YWw6ICdyZXN0YXJ0VGltZW91dCcsXG4gICAgY3ljbGUgKHZhbCkge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICB0aGlzLnJlc3RhcnRUaW1lb3V0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNsaWRlVGltZW91dClcbiAgICAgICAgdGhpcy5zbGlkZVRpbWVvdXQgPSB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCAoKSB7XG4gICAgdGhpcy5zdGFydFRpbWVvdXQoKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5EZWxpbWl0ZXJzICgpOiBWTm9kZSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3YtY2Fyb3VzZWxfX2NvbnRyb2xzJ1xuICAgICAgfSwgW3RoaXMuZ2VuSXRlbXMoKV0pXG4gICAgfSxcbiAgICBnZW5JY29uIChcbiAgICAgIGRpcmVjdGlvbjogJ3ByZXYnIHwgJ25leHQnLFxuICAgICAgaWNvbjogc3RyaW5nLFxuICAgICAgZm46ICgpID0+IHZvaWRcbiAgICApOiBWTm9kZSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogYHYtY2Fyb3VzZWxfXyR7ZGlyZWN0aW9ufWBcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudChWQnRuLCB7XG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGljb246IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uOiB7IGNsaWNrOiBmbiB9XG4gICAgICAgIH0sIFtcbiAgICAgICAgICB0aGlzLiRjcmVhdGVFbGVtZW50KFZJY29uLCB7XG4gICAgICAgICAgICBwcm9wczogeyAnc2l6ZSc6ICc0NnB4JyB9XG4gICAgICAgICAgfSwgaWNvbilcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5JY29ucyAoKTogVk5vZGVbXSB7XG4gICAgICBjb25zdCBpY29ucyA9IFtdXG5cbiAgICAgIGNvbnN0IHByZXZJY29uID0gdGhpcy4kdnVldGlmeS5ydGxcbiAgICAgICAgPyB0aGlzLm5leHRJY29uXG4gICAgICAgIDogdGhpcy5wcmV2SWNvblxuXG4gICAgICBpZiAocHJldkljb24gJiYgdHlwZW9mIHByZXZJY29uID09PSAnc3RyaW5nJykge1xuICAgICAgICBpY29ucy5wdXNoKHRoaXMuZ2VuSWNvbigncHJldicsIHByZXZJY29uLCB0aGlzLnByZXYpKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0SWNvbiA9IHRoaXMuJHZ1ZXRpZnkucnRsXG4gICAgICAgID8gdGhpcy5wcmV2SWNvblxuICAgICAgICA6IHRoaXMubmV4dEljb25cblxuICAgICAgaWYgKG5leHRJY29uICYmIHR5cGVvZiBuZXh0SWNvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWNvbnMucHVzaCh0aGlzLmdlbkljb24oJ25leHQnLCBuZXh0SWNvbiwgdGhpcy5uZXh0KSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGljb25zXG4gICAgfSxcbiAgICBnZW5JdGVtcyAoKTogVk5vZGUge1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5pdGVtcy5sZW5ndGhcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gW11cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkJ0biwge1xuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAndi1jYXJvdXNlbF9fY29udHJvbHNfX2l0ZW0nOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgaWNvbjogdHJ1ZSxcbiAgICAgICAgICAgIHNtYWxsOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LCBbXG4gICAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudChWSWNvbiwge1xuICAgICAgICAgICAgcHJvcHM6IHsgc2l6ZTogMTggfVxuICAgICAgICAgIH0sIHRoaXMuZGVsaW1pdGVySWNvbilcbiAgICAgICAgXSlcblxuICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChCdXR0b25Hcm91cCwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLmludGVybmFsVmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBjaGFuZ2U6ICh2YWw6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkQnlDb250cm9scyA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHZhbFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgY2hpbGRyZW4pXG4gICAgfSxcbiAgICByZXN0YXJ0VGltZW91dCAoKSB7XG4gICAgICB0aGlzLnNsaWRlVGltZW91dCAmJiBjbGVhclRpbWVvdXQodGhpcy5zbGlkZVRpbWVvdXQpXG4gICAgICB0aGlzLnNsaWRlVGltZW91dCA9IHVuZGVmaW5lZFxuXG4gICAgICBjb25zdCByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dFxuICAgICAgcmFmKHRoaXMuc3RhcnRUaW1lb3V0KVxuICAgIH0sXG4gICAgc3RhcnRUaW1lb3V0ICgpIHtcbiAgICAgIGlmICghdGhpcy5jeWNsZSkgcmV0dXJuXG5cbiAgICAgIHRoaXMuc2xpZGVUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQodGhpcy5uZXh0LCArdGhpcy5pbnRlcnZhbCA+IDAgPyArdGhpcy5pbnRlcnZhbCA6IDYwMDApXG4gICAgfSxcbiAgICB1cGRhdGVSZXZlcnNlICh2YWw6IG51bWJlciwgb2xkVmFsOiBudW1iZXIpIHtcbiAgICAgIGlmICh0aGlzLmNoYW5nZWRCeUNvbnRyb2xzKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlZEJ5Q29udHJvbHMgPSBmYWxzZVxuXG4gICAgICAgIFZXaW5kb3cub3B0aW9ucy5tZXRob2RzLnVwZGF0ZVJldmVyc2UuY2FsbCh0aGlzLCB2YWwsIG9sZFZhbClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVuZGVyIChoKTogVk5vZGUge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gW11cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXdpbmRvdyB2LWNhcm91c2VsJyxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGhlaWdodDogY29udmVydFRvVW5pdCh0aGlzLmhlaWdodClcbiAgICAgIH0sXG4gICAgICBkaXJlY3RpdmVzOiBbXSBhcyBWTm9kZURpcmVjdGl2ZVtdXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnRvdWNobGVzcykge1xuICAgICAgZGF0YS5kaXJlY3RpdmVzLnB1c2goe1xuICAgICAgICBuYW1lOiAndG91Y2gnLFxuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgIGxlZnQ6IHRoaXMubmV4dCxcbiAgICAgICAgICByaWdodDogdGhpcy5wcmV2XG4gICAgICAgIH1cbiAgICAgIH0gYXMgVk5vZGVEaXJlY3RpdmUpXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhpZGVDb250cm9scykge1xuICAgICAgY2hpbGRyZW4ucHVzaCh0aGlzLmdlbkljb25zKCkpXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhpZGVEZWxpbWl0ZXJzKSB7XG4gICAgICBjaGlsZHJlbi5wdXNoKHRoaXMuZ2VuRGVsaW1pdGVycygpKVxuICAgIH1cblxuICAgIHJldHVybiBoKCdkaXYnLCBkYXRhLCBbY2hpbGRyZW4sIHRoaXMuZ2VuQ29udGFpbmVyKCldKVxuICB9XG59KVxuIl19