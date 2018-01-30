export default {
  header: '文本框',
  headerText: '文本框组件用于收集用户提供的信息。',
  components: ['v-text-field'],
  supplemental: ['MaskTable'],
  examples: [{
    label: {
      header: '带标签',
      desc: '文本框组件有两个主题选项，亮色和暗色。'
    },
    singleLine: {
      header: '单行亮色主题',
      desc: '单行文本框的标签不会浮动到焦点或数据之上。'
    },
    icon: {
      header: '带图标',
      desc: '图标可以指定为预加或附加。'
    },
    multiLine: {
      header: '多行',
      desc: '多行文本框在需要大量文本输入时很有用。'
    },
    characterCounter: {
      header: '字符计数器',
      desc: '使用计数器通知用户字符限制，计数器本身不执行任何验证，您需要将其与内部验证系统或第三方库配对。'
    },
    password: {
      header: '密码输入',
      desc: '密码输入可以用附加图标以及回调一起控制密码的可见性。'
    },
    validation: {
      header: '验证',
      desc: 'Vuetify包含简单的验证通过使用 `rules` 属性，这个属性接受一个回调函数组，在验证规则时，当前的 v-model 值将被传递给回调函数，这个回调函数必须返回 `ture` 或 `String` 或者错误信息。'
    },
    fullWidthWithCharacterCounter: {
      header: '带计数器的全宽文本框',
      desc: '全宽文本框允许你创建一个不限制输入的文本框，在下面的例子中，我们是用 `v-divider` 来分隔文本框。'
    },
    requiredFields: {
      header: '必填字段',
      desc: '在这个例子中两个文本输入框是必填的，我们利用 **required** 属性为必填项设置星号并验证这些字段。'
    },
    hint: {
      header: '提示文本',
      desc: '在文本框组件使用 **hint** 来设置将提示的文本添加到文本字段下。使用 **persistent-hint** 保持提示文本在文本字段未被聚焦时保持可见性。'
    },
    prefixesAndSuffixes: {
      header: '前缀和后缀',
      desc: ' **prefix** 和 **suffix** 属性允许你在文本字段旁添加一段不可修改的文本。'
    },
    customValidation: {
      header: '自定义验证',
      desc: '虽然内置的 `v-form` 组件以及第三方插件比如 <a href="https://github.com/monterail/vuelidate" target="_blank" rel="noopener">vuelidate</a> or <a href="https://github.com/logaretm/vee-validate" target="_blank" rel="noopener">vee-validation</a> 可以帮助你简化验证过程，但你仍可以简单的自行控制它。'
    },
    textarea: {
      header: '多行文本框',
      desc: '多行文本框有一个可选样式。',
      uninverted: true
    },
    box: {
      header: '盒子样式',
      desc: '文本框可以使用替代的样式设计，但是这种模式下不支持附加或者前置图标属性。'
    },
    solo: {
      header: 'Solo style',
      desc: 'Text-fields can be used with an alternative solo design.'
    },
    customColors: {
      header: '自定义颜色',
      desc: '你可以将文本框的颜色更改为 Material design 调色板中的任何颜色。下面是带验证的自定义表单的示例实现。'
    },
    masks: {
      header: '掩码',
      desc: '文本框可以验证字符掩码，使用预制或自定义规则，你可以选择格式化和验证特定的字符集。'
    },
    progressBar: {
      header: '进度条',
      desc: '你可以用一个进度条来替换下划线，你可以使用与文本框具有相同颜色的默认的不确定进度的进度条，你也可以使用 `progress` 插槽来自定义进度条。'
    }
  }],
  props: {
    autoGrow: '自动增长输入，需要使用 **v-model**',
    autofocus: '启用自动聚焦',
    box: '应用备用输入框样式',
    counter: '为输入长度创建一个计数器，如果未指定数字，则默认为25，不会应用任何验证。',
    fullWidth: '指定输入框为全屏宽度。',
    multiLine: '转为多行文本框',
    prefix: '显示前缀',
    rows: 'Textarea 的行数',
    suffix: '显示后缀',
    textarea: 'Textarea 使用备用样式',
    toggleKeys: '切换输入键值的数组（如果支持切换的话）',
    type: '设置输入类型'
  }
}
