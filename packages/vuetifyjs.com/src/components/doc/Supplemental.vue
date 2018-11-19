<template>
  <div>
    <doc-heading>Generic.Pages.supplemental</doc-heading>
    <core-tree :children="value" />
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    }
  }
</script>
