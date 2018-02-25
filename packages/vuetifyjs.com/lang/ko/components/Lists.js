export default {
  header: '리스트 (List)',
  headerText: '`v-list` 컴포넌트는 정보를 표시하는데 사용됩니다. 이는 아바타, 컨텐츠, 액션, 서브헤더 그리고 많은 것을 포함합니다. 리스트는 자식들을 가질 수 있고 사이드바에서 사용될 수도 있습니다.',
  components: [
    'v-list',
    'v-list-tile',
    'v-list-tile-title',
    'v-list-tile-sub-title',
    'v-list-tile-content',
    'v-list-tile-action',
    'v-list-tile-avatar',
    'v-list-group',
    'v-list-tile-action-text'
  ],
  examples: [{
    avatarTwoLines: {
      header: 'Avatar with 2 lines',
      desc: '리스트는 리스트 아이템의 배열을 취할 수 있습니다. 배열이 주어지면 리스트 컴포넌트는 이 배열에 기반하여 필요한 클래스를 알아 냅니다. 또한 아이템 배열 안에서 헤더나 구분자(디바이더)를 정의할 수도 있습니다.'
    },
    avatarTitleAndAction: {
      header: '아바타와 타이틀/액션 (Avatar with title and action)',
      desc: '리스트는 더 명시적인 접근을 위해 슬롯을 가지고 있습니다. 만약 이 접근방식을 택한다면, 정확한 간격(spacing)을 위해 추가적인 props을 반드시 제공해야 한다는 점을 기억하세요. 예를 들어 아바타를 가진 타일(tile)의 경우 반드시 `avatar` 프로퍼티를 제공해야합니다.'
    },
    iconTwoLinesAndAction: {
      header: '두 줄 아이콘과 액션 (Icon with 2 lines and action)',
      desc: '리스트는 서브헤더, 구분자 그리고 하나의 또는 여러 라인을 포함할 수 있습니다. The subtitle will overflow with ellipsis if it extends past one line.'
    },
    avatarThreeLines: {
      header: '세 줄 아바타 (Avatar with 3 lines)',
      desc: '세 줄 단위 리스트에서, 서브타이틀은 세로로 두번째 줄에 고정(clamp)되고 나머지는 생략표시(ellipsis) 됩니다. 만약 3줄 이상이 필요하다면 [카드(card)](/ko/components/cards)를 쓰는 것을 권장합니다.'
    },
    avatarSubheaderTitleAndAction: {
      header: '아바타와 타이틀/액션',
      desc: '리스트 슬롯을 사용할 경우, 반드시 헤더를 포함할지를 혹은 아이템들이 아바타를 포함할 것인지를 정의해야합니다. 이는 적당한 간격 조정을 위해 필요합니다.'
    },
    subheadingsAndDividers: {
      header: '서브헤더와 구분자 (Subheadings and dividers)',
      desc: '리스트는 복수의 서브헤더와 구분자를 포함할 수 있습니다.'
    },
    cardList: {
      header: '카드이미지와 툴바/리스트 (Card image with toolbar and list)',
      desc: '리스트를 카드와 결합할 수 있습니다.'
    },
    titleSubtitleActionsAndActionText: {
      header: '타이틀과 서브타이틀/액션/액션-텍스트 (Title with sub-title, actions and action-text)',
      desc: '리스트는 액션안에 스택(stack)을 포함할 수 있습니다. A list can contain a stack within an action. Ripple and router props can be passed through the main v-list, to the v-list-tile or as a property in the items array.'
    },
    actionTitleAndSubtitle: {
      header: '액션과 타이틀/서브타이틀 (Action with title and sub-title)',
      desc: '리스트는 3줄까지 포함할 수 있습니다.'
    },
    expansionLists: {
      header: '확장 리스트 (Expansion Lists)',
      desc: '리스트는 클릭할때 보여지는 아이템 그룹을 가질 수 있습니다. 확장리스는 또한 `네비게이션 서랍(navigation drawer)` 컴포넌트 안에서도 사용됩니다.'
    }
  }],
  props: {
    avatar: '한줄짜리 리스트 아이템에서 최소 타일높이',
    dense: '리스트 타일에서 최대 높이를 낮춤',
    expand: '명시적으로 닫을때만 접음(collapse)',
    subheader: '탑 패딩(top padding)을 제거. 앞선 형제(previous sibling)이 헤더일 경우 사용',
    threeLine: '3줄 리스트 아이템에서 리스트 타일의 높이를 증가',
    twoLine: '2줄 리스트 아이템에서 리스트 타일의 높이를 증가',
    inactive: '리스트 타일이 to/herf prop을 가지고 있거나 @click 핸들러를 가지고 있어도 링크로 렌더링 되지 않음'
  }
}
