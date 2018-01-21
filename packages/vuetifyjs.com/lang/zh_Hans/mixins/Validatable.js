export default {
  props: {
    error: '将输入框设置为手动错误状态。',
    errorMessages: '将输入框置于错误状态，并传入自定义的错误信息。将与来自**规则（rules）**属性的任何验证相结合。这个字段不会触发验证。',
    rules: '返回True或带有错误信息的字符串的函数数组。',
    validateOnBlur: '延迟验证直到失去焦点的事件被触发'
  }
}
