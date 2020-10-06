<template>
  <vuetify-ad
    v-if="$attrs.slug"
    :slug="$attrs.slug"
  />

  <bsa-ad v-else />
</template>

<script>
  export default {
    name: 'ExitAd',

    inheritAttrs: false,
  }
</script>
