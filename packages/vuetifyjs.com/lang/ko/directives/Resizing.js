export default {
  header: 'Resize 디렉티브(directive)',
  headerText: '`v-resize` 디렉티브는 윈도우의 크기를 변경할 때 특정 함수를 호출하기 위해 사용됩니다.',
  components: ['v-resize'],
  examples: [{
    default: {
      header: '기본값',
      desc: '윈도우의 크기를 변경하고 변화를 관찰하세요',
      uninverted: true
    }
  }],
  options: {
    'modifiers.quiet': '`v-resize.quiet="callback"` Will **not** automatically invoke the provided callback on bind.',
    'value': '`v-resize="callback"` 윈도우가 리사이즈될 때 호출되는 함수'
  }
}
