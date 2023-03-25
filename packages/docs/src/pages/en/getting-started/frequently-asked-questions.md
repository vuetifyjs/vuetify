---
meta:
  title: Frequently asked questions
  description: Stuck on a problem? Check out the most frequently asked questions by the Vuetify community.
  keywords: frequently asked questions, faq
related:
  - /introduction/why-vuetify/
  - /getting-started/contributing/
  - /getting-started/installation/
---

# Frequently asked questions

Stuck on a particular problem? Check some of these common gotchas before creating a ticket. If you still cannot find what you are looking for, you can submit an [issue](https://issues.vuetifyjs.com/) on GitHub or ask the in our [community](https://community.vuetifyjs.com/).

<entry />

## Questions

<promoted slug="vuetify-discord" />

* **What is Vuetify?** { #what-is-vuetify }

  Vuetify is a Vue.js framework that helps to create beautiful and responsive user interfaces. It includes a wide variety of customizable and reusable components for building modern applications.

* **What is the difference between Vuetify and Vue?** { #what-is-the-difference-between-vuetify-and-vue }

  Vuetify is a framework that is built on top of Vue.js. It is a collection of components that can be used to build applications. Vue.js is a JavaScript framework that is used to build user interfaces.

* **What versions of Vue.js are compatible with Vuetify?** { #what-versions-of-vuejs-are-compatible-with-vuetify }

  Vuetify is compatible with Vue.js 2.6.0 and above.

* **Can I use Vuetify with other CSS frameworks?** { #can-i-use-vuetify-with-other-css-frameworks }

  Yes, you can use Vuetify with other CSS frameworks, but it is typically not recommended. If you are integrating Vuetify into an existing application that is using another CSS framework, you may want to disable the default color and utility generation. See the [SASS Variables](/features/sass-variables/) page for more information.

* **Can I customize the styling of Vuetify components?** { #can-i-customize-the-styling-of-vuetify-components}

  Yes, you can customize the styling of Vuetify components using the [Global configuration](/features/global-configuration/). Vuetify also provides [SASS variables](/features/sass-variables/) that can be overridden to change the look and feel of the components.

* **Where can I get help with Vuetify?** { #where-can-i-get-help-with-vuetify }

  If you need help with an issue, please use one of our help channels:

  * [Vuetify Enterprise Support](/introduction/enterprise-support/)
  * [Discord Community](https://community.vuetifyjs.com/)
  * [GitHub Discussions](https://discussions.vuetifyjs.com/)

* **Can I contribute to Vuetify?** { #can-i-contribute-to-vuetify }

  Yes, we welcome all contributions. Please see our [contributing guide](/getting-started/contributing/) for more information.

* **Can I use Vuetify with server-side rendering?** { #can-i-use-vuetify-with-server-side-rendering }

  Yes, Vuetify supports server-side rendering. Set the `ssr` property to `true` in your `vuetify` configuration object.

  ```js { resource="src/plugins/vuetify.js" }
  import { createVuetify } from 'vuetify'

  export default createVuetify({
    ssr: true,
  })
  ```

* **Is there still support for IE11 in Vuetify 3?** { #is-there-still-support-for-ie11-in-vuetify-3 }

  No. If you need to support IE11, you will need to use Vuetify 2.

<promoted type="theme" />
