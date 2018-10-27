/**
 * Tabs watchers
 *
 * @mixin
 */
/* @vue/component */
export default {
    watch: {
        activeTab(tab, prev) {
            !prev && tab && this.updateTabs();
            setTimeout(this.callSlider, 0);
            if (!tab)
                return;
            const action = tab.action;
            this.tabItems && this.tabItems(action === tab ? this.tabs.indexOf(tab) : action);
        },
        alignWithTitle: 'callSlider',
        centered: 'callSlider',
        fixedTabs: 'callSlider',
        hasArrows(val) {
            if (!val)
                this.scrollOffset = 0;
        },
        isBooted: 'findActiveLink',
        lazyValue: 'updateTabs',
        right: 'callSlider',
        value(val) {
            this.lazyValue = val;
        },
        '$vuetify.application.left': 'onResize',
        '$vuetify.application.right': 'onResize',
        scrollOffset(val) {
            this.$refs.container.style.transform = `translateX(${-val}px)`;
            if (this.hasArrows) {
                this.prevIconVisible = this.checkPrevIcon();
                this.nextIconVisible = this.checkNextIcon();
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy13YXRjaGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZUYWJzL21peGlucy90YWJzLXdhdGNoZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLEtBQUssRUFBRTtRQUNMLFNBQVMsQ0FBRSxHQUFHLEVBQUUsSUFBSTtZQUNsQixDQUFDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBRWpDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBRTlCLElBQUksQ0FBQyxHQUFHO2dCQUFFLE9BQU07WUFFaEIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtZQUN6QixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2xGLENBQUM7UUFDRCxjQUFjLEVBQUUsWUFBWTtRQUM1QixRQUFRLEVBQUUsWUFBWTtRQUN0QixTQUFTLEVBQUUsWUFBWTtRQUN2QixTQUFTLENBQUUsR0FBRztZQUNaLElBQUksQ0FBQyxHQUFHO2dCQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFDRCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFNBQVMsRUFBRSxZQUFZO1FBQ3ZCLEtBQUssRUFBRSxZQUFZO1FBQ25CLEtBQUssQ0FBRSxHQUFHO1lBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUE7UUFDdEIsQ0FBQztRQUNELDJCQUEyQixFQUFFLFVBQVU7UUFDdkMsNEJBQTRCLEVBQUUsVUFBVTtRQUN4QyxZQUFZLENBQUUsR0FBRztZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLEdBQUcsS0FBSyxDQUFBO1lBQzlELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7Z0JBQzNDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO2FBQzVDO1FBQ0gsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGFicyB3YXRjaGVyc1xuICpcbiAqIEBtaXhpblxuICovXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICB3YXRjaDoge1xuICAgIGFjdGl2ZVRhYiAodGFiLCBwcmV2KSB7XG4gICAgICAhcHJldiAmJiB0YWIgJiYgdGhpcy51cGRhdGVUYWJzKClcblxuICAgICAgc2V0VGltZW91dCh0aGlzLmNhbGxTbGlkZXIsIDApXG5cbiAgICAgIGlmICghdGFiKSByZXR1cm5cblxuICAgICAgY29uc3QgYWN0aW9uID0gdGFiLmFjdGlvblxuICAgICAgdGhpcy50YWJJdGVtcyAmJiB0aGlzLnRhYkl0ZW1zKGFjdGlvbiA9PT0gdGFiID8gdGhpcy50YWJzLmluZGV4T2YodGFiKSA6IGFjdGlvbilcbiAgICB9LFxuICAgIGFsaWduV2l0aFRpdGxlOiAnY2FsbFNsaWRlcicsXG4gICAgY2VudGVyZWQ6ICdjYWxsU2xpZGVyJyxcbiAgICBmaXhlZFRhYnM6ICdjYWxsU2xpZGVyJyxcbiAgICBoYXNBcnJvd3MgKHZhbCkge1xuICAgICAgaWYgKCF2YWwpIHRoaXMuc2Nyb2xsT2Zmc2V0ID0gMFxuICAgIH0sXG4gICAgaXNCb290ZWQ6ICdmaW5kQWN0aXZlTGluaycsXG4gICAgbGF6eVZhbHVlOiAndXBkYXRlVGFicycsXG4gICAgcmlnaHQ6ICdjYWxsU2xpZGVyJyxcbiAgICB2YWx1ZSAodmFsKSB7XG4gICAgICB0aGlzLmxhenlWYWx1ZSA9IHZhbFxuICAgIH0sXG4gICAgJyR2dWV0aWZ5LmFwcGxpY2F0aW9uLmxlZnQnOiAnb25SZXNpemUnLFxuICAgICckdnVldGlmeS5hcHBsaWNhdGlvbi5yaWdodCc6ICdvblJlc2l6ZScsXG4gICAgc2Nyb2xsT2Zmc2V0ICh2YWwpIHtcbiAgICAgIHRoaXMuJHJlZnMuY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LXZhbH1weClgXG4gICAgICBpZiAodGhpcy5oYXNBcnJvd3MpIHtcbiAgICAgICAgdGhpcy5wcmV2SWNvblZpc2libGUgPSB0aGlzLmNoZWNrUHJldkljb24oKVxuICAgICAgICB0aGlzLm5leHRJY29uVmlzaWJsZSA9IHRoaXMuY2hlY2tOZXh0SWNvbigpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=