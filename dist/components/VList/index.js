import { createSimpleFunctional } from '../../util/helpers';
import VList from './VList';
import VListGroup from './VListGroup';
import VListTile from './VListTile';
import VListTileAction from './VListTileAction';
import VListTileAvatar from './VListTileAvatar';
export { VList, VListGroup, VListTile, VListTileAction, VListTileAvatar };
export var VListTileActionText = createSimpleFunctional('v-list__tile__action-text', 'span');
export var VListTileContent = createSimpleFunctional('v-list__tile__content', 'div');
export var VListTileTitle = createSimpleFunctional('v-list__tile__title', 'div');
export var VListTileSubTitle = createSimpleFunctional('v-list__tile__sub-title', 'div');
export default {
    $_vuetify_subcomponents: {
        VList: VList,
        VListGroup: VListGroup,
        VListTile: VListTile,
        VListTileAction: VListTileAction,
        VListTileActionText: VListTileActionText,
        VListTileAvatar: VListTileAvatar,
        VListTileContent: VListTileContent,
        VListTileSubTitle: VListTileSubTitle,
        VListTileTitle: VListTileTitle
    }
};
//# sourceMappingURL=index.js.map