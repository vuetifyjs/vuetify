<template>
  <div>
    <base-heading>Generic.Pages.supplemental</base-heading>
    <core-tree :children="value" />
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: () => ([]),
      },
    },
  }
</script>
