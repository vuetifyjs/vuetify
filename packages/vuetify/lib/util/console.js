function createMessage(message, vm, parent) {
    if (parent) {
        vm = {
            _isVue: true,
            $parent: parent,
            $options: vm
        };
    }
    if (vm) {
        // Only show each message once per instance
        vm.$_alreadyWarned = vm.$_alreadyWarned || [];
        if (vm.$_alreadyWarned.includes(message)) return;
        vm.$_alreadyWarned.push(message);
    }
    return '[Vuetify] ' + message + (vm ? generateComponentTrace(vm) : '');
}
export function consoleInfo(message, vm, parent) {
    var newMessage = createMessage(message, vm, parent);
    newMessage != null && console.info(newMessage);
}
export function consoleWarn(message, vm, parent) {
    var newMessage = createMessage(message, vm, parent);
    newMessage != null && console.warn(newMessage);
}
export function consoleError(message, vm, parent) {
    var newMessage = createMessage(message, vm, parent);
    newMessage != null && console.error(newMessage);
}
export function deprecate(original, replacement, vm, parent) {
    consoleWarn('\'' + original + '\' is deprecated, use \'' + replacement + '\' instead', vm, parent);
}
/**
 * Shamelessly stolen from vuejs/vue/blob/dev/src/core/util/debug.js
 */
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
        return c.toUpperCase();
    }).replace(/[-_]/g, '');
};
function formatComponentName(vm, includeFile) {
    if (vm.$root === vm) {
        return '<Root>';
    }
    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
    }
    return (name ? '<' + classify(name) + '>' : '<Anonymous>') + (file && includeFile !== false ? ' at ' + file : '');
}
function generateComponentTrace(vm) {
    if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
            if (tree.length > 0) {
                var last = tree[tree.length - 1];
                if (last.constructor === vm.constructor) {
                    currentRecursiveSequence++;
                    vm = vm.$parent;
                    continue;
                } else if (currentRecursiveSequence > 0) {
                    tree[tree.length - 1] = [last, currentRecursiveSequence];
                    currentRecursiveSequence = 0;
                }
            }
            tree.push(vm);
            vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree.map(function (vm, i) {
            return '' + (i === 0 ? '---> ' : ' '.repeat(5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + '... (' + vm[1] + ' recursive calls)' : formatComponentName(vm));
        }).join('\n');
    } else {
        return '\n\n(found in ' + formatComponentName(vm) + ')';
    }
}
//# sourceMappingURL=console.js.map