export default {
  header: 'Display',
  headerText: '디스플레이 헬퍼들로 컨텐츠의 디스플레이를 조절할 수 있습니다. 여기에는 현재 뷰포트 또는 실제 요소의 표시 유형에 따라 조건부로 보여주는 것이 포함됩니다.',
  toc: [
    {
      text: '소개',
      href: 'introduction'
    },
    {
      text: 'Visibility',
      href: 'visibility'
    },
    {
      text: 'Display',
      href: 'display'
    },
    {
      text: '예제',
      href: 'examples'
    }
  ],
  visibilityHeader: 'Visibility',
  visibilityText: '현재의 **뷰포트**에 따라 조건부로 보여줍니다. 클래스 형식은 `hidden-{breakpoint}-{condition}` 입니다.`',
  breakpointText: '_breakpoint_ 는 뷰포트의 크기입니다.',
  breakpoints: [
    '`xs` - extra small devices 아주 작은 장치',
    '`sm` - small devices 작은 장치',
    '`md` - medium devices 중간 장치',
    '`lg` - large devices 큰 장치',
    '`xl` - extra large 아주 큰 장치'
  ],
  conditionText: '_condition_ applies the class base on:',
  conditions: [
    '`only` - `xs` 에서 `xl` 까지 해당 부포트 크기에서만 숨깁니다.',
    '`and-down` - `sm`에서 `lg`까지 해당 브레이크포인트보다 작거나 같은 크기에서 요소를 숨깁니다.',
    '`and-up` - `sm` 에서 `lg` 까지 해당 브레이크포인트보다 크거나 같은 크기에서 요소를 숨깁니다.'
  ],
  displayHeader: 'Display',
  displayText: '요소의 `display` 속성을 지정합니다. 클래스 형식은 `d-{display}` 입니다.',
  displays: [
    '`d-inline-flex` - 요소의 display 속성을 `inline-flex` 로 정합니다.',
    '`d-flex` - 요소의 display 속성을 `flex` 로 정합니다.',
    '`d-inline-block` - 요소의 display 속성을 `inline-block` 으로 저앟ㅂ니다.',
    '`d-block` - 요소의 display 속성을 `block` 으로 정합니다.',
    '`d-inline` - 요소의 display 속성을 `inline` 으로 정합니다.'
  ]
}
