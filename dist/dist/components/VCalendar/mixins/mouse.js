import Vue from 'vue';
export default Vue.extend({
    name: 'mouse',
    methods: {
        getDefaultMouseEventHandlers: function (suffix, getEvent) {
            var _a;
            return this.getMouseEventHandlers((_a = {},
                _a['click' + suffix] = { event: 'click' },
                _a['contextmenu' + suffix] = { event: 'contextmenu', prevent: true, result: false },
                _a['mousedown' + suffix] = { event: 'mousedown' },
                _a['mousemove' + suffix] = { event: 'mousemove' },
                _a['mouseup' + suffix] = { event: 'mouseup' },
                _a['mouseenter' + suffix] = { event: 'mouseenter' },
                _a['mouseleave' + suffix] = { event: 'mouseleave' },
                _a['touchstart' + suffix] = { event: 'touchstart' },
                _a['touchmove' + suffix] = { event: 'touchmove' },
                _a['touchend' + suffix] = { event: 'touchend' },
                _a), getEvent);
        },
        getMouseEventHandlers: function (events, getEvent) {
            var _this = this;
            var on = {};
            var _loop_1 = function (event_1) {
                var eventOptions = events[event_1];
                if (!this_1.$listeners[event_1])
                    return "continue";
                // TODO somehow pull in modifiers
                var prefix = eventOptions.passive ? '&' : ((eventOptions.once ? '~' : '') + (eventOptions.capture ? '!' : ''));
                var key = prefix + eventOptions.event;
                var handler = function (e) {
                    var mouseEvent = e;
                    if (eventOptions.button === undefined || (mouseEvent.buttons > 0 && mouseEvent.button === eventOptions.button)) {
                        if (eventOptions.prevent) {
                            e.preventDefault();
                        }
                        if (eventOptions.stop) {
                            e.stopPropagation();
                        }
                        _this.$emit(event_1, getEvent(e));
                    }
                    return eventOptions.result;
                };
                if (key in on) {
                    if (Array.isArray(on[key])) {
                        on[key].push(handler);
                    }
                    else {
                        on[key] = [on[key], handler];
                    }
                }
                else {
                    on[key] = handler;
                }
            };
            var this_1 = this;
            for (var event_1 in events) {
                _loop_1(event_1);
            }
            return on;
        }
    }
});
//# sourceMappingURL=mouse.js.map
//# sourceMappingURL=mouse.js.map