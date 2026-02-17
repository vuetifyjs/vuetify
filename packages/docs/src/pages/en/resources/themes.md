---
meta:
  nav: Themes
  title: Free & Premium Vuetify themes
  description: Vuetify offers numerous pre-build starter and premium themes. Kickstart your next application today, no design skills needed.
  keywords: vuetify themes, pre-built material themes, premium themes
related:
  - /getting-started/installation/
  - /features/blueprints/
  - /features/theme/
---

<script setup>
  import { onMounted } from 'vue'
  import { useShopifyStore } from '@/stores/shopify'

  const store = useShopifyStore()

  onMounted(() => {
    store.fetch()
  })
</script>

# Vuetify Themes

Vuetify offers both **free** and **premium** pre-made themes designed to get you started in a flash. Free themes are available to install through Vue CLI or you can simply download the source.

<PageFeatures />

---

## Vuetify

The following themes are created and maintained by Vuetify. They are available for free through the Vuetify store.

<DocThemeVendor name="Vuetify" />

---

<br>

## UI Lib

UI Lib is a collection of free and premium themes built on top of Vuetify.

<DocThemeVendor name="UI Lib" />

---

<br>

## WrapPixel

Create web apps and products using WrapPixel's product ready Vue Admin Templates, UI Kits, Themes, Templates and Dashboards.

<DocThemeVendor name="WrapPixel" />

---

<br>

## Theme Selection

Theme Selection offers an array of visually appealing, user-friendly UI kits and themes. Catering to a variety of platforms, they deliver efficient design solutions for a streamlined digital experience.

<DocThemeVendor name="ThemeSelection" />

<br>

## CodedThemes

Craft powerful web applications and products effortlessly with CodedThemes. Explore our ready-to-use Vue Admin Templates, UI Kits, Themes, and Dashboards to streamline your development process and enhance your digital projects.

<DocThemeVendor name="CodedThemes" />

<br>

::: success

Want to feature your themes here? [Contact us!](mailto:hello@vuetifyjs.com?subject=Theme+affiliation) to learn more about becoming a vendor.

:::
