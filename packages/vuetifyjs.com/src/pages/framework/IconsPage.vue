<template lang="pug">
  doc-view
    section#usage
      section-head(value="Generic.Pages.usage")
      section-text(value="Framework.Icons.usageText1")

      markup(lang="js")
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | Vue.use(Vuetify, {
        |   iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
        | })

      section-text(value="Framework.Icons.usageText2")

    section#installing-fonts
      section-head(value="Framework.Icons.installHeader")
      section-text(value="Framework.Icons.installText1")

      section-subheader(value="Framework.Icons.installMD")
      section-text(value="Framework.Icons.installMDText1")

      markup(lang="html")
        | &lt;link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet"&gt;

      section-text(value="Framework.Icons.installMDText2")

      markup(lang="cli")
        | $ yarn add material-design-icons-iconfont -D
        | // or
        | $ npm install material-design-icons-iconfont -D

      section-text(value="Framework.Icons.installMDText3")

      markup(lang="js")
        | // main.js
        | import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | Vue.use(Vuetify)

      section-subheader(value="Framework.Icons.installMDI")

      markup(lang="cli")
        | $ yarn add @mdi/font -D
        | // or
        | $ npm install @mdi/font -D

      section-text(value="Framework.Icons.installMDIText1")

      markup(lang="js")
        | // app.js
        | import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
        | import Vue from 'vue'
        | import Vuetify from 'vuetify'
        |
        | Vue.use(Vuetify)

      section-subheader(value="Framework.Icons.installFA")
      p Coming soon
      section-subheader(value="Framework.Icons.installFA4")
      p Coming soon

    section#using-custom-icons
      section-head(value="Framework.Icons.customIconsHeader")
      section-text(value="Framework.Icons.customIconsText1")

      markup(lang="js")
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

      section-text(value="Framework.Icons.customIconsText2")

      markup(lang="js")
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
      section-head(value="Framework.Icons.reusableHeader")
      section-text(value="Framework.Icons.reusableText1")

      markup(lang="js")
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

      section-text(value="Framework.Icons.reusableText2")

      markup(lang="vue")
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
      section-head(value="Framework.Icons.customComponentHeader")
      section-text(value="Framework.Icons.customComponentText1")

      markup(lang="vue")
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
