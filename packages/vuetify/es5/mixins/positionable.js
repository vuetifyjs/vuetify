'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = factory;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _helpers = require('../util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var availableProps = {
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
};
function factory() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return _vue2.default.extend({
    name: 'positionable',
    props: selected.length ? (0, _helpers.filterObjectOnKeys)(availableProps, selected) : availableProps
  });
}
exports.default = factory();
// Add a `*` before the second `/`
/* Tests /
let single = factory(['top']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let some = factory(['top', 'bottom']).extend({
  created () {
    this.top
    this.bottom
    this.absolute
  }
})

let all = factory().extend({
  created () {
    this.top
    this.bottom
    this.absolute
    this.foobar
  }
})
/**/
//# sourceMappingURL=positionable.js.map