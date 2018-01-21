export default {
  header: '主题',
  headerText: '以编程的方式可以轻松的更爱应用程序的颜色，可以根据您的特定需求来重新构建默认的样式表以及自定义框架的各个方面。如果您正在寻找**主题生成器**，请导航到[这里](/theme-generator)。',
  lightAndDarkHeader: '明亮和暗黑',
  lightAndDarkText1: 'Vuetify支持Material Design规范中的**明亮**和**暗黑**变量。这个名称从根应用程序组件`v-app`开始，并被大多数组件支持。默认情况下，您的应用程序将使用**明亮**主题，但是通过添加**dark**属性就可以很容易地复写这个主题。',
  lightAndDarkText2: '当你指定一个组件是明亮或者暗黑时，除非另有说明，它的所有子组件都会继承和应用相同的主题设置。由于css的特殊性，一些组合（certain combinations）可能会提示您未嵌套的子项手动分配 _主题_。使用**暗黑**主题时，最有可能发生这种情况。',
  customizingHeader: '自定义化',
  customizingText1: '默认情况下，Vuetify具有适用于所有组件的标准主题。',
  customizingText2: '这也可以很容易地修改。只需简单地将**theme**属性传递给`Vue.use`函数即刻。您可以选择修改全部或仅部分主题属性，其余部分会继承默认配置。',
  customizingText3: '您也可以使用预定义的material色彩。',
  customizingText4: '在引擎盖下，Vuetify将会根据这些可以在DOM中访问的值生成CSS类。这些类将遵循与其他辅助器类相同的标记，例如`primary`或者`secondary--text`。',
  customizingText5: '这些值会在**theme**属性下的**$vuetify**对象示例中可用。这可以让您动态地修改您的主题，Vuetify将在后台重新生成并更新您的主题类，无缝更新您的应用程序。',
  stylusHeader: '修改Stylus的变量',
  stylusText1: 'Vuetify建立在**stylus**的顶部，类似于**scss**，您可以更改变量并重新编译样式文件，可用变量的列表在[这里](https://github.com/vuetifyjs/vuetify/blob/master/src/stylus/settings/_variables.styl)。为了重新构建stylus文件，您需要配置您的应用程序以支持。如果您正在使用[快速入门](/getting-started/quick-start)指南，则可以跳过下一节。',
  stylusHeader2: '安装stylus-loader到Webpack',
  stylusText2: '在命令行执行：',
  stylusText3: '这将安装导入和解析stylus文件所需的依赖包。安装完成后，打开您的webpack配置并且加入一个stylus的规则（rule）。对于基于**SSR**的应用程序，请确保导入操作是在您的`client-entry`中.',
  stylusText4: '在您的源码（src）目录（或相应资源文件目录）创建一个名叫`stylus`的文件夹。它将作为导入和重建默认Vuetify样式的入口点。一单创建，打开.styl文件并添加此条目。',
  stylusText5: '请记住，node_modules的相对位置可能在您的项目中有所不同，请相应地进行调整。建议导入被定位在主应用程序的`index.js`或`client-entry.js`文件。 **不要**导入您的`main.styl`到一个组件内，否则 _将会_ 导致性能问题并大大减慢**HMR**（模块重新热加载）。',
  stylusText6: '确定导入位置之后，如果要在Index文件中使用一个`<link>`标签来请求Vuetify样式表，您应该可以看到所有样式都在正常工作。',
  stylusHeader3: '改变值',
  stylusText7: '现在stylus是已经配置好了，您可以为需要改变的stylus变量设置默认值。这些必须在导入 _之前_ 声明，它们将会自动覆盖Vuetify的默认值。',
  toc: [
    {
      text: '主题',
      href: 'introduction'
    },
    {
      text: '明亮和暗黑',
      href: 'light-and-dark'
    },
    {
      text: '自定义化',
      href: 'customizing'
    },
    {
      text: '修改Stylus的变量',
      href: 'stylus-guide'
    }
  ]
}
