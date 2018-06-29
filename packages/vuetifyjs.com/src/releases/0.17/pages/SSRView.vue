<template lang="pug">
  div(class="view")
    v-layout(row)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Overview
          dd(slot="desc")
            p This overview is designed to help you become fluent in <strong>Vuetify's</strong> Vue SSR Template. If you have not already installed the <code>webpack-ssr</code> template, please do so <router-link to="/vuetify/quick-start">in the Quick start</router-link>.
      ad
    section
      section-header Introduction
      section-text This Vue CLI template was designed for performance, seo optimization and usability. This template is configured out of the box for css, sass and stylus pre-processors.
      h6 Folder Structure
      markup(lang="cli")
        | / project
        |   / assets
        |   / build
        |   / components
        |   / mixins
        |   / pages
        |   / router
        |   / static
        |   / store
      section-text
        p The <strong>Build</strong> folder contains all of the webpack specific build configurations for your project. <strong>Src</strong> is where all the development project files reside. Notice that the Webpack-SSR template is out-of-the-box configured to use <a href="https://router.vuejs.org/en/" target="_blank" rel="noopener">Vue Router</a>, <a href="https://vuex.vuejs.org/en/intro.html" target="_blank" rel="noopener">Vuex</a>, and the <a href="https://vuejs.org/v2/guide/ssr.html" target="_blank" rel="noopener">Vue Server Renderer</a>. This will allow you to make simple or complex applications that are not only fast/efficient, but <strong>SEO</strong> friendly.
      section-header Application
      section-text Navigate to the <strong>src</strong> folder and open up <code>App.vue</code>. Vuetify is a semantic-focused framework. The code you write should be easy to remember, and easy to manage. To do this, one of the main components of Vuetify is <code>v-app</code>. This component allows you to define your application layout. This is used in conjunction with <code>v-toolbar</code>, <code>v-navigation-drawer</code>, and <code>v-footer</code>.
      section-text The markup below tells the application that you have a <code>toolbar</code> and <code>footer</code>. Once defined, the content area will be resized to accommodate. For more information on layouts, navigate to the <router-link to="/layouts/pre-defined">Layouts</router-link> section.
      markup(lang="html")
        |&lt;v-app&gt;
        |   &lt;v-toolbar app&gt;
        |     &lt;v-toolbar-logo&gt;Portfolio&lt;/v-toolbar-logo&gt;
        |   &lt;/v-toolbar&gt;
        |   &lt;v-content&gt;
        |     &lt;v-container fluid&gt;
        |       &lt;router-view&gt;&lt;/router-view&gt;
        |     &lt;/v-container&gt;
        |   &lt;/v-content&gt;
        |   &lt;v-footer app&gt;2017&lt;/v-footer&gt;
        |&lt;/v-app&gt;
      h5 Static assets
      section-text Place all statically served assets in <code>static</code>. This can be accessed by referencing <code>/picture.png</code>, for example.
      h5 Components
      section-text The components folder is where your custom components should be placed. Edit the <code>components/_index.js</code> file to have these files automatically bootstrapped for you.
      section-header Routing
      section-text The Webpack-SSR template uses the official Vue Router for controlling application flow. Located in <code>/src/router/index.js</code>, all of your application routes and route logic will be defined here. Inside you will also see a function that allows you to setup dynamically imported pages. This is not required, however, it will help break up your application and only load views that are needed, clearing up space in your eventual bundle output.
      markup(lang="js")
        |routes: [
        |   route('/', 'Welcome'),
        |   route('/inspire', 'Inspire')
        |]
      section-text
        p These routes can be accessed by creating a link to the specified path, or by using Vue Router's <code>&lt;router-link&gt;</code> component. For more information, review the official Vue Router <a href="https://router.vuejs.org/en/" target="_blank" rel="noopener">documentation</a>. The default function assumes you are placing views in the <kbd>/pages</kbd> folder containing <strong>View</strong> on the end of the file. Example <code>HomeView.vue</code>.
      section-header State Control
      section-text
        p State control is managed by the official Vuex library. This Vue plugin follows Facebooks' Reflux design pattern. Navigate to <code>/store/index.js</code>. By default, Vuex is setup to prefetch data for the store before your page is initially rendered. To hook into this functionality, create a <code>preFetch</code> method on your view component.
      markup(lang="js")
        |preFetch (store) {
        |   store.dispatch('GET_USER', 2)
        |}
      section-text
        p This is useful for bootstrapping your application so that any necessary data is available before the initial render.
        p For more information on State Control and Vuex, view the official <a href="https://vuex.vuejs.org/en/intro.html" target="_blank" rel="noopener">documentation</a>.
      section-text
        p Vuetify integrates into Vuex to allow for easy debugging and access to stored properties. You can also use watchers to hook into store states and react when they change. More information can be found <a href="https://vuejs.org/v2/guide/reactivity.html" target="_blank" rel="noopener">here</a>.
      section-header Meta data
      section-text In order to ensure that page specific meta data is viewable when your pages are crawled, you can define your applications page specific information in <code>router/meta.json</code>. This will allow you to set page title, description and keywords for every route. This will automatically be applied for you on page load and change.
      section-header Redirects
      section-text As applications evolve, routes change. If you want to maintain the authority already garnered from bots that index your page, it is best to assign a 301 redirect to the new location. Located in <code>router/301.json</code> you can define 301 redirects for your pages which will automatically be handled for you on page load.

    section
      section-header Web App Support
      section-text Vuetify SSR has support for native Web Applications on smart phones. Also known as progressive web apps, your websites can be saved on the homescreen of a device, allowing it to be usable offline and receive push notifications. For more information on Web App Manifest's, navigate to the <a href="https://developer.mozilla.org/en-US/docs/Web/Manifest" target="_blank" rel="noopener">Mozilla Developer Network</a>. To see a live example, add the Vuetify documentation on your mobile device's homescreen.
</template>
