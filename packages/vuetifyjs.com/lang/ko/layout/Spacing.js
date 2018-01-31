export default {
  header: '간격',
  headerText: '새로운 클래스들을 만들지 않고 레이아웃을 업데이트합니다. 간격 도우미들은 요소의 margin이나 padding을 조절하는 데 유용합니다.',
  toc: [
    {
      text: '소개',
      href: 'introduction'
    },
    {
      text: 'How it works',
      href: 'how-it-works'
    },
    {
      text: '예제',
      href: 'examples'
    },
    {
      text: '가로 중앙 정렬',
      href: 'horizontal-centering'
    }
  ],
  howText: '요소에 _0~5_ 의 **margin** 이나 **padding**을 적용합니다. 각 크기의 증가는 일반적인 메테리얼 디자인 간격에 맞추어 디자인 되었습니다. 이 클래스들은 `{속성}{방향}-{크기}` 형식으로 적용됩니다.',
  propertyText: '_속성_ 은 다음과 같은 간격의 유형에 적용됩니다',
  properties: [
    '`m` - `margin`에 적용',
    '`p` - `padding`에 적용'
  ],
  directionText: '_방향_ 은 속성이 적용되는 방향입니다.',
  directions: [
    '`t` - `margin-top` 이나 `padding-top`의 속성에 적용',
    '`b` - `margin-bottom` 이나 `padding-bottom`의 속성에 적용',
    '`l` - `margin-left` 이나 `padding-left`의 속성에 적용',
    '`r` - `margin-right` 이나 `padding-right`의 속성에 적용',
    '`x` - `*-left` 과 `*-right`에 둘다 적용',
    '`y` - `*-top` 과 `*-bottom`에 둘다 적용'
  ],
  sizeText: '_크기_ 는 해당 속성의 크기를 조절합니다.',
  sizes: [
    '`0` - `margin` 이나 `padding` 을 `0`으로 설정하여 해당 속성을 제거합니다.',
    '`1` - `margin` 이나 `padding` 의 값을 `$spacer * .25`로 설정',
    '`2` - `margin` 이나 `padding` 의 값을 `$spacer * .5`로 설정',
    '`3` - `margin` 이나 `padding` 의 값을 `$spacer`로 설정',
    '`4` - `margin` 이나 `padding` 의 값을 `$spacer * 1.5`로 설정',
    '`5` - `margin` 이나 `padding` 의 값을 `$spacer * 3`로 설정'
  ],
  horizontalHeader: '가로 중앙 정렬',
  horizontalText: '`.mx-auto` 클래스로 너비가 정해진 블럭 요소를 가로 중앙 정렬 할 수 있습니다..'
}
