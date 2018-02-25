export default {
  props: {
    error: '수동으로 인풋을 에러 상태로 만듬',
    errorMessages: '인풋을 에러 상태로 만들고 커스텀 에러메시지를 전달. **rules** prop에 의해 발생하는 임이의 검증과  결합가능. 이 필드가 검증을 호출하지는 않습니다.',
    rules: 'True나 에러메시지 문자열을 반환하는 함수들의 배열',
    validateOnBlur: 'blur 이벤트까지 검증을 지연'
  }
}
