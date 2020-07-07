---
meta:
  title: Frequently asked questions
  description: Stuck on a problem? Check out the most frequently asked questions by the Vuetify community.
  keywords: frequently asked questions, faq
related:
  - /getting-started/contributing/
  - /professional-support/consulting/
  - /customization/a-la-carte/
---

# Frequently asked questions

Stuck on a particular problem? Check some of these common gotchas before creating a ticket. If you still cannot find what you are looking for, you can submit an [issue](https://issues.vuetifyjs.com/) on Github or ask the in our [community](https://community.vuetifyjs.com/).

<entry-ad />

## Questions

Have a question that belongs here? Tell us in our [Discord Community](https://community.vuetifyjs.com/) or create a request on our [Issue Generator](https://issues.vuetifyjs.com/).

---

* **My application won't compile due to sass / scss errors.**

  Ensure that you are using the proper options object in accordance with your sass-loader version.

```js
// webpack.config.js

module.exports = {
  rules: [
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            fiber: require('fibers'),
            indentedSyntax: true // optional
          },
          // Requires sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
          },
        },
      ],
    },
  ],
}
```

<br>

* **Are there examples on how the v2 grid compares to v1.5?**

  Yes, you can view [grid examples here](https://gist.github.com/johnleider/207f63c9d30fb77042a0bb0258c5ab32).

<br>

* **Error: Cannot find module 'node-sass'.**

  Ensure that your `@vue/cli packages` located in `package.json` are at least **^3.5.0**.

<br>

* **Invalid CSS after @content: expected "}", was "($material-light);".**

  Ensure that you are using `sass` instead of `node-sass` in your **package.json**.

<br>

* **My application is not working.**

  First, ensure that you're using the latest version of Vue.js and Vuetify. Try to reproduce it in codepen using the following [template](https://template.vuetifyjs.com/). If you are unable to reproduce the issue outside of your environment, this usually means the issue resides locally. If you are still unable to resolve your issue, please provide your codepen and issue in **#need-help** in the [community](https://chat.vuetifyjs.com).

<br>

* **I am receiving an err similar to the following:<br>`$attrs is readonly` and/or `$listeners is readonly` in the console.**

  Vuetify utilizes Typescript and currently must import and extend the Vue object. This has the potential in some applications to generate a warning messages. There is currenty an on-going [Github discussion](https://github.com/vuetifyjs/vuetify/issues/4068) with potential work-arounds in a variety of use-cases. If you have additional questions please join us in our [online community](https://community.vuetifyjs.com).

<br>

* **I'm receiving an error similar to the following:<br>Error in ./node_modules/vuetify/src/dir/file.js Module parse "failed": Unexpected token (&lt;lineno&gt;:&lt;characterno&gt;).**

  If you're using an IDE, such as IntelliJ IDEA or WebStorm, it will often add automatic imports pointing to the `vuetify/src/` directory for components you use.  Change the import statement path from `vuetify/src/` to `vuetify/es5/`.

<br>

* **Is there a codepen template with router?**

  Yes. [Vuetify Codepen Router Template](https://codepen.io/johnjleider/pen/PMZvpr).

<br>

* **How do I extend Vuetify components?**

  Vuetify components are easily extendable by importing it and using the `extends` option in vue. [Codepen Example](https://codepen.io/whoistobias/pen/yLNgjwy)

```js
// src/components/ActivateBtn
import { VBtn } from 'vuetify/lib'

export default {
  extends: VBtn,

  methods: {
    // Here we overwrite the genContent method of VBtn
    // to override the default genContent method
    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-btn__contents'
      }, [
        'Activate ',
        this.$slots.default
      ])
    }
  }
}
```

<br>

* **My application does not look correct.**

  Vuetify requires the use of the `v-app` component. It should wrap your entire application and is the center point for much of the framework functionality including themes. Ensure that you are following the proper markup documented in the [Application](/components/application/) page.

<br>

* **Menu/Dialog/Navigation drawer are not opening properly.**

  Ensure that your components are wrapped with a `v-app` element. If you are using an element to activate the component that is not placed into the **activator** slot, ensure that you stop propagation of the click event. These components utilize the **v-outside-click** directive and will immediately close.

<br>

* **The scrollbar is showing even though my content is not overflowing vertically.**

  Vuetify uses a slightly modified version of [ress reset](https://github.com/filipelinhares/ress) which by default turns on the html scrollbar to normalize behavior between browsers. This is a design choice and has been debated numerous times. There are pros and cons to having and not having it and as of now, the vote is in favor of leaving it as is. If you wish to disable this functionality, simply add `html { overflow-y: auto }` to your style file. Find more information on the [CSS Reset](/styles/css-reset/) page.

* **How do I vertically center content?**

  Apply the **fill-height** prop to `v-container`. This helper class normally only adds **height: 100%**, but for the container, it also looks for a child `v-layout` and applies the needed classes to vertically center the content.

<br>

* **My _/_ link is active when I'm on _/home_ page.**

  Add the **exact** to the link that points to absolute /. For more information on this, you can visit the official Vue router [documentation](https://router.vuejs.org/en/api/router-link.html).

<br>

* **Why isn't my application responsive on mobile devices?**

  Ensure that you have the proper meta tags inside of the `<head>` section of your index.html.

```html
<!-- public/index.html -->
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>
</html>
```

<br>

* **How do I use Font Awesome, Material Design Icons or Material Icons?**

  You can find more information in our [icon guide](/customization/icons/).

<br>

* **Why does &lt;v-dialog> close immediately after clicking the button?**

  When not using the **activator** slot for `v-menu` and `v-dialog` for example, you must manually stop the _propagation_ of the click event. To do this, simply add the _.stop_ modifier to the click event.

```html
<!-- Vue Component -->
<template>
  <div>
    <v-dialog v-model="dialog">
      <v-card>...</v-card>
    </v-dialog>

    <v-btn @click.stop="dialog = true">
      Open Dialog
    </v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
    }),
  }
</script>

```

<br>

* **How do I upgrade to the latest version?**

  For a detailed guide on how to upgrade to the latest version, navigate to the [Releases and Migrations](/getting-started/releases-and-migrations/) page. In addition, lll required changes are noted in the **Upgrade Guide** of all releases.

  **Releases**:

  * [Latest](https://github.com/vuetifyjs/vuetify/releases/latest)
  * [v2.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0)
  * [v1.5.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.5.0)
  * [v1.4.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.4.0)
  * [v1.3.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.3.0)
  * [v1.2.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.2.0)
  * [v1.1.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.1.0)
  * [v1.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.0.0)
  * [v0.17.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.17.0)
  * [v0.16.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.16.0)
  * [v0.15.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.15.0)
  * [v0.14.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.14.0)
  * [v0.13.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.13.0)
  * [v0.12.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.12.0)

<br>

* **How do a report a bug or request a feature**

  In order to ensure all required information is provided, we have created an [Issue Generator](https://issues.vuetifyjs.com) that helps you through the process. Any issue created not using the generator will automatically be closed, so please use it.

<br>

* **The vuetify-loader doesn't load all components**

  The vuetify-loader has limitations in _dynamic_ components. Make sure to checkout the [limitations](/customization/a-la-carte#limitations) section for more information.

<br>

* **How long will version 1.5 be supported?**

  Until July 2020. More information is located on the [Long-term Support](/introduction/long-term-support/) page.

<br>

* **How do I get to the v1.5 documentation?**

  [https://v15.vuetifyjs.com](https://v15.vuetifyjs.com)

<br>

* **[Vue warn]: Unknown custom element: &lt;v-app>**

  Ensure that you have the latest version of [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify) and [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) installed in your **package.json**.

<br>

* **SCRIPT5022: Expected identifier, string or number**

  In order to support **modern mode** in vue-cli-3, `vuetify/lib` is not transpiled. You must tell vue-cli to transpile the `vuetify` package. This is configured automatically when installing the Vuetify cli plugin. If you are using an older version, simple add 'vuetify' to your `vue.config.js` **transpileDependencies** array.

<br>

* **When adding typescript - Error: Could not find a declaration file for module 'vuetify/lib'**

  Update the **compilerOptions** key in `tsconfig.json` with the vuetify type:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vuetify"]
  }
}
```

## I Need Help

If you need help with an issue, please use one of our help channels:

* [Vuetify Professional Support](/professional-support/consulting/)
* [Discord Community](https://community.vuetifyjs.com/)
* [GitHub Discussions](https://discussions.vuetifyjs.com/)

<br>

For additional inquiries, please reach out to [John Leider](mailto:john@vuetifyjs.com) or [Heather Leider](mailto:heather@vuetifyjs.com).

<backmatter />
