<template>
  <v-list-item
    :href="item.href"
    :rel="item.href ? 'nofollow' : undefined"
    :target="item.href ? '_blank' : undefined"
    :to="item.to"
    class="v-list-item--default"
    color="primary"
    :prepend-icon="item.icon"
    :title="item.title"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppListItem',

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },
  })
</script>

<style lang="sass">
  .v-list-item.v-list-item.v-list-item--default
    min-height: 32px

    > .v-list-item__icon
      margin-bottom: 6px
      margin-top: 6px
</style>
