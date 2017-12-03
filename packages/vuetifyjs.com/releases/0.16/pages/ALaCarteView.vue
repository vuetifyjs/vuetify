<template lang="pug">
  doc-view#a-la-carte-view
    v-layout(row wrap)
      v-flex(xs12 sm8 xl12)
        section-def
          dt(slot="title") Single component importing
          dd(slot="desc") Being a component framework, Vuetify will always grow horizontally. Depending on your project requirements, <strong>package size</strong> may be heavily scrutinized and important for your particular use-case. Vuetify allows you to easily import only what you need, drastically lowering its footprint.
      ad
    v-alert(value color="warning" icon="priority_high").mb-4 The implementation details for this feature will very likely change drastically in future versions. The <strong>a-la-carte</strong> feature should be considered to be in <strong>beta</strong>
    v-alert(value color="info" icon="info").mb-4 For a pre-built project demonstrating single component imports, install the <strong>a-la-carte</strong> template from the cli, using the command <code>vue init vuetifyjs/a-la-carte</code>. Some of our other templates also include options for enabling a-la-carte components.
    section
      section-header Importing components
      section-text
      section-text The <code>transform-imports</code> package is not necessary to use a-la-carte components, but simplifies the process of importing them, and is therefore highly recommended.
      markup(lang="bash")
        |npm install --save-dev babel-plugin-transform-imports
        |# or
        |yarn add --dev babel-plugin-transform-imports

      section-text When using the <code>transform-imports</code> package, you will need to add the following to the plugins section of your <kbd>.babelrc</kbd> file.
      markup(lang="js")
        |["transform-imports", {
        |   "vuetify": {
        |     "transform": "vuetify/es5/components/${member}",
        |     "preventFullImport": true
        |   }
        |}]

      section-text To import and use components, use the following code in your entry point.
      markup(lang="js")
        |import {
        |  Vuetify,
        |  VApp,
        |  VNavigationDrawer,
        |  VFooter,
        |  VList,
        |  VBtn
        |} from 'vuetify'
        |
        |Vue.use(Vuetify, {
        |  components: {
        |    VApp,
        |    VNavigationDrawer,
        |    VFooter,
        |    VList,
        |    VBtn
        |  }
        |})

      v-alert(value color="info" icon="info").mb-4 The options object that you pass as the second argument to <code>Vue.use</code> can also include both a <strong>directives</strong> and a <strong>transitions</strong> property.

      section-text If you are not using the <code>transform-imports</code> package, you will need to import each component like this
      markup(lang="js")
        |import Vuetify from 'vuetify/es5/components/Vuetify'
        |import VApp from 'vuetify/es5/components/VApp'
        |import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer'
        |// etc

      v-alert(value color="error" icon="warning").mb-4 Be aware that both the <code>Vuetify</code> and <code>VApp</code> components are required to use Vuetify.

    section
      section-header Required styles
      section-text In order to obtain all the required styles, we need to import them in <strong>stylus</strong>. In order for webpack to handle this, you will need to install <code>stylus</code> and the <code>stylus-loader</code> from npm.
      markup(lang="bash")
        |npm install --save-dev stylus stylus-loader
        |# or
        |yarn add --dev stylus stylus-loader
      v-alert(value color="info" icon="info").mb-4 For a more detailed explanation on how to setup your application to handle stylus, please navigate to the <router-link to="/style/theme" class="white--text">theme page</router-link>.
      section-text Now you will need a main entry point for the stylus file. Even if you don't use/understand stylus, don't worry! Just create a <kbd>main.styl</kbd> file in your assets directory. Once created, open it and add this line:
      markup(lang="stylus")
        |@import '../../node_modules/vuetify/src/stylus/app'

      section-text Keep in mind that the beginning <code>'../../node_modules'</code> of the path may differ in your project.

    section
      section-header Theming
      section-text In order to use a-la-carte components with custom color themes you will need to install the <code>vuetify-loader</code> package.

      markup(lang="bash")
        |npm install --save-dev vuetify-loader
        |# or
        |yarn add --dev vuetify-loader

      section-text Next, you will need to edit your webpack configuration to use the vuetify loader for all <code>.styl</code> files. The following is an example configuration from the <code>a-la-carte</code> template.
      markup(lang="cli")
        |{
        |  test: /\.styl$/,
        |  loader: ['style-loader', 'css-loader', 'stylus-loader', {
        |    loader: 'vuetify-loader',
        |    options: {
        |      theme: resolve('./src/stylus/theme.styl')
        |    }
        |  }]
        |}

      section-text The file you specify in the <strong>theme</strong> option will be included at the top of every <code>.styl</code> file so that your theme colors will be correctly set for all components. See below for an example of such a file.
      markup(lang="stylus")
        |@import '../../node_modules/vuetify/src/stylus/settings/_colors'
        |
        |$theme := {
        |  primary: $green.darken-2
        |  accent: $red.accent-2
        |  secondary: $cyan.darken-3
        |  info: $blue.base
        |  warning: $amber.base
        |  error: $red.base
        |  success: $purple.base
        |}

</template>

<script>
  export default {
    data: () => ({
      plugins: [
        { name: 'vuetify-loader', href: 'https://www.npmjs.com/package/vuetify-loader' },
        { name: 'babel-plugin-transform-imports', href: 'https://www.npmjs.com/package/babel-plugin-transform-imports' },
      ]
    })
  }
</script>
