// Components
import VPicker from '../components/VPicker';
// Mixins
import Colorable from './colorable';
import Themeable from './themeable';
/* @vue/component */
export default {
    name: 'picker',
    mixins: [
        Colorable,
        Themeable
    ],
    props: {
        fullWidth: Boolean,
        headerColor: String,
        landscape: Boolean,
        noTitle: Boolean,
        width: {
            type: [Number, String],
            default: 290
        }
    },
    methods: {
        genPickerTitle() { },
        genPickerBody() { },
        genPickerActionsSlot() {
            return this.$scopedSlots.default ? this.$scopedSlots.default({
                save: this.save,
                cancel: this.cancel
            }) : this.$slots.default;
        },
        genPicker(staticClass) {
            return this.$createElement(VPicker, {
                staticClass,
                props: {
                    color: this.headerColor || this.color,
                    dark: this.dark,
                    fullWidth: this.fullWidth,
                    landscape: this.landscape,
                    light: this.light,
                    width: this.width
                }
            }, [
                this.noTitle ? null : this.genPickerTitle(),
                this.genPickerBody(),
                this.$createElement('template', { slot: 'actions' }, [this.genPickerActionsSlot()])
            ]);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21peGlucy9waWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsYUFBYTtBQUNiLE9BQU8sT0FBTyxNQUFNLHVCQUF1QixDQUFBO0FBRTNDLFNBQVM7QUFDVCxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUE7QUFDbkMsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFBO0FBRW5DLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFFBQVE7SUFFZCxNQUFNLEVBQUU7UUFDTixTQUFTO1FBQ1QsU0FBUztLQUNWO0lBRUQsS0FBSyxFQUFFO1FBQ0wsU0FBUyxFQUFFLE9BQU87UUFDbEIsV0FBVyxFQUFFLE1BQU07UUFDbkIsU0FBUyxFQUFFLE9BQU87UUFDbEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsR0FBRztTQUNiO0tBQ0Y7SUFFRCxPQUFPLEVBQUU7UUFDUCxjQUFjLEtBQUssQ0FBQztRQUNwQixhQUFhLEtBQUssQ0FBQztRQUNuQixvQkFBb0I7WUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7Z0JBQzNELElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUMxQixDQUFDO1FBQ0QsU0FBUyxDQUFFLFdBQVc7WUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTtnQkFDbEMsV0FBVztnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEtBQUs7b0JBQ3JDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztvQkFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ2xCO2FBQ0YsRUFBRTtnQkFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQzthQUNwRixDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZQaWNrZXIgZnJvbSAnLi4vY29tcG9uZW50cy9WUGlja2VyJ1xuXG4vLyBNaXhpbnNcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi9jb2xvcmFibGUnXG5pbXBvcnQgVGhlbWVhYmxlIGZyb20gJy4vdGhlbWVhYmxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAncGlja2VyJyxcblxuICBtaXhpbnM6IFtcbiAgICBDb2xvcmFibGUsXG4gICAgVGhlbWVhYmxlXG4gIF0sXG5cbiAgcHJvcHM6IHtcbiAgICBmdWxsV2lkdGg6IEJvb2xlYW4sXG4gICAgaGVhZGVyQ29sb3I6IFN0cmluZyxcbiAgICBsYW5kc2NhcGU6IEJvb2xlYW4sXG4gICAgbm9UaXRsZTogQm9vbGVhbixcbiAgICB3aWR0aDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDI5MFxuICAgIH1cbiAgfSxcblxuICBtZXRob2RzOiB7XG4gICAgZ2VuUGlja2VyVGl0bGUgKCkge30sXG4gICAgZ2VuUGlja2VyQm9keSAoKSB7fSxcbiAgICBnZW5QaWNrZXJBY3Rpb25zU2xvdCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kc2NvcGVkU2xvdHMuZGVmYXVsdCA/IHRoaXMuJHNjb3BlZFNsb3RzLmRlZmF1bHQoe1xuICAgICAgICBzYXZlOiB0aGlzLnNhdmUsXG4gICAgICAgIGNhbmNlbDogdGhpcy5jYW5jZWxcbiAgICAgIH0pIDogdGhpcy4kc2xvdHMuZGVmYXVsdFxuICAgIH0sXG4gICAgZ2VuUGlja2VyIChzdGF0aWNDbGFzcykge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVlBpY2tlciwge1xuICAgICAgICBzdGF0aWNDbGFzcyxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5oZWFkZXJDb2xvciB8fCB0aGlzLmNvbG9yLFxuICAgICAgICAgIGRhcms6IHRoaXMuZGFyayxcbiAgICAgICAgICBmdWxsV2lkdGg6IHRoaXMuZnVsbFdpZHRoLFxuICAgICAgICAgIGxhbmRzY2FwZTogdGhpcy5sYW5kc2NhcGUsXG4gICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHQsXG4gICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcbiAgICAgICAgfVxuICAgICAgfSwgW1xuICAgICAgICB0aGlzLm5vVGl0bGUgPyBudWxsIDogdGhpcy5nZW5QaWNrZXJUaXRsZSgpLFxuICAgICAgICB0aGlzLmdlblBpY2tlckJvZHkoKSxcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnLCB7IHNsb3Q6ICdhY3Rpb25zJyB9LCBbdGhpcy5nZW5QaWNrZXJBY3Rpb25zU2xvdCgpXSlcbiAgICAgIF0pXG4gICAgfVxuICB9XG59XG4iXX0=