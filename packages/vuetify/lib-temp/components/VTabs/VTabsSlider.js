import Colorable from '../../mixins/colorable';
/* @vue/component */
export default {
    name: 'v-tabs-slider',
    mixins: [Colorable],
    render(h) {
        return h('div', this.setBackgroundColor(this.color || 'accent', {
            staticClass: 'v-tabs__slider'
        }));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlRhYnNTbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WVGFicy9WVGFic1NsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQTtBQUU5QyxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLElBQUksRUFBRSxlQUFlO0lBRXJCLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUVuQixNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDOUQsV0FBVyxFQUFFLGdCQUFnQjtTQUM5QixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvY29sb3JhYmxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi10YWJzLXNsaWRlcicsXG5cbiAgbWl4aW5zOiBbQ29sb3JhYmxlXSxcblxuICByZW5kZXIgKGgpIHtcbiAgICByZXR1cm4gaCgnZGl2JywgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IodGhpcy5jb2xvciB8fCAnYWNjZW50Jywge1xuICAgICAgc3RhdGljQ2xhc3M6ICd2LXRhYnNfX3NsaWRlcidcbiAgICB9KSlcbiAgfVxufVxuIl19