<template>
  <figure class="mb-6 text-center">
    <v-card
      color="transparent"
      flat
    >
      <v-img
        :src="computedValue"
        class="d-inline-block"
        eager
        max-width="100%"
      />
    </v-card>

    <figcaption
      v-if="$slots.default"
      class="caption text-center"
    >
      <base-markdown><slot /></base-markdown>
    </figcaption>
  </figure>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: undefined,
      },
    },

    computed: {
      computedValue () {
        if (!this.value) return

        return this.value.indexOf('http') > -1
          ? this.value
          : `https://cdn.vuetifyjs.com/images/${this.value}`
      },
    },
  }
</script>
