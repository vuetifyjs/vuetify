---
layout: blank
meta:
  title: API
  description: API documentation
  keywords: api, vuetify
---

<script setup>
  const name = shallowRef('')
</script>

<ApiView v-on:update:name="name = $event">

# {{ name }} API

<PageFeatures />

<ApiBacklinks :name="name" />

<PromotedEntry />

<ApiSearch />

</ApiView>
