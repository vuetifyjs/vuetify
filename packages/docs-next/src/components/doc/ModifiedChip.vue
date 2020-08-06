<template>
  <v-chip
    v-if="fresh || updated"
    :color="fresh ? '#00C58E' : '#1697f6'"
    class="px-1 align-self-center text-uppercase"
    dark
    label
    x-small
  >
    <i18n :path="fresh ? 'new' : 'updated'" />
  </v-chip>
</template>

<script>
  export default {
    name: 'ModifiedChip',

    inheritAttrs: false,

    props: {
      fresh: Boolean,
      updated: Boolean,
    },
  }
</script>
