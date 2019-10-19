<template>
  <h1
    :class="$vuetify.breakpoint.smAndDown && 'display-1' || 'display-2'"
    class="font-weight-light mb-6"
  >
    <doc-markdown><slot /></doc-markdown>
  </h1>
</template>

<script>
  export default {
    name: 'BaseHeading',
  }
</script>
