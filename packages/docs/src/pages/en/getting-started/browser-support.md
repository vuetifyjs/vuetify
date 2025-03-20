---
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

| Browser                    | Status                     |
|----------------------------|----------------------------|
| Chromium 90 (Chrome, Edge) | ✅ Supported <sup>*</sup>   |
| Firefox 88                 | ✅ Supported <sup>*</sup>   |
| Safari 15                  | ✅ Supported                |
| Edge <79                   | ⛔ Not supported            |
| Internet Explorer          | ⛔ Not supported            |
| Other Browsers             | ❓ Not officially supported |

<p class="text-caption">* All browsers on iOS use WebKit and have the same support as Safari</p>

This table is updated with minor releases of Vuetify. Chrome, Firefox, and Safari will be supported at least two years back from the Vuetify x.x.0 release date.
Current start date is May 2021.

Support for older browsers may be possible with additional [polyfills](https://cdnjs.cloudflare.com/polyfill/) and [PostCSS plugins](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-logical), but has not been tested and is not guaranteed. If you need to support older browsers we recommend using Vuetify 2.
