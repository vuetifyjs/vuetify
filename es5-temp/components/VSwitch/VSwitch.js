import '../../stylus/components/_selection-controls.styl';
import '../../stylus/components/_switch.styl';
// Mixins
import Selectable from '../../mixins/selectable';
// Directives
import Touch from '../../directives/touch';
/* @vue/component */
export default {
    name: 'v-switch',
    directives: { Touch },
    mixins: [
        Selectable
    ],
    computed: {
        classes() {
            return {
                'v-input--selection-controls v-input--switch': true
            };
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
                !this.disabled && this.genRipple({
                    'class': this.classesSelectable,
                    directives: [{
                            name: 'touch',
                            value: {
                                left: this.onSwipeLeft,
                                right: this.onSwipeRight
                            }
                        }]
                }),
                this.genSwitchPart('track'),
                this.genSwitchPart('thumb')
            ]);
        },
        // Switches have default colors for thumb/track
        // that do not tie into theme colors
        // this avoids a visual issue where
        // the color takes too long to transition
        genSwitchPart(target) {
            return this.$createElement('div', {
                staticClass: `v-input--switch__${target}`,
                'class': {
                    ...this.classesSelectable,
                    ...this.themeClasses
                },
                // Avoid cache collision
                key: target
            });
        },
        onSwipeLeft() {
            if (this.isActive)
                this.onChange();
        },
        onSwipeRight() {
            if (!this.isActive)
                this.onChange();
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlN3aXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTd2l0Y2gvVlN3aXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGtEQUFrRCxDQUFBO0FBQ3pELE9BQU8sc0NBQXNDLENBQUE7QUFFN0MsU0FBUztBQUNULE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBRWhELGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSx3QkFBd0IsQ0FBQTtBQUUxQyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxVQUFVO0lBRWhCLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRTtJQUVyQixNQUFNLEVBQUU7UUFDTixVQUFVO0tBQ1g7SUFFRCxRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTztnQkFDTCw2Q0FBNkMsRUFBRSxJQUFJO2FBQ3BELENBQUE7UUFDSCxDQUFDO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxjQUFjO1lBQ1osT0FBTztnQkFDTCxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFO2FBQ2hCLENBQUE7UUFDSCxDQUFDO1FBQ0QsU0FBUztZQUNQLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSxvQ0FBb0M7YUFDbEQsRUFBRTtnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN0QyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUI7b0JBQy9CLFVBQVUsRUFBRSxDQUFDOzRCQUNYLElBQUksRUFBRSxPQUFPOzRCQUNiLEtBQUssRUFBRTtnQ0FDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0NBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTs2QkFDekI7eUJBQ0YsQ0FBQztpQkFDSCxDQUFDO2dCQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2dCQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQzthQUM1QixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsK0NBQStDO1FBQy9DLG9DQUFvQztRQUNwQyxtQ0FBbUM7UUFDbkMseUNBQXlDO1FBQ3pDLGFBQWEsQ0FBRSxNQUFNO1lBQ25CLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSxvQkFBb0IsTUFBTSxFQUFFO2dCQUN6QyxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxJQUFJLENBQUMsaUJBQWlCO29CQUN6QixHQUFHLElBQUksQ0FBQyxZQUFZO2lCQUNyQjtnQkFDRCx3QkFBd0I7Z0JBQ3hCLEdBQUcsRUFBRSxNQUFNO2FBQ1osQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELFdBQVc7WUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRO2dCQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNwQyxDQUFDO1FBQ0QsWUFBWTtZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDckMsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bHVzL2NvbXBvbmVudHMvX3NlbGVjdGlvbi1jb250cm9scy5zdHlsJ1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc3dpdGNoLnN0eWwnXG5cbi8vIE1peGluc1xuaW1wb3J0IFNlbGVjdGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL3NlbGVjdGFibGUnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCBUb3VjaCBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3RvdWNoJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1zd2l0Y2gnLFxuXG4gIGRpcmVjdGl2ZXM6IHsgVG91Y2ggfSxcblxuICBtaXhpbnM6IFtcbiAgICBTZWxlY3RhYmxlXG4gIF0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWlucHV0LS1zZWxlY3Rpb24tY29udHJvbHMgdi1pbnB1dC0tc3dpdGNoJzogdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuRGVmYXVsdFNsb3QgKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdGhpcy5nZW5Td2l0Y2goKSxcbiAgICAgICAgdGhpcy5nZW5MYWJlbCgpXG4gICAgICBdXG4gICAgfSxcbiAgICBnZW5Td2l0Y2ggKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWlucHV0LS1zZWxlY3Rpb24tY29udHJvbHNfX2lucHV0J1xuICAgICAgfSwgW1xuICAgICAgICB0aGlzLmdlbklucHV0KCdjaGVja2JveCcsIHRoaXMuJGF0dHJzKSxcbiAgICAgICAgIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5nZW5SaXBwbGUoe1xuICAgICAgICAgICdjbGFzcyc6IHRoaXMuY2xhc3Nlc1NlbGVjdGFibGUsXG4gICAgICAgICAgZGlyZWN0aXZlczogW3tcbiAgICAgICAgICAgIG5hbWU6ICd0b3VjaCcsXG4gICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICBsZWZ0OiB0aGlzLm9uU3dpcGVMZWZ0LFxuICAgICAgICAgICAgICByaWdodDogdGhpcy5vblN3aXBlUmlnaHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XVxuICAgICAgICB9KSxcbiAgICAgICAgdGhpcy5nZW5Td2l0Y2hQYXJ0KCd0cmFjaycpLFxuICAgICAgICB0aGlzLmdlblN3aXRjaFBhcnQoJ3RodW1iJylcbiAgICAgIF0pXG4gICAgfSxcbiAgICAvLyBTd2l0Y2hlcyBoYXZlIGRlZmF1bHQgY29sb3JzIGZvciB0aHVtYi90cmFja1xuICAgIC8vIHRoYXQgZG8gbm90IHRpZSBpbnRvIHRoZW1lIGNvbG9yc1xuICAgIC8vIHRoaXMgYXZvaWRzIGEgdmlzdWFsIGlzc3VlIHdoZXJlXG4gICAgLy8gdGhlIGNvbG9yIHRha2VzIHRvbyBsb25nIHRvIHRyYW5zaXRpb25cbiAgICBnZW5Td2l0Y2hQYXJ0ICh0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBgdi1pbnB1dC0tc3dpdGNoX18ke3RhcmdldH1gLFxuICAgICAgICAnY2xhc3MnOiB7XG4gICAgICAgICAgLi4udGhpcy5jbGFzc2VzU2VsZWN0YWJsZSxcbiAgICAgICAgICAuLi50aGlzLnRoZW1lQ2xhc3Nlc1xuICAgICAgICB9LFxuICAgICAgICAvLyBBdm9pZCBjYWNoZSBjb2xsaXNpb25cbiAgICAgICAga2V5OiB0YXJnZXRcbiAgICAgIH0pXG4gICAgfSxcbiAgICBvblN3aXBlTGVmdCAoKSB7XG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSkgdGhpcy5vbkNoYW5nZSgpXG4gICAgfSxcbiAgICBvblN3aXBlUmlnaHQgKCkge1xuICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB0aGlzLm9uQ2hhbmdlKClcbiAgICB9XG4gIH1cbn1cbiJdfQ==