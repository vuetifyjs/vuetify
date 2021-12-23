<template>
  <div class="mb-8">
    <vuetify-ad
      v-if="slug"
      :slug="slug"
      medium="entry-ad"
    />

    <carbon-ad v-else />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'EntryAd',

    props: {
      slug: String,
    },
  })
</script>
