<p align="center"><a href="https://vuetifyjs.com" target="_blank"><img width="100"src="https://vuetifyjs.com/public/v.png"></a></p>
<p align="center">Vuetify for Vue.js</p>
<p align="center">
  <a href="https://www.npmjs.com/package/vuetify"><img src="https://img.shields.io/npm/dt/vuetify.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vuetify"><img src="https://img.shields.io/npm/v/vuetify.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vuetify"><img src="https://img.shields.io/npm/l/vuetify.svg" alt="License"></a>
  <a href="https://gitter.im/vuetifyjs"><img src="https://img.shields.io/gitter/room/vuetifyjs/home.svg" alt="Gitter Chat"></a>
</p>
<p>Vuetify.js is a semantic component framework for Vue.js 2. It aims to provide clean, semantic and reusable components that make building your application a breeze. Vuetify.js uses Google's <strong><a href="https://material.io/" target="_blank">Material Design</a></strong> design pattern, taking cues from other popular frameworks such as <a href="http://materializecss.com/" target="_blank">Materialize.css</a>, <a href="https://getmdl.io/" target="_blank">Material Design Lite</a>, <a href="http://semantic-ui.com/" target="_blank">Semantic UI</a> and <a href="https://v4-alpha.getbootstrap.com/" target="_blank">Bootstrap 4</a></p>
<p>Build <i>amazing</i> applications with the power of Vue and Material Design with a massive library of beautifully crafted components. Built for speed, Vuetify components feature an easy-to-remember semantic design that shifts remembering complex classes and markup, to type-as-you speak properties that have simple and clear names.</p
<p>Vuetify.js supports all <strong>modern browsers</strong>, including IE11 and Safari 9+. From mobile to laptop to desktop, you can rest assured that your application will work as expected. Interested in the bleeding edge? Try the vue-cli Webpack SSR (Server side rendered) template and build the ultimate UI.</p>
<p align="center">
  <br><br>
  <strong>Vuetify.js is proudly sponsored by:</strong>
  <br><br>
  <a href="https://www.cloudflare.com" target="_blank">
    <img height="60px" src="https://vuetifyjs.com/static/doc-images/cloudflare.svg">
  </a>
  <br><br>
  <a href="https://www.browserstack.com" target="_blank">
    <img width="300px" src="https://vuetifyjs.com/static/doc-images/browser-stack.svg">
  </a>
  <br><br>
  <a href="https://www.cloudflare.com" target="_blank">
    <img height="60px" src="https://vuetifyjs.com/static/doc-images/cloudflare.svg">
  </a>
  <br><br>
</p>
<p align="center">
  <strong>Looking for Vue.js jobs? Check out <a href="https://vuejobs.com/?ref=vuetify" target="_blank">vuejobs.com</a></strong>
</p>
<hr>
<p align="center">
  <strong>Support Vuetify.js's development with:</strong>
  <br>
  <a href="https://patreon.com/vuetify" target="_blank">
    Patreon
  </a>
  &nbsp;or&nbsp;
  <a href="https://www.paypal.me/vuetify" target="_blank">
    Paypal
  </a>
</p>

## Demo and Documentation

<a href="https://vuetifyjs.com" target="_blank">Documentation</a>

## CDN Quick-start

```html
<!DOCTYPE html>
<html>
<head>
  <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
  <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
</head>
<body>
  <div id="app">
    <v-app>
      <main>
        <v-container>Hello world</v-container>
      </main>
    </v-app>
  </div>

  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
  <script>
    new Vue({ el: '#app' })
  </script>
</body>
</html>
```

## Project Install

``` bash
# npm
npm install vuetify --save-dev
```

``` bash
# yarn
yarn add vuetify --dev
```

## Use

```javascript
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

For including styles, you can either place the below styles in your ```index.html```
```html
<link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
<link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
```
Or you can import it to your webpack entry point
```javascript
require('/path/to/node_modules/vuetify/dist/vuetify.min.css')
```
Keep in mind, you will need to ensure your webpack config contains a css-loader.

## Frequently asked questions and Gotchas
<a href="https://vuetifyjs.com/vuetify/frequently-asked-questions" target="_blank">Frequently asked questions</a>

## Support and Questions
Ask your support questions on the vuetifyjs [gitter](https://gitter.im/vuetifyjs/Lobby/).

## Info
Codepen starter [Vuetify Template](http://codepen.io/johnjleider/pen/bgJOrX)
