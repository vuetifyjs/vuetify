
<p align="center">
  <a href="https://vuetifyjs.com" target="_blank"><img width="100"src="https://vuetifyjs.com/static/doc-images/logo.svg"></a>
</p>

<p align="center">
  <a href="https://travis-ci.org/vuetifyjs/vuetify">
    <img src="https://img.shields.io/travis/vuetifyjs/vuetify.svg" alt="travis ci badge">
  </a>
  <a href="https://codecov.io/gh/vuetifyjs/vuetify">
    <img src="https://img.shields.io/codecov/c/github/vuetifyjs/vuetify.svg" alt="Coverage">
  </a>
  <a href="https://codebeat.co/projects/github-com-vuetifyjs-vuetify-dev">
    <img src="https://codebeat.co/badges/b2d1ce87-848b-440e-9d7e-df9883c0cd93" alt="codebeat badge">
  </a>
  <a href="https://www.npmjs.com/package/vuetify">
    <img src="https://img.shields.io/npm/dm/vuetify.svg" alt="Downloads">
  </a>
  <br>
  <a href="https://www.npmjs.com/package/vuetify">
    <img src="https://img.shields.io/npm/l/vuetify.svg" alt="License">
  </a>
  <a href="https://app.zenhub.com/workspace/o/vuetifyjs/vuetify/boards">
    <img src="https://img.shields.io/badge/Managed_with-ZenHub-5e60ba.svg" alt="zenhub">
  </a>
  <a href="https://chat.vuetifyjs.com">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat">
  </a>
  <br>
  <a href="https://www.npmjs.com/package/vuetify">
    <img src="https://img.shields.io/npm/v/vuetify.svg" alt="Version">
  </a>
  <a href="https://cdnjs.com/libraries/vuetify">
    <img src="https://img.shields.io/cdnjs/v/vuetify.svg" alt="CDN">
  </a>
</p>
<br><br>
<h2 align="center">Supporting Vuetify</h2>
<p>Vuetify is an open source MIT project that has been made possible due to the generous contributions by <a href="https://github.com/vuetifyjs/vuetify/blob/dev/BACKERS.md">community backers</a>. If you are interested in supporting this project, please consider becoming a patron.</p>

<p align="center">
  <a href="https://www.patreon.com/vuetify">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" />
  </a>
</p>

<br><br>
<h3 align="center">Patrons</h3>

<h4 align="center">Diamond</h4>

<p align="center">
  <a href="https://careers.lmax.com/?utm_source=vuetify&utm_medium=github-link&utm_campaign=lmax-careers">
    <img height="70px" src="https://vuetifyjs.com/static/doc-images/backers/lmax-exchange.png">
  </a>
  <a href="http://intygrate.com/?ref=vuetify-github">
    <img height="70px" src="https://vuetifyjs.com/static/doc-images/backers/intygrate.png">
  </a>
</p>

<h4 align="center">Palladium</h4>

<p align="center">
  <a href="http://www.eikospartners.com/?ref=vuetify-github">
    <img height="40px" src="https://vuetifyjs.com/static/doc-images/backers/eikos-partners.webp">
  </a>
  <a href="https://application.rategenius.com/?ref=vuetify-github">
    <img height="40px" src="https://vuetifyjs.com/static/doc-images/backers/rate-genius.png">
  </a>
  <a href="http://quitt.ch/?ref=vuetify-github">
    <img height="40px" src="https://vuetifyjs.com/static/doc-images/backers/quitt.png">
  </a>
</p>

<h2>Introduction</h2>

<p>Vuetify is a semantic component framework for Vue. It aims to provide clean, semantic and reusable components that make building your application a breeze.</p>

<p>Build <i>amazing</i> applications with the power of Vue and Material Design and a massive library of beautifully crafted components. Created according to Google's <strong><a href="https://material.io/" target="_blank">Material Design Spec</a></strong>, Vuetify components feature an easy-to-remember semantic design that shifts remembering complex classes and markup, to type-as-you speak properties that have simple and clear names.</p>

<p>Harness the power of the <a href="https://chat.vuetifyjs.com">Vuetify community</a> and get help 24/7 from talented developers across the world, the dev team and the creator, John Leider. Become a <a href="https://www.patreon.com/vuetify">backer</a> and get access to dedicated support from the team.</p>
  
<p>Vuetify supports all <strong>modern browsers</strong>, including IE11 and Safari 9+. From mobile to laptop to desktop, you can rest assured that your application will work as expected. Interested in the bleeding edge? Try the vue-cli Webpack SSR (Server side rendered) template and build websites optimized for SEO.</p>

<h2>Demo and Documentation</h2>

<a href="https://vuetifyjs.com" target="_blank">Documentation</a>

<h2>One minute Quick-start</h2>

[Codepen link](https://codepen.io/johnjleider/pen/jYZwVZ)
```html
<!DOCTYPE html>
<html>
<head>
  <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
  <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>
<body>
  <div id="app">
    <v-app>
      <v-content>
        <v-container>Hello world</v-container>
      </v-content>
    </v-app>
  </div>

  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
  <script>
    new Vue({
      el: '#app'
    })
  </script>
</body>
</html>
```

<h2>Project Install</h2>

``` bash
# npm
npm install vuetify
```

``` bash
# yarn
yarn add vuetify
```

## Use

```javascript
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

For including styles, you can either place the below styles in your `index.html`
```html
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
<link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
```
Or you can import it to your webpack entry point
```javascript
require('/path/to/node_modules/vuetify/dist/vuetify.min.css')
```
Keep in mind, you will need to ensure your webpack config contains a <a href="https://github.com/webpack-contrib/css-loader" target="_blank">css loader</a>.

## Frequently asked questions and Gotchas
[FAQ Guide](https://vuetifyjs.com/vuetify/frequently-asked-questions)

<h2>Community Support</h2>
Ask your support questions on the vuetifyjs <a href="https://chat.vuetifyjs.com">discord</a>.

<h2>Additional Resources</h2>

- [Codepen starter template](https://template.vuetifyjs.com)
