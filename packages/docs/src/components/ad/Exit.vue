<template>
  <vuetify-ad
    v-if="$attrs.slug"
    :slug="$attrs.slug"
    medium="exit-ad"
  />

  <bsa-ad v-else medium="exit-ad" />
</template>

<script>
  export default {
    name: 'ExitAd',

    inheritAttrs: false,
  }
</script>
