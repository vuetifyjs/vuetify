import { checkCollinear, getDistance, moveTo } from './math';
/**
 * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
 */
export function genPath(points, radius, fill, height) {
    if (fill === void 0) {
        fill = false;
    }
    if (height === void 0) {
        height = 75;
    }
    var start = points.shift();
    var end = points[points.length - 1];
    return ((fill ? "M" + start.x + " " + height + " L" + start.x + " " + start.y : "M" + start.x + " " + start.y) +
        points
            .map(function (point, index) {
            var next = points[index + 1];
            var prev = points[index - 1] || start;
            var isCollinear = next && checkCollinear(next, point, prev);
            if (!next || isCollinear) {
                return "L" + point.x + " " + point.y;
            }
            var threshold = Math.min(getDistance(prev, point), getDistance(next, point));
            var isTooCloseForRadius = threshold / 2 < radius;
            var radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius;
            var before = moveTo(prev, point, radiusForPoint);
            var after = moveTo(next, point, radiusForPoint);
            return "L" + before.x + " " + before.y + "S" + point.x + " " + point.y + " " + after.x + " " + after.y;
        })
            .join('') +
        (fill ? "L" + end.x + " " + height + " Z" : ''));
}
//# sourceMappingURL=path.js.map
//# sourceMappingURL=path.js.map