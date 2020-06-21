<template>
  <div class="mb-8">
    <vuetify-ad
      v-bind="$attrs"
      class="v-vuetify-ad--promoted"
      compact
      entry
      max-width="720"
      outlined
    />
  </div>
</template>

<script>
  export default {
    name: 'PromotedAd',

    inheritAttrs: false,
  }
</script>

<style lang="sass">
  .v-vuetify-ad--promoted
    .v-avatar
      margin: 0 1rem 0 1rem

    .v-markdown p
      font-size: 1.25rem
      font-weight: 300

      strong
        font-weight: 700

    .v-vuetify-ad__bg
      border-bottom-right-radius: inherit
      border-top-right-radius: inherit

      .v-list-item__content
        color: #FFFFFF
        flex: 0 1 auto
        height: 100%
        padding: 0 24px
</style>
