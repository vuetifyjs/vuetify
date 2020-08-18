<template>
  <figure>
    <app-sheet class="mb-3">
      <v-img
        class="rounded mx-auto"
        max-width="100%"
        v-bind="$attrs"
        v-on="$listeners"
      />
    </app-sheet>

    <figcaption
      v-if="caption"
      class="text-subtitle-2 text-center text-capitalize"
      v-text="caption"
    />
  </figure>
</template>

<script>
  export default {
    name: 'AppImg',

    inheritAttrs: false,

    props: { name: String },

    computed: {
      caption () {
        return this.name || this.$attrs.alt
      },
    },
  }
</script>
