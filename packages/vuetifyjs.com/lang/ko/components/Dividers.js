export default {
  header: '디바이더 (Divider)',
  headerText: '`v-divider` 컴포넌트는 리스트의 섹션을 분리합니다.',
  components: ['v-divider'],
  examples: [{
    fullBleed: {
      header: '풀 블리드 (Full bleed)',
      desc: '풀 블리드 디바이더는 전체 컨텐츠 너비로 확장됩니다.'
    },
    lightAndDark: {
      header: '라이트/다크 (Light and dark)',
      desc: '디바이더는 라이트와 다크 변형이 있습니다.',
      uninverted: true
    },
    inset: {
      header: '삽입형 디바이더 (Inset dividers)',
      desc: '삽입형 디바이더(Inset dividers)는 오른똑으로 72px 치우쳐 있어서 리스트 아이템들과 잘 맞게됩니다.'
    },
    subheaders: {
      header: '서브헤더와 디바이더 (Subheaders and dividers)',
      desc: '서브헤더(Subheaders)는 같은 prop을 사용하는 삽입형 디바이더와 줄이 잘 맞습니다.'
    },
    dividerList: {
      header: '리스트 디바이더',
      desc: '삽입형 디바이더와 서브헤더로 컨텐츠를 나눕니다.'
    },
    dividerListPortrait: {
      header: '새로보기에서의 디바이더',
      desc: '어떤 상황에도 적합한 커스텀 카드를 만듭니다.'
    }
  }],
  props: {
    inset: '들여쓰기(indentation) 추가 (72px)'
  }
}
