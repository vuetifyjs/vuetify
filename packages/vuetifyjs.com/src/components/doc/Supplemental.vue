<template>
  <div>
    <doc-subheading>Generic.Pages.supplemental</doc-subheading>
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
