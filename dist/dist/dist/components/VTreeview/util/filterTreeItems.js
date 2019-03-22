import { getObjectValueByPath } from '../../../util/helpers';
export function filterTreeItem(item, search, textKey) {
    var text = getObjectValueByPath(item, textKey);
    return text.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1;
}
export function filterTreeItems(filter, item, search, idKey, textKey, childrenKey, excluded) {
    if (filter(item, search, textKey)) {
        return true;
    }
    var children = getObjectValueByPath(item, childrenKey);
    if (children) {
        var match = false;
        for (var i = 0; i < children.length; i++) {
            if (filterTreeItems(filter, children[i], search, idKey, textKey, childrenKey, excluded)) {
                match = true;
            }
        }
        if (match)
            return true;
    }
    excluded.add(getObjectValueByPath(item, idKey));
    return false;
}
//# sourceMappingURL=filterTreeItems.js.map
//# sourceMappingURL=filterTreeItems.js.map
//# sourceMappingURL=filterTreeItems.js.map