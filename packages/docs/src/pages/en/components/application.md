---
meta:
  title: Application service
  description: Vuetify comes equipped with a default markup that makes it easy to create layouts (boilerplate) for any Vue application.
  keywords: default layout, vuetify default markup, vuetify default layout
related:
  - /features/theme/
  - /components/app-bars/
  - /components/navigation-drawers/
---

# Application

In Vuetify, the `v-app` component and the **app** prop on components like `v-navigation-drawer`, `v-app-bar`, `v-footer` and more, help bootstrap your application with the proper sizing around `<v-main>` component. This allows you to create truly unique interfaces without the hassle of managing your layout sizing. The `v-app` component is **REQUIRED** for all applications. This is the mount point for many of Vuetify's components and functionality and ensures that it propagates the default application _variant_ (**dark/light**) to children components and also ensures proper cross-browser support for certain click events in browsers like Safari. `v-app` should only be rendered within your application **ONCE**.

<entry-ad />

## API

- [v-app](/api/v-app)
- [v-main](/api/v-main)

<alert type="error">

  In order for your application to work properly, you **must** wrap it in a `v-app` component. This component is required for ensuring proper **cross-browser compatibility**. Vuetify doesn't support multiple isolated Vuetify instances on a page. `v-app` can exist **anywhere** inside the body of your app, however, there should only be one and it must be the parent of **ALL** Vuetify components.

</alert>

<alert type="info">

  If you are using multiple layouts in your application you will need to ensure each root layout file that will contain Vuetify components has a `v-app` at the root of its template.

</alert>

## Default application markup

This is an example of the default application markup for Vuetify. You can place your layout elements anywhere, as long as you apply the **app** property. The key component in all of this is `v-main`. This will be dynamically sized depending upon the structure of your designated **app** components. You can use combinations of any or all of the above components including `v-bottom-navigation`.

When using [vue-router](https://router.vuejs.org/) it is recommended that you place your views inside `v-main`.

```html
<!-- App.vue -->

<v-app>
  <v-navigation-drawer app>
    <!-- -->
  </v-navigation-drawer>

  <v-app-bar app>
    <!-- -->
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
```

<alert type="info">

  Applying the **app** prop automatically applies position: **fixed** to the layout element. If your application calls for an _absolute_ element, you can overwrite this functionality by using the **absolute** prop.

</alert>

## Application components

Below is a list of all the components that support the **app** prop and can be used as layout elements in your application. These can be mixed and matched and only **one** of each particular component should exist at any time. You can, however, swap them out and the layout will accommodate. For some examples displaying how you can build various layouts, checkout the [Pre-made layouts](/getting-started/wireframes) page.

Each of these application components have a designated location and priority that it affects within the layout system.

- [v-app-bar](/components/app-bars): Is always placed at the top of an application with a lower priority than `v-system-bar`.
- [v-bottom-navigation](/components/bottom-navigation): Is always placed at the bottom of an application with a higher priority than `v-footer`.
- [v-footer](/components/footer): Is always placed at the bottom of an application with a lower priority than `v-bottom-navigation`.
- [v-navigation-drawer](/components/navigation-drawers): Can be placed on the left or right side of an application and can be configured to sit next to or below `v-app-bar`.
- [v-system-bar](/components/system-bars): Is always placed at the top of an application with higher priority than `v-app-bar`.

<app-img src="https://cdn.vuetifyjs.com/images/layouts/app.png" alt="Vuetify Application" />

## Application service

The **application service** is used to configure your Vuetify layout. It communicates with the `v-main` component so that it's able to properly size the application content. It has a number of properties that can be accessed:

```ts
{
  bar: number
  bottom: number
  footer: number
  footerInset: number
  left: number
  right: number
  top: number
}
```

These values are automatically updated when you add and remove components with the **app** prop. They are **NOT** editable and exist in a _READONLY_ state. You can access these values by referencing the application property on the **$vuetify** object.

```js
console.log(this.$vuetify.application.top) // 56
```

<alert type="error">

  In order for your application to work properly, you **must** wrap it in a `v-app` component. This component is required for ensuring proper **cross-browser compatibility**. Vuetify doesn't support multiple isolated Vuetify instances on a page. `v-app` can exist **anywhere** inside the body of your app, however, there should only be one and it must be the parent of **ALL** Vuetify components.

</alert>

## Accessibility

By default, `v-main` is assigned the [TR](https://www.w3.org/TR/html51/) tag of [**main**](https://www.w3.org/TR/html51/grouping-content.html#the-main-element) which denotes that it is the main content area of the `body` of a document or application.

<backmatter />
