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

Vuetify 3 is a next generation framework that takes advantage of the latest web technology features and requires an evergreen browser to function.

<PageFeatures />

<PromotedEntry />

## Browsers

This is not an exhaustive list of compatible browsers, but the main targeted ones. If you are using a browser that is not listed here, it is not officially supported.

| Browser                 | Version | Status                           |
|-------------------------|:--------|----------------------------------|
| Chromium (Chrome, Edge) | 105     | ✅ Supported <sup>*</sup>         |
| ^^                      | 90      | ⚠️ Partial support <sup>**</sup> |
| Firefox                 | 121     | ✅ Supported <sup>*</sup>         |
| ^^                      | 88      | ⚠️ Partial support <sup>**</sup> |
| Safari                  | 15.4    | ✅ Supported                      |
| Internet Explorer       |         | ⛔ Not supported                  |
| Other Browsers          |         | ❓ Not officially supported       |

<p class="text-caption">* All browsers on iOS use WebKit and have the same support as Safari</p>
<p class="text-caption">** Some components may have missing padding due to lack of support for CSS <v-code>:has()</v-code></p>

This table is updated with minor releases of Vuetify. Chrome, Firefox, and Safari will be supported at least two years back from the Vuetify x.x.0 release date.
Current start date is September 2022.

Support for older browsers may be possible with additional [polyfills](https://cdnjs.cloudflare.com/polyfill/) and [PostCSS plugins](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-logical), but has not been tested and is not guaranteed. If you need to support older browsers we recommend using Vuetify 2.
