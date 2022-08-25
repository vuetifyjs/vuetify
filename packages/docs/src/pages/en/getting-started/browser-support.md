---
meta:
  title: Browser support
  description: Vuetify is a progressive framework that supports all evergreen browsers and IE11 / Safari with polyfill.
  keywords: vuetify browser support
related:
  - /getting-started/installation/
  - /getting-started/frequently-asked-questions/
  - /features/sass-variables/
---

# Browser support

Vuetify is a progressive framework that attempts to push web development to the next level. In order to best accomplish this task, some sacrifices had to be made in terms of support for older versions of Internet Explorer. This is not an exhaustive list of compatible browsers, but the main targeted ones.

<entry />

## Browsers

| Browser                         | Status              |
|---------------------------------|---------------------|
| Chromium (Chrome, Edge Insider) | ✅ Supported         |
| Edge                            | ✅ Supported         |
| Firefox                         | ✅ Supported         |
| Safari 15+                      | ✅ Supported         |
| Safari 13.1 / iOS 13.7          | ❗ Requires polyfill |
| Internet Explorer               | ⛔ Not supported     |

Safari and some older versions of other browsers require polyfills to work correctly. You can use [babel and core-js](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) for this, or you can use [polyfill.io](https://polyfill.io/v3/) like we do on this site:
```html
<script
  src="https://polyfill.io/v3/polyfill.js?features=IntersectionObserver,ResizeObserver,Object.fromEntries,Array.prototype.at"
></script>
```

## Deprecated Browser Support

Vuetify 3 is a next generation framework that takes advantage of the latest web technology features and requires an evergreen browser to function. If you need to support older browsers, we recommend using Vuetify 2.

<backmatter />
