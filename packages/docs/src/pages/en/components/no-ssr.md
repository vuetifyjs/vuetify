---
meta:
  title: No SSR
  description: The No SSR component is a simple component that doesn't get rendered on the server, but only on the client.
  keywords: nossr, vuetify no ssr component, vue no ssr component
---

# No SSR

The `v-no-ssr` component is a simple wrapper that allows a developer to designate what a server-side renderer should not render, but leave to the client.

<!-- ![No-Ssr Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-No-Ssr/v-No-Ssr-entry.png) -->

---

## Usage

The `v-no-ssr` component prevents its content from rendering on the server side.

```html
<template>
  <v-no-ssr>
    <!-- Everything inside will only render on the Client -->
    <v-sheet>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias vitae minus, incidunt laboriosam amet doloribus officiis?
    </v-sheet>
  </v-no-ssr>
</template>
```

## API

| Component | Description |
| - | - |
| [v-no-ssr](/api/v-no-ssr/) | Primary Component |

<api-inline hide-links />

<entry />
