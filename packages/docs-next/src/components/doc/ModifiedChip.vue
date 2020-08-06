<template>
  <v-chip
    v-if="fresh || updated"
    :color="color"
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

    computed: {
      color () {
        return this.fresh ? '#00C58E' : 'primary'
      },
    },
  }
</script>
