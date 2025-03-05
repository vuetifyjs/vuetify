---
meta:
  title: Accessibility (a11y)
  description: See examples and the advantages of having accessibility (a11y) support in Vuetify components.
  keywords: a11y, accessibility, usability
related:
  - /features/internationalization/
  - /components/menus/
  - /components/lists/
features:
  label: 'a11y'
  report: true
---

# Accessibility (a11y)

Web accessibility **(a11y for short)**, is the inclusive practice of ensuring there are no barriers that prevent the interaction with, or access to, websites on the World Wide Web by people with disabilities. Vuetify components are built to provide keyboard interactions for all mouse-based actions and utilize HTML5 semantic elements where applicable.

<PageFeatures />

<PromotedEntry />

## Activator slots

Vuetify uses activator slots for many components such as `v-menu`, `v-dialog` and more. In some instances these activator elements should have specific a11y attributes that associate them with their corresponding content. In order to achieve this, we pass down the necessary a11y options through the slots scope.

```html
<!-- Vue Template HTML Markup -->

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        text="Click me"
        v-bind="props"
      ></v-btn>
    </template>

    <v-list>
      <v-list-item @click="method">
        <v-list-item-title>Option 1</v-list-item-title>
      </v-list-item>

      <v-list-item disabled>
        <v-list-item-title>Option 2</v-list-item-title>
      </v-list-item>

      <v-list-item @click="method">
        <v-list-item-title>Option 3</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
```

When the activator element is rendered, it will now contain the bound a11y attributes:

```html
<!-- Rendered `v-btn` HTML Output -->

<button
  aria-expanded="false"
  aria-haspopup="true"
  role="button"
  type="button"
>
  Click me
</button>
```

## Focus management and keyboard interactions

Beyond attributes, components such as `v-menu` also support interaction by pressing <kbd>↑</kbd> and <kbd>↓</kbd> for navigating between options.

### v-menu

When inside of a `v-menu`, `v-list-item` will be automatically configured to have a role of **menuitem**. Navigate to the [Menu](/components/menus) for more information on the components features.

<ExamplesExample file="accessibility/menu" inline />

## Additional Resources

While Vuetify attempts to make a11y as easy as possible in your application, there are times where additional information is needed. Below you can find a list of helpful resources.

- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [The A11Y Project](https://a11yproject.com/)"
