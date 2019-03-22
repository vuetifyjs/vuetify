var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Mixins
import Colorable from '../../mixins/colorable';
// Utilities
import mixins from '../../util/mixins';
import { genPoints } from './helpers/core';
import { genPath } from './helpers/path';
export default mixins(Colorable).extend({
    name: 'VSparkline',
    props: {
        autoDraw: Boolean,
        autoDrawDuration: {
            type: Number,
            default: 2000
        },
        autoDrawEasing: {
            type: String,
            default: 'ease'
        },
        autoLineWidth: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'primary'
        },
        fill: {
            type: Boolean,
            default: false
        },
        gradient: {
            type: Array,
            default: function () { return ([]); }
        },
        gradientDirection: {
            type: String,
            validator: function (val) { return ['top', 'bottom', 'left', 'right'].includes(val); },
            default: 'top'
        },
        height: {
            type: [String, Number],
            default: 75
        },
        labels: {
            type: Array,
            default: function () { return ([]); }
        },
        lineWidth: {
            type: [String, Number],
            default: 4
        },
        padding: {
            type: [String, Number],
            default: 8
        },
        smooth: {
            type: [Boolean, Number, String],
            default: false
        },
        showLabels: Boolean,
        type: {
            type: String,
            default: 'trend',
            validator: function (val) { return ['trend', 'bar'].includes(val); }
        },
        value: {
            type: Array,
            default: function () { return ([]); }
        },
        width: {
            type: [Number, String],
            default: 300
        },
        labelSize: {
            type: [Number, String],
            default: 7
        }
    },
    data: function () { return ({
        lastLength: 0
    }); },
    computed: {
        parsedPadding: function () {
            return Number(this.padding);
        },
        parsedWidth: function () {
            return Number(this.width);
        },
        totalBars: function () {
            return this.value.length;
        },
        _lineWidth: function () {
            if (this.autoLineWidth && this.type !== 'trend') {
                var totalPadding = this.parsedPadding * (this.totalBars + 1);
                return (this.parsedWidth - totalPadding) / this.totalBars;
            }
            else {
                return Number(this.lineWidth) || 4;
            }
        },
        boundary: function () {
            var height = Number(this.height);
            return {
                minX: this.parsedPadding,
                minY: this.parsedPadding,
                maxX: this.parsedWidth - this.parsedPadding,
                maxY: height - this.parsedPadding
            };
        },
        hasLabels: function () {
            return Boolean(this.showLabels ||
                this.labels.length > 0 ||
                this.$scopedSlots.label);
        },
        parsedLabels: function () {
            var labels = [];
            var points = this.points;
            var len = points.length;
            for (var i = 0; labels.length < len; i++) {
                var item = points[i];
                var value = this.labels[i];
                if (!value) {
                    value = item === Object(item)
                        ? item.value
                        : item;
                }
                labels.push(__assign({}, item, { value: String(value) }));
            }
            return labels;
        },
        points: function () {
            return genPoints(this.value.slice(), this.boundary, this.type);
        },
        textY: function () {
            return this.boundary.maxY + 6;
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: function () {
                var _this = this;
                this.$nextTick(function () {
                    if (!_this.autoDraw || _this.type === 'bar')
                        return;
                    var path = _this.$refs.path;
                    var length = path.getTotalLength();
                    if (!_this.fill) {
                        path.style.transition = 'none';
                        path.style.strokeDasharray = length + ' ' + length;
                        path.style.strokeDashoffset = Math.abs(length - (_this.lastLength || 0)).toString();
                        path.getBoundingClientRect();
                        path.style.transition = "stroke-dashoffset " + _this.autoDrawDuration + "ms " + _this.autoDrawEasing;
                        path.style.strokeDashoffset = '0';
                    }
                    else {
                        path.style.transformOrigin = 'bottom center';
                        path.style.transition = 'none';
                        path.style.transform = "scaleY(0)";
                        path.getBoundingClientRect();
                        path.style.transition = "transform " + _this.autoDrawDuration + "ms " + _this.autoDrawEasing;
                        path.style.transform = "scaleY(1)";
                    }
                    _this.lastLength = length;
                });
            }
        }
    },
    methods: {
        genGradient: function () {
            var _this = this;
            var gradientDirection = this.gradientDirection;
            var gradient = this.gradient.slice();
            // Pushes empty string to force
            // a fallback to currentColor
            if (!gradient.length)
                gradient.push('');
            var len = Math.max(gradient.length - 1, 1);
            var stops = gradient.reverse().map(function (color, index) {
                return _this.$createElement('stop', {
                    attrs: {
                        offset: index / len,
                        'stop-color': color || _this.color || 'currentColor'
                    }
                });
            });
            return this.$createElement('defs', [
                this.$createElement('linearGradient', {
                    attrs: {
                        id: this._uid,
                        x1: +(gradientDirection === 'left'),
                        y1: +(gradientDirection === 'top'),
                        x2: +(gradientDirection === 'right'),
                        y2: +(gradientDirection === 'bottom')
                    }
                }, stops)
            ]);
        },
        genG: function (children) {
            return this.$createElement('g', {
                style: {
                    fontSize: '8',
                    textAnchor: 'middle',
                    dominantBaseline: 'mathematical',
                    fill: this.color || 'currentColor'
                }
            }, children);
        },
        genLabels: function () {
            if (!this.hasLabels)
                return undefined;
            return this.genG(this.parsedLabels.map(this.genText));
        },
        genPath: function () {
            var radius = this.smooth === true ? 8 : Number(this.smooth);
            return this.$createElement('path', {
                attrs: {
                    id: this._uid,
                    d: genPath(this.points.slice(), radius, this.fill, Number(this.height)),
                    fill: this.fill ? "url(#" + this._uid + ")" : 'none',
                    stroke: this.fill ? 'none' : "url(#" + this._uid + ")"
                },
                ref: 'path'
            });
        },
        genText: function (item, index) {
            var children = this.$scopedSlots.label
                ? this.$scopedSlots.label({ index: index, value: item.value })
                : item.value;
            return this.$createElement('text', {
                attrs: {
                    x: item.x,
                    y: this.textY
                }
            }, [children]);
        },
        genBar: function () {
            if (!this.value || this.totalBars < 2)
                return undefined;
            var _a = this, width = _a.width, height = _a.height, parsedPadding = _a.parsedPadding, _lineWidth = _a._lineWidth;
            var viewWidth = width || this.totalBars * parsedPadding * 2;
            var viewHeight = height || 75;
            var boundary = {
                minX: parsedPadding,
                minY: parsedPadding,
                maxX: Number(viewWidth) - parsedPadding,
                maxY: Number(viewHeight) - parsedPadding
            };
            var props = __assign({}, this.$props);
            props.points = genPoints(this.value, boundary, this.type);
            var totalWidth = boundary.maxX / (props.points.length - 1);
            props.boundary = boundary;
            props.lineWidth = _lineWidth || (totalWidth - Number(parsedPadding || 5));
            props.offsetX = 0;
            if (!this.autoLineWidth) {
                props.offsetX = ((boundary.maxX / this.totalBars) / 2) - boundary.minX;
            }
            return this.$createElement('svg', {
                attrs: {
                    width: '100%',
                    height: '25%',
                    viewBox: "0 0 " + viewWidth + " " + viewHeight
                }
            }, [
                this.genGradient(),
                this.genClipPath(props.offsetX, props.lineWidth, 'sparkline-bar-' + this._uid),
                this.hasLabels ? this.genBarLabels(props) : undefined,
                this.$createElement('g', {
                    attrs: {
                        transform: "scale(1,-1) translate(0,-" + boundary.maxY + ")",
                        'clip-path': "url(#sparkline-bar-" + this._uid + "-clip)",
                        fill: "url(#" + this._uid + ")"
                    }
                }, [
                    this.$createElement('rect', {
                        attrs: {
                            x: 0,
                            y: 0,
                            width: viewWidth,
                            height: viewHeight
                        }
                    })
                ])
            ]);
        },
        genClipPath: function (offsetX, lineWidth, id) {
            var _this = this;
            var maxY = this.boundary.maxY;
            var rounding = typeof this.smooth === 'number'
                ? this.smooth
                : this.smooth ? 2 : 0;
            return this.$createElement('clipPath', {
                attrs: {
                    id: id + "-clip"
                }
            }, this.points.map(function (item) {
                return _this.$createElement('rect', {
                    attrs: {
                        x: item.x + offsetX,
                        y: 0,
                        width: lineWidth,
                        height: Math.max(maxY - item.y, 0),
                        rx: rounding,
                        ry: rounding
                    }
                }, [
                    _this.autoDraw ? _this.$createElement('animate', {
                        attrs: {
                            attributeName: 'height',
                            from: 0,
                            to: maxY - item.y,
                            dur: _this.autoDrawDuration + "ms",
                            fill: 'freeze'
                        }
                    }) : undefined
                ]);
            }));
        },
        genBarLabels: function (props) {
            var _this = this;
            var offsetX = props.offsetX || 0;
            var children = props.points.map(function (item) { return (_this.$createElement('text', {
                attrs: {
                    x: item.x + offsetX + _this._lineWidth / 2,
                    y: props.boundary.maxY + (Number(_this.labelSize) || 7),
                    'font-size': Number(_this.labelSize) || 7
                }
            }, item.value.toString())); });
            return this.genG(children);
        },
        genTrend: function () {
            return this.$createElement('svg', this.setTextColor(this.color, {
                attrs: {
                    'stroke-width': this._lineWidth || 1,
                    width: '100%',
                    height: '25%',
                    viewBox: "0 0 " + this.width + " " + this.height
                }
            }), [
                this.genGradient(),
                this.genLabels(),
                this.genPath()
            ]);
        }
    },
    render: function (h) {
        if (this.totalBars < 2)
            return undefined;
        return this.type === 'trend'
            ? this.genTrend()
            : this.genBar();
    }
});
//# sourceMappingURL=VSparkline.js.map