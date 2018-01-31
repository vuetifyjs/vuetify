export default {
  header: '아바타 (Avatar)',
  headerText: '`v-avatar` 컴포넌트는 프로필 사진등을 보여줄때 이미지 크기를 자동으로 조절하고(responsive), 테두리를 둥글게 만들어 줍니다.',
  components: ['v-avatar'],
  examples: [{
    standard: {
      header: '표준 디스플레이 (Standard display)',
      desc: '아바타의 크기는 상황에 맞게 동적으로 조절됩니다. **tile** 변형은 둥근 테두리를 사용하지 않습니다.'
    },
    advanced: {
      header: '고급 사용법 (Advanced usage)',
      desc: '아바타와 다른 컴포넌트를 결합하면 쉽게 아름다운 사용자 인터페이스를 만들 수 있습니다.'
    },
    iconAndText: {
      header: '아이콘과 텍스트 (Icon and Text)',
      desc: '아바타 컴포넌트는 이미지 대신 `v-icon` 컴포넌트와 텍스트도 사용할 수 있습니다. Mix and match functionality to create something unique.'
    }
  }]
}
