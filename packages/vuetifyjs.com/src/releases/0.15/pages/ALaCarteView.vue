<template lang="pug">
  doc-view#a-la-carte-view
    v-layout(row wrap)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Single component importing
          dd(slot="desc") Being a component framework, Vuetify will always grow horizontally. Depending on your project requirements, <strong>package size</strong> may be heavily scrutinized and important for your particular use-case. Vuetify allows you to easily import only what you need, drastically lowering its footprint.
      ad
    v-alert(value warning).mb-4 The implementation details for this feature will very likely change drastically in future versions. The <strong>a-la-carte</strong> feature should be considered to be in <strong>beta</strong>
    v-alert(value info).mb-4 For a pre-built project demonstrating single component imports, install the <strong>a-la-carte</strong> template from the cli, <code>vue init vuetifyjs/a-la-carte</code>
    section
      section-header Required packages
      section-text In order to properly tree-shake the Vuetify imports, a few npm packages are required:
      ul
        li(
          v-for="plugin in plugins"
          v-bind:key="plugin.text"
        )
          a(
            v-bind:href="plugin.href"
            target="_blank"
            rel="noopener"
            v-text="plugin.name"
          )
      markup(lang="cli")
        |npm install --save-dev babel-plugin-transform-imports
        |npm install --save-dev babel-preset-es2015
        |npm install --save-dev babel-preset-stage-2
        |npm install --save-dev babel-plugin-add-filehash
      div // or
      markup(lang="cli")
        |yarn add --dev babel-plugin-transform-imports
        |yarn add --dev babel-preset-es2015
        |yarn add --dev babel-preset-stage-2
        |yarn add --dev babel-plugin-add-filehash
      section-text Next, we need to tell the transpiler how to handle this plugin. If your project does not already contain a <kbd>.babelrc</kbd> file in the base of your project, simply create the file. Once created, add the following:
      markup(lang="cli")
        |{
        |  "presets": [
        |     ["es2015", {"modules":false}],
        |     ["stage-2"]
        |  ],
        |  "plugins": [
        |    "add-filehash",
        |    ["transform-imports", {
        |        "vuetify": {
        |            "transform": "vuetify/src/components/${member}",
        |            "preventFullImport": true
        |        }
        |    }]
        |  ]
        |}
    section
      v-alert(error value).mb-4 Currently, single component imports are <strong>NOT</strong> supported in <strong>SSR</strong>.
      section-header Webpack configuration
      section-text In order to make sure that Webpack will run the Vuetify source files through the correct loaders, it's necessary to explicitly include the <code>node_modules/vuetify</code> folder for both <code>.vue</code> and <code>.js</code> files.
      markup(lang="js")
        |{
        |  test: /\.vue$/,
        |  loader: 'vue-loader',
        |  options: vueLoaderConfig,
        |  include: [
        |    path.resolve(__dirname, 'src'),
        |    path.resolve(__dirname, 'node_modules/vuetify')
        |  ]
        |},
        |{
        |  test: /\.js$/,
        |  loader: 'babel-loader',
        |  include: [
        |    path.resolve(__dirname, 'src'),
        |    path.resolve(__dirname, 'node_modules/vuetify')
        |  ]
        |}
    section
      section-header Required components
      section-text There are 2 required imports for the package to work when stripped apart. This is <code>Vuetify</code> and <code>VApp</code>.
      markup(lang="js")
        |import Vue from 'vue'
        |import { Vuetify, VApp, VBtn } from 'vuetify'
        |&nbsp;
        |Vue.use(Vuetify, {
        |  components: {
        |     VApp,
        |     VBtn
        |  }
        |})
      section-text After importing the required files, we install the plugin as we would normally. We then supply an object containing a property <code>components</code>, which is an object containing all of the components we use to use.
    section
      section-header Required styles
      section-text In order to obtain all the required styles, we need to import them in <strong>stylus</strong>. In order for webpack to handle this, you will need to install <code>stylus</code> and the <code>stylus-loader</code> from npm.
      markup(lang="cli")
        |npm install --save-dev stylus stylus-loader
        |// or
        |yarn add --dev stylus stylus-loader
      v-alert(value info).mb-4 For a more detailed explanation on how to setup your application to handle stylus, please navigate to the <router-link to="/style/theme" class="white--text">theme page</router-link>.
      section-text Now you will need a main entry point for the stylus file. Even if you don't use/understand stylus, don't worry! Just create a <kbd>main.styl</kbd> file in your assets directory. Once created, open it and add this line:
      markup(lang="stylus")
        |@import '../../node_modules/vuetify/src/stylus/app'
      section-text Keep in mind that the beginning '../../node_modules' may differ in your project. At this point, if you need to modify the theme, you will follow the same guidelines as described in the <router-link to="/style/theme">theme guide</router-link>. The only difference in process would be the import.
      markup(lang="stylus")
        |@require '../../node_modules/vuetify/src/stylus/settings/_colors'
        |&nbsp;
        |$theme := {
        |   primary: $red.darken-2
        |   accent: $red.accent-2
        |   secondary: $grey.lighten-1
        |   info: $blue.lighten-1
        |   warning: $amber.darken-2
        |   error: $red.accent-4
        |   success: $green.lighten-2
        |}
        |&nbsp;
        |// @require '../../node_modules/vuetify/src/stylus/main' replace this
        |@require '../../node_modules/vuetify/src/stylus/app' // with this


</template>

<script>
  export default {
    data: () => ({
      plugins: [
        { name: 'babel-plugin-transform-imports', href: 'https://www.npmjs.com/package/babel-plugin-transform-imports' },
        { name: 'babel-preset-es2015', href: 'https://www.npmjs.com/package/babel-preset-es2015' },
        { name: 'babel-preset-stage-2', href: 'https://www.npmjs.com/package/babel-preset-stage-2' },
        { name: 'babel-plugin-add-filehash', href: 'https://www.npmjs.com/package/babel-plugin-add-filehash' },
      ]
    })
  }
</script>
