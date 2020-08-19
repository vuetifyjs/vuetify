<template>
  <figure>
    <app-img
      class="mb-3"
      v-bind="{
        ...$attrs,
        ...attrs,
      }"
      v-on="on"
    />

    <figcaption
      v-if="caption"
      class="text-subtitle-2 text-center text-capitalize"
      v-text="caption"
    />
  </figure>
</template>

<script>
  export default {
    name: 'AppFigure',

    inheritAttrs: false,

    props: { name: String },

    computed: {
      caption () {
        return this.name || this.$attrs.alt
      },
    },
  }
</script>
