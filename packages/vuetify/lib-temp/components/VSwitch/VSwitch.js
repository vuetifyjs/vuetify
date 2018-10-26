import '../../stylus/components/_selection-controls.styl';
import '../../stylus/components/_switch.styl';
// Mixins
import Selectable from '../../mixins/selectable';
// Directives
import Touch from '../../directives/touch';
// Components
import { VFabTransition } from '../transitions';
import VProgressCircular from '../VProgressCircular/VProgressCircular';
// Helpers
import { keyCodes } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-switch',
    directives: { Touch },
    mixins: [
        Selectable
    ],
    props: {
        loading: {
            type: [Boolean, String],
            default: false
        }
    },
    computed: {
        classes() {
            return {
                'v-input--selection-controls v-input--switch': true
            };
        },
        switchData() {
            return this.setTextColor(this.loading ? undefined : this.computedColor, {
                class: this.themeClasses
            });
        }
    },
    methods: {
        genDefaultSlot() {
            return [
                this.genSwitch(),
                this.genLabel()
            ];
        },
        genSwitch() {
            return this.$createElement('div', {
                staticClass: 'v-input--selection-controls__input'
            }, [
                this.genInput('checkbox', this.$attrs),
                !this.disabled && this.genRipple(this.setTextColor(this.computedColor, {
                    directives: [{
                            name: 'touch',
                            value: {
                                left: this.onSwipeLeft,
                                right: this.onSwipeRight
                            }
                        }]
                })),
                this.$createElement('div', {
                    staticClass: 'v-input--switch__track',
                    ...this.switchData
                }),
                this.$createElement('div', {
                    staticClass: 'v-input--switch__thumb',
                    ...this.switchData
                }, [this.genProgress()])
            ]);
        },
        genProgress() {
            return this.$createElement(VFabTransition, {}, [
                this.loading === false
                    ? null
                    : this.$slots.progress || this.$createElement(VProgressCircular, {
                        props: {
                            color: (this.loading === true || this.loading === '')
                                ? (this.color || 'primary')
                                : this.loading,
                            size: 16,
                            width: 2,
                            indeterminate: true
                        }
                    })
            ]);
        },
        onSwipeLeft() {
            if (this.isActive)
                this.onChange();
        },
        onSwipeRight() {
            if (!this.isActive)
                this.onChange();
        },
        onKeydown(e) {
            if ((e.keyCode === keyCodes.left && this.isActive) ||
                (e.keyCode === keyCodes.right && !this.isActive))
                this.onChange();
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlN3aXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTd2l0Y2gvVlN3aXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGtEQUFrRCxDQUFBO0FBQ3pELE9BQU8sc0NBQXNDLENBQUE7QUFFN0MsU0FBUztBQUNULE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBRWhELGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSx3QkFBd0IsQ0FBQTtBQUUxQyxhQUFhO0FBQ2IsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQy9DLE9BQU8saUJBQWlCLE1BQU0sd0NBQXdDLENBQUE7QUFFdEUsVUFBVTtBQUNWLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUU3QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxVQUFVO0lBRWhCLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRTtJQUVyQixNQUFNLEVBQUU7UUFDTixVQUFVO0tBQ1g7SUFFRCxLQUFLLEVBQUU7UUFDTCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSLE9BQU87WUFDTCxPQUFPO2dCQUNMLDZDQUE2QyxFQUFFLElBQUk7YUFDcEQsQ0FBQTtRQUNILENBQUM7UUFDRCxVQUFVO1lBQ1IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdEUsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZO2FBQ3pCLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLGNBQWM7WUFDWixPQUFPO2dCQUNMLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUU7YUFDaEIsQ0FBQTtRQUNILENBQUM7UUFDRCxTQUFTO1lBQ1AsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLG9DQUFvQzthQUNsRCxFQUFFO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQ3RDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDckUsVUFBVSxFQUFFLENBQUM7NEJBQ1gsSUFBSSxFQUFFLE9BQU87NEJBQ2IsS0FBSyxFQUFFO2dDQUNMLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVztnQ0FDdEIsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZOzZCQUN6Qjt5QkFDRixDQUFDO2lCQUNILENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtvQkFDekIsV0FBVyxFQUFFLHdCQUF3QjtvQkFDckMsR0FBRyxJQUFJLENBQUMsVUFBVTtpQkFDbkIsQ0FBQztnQkFDRixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtvQkFDekIsV0FBVyxFQUFFLHdCQUF3QjtvQkFDckMsR0FBRyxJQUFJLENBQUMsVUFBVTtpQkFDbkIsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQ3pCLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFDRCxXQUFXO1lBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxPQUFPLEtBQUssS0FBSztvQkFDcEIsQ0FBQyxDQUFDLElBQUk7b0JBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUU7d0JBQy9ELEtBQUssRUFBRTs0QkFDTCxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQ0FDbkQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUM7Z0NBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTzs0QkFDaEIsSUFBSSxFQUFFLEVBQUU7NEJBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ1IsYUFBYSxFQUFFLElBQUk7eUJBQ3BCO3FCQUNGLENBQUM7YUFDTCxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsV0FBVztZQUNULElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3BDLENBQUM7UUFDRCxZQUFZO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2dCQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNyQyxDQUFDO1FBQ0QsU0FBUyxDQUFFLENBQUM7WUFDVixJQUNFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ25CLENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19zZWxlY3Rpb24tY29udHJvbHMuc3R5bCdcbmltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3N3aXRjaC5zdHlsJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBTZWxlY3RhYmxlIGZyb20gJy4uLy4uL21peGlucy9zZWxlY3RhYmxlJ1xuXG4vLyBEaXJlY3RpdmVzXG5pbXBvcnQgVG91Y2ggZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90b3VjaCdcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IHsgVkZhYlRyYW5zaXRpb24gfSBmcm9tICcuLi90cmFuc2l0aW9ucydcbmltcG9ydCBWUHJvZ3Jlc3NDaXJjdWxhciBmcm9tICcuLi9WUHJvZ3Jlc3NDaXJjdWxhci9WUHJvZ3Jlc3NDaXJjdWxhcidcblxuLy8gSGVscGVyc1xuaW1wb3J0IHsga2V5Q29kZXMgfSBmcm9tICcuLi8uLi91dGlsL2hlbHBlcnMnXG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICd2LXN3aXRjaCcsXG5cbiAgZGlyZWN0aXZlczogeyBUb3VjaCB9LFxuXG4gIG1peGluczogW1xuICAgIFNlbGVjdGFibGVcbiAgXSxcblxuICBwcm9wczoge1xuICAgIGxvYWRpbmc6IHtcbiAgICAgIHR5cGU6IFtCb29sZWFuLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWlucHV0LS1zZWxlY3Rpb24tY29udHJvbHMgdi1pbnB1dC0tc3dpdGNoJzogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgc3dpdGNoRGF0YSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRUZXh0Q29sb3IodGhpcy5sb2FkaW5nID8gdW5kZWZpbmVkIDogdGhpcy5jb21wdXRlZENvbG9yLCB7XG4gICAgICAgIGNsYXNzOiB0aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbkRlZmF1bHRTbG90ICgpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuZ2VuU3dpdGNoKCksXG4gICAgICAgIHRoaXMuZ2VuTGFiZWwoKVxuICAgICAgXVxuICAgIH0sXG4gICAgZ2VuU3dpdGNoICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1pbnB1dC0tc2VsZWN0aW9uLWNvbnRyb2xzX19pbnB1dCdcbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy5nZW5JbnB1dCgnY2hlY2tib3gnLCB0aGlzLiRhdHRycyksXG4gICAgICAgICF0aGlzLmRpc2FibGVkICYmIHRoaXMuZ2VuUmlwcGxlKHRoaXMuc2V0VGV4dENvbG9yKHRoaXMuY29tcHV0ZWRDb2xvciwge1xuICAgICAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgICAgICBuYW1lOiAndG91Y2gnLFxuICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgbGVmdDogdGhpcy5vblN3aXBlTGVmdCxcbiAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMub25Td2lwZVJpZ2h0XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfSkpLFxuICAgICAgICB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWlucHV0LS1zd2l0Y2hfX3RyYWNrJyxcbiAgICAgICAgICAuLi50aGlzLnN3aXRjaERhdGFcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3YtaW5wdXQtLXN3aXRjaF9fdGh1bWInLFxuICAgICAgICAgIC4uLnRoaXMuc3dpdGNoRGF0YVxuICAgICAgICB9LCBbdGhpcy5nZW5Qcm9ncmVzcygpXSlcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5Qcm9ncmVzcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWRmFiVHJhbnNpdGlvbiwge30sIFtcbiAgICAgICAgdGhpcy5sb2FkaW5nID09PSBmYWxzZVxuICAgICAgICAgID8gbnVsbFxuICAgICAgICAgIDogdGhpcy4kc2xvdHMucHJvZ3Jlc3MgfHwgdGhpcy4kY3JlYXRlRWxlbWVudChWUHJvZ3Jlc3NDaXJjdWxhciwge1xuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgY29sb3I6ICh0aGlzLmxvYWRpbmcgPT09IHRydWUgfHwgdGhpcy5sb2FkaW5nID09PSAnJylcbiAgICAgICAgICAgICAgICA/ICh0aGlzLmNvbG9yIHx8ICdwcmltYXJ5JylcbiAgICAgICAgICAgICAgICA6IHRoaXMubG9hZGluZyxcbiAgICAgICAgICAgICAgc2l6ZTogMTYsXG4gICAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgIF0pXG4gICAgfSxcbiAgICBvblN3aXBlTGVmdCAoKSB7XG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSkgdGhpcy5vbkNoYW5nZSgpXG4gICAgfSxcbiAgICBvblN3aXBlUmlnaHQgKCkge1xuICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB0aGlzLm9uQ2hhbmdlKClcbiAgICB9LFxuICAgIG9uS2V5ZG93biAoZSkge1xuICAgICAgaWYgKFxuICAgICAgICAoZS5rZXlDb2RlID09PSBrZXlDb2Rlcy5sZWZ0ICYmIHRoaXMuaXNBY3RpdmUpIHx8XG4gICAgICAgIChlLmtleUNvZGUgPT09IGtleUNvZGVzLnJpZ2h0ICYmICF0aGlzLmlzQWN0aXZlKVxuICAgICAgKSB0aGlzLm9uQ2hhbmdlKClcbiAgICB9XG4gIH1cbn1cbiJdfQ==