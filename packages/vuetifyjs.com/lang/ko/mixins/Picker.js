export default {
  props: {
    actions: '피커 내에서 액션을 사용',
    autosave: '자동으로 선택된 값을 저장. 내부적으로 이전의 값을 업데이트하기 때문에 cancel이 클릭되었을때 사용자가 변경한 것을 되돌리지 않음',
    headerColor: '헤더 색상을 정의. 지정되지 않은 경우 <code>color</code> prop이나 기본 피커 색상을 사용',
    landscape: '가로방향 피커',
    noTitle: '피커의 타이틀을 숨김',
    scrollable: '피커에서 마우스 휠을 사용할 수 있도록 설정',
    value: '피커 값'
  }
}
