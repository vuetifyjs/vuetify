<template>
  <v-chip
    v-if="recent || stale != null"
    :color="recent ? '#00C58E' : '#1697f6'"
    class="px-1 align-self-center text-uppercase"
    dark
    label
    x-small
  >
    <i18n :path="recent ? 'new' : 'updated'" />
  </v-chip>
</template>

<script>
  export default {
    name: 'ModifiedChip',

    inheritAttrs: false,

    props: {
      recent: Boolean,
      stale: {
        type: Boolean,
        default: null,
      },
    },
  }
</script>
