<template>
  <div
    v-if="slug"
    class="mb-4"
  >
    <vuetify
      :slug="slug"
      medium="entry"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'PromotedEntry',

    props: {
      slug: String,
    },
  })
</script>
