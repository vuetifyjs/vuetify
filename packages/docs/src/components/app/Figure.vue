<template>
  <figure class="mb-6">
    <app-img
      v-bind="attrs"
    />

    <figcaption
      v-if="caption"
      class="text-caption font-weight-bold text-center text-capitalize font-italic"
      v-text="caption"
    />
  </figure>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppFigure',

    inheritAttrs: false,

    props: {
      name: String,
    },

    setup (props, { attrs }) {
      return {
        attrs,
        caption: props.name || attrs.alt,
      }
    },
  })
</script>
