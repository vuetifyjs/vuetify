---
meta:
  title: Form 表单
  description: 表单组件提供了一个封装器，使输入组件的验证状态的处理和控制变得很容易。
  keywords: 表单，vuetify 表单组件，vue 表单组件，表单验证
related:
  - /components/selects/
  - /components/selection-controls/
  - /components/text-fields/
---

# 表单 (Forms)

在形式验证时，Vuetify有多种集成并保存在功能中。 想要使用第三方验证插件吗？ 在方框中，您可以使用 [Vee-validate](https://github.com/baianat/Vee-validate) and [vuelidate](https://github.com/vuelidate/vuelidate)。

<promoted-ad slug="vuemastery-forms" />

## 使用

内部 `v-form` 组件使得很容易添加验证到表单输入。 所有输入组件都有一个 **规则** prop，它接受不同类型的组 `函数`, `布尔值` 和 `字符串`。 这些允许您指定输入无效的 __ 或 __ 的条件。 每当输入值被更改时，数组中的每个函数将收到新的值，每个数组元素将被评分。 如果函数或数组元素返回 `fals` 或 `字符串`, 验证失败， `字符串` 值将作为错误信息显示。

<example file="v-form/usage" />

## API

- [v-form](/api/v-form)

<inline-api page="components/forms" />

## 示例

### 属性

#### 规则

规则允许您在所有表单组件上应用自定义验证。 这些都是按顺序验证的，每次会显示一个 **个最大** 个错误，所以请确保你相应地排序规则。

<example file="v-form/prop-rules" />

### 其他

#### 提交与验证  & 清除

`v-form`组件有**三个**功能，可以通过在组件上设置<em x-id=“4”>ref</em>来访问。 ref允许我们访问组件的内部方法，例如 `<v-form ref="form">`。 **this.$refs.form.validate()** 将验证所有输入并返回它们是否都有效。 **this.$refs.form.reset()** 将清除所有输入并重置验证错误。 **this.$refs.form.resetValidation()** 将只重置输入验证，不改变他们的状态。

<example file="v-form/misc-validation-with-submit-and-clear" />

#### Vee-validate

**vee-valide** 是一个基于模板的Vue.js验证框架。 [Documentation](https://vee-validate.logaretm.com/v3)

<example file="v-form/misc-vee-validate" />

#### 验证

**vuelidate** 是 Vue.js 一个简单、轻量模型验证的。 [文档](https://vuelidate.netlify.com/)

<example file="v-form/misc-vuelidate" />

<backmatter />
