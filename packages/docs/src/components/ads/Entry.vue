<template>
  <div class="mb-4">
    <vuetify
      :slug="slug"
      medium="entry"
    />
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
