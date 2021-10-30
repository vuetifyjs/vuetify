<template>
  <div class="mb-8">
    <ads-vuetify
      v-if="slug"
      :slug="slug"
      medium="entry-ad"
    />

    <ads-carbon v-else />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue-demi'

  export default defineComponent({
    name: 'EntryAd',

    props: {
      slug: String,
    },
  })
</script>
