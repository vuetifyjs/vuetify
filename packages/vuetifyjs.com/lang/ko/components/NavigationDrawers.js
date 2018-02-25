export default {
  header: '탐색 서랍 (Navigation drawer)',
  headerText: '`v-navigation-drawer` 컴포넌트는 사용자가 어플리케이션 내에서 탐색(navigate) 할 때 활용할 수 있습니다. 탐색 서랍은 (**vue-router** 를 사용하거나 사용하지 않고) 바로 쓸 수 있도록 미리 설정되어 있습니다.',
  components: ['v-navigation-drawer'],
  examples: [{
    permanent: {
      header: '기본값 (Default)',
      desc: '탐색 서랍은 어플리케이션의 여러 페이지들에 대한 링크를 모아 놓는데 사용합니다.'
    },
    permanentClipped: {
      header: '색깔이 있는 서랍 (Colored drawer)',
      desc: '탐색 서랍은 어떤 어플리케이션 디자인에도 적합하게 커스터마이즈 될 수 있습니다. 어떤 컴포넌트든 서랍 안에 사용할 수 있는데 주로 사용하게 되는 컴포넌트는 `v-list` 와 모든 **list** 의 자식 컴포넌트, 그리고 `v-divder`일 겁니다.'
    },
    permanentFloating: {
      header: '영구적인 떠 있는 서랍 (Permanent floating drawer)',
      desc: '탐색 서랍은 카드안에 위치해서 컨탠츠 배경 위로 떠 있을 수 있습니다.'
    },
    persistent: {
      header: '아바타 (Avatars)',
      desc: '서랍 안에 `v-list` 를 사용할 수 있기 때문에, 커스터마이즈 된 대시보드를 쉽게 만들 수 있습니다.'
    },
    mini: {
      header: '미니 (Mini)',
      desc: '탐색 서랍은 또한 `vini-variant.sync` prop을 사용하여 제어하는 미니-변형을 가지고 있습니다.'
    },
    temporary: {
      header: '임시 (Temporary)',
      desc: '임시 서랍은 어플리케이션 위에 위치하고, 백그라운를 어둡게 가리는 현수막(scrim)을 사용합니다. 이 서랍의 동작방식은 모바일에서의 영구적 서랍을 흉내낸 것입니다. 서랍의 바깥을 클릭하면 서랍이 닫힙니다. '
    },
    dark: {
      header: '다크 테마 (Dark theme)',
      desc: 'Vuetify 는 또한 어두운(dark) 어플리케이션 테마를 지원합니다. 하지만 기본테마를 사용하는 컴포넌트의 설정을 덮어쓰지 않기 때문에 일부 경우 수동으로 어두운 테마 액센트(accent)를 설정해야 할 수도 있습니다.',
      uninverted: true
    }
  }],
  props: {
    absolute: 'Mixins.Positionable.props.absolute',
    clipped: 'A clipped drawer rests under the application toolbar',
    disableResizeWatcher: '모바일과 데스크탑에서 서랍의 크기가 재조정 될 경우 자동으로 서랍을 열거나 닫습니다.',
    disableRouteWatcher: '라우트가 변경될때 서랍을 열지 않습니다.',
    fixed: 'Mixins.Positionable.props.fixed',
    floating: 'A floating drawer has no visible container (no border-right)',
    hideOverlay: '오버레이를 감춥니다. (Hide the display of the overlay)',
    miniVariantWidth: '`mini` 프롭이 활성화 될때, 너비를 지정',
    miniVariant: '밀집된 탐색 서랍 너비. **.sync** 변경자 사용 가능. 서랍을 클릭하면 서랍이 다시 열림',
    permanent: '스크린 크기와 상관없이 서랍을 보이게 만듬',
    right: '탐색 서랍을 오른쪽에 위치',
    stateless: '모든 자동 상태 기능(크기변화, 모바일, 라우트)을 제거하고 서랍의 상태를 수동으로 제어',
    temporary: '어플리케이션 위에 자리하고, 배경을 어둡게 가림.',
    touchless: '모바일 터치 기능을 비활성화'
  }
}
