<template lang="pug">
  views-doc
    section#usage
      helpers-section-head(value="Generic.Pages.usage")
      helpers-section-text(value="Framework.Icons.usageText1")

      helpers-markup(lang="js")
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | Vue.use(Vuetify, {
        |   iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
        | })

      helpers-section-text(value="Framework.Icons.usageText2")

    section#installing-fonts
      helpers-section-head(value="Framework.Icons.installHeader")
      helpers-section-text(value="Framework.Icons.installText1")

      helpers-section-subheader(value="Framework.Icons.installMD")
      helpers-section-text(value="Framework.Icons.installMDText1")

      helpers-markup(lang="html")
        | &lt;link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet"&gt;

      helpers-section-text(value="Framework.Icons.installMDText2")

      helpers-markup(lang="cli")
        | $ yarn add material-design-icons-iconfont -D
        | // or
        | $ npm install material-design-icons-iconfont -D

      helpers-section-text(value="Framework.Icons.installMDText3")

      helpers-markup(lang="js")
        | // main.js
        | import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | Vue.use(Vuetify)

      helpers-section-subheader(value="Framework.Icons.installMDI")

      helpers-markup(lang="cli")
        | $ yarn add @mdi/font -D
        | // or
        | $ npm install @mdi/font -D

      helpers-section-text(value="Framework.Icons.installMDIText1")

      helpers-markup(lang="js")
        | // app.js
        | import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | Vue.use(Vuetify)

      helpers-section-subheader(value="Framework.Icons.installFA")
      p Coming soon
      helpers-section-subheader(value="Framework.Icons.installFA4")
      p Coming soon

    section#using-custom-icons
      helpers-section-head(value="Framework.Icons.customIconsHeader")
      helpers-section-text(value="Framework.Icons.customIconsText1")

      helpers-markup(lang="js")
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | Vue.use(Vuetify, {
        |   iconfont: 'fa',
        |   icons: {
        |     'cancel': 'fas fa-ban',
        |     'menu': 'fas fa-ellipsis-v'
        |   }
        | })

      helpers-section-text(value="Framework.Icons.customIconsText2")

      helpers-markup(lang="js")
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | const MY_ICONS = {
        |   'complete': '',
        |   'cancel': '',
        |   'close': '',
        |   'delete': '', // delete (e.g. v-chip close)
        |   'clear': '',
        |   'success': '',
        |   'info': '',
        |   'warning': '',
        |   'error': '',
        |   'prev': '',
        |   'next': '',
        |   'checkboxOn': '',
        |   'checkboxOff': '',
        |   'checkboxIndeterminate': '',
        |   'delimiter': '', // for carousel
        |   'sort': '',
        |   'expand': '',
        |   'menu': '',
        |   'subgroup': '',
        |   'dropdown': '',
        |   'radioOn': '',
        |   'radioOff': '',
        |   'edit': ''
        | }
        |
        | Vue.use(Vuetify, {
        |   icons: MY_ICONS
        | })

    section#reusable-custom-icons
      helpers-section-head(value="Framework.Icons.reusableHeader")
      helpers-section-text(value="Framework.Icons.reusableText1")

      helpers-markup(lang="js")
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | Vue.use(Vuetify, {
        |   iconfont: 'mdi',
        |   icons: {
        |     'product': 'mdi-dropbox',
        |     'support': 'mdi-lifebuoy',
        |     'steam': 'mdi-steambox',
        |     'pc': 'mdi-desktop-classic',
        |     'xbox': 'mdi-xbox',
        |     'playstation': 'mdi-playstation',
        |     'switch': 'mdi-nintendo-switch'
        |   }
        | })

      helpers-section-text(value="Framework.Icons.reusableText2")

      helpers-markup(lang="vue")
        | &lt;template&gt;
        |   &lt;v-icon&gt;$vuetify.icons.product&lt;/v-icon&gt;
        |
        |   &lt;v-icon v-text="'$vuetify.icons.support'"&gt;&lt;/v-icon&gt;
        |
        |   &lt;v-icon v-html="'$vuetify.icons.steam'"&gt;&lt;/v-icon&gt;
        |
        |   &lt;v-icon v-text="system"&gt;&lt;/v-icon&gt;
        | &lt;/template&gt;
        |
        | &lt;script&gt;
        |   export default {
        |     data: () => ({
        |       user: {
        |         name: 'John Leider',
        |         platform: 'pc'
        |       }
        |     }),
        |
        |     computed: {
        |       platform () {
        |         return '$vuetify.icons.' + user.platform
        |       }
        |     }
        |   }
        | &lt;/script&gt;

    section#custom-components
      helpers-section-head(value="Framework.Icons.customComponentHeader")
      helpers-section-text(value="Framework.Icons.customComponentText1")

      helpers-markup(lang="vue")
        | &lt;template&gt;
        |   &lt;div class="my-component"&gt;
        |     &lt;v-icon v-text="icon"&gt;&lt;/v-icon&gt;
        |     &lt;slot&gt;&lt;/slot&gt;
        |   &lt;/div&gt;
        | &lt;/template&gt;
        |
        | &lt;script&gt;
        |   export default {
        |     props: {
        |       icon: {
        |         type: String,
        |         default: '$vuetify.icons.cancel'
        |       }
        |     }
        |   }
        | &lt;/script&gt;

</template>
