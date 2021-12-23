<template>
  <app-headline color="grey" size="caption" weight="regular" :path="path" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'AppCaption',

    props: {
      path: {
        type: String,
        required: true,
      },
    },
  })
</script>
