<template>
  <div
    class="font-weight-light grey--text text--lighten-4"
    :class="$vuetify.breakpoint.smAndDown ? 'subtitle-1' : 'title'"
  >
    <doc-markdown><slot /></doc-markdown>
  </div>
</template>

<script>
  export default {
    name: 'BaseText',
  }
</script>
