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

<DocPremiumThemesGallery />

<!-- <v-divider />

<HomeBlogs /> -->

<!-- <v-divider />

<HomeFreeThemes /> -->

<!-- <v-divider style="max-width: 500px;" class="mx-auto mb-16" />

## Templates Built With Vuetify

Check out these premium templates built using Vuetify.{style="max-width: 568px" .mx-auto .px-4}

<DocPremiumThemesGallery />

<v-divider style="max-width: 500px;" class="mx-auto my-16" />

## Made With Vuetify

Check out these beautiful apps, plugins, and themes built using Vuetify.{style="max-width: 568px" .mx-auto .px-4}

<DocMadeWithVuetifyGallery class="pa-3 mb-4" />

<DocMadeWithVuetifyLink /> -->

<!-- <br>
<br>
<br> -->

<!-- <HomeEpicmaxSupport /> -->

<script setup>
  const theme = useTheme()
</script>
