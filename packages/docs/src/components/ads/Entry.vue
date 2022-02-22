<template>
  <div class="mb-8">
    <vuetify
      v-if="slug"
      :slug="slug"
      medium="entry"
    />

    <carbon v-else />
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
