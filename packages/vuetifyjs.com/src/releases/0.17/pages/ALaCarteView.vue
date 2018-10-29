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
      section-text Now you will need to require the stylus from the entry point of your application. This is the same place where you're importing Vue and Vuetify (usually <kbd>main.js</kbd> or <kbd>app.js</kbd>):
      markup(lang="js")
        |require('vuetify/src/stylus/app.styl')

    section
      section-header Theming
      section-text Using custom themes with a-la-carte components is done exactly the same way as described on the <router-link to="/style/theme">theme page</router-link>.

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
