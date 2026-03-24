---
emphasized: true
meta:
  title: Browser support
  description: Vuetify is a progressive framework that supports all evergreen browsers.
  keywords: vuetify browser support
related:
  - /getting-started/installation/
  - /introduction/why-vuetify/
  - /features/sass-variables/
---

# Browser support

Vuetify 4 is a next generation framework that takes advantage of the latest web technology features and requires an evergreen browser to function.

<PageFeatures />

<PromotedEntry />

## Browsers

This is not an exhaustive list of compatible browsers, but the main targeted ones. If you are using a browser that is not listed here, it is not officially supported.

| Browser                 | Version | Status                           |
|-------------------------|:--------|----------------------------------|
| Chromium (Chrome, Edge) | 119     | ✅ Supported <sup>*</sup>         |
| ^^                      | 99      | ⚠️ Partial support <sup>**</sup> |
| Firefox                 | 128     | ✅ Supported <sup>*</sup>         |
| ^^                      | 97      | ⚠️ Partial support <sup>**</sup> |
| Safari                  | 16.4    | ✅ Supported                      |
| Internet Explorer       |         | ⛔ Not supported                  |
| Other Browsers          |         | ❓ Not officially supported       |

<p class="text-body-small">* All browsers on iOS use WebKit and have the same support as Safari</p>
<p class="text-body-small">** Some components may have incorrect colors due to lack of support for <AppLink href="https://www.w3.org/TR/css-color-5/#relative-colors">relative color syntax</AppLink> (e.g. <v-code>rgb(from ...)</v-code>)</p>

This table is updated with minor releases of Vuetify. Chrome, Firefox, and Safari will be supported at least two years back from the Vuetify x.x.0 release date.
Current start date is December 2023.

Support for older browsers may be possible with additional [polyfills](https://cdnjs.cloudflare.com/polyfill/) and [PostCSS plugins](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-logical), but has not been tested and is not guaranteed. If you need to support older browsers we recommend using Vuetify 2 or 3.
