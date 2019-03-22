var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
export function genPoints(points, boundary, type) {
    var minX = boundary.minX, minY = boundary.minY, maxX = boundary.maxX, maxY = boundary.maxY;
    var normalisedPoints = points.map(function (item) { return (typeof item === 'number' ? item : item.value); });
    var totalPoints = normalisedPoints.length;
    var maxValue = Math.max.apply(Math, __spread(normalisedPoints)) + 1;
    var minValue = Math.min.apply(Math, __spread(normalisedPoints));
    if (minValue)
        minValue -= 1;
    var gridX = (maxX - minX) / (totalPoints - 1);
    if (type === 'bar')
        gridX = maxX / totalPoints;
    var gridY = (maxY - minY) / (maxValue - minValue);
    return normalisedPoints.map(function (value, index) {
        return {
            x: minX + index * gridX,
            y: maxY -
                (value - minValue) * gridY +
                +(index === totalPoints - 1) * 0.00001 -
                +(index === 0) * 0.00001,
            value: value
        };
    });
}
//# sourceMappingURL=core.js.map
//# sourceMappingURL=core.js.map
//# sourceMappingURL=core.js.map
//# sourceMappingURL=core.js.map