export default {
  header: '概述',
  headerText: '作为一个组件框架，Vuetify将持续水平成长。但根据您的项目，可能只需要一个小的**安装包体积**。所以单组件（原文以为区别于套餐的点菜）系统使您能够选择要导入的组件， _大幅度降低_ 您的构建体积。**如果您已经安装了“单点菜单”模版，则可以跳到[指南](/guides/a-la-carte#application)**。',
  headerText2: '为了展示单个组件导入的预构建项目，可以使用命令`vue init vuetifyjs/a-la-carte`从cli安装**a-la-carte**模版。我们的一些其他模版还包括启用点菜组建的选项，更多信息位于[快速入门](/getting-started/quick-start)',
  importHeader: ' 组件导入',
  importText1: '`transform-imports`包不需要使用点菜组件，但是简化了导入他们的过程，所以**非常**值得推荐。它允许您在导入组件时使用更简洁的语法。',
  alert2: '请记住，`Vuetify`和`VApp`组件都需要使用Vuetify',
  alert3: '被您作为第二个参数传递给`Vue.use`的选项对象也可以同时包含 _directives_ 和 _transitions_ 属性。',
  importText2: '如果您没有使用transform-imports包，则需要像这样导入每个组件：',
  importText3: '您也可以在.vue文件中导入组件，如下所示。',
  styleHeader: '所需要的样式',
  styleText1: '为了获得所需要的样式，我们需要将它们导入到stylus中。而为了webpack来处理这个，你需要从**npm**安装`stylus` 和`stylus-loader`。',
  alert4: '有关如何是指应用程序以处理stylus的更详细说明，请导航至[主题页](/style/themes)。',
  styleText2: '现在您需要从应用程序的入口点开始使用stylus，跟您导入Vue和Vuetify的地方一样(通常是`main.js`或者 `app.js`)。请记住，在您的主`App.vue`中这样做会导致加载速度慢，因为当您进行更新的时候它会被重新处理。',
  applicationHeader: '应用程序',
  applicationText1: '导航到**src**文件夹并打开`main.js`，我们看到在模版中有一些组件已经配置好加载。',
  applicationText2: '例如下面的代码中告诉我们的应用程序中，您使用了一个`<v-app>`、`<v-navigation-drawer>`、`<v-footer>`和`<v-toolbar>`的应用程序，一旦定义，标记可以在任何.vue文件中使用。',
  componentNameListHeader: 'UI组件名列表',
  componentNameListText1: '一些组件如`VLayout`和`VFlex`处于其它组件的原因，在这种环境下是`VGrid`。想要知道需要导入哪个组建，可以查看下表。',
  toc: [
    {
      text: '概述',
      href: 'introduction'
    },
    {
      text: '组件导入',
      href: 'importing-components'
    },
    {
      text: '所需要的样式',
      href: 'required-styles'
    },
    {
      text: '应用程序',
      href: 'application'
    },
    {
      text: 'UI组件名称列表',
      href: 'component-name-list'
    },
  ]
}
