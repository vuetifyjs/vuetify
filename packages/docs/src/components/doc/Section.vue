<template>
  <section class="mb-12">
    <core-tree :children="value.children" />
  </section>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: () => ({}),
      },
    },
  }
</script>
