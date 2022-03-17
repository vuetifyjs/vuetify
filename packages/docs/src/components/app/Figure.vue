<template>
  <figure
    :class="[
      caption ? 'mb-6' : 'mb-10'
    ]"
  >
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
        caption: attrs.title === 'null' ? null : attrs.title,
      }
    },
  })
</script>
