/**
 * Tabs touch
 *
 * @mixin
 */
/* @vue/component */
export default {
    methods: {
        newOffset(direction) {
            const clientWidth = this.$refs.wrapper.clientWidth;
            if (direction === 'prev') {
                return Math.max(this.scrollOffset - clientWidth, 0);
            }
            else {
                return Math.min(this.scrollOffset + clientWidth, this.$refs.container.clientWidth - clientWidth);
            }
        },
        onTouchStart(e) {
            this.startX = this.scrollOffset + e.touchstartX;
            this.$refs.container.style.transition = 'none';
            this.$refs.container.style.willChange = 'transform';
        },
        onTouchMove(e) {
            this.scrollOffset = this.startX - e.touchmoveX;
        },
        onTouchEnd() {
            const container = this.$refs.container;
            const wrapper = this.$refs.wrapper;
            const maxScrollOffset = container.clientWidth - wrapper.clientWidth;
            container.style.transition = null;
            container.style.willChange = null;
            /* istanbul ignore else */
            if (this.scrollOffset < 0 || !this.isOverflowing) {
                this.scrollOffset = 0;
            }
            else if (this.scrollOffset >= maxScrollOffset) {
                this.scrollOffset = maxScrollOffset;
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy10b3VjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZUYWJzL21peGlucy90YWJzLXRvdWNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQLFNBQVMsQ0FBRSxTQUFTO1lBQ2xCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQTtZQUVsRCxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTthQUNwRDtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFBO2FBQ2pHO1FBQ0gsQ0FBQztRQUNELFlBQVksQ0FBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUE7WUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUE7WUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUE7UUFDckQsQ0FBQztRQUNELFdBQVcsQ0FBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUE7UUFDaEQsQ0FBQztRQUNELFVBQVU7WUFDUixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQTtZQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQTtZQUNsQyxNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUE7WUFDbkUsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1lBQ2pDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtZQUVqQywwQkFBMEI7WUFDMUIsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFBO2FBQ3RCO2lCQUFNLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxlQUFlLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFBO2FBQ3BDO1FBQ0gsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGFicyB0b3VjaFxuICpcbiAqIEBtaXhpblxuICovXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2RzOiB7XG4gICAgbmV3T2Zmc2V0IChkaXJlY3Rpb24pIHtcbiAgICAgIGNvbnN0IGNsaWVudFdpZHRoID0gdGhpcy4kcmVmcy53cmFwcGVyLmNsaWVudFdpZHRoXG5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdwcmV2Jykge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy5zY3JvbGxPZmZzZXQgLSBjbGllbnRXaWR0aCwgMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbih0aGlzLnNjcm9sbE9mZnNldCArIGNsaWVudFdpZHRoLCB0aGlzLiRyZWZzLmNvbnRhaW5lci5jbGllbnRXaWR0aCAtIGNsaWVudFdpZHRoKVxuICAgICAgfVxuICAgIH0sXG4gICAgb25Ub3VjaFN0YXJ0IChlKSB7XG4gICAgICB0aGlzLnN0YXJ0WCA9IHRoaXMuc2Nyb2xsT2Zmc2V0ICsgZS50b3VjaHN0YXJ0WFxuICAgICAgdGhpcy4kcmVmcy5jb250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgdGhpcy4kcmVmcy5jb250YWluZXIuc3R5bGUud2lsbENoYW5nZSA9ICd0cmFuc2Zvcm0nXG4gICAgfSxcbiAgICBvblRvdWNoTW92ZSAoZSkge1xuICAgICAgdGhpcy5zY3JvbGxPZmZzZXQgPSB0aGlzLnN0YXJ0WCAtIGUudG91Y2htb3ZlWFxuICAgIH0sXG4gICAgb25Ub3VjaEVuZCAoKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLiRyZWZzLmNvbnRhaW5lclxuICAgICAgY29uc3Qgd3JhcHBlciA9IHRoaXMuJHJlZnMud3JhcHBlclxuICAgICAgY29uc3QgbWF4U2Nyb2xsT2Zmc2V0ID0gY29udGFpbmVyLmNsaWVudFdpZHRoIC0gd3JhcHBlci5jbGllbnRXaWR0aFxuICAgICAgY29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb24gPSBudWxsXG4gICAgICBjb250YWluZXIuc3R5bGUud2lsbENoYW5nZSA9IG51bGxcblxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmICh0aGlzLnNjcm9sbE9mZnNldCA8IDAgfHwgIXRoaXMuaXNPdmVyZmxvd2luZykge1xuICAgICAgICB0aGlzLnNjcm9sbE9mZnNldCA9IDBcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zY3JvbGxPZmZzZXQgPj0gbWF4U2Nyb2xsT2Zmc2V0KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsT2Zmc2V0ID0gbWF4U2Nyb2xsT2Zmc2V0XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=