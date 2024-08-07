---
meta:
  title: API
  description: API documentation
  keywords: api, vuetify
---

<script setup lang="ts">
  const name = shallowRef('')
</script>

# {{ name }} API

<PageFeatures />

<ApiBacklinks :name="name" />

<PromotedEntry />

<ApiSearch />

<ApiView @update:name="name = $event" />

