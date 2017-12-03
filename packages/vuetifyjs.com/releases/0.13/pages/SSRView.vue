<template lang="pug">
  div(class="view")
    v-layout(column-xs row-sm)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Overview
          dd(slot="desc")
            p This overview is designed to help you become fluent in <strong>Vuetify's</strong> Vue SSR Template. If you have not already installed the <code>webpack-ssr</code> template, please do so <router-link to="/quick-start#webpack-ssr">here</router-link>.
      ad
    v-alert(error value="true").mb-4 This guide is currently deprecated. It applies to a previous version of the Webpack-SSR template.
    section
      section-header Introduction
      section-text This Vue CLI template was designed for performance, seo optimization and usability. This template is configured out of the box for css, sass and stylus pre-processors. It also utilizes <code>buble</code> with webpack's buble-loader.
      h6 Folder Structure
      markup(lang="cli")
        | / project
        |   / build
        |     - setup-dev-server.js
        |     - vue-loader.config.js
        |     - webpack.base.config.js
        |     - webpack.client.config.js
        |     - webpack.server.config.js
        |   / dist
        |   / public
        |   / src
        |     / css
        |       - main.css
        |     / components
        |     / router
        |       - index.js
        |     / sass
        |       - main.scss
        |     / store
        |       - index.js
        |     / stylus
        |       - main.styl
        |     / views
        |     - app.js
        |     - App.vue
        |     - client-entry.js
        |     - index.template.html
        |     - server-entry.js
        |   - .gitignore
        |   - README.md
        |   - package.json
        |   - server.js
      section-text 
        p The <strong>Build</strong> folder contains all of the webpack specific build configurations for your project. <strong>Src</strong> is where all the development project files reside. Notice that the Webpack-SSR template is out-of-the-box configured to use <a href="https://router.vuejs.org/en/" target="_blank" rel="noopener">Vue Router</a>, <a href="https://vuex.vuejs.org/en/intro.html" target="_blank" rel="noopener">Vuex</a>, and the <a href="https://vuejs.org/v2/guide/ssr.html" target="_blank" rel="noopener">Vue Server Renderer</a>. This will allow you to make simple or complex applications that are not only fast/efficient, but <strong>SEO</strong> friendly.
      h3 Application
      section-text
        p Navigate to the <strong>src</strong> folder and open up <code>App.vue</code>. Vuetify is a semantic-focused framework. The code you write should be easy to remember, and easy to manage. To do this, one of the main components of Vuetify is <code>v-app</code>. This component allows you to define your application layout. This is used in conjunction with <code>v-toolbar</code>, <code>v-sidebar</code>, <code>v-content</code> and <code>v-footer</code>.
        p The markup below tells the application that you have a <code>top toolbar</code> and <code>footer</code>. Once defined, the content area will be resized to accommodate. For more information on layouts, navigate to the <router-link to="/layouts">Layouts</router-link> section.
      markup(lang="html")
        |&lt;v-app top-toolbar footer&gt;
        |   &lt;header&gt;
        |     &lt;v-toolbar&gt;
        |       &lt;v-toolbar-logo&gt;Portfolio&lt;/v-toolbar-logo&gt;
        |     &lt;/v-toolbar&gt;
        |   &lt;/header&gt;
        |   &lt;main&gt;
        |     &lt;v-content&gt;
        |       &lt;v-container&gt;
        |         &lt;router-view&gt;&lt;/router-view&gt;
        |       &lt;/v-container&gt;
        |     &lt;/v-content&gt;
        |   &lt;/main&gt;
        |   &lt;v-footer&gt;2016&lt;/v-footer&gt;
        |&lt;/v-app&gt;
      h3 Routing
      section-text The Webpack-SSR template uses the official Vue Router for controlling application flow. Located in <code>/src/route/index.js</code>, all of your application routes and route logic will be defined here.
      markup(lang="js")
        |routes: [
        |   { path: '/', component: HomeView },
        |   { path: '/about', component: AboutView }
        |]
      section-text
        p These routes can be accessed by creating a link to the specified path, or by using Vue Router's <code>&lt;router-link&gt;</code> component. For more information, review the official Vue Router <a href="https://router.vuejs.org/en/" target="_blank" rel="noopener">documentation</a>.
      h3 State Control
      section-text
        p State control is managed by the official Vuex library. This Vue plugin follows Facebooks' Reflux design pattern. Navigate to <code>/src/store/index.js</code>. By default, Vuex is setup to prefetch data for the store before your page is initially rendered. To hook into this functionality, create a <code>preFetch</code> method on your view component.
      markup(lang="js")
        |preFetch (store) {
        |   store.dispatch('GET_USER', 2)
        |}
      section-text
        p This is useful for bootstrapping your application so that any necessary data is available before the initial render.
        p For more information on State Control and Vuex, view the official <a href="https://vuex.vuejs.org/en/intro.html" target="_blank" rel="noopener">documentation</a>.
      section-text
        p Vuetify integrates into Vuex to allow for easy debugging and access to stored properties. You can also use watchers to hook into store states and react when they change. More information can be found <a href="https://vuejs.org/v2/guide/reactivity.html" target="_blank" rel="noopener">here</a>.
      h3 Meta Data
      section-text In order to ensure that page specific meta data is viewable when your pages are crawled, you can return an object containing <code>title</code>, <code>description</code> and <code>keywords</code>.
      markup(lang="js")
        |preFetch (store) {
        |   store.dispatch('GET_USER', 2)
        |&nbsp;
        |   return {
        |     title: 'Title',
        |     description: 'Description',
        |     keywords: 'keyword, keyword'
        |   }
        |}
      section-text
        p While this takes care of initial render meta data, it is a good experience for a user when they change a page within your application to have the title change with it
        p This can be done by publishing an event to the Vuetify <code>bus</code>. This is the same functionality that is hooked into by the Webpack-SSR template when the pages are being initially rendered.
        P Here is an example of a way that you can handle this:

      markup(lang="js")
        |// App.vue
        |export default {
        |   methods: {
        |     view (meta) {       
        |       this.$store.commit('vuetify/TITLE', meta.title)
        |       this.$store.commit('vuetify/DESCRIPTION', meta.description)
        |       this.$store.commit('vuetify/KEYWORDS', meta.keywords)
        |     }
        |   }
        |}
        |&nbsp;
        |// View.vue
        |export default {
        |   mounted () {
        |     this.$emit('view', this.meta())
        |   },
        |   preFetch () {
        |     return this.methods.meta()
        |   },
        |   methods: {
        |     meta () {
        |       return {
        |         title: 'Vuetify',
        |         description: 'A Vue JS Framework',
        |         keywords: 'vue, vuetify'
        |       }
        |     }
        |   }
        |}
      section-text In the example above, we emit an event that is captured on <code>&lt;router-view v-on:view="view"&gt;</code>. In our view, we have a meta method that is used by the router on view change, and the server for preFetching data. This allows pages to have proper meta information for crawling, but also change when the user is navigating to a different page.

    section
      section-header Web App Support
      section-text Vuetify SSR has support for native Web Applications on smart phones. Also known as progressive web apps, your websites can be saved on the homescreen of a device, allowing it to be usable offline and receive push notifications. For more information on Web App Manifest's, navigate to the <a href="https://developer.mozilla.org/en-US/docs/Web/Manifest" target="_blank" rel="noopener">Mozilla Developer Network</a>. To see a live example, add the Vuetify documentation on your mobile device's homescreen.
</template>

<script>
  export default {
    mounted () {
      this.$emit('view', this.meta())
    },

    preFetch () {
      return this.methods.meta()
    },

    methods: {
      meta () {
        return {
          h1: 'Server Side Rendering',
          title: 'Server Side Rendering | Vuetify.js',
          description: 'Learn how to setup your first Vue SSR application with Vuetify.js\'s Webpack template',
          keywords: 'vue cli, vue template, vue ssr, vuetify ssr'
        }
      }
    }
  }
</script>
