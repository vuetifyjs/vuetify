// For converting XYZ to sRGB
var srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];
// Forward gamma adjust
var srgbForwardTransform = function srgbForwardTransform(C) {
    return C <= 0.0031308 ? C * 12.92 : 1.055 * Math.pow(C, 1 / 2.4) - 0.055;
};
// For converting sRGB to XYZ
var srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];
// Reverse gamma adjust
var srgbReverseTransform = function srgbReverseTransform(C) {
    return C <= 0.04045 ? C / 12.92 : Math.pow((C + 0.055) / 1.055, 2.4);
};
function clamp(value) {
    return Math.max(0, Math.min(1, value));
}
export function fromXYZ(xyz) {
    var rgb = Array(3);
    var transform = srgbForwardTransform;
    var matrix = srgbForwardMatrix;
    // Matrix transform, then gamma adjustment
    for (var i = 0; i < 3; ++i) {
        rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
    }
    // Rescale back to [0, 255]
    return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0);
}
export function toXYZ(rgb) {
    var xyz = [0, 0, 0];
    var transform = srgbReverseTransform;
    var matrix = srgbReverseMatrix;
    // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
    var r = transform((rgb >> 16 & 0xff) / 255);
    var g = transform((rgb >> 8 & 0xff) / 255);
    var b = transform((rgb >> 0 & 0xff) / 255);
    // Matrix color space transform
    for (var i = 0; i < 3; ++i) {
        xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
    }
    return xyz;
}
//# sourceMappingURL=transformSRGB.js.map