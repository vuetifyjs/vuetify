<template>
  <figure class="mb-4">
    <v-sheet>
      <v-img
        :src="computedValue"
        class="mb-2"
      />
    </v-sheet>

    <figcaption
      v-if="$slots.default"
      class="caption text-xs-center"
    >
      <doc-markdown><slot /></doc-markdown>
    </figcaption>
  </figure>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: undefined
      }
    },

    computed: {
      computedValue () {
        if (!this.value) return

        if (this.value.indexOf('http') > -1) {
          return this.value
        }

        return `https://cdn.vuetifyjs.com/images/${this.value}`
      }
    }
  }
</script>
