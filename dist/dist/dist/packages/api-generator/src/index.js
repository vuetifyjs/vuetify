"use strict";
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m)
        return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length)
                o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var e_1, _a;
var Vue = require('vue');
var Vuetify = require('vuetify');
var fs = require('fs');
var map = require('./map');
var deepmerge = require('deepmerge');
function arrayMerge(a, b) {
    var arr = a.slice();
    var _loop_1 = function (i) {
        var found = a.findIndex(function (item) { return item.name == b[i].name; });
        if (found >= 0) {
            arr[found] = deepmerge(a[found], b[i]);
        }
        else {
            arr.push(b[i]);
        }
    };
    for (var i = 0; i < b.length; i++) {
        _loop_1(i);
    }
    return arr;
}
Vue.use(Vuetify);
function parseFunctionParams(func) {
    var groups = /function\s_.*\((.*)\)\s\{.*/i.exec(func);
    if (groups && groups.length > 1)
        return "(" + groups[1] + ") => {}";
    else
        return 'null';
}
function getPropType(type) {
    if (Array.isArray(type)) {
        return type.map(function (t) { return getPropType(t); });
    }
    if (!type)
        return 'any';
    return type.name.toLowerCase();
}
function getPropDefault(def, type) {
    if (def === '' ||
        (def == null && type !== 'boolean' && type !== 'function')) {
        return 'undefined';
    }
    else if (typeof (def) === 'function' && type !== 'function') {
        def = def.call({});
    }
    if (type === 'boolean') {
        return def ? 'true' : 'false';
    }
    if (type === 'string') {
        return def ? "'" + def + "'" : def;
    }
    if (type === 'function') {
        return parseFunctionParams(def);
    }
    return def;
}
function getPropSource(name, mixins) {
    var source = null;
    for (var i = 0; i < mixins.length; i++) {
        var mixin = mixins[i];
        if (mixin.name !== 'VueComponent')
            mixin = Vue.extend(mixin);
        if (mixin.options.name) {
            var source_1 = Object.keys(mixin.options.props || {}).find(function (p) { return p === name; }) && mixin.options.name;
            var found = getPropSource(name, [mixin.super].concat(mixin.options.extends).concat(mixin.options.mixins).filter(function (m) { return !!m; })) || source_1;
            if (found)
                return hyphenate(found);
        }
    }
    return source;
}
function genProp(name, props, mixins) {
    var prop = props[name];
    var type = getPropType(prop.type);
    var source = getPropSource(name, mixins);
    return {
        name: name,
        type: type,
        default: getPropDefault(prop.default, type),
        source: source
    };
}
function parseComponent(component) {
    return {
        props: parseProps(component),
        mixins: parseMixins(component)
    };
}
function parseProps(component, array, mixin) {
    if (array === void 0) {
        array = [];
    }
    if (mixin === void 0) {
        mixin = false;
    }
    var options = component.options;
    var mixins = [component.super].concat(options.extends).concat(options.mixins).filter(function (m) { return !!m; });
    var props = options.props || {};
    Object.keys(props).forEach(function (prop) {
        var generated = genProp(prop, props, mixins);
        array.push(generated);
    });
    return array.sort(function (a, b) { return a.name > b.name; });
}
function parseMixins(component) {
    if (!component.options.mixins)
        return [];
    var mixins = [];
    for (var i = 0; i < component.options.mixins.length; i++) {
        var mixin = component.options.mixins[i];
        if (mixin.name !== 'VueComponent')
            mixin = Vue.extend(mixin);
        if (mixin.options.name) {
            mixins.push(mixin.options.name);
            if (mixin.options.mixins) {
                mixins = mixins.concat(parseMixins(mixin));
            }
        }
    }
    return mixins.sort(function (a, b) { return a > b; });
}
var components = {};
var directives = {};
var installedComponents = Vue.options._base.options.components;
var installedDirectives = Vue.options._base.options.directives;
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
};
var componentNameRegex = /^(?:V[A-Z]|v-[a-z])/;
for (var name_1 in installedComponents) {
    if (!componentNameRegex.test(name_1))
        continue;
    var component = installedComponents[name_1];
    if (component.options.$_wrapperFor) {
        component = component.options.$_wrapperFor;
    }
    var kebabName = hyphenate(name_1);
    var options = parseComponent(component);
    if (map[kebabName]) {
        options = deepmerge(options, map[kebabName], { arrayMerge: arrayMerge });
    }
    components[kebabName] = options;
}
try {
    for (var _b = __values(['Ripple', 'Resize', 'Scroll', 'Touch']), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value;
        if (!installedDirectives[key])
            continue;
        var lowerCaseVersion = key.toLowerCase();
        var vKey = "v-" + lowerCaseVersion;
        var directive = map[vKey];
        directive.type = getPropDefault(directive.default, directive.type);
        directives[vKey] = directive;
    }
}
catch (e_1_1) {
    e_1 = { error: e_1_1 };
}
finally {
    try {
        if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
    }
    finally {
        if (e_1)
            throw e_1.error;
    }
}
function writeApiFile(obj, file) {
    var stream = fs.createWriteStream(file);
    var comment = "/*\n * THIS FILE HAS BEEN AUTOMATICALLY GENERATED USING THE API-GENERATOR TOOL.\n *\n * CHANGES MADE TO THIS FILE WILL BE LOST!\n */\n\n";
    stream.once('open', function () {
        stream.write(comment);
        stream.write('module.exports = ');
        stream.write(JSON.stringify(obj, null, 2));
        stream.end();
    });
}
function writeJsonFile(obj, file) {
    var stream = fs.createWriteStream(file);
    stream.once('open', function () {
        stream.write(JSON.stringify(obj, null, 2));
        stream.end();
    });
}
function writePlainFile(content, file) {
    var stream = fs.createWriteStream(file);
    stream.once('open', function () {
        stream.write(content);
        stream.end();
    });
}
var tags = Object.keys(components).reduce(function (t, k) {
    t[k] = {
        attributes: components[k].props.map(function (p) { return p.name.replace(/([A-Z])/g, function (g) { return "-" + g[0].toLowerCase(); }); }).sort(),
        description: ''
    };
    return t;
}, {});
var attributes = Object.keys(components).reduce(function (attrs, k) {
    var tmp = components[k].props.reduce(function (a, prop) {
        var type = prop.type;
        if (!type)
            type = '';
        else if (Array.isArray(type))
            type = type.map(function (t) { return t.toLowerCase(); }).join('|');
        else
            type = type.toLowerCase();
        var name = prop.name.replace(/([A-Z])/g, function (g) { return "-" + g[0].toLowerCase(); });
        a[k + "/" + name] = {
            type: type,
            description: ''
        };
        return a;
    }, {});
    return Object.assign(attrs, tmp);
}, {});
var fakeComponents = function (ts) {
    var imports = [
        "import Vue from 'vue'"
    ];
    if (ts)
        imports.push("import { PropValidator } from 'vue/types/options'");
    var inspection = ts ? '' : "// noinspection JSUnresolvedFunction\n";
    return imports.join('\n') + "\n\n" + Object.keys(components).map(function (component) {
        var propType = function (type) {
            if (type === 'any' || typeof type === 'undefined')
                return ts ? 'null as any as PropValidator<any>' : 'null';
            if (Array.isArray(type))
                return "[" + type.map(function (s) { return s.charAt(0).toUpperCase() + s.slice(1); }).join(',') + "]";
            return type.charAt(0).toUpperCase() + type.slice(1);
        };
        var quoteProp = function (name) { return name.match(/-/) ? "'" + name + "'" : name; };
        var componentProps = components[component].props;
        componentProps.sort(function (a, b) {
            if (a.name < b.name)
                return -1;
            return a.name === b.name ? 0 : 1;
        });
        var props = componentProps.map(function (prop) { return "    " + quoteProp(prop.name) + ": " + propType(prop.type); }).join(',\n');
        if (props)
            props = "\n  props: {\n" + props + "\n  }\n";
        return inspection + "Vue.component('" + component + "', {" + props + "})";
    }).join('\n');
};
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', 493);
}
writeJsonFile(tags, 'dist/tags.json');
writeJsonFile(attributes, 'dist/attributes.json');
writePlainFile(fakeComponents(false), 'dist/fakeComponents.js');
writePlainFile(fakeComponents(true), 'dist/fakeComponents.ts');
components['$vuetify'] = map['$vuetify'];
components['internationalization'] = map['internationalization'];
writeApiFile(__assign({}, components, directives), 'dist/api.js');
//# sourceMappingURL=index.js.map