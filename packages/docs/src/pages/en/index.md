---
layout: home
meta:
  title: Vuetify — A Vue Component Framework
  description: Vuetify is a no design skills required Open Source UI Component Framework for Vue. It provides you with all of the tools necessary to create beautiful content rich web applications.
  keywords: vue, vue components, vue ui components, material design components, vuetify, component framework, component library
---

<HomeEntry />

<v-divider  />

<HomeEcosystem />

<v-divider />

<HomeComponentGallery />

<v-divider thickness="2" color="primary" />

<HomeSnips />

<v-divider :color="theme.current.value.dark ? '' : 'primary'" />

<HomeSponsors />

<v-divider />

<HomeTooling />

<v-divider />

<HomeVuetifyOne />

<v-divider thickness="2" color="primary" />

<HomeDiscord />

<v-divider :color="theme.current.value.dark ? '' : 'primary'" />

<HomeBlogs />

<v-divider />

<HomeStore />

<script setup>
  const theme = useTheme()
</script>
