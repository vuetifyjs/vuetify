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
import { consoleWarn } from '../../../util/console';
import VCheckbox from '../../VCheckbox';
import VIcon from '../../VIcon';
/* @vue/component */
export default {
    props: {
        sortIcon: {
            type: String,
            default: '$vuetify.icons.sort'
        }
    },
    methods: {
        genTHead: function () {
            var _this = this;
            if (this.hideHeaders)
                return; // Exit Early since no headers are needed.
            var children = [];
            if (this.$scopedSlots.headers) {
                var row = this.$scopedSlots.headers({
                    headers: this.headers,
                    indeterminate: this.indeterminate,
                    all: this.everyItem
                });
                children = [this.hasTag(row, 'th') ? this.genTR(row) : row, this.genTProgress()];
            }
            else {
                var row = this.headers.map(function (o, i) { return _this.genHeader(o, _this.headerKey ? o[_this.headerKey] : i); });
                var checkbox = this.$createElement(VCheckbox, {
                    props: {
                        dark: this.dark,
                        light: this.light,
                        color: this.selectAll === true ? '' : this.selectAll,
                        hideDetails: true,
                        inputValue: this.everyItem,
                        indeterminate: this.indeterminate
                    },
                    on: { change: this.toggle }
                });
                this.hasSelectAll && row.unshift(this.$createElement('th', [checkbox]));
                children = [this.genTR(row), this.genTProgress()];
            }
            return this.$createElement('thead', [children]);
        },
        genHeader: function (header, key) {
            var array = [
                this.$scopedSlots.headerCell
                    ? this.$scopedSlots.headerCell({ header: header })
                    : header[this.headerText]
            ];
            return this.$createElement.apply(this, __spread(['th'], this.genHeaderData(header, array, key)));
        },
        genHeaderData: function (header, children, key) {
            var classes = ['column'];
            var data = {
                key: key,
                attrs: {
                    role: 'columnheader',
                    scope: 'col',
                    width: header.width || null,
                    'aria-label': header[this.headerText] || '',
                    'aria-sort': 'none'
                }
            };
            if (header.sortable == null || header.sortable) {
                this.genHeaderSortingData(header, children, data, classes);
            }
            else {
                data.attrs['aria-label'] += ': Not sorted.'; // TODO: Localization
            }
            classes.push("text-xs-" + (header.align || 'left'));
            if (Array.isArray(header.class)) {
                classes.push.apply(classes, __spread(header.class));
            }
            else if (header.class) {
                classes.push(header.class);
            }
            data.class = classes;
            return [data, children];
        },
        genHeaderSortingData: function (header, children, data, classes) {
            var _this = this;
            if (!('value' in header)) {
                consoleWarn('Headers must have a value property that corresponds to a value in the v-model array', this);
            }
            data.attrs.tabIndex = 0;
            data.on = {
                click: function () {
                    _this.expanded = {};
                    _this.sort(header.value);
                },
                keydown: function (e) {
                    // check for space
                    if (e.keyCode === 32) {
                        e.preventDefault();
                        _this.sort(header.value);
                    }
                }
            };
            classes.push('sortable');
            var icon = this.$createElement(VIcon, {
                props: {
                    small: true
                }
            }, this.sortIcon);
            if (!header.align || header.align === 'left') {
                children.push(icon);
            }
            else {
                children.unshift(icon);
            }
            var pagination = this.computedPagination;
            var beingSorted = pagination.sortBy === header.value;
            if (beingSorted) {
                classes.push('active');
                if (pagination.descending) {
                    classes.push('desc');
                    data.attrs['aria-sort'] = 'descending';
                    data.attrs['aria-label'] += ': Sorted descending. Activate to remove sorting.'; // TODO: Localization
                }
                else {
                    classes.push('asc');
                    data.attrs['aria-sort'] = 'ascending';
                    data.attrs['aria-label'] += ': Sorted ascending. Activate to sort descending.'; // TODO: Localization
                }
            }
            else {
                data.attrs['aria-label'] += ': Not sorted. Activate to sort ascending.'; // TODO: Localization
            }
        }
    }
};
//# sourceMappingURL=head.js.map
//# sourceMappingURL=head.js.map
//# sourceMappingURL=head.js.map