var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as easingPatterns from './easing-patterns';
import { getContainer, getOffset } from './util';
import Vue from 'vue';
export default function goTo(_target, _settings) {
    if (_settings === void 0) {
        _settings = {};
    }
    var settings = __assign({ container: document.scrollingElement || document.body || document.documentElement, duration: 500, offset: 0, easing: 'easeInOutCubic', appOffset: true }, _settings);
    var container = getContainer(settings.container);
    if (settings.appOffset) {
        var isDrawer = container.classList.contains('v-navigation-drawer');
        var isClipped = container.classList.contains('v-navigation-drawer--clipped');
        settings.offset += Vue.prototype.$vuetify.application.bar;
        if (!isDrawer || isClipped)
            settings.offset += Vue.prototype.$vuetify.application.top;
    }
    var startTime = performance.now();
    var targetLocation = getOffset(_target) - settings.offset;
    var startLocation = container.scrollTop;
    if (targetLocation === startLocation)
        return Promise.resolve(targetLocation);
    var ease = typeof settings.easing === 'function'
        ? settings.easing
        : easingPatterns[settings.easing];
    if (!ease)
        throw new TypeError("Easing function \"" + settings.easing + "\" not found.");
    // tslint:disable-next-line:promise-must-complete
    return new Promise(function (resolve) {
        return requestAnimationFrame(function step(currentTime) {
            var timeElapsed = currentTime - startTime;
            var progress = Math.abs(settings.duration ? Math.min(timeElapsed / settings.duration, 1) : 1);
            container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress));
            if (progress === 1 || container.clientHeight + container.scrollTop === container.scrollHeight) {
                return resolve(targetLocation);
            }
            requestAnimationFrame(step);
        });
    });
}
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map