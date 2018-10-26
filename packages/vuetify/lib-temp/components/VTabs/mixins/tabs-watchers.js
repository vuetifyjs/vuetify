/**
 * Tabs watchers
 *
 * @mixin
 */
/* @vue/component */
export default {
    watch: {
        activeTab(val, oldVal) {
            this.setOverflow();
            if (!val)
                return;
            this.tabItems && this.tabItems(this.getValue(val, this.items.indexOf(val)));
            // Do nothing for first tab
            // is handled from isBooted
            // watcher
            if (oldVal == null)
                return;
            this.updateTabsView();
        },
        alignWithTitle: 'callSlider',
        centered: 'callSlider',
        fixedTabs: 'callSlider',
        hasArrows(val) {
            if (!val)
                this.scrollOffset = 0;
        },
        /* @deprecate */
        internalValue(val) {
            /* istanbul ignore else */
            if (!this.$listeners['input'])
                return;
            this.$emit('input', val);
        },
        lazyValue: 'updateTabs',
        right: 'callSlider',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy13YXRjaGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZUYWJzL21peGlucy90YWJzLXdhdGNoZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxvQkFBb0I7QUFDcEIsZUFBZTtJQUNiLEtBQUssRUFBRTtRQUNMLFNBQVMsQ0FBRSxHQUFHLEVBQUUsTUFBTTtZQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFbEIsSUFBSSxDQUFDLEdBQUc7Z0JBQUUsT0FBTTtZQUVoQixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQzVDLENBQUE7WUFFRCwyQkFBMkI7WUFDM0IsMkJBQTJCO1lBQzNCLFVBQVU7WUFDVixJQUFJLE1BQU0sSUFBSSxJQUFJO2dCQUFFLE9BQU07WUFFMUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3ZCLENBQUM7UUFDRCxjQUFjLEVBQUUsWUFBWTtRQUM1QixRQUFRLEVBQUUsWUFBWTtRQUN0QixTQUFTLEVBQUUsWUFBWTtRQUN2QixTQUFTLENBQUUsR0FBRztZQUNaLElBQUksQ0FBQyxHQUFHO2dCQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFDRCxnQkFBZ0I7UUFDaEIsYUFBYSxDQUFFLEdBQUc7WUFDaEIsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFBRSxPQUFNO1lBRXJDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzFCLENBQUM7UUFDRCxTQUFTLEVBQUUsWUFBWTtRQUN2QixLQUFLLEVBQUUsWUFBWTtRQUNuQiwyQkFBMkIsRUFBRSxVQUFVO1FBQ3ZDLDRCQUE0QixFQUFFLFVBQVU7UUFDeEMsWUFBWSxDQUFFLEdBQUc7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQTtZQUM5RCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO2dCQUMzQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTthQUM1QztRQUNILENBQUM7S0FDRjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRhYnMgd2F0Y2hlcnNcbiAqXG4gKiBAbWl4aW5cbiAqL1xuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgd2F0Y2g6IHtcbiAgICBhY3RpdmVUYWIgKHZhbCwgb2xkVmFsKSB7XG4gICAgICB0aGlzLnNldE92ZXJmbG93KClcblxuICAgICAgaWYgKCF2YWwpIHJldHVyblxuXG4gICAgICB0aGlzLnRhYkl0ZW1zICYmIHRoaXMudGFiSXRlbXMoXG4gICAgICAgIHRoaXMuZ2V0VmFsdWUodmFsLCB0aGlzLml0ZW1zLmluZGV4T2YodmFsKSlcbiAgICAgIClcblxuICAgICAgLy8gRG8gbm90aGluZyBmb3IgZmlyc3QgdGFiXG4gICAgICAvLyBpcyBoYW5kbGVkIGZyb20gaXNCb290ZWRcbiAgICAgIC8vIHdhdGNoZXJcbiAgICAgIGlmIChvbGRWYWwgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgIHRoaXMudXBkYXRlVGFic1ZpZXcoKVxuICAgIH0sXG4gICAgYWxpZ25XaXRoVGl0bGU6ICdjYWxsU2xpZGVyJyxcbiAgICBjZW50ZXJlZDogJ2NhbGxTbGlkZXInLFxuICAgIGZpeGVkVGFiczogJ2NhbGxTbGlkZXInLFxuICAgIGhhc0Fycm93cyAodmFsKSB7XG4gICAgICBpZiAoIXZhbCkgdGhpcy5zY3JvbGxPZmZzZXQgPSAwXG4gICAgfSxcbiAgICAvKiBAZGVwcmVjYXRlICovXG4gICAgaW50ZXJuYWxWYWx1ZSAodmFsKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKCF0aGlzLiRsaXN0ZW5lcnNbJ2lucHV0J10pIHJldHVyblxuXG4gICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIHZhbClcbiAgICB9LFxuICAgIGxhenlWYWx1ZTogJ3VwZGF0ZVRhYnMnLFxuICAgIHJpZ2h0OiAnY2FsbFNsaWRlcicsXG4gICAgJyR2dWV0aWZ5LmFwcGxpY2F0aW9uLmxlZnQnOiAnb25SZXNpemUnLFxuICAgICckdnVldGlmeS5hcHBsaWNhdGlvbi5yaWdodCc6ICdvblJlc2l6ZScsXG4gICAgc2Nyb2xsT2Zmc2V0ICh2YWwpIHtcbiAgICAgIHRoaXMuJHJlZnMuY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7LXZhbH1weClgXG4gICAgICBpZiAodGhpcy5oYXNBcnJvd3MpIHtcbiAgICAgICAgdGhpcy5wcmV2SWNvblZpc2libGUgPSB0aGlzLmNoZWNrUHJldkljb24oKVxuICAgICAgICB0aGlzLm5leHRJY29uVmlzaWJsZSA9IHRoaXMuY2hlY2tOZXh0SWNvbigpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=