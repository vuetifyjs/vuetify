<template>
  <div class="mb-8">
    <vuetify-ad
      v-if="$attrs.slug"
      :slug="$attrs.slug"
      medium="entry-ad"
    />

    <carbon-ad v-else />
  </div>
</template>

<script>
  export default {
    name: 'EntryAd',

    inheritAttrs: false,
  }
</script>
