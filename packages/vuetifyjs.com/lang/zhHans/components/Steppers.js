export default {
  header: '步骤线',
  headerText: '`v-stepper` 组件用于显示步骤进度。',
  components: [
    'v-stepper',
    'v-stepper-step',
    'v-stepper-content',
    'v-stepper-header'
  ],
  examples: [{
    example: {
      header: '示例',
      desc: '一个步骤组件适用于多种场景，包括购物车、创建记录等等。'
    },
    editable: {
      header: '可编辑步骤',
      desc: '用户随时可以选择可编辑的步骤并将跳转到该步。'
    },
    nonEditable: {
      header: '不可编辑步骤',
      desc: '不可编辑步骤（Non-editable steps）强制用户在整个流程中进行线性处理。'
    },
    optional: {
      header: '可选步骤',
      desc: '可选步骤可由子文本调出。'
    },
    horizontal: {
      header: '水平步骤线',
      desc: '水平步骤线可以让用户定义沿x轴移动的步骤。'
    },
    vertical: {
      header: '垂直步骤线',
      desc: '垂直步骤线可以让用户定义沿y轴移动的步骤。其他地方与水平方向的一致。'
    },
    linear: {
      header: '线性步骤',
      desc: '线性步骤始终沿着你定义的路径移动。'
    },
    nonLinear: {
      header: '非线性步骤',
      desc: '非线性步骤可以让用户按照自己选择路线在流程中移动。'
    },
    alternateLabels: {
      header: '备用标签',
      desc: '步骤组件也有一个放置在步骤下方的备用标签样式。'
    },
    error: {
      header: '多行表示的错误状态',
      desc: '可以显示错误状态来通知用户必须采取的一些行动。'
    },
    alternateError: {
      header: '备用标签样式的多行错误状态显示',
      desc: '错误状态的显示同样可以应用于备用标签样式。'
    },
    verticalError: {
      header: '垂直的多行错误状态显示',
      desc: '同样的，错误状态也可以应用于垂直的步骤。'
    },
    dynamic: {
      header: '动态步骤',
      desc: '步骤可以动态的添加和移除，如果删除的是当前处于激活状态的步骤，请务必通过更改应用模型来解决这个问题。'
    }
  }],
  props: {
    altLabels: '将标签置于步骤的下方',
    complete: '标志一步完成',
    completeIcon: '标志一步完成时的图标显示',
    editable: '表示步骤可编辑',
    editIcon: '步骤可编辑时的图标显示',
    errorIcon: '步骤错误时的图标显示',
    nonLinear: '允许用户跳过任意一步',
    vertical: '垂直显示步骤线',
    'v-stepper-step': {
      step: '要在步骤圈内显示的内容'
    },
    'v-stepper-content': {
      step: '设置步骤关联的内容'
    }
  }
}
