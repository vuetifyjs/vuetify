<template>
  <div>
    <figure class="mb-4 text-xs-center">
      <v-img
        :src="computedValue"
        class="d-inline-block"
        style="max-width: 100%;"
      />

      <figcaption
        v-if="$slots.default"
        class="caption text-xs-center"
      >
        <doc-markdown><slot /></doc-markdown>
      </figcaption>
    </figure>
  </div>
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

        if (this.value.indexOf('http') > -1) {
          return this.value
        }

        return `https://cdn.vuetifyjs.com/images/${this.value}`
      },
    },
  }
</script>
