---
meta:
  title: Frequently asked questions
  description: Stuck on a problem? Check out the most frequently asked questions by the Vuetify community.
  keywords: frequently asked questions, faq
related:
  - /getting-started/contributing/
  - /introduction/support/
  - /features/treeshaking/
---

# Frequently asked questions

Stuck on a particular problem? Check some of these common gotchas before creating a ticket. If you still cannot find what you are looking for, you can submit an [issue](https://issues.vuetifyjs.com/) on Github or ask the in our [community](https://community.vuetifyjs.com/).

<promoted-ad slug="vuetify-discord" />

## Table of Contents

- [How do I get to the old v2.3 documentation?](#v23-legacy)
- [When will Vuetify v3 be released?](#version-3)
- [Why is Search Vuetify not working properly?](#search-broke)
- [My application won't compile due to sass / scss errors.](#sass-compile-error)
- [Are there examples on how the v2 grid compares to v1.5?](#v2-v15-grid)
- [Error: Cannot find module 'node-sass'.](#cannot-find-module-sass)
- [Invalid CSS after @content: expected "}", was "($material-light);".](#invalid-css-content)
- [My application is not working.](#my-application-is-not-working)
- [I'm seeing $attrs is readonly and/or $listeners is readonly in the console.](#attrs-is-readonly)
- [I'm seeing Error Module parse "failed". Unexpected token in the terminal.](#unexpected-token)
- [Is there a codepen template with router?](#codepen-template-with-router)
- [How do I extend Vuetify components?](#extend-components)
- [My application does not look correct.](#my-application-does-not-look-correct)
- [Menu/Dialog/Navigation drawer are not opening properly.](#menu-dialog-drawer)
- [The scrollbar is showing even though my content is not overflowing vertically.](#scrollbar-overflow)
- [How do I vertically center content?](#vertically-center-content)
- [My _/_ link is active when I'm on _/home_ page.](#link-active-home)
- [Why isn't my application responsive on mobile devices?](#mobile-responsiveness)
- [How do I use Font Awesome, Material Design Icons or Material Icons?](#custom-icons)
- [Why does &lt;v-dialog> close immediately after clicking the button?](#dialog-close-click)
- [How do I upgrade to the latest version?](#latest-version-upgrade)
- [How do I report a bug or request a feature?](#report-request-feature)
- [The vuetify-loader doesn't load all components](#vuetify-loader-components)
- [How long will version 1.5 be supported?](#v15-lts)
- [How do I get to the v1.5 documentation?](#v15-docs)
- [[Vue warn]: Unknown custom element: &lt;v-app>](#unknown-element)
- [SCRIPT5022: Expected identifier, string or number](#script5022)
- [Error: Could not find a declaration file for module 'vuetify/lib'](#typescript-declaration-file)

## Questions

Have a question that belongs here? Tell us in our [Discord Community](https://community.vuetifyjs.com/) or create a request on our [Issue Generator](https://issues.vuetifyjs.com/).

---

- **When will Vuetify v3 be released?** { #version-3 }

  Version 3 is currently under development and slated for release in Quarter 1 of 2021. Follow our progress on [Notion](https://notion.vuetifyjs.com) or read and overview of what's to come on our [Roadmap](/introduction/roadmap/).

<br>

- **My application won't compile due to sass / scss errors.**{ #sass-compile-error }

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
            indentedSyntax: true // optional
          },
          // Requires sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
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

- **Why is Search Vuetify not working properly?**{ #search-broke }

  At the moment, Algolia docsearch only crawls the main production site: [https://vuetifyjs.com/](https://vuetifyjs.com/).

<br>

- **How do I get to the old v2.3 documentation?**{ #v23-legacy }

  Navigate to [https://v2.vuetifyjs.com/](https://v2.vuetifyjs.com/). It will remain active until the release of [Vuetify 3](/introduction/roadmap/#v30-titan) in 2021.

<br>

- **Are there examples on how the v2 grid compares to v1.5?**{ #v2-v15-grid }

  Yes, you can view [grid examples here](https://gist.github.com/johnleider/207f63c9d30fb77042a0bb0258c5ab32).

<br>

- **Error: Cannot find module 'node-sass'.**{ #cannot-find-module-sass }

  Ensure that your `@vue/cli-*` packages located in `package.json` are at least **^3.5.0**.

<br>

- **Invalid CSS after @content: expected "}", was "($material-light);".**{ #invalid-css-content}

  Ensure that you are using `sass` instead of `node-sass` in your **package.json**.

<br>

- **My application is not working.**{ #my-application-is-not-working }

  First, ensure that you're using the latest version of Vue.js and Vuetify. Try to reproduce it in codepen using the following [template](https://template.vuetifyjs.com/). If you are unable to reproduce the issue outside of your environment, this usually means the issue resides locally. If you are still unable to resolve your issue, please provide your codepen and issue in **#need-help** in the [community](https://chat.vuetifyjs.com).

<br>

- **I'm seeing `$attrs is readonly` and/or `$listeners is readonly` in the console**{ #attrs-is-readonly }

  Vuetify utilizes Typescript and currently must import and extend the Vue object. This has the potential in some applications to generate a warning messages. There is currently an ongoing [Github discussion](https://github.com/vuetifyjs/vuetify/issues/4068) with potential work-arounds in a variety of use-cases.

<br>

- **I'm seeing `Error in ./node_modules/vuetify/src/dir/file.js Module parse failed: Unexpected token (<lineno>:<characterno>)` in the terminal.**{ #unexpected-token }

  If you're using an IDE, such as IntelliJ IDEA or WebStorm, it will often add automatic imports pointing to the `vuetify/src` directory for components you use. Change the import statement path from `vuetify/src` to `vuetify/lib`.

<br>

- **Is there a codepen template with router?**{ #codepen-template-with-router }

  Yes. [Vuetify Codepen Router Template](https://codepen.io/johnjleider/pen/PMZvpr).

<br>

- **How do I extend Vuetify components?**{ #extend-components }

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

- **My application does not look correct.**{ #my-application-does-not-look-correct }

  Vuetify requires the use of the `v-app` component. It should wrap your entire application and is the center point for much of the framework functionality including themes. Ensure that you are following the proper markup documented in the [Application](/components/application/) page.

<br>

- **Menu/Dialog/Navigation drawer are not opening properly.**{ #menu-dialog-drawer }

  Ensure that your components are wrapped with a `v-app` element. If you are using an element to activate the component that is not placed into the **activator** slot, ensure that you stop propagation of the click event. These components utilize the **v-outside-click** directive and will immediately close.

<br>

- **The scrollbar is showing even though my content is not overflowing vertically.**{ #scrollbar-overflow }

  Vuetify uses a slightly modified version of [ress reset](https://github.com/filipelinhares/ress) which by default turns on the html scrollbar to normalize behavior between browsers. This is a design choice and has been debated numerous times. There are pros and cons to having and not having it and as of now, the vote is in favor of leaving it as is. If you wish to disable this functionality, simply add `html { overflow-y: auto }` to your style file. Find more information on the [CSS Reset](/styles/css-reset/) page.

- **How do I vertically center content?**{ #vertically-center-content }

  Apply the **fill-height** prop to `v-container`. This helper class normally only adds **height: 100%**, but for the container, it also looks for a child `v-layout` and applies the needed classes to vertically center the content.

<promoted-ad slug="vuetify-reddit" />

- **My _/_ link is active when I'm on _/home_ page.**{ #link-active-home }

  Add the **exact** to the link that points to absolute /. For more information on this, you can visit the official Vue router [documentation](https://router.vuejs.org/en/api/router-link.html).

<br>

- **Why isn't my application responsive on mobile devices?**{ #mobile-responsiveness }

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

- **How do I use Font Awesome, Material Design Icons or Material Icons?**{ #custom-icons }

  You can find more information in our [icon guide](/features/icons/).

<br>

- **Why does &lt;v-dialog> close immediately after clicking the button?**{ #dialog-close-click }

  When not using the **activator** slot for `v-menu` and `v-dialog` for example, you must manually stop the propagation of the click event. To do this, simply add the `.stop` modifier to the click event.

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

- **How do I upgrade to the latest version?**{ #latest-version-upgrade }

  For a detailed guide on how to upgrade to the latest version, navigate to the [Releases and Migrations](/getting-started/releases-and-migrations/) page. In addition, all required changes are noted in the **Upgrade Guide** of all releases.

  **Releases**:

- [Latest](https://github.com/vuetifyjs/vuetify/releases/latest)
- [v2.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0)
- [v1.5.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.5.0)
- [v1.4.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.4.0)
- [v1.3.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.3.0)
- [v1.2.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.2.0)
- [v1.1.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.1.0)
- [v1.0.0](https://github.com/vuetifyjs/vuetify/releases/tag/v1.0.0)
- [v0.17.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.17.0)
- [v0.16.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.16.0)
- [v0.15.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.15.0)
- [v0.14.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.14.0)
- [v0.13.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.13.0)
- [v0.12.0](https://github.com/vuetifyjs/vuetify/releases/tag/v0.12.0)

<br>

- **How do I report a bug or request a feature?**{ #report-request-feature }

  In order to ensure all required information is provided, we have created an [Issue Generator](https://issues.vuetifyjs.com) that helps you through the process. Any issue created not using the generator will automatically be closed, so please use it.

<br>

- **The vuetify-loader doesn't load all components.**{ #vuetify-loader-components }

  The vuetify-loader has limitations in _dynamic_ components. Make sure to checkout the [limitations](/features/treeshaking/#limitations) section for more information.

<br>

- **How long will version 1.5 be supported?**{ #v15-lts }

  Until July 2020. More information is located on the [Long-term Support](/introduction/long-term-support/) page.

<br>

- **How do I get to the v1.5 documentation?**{ #v15-docs }

  [https://v15.vuetifyjs.com](https://v15.vuetifyjs.com)

<br>

- **[Vue warn]: Unknown custom element: &lt;v-app>**{ #unknown-element }

  Ensure that you have the latest version of [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify) and [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) installed in your **package.json**.

<br>

- **SCRIPT5022: Expected identifier, string or number**{ #script5022 }

  In order to support **modern mode** in vue-cli-3, `vuetify/lib` is not transpiled. You must tell vue-cli to transpile the `vuetify` package. This is configured automatically when installing the Vuetify cli plugin. If you are using an older version, simply add 'vuetify' to the `transpileDependencies` array in `vue.config.js`.

<br>

- **When adding typescript - Error: Could not find a declaration file for module 'vuetify/lib'**{ #typescript-declaration-file }

  Update the `compilerOptions` key in `tsconfig.json` with the vuetify type:

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

- [Vuetify Professional Support](/introduction/support/)
- [Discord Community](https://community.vuetifyjs.com/)
- [GitHub Discussions](https://discussions.vuetifyjs.com/)

<br>

For additional inquiries, please reach out to [John Leider](mailto:john@vuetifyjs.com) or [Heather Leider](mailto:heather@vuetifyjs.com).

<backmatter />
