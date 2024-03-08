---
emphasized: true
meta:
  title: Programmatic scrolling
  description: Handle scrolling within your application by using the goTo function
  keywords: programmatic scrolling, vuetify goto, goto
related:
  - /directives/scroll/
  - /features/application-layout/
  - /components/slide-groups/
features:
  github: /composables/goto.ts
  label: 'E: goto'
  report: true
---

# Programmatic scrolling

Handle scrolling within your application by using the **goTo** function.

<PageFeatures />

<PromotedEntry />

::: success

This feature was introduced in [v3.5.0 (Polaris)](/getting-started/release-notes/?version=v3.5.0)

:::

## Usage

The **goTo** method takes two parameters **target** and **options**. **target** can be either a pixel offset from the top of the page, a valid css selector, or an element reference. **options** is an object that includes **duration**, **easing**, **container**, and **offset**.

<ExamplesExample file="scroll/usage" />

## API

| Directive | Description |
| - | - |
| [useGoTo](/api/use-go-to/) | The useGoTo composable |

<ApiInline hide-links />

<!--## Use with router

The **goTo** function can be individually imported and invoked anywhere. This is particularly useful when hooking up to [vue-router](https://router.vuejs.org/).

```js { resource="src/router.js" }
import Router from 'vue-router'
import goTo from 'vuetify/lib/services/goto'

export default new Router({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
  },
  routes: [
    //
  ],
})
```
-->
