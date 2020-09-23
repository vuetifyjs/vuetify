<template>
  <figure>
    <app-sheet :outlined="outlined">
      <app-img
        v-bind="$attrs"
        v-on="$listeners"
      />
    </app-sheet>

    <slot />

    <figcaption
      v-if="!$slots.default && caption"
      class="text-subtitle-2 text-center text-capitalize mt-3"
      v-text="caption"
    />
  </figure>
</template>

<script>
  export default {
    name: 'AppFigure',

    inheritAttrs: false,

    props: {
      name: String,
      outlined: Boolean,
    },

    computed: {
      caption () {
        return this.name || this.$attrs.alt
      },
    },
  }
</script>
