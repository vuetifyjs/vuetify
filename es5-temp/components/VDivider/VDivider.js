// Styles
import '../../stylus/components/_dividers.styl';
// Mixins
import Themeable from '../../mixins/themeable';
export default Themeable.extend({
    name: 'v-divider',
    props: {
        inset: Boolean,
        vertical: Boolean
    },
    render(h) {
        return h('hr', {
            class: {
                'v-divider': true,
                'v-divider--inset': this.inset,
                'v-divider--vertical': this.vertical,
                ...this.themeClasses
            },
            attrs: this.$attrs,
            on: this.$listeners
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRpdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WRGl2aWRlci9WRGl2aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx3Q0FBd0MsQ0FBQTtBQUsvQyxTQUFTO0FBQ1QsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUE7QUFFOUMsZUFBZSxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQzlCLElBQUksRUFBRSxXQUFXO0lBRWpCLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxPQUFPO1FBQ2QsUUFBUSxFQUFFLE9BQU87S0FDbEI7SUFFRCxNQUFNLENBQUUsQ0FBQztRQUNQLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNiLEtBQUssRUFBRTtnQkFDTCxXQUFXLEVBQUUsSUFBSTtnQkFDakIsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQzlCLHFCQUFxQixFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUNwQyxHQUFHLElBQUksQ0FBQyxZQUFZO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2xCLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUNwQixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19kaXZpZGVycy5zdHlsJ1xuXG4vLyBUeXBlc1xuaW1wb3J0IHsgVk5vZGUgfSBmcm9tICd2dWUnXG5cbi8vIE1peGluc1xuaW1wb3J0IFRoZW1lYWJsZSBmcm9tICcuLi8uLi9taXhpbnMvdGhlbWVhYmxlJ1xuXG5leHBvcnQgZGVmYXVsdCBUaGVtZWFibGUuZXh0ZW5kKHtcbiAgbmFtZTogJ3YtZGl2aWRlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBpbnNldDogQm9vbGVhbixcbiAgICB2ZXJ0aWNhbDogQm9vbGVhblxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICByZXR1cm4gaCgnaHInLCB7XG4gICAgICBjbGFzczoge1xuICAgICAgICAndi1kaXZpZGVyJzogdHJ1ZSxcbiAgICAgICAgJ3YtZGl2aWRlci0taW5zZXQnOiB0aGlzLmluc2V0LFxuICAgICAgICAndi1kaXZpZGVyLS12ZXJ0aWNhbCc6IHRoaXMudmVydGljYWwsXG4gICAgICAgIC4uLnRoaXMudGhlbWVDbGFzc2VzXG4gICAgICB9LFxuICAgICAgYXR0cnM6IHRoaXMuJGF0dHJzLFxuICAgICAgb246IHRoaXMuJGxpc3RlbmVyc1xuICAgIH0pXG4gIH1cbn0pXG4iXX0=